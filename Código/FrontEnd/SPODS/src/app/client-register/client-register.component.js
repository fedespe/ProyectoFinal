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
 * Created by Bruno on 10/04/2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var data_service_1 = require("../shared/services/data.service");
var usuario_1 = require("../shared/usuario");
var cliente_1 = require("../shared/cliente");
var ng2_translate_1 = require("ng2-translate");
var ClientRegisterComponent = (function () {
    function ClientRegisterComponent(dataService, router, translate) {
        this.dataService = dataService;
        this.router = router;
        this.translate = translate;
        this.errores = [];
        this.paises = [];
        this.cargarLenguaje();
        this.message = "";
        this.errores = [];
        this.paises = [];
    }
    ClientRegisterComponent.prototype.cargarLenguaje = function () {
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
    ClientRegisterComponent.prototype.cargarPaises = function () {
        var _this = this;
        console.log("[client-register.component.ts] - cargarPaises");
        this.dataService.postPais()
            .subscribe(function (res) { return _this.parsePaisOk(res); }, function (error) { return _this.parsePaisError(error); }, function () { return console.log("[client-register.component.ts]- cargarPaises: Completed"); });
    };
    ClientRegisterComponent.prototype.parsePaisOk = function (response) {
        console.log("[client-register.component.ts] - parsePaisOk | response: " + JSON.stringify(response));
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
    ClientRegisterComponent.prototype.parsePaisError = function (error) {
        console.log("There was an error loading the counties.");
        console.log("[client-register.component.ts] - parsePaisError: " + JSON.stringify(error));
    };
    ClientRegisterComponent.prototype.clientRegister = function (nombre, apellido, email, city, website, paisId, password, empresa, rubro) {
        var _this = this;
        console.log("[client-register.component.ts] - clientRegister : " + nombre + " / " + apellido + " / " + email + " / " + city + " / " + website + " / " + paisId + " / " + password + " / " + empresa + " / " + rubro);
        this.usuario = new usuario_1.Usuario(nombre, apellido, email, website, "CLIENTE", paisId, city, password);
        this.cliente = new cliente_1.Cliente(empresa, rubro);
        this.dataService.postClientRegister(this.usuario, this.cliente)
            .subscribe(function (res) { return _this.parseClientRegisterOk(res, email, password); }, function (error) { return _this.parseClientRegisterError(error); }, function () { return console.log("[client-register.component.ts] - clientRegister: Completed"); });
    };
    ClientRegisterComponent.prototype.parseClientRegisterOk = function (response, email, password) {
        console.log("[client-register.component.ts] - parseClientRegisterOk | response: " + JSON.stringify(response));
        this.message = "";
        this.errores = response.Errors;
        if (response.ErrorCode == 200) {
            this.iniciarSesion(email, password);
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    ClientRegisterComponent.prototype.parseClientRegisterError = function (error) {
        console.log("[client-register.component.ts] - parseClientRegisterError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    };
    ClientRegisterComponent.prototype.iniciarSesion = function (username, password) {
        var _this = this;
        this.dataService.postAccessToken(username, password)
            .subscribe(function (res) { return _this.parseIniciarSesionOk(res); }, function (error) { return _this.parseIniciarSesionError(error); }, function () { return console.log("[client-register.component.ts] - accessToken: Completed"); });
    };
    ClientRegisterComponent.prototype.parseIniciarSesionOk = function (oauth) {
        console.log("[client-register.component.ts] - parseIniciarSesionOk: " + oauth.access_token);
        localStorage.setItem('access_token', oauth.access_token);
        this.dataService.ini();
        this.cargarTipoUsuario();
    };
    ClientRegisterComponent.prototype.parseIniciarSesionError = function (error) {
        console.log("[client-register.component.ts] - parseIniciarSesionError: " + JSON.stringify(error));
        this.message = "Login error";
    };
    ClientRegisterComponent.prototype.cargarTipoUsuario = function () {
        var _this = this;
        this.dataService.postUsuario()
            .subscribe(function (res) { return _this.parseUsuarioOk(res); }, function (error) { return _this.parseUsuarioError(error); }, function () { return console.log("[client-register.component.ts] - cargarTipoUsuario: Completed"); });
    };
    ClientRegisterComponent.prototype.parseUsuarioOk = function (response) {
        console.log("[client-register.component.ts] - parseUsuarioOk");
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
    ClientRegisterComponent.prototype.parseUsuarioError = function (error) {
        console.log("[client-register.component.ts] - parseUsuarioError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    };
    return ClientRegisterComponent;
}());
ClientRegisterComponent = __decorate([
    core_1.Component({
        selector: 'client-register',
        templateUrl: 'app/client-register/client-register.component.html',
        styleUrls: ['css/client-register.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, ng2_translate_1.TranslateService])
], ClientRegisterComponent);
exports.ClientRegisterComponent = ClientRegisterComponent;
//# sourceMappingURL=client-register.component.js.map