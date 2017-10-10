import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilidades } from "../../shared/utilidades";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { Exito } from "../../shared/exito";
import { Servicio } from "../../shared/servicio";
import { Settings } from "../../shared/settings";

@Component({
    selector: 'listado-solicitudes',
    templateUrl: 'app/dashboard/listado-solicitudes/listado-solicitudes.component.html',
    styleUrls:  ['css/listado-solicitudes.css']
})

export class ListadoSolicitudesComponent{
    mensajes: Mensaje = new Mensaje();
    servicios: Servicio[] = [];
    baseURL:string;
    constructor(private dataService: DataService, private router: Router) {
        this.obtenerServicios();
        this.baseURL=Settings.srcImg;//ver que acá va la ruta del proyecto que contiene las imagenes
    }
    
    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }
    
    obtenerServicios(){
        this.dataService.getServicioObtenerTodos()
            .subscribe(
            res => this.getServicioObtenerTodosOk(res),
            error => this.getServicioObtenerTodosError(error),
            () => Utilidades.log("[listado-solicitudes.component.ts] - obtenerServicios: Completado")
        );
    }

    getServicioObtenerTodosOk(response:any){
        Utilidades.log("[listado-solicitudes.component.ts] - getServicioObtenerTodosOk | response: " + JSON.stringify(response));
        this.servicios = response.Objetos;
        if(response.Codigo ==  200){
            
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getServicioObtenerTodosError(responseError:any){
        Utilidades.log("[listado-solicitudes.component.ts] - getServicioObtenerTodosError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    
}