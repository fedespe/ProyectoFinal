/**
 * Created by Bruno on 19/04/2017.
 */
import { Component } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { Project } from '../../shared/project';
import { Router } from '@angular/router';
import { TranslateService } from "ng2-translate";
import { Error } from '../../shared/error';

@Component({
    selector: 'my-projects',
    templateUrl: 'app/dashboard/my-projects/my-projects.component.html',
    styleUrls:  ['css/my-projects.css']
})

export class MyProjectsComponent {
    errores: Error[] = [];
    message:string;
    projects: Project[] = [];
    projectToDelete: Project;
    tipoUsuario: string;

    constructor(private dataService: DataService, private router: Router, private translate: TranslateService) {
        this.message = "";
        this.errores = [];
        this.cargarLenguaje();
        this.getMyProjects(false);
        
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

    getMyProjects(recienEliminado:boolean) {
        this.dataService.postMyProjects()
            .subscribe(
                res => this.parseMyProjectsOk(res, recienEliminado),
                error => this.parseMyProjectsError(error),
                () => console.log("[my-projects.component.ts] - getMyProjects: Completed")
            );
    }

    parseMyProjectsOk(response:any, recienEliminado:boolean){
        console.log("[my-projects.component.ts] - parseMyProjectsOk | response: " + JSON.stringify(response));
        if(recienEliminado){
            this.message="El proyecto ha sido eliminado."
        }
        else{
            this.message="";
        }
        this.errores = response.Errors;
        if(response.ErrorCode ==  200){
            this.projects = response.SDTProyectoCollection;
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parseMyProjectsError(error:any){
        console.log("[my-projects.component.ts] - parseMyProjectsError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    }

    goViewProject(proyectoId:number){
        this.router.navigateByUrl('/dashboard/project-detail/' + proyectoId);
    }

    goEditProject(proyectoId:number){
        this.router.navigateByUrl('/dashboard/project-edit/' + proyectoId);
    }

    deleteProject(proyectoId:number){
        this.loadProject(proyectoId);
    }

    loadProject(proyectoId:number) {
        this.dataService.postProjectDetail(proyectoId)
            .subscribe(
                res => this.parseLoadProjectOk(res),
                error => this.parseLoadProjectError(error),
                () => console.log("[project-edit.component.ts] - loadProject: Completed")
            );
    }

    parseLoadProjectOk(response:any){
        console.log("[my-projects.component.ts] - parseLoadProjectOk | response: " + JSON.stringify(response));

        this.message="";
        this.errores = response.Errors;

        console.log(this.errores);

        if(response.ErrorCode ==  200){
            this.projectToDelete = response.SDTProyecto;
            console.log("[my'projects.component.ts] - project: " + JSON.stringify(this.projectToDelete));

            this.projectDelete();
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parseLoadProjectError(error:any){
        console.log("[my-projects.component.ts] - parseLoadProjectError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    }

    projectDelete() {
        this.dataService.postProjectDelete( this.projectToDelete )
            .subscribe(
                res => this.parseProjectDeleteOk(res),
                error => this.parseProjectDeleteError(error),
                () => console.log("[project-delete.component.ts] - postProjectDelete: Completed")
            );
    }

    parseProjectDeleteOk(response:any){
        console.log("[my-projects.component.ts] - parseProjectDeleteOk | response: " + JSON.stringify(response));
        this.message="";
        this.errores = response.Errors;
        if(response.ErrorCode ==  200){
            this.getMyProjects(true);
            this.projectToDelete = null;
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parseProjectDeleteError(error:any){
        console.log("[my-projects.component.ts] - parseProjectDeleteError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    }
}
