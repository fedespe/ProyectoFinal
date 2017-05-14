/**
 * Created by Bruno on 19/04/2017.
 */
import { DataService } from '../../shared/services/data.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Project } from '../../shared/project';
import { Render } from '../../shared/render';
import { TranslateService } from "ng2-translate";
import { Error } from '../../shared/error';
import { RenderVersion } from '../../shared/renderVersion';
import { Annotation } from '../../shared/annotation';

//Declaramos la referncia a la libería externa "Annotorious"
declare var anno: any;

@Component({
    //selector: 'project-detail',
    templateUrl: 'app/dashboard/project-detail/project-detail.component.html',
    styleUrls:  ['css/project-detail.css']
})

export class ProjectDetailComponent implements OnInit{
    project: Project;
    renders: Render[] = [];
    rendersParaModificar: Render[] = [];
    renderParaModificar:Render = null;
    message:string;
    errores: Error[] = [];
    erroresPopUp: Error[] = [];
    avisosPopUp: Error[] = [];
    tipoUsuario: string;
    renderComentando: Render = null;
    renderVersionComentando: RenderVersion = null;
    srcImagenComentando:string;
    renderVersionCreando: RenderVersion = null;

    constructor(private dataService: DataService, private route: ActivatedRoute, private translate: TranslateService) {
        this.message = "";
        this.errores = [];
        this.erroresPopUp = [];
        this.avisosPopUp = [];

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

    ngOnInit() {
        let id = +this.route.snapshot.params['id'];
        if(id>0){
            this.loadProject(id);
        }
        else{
            var er: Error;

            er = new Error();
            er.Descripcion = "Debe indicar un proyecto.";
            this.errores.push(er);
        }
    }

    loadProject(proyectoId:number) {
        this.dataService.postProjectDetail(proyectoId)
            .subscribe(
                res => this.parseLoadProjectOk(res),
                error => this.parseLoadProjectError(error),
                () => console.log("[project-detail.component.ts] - loadProject: Completed")
            );
    }

    parseLoadProjectOk(response:any){
        console.log("[project-detail.component.ts] - parseLoadProjectOk | response: " + JSON.stringify(response));

        this.message="";
        this.errores = response.Errors;

        console.log(this.errores);

        if(response.ErrorCode ==  200){
            this.project = response.SDTProyecto;
            this.renders = response.SDTRenderCollection;
            console.log("[project-detail.component.ts] - project: " + JSON.stringify(this.project));
            console.log("[project-detail.component.ts] - renders: " + JSON.stringify(this.renders));
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parseLoadProjectError(error:any){
        console.log("[project-detail.component.ts] - parseLoadProjectError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    }

    modificarRender(){
        this.dataService.postRendersEdit(this.rendersParaModificar)
            .subscribe(
                res => this.parseRendersEditOk(res),
                error => this.parseRendersEditError(error),
                () => console.log("[project-detail.component.ts] - postRenderProjectRegister: Completed")
            );
    }

    marphApprove(render:Render){
        console.log("[project-detail.component.ts] - marphApprove | render: " + JSON.stringify(render));
        this.renderParaModificar = render;

        if(this.renderParaModificar != null){
            /*Comienzan los cambios que le debo hacer al render*/
            this.renderParaModificar.RenderEstado = 3;
            /*Terminan los cambios que le debo hacer al render*/
            this.rendersParaModificar.push(this.renderParaModificar);
            this.modificarRender();
        }
        else{
            //Dar error porque no se encontró el Render que se quiere modificar
        }
    }

    marphToCorrect(render:Render){
        console.log("[project-detail.component.ts] - marphToCorrect | render: " + JSON.stringify(render));
        this.renderParaModificar = render;

        if(this.renderParaModificar != null){
            /*Comienzan los cambios que le debo hacer al render*/
            this.renderParaModificar.RenderEstado = 1;
            /*Terminan los cambios que le debo hacer al render*/
            this.rendersParaModificar.push(this.renderParaModificar);
            this.modificarRender();
        }
        else{
            //Dar error porque no se encontró el Render que se quiere modificar
        }
    }
    marphValidateComments(render:Render){
        console.log("[project-detail.component.ts] - marphValidateComments | render: " + JSON.stringify(render));
        this.renderParaModificar = render;

        if(this.renderParaModificar != null){
            /*Comienzan los cambios que le debo hacer al render*/
            this.renderParaModificar.RenderEstado = 1;
            /*Terminan los cambios que le debo hacer al render*/
            this.rendersParaModificar.push(this.renderParaModificar);
            this.modificarRender();
        }
        else{
            //Dar error porque no se encontró el Render que se quiere modificar
        }
    }
    marphUnapproveComments(render:Render){
        console.log("[project-detail.component.ts] - marphUnapproveComments | render: " + JSON.stringify(render));
        this.renderParaModificar = render;

        if(this.renderParaModificar != null){
            /*Comienzan los cambios que le debo hacer al render*/
            this.renderParaModificar.RenderEstado = 3;
            /*Terminan los cambios que le debo hacer al render*/
            this.rendersParaModificar.push(this.renderParaModificar);
            this.modificarRender();
        }
        else{
            //Dar error porque no se encontró el Render que se quiere modificar
        }
    }

    rendererUploadFile(render:Render){
        console.log("[project-detail.component.ts] - rendererUploadFile| render: " + JSON.stringify(render));
        this.renderParaModificar = render;
        this.renderVersionCreando = new RenderVersion();
    }

    saveFile(){
        this.renderParaModificar.SDTRenderVersion = [];
        this.renderParaModificar.SDTRenderVersion.push(this.renderVersionCreando);

        this.dataService.postRenderVersionsCreate( this.renderParaModificar )
            .subscribe(
                res => this.postRenderVersionsCreateOk(res),
                error => this.postRenderVersionsCreateError(error),
                () => console.log("[project-detail.component.ts] - postRenderVersionsCreate: Completed")
            );
    }

    postRenderVersionsCreateOk(response:any){
        console.log("[project-detail.component.ts] - postRenderVersionsCreateOk | response: " + JSON.stringify(response));

        this.errores = response.Errors;

        if(response.ErrorCode ==  200){
            var aviso:Error;
            aviso = new Error();
            aviso.Descripcion = "Se ha generado una nueva versión del render.";
            this.avisosPopUp.push(aviso);
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    postRenderVersionsCreateError(error:any){
        console.log("[project-detail.component.ts] - postRenderVersionsCreateError: " + JSON.stringify(error));
    }


    clientApprove(render:Render){
        console.log("[project-detail.component.ts] - clientApprove | render: " + JSON.stringify(render));
        this.renderParaModificar = render;

        if(this.renderParaModificar != null){
            /*Comienzan los cambios que le debo hacer al render*/
            this.renderParaModificar.RenderEstado = 1;
            /*Terminan los cambios que le debo hacer al render*/
            this.rendersParaModificar.push(this.renderParaModificar);
            this.modificarRender();
        }
        else{
            //Dar error porque no se encontró el Render que se quiere modificar
        }
    }

    clientToCorrect(render:Render){
        console.log("[project-detail.component.ts] - clientToCorrect  | render: " + JSON.stringify(render));
        this.renderParaModificar = render;

        if(this.renderParaModificar != null){
            /*Comienzan los cambios que le debo hacer al render*/
            this.renderParaModificar.RenderEstado = 2;
            var etapa :number = this.renderParaModificar.RenderEtapa;
            if( etapa == 1 || etapa == 2 || etapa == 3){
                etapa++;
                this.renderParaModificar.RenderEtapa = etapa;
            }
            /*Terminan los cambios que le debo hacer al render*/
            this.rendersParaModificar.push(this.renderParaModificar);
            this.modificarRender();
        }
        else{
            //Dar error porque no se encontró el Render que se quiere modificar
        }
    }

    parseRendersEditOk(response:any){
        console.log("[project-detail.component.ts] - parseRendersEditOk | response: " + JSON.stringify(response));

        var erroresRenders:Error[];
        erroresRenders = response.Errors;
        this.errores = this.errores.concat(erroresRenders);

        if(response.ErrorCode ==  200){
            window.location.reload();
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parseRendersEditError(error:any){
        console.log("[project-detail.component.ts] - parseRendersEditError: " + JSON.stringify(error));
        this.message += "An error occurred while adding renders.";
    }

    public openEdit(render:Render, renderVersion:RenderVersion) {
        console.log("[project-detail.component.ts] - openEdit | Render: " + JSON.stringify(render));
        console.log("[project-detail.component.ts] - openEdit | RenderVersion: " + JSON.stringify(renderVersion));

        anno.reset();
        this.erroresPopUp = [];
        this.avisosPopUp = [];
        //var ruta: string = "http://localhost:8080/MarphJavaEnvironment/";

        this.renderComentando = render;
        this.renderVersionComentando = renderVersion;

        //var imagen: any = document.getElementById(imgId);
        //this.srcImagenComentando = imagen.src;
        //this.srcImagenComentando = ruta +renderVersion.RenderVersionArchivo;
        //this.srcImagenComentando = renderVersion.RenderVersionArchivo;
        this.srcImagenComentando = renderVersion.RenderVersionURL;
        // console.log(imagen);
        // console.log(this.srcImagenComentando);
    }

    public edit(imgId:string) {
        console.log(imgId);
        //Convertir en editable una imágen utilizando el método de la variable global "anno"
        var imagen : any = document.getElementById(imgId);
        //console.log(imagen);
        anno.makeAnnotatable(imagen);
        //Obtenemos las anotaciones como array de objetos
        var parsedJSON = this.renderVersionComentando.RenderVersionComentario;
        parsedJSON = parsedJSON.replace(/\\/g, '');
        //TODO: Obtenerlas desde un servicio (según vimos en ejemplos anteriores)
        var annotations: Annotation[] = JSON.parse(parsedJSON);
        //Por cada objeto se agrega una anotación utilizando el método de la variable global "anno"
        for (let annotation of annotations) {
            anno.addAnnotation(annotation)
        }
        console.log("[project-detail.component.ts] - edit: " + JSON.stringify(annotations));
    }

    // En éste método obtenemos todas las anotaciones realizadas y se asignan a un array de objetos de anotaciones
    //TODO: Integración con servicios reales
    public saveComments() {
        var annotations: Annotation[] = [];
        //Obtenemos las anotaciones como array de objetos utlizando el método de la variable global "anno"
        annotations = anno.getAnnotations();
        console.log("[project-detail.component.ts] - save: " + JSON.stringify(annotations));
        this.renderVersionComentando.RenderVersionComentario = JSON.stringify(annotations);
        this.renderComentando.SDTRenderVersion = [];
        this.renderComentando.SDTRenderVersion.push(this.renderVersionComentando);

        this.dataService.postRenderVersionsEdit( this.renderComentando )
            .subscribe(
                res => this.postRenderVersionsEditOk(res),
                error => this.postRenderVersionsEditError(error),
                () => console.log("[project-edit.component.ts] - postProjectEdit: Completed")
            );
    }

    postRenderVersionsEditOk(response:any){
        console.log("[project-edit.component.ts] - postRenderVersionsEditOk | response: " + JSON.stringify(response));
        this.message="";
        this.erroresPopUp = response.Errors;
        if(response.ErrorCode ==  200){
            var aviso:Error;
            aviso = new Error();
            aviso.Descripcion = "Comentarios guardados con éxito.";
            this.avisosPopUp.push(aviso);
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    postRenderVersionsEditError(error:any){
        console.log("[project-edit.component.ts] - postRenderVersionsEditError: " + JSON.stringify(error));
        var er:Error;
        er = new Error();
        er.Descripcion = "An error has ocurred.";
        this.erroresPopUp.push(er);
    }
}
