import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilidades } from "../../shared/utilidades";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { Exito } from "../../shared/exito";
import { Cliente } from '../../shared/cliente';
import { Barrio } from '../../shared/barrio';


@Component({
    selector: 'perfil-usuario',
    templateUrl: 'app/dashboard/perfil-usuario/perfil-usuario.component.html',
    styleUrls:  ['css/perfil-usuario.css']
})

export class PerfilUsuarioComponent{
    mensajes: Mensaje = new Mensaje();
    cliente:Cliente = new Cliente();
    barrios:Barrio[] = [];
    

    constructor(private dataService: DataService, private router: Router) {
        this.cliente.NombreUsuario=localStorage.getItem('nombre-usuario');
        this.cliente.Id = parseInt(localStorage.getItem('id-usuario'));
        this.getObtenerBarrios();
        this.getObternerCliente();
        
    }
    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }
    
    actualizarCliente(){
        this.borrarMensajes();
        Utilidades.log("[perfil-usuario.component.ts] - registrarCliente | this.cliente: " + JSON.stringify(this.cliente));
        
        this.mensajes.Errores = this.cliente.validarActualizacionUsuario();

        if(this.mensajes.Errores.length == 0){
            this.dataService.putActualizarCliente(this.cliente)
            .subscribe(
                res => this.putActualizarClienteOk(res),
                error => this.putActualizarClienteError(error),
                () => Utilidades.log("[perfil-usuario.component.ts] - postRegistrarCliente: Completado")
            );
        }
    }


    putActualizarClienteOk(response:any){
        Utilidades.log("[perfil-usuario.component.ts] - putActualizarClienteOk | response: " + JSON.stringify(response));

        if(response.Codigo ==  200){
            this.router.navigate(['/dashboard']);
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    putActualizarClienteError(responseError:any){
        Utilidades.log("[perfil-usuario.component.ts] - putActualizarClienteError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    getObtenerBarrios(){
        this.dataService.getBarrioObtenerTodos()
            .subscribe(
            res => this.getBarrioObtenerTodosOk(res),
            error => this.getBarrioObtenerTodosError(error),
            () => Utilidades.log("[perfil-usuario.component.ts] - getBarrioObtenerTodos: Completado")
        );
    }

    getBarrioObtenerTodosOk(response:any){
        Utilidades.log("[perfil-usuario.component.ts] - getBarrioObtenerTodosOk | response: " + JSON.stringify(response));
        this.barrios = response.Objetos;
        if(response.Codigo ==  200){
            
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getBarrioObtenerTodosError(responseError:any){
        Utilidades.log("[perfil-usuario.component.ts] - getBarrioObtenerTodosError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }

    getObternerCliente(){
        this.dataService.getObtenerCliente(this.cliente.Id)
            .subscribe(
            res => this.getObternerClienteOk(res),
            error => this.getObternerClienteError(error),
            () => Utilidades.log("[perfil-usuario.component.ts] - getBarrioObtenerTodos: Completado")
        );
    }

    getObternerClienteOk(response:any){
        Utilidades.log("[perfil-usuario.component.ts] - getObternerClienteOk | response: " + JSON.stringify(response));
        if(response.Codigo ==  200){
            this.cliente.Nombre = response.Objetos[0].Nombre;
            this.cliente.Apellido = response.Objetos[0].Apellido;
            this.cliente.Telefono = response.Objetos[0].Telefono;
            this.cliente.Direccion = response.Objetos[0].Direccion;
            this.cliente.Barrio.Id = response.Objetos[0].Barrio.Id;
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
    }

    getObternerClienteError(responseError:any){
        Utilidades.log("[perfil-usuario.component.ts] - getObternerClienteError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }
    
}