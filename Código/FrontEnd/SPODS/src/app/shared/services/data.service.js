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
var cliente_1 = require("../cliente");
var DataService = (function () {
    function DataService(http, router) {
        this.http = http;
        this.router = router;
        this.projects = [];
        this.contentHeadersUrlEncoded = new http_1.Headers({ 'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' });
        this.baseUrl = settings_1.Settings.baseUrl;
        this.projectsEvent = new core_1.EventEmitter();
        this.projects = [];
        this.ini();
    }
    DataService.prototype.ini = function () {
        this.contentHeadersJson = new http_1.Headers({ 'Authorization': 'OAuth ' + localStorage.getItem('access_token'), 'Content-Type': 'application/json' });
    };
    //Servicios del BackEnd
    DataService.prototype.postAccessToken = function (username, password) {
        console.log("[data.service.ts] - postAccessToken: " + username + " / " + password);
        var body = "client_id=8b56c11c15734bd780d4adc6dc5c6b04&client_secret=41dca83e9e204d7eb91bc31cb408c1c5&grant_type=local&username=" + username + "&password=" + password + "&scope=FullControl";
        return this.http.post(this.baseUrl + '/oauth/access_token', body, { headers: this.contentHeadersUrlEncoded })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postForgotPassword = function (email) {
        console.log("[data.service.ts] - post:  / " + email);
        var body = '{"Email": ' + JSON.stringify(email) + '}';
        console.log(body);
        return this.http.post(this.baseUrl + '/rest/SendNewPassword', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postUserEdit = function (usuario, cliente, renderista) {
        console.log("[data.service.ts] - postUserEdit");
        console.log('{"SDTUsuario": ' + JSON.stringify(usuario) + ',"SDTCliente": ' + JSON.stringify(cliente) + ',"SDTRenderista": ' + JSON.stringify(renderista) + ', "TransactionMode": "Update"}');
        var body = '{"SDTUsuario": ' + JSON.stringify(usuario) + ',"SDTCliente": ' + JSON.stringify(cliente) + ',"SDTRenderista": ' + JSON.stringify(renderista) + ', "TransactionMode": "Update"}';
        return this.http.post(this.baseUrl + '/rest/UpdateDeleteUsuario', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postRendererRegister = function (usuario, renderista) {
        console.log("[data.service.ts] - postRendererRegister");
        var cliente = new cliente_1.Cliente();
        var body = '{"SDTUsuario": ' + JSON.stringify(usuario) + ',"SDTRenderista": ' + JSON.stringify(renderista) + ',"SDTCliente": ' + JSON.stringify(cliente) + '}';
        return this.http.post(this.baseUrl + '/rest/CreateUsuario', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postProjectRegister = function (project) {
        console.log("[data.service.ts] - postProjetRegister project: " + JSON.stringify(project));
        var body = '{"SDTProyecto": ' + JSON.stringify(project) + ',  "TransactionMode": "Insert"}';
        return this.http.post(this.baseUrl + '/rest/ABMProyecto', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postProjectEdit = function (project) {
        console.log("[data.service.ts] - postProjetEdit");
        var body = '{"SDTProyecto": ' + JSON.stringify(project) + ',  "TransactionMode": "Update"}';
        return this.http.post(this.baseUrl + '/rest/ABMProyecto', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postProjectDelete = function (project) {
        console.log("[data.service.ts] - postProjetDelete");
        var body = '{"SDTProyecto": ' + JSON.stringify(project) + ',  "TransactionMode": "Delete"}';
        return this.http.post(this.baseUrl + '/rest/ABMProyecto', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postFilesProjectRegister = function (files) {
        console.log("[data.service.ts] - postFilesProjectRegister");
        var body = '{"Archivos":' + JSON.stringify(files) + ', "TransactionMode": "Insert"}';
        return this.http.post(this.baseUrl + '/rest/ABMArchivo', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postRendersProjectRegister = function (renders) {
        console.log("[data.service.ts] - postRendersProjectRegister");
        var body = '{"Renders":' + JSON.stringify(renders) + ', "TransactionMode": "Insert"}';
        return this.http.post(this.baseUrl + '/rest/ABMRender', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postRendersEdit = function (renders) {
        console.log("[data.service.ts] - postRendersEdit");
        var body = '{"Renders":' + JSON.stringify(renders) + ', "TransactionMode": "Update"}';
        return this.http.post(this.baseUrl + '/rest/ABMRender', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postRenderVersionsEdit = function (render) {
        console.log("[data.service.ts] - postRenderVersionsEdit");
        var body = '{"SDTRender":' + JSON.stringify(render) + ', "TransactionMode": "Update"}';
        return this.http.post(this.baseUrl + '/rest/ABMRenderVersion', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postRenderVersionsCreate = function (render) {
        console.log("[data.service.ts] - postRenderVersionsCreate");
        var body = '{"SDTRender":' + JSON.stringify(render) + ', "TransactionMode": "Insert"}';
        return this.http.post(this.baseUrl + '/rest/ABMRenderVersion', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postTipoRender = function () {
        console.log("[data.service.ts] - postTiposRender");
        var body = '';
        return this.http.post(this.baseUrl + '/rest/GetTipoRender', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postMyProjects = function () {
        console.log("[data.service.ts] - postMyProjects");
        var body = '';
        return this.http.post(this.baseUrl + '/rest/GetMisProyectos', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postProjectDetail = function (ProyectoId) {
        console.log("[data.service.ts] - postProjectDetail");
        var body = '{"ProyectoId": ' + ProyectoId + '}';
        return this.http.post(this.baseUrl + '/rest/GetProyecto', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postPais = function () {
        console.log("[data.service.ts] - postPais");
        var body = '';
        return this.http.post(this.baseUrl + '/rest/GetPais', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.postUsuario = function () {
        console.log("[data.service.ts] - postUsuario");
        var body = '';
        return this.http.post(this.baseUrl + '/rest/GetUsuario', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    //Servicio del FrontEnd -de muestra-
    DataService.prototype.postProjects = function (textoBusqueda, imageSize) {
        var _this = this;
        console.log("[data.service.ts] - postProjects: " + textoBusqueda + " / " + imageSize);
        var body = '{"TextoBusqueda":"' + textoBusqueda + '","ImageSize":"' + imageSize + '"}';
        this.http.post(this.baseUrl + 'rest/GetProjects', body, { headers: this.contentHeadersJson })
            .map(function (res) { return res.json(); })
            .catch(this.handleError)
            .subscribe(function (res) { return _this.parseProjectsOk(res); }, function (error) { return _this.parseProjectsError(error); }, function () { return console.log("[data.service.ts] - postProjects: Completed"); });
    };
    DataService.prototype.parseProjectsOk = function (res) {
        console.log("[data.service.ts] - parseProjectsOk | Cantidad: " + res.projects.Items.length);
        this.projects = res.TracksMediaQueue.Items;
        this.projectsEvent.emit(this.projects);
    };
    DataService.prototype.parseProjectsError = function (error) {
        console.log("[data.service.ts] - parseProjectsError | Error: " + JSON.stringify(error));
        if (error.code == 112) {
            console.log("[data.service.ts] - parseProjectsError | Token expirado redirect");
            this.router.navigate(['/login']);
        }
        else {
            console.log("[data.service.ts] - parseProjectsError | Otro error");
        }
    };
    //2017-05-14
    DataService.prototype.postRegistroCliente = function (cliente) {
        console.log("[data.service.ts] - postRegistroCliente");
        var body = '{"dtoCliente": ' + JSON.stringify(cliente) + '}';
        //Ver el baseURL
        //Ver los Headers
        return this.http.post(this.baseUrl + '/altaCliente', body, { headers: this.contentHeadersJson })
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