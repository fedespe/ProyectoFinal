import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Utilidades } from "../shared/utilidades";
import { Router } from '@angular/router';

@Component({
    selector: 'mi-cuenta',
    templateUrl: 'app/mi-cuenta/mi-cuenta.component.html',
    styleUrls:  ['css/mi-cuenta.css']
})
export class MiCuentaComponent {
    nombreUsuario: string;
    idUsuario:number;

    constructor(private dataService: DataService, private router: Router) {
        Utilidades.log("[mi-cuenta.component.ts] - constructor | localStorage.getItem('nombre-usuario'): " + localStorage.getItem('nombre-usuario'));
        Utilidades.log("[mi-cuenta.component.ts] - constructor | localStorage.getItem('id-usuario'): " + localStorage.getItem('id-usuario'));
        this.nombreUsuario = localStorage.getItem('nombre-usuario');
        this.idUsuario = parseInt(localStorage.getItem('id-usuario'));
    }

    cerrarSesion(){
        localStorage.clear();
        this.dataService.ini();
        this.router.navigate(['/']);
    }
}
