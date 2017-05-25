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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var DataService = (function () {
    function DataService(http, router) {
        this.http = http;
        this.router = router;
        this.contentHeadersUrlEncoded = new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' });
        this.baseUrl = settings_1.Settings.baseUrl;
        //this.ini();
    }
    DataService.prototype.ini = function () {
        this.contentHeadersJson = new http_1.Headers({ 'Authorization': 'OAuth ' + localStorage.getItem('access_token'), 'Content-Type': 'application/json' });
    };
    //2017-05-14
    DataService.prototype.postRegistroCliente = function (cliente) {
        console.log("[data.service.ts] - postRegistroCliente | cliente: " + JSON.stringify(cliente));
        var body = '{"idCarro":1,"marca":"Ferrari","modelo":2012}';
        console.log("[data.service.ts] - postRegistroCliente | URL: " + this.baseUrl + '/api/carro');
        console.log("[data.service.ts] - postRegistroCliente | body: " + body);
        return this.http.post(this.baseUrl + '/api/carro', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
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