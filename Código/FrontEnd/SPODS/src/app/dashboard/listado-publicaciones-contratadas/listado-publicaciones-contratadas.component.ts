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

@Component({
    selector: 'listado-publicaciones-contratadas',
    templateUrl: 'app/dashboard/listado-publicaciones-contratadas/listado-publicaciones-contratadas.component.html',
    styleUrls:  ['css/listado-publicaciones-contratadas.css']
})

export class ListadoPublicacionesContratadasComponent{
    mensajes: Mensaje = new Mensaje();
    publicaciones: Publicacion[] = [];
    baseURL:string;
    constructor(private dataService: DataService, private router: Router) {
        this.obtenerPublicacionesContratadasPorCliente(parseInt(localStorage.getItem('id-usuario')));
        this.baseURL=Settings.srcImg;//ver que acá va la ruta del proyecto que contiene las imagenes
    }

    
    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }
    
    obtenerPublicacionesContratadasPorCliente(id:number){
        this.dataService.getobtenerPublicacionesContratadasPorCliente(id)
            .subscribe(
            res => this.getobtenerPublicacionesContratadasPorClienteOk(res),
            error => this.getobtenerPublicacionesContratadasPorClienteError(error),
            () => Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerPublicacionesContratadasPorCliente: Completado")
        );
    }

    getobtenerPublicacionesContratadasPorClienteOk(response:any){
        Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerPublicacionesContratadasPorClienteOk | response: " + JSON.stringify(response));      
        if(response.Codigo ==  200){
            this.publicaciones = response.Objetos;
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getobtenerPublicacionesContratadasPorClienteError(responseError:any){
        Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerPublicacionesContratadasPorClienteError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    // desactivarPublicacion(input:any){
    //     Utilidades.log("[listado-publicaciones-contratadas.component.ts] - desactivarPublicacion | responseError: " + JSON.stringify(input));
    //     this.dataService.getDesactivarPublicacion(input)
    //         .subscribe(
    //         res => this.getDesactivarPublicacionOk(res),
    //         error => this.getDesactivarPublicacionError(error),
    //         () => Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getDesactivarPublicacion: Completado")
    //     );
    // }

    // getDesactivarPublicacionOk(response:any){
    //     Utilidades.log("[[listado-servicios.component.ts] - getDesactivarPublicacionOk | response: " + JSON.stringify(response));      
    //     if(response.Codigo ==  200){
    //         this.obtenerPublicacionesCliente(parseInt(localStorage.getItem('id-usuario')));
    //     }
    //     else{
    //         var error = new Error();
    //         error.Descripcion = response.Mensaje;           
    //         this.mensajes.Errores.push(error);
    //     }
    // }

    // getDesactivarPublicacionError(responseError:any){
    //     Utilidades.log("[listado-servicios.component.ts] - getDesactivarPublicacionError | responseError: " + JSON.stringify(responseError));
    //     var error = new Error();
    //     error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
    //     this.mensajes.Errores.push(error);
    // }

    // activarPublicacion(input:any){
    //     Utilidades.log("[listado-servicios.component.ts] - activarPublicacion | responseError: " + JSON.stringify(input));
    //     this.dataService.getActivarPublicacion(input)
    //         .subscribe(
    //         res => this.getActivarPublicacionOk(res),
    //         error => this.getActivarPublicacionError(error),
    //         () => Utilidades.log("[listado-servicios.component.ts] - getActivarPublicacion: Completado")
    //     );
    // }

    // getActivarPublicacionOk(response:any){
    //     Utilidades.log("[[listado-servicios.component.ts] - getActivarPublicacionOk | response: " + JSON.stringify(response));      
    //     if(response.Codigo ==  200){
    //         this.obtenerPublicacionesCliente(parseInt(localStorage.getItem('id-usuario')));
    //     }
    //     else{
    //         var error = new Error();
    //         error.Descripcion = response.Mensaje;           
    //         this.mensajes.Errores.push(error);
    //     }
    // }

    // getActivarPublicacionError(responseError:any){
    //     Utilidades.log("[listado-servicios.component.ts] - getActivarPublicacionError | responseError: " + JSON.stringify(responseError));
    //     var error = new Error();
    //     error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
    //     this.mensajes.Errores.push(error);
    // }
    
}