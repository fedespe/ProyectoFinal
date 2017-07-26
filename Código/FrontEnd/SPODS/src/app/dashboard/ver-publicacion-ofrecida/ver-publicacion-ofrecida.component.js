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
var contacto_1 = require("../../shared/contacto");
var comentarioPuntuacion_1 = require("../../shared/comentarioPuntuacion");
var VerPublicacionOfrecidaComponent = (function () {
    function VerPublicacionOfrecidaComponent(dataService, router, route) {
        this.dataService = dataService;
        this.router = router;
        this.route = route;
        this.mensajes = new mensaje_1.Mensaje();
        this.servicios = [];
        this.publicacion = new publicacion_1.Publicacion();
        this.puntaje = 0;
        this.comentarioPuntuacion = new comentarioPuntuacion_1.ComentarioPuntuacion();
        this.baseURL = settings_1.Settings.srcImg; //ver que acá va la ruta del proyecto que contiene las imagenes
    }
    VerPublicacionOfrecidaComponent.prototype.ngOnInit = function () {
        var _this = this;
        // subscripción al observable params
        this.route.params
            .subscribe(function (params) {
            _this.idPublicacion = parseInt(params['id']);
            _this.idContacto = parseInt(params['idContacto']);
            utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - ngOnInit | id: " + JSON.stringify(_this.idPublicacion));
            utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - ngOnInit | idContacto: " + JSON.stringify(_this.idContacto));
        });
        this.obtenerPublicacion();
    };
    VerPublicacionOfrecidaComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    VerPublicacionOfrecidaComponent.prototype.guardarComentario = function () {
        var _this = this;
        this.comentarioPuntuacion.Puntuacion = this.puntaje;
        this.comentarioPuntuacion.Publicacion = this.publicacion;
        this.comentarioPuntuacion.Cliente.Id = parseInt(localStorage.getItem('id-usuario'));
        this.comentarioPuntuacion.Contacto = new contacto_1.Contacto();
        this.comentarioPuntuacion.Contacto.Id = this.idContacto;
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - guardarComentario | comentarioPuntuacion: " + JSON.stringify(this.comentarioPuntuacion));
        this.dataService.postIngresarComentario(this.comentarioPuntuacion)
            .subscribe(function (res) { return _this.postIngresarComentarioOk(res); }, function (error) { return _this.postIngresarComentarioError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postIngresarComentario: Completado"); });
    };
    VerPublicacionOfrecidaComponent.prototype.postIngresarComentarioOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postIngresarComentarioOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
        }
        else {
            utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postIngresarComentarioOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionOfrecidaComponent.prototype.postIngresarComentarioError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postIngresarComentarioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionOfrecidaComponent.prototype.actualizarPuntaje = function (input) {
        this.puntaje = input;
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - actualizarPuntaje | puntaje: " + JSON.stringify(this.puntaje));
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
            //Terminado la carga de la publicacion, en caso de que haya comentario pendiente, se habre ventana modal
            if (this.idContacto != 0) {
                document.getElementById('btnModal').click();
            }
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
    VerPublicacionOfrecidaComponent.prototype.contactar = function () {
        var _this = this;
        var contacto = new contacto_1.Contacto();
        contacto.Cliente.Id = parseInt(localStorage.getItem("id-usuario"));
        contacto.Publicacion = this.publicacion;
        this.dataService.postAltaContacto(contacto)
            .subscribe(function (res) { return _this.postAltaContactoOk(res); }, function (error) { return _this.postAltaContactoError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postAltaContacto: Completado"); });
    };
    VerPublicacionOfrecidaComponent.prototype.postAltaContactoOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postAltaContactoOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            this.router.navigate(["dashboard/ver-perfil-usuario", this.publicacion.Cliente.Id]);
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = "Ha ocurrido un error al cargar los datos del usuario.";
            this.mensajes.Errores.push(error);
            error = new error_1.Error();
            error.Descripcion = "Intente nuevamente o contacte al administrador.";
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionOfrecidaComponent.prototype.postAltaContactoError = function (responseError) {
        utilidades_1.Utilidades.log("[editar-servicio-cliente.component.ts] - postAltaContactoError | responseError: " + JSON.stringify(responseError));
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