import { Component, ViewEncapsulation } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { TranslateService } from "ng2-translate";
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html',
    styleUrls:  ['css/dashboard.css']
})
export class DashboardComponent {
    private tipoUsuario: string;

    constructor(private dataService: DataService, private router: Router, private translate: TranslateService) {
        this.cargarLenguaje();

        this.tipoUsuario = localStorage.getItem('user_type');
        if(this.tipoUsuario == null)
            this.tipoUsuario = "";
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

    exit(){
        localStorage.setItem('access_token', '');
        localStorage.removeItem('user_type');

        this.dataService.ini();
        this.router.navigateByUrl('');
    }
    gotoProfile(){
        if(this.tipoUsuario=="CLIENTE")
        {
            this.router.navigateByUrl('/dashboard/my-profile-client');
        }
        // else if(this.tipoUsuario=="RENDERISTA"){
        //     this.router.navigateByUrl('/dashboard/my-profile-client-renderista');
        // }
    }
}
