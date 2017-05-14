"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var data_service_1 = require("../../shared/services/data.service");
var ProjectsComponent = (function () {
    function ProjectsComponent(dataService) {
        var _this = this;
        this.dataService = dataService;
        this.projects = [];
        this.getProjects();
        this.dataService.projectsEvent.subscribe(function (projects) {
            _this.projects = projects;
        });
    }
    ProjectsComponent.prototype.getProjects = function () {
        this.dataService.postProjects("", "800");
    };
    ProjectsComponent.prototype.project = function (id) {
    };
    return ProjectsComponent;
}());
ProjectsComponent = __decorate([
    core_1.Component({
        selector: 'projects',
        templateUrl: 'app/dashboard/projects/projects.component.html',
    }),
    __metadata("design:paramtypes", [data_service_1.DataService])
], ProjectsComponent);
exports.ProjectsComponent = ProjectsComponent;
//# sourceMappingURL=projects.component.js.map