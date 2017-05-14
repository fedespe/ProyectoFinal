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

    constructor(private dataService: DataService, private router: Router) {
    }

    cerrarSesion(){
        
    }
}
