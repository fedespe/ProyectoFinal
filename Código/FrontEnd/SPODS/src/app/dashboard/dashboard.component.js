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
var ng2_translate_1 = require("ng2-translate");
var router_1 = require("@angular/router");
var DashboardComponent = (function () {
    function DashboardComponent(dataService, router, translate) {
        this.dataService = dataService;
        this.router = router;
        this.translate = translate;
        this.cargarLenguaje();
        this.tipoUsuario = localStorage.getItem('user_type');
        if (this.tipoUsuario == null)
            this.tipoUsuario = "";
    }
    DashboardComponent.prototype.cargarLenguaje = function () {
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
    DashboardComponent.prototype.exit = function () {
        localStorage.setItem('access_token', '');
        localStorage.removeItem('user_type');
        this.dataService.ini();
        this.router.navigateByUrl('');
    };
    DashboardComponent.prototype.gotoProfile = function () {
        if (this.tipoUsuario == "CLIENTE") {
            this.router.navigateByUrl('/dashboard/my-profile-client');
        }
        // else if(this.tipoUsuario=="RENDERISTA"){
        //     this.router.navigateByUrl('/dashboard/my-profile-client-renderista');
        // }
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'dashboard',
        templateUrl: 'app/dashboard/dashboard.component.html',
        styleUrls: ['css/dashboard.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, ng2_translate_1.TranslateService])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map