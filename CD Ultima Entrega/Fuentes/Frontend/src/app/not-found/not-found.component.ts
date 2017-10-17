import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { Utilidades } from "../shared/utilidades";
import { Mensaje } from "../shared/mensaje";
import { Error } from "../shared/error";
import { Exito } from "../shared/exito";

@Component({
    selector: 'not-found',
    templateUrl: 'app/not-found/not-found.component.html',
    styleUrls:  ['css/not-found.css']
})

export class NotFoundComponent{
    mensajes: Mensaje = new Mensaje();

    constructor(private dataService: DataService, private router: Router) {
    }

    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }
}