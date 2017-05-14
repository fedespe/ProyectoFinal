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
var core_1 = require("@angular/core");
var data_service_1 = require("../../shared/services/data.service");
var router_1 = require("@angular/router");
var ng2_translate_1 = require("ng2-translate");
var MyProjectsComponent = (function () {
    function MyProjectsComponent(dataService, router, translate) {
        this.dataService = dataService;
        this.router = router;
        this.translate = translate;
        this.errores = [];
        this.projects = [];
        this.message = "";
        this.errores = [];
        this.cargarLenguaje();
        this.getMyProjects(false);
        this.tipoUsuario = localStorage.getItem('user_type');
        if (this.tipoUsuario == null)
            this.tipoUsuario = "";
    }
    MyProjectsComponent.prototype.cargarLenguaje = function () {
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
    MyProjectsComponent.prototype.getMyProjects = function (recienEliminado) {
        var _this = this;
        this.dataService.postMyProjects()
            .subscribe(function (res) { return _this.parseMyProjectsOk(res, recienEliminado); }, function (error) { return _this.parseMyProjectsError(error); }, function () { return console.log("[my-projects.component.ts] - getMyProjects: Completed"); });
    };
    MyProjectsComponent.prototype.parseMyProjectsOk = function (response, recienEliminado) {
        console.log("[my-projects.component.ts] - parseMyProjectsOk | response: " + JSON.stringify(response));
        if (recienEliminado) {
            this.message = "El proyecto ha sido eliminado.";
        }
        else {
            this.message = "";
        }
        this.errores = response.Errors;
        if (response.ErrorCode == 200) {
            this.projects = response.SDTProyectoCollection;
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    MyProjectsComponent.prototype.parseMyProjectsError = function (error) {
        console.log("[my-projects.component.ts] - parseMyProjectsError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    };
    MyProjectsComponent.prototype.goViewProject = function (proyectoId) {
        this.router.navigateByUrl('/dashboard/project-detail/' + proyectoId);
    };
    MyProjectsComponent.prototype.goEditProject = function (proyectoId) {
        this.router.navigateByUrl('/dashboard/project-edit/' + proyectoId);
    };
    MyProjectsComponent.prototype.deleteProject = function (proyectoId) {
        this.loadProject(proyectoId);
    };
    MyProjectsComponent.prototype.loadProject = function (proyectoId) {
        var _this = this;
        this.dataService.postProjectDetail(proyectoId)
            .subscribe(function (res) { return _this.parseLoadProjectOk(res); }, function (error) { return _this.parseLoadProjectError(error); }, function () { return console.log("[project-edit.component.ts] - loadProject: Completed"); });
    };
    MyProjectsComponent.prototype.parseLoadProjectOk = function (response) {
        console.log("[my-projects.component.ts] - parseLoadProjectOk | response: " + JSON.stringify(response));
        this.message = "";
        this.errores = response.Errors;
        console.log(this.errores);
        if (response.ErrorCode == 200) {
            this.projectToDelete = response.SDTProyecto;
            console.log("[my'projects.component.ts] - project: " + JSON.stringify(this.projectToDelete));
            this.projectDelete();
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    MyProjectsComponent.prototype.parseLoadProjectError = function (error) {
        console.log("[my-projects.component.ts] - parseLoadProjectError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    };
    MyProjectsComponent.prototype.projectDelete = function () {
        var _this = this;
        this.dataService.postProjectDelete(this.projectToDelete)
            .subscribe(function (res) { return _this.parseProjectDeleteOk(res); }, function (error) { return _this.parseProjectDeleteError(error); }, function () { return console.log("[project-delete.component.ts] - postProjectDelete: Completed"); });
    };
    MyProjectsComponent.prototype.parseProjectDeleteOk = function (response) {
        console.log("[my-projects.component.ts] - parseProjectDeleteOk | response: " + JSON.stringify(response));
        this.message = "";
        this.errores = response.Errors;
        if (response.ErrorCode == 200) {
            this.getMyProjects(true);
            this.projectToDelete = null;
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    MyProjectsComponent.prototype.parseProjectDeleteError = function (error) {
        console.log("[my-projects.component.ts] - parseProjectDeleteError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    };
    return MyProjectsComponent;
}());
MyProjectsComponent = __decorate([
    core_1.Component({
        selector: 'my-projects',
        templateUrl: 'app/dashboard/my-projects/my-projects.component.html',
        styleUrls: ['css/my-projects.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, ng2_translate_1.TranslateService])
], MyProjectsComponent);
exports.MyProjectsComponent = MyProjectsComponent;
//# sourceMappingURL=my-projects.component.js.map