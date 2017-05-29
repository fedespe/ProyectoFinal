import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { Utilidades } from "../shared/utilidades";
import { Mensaje } from "../shared/mensaje";
import { Error } from "../shared/error";
import { Exito } from "../shared/exito";

@Component({
    selector: 'inicio-sesion',
    templateUrl: 'app/inicio-sesion/inicio-sesion.component.html',
    styleUrls:  ['css/inicio-sesion.css']
})

export class InicioSesionComponent{
    mensajes: Mensaje = new Mensaje();

    constructor(private dataService: DataService, private router: Router) {
    }
    
    navegarRegistroCliente(){
        this.router.navigateByUrl('/registro-cliente');
    }
}