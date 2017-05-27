import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { Utilidades } from "../shared/utilidades";
import { Mensaje } from "../shared/mensaje";
import { Error } from "../shared/error";
import { Cliente } from '../shared/cliente';
import { Barrio } from '../shared/barrio';
import { Carro } from '../shared/carro';
import { Marca } from '../shared/marca';

@Component({
    selector: 'registro-cliente',
    templateUrl: 'app/registro-cliente/registro-cliente.component.html',
    styleUrls:  ['css/registro-cliente.css']
})

export class RegistroClienteComponent {
    mensajes: Mensaje = new Mensaje();
    cliente:Cliente = new Cliente();
    barrios:Barrio[] = [];

    constructor(private dataService: DataService, private router: Router) {
        //Solo para prueba se tiene que cargar con un servicio que traiga los barrios del sistema
        var barrio:Barrio=new Barrio();
        barrio.Id=1;
        barrio.Nombre='Centro';
        this.barrios.push(barrio); 
        var barrio2:Barrio= new Barrio();      
        barrio2.Id=2;
        barrio2.Nombre="Cordón";
        this.barrios.push(barrio2);
    }

    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    registrarCliente() {
        this.borrarMensajes();
        Utilidades.log("[registro-cliente.component.ts] - registrarCliente | this.cliente: " + JSON.stringify(this.cliente));

        this.mensajes.Errores = this.cliente.validarDatos();
        if(this.mensajes.Errores.length == 0){
            //Llamaría al servicio para dar de alta clientes
        }

        this.pruebaGetSinParametro();
        //this.pruebaGetConParametro();
        //this.pruebaPost();
        //this.pruebaPut();
        //this.pruebaDelete();
    }

    pruebaGetSinParametro(){
        this.dataService.getCarroObtenerTodos()
            .subscribe(
            res => this.pruebaOk(res),
            error => this.pruebaError(error),
            () => Utilidades.log("[registro-cliente.component.ts] - getCarroObtenerTodos: Completado")
        );
    }

    pruebaGetConParametro(){
        let id : number = 1;
        this.dataService.getCarroObtenerPorId(id)
            .subscribe(
            res => this.pruebaOk(res),
            error => this.pruebaError(error),
            () => Utilidades.log("[registro-cliente.component.ts] - getCarroObtenerPorId: Completado")
        );
    }

    pruebaPost(){
        let marca : Marca = new Marca();
        marca.Id = 6;
        marca.Nombre = "Volvo";
        let carro : Carro = new Carro();
        carro.Id = 6;
        carro.Marca = marca;
        carro.Modelo = 2017;

        this.dataService.postCarroAlta(carro)
            .subscribe(
            res => this.pruebaOk(res),
            error => this.pruebaError(error),
            () => Utilidades.log("[registro-cliente.component.ts] - postCarroAlta: Completado")
        );
    }

    pruebaPut(){
        let marca : Marca = new Marca();
        marca.Id = 6;
        marca.Nombre = "Volvo";

        let carro : Carro = new Carro();
        carro.Id = 1;
        carro.Marca = marca;
        carro.Modelo = 2017;
        
        this.dataService.putCarroActualizar(carro)
            .subscribe(
            res => this.pruebaOk(res),
            error => this.pruebaError(error),
            () => Utilidades.log("[registro-cliente.component.ts] - putCarroActualizar: Completado")
        );
    }

    pruebaDelete(){
        let marca : Marca = new Marca();
        marca.Id = 1;
        marca.Nombre = "Ferrari";

        let carro : Carro = new Carro();
        carro.Id = 1;
        carro.Marca = marca;
        carro.Modelo = 2012;
        
        this.dataService.deleteCarroEliminar(carro)
            .subscribe(
            res => this.pruebaOk(res),
            error => this.pruebaError(error),
            () => Utilidades.log("[registro-cliente.component.ts] - deleteCarroEliminar: Completado")
        );
    }

    pruebaOk(response:any){
        Utilidades.log("[registro-cliente.component.ts] - pruebaOk | response: " + JSON.stringify(response));
    }

    pruebaError(error:any){
        Utilidades.log("[registro-cliente.component.ts] - pruebaError | error: " + JSON.stringify(error));
        var errorInesperado = new Error();
        errorInesperado.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(errorInesperado);
    }


    // postRegistroClienteOk(response:any){
    //     Utilidades.log("[registro-cliente.component.ts] - postRegistroClienteOk | response: " + JSON.stringify(response));
        
    //     // this.mensajes.Errores = response.Errores;
    //     // if(response.CodigoError ==  200){
    //     //     this.iniciarSesion();
    //     // }
    //     // else{
    //     //     //Acá podría controlar los códigos de error que me mando desde el backend
    //     // }
    // }

    // postRegistroClienteError(error:any){
    //     Utilidades.log("[registro-cliente.component.ts] - postRegistroClienteError | error: " + JSON.stringify(error));
    //     var errorInesperado = new Error();
    //     errorInesperado.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
    //     this.mensajes.Errores.push(errorInesperado);
    // }
}