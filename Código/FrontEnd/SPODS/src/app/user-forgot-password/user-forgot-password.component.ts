/**
 * Created by Usuario on 12/5/2017.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { Error } from '../shared/error';
import { TranslateService } from "ng2-translate";


@Component({
    selector: 'user-forgot-password',
    templateUrl: 'app/user-forgot-password/user-forgot-password.component.html',
    styleUrls:  ['css/user-forgot-password.css']
})
export class UserForgotPasswordComponent {
    errores: Error[] = [];
    mensajes: Error[] = [];
    message: string;



    constructor(private dataService: DataService, private router: Router, private translate: TranslateService) {
        this.message = "";
        this.errores = [];
        this.mensajes = [];
        this.cargarMensaje();
        this.cargarLenguaje();

    }

    cargarLenguaje() {

        this.translate.addLangs(['en', 'es']);
        if (localStorage.getItem('default_language') != null) {
            this.translate.setDefaultLang(localStorage.getItem('default_language'));
        }
        else {
            this.translate.setDefaultLang('en');
        }

        if (localStorage.getItem('selected_language') != null) {
            this.translate.use(localStorage.getItem('selected_language'));
        }
        else {
            this.translate.use(this.translate.getDefaultLang());
        }
    }
    Recover(email:string){

        this.dataService.postForgotPassword(email)
            .subscribe(
                res => this.RecoverPasswordOk(res),
                error => this.RecoverPasswordError(error),
                () => console.log("[user-forgot-password.component.ts] - RecoverPassword: Completed")
            );
    }

    cargarMensaje(){
        var mensaje: Error=new Error();
        mensaje.Descripcion="forgot-passwordMessage";
        this.mensajes.push(mensaje);

    }

    RecoverPasswordOk(response:any){
        console.log("[user-forgot-password.component.ts] - 1");
        console.log("[user-forgot-password.component.ts] - RecoverPasswordOk");
        this.mensajes = [];
        this.message="";
        this.errores = response.Errors;
        if(response.ErrorCode ==  200){
            var mensaje: Error=new Error();
            mensaje.Descripcion="Check your mail!. We have sent you an email with the steps to follow.//traduccion";

            this.mensajes.push(mensaje);
            console.log("[user-forgot-password.component.ts] - 2");
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    RecoverPasswordError(error:any){
        console.log("[user-forgot-password.ts] - RecoverPasswordError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    }
}