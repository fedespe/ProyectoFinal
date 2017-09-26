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
var mensaje_1 = require("../../shared/mensaje");
var ManualUsuarioComponent = (function () {
    function ManualUsuarioComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        this.mensajes = new mensaje_1.Mensaje();
        this.loading = false;
    }
    ManualUsuarioComponent.prototype.borrarMensajes = function () {
        this.mensajes.Errores = [];
        this.mensajes.Exitos = [];
    };
    return ManualUsuarioComponent;
}());
ManualUsuarioComponent = __decorate([
    core_1.Component({
        selector: 'manual-usuario',
        templateUrl: 'app/landing/manual-usuario/manual-usuario.component.html',
        styleUrls: ['css/manual-usuario.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router])
], ManualUsuarioComponent);
exports.ManualUsuarioComponent = ManualUsuarioComponent;
//# sourceMappingURL=manual-usuario.component.js.map