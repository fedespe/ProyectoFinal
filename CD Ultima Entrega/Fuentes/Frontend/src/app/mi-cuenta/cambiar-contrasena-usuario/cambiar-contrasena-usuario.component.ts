import { Component, ViewEncapsulation } from '@angular/core';
import { Router }                       from '@angular/router';
import { DataService }                  from '../../shared/services/data.service';
import { Utilidades }                   from "../../shared/utilidades";
import { Mensaje }                      from "../../shared/mensaje";
import { Error }                        from "../../shared/error";
import { Exito }                        from "../../shared/exito";
import { Cliente }                      from '../../shared/cliente';
import { Barrio }                       from '../../shared/barrio';
import {ActualizarContrasena}           from "../../shared/actualizarContrasena";

@Component({
    selector: 'cambiar-contrasena-usuario',
    templateUrl: 'app/mi-cuenta/cambiar-contrasena-usuario/cambiar-contrasena-usuario.component.html',
    styleUrls:  ['css/cambiar-contrasena-usuario.css']
})

export class CambiarContrasenaUsuarioComponent{
    mensajes : Mensaje = new Mensaje();
    loading : boolean = false;
    cliente : Cliente = new Cliente();
    actualizarContrasena : ActualizarContrasena = new ActualizarContrasena();

    constructor(private dataService: DataService, private router: Router) {
        this.cliente.NombreUsuario = localStorage.getItem('nombre-usuario');
        this.actualizarContrasena.IdUsuario = parseInt(localStorage.getItem('id-usuario'));
    }

    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    putActualizarContrasena() {
        this.borrarMensajes();
        this.loading = true;

        Utilidades.log("[cambiar-contrasena-usuario.component.ts] - putActualizarContrasena | this.cliente: " + JSON.stringify(this.cliente));

        this.mensajes.Errores = this.actualizarContrasena.validarCambioContrasena();

        if(this.mensajes.Errores.length == 0){
            this.dataService.putActualizarContrasena(this.actualizarContrasena)
            .subscribe(
                res => this.putActualizarContrasenaOk(res),
                error => this.putActualizarContrasenaError(error),
                () => Utilidades.log("[cambiar-contrasena-usuario.component.ts] - putActualizarContrasena: Completado")
            );
        }
        else{
            this.loading = false;
        }
        this.limpiarCampos();
    }
    
    putActualizarContrasenaOk(response:any){
        Utilidades.log("[cambiar-contrasena-usuario.component.ts] - putActualizarContrasenaOk | response: " + JSON.stringify(response));

        if(response.Codigo ==  200){
            Utilidades.log("[cambiar-contrasena-usuario.component.ts] - putActualizarContrasenaOk | response: " + JSON.stringify(response));
            var mensaje = new Exito();
            mensaje.Descripcion = "La contraseña ha sido atualizada con éxito.";
            this.mensajes.Exitos.push(mensaje);
        }
        else{
            Utilidades.log("[cambiar-contrasena-usuario.component.ts] - putActualizarContrasenaOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    }

    putActualizarContrasenaError(error:any){
        Utilidades.log("[cambiar-contrasena-usuario.component.ts] - postRegistroClienteError | error: " + JSON.stringify(error));
        var errorInesperado = new Error();
        errorInesperado.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(errorInesperado);
        this.loading = false;
    }

    limpiarCampos(){
        this.actualizarContrasena.Contrasena = "";
        this.actualizarContrasena.ContrasenaNueva = "";
        this.actualizarContrasena.ConfirmacionContrasenaNueva = ""; 
    }
}