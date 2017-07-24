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
var not_found_component_1 = require("./not-found/not-found.component");
var landing_component_1 = require("./landing/landing.component");
var welcome_component_1 = require("./landing/welcome/welcome.component");
var registro_cliente_component_1 = require("./landing/registro-cliente/registro-cliente.component");
var inicio_sesion_component_1 = require("./landing/inicio-sesion/inicio-sesion.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var overview_component_1 = require("./dashboard/overview/overview.component");
var perfil_usuario_component_1 = require("./dashboard/perfil-usuario/perfil-usuario.component");
var cambiar_contrasena_usuario_component_1 = require("./dashboard/cambiar-contrasena-usuario/cambiar-contrasena-usuario.component");
var listado_servicios_component_1 = require("./dashboard/listado-servicios/listado-servicios.component");
var ofrecer_servicio_component_1 = require("./dashboard/ofrecer-servicio/ofrecer-servicio.component");
var listado_servicios_cliente_component_1 = require("./dashboard/listado-servicios-cliente/listado-servicios-cliente.component");
var editar_servicio_cliente_component_1 = require("./dashboard/editar-servicio-cliente/editar-servicio-cliente.component");
var listado_servicios_ofrecidos_component_1 = require("./dashboard/listado-servicios-ofrecidos/listado-servicios-ofrecidos.component");
var ver_publicacion_ofrecida_component_1 = require("./dashboard/ver-publicacion-ofrecida/ver-publicacion-ofrecida.component");
var ver_perfil_usuario_component_1 = require("./dashboard/ver-perfil-usuario/ver-perfil-usuario.component");
var listado_publicaciones_contratadas_component_1 = require("./dashboard/listado-publicaciones-contratadas/listado-publicaciones-contratadas.component");
var appRoutes = [
    { path: '', component: landing_component_1.LandingComponent,
        children: [
            { path: '', component: welcome_component_1.WelcomeComponent },
            { path: 'welcome', component: welcome_component_1.WelcomeComponent },
            { path: 'registro-cliente', component: registro_cliente_component_1.RegistroClienteComponent },
            { path: 'inicio-sesion', component: inicio_sesion_component_1.InicioSesionComponent }
        ]
    },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent,
        children: [
            { path: 'overview', component: overview_component_1.OverviewComponent },
            { path: 'perfil-usuario', component: perfil_usuario_component_1.PerfilUsuarioComponent },
            { path: 'cambiar-contrasena-usuario', component: cambiar_contrasena_usuario_component_1.CambiarContrasenaUsuarioComponent },
            { path: 'listado-servicios', component: listado_servicios_component_1.ListadoServiciosComponent },
            { path: 'ofrecer-servicio', component: ofrecer_servicio_component_1.OfrecerServicioComponent },
            { path: 'listado-servicios-cliente', component: listado_servicios_cliente_component_1.ListadoServiciosClienteComponent },
            { path: 'editar-servicio-cliente/:id', component: editar_servicio_cliente_component_1.EditarServicioClienteComponent },
            { path: 'listado-servicios-ofrecidos/:id', component: listado_servicios_ofrecidos_component_1.ListadoServiciosOfrecidosComponent },
            { path: 'ver-publicacion-ofrecida/:id/:idContacto', component: ver_publicacion_ofrecida_component_1.VerPublicacionOfrecidaComponent },
            { path: 'ver-perfil-usuario/:id', component: ver_perfil_usuario_component_1.VerPerfilUsuarioComponent },
            { path: 'listado-publicaciones-contratadas', component: listado_publicaciones_contratadas_component_1.ListadoPublicacionesContratadasComponent }
        ]
    },
    { path: '**', component: not_found_component_1.NotFoundComponent }
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
            app_component_1.AppComponent, not_found_component_1.NotFoundComponent, landing_component_1.LandingComponent, welcome_component_1.WelcomeComponent, registro_cliente_component_1.RegistroClienteComponent,
            inicio_sesion_component_1.InicioSesionComponent, dashboard_component_1.DashboardComponent, overview_component_1.OverviewComponent,
            perfil_usuario_component_1.PerfilUsuarioComponent, cambiar_contrasena_usuario_component_1.CambiarContrasenaUsuarioComponent,
            listado_servicios_component_1.ListadoServiciosComponent, ofrecer_servicio_component_1.OfrecerServicioComponent, listado_servicios_cliente_component_1.ListadoServiciosClienteComponent,
            editar_servicio_cliente_component_1.EditarServicioClienteComponent, listado_servicios_ofrecidos_component_1.ListadoServiciosOfrecidosComponent, ver_publicacion_ofrecida_component_1.VerPublicacionOfrecidaComponent,
            ver_perfil_usuario_component_1.VerPerfilUsuarioComponent, listado_publicaciones_contratadas_component_1.ListadoPublicacionesContratadasComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map