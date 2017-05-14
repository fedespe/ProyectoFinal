/**
 * Created by Bruno on 24/04/2017.
 */

import { DataService } from '../../shared/services/data.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Error } from '../../shared/error';

@Component({
    //selector: 'verview',
    templateUrl: 'app/dashboard/overview/overview.component.html',
})

export class OverviewComponent{

    constructor(private dataService: DataService, private route: ActivatedRoute) {
    }
}
