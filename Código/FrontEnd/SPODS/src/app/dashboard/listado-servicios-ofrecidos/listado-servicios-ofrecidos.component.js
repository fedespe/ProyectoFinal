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
var router_2 = require("@angular/router");
var settings_1 = require("../../shared/settings");
var ListadoServiciosOfrecidosComponent = (function () {
    function ListadoServiciosOfrecidosComponent(dataService, router, route) {
        this.dataService = dataService;
        this.router = router;
        this.route = route;
        this.mensajes = new mensaje_1.Mensaje();
        this.publicaciones = [];
        this.idUsuario = parseInt(localStorage.getItem('id-usuario'));
        this.baseURL = settings_1.Settings.srcImg; //ver que acá va la ruta del proyecto que contiene las imagenes
    }
    ListadoServiciosOfrecidosComponent.prototype.ngOnInit = function () {
        var _this = this;
        // subscripción al observable params
        this.route.params
            .subscribe(function (params) {
            _this.idServicio = parseInt(params['id']);
            utilidades_1.Utilidades.log("[listado-servicios-ofrecidos.component.ts] - ngOnInit | id: " + JSON.stringify(_this.idServicio));
        });
        this.obtenerPublicaciones();
    };
    ListadoServiciosOfrecidosComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    ListadoServiciosOfrecidosComponent.prototype.obtenerPublicaciones = function () {
        var _this = this;
        utilidades_1.Utilidades.log("[listado-servicios-ofrecidos.component.ts] - obtenerPublicacion | idServicio: " + JSON.stringify(this.idServicio));
        this.dataService.getPublicacionesServicioOferta(this.idServicio)
            .subscribe(function (res) { return _this.getPublicacionesServicioOk(res); }, function (error) { return _this.getPublicacionesServicioError(error); }, function () { return utilidades_1.Utilidades.log("[editar-servicio-cliente.component.ts] - obtenerServicios: Completado"); });
    };
    ListadoServiciosOfrecidosComponent.prototype.getPublicacionesServicioOk = function (response) {
        utilidades_1.Utilidades.log("[listado-servicios-ofrecidos.component.ts] - getPublicacionesServicioOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.publicaciones = response.Objetos;
            if (this.publicaciones.length > 0) {
                this.nombreServicio = this.publicaciones[0].Servicio.Nombre;
            }
            else {
                this.nombreServicio = "No se encontraron publicaciones para dicho servicio.";
            }
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    ListadoServiciosOfrecidosComponent.prototype.getPublicacionesServicioError = function (responseError) {
        utilidades_1.Utilidades.log("[listado-servicios-ofrecidos.component.ts] - getPublicacionesServicioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    return ListadoServiciosOfrecidosComponent;
}());
ListadoServiciosOfrecidosComponent = __decorate([
    core_1.Component({
        selector: 'listado-servicios-ofrecidos',
        templateUrl: 'app/dashboard/listado-servicios-ofrecidos/listado-servicios-ofrecidos.component.html',
        styleUrls: ['css/listado-servicios-ofrecidos.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, router_2.ActivatedRoute])
], ListadoServiciosOfrecidosComponent);
exports.ListadoServiciosOfrecidosComponent = ListadoServiciosOfrecidosComponent;
//# sourceMappingURL=listado-servicios-ofrecidos.component.js.map