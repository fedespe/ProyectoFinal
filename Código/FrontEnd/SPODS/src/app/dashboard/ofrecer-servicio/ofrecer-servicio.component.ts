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
import { Respuesta } from "../../shared/respuesta";


@Component({
    selector: 'ofrecer-servicio',
    templateUrl: 'app/dashboard/ofrecer-servicio/ofrecer-servicio.component.html',
    styleUrls:  ['css/ofrecer-servicio.css']
})

export class OfrecerServicioComponent{
    mensajes: Mensaje = new Mensaje();
    loading:boolean = true;
    servicios: Servicio[] = [];
    publicacion: Publicacion = new Publicacion();
    servicioSeleccionado: Servicio = new Servicio();
    respuestas: string[] = [];
    step:number=1;
    urlImagen:string=Settings.srcImg+"/Oferta/IngresarImagenes";

    constructor(private dataService: DataService, private router: Router) {
        this.obtenerServicios();
        this.publicacion.Cliente.Id=parseInt(localStorage.getItem('id-usuario'));
        this.publicacion.Cliente.NombreUsuario=localStorage.getItem('nombre-usuario');
        this.publicacion.Activa=true;
        this.publicacion.Tipo="OFERTA";
        this.publicacion.Servicio.Id=0;
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
        if(response.Codigo ==  200){
            this.servicios = response.Objetos;
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    }
    getServicioObtenerTodosError(responseError:any){
        Utilidades.log("[ofrecer-servicio.component.ts] - obtenerServiciosError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    }
    ofrecerServicioPaso1(){
        this.borrarMensajes(),
        this.mensajes.Errores = this.publicacion.validarDatos1();
        if(this.mensajes.Errores.length == 0){
            this.step=2;
        }
    }
    ofrecerServicioPaso2(){
        this.loading = true;
        this.postAltaPublicacion();
        this.step=3;
    }
    volverPaso1(){
        this.step=1;
    }
    ofrecerServicioPaso3(){
        var exito = new Exito();
        exito.Descripcion = "La publicación ha sido realizada con éxito.";
        this.mensajes.Exitos.push(exito);
        this.step=1;
    }
    seleccionServicio(){
        this.loading=true;
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
        this.loading = false;
    }
    getObtenerServicioError(responseError:any){
        Utilidades.log("[ofrecer-servicio.component.ts] - obtenerServicioError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    }
    postAltaPublicacion(){
        Utilidades.log("[ofrecer-servicio.component.ts] - postAltaPublicacion | responseError: " + JSON.stringify(this.respuestas));
        //this.mensajes.Errores = this.publicacion.validarDatos();
        //if(this.mensajes.Errores.length==0){
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
        //}
    }
    postAltaPublicacionOk(response:any){  
        if(response.Codigo ==  200){
            this.obtenerUtlimaPublicacioncliente();
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
    obtenerUtlimaPublicacioncliente(){
        var idCli=parseInt(localStorage.getItem('id-usuario'));
        this.dataService.getUltimoIdPublicacionCliente(idCli)
            .subscribe(
            res => this.getUltimoIdPublicacionClienteOK(res),
            error => this.getUltimoIdPublicacionClienteError(error),
            () => Utilidades.log("[ofrecer-servicio.component.ts] - getUltimoIdPublicacionCliente: Completado")
        );
    }
    getUltimoIdPublicacionClienteOK(response:any){  
        if(response.Codigo ==  200){
            Utilidades.log("[ofrecer-servicio.component.ts] - getUltimoIdPublicacionClienteOK | responseError: " + JSON.stringify(response.Objetos[0]));
            this.publicacion.Id = parseInt(response.Objetos[0]);
            document.getElementById('inputIdPublicacion').setAttribute('value',this.publicacion.Id.toString());
            document.getElementById('mostrarImagenes').click();
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    }
    getUltimoIdPublicacionClienteError(responseError:any){
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    }
}