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
 * Created by Bruno on 15/04/2017.
 */
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var project_1 = require("../../shared/project");
var projectFile_1 = require("../../shared/projectFile");
var router_1 = require("@angular/router");
var data_service_1 = require("../../shared/services/data.service");
var render_1 = require("../../shared/render");
var ng2_translate_1 = require("ng2-translate");
var ProjectRegisterComponent = (function () {
    function ProjectRegisterComponent(dataService, router, fb, translate) {
        var _this = this;
        this.dataService = dataService;
        this.router = router;
        this.fb = fb;
        this.translate = translate;
        this.errores = [];
        this.tiposRender = [];
        this.message = "";
        this.errores = [];
        this.cargarLenguaje();
        this.project = new project_1.Project();
        this.project.ProyectoCantidadRenders = 0;
        this.dataService.postTipoRender()
            .subscribe(function (res) { return _this.parseTipoRenderOk(res); }, function (error) { return _this.parseTipoRenderError(error); }, function () { return console.log("[project-register.component.ts] - postTipoRender: Completed"); });
    }
    ProjectRegisterComponent.prototype.cargarLenguaje = function () {
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
    ProjectRegisterComponent.prototype.ngOnInit = function () {
        this.myForm = this.fb.group({
            //Title: ['', [Validators.required, Validators.minLength(5)]],
            Title: [''],
            Description: [''],
            ExpectedDate: [''],
            NumberOfRenders: [''],
            Files: this.fb.array([]),
            Renders: this.fb.array([])
        });
    };
    ProjectRegisterComponent.prototype.initFile = function () {
        return this.fb.group({
            //Url: ['', Validators.required],
            Url: [''],
            FileDescription: ['']
        });
    };
    ProjectRegisterComponent.prototype.initRender = function () {
        return this.fb.group({
            Type: ['Select Type', forms_1.Validators.maxLength(10)],
            RenderDescription: ['']
        });
    };
    ProjectRegisterComponent.prototype.addFile = function () {
        var control = this.myForm.controls['Files'];
        control.push(this.initFile());
    };
    ProjectRegisterComponent.prototype.removeFile = function (i) {
        var control = this.myForm.controls['Files'];
        control.removeAt(i);
    };
    ProjectRegisterComponent.prototype.addRender = function () {
        var control = this.myForm.controls['Renders'];
        control.push(this.initRender());
        this.project.ProyectoCantidadRenders = this.project.ProyectoCantidadRenders + 1;
    };
    ProjectRegisterComponent.prototype.removeRender = function (j) {
        var control = this.myForm.controls['Renders'];
        control.removeAt(j);
        this.project.ProyectoCantidadRenders = this.project.ProyectoCantidadRenders - 1;
    };
    ProjectRegisterComponent.prototype.projectRegister = function (model, tipo) {
        var _this = this;
        var estado = this.buscarEstado(tipo);
        this.project.ProyectoTitulo = model.controls.Title.value;
        this.project.ProyectoDescripcion = model.controls.Description.value;
        this.project.ProyectoFechaDeseada = model.controls.ExpectedDate.value;
        //this.project.ProyectoCantidadRenders = model.controls.NumberOfRenders.value;
        this.project.ProyectoEstado = estado;
        this.dataService.postProjectRegister(this.project)
            .subscribe(function (res) { return _this.parseProjectRegisterOk(res); }, function (error) { return _this.parseProjectRegisterError(error); }, function () { return console.log("[project-register.component.ts] - postProjectRegister: Completed"); });
    };
    ProjectRegisterComponent.prototype.filesProjectRegister = function () {
        var _this = this;
        var control = this.myForm.controls['Files'];
        var archivos = [];
        for (var i = 0; i < this.cantidadArchivos; i++) {
            var archivoUrl = control.controls[i].controls.Url.value;
            var archivoDescripcion = control.controls[i].controls.FileDescription.value;
            var archivo = new projectFile_1.ProjectFile(archivoUrl, archivoDescripcion, this.proyectoId);
            archivos.push(archivo);
        }
        this.dataService.postFilesProjectRegister(archivos)
            .subscribe(function (res) { return _this.parseFilesProjectRegisterOk(res); }, function (error) { return _this.parseFilesProjectRegisterError(error); }, function () { return console.log("[project-register.component.ts] - postFileProjectRegister: Completed"); });
    };
    ProjectRegisterComponent.prototype.rendersProjectRegister = function () {
        var _this = this;
        var control = this.myForm.controls['Renders'];
        var renders = [];
        for (var i = 0; i < this.cantidadRenders; i++) {
            var tipoRenderId = control.controls[i].controls.Type.value;
            var renderDescripcion = control.controls[i].controls.RenderDescription.value;
            var render = new render_1.Render();
            render.TipoRenderId = tipoRenderId;
            render.ProyectoId = this.proyectoId;
            render.RenderDescripcion = renderDescripcion;
            renders.push(render);
        }
        this.dataService.postRendersProjectRegister(renders)
            .subscribe(function (res) { return _this.parseRendersProjectRegisterOk(res); }, function (error) { return _this.parseRendersProjectRegisterError(error); }, function () { return console.log("[project-register.component.ts] - postRenderProjectRegister: Completed"); });
    };
    ProjectRegisterComponent.prototype.parseProjectRegisterOk = function (response) {
        console.log("[project-register.component.ts] - parseProjectRegisterOk | response: " + JSON.stringify(response));
        this.message = "";
        this.errores = response.Errors;
        if (response.ErrorCode == 200) {
            var controlFiles = this.myForm.controls['Files'];
            this.cantidadArchivos = controlFiles.controls.length;
            var controlRenders = this.myForm.controls['Renders'];
            this.cantidadRenders = controlRenders.controls.length;
            this.proyectoId = response.ProyectoId;
            if (this.cantidadArchivos > 0) {
                this.filesProjectRegister();
            }
            else if (this.cantidadRenders > 0) {
                this.rendersProjectRegister();
            }
            else {
                this.goMyProjects();
            }
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    ProjectRegisterComponent.prototype.parseProjectRegisterError = function (error) {
        console.log("[project-register.component.ts] - parseProjectRegisterError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    };
    ProjectRegisterComponent.prototype.parseFilesProjectRegisterOk = function (response) {
        console.log("[project-register.component.ts] - parseFileProjectRegisterOk | response: " + JSON.stringify(response));
        var erroresArchivos;
        erroresArchivos = response.Errors;
        this.errores = this.errores.concat(erroresArchivos);
        if (response.ErrorCode == 200) {
            if (this.cantidadRenders > 0) {
                this.rendersProjectRegister();
            }
            else {
                this.goMyProjects();
            }
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    ProjectRegisterComponent.prototype.parseFilesProjectRegisterError = function (error) {
        console.log("[project-register.component.ts] - parseFileProjectRegisterError: " + JSON.stringify(error));
        this.message += "An error occurred while adding files.";
    };
    ProjectRegisterComponent.prototype.parseRendersProjectRegisterOk = function (response) {
        console.log("[project-register.component.ts] - parseRendersProjectRegisterOk | response: " + JSON.stringify(response));
        var erroresRenders;
        erroresRenders = response.Errors;
        this.errores = this.errores.concat(erroresRenders);
        if (response.ErrorCode == 200) {
            this.goMyProjects();
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    ProjectRegisterComponent.prototype.parseRendersProjectRegisterError = function (error) {
        console.log("[project-register.component.ts] - parseRendersProjectRegisterError: " + JSON.stringify(error));
        this.message += "An error occurred while adding renders.";
    };
    ProjectRegisterComponent.prototype.parseTipoRenderOk = function (response) {
        console.log("[project-register.component.ts] - parseTipoRenderOk | response: " + JSON.stringify(response));
        this.message = "";
        this.errores = response.Errors;
        if (response.ErrorCode == 200) {
            this.tiposRender = response.SDTTipoRenderCollection;
            console.log(JSON.stringify(this.tiposRender));
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    ProjectRegisterComponent.prototype.parseTipoRenderError = function (error) {
        console.log("[project-register.component.ts] - parseTipoRenderError: " + JSON.stringify(error));
        this.message = "There was an error loading the render types.";
    };
    ProjectRegisterComponent.prototype.buscarEstado = function (tipo) {
        if (tipo === 'Save') {
            return 1;
        }
        else if (tipo === 'Validate') {
            return 2;
        }
        else {
            this.message = "An error has ocurred.";
        }
    };
    ProjectRegisterComponent.prototype.goMyProjects = function () {
        this.router.navigateByUrl('/dashboard/my-projects');
    };
    return ProjectRegisterComponent;
}());
ProjectRegisterComponent = __decorate([
    core_1.Component({
        selector: 'project-register',
        templateUrl: 'app/dashboard/project-register/project-register.component.html',
        styleUrls: ['css/project-register.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, forms_1.FormBuilder, ng2_translate_1.TranslateService])
], ProjectRegisterComponent);
exports.ProjectRegisterComponent = ProjectRegisterComponent;
//# sourceMappingURL=project-register.component.js.map