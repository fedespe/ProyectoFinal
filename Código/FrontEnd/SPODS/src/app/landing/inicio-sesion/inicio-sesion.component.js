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
var InicioSesionComponent = (function () {
    function InicioSesionComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.mensajes = new mensaje_1.Mensaje();
        this.cliente = new cliente_1.Cliente();
        this.loading = false;
        this.cerrarSesion();
    }
    InicioSesionComponent.prototype.navegarRegistroCliente = function () {
        this.router.navigateByUrl('/registro-cliente');
    };
    InicioSesionComponent.prototype.navegarOlvidoPassword = function () {
        this.router.navigateByUrl('/olvido-password');
    };
    InicioSesionComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    InicioSesionComponent.prototype.ingresarCliente = function () {
        var _this = this;
        this.borrarMensajes();
        utilidades_1.Utilidades.log("[inicio-sesion.component.ts] - ingresarCliente | this.cliente: " + JSON.stringify(this.cliente));
        this.loading = true;
        if (this.mensajes.Errores.length == 0) {
            this.dataService.postAccessToken(this.cliente.NombreUsuario, this.cliente.Contrasena)
                .subscribe(function (res) { return _this.postAccessTokenOk(res); }, function (error) { return _this.postAccessTokenError(error); }, function () { return utilidades_1.Utilidades.log("[inicio-sesion.component.ts] - postAccessToken: Completado"); });
        }
    };
    InicioSesionComponent.prototype.postAccessTokenOk = function (response) {
        var _this = this;
        utilidades_1.Utilidades.log("[inicio-sesion.component.ts] - postAccessTokenOk | response: " + JSON.stringify(response));
        utilidades_1.Utilidades.log("[inicio-sesion.component.ts] - postAccessTokenOk | response.access_token: " + response.access_token);
        localStorage.setItem('access_token', response.access_token);
        this.dataService.ini();
        this.dataService.getObtenerClienteLogueado()
            .subscribe(function (res) { return _this.getObtenerClienteLogueadoOk(res); }, function (error) { return _this.getObtenerClienteLogueadoError(error); }, function () { return utilidades_1.Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueado: Completado"); });
    };
    InicioSesionComponent.prototype.postAccessTokenError = function (responseError) {
        this.loading = false;
        utilidades_1.Utilidades.log("[inicio-sesion.component.ts] - postAccessTokenError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Verifique usuario y contraseña e intente nuevamente.";
        this.mensajes.Errores.push(error);
    };
    InicioSesionComponent.prototype.getObtenerClienteLogueadoOk = function (response) {
        utilidades_1.Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            utilidades_1.Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoOk | response.Objetos[0]: " + JSON.stringify(response.Objetos[0]));
            localStorage.setItem('nombre-usuario', response.Objetos[0].NombreUsuario);
            localStorage.setItem('id-usuario', response.Objetos[0].Id);
            utilidades_1.Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoOk | localStorage.getItem('nombre-usuario'): " + localStorage.getItem('nombre-usuario'));
            utilidades_1.Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoOk | localStorage.getItem('id-usuario'): " + localStorage.getItem('id-usuario'));
            this.router.navigate(['/dashboard']);
        }
        else {
            utilidades_1.Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    InicioSesionComponent.prototype.getObtenerClienteLogueadoError = function (responseError) {
        this.loading = false;
        utilidades_1.Utilidades.log("[inicio-sesion.component.ts] - getObtenerClienteLogueadoError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    InicioSesionComponent.prototype.cerrarSesion = function () {
        localStorage.clear();
        this.dataService.ini();
    };
    return InicioSesionComponent;
}());
InicioSesionComponent = __decorate([
    core_1.Component({
        selector: 'inicio-sesion',
        templateUrl: 'app/landing/inicio-sesion/inicio-sesion.component.html',
        styleUrls: ['css/inicio-sesion.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router])
], InicioSesionComponent);
exports.InicioSesionComponent = InicioSesionComponent;
//# sourceMappingURL=inicio-sesion.component.js.map