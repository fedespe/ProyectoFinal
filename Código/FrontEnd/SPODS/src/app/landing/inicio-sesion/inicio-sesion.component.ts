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
    loading : boolean = false;

    constructor(private dataService: DataService, private router: Router){
        this.cerrarSesion();
    }
    
    navegarRegistroCliente(){
        this.router.navigateByUrl('/registro-cliente');
    }
    navegarOlvidoPassword(){
        this.router.navigateByUrl('/olvido-password');
    }

    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }

    /*
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
    */
    ingresarCliente() {
        this.borrarMensajes();
        Utilidades.log("[inicio-sesion.component.ts] - ingresarCliente | this.cliente: " + JSON.stringify(this.cliente));
        this.loading = true;

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
        this.loading=false;
        Utilidades.log("[inicio-sesion.component.ts] - postAccessTokenError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Verifique usuario y contraseña e intente nuevamente.";
        this.mensajes.Errores.push(error);
    }

    getObtenerClienteLogueadoOk(response:any){
        Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoOk | response: " + JSON.stringify(response));

        if(response.Codigo ==  200){
            Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoOk | response.Objetos[0]: " + JSON.stringify(response.Objetos[0]));
            localStorage.setItem('nombre-usuario', response.Objetos[0].NombreUsuario);
            localStorage.setItem('id-usuario', response.Objetos[0].Id);
            Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoOk | localStorage.getItem('nombre-usuario'): " + localStorage.getItem('nombre-usuario'));
            Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoOk | localStorage.getItem('id-usuario'): " + localStorage.getItem('id-usuario'));
            this.router.navigate(['/dashboard']);
        }
        else{
            Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getObtenerClienteLogueadoError(responseError:any){
        this.loading=false;
        Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    cerrarSesion(){
        localStorage.clear();
        this.dataService.ini();
    }
}