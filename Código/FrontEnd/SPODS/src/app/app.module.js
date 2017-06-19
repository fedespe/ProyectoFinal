"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var welcome_component_1 = require("./landing/welcome.component");
var registro_cliente_component_1 = require("./registro-cliente/registro-cliente.component");
var inicio_sesion_component_1 = require("./inicio-sesion/inicio-sesion.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var overview_component_1 = require("./dashboard/overview/overview.component");
var perfil_usuario_component_1 = require("./dashboard/perfil-usuario/perfil-usuario.component");
var cambiar_contrasena_usuario_component_1 = require("./dashboard/cambiar-contrasena-usuario/cambiar-contrasena-usuario.component");
var listado_servicios_component_1 = require("./dashboard/listado-servicios/listado-servicios.component");
var appRoutes = [
    { path: '', component: welcome_component_1.WelcomeComponent,
        children: [
            { path: 'registro-cliente', component: registro_cliente_component_1.RegistroClienteComponent },
            { path: 'inicio-sesion', component: inicio_sesion_component_1.InicioSesionComponent }
        ]
    },
    // { path: '', component: WelcomeComponent },
    // { path: 'registro-cliente', component: RegistroClienteComponent },
    // { path: 'inicio-sesion', component: InicioSesionComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent,
        children: [
            { path: 'overview', component: overview_component_1.OverviewComponent },
            { path: 'perfil-usuario', component: perfil_usuario_component_1.PerfilUsuarioComponent },
            { path: 'cambiar-contrasena-usuario', component: cambiar_contrasena_usuario_component_1.CambiarContrasenaUsuarioComponent },
            { path: 'listado-servicios', component: listado_servicios_component_1.ListadoServiciosComponent }
        ]
    },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, router_1.RouterModule, router_1.RouterModule.forRoot(appRoutes), forms_1.ReactiveFormsModule
        ],
        declarations: [
            app_component_1.AppComponent, welcome_component_1.WelcomeComponent, registro_cliente_component_1.RegistroClienteComponent,
            inicio_sesion_component_1.InicioSesionComponent, dashboard_component_1.DashboardComponent, overview_component_1.OverviewComponent,
            perfil_usuario_component_1.PerfilUsuarioComponent, cambiar_contrasena_usuario_component_1.CambiarContrasenaUsuarioComponent,
            listado_servicios_component_1.ListadoServiciosComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map