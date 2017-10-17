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
var ListadoOfertasContratadasComponent = (function () {
    function ListadoOfertasContratadasComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.mensajes = new mensaje_1.Mensaje();
        this.loading = true;
        this.publicaciones = [];
        this.viendoTodas = true;
        this.mensajesComentario = new mensaje_1.Mensaje();
        this.contactos = [];
        this.comentarioPuntuacion = new comentarioPuntuacion_1.ComentarioPuntuacion();
        this.baseURL = settings_1.Settings.srcImg; //ver que acá va la ruta del proyecto que contiene las imagenes
        var idUsuario = parseInt(localStorage.getItem('id-usuario'));
        this.obtenerPublicacionesContratadasPorCliente(idUsuario);
        this.obtenerTodosContactosConComentariosPendientesOferta(idUsuario);
    }
    ListadoOfertasContratadasComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
        this.mensajesComentario.Errores = [];
        this.mensajesComentario.Exitos = [];
    };
    ListadoOfertasContratadasComponent.prototype.obtenerPublicacionesContratadasPorCliente = function (id) {
        var _this = this;
        this.dataService.getobtenerPublicacionesContratadasPorCliente(id)
            .subscribe(function (res) { return _this.getobtenerPublicacionesContratadasPorClienteOk(res); }, function (error) { return _this.getobtenerPublicacionesContratadasPorClienteError(error); }, function () { return utilidades_1.Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerPublicacionesContratadasPorCliente: Completado"); });
    };
    ListadoOfertasContratadasComponent.prototype.getobtenerPublicacionesContratadasPorClienteOk = function (response) {
        utilidades_1.Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerPublicacionesContratadasPorClienteOk | response: " + JSON.stringify(response));
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
    ListadoOfertasContratadasComponent.prototype.getobtenerPublicacionesContratadasPorClienteError = function (responseError) {
        utilidades_1.Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerPublicacionesContratadasPorClienteError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    };
    ListadoOfertasContratadasComponent.prototype.obtenerTodosContactosConComentariosPendientesOferta = function (id) {
        var _this = this;
        this.dataService.getobtenerTodosContactosConComentariosPendientesOferta(id)
            .subscribe(function (res) { return _this.getobtenerTodosContactosConComentariosPendientesOfertaOk(res); }, function (error) { return _this.getobtenerTodosContactosConComentariosPendientesOfertaError(error); }, function () { return utilidades_1.Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerTodosContactosConComentariosPendientesOferta: Completado"); });
    };
    ListadoOfertasContratadasComponent.prototype.getobtenerTodosContactosConComentariosPendientesOfertaOk = function (response) {
        utilidades_1.Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerTodosContactosConComentariosPendientesOfertaOk | response: " + JSON.stringify(response));
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
    ListadoOfertasContratadasComponent.prototype.getobtenerTodosContactosConComentariosPendientesOfertaError = function (responseError) {
        utilidades_1.Utilidades.log("[listado-publicaciones-contratadas.component.ts] - getobtenerTodosContactosConComentariosPendientesOfertaError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    ListadoOfertasContratadasComponent.prototype.cambiarVisualizacion = function (todas) {
        this.viendoTodas = todas;
    };
    ListadoOfertasContratadasComponent.prototype.cargarModal = function (contacto) {
        this.comentarioPuntuacion = new comentarioPuntuacion_1.ComentarioPuntuacion();
        this.comentarioPuntuacion.Publicacion = contacto.Publicacion;
        this.comentarioPuntuacion.Cliente.Id = parseInt(localStorage.getItem("id-usuario"));
        this.comentarioPuntuacion.Contacto = new contacto_1.Contacto();
        this.comentarioPuntuacion.Contacto.Id = contacto.Id;
        utilidades_1.Utilidades.log("[listado-publicaciones-contratadas.component.ts] - activarModal | contacto: " + JSON.stringify(contacto));
    };
    ListadoOfertasContratadasComponent.prototype.guardarComentario = function () {
        var _this = this;
        this.borrarMensajes();
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - guardarComentario | comentarioPuntuacion: " + JSON.stringify(this.comentarioPuntuacion));
        this.mensajesComentario.Errores = this.comentarioPuntuacion.validarDatos();
        if (this.mensajesComentario.Errores.length == 0) {
            this.dataService.postIngresarComentario(this.comentarioPuntuacion)
                .subscribe(function (res) { return _this.postIngresarComentarioOk(res); }, function (error) { return _this.postIngresarComentarioError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postIngresarComentario: Completado"); });
        }
    };
    ListadoOfertasContratadasComponent.prototype.postIngresarComentarioOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postIngresarComentarioOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            document.getElementById('btnModalClose').click();
            this.comentarioPuntuacion = new comentarioPuntuacion_1.ComentarioPuntuacion();
            this.obtenerTodosContactosConComentariosPendientesOferta(parseInt(localStorage.getItem('id-usuario')));
        }
        else {
            utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postIngresarComentarioOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajesComentario.Errores.push(error);
        }
    };
    ListadoOfertasContratadasComponent.prototype.postIngresarComentarioError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postIngresarComentarioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    return ListadoOfertasContratadasComponent;
}());
ListadoOfertasContratadasComponent = __decorate([
    core_1.Component({
        selector: 'listado-ofertas-contratadas',
        templateUrl: 'app/mi-cuenta/listado-ofertas-contratadas/listado-ofertas-contratadas.component.html',
        styleUrls: ['css/listado-ofertas-contratadas.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router])
], ListadoOfertasContratadasComponent);
exports.ListadoOfertasContratadasComponent = ListadoOfertasContratadasComponent;
//# sourceMappingURL=listado-ofertas-contratadas.component.js.map