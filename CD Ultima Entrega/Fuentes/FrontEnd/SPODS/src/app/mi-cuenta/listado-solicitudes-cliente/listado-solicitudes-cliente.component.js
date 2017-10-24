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
var contacto_1 = require("../../shared/contacto");
var comentarioPuntuacion_1 = require("../../shared/comentarioPuntuacion");
var ListadoSolicitudesClienteComponent = (function () {
    function ListadoSolicitudesClienteComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.mensajes = new mensaje_1.Mensaje();
        this.loading = true;
        this.solicitudes = [];
        this.viendoTodas = true;
        this.mensajesComentario = new mensaje_1.Mensaje();
        this.contactos = [];
        this.comentarioPuntuacion = new comentarioPuntuacion_1.ComentarioPuntuacion();
        this.baseURL = settings_1.Settings.srcImg; //ver que acá va la ruta del proyecto que contiene las imagenes
        var idUsuario = parseInt(localStorage.getItem('id-usuario'));
        this.obtenerSolicitudesCliente(idUsuario);
        this.obtenerTodosContactosConComentariosPendientesSolicitud(idUsuario);
    }
    ListadoSolicitudesClienteComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
        this.mensajesComentario.Errores = [];
        this.mensajesComentario.Exitos = [];
    };
    ListadoSolicitudesClienteComponent.prototype.obtenerSolicitudesCliente = function (id) {
        var _this = this;
        this.dataService.getObtenerSolicitudesCliente(id)
            .subscribe(function (res) { return _this.getObtenerSolicitudesClienteOk(res); }, function (error) { return _this.getObtenerSolicitudesClienteError(error); }, function () { return utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - getObtenerSolicitudesCliente: Completado"); });
    };
    ListadoSolicitudesClienteComponent.prototype.getObtenerSolicitudesClienteOk = function (response) {
        utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - getObtenerSolicitudesClienteOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.solicitudes = response.Objetos;
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    };
    ListadoSolicitudesClienteComponent.prototype.getObtenerSolicitudesClienteError = function (responseError) {
        utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - getObtenerSolicitudesClienteError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    };
    ListadoSolicitudesClienteComponent.prototype.desactivarPublicacion = function (input) {
        var _this = this;
        utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - desactivarPublicacion | responseError: " + JSON.stringify(input));
        this.dataService.getDesactivarPublicacion(input)
            .subscribe(function (res) { return _this.getDesactivarPublicacionOk(res); }, function (error) { return _this.getDesactivarPublicacionError(error); }, function () { return utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - getDesactivarPublicacion: Completado"); });
    };
    ListadoSolicitudesClienteComponent.prototype.getDesactivarPublicacionOk = function (response) {
        utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - getDesactivarPublicacionOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.obtenerSolicitudesCliente(parseInt(localStorage.getItem('id-usuario')));
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    ListadoSolicitudesClienteComponent.prototype.getDesactivarPublicacionError = function (responseError) {
        utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - getDesactivarPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    ListadoSolicitudesClienteComponent.prototype.activarPublicacion = function (input) {
        var _this = this;
        utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - activarPublicacion | response: " + JSON.stringify(input));
        this.dataService.getActivarPublicacion(input)
            .subscribe(function (res) { return _this.getActivarPublicacionOk(res); }, function (error) { return _this.getActivarPublicacionError(error); }, function () { return utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - getActivarPublicacion: Completado"); });
    };
    ListadoSolicitudesClienteComponent.prototype.getActivarPublicacionOk = function (response) {
        utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - getActivarPublicacionOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.obtenerSolicitudesCliente(parseInt(localStorage.getItem('id-usuario')));
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    ListadoSolicitudesClienteComponent.prototype.getActivarPublicacionError = function (responseError) {
        utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - getActivarPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    ListadoSolicitudesClienteComponent.prototype.obtenerTodosContactosConComentariosPendientesSolicitud = function (id) {
        var _this = this;
        this.dataService.getobtenerTodosContactosConComentariosPendientesSolicitud(id)
            .subscribe(function (res) { return _this.getobtenerTodosContactosConComentariosPendientesSolicitudOk(res); }, function (error) { return _this.getobtenerTodosContactosConComentariosPendientesSolicitudError(error); }, function () { return utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - getobtenerTodosContactosConComentariosPendientesSolicitud: Completado"); });
    };
    ListadoSolicitudesClienteComponent.prototype.getobtenerTodosContactosConComentariosPendientesSolicitudOk = function (response) {
        utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - getobtenerTodosContactosConComentariosPendientesSolicitudOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.contactos = response.Objetos;
            if (this.contactos.length == 0) {
                this.viendoTodas = true;
            }
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    ListadoSolicitudesClienteComponent.prototype.getobtenerTodosContactosConComentariosPendientesSolicitudError = function (responseError) {
        utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - getobtenerTodosContactosConComentariosPendientesSolicitudError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    ListadoSolicitudesClienteComponent.prototype.cambiarVisualizacion = function (todas) {
        this.viendoTodas = todas;
    };
    ListadoSolicitudesClienteComponent.prototype.cargarModal = function (contacto) {
        this.comentarioPuntuacion = new comentarioPuntuacion_1.ComentarioPuntuacion();
        this.comentarioPuntuacion.Publicacion = contacto.Publicacion; //al contrario de la oferta quien realiza el comentario es el due'o de la publicacion
        this.comentarioPuntuacion.Cliente.Id = contacto.Cliente.Id; //al contrario de la oferta quien recibe el comentario es el que realiza el trabajo
        this.comentarioPuntuacion.Contacto = new contacto_1.Contacto();
        this.comentarioPuntuacion.Contacto.Id = contacto.Id;
        utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - cargarModal | contacto: " + JSON.stringify(contacto));
    };
    ListadoSolicitudesClienteComponent.prototype.guardarComentario = function () {
        var _this = this;
        this.borrarMensajes();
        utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - guardarComentario | comentarioPuntuacion: " + JSON.stringify(this.comentarioPuntuacion));
        this.mensajesComentario.Errores = this.comentarioPuntuacion.validarDatos();
        if (this.mensajesComentario.Errores.length == 0) {
            this.dataService.postIngresarComentario(this.comentarioPuntuacion)
                .subscribe(function (res) { return _this.postIngresarComentarioOk(res); }, function (error) { return _this.postIngresarComentarioError(error); }, function () { return utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - postIngresarComentario: Completado"); });
        }
    };
    ListadoSolicitudesClienteComponent.prototype.postIngresarComentarioOk = function (response) {
        utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - postIngresarComentarioOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            document.getElementById('btnModalClose').click();
            this.comentarioPuntuacion = new comentarioPuntuacion_1.ComentarioPuntuacion();
            this.obtenerTodosContactosConComentariosPendientesSolicitud(parseInt(localStorage.getItem('id-usuario')));
        }
        else {
            utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - postIngresarComentarioOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajesComentario.Errores.push(error);
        }
    };
    ListadoSolicitudesClienteComponent.prototype.postIngresarComentarioError = function (responseError) {
        utilidades_1.Utilidades.log("[listado-solicitudes-cliente.component.ts] - postIngresarComentarioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    ListadoSolicitudesClienteComponent.prototype.visualizarContactoPresupuestoAceptado = function (solicitud) {
        var idCliente = 0;
        for (var _i = 0, _a = solicitud.Presupuestos; _i < _a.length; _i++) {
            var presupuesto = _a[_i];
            if (presupuesto.Aceptado) {
                idCliente = presupuesto.Cliente.Id;
                break;
            }
        }
        this.router.navigate(['dashboard/ver-perfil-usuario/', idCliente]);
    };
    return ListadoSolicitudesClienteComponent;
}());
ListadoSolicitudesClienteComponent = __decorate([
    core_1.Component({
        selector: 'listado-solicitudes-cliente',
        templateUrl: 'app/mi-cuenta/listado-solicitudes-cliente/listado-solicitudes-cliente.component.html',
        styleUrls: ['css/listado-solicitudes-cliente.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router])
], ListadoSolicitudesClienteComponent);
exports.ListadoSolicitudesClienteComponent = ListadoSolicitudesClienteComponent;
//# sourceMappingURL=listado-solicitudes-cliente.component.js.map