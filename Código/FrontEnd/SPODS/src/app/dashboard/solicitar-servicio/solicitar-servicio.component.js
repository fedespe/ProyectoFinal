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
var exito_1 = require("../../shared/exito");
var servicio_1 = require("../../shared/servicio");
var settings_1 = require("../../shared/settings");
var publicacion_1 = require("../../shared/publicacion");
var respuesta_1 = require("../../shared/respuesta");
var SolicitarServicioComponent = (function () {
    function SolicitarServicioComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.mensajes = new mensaje_1.Mensaje();
        this.loading = true;
        this.flujoFinalizado = false;
        this.servicios = [];
        this.publicacion = new publicacion_1.Publicacion();
        this.servicioSeleccionado = new servicio_1.Servicio();
        this.respuestas = [];
        this.step = 1;
        this.urlImagen = settings_1.Settings.srcImg + "/Oferta/IngresarImagenes";
        this.obtenerServicios();
        this.publicacion.Cliente.Id = parseInt(localStorage.getItem('id-usuario'));
        this.publicacion.Cliente.NombreUsuario = localStorage.getItem('nombre-usuario');
        this.publicacion.Activa = true;
        this.publicacion.Tipo = "SOLICITUD";
        this.publicacion.Servicio.Id = 0;
    }
    SolicitarServicioComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    SolicitarServicioComponent.prototype.obtenerServicios = function () {
        var _this = this;
        this.dataService.getServicioObtenerTodos()
            .subscribe(function (res) { return _this.getServicioObtenerTodosOk(res); }, function (error) { return _this.getServicioObtenerTodosError(error); }, function () { return utilidades_1.Utilidades.log("[solicitar-servicio.component.ts] - obtenerServicios: Completado"); });
    };
    SolicitarServicioComponent.prototype.getServicioObtenerTodosOk = function (response) {
        utilidades_1.Utilidades.log("[solicitar-servicio.component.ts] - getServicioObtenerTodosOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.servicios = response.Objetos;
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    };
    SolicitarServicioComponent.prototype.getServicioObtenerTodosError = function (responseError) {
        utilidades_1.Utilidades.log("[solicitar-servicio.component.ts] - getServicioObtenerTodosError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    };
    SolicitarServicioComponent.prototype.ofrecerServicioPaso1 = function () {
        this.borrarMensajes(),
            this.mensajes.Errores = this.publicacion.validarDatos1();
        if (this.mensajes.Errores.length == 0) {
            this.step = 2;
        }
    };
    SolicitarServicioComponent.prototype.ofrecerServicioPaso2 = function () {
        this.loading = true;
        this.postAltaPublicacion();
        this.step = 3;
    };
    SolicitarServicioComponent.prototype.volverPaso1 = function () {
        this.step = 1;
    };
    SolicitarServicioComponent.prototype.ofrecerServicioPaso3 = function () {
        var exito = new exito_1.Exito();
        exito.Descripcion = "La publicación ha sido realizada con éxito.";
        this.mensajes.Exitos.push(exito);
        this.step = 1;
        this.finalizarFlujo();
    };
    SolicitarServicioComponent.prototype.seleccionServicio = function () {
        this.loading = true;
        if (this.publicacion.Servicio.Id != 0) {
            this.respuestas = [];
            this.obtenerServicio(this.publicacion.Servicio.Id);
        }
        else {
            this.servicioSeleccionado = new servicio_1.Servicio();
        }
    };
    SolicitarServicioComponent.prototype.obtenerServicio = function (id) {
        var _this = this;
        this.dataService.getObtenerServicio(id)
            .subscribe(function (res) { return _this.getObtenerServicioOk(res); }, function (error) { return _this.getObtenerServicioError(error); }, function () { return utilidades_1.Utilidades.log("[solicitar-servicio.component.ts] - obtenerServicio: Completado"); });
    };
    SolicitarServicioComponent.prototype.getObtenerServicioOk = function (response) {
        utilidades_1.Utilidades.log("[solicitar-servicio.component.ts] - getObtenerServicioOk | servicioSeleccionado: " + JSON.stringify(this.servicioSeleccionado));
        if (response.Codigo == 200) {
            this.servicioSeleccionado = response.Objetos[0];
            this.publicacion.Servicio = this.servicioSeleccionado;
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    };
    SolicitarServicioComponent.prototype.getObtenerServicioError = function (responseError) {
        utilidades_1.Utilidades.log("[solicitar-servicio.component.ts] - getObtenerServicioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    };
    SolicitarServicioComponent.prototype.postAltaPublicacion = function () {
        var _this = this;
        utilidades_1.Utilidades.log("[solicitar-servicio.component.ts] - postAltaPublicacion | responseError: " + JSON.stringify(this.respuestas));
        //this.mensajes.Errores = this.publicacion.validarDatos();
        //if(this.mensajes.Errores.length==0){
        for (var i = 0; i < this.servicioSeleccionado.Preguntas.length; i++) {
            if (this.servicioSeleccionado.Preguntas[i].UnaRespuesta != null && this.servicioSeleccionado.Preguntas[i].UnaRespuesta != "") {
                var r = new respuesta_1.Respuesta();
                r.Pregunta.Id = this.servicioSeleccionado.Preguntas[i].Id;
                r.Pregunta.UnaPregunta = this.servicioSeleccionado.Preguntas[i].UnaPregunta;
                r.UnaRespuesta = this.servicioSeleccionado.Preguntas[i].UnaRespuesta;
                this.publicacion.Respuestas.push(r);
            }
        }
        utilidades_1.Utilidades.log("[solicitar-servicio.component.ts] - postAltaPublicacion | responseError: " + JSON.stringify(this.publicacion));
        this.dataService.postAltaPublicacion(this.publicacion)
            .subscribe(function (res) { return _this.postAltaPublicacionOk(res); }, function (error) { return _this.postAltaPublicacionError(error); }, function () { return utilidades_1.Utilidades.log("[solicitar-servicio.component.ts] - postAltaPublicacion: Completado"); });
        //}
    };
    SolicitarServicioComponent.prototype.postAltaPublicacionOk = function (response) {
        if (response.Codigo == 200) {
            this.obtenerUtlimaPublicacioncliente();
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    SolicitarServicioComponent.prototype.postAltaPublicacionError = function (responseError) {
        utilidades_1.Utilidades.log("[solicitar-servicio.component.ts] - postAltaPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    SolicitarServicioComponent.prototype.obtenerUtlimaPublicacioncliente = function () {
        var _this = this;
        var idCli = parseInt(localStorage.getItem('id-usuario'));
        this.dataService.getUltimoIdPublicacionCliente(idCli)
            .subscribe(function (res) { return _this.getUltimoIdPublicacionClienteOK(res); }, function (error) { return _this.getUltimoIdPublicacionClienteError(error); }, function () { return utilidades_1.Utilidades.log("[solicitar-servicio.component.ts] - obtenerUtlimaPublicacioncliente: Completado"); });
    };
    SolicitarServicioComponent.prototype.getUltimoIdPublicacionClienteOK = function (response) {
        if (response.Codigo == 200) {
            utilidades_1.Utilidades.log("[solicitar-servicio.component.ts] - getUltimoIdPublicacionClienteOK | response: " + JSON.stringify(response.Objetos[0]));
            this.publicacion.Id = parseInt(response.Objetos[0]);
            document.getElementById('inputIdPublicacion').setAttribute('value', this.publicacion.Id.toString());
            document.getElementById('mostrarImagenes').click();
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    };
    SolicitarServicioComponent.prototype.getUltimoIdPublicacionClienteError = function (responseError) {
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    };
    SolicitarServicioComponent.prototype.finalizarFlujo = function () {
        //this.loading = true;
        this.flujoFinalizado = true;
    };
    return SolicitarServicioComponent;
}());
SolicitarServicioComponent = __decorate([
    core_1.Component({
        selector: 'solicitar-servicio',
        templateUrl: 'app/dashboard/solicitar-servicio/solicitar-servicio.component.html',
        styleUrls: ['css/solicitar-servicio.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router])
], SolicitarServicioComponent);
exports.SolicitarServicioComponent = SolicitarServicioComponent;
//# sourceMappingURL=solicitar-servicio.component.js.map