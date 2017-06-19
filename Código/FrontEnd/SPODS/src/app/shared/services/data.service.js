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
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var settings_1 = require("../settings");
var utilidades_1 = require("../utilidades");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var DataService = (function () {
    function DataService(http, router) {
        this.http = http;
        this.router = router;
        this.headers = new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
        this.baseUrl = settings_1.Settings.baseUrl;
    }
    //*************************** */
    // SERVICIOS CLIENTE
    //*************************** */
    //Prueba llamando un método por Post y pasando algo para dar de alta en el Body (Da de alta un carro)
    DataService.prototype.postRegistrarCliente = function (cliente) {
        var URL = this.baseUrl + '/api/Cliente/altaCliente';
        var body = JSON.stringify(cliente);
        utilidades_1.Utilidades.log("[data.service.ts] - postRegistroCliente | URL: " + URL);
        utilidades_1.Utilidades.log("[data.service.ts] - postRegistroCliente | body: " + JSON.stringify(body));
        utilidades_1.Utilidades.log("[data.service.ts] - postRegistroCliente | headers: " + JSON.stringify({ headers: this.headers }));
        return this.http.post(URL, body, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postIngresarCliente = function (cliente) {
        var URL = this.baseUrl + '/api/Cliente/ingresarCliente';
        var body = JSON.stringify(cliente);
        utilidades_1.Utilidades.log("[data.service.ts] - postRegistroCliente | URL: " + URL);
        utilidades_1.Utilidades.log("[data.service.ts] - postRegistroCliente | body: " + JSON.stringify(body));
        utilidades_1.Utilidades.log("[data.service.ts] - postRegistroCliente | headers: " + JSON.stringify({ headers: this.headers }));
        return this.http.post(URL, body, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.putActualizarCliente = function (cliente) {
        var URL = this.baseUrl + '/api/Cliente/actualizarCliente';
        var body = JSON.stringify(cliente);
        utilidades_1.Utilidades.log("[data.service.ts] - putActualizarCliente | URL: " + URL);
        utilidades_1.Utilidades.log("[data.service.ts] - putActualizarCliente | body: " + body);
        utilidades_1.Utilidades.log("[data.service.ts] - putActualizarCliente | headers: " + JSON.stringify({ headers: this.headers }));
        return this.http.put(URL, body, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.getObtenerCliente = function (id) {
        var URL = this.baseUrl + '/api/Cliente/obtener/' + id;
        utilidades_1.Utilidades.log("[data.service.ts] - getCarroObtenerPorId | URL: " + URL);
        utilidades_1.Utilidades.log("[data.service.ts] - getCarroObtenerPorId | headers: " + JSON.stringify({ headers: this.headers }));
        return this.http.get(URL, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.putActualizarContrasena = function (actualizarContrasena) {
        var URL = this.baseUrl + '/api/Cliente/actualizarContrasena';
        var body = JSON.stringify(actualizarContrasena);
        utilidades_1.Utilidades.log("[data.service.ts] - putActualizarContrasena | URL: " + URL);
        utilidades_1.Utilidades.log("[data.service.ts] - putActualizarContrasena | body: " + body);
        utilidades_1.Utilidades.log("[data.service.ts] - putActualizarContrasena | headers: " + JSON.stringify({ headers: this.headers }));
        return this.http.put(URL, body, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //*************************** */
    // FIN SERVICIOS CLIENTE
    //*************************** */
    //*************************** */
    // SERVICIOS BARRIO
    //*************************** */
    DataService.prototype.getBarrioObtenerTodos = function () {
        var URL = this.baseUrl + '/api/Barrio/obtenerTodos';
        utilidades_1.Utilidades.log("[data.service.ts] - getCarroObtenerTodos | URL: " + URL);
        utilidades_1.Utilidades.log("[data.service.ts] - getCarroObtenerTodos | headers: " + JSON.stringify({ headers: this.headers }));
        return this.http.get(URL, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //*************************** */
    // FIN SERVICIOS BARRIO
    //*************************** */
    //*************************** */
    // SERVICIOS SERVICIO
    //*************************** */
    DataService.prototype.getServicioObtenerTodos = function () {
        var URL = this.baseUrl + '/api/Servicio/obtenerTodosHabilitados';
        utilidades_1.Utilidades.log("[data.service.ts] - getServicioObtenerTodos | URL: " + URL);
        utilidades_1.Utilidades.log("[data.service.ts] - getServicioObtenerTodos | headers: " + JSON.stringify({ headers: this.headers }));
        return this.http.get(URL, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //*************************** */
    // FIN SERVICIOS SERVICIO
    //*************************** */
    //*************************** */
    //PRUEBA SERVICIOS
    //*************************** */
    //Prueba llamando un método por Get sin parámetros (Obtiene todos los carros)
    //Retorna una colección de Carro
    DataService.prototype.getCarroObtenerTodos = function () {
        var URL = this.baseUrl + '/api/Carro/obtenerTodos';
        utilidades_1.Utilidades.log("[data.service.ts] - getCarroObtenerTodos | URL: " + URL);
        utilidades_1.Utilidades.log("[data.service.ts] - getCarroObtenerTodos | headers: " + JSON.stringify({ headers: this.headers }));
        return this.http.get(URL, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //Prueba llamando un método por Get con parámetro (Obtiene el carro con el id que se pasa)
    //Retorna un Carro
    DataService.prototype.getCarroObtenerPorId = function (id) {
        var URL = this.baseUrl + '/api/Carro/obtener/' + id;
        utilidades_1.Utilidades.log("[data.service.ts] - getCarroObtenerPorId | URL: " + URL);
        utilidades_1.Utilidades.log("[data.service.ts] - getCarroObtenerPorId | headers: " + JSON.stringify({ headers: this.headers }));
        return this.http.get(URL, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //Prueba llamando un método por Post y pasando algo para dar de alta en el Body (Da de alta el carro que se pasa)
    //Retorna una colección de Carro
    DataService.prototype.postCarroAlta = function (carro) {
        var URL = this.baseUrl + '/api/Carro/altaCarro';
        var body = JSON.stringify(carro);
        utilidades_1.Utilidades.log("[data.service.ts] - postCarroAlta | URL: " + URL);
        utilidades_1.Utilidades.log("[data.service.ts] - postCarroAlta | body: " + body);
        utilidades_1.Utilidades.log("[data.service.ts] - postCarroAlta | headers: " + JSON.stringify({ headers: this.headers }));
        return this.http.post(URL, body, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //Prueba llamando un método por Put y pasando algo para modificar en el Body (Modifica el carro que se pasa buscándolo por el Id)
    //Retorna una colección de Carro
    DataService.prototype.putCarroActualizar = function (carro) {
        var URL = this.baseUrl + '/api/Carro/actualizarCarro';
        var body = JSON.stringify(carro);
        utilidades_1.Utilidades.log("[data.service.ts] - putCarroActualizar | URL: " + URL);
        utilidades_1.Utilidades.log("[data.service.ts] - putCarroActualizar | body: " + body);
        utilidades_1.Utilidades.log("[data.service.ts] - putCarroActualizar | headers: " + JSON.stringify({ headers: this.headers }));
        return this.http.put(URL, body, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //Prueba llamando un método por Delete y pasando algo para eliminar en el Body (Elimina el carro que se pasa buscándolo por el Id)
    //Retorna una colección de Carro
    DataService.prototype.deleteCarroEliminar = function (carro) {
        var URL = this.baseUrl + '/api/Carro/eliminarCarro';
        var body = JSON.stringify(carro);
        utilidades_1.Utilidades.log("[data.service.ts] - deleteCarroEliminar | URL: " + URL);
        utilidades_1.Utilidades.log("[data.service.ts] - deleteCarroEliminar | body: " + body);
        utilidades_1.Utilidades.log("[data.service.ts] - deleteCarroEliminar | headers: " + JSON.stringify({ headers: this.headers }));
        return this.http.delete(URL, { body: body, headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //*************************** */
    //PRUEBA SERVICIOS
    //*************************** */
    //Función para lanzar excepciones que pueden surgir en las llamadas a los servicios
    DataService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().error || " server error");
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map