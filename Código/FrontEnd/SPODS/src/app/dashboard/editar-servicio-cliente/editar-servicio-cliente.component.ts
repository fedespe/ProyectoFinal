import { Component, ViewEncapsulation, OnInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';  


@Component({
    selector: 'editar-servicio-cliente',
    templateUrl: 'app/dashboard/editar-servicio-cliente/editar-servicio-cliente.component.html',
    styleUrls:  ['css/editar-servicio-cliente.css']
})

export class EditarServicioClienteComponent implements OnInit{
    mensajes: Mensaje = new Mensaje();
    servicios: Servicio[] = [];
    publicacion: Publicacion = new Publicacion();
    servicioSeleccionado: Servicio = new Servicio();
    respuestas: string[] = [];
    idPublicacion:number;
    step:number=1;
   urlImagen:string=Settings.srcImg+"/Oferta/IngresarImagenes";


    constructor(private dataService: DataService, private router: Router,private route: ActivatedRoute) {
        
    }

    ngOnInit() {
        // subscripción al observable params
        this.route.params
        .subscribe(params => {
            this.idPublicacion = parseInt(params['id']);
            Utilidades.log("[[editar-servicio-cliente.component.ts] - ngOnInit | id: " + JSON.stringify(this.idPublicacion));   
        });
        this.obtenerPublicacion();       
    }

    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }
    editarServicioPaso1(){
        this.borrarMensajes();
        //Cuando se trae la publicacion por servcio no deja usar la funcion this.publicacion.validarDatos()
        //Se crea una nueva publicacion para hacer la validacion
        var p = new Publicacion();
        p.Titulo=this.publicacion.Titulo;
        p.Servicio=this.publicacion.Servicio;
        p.Descripcion=this.publicacion.Descripcion;
        this.mensajes.Errores = p.validarDatos1();
        //fin validacion
        if(this.mensajes.Errores.length == 0){
            this.step=2;
        }    
    }
    editarServicioPaso2(){
        this.putActualizarPublicacion();       
    }
    editarServicioPaso3(){
        this.router.navigate(['dashboard/listado-servicios-cliente']);
    }
    volverPaso1(){
        this.step=1;
    }

    obtenerPublicacion(){
         Utilidades.log("[[editar-servicio-cliente.component.ts] - obtenerPublicacion | id: " + JSON.stringify(this.idPublicacion));
        this.dataService.getPublicacion(this.idPublicacion)
            .subscribe(
            res => this.getPublicacionOk(res),
            error => this.getPublicacionError(error),
            () => Utilidades.log("[editar-servicio-cliente.component.ts] - obtenerServicios: Completado")
        );
    }

    getPublicacionOk(response:any){
        Utilidades.log("[[editar-servicio-cliente.component.ts] - obtenerServiciosOk | response: " + JSON.stringify(response));       
        if(response.Codigo ==  200){
            this.publicacion = response.Objetos[0]; 
            document.getElementById('inputIdPublicacion').setAttribute('value',this.publicacion.Id.toString());
            document.getElementById('mostrarImagenes').click();         
            this.obtenerServicio(this.publicacion.Servicio.Id);
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getPublicacionError(responseError:any){
        Utilidades.log("[editar-servicio-cliente.component.ts] - obtenerServiciosError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    obtenerServicio(id:number){
        this.dataService.getObtenerServicio(id)
            .subscribe(
            res => this.getObtenerServicioOk(res),
            error => this.getObtenerServicioError(error),
            () => Utilidades.log("[editar-servicio-cliente.component.ts] - obtenerServicio: Completado")
        );
    }

    getObtenerServicioOk(response:any){
        
        Utilidades.log("[[editar-servicio-cliente.component.ts] - obtenerServicioOk | response: " + JSON.stringify(this.servicioSeleccionado));
        if(response.Codigo ==  200){
            this.publicacion.Servicio = response.Objetos[0];
            this.responderPreguntas();//metodo que completa en alngular las respuestas a las preguntas
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getObtenerServicioError(responseError:any){
        Utilidades.log("[editar-servicio-cliente.component.ts] - obtenerServicioError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    responderPreguntas(){
        for (var i = 0; i < this.publicacion.Respuestas.length; i++) {
            for (var j = 0; j < this.publicacion.Servicio.Preguntas.length; j++) {
                if(this.publicacion.Servicio.Preguntas[j].Id==this.publicacion.Respuestas[i].Pregunta.Id){
                    this.publicacion.Servicio.Preguntas[j].UnaRespuesta=this.publicacion.Respuestas[i].UnaRespuesta;
                }         
            }                
        } 
    }

    putActualizarPublicacion(){
        Utilidades.log("[editar-servicio-cliente.component.ts] - putActualizarPublicacion | responseError: " + JSON.stringify(this.respuestas));
        this.borrarMensajes();
        //Cuando se trae la publicacion por servcio no deja usar la funcion this.publicacion.validarDatos()
        //Se crea una nueva publicacion para hacer la validacion
        var p = new Publicacion();
        p.Titulo=this.publicacion.Titulo;
        p.Imagenes=this.publicacion.Imagenes;
        p.Servicio=this.publicacion.Servicio;
        p.Descripcion=this.publicacion.Descripcion;
        this.mensajes.Errores = p.validarDatos();
        //fin validacion
        this.publicacion.Respuestas=[];
        if(this.mensajes.Errores.length==0){
            for (var i = 0; i < this.publicacion.Servicio.Preguntas.length; i++) {
                if(this.publicacion.Servicio.Preguntas[i].UnaRespuesta!=null && this.publicacion.Servicio.Preguntas[i].UnaRespuesta!=""){
                    var r = new Respuesta();
                    r.Pregunta.Id=this.publicacion.Servicio.Preguntas[i].Id;
                    r.UnaRespuesta=this.publicacion.Servicio.Preguntas[i].UnaRespuesta;
                    this.publicacion.Respuestas.push(r);
                }              
            } 
            Utilidades.log("[editar-servicio-cliente.component.ts] - putActualizarPublicacion | responseError: " + JSON.stringify(this.publicacion));
            this.dataService.putActualizarPublicacion(this.publicacion)
                .subscribe(
                res => this.putActualizarPublicacionOk(res),
                error => this.putActualizarPublicacionError(error),
                () => Utilidades.log("[ofrecer-servicio.component.ts] - putActualizarPublicacion: Completado")
            );
        }
    }
    putActualizarPublicacionOk(response:any){       
        Utilidades.log("[[editar-servicio-cliente.component.ts] - putActualizarPublicacionOK | response: " + JSON.stringify(this.servicioSeleccionado));
        if(response.Codigo ==  200){
            this.step=3;
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    putActualizarPublicacionError(responseError:any){
        Utilidades.log("[editar-servicio-cliente.component.ts] - putActualizarPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }



}