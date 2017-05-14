/**
 * Created by Bruno on 10/04/2017.
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { Error } from '../shared/error';
import { Pais } from '../shared/pais';
import { Usuario } from '../shared/usuario';
import { Cliente } from '../shared/cliente';
import { TranslateService } from "ng2-translate";

@Component({
    selector: 'client-register',
    templateUrl: 'app/client-register/client-register.component.html',
    styleUrls:  ['css/client-register.css']
})
export class ClientRegisterComponent {
    errores: Error[] = [];
    message:string;
    public paises: Pais[] = [];
    usuario:Usuario;
    cliente:Cliente;

    constructor(private dataService: DataService, private router: Router, private translate: TranslateService) {
        this.cargarLenguaje();
        this.message = "";
        this.errores = [];
        this.paises = [];
    }

    cargarLenguaje(){
        this.translate.addLangs(['en', 'es']);
        if(localStorage.getItem('default_language') != null) {
            this.translate.setDefaultLang(localStorage.getItem('default_language'));
        }
        else{
            this.translate.setDefaultLang('en');
        }

        if(localStorage.getItem('selected_language') != null) {
            this.translate.use(localStorage.getItem('selected_language'));
        }
        else{
            this.translate.use(this.translate.getDefaultLang());
        }
    }

    cargarPaises(){
        console.log("[client-register.component.ts] - cargarPaises");
        this.dataService.postPais()
            .subscribe(
                res => this.parsePaisOk(res),
                error => this.parsePaisError(error),
                () => console.log("[client-register.component.ts]- cargarPaises: Completed")
            );
    }

    parsePaisOk(response:any){
        console.log("[client-register.component.ts] - parsePaisOk | response: " + JSON.stringify(response));

        this.message="";
        this.errores = response.Errors;
        if(response.ErrorCode ==  200){
            this.paises = response.SDTPaisCollection;
            console.log(JSON.stringify(this.paises));
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parsePaisError(error:any){
        console.log("There was an error loading the counties.");
        console.log("[client-register.component.ts] - parsePaisError: " + JSON.stringify(error));
    }

    clientRegister(nombre:string, apellido:string, email:string, city:string, website:string, paisId: string, password:string, empresa:string,rubro:string) {
        console.log("[client-register.component.ts] - clientRegister : " + nombre + " / " + apellido + " / " + email + " / " + city + " / " + website + " / " + paisId + " / " + password+ " / " + empresa+ " / " + rubro);
        this.usuario = new Usuario(nombre, apellido, email, website, "CLIENTE",paisId,city, password);
        this.cliente = new Cliente(empresa,rubro);
        this.dataService.postClientRegister(this.usuario,this.cliente)
                .subscribe(
                res => this.parseClientRegisterOk(res,email, password),
                error => this.parseClientRegisterError(error),
                () => console.log("[client-register.component.ts] - clientRegister: Completed")
            );
}

    parseClientRegisterOk(response:any, email:string, password:string){
        console.log("[client-register.component.ts] - parseClientRegisterOk | response: " + JSON.stringify(response));
        this.message="";
        this.errores = response.Errors;

        if(response.ErrorCode ==  200){
            this.iniciarSesion(email, password);
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parseClientRegisterError(error:any){
        console.log("[client-register.component.ts] - parseClientRegisterError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    }

    iniciarSesion(username:string, password:string){
        this.dataService.postAccessToken(username, password)
            .subscribe(
                res => this.parseIniciarSesionOk(res),
                error => this.parseIniciarSesionError(error),
                () => console.log("[client-register.component.ts] - accessToken: Completed")
            );
    }

    parseIniciarSesionOk(oauth:any){
        console.log("[client-register.component.ts] - parseIniciarSesionOk: " + oauth.access_token);
        localStorage.setItem('access_token', oauth.access_token);
        this.dataService.ini();
        this.cargarTipoUsuario();
    }

    parseIniciarSesionError(error:any){
        console.log("[client-register.component.ts] - parseIniciarSesionError: " + JSON.stringify(error));
        this.message = "Login error";
    }

    cargarTipoUsuario(){
        this.dataService.postUsuario()
            .subscribe(
                res => this.parseUsuarioOk(res),
                error => this.parseUsuarioError(error),
                () => console.log("[client-register.component.ts] - cargarTipoUsuario: Completed")
            );
    }

    parseUsuarioOk(response:any){
        console.log("[client-register.component.ts] - parseUsuarioOk");

        this.message="";
        this.errores = response.Errors;
        if(response.ErrorCode ==  200){
            localStorage.setItem('user_type',response.SDTUsuario.TipoUsuario);
            //this.router.navigate(['dashboard']);
            this.router.navigate(['dashboard/overview']);
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parseUsuarioError(error:any){
        console.log("[client-register.component.ts] - parseUsuarioError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    }
}