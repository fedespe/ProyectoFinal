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
var data_service_1 = require("../../shared/services/data.service");
var ng2_translate_1 = require("ng2-translate");
var renderista_1 = require("../../shared/renderista");
var MyProfileClientComponent = (function () {
    function MyProfileClientComponent(dataService, translate) {
        this.dataService = dataService;
        this.translate = translate;
        this.editar = true;
        this.errores = [];
        this.cliente = null;
        this.usuario = null;
        this.renderista = new renderista_1.Renderista("", "");
        this.paises = [];
        this.message = "";
        this.errores = [];
        this.cargarLenguaje();
        this.cargarCliente();
        this.paises = [];
        this.cargarPaises();
    }
    MyProfileClientComponent.prototype.cargarLenguaje = function () {
        this.translate.addLangs(['en', 'es']);
        if (localStorage.getItem('default_language') != null) {
            this.translate.setDefaultLang(localStorage.getItem('default_language'));
        }
        else {
            this.translate.setDefaultLang('en');
        }
        if (localStorage.getItem('selected_language') != null) {
            this.translate.use(localStorage.getItem('selected_language'));
        }
        else {
            this.translate.use(this.translate.getDefaultLang());
        }
    };
    MyProfileClientComponent.prototype.cargarPaises = function () {
        var _this = this;
        console.log("[my-profile-client.component.ts] - cargarPaises");
        this.dataService.postPais()
            .subscribe(function (res) { return _this.parsePaisOk(res); }, function (error) { return _this.parsePaisError(error); }, function () { return console.log("[my-profile-client.component.ts]- cargarPaises: Completed"); });
    };
    MyProfileClientComponent.prototype.parsePaisOk = function (response) {
        console.log("[my-profile-client.component.ts] - parsePaisOk | response: " + JSON.stringify(response));
        this.message = "";
        this.errores = response.Errors;
        if (response.ErrorCode == 200) {
            this.paises = response.SDTPaisCollection;
            console.log(JSON.stringify(this.paises));
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    MyProfileClientComponent.prototype.parsePaisError = function (error) {
        console.log("There was an error loading the counties.");
        console.log("[my-profile-client.component.ts] - parsePaisError: " + JSON.stringify(error));
    };
    MyProfileClientComponent.prototype.editClient = function () {
        this.editar = false;
    };
    MyProfileClientComponent.prototype.postUserEditOk = function (response) {
        console.log("[my-profile-client.component.ts] - postUserEditOk | response : " + JSON.stringify(response));
        this.errores = response.Errors;
        if (response.ErrorCode == 200) {
            this.cancelEdit();
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    MyProfileClientComponent.prototype.postUserEditError = function (error) {
        console.log("[my-profile-client.component.ts] - postUserEditError| error:" + JSON.stringify(error));
        this.message += "An error occurred while modyfied client.";
    };
    MyProfileClientComponent.prototype.saveClient = function () {
        var _this = this;
        this.dataService.postUserEdit(this.usuario, this.cliente, this.renderista)
            .subscribe(function (res) { return _this.postUserEditOk(res); }, function (error) { return _this.postUserEditError(error); }, function () { return console.log("[my-profile-client.component.ts] - postUserEdit: Completed"); });
    };
    MyProfileClientComponent.prototype.cancelEdit = function () {
        this.cargarCliente();
        this.editar = true;
    };
    MyProfileClientComponent.prototype.cargarCliente = function () {
        var _this = this;
        this.dataService.postUsuario()
            .subscribe(function (res) { return _this.parseUsuarioOk(res); }, function (error) { return _this.parseUsuarioError(error); }, function () { return console.log("[my-profile-client.component.ts] - cargarCliente: Completed"); });
    };
    MyProfileClientComponent.prototype.parseUsuarioOk = function (response) {
        console.log("[my-profile-client.component.ts] - parseUsuarioOk");
        this.message = "";
        this.errores = response.Errors;
        if (response.ErrorCode == 200) {
            this.cliente = response.SDTCliente;
            this.usuario = response.SDTUsuario;
        }
        else {
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    };
    MyProfileClientComponent.prototype.parseUsuarioError = function (error) {
        console.log("[my-profile-client.component.ts] - parseUsuarioError | error: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    };
    return MyProfileClientComponent;
}());
MyProfileClientComponent = __decorate([
    core_1.Component({
        selector: 'my-profile-client',
        templateUrl: 'app/dashboard/my-profile-client/my-profile-client.component.html',
        styleUrls: ['css/my-profile.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, ng2_translate_1.TranslateService])
], MyProfileClientComponent);
exports.MyProfileClientComponent = MyProfileClientComponent;
//# sourceMappingURL=my-profile-client.component.js.map