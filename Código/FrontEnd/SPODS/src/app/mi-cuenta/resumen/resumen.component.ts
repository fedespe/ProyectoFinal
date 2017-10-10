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
    cantidadSolicitudesFinalizadas:number = 0;
    cantidadSolicitudesActivas:number = 0;
    cantidadSolicitudesInactivas:number = 0;

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
        this.obtenerOfertasCliente(this.cliente.Id);
        this.obtenerSolicitudesCliente(this.cliente.Id);
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
        Utilidades.log("[resumen.component.ts] - getObetenerPromedioClienteOfertaError | responseError: " + JSON.stringify(responseError));
        this.borrarMensajes();
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    }
    obtenerOfertasCliente(id:number){
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
            this.calcularNumerosOfertasClienteLogueado();
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
    calcularNumerosOfertasClienteLogueado(){
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
    obtenerSolicitudesCliente(id:number){
        this.dataService.getObtenerPublicacionesClienteSolicitud(id)
            .subscribe(
            res => this.getObtenerPublicacionesClienteSolicitudOk(res),
            error => this.getObtenerPublicacionesClienteSolicitudError(error),
            () => Utilidades.log("[resumen.component.ts] - getObtenerPublicacionesClienteSolicitud: Completado")
        );
    }
    getObtenerPublicacionesClienteSolicitudOk(response:any){
        Utilidades.log("[resumen.component.ts] - getObtenerPublicacionesClienteSolicitudOk | response: " + JSON.stringify(response));      
        if(response.Codigo ==  200){
            this.publicaciones = response.Objetos;
            this.calcularNumerosSolicitudesClienteLogueado();
        }
        else{
            this.borrarMensajes();
            var error = new Error();
            error.Descripcion = "Ha ocurrido un error al cargar sus datos. Intente nuevamente o contacte al administrador.";
            this.mensajes.Errores.push(error);
        }
    }
    getObtenerPublicacionesClienteSolicitudError(responseError:any){
        Utilidades.log("[resumen.component.ts] - getObtenerPublicacionesClienteSolicitudError | responseError: " + JSON.stringify(responseError));
        this.borrarMensajes();
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    }
    calcularNumerosSolicitudesClienteLogueado(){
        for(let publicacion of this.publicaciones){
            if(publicacion.Tipo == "SOLICITUD"){
                if(publicacion.Finalizada){
                    this.cantidadSolicitudesFinalizadas++;
                }
                else if(publicacion.Activa){
                    this.cantidadSolicitudesActivas++;
                }
                else if(!publicacion.Activa){
                    this.cantidadSolicitudesInactivas++;
                }
            }
        }
    }
}