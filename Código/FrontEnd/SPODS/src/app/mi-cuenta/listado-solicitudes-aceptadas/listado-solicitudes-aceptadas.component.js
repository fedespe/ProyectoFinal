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
var ListadoSolicitudesAceptadasComponent = (function () {
    function ListadoSolicitudesAceptadasComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.mensajes = new mensaje_1.Mensaje();
        this.loading = true;
        this.publicaciones = [];
        this.obtenerPublicacionesCliente(parseInt(localStorage.getItem('id-usuario')));
        this.baseURL = settings_1.Settings.srcImg; //ver que acá va la ruta del proyecto que contiene las imagenes
    }
    ListadoSolicitudesAceptadasComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    ListadoSolicitudesAceptadasComponent.prototype.obtenerPublicacionesCliente = function (id) {
        var _this = this;
        this.dataService.getObtenerPublicacionesClienteOferta(id)
            .subscribe(function (res) { return _this.getObtenerPublicacionesClienteOfertaOk(res); }, function (error) { return _this.getObtenerPublicacionesClienteOfertaError(error); }, function () { return utilidades_1.Utilidades.log("[listado-servicios.component.ts] - getObtenerPublicacionesClienteOferta: Completado"); });
    };
    ListadoSolicitudesAceptadasComponent.prototype.getObtenerPublicacionesClienteOfertaOk = function (response) {
        utilidades_1.Utilidades.log("[[listado-servicios.component.ts] - getObtenerPublicacionesClienteOfertaOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.publicaciones = response.Objetos;
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    };
    ListadoSolicitudesAceptadasComponent.prototype.getObtenerPublicacionesClienteOfertaError = function (responseError) {
        utilidades_1.Utilidades.log("[listado-servicios.component.ts] - getObtenerPublicacionesClienteOfertaError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    };
    ListadoSolicitudesAceptadasComponent.prototype.desactivarPublicacion = function (input) {
        var _this = this;
        utilidades_1.Utilidades.log("[listado-servicios.component.ts] - desactivarPublicacion | responseError: " + JSON.stringify(input));
        this.dataService.getDesactivarPublicacion(input)
            .subscribe(function (res) { return _this.getDesactivarPublicacionOk(res); }, function (error) { return _this.getDesactivarPublicacionError(error); }, function () { return utilidades_1.Utilidades.log("[listado-servicios.component.ts] - getDesactivarPublicacion: Completado"); });
    };
    ListadoSolicitudesAceptadasComponent.prototype.getDesactivarPublicacionOk = function (response) {
        utilidades_1.Utilidades.log("[[listado-servicios.component.ts] - getDesactivarPublicacionOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.obtenerPublicacionesCliente(parseInt(localStorage.getItem('id-usuario')));
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    ListadoSolicitudesAceptadasComponent.prototype.getDesactivarPublicacionError = function (responseError) {
        utilidades_1.Utilidades.log("[listado-servicios.component.ts] - getDesactivarPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    ListadoSolicitudesAceptadasComponent.prototype.activarPublicacion = function (input) {
        var _this = this;
        utilidades_1.Utilidades.log("[listado-servicios.component.ts] - activarPublicacion | responseError: " + JSON.stringify(input));
        this.dataService.getActivarPublicacion(input)
            .subscribe(function (res) { return _this.getActivarPublicacionOk(res); }, function (error) { return _this.getActivarPublicacionError(error); }, function () { return utilidades_1.Utilidades.log("[listado-servicios.component.ts] - getActivarPublicacion: Completado"); });
    };
    ListadoSolicitudesAceptadasComponent.prototype.getActivarPublicacionOk = function (response) {
        utilidades_1.Utilidades.log("[[listado-servicios.component.ts] - getActivarPublicacionOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.obtenerPublicacionesCliente(parseInt(localStorage.getItem('id-usuario')));
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    ListadoSolicitudesAceptadasComponent.prototype.getActivarPublicacionError = function (responseError) {
        utilidades_1.Utilidades.log("[listado-servicios.component.ts] - getActivarPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    return ListadoSolicitudesAceptadasComponent;
}());
ListadoSolicitudesAceptadasComponent = __decorate([
    core_1.Component({
        selector: 'listado-solicitudes-aceptadas',
        templateUrl: 'app/mi-cuenta/listado-solicitudes-aceptadas/listado-solicitudes-aceptadas.component.html',
        styleUrls: ['css/listado-solicitudes-aceptadas.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router])
], ListadoSolicitudesAceptadasComponent);
exports.ListadoSolicitudesAceptadasComponent = ListadoSolicitudesAceptadasComponent;
/*
solicitudesAceptadas: Solicitud[] = [];

//Constructor
this.obtenerSolicitudesAceptadas(idUsuario);

obtenerSolicitudesAceptadas(id:number){
    this.dataService.getObtenerSolicitudesAceptadas(id)
        .subscribe(
        res => this.getObtenerSolicitudesAceptadasOk(res),
        error => this.getObtenerSolicitudesAceptadasError(error),
        () => Utilidades.log("[listado-solicitudes-cliente.component.ts] - obtenerSolicitudesAceptadas: Completado")
    );
}
getObtenerSolicitudesAceptadasOk(response:any){
    Utilidades.log("[listado-solicitudes-cliente.component.ts] - getObtenerSolicitudesAceptadasOk | response: " + JSON.stringify(response));
    if(response.Codigo ==  200){
        this.solicitudesAceptadas = response.Objetos;
    }
    else{
        var error = new Error();
        error.Descripcion = response.Mensaje;
        this.mensajes.Errores.push(error);
    }
}
getObtenerSolicitudesAceptadasError(responseError:any){
    Utilidades.log("[listado-solicitudes-cliente.component.ts] - getObtenerSolicitudesAceptadasError | responseError: " + JSON.stringify(responseError));
    var error = new Error();
    error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
    this.mensajes.Errores.push(error);
}
*/ 
//# sourceMappingURL=listado-solicitudes-aceptadas.component.js.map