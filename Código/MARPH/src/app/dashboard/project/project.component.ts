import { Component } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
@Component({
    selector: 'project',
    templateUrl: 'app/dashboard/project/project.component.html',
})
export class ProjectComponent {
    constructor(private dataService: DataService) {
    }
}
