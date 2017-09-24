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
                this.dataService.putRecuperarPassword(this.correoElectronico)
                .subscribe(
                    res => this.putRecuperarPasswordOk(res),
                    error => this.putRecuperarPasswordError(error),
                    () => Utilidades.log("[olvido-password.component.ts] - putRecuperarPassword: Completado")
                );
            }
        }
    }

    putRecuperarPasswordOk(response:any){
        Utilidades.log("[olvido-password.component.ts] - putRecuperarPasswordOk | response: " + JSON.stringify(response));

        if(response.Codigo ==  200){
            var exito = new Exito();
            exito.Descripcion = "Se le ha enviado un correo con la nueva contraseña. Sugerimos cambiarla una vez que haya iniciado sesión.";
            this.mensajes.Exitos.push(exito);
        }
        else{
            Utilidades.log("[olvido-password.component.ts] - putRecuperarPasswordOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    }

    putRecuperarPasswordError(responseError:any){
        Utilidades.log("[olvido-password.component.ts] - putRecuperarPasswordError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    }
}