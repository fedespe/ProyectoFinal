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
        this.cantidadSolicitudesFinalizadas = 0;
        this.cantidadSolicitudesActivas = 0;
        this.cantidadSolicitudesInactivas = 0;
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
        this.obtenerOfertasCliente(this.cliente.Id);
        this.obtenerSolicitudesCliente(this.cliente.Id);
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
        utilidades_1.Utilidades.log("[resumen.component.ts] - getObetenerPromedioClienteOfertaError | responseError: " + JSON.stringify(responseError));
        this.borrarMensajes();
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    };
    ResumenComponent.prototype.obtenerOfertasCliente = function (id) {
        var _this = this;
        this.dataService.getObtenerPublicacionesClienteOferta(id)
            .subscribe(function (res) { return _this.getObtenerPublicacionesClienteOfertaOk(res); }, function (error) { return _this.getObtenerPublicacionesClienteOfertaError(error); }, function () { return utilidades_1.Utilidades.log("[resumen.component.ts] - getObtenerPublicacionesClienteOferta: Completado"); });
    };
    ResumenComponent.prototype.getObtenerPublicacionesClienteOfertaOk = function (response) {
        utilidades_1.Utilidades.log("[resumen.component.ts] - getObtenerPublicacionesClienteOfertaOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.publicaciones = response.Objetos;
            this.calcularNumerosOfertasClienteLogueado();
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
    ResumenComponent.prototype.calcularNumerosOfertasClienteLogueado = function () {
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
    ResumenComponent.prototype.obtenerSolicitudesCliente = function (id) {
        var _this = this;
        this.dataService.getObtenerPublicacionesClienteSolicitud(id)
            .subscribe(function (res) { return _this.getObtenerPublicacionesClienteSolicitudOk(res); }, function (error) { return _this.getObtenerPublicacionesClienteSolicitudError(error); }, function () { return utilidades_1.Utilidades.log("[resumen.component.ts] - getObtenerPublicacionesClienteSolicitud: Completado"); });
    };
    ResumenComponent.prototype.getObtenerPublicacionesClienteSolicitudOk = function (response) {
        utilidades_1.Utilidades.log("[resumen.component.ts] - getObtenerPublicacionesClienteSolicitudOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.publicaciones = response.Objetos;
            this.calcularNumerosSolicitudesClienteLogueado();
        }
        else {
            this.borrarMensajes();
            var error = new error_1.Error();
            error.Descripcion = "Ha ocurrido un error al cargar sus datos. Intente nuevamente o contacte al administrador.";
            this.mensajes.Errores.push(error);
        }
    };
    ResumenComponent.prototype.getObtenerPublicacionesClienteSolicitudError = function (responseError) {
        utilidades_1.Utilidades.log("[resumen.component.ts] - getObtenerPublicacionesClienteSolicitudError | responseError: " + JSON.stringify(responseError));
        this.borrarMensajes();
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    };
    ResumenComponent.prototype.calcularNumerosSolicitudesClienteLogueado = function () {
        for (var _i = 0, _a = this.publicaciones; _i < _a.length; _i++) {
            var publicacion = _a[_i];
            if (publicacion.Tipo == "SOLICITUD") {
                if (publicacion.Finalizada) {
                    this.cantidadSolicitudesFinalizadas++;
                }
                else if (publicacion.Activa) {
                    this.cantidadSolicitudesActivas++;
                }
                else if (!publicacion.Activa) {
                    this.cantidadSolicitudesInactivas++;
                }
            }
        }
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