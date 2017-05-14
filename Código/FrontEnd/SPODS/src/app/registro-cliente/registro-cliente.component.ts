/**
 * Created by Bruno on 10/04/2017.
 */
import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';

import { Mensaje } from "../shared/mensaje";
import { Error } from "../shared/error";
import { Cliente } from '../shared/cliente';

@Component({
    selector: 'registro-cliente',
    templateUrl: 'app/registro-cliente/registro-cliente.component.html',
    styleUrls:  ['css/registro-cliente.css']
})
export class RegistroClienteComponent {
    mensajes: Mensaje = new Mensaje();
    cliente:Cliente = new Cliente();

    constructor(private dataService: DataService, private router: Router) {

    }

    registrarCliente() {
        console.log("[registro-cliente.component.ts] - registrarCliente | cliente: " + JSON.stringify(this.cliente));
        this.mensajes.Errores = this.cliente.validarDatos();

        // this.dataService.postRegistroCliente(this.cliente)
        //         .subscribe(
        //         res => this.postRegistroClienteOk(res),
        //         error => this.postRegistroClienteError(error),
        //         () => console.log("[registro-cliente.component.ts] - registrarCliente: Completed")
        //     );
}

    postRegistroClienteOk(response:any){
        console.log("[registro-cliente.component.ts] - postRegistroClienteOk | response: " + JSON.stringify(response));
        
        this.mensajes.Errores = response.Errores;
        if(response.CodigoError ==  200){
            this.iniciarSesion();
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    postRegistroClienteError(error:any){
        console.log("[registro-cliente.component.ts] - postRegistroClienteError: " + JSON.stringify(error));

        //miError : Error = new Error();
        //miError.Descripcion = "Ha ocurrido un error!!!";
        //this.errores.push(miError);
    }

    iniciarSesion(){
        //Llamar al Servicio que inicia sesión
    }

    parseIniciarSesionOk(oauth:any){
        // console.log("[client-register.component.ts] - parseIniciarSesionOk: " + oauth.access_token);
        // localStorage.setItem('access_token', oauth.access_token);
        // this.dataService.ini();
        // this.cargarTipoUsuario();
    }

    parseIniciarSesionError(error:any){
        // console.log("[client-register.component.ts] - parseIniciarSesionError: " + JSON.stringify(error));
    }
}