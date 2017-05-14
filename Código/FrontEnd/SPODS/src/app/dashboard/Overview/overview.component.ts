/**
 * Created by Bruno on 24/04/2017.
 */

import { DataService } from '../../shared/services/data.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../../shared/project';
import { TranslateService } from "ng2-translate";
import { Error } from '../../shared/error';

@Component({
    //selector: 'verview',
    templateUrl: 'app/dashboard/overview/overview.component.html',
})

export class OverviewComponent{

    constructor(private dataService: DataService, private route: ActivatedRoute, private translate: TranslateService) {
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
}
