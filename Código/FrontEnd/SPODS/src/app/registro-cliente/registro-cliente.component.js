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
var barrio_1 = require("../shared/barrio");
var RegistroClienteComponent = (function () {
    function RegistroClienteComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.mensajes = new mensaje_1.Mensaje();
        this.cliente = new cliente_1.Cliente();
        this.barrios = [];
        //Solo para prueba se tiene que cargar con un servicio que traiga los barrios del sistema
        var barrio = new barrio_1.Barrio();
        barrio.Id = 1;
        barrio.Nombre = 'Centro';
        this.barrios.push(barrio);
        var barrio2 = new barrio_1.Barrio();
        barrio2.Id = 2;
        barrio2.Nombre = "Cordón";
        this.barrios.push(barrio2);
    }
    RegistroClienteComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    RegistroClienteComponent.prototype.registrarCliente = function () {
        var _this = this;
        this.borrarMensajes();
        utilidades_1.Utilidades.log("[registro-cliente.component.ts] - registrarCliente | this.cliente: " + JSON.stringify(this.cliente));
        this.mensajes.Errores = this.cliente.validarDatos();
        if (this.mensajes.Errores.length == 0) {
            this.dataService.postRegistroCliente(this.cliente)
                .subscribe(function (res) { return _this.postRegistroClienteOk(res); }, function (error) { return _this.postRegistroClienteError(error); }, function () { return utilidades_1.Utilidades.log("[registro-cliente.component.ts] - postRegistroCliente: Completado"); });
        }
    };
    RegistroClienteComponent.prototype.postRegistroClienteOk = function (response) {
        utilidades_1.Utilidades.log("[registro-cliente.component.ts] - postRegistroClienteOk | response: " + JSON.stringify(response));
        // this.mensajes.Errores = response.Errores;
        // if(response.CodigoError ==  200){
        //     this.iniciarSesion();
        // }
        // else{
        //     //Acá podría controlar los códigos de error que me mando desde el backend
        // }
    };
    RegistroClienteComponent.prototype.postRegistroClienteError = function (error) {
        utilidades_1.Utilidades.log("[registro-cliente.component.ts] - postRegistroClienteError | error: " + JSON.stringify(error));
        var errorInesperado = new error_1.Error();
        errorInesperado.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(errorInesperado);
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