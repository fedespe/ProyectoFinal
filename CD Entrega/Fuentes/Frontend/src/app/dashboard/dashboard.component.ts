import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Utilidades } from "../shared/utilidades";
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    styleUrls:  ['css/dashboard.css']
})
export class DashboardComponent {
    private tipoUsuario: string;
    nombreUsuario: string;
    idUsuario:number;

    constructor(private dataService: DataService, private router: Router) {
        Utilidades.log("[dashboard.component.ts] - constructor | localStorage.getItem('nombre-usuario'): " + localStorage.getItem('nombre-usuario'));
        Utilidades.log("[dashboard.component.ts] - constructor | localStorage.getItem('id-usuario'): " + localStorage.getItem('id-usuario'));
        this.nombreUsuario = localStorage.getItem('nombre-usuario');
        this.idUsuario = parseInt(localStorage.getItem('id-usuario'));
    }

    cerrarSesion(){
        localStorage.clear();
        this.dataService.ini();
        this.router.navigate(['/']);
    }
}
