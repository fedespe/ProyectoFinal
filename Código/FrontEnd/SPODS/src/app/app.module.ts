import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { NotFoundComponent } from "./not-found/not-found.component";
import { LandingComponent } from "./landing/landing.component";
import { WelcomeComponent } from "./landing/welcome/welcome.component";
import { RegistroClienteComponent } from "./landing/registro-cliente/registro-cliente.component";
import { InicioSesionComponent } from "./landing/inicio-sesion/inicio-sesion.component";
import { OlvidoPasswordComponent } from "./landing/olvido-password/olvido-password.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { OverviewComponent } from "./dashboard/overview/overview.component";
import { PerfilUsuarioComponent } from "./mi-cuenta/perfil-usuario/perfil-usuario.component";
import { CambiarContrasenaUsuarioComponent } from "./mi-cuenta/cambiar-contrasena-usuario/cambiar-contrasena-usuario.component";
import { ListadoServiciosComponent } from "./dashboard/listado-servicios/listado-servicios.component";
import { OfrecerServicioComponent } from "./dashboard/ofrecer-servicio/ofrecer-servicio.component";
import { ListadoOfertasClienteComponent } from "./mi-cuenta/listado-ofertas-cliente/listado-ofertas-cliente.component";
import { ResumenComponent } from "./mi-cuenta/resumen/resumen.component";
import { EditarServicioClienteComponent } from "./dashboard/editar-servicio-cliente/editar-servicio-cliente.component";
import { ListadoServiciosOfrecidosComponent } from "./dashboard/listado-servicios-ofrecidos/listado-servicios-ofrecidos.component";
import { VerPublicacionOfrecidaComponent } from "./dashboard/ver-publicacion-ofrecida/ver-publicacion-ofrecida.component";
import { ListadoOfertasContratadasComponent } from "./mi-cuenta/listado-ofertas-contratadas/listado-ofertas-contratadas.component";
import { ListadoSolicitudesAceptadasComponent } from "./mi-cuenta/listado-solicitudes-aceptadas/listado-solicitudes-aceptadas.component";
import { VerPerfilUsuarioComponent } from "./dashboard/ver-perfil-usuario/ver-perfil-usuario.component";
import { SolicitarServicioComponent } from "./dashboard/solicitar-servicio/solicitar-servicio.component";
import { ListadoSolicitudesClienteComponent } from "./mi-cuenta/listado-solicitudes-cliente/listado-solicitudes-cliente.component";
import { EditarSolicitudClienteComponent } from "./dashboard/editar-solicitud-cliente/editar-solicitud-cliente.component";
import { ListadoSolicitudesComponent } from "./dashboard/listado-solicitudes/listado-solicitudes.component";
import { ListadoSolicitudesOfrecidasComponent } from "./dashboard/listado-solicitudes-ofrecidas/listado-solicitudes-ofrecidas.component";
import { VerPublicacionSolicitadaComponent } from "./dashboard/ver-publicacion-solicitada/ver-publicacion-solicitada.component";
import { MiCuentaComponent } from "./mi-cuenta/mi-cuenta.component";

import { RatingComponent } from "./componentes/rating/rating.component";

import { RatingModule } from "ng2-rating";


const appRoutes: Routes = [
  { path: '', component: LandingComponent, 
    children:[
      { path: '', component: WelcomeComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'registro-cliente', component: RegistroClienteComponent },
      { path: 'inicio-sesion', component: InicioSesionComponent },
      { path: 'olvido-password', component: OlvidoPasswordComponent }
    ]
  },
  { path: 'dashboard', component: DashboardComponent,
    children:[
      { path: 'overview',component: OverviewComponent },
      { path: 'listado-servicios', component: ListadoServiciosComponent },
      { path: 'ofrecer-servicio', component: OfrecerServicioComponent },
      { path: 'editar-servicio-cliente/:id', component: EditarServicioClienteComponent },
      { path: 'listado-servicios-ofrecidos/:id', component: ListadoServiciosOfrecidosComponent },
      { path: 'ver-perfil-usuario/:id', component: VerPerfilUsuarioComponent },
      { path: 'ver-publicacion-ofrecida/:id', component: VerPublicacionOfrecidaComponent },
      { path: 'solicitar-servicio', component: SolicitarServicioComponent },
      { path: 'editar-solicitud-cliente/:id', component: EditarSolicitudClienteComponent },
      { path: 'listado-solicitudes', component: ListadoSolicitudesComponent },
      { path: 'listado-solicitudes-ofrecidas/:id', component: ListadoSolicitudesOfrecidasComponent },
      { path: 'ver-publicacion-solicitada/:id', component: VerPublicacionSolicitadaComponent },
    ]
  },
  { path: 'mi-cuenta', component: MiCuentaComponent,
    children:[
      { path: 'resumen',component: ResumenComponent},
      { path: 'perfil-usuario',component: PerfilUsuarioComponent},
      { path: 'cambiar-contrasena-usuario', component: CambiarContrasenaUsuarioComponent },
      { path: 'listado-ofertas-contratadas', component: ListadoOfertasContratadasComponent },
      { path: 'listado-solicitudes-cliente', component: ListadoSolicitudesClienteComponent },
      { path: 'listado-solicitudes-aceptadas', component: ListadoSolicitudesAceptadasComponent },
      { path: 'listado-ofertas-cliente', component: ListadoOfertasClienteComponent }
    ]
  },
  {path: '**', component: NotFoundComponent }
];

@NgModule({
  imports:      [
    BrowserModule, FormsModule, HttpModule, RouterModule,  RouterModule.forRoot(appRoutes), ReactiveFormsModule, RatingModule
  ],
  declarations: [
    AppComponent, NotFoundComponent, LandingComponent, WelcomeComponent, RegistroClienteComponent, 
    InicioSesionComponent, DashboardComponent, OverviewComponent, 
    PerfilUsuarioComponent, CambiarContrasenaUsuarioComponent, 
    ListadoServiciosComponent, OfrecerServicioComponent, ListadoOfertasClienteComponent,
    EditarServicioClienteComponent, ListadoServiciosOfrecidosComponent, VerPublicacionOfrecidaComponent,
    ListadoOfertasContratadasComponent, SolicitarServicioComponent,
    ListadoSolicitudesClienteComponent, EditarSolicitudClienteComponent, ListadoSolicitudesComponent,
    ListadoSolicitudesOfrecidasComponent, VerPublicacionSolicitadaComponent, OlvidoPasswordComponent,
    MiCuentaComponent, ResumenComponent, RatingComponent, VerPerfilUsuarioComponent, ListadoSolicitudesAceptadasComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
