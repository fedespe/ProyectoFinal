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

@Component({
    selector: 'ver-publicacion-ofrecida',
    templateUrl: 'app/dashboard/ver-publicacion-ofrecida/ver-publicacion-ofrecida.component.html',
    styleUrls:  ['css/ver-publicacion-ofrecida.css']
})

export class VerPublicacionOfrecidaComponent implements OnInit{
    mensajes: Mensaje = new Mensaje();
    servicios: Servicio[] = [];
    publicacion: Publicacion = new Publicacion();
    idPublicacion:number;
    baseURL:string;
    idContacto:number;

    constructor(private dataService: DataService, private router: Router,private route: ActivatedRoute) {
        this.baseURL=Settings.srcImg;//ver que acá va la ruta del proyecto que contiene las imagenes
    }

    ngOnInit() {
        // subscripción al observable params
        this.route.params
        .subscribe(params => {
            this.idPublicacion = parseInt(params['id']);
            this.idContacto = parseInt(params['idContacto']);
            Utilidades.log("[ver-publicacion-ofrecida.component.ts] - ngOnInit | id: " + JSON.stringify(this.idPublicacion));
            Utilidades.log("[ver-publicacion-ofrecida.component.ts] - ngOnInit | idContacto: " + JSON.stringify(this.idContacto));   
        });
        this.obtenerPublicacion();           
    }

    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    obtenerPublicacion(){
         Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerPublicacion | id: " + JSON.stringify(this.idPublicacion));
        this.dataService.getPublicacion(this.idPublicacion)
            .subscribe(
            res => this.getPublicacionOk(res),
            error => this.getPublicacionError(error),
            () => Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerServicios: Completado")
        );
    }

    getPublicacionOk(response:any){
        Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerServiciosOk | response: " + JSON.stringify(response));       
        if(response.Codigo ==  200){
            this.publicacion = response.Objetos[0];          
            this.obtenerServicio(this.publicacion.Servicio.Id);
            this.obtenerCliente(this.publicacion.Cliente.Id);

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
        Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerServiciosError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    obtenerServicio(id:number){
        this.dataService.getObtenerServicio(id)
            .subscribe(
            res => this.getObtenerServicioOk(res),
            error => this.getObtenerServicioError(error),
            () => Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerServicio: Completado")
        );
    }

    getObtenerServicioOk(response:any){
        
        Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerServicioOk | response: " + JSON.stringify(response.Objetos[0]));
        if(response.Codigo ==  200){
            this.publicacion.Servicio = response.Objetos[0];
            this.obtenerPreguntas();//metodo que completa en alngular las respuestas a las preguntas
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
            () => Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerCliente: Completado")
        );
    }

    getObtenerClienteOk(response:any){
        
        Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerClienteOk | response: " + JSON.stringify(response.Objetos[0]));
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
        Utilidades.log("[editar-servicio-cliente.component.ts] - obtenerClienteError | responseError: " + JSON.stringify(responseError));
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
            () => Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postAltaContacto: Completado")
        );
    }

     postAltaContactoOk(response:any){
        
        Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postAltaContactoOk | response: " + JSON.stringify(response.Objetos[0]));
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
        Utilidades.log("[editar-servicio-cliente.component.ts] - postAltaContactoError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }
}