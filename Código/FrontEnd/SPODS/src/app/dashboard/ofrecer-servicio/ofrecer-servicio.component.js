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
var servicio_1 = require("../../shared/servicio");
var publicacion_1 = require("../../shared/publicacion");
var respuesta_1 = require("../../shared/respuesta");
var OfrecerServicioComponent = (function () {
    function OfrecerServicioComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.mensajes = new mensaje_1.Mensaje();
        this.servicios = [];
        this.publicacion = new publicacion_1.Publicacion();
        this.servicioSeleccionado = new servicio_1.Servicio();
        this.respuestas = [];
        this.publicacion.Cliente.Id = parseInt(localStorage.getItem('id-usuario'));
        this.publicacion.Cliente.NombreUsuario = localStorage.getItem('nombre-usuario');
        this.publicacion.Activa = true;
        this.publicacion.Tipo = "OFERTA";
        this.publicacion.Servicio.Id = 0;
        this.obtenerServicios();
        //Solo prueba
        this.publicacion.Imagenes.push("PUBLICACIONPRUEBAANGULAR_IMG1.jpg");
        this.publicacion.Imagenes.push("PUBLICACIONPRUEBAANGULAR_IMG2.jpg");
        this.publicacion.Imagenes.push("PUBLICACIONPRUEBAANGULAR_IMG3.jpg");
    }
    OfrecerServicioComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    OfrecerServicioComponent.prototype.obtenerServicios = function () {
        var _this = this;
        this.dataService.getServicioObtenerTodos()
            .subscribe(function (res) { return _this.getServicioObtenerTodosOk(res); }, function (error) { return _this.getServicioObtenerTodosError(error); }, function () { return utilidades_1.Utilidades.log("[ofrecer-servicio.component.ts] - obtenerServicios: Completado"); });
    };
    OfrecerServicioComponent.prototype.getServicioObtenerTodosOk = function (response) {
        utilidades_1.Utilidades.log("[[ofrecer-servicio.component.ts] - obtenerServiciosOk | response: " + JSON.stringify(response));
        this.servicios = response.Objetos;
        if (response.Codigo == 200) {
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    OfrecerServicioComponent.prototype.getServicioObtenerTodosError = function (responseError) {
        utilidades_1.Utilidades.log("[ofrecer-servicio.component.ts] - obtenerServiciosError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    OfrecerServicioComponent.prototype.seleccionServicio = function () {
        if (this.publicacion.Servicio.Id != 0) {
            this.respuestas = [];
            this.obtenerServicio(this.publicacion.Servicio.Id);
        }
        else {
            this.servicioSeleccionado = new servicio_1.Servicio();
        }
    };
    OfrecerServicioComponent.prototype.obtenerServicio = function (id) {
        var _this = this;
        this.dataService.getObtenerServicio(id)
            .subscribe(function (res) { return _this.getObtenerServicioOk(res); }, function (error) { return _this.getObtenerServicioError(error); }, function () { return utilidades_1.Utilidades.log("[ofrecer-servicio.component.ts] - obtenerServicio: Completado"); });
    };
    OfrecerServicioComponent.prototype.getObtenerServicioOk = function (response) {
        utilidades_1.Utilidades.log("[[ofrecer-servicio.component.ts] - obtenerServicioOk | response: " + JSON.stringify(this.servicioSeleccionado));
        if (response.Codigo == 200) {
            this.servicioSeleccionado = response.Objetos[0];
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    OfrecerServicioComponent.prototype.getObtenerServicioError = function (responseError) {
        utilidades_1.Utilidades.log("[ofrecer-servicio.component.ts] - obtenerServicioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    OfrecerServicioComponent.prototype.postAltaPublicacion = function () {
        var _this = this;
        utilidades_1.Utilidades.log("[ofrecer-servicio.component.ts] - postAltaPublicacion | responseError: " + JSON.stringify(this.respuestas));
        this.mensajes.Errores = this.publicacion.validarDatos();
        if (this.mensajes.Errores.length == 0) {
            // for (var i = 0; i < this.respuestas.length; i++) {
            //     if(this.respuestas[i]!=null){
            //         var r = new Respuesta();
            //         r.Pregunta.Id=i;
            //         r.UnaRespuesta=this.respuestas[i];
            //         this.publicacion.Respuestas.push(r);
            //     }
            // } 
            for (var i = 0; i < this.servicioSeleccionado.Preguntas.length; i++) {
                if (this.servicioSeleccionado.Preguntas[i].UnaRespuesta != null && this.servicioSeleccionado.Preguntas[i].UnaRespuesta != "") {
                    var r = new respuesta_1.Respuesta();
                    r.Pregunta.Id = this.servicioSeleccionado.Preguntas[i].Id;
                    r.UnaRespuesta = this.servicioSeleccionado.Preguntas[i].UnaRespuesta;
                    this.publicacion.Respuestas.push(r);
                }
            }
            utilidades_1.Utilidades.log("[ofrecer-servicio.component.ts] - postAltaPublicacion | responseError: " + JSON.stringify(this.publicacion));
            this.dataService.postAltaPublicacion(this.publicacion)
                .subscribe(function (res) { return _this.postAltaPublicacionOk(res); }, function (error) { return _this.postAltaPublicacionError(error); }, function () { return utilidades_1.Utilidades.log("[ofrecer-servicio.component.ts] - postAltaPublicacion: Completado"); });
        }
    };
    OfrecerServicioComponent.prototype.postAltaPublicacionOk = function (response) {
        if (response.Codigo == 200) {
            this.router.navigate(['dashboard/listado-servicios-cliente']);
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    OfrecerServicioComponent.prototype.postAltaPublicacionError = function (responseError) {
        utilidades_1.Utilidades.log("[ofrecer-servicio.component.ts] - postAltaPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    return OfrecerServicioComponent;
}());
OfrecerServicioComponent = __decorate([
    core_1.Component({
        selector: 'ofrecer-servicio',
        templateUrl: 'app/dashboard/ofrecer-servicio/ofrecer-servicio.component.html',
        styleUrls: ['css/ofrecer-servicio.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router])
], OfrecerServicioComponent);
exports.OfrecerServicioComponent = OfrecerServicioComponent;
//# sourceMappingURL=ofrecer-servicio.component.js.map