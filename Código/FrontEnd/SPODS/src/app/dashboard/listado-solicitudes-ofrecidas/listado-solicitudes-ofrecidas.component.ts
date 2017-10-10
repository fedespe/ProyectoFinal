import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilidades } from "../../shared/utilidades";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { Exito } from "../../shared/exito";
import { Servicio } from "../../shared/servicio";
import { Publicacion } from "../../shared/publicacion";
import { Respuesta } from "../../shared/respuesta";
import { ActivatedRoute } from '@angular/router'; 
import { Settings } from "../../shared/settings"; 


@Component({
    selector: 'listado-solicitudes-ofrecidas',
    templateUrl: 'app/dashboard/listado-solicitudes-ofrecidas/listado-solicitudes-ofrecidas.component.html',
    styleUrls:  ['css/listado-solicitudes-ofrecidas.css']
})

export class ListadoSolicitudesOfrecidasComponent implements OnInit{
    mensajes: Mensaje = new Mensaje();
    nombreServicio:string;
    publicaciones: Publicacion[] = [];
    idServicio:number;
    baseURL:string;
    idUsuario:number=parseInt(localStorage.getItem('id-usuario'));

    constructor(private dataService: DataService, private router: Router,private route: ActivatedRoute) {
         this.baseURL=Settings.srcImg;//ver que acá va la ruta del proyecto que contiene las imagenes
    }

    ngOnInit() {
        // subscripción al observable params
        this.route.params
        .subscribe(params => {
            this.idServicio = parseInt(params['id']);
            Utilidades.log("[listado-solicitudes-ofrecidas.component.ts] - ngOnInit | idServicio: " + JSON.stringify(this.idServicio));   
        });
        this.obtenerSolicitudesServicio();       
    }

    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    obtenerSolicitudesServicio(){
         Utilidades.log("[listado-solicitudes-ofrecidas.component.ts] - obtenerSolicitudesServicio | idServicio: " + JSON.stringify(this.idServicio));
        this.dataService.getPublicacionesServicioSolicitud(this.idServicio)
            .subscribe(
            res => this.getPublicacionesServicioSolicitudOk(res),
            error => this.getPublicacionesServicioSolicitudError(error),
            () => Utilidades.log("[listado-solicitudes-ofrecidas.component.ts] - obtenerSolicitudesServicio: Completado")
        );
    }

    getPublicacionesServicioSolicitudOk(response:any){
        Utilidades.log("[listado-solicitudes-ofrecidas.component.ts] - getPublicacionesServicioSolicitudOk | response: " + JSON.stringify(response));       
        if(response.Codigo ==  200){
            this.publicaciones = response.Objetos;     
            if(this.publicaciones.length>0){
                this.nombreServicio=this.publicaciones[0].Servicio.Nombre;
            }else{
                this.nombreServicio="No se encontraron publicaciones para dicho servicio."
            }             
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getPublicacionesServicioSolicitudError(responseError:any){
        Utilidades.log("[listado-solicitudes-ofrecidas.component.ts] - getPublicacionesServicioSolicitudError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }


}