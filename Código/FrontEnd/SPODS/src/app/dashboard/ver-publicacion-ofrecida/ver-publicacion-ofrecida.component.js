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
var publicacion_1 = require("../../shared/publicacion");
var router_2 = require("@angular/router");
var settings_1 = require("../../shared/settings");
var VerPublicacionOfrecidaComponent = (function () {
    function VerPublicacionOfrecidaComponent(dataService, router, route) {
        this.dataService = dataService;
        this.router = router;
        this.route = route;
        this.mensajes = new mensaje_1.Mensaje();
        this.servicios = [];
        this.publicacion = new publicacion_1.Publicacion();
        this.baseURL = settings_1.Settings.srcImg; //ver que acá va la ruta del proyecto que contiene las imagenes
    }
    VerPublicacionOfrecidaComponent.prototype.ngOnInit = function () {
        var _this = this;
        // subscripción al observable params
        this.route.params
            .subscribe(function (params) {
            _this.idPublicacion = parseInt(params['id']);
            utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - ngOnInit | id: " + JSON.stringify(_this.idPublicacion));
        });
        this.obtenerPublicacion();
    };
    VerPublicacionOfrecidaComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    VerPublicacionOfrecidaComponent.prototype.obtenerPublicacion = function () {
        var _this = this;
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerPublicacion | id: " + JSON.stringify(this.idPublicacion));
        this.dataService.getPublicacion(this.idPublicacion)
            .subscribe(function (res) { return _this.getPublicacionOk(res); }, function (error) { return _this.getPublicacionError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerServicios: Completado"); });
    };
    VerPublicacionOfrecidaComponent.prototype.getPublicacionOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerServiciosOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.publicacion = response.Objetos[0];
            this.obtenerServicio(this.publicacion.Servicio.Id);
            this.obtenerCliente(this.publicacion.Cliente.Id);
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionOfrecidaComponent.prototype.getPublicacionError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerServiciosError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionOfrecidaComponent.prototype.obtenerServicio = function (id) {
        var _this = this;
        this.dataService.getObtenerServicio(id)
            .subscribe(function (res) { return _this.getObtenerServicioOk(res); }, function (error) { return _this.getObtenerServicioError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerServicio: Completado"); });
    };
    VerPublicacionOfrecidaComponent.prototype.getObtenerServicioOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerServicioOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            this.publicacion.Servicio = response.Objetos[0];
            this.obtenerPreguntas(); //metodo que completa en alngular las respuestas a las preguntas
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionOfrecidaComponent.prototype.getObtenerServicioError = function (responseError) {
        utilidades_1.Utilidades.log("[editar-servicio-cliente.component.ts] - obtenerServicioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionOfrecidaComponent.prototype.obtenerPreguntas = function () {
        for (var i = 0; i < this.publicacion.Respuestas.length; i++) {
            for (var j = 0; j < this.publicacion.Servicio.Preguntas.length; j++) {
                if (this.publicacion.Servicio.Preguntas[j].Id == this.publicacion.Respuestas[i].Pregunta.Id) {
                    this.publicacion.Respuestas[i].Pregunta.UnaPregunta = this.publicacion.Servicio.Preguntas[j].UnaPregunta;
                }
            }
        }
    };
    VerPublicacionOfrecidaComponent.prototype.obtenerCliente = function (id) {
        var _this = this;
        this.dataService.getObtenerCliente(id)
            .subscribe(function (res) { return _this.getObtenerClienteOk(res); }, function (error) { return _this.getObtenerClienteError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerCliente: Completado"); });
    };
    VerPublicacionOfrecidaComponent.prototype.getObtenerClienteOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerClienteOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            this.publicacion.Cliente = response.Objetos[0];
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionOfrecidaComponent.prototype.getObtenerClienteError = function (responseError) {
        utilidades_1.Utilidades.log("[editar-servicio-cliente.component.ts] - obtenerClienteError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    return VerPublicacionOfrecidaComponent;
}());
VerPublicacionOfrecidaComponent = __decorate([
    core_1.Component({
        selector: 'ver-publicacion-ofrecida',
        templateUrl: 'app/dashboard/ver-publicacion-ofrecida/ver-publicacion-ofrecida.component.html',
        styleUrls: ['css/ver-publicacion-ofrecida.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, router_2.ActivatedRoute])
], VerPublicacionOfrecidaComponent);
exports.VerPublicacionOfrecidaComponent = VerPublicacionOfrecidaComponent;
//# sourceMappingURL=ver-publicacion-ofrecida.component.js.map