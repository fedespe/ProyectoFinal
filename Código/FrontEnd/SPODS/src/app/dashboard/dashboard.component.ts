import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    styleUrls:  ['css/dashboard.css']
})
export class DashboardComponent {
    private tipoUsuario: string;
    nombreUsuario: string;

    constructor(private dataService: DataService, private router: Router) {
        this.nombreUsuario=localStorage.getItem('nombre-usuario');
    }

    cerrarSesion(){
        //limpiar local storage
        this.router.navigate(['/']);
    }
}
