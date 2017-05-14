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
 * Created by Usuario on 12/5/2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var data_service_1 = require("../shared/services/data.service");
var error_1 = require("../shared/error");
var ng2_translate_1 = require("ng2-translate");
var UserForgotPasswordComponent = (function () {
    function UserForgotPasswordComponent(dataService, router, translate) {
        this.dataService = dataService;
        this.router = router;
        this.translate = translate;
        this.errores = [];
        this.mensajes = [];
        this.message = "";
        this.errores = [];
        this.mensajes = [];
        this.cargarMensaje();
        this.cargarLenguaje();
    }
    UserForgotPasswordComponent.prototype.cargarLenguaje = function () {
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
    UserForgotPasswordComponent.prototype.Recover = function (email) {
        var _this = this;
        this.dataService.postForgotPassword(email)
            .subscribe(function (res) { return _this.RecoverPasswordOk(res); }, function (error) { return _this.RecoverPasswordError(error); }, function () { return console.log("[user-forgot-password.component.ts] - RecoverPassword: Completed"); });
    };
    UserForgotPasswordComponent.prototype.cargarMensaje = function () {
        var mensaje = new error_1.Error();
        mensaje.Descripcion = "forgot-passwordMessage";
        this.mensajes.push(mensaje);
    };
    UserForgotPasswordComponent.prototype.RecoverPasswordOk = function (response) {
        console.log("[user-forgot-password.component.ts] - 1");
        console.log("[user-forgot-password.component.ts] - RecoverPasswordOk");
        this.mensajes = [];
        this.message = "";
        this.errores = response.Errors;
        if (response.ErrorCode == 200) {
            var mensaje = new error_1.Error();
            mensaje.Descripcion = "Check your mail!. We have sent you an email with the steps to follow.//traduccion";
            this.mensajes.push(mensaje);
            console.log("[user-forgot-password.component.ts] - 2");
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    UserForgotPasswordComponent.prototype.RecoverPasswordError = function (error) {
        console.log("[user-forgot-password.ts] - RecoverPasswordError: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    };
    return UserForgotPasswordComponent;
}());
UserForgotPasswordComponent = __decorate([
    core_1.Component({
        selector: 'user-forgot-password',
        templateUrl: 'app/user-forgot-password/user-forgot-password.component.html',
        styleUrls: ['css/user-forgot-password.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, ng2_translate_1.TranslateService])
], UserForgotPasswordComponent);
exports.UserForgotPasswordComponent = UserForgotPasswordComponent;
//# sourceMappingURL=user-forgot-password.component.js.map