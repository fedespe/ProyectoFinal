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
var cliente_1 = require("../../shared/cliente");
var actualizarContrasena_1 = require("../../shared/actualizarContrasena");
var CambiarContrasenaUsuarioComponent = (function () {
    function CambiarContrasenaUsuarioComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.mensajes = new mensaje_1.Mensaje();
        this.cliente = new cliente_1.Cliente();
        this.actualizarContrasena = new actualizarContrasena_1.ActualizarContrasena();
        this.cliente.NombreUsuario = localStorage.getItem('nombre-usuario');
        this.actualizarContrasena.IdUsuario = parseInt(localStorage.getItem('id-usuario'));
    }
    CambiarContrasenaUsuarioComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    CambiarContrasenaUsuarioComponent.prototype.putActualizarContrasena = function () {
        var _this = this;
        this.borrarMensajes();
        utilidades_1.Utilidades.log("[registro-cliente.component.ts] - actualizarContrasena | this.cliente: " + JSON.stringify(this.cliente));
        this.mensajes.Errores = this.actualizarContrasena.validarCambioContrasena();
        if (this.mensajes.Errores.length == 0) {
            this.dataService.putActualizarContrasena(this.actualizarContrasena)
                .subscribe(function (res) { return _this.putActualizarContrasenaOk(res); }, function (error) { return _this.putActualizarContrasenaError(error); }, function () { return utilidades_1.Utilidades.log("[registro-cliente.component.ts] - actualizarContrasena: Completado"); });
        }
    };
    CambiarContrasenaUsuarioComponent.prototype.putActualizarContrasenaOk = function (response) {
        utilidades_1.Utilidades.log("[registro-cliente.component.ts] - putActualizarContrasenaOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            utilidades_1.Utilidades.log("[registro-cliente.component.ts] - putActualizarContrasenaOk | response: " + JSON.stringify(response.Codigo));
            this.router.navigate(['/dashboard']);
        }
        else {
            utilidades_1.Utilidades.log("[registro-cliente.component.ts] - putActualizarContrasenaOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    CambiarContrasenaUsuarioComponent.prototype.putActualizarContrasenaError = function (error) {
        utilidades_1.Utilidades.log("[registro-cliente.component.ts] - postRegistroClienteError | error: " + JSON.stringify(error));
        var errorInesperado = new error_1.Error();
        errorInesperado.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(errorInesperado);
    };
    return CambiarContrasenaUsuarioComponent;
}());
CambiarContrasenaUsuarioComponent = __decorate([
    core_1.Component({
        selector: 'cambiar-contrasena-usuario',
        templateUrl: 'app/dashboard/cambiar-contrasena-usuario/cambiar-contrasena-usuario.component.html',
        styleUrls: ['css/cambiar-contrasena-usuario.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router])
], CambiarContrasenaUsuarioComponent);
exports.CambiarContrasenaUsuarioComponent = CambiarContrasenaUsuarioComponent;
//# sourceMappingURL=cambiar-contrasena-usuario.component.js.map