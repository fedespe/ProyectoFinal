import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilidades } from "../../shared/utilidades";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { Exito } from "../../shared/exito";
import { Servicio } from "../../shared/servicio";
import { Settings } from "../../shared/settings";
import { Publicacion } from "../../shared/publicacion";

@Component({
    selector: 'listado-solicitudes-cliente',
    templateUrl: 'app/dashboard/listado-solicitudes-cliente/listado-solicitudes-cliente.component.html',
    styleUrls:  ['css/listado-solicitudes-cliente.css']
})

export class ListadoSolicitudesClienteComponent{
    mensajes: Mensaje = new Mensaje();
    publicaciones: Publicacion[] = [];
    baseURL:string;
    constructor(private dataService: DataService, private router: Router) {
        this.obtenerSolicitudesCliente(parseInt(localStorage.getItem('id-usuario')));
        this.baseURL=Settings.srcImg;//ver que acá va la ruta del proyecto que contiene las imagenes
    }

    
    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }
    
    obtenerSolicitudesCliente(id:number){
        this.dataService.getObtenerPublicacionesClienteSolicitud(id)
            .subscribe(
            res => this.getObtenerPublicacionesClienteSolicitudOk(res),
            error => this.getObtenerPublicacionesClienteSolicitudError(error),
            () => Utilidades.log("[listado-solicitudes-cliente.component.ts] - getObtenerPublicacionesClienteSolicitud: Completado")
        );
    }

    getObtenerPublicacionesClienteSolicitudOk(response:any){
        Utilidades.log("[listado-solicitudes-cliente.component.ts] - getObtenerPublicacionesClienteSolicitudOk | response: " + JSON.stringify(response));      
        if(response.Codigo ==  200){
            this.publicaciones = response.Objetos;
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getObtenerPublicacionesClienteSolicitudError(responseError:any){
        Utilidades.log("[listado-solicitudes-cliente.component.ts] - getObtenerPublicacionesClienteSolicitudError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    desactivarPublicacion(input:any){
        Utilidades.log("[listado-solicitudes-cliente.component.ts] - desactivarPublicacion | responseError: " + JSON.stringify(input));
        this.dataService.getDesactivarPublicacion(input)
            .subscribe(
            res => this.getDesactivarPublicacionOk(res),
            error => this.getDesactivarPublicacionError(error),
            () => Utilidades.log("[listado-solicitudes-cliente.component.ts] - getDesactivarPublicacion: Completado")
        );
    }

    getDesactivarPublicacionOk(response:any){
        Utilidades.log("[listado-solicitudes-cliente.component.ts] - getDesactivarPublicacionOk | response: " + JSON.stringify(response));      
        if(response.Codigo ==  200){
            this.obtenerSolicitudesCliente(parseInt(localStorage.getItem('id-usuario')));
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getDesactivarPublicacionError(responseError:any){
        Utilidades.log("[listado-solicitudes-cliente.component.ts] - getDesactivarPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    activarPublicacion(input:any){
        Utilidades.log("[listado-solicitudes-cliente.component.ts] - activarPublicacion | responseError: " + JSON.stringify(input));
        this.dataService.getActivarPublicacion(input)
            .subscribe(
            res => this.getActivarPublicacionOk(res),
            error => this.getActivarPublicacionError(error),
            () => Utilidades.log("[listado-solicitudes-cliente.component.ts] - getActivarPublicacion: Completado")
        );
    }

    getActivarPublicacionOk(response:any){
        Utilidades.log("[listado-solicitudes-cliente.component.ts] - getActivarPublicacionOk | response: " + JSON.stringify(response));      
        if(response.Codigo ==  200){
            this.obtenerSolicitudesCliente(parseInt(localStorage.getItem('id-usuario')));
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getActivarPublicacionError(responseError:any){
        Utilidades.log("[listado-solicitudes-cliente.component.ts] - getActivarPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }
    
}