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
var data_service_1 = require("../../shared/services/data.service");
var utilidades_1 = require("../../shared/utilidades");
var mensaje_1 = require("../../shared/mensaje");
var error_1 = require("../../shared/error");
var exito_1 = require("../../shared/exito");
var OlvidoPasswordComponent = (function () {
    function OlvidoPasswordComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.mensajes = new mensaje_1.Mensaje();
        this.correoElectronico = "";
        this.loading = false;
    }
    /*navegarRegistroCliente(){
        this.router.navigateByUrl('/registro-cliente');
    }*/
    OlvidoPasswordComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    OlvidoPasswordComponent.prototype.recuperarPassword = function () {
        var _this = this;
        this.loading = true;
        this.borrarMensajes();
        if (this.correoElectronico.trim() == "") {
            var error = new error_1.Error();
            error.Descripcion = "Debe ingresar un correo electrónico.";
            this.mensajes.Errores.push(error);
            this.loading = false;
        }
        else {
            var regExp = new RegExp("\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*");
            var test = regExp.test(this.correoElectronico);
            if (!test) {
                var error = new error_1.Error();
                error.Descripcion = "Debe ingresar un correo electrónico válido.";
                this.mensajes.Errores.push(error);
                this.loading = false;
            }
            else {
                this.dataService.putRecuperarPassword(this.correoElectronico)
                    .subscribe(function (res) { return _this.putRecuperarPasswordOk(res); }, function (error) { return _this.putRecuperarPasswordError(error); }, function () { return utilidades_1.Utilidades.log("[olvido-password.component.ts] - putRecuperarPassword: Completado"); });
            }
        }
    };
    OlvidoPasswordComponent.prototype.putRecuperarPasswordOk = function (response) {
        utilidades_1.Utilidades.log("[olvido-password.component.ts] - putRecuperarPasswordOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            var exito = new exito_1.Exito();
            exito.Descripcion = "Se le ha enviado un correo con la nueva contraseña. Sugerimos cambiarla una vez que haya iniciado sesión.";
            this.mensajes.Exitos.push(exito);
        }
        else {
            utilidades_1.Utilidades.log("[olvido-password.component.ts] - putRecuperarPasswordOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    };
    OlvidoPasswordComponent.prototype.putRecuperarPasswordError = function (responseError) {
        utilidades_1.Utilidades.log("[olvido-password.component.ts] - putRecuperarPasswordError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    };
    return OlvidoPasswordComponent;
}());
OlvidoPasswordComponent = __decorate([
    core_1.Component({
        selector: 'olvido-password',
        templateUrl: 'app/landing/olvido-password/olvido-password.component.html',
        styleUrls: ['css/olvido-password.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router])
], OlvidoPasswordComponent);
exports.OlvidoPasswordComponent = OlvidoPasswordComponent;
//# sourceMappingURL=olvido-password.component.js.map