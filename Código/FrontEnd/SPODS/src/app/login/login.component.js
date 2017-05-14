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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var data_service_1 = require("../shared/services/data.service");
var ng2_translate_1 = require("ng2-translate");
var error_1 = require("../shared/error");
var LoginComponent = (function () {
    function LoginComponent(dataService, router, translate) {
        this.dataService = dataService;
        this.router = router;
        this.translate = translate;
        this.errores = [];
        this.message = "";
        this.errores = [];
        this.cargarLenguaje();
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('access_token') != null) {
            var accessToken = localStorage.getItem("access_token");
            if (accessToken != "") {
                this.router.navigate(['dashboard/overview']);
            }
        }
    };
    LoginComponent.prototype.cargarLenguaje = function () {
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
    LoginComponent.prototype.iniciarSesion = function (username, password) {
        this.controlarErrores(username, password);
        if (this.errores.length == 0) {
            this.accessToken(username, password);
        }
    };
    LoginComponent.prototype.controlarErrores = function (username, password) {
        var er;
        if (username == "") {
            er = new error_1.Error();
            er.Description = "Debe ingresar un nombre.";
            this.errores.push(er);
        }
        if (password == "") {
            er = new error_1.Error();
            er.Description = "Debe ingresar una contraseña.";
            this.errores.push(er);
        }
    };
    LoginComponent.prototype.accessToken = function (username, password) {
        var _this = this;
        this.dataService.postAccessToken(username, password)
            .subscribe(function (res) { return _this.parseAccessTokenOk(res); }, function (error) { return _this.parseAccessTokenError(error); }, function () { return console.log("[login.component.ts] - accessToken: Completed"); });
    };
    LoginComponent.prototype.parseAccessTokenOk = function (oauth) {
        console.log("[login.component.ts] - parseAccessTokenOk: " + oauth.access_token);
        localStorage.setItem('access_token', oauth.access_token);
        this.dataService.ini();
        this.cargarTipoUsuario();
    };
    LoginComponent.prototype.parseAccessTokenError = function (error) {
        console.log("[login.component.ts] - parseAccessTokenError: " + JSON.stringify(error));
        this.message = "Login error";
    };
    LoginComponent.prototype.cargarTipoUsuario = function () {
        var _this = this;
        this.dataService.postUsuario()
            .subscribe(function (res) { return _this.parseUsuarioOk(res); }, function (error) { return _this.parseUsuarioError(error); }, function () { return console.log("[login.component.ts] - cargarTipoUsuario: Completed"); });
    };
    LoginComponent.prototype.parseUsuarioOk = function (response) {
        console.log("[login.component.ts] - parseUsuarioOk");
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
    LoginComponent.prototype.parseUsuarioError = function (error) {
        console.log("[login.component.ts] - parseUsuarioError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    };
    LoginComponent.prototype.goClientRegister = function () {
        this.router.navigateByUrl('/registro-cliente');
    };
    LoginComponent.prototype.goRendererRegister = function () {
        this.router.navigateByUrl('/renderer-register');
    };
    LoginComponent.prototype.goForgotPassword = function () {
        this.router.navigateByUrl('/user-forgot-password');
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: 'app/login/login.component.html',
        styleUrls: ['css/login.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, ng2_translate_1.TranslateService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map