import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilidades } from "../../shared/utilidades";
import { Settings } from "../../shared/settings";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { Exito } from "../../shared/exito";

import { Cliente } from '../../shared/cliente';
import { Barrio } from '../../shared/barrio';
import { Carro } from '../../shared/carro';
import { Marca } from '../../shared/marca';

@Component({
    selector: 'registro-cliente',
    templateUrl: 'app/landing/registro-cliente/registro-cliente.component.html',
    styleUrls:  ['css/registro-cliente.css']
})

export class RegistroClienteComponent {
    mensajes: Mensaje = new Mensaje();
    cliente:Cliente = new Cliente();
    barrios:Barrio[] = [];
    contrasenaConfirmacion:string;
    step:number=1;
    urlImagen:string= Settings.srcImg +"/Cliente/IngresarImagen";//?idCliente=3&contrasena=123456789";
    

    constructor(private dataService: DataService, private router: Router) {      
        this.obtenerBarrios();
    }

    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    registrarClientePaso1(){
        this.borrarMensajes(),
        Utilidades.log("[registro-cliente.component.ts] - registrarClientePaso1 | this.cliente: " + JSON.stringify(this.cliente));
        this.cliente.Habilitado = true;
        this.mensajes.Errores = this.cliente.validarDatos1();
        if(this.mensajes.Errores.length == 0){
            this.step=2;
        }       
    }
    registrarClientePaso2(){
        this.borrarMensajes(),
        Utilidades.log("[registro-cliente.component.ts] - registrarClientePaso1 | this.cliente: " + JSON.stringify(this.cliente));
        this.cliente.Habilitado = true;
        this.mensajes.Errores = this.cliente.validarDatos2(this.contrasenaConfirmacion);
        if(this.mensajes.Errores.length == 0){
            this.registrarCliente();          
        }     
    }
    registrarClientePaso3(){       
        this.router.navigate(['dashboard/overview']);
    }

    volverPaso1(){
        this.step=1;
    }


    registrarCliente() {
        this.borrarMensajes();
        Utilidades.log("[registro-cliente.component.ts] - registrarCliente | this.cliente: " + JSON.stringify(this.cliente));


        if(this.mensajes.Errores.length == 0){
            this.dataService.postRegistrarCliente(this.cliente)
            .subscribe(
                res => this.postRegistrarClienteOk(res),
                error => this.postRegistrarClienteError(error),
                () => Utilidades.log("[registro-cliente.component.ts] - postRegistrarCliente: Completado")
            );
        }
    }

    postRegistrarClienteOk(response:any){
        Utilidades.log("[registro-cliente.component.ts] - postRegistroClienteOk | response: " + JSON.stringify(response));

        if(response.Codigo ==  200){
            Utilidades.log("[registro-cliente.component.ts] - postRegistroClienteOk | response: " + JSON.stringify(response.Codigo));
            this.ingresarCliente();
            this.step=3;
        }
        else{
            Utilidades.log("[registro-cliente.component.ts] - postRegistroClienteOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    postRegistrarClienteError(responseError:any){
        Utilidades.log("[registro-cliente.component.ts] - postRegistroClienteError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    /*ingresarCliente() {
        this.borrarMensajes();
        Utilidades.log("[registro-cliente.component.ts] - ingresarCliente | this.cliente: " + JSON.stringify(this.cliente));

        if(this.mensajes.Errores.length == 0){
            this.dataService.postIngresarCliente(this.cliente)
            .subscribe(
                res => this.postIngresarClienteOk(res),
                error => this.postIngresarClienteError(error),
                () => Utilidades.log("[registro-cliente.component.ts] - postIngresarCliente: Completado")
            );
        }
    }

    postIngresarClienteOk(response:any){
        Utilidades.log("[registro-cliente.component.ts] - postIngresarClienteOk | response: " + JSON.stringify(response));

        if(response.Codigo ==  200){
            Utilidades.log("[registro-cliente.component.ts] - postIngresarClienteOk | response: " + JSON.stringify(response.Objetos[0]));
            //Guardar el response.Objetos[0] en local storage
            //localStorage.setItem('access_token', oauth.access_token); como ejemplo
            localStorage.setItem('nombre-usuario', response.Objetos[0].NombreUsuario); //como ejemplo
            localStorage.setItem('id-usuario', response.Objetos[0].Id);   

            //PARA EL SUBMIT DEL IFRAME        
            this.cliente.Id=response.Objetos[0].Id;
            document.getElementById('inputIdCliente').setAttribute('value',this.cliente.Id.toString());
            document.getElementById('mostrarImagenes').click();
        }
        else{
            Utilidades.log("[registro-cliente.component.ts] - postIngresarClienteOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    postIngresarClienteError(responseError:any){
        Utilidades.log("[registro-cliente.component.ts] - postIngresarClienteError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }*/

    ingresarCliente() {
        this.borrarMensajes();
        Utilidades.log("[inicio-sesion.component.ts] - ingresarCliente | this.cliente: " + JSON.stringify(this.cliente));
        //this.loading = true;

        if(this.mensajes.Errores.length == 0){
            this.dataService.postAccessToken(this.cliente.NombreUsuario, this.cliente.Contrasena)
            .subscribe(
                res => this.postAccessTokenOk(res),
                error => this.postAccessTokenError(error),
                () => Utilidades.log("[inicio-sesion.component.ts] - postAccessToken: Completado")
            );
        }
    }

    postAccessTokenOk(response:any){
        Utilidades.log("[inicio-sesion.component.ts] - postAccessTokenOk | response: " + JSON.stringify(response));

        //if(response.Codigo ==  200){
            Utilidades.log("[inicio-sesion.component.ts] - postAccessTokenOk | response.access_token: " + response.access_token);
            localStorage.setItem('access_token', response.access_token);
            this.dataService.ini();
            this.dataService.getObtenerClienteLogueado()
            .subscribe(
                res => this.getObtenerClienteLogueadoOk(res),
                error => this.getObtenerClienteLogueadoError(error),
                () => Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueado: Completado")
            );
        /*}
        else{
            Utilidades.log("[inicio-sesion.component.ts] - postAccessTokenOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }*/
    }

    postAccessTokenError(responseError:any){
        //this.loading=false;
        Utilidades.log("[inicio-sesion.component.ts] - postAccessTokenError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    getObtenerClienteLogueadoOk(response:any){
        Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoOk | response: " + JSON.stringify(response));

        if(response.Codigo ==  200){
            Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoOk | response.Objetos[0]: " + JSON.stringify(response.Objetos[0]));
            localStorage.setItem('nombre-usuario', response.Objetos[0].NombreUsuario);
            localStorage.setItem('id-usuario', response.Objetos[0].Id);
            
            //PARA EL SUBMIT DEL IFRAME        
            this.cliente.Id=response.Objetos[0].Id;
            document.getElementById('inputIdCliente').setAttribute('value',this.cliente.Id.toString());
            document.getElementById('mostrarImagenes').click();

            Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoOk | localStorage.getItem('nombre-usuario'): " + localStorage.getItem('nombre-usuario'));
            Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoOk | localStorage.getItem('id-usuario'): " + localStorage.getItem('id-usuario'));
           // this.router.navigate(['/dashboard']);
        }
        else{
            Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getObtenerClienteLogueadoError(responseError:any){
        //this.loading=false;
        Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    obtenerBarrios(){
        this.dataService.getBarrioObtenerTodos()
            .subscribe(
            res => this.getBarrioObtenerTodosOk(res),
            error => this.getBarrioObtenerTodosError(error),
            () => Utilidades.log("[registro-cliente.component.ts] - getBarrioObtenerTodos: Completado")
        );
    }

    getBarrioObtenerTodosOk(response:any){
        Utilidades.log("[registro-cliente.component.ts] - getBarrioObtenerTodosOk | response: " + JSON.stringify(response));
        if(response.Codigo ==  200){
            this.barrios = response.Objetos;
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getBarrioObtenerTodosError(responseError:any){
        Utilidades.log("[registro-cliente.component.ts] - getBarrioObtenerTodosError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }











    //*************************** */
    //PRUEBA SERVICIOS
    //*************************** */
    // pruebaGetSinParametro(){
    //     this.dataService.getCarroObtenerTodos()
    //         .subscribe(
    //         res => this.pruebaOk(res),
    //         error => this.pruebaError(error),
    //         () => Utilidades.log("[registro-cliente.component.ts] - getCarroObtenerTodos: Completado")
    //     );
    // }

    // pruebaGetConParametro(){
    //     let id : number = 1;
    //     this.dataService.getCarroObtenerPorId(id)
    //         .subscribe(
    //         res => this.pruebaOk(res),
    //         error => this.pruebaError(error),
    //         () => Utilidades.log("[registro-cliente.component.ts] - getCarroObtenerPorId: Completado")
    //     );
    // }

    // pruebaPost(){
    //     let marca : Marca = new Marca();
    //     marca.Id = 6;
    //     marca.Nombre = "Volvo";
    //     let carro : Carro = new Carro();
    //     carro.Id = 6;
    //     carro.Marca = marca;
    //     carro.Modelo = 2017;

    //     this.dataService.postCarroAlta(carro)
    //         .subscribe(
    //         res => this.pruebaOk(res),
    //         error => this.pruebaError(error),
    //         () => Utilidades.log("[registro-cliente.component.ts] - postCarroAlta: Completado")
    //     );
    // }

    // pruebaPut(){
    //     let marca : Marca = new Marca();
    //     marca.Id = 6;
    //     marca.Nombre = "Volvo";

    //     let carro : Carro = new Carro();
    //     carro.Id = 1;
    //     carro.Marca = marca;
    //     carro.Modelo = 2017;
        
    //     this.dataService.putCarroActualizar(carro)
    //         .subscribe(
    //         res => this.pruebaOk(res),
    //         error => this.pruebaError(error),
    //         () => Utilidades.log("[registro-cliente.component.ts] - putCarroActualizar: Completado")
    //     );
    // }

    // pruebaDelete(){
    //     let marca : Marca = new Marca();
    //     marca.Id = 1;
    //     marca.Nombre = "Ferrari";

    //     let carro : Carro = new Carro();
    //     carro.Id = 1;
    //     carro.Marca = marca;
    //     carro.Modelo = 2012;
        
    //     this.dataService.deleteCarroEliminar(carro)
    //         .subscribe(
    //         res => this.pruebaOk(res),
    //         error => this.pruebaError(error),
    //         () => Utilidades.log("[registro-cliente.component.ts] - deleteCarroEliminar: Completado")
    //     );
    // }

    // pruebaOk(response:any){
    //     Utilidades.log("[registro-cliente.component.ts] - pruebaOk | response: " + JSON.stringify(response));
    // }

    // pruebaError(error:any){
    //     Utilidades.log("[registro-cliente.component.ts] - pruebaError | error: " + JSON.stringify(error));
    //     var errorInesperado = new Error();
    //     errorInesperado.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
    //     this.mensajes.Errores.push(errorInesperado);
    // }

    //*************************** */
    //PRUEBA SERVICIOS
    //*************************** */

    // setClassesStep1(){
    //     let classes = {
    //         hidden: this.step==1,  
    //     };
    //     return classes;
    // }

    // setClassesStep2(){
    //     let classes = {
    //         hidden: this.step==2,  
    //     };
    //     return classes;
    // }
   
}