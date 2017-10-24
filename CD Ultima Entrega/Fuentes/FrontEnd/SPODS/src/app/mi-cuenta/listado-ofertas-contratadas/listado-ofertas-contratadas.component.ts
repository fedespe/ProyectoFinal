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
    selector: 'listado-ofertas-contratadas',
    templateUrl: 'app/mi-cuenta/listado-ofertas-contratadas/listado-ofertas-contratadas.component.html',
    styleUrls:  ['css/listado-ofertas-contratadas.css']
})

export class ListadoOfertasContratadasComponent{
    mensajes: Mensaje = new Mensaje();
    loading: boolean = true;
    baseURL: string;
    publicaciones: Publicacion[] = [];
    viendoTodas = true;
    mensajesComentario: Mensaje = new Mensaje();
    contactos: Contacto[] = [];
    comentarioPuntuacion: ComentarioPuntuacion = new ComentarioPuntuacion();

    constructor(private dataService: DataService, private router: Router) {
        this.baseURL=Settings.srcImg;//ver que acá va la ruta del proyecto que contiene las imagenes
        let idUsuario:number = parseInt(localStorage.getItem('id-usuario'));
        this.obtenerPublicacionesContratadasPorCliente(idUsuario);
        this.obtenerTodosContactosConComentariosPendientesOferta(idUsuario);
    }
    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
        this.mensajesComentario.Errores = [];
        this.mensajesComentario.Exitos = [];
    }
    obtenerPublicacionesContratadasPorCliente(id:number){
        this.dataService.getobtenerPublicacionesContratadasPorCliente(id)
            .subscribe(
            res => this.getobtenerPublicacionesContratadasPorClienteOk(res),
            error => this.getobtenerPublicacionesContratadasPorClienteError(error),
            () => Utilidades.log("[listado-ofertas-contratadas.component.ts] - getobtenerPublicacionesContratadasPorCliente: Completado")
        );
    }
    getobtenerPublicacionesContratadasPorClienteOk(response:any){
        Utilidades.log("[listado-ofertas-contratadas.component.ts] - getobtenerPublicacionesContratadasPorClienteOk | response: " + JSON.stringify(response));      
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
    getobtenerPublicacionesContratadasPorClienteError(responseError:any){
        Utilidades.log("[listado-ofertas-contratadas.component.ts] - getobtenerPublicacionesContratadasPorClienteError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    }
    obtenerTodosContactosConComentariosPendientesOferta(id:number){
        this.dataService.getobtenerTodosContactosConComentariosPendientesOferta(id)
            .subscribe(
            res => this.getobtenerTodosContactosConComentariosPendientesOfertaOk(res),
            error => this.getobtenerTodosContactosConComentariosPendientesOfertaError(error),
            () => Utilidades.log("[listado-ofertas-contratadas.component.ts] - getobtenerTodosContactosConComentariosPendientesOferta: Completado")
        );
    }
    getobtenerTodosContactosConComentariosPendientesOfertaOk(response:any){
        Utilidades.log("[listado-ofertas-contratadas.component.ts] - getobtenerTodosContactosConComentariosPendientesOfertaOk | response: " + JSON.stringify(response));      
        if(response.Codigo ==  200){
            this.contactos = response.Objetos;
            if(this.contactos.length == 0){
                this.viendoTodas = true;
            }
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }
    getobtenerTodosContactosConComentariosPendientesOfertaError(responseError:any){
        Utilidades.log("[listado-ofertas-contratadas.component.ts] - getobtenerTodosContactosConComentariosPendientesOfertaError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }
    cambiarVisualizacion(todas:boolean){
        this.viendoTodas = todas;
    }
    cargarModal(contacto:Contacto){
        this.comentarioPuntuacion=new ComentarioPuntuacion();
        this.comentarioPuntuacion.Publicacion=contacto.Publicacion;
        this.comentarioPuntuacion.Cliente.Id=parseInt(localStorage.getItem("id-usuario"));
        this.comentarioPuntuacion.Contacto=new Contacto();
        this.comentarioPuntuacion.Contacto.Id=contacto.Id;
        Utilidades.log("[listado-ofertas-contratadas.component.ts] - cargarModal | contacto: " + JSON.stringify(contacto));
    }
    guardarComentario(){
        this.borrarMensajes();
        
        Utilidades.log("[listado-ofertas-contratadas.component.ts] - guardarComentario | comentarioPuntuacion: " + JSON.stringify(this.comentarioPuntuacion));   
        this.mensajesComentario.Errores = this.comentarioPuntuacion.validarDatos();
        if(this.mensajesComentario.Errores.length==0){
            this.dataService.postIngresarComentario(this.comentarioPuntuacion)
                .subscribe(
                    res => this.postIngresarComentarioOk(res),
                    error => this.postIngresarComentarioError(error),
                    () => Utilidades.log("[listado-ofertas-contratadas.component.ts] - postIngresarComentario: Completado")
                );
        }   
   
    }
    postIngresarComentarioOk(response:any){
        Utilidades.log("[listado-ofertas-contratadas.component.ts] - postIngresarComentarioOk | response: " + JSON.stringify(response));

        if(response.Codigo ==  200){
            document.getElementById('btnModalClose').click();
            this.comentarioPuntuacion = new ComentarioPuntuacion();
            this.obtenerTodosContactosConComentariosPendientesOferta(parseInt(localStorage.getItem('id-usuario')));
        }
        else{
            Utilidades.log("[listado-ofertas-contratadas.component.ts] - postIngresarComentarioOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajesComentario.Errores.push(error);
        }
    }
    postIngresarComentarioError(responseError:any){
        Utilidades.log("[listado-ofertas-contratadas.component.ts] - postIngresarComentarioError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }
}