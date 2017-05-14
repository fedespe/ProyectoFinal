import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { InicioSesionComponent } from "./inicio-sesion/inicio-sesion.component";
import { WelcomeComponent } from "./landing/welcome.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RegistroClienteComponent } from "./registro-cliente/registro-cliente.component";
import { OverviewComponent } from "./dashboard/overview/overview.component";


const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'inicio-sesion', component: InicioSesionComponent },
  { path: 'registro-cliente', component: RegistroClienteComponent },
  { path: 'dashboard', component: DashboardComponent,
    children:[
      { path: 'overview',component: OverviewComponent }
    ]
  },
];

@NgModule({
  imports:      [
    BrowserModule, FormsModule, HttpModule, RouterModule,  RouterModule.forRoot(appRoutes),
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent, InicioSesionComponent, DashboardComponent, WelcomeComponent, RegistroClienteComponent, OverviewComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
