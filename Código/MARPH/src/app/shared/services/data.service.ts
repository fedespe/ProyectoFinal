import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Settings } from "../settings";
import { Observable } from 'rxjs/Observable';
import { Project } from '../project';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ProjectFile} from "../projectFile";
import {Render} from "../render";
import {Cliente} from "../cliente";
import {Renderista} from "../renderista";
import {Usuario} from "../usuario";
import { Pais } from '../pais';

@Injectable()
export class DataService {
    contentHeadersUrlEncoded: Headers;
    contentHeadersJson: Headers;
    baseUrl : string;
    projectsEvent: EventEmitter<Project[]>;
    projects: Project[] = [];

    constructor(private http:Http, private router: Router) {
        this.contentHeadersUrlEncoded = new Headers({'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded'});
        this.baseUrl = Settings.baseUrl;
        this.projectsEvent = new EventEmitter<Project[]>();
        this.projects = [];
        this.ini();
    }
    
    public ini(){
        this.contentHeadersJson = new Headers({'Authorization': 'OAuth ' + localStorage.getItem('access_token'), 'Content-Type': 'application/json'});
    }

    //Servicios del BackEnd
    public postAccessToken(username:string, password:string) {
        console.log("[data.service.ts] - postAccessToken: " + username + " / " + password);
        let body = "client_id=8b56c11c15734bd780d4adc6dc5c6b04&client_secret=41dca83e9e204d7eb91bc31cb408c1c5&grant_type=local&username=" + username + "&password=" + password + "&scope=FullControl";
        return this.http.post(this.baseUrl + '/oauth/access_token', body, { headers: this.contentHeadersUrlEncoded })
            .map((res: Response) => res.json())
            .catch(this.handleError)
            ;
    }

    public postForgotPassword( email:string) {
        console.log("[data.service.ts] - post:  / " + email);
        let body = '{"Email": ' +JSON.stringify(email)+'}';
        console.log(body);
        return this.http.post(this.baseUrl + '/rest/SendNewPassword', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postClientRegister(usuario:Usuario, cliente:Cliente){
        console.log("[data.service.ts] - postClientRegister");
        var renderista:Renderista = new Renderista("","");
        let body = '{"SDTUsuario": '+ JSON.stringify(usuario) +',"SDTRenderista": '+ JSON.stringify(renderista) +',"SDTCliente": '+ JSON.stringify(cliente) +'}';
        return this.http.post(this.baseUrl + '/rest/CreateUsuario', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postUserEdit(usuario:Usuario, cliente:Cliente, renderista:Renderista){
        console.log("[data.service.ts] - postUserEdit");
        console.log('{"SDTUsuario": '+ JSON.stringify(usuario)  +',"SDTCliente": '+ JSON.stringify(cliente) +',"SDTRenderista": '+ JSON.stringify(renderista)+', "TransactionMode": "Update"}');
        let body = '{"SDTUsuario": '+ JSON.stringify(usuario)  +',"SDTCliente": '+ JSON.stringify(cliente) +',"SDTRenderista": '+ JSON.stringify(renderista)+', "TransactionMode": "Update"}';
        return this.http.post(this.baseUrl + '/rest/UpdateDeleteUsuario', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postRendererRegister(usuario:Usuario, renderista:Renderista){
        console.log("[data.service.ts] - postRendererRegister");
        var cliente:Cliente = new Cliente("","");
        let body = '{"SDTUsuario": '+ JSON.stringify(usuario) +',"SDTRenderista": '+ JSON.stringify(renderista) +',"SDTCliente": '+ JSON.stringify(cliente) +'}';
        return this.http.post(this.baseUrl + '/rest/CreateUsuario', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postProjectRegister(project: Project){
        console.log("[data.service.ts] - postProjetRegister project: " + JSON.stringify(project));
        let body ='{"SDTProyecto": '+ JSON.stringify(project) +',  "TransactionMode": "Insert"}';
        return this.http.post(this.baseUrl + '/rest/ABMProyecto', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postProjectEdit(project: Project){
        console.log("[data.service.ts] - postProjetEdit");
        let body ='{"SDTProyecto": '+ JSON.stringify(project) +',  "TransactionMode": "Update"}';
        return this.http.post(this.baseUrl + '/rest/ABMProyecto', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postProjectDelete(project: Project){
        console.log("[data.service.ts] - postProjetDelete");
        let body ='{"SDTProyecto": '+ JSON.stringify(project) +',  "TransactionMode": "Delete"}';
        return this.http.post(this.baseUrl + '/rest/ABMProyecto', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postFilesProjectRegister(files: ProjectFile[]){
        console.log("[data.service.ts] - postFilesProjectRegister");
        let body ='{"Archivos":'+ JSON.stringify(files) +', "TransactionMode": "Insert"}';
        return this.http.post(this.baseUrl + '/rest/ABMArchivo', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postRendersProjectRegister(renders: Render[]){
        console.log("[data.service.ts] - postRendersProjectRegister");
        let body ='{"Renders":'+ JSON.stringify(renders) +', "TransactionMode": "Insert"}';
        return this.http.post(this.baseUrl + '/rest/ABMRender', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postRendersEdit(renders: Render[]){
        console.log("[data.service.ts] - postRendersEdit");
        let body ='{"Renders":'+ JSON.stringify(renders) +', "TransactionMode": "Update"}';
        return this.http.post(this.baseUrl + '/rest/ABMRender', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postRenderVersionsEdit(render: Render){
        console.log("[data.service.ts] - postRenderVersionsEdit");
        let body ='{"SDTRender":'+ JSON.stringify(render) +', "TransactionMode": "Update"}';
        return this.http.post(this.baseUrl + '/rest/ABMRenderVersion', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postRenderVersionsCreate(render: Render){
        console.log("[data.service.ts] - postRenderVersionsCreate");
        let body ='{"SDTRender":'+ JSON.stringify(render) +', "TransactionMode": "Insert"}';
        return this.http.post(this.baseUrl + '/rest/ABMRenderVersion', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postTipoRender(){
        console.log("[data.service.ts] - postTiposRender");
        let body ='';
        return this.http.post(this.baseUrl + '/rest/GetTipoRender', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postMyProjects(){
        console.log("[data.service.ts] - postMyProjects");
        let body ='';
        return this.http.post(this.baseUrl + '/rest/GetMisProyectos', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postProjectDetail(ProyectoId:number){
        console.log("[data.service.ts] - postProjectDetail");
        let body ='{"ProyectoId": '+ ProyectoId +'}';
        return this.http.post(this.baseUrl + '/rest/GetProyecto', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postPais(){
        console.log("[data.service.ts] - postPais");
        let body ='';
        return this.http.post(this.baseUrl + '/rest/GetPais', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postUsuario(){
        console.log("[data.service.ts] - postUsuario");
        let body ='';
        return this.http.post(this.baseUrl + '/rest/GetUsuario', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    //Servicio del FrontEnd -de muestra-
    public postProjects(textoBusqueda:string, imageSize:string) {
        console.log("[data.service.ts] - postProjects: " + textoBusqueda + " / " + imageSize);
        let body = '{"TextoBusqueda":"' + textoBusqueda + '","ImageSize":"' + imageSize + '"}';
        this.http.post(this.baseUrl + 'rest/GetProjects', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError)
            .subscribe(
                res => this.parseProjectsOk(res),
                error => this.parseProjectsError(error),
                () => console.log("[data.service.ts] - postProjects: Completed")
            );
    }

    private parseProjectsOk(res:any){
        console.log("[data.service.ts] - parseProjectsOk | Cantidad: " + res.projects.Items.length);
        this.projects = res.TracksMediaQueue.Items;
        this.projectsEvent.emit(this.projects);
    }

    private parseProjectsError(error:any){
        console.log("[data.service.ts] - parseProjectsError | Error: " + JSON.stringify(error));
        if (error.code == 112){
            console.log("[data.service.ts] - parseProjectsError | Token expirado redirect");
            this.router.navigate(['/login']);
        }else{
            console.log("[data.service.ts] - parseProjectsError | Otro error");
        }
    }


    private handleError(error: any) {
        return Observable.throw(error.json().error || " server error");
    }
}
