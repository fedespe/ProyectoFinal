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
var common_1 = require("@angular/common");
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
var cliente_1 = require("../../shared/cliente");
var VerPublicacionOfrecidaComponent = (function () {
    function VerPublicacionOfrecidaComponent(dataService, router, route, location) {
        this.dataService = dataService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.mensajes = new mensaje_1.Mensaje();
        this.mensajesComentario = new mensaje_1.Mensaje();
        this.servicios = [];
        this.publicacion = new publicacion_1.Publicacion();
        this.contacto = new contacto_1.Contacto();
        this.puntaje = 0;
        this.comentarioPuntuacion = new comentarioPuntuacion_1.ComentarioPuntuacion();
        this.responder = false;
        this.cliente = new cliente_1.Cliente();
        this.sinImagenes = false;
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
        this.idUsuario = parseInt(localStorage.getItem('id-usuario'));
    };
    VerPublicacionOfrecidaComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
        this.mensajesComentario.Errores = [];
    };
    VerPublicacionOfrecidaComponent.prototype.volver = function () {
        this.location.back();
    };
    VerPublicacionOfrecidaComponent.prototype.actualizarPuntaje = function (input) {
        this.puntaje = input;
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - actualizarPuntaje | puntaje: " + JSON.stringify(this.puntaje));
    };
    VerPublicacionOfrecidaComponent.prototype.obtenerPublicacion = function () {
        var _this = this;
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerPublicacion | id: " + JSON.stringify(this.idPublicacion));
        this.dataService.getPublicacion(this.idPublicacion)
            .subscribe(function (res) { return _this.getPublicacionOk(res); }, function (error) { return _this.getPublicacionError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obtenerPublicacion: Completado"); });
    };
    VerPublicacionOfrecidaComponent.prototype.getPublicacionOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - getPublicacionOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.publicacion = response.Objetos[0];
            if (this.publicacion.Imagenes == null || this.publicacion.Imagenes.length == 0) {
                this.sinImagenes = true;
            }
            this.obtenerContactoPendiente();
            this.obtenerServicio(this.publicacion.Servicio.Id);
            this.obtenerCliente(this.publicacion.Cliente.Id);
            this.obtenerComentarios();
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
    VerPublicacionOfrecidaComponent.prototype.obtenerContactoPendiente = function () {
        var _this = this;
        this.dataService.getObtenerContactoPendienteCliente(this.idPublicacion, this.idUsuario)
            .subscribe(function (res) { return _this.getObtenerContactoPendienteOk(res); }, function (error) { return _this.getObtenerContactoPendienteError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - getObtenerContactoPendiente: Completado"); });
    };
    VerPublicacionOfrecidaComponent.prototype.getObtenerContactoPendienteOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - getObtenerContactoPendienteOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            this.contacto = response.Objetos[0];
            //Terminado la carga de la publicacion, en caso de que haya comentario pendiente, se habre ventana modal
            if (this.contacto != null && this.contacto.Id != 0) {
                document.getElementById('btnModal').click();
            }
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionOfrecidaComponent.prototype.getObtenerContactoPendienteError = function (responseError) {
        utilidades_1.Utilidades.log("[editar-servicio-cliente.component.ts] - getObtenerContactoPendienteError | responseError: " + JSON.stringify(responseError));
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
            this.obetenerPromedioPublicacion();
            this.obetenerPromedioClienteServicio();
            this.obetenerPromedioClienteOferta();
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
            this.cliente = response.Objetos[0];
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
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postAltaContactoError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionOfrecidaComponent.prototype.obtenerComentarios = function () {
        var _this = this;
        this.dataService.getObtenerComentarioPublicacion(this.publicacion.Id)
            .subscribe(function (res) { return _this.getObtenerComentarioPublicacionOk(res); }, function (error) { return _this.getObtenerComentarioPublicacionError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - getObtenerComentarioPublicacion: Completado"); });
    };
    VerPublicacionOfrecidaComponent.prototype.getObtenerComentarioPublicacionOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - getObtenerComentarioPublicacionOk | response: " + JSON.stringify(response.Objetos));
        if (response.Codigo == 200) {
            this.publicacion.ComentariosPuntuacion = response.Objetos;
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionOfrecidaComponent.prototype.getObtenerComentarioPublicacionError = function (responseError) {
        utilidades_1.Utilidades.log("[editar-servicio-cliente.component.ts] - getObtenerComentarioPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionOfrecidaComponent.prototype.obetenerPromedioPublicacion = function () {
        var _this = this;
        this.dataService.getObetenerPromedioPublicacion(this.publicacion.Id)
            .subscribe(function (res) { return _this.getObetenerPromedioPublicacionOk(res); }, function (error) { return _this.getObetenerPromedioPublicacionError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obetenerPromedioPublicacion: Completado"); });
    };
    VerPublicacionOfrecidaComponent.prototype.getObetenerPromedioPublicacionOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - getObetenerPromedioPublicacionOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            this.promedioPublicacion = response.Objetos[0];
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionOfrecidaComponent.prototype.getObetenerPromedioPublicacionError = function (responseError) {
        utilidades_1.Utilidades.log("[editar-servicio-cliente.component.ts] - getObetenerPromedioPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionOfrecidaComponent.prototype.obetenerPromedioClienteServicio = function () {
        var _this = this;
        this.dataService.getObetenerPromedioClienteServicio(this.publicacion.Cliente.Id, this.publicacion.Servicio.Id)
            .subscribe(function (res) { return _this.getObetenerPromedioClienteServicioOk(res); }, function (error) { return _this.getObetenerPromedioClienteServicioError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - getObetenerPromedioClienteServicio: Completado"); });
    };
    VerPublicacionOfrecidaComponent.prototype.getObetenerPromedioClienteServicioOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - getObetenerPromedioClienteServicioOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            this.promedioServicio = response.Objetos[0];
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionOfrecidaComponent.prototype.getObetenerPromedioClienteServicioError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - getObetenerPromedioClienteServicioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionOfrecidaComponent.prototype.obetenerPromedioClienteOferta = function () {
        var _this = this;
        this.dataService.getObetenerPromedioClienteOferta(this.publicacion.Cliente.Id)
            .subscribe(function (res) { return _this.getObetenerPromedioClienteOfertaOk(res); }, function (error) { return _this.getObetenerPromedioClienteOfertaError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - obetenerPromedioClienteOferta: Completado"); });
    };
    VerPublicacionOfrecidaComponent.prototype.getObetenerPromedioClienteOfertaOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - getObetenerPromedioClienteOfertaOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            this.promedioCliente = response.Objetos[0];
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionOfrecidaComponent.prototype.getObetenerPromedioClienteOfertaError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - getObetenerPromedioClienteServicioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionOfrecidaComponent.prototype.responderComentario = function (input) {
        var s = 'respuesta' + input;
        if (this.responder == true) {
            document.getElementById(s).hidden = true;
            this.responder = false;
        }
        else {
            document.getElementById(s).hidden = false;
            this.responder = true;
        }
    };
    VerPublicacionOfrecidaComponent.prototype.guardarRespuesta = function (input) {
        var _this = this;
        var respuesta = document.getElementById('txtRespuesta' + input);
        if (respuesta.value != null && respuesta.value != '') {
            this.comentarioPuntuacion.Id = parseInt(input);
            this.comentarioPuntuacion.Respuesta = respuesta.value;
            this.dataService.postAltaRespuestaComentario(this.comentarioPuntuacion)
                .subscribe(function (res) { return _this.postAltaRespuestaComentarioOk(res, input); }, function (error) { return _this.postAltaRespuestaComentarioError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postAltaRespuestaComentario: Completado"); });
        }
        else {
            alert('Debe ingresar un comentario.');
        }
    };
    VerPublicacionOfrecidaComponent.prototype.postAltaRespuestaComentarioOk = function (response, idComentario) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postAltaRespuestaComentarioOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            document.getElementById('btnGuardarRespuesta' + idComentario).hidden = true;
            document.getElementById('txtRespuesta' + idComentario).setAttribute('disabled', 'disabled');
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionOfrecidaComponent.prototype.postAltaRespuestaComentarioError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postAltaRespuestaComentarioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionOfrecidaComponent.prototype.guardarComentario = function () {
        var _this = this;
        this.borrarMensajes();
        this.comentarioPuntuacion.Puntuacion = this.puntaje;
        this.comentarioPuntuacion.Publicacion = this.publicacion;
        this.comentarioPuntuacion.Cliente.Id = parseInt(localStorage.getItem('id-usuario'));
        this.comentarioPuntuacion.Contacto = new contacto_1.Contacto();
        this.comentarioPuntuacion.Contacto.Id = this.contacto.Id;
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - guardarComentario | comentarioPuntuacion: " + JSON.stringify(this.comentarioPuntuacion));
        this.mensajesComentario.Errores = this.comentarioPuntuacion.validarDatos();
        if (this.mensajesComentario.Errores.length == 0) {
            this.dataService.postIngresarComentario(this.comentarioPuntuacion)
                .subscribe(function (res) { return _this.postIngresarComentarioOk(res); }, function (error) { return _this.postIngresarComentarioError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postIngresarComentario: Completado"); });
        }
        // if(this.comentarioPuntuacion.Comentario!=null && this.comentarioPuntuacion.Comentario!=""){
        //     this.dataService.postIngresarComentario(this.comentarioPuntuacion)
        //     .subscribe(
        //         res => this.postIngresarComentarioOk(res),
        //         error => this.postIngresarComentarioError(error),
        //         () => Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postIngresarComentario: Completado")
        //     );
        // }else{
        //     var error = new Error();
        //     error.Descripcion = "El comentario no puede estar vacio.";           
        //     this.mensajes.Errores.push(error);
        // }
    };
    VerPublicacionOfrecidaComponent.prototype.postIngresarComentarioOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-ofrecida.component.ts] - postIngresarComentarioOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            //$('#exampleModalLong').modal('hide');
            document.getElementById('btnModalClose').click();
            this.obtenerComentarios();
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
    return VerPublicacionOfrecidaComponent;
}());
VerPublicacionOfrecidaComponent = __decorate([
    core_1.Component({
        selector: 'ver-publicacion-ofrecida',
        templateUrl: 'app/dashboard/ver-publicacion-ofrecida/ver-publicacion-ofrecida.component.html',
        styleUrls: ['css/ver-publicacion-ofrecida.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, router_2.ActivatedRoute, common_1.Location])
], VerPublicacionOfrecidaComponent);
exports.VerPublicacionOfrecidaComponent = VerPublicacionOfrecidaComponent;
//# sourceMappingURL=ver-publicacion-ofrecida.component.js.map