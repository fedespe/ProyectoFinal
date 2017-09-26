import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilidades } from "../../shared/utilidades";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { Exito } from "../../shared/exito";
import { Cliente } from '../../shared/cliente';
import { Barrio } from '../../shared/barrio';
import { Settings } from '../../shared/settings';


@Component({
    selector: 'perfil-usuario',
    templateUrl: 'app/mi-cuenta/perfil-usuario/perfil-usuario.component.html',
    styleUrls:  ['css/perfil-usuario.css']
})

export class PerfilUsuarioComponent{
    loading: boolean = true;
    mensajes: Mensaje = new Mensaje();
    cliente:Cliente = new Cliente();
    barrios:Barrio[] = [];
    baseURL:string=Settings.srcImg;
    editarImagen:boolean=false;
    urlImagen:string= Settings.srcImg +"/Cliente/IngresarImagen";
    
    constructor(private dataService: DataService, private router: Router) {
        this.cliente.NombreUsuario=localStorage.getItem('nombre-usuario');
        this.cliente.Id = parseInt(localStorage.getItem('id-usuario'));
        this.getObternerCliente();
        this.getObtenerBarrios();
    }
    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
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
            this.cliente.Imagen=response.Objetos[0].Imagen;
        }
        else{
            var error = new Error();
            error.Descripcion = "Ha ocurrido un error al cargar sus datos.";
            this.mensajes.Errores.push(error);
        }
        this.loading= false;
    }
    getObternerClienteError(responseError:any){
        Utilidades.log("[perfil-usuario.component.ts] - getObternerClienteError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading= false;
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
        if(response.Codigo ==  200){
            this.barrios = response.Objetos;
        }
        else{
            var error = new Error();
            error.Descripcion = "Ha ocurrido un error al cargar los barrios.";         
            this.mensajes.Errores.push(error);
        }
    }
    getBarrioObtenerTodosError(responseError:any){
        Utilidades.log("[perfil-usuario.component.ts] - getBarrioObtenerTodosError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }
    cambiarEditarImagen(){
        this.editarImagen=!this.editarImagen;
        Utilidades.log("[perfil-usuario.component.ts] - cambiarEditarImagen | this.editarImagen: " + JSON.stringify(this.editarImagen));
    }
    actualizarCliente(){
        this.loading = true;
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
        else{
            this.loading=false;
        }
    }
    putActualizarClienteOk(response:any){
        Utilidades.log("[perfil-usuario.component.ts] - putActualizarClienteOk | response: " + JSON.stringify(response));
        this.borrarMensajes();
        if(response.Codigo ==  200){
            //this.router.navigate(['/dashboard']);
            var exito = new Exito();
            exito.Descripcion = "Cambios realizados con éxito.";
            this.mensajes.Exitos.push(exito);
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;           
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    }
    putActualizarClienteError(responseError:any){
        Utilidades.log("[perfil-usuario.component.ts] - putActualizarClienteError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    }
}