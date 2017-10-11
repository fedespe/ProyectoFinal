import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilidades } from "../../shared/utilidades";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { Exito } from "../../shared/exito";

@Component({
    selector: 'manual-usuario',
    templateUrl: 'app/landing/manual-usuario/manual-usuario.component.html',
    styleUrls:  ['css/manual-usuario.css']
})

export class ManualUsuarioComponent{
    mensajes : Mensaje = new Mensaje();
    loading : boolean = false;

    constructor(private dataService: DataService, private router: Router) {
    }

    borrarMensajes(){
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    }
    

    
}