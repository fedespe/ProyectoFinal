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
var cliente_1 = require("../../shared/cliente");
var comentarioPuntuacion_1 = require("../../shared/comentarioPuntuacion");
var settings_1 = require("../../shared/settings");
var ResumenComponent = (function () {
    function ResumenComponent(dataService, router, route) {
        this.dataService = dataService;
        this.router = router;
        this.route = route;
        this.mensajes = new mensaje_1.Mensaje();
        this.loading = true;
        this.cliente = new cliente_1.Cliente();
        this.cantidadOfertasFinalizadas = 0;
        this.cantidadOfertasActivas = 0;
        this.cantidadOfertasInactivas = 0;
        this.comentariosPuntuacionOferta = [];
        this.comentariosPuntuacionSolicitud = [];
        this.servicios = [];
        this.responderSolicitud = false;
        this.responderOferta = false;
        this.comentarioPuntuacion = new comentarioPuntuacion_1.ComentarioPuntuacion();
        this.baseURL = settings_1.Settings.srcImg;
    }
    ResumenComponent.prototype.ngOnInit = function () {
        this.borrarMensajes();
        this.cliente.Id = parseInt(localStorage.getItem('id-usuario'));
        this.obternerClienteLogueado();
        this.obtenerNumerosClienteLogueado();
        this.obtenerServicios();
    };
    ResumenComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    ResumenComponent.prototype.obternerClienteLogueado = function () {
        var _this = this;
        this.dataService.getObtenerCliente(this.cliente.Id)
            .subscribe(function (res) { return _this.getObternerClienteOk(res); }, function (error) { return _this.getObternerClienteError(error); }, function () { return utilidades_1.Utilidades.log("[resumen.component.ts] - getObtenerCliente: Completado"); });
    };
    ResumenComponent.prototype.getObternerClienteOk = function (response) {
        utilidades_1.Utilidades.log("[resumen.component.ts] - getObternerClienteOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.cliente.NombreUsuario = response.Objetos[0].NombreUsuario;
            this.cliente.Nombre = response.Objetos[0].Nombre;
            this.cliente.Apellido = response.Objetos[0].Apellido;
            this.cliente.Telefono = response.Objetos[0].Telefono;
            this.cliente.Direccion = response.Objetos[0].Direccion;
            this.cliente.Barrio.Id = response.Objetos[0].Barrio.Id;
            this.cliente.Barrio.Nombre = response.Objetos[0].Barrio.Nombre;
            this.cliente.Barrio.Departamento.Nombre = response.Objetos[0].Barrio.Departamento.Nombre;
            this.cliente.Imagen = response.Objetos[0].Imagen;
        }
        else {
            this.borrarMensajes();
            var error = new error_1.Error();
            error.Descripcion = "Ha ocurrido un error al cargar sus datos. Intente nuevamente o contacte al administrador.";
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    };
    ResumenComponent.prototype.getObternerClienteError = function (responseError) {
        utilidades_1.Utilidades.log("[resumen.component.ts] - getObternerClienteError | responseError: " + JSON.stringify(responseError));
        this.borrarMensajes();
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    };
    ResumenComponent.prototype.obtenerNumerosClienteLogueado = function () {
        this.obetenerPromedioClienteOferta();
        this.obtenerPublicacionesCliente(this.cliente.Id);
    };
    ResumenComponent.prototype.obetenerPromedioClienteOferta = function () {
        var _this = this;
        this.dataService.getObetenerPromedioClienteOferta(this.cliente.Id)
            .subscribe(function (res) { return _this.getObetenerPromedioClienteOfertaOk(res); }, function (error) { return _this.getObetenerPromedioClienteOfertaError(error); }, function () { return utilidades_1.Utilidades.log("[resumen.component.ts] - obetenerPromedioClienteOferta: Completado"); });
    };
    ResumenComponent.prototype.getObetenerPromedioClienteOfertaOk = function (response) {
        utilidades_1.Utilidades.log("[resumen.component.ts] - getObetenerPromedioClienteOfertaOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            this.promedioCliente = response.Objetos[0];
        }
        else {
            this.borrarMensajes();
            var error = new error_1.Error();
            error.Descripcion = "Ha ocurrido un error al cargar sus datos. Intente nuevamente o contacte al administrador.";
            this.mensajes.Errores.push(error);
        }
    };
    ResumenComponent.prototype.getObetenerPromedioClienteOfertaError = function (responseError) {
        utilidades_1.Utilidades.log("[resumen.component.ts] - getObetenerPromedioClienteServicioError | responseError: " + JSON.stringify(responseError));
        this.borrarMensajes();
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    };
    ResumenComponent.prototype.obtenerPublicacionesCliente = function (id) {
        var _this = this;
        this.dataService.getObtenerPublicacionesClienteOferta(id)
            .subscribe(function (res) { return _this.getObtenerPublicacionesClienteOfertaOk(res); }, function (error) { return _this.getObtenerPublicacionesClienteOfertaError(error); }, function () { return utilidades_1.Utilidades.log("[resumen.component.ts] - getObtenerPublicacionesClienteOferta: Completado"); });
    };
    ResumenComponent.prototype.getObtenerPublicacionesClienteOfertaOk = function (response) {
        utilidades_1.Utilidades.log("[resumen.component.ts] - getObtenerPublicacionesClienteOfertaOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.publicaciones = response.Objetos;
            this.calcularNumerosClienteLogueado();
        }
        else {
            this.borrarMensajes();
            var error = new error_1.Error();
            error.Descripcion = "Ha ocurrido un error al cargar sus datos. Intente nuevamente o contacte al administrador.";
            this.mensajes.Errores.push(error);
        }
    };
    ResumenComponent.prototype.getObtenerPublicacionesClienteOfertaError = function (responseError) {
        utilidades_1.Utilidades.log("[resumen.component.ts] - getObtenerPublicacionesClienteOfertaError | responseError: " + JSON.stringify(responseError));
        this.borrarMensajes();
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    };
    ResumenComponent.prototype.calcularNumerosClienteLogueado = function () {
        for (var _i = 0, _a = this.publicaciones; _i < _a.length; _i++) {
            var publicacion = _a[_i];
            if (publicacion.Tipo === "OFERTA") {
                if (publicacion.Finalizada) {
                    this.cantidadOfertasFinalizadas++;
                }
                else if (publicacion.Activa) {
                    this.cantidadOfertasActivas++;
                }
                else if (!publicacion.Activa) {
                    this.cantidadOfertasInactivas++;
                }
            }
        }
    };
    ResumenComponent.prototype.obtenerServicios = function () {
        var _this = this;
        this.dataService.getServicioObtenerTodos()
            .subscribe(function (res) { return _this.getServicioObtenerTodosOk(res); }, function (error) { return _this.getServicioObtenerTodosError(error); }, function () { return utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - obtenerServicios: Completado"); });
    };
    ResumenComponent.prototype.getServicioObtenerTodosOk = function (response) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - obtenerServiciosOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.servicios = response.Objetos;
            this.getComentariosOferta();
            this.getComentariosSolicitud();
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    ResumenComponent.prototype.getServicioObtenerTodosError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - obtenerServiciosError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    ResumenComponent.prototype.getComentariosOferta = function () {
        var _this = this;
        this.dataService.getComentariosOferta(this.cliente.Id)
            .subscribe(function (res) { return _this.getComentariosOfertaOk(res); }, function (error) { return _this.getComentariosOfertaError(error); }, function () { return utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getComentariosOferta: Completado"); });
    };
    ResumenComponent.prototype.getComentariosOfertaOk = function (response) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getComentariosOfertaOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.comentariosPuntuacionOferta = response.Objetos;
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    ResumenComponent.prototype.getComentariosOfertaError = function (responseError) {
        utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - getComentariosOfertaError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    ResumenComponent.prototype.getComentariosSolicitud = function () {
        var _this = this;
        this.dataService.getComentariosSolicitud(this.cliente.Id)
            .subscribe(function (res) { return _this.getComentariosSolicitudOk(res); }, function (error) { return _this.getComentariosSolicitudError(error); }, function () { return utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getComentariosSolicitud: Completado"); });
    };
    ResumenComponent.prototype.getComentariosSolicitudOk = function (response) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getComentariosSolicitudOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.comentariosPuntuacionSolicitud = response.Objetos;
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    ResumenComponent.prototype.getComentariosSolicitudError = function (responseError) {
        utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - getComentariosSolicitudError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    ResumenComponent.prototype.responderComentarioSolicitud = function (input) {
        var s = 'respuestaSolicitud' + input;
        if (this.responderSolicitud == true) {
            document.getElementById(s).hidden = true;
            this.responderSolicitud = false;
        }
        else {
            document.getElementById(s).hidden = false;
            this.responderSolicitud = true;
        }
    };
    ResumenComponent.prototype.responderComentarioOferta = function (input) {
        var s = 'respuestaOferta' + input;
        if (this.responderOferta == true) {
            document.getElementById(s).hidden = true;
            this.responderOferta = false;
        }
        else {
            document.getElementById(s).hidden = false;
            this.responderOferta = true;
        }
    };
    ResumenComponent.prototype.guardarRespuestaOferta = function (input) {
        var _this = this;
        var respuesta = document.getElementById('txtRespuestaOferta' + input);
        if (respuesta.value != null && respuesta.value != '') {
            this.comentarioPuntuacion.Id = parseInt(input);
            this.comentarioPuntuacion.Respuesta = respuesta.value;
            this.dataService.postAltaRespuestaComentario(this.comentarioPuntuacion)
                .subscribe(function (res) { return _this.postAltaRespuestaComentarioOfertaOk(res, input); }, function (error) { return _this.postAltaRespuestaComentarioOfertaError(error); }, function () { return utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - postAltaRespuestaComentario: Completado"); });
        }
        else {
            alert('Debe ingresar un comentario.');
        }
    };
    ResumenComponent.prototype.postAltaRespuestaComentarioOfertaOk = function (response, idComentario) {
        utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - postAltaRespuestaComentarioOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            document.getElementById('btnGuardarRespuestaOferta' + idComentario).hidden = true;
            document.getElementById('txtRespuestaOferta' + idComentario).setAttribute('disabled', 'disabled');
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    ResumenComponent.prototype.postAltaRespuestaComentarioOfertaError = function (responseError) {
        utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - postAltaRespuestaComentarioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    ResumenComponent.prototype.guardarRespuestaSolicitud = function (input) {
        var _this = this;
        var respuesta = document.getElementById('txtRespuestaSolicitud' + input);
        if (respuesta.value != null && respuesta.value != '') {
            this.comentarioPuntuacion.Id = parseInt(input);
            this.comentarioPuntuacion.Respuesta = respuesta.value;
            this.dataService.postAltaRespuestaComentario(this.comentarioPuntuacion)
                .subscribe(function (res) { return _this.postAltaRespuestaComentarioSolicitudOk(res, input); }, function (error) { return _this.postAltaRespuestaComentarioSolicitudError(error); }, function () { return utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - postAltaRespuestaComentario: Completado"); });
        }
        else {
            alert('Debe ingresar un comentario.');
        }
    };
    ResumenComponent.prototype.postAltaRespuestaComentarioSolicitudOk = function (response, idComentario) {
        utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - postAltaRespuestaComentarioOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            document.getElementById('btnGuardarRespuestaSolicitud' + idComentario).hidden = true;
            document.getElementById('txtRespuestaSolicitud' + idComentario).setAttribute('disabled', 'disabled');
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    ResumenComponent.prototype.postAltaRespuestaComentarioSolicitudError = function (responseError) {
        utilidades_1.Utilidades.log("[perfil-usuario.component.ts] - postAltaRespuestaComentarioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    return ResumenComponent;
}());
ResumenComponent = __decorate([
    core_1.Component({
        selector: 'resumen',
        templateUrl: 'app/mi-cuenta/resumen/resumen.component.html',
        styleUrls: ['css/resumen.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, router_1.ActivatedRoute])
], ResumenComponent);
exports.ResumenComponent = ResumenComponent;
//# sourceMappingURL=resumen.component.js.map