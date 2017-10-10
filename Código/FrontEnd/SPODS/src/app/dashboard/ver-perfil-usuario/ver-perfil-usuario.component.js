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
var cliente_1 = require("../../shared/cliente");
var comentarioPuntuacion_1 = require("../../shared/comentarioPuntuacion");
var settings_1 = require("../../shared/settings");
var VerPerfilUsuarioComponent = (function () {
    function VerPerfilUsuarioComponent(dataService, router, route, location) {
        this.dataService = dataService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.mensajes = new mensaje_1.Mensaje();
        this.loading = true;
        this.cliente = new cliente_1.Cliente();
        //serviciosOfertas: Servicio[] = [];
        //serviciosSolicitudes: Servicio[] = [];
        this.comentariosPuntuacionOferta = [];
        this.comentariosPuntuacionSolicitud = [];
        this.responderSolicitud = false;
        this.responderOferta = false;
        this.comentarioPuntuacion = new comentarioPuntuacion_1.ComentarioPuntuacion();
        this.baseURL = settings_1.Settings.srcImg;
    }
    VerPerfilUsuarioComponent.prototype.ngOnInit = function () {
        var _this = this;
        // subscripción al observable params
        this.borrarMensajes();
        this.route.params
            .subscribe(function (params) {
            _this.cliente.Id = parseInt(params['id']);
            utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - ngOnInit | idCliente: " + JSON.stringify(_this.cliente.Id));
        });
        this.idUsuario = parseInt(localStorage.getItem('id-usuario'));
        this.getObternerCliente();
        this.obetenerPromedioClienteOferta();
        //this.obtenerServicios();
        this.getComentariosOferta();
        this.getComentariosSolicitud();
    };
    VerPerfilUsuarioComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    VerPerfilUsuarioComponent.prototype.volver = function () {
        this.location.back();
    };
    VerPerfilUsuarioComponent.prototype.getObternerCliente = function () {
        var _this = this;
        this.dataService.getObtenerCliente(this.cliente.Id)
            .subscribe(function (res) { return _this.getObternerClienteOk(res); }, function (error) { return _this.getObternerClienteError(error); }, function () { return utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getObtenerCliente: Completado"); });
    };
    VerPerfilUsuarioComponent.prototype.getObternerClienteOk = function (response) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getObternerClienteOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.cliente.NombreUsuario = response.Objetos[0].NombreUsuario;
            this.cliente.Nombre = response.Objetos[0].Nombre;
            this.cliente.Apellido = response.Objetos[0].Apellido;
            this.cliente.CorreoElectronico = response.Objetos[0].CorreoElectronico;
            this.cliente.Telefono = response.Objetos[0].Telefono;
            this.cliente.Direccion = response.Objetos[0].Direccion;
            this.cliente.Barrio.Id = response.Objetos[0].Barrio.Id;
            this.cliente.Barrio.Nombre = response.Objetos[0].Barrio.Nombre;
            this.cliente.Barrio.Departamento.Nombre = response.Objetos[0].Barrio.Departamento.Nombre;
            this.cliente.Imagen = response.Objetos[0].Imagen;
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
        this.loading = false;
    };
    VerPerfilUsuarioComponent.prototype.getObternerClienteError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getObternerClienteError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
        this.loading = false;
    };
    /*obtenerServicios(){
        this.dataService.getServicioObtenerTodos()
            .subscribe(
            res => this.getServicioObtenerTodosOk(res),
            error => this.getServicioObtenerTodosError(error),
            () => Utilidades.log("[ver-perfil-usuario.component.ts] - obtenerServicios: Completado")
        );
    }
    getServicioObtenerTodosOk(response:any){
        Utilidades.log("[ver-perfil-usuario.component.ts] - obtenerServiciosOk | response: " + JSON.stringify(response));
        if(response.Codigo ==  200){
            this.serviciosOfertas = response.Objetos;
            this.serviciosSolicitudes = response.Objetos;
            this.getComentariosOferta();
        }
        else{
            var error = new Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    }
    getServicioObtenerTodosError(responseError:any){
        Utilidades.log("[ver-perfil-usuario.component.ts] - obtenerServiciosError | responseError: " + JSON.stringify(responseError));
        var error = new Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    }*/
    VerPerfilUsuarioComponent.prototype.obetenerPromedioClienteOferta = function () {
        var _this = this;
        this.dataService.getObetenerPromedioClienteOferta(this.cliente.Id)
            .subscribe(function (res) { return _this.getObetenerPromedioClienteOfertaOk(res); }, function (error) { return _this.getObetenerPromedioClienteOfertaError(error); }, function () { return utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - obetenerPromedioClienteOferta: Completado"); });
    };
    VerPerfilUsuarioComponent.prototype.getObetenerPromedioClienteOfertaOk = function (response) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getObetenerPromedioClienteOfertaOk | response: " + JSON.stringify(response.Objetos[0]));
        if (response.Codigo == 200) {
            this.promedioCliente = response.Objetos[0];
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPerfilUsuarioComponent.prototype.getObetenerPromedioClienteOfertaError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getObetenerPromedioClienteServicioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPerfilUsuarioComponent.prototype.getComentariosOferta = function () {
        var _this = this;
        this.dataService.getComentariosOferta(this.cliente.Id)
            .subscribe(function (res) { return _this.getComentariosOfertaOk(res); }, function (error) { return _this.getComentariosOfertaError(error); }, function () { return utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getComentariosOferta: Completado"); });
    };
    VerPerfilUsuarioComponent.prototype.getComentariosOfertaOk = function (response) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getComentariosOfertaOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.comentariosPuntuacionOferta = response.Objetos;
            //this.eliminarServiciosOfertasNoUtilizados();
            //this.getComentariosSolicitud();
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPerfilUsuarioComponent.prototype.getComentariosOfertaError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getComentariosOfertaError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPerfilUsuarioComponent.prototype.getComentariosSolicitud = function () {
        var _this = this;
        this.dataService.getComentariosSolicitud(this.cliente.Id)
            .subscribe(function (res) { return _this.getComentariosSolicitudOk(res); }, function (error) { return _this.getComentariosSolicitudError(error); }, function () { return utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getComentariosSolicitud: Completado"); });
    };
    VerPerfilUsuarioComponent.prototype.getComentariosSolicitudOk = function (response) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getComentariosSolicitudOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.comentariosPuntuacionSolicitud = response.Objetos;
            //this.eliminarServiciosSolicitudesNoUtilizados();
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    VerPerfilUsuarioComponent.prototype.getComentariosSolicitudError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getComentariosSolicitudError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    /*eliminarServiciosOfertasNoUtilizados(){
        for(let s of this.serviciosOfertas){
            var enUso : boolean = false;
            for(let cO of this.comentariosPuntuacionOferta){
                if(s.Id == cO.Publicacion.Servicio.Id){
                    enUso = true;
                    break;
                }
            }
            if(!enUso){
                this.serviciosOfertas.splice(this.serviciosOfertas.indexOf(s),1);
            }
        }
    }
    eliminarServiciosSolicitudesNoUtilizados(){
        for(let s of this.serviciosSolicitudes){
            var enUso : boolean = false;
            for(let cS of this.comentariosPuntuacionSolicitud){
                if(s.Id == cS.Publicacion.Servicio.Id){
                    enUso = true;
                    break;
                }
            }
            if(!enUso){
                this.serviciosSolicitudes.splice(this.serviciosSolicitudes.indexOf(s),1);
            }
        }
    }*/
    VerPerfilUsuarioComponent.prototype.responderComentarioSolicitud = function (input) {
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
    VerPerfilUsuarioComponent.prototype.responderComentarioOferta = function (input) {
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
    VerPerfilUsuarioComponent.prototype.guardarRespuestaOferta = function (input) {
        var _this = this;
        var respuesta = document.getElementById('txtRespuestaOferta' + input);
        if (respuesta.value != null && respuesta.value != '') {
            this.comentarioPuntuacion.Id = parseInt(input);
            this.comentarioPuntuacion.Respuesta = respuesta.value;
            this.dataService.postAltaRespuestaComentario(this.comentarioPuntuacion)
                .subscribe(function (res) { return _this.postAltaRespuestaComentarioOfertaOk(res, input); }, function (error) { return _this.postAltaRespuestaComentarioOfertaError(error); }, function () { return utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - postAltaRespuestaComentario: Completado"); });
        }
        else {
            alert('Debe ingresar un comentario.');
        }
    };
    VerPerfilUsuarioComponent.prototype.postAltaRespuestaComentarioOfertaOk = function (response, idComentario) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - postAltaRespuestaComentarioOk | response: " + JSON.stringify(response.Objetos[0]));
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
    VerPerfilUsuarioComponent.prototype.postAltaRespuestaComentarioOfertaError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - postAltaRespuestaComentarioError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    VerPerfilUsuarioComponent.prototype.guardarRespuestaSolicitud = function (input) {
        var _this = this;
        var respuesta = document.getElementById('txtRespuestaSolicitud' + input);
        if (respuesta.value != null && respuesta.value != '') {
            this.comentarioPuntuacion.Id = parseInt(input);
            this.comentarioPuntuacion.Respuesta = respuesta.value;
            this.dataService.postAltaRespuestaComentario(this.comentarioPuntuacion)
                .subscribe(function (res) { return _this.postAltaRespuestaComentarioSolicitudOk(res, input); }, function (error) { return _this.postAltaRespuestaComentarioSolicitudError(error); }, function () { return utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - postAltaRespuestaComentario: Completado"); });
        }
        else {
            alert('Debe ingresar un comentario.');
        }
    };
    VerPerfilUsuarioComponent.prototype.postAltaRespuestaComentarioSolicitudOk = function (response, idComentario) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - postAltaRespuestaComentarioSolicitudOk | response: " + JSON.stringify(response.Objetos[0]));
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
    VerPerfilUsuarioComponent.prototype.postAltaRespuestaComentarioSolicitudError = function (responseError) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - postAltaRespuestaComentarioSolicitudError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    return VerPerfilUsuarioComponent;
}());
VerPerfilUsuarioComponent = __decorate([
    core_1.Component({
        selector: 'ver-perfil-usuario',
        templateUrl: 'app/dashboard/ver-perfil-usuario/ver-perfil-usuario.component.html',
        styleUrls: ['css/ver-perfil-usuario.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, router_1.ActivatedRoute, common_1.Location])
], VerPerfilUsuarioComponent);
exports.VerPerfilUsuarioComponent = VerPerfilUsuarioComponent;
//# sourceMappingURL=ver-perfil-usuario.component.js.map