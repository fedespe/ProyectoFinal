import { Component } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { Project } from '../../shared/project';
@Component({
    selector: 'projects',
    templateUrl: 'app/dashboard/projects/projects.component.html',
})
export class ProjectsComponent {
    projects: Project[] = [];
    constructor(private dataService: DataService) {
        this.getProjects();
        this.dataService.projectsEvent.subscribe((projects: Project[]) => {
            this.projects = projects;
        });
    }
    getProjects(){
        this.dataService.postProjects("", "800");
    }

    project(id: number) {
       
    }
}
