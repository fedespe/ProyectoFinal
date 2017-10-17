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
var manual_usuario_component_1 = require("./landing/manual-usuario/manual-usuario.component");
var olvido_password_component_1 = require("./landing/olvido-password/olvido-password.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var overview_component_1 = require("./dashboard/overview/overview.component");
var perfil_usuario_component_1 = require("./mi-cuenta/perfil-usuario/perfil-usuario.component");
var cambiar_contrasena_usuario_component_1 = require("./mi-cuenta/cambiar-contrasena-usuario/cambiar-contrasena-usuario.component");
var listado_servicios_component_1 = require("./dashboard/listado-servicios/listado-servicios.component");
var ofrecer_servicio_component_1 = require("./dashboard/ofrecer-servicio/ofrecer-servicio.component");
var listado_ofertas_cliente_component_1 = require("./mi-cuenta/listado-ofertas-cliente/listado-ofertas-cliente.component");
var resumen_component_1 = require("./mi-cuenta/resumen/resumen.component");
var editar_servicio_cliente_component_1 = require("./mi-cuenta/editar-servicio-cliente/editar-servicio-cliente.component");
var listado_servicios_ofrecidos_component_1 = require("./dashboard/listado-servicios-ofrecidos/listado-servicios-ofrecidos.component");
var ver_publicacion_ofrecida_component_1 = require("./dashboard/ver-publicacion-ofrecida/ver-publicacion-ofrecida.component");
var listado_ofertas_contratadas_component_1 = require("./mi-cuenta/listado-ofertas-contratadas/listado-ofertas-contratadas.component");
var listado_solicitudes_aceptadas_component_1 = require("./mi-cuenta/listado-solicitudes-aceptadas/listado-solicitudes-aceptadas.component");
var ver_perfil_usuario_component_1 = require("./dashboard/ver-perfil-usuario/ver-perfil-usuario.component");
var solicitar_servicio_component_1 = require("./dashboard/solicitar-servicio/solicitar-servicio.component");
var listado_solicitudes_cliente_component_1 = require("./mi-cuenta/listado-solicitudes-cliente/listado-solicitudes-cliente.component");
var editar_solicitud_cliente_component_1 = require("./mi-cuenta/editar-solicitud-cliente/editar-solicitud-cliente.component");
var listado_solicitudes_component_1 = require("./dashboard/listado-solicitudes/listado-solicitudes.component");
var listado_solicitudes_ofrecidas_component_1 = require("./dashboard/listado-solicitudes-ofrecidas/listado-solicitudes-ofrecidas.component");
var ver_publicacion_solicitada_component_1 = require("./dashboard/ver-publicacion-solicitada/ver-publicacion-solicitada.component");
var mi_cuenta_component_1 = require("./mi-cuenta/mi-cuenta.component");
var rating_component_1 = require("./componentes/rating/rating.component");
var ng2_rating_1 = require("ng2-rating");
var appRoutes = [
    { path: '', component: landing_component_1.LandingComponent,
        children: [
            { path: '', component: welcome_component_1.WelcomeComponent },
            { path: 'welcome', component: welcome_component_1.WelcomeComponent },
            { path: 'registro-cliente', component: registro_cliente_component_1.RegistroClienteComponent },
            { path: 'inicio-sesion', component: inicio_sesion_component_1.InicioSesionComponent },
            { path: 'olvido-password', component: olvido_password_component_1.OlvidoPasswordComponent },
            { path: 'manual-usuario', component: manual_usuario_component_1.ManualUsuarioComponent }
        ]
    },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent,
        children: [
            { path: '', component: overview_component_1.OverviewComponent },
            { path: 'overview', component: overview_component_1.OverviewComponent },
            { path: 'listado-servicios', component: listado_servicios_component_1.ListadoServiciosComponent },
            { path: 'ofrecer-servicio', component: ofrecer_servicio_component_1.OfrecerServicioComponent },
            { path: 'editar-servicio-cliente/:id', component: editar_servicio_cliente_component_1.EditarServicioClienteComponent },
            { path: 'listado-servicios-ofrecidos/:id', component: listado_servicios_ofrecidos_component_1.ListadoServiciosOfrecidosComponent },
            { path: 'ver-perfil-usuario/:id', component: ver_perfil_usuario_component_1.VerPerfilUsuarioComponent },
            { path: 'ver-publicacion-ofrecida/:id', component: ver_publicacion_ofrecida_component_1.VerPublicacionOfrecidaComponent },
            { path: 'solicitar-servicio', component: solicitar_servicio_component_1.SolicitarServicioComponent },
            { path: 'editar-solicitud-cliente/:id', component: editar_solicitud_cliente_component_1.EditarSolicitudClienteComponent },
            { path: 'listado-solicitudes', component: listado_solicitudes_component_1.ListadoSolicitudesComponent },
            { path: 'listado-solicitudes-ofrecidas/:id', component: listado_solicitudes_ofrecidas_component_1.ListadoSolicitudesOfrecidasComponent },
            { path: 'ver-publicacion-solicitada/:id', component: ver_publicacion_solicitada_component_1.VerPublicacionSolicitadaComponent },
        ]
    },
    { path: 'mi-cuenta', component: mi_cuenta_component_1.MiCuentaComponent,
        children: [
            { path: 'resumen', component: resumen_component_1.ResumenComponent },
            { path: 'perfil-usuario', component: perfil_usuario_component_1.PerfilUsuarioComponent },
            { path: 'cambiar-contrasena-usuario', component: cambiar_contrasena_usuario_component_1.CambiarContrasenaUsuarioComponent },
            { path: 'listado-ofertas-contratadas', component: listado_ofertas_contratadas_component_1.ListadoOfertasContratadasComponent },
            { path: 'listado-solicitudes-cliente', component: listado_solicitudes_cliente_component_1.ListadoSolicitudesClienteComponent },
            { path: 'listado-solicitudes-aceptadas', component: listado_solicitudes_aceptadas_component_1.ListadoSolicitudesAceptadasComponent },
            { path: 'listado-ofertas-cliente', component: listado_ofertas_cliente_component_1.ListadoOfertasClienteComponent }
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
            platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, router_1.RouterModule, router_1.RouterModule.forRoot(appRoutes), forms_1.ReactiveFormsModule, ng2_rating_1.RatingModule
        ],
        declarations: [
            app_component_1.AppComponent, not_found_component_1.NotFoundComponent, landing_component_1.LandingComponent, welcome_component_1.WelcomeComponent, registro_cliente_component_1.RegistroClienteComponent,
            inicio_sesion_component_1.InicioSesionComponent, dashboard_component_1.DashboardComponent, overview_component_1.OverviewComponent,
            perfil_usuario_component_1.PerfilUsuarioComponent, cambiar_contrasena_usuario_component_1.CambiarContrasenaUsuarioComponent,
            listado_servicios_component_1.ListadoServiciosComponent, ofrecer_servicio_component_1.OfrecerServicioComponent, listado_ofertas_cliente_component_1.ListadoOfertasClienteComponent,
            editar_servicio_cliente_component_1.EditarServicioClienteComponent, listado_servicios_ofrecidos_component_1.ListadoServiciosOfrecidosComponent, ver_publicacion_ofrecida_component_1.VerPublicacionOfrecidaComponent,
            listado_ofertas_contratadas_component_1.ListadoOfertasContratadasComponent, solicitar_servicio_component_1.SolicitarServicioComponent,
            listado_solicitudes_cliente_component_1.ListadoSolicitudesClienteComponent, editar_solicitud_cliente_component_1.EditarSolicitudClienteComponent, listado_solicitudes_component_1.ListadoSolicitudesComponent,
            listado_solicitudes_ofrecidas_component_1.ListadoSolicitudesOfrecidasComponent, ver_publicacion_solicitada_component_1.VerPublicacionSolicitadaComponent, olvido_password_component_1.OlvidoPasswordComponent,
            mi_cuenta_component_1.MiCuentaComponent, resumen_component_1.ResumenComponent, rating_component_1.RatingComponent, ver_perfil_usuario_component_1.VerPerfilUsuarioComponent, listado_solicitudes_aceptadas_component_1.ListadoSolicitudesAceptadasComponent,
            manual_usuario_component_1.ManualUsuarioComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map