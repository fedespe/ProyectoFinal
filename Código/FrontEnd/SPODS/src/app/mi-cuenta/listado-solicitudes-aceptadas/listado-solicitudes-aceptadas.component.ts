import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilidades } from "../../shared/utilidades";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { Exito } from "../../shared/exito";
import { Servicio } from "../../shared/servicio";
import { Settings } from "../../shared/settings";
import { Solicitud } from "../../shared/solicitud";

@Component({
    selector: 'listado-solicitudes-aceptadas',
    templateUrl: 'app/mi-cuenta/listado-solicitudes-aceptadas/listado-solicitudes-aceptadas.component.html',
    styleUrls:  ['css/listado-solicitudes-aceptadas.css']
})

export class ListadoSolicitudesAceptadasComponent{
    mensajes: Mensaje = new Mensaje();
    baseURL:string;
    loading : boolean = true;
    solicitudesAceptadas: Solicitud[] = [];

    constructor(private dataService: DataService, private router: Router) {
        let idUsuario = parseInt(localStorage.getItem("id-usuario"));
        this.obtenerSolicitudesAceptadas(idUsuario);
        this.baseURL = Settings.srcImg;//ver que acá va la ruta del proyecto que contiene las imagenes
    }
    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }
    obtenerSolicitudesAceptadas(id:number){
        this.dataService.getObtenerSolicitudesAceptadas(id)
            .subscribe(
            res => this.getObtenerSolicitudesAceptadasOk(res),
            error => this.getObtenerSolicitudesAceptadasError(error),
            () => Utilidades.log("[listado-solicitudes-aceptadas.component.ts] - getObtenerSolicitudesAceptadas: Completado")
        );
    }
    getObtenerSolicitudesAceptadasOk(response:any){
        Utilidades.log("[listado-solicitudes-aceptadas.component.ts] - getObtenerSolicitudesAceptadasOk | response: " + JSON.stringify(response));      
        if(response.Codigo ==  200){
            this.solicitudesAceptadas = response.Objetos;
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    }
    getObtenerSolicitudesAceptadasError(responseError:any){
        Utilidades.log("[listado-solicitudes-aceptadas.component.ts] - getObtenerSolicitudesAceptadasError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    }
}