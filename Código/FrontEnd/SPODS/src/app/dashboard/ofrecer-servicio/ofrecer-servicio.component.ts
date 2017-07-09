import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilidades } from "../../shared/utilidades";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { Exito } from "../../shared/exito";
import { Servicio } from "../../shared/servicio";
import { Publicacion } from "../../shared/publicacion";
import { Respuesta } from "../../shared/respuesta";


@Component({
    selector: 'ofrecer-servicio',
    templateUrl: 'app/dashboard/ofrecer-servicio/ofrecer-servicio.component.html',
    styleUrls:  ['css/ofrecer-servicio.css']
})

export class OfrecerServicioComponent{
    mensajes: Mensaje = new Mensaje();
    servicios: Servicio[] = [];
    publicacion: Publicacion = new Publicacion();
    servicioSeleccionado: Servicio = new Servicio();
    respuestas: string[] = [];

    constructor(private dataService: DataService, private router: Router) {
        this.publicacion.Cliente.Id=parseInt(localStorage.getItem('id-usuario'));
        this.publicacion.Cliente.NombreUsuario=localStorage.getItem('nombre-usuario');
        this.publicacion.Activa=true;
        this.publicacion.Tipo="OFERTA";
        this.publicacion.Servicio.Id=0;
        this.obtenerServicios();

        //Solo prueba
        this.publicacion.Imagenes.push("PUBLICACIONPRUEBAANGULAR_IMG1.jpg");
        this.publicacion.Imagenes.push("PUBLICACIONPRUEBAANGULAR_IMG2.jpg");
        this.publicacion.Imagenes.push("PUBLICACIONPRUEBAANGULAR_IMG3.jpg");
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
            () => Utilidades.log("[ofrecer-servicio.component.ts] - obtenerServicios: Completado")
        );
    }

    getServicioObtenerTodosOk(response:any){
        Utilidades.log("[[ofrecer-servicio.component.ts] - obtenerServiciosOk | response: " + JSON.stringify(response));
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
        Utilidades.log("[ofrecer-servicio.component.ts] - obtenerServiciosError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    seleccionServicio(){       
        if(this.publicacion.Servicio.Id!=0){
            this.respuestas=[]; 
            this.obtenerServicio(this.publicacion.Servicio.Id);
        }else{
            this.servicioSeleccionado=new Servicio();
        }      
    }

    obtenerServicio(id:number){
        this.dataService.getObtenerServicio(id)
            .subscribe(
            res => this.getObtenerServicioOk(res),
            error => this.getObtenerServicioError(error),
            () => Utilidades.log("[ofrecer-servicio.component.ts] - obtenerServicio: Completado")
        );
    }

    getObtenerServicioOk(response:any){      
        Utilidades.log("[[ofrecer-servicio.component.ts] - obtenerServicioOk | response: " + JSON.stringify(this.servicioSeleccionado));
        if(response.Codigo ==  200){
            this.servicioSeleccionado = response.Objetos[0];
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getObtenerServicioError(responseError:any){
        Utilidades.log("[ofrecer-servicio.component.ts] - obtenerServicioError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    postAltaPublicacion(){
        Utilidades.log("[ofrecer-servicio.component.ts] - postAltaPublicacion | responseError: " + JSON.stringify(this.respuestas));
        this.mensajes.Errores = this.publicacion.validarDatos();
        if(this.mensajes.Errores.length==0){
            // for (var i = 0; i < this.respuestas.length; i++) {
            //     if(this.respuestas[i]!=null){
            //         var r = new Respuesta();
            //         r.Pregunta.Id=i;
            //         r.UnaRespuesta=this.respuestas[i];
            //         this.publicacion.Respuestas.push(r);
            //     }
            // } 
            for (var i = 0; i < this.servicioSeleccionado.Preguntas.length; i++) {
                if(this.servicioSeleccionado.Preguntas[i].UnaRespuesta!=null && this.servicioSeleccionado.Preguntas[i].UnaRespuesta!=""){
                    var r = new Respuesta();
                    r.Pregunta.Id=this.servicioSeleccionado.Preguntas[i].Id;
                    r.UnaRespuesta=this.servicioSeleccionado.Preguntas[i].UnaRespuesta;
                    this.publicacion.Respuestas.push(r);
                }              
            } 
            Utilidades.log("[ofrecer-servicio.component.ts] - postAltaPublicacion | responseError: " + JSON.stringify(this.publicacion));
            this.dataService.postAltaPublicacion(this.publicacion)
                .subscribe(
                res => this.postAltaPublicacionOk(res),
                error => this.postAltaPublicacionError(error),
                () => Utilidades.log("[ofrecer-servicio.component.ts] - postAltaPublicacion: Completado")
            );
        }
        
    }

    postAltaPublicacionOk(response:any){  
        if(response.Codigo ==  200){
            this.router.navigate(['dashboard/listado-servicios-cliente']);
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    postAltaPublicacionError(responseError:any){
        Utilidades.log("[ofrecer-servicio.component.ts] - postAltaPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }



}