import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { Utilidades } from "../shared/utilidades";
import { Mensaje } from "../shared/mensaje";
import { Error } from "../shared/error";
import { Exito } from "../shared/exito";
import { Cliente } from '../shared/cliente';

@Component({
    selector: 'inicio-sesion',
    templateUrl: 'app/inicio-sesion/inicio-sesion.component.html',
    styleUrls:  ['css/inicio-sesion.css']
})

export class InicioSesionComponent{
    mensajes: Mensaje = new Mensaje();
    cliente:Cliente = new Cliente();

    constructor(private dataService: DataService, private router: Router) {
    }
    
    navegarRegistroCliente(){
        this.router.navigateByUrl('/registro-cliente');
    }

    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    ingresarCliente() {
        this.borrarMensajes();
        Utilidades.log("[inicio-sesion.component.ts] - ingresarCliente | this.cliente: " + JSON.stringify(this.cliente));

        if(this.mensajes.Errores.length == 0){
            this.dataService.postIngresarCliente(this.cliente)
            .subscribe(
                res => this.postIngresarClienteOk(res),
                error => this.postIngresarClienteError(error),
                () => Utilidades.log("[inicio-sesion.component.ts] - postIngresarCliente: Completado")
            );
        }
    }

    postIngresarClienteOk(response:any){
        Utilidades.log("[inicio-sesion.component.ts] - postIngresarClienteOk | response: " + JSON.stringify(response));

        if(response.Codigo ==  200){
            Utilidades.log("[inicio-sesion.component.ts] - postIngresarClienteOk | response: " + JSON.stringify(response.Objetos[0]));
            //Guardar el response.Objetos[0] en local storage
            //localStorage.setItem('access_token', oauth.access_token); como ejemplo
            this.router.navigate(['dashboard/overview']);
        }
        else{
            Utilidades.log("[inicio-sesion.component.ts] - postIngresarClienteOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    postIngresarClienteError(error:any){
        Utilidades.log("[inicio-sesion.component.ts] - postIngresarClienteError | error: " + JSON.stringify(error));
        var errorInesperado = new Error();
        errorInesperado.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(errorInesperado);
    }
}