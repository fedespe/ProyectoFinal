import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'welcome',
    templateUrl: 'app/landing/welcome.component.html',
    styleUrls:  ['css/welcome.css']
})
export class WelcomeComponent {
    constructor(private dataService: DataService, private router: Router) {
    }
}