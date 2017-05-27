import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { Error } from '../shared/error';

@Component({
    selector: 'inicio-sesion',
    templateUrl: 'app/inicio-sesion/inicio-sesion.component.html',
    styleUrls:  ['css/inicio-sesion.css']
})

export class InicioSesionComponent{
    errores: Error[] = [];
    message:string;
    
    constructor(private dataService: DataService, private router: Router) {
    }
    
    navegarRegistroCliente(){
        this.router.navigateByUrl('/registro-cliente');
    }
}