import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { LoginComponent } from "./login/login.component";
import { WelcomeComponent } from "./landing/welcome.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProjectsComponent } from "./dashboard/projects/projects.component";
import { ProjectComponent } from "./dashboard/project/project.component";
import { RenderComponent } from "./dashboard/project/render/render.component";
import { RegistroClienteComponent } from "./registro-cliente/registro-cliente.component";
import { RendererRegisterComponent } from "./renderer-register/renderer-register.component";
import { ProjectRegisterComponent } from "./dashboard/project-register/project-register.component";
import { MyProjectsComponent } from "./dashboard/my-projects/my-projects.component";
import { ProjectDetailComponent } from "./dashboard/project-detail/project-detail.component";
import { ProjectEditComponent } from "./dashboard/project-edit/project-edit.component";
import { OverviewComponent } from "./dashboard/overview/overview.component";
import { TranslateModule } from "ng2-translate";
import { MyProfileClientComponent } from "./dashboard/my-profile-client/my-profile-client.component";
import { UserForgotPasswordComponent }  from "./user-forgot-password/user-forgot-password.component";


const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro-cliente', component: RegistroClienteComponent },
  { path: 'renderer-register', component: RendererRegisterComponent },
  { path: 'user-forgot-password', component: UserForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent,
    children:[
      { path: 'my-profile-client', component: MyProfileClientComponent},
      { path: 'projects', component: ProjectsComponent},
      { path: 'project', component: ProjectComponent},
      { path: 'render', component: RenderComponent},
      { path: 'project-register', component: ProjectRegisterComponent },
      { path: 'my-projects', component: MyProjectsComponent },
      { path: 'project-detail/:id',component: ProjectDetailComponent },
      { path: 'project-edit/:id',component: ProjectEditComponent },
      { path: 'overview',component: OverviewComponent }
    ]
  },
];

@NgModule({
  imports:      [
    BrowserModule, FormsModule, HttpModule, RouterModule,  RouterModule.forRoot(appRoutes),
    ReactiveFormsModule, TranslateModule.forRoot()
  ],
  declarations: [
    AppComponent, LoginComponent, DashboardComponent, WelcomeComponent, ProjectsComponent, ProjectComponent,
    RenderComponent, RegistroClienteComponent, RendererRegisterComponent, ProjectRegisterComponent, MyProjectsComponent,
    ProjectDetailComponent, OverviewComponent, ProjectEditComponent, MyProfileClientComponent, UserForgotPasswordComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
