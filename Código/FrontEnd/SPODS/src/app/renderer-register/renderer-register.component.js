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
 * Created by Bruno on 11/04/2017.
 */
/**
 * Created by Bruno on 10/04/2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var data_service_1 = require("../shared/services/data.service");
var ng2_translate_1 = require("ng2-translate");
var usuario_1 = require("../shared/usuario");
var renderista_1 = require("../shared/renderista");
var RendererRegisterComponent = (function () {
    function RendererRegisterComponent(dataService, router, translate) {
        this.dataService = dataService;
        this.router = router;
        this.translate = translate;
        this.errores = [];
        this.paises = [];
        this.message = "";
        this.errores = [];
        this.cargarLenguaje();
        this.cargarPaises();
    }
    RendererRegisterComponent.prototype.cargarLenguaje = function () {
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
    RendererRegisterComponent.prototype.cargarPaises = function () {
        var _this = this;
        console.log("[renderer-register.component.ts] - cargarPaises");
        this.dataService.postPais()
            .subscribe(function (res) { return _this.parsePaisOk(res); }, function (error) { return _this.parsePaisError(error); }, function () { return console.log("[renderer-register.component.ts]- cargarPaises: Completed"); });
    };
    RendererRegisterComponent.prototype.parsePaisOk = function (response) {
        console.log("[renderer-register.component.ts] - parsePaisOk | response: " + JSON.stringify(response));
        this.message = "";
        this.errores = response.Errors;
        if (response.ErrorCode == 200) {
            this.paises = response.SDTPaisCollection;
            console.log(JSON.stringify(this.paises));
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    RendererRegisterComponent.prototype.parsePaisError = function (error) {
        console.log("There was an error loading the counties.");
        console.log("[client-register.component.ts] - parsePaisError: " + JSON.stringify(error));
    };
    RendererRegisterComponent.prototype.rendererRegister = function (nombre, apellido, email, city, website, paisId, password, empresa, rubro) {
        var _this = this;
        console.log("[renderer-register.component.ts] - rendererRegister : " + nombre + " / " + apellido + " / " + email + " / " + city + " / " + website + " / " + paisId + " / " + password + " / " + empresa + " / " + rubro);
        this.usuario = new usuario_1.Usuario(nombre, apellido, email, website, "RENDERISTA", paisId, city, password);
        this.renderista = new renderista_1.Renderista(empresa, rubro);
        this.dataService.postRendererRegister(this.usuario, this.renderista)
            .subscribe(function (res) { return _this.parseRendererRegisterOk(res, email, password); }, function (error) { return _this.parseRendererRegisterError(error); }, function () { return console.log("[renderer-register.component.ts] - rendererRegister: Completed"); });
    };
    RendererRegisterComponent.prototype.parseRendererRegisterOk = function (response, email, password) {
        console.log("[renderer-register.component.ts] - parseRendererRegisterOk | response: " + JSON.stringify(response));
        this.message = "";
        this.errores = response.Errors;
        if (response.ErrorCode == 200) {
            this.iniciarSesion(email, password);
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    RendererRegisterComponent.prototype.parseRendererRegisterError = function (error) {
        console.log("[renderer-register.component.ts] - parseRendererRegisterError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    };
    RendererRegisterComponent.prototype.iniciarSesion = function (username, password) {
        var _this = this;
        this.dataService.postAccessToken(username, password)
            .subscribe(function (res) { return _this.parseIniciarSesionOk(res); }, function (error) { return _this.parseIniciarSesionError(error); }, function () { return console.log("[renderer-register.component.ts] - accessToken: Completed"); });
    };
    RendererRegisterComponent.prototype.parseIniciarSesionOk = function (oauth) {
        console.log("[renderer-register.component.ts] - parseIniciarSesionOk: " + oauth.access_token);
        localStorage.setItem('access_token', oauth.access_token);
        this.dataService.ini();
        this.cargarTipoUsuario();
    };
    RendererRegisterComponent.prototype.parseIniciarSesionError = function (error) {
        console.log("[renderer-register.component.ts] - parseIniciarSesionError: " + JSON.stringify(error));
        this.message = "Login error";
    };
    RendererRegisterComponent.prototype.cargarTipoUsuario = function () {
        var _this = this;
        this.dataService.postUsuario()
            .subscribe(function (res) { return _this.parseUsuarioOk(res); }, function (error) { return _this.parseUsuarioError(error); }, function () { return console.log("[renderer-register.component.ts] - cargarTipoUsuario: Completed"); });
    };
    RendererRegisterComponent.prototype.parseUsuarioOk = function (response) {
        console.log("[renderer-register.component.ts] - parseUsuarioOk");
        this.message = "";
        this.errores = response.Errors;
        if (response.ErrorCode == 200) {
            localStorage.setItem('user_type', response.SDTUsuario.TipoUsuario);
            //this.router.navigate(['dashboard']);
            this.router.navigate(['dashboard/overview']);
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    RendererRegisterComponent.prototype.parseUsuarioError = function (error) {
        console.log("[renderer-register.component.ts] - parseUsuarioError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    };
    return RendererRegisterComponent;
}());
RendererRegisterComponent = __decorate([
    core_1.Component({
        selector: 'renderer-register',
        templateUrl: 'app/renderer-register/renderer-register.component.html',
        styleUrls: ['css/renderer-register.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, ng2_translate_1.TranslateService])
], RendererRegisterComponent);
exports.RendererRegisterComponent = RendererRegisterComponent;
//# sourceMappingURL=renderer-register.component.js.map