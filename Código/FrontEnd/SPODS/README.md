# MARPH - Documentación

Git Angular2 4.0 MARPH 

**Instalación**

```sh
$ cd MARPH
$ npm install 
$ npm start
```

**Organización**
* /dashboard :: Componentes de backend de administración o de usuario
* /landing :: Componentes de visitantes
* /login :: Componentes de login, registro, recuperar password
* /shared :: Componenetes de servicios, pipes, directives
* /js :: JavaScripts, lo minimo posible, recordar que utilizar js externos va en contra de Angular
* /css :: CSS, un estilo por cada módulo, Ej.: welcome.css, dashboard.css, login.css

**Antes de commitear**
* Verificar que la carpeta sea la correcta
* Siempre incluir comentarios/descripción
* Todo el código y/o textos deben estar en ingles
* Leer el punto de abajo

**No incluir en el commit**
* node_modules/
* src/app/**/*.js
* src/app/**/*.map

**Dependencias**

| Nombre | Info |
| ------ | ------ |
| Angular2 RC4+| http://angular.io/ |
| NodeJS RC4+| https://nodejs.org/en/ |
| Github | http://github.com/ |
| Bootstrap 4 | https://v4-alpha.getbootstrap.com/ |
| Annotorious | http://annotorious.github.io/ |
| Typescript | https://www.typescriptlang.org/ |
| Tether | https://github.com/HubSpot/tether |

## MARPH - Conceptos generales
Algunos conceptos básicos de Angular 2, estructura y nomenclatura que solemos utilizar.
Es recomendable leer los comentarios.

**Ejemplo de debug**

```javascript
//Intentar utilizar siempre la siguiente nomenclatura
console.log("[clase] - procedimiento | dato: " + valor);
console.log("[data.service.ts] - parseProjectsError | Error: " + JSON.stringify(error));
//Lo usamos tanto en GX como en Angular
```

**Ejemplo de capa de servicios**

```javascript
//Al principio de esta clase inicializamos todas las estructuras y definimos todas las variables, headers, etc.
export class DataService {
    contentHeadersUrlEncoded: Headers;
    contentHeadersJson: Headers;
    baseUrl : string;
    projectsEvent: EventEmitter<Project[]>;
    projects: Project[] = [];
    constructor(private http:Http, private router: Router) {
        this.contentHeadersUrlEncoded = new Headers({'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded'});
        this.baseUrl = Settings.baseUrl;
        this.projectsEvent = new EventEmitter<Project[]>();
        this.projects = [];
        this.ini();
    }
```

Servicio con patrón observer

```javascript
//Datos básicos para hacer un post al servidor
//Postereormente se subscribe a la respuesta
public postProjects(textoBusqueda:string, imageSize:string) {
    console.log("[data.service.ts] - postProjects");
    let body = '{}';
    this.http.post(this.baseUrl + 'rest/GetProjects', body, { headers: this.contentHeadersJson })
    .map((res: Response) => res.json())
    .catch(this.handleError)
    .subscribe(
        res => this.parseProjectsOk(res),
        error => this.parseProjectsError(error),
        () => console.log("[data.service.ts] - postProjects: Completed")
    );
}
```

Manejo de resultados

```javascript
//Se obtiene el json y se castea al objeto
//Además se emite un evento de cambio a los observadores
private parseProjectsOk(res:any){
    console.log("[data.service.ts] - parseProjectsOk | Cantidad: " + res.projects.Items.length);
    this.projects = res.TracksMediaQueue.Items;
    this.projectsEvent.emit(this.projects);
}
```

Manejo de errores

```javascript
//En caso de error siempre se verifica si se puede controlar
//Si no se puede controlar se loguean datos
private parseProjectsError(error:any){
    console.log("[data.service.ts] - parseProjectsError | Error: " + JSON.stringify(error));
    if (error.code == 112){
        console.log("[data.service.ts] - parseProjectsError | Token expirado redirect");
        this.router.navigate(['/login']);
    }else{
        console.log("[data.service.ts] - parseProjectsError | Otro error");
    }
}    
//Para este caso si el servicio retorna error 112 sabemos que no está logueado o su token expiró 
private handleError(error: any) {
    return Observable.throw(error.json().error || " server error");
}
```

**Ejemplo de consumir capa de servicios con patrón observer**

```javascript
export class ProjectsComponent {
    //Se inicializa el array
    projects: Project[] = [];
    //Se subscribe al observer
    constructor(private dataService: DataService) {
        this.getProjects();
        this.dataService.projectsEvent.subscribe((projects: Project[]) => {
            this.projects = projects;
        });
    }
  
    getProjects(){
        this.dataService.postProjects("", "800");
    }
    //Ejemplo de evento al clickear
    project(id: number) {
    }
}
```
**Ejemplo de consumir capa de servicios sin patrón observer**
```javascript
//Se llama al servicio
accessToken(username:string, password:string) {
    this.dataService.postAccessToken(username, password)
    .subscribe(
        res => this.parseAccessTokenOk(res),
        error => this.parseAccessTokenError(error),
        () => console.log("[login.component.ts] - accessToken: Completed")
    );
}
    
//Se obtiene el resultado
parseAccessTokenOk(oauth:any){
    console.log("[login.component.ts] - parseAccessTokenOk: " + oauth.access_token);
    localStorage.setItem('access_token', oauth.access_token);
    this.dataService.ini();
    this.router.navigate(['dashboard']);
}

//O se maneja el error
parseAccessTokenError(error:any){
    console.log("[login.component.ts] - parseAccessTokenError: " + JSON.stringify(error));
    this.message = "Login error";
}
```

**Ejemplo de una clase**

```javascript
//Nada nuevo por aquí
//Lo importante a entender de esto es que toda clase de Typescript se puede castear directamente a JSON y viceversa 
export class Project{
    Description: string;
    Id: string;
    Image: string;
    Uri: string;
}
```

**Ejemplo de app.module**

```javascript
//Esta clase es muy importante y es imprecindible desde Angular RC4+
//Es donde se "inicializan" módulos, rutas, importaciones y declaraciones
const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard/projects', component: ProjectsComponent }
];

@NgModule({
  imports: [ BrowserModule, FormsModule, HttpModule, RouterModule,  RouterModule.forRoot(appRoutes) ],
  declarations: [ AppComponent, LoginComponent, ProjectsComponent, DashboardComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

**Ejemplo de inyección de dependencias**
```javascript
//Esto lo usamos para todo lo que sea global
//De cierta forma se puede entender como parte de un singleton que se puede consumir globalmente
import { DataService } from './shared/services/data.service';
export const APP_PROVIDERS = [
    DataService
];
```

**Ejemplo de vistas**
```html
//Fijarse bien en el markup de Angular dentro de los elementos HTML
<div class="container">
    <form class="form-signin" role="form" (submit)="accessToken(username.value, password.value)">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus  #username>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required #password>
        <div class="checkbox">
            <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
    <h3>
        {{ message }}
    </h3>
</div>
//Estos tags se pueden entender como lo que vincula la M de "modelo" con la V de "vistas" del patrón MVC
```

**Ejemplo de componente incial**
```javascript
//La idea de ésta clase es controlar y redireccionar según corresponda al usuario
//Además es el componente "raiz" e inicializa los APP_PROVIDERS
@Component({
  selector: 'my-app',
  providers: [APP_PROVIDERS],
  templateUrl: 'app/app.component.html'
})
export class AppComponent { 
  token:string = localStorage.getItem('access_token');
  constructor(private router: Router) {
    if (!this.token){
      console.log("[app.component.ts] - Token expirado");
      this.router.navigate(['login']);
    }else{
      console.log("[app.component.ts] - Token vigente");
      this.router.navigate(['dashboard']);
    }
  }
}
```

**Ejemplo de css dinámico**
```javascript
//Para aplicar .css a cada "módulo" por separado se agrega un styleUrls
@Component({
    selector: 'selector',
    templateUrl: 'template.html',
    styleUrls:  ['style.css']
})
//Por ejemplo, si se quiere aplicar un css al componente welcome
@Component({
    selector: 'welcome',
    templateUrl: 'app/landing/welcome.component.html',
    styleUrls:  ['css/welcome.css']
})
//Cuando no se especifica un ViewEncapsulation se activa el comportamiendo emulado de encapsulación de css
//Esto quiere decir que todas las clases definidas dentro del template se asignarán solo al componente y sus childs
```