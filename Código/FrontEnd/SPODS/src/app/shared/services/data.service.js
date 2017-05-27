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
    DataService.prototype.postRegistroCliente = function (cliente) {
        var URL = this.baseUrl + '/api/carro/PostAltaCarro';
        var body = { "IdCarro": 1, "Marca": "Ferrari", "Modelo": 2012 };
        utilidades_1.Utilidades.log("[data.service.ts] - postRegistroCliente | URL: " + URL);
        utilidades_1.Utilidades.log("[data.service.ts] - postRegistroCliente | body: " + JSON.stringify(body));
        utilidades_1.Utilidades.log("[data.service.ts] - postRegistroCliente | headers: " + JSON.stringify({ headers: this.headers }));
        return this.http.post(URL, body, { headers: this.headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
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