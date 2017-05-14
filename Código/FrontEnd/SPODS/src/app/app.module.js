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
var login_component_1 = require("./login/login.component");
var welcome_component_1 = require("./landing/welcome.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var projects_component_1 = require("./dashboard/projects/projects.component");
var project_component_1 = require("./dashboard/project/project.component");
var render_component_1 = require("./dashboard/project/render/render.component");
var client_register_component_1 = require("./client-register/client-register.component");
var renderer_register_component_1 = require("./renderer-register/renderer-register.component");
var project_register_component_1 = require("./dashboard/project-register/project-register.component");
var my_projects_component_1 = require("./dashboard/my-projects/my-projects.component");
var project_detail_component_1 = require("./dashboard/project-detail/project-detail.component");
var project_edit_component_1 = require("./dashboard/project-edit/project-edit.component");
var overview_component_1 = require("./dashboard/overview/overview.component");
var ng2_translate_1 = require("ng2-translate");
var my_profile_client_component_1 = require("./dashboard/my-profile-client/my-profile-client.component");
var user_forgot_password_component_1 = require("./user-forgot-password/user-forgot-password.component");
var appRoutes = [
    { path: '', component: welcome_component_1.WelcomeComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'client-register', component: client_register_component_1.ClientRegisterComponent },
    { path: 'renderer-register', component: renderer_register_component_1.RendererRegisterComponent },
    { path: 'user-forgot-password', component: user_forgot_password_component_1.UserForgotPasswordComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent,
        children: [
            { path: 'my-profile-client', component: my_profile_client_component_1.MyProfileClientComponent },
            { path: 'projects', component: projects_component_1.ProjectsComponent },
            { path: 'project', component: project_component_1.ProjectComponent },
            { path: 'render', component: render_component_1.RenderComponent },
            { path: 'project-register', component: project_register_component_1.ProjectRegisterComponent },
            { path: 'my-projects', component: my_projects_component_1.MyProjectsComponent },
            { path: 'project-detail/:id', component: project_detail_component_1.ProjectDetailComponent },
            { path: 'project-edit/:id', component: project_edit_component_1.ProjectEditComponent },
            { path: 'overview', component: overview_component_1.OverviewComponent }
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
            platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, router_1.RouterModule, router_1.RouterModule.forRoot(appRoutes),
            forms_1.ReactiveFormsModule, ng2_translate_1.TranslateModule.forRoot()
        ],
        declarations: [
            app_component_1.AppComponent, login_component_1.LoginComponent, dashboard_component_1.DashboardComponent, welcome_component_1.WelcomeComponent, projects_component_1.ProjectsComponent, project_component_1.ProjectComponent,
            render_component_1.RenderComponent, client_register_component_1.ClientRegisterComponent, renderer_register_component_1.RendererRegisterComponent, project_register_component_1.ProjectRegisterComponent, my_projects_component_1.MyProjectsComponent,
            project_detail_component_1.ProjectDetailComponent, overview_component_1.OverviewComponent, project_edit_component_1.ProjectEditComponent, my_profile_client_component_1.MyProfileClientComponent, user_forgot_password_component_1.UserForgotPasswordComponent
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map