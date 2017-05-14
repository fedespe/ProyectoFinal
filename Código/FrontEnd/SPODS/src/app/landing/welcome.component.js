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
var router_1 = require("@angular/router");
var ng2_translate_1 = require("ng2-translate");
var WelcomeComponent = (function () {
    function WelcomeComponent(dataService, router, translate) {
        this.dataService = dataService;
        this.router = router;
        this.translate = translate;
        localStorage.setItem('default_language', 'en');
        this.cargarLenguaje();
    }
    WelcomeComponent.prototype.cargarLenguaje = function () {
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
    WelcomeComponent.prototype.changeLang = function (lang) {
        localStorage.setItem('selected_language', lang);
        this.translate.use(localStorage.getItem('selected_language'));
    };
    WelcomeComponent.prototype.login = function () {
        this.router.navigate(['login']);
    };
    return WelcomeComponent;
}());
WelcomeComponent = __decorate([
    core_1.Component({
        selector: 'welcome',
        templateUrl: 'app/landing/welcome.component.html',
        styleUrls: ['css/welcome.css']
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, router_1.Router, ng2_translate_1.TranslateService])
], WelcomeComponent);
exports.WelcomeComponent = WelcomeComponent;
//# sourceMappingURL=welcome.component.js.map