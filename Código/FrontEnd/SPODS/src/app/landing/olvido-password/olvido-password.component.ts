import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilidades } from "../../shared/utilidades";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { Exito } from "../../shared/exito";

@Component({
    selector: 'olvido-password',
    templateUrl: 'app/landing/olvido-password/olvido-password.component.html',
    styleUrls:  ['css/olvido-password.css']
})

export class OlvidoPasswordComponent{
    mensajes : Mensaje = new Mensaje();
    correoElectronico : string = "";
    loading : boolean = false;

    constructor(private dataService: DataService, private router: Router) {
    }
    
    /*navegarRegistroCliente(){
        this.router.navigateByUrl('/registro-cliente');
    }*/

    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    recuperarPassword(){
        this.loading = true;
        this.borrarMensajes();
        if(this.correoElectronico.trim() == ""){
            var error = new Error();
            error.Descripcion = "Debe ingresar un correo electrónico.";
            this.mensajes.Errores.push(error);
            this.loading = false;
        }
        else{
            var regExp = new RegExp("\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*");
            var test = regExp.test(this.correoElectronico);
            if(!test){
                var error = new Error();
                error.Descripcion = "Debe ingresar un correo electrónico válido.";
                this.mensajes.Errores.push(error);
                this.loading = false;
            }
            else{
                //Una vez implementado el servicio, todo lo que está sin comentar se debe comentar y viceversa
                this.loading = false;
                var exito = new Exito();
                exito.Descripcion = "Llamar al servicio de recuperación de password.";
                this.mensajes.Exitos.push(exito);
                /*this.dataService.postRecuperarPassword(this.correoElectronico)
                .subscribe(
                    res => this.postRecuperarPasswordOk(res),
                    error => this.postRecuperarPasswordError(error),
                    () => Utilidades.log("[olvido-password.component.ts] - postRecuperarPassword: Completado")
                );*/
            }
        }
    }

    postRecuperarPasswordOk(response:any){
        Utilidades.log("[olvido-password.component.ts] - postRecuperarPasswordOk | response: " + JSON.stringify(response));

        if(response.Codigo ==  200){
            
        }
        else{
            Utilidades.log("[olvido-password.component.ts] - postRecuperarPasswordOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    }

    postRecuperarPasswordError(responseError:any){
        Utilidades.log("[olvido-password.component.ts] - postRecuperarPasswordError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    }
}