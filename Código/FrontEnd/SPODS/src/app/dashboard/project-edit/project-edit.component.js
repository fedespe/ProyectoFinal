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
 * Created by Bruno on 25/04/2017.
 */
var data_service_1 = require("../../shared/services/data.service");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var ng2_translate_1 = require("ng2-translate");
var error_1 = require("../../shared/error");
var ProjectEditComponent = (function () {
    function ProjectEditComponent(dataService, route, translate, router) {
        this.dataService = dataService;
        this.route = route;
        this.translate = translate;
        this.router = router;
        this.errores = [];
        this.message = "";
        this.errores = [];
        this.cargarLenguaje();
        this.cargarTipoUsuario();
    }
    ProjectEditComponent.prototype.cargarLenguaje = function () {
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
    ProjectEditComponent.prototype.cargarTipoUsuario = function () {
        this.userType = localStorage.getItem("user_type");
        if (this.userType == null) {
            this.userType = "";
        }
    };
    ProjectEditComponent.prototype.ngOnInit = function () {
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
    ProjectEditComponent.prototype.loadProject = function (proyectoId) {
        var _this = this;
        this.dataService.postProjectDetail(proyectoId)
            .subscribe(function (res) { return _this.parseLoadProjectOk(res); }, function (error) { return _this.parseLoadProjectError(error); }, function () { return console.log("[project-edit.component.ts] - loadProject: Completed"); });
    };
    ProjectEditComponent.prototype.parseLoadProjectOk = function (response) {
        console.log("[project-edit.component.ts] - parseLoadProjectOk | response: " + JSON.stringify(response));
        this.message = "";
        this.errores = response.Errors;
        console.log(this.errores);
        if (response.ErrorCode == 200) {
            this.project = response.SDTProyecto;
            console.log("[project-edit.component.ts] - project: " + JSON.stringify(this.project));
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    ProjectEditComponent.prototype.parseLoadProjectError = function (error) {
        console.log("[project-edit.component.ts] - parseLoadProjectError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    };
    ProjectEditComponent.prototype.saveChanges = function () {
        this.projectEdit();
    };
    ProjectEditComponent.prototype.deleteProject = function () {
        this.projectDelete();
    };
    ProjectEditComponent.prototype.sendToValidate = function () {
        this.project.ProyectoEstado = 2;
        this.projectEdit();
    };
    ProjectEditComponent.prototype.projectEdit = function () {
        var _this = this;
        this.dataService.postProjectEdit(this.project)
            .subscribe(function (res) { return _this.parseProjectEditOk(res); }, function (error) { return _this.parseProjectEditError(error); }, function () { return console.log("[project-edit.component.ts] - postProjectEdit: Completed"); });
    };
    ProjectEditComponent.prototype.parseProjectEditOk = function (response) {
        console.log("[project-edit.component.ts] - parseProjectEditOk | response: " + JSON.stringify(response));
        this.message = "";
        this.errores = response.Errors;
        if (response.ErrorCode == 200) {
            this.goMyProjects();
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    ProjectEditComponent.prototype.parseProjectEditError = function (error) {
        console.log("[project-edit.component.ts] - parseProjectEditError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    };
    ProjectEditComponent.prototype.projectDelete = function () {
        var _this = this;
        this.dataService.postProjectDelete(this.project)
            .subscribe(function (res) { return _this.parseProjectDeleteOk(res); }, function (error) { return _this.parseProjectDeleteError(error); }, function () { return console.log("[project-delete.component.ts] - postProjectDelete: Completed"); });
    };
    ProjectEditComponent.prototype.parseProjectDeleteOk = function (response) {
        console.log("[project-delete.component.ts] - parseProjectDeleteOk | response: " + JSON.stringify(response));
        this.message = "";
        this.errores = response.Errors;
        if (response.ErrorCode == 200) {
            this.goMyProjects();
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    ProjectEditComponent.prototype.parseProjectDeleteError = function (error) {
        console.log("[project-delete.component.ts] - parseProjectDeleteError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    };
    ProjectEditComponent.prototype.goMyProjects = function () {
        this.router.navigateByUrl('/dashboard/my-projects');
    };
    return ProjectEditComponent;
}());
ProjectEditComponent = __decorate([
    core_1.Component({
        //selector: 'project-detail',
        templateUrl: 'app/dashboard/project-edit/project-edit.component.html',
        styleUrls: ['css/project-edit.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.ActivatedRoute, ng2_translate_1.TranslateService, router_1.Router])
], ProjectEditComponent);
exports.ProjectEditComponent = ProjectEditComponent;
//# sourceMappingURL=project-edit.component.js.map