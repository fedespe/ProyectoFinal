/**
 * Created by Bruno on 25/04/2017.
 */
import { DataService } from '../../shared/services/data.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../../shared/project';
import { TranslateService } from "ng2-translate";
import { Error } from '../../shared/error';

@Component({
    //selector: 'project-detail',
    templateUrl: 'app/dashboard/project-edit/project-edit.component.html',
    styleUrls:  ['css/project-edit.css']
})

export class ProjectEditComponent implements OnInit{
    project: Project;
    errores: Error[] = [];
    message:string;
    userType: string;

    constructor(private dataService: DataService, private route: ActivatedRoute, private translate: TranslateService, private router: Router) {
        this.message = "";
        this.errores = [];

        this.cargarLenguaje();
        this.cargarTipoUsuario();
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

    cargarTipoUsuario(){
        this.userType = localStorage.getItem("user_type");
        if(this.userType == null){
            this.userType = "";
        }
    }

    ngOnInit() {
        let id = +this.route.snapshot.params['id'];
        if(id>0){
            this.loadProject(id);
        }
        else{
            var er: Error;

            er = new Error();
            er.Description = "Debe indicar un proyecto.";
            this.errores.push(er);
        }
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
        console.log("[project-edit.component.ts] - parseLoadProjectOk | response: " + JSON.stringify(response));

        this.message="";
        this.errores = response.Errors;

        console.log(this.errores);

        if(response.ErrorCode ==  200){
            this.project = response.SDTProyecto;
            console.log("[project-edit.component.ts] - project: " + JSON.stringify(this.project));
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parseLoadProjectError(error:any){
        console.log("[project-edit.component.ts] - parseLoadProjectError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    }

    saveChanges(){
        this.projectEdit();
    }

    deleteProject(){
        this.projectDelete();
    }

    sendToValidate(){
        this.project.ProyectoEstado = 2;
        this.projectEdit();
    }


    projectEdit() {
        this.dataService.postProjectEdit( this.project )
            .subscribe(
                res => this.parseProjectEditOk(res),
                error => this.parseProjectEditError(error),
                () => console.log("[project-edit.component.ts] - postProjectEdit: Completed")
            );
    }

    parseProjectEditOk(response:any){
        console.log("[project-edit.component.ts] - parseProjectEditOk | response: " + JSON.stringify(response));
        this.message="";
        this.errores = response.Errors;
        if(response.ErrorCode ==  200){
            this.goMyProjects();
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parseProjectEditError(error:any){
        console.log("[project-edit.component.ts] - parseProjectEditError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    }

    projectDelete() {
        this.dataService.postProjectDelete( this.project )
            .subscribe(
                res => this.parseProjectDeleteOk(res),
                error => this.parseProjectDeleteError(error),
                () => console.log("[project-delete.component.ts] - postProjectDelete: Completed")
            );
    }

    parseProjectDeleteOk(response:any){
        console.log("[project-delete.component.ts] - parseProjectDeleteOk | response: " + JSON.stringify(response));
        this.message="";
        this.errores = response.Errors;
        if(response.ErrorCode ==  200){
            this.goMyProjects();
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parseProjectDeleteError(error:any){
        console.log("[project-delete.component.ts] - parseProjectDeleteError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    }

    goMyProjects(){
        this.router.navigateByUrl('/dashboard/my-projects');
    }
}
