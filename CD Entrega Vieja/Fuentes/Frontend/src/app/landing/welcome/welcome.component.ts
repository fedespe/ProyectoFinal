import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Utilidades } from "../../shared/utilidades";
import { Mensaje } from "../../shared/mensaje";
import { Error } from "../../shared/error";
import { Exito } from "../../shared/exito";

@Component({
    selector: 'welcome',
    templateUrl: 'app/landing/welcome/welcome.component.html',
    styleUrls:  ['css/welcome.css']
})

export class WelcomeComponent{
    constructor(private dataService: DataService, private router: Router) {
    }
}