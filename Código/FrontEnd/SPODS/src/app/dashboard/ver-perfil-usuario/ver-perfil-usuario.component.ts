import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilidades } from "../../shared/utilidades";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { Exito } from "../../shared/exito";
import { Cliente } from '../../shared/cliente';
import { Barrio } from '../../shared/barrio';
import { ComentarioPuntuacion } from '../../shared/comentarioPuntuacion';
import { Servicio } from '../../shared/servicio';

@Component({
    selector: 'ver-perfil-usuario',
    templateUrl: 'app/dashboard/ver-perfil-usuario/ver-perfil-usuario.component.html',
    styleUrls:  ['css/ver-perfil-usuario.css']
})

export class VerPerfilUsuarioComponent implements OnInit{
    mensajes: Mensaje = new Mensaje();
    cliente:Cliente = new Cliente();
    loading = true;
    comentariosPuntuacionOferta:ComentarioPuntuacion[]=[];
    comentariosPuntuacionSolicitud:ComentarioPuntuacion[]=[];
    servicios: Servicio[] = [];
    idUsuario:number;
    responderSolicitud:boolean=false;
    responderOferta:boolean=false;
    comentarioPuntuacion: ComentarioPuntuacion= new ComentarioPuntuacion();
    promedioCliente:number;

    constructor(private dataService: DataService, private router: Router,private route: ActivatedRoute) {
        
    }

    ngOnInit() {
        // subscripción al observable params
        this.borrarMensajes();
        this.route.params
        .subscribe(params => {
            this.cliente.Id = parseInt(params['id']);
            Utilidades.log("[ver-perfil-usuario.component.ts] - ngOnInit | id: " + JSON.stringify(this.cliente.Id));   
        });
        this.idUsuario=parseInt(localStorage.getItem('id-usuario'));
        this.getObternerCliente(); 
        this.obtenerServicios(); 
        this.obetenerPromedioClienteOferta();
    }

    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    getObternerCliente(){
        this.dataService.getObtenerCliente(this.cliente.Id)
            .subscribe(
            res => this.getObternerClienteOk(res),
            error => this.getObternerClienteError(error),
            () => Utilidades.log("[ver-perfil-usuario.component.ts] - getObtenerCliente: Completado")
        );
    }

    getObternerClienteOk(response:any){
        Utilidades.log("[ver-perfil-usuario.component.ts] - getObternerClienteOk | response: " + JSON.stringify(response));
        if(response.Codigo ==  200){
            this.cliente.NombreUsuario = response.Objetos[0].NombreUsuario;
            this.cliente.Nombre = response.Objetos[0].Nombre;
            this.cliente.Apellido = response.Objetos[0].Apellido;
            this.cliente.Telefono = response.Objetos[0].Telefono;
            this.cliente.Direccion = response.Objetos[0].Direccion;
            this.cliente.Barrio.Id = response.Objetos[0].Barrio.Id;
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    }

    getObternerClienteError(responseError:any){
        Utilidades.log("[ver-perfil-usuario.component.ts] - getObternerClienteError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
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

    obetenerPromedioClienteOferta(){
         this.dataService.getObetenerPromedioClienteOferta(this.idUsuario)
            .subscribe(
            res => this.getObetenerPromedioClienteOfertaOk(res),
            error => this.getObetenerPromedioClienteOfertaError(error),
            () => Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obetenerPromedioClienteOferta: Completado")
        );
    }

    getObetenerPromedioClienteOfertaOk(response:any){
        
        Utilidades.log("[ver-publicacion-ofrecida.component.ts] - getObetenerPromedioClienteOfertaOk | response: " + JSON.stringify(response.Objetos[0]));
        if(response.Codigo ==  200){
           this.promedioCliente=response.Objetos[0];
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getObetenerPromedioClienteOfertaError(responseError:any){
        Utilidades.log("[ver-publicacion-ofrecida.component.ts] - getObetenerPromedioClienteServicioError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }


}