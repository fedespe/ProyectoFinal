import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilidades } from "../../shared/utilidades";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { Exito } from "../../shared/exito";
import { Cliente } from '../../shared/cliente';
import { Barrio } from '../../shared/barrio';
import {ActualizarContrasena} from "../../shared/actualizarContrasena";

@Component({
    selector: 'cambiar-contrasena-usuario',
    templateUrl: 'app/dashboard/cambiar-contrasena-usuario/cambiar-contrasena-usuario.component.html',
    styleUrls:  ['css/cambiar-contrasena-usuario.css']
})

export class CambiarContrasenaUsuarioComponent{
    mensajes: Mensaje = new Mensaje();
    cliente:Cliente = new Cliente();
    actualizarContrasena:ActualizarContrasena=new ActualizarContrasena();

    constructor(private dataService: DataService, private router: Router) {
        this.cliente.NombreUsuario=localStorage.getItem('nombre-usuario');
        this.actualizarContrasena.IdUsuario=parseInt(localStorage.getItem('id-usuario'));
        
    }
    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    putActualizarContrasena() {
        this.borrarMensajes();
        Utilidades.log("[registro-cliente.component.ts] - actualizarContrasena | this.cliente: " + JSON.stringify(this.cliente));

        this.mensajes.Errores = this.actualizarContrasena.validarCambioContrasena();

        if(this.mensajes.Errores.length == 0){
            this.dataService.putActualizarContrasena(this.actualizarContrasena)
            .subscribe(
                res => this.putActualizarContrasenaOk(res),
                error => this.putActualizarContrasenaError(error),
                () => Utilidades.log("[registro-cliente.component.ts] - actualizarContrasena: Completado")
            );
        }
    }

    putActualizarContrasenaOk(response:any){
        Utilidades.log("[registro-cliente.component.ts] - putActualizarContrasenaOk | response: " + JSON.stringify(response));

        if(response.Codigo ==  200){
            Utilidades.log("[registro-cliente.component.ts] - putActualizarContrasenaOk | response: " + JSON.stringify(response.Codigo));
            this.router.navigate(['/dashboard']);
        }
        else{
            Utilidades.log("[registro-cliente.component.ts] - putActualizarContrasenaOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    putActualizarContrasenaError(error:any){
        Utilidades.log("[registro-cliente.component.ts] - postRegistroClienteError | error: " + JSON.stringify(error));
        var errorInesperado = new Error();
        errorInesperado.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(errorInesperado);
    }
}