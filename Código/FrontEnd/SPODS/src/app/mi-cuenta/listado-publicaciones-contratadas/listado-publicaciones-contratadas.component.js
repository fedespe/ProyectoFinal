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
var settings_1 = require("../../shared/settings");
var ListadoPublicacionesContratadasComponent = (function () {
    function ListadoPublicacionesContratadasComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.mensajes = new mensaje_1.Mensaje();
        this.publicaciones = [];
        this.contactos = [];
        this.obtenerPublicacionesContratadasPorCliente(parseInt(localStorage.getItem('id-usuario')));
        this.baseURL = settings_1.Settings.srcImg; //ver que acá va la ruta del proyecto que contiene las imagenes
        this.obtenerTodosContactosConComentariosPendientesOferta(parseInt(localStorage.getItem('id-usuario')));
    }
    ListadoPublicacionesContratadasComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    ListadoPublicacionesContratadasComponent.prototype.obtenerPublicacionesContratadasPorCliente = function (id) {
        var _this = this;
        this.dataService.getobtenerPublicacionesContratadasPorCliente(id)
            .subscribe(function (res) { return _this.getobtenerPublicacionesContratadasPorClienteOk(res); }, function (error) { return _this.getobtenerPublicacionesContratadasPorClienteError(error); }, function () { return utilidades_1.Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerPublicacionesContratadasPorCliente: Completado"); });
    };
    ListadoPublicacionesContratadasComponent.prototype.getobtenerPublicacionesContratadasPorClienteOk = function (response) {
        utilidades_1.Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerPublicacionesContratadasPorClienteOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.publicaciones = response.Objetos;
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    ListadoPublicacionesContratadasComponent.prototype.getobtenerPublicacionesContratadasPorClienteError = function (responseError) {
        utilidades_1.Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerPublicacionesContratadasPorClienteError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    ListadoPublicacionesContratadasComponent.prototype.obtenerTodosContactosConComentariosPendientesOferta = function (id) {
        var _this = this;
        this.dataService.getobtenerTodosContactosConComentariosPendientesOferta(id)
            .subscribe(function (res) { return _this.getobtenerTodosContactosConComentariosPendientesOfertaOk(res); }, function (error) { return _this.getobtenerTodosContactosConComentariosPendientesOfertaError(error); }, function () { return utilidades_1.Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerTodosContactosConComentariosPendientesOferta: Completado"); });
    };
    ListadoPublicacionesContratadasComponent.prototype.getobtenerTodosContactosConComentariosPendientesOfertaOk = function (response) {
        utilidades_1.Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerTodosContactosConComentariosPendientesOfertaOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.contactos = response.Objetos;
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    ListadoPublicacionesContratadasComponent.prototype.getobtenerTodosContactosConComentariosPendientesOfertaError = function (responseError) {
        utilidades_1.Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerTodosContactosConComentariosPendientesOfertaError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    return ListadoPublicacionesContratadasComponent;
}());
ListadoPublicacionesContratadasComponent = __decorate([
    core_1.Component({
        selector: 'listado-publicaciones-contratadas',
        templateUrl: 'app/mi-cuenta/listado-publicaciones-contratadas/listado-publicaciones-contratadas.component.html',
        styleUrls: ['css/listado-publicaciones-contratadas.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router])
], ListadoPublicacionesContratadasComponent);
exports.ListadoPublicacionesContratadasComponent = ListadoPublicacionesContratadasComponent;
//# sourceMappingURL=listado-publicaciones-contratadas.component.js.map