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
var data_service_1 = require("../shared/services/data.service");
var utilidades_1 = require("../shared/utilidades");
var router_1 = require("@angular/router");
var DashboardComponent = (function () {
    function DashboardComponent(dataService, router) {
        this.dataService = dataService;
        this.router = router;
        utilidades_1.Utilidades.log("[dashboard.component.ts] - constructor | localStorage.getItem('nombre-usuario'): " + localStorage.getItem('nombre-usuario'));
        utilidades_1.Utilidades.log("[dashboard.component.ts] - constructor | localStorage.getItem('id-usuario'): " + localStorage.getItem('id-usuario'));
        this.nombreUsuario = localStorage.getItem('nombre-usuario');
        this.idUsuario = parseInt(localStorage.getItem('id-usuario'));
    }
    DashboardComponent.prototype.cerrarSesion = function () {
        localStorage.clear();
        this.dataService.ini();
        this.router.navigate(['/']);
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard',
        templateUrl: 'app/dashboard/dashboard.component.html',
        styleUrls: ['css/dashboard.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map