"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Bruno on 19/04/2017.
 */
var data_service_1 = require("../../shared/services/data.service");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ng2_translate_1 = require("ng2-translate");
var error_1 = require("../../shared/error");
var renderVersion_1 = require("../../shared/renderVersion");
var ProjectDetailComponent = (function () {
    function ProjectDetailComponent(dataService, route, translate) {
        this.dataService = dataService;
        this.route = route;
        this.translate = translate;
        this.renders = [];
        this.rendersParaModificar = [];
        this.renderParaModificar = null;
        this.errores = [];
        this.erroresPopUp = [];
        this.avisosPopUp = [];
        this.renderComentando = null;
        this.renderVersionComentando = null;
        this.renderVersionCreando = null;
        this.message = "";
        this.errores = [];
        this.erroresPopUp = [];
        this.avisosPopUp = [];
        this.cargarLenguaje();
        this.tipoUsuario = localStorage.getItem('user_type');
        if (this.tipoUsuario == null)
            this.tipoUsuario = "";
    }
    ProjectDetailComponent.prototype.cargarLenguaje = function () {
        this.translate.addLangs(['en', 'es']);
        if (localStorage.getItem('default_language') != null) {
            this.translate.setDefaultLang(localStorage.getItem('default_language'));
        }
        else {
            this.translate.setDefaultLang('en');
        }
        if (localStorage.getItem('selected_language') != null) {
            this.translate.use(localStorage.getItem('selected_language'));
        }
        else {
            this.translate.use(this.translate.getDefaultLang());
        }
    };
    ProjectDetailComponent.prototype.ngOnInit = function () {
        var id = +this.route.snapshot.params['id'];
        if (id > 0) {
            this.loadProject(id);
        }
        else {
            var er;
            er = new error_1.Error();
            er.Descripcion = "Debe indicar un proyecto.";
            this.errores.push(er);
        }
    };
    ProjectDetailComponent.prototype.loadProject = function (proyectoId) {
        var _this = this;
        this.dataService.postProjectDetail(proyectoId)
            .subscribe(function (res) { return _this.parseLoadProjectOk(res); }, function (error) { return _this.parseLoadProjectError(error); }, function () { return console.log("[project-detail.component.ts] - loadProject: Completed"); });
    };
    ProjectDetailComponent.prototype.parseLoadProjectOk = function (response) {
        console.log("[project-detail.component.ts] - parseLoadProjectOk | response: " + JSON.stringify(response));
        this.message = "";
        this.errores = response.Errors;
        console.log(this.errores);
        if (response.ErrorCode == 200) {
            this.project = response.SDTProyecto;
            this.renders = response.SDTRenderCollection;
            console.log("[project-detail.component.ts] - project: " + JSON.stringify(this.project));
            console.log("[project-detail.component.ts] - renders: " + JSON.stringify(this.renders));
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    ProjectDetailComponent.prototype.parseLoadProjectError = function (error) {
        console.log("[project-detail.component.ts] - parseLoadProjectError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    };
    ProjectDetailComponent.prototype.modificarRender = function () {
        var _this = this;
        this.dataService.postRendersEdit(this.rendersParaModificar)
            .subscribe(function (res) { return _this.parseRendersEditOk(res); }, function (error) { return _this.parseRendersEditError(error); }, function () { return console.log("[project-detail.component.ts] - postRenderProjectRegister: Completed"); });
    };
    ProjectDetailComponent.prototype.marphApprove = function (render) {
        console.log("[project-detail.component.ts] - marphApprove | render: " + JSON.stringify(render));
        this.renderParaModificar = render;
        if (this.renderParaModificar != null) {
            /*Comienzan los cambios que le debo hacer al render*/
            this.renderParaModificar.RenderEstado = 3;
            /*Terminan los cambios que le debo hacer al render*/
            this.rendersParaModificar.push(this.renderParaModificar);
            this.modificarRender();
        }
        else {
            //Dar error porque no se encontró el Render que se quiere modificar
        }
    };
    ProjectDetailComponent.prototype.marphToCorrect = function (render) {
        console.log("[project-detail.component.ts] - marphToCorrect | render: " + JSON.stringify(render));
        this.renderParaModificar = render;
        if (this.renderParaModificar != null) {
            /*Comienzan los cambios que le debo hacer al render*/
            this.renderParaModificar.RenderEstado = 1;
            /*Terminan los cambios que le debo hacer al render*/
            this.rendersParaModificar.push(this.renderParaModificar);
            this.modificarRender();
        }
        else {
            //Dar error porque no se encontró el Render que se quiere modificar
        }
    };
    ProjectDetailComponent.prototype.marphValidateComments = function (render) {
        console.log("[project-detail.component.ts] - marphValidateComments | render: " + JSON.stringify(render));
        this.renderParaModificar = render;
        if (this.renderParaModificar != null) {
            /*Comienzan los cambios que le debo hacer al render*/
            this.renderParaModificar.RenderEstado = 1;
            /*Terminan los cambios que le debo hacer al render*/
            this.rendersParaModificar.push(this.renderParaModificar);
            this.modificarRender();
        }
        else {
            //Dar error porque no se encontró el Render que se quiere modificar
        }
    };
    ProjectDetailComponent.prototype.marphUnapproveComments = function (render) {
        console.log("[project-detail.component.ts] - marphUnapproveComments | render: " + JSON.stringify(render));
        this.renderParaModificar = render;
        if (this.renderParaModificar != null) {
            /*Comienzan los cambios que le debo hacer al render*/
            this.renderParaModificar.RenderEstado = 3;
            /*Terminan los cambios que le debo hacer al render*/
            this.rendersParaModificar.push(this.renderParaModificar);
            this.modificarRender();
        }
        else {
            //Dar error porque no se encontró el Render que se quiere modificar
        }
    };
    ProjectDetailComponent.prototype.rendererUploadFile = function (render) {
        console.log("[project-detail.component.ts] - rendererUploadFile| render: " + JSON.stringify(render));
        this.renderParaModificar = render;
        this.renderVersionCreando = new renderVersion_1.RenderVersion();
    };
    ProjectDetailComponent.prototype.saveFile = function () {
        var _this = this;
        this.renderParaModificar.SDTRenderVersion = [];
        this.renderParaModificar.SDTRenderVersion.push(this.renderVersionCreando);
        this.dataService.postRenderVersionsCreate(this.renderParaModificar)
            .subscribe(function (res) { return _this.postRenderVersionsCreateOk(res); }, function (error) { return _this.postRenderVersionsCreateError(error); }, function () { return console.log("[project-detail.component.ts] - postRenderVersionsCreate: Completed"); });
    };
    ProjectDetailComponent.prototype.postRenderVersionsCreateOk = function (response) {
        console.log("[project-detail.component.ts] - postRenderVersionsCreateOk | response: " + JSON.stringify(response));
        this.errores = response.Errors;
        if (response.ErrorCode == 200) {
            var aviso;
            aviso = new error_1.Error();
            aviso.Descripcion = "Se ha generado una nueva versión del render.";
            this.avisosPopUp.push(aviso);
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    ProjectDetailComponent.prototype.postRenderVersionsCreateError = function (error) {
        console.log("[project-detail.component.ts] - postRenderVersionsCreateError: " + JSON.stringify(error));
    };
    ProjectDetailComponent.prototype.clientApprove = function (render) {
        console.log("[project-detail.component.ts] - clientApprove | render: " + JSON.stringify(render));
        this.renderParaModificar = render;
        if (this.renderParaModificar != null) {
            /*Comienzan los cambios que le debo hacer al render*/
            this.renderParaModificar.RenderEstado = 1;
            /*Terminan los cambios que le debo hacer al render*/
            this.rendersParaModificar.push(this.renderParaModificar);
            this.modificarRender();
        }
        else {
            //Dar error porque no se encontró el Render que se quiere modificar
        }
    };
    ProjectDetailComponent.prototype.clientToCorrect = function (render) {
        console.log("[project-detail.component.ts] - clientToCorrect  | render: " + JSON.stringify(render));
        this.renderParaModificar = render;
        if (this.renderParaModificar != null) {
            /*Comienzan los cambios que le debo hacer al render*/
            this.renderParaModificar.RenderEstado = 2;
            var etapa = this.renderParaModificar.RenderEtapa;
            if (etapa == 1 || etapa == 2 || etapa == 3) {
                etapa++;
                this.renderParaModificar.RenderEtapa = etapa;
            }
            /*Terminan los cambios que le debo hacer al render*/
            this.rendersParaModificar.push(this.renderParaModificar);
            this.modificarRender();
        }
        else {
            //Dar error porque no se encontró el Render que se quiere modificar
        }
    };
    ProjectDetailComponent.prototype.parseRendersEditOk = function (response) {
        console.log("[project-detail.component.ts] - parseRendersEditOk | response: " + JSON.stringify(response));
        var erroresRenders;
        erroresRenders = response.Errors;
        this.errores = this.errores.concat(erroresRenders);
        if (response.ErrorCode == 200) {
            window.location.reload();
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    ProjectDetailComponent.prototype.parseRendersEditError = function (error) {
        console.log("[project-detail.component.ts] - parseRendersEditError: " + JSON.stringify(error));
        this.message += "An error occurred while adding renders.";
    };
    ProjectDetailComponent.prototype.openEdit = function (render, renderVersion) {
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
    };
    ProjectDetailComponent.prototype.edit = function (imgId) {
        console.log(imgId);
        //Convertir en editable una imágen utilizando el método de la variable global "anno"
        var imagen = document.getElementById(imgId);
        //console.log(imagen);
        anno.makeAnnotatable(imagen);
        //Obtenemos las anotaciones como array de objetos
        var parsedJSON = this.renderVersionComentando.RenderVersionComentario;
        parsedJSON = parsedJSON.replace(/\\/g, '');
        //TODO: Obtenerlas desde un servicio (según vimos en ejemplos anteriores)
        var annotations = JSON.parse(parsedJSON);
        //Por cada objeto se agrega una anotación utilizando el método de la variable global "anno"
        for (var _i = 0, annotations_1 = annotations; _i < annotations_1.length; _i++) {
            var annotation = annotations_1[_i];
            anno.addAnnotation(annotation);
        }
        console.log("[project-detail.component.ts] - edit: " + JSON.stringify(annotations));
    };
    // En éste método obtenemos todas las anotaciones realizadas y se asignan a un array de objetos de anotaciones
    //TODO: Integración con servicios reales
    ProjectDetailComponent.prototype.saveComments = function () {
        var _this = this;
        var annotations = [];
        //Obtenemos las anotaciones como array de objetos utlizando el método de la variable global "anno"
        annotations = anno.getAnnotations();
        console.log("[project-detail.component.ts] - save: " + JSON.stringify(annotations));
        this.renderVersionComentando.RenderVersionComentario = JSON.stringify(annotations);
        this.renderComentando.SDTRenderVersion = [];
        this.renderComentando.SDTRenderVersion.push(this.renderVersionComentando);
        this.dataService.postRenderVersionsEdit(this.renderComentando)
            .subscribe(function (res) { return _this.postRenderVersionsEditOk(res); }, function (error) { return _this.postRenderVersionsEditError(error); }, function () { return console.log("[project-edit.component.ts] - postProjectEdit: Completed"); });
    };
    ProjectDetailComponent.prototype.postRenderVersionsEditOk = function (response) {
        console.log("[project-edit.component.ts] - postRenderVersionsEditOk | response: " + JSON.stringify(response));
        this.message = "";
        this.erroresPopUp = response.Errors;
        if (response.ErrorCode == 200) {
            var aviso;
            aviso = new error_1.Error();
            aviso.Descripcion = "Comentarios guardados con éxito.";
            this.avisosPopUp.push(aviso);
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    ProjectDetailComponent.prototype.postRenderVersionsEditError = function (error) {
        console.log("[project-edit.component.ts] - postRenderVersionsEditError: " + JSON.stringify(error));
        var er;
        er = new error_1.Error();
        er.Descripcion = "An error has ocurred.";
        this.erroresPopUp.push(er);
    };
    return ProjectDetailComponent;
}());
ProjectDetailComponent = __decorate([
    core_1.Component({
        //selector: 'project-detail',
        templateUrl: 'app/dashboard/project-detail/project-detail.component.html',
        styleUrls: ['css/project-detail.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.ActivatedRoute, ng2_translate_1.TranslateService])
], ProjectDetailComponent);
exports.ProjectDetailComponent = ProjectDetailComponent;
//# sourceMappingURL=project-detail.component.js.map