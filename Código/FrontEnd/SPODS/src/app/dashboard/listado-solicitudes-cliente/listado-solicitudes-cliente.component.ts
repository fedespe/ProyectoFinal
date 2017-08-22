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
import { ComentarioPuntuacion } from "../../shared/comentarioPuntuacion";

@Component({
    selector: 'listado-solicitudes-cliente',
    templateUrl: 'app/dashboard/listado-solicitudes-cliente/listado-solicitudes-cliente.component.html',
    styleUrls:  ['css/listado-solicitudes-cliente.css']
})

export class ListadoSolicitudesClienteComponent{
    mensajes: Mensaje = new Mensaje();
    mensajesComentario: Mensaje = new Mensaje();
    publicaciones: Publicacion[] = [];
    baseURL:string;
    contactos:Contacto[]=[]

    comentarioPuntuacion: ComentarioPuntuacion= new ComentarioPuntuacion();
    puntaje:number=0;


    constructor(private dataService: DataService, private router: Router) {
        this.obtenerSolicitudesCliente(parseInt(localStorage.getItem('id-usuario')));
        this.baseURL=Settings.srcImg;//ver que acá va la ruta del proyecto que contiene las imagenes
        this.obtenerTodosContactosConComentariosPendientesSolicitud(parseInt(localStorage.getItem('id-usuario')));
    }

    
    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
        this.mensajesComentario.Errores = [];
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

    obtenerTodosContactosConComentariosPendientesSolicitud(id:number){
        this.dataService.getobtenerTodosContactosConComentariosPendientesSolicitud(id)
            .subscribe(
            res => this.getobtenerTodosContactosConComentariosPendientesSolicitudOk(res),
            error => this.getobtenerTodosContactosConComentariosPendientesSolicitudError(error),
            () => Utilidades.log("[listado-publicaciones-contratadas.component.ts] - obtenerTodosContactosConComentariosPendientesSolicitud: Completado")
        );
    }

    getobtenerTodosContactosConComentariosPendientesSolicitudOk(response:any){
        Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerTodosContactosConComentariosPendientesSolicitudOk | response: " + JSON.stringify(response));      
        if(response.Codigo ==  200){
            this.contactos = response.Objetos;
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getobtenerTodosContactosConComentariosPendientesSolicitudError(responseError:any){
        Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerTodosContactosConComentariosPendientesSolicitudError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    activarModal(input:any){
        document.getElementById('btnModal').click();
        this.comentarioPuntuacion.Publicacion=input.Publicacion;//al contrario de la oferta quien realiza el comentario es el due'o de la publicacion
        this.comentarioPuntuacion.Cliente.Id=input.Cliente.Id;//al contrario de la oferta quien recibe el comentario es el que realiza el trabajo
        this.comentarioPuntuacion.Contacto=new Contacto();
        this.comentarioPuntuacion.Contacto.Id=input.Id;
        Utilidades.log("[listado-publicaciones-contratadas.component.ts] - activarModal | contacto: " + JSON.stringify(input));

    }
    actualizarPuntaje(input:any){
        this.puntaje=input;
        Utilidades.log("[listado-publicaciones-contratadas.component.ts] - actualizarPuntaje | puntaje: " + JSON.stringify(this.puntaje));
    }

    guardarComentario(){
        this.borrarMensajes();
        this.comentarioPuntuacion.Puntuacion=this.puntaje;

        Utilidades.log("[ver-publicacion-ofrecida.component.ts] - guardarComentario | comentarioPuntuacion: " + JSON.stringify(this.comentarioPuntuacion));   
        this.mensajesComentario.Errores=this.comentarioPuntuacion.validarDatos();
        if(this.mensajesComentario.Errores.length==0){
            this.dataService.postIngresarComentario(this.comentarioPuntuacion)
                .subscribe(
                    res => this.postIngresarComentarioOk(res),
                    error => this.postIngresarComentarioError(error),
                    () => Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postIngresarComentario: Completado")
                );
        }   
    }
    postIngresarComentarioOk(response:any){
        Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postIngresarComentarioOk | response: " + JSON.stringify(response));

        if(response.Codigo ==  200){
            document.getElementById('btnModalClose').click();
            this.obtenerTodosContactosConComentariosPendientesSolicitud(parseInt(localStorage.getItem('id-usuario')));
        }
        else{
            Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postIngresarComentarioOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajesComentario.Errores.push(error);
        }
    }

    postIngresarComentarioError(responseError:any){
        Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postIngresarComentarioError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }


}