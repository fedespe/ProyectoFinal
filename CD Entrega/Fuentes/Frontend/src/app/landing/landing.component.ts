import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'landing',
    templateUrl: 'app/landing/landing.component.html',
    styleUrls:  ['css/landing.css']
})
export class LandingComponent {
    constructor(private dataService: DataService, private router: Router) {
    }
}