import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { TranslateService } from "ng2-translate";
import { Error } from '../shared/error';

@Component({
    selector: 'login',
    templateUrl: 'app/login/login.component.html',
    styleUrls:  ['css/login.css']
})

export class LoginComponent implements OnInit{
    errores: Error[] = [];
    message:string;
    
    constructor(private dataService: DataService, private router: Router, private translate: TranslateService) {
        this.message = "";
        this.errores = [];
        this.cargarLenguaje();
    }

    ngOnInit() {

        if(localStorage.getItem('access_token') != null) {
            var accessToken : string = localStorage.getItem("access_token");

            if(accessToken != ""){
                this.router.navigate(['dashboard/overview']);
            }
        }
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

    public iniciarSesion(username:string, password:string){
        this.controlarErrores(username, password);
        if(this.errores.length == 0){
            this.accessToken(username, password);
        }
    }

    controlarErrores(username:string, password:string){
        var er: Error;

        if(username == ""){
            er = new Error();
            er.Descripcion = "Debe ingresar un nombre.";
            this.errores.push(er);
        }
        if(password == ""){
            er = new Error();
            er.Descripcion = "Debe ingresar una contraseña.";
            this.errores.push(er);
        }
    }
    
    accessToken(username:string, password:string) {
        this.dataService.postAccessToken(username, password)
            .subscribe(
                res => this.parseAccessTokenOk(res),
                error => this.parseAccessTokenError(error),
                () => console.log("[login.component.ts] - accessToken: Completed")
            );
    }
    
    parseAccessTokenOk(oauth:any){
        console.log("[login.component.ts] - parseAccessTokenOk: " + oauth.access_token);
        localStorage.setItem('access_token', oauth.access_token);
        this.dataService.ini();
        this.cargarTipoUsuario();
    }
    
    parseAccessTokenError(error:any){
        console.log("[login.component.ts] - parseAccessTokenError: " + JSON.stringify(error));
        this.message = "Login error";
    }

    cargarTipoUsuario(){
        this.dataService.postUsuario()
            .subscribe(
                res => this.parseUsuarioOk(res),
                error => this.parseUsuarioError(error),
                () => console.log("[login.component.ts] - cargarTipoUsuario: Completed")
            );
    }

    parseUsuarioOk(response:any){
        console.log("[login.component.ts] - parseUsuarioOk");

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
        console.log("[login.component.ts] - parseUsuarioError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    }

    goClientRegister(){
        this.router.navigateByUrl('/registro-cliente');
    }
    goRendererRegister(){
        this.router.navigateByUrl('/renderer-register');
    }
    goForgotPassword(){
        this.router.navigateByUrl('/user-forgot-password')
    }
}