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
/**
 * Created by Bruno on 10/04/2017.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var data_service_1 = require("../shared/services/data.service");
var mensaje_1 = require("../shared/mensaje");
var cliente_1 = require("../shared/cliente");
var RegistroClienteComponent = (function () {
    function RegistroClienteComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.mensajes = new mensaje_1.Mensaje();
        this.cliente = new cliente_1.Cliente();
    }
    RegistroClienteComponent.prototype.registrarCliente = function () {
        console.log("[registro-cliente.component.ts] - registrarCliente | cliente: " + JSON.stringify(this.cliente));
        this.mensajes.Errores = this.cliente.validarDatos();
        // this.dataService.postRegistroCliente(this.cliente)
        //         .subscribe(
        //         res => this.postRegistroClienteOk(res),
        //         error => this.postRegistroClienteError(error),
        //         () => console.log("[registro-cliente.component.ts] - registrarCliente: Completed")
        //     );
    };
    RegistroClienteComponent.prototype.postRegistroClienteOk = function (response) {
        console.log("[registro-cliente.component.ts] - postRegistroClienteOk | response: " + JSON.stringify(response));
        this.mensajes.Errores = response.Errores;
        if (response.CodigoError == 200) {
            this.iniciarSesion();
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    RegistroClienteComponent.prototype.postRegistroClienteError = function (error) {
        console.log("[registro-cliente.component.ts] - postRegistroClienteError: " + JSON.stringify(error));
        //miError : Error = new Error();
        //miError.Descripcion = "Ha ocurrido un error!!!";
        //this.errores.push(miError);
    };
    RegistroClienteComponent.prototype.iniciarSesion = function () {
        //Llamar al Servicio que inicia sesión
    };
    RegistroClienteComponent.prototype.parseIniciarSesionOk = function (oauth) {
        // console.log("[client-register.component.ts] - parseIniciarSesionOk: " + oauth.access_token);
        // localStorage.setItem('access_token', oauth.access_token);
        // this.dataService.ini();
        // this.cargarTipoUsuario();
    };
    RegistroClienteComponent.prototype.parseIniciarSesionError = function (error) {
        // console.log("[client-register.component.ts] - parseIniciarSesionError: " + JSON.stringify(error));
    };
    return RegistroClienteComponent;
}());
RegistroClienteComponent = __decorate([
    core_1.Component({
        selector: 'registro-cliente',
        templateUrl: 'app/registro-cliente/registro-cliente.component.html',
        styleUrls: ['css/registro-cliente.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router])
], RegistroClienteComponent);
exports.RegistroClienteComponent = RegistroClienteComponent;
//# sourceMappingURL=registro-cliente.component.js.map