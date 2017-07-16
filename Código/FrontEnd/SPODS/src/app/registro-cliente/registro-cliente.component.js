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
var utilidades_1 = require("../shared/utilidades");
var mensaje_1 = require("../shared/mensaje");
var error_1 = require("../shared/error");
var cliente_1 = require("../shared/cliente");
var RegistroClienteComponent = (function () {
    function RegistroClienteComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.mensajes = new mensaje_1.Mensaje();
        this.cliente = new cliente_1.Cliente();
        this.barrios = [];
        this.step = 1;
        this.urlImagen = "http://localhost:39770/Cliente/IngresarImagen"; //?idCliente=3&contrasena=123456789";
        this.obtenerBarrios();
    }
    RegistroClienteComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    RegistroClienteComponent.prototype.registrarClientePaso1 = function () {
        this.borrarMensajes(),
            utilidades_1.Utilidades.log("[registro-cliente.component.ts] - registrarClientePaso1 | this.cliente: " + JSON.stringify(this.cliente));
        this.cliente.Habilitado = true;
        this.mensajes.Errores = this.cliente.validarDatos1();
        if (this.mensajes.Errores.length == 0) {
            this.step = 2;
        }
    };
    RegistroClienteComponent.prototype.registrarClientePaso2 = function () {
        this.borrarMensajes(),
            utilidades_1.Utilidades.log("[registro-cliente.component.ts] - registrarClientePaso1 | this.cliente: " + JSON.stringify(this.cliente));
        this.cliente.Habilitado = true;
        this.mensajes.Errores = this.cliente.validarDatos2(this.contrasenaConfirmacion);
        if (this.mensajes.Errores.length == 0) {
            this.registrarCliente();
        }
    };
    RegistroClienteComponent.prototype.registrarClientePaso3 = function () {
        this.router.navigate(['dashboard/overview']);
    };
    RegistroClienteComponent.prototype.volverPaso1 = function () {
        this.step = 1;
    };
    RegistroClienteComponent.prototype.registrarCliente = function () {
        var _this = this;
        this.borrarMensajes();
        utilidades_1.Utilidades.log("[registro-cliente.component.ts] - registrarCliente | this.cliente: " + JSON.stringify(this.cliente));
        if (this.mensajes.Errores.length == 0) {
            this.dataService.postRegistrarCliente(this.cliente)
                .subscribe(function (res) { return _this.postRegistrarClienteOk(res); }, function (error) { return _this.postRegistrarClienteError(error); }, function () { return utilidades_1.Utilidades.log("[registro-cliente.component.ts] - postRegistrarCliente: Completado"); });
        }
    };
    RegistroClienteComponent.prototype.postRegistrarClienteOk = function (response) {
        utilidades_1.Utilidades.log("[registro-cliente.component.ts] - postRegistroClienteOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            utilidades_1.Utilidades.log("[registro-cliente.component.ts] - postRegistroClienteOk | response: " + JSON.stringify(response.Codigo));
            this.ingresarCliente();
            this.step = 3;
        }
        else {
            utilidades_1.Utilidades.log("[registro-cliente.component.ts] - postRegistroClienteOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    RegistroClienteComponent.prototype.postRegistrarClienteError = function (responseError) {
        utilidades_1.Utilidades.log("[registro-cliente.component.ts] - postRegistroClienteError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    RegistroClienteComponent.prototype.ingresarCliente = function () {
        var _this = this;
        this.borrarMensajes();
        utilidades_1.Utilidades.log("[registro-cliente.component.ts] - ingresarCliente | this.cliente: " + JSON.stringify(this.cliente));
        if (this.mensajes.Errores.length == 0) {
            this.dataService.postIngresarCliente(this.cliente)
                .subscribe(function (res) { return _this.postIngresarClienteOk(res); }, function (error) { return _this.postIngresarClienteError(error); }, function () { return utilidades_1.Utilidades.log("[registro-cliente.component.ts] - postIngresarCliente: Completado"); });
        }
    };
    RegistroClienteComponent.prototype.postIngresarClienteOk = function (response) {
        utilidades_1.Utilidades.log("[registro-cliente.component.ts] - postIngresarClienteOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            utilidades_1.Utilidades.log("[registro-cliente.component.ts] - postIngresarClienteOk | response: " + JSON.stringify(response.Objetos[0]));
            //Guardar el response.Objetos[0] en local storage
            //localStorage.setItem('access_token', oauth.access_token); como ejemplo
            localStorage.setItem('nombre-usuario', response.Objetos[0].NombreUsuario); //como ejemplo
            localStorage.setItem('id-usuario', response.Objetos[0].Id);
            //PARA EL SUBMIT DEL IFRAME        
            this.cliente.Id = response.Objetos[0].Id;
            document.getElementById('inputIdCliente').setAttribute('value', this.cliente.Id.toString());
            document.getElementById('mostrarImagenes').click();
        }
        else {
            utilidades_1.Utilidades.log("[registro-cliente.component.ts] - postIngresarClienteOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    RegistroClienteComponent.prototype.postIngresarClienteError = function (responseError) {
        utilidades_1.Utilidades.log("[registro-cliente.component.ts] - postIngresarClienteError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    RegistroClienteComponent.prototype.obtenerBarrios = function () {
        var _this = this;
        this.dataService.getBarrioObtenerTodos()
            .subscribe(function (res) { return _this.getBarrioObtenerTodosOk(res); }, function (error) { return _this.getBarrioObtenerTodosError(error); }, function () { return utilidades_1.Utilidades.log("[registro-cliente.component.ts] - getBarrioObtenerTodos: Completado"); });
    };
    RegistroClienteComponent.prototype.getBarrioObtenerTodosOk = function (response) {
        utilidades_1.Utilidades.log("[registro-cliente.component.ts] - getBarrioObtenerTodosOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.barrios = response.Objetos;
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    RegistroClienteComponent.prototype.getBarrioObtenerTodosError = function (responseError) {
        utilidades_1.Utilidades.log("[registro-cliente.component.ts] - getBarrioObtenerTodosError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    return RegistroClienteComponent;
}());
RegistroClienteComponent = __decorate([
    core_1.Component({
        selector: 'registro-cliente',
        templateUrl: 'app/registro-cliente/registro-cliente.component.html',
        styleUrls: ['css/registro-cliente.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router])
], RegistroClienteComponent);
exports.RegistroClienteComponent = RegistroClienteComponent;
//# sourceMappingURL=registro-cliente.component.js.map