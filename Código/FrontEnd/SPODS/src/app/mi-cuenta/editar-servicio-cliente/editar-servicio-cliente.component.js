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
var router_2 = require("@angular/router");
var EditarServicioClienteComponent = (function () {
    function EditarServicioClienteComponent(dataService, router, route) {
        this.dataService = dataService;
        this.router = router;
        this.route = route;
        this.mensajes = new mensaje_1.Mensaje();
        this.loading = true;
        this.servicios = [];
        this.publicacion = new publicacion_1.Publicacion();
        this.servicioSeleccionado = new servicio_1.Servicio();
        this.respuestas = [];
        this.step = 1;
        this.urlImagen = settings_1.Settings.srcImg + "/Oferta/IngresarImagenes";
    }
    EditarServicioClienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        // subscripción al observable params
        this.route.params
            .subscribe(function (params) {
            _this.idPublicacion = parseInt(params['id']);
            utilidades_1.Utilidades.log("[[editar-servicio-cliente.component.ts] - ngOnInit | id: " + JSON.stringify(_this.idPublicacion));
        });
        this.obtenerPublicacion();
    };
    EditarServicioClienteComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    EditarServicioClienteComponent.prototype.obtenerPublicacion = function () {
        var _this = this;
        utilidades_1.Utilidades.log("[[editar-servicio-cliente.component.ts] - obtenerPublicacion | id: " + JSON.stringify(this.idPublicacion));
        this.dataService.getPublicacion(this.idPublicacion)
            .subscribe(function (res) { return _this.getPublicacionOk(res); }, function (error) { return _this.getPublicacionError(error); }, function () { return utilidades_1.Utilidades.log("[editar-servicio-cliente.component.ts] - obtenerServicios: Completado"); });
    };
    EditarServicioClienteComponent.prototype.getPublicacionOk = function (response) {
        utilidades_1.Utilidades.log("[[editar-servicio-cliente.component.ts] - obtenerServiciosOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.publicacion = response.Objetos[0];
            document.getElementById('inputIdPublicacion').setAttribute('value', this.publicacion.Id.toString());
            document.getElementById('mostrarImagenes').click();
            this.obtenerServicio(this.publicacion.Servicio.Id);
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
            this.loading = false;
        }
    };
    EditarServicioClienteComponent.prototype.getPublicacionError = function (responseError) {
        utilidades_1.Utilidades.log("[editar-servicio-cliente.component.ts] - obtenerServiciosError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    };
    EditarServicioClienteComponent.prototype.obtenerServicio = function (id) {
        var _this = this;
        this.dataService.getObtenerServicio(id)
            .subscribe(function (res) { return _this.getObtenerServicioOk(res); }, function (error) { return _this.getObtenerServicioError(error); }, function () { return utilidades_1.Utilidades.log("[editar-servicio-cliente.component.ts] - obtenerServicio: Completado"); });
    };
    EditarServicioClienteComponent.prototype.getObtenerServicioOk = function (response) {
        utilidades_1.Utilidades.log("[[editar-servicio-cliente.component.ts] - obtenerServicioOk | response: " + JSON.stringify(this.servicioSeleccionado));
        if (response.Codigo == 200) {
            this.publicacion.Servicio = response.Objetos[0];
            this.responderPreguntas(); //metodo que completa en alngular las respuestas a las preguntas
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
            this.loading = false;
        }
    };
    EditarServicioClienteComponent.prototype.getObtenerServicioError = function (responseError) {
        utilidades_1.Utilidades.log("[editar-servicio-cliente.component.ts] - obtenerServicioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    };
    EditarServicioClienteComponent.prototype.responderPreguntas = function () {
        for (var i = 0; i < this.publicacion.Respuestas.length; i++) {
            for (var j = 0; j < this.publicacion.Servicio.Preguntas.length; j++) {
                if (this.publicacion.Servicio.Preguntas[j].Id == this.publicacion.Respuestas[i].Pregunta.Id) {
                    this.publicacion.Servicio.Preguntas[j].UnaRespuesta = this.publicacion.Respuestas[i].UnaRespuesta;
                }
            }
        }
        this.loading = false;
    };
    EditarServicioClienteComponent.prototype.editarServicioPaso1 = function () {
        this.borrarMensajes();
        //Cuando se trae la publicacion por servcio no deja usar la funcion this.publicacion.validarDatos()
        //Se crea una nueva publicacion para hacer la validacion
        var p = new publicacion_1.Publicacion();
        p.Titulo = this.publicacion.Titulo;
        p.Servicio = this.publicacion.Servicio;
        p.Descripcion = this.publicacion.Descripcion;
        if (this.publicacion.Descripcion == null || this.publicacion.Descripcion.trim() == "") {
            this.publicacion.Descripcion = "Sin descripción.";
        }
        this.mensajes.Errores = p.validarDatos1();
        //fin validacion
        if (this.mensajes.Errores.length == 0) {
            this.step = 2;
        }
    };
    EditarServicioClienteComponent.prototype.editarServicioPaso2 = function () {
        this.putActualizarPublicacion();
    };
    EditarServicioClienteComponent.prototype.volverPaso1 = function () {
        this.step = 1;
    };
    EditarServicioClienteComponent.prototype.editarServicioPaso3 = function () {
        var exito = new exito_1.Exito();
        exito.Descripcion = "La publicación ha sido actualizada con éxito";
        this.mensajes.Exitos.push(exito);
        this.step = 1;
    };
    EditarServicioClienteComponent.prototype.putActualizarPublicacion = function () {
        var _this = this;
        utilidades_1.Utilidades.log("[editar-servicio-cliente.component.ts] - putActualizarPublicacion | responseError: " + JSON.stringify(this.respuestas));
        this.borrarMensajes();
        //Cuando se trae la publicacion por servcio no deja usar la funcion this.publicacion.validarDatos()
        //Se crea una nueva publicacion para hacer la validacion
        var p = new publicacion_1.Publicacion();
        p.Titulo = this.publicacion.Titulo;
        p.Imagenes = this.publicacion.Imagenes;
        p.Servicio = this.publicacion.Servicio;
        p.Descripcion = this.publicacion.Descripcion;
        this.mensajes.Errores = p.validarDatos();
        //fin validacion
        this.publicacion.Respuestas = [];
        if (this.mensajes.Errores.length == 0) {
            for (var i = 0; i < this.publicacion.Servicio.Preguntas.length; i++) {
                if (this.publicacion.Servicio.Preguntas[i].UnaRespuesta != null && this.publicacion.Servicio.Preguntas[i].UnaRespuesta != "") {
                    var r = new respuesta_1.Respuesta();
                    r.Pregunta.Id = this.publicacion.Servicio.Preguntas[i].Id;
                    r.UnaRespuesta = this.publicacion.Servicio.Preguntas[i].UnaRespuesta;
                    this.publicacion.Respuestas.push(r);
                }
            }
            utilidades_1.Utilidades.log("[editar-servicio-cliente.component.ts] - putActualizarPublicacion | responseError: " + JSON.stringify(this.publicacion));
            this.dataService.putActualizarPublicacion(this.publicacion)
                .subscribe(function (res) { return _this.putActualizarPublicacionOk(res); }, function (error) { return _this.putActualizarPublicacionError(error); }, function () { return utilidades_1.Utilidades.log("[ofrecer-servicio.component.ts] - putActualizarPublicacion: Completado"); });
        }
    };
    EditarServicioClienteComponent.prototype.putActualizarPublicacionOk = function (response) {
        utilidades_1.Utilidades.log("[[editar-servicio-cliente.component.ts] - putActualizarPublicacionOK | response: " + JSON.stringify(this.servicioSeleccionado));
        if (response.Codigo == 200) {
            this.step = 3;
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    EditarServicioClienteComponent.prototype.putActualizarPublicacionError = function (responseError) {
        utilidades_1.Utilidades.log("[editar-servicio-cliente.component.ts] - putActualizarPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    return EditarServicioClienteComponent;
}());
EditarServicioClienteComponent = __decorate([
    core_1.Component({
        selector: 'editar-servicio-cliente',
        templateUrl: 'app/mi-cuenta/editar-servicio-cliente/editar-servicio-cliente.component.html',
        styleUrls: ['css/editar-servicio-cliente.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, router_2.ActivatedRoute])
], EditarServicioClienteComponent);
exports.EditarServicioClienteComponent = EditarServicioClienteComponent;
//# sourceMappingURL=editar-servicio-cliente.component.js.map