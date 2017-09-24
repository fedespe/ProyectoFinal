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
    selector: 'listado-servicios-cliente',
    templateUrl: 'app/mi-cuenta/listado-ofertas-cliente/listado-ofertas-cliente.component.html',
    styleUrls:  ['css/listado-ofertas-cliente.css']
})

export class ListadoOfertasClienteComponent{
    mensajes: Mensaje = new Mensaje();
    loading : boolean = true;
    publicaciones: Publicacion[] = [];
    baseURL:string;

    constructor(private dataService: DataService, private router: Router) {
        this.obtenerPublicacionesCliente(parseInt(localStorage.getItem('id-usuario')));
        this.baseURL=Settings.srcImg;//ver que acá va la ruta del proyecto que contiene las imagenes
    }
    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }
    obtenerPublicacionesCliente(id:number){
        this.dataService.getObtenerPublicacionesClienteOferta(id)
            .subscribe(
            res => this.getObtenerPublicacionesClienteOfertaOk(res),
            error => this.getObtenerPublicacionesClienteOfertaError(error),
            () => Utilidades.log("[listado-servicios.component.ts] - getObtenerPublicacionesClienteOferta: Completado")
        );
    }
    getObtenerPublicacionesClienteOfertaOk(response:any){
        Utilidades.log("[[listado-servicios.component.ts] - getObtenerPublicacionesClienteOfertaOk | response: " + JSON.stringify(response));      
        if(response.Codigo ==  200){
            this.publicaciones = response.Objetos;
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    }
    getObtenerPublicacionesClienteOfertaError(responseError:any){
        Utilidades.log("[listado-servicios.component.ts] - getObtenerPublicacionesClienteOfertaError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    }
    desactivarPublicacion(input:any){
        Utilidades.log("[listado-servicios.component.ts] - desactivarPublicacion | responseError: " + JSON.stringify(input));
        this.dataService.getDesactivarPublicacion(input)
            .subscribe(
            res => this.getDesactivarPublicacionOk(res),
            error => this.getDesactivarPublicacionError(error),
            () => Utilidades.log("[listado-servicios.component.ts] - getDesactivarPublicacion: Completado")
        );
    }
    getDesactivarPublicacionOk(response:any){
        Utilidades.log("[[listado-servicios.component.ts] - getDesactivarPublicacionOk | response: " + JSON.stringify(response));      
        if(response.Codigo ==  200){
            this.obtenerPublicacionesCliente(parseInt(localStorage.getItem('id-usuario')));
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }
    getDesactivarPublicacionError(responseError:any){
        Utilidades.log("[listado-servicios.component.ts] - getDesactivarPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }
    activarPublicacion(input:any){
        Utilidades.log("[listado-servicios.component.ts] - activarPublicacion | responseError: " + JSON.stringify(input));
        this.dataService.getActivarPublicacion(input)
            .subscribe(
            res => this.getActivarPublicacionOk(res),
            error => this.getActivarPublicacionError(error),
            () => Utilidades.log("[listado-servicios.component.ts] - getActivarPublicacion: Completado")
        );
    }
    getActivarPublicacionOk(response:any){
        Utilidades.log("[[listado-servicios.component.ts] - getActivarPublicacionOk | response: " + JSON.stringify(response));      
        if(response.Codigo ==  200){
            this.obtenerPublicacionesCliente(parseInt(localStorage.getItem('id-usuario')));
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }
    getActivarPublicacionError(responseError:any){
        Utilidades.log("[listado-servicios.component.ts] - getActivarPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }
}