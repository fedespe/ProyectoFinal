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
import { DashboardComponent } from "./dashboard/dashboard.component";
import { OverviewComponent } from "./dashboard/overview/overview.component";
import { PerfilUsuarioComponent } from "./dashboard/perfil-usuario/perfil-usuario.component";
import { CambiarContrasenaUsuarioComponent } from "./dashboard/cambiar-contrasena-usuario/cambiar-contrasena-usuario.component";
import { ListadoServiciosComponent } from "./dashboard/listado-servicios/listado-servicios.component";
import { OfrecerServicioComponent } from "./dashboard/ofrecer-servicio/ofrecer-servicio.component";
import { ListadoServiciosClienteComponent } from "./dashboard/listado-servicios-cliente/listado-servicios-cliente.component";
import { EditarServicioClienteComponent } from "./dashboard/editar-servicio-cliente/editar-servicio-cliente.component";
import { ListadoServiciosOfrecidosComponent } from "./dashboard/listado-servicios-ofrecidos/listado-servicios-ofrecidos.component";
import { VerPublicacionOfrecidaComponent } from "./dashboard/ver-publicacion-ofrecida/ver-publicacion-ofrecida.component";
import { VerPerfilUsuarioComponent } from "./dashboard/ver-perfil-usuario/ver-perfil-usuario.component";
import { ListadoPublicacionesContratadasComponent } from "./dashboard/listado-publicaciones-contratadas/listado-publicaciones-contratadas.component";
import { SolicitarServicioComponent } from "./dashboard/solicitar-servicio/solicitar-servicio.component";
import { ListadoSolicitudesClienteComponent } from "./dashboard/listado-solicitudes-cliente/listado-solicitudes-cliente.component";
import { EditarSolicitudClienteComponent } from "./dashboard/editar-solicitud-cliente/editar-solicitud-cliente.component";
import { ListadoSolicitudesComponent } from "./dashboard/listado-solicitudes/listado-solicitudes.component";
import { ListadoSolicitudesOfrecidasComponent } from "./dashboard/listado-solicitudes-ofrecidas/listado-solicitudes-ofrecidas.component";
import { VerPublicacionSolicitadaComponent } from "./dashboard/ver-publicacion-solicitada/ver-publicacion-solicitada.component";

const appRoutes: Routes = [
  { path: '', component: LandingComponent, 
    children:[
      { path: '', component: WelcomeComponent },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'registro-cliente', component: RegistroClienteComponent },
      { path: 'inicio-sesion', component: InicioSesionComponent }
    ]
  },
  { path: 'dashboard', component: DashboardComponent,
    children:[
      { path: 'overview',component: OverviewComponent },
      { path: 'perfil-usuario',component: PerfilUsuarioComponent},
      { path: 'cambiar-contrasena-usuario', component: CambiarContrasenaUsuarioComponent },
      { path: 'listado-servicios', component: ListadoServiciosComponent },
      { path: 'ofrecer-servicio', component: OfrecerServicioComponent },
      { path: 'listado-servicios-cliente', component: ListadoServiciosClienteComponent },
      { path: 'editar-servicio-cliente/:id', component: EditarServicioClienteComponent },
      { path: 'listado-servicios-ofrecidos/:id', component: ListadoServiciosOfrecidosComponent },
      { path: 'ver-publicacion-ofrecida/:id/:idContacto', component: VerPublicacionOfrecidaComponent },
      { path: 'ver-perfil-usuario/:id', component: VerPerfilUsuarioComponent },
      { path: 'listado-publicaciones-contratadas', component: ListadoPublicacionesContratadasComponent },
      { path: 'solicitar-servicio', component: SolicitarServicioComponent },
      { path: 'listado-solicitudes-cliente', component: ListadoSolicitudesClienteComponent },
      { path: 'editar-solicitud-cliente/:id', component: EditarSolicitudClienteComponent },
      { path: 'listado-solicitudes', component: ListadoSolicitudesComponent },
      { path: 'listado-solicitudes-ofrecidas/:id', component: ListadoSolicitudesOfrecidasComponent },
      { path: 'ver-publicacion-solicitada/:id/:idContacto', component: VerPublicacionSolicitadaComponent },
    ]
  },
  {path: '**', component: NotFoundComponent }
];

@NgModule({
  imports:      [
    BrowserModule, FormsModule, HttpModule, RouterModule,  RouterModule.forRoot(appRoutes), ReactiveFormsModule
  ],
  declarations: [
    AppComponent, NotFoundComponent, LandingComponent, WelcomeComponent, RegistroClienteComponent, 
    InicioSesionComponent, DashboardComponent, OverviewComponent, 
    PerfilUsuarioComponent, CambiarContrasenaUsuarioComponent, 
    ListadoServiciosComponent, OfrecerServicioComponent, ListadoServiciosClienteComponent,
    EditarServicioClienteComponent, ListadoServiciosOfrecidosComponent, VerPublicacionOfrecidaComponent,
    VerPerfilUsuarioComponent, ListadoPublicacionesContratadasComponent, SolicitarServicioComponent,
    ListadoSolicitudesClienteComponent, EditarSolicitudClienteComponent, ListadoSolicitudesComponent,
    ListadoSolicitudesOfrecidasComponent, VerPublicacionSolicitadaComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
