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
import { Contacto } from "../../shared/contacto"; 
import { ComentarioPuntuacion } from "../../shared/comentarioPuntuacion"; 
import { Presupuesto } from "../../shared/presupuesto"; 

@Component({
    selector: 'ver-publicacion-solicitada',
    templateUrl: 'app/dashboard/ver-publicacion-solicitada/ver-publicacion-solicitada.component.html',
    styleUrls:  ['css/ver-publicacion-solicitada.css']
})

export class VerPublicacionSolicitadaComponent implements OnInit{
    mensajes: Mensaje = new Mensaje();
    servicios: Servicio[] = [];
    publicacion: Publicacion = new Publicacion();
    idPublicacion:number;
    baseURL:string;
    idContacto:number;
    puntaje:number=0;
    comentarioPuntuacion: ComentarioPuntuacion= new ComentarioPuntuacion();
    promedioPublicacion:number;
    promedioServicio:number;
    idUsuario:number;
    responder:boolean=false;
    postulacion:boolean=false;
    presupuesto:Presupuesto;
    presupuestos:Presupuesto[]=[];

    constructor(private dataService: DataService, private router: Router,private route: ActivatedRoute) {
        this.baseURL=Settings.srcImg;//ver que acá va la ruta del proyecto que contiene las imagenes
    }

    ngOnInit() {
        // subscripción al observable params
        this.route.params
        .subscribe(params => {
            this.idPublicacion = parseInt(params['id']);
            this.idContacto = parseInt(params['idContacto']);
            Utilidades.log("[ver-publicacion-solicitada.component.ts] - ngOnInit | id: " + JSON.stringify(this.idPublicacion));
            Utilidades.log("[ver-publicacion-solicitada.component.ts] - ngOnInit | idContacto: " + JSON.stringify(this.idContacto));   
        });
        this.obtenerPublicacion();  
        this.idUsuario= parseInt(localStorage.getItem('id-usuario'));       
    }

    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    postularme(){
        if(!this.postulacion){
            this.postulacion=true;
        }else{
            this.postulacion=false;
        }
    }

    guardarPropuesta(){
        this.presupuesto=new Presupuesto();
        this.presupuesto.Solicitud.Id=this.publicacion.Id;
        this.presupuesto.Cliente.Id=this.publicacion.Cliente.Id;
        var comentario = <HTMLInputElement>document.getElementById('txtPropuesta');
        this.presupuesto.Comentario=comentario.value;
        this.presupuesto.Aceptado=true;
        Utilidades.log("[ver-publicacion-solicitada.component.ts] GuardarPropuesta - presupuesto: " + JSON.stringify(this.presupuesto));   
        this.dataService.postIngresarPresupuesto(this.presupuesto)
            .subscribe(
                res => this.postIngresarPresupuestoOk(res),
                error => this.postIngresarPresupuestoError(error),
                () => Utilidades.log("[ver-publicacion-solicitada.component.ts] - postIngresarComentario: Completado")
            );
    }

    postIngresarPresupuestoOk(response:any){
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - postIngresarPresupuestoOk | response: " + JSON.stringify(response));

        if(response.Codigo ==  200){
            document.getElementById('btnPropuesta').hidden = true;
            document.getElementById('txtPropuesta').setAttribute('disabled','disabled');
        }
        else{
            Utilidades.log("[ver-publicacion-solicitada.component.ts] - postIngresarPresupuestoOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    postIngresarPresupuestoError(responseError:any){
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - postIngresarPresupuestoError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }


    guardarComentario(){
        this.borrarMensajes();
        this.comentarioPuntuacion.Puntuacion=this.puntaje;
        this.comentarioPuntuacion.Publicacion=this.publicacion;
        this.comentarioPuntuacion.Cliente.Id=parseInt(localStorage.getItem('id-usuario')); 
        this.comentarioPuntuacion.Contacto=new Contacto();
        this.comentarioPuntuacion.Contacto.Id=this.idContacto;

        Utilidades.log("[ver-publicacion-solicitada.component.ts] - guardarComentario | comentarioPuntuacion: " + JSON.stringify(this.comentarioPuntuacion));   
        if(this.comentarioPuntuacion.Comentario!=null && this.comentarioPuntuacion.Comentario!=""){
            this.dataService.postIngresarComentario(this.comentarioPuntuacion)
            .subscribe(
                res => this.postIngresarComentarioOk(res),
                error => this.postIngresarComentarioError(error),
                () => Utilidades.log("[ver-publicacion-solicitada.component.ts] - postIngresarComentario: Completado")
            );
        }else{
            var error = new Error();
            error.Descripcion = "El comentario no puede estar vacio.";           
            this.mensajes.Errores.push(error);
        }
        
    }
    postIngresarComentarioOk(response:any){
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - postIngresarComentarioOk | response: " + JSON.stringify(response));

        if(response.Codigo ==  200){
            $('#exampleModalLong').modal('hide');
            this.router.navigate(['/dashboard/ver-publicacion-solicitada/', this.publicacion.Id, 0]);
        }
        else{
            Utilidades.log("[ver-publicacion-solicitada.component.ts] - postIngresarComentarioOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    postIngresarComentarioError(responseError:any){
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - postIngresarComentarioError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    actualizarPuntaje(input:any){
        this.puntaje=input;
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - actualizarPuntaje | puntaje: " + JSON.stringify(this.puntaje));
    }

    obtenerPublicacion(){
         Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerPublicacion | id: " + JSON.stringify(this.idPublicacion));
        this.dataService.getPublicacion(this.idPublicacion)
            .subscribe(
            res => this.getPublicacionOk(res),
            error => this.getPublicacionError(error),
            () => Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerServicios: Completado")
        );
    }

    getPublicacionOk(response:any){
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerServiciosOk | response: " + JSON.stringify(response));       
        if(response.Codigo ==  200){
            this.publicacion = response.Objetos[0];          
            this.obtenerServicio(this.publicacion.Servicio.Id);
            this.obtenerCliente(this.publicacion.Cliente.Id);
            this.obtenerPresupuestos();
            this.obtenerComentarios();

            //Terminado la carga de la publicacion, en caso de que haya comentario pendiente, se habre ventana modal
            if(this.idContacto!=0){
                document.getElementById('btnModal').click();
            }  
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getPublicacionError(responseError:any){
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerServiciosError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    obtenerServicio(id:number){
        this.dataService.getObtenerServicio(id)
            .subscribe(
            res => this.getObtenerServicioOk(res),
            error => this.getObtenerServicioError(error),
            () => Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerServicio: Completado")
        );
    }

    getObtenerServicioOk(response:any){
        
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerServicioOk | response: " + JSON.stringify(response.Objetos[0]));
        if(response.Codigo ==  200){
            this.publicacion.Servicio = response.Objetos[0];
            this.obtenerPreguntas();//metodo que completa en alngular las respuestas a las preguntas
            this.obetenerPromedioPublicacion();
            this.obetenerPromedioClienteServicio();
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getObtenerServicioError(responseError:any){
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerServicioError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    obtenerPreguntas(){
        for (var i = 0; i < this.publicacion.Respuestas.length; i++) {
            for (var j = 0; j < this.publicacion.Servicio.Preguntas.length; j++) {
                if(this.publicacion.Servicio.Preguntas[j].Id==this.publicacion.Respuestas[i].Pregunta.Id){
                    this.publicacion.Respuestas[i].Pregunta.UnaPregunta=this.publicacion.Servicio.Preguntas[j].UnaPregunta;
                }         
            }                
        } 
    }

    
    obtenerCliente(id:number){
        this.dataService.getObtenerCliente(id)
            .subscribe(
            res => this.getObtenerClienteOk(res),
            error => this.getObtenerClienteError(error),
            () => Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerCliente: Completado")
        );
    }

    getObtenerClienteOk(response:any){
        
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerClienteOk | response: " + JSON.stringify(response.Objetos[0]));
        if(response.Codigo ==  200){
            this.publicacion.Cliente = response.Objetos[0];
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getObtenerClienteError(responseError:any){
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerClienteError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    contactar(){
        var contacto:Contacto = new Contacto();

        contacto.Cliente.Id = parseInt(localStorage.getItem("id-usuario"));
        contacto.Publicacion = this.publicacion;

        this.dataService.postAltaContacto(contacto)
            .subscribe(
            res => this.postAltaContactoOk(res),
            error => this.postAltaContactoError(error),
            () => Utilidades.log("[ver-publicacion-solicitada.component.ts] - postAltaContacto: Completado")
        );
    }

     postAltaContactoOk(response:any){
        
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - postAltaContactoOk | response: " + JSON.stringify(response.Objetos[0]));
        if(response.Codigo ==  200){
            this.router.navigate(["dashboard/ver-perfil-usuario", this.publicacion.Cliente.Id]);
        }
        else{
            var error = new Error();
            error.Descripcion = "Ha ocurrido un error al cargar los datos del usuario.";           
            this.mensajes.Errores.push(error);
            error = new Error();
            error.Descripcion = "Intente nuevamente o contacte al administrador.";           
            this.mensajes.Errores.push(error);
        }
    }

    postAltaContactoError(responseError:any){
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - postAltaContactoError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    obtenerComentarios(){
        this.dataService.getObtenerComentarioPublicacion(this.publicacion.Id)
            .subscribe(
            res => this.getObtenerComentarioPublicacionOk(res),
            error => this.getObtenerComentarioPublicacionError(error),
            () => Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObtenerComentarioPublicacion: Completado")
        );
    }
     getObtenerComentarioPublicacionOk(response:any){
        
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObtenerComentarioPublicacionOk | response: " + JSON.stringify(response.Objetos));
        if(response.Codigo ==  200){
            this.publicacion.ComentariosPuntuacion=response.Objetos;
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getObtenerComentarioPublicacionError(responseError:any){
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObtenerComentarioPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    obetenerPromedioPublicacion(){
        this.dataService.getObetenerPromedioPublicacion(this.publicacion.Id)
            .subscribe(
            res => this.getObetenerPromedioPublicacionOk(res),
            error => this.getObetenerPromedioPublicacionError(error),
            () => Utilidades.log("[ver-publicacion-solicitada.component.ts] - obetenerPromedioPublicacion: Completado")
        );
    }

    getObetenerPromedioPublicacionOk(response:any){
        
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObetenerPromedioPublicacionOk | response: " + JSON.stringify(response.Objetos[0]));
        if(response.Codigo ==  200){
           this.promedioPublicacion=response.Objetos[0];
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getObetenerPromedioPublicacionError(responseError:any){
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObetenerPromedioPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    obetenerPromedioClienteServicio(){
         this.dataService.getObetenerPromedioClienteServicio(this.publicacion.Cliente.Id,this.publicacion.Servicio.Id)
            .subscribe(
            res => this.getObetenerPromedioClienteServicioOk(res),
            error => this.getObetenerPromedioClienteServicioError(error),
            () => Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObetenerPromedioClienteServicio: Completado")
        );
    }

    getObetenerPromedioClienteServicioOk(response:any){
        
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObetenerPromedioClienteServicioOk | response: " + JSON.stringify(response.Objetos[0]));
        if(response.Codigo ==  200){
           this.promedioServicio=response.Objetos[0];
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getObetenerPromedioClienteServicioError(responseError:any){
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObetenerPromedioClienteServicioError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    obtenerPresupuestos(){
        this.dataService.getObtenerPresupuestos(this.publicacion.Id)
            .subscribe(
            res => this.getObtenerPresupuestosOk(res),
            error => this.getObtenerPresupuestosError(error),
            () => Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObtenerPresupuestos: Completado")
        );
    }
    getObtenerPresupuestosOk(response:any){
        
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObtenerPresupuestosOk | response: " + JSON.stringify(response.Objetos[0]));
        if(response.Codigo ==  200){
           this.presupuestos=response.Objetos;
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getObtenerPresupuestosError(responseError:any){
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObtenerPresupuestosError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    responderComentario(input:any){
        var s='respuesta'+input;
        if(this.responder==true){
            document.getElementById(s).hidden = true;
            this.responder=false;
        }else{
            document.getElementById(s).hidden = false;
            this.responder=true;
        }
        
    }

    guardarRespuesta(input:any){
        var respuesta = <HTMLInputElement>document.getElementById('txtRespuesta'+input);
        if(respuesta.value!=null && respuesta.value!=''){
            this.comentarioPuntuacion.Id=parseInt(input);
            this.comentarioPuntuacion.Respuesta=respuesta.value;

            this.dataService.postAltaRespuestaComentario(this.comentarioPuntuacion)
                .subscribe(
                res => this.postAltaRespuestaComentarioOk(res,input),
                error => this.postAltaRespuestaComentarioError(error),
                () => Utilidades.log("[ver-publicacion-solicitada.component.ts] - postAltaRespuestaComentario: Completado")
            );
        }else{
            alert('Debe ingresar un comentario.');
        }
        
    }

    postAltaRespuestaComentarioOk(response:any,idComentario:any){
        
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - postAltaRespuestaComentarioOk | response: " + JSON.stringify(response.Objetos[0]));
        if(response.Codigo ==  200){
            document.getElementById('btnGuardarRespuesta'+idComentario).hidden = true;
            document.getElementById('txtRespuesta'+idComentario).setAttribute('disabled','disabled');
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    postAltaRespuestaComentarioError(responseError:any){
        Utilidades.log("[ver-publicacion-solicitada.component.ts] - postAltaRespuestaComentarioError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

}