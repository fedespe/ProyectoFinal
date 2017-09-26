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
var ListadoSolicitudesComponent = (function () {
    function ListadoSolicitudesComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.mensajes = new mensaje_1.Mensaje();
        this.servicios = [];
        this.obtenerServicios();
        this.baseURL = settings_1.Settings.srcImg; //ver que acá va la ruta del proyecto que contiene las imagenes
    }
    ListadoSolicitudesComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    ListadoSolicitudesComponent.prototype.obtenerServicios = function () {
        var _this = this;
        this.dataService.getServicioObtenerTodos()
            .subscribe(function (res) { return _this.getServicioObtenerTodosOk(res); }, function (error) { return _this.getServicioObtenerTodosError(error); }, function () { return utilidades_1.Utilidades.log("[listado-solicitudes.component.ts] - obtenerServicios: Completado"); });
    };
    ListadoSolicitudesComponent.prototype.getServicioObtenerTodosOk = function (response) {
        utilidades_1.Utilidades.log("[listado-solicitudes.component.ts] - obtenerServiciosOk | response: " + JSON.stringify(response));
        this.servicios = response.Objetos;
        if (response.Codigo == 200) {
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    ListadoSolicitudesComponent.prototype.getServicioObtenerTodosError = function (responseError) {
        utilidades_1.Utilidades.log("[listado-solicitudes.component.ts] - obtenerServiciosError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    return ListadoSolicitudesComponent;
}());
ListadoSolicitudesComponent = __decorate([
    core_1.Component({
        selector: 'listado-solicitudes',
        templateUrl: 'app/dashboard/listado-solicitudes/listado-solicitudes.component.html',
        styleUrls: ['css/listado-solicitudes.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router])
], ListadoSolicitudesComponent);
exports.ListadoSolicitudesComponent = ListadoSolicitudesComponent;
//# sourceMappingURL=listado-solicitudes.component.js.map