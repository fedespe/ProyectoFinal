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
var PerfilUsuarioComponent = (function () {
    function PerfilUsuarioComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.mensajes = new mensaje_1.Mensaje();
        this.cliente = new cliente_1.Cliente();
        this.barrios = [];
        this.cliente.NombreUsuario = localStorage.getItem('nombre-usuario');
        this.cliente.Id = parseInt(localStorage.getItem('id-usuario'));
        this.getObtenerBarrios();
        this.getObternerCliente();
    }
    PerfilUsuarioComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    PerfilUsuarioComponent.prototype.actualizarCliente = function () {
        var _this = this;
        this.borrarMensajes();
        utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - registrarCliente | this.cliente: " + JSON.stringify(this.cliente));
        this.mensajes.Errores = this.cliente.validarActualizacionUsuario();
        if (this.mensajes.Errores.length == 0) {
            this.dataService.putActualizarCliente(this.cliente)
                .subscribe(function (res) { return _this.putActualizarClienteOk(res); }, function (error) { return _this.putActualizarClienteError(error); }, function () { return utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - postRegistrarCliente: Completado"); });
        }
    };
    PerfilUsuarioComponent.prototype.putActualizarClienteOk = function (response) {
        utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - putActualizarClienteOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.router.navigate(['/dashboard']);
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    PerfilUsuarioComponent.prototype.putActualizarClienteError = function (responseError) {
        utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - putActualizarClienteError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    PerfilUsuarioComponent.prototype.getObtenerBarrios = function () {
        var _this = this;
        this.dataService.getBarrioObtenerTodos()
            .subscribe(function (res) { return _this.getBarrioObtenerTodosOk(res); }, function (error) { return _this.getBarrioObtenerTodosError(error); }, function () { return utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - getBarrioObtenerTodos: Completado"); });
    };
    PerfilUsuarioComponent.prototype.getBarrioObtenerTodosOk = function (response) {
        utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - getBarrioObtenerTodosOk | response: " + JSON.stringify(response));
        this.barrios = response.Objetos;
        if (response.Codigo == 200) {
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    PerfilUsuarioComponent.prototype.getBarrioObtenerTodosError = function (responseError) {
        utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - getBarrioObtenerTodosError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    PerfilUsuarioComponent.prototype.getObternerCliente = function () {
        var _this = this;
        this.dataService.getObtenerCliente(this.cliente.Id)
            .subscribe(function (res) { return _this.getObternerClienteOk(res); }, function (error) { return _this.getObternerClienteError(error); }, function () { return utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - getBarrioObtenerTodos: Completado"); });
    };
    PerfilUsuarioComponent.prototype.getObternerClienteOk = function (response) {
        utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - getObternerClienteOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.cliente.Nombre = response.Objetos[0].Nombre;
            this.cliente.Apellido = response.Objetos[0].Apellido;
            this.cliente.Telefono = response.Objetos[0].Telefono;
            this.cliente.Direccion = response.Objetos[0].Direccion;
            this.cliente.Barrio.Id = response.Objetos[0].Barrio.Id;
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    PerfilUsuarioComponent.prototype.getObternerClienteError = function (responseError) {
        utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - getObternerClienteError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    return PerfilUsuarioComponent;
}());
PerfilUsuarioComponent = __decorate([
    core_1.Component({
        selector: 'perfil-usuario',
        templateUrl: 'app/dashboard/perfil-usuario/perfil-usuario.component.html',
        styleUrls: ['css/perfil-usuario.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router])
], PerfilUsuarioComponent);
exports.PerfilUsuarioComponent = PerfilUsuarioComponent;
//# sourceMappingURL=perfil-usuario.component.js.map