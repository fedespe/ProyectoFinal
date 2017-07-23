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
var VerPerfilUsuarioComponent = (function () {
    function VerPerfilUsuarioComponent(dataService, router, route) {
        this.dataService = dataService;
        this.router = router;
        this.route = route;
        this.mensajes = new mensaje_1.Mensaje();
        this.cliente = new cliente_1.Cliente();
        this.loading = true;
    }
    VerPerfilUsuarioComponent.prototype.ngOnInit = function () {
        var _this = this;
        // subscripción al observable params
        this.borrarMensajes();
        this.route.params
            .subscribe(function (params) {
            _this.cliente.Id = parseInt(params['id']);
            utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - ngOnInit | id: " + JSON.stringify(_this.cliente.Id));
        });
        this.getObternerCliente();
    };
    VerPerfilUsuarioComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    VerPerfilUsuarioComponent.prototype.getObternerCliente = function () {
        var _this = this;
        this.dataService.getObtenerCliente(this.cliente.Id)
            .subscribe(function (res) { return _this.getObternerClienteOk(res); }, function (error) { return _this.getObternerClienteError(error); }, function () { return utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getObtenerCliente: Completado"); });
    };
    VerPerfilUsuarioComponent.prototype.getObternerClienteOk = function (response) {
        utilidades_1.Utilidades.log("[ver-perfil-usuario.component.ts] - getObternerClienteOk | response: " + JSON.stringify(response));
        if (response.Codigo == 200) {
            this.cliente.Nombre = response.Objetos[0].Nombre;
            this.cliente.Apellido = response.Objetos[0].Apellido;
            this.cliente.Telefono = response.Objetos[0].Telefono;
            this.cliente.Direccion = response.Objetos[0].Direccion;
            this.cliente.Barrio.Id = response.Objetos[0].Barrio.Id;
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
    return VerPerfilUsuarioComponent;
}());
VerPerfilUsuarioComponent = __decorate([
    core_1.Component({
        selector: 'ver-perfil-usuario',
        templateUrl: 'app/dashboard/ver-perfil-usuario/ver-perfil-usuario.component.html',
        styleUrls: ['css/ver-perfil-usuario.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, router_1.ActivatedRoute])
], VerPerfilUsuarioComponent);
exports.VerPerfilUsuarioComponent = VerPerfilUsuarioComponent;
//# sourceMappingURL=ver-perfil-usuario.component.js.map