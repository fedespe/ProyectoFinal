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
var servicio_1 = require("../../shared/servicio");
var publicacion_1 = require("../../shared/publicacion");
var router_2 = require("@angular/router");
var EditarServicioClienteComponent = (function () {
    function EditarServicioClienteComponent(dataService, router, route) {
        // this.publicacion.Cliente.Id=parseInt(localStorage.getItem('id-usuario'));
        // this.publicacion.Cliente.NombreUsuario=localStorage.getItem('nombre-usuario');
        // this.publicacion.Activa=true;
        // this.publicacion.Tipo="OFERTA";
        this.dataService = dataService;
        this.router = router;
        this.route = route;
        this.mensajes = new mensaje_1.Mensaje();
        this.servicios = [];
        this.publicacion = new publicacion_1.Publicacion();
        this.servicioSeleccionado = new servicio_1.Servicio();
        this.respuestas = [];
        // //Solo prueba
        // this.publicacion.Imagenes.push("PUBLICACIONPRUEBAANGULAR_IMG1.jpg");
        // this.publicacion.Imagenes.push("PUBLICACIONPRUEBAANGULAR_IMG2.jpg");
        // this.publicacion.Imagenes.push("PUBLICACIONPRUEBAANGULAR_IMG3.jpg");
    }
    EditarServicioClienteComponent.prototype.ngOnInit = function () {
        var _this = this;
        // subscripción al observable params
        this.route.params
            .subscribe(function (params) {
            _this.idPublicacion = parseInt(params['id']);
            utilidades_1.Utilidades.log("[[ofrecer-servicio.component.ts] - ngOnInit | id: " + JSON.stringify(_this.idPublicacion));
        });
        this.obtenerPublicacion();
    };
    EditarServicioClienteComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    EditarServicioClienteComponent.prototype.obtenerPublicacion = function () {
        var _this = this;
        utilidades_1.Utilidades.log("[[ofrecer-servicio.component.ts] - obtenerPublicacion | id: " + JSON.stringify(this.idPublicacion));
        this.dataService.getPublicacion(this.idPublicacion)
            .subscribe(function (res) { return _this.getPublicacionOk(res); }, function (error) { return _this.getPublicacionError(error); }, function () { return utilidades_1.Utilidades.log("[ofrecer-servicio.component.ts] - obtenerServicios: Completado"); });
    };
    EditarServicioClienteComponent.prototype.getPublicacionOk = function (response) {
        utilidades_1.Utilidades.log("[[ofrecer-servicio.component.ts] - obtenerServiciosOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.publicacion = response.Objetos[0];
        }
        else {
            var error = new error_1.Error();
            error.Descripcion = response.Mensaje;
            this.mensajes.Errores.push(error);
        }
    };
    EditarServicioClienteComponent.prototype.getPublicacionError = function (responseError) {
        utilidades_1.Utilidades.log("[ofrecer-servicio.component.ts] - obtenerServiciosError | responseError: " + JSON.stringify(responseError));
        var error = new error_1.Error();
        error.Descripcion = "Ha ocurrido un error inesperado. Contacte al administrador.";
        this.mensajes.Errores.push(error);
    };
    return EditarServicioClienteComponent;
}());
EditarServicioClienteComponent = __decorate([
    core_1.Component({
        selector: 'editar-servicio-cliente',
        templateUrl: 'app/dashboard/editar-servicio-cliente/editar-servicio-cliente.component.html',
        styleUrls: ['css/editar-servicio-cliente.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, router_2.ActivatedRoute])
], EditarServicioClienteComponent);
exports.EditarServicioClienteComponent = EditarServicioClienteComponent;
//# sourceMappingURL=editar-servicio-cliente.component.js.map