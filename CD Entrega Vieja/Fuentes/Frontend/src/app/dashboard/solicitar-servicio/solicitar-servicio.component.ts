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
    selector: 'solicitar-servicio',
    templateUrl: 'app/dashboard/solicitar-servicio/solicitar-servicio.component.html',
    styleUrls:  ['css/solicitar-servicio.css']
})

export class SolicitarServicioComponent{
    mensajes: Mensaje = new Mensaje();
    servicios: Servicio[] = [];
    publicacion: Publicacion = new Publicacion();
    servicioSeleccionado: Servicio = new Servicio();
    respuestas: string[] = [];
    step:number=1;
    urlImagen:string=Settings.srcImg+"/Oferta/IngresarImagenes";

    constructor(private dataService: DataService, private router: Router) {
        this.publicacion.Cliente.Id=parseInt(localStorage.getItem('id-usuario'));
        this.publicacion.Cliente.NombreUsuario=localStorage.getItem('nombre-usuario');
        this.publicacion.Activa=true;
        this.publicacion.Tipo="SOLICITUD";
        this.publicacion.Servicio.Id=0;
        this.obtenerServicios();
    }

    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    ofrecerServicioPaso1(){
        this.borrarMensajes(),
        this.mensajes.Errores = this.publicacion.validarDatos1();
        if(this.mensajes.Errores.length == 0){
            this.step=2;
        }    
    }
    ofrecerServicioPaso2(){
        this.postAltaPublicacion();
        this.step=3;
    }
    ofrecerServicioPaso3(){
       this.router.navigate(['mi-cuenta/listado-solicitudes-cliente']);
    }
    volverPaso1(){
        this.step=1;
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
    }

    getUltimoIdPublicacionClienteError(responseError:any){
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }


}