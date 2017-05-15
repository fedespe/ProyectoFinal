/**
 * Created by Bruno on 15/04/2017.
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Project } from '../../shared/project';
import { ProjectFile } from '../../shared/projectFile';

import { TipoRender } from '../../shared/tipoRender';

import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Error } from '../../shared/error';
import {Render} from "../../shared/render";
import { TranslateService } from "ng2-translate";

@Component({
    selector: 'project-register',
    templateUrl: 'app/dashboard/project-register/project-register.component.html',
    styleUrls:  ['css/project-register.css']
})

export class ProjectRegisterComponent implements OnInit {
    errores: Error[] = [];
    message:string;
    public tiposRender: TipoRender[] = [];
    public myForm: FormGroup;
    project: Project;
    cantidadArchivos: number;
    cantidadRenders: number;
    proyectoId: number;
    

    constructor(private dataService: DataService, private router: Router, private fb: FormBuilder, private translate: TranslateService) {
        this.message = "";
        this.errores = [];
        this.cargarLenguaje();
        this.project = new Project();
        this.project.ProyectoCantidadRenders = 0;
        
        this.dataService.postTipoRender()
            .subscribe(
                res => this.parseTipoRenderOk(res),
                error => this.parseTipoRenderError(error),
                () => console.log("[project-register.component.ts] - postTipoRender: Completed")
            );
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

    ngOnInit() {
        this.myForm = this.fb.group({
            //Title: ['', [Validators.required, Validators.minLength(5)]],
            Title: [''],
            Description: [''],
            ExpectedDate: [''],
            NumberOfRenders: [''],
            Files: this.fb.array([
                //Si quiero que arranque con un archivo agregado
                // this.initFile(),
            ]),
            Renders: this.fb.array([
            ])
        });
    }

    initFile() {
        return this.fb.group({
            //Url: ['', Validators.required],
            Url: [''],
            FileDescription: ['']
        });
    }

    initRender() {
        return this.fb.group({
            Type: ['Select Type', Validators.maxLength(10)],
            RenderDescription: ['']
        });
    }

    addFile() {
        const control = <FormArray>this.myForm.controls['Files'];
        control.push(this.initFile());
    }

    removeFile(i: number) {
        const control = <FormArray>this.myForm.controls['Files'];
        control.removeAt(i);
    }

    addRender() {
        const control = <FormArray>this.myForm.controls['Renders'];
        control.push(this.initRender());
        this.project.ProyectoCantidadRenders = this.project.ProyectoCantidadRenders +1;
    }

    removeRender(j: number) {
        const control = <FormArray>this.myForm.controls['Renders'];
        control.removeAt(j);
        this.project.ProyectoCantidadRenders = this.project.ProyectoCantidadRenders -1;
    }
    
    projectRegister(model: any, tipo:string) {
        
        var estado = this.buscarEstado(tipo);
        this.project.ProyectoTitulo = model.controls.Title.value;
        this.project.ProyectoDescripcion = model.controls.Description.value;
        this.project.ProyectoFechaDeseada = model.controls.ExpectedDate.value;
        //this.project.ProyectoCantidadRenders = model.controls.NumberOfRenders.value;
        this.project.ProyectoEstado = estado;

        this.dataService.postProjectRegister( this.project )
            .subscribe(
                res => this.parseProjectRegisterOk(res),
                error => this.parseProjectRegisterError(error),
                () => console.log("[project-register.component.ts] - postProjectRegister: Completed")
            );
    }

    filesProjectRegister(){

        var control: any = <FormArray>this.myForm.controls['Files'];
        var archivos : ProjectFile[] = [];

        for(var i:number = 0 ; i < this.cantidadArchivos; i++) {
            var archivoUrl:string = control.controls[i].controls.Url.value;
            var archivoDescripcion:string = control.controls[i].controls.FileDescription.value;
            var archivo : ProjectFile = new ProjectFile(archivoUrl, archivoDescripcion, this.proyectoId);
        
            archivos.push(archivo);
        }

        this.dataService.postFilesProjectRegister(archivos)
            .subscribe(
                res => this.parseFilesProjectRegisterOk(res),
                error => this.parseFilesProjectRegisterError(error),
                () => console.log("[project-register.component.ts] - postFileProjectRegister: Completed")
            );
    }

    rendersProjectRegister(){

        var control: any = <FormArray>this.myForm.controls['Renders'];
        var renders : Render[] = [];

        for(var i:number = 0 ; i < this.cantidadRenders; i++) {
            var tipoRenderId:number = control.controls[i].controls.Type.value;
            var renderDescripcion:string = control.controls[i].controls.RenderDescription.value;
            
            var render : Render = new Render();
            render.TipoRenderId = tipoRenderId;
            render.ProyectoId = this.proyectoId;
            render.RenderDescripcion = renderDescripcion;

            renders.push(render);
        }

        this.dataService.postRendersProjectRegister(renders)
            .subscribe(
                res => this.parseRendersProjectRegisterOk(res),
                error => this.parseRendersProjectRegisterError(error),
                () => console.log("[project-register.component.ts] - postRenderProjectRegister: Completed")
            );
    }

    parseProjectRegisterOk(response:any){
        console.log("[project-register.component.ts] - parseProjectRegisterOk | response: " + JSON.stringify(response));
        this.message="";
        this.errores = response.Errors;
        if(response.ErrorCode ==  200){
            var controlFiles = <FormArray>this.myForm.controls['Files'];
            this.cantidadArchivos = controlFiles.controls.length;

            var controlRenders = <FormArray>this.myForm.controls['Renders'];
            this.cantidadRenders = controlRenders.controls.length;

            this.proyectoId = response.ProyectoId;

            if(this.cantidadArchivos > 0){
                this.filesProjectRegister();
            }
            else if(this.cantidadRenders > 0){
                this.rendersProjectRegister();
            }
            else{
                this.goMyProjects();
            }
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parseProjectRegisterError(error:any){
        console.log("[project-register.component.ts] - parseProjectRegisterError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    }

    parseFilesProjectRegisterOk(response:any){
        console.log("[project-register.component.ts] - parseFileProjectRegisterOk | response: " + JSON.stringify(response));

        var erroresArchivos:Error[];
        erroresArchivos = response.Errors;
        this.errores = this.errores.concat(erroresArchivos);

        if(response.ErrorCode ==  200){
            if(this.cantidadRenders > 0){
                this.rendersProjectRegister();
            }
            else{
                this.goMyProjects();
            }
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parseFilesProjectRegisterError(error:any){
        console.log("[project-register.component.ts] - parseFileProjectRegisterError: " + JSON.stringify(error));
        this.message += "An error occurred while adding files.";
    }

    parseRendersProjectRegisterOk(response:any){
        console.log("[project-register.component.ts] - parseRendersProjectRegisterOk | response: " + JSON.stringify(response));

        var erroresRenders:Error[];
        erroresRenders = response.Errors;
        this.errores = this.errores.concat(erroresRenders);

        if(response.ErrorCode ==  200){
            this.goMyProjects();
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parseRendersProjectRegisterError(error:any){
        console.log("[project-register.component.ts] - parseRendersProjectRegisterError: " + JSON.stringify(error));
        this.message += "An error occurred while adding renders.";
    }

    parseTipoRenderOk(response:any){
        console.log("[project-register.component.ts] - parseTipoRenderOk | response: " + JSON.stringify(response));
        
        this.message="";
        this.errores = response.Errors;
        if(response.ErrorCode ==  200){
            this.tiposRender = response.SDTTipoRenderCollection;
            console.log(JSON.stringify(this.tiposRender));
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parseTipoRenderError(error:any){
        console.log("[project-register.component.ts] - parseTipoRenderError: " + JSON.stringify(error));

        this.message = "There was an error loading the render types.";
    }

    buscarEstado(tipo:string){
        if(tipo === 'Save'){
            return 1;
        }
        else if(tipo === 'Validate'){
            return 2;
        }
        else{
            this.message = "An error has ocurred.";
        }
    }

    goMyProjects(){
        this.router.navigateByUrl('/dashboard/my-projects');
    }
}