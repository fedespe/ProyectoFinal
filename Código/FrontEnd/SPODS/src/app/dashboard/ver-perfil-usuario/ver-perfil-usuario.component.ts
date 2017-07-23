import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilidades } from "../../shared/utilidades";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { Exito } from "../../shared/exito";
import { Cliente } from '../../shared/cliente';
import { Barrio } from '../../shared/barrio';

@Component({
    selector: 'ver-perfil-usuario',
    templateUrl: 'app/dashboard/ver-perfil-usuario/ver-perfil-usuario.component.html',
    styleUrls:  ['css/ver-perfil-usuario.css']
})

export class VerPerfilUsuarioComponent implements OnInit{
    mensajes: Mensaje = new Mensaje();
    cliente:Cliente = new Cliente();
    loading = true;

    constructor(private dataService: DataService, private router: Router,private route: ActivatedRoute) {
        
    }

    ngOnInit() {
        // subscripción al observable params
        this.borrarMensajes();
        this.route.params
        .subscribe(params => {
            this.cliente.Id = parseInt(params['id']);
            Utilidades.log("[ver-perfil-usuario.component.ts] - ngOnInit | id: " + JSON.stringify(this.cliente.Id));   
        });
        this.getObternerCliente();     
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
            () => Utilidades.log("[ver-perfil-usuario.component.ts] - getObtenerCliente: Completado")
        );
    }

    getObternerClienteOk(response:any){
        Utilidades.log("[ver-perfil-usuario.component.ts] - getObternerClienteOk | response: " + JSON.stringify(response));
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
        this.loading = false;
    }

    getObternerClienteError(responseError:any){
        Utilidades.log("[ver-perfil-usuario.component.ts] - getObternerClienteError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    }  
}