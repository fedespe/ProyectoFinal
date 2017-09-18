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
import { Contacto } from "../../shared/contacto";

@Component({
    selector: 'listado-publicaciones-contratadas',
    templateUrl: 'app/mi-cuenta/listado-publicaciones-contratadas/listado-publicaciones-contratadas.component.html',
    styleUrls:  ['css/listado-publicaciones-contratadas.css']
})

export class ListadoPublicacionesContratadasComponent{
    mensajes: Mensaje = new Mensaje();
    publicaciones: Publicacion[] = [];
    baseURL:string;
    contactos:Contacto[]=[]


    constructor(private dataService: DataService, private router: Router) {
        this.obtenerPublicacionesContratadasPorCliente(parseInt(localStorage.getItem('id-usuario')));
        this.baseURL=Settings.srcImg;//ver que acá va la ruta del proyecto que contiene las imagenes
        this.obtenerTodosContactosConComentariosPendientesOferta(parseInt(localStorage.getItem('id-usuario')));
    }

    
    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }
    
    obtenerPublicacionesContratadasPorCliente(id:number){
        this.dataService.getobtenerPublicacionesContratadasPorCliente(id)
            .subscribe(
            res => this.getobtenerPublicacionesContratadasPorClienteOk(res),
            error => this.getobtenerPublicacionesContratadasPorClienteError(error),
            () => Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerPublicacionesContratadasPorCliente: Completado")
        );
    }

    getobtenerPublicacionesContratadasPorClienteOk(response:any){
        Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerPublicacionesContratadasPorClienteOk | response: " + JSON.stringify(response));      
        if(response.Codigo ==  200){
            this.publicaciones = response.Objetos;
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getobtenerPublicacionesContratadasPorClienteError(responseError:any){
        Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerPublicacionesContratadasPorClienteError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    obtenerTodosContactosConComentariosPendientesOferta(id:number){
        this.dataService.getobtenerTodosContactosConComentariosPendientesOferta(id)
            .subscribe(
            res => this.getobtenerTodosContactosConComentariosPendientesOfertaOk(res),
            error => this.getobtenerTodosContactosConComentariosPendientesOfertaError(error),
            () => Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerTodosContactosConComentariosPendientesOferta: Completado")
        );
    }

    getobtenerTodosContactosConComentariosPendientesOfertaOk(response:any){
        Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerTodosContactosConComentariosPendientesOfertaOk | response: " + JSON.stringify(response));      
        if(response.Codigo ==  200){
            this.contactos = response.Objetos;
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getobtenerTodosContactosConComentariosPendientesOfertaError(responseError:any){
        Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerTodosContactosConComentariosPendientesOfertaError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

}