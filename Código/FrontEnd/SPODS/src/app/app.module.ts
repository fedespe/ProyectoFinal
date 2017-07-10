import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { WelcomeComponent } from "./landing/welcome.component";
import { RegistroClienteComponent } from "./registro-cliente/registro-cliente.component";
import { InicioSesionComponent } from "./inicio-sesion/inicio-sesion.component";
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

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent, 
    children:[
      { path: 'registro-cliente', component: RegistroClienteComponent },
      { path: 'inicio-sesion', component: InicioSesionComponent }
    ]
  },  
  // { path: '', component: WelcomeComponent },
  // { path: 'registro-cliente', component: RegistroClienteComponent },
  // { path: 'inicio-sesion', component: InicioSesionComponent },

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
      { path: 'ver-publicacion-ofrecida/:id', component: VerPublicacionOfrecidaComponent }
    ]
  }, 
];

@NgModule({
  imports:      [
    BrowserModule, FormsModule, HttpModule, RouterModule,  RouterModule.forRoot(appRoutes), ReactiveFormsModule
  ],
  declarations: [
    AppComponent, WelcomeComponent, RegistroClienteComponent, 
    InicioSesionComponent, DashboardComponent, OverviewComponent, 
    PerfilUsuarioComponent, CambiarContrasenaUsuarioComponent, 
    ListadoServiciosComponent, OfrecerServicioComponent, ListadoServiciosClienteComponent,
    EditarServicioClienteComponent, ListadoServiciosOfrecidosComponent, VerPublicacionOfrecidaComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
