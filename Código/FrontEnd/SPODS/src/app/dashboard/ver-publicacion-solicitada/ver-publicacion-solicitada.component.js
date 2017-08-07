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
var presupuesto_1 = require("../../shared/presupuesto");
var VerPublicacionSolicitadaComponent = (function () {
    function VerPublicacionSolicitadaComponent(dataService, router, route) {
        this.dataService = dataService;
        this.router = router;
        this.route = route;
        this.mensajes = new mensaje_1.Mensaje();
        this.servicios = [];
        this.publicacion = new publicacion_1.Publicacion();
        this.puntaje = 0;
        this.comentarioPuntuacion = new comentarioPuntuacion_1.ComentarioPuntuacion();
        this.responder = false;
        this.postulacion = false;
        this.presupuestos = [];
        this.baseURL = settings_1.Settings.srcImg; //ver que acá va la ruta del proyecto que contiene las imagenes
    }
    VerPublicacionSolicitadaComponent.prototype.ngOnInit = function () {
        var _this = this;
        // subscripción al observable params
        this.route.params
            .subscribe(function (params) {
            _this.idPublicacion = parseInt(params['id']);
            _this.idContacto = parseInt(params['idContacto']);
            utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - ngOnInit | id: " + JSON.stringify(_this.idPublicacion));
            utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - ngOnInit | idContacto: " + JSON.stringify(_this.idContacto));
        });
        this.obtenerPublicacion();
        this.idUsuario = parseInt(localStorage.getItem('id-usuario'));
    };
    VerPublicacionSolicitadaComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    VerPublicacionSolicitadaComponent.prototype.postularme = function () {
        if (!this.postulacion) {
            this.postulacion = true;
        }
        else {
            this.postulacion = false;
        }
    };
    VerPublicacionSolicitadaComponent.prototype.guardarPropuesta = function () {
        var _this = this;
        this.presupuesto = new presupuesto_1.Presupuesto();
        this.presupuesto.Solicitud.Id = this.publicacion.Id;
        this.presupuesto.Cliente.Id = this.publicacion.Cliente.Id;
        var comentario = document.getElementById('txtPropuesta');
        this.presupuesto.Comentario = comentario.value;
        this.presupuesto.Aceptado = true;
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] GuardarPropuesta - presupuesto: " + JSON.stringify(this.presupuesto));
        this.dataService.postIngresarPresupuesto(this.presupuesto)
            .subscribe(function (res) { return _this.postIngresarPresupuestoOk(res); }, function (error) { return _this.postIngresarPresupuestoError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - postIngresarComentario: Completado"); });
    };
    VerPublicacionSolicitadaComponent.prototype.postIngresarPresupuestoOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - postIngresarPresupuestoOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            document.getElementById('btnPropuesta').hidden = true;
            document.getElementById('txtPropuesta').setAttribute('disabled', 'disabled');
        }
        else {
            utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - postIngresarPresupuestoOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionSolicitadaComponent.prototype.postIngresarPresupuestoError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - postIngresarPresupuestoError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionSolicitadaComponent.prototype.guardarComentario = function () {
        var _this = this;
        this.borrarMensajes();
        this.comentarioPuntuacion.Puntuacion = this.puntaje;
        this.comentarioPuntuacion.Publicacion = this.publicacion;
        this.comentarioPuntuacion.Cliente.Id = parseInt(localStorage.getItem('id-usuario'));
        this.comentarioPuntuacion.Contacto = new contacto_1.Contacto();
        this.comentarioPuntuacion.Contacto.Id = this.idContacto;
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - guardarComentario | comentarioPuntuacion: " + JSON.stringify(this.comentarioPuntuacion));
        if (this.comentarioPuntuacion.Comentario != null && this.comentarioPuntuacion.Comentario != "") {
            this.dataService.postIngresarComentario(this.comentarioPuntuacion)
                .subscribe(function (res) { return _this.postIngresarComentarioOk(res); }, function (error) { return _this.postIngresarComentarioError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - postIngresarComentario: Completado"); });
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = "El comentario no puede estar vacio.";
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionSolicitadaComponent.prototype.postIngresarComentarioOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - postIngresarComentarioOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            $('#exampleModalLong').modal('hide');
            this.router.navigate(['/dashboard/ver-publicacion-solicitada/', this.publicacion.Id, 0]);
        }
        else {
            utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - postIngresarComentarioOk | response.Mensaje: " + JSON.stringify(response.Mensaje));
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionSolicitadaComponent.prototype.postIngresarComentarioError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - postIngresarComentarioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionSolicitadaComponent.prototype.actualizarPuntaje = function (input) {
        this.puntaje = input;
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - actualizarPuntaje | puntaje: " + JSON.stringify(this.puntaje));
    };
    VerPublicacionSolicitadaComponent.prototype.obtenerPublicacion = function () {
        var _this = this;
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerPublicacion | id: " + JSON.stringify(this.idPublicacion));
        this.dataService.getPublicacion(this.idPublicacion)
            .subscribe(function (res) { return _this.getPublicacionOk(res); }, function (error) { return _this.getPublicacionError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerServicios: Completado"); });
    };
    VerPublicacionSolicitadaComponent.prototype.getPublicacionOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerServiciosOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.publicacion = response.Objetos[0];
            this.obtenerServicio(this.publicacion.Servicio.Id);
            this.obtenerCliente(this.publicacion.Cliente.Id);
            this.obtenerPresupuestos();
            this.obtenerComentarios();
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
    VerPublicacionSolicitadaComponent.prototype.getPublicacionError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerServiciosError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionSolicitadaComponent.prototype.obtenerServicio = function (id) {
        var _this = this;
        this.dataService.getObtenerServicio(id)
            .subscribe(function (res) { return _this.getObtenerServicioOk(res); }, function (error) { return _this.getObtenerServicioError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerServicio: Completado"); });
    };
    VerPublicacionSolicitadaComponent.prototype.getObtenerServicioOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerServicioOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            this.publicacion.Servicio = response.Objetos[0];
            this.obtenerPreguntas(); //metodo que completa en alngular las respuestas a las preguntas
            this.obetenerPromedioPublicacion();
            this.obetenerPromedioClienteServicio();
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionSolicitadaComponent.prototype.getObtenerServicioError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerServicioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionSolicitadaComponent.prototype.obtenerPreguntas = function () {
        for (var i = 0; i < this.publicacion.Respuestas.length; i++) {
            for (var j = 0; j < this.publicacion.Servicio.Preguntas.length; j++) {
                if (this.publicacion.Servicio.Preguntas[j].Id == this.publicacion.Respuestas[i].Pregunta.Id) {
                    this.publicacion.Respuestas[i].Pregunta.UnaPregunta = this.publicacion.Servicio.Preguntas[j].UnaPregunta;
                }
            }
        }
    };
    VerPublicacionSolicitadaComponent.prototype.obtenerCliente = function (id) {
        var _this = this;
        this.dataService.getObtenerCliente(id)
            .subscribe(function (res) { return _this.getObtenerClienteOk(res); }, function (error) { return _this.getObtenerClienteError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerCliente: Completado"); });
    };
    VerPublicacionSolicitadaComponent.prototype.getObtenerClienteOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerClienteOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            this.publicacion.Cliente = response.Objetos[0];
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionSolicitadaComponent.prototype.getObtenerClienteError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - obtenerClienteError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionSolicitadaComponent.prototype.contactar = function () {
        var _this = this;
        var contacto = new contacto_1.Contacto();
        contacto.Cliente.Id = parseInt(localStorage.getItem("id-usuario"));
        contacto.Publicacion = this.publicacion;
        this.dataService.postAltaContacto(contacto)
            .subscribe(function (res) { return _this.postAltaContactoOk(res); }, function (error) { return _this.postAltaContactoError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - postAltaContacto: Completado"); });
    };
    VerPublicacionSolicitadaComponent.prototype.postAltaContactoOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - postAltaContactoOk | response: " + JSON.stringify(response.Objetos[0]));
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
    VerPublicacionSolicitadaComponent.prototype.postAltaContactoError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - postAltaContactoError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionSolicitadaComponent.prototype.obtenerComentarios = function () {
        var _this = this;
        this.dataService.getObtenerComentarioPublicacion(this.publicacion.Id)
            .subscribe(function (res) { return _this.getObtenerComentarioPublicacionOk(res); }, function (error) { return _this.getObtenerComentarioPublicacionError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObtenerComentarioPublicacion: Completado"); });
    };
    VerPublicacionSolicitadaComponent.prototype.getObtenerComentarioPublicacionOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObtenerComentarioPublicacionOk | response: " + JSON.stringify(response.Objetos));
        if (response.Codigo == 200) {
            this.publicacion.ComentariosPuntuacion = response.Objetos;
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionSolicitadaComponent.prototype.getObtenerComentarioPublicacionError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObtenerComentarioPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionSolicitadaComponent.prototype.obetenerPromedioPublicacion = function () {
        var _this = this;
        this.dataService.getObetenerPromedioPublicacion(this.publicacion.Id)
            .subscribe(function (res) { return _this.getObetenerPromedioPublicacionOk(res); }, function (error) { return _this.getObetenerPromedioPublicacionError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - obetenerPromedioPublicacion: Completado"); });
    };
    VerPublicacionSolicitadaComponent.prototype.getObetenerPromedioPublicacionOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObetenerPromedioPublicacionOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            this.promedioPublicacion = response.Objetos[0];
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionSolicitadaComponent.prototype.getObetenerPromedioPublicacionError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObetenerPromedioPublicacionError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionSolicitadaComponent.prototype.obetenerPromedioClienteServicio = function () {
        var _this = this;
        this.dataService.getObetenerPromedioClienteServicio(this.publicacion.Cliente.Id, this.publicacion.Servicio.Id)
            .subscribe(function (res) { return _this.getObetenerPromedioClienteServicioOk(res); }, function (error) { return _this.getObetenerPromedioClienteServicioError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObetenerPromedioClienteServicio: Completado"); });
    };
    VerPublicacionSolicitadaComponent.prototype.getObetenerPromedioClienteServicioOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObetenerPromedioClienteServicioOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            this.promedioServicio = response.Objetos[0];
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionSolicitadaComponent.prototype.getObetenerPromedioClienteServicioError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObetenerPromedioClienteServicioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionSolicitadaComponent.prototype.obtenerPresupuestos = function () {
        var _this = this;
        this.dataService.getObtenerPresupuestos(this.publicacion.Id)
            .subscribe(function (res) { return _this.getObtenerPresupuestosOk(res); }, function (error) { return _this.getObtenerPresupuestosError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObtenerPresupuestos: Completado"); });
    };
    VerPublicacionSolicitadaComponent.prototype.getObtenerPresupuestosOk = function (response) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObtenerPresupuestosOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            this.presupuestos = response.Objetos;
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPublicacionSolicitadaComponent.prototype.getObtenerPresupuestosError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - getObtenerPresupuestosError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPublicacionSolicitadaComponent.prototype.responderComentario = function (input) {
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
    VerPublicacionSolicitadaComponent.prototype.guardarRespuesta = function (input) {
        var _this = this;
        var respuesta = document.getElementById('txtRespuesta' + input);
        if (respuesta.value != null && respuesta.value != '') {
            this.comentarioPuntuacion.Id = parseInt(input);
            this.comentarioPuntuacion.Respuesta = respuesta.value;
            this.dataService.postAltaRespuestaComentario(this.comentarioPuntuacion)
                .subscribe(function (res) { return _this.postAltaRespuestaComentarioOk(res, input); }, function (error) { return _this.postAltaRespuestaComentarioError(error); }, function () { return utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - postAltaRespuestaComentario: Completado"); });
        }
        else {
            alert('Debe ingresar un comentario.');
        }
    };
    VerPublicacionSolicitadaComponent.prototype.postAltaRespuestaComentarioOk = function (response, idComentario) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - postAltaRespuestaComentarioOk | response: " + JSON.stringify(response.Objetos[0]));
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
    VerPublicacionSolicitadaComponent.prototype.postAltaRespuestaComentarioError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-publicacion-solicitada.component.ts] - postAltaRespuestaComentarioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    return VerPublicacionSolicitadaComponent;
}());
VerPublicacionSolicitadaComponent = __decorate([
    core_1.Component({
        selector: 'ver-publicacion-solicitada',
        templateUrl: 'app/dashboard/ver-publicacion-solicitada/ver-publicacion-solicitada.component.html',
        styleUrls: ['css/ver-publicacion-solicitada.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, router_2.ActivatedRoute])
], VerPublicacionSolicitadaComponent);
exports.VerPublicacionSolicitadaComponent = VerPublicacionSolicitadaComponent;
//# sourceMappingURL=ver-publicacion-solicitada.component.js.map