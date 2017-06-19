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
      { path: 'listado-servicios', component: ListadoServiciosComponent }
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
    ListadoServiciosComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
