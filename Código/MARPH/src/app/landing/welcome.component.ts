import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { Router } from '@angular/router';
import { TranslateService } from "ng2-translate";

@Component({
    selector: 'welcome',
    templateUrl: 'app/landing/welcome.component.html',
    styleUrls:  ['css/welcome.css']
})
export class WelcomeComponent {
    constructor(private dataService: DataService, private router: Router, private translate: TranslateService) {
        localStorage.setItem('default_language', 'en');

        this.cargarLenguaje();
    }

    cargarLenguaje(){
        this.translate.addLangs(['en', 'es']);
        if(localStorage.getItem('default_language') != null) {
            this.translate.setDefaultLang(localStorage.getItem('default_language'));
        }
        else{
            this.translate.setDefaultLang('en');
        }

        if(localStorage.getItem('selected_language') != null) {
            this.translate.use(localStorage.getItem('selected_language'));
        }
        else{
            this.translate.use(this.translate.getDefaultLang());
        }
    }
    
    changeLang(lang: string) {
        localStorage.setItem('selected_language', lang);
        this.translate.use(localStorage.getItem('selected_language'));
    }
    
    login() {
        this.router.navigate(['login']);
    }
}