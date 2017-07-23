import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilidades } from "../../shared/utilidades";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { Exito } from "../../shared/exito";
import { Cliente } from '../../shared/cliente';

@Component({
    selector: 'inicio-sesion',
    templateUrl: 'app/landing/inicio-sesion/inicio-sesion.component.html',
    styleUrls:  ['css/inicio-sesion.css']
})

export class InicioSesionComponent{
    mensajes : Mensaje = new Mensaje();
    cliente : Cliente = new Cliente();

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
            Utilidades.log("[inicio-sesion.component.ts] - postIngresarClienteOk | response.Objetos[0]: " + JSON.stringify(response.Objetos[0]));
            //Guardar el response.Objetos[0] en local storage
            Utilidades.log("[inicio-sesion.component.ts] - postIngresarClienteOk | response.Objetos[0].NombreUsuario: " + JSON.stringify(response.Objetos[0].NombreUsuario));
            localStorage.setItem('nombre-usuario', response.Objetos[0].NombreUsuario); //como ejemplo
            localStorage.setItem('id-usuario', response.Objetos[0].Id); 
            this.router.navigate(['/dashboard']);
        }
        else{
            Utilidades.log("[inicio-sesion.component.ts] - postIngresarClienteOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    postIngresarClienteError(responseError:any){
        Utilidades.log("[inicio-sesion.component.ts] - postIngresarClienteError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }
}