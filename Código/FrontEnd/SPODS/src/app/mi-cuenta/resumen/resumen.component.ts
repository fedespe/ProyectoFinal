import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilidades } from "../../shared/utilidades";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { Exito } from "../../shared/exito";
import { Cliente } from '../../shared/cliente';
import { Barrio } from '../../shared/barrio';
import { Publicacion } from '../../shared/publicacion';
import { ComentarioPuntuacion } from '../../shared/comentarioPuntuacion';
import { Servicio } from '../../shared/servicio';
import { Settings } from '../../shared/settings';

import { RatingModule } from "ng2-rating";

@Component({
    selector: 'resumen',
    templateUrl: 'app/mi-cuenta/resumen/resumen.component.html',
    styleUrls:  ['css/resumen.css']
})

export class ResumenComponent implements OnInit{
    mensajes: Mensaje = new Mensaje();
    loading = true;
    cliente:Cliente = new Cliente();
    promedioCliente:number;
    publicaciones:Publicacion[];
    cantidadOfertasFinalizadas:number = 0;
    cantidadOfertasActivas:number = 0;
    cantidadOfertasInactivas:number = 0;
    

    comentariosPuntuacionOferta:ComentarioPuntuacion[]=[];
    comentariosPuntuacionSolicitud:ComentarioPuntuacion[]=[];
    servicios: Servicio[] = [];
    responderSolicitud:boolean=false;
    responderOferta:boolean=false;
    comentarioPuntuacion: ComentarioPuntuacion= new ComentarioPuntuacion();
    
    baseURL:string=Settings.srcImg;

    constructor(private dataService: DataService, private router: Router,private route: ActivatedRoute) {
    }
    ngOnInit() {
        this.borrarMensajes();
        this.cliente.Id=parseInt(localStorage.getItem('id-usuario'));
        this.obternerClienteLogueado();
        this.obtenerNumerosClienteLogueado();

        this.obtenerServicios();
    }
    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }
    obternerClienteLogueado(){
        this.dataService.getObtenerCliente(this.cliente.Id)
            .subscribe(
            res => this.getObternerClienteOk(res),
            error => this.getObternerClienteError(error),
            () => Utilidades.log("[resumen.component.ts] - getObtenerCliente: Completado")
        );
    }
    getObternerClienteOk(response:any){
        Utilidades.log("[resumen.component.ts] - getObternerClienteOk | response: " + JSON.stringify(response));
        if(response.Codigo ==  200){
            this.cliente.NombreUsuario = response.Objetos[0].NombreUsuario;
            this.cliente.Nombre = response.Objetos[0].Nombre;
            this.cliente.Apellido = response.Objetos[0].Apellido;
            this.cliente.Telefono = response.Objetos[0].Telefono;
            this.cliente.Direccion = response.Objetos[0].Direccion;
            this.cliente.Barrio.Id = response.Objetos[0].Barrio.Id;
            this.cliente.Barrio.Nombre = response.Objetos[0].Barrio.Nombre;
            this.cliente.Barrio.Departamento.Nombre = response.Objetos[0].Barrio.Departamento.Nombre;
            this.cliente.Imagen=response.Objetos[0].Imagen;
        }
        else{
            this.borrarMensajes();
            var error = new Error();
            error.Descripcion = "Ha ocurrido un error al cargar sus datos. Intente nuevamente o contacte al administrador.";
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    }
    getObternerClienteError(responseError:any){
        Utilidades.log("[resumen.component.ts] - getObternerClienteError | responseError: " + JSON.stringify(responseError));
        this.borrarMensajes();
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    }
    obtenerNumerosClienteLogueado(){
        this.obetenerPromedioClienteOferta();
        this.obtenerPublicacionesCliente(this.cliente.Id);
    }
    obetenerPromedioClienteOferta(){
        this.dataService.getObetenerPromedioClienteOferta(this.cliente.Id)
           .subscribe(
           res => this.getObetenerPromedioClienteOfertaOk(res),
           error => this.getObetenerPromedioClienteOfertaError(error),
           () => Utilidades.log("[resumen.component.ts] - obetenerPromedioClienteOferta: Completado")
       );
   }
    getObetenerPromedioClienteOfertaOk(response:any){
        Utilidades.log("[resumen.component.ts] - getObetenerPromedioClienteOfertaOk | response: " + JSON.stringify(response.Objetos[0]));
        if(response.Codigo ==  200){
            this.promedioCliente=response.Objetos[0];
        }
        else{
            this.borrarMensajes();
            var error = new Error();
            error.Descripcion = "Ha ocurrido un error al cargar sus datos. Intente nuevamente o contacte al administrador.";
            this.mensajes.Errores.push(error);
       }
    }
    getObetenerPromedioClienteOfertaError(responseError:any){
        Utilidades.log("[resumen.component.ts] - getObetenerPromedioClienteServicioError | responseError: " + JSON.stringify(responseError));
        this.borrarMensajes();
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    }
    obtenerPublicacionesCliente(id:number){
        this.dataService.getObtenerPublicacionesClienteOferta(id)
            .subscribe(
            res => this.getObtenerPublicacionesClienteOfertaOk(res),
            error => this.getObtenerPublicacionesClienteOfertaError(error),
            () => Utilidades.log("[resumen.component.ts] - getObtenerPublicacionesClienteOferta: Completado")
        );
    }
    getObtenerPublicacionesClienteOfertaOk(response:any){
        Utilidades.log("[resumen.component.ts] - getObtenerPublicacionesClienteOfertaOk | response: " + JSON.stringify(response));      
        if(response.Codigo ==  200){
            this.publicaciones = response.Objetos;
            this.calcularNumerosClienteLogueado();
        }
        else{
            this.borrarMensajes();
            var error = new Error();
            error.Descripcion = "Ha ocurrido un error al cargar sus datos. Intente nuevamente o contacte al administrador.";
            this.mensajes.Errores.push(error);
        }
    }
    getObtenerPublicacionesClienteOfertaError(responseError:any){
        Utilidades.log("[resumen.component.ts] - getObtenerPublicacionesClienteOfertaError | responseError: " + JSON.stringify(responseError));
        this.borrarMensajes();
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    }
    calcularNumerosClienteLogueado(){
        for(let publicacion of this.publicaciones){
            if(publicacion.Tipo === "OFERTA"){
                if(publicacion.Finalizada){
                    this.cantidadOfertasFinalizadas++;
                }
                else if(publicacion.Activa){
                    this.cantidadOfertasActivas++;
                }
                else if(!publicacion.Activa){
                    this.cantidadOfertasInactivas++;
                }
            }
        }
    }





    obtenerServicios(){
        this.dataService.getServicioObtenerTodos()
            .subscribe(
            res => this.getServicioObtenerTodosOk(res),
            error => this.getServicioObtenerTodosError(error),
            () => Utilidades.log("[ver-perfil-usuario.component.ts] - obtenerServicios: Completado")
        );
    }

    getServicioObtenerTodosOk(response:any){
        Utilidades.log("[ver-perfil-usuario.component.ts] - obtenerServiciosOk | response: " + JSON.stringify(response));      
        if(response.Codigo ==  200){
            this.servicios = response.Objetos;
            this.getComentariosOferta();
            this.getComentariosSolicitud();   
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getServicioObtenerTodosError(responseError:any){
        Utilidades.log("[ver-perfil-usuario.component.ts] - obtenerServiciosError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    getComentariosOferta(){
        this.dataService.getComentariosOferta(this.cliente.Id)
            .subscribe(
            res => this.getComentariosOfertaOk(res),
            error => this.getComentariosOfertaError(error),
            () => Utilidades.log("[ver-perfil-usuario.component.ts] - getComentariosOferta: Completado")
        );
    }

    getComentariosOfertaOk(response:any){
        Utilidades.log("[ver-perfil-usuario.component.ts] - getComentariosOfertaOk | response: " + JSON.stringify(response));
        if(response.Codigo ==  200){
            this.comentariosPuntuacionOferta=response.Objetos;
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getComentariosOfertaError(responseError:any){
        Utilidades.log("[perfil-usuario.component.ts] - getComentariosOfertaError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    getComentariosSolicitud(){
        this.dataService.getComentariosSolicitud(this.cliente.Id)
            .subscribe(
            res => this.getComentariosSolicitudOk(res),
            error => this.getComentariosSolicitudError(error),
            () => Utilidades.log("[ver-perfil-usuario.component.ts] - getComentariosSolicitud: Completado")
        );
    }

    getComentariosSolicitudOk(response:any){
        Utilidades.log("[ver-perfil-usuario.component.ts] - getComentariosSolicitudOk | response: " + JSON.stringify(response));
        if(response.Codigo ==  200){
            this.comentariosPuntuacionSolicitud=response.Objetos;
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getComentariosSolicitudError(responseError:any){
        Utilidades.log("[perfil-usuario.component.ts] - getComentariosSolicitudError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }


    responderComentarioSolicitud(input:any){
        var s='respuestaSolicitud'+input;
        if(this.responderSolicitud==true){
            document.getElementById(s).hidden = true;
            this.responderSolicitud=false;
        }else{
            document.getElementById(s).hidden = false;
            this.responderSolicitud=true;
        }
        
    }
    responderComentarioOferta(input:any){
        var s='respuestaOferta'+input;
        if(this.responderOferta==true){
            document.getElementById(s).hidden = true;
            this.responderOferta=false;
        }else{
            document.getElementById(s).hidden = false;
            this.responderOferta=true;
        }
        
    }

    guardarRespuestaOferta(input:any){
        var respuesta = <HTMLInputElement>document.getElementById('txtRespuestaOferta'+input);
        if(respuesta.value!=null && respuesta.value!=''){
            this.comentarioPuntuacion.Id=parseInt(input);
            this.comentarioPuntuacion.Respuesta=respuesta.value;

            this.dataService.postAltaRespuestaComentario(this.comentarioPuntuacion)
                .subscribe(
                res => this.postAltaRespuestaComentarioOfertaOk(res,input),
                error => this.postAltaRespuestaComentarioOfertaError(error),
                () => Utilidades.log("[perfil-usuario.component.ts] - postAltaRespuestaComentario: Completado")
            );
        }else{
            alert('Debe ingresar un comentario.');
        }
        
    }
    postAltaRespuestaComentarioOfertaOk(response:any,idComentario:any){ 
        Utilidades.log("[perfil-usuario.component.ts] - postAltaRespuestaComentarioOk | response: " + JSON.stringify(response.Objetos[0]));
        if(response.Codigo ==  200){
            document.getElementById('btnGuardarRespuestaOferta'+idComentario).hidden = true;
            document.getElementById('txtRespuestaOferta'+idComentario).setAttribute('disabled','disabled');
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    postAltaRespuestaComentarioOfertaError(responseError:any){
        Utilidades.log("[perfil-usuario.component.ts] - postAltaRespuestaComentarioError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }
    guardarRespuestaSolicitud(input:any){
        var respuesta = <HTMLInputElement>document.getElementById('txtRespuestaSolicitud'+input);
        if(respuesta.value!=null && respuesta.value!=''){
            this.comentarioPuntuacion.Id=parseInt(input);
            this.comentarioPuntuacion.Respuesta=respuesta.value;

            this.dataService.postAltaRespuestaComentario(this.comentarioPuntuacion)
                .subscribe(
                res => this.postAltaRespuestaComentarioSolicitudOk(res,input),
                error => this.postAltaRespuestaComentarioSolicitudError(error),
                () => Utilidades.log("[perfil-usuario.component.ts] - postAltaRespuestaComentario: Completado")
            );
        }else{
            alert('Debe ingresar un comentario.');
        }
        
    }

    postAltaRespuestaComentarioSolicitudOk(response:any,idComentario:any){ 
        Utilidades.log("[perfil-usuario.component.ts] - postAltaRespuestaComentarioOk | response: " + JSON.stringify(response.Objetos[0]));
        if(response.Codigo ==  200){
            document.getElementById('btnGuardarRespuestaSolicitud'+idComentario).hidden = true;
            document.getElementById('txtRespuestaSolicitud'+idComentario).setAttribute('disabled','disabled');
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    postAltaRespuestaComentarioSolicitudError(responseError:any){
        Utilidades.log("[perfil-usuario.component.ts] - postAltaRespuestaComentarioError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    


}