
import { Component, OnInit } from '@angular/core';
import {  FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { Error } from '../../shared/error';
import { TranslateService } from "ng2-translate";
import {Usuario} from "../../shared/usuario";
import {Cliente} from "../../shared/cliente";
import {Renderista} from "../../shared/renderista";
import { Pais } from '../../shared/pais';

@Component({
    selector: 'my-profile-client',
    templateUrl: 'app/dashboard/my-profile-client/my-profile-client.component.html',
    styleUrls:  ['css/my-profile.css']
})

export class MyProfileClientComponent {
    editar: boolean=true;
    errores: Error[] = [];
    message:string;
    cliente:Cliente=null;
    usuario:Usuario=null;
    renderista:Renderista=new Renderista("","");
    public paises: Pais[] = [];

    constructor(private dataService: DataService,private translate: TranslateService) {
        this.message = "";
        this.errores = [];
        this.cargarLenguaje();
        this.cargarCliente();
        this.paises = [];
        this.cargarPaises();


    }

    cargarLenguaje(){
        this.translate.addLangs(['en', 'es']);
        if(localStorage.getItem('default_language') != null) {
            this.translate.setDefaultLang(localStorage.getItem('default_language'));
        }
        else{
            this.translate.setDefaultLang('en');
        }

        if(localStorage.getItem('selected_language') != null) {
            this.translate.use(localStorage.getItem('selected_language'));
        }
        else{
            this.translate.use(this.translate.getDefaultLang());
        }
    }

    cargarPaises(){
        console.log("[my-profile-client.component.ts] - cargarPaises");
        this.dataService.postPais()
            .subscribe(
                res => this.parsePaisOk(res),
                error => this.parsePaisError(error),
                () => console.log("[my-profile-client.component.ts]- cargarPaises: Completed")
            );
    }
    parsePaisOk(response:any){
        console.log("[my-profile-client.component.ts] - parsePaisOk | response: " + JSON.stringify(response));

        this.message="";
        this.errores = response.Errors;
        if(response.ErrorCode ==  200){
            this.paises = response.SDTPaisCollection;
            console.log(JSON.stringify(this.paises));
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parsePaisError(error:any){
        console.log("There was an error loading the counties.");
        console.log("[my-profile-client.component.ts] - parsePaisError: " + JSON.stringify(error));
    }
    editClient() {
        this.editar=false;
    }
    postUserEditOk(response:any){
        console.log("[my-profile-client.component.ts] - postUserEditOk | response : "+ JSON.stringify(response));

        this.errores= response.Errors;

        if(response.ErrorCode ==  200){
            this.cancelEdit();
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    postUserEditError(error:any){
        console.log("[my-profile-client.component.ts] - postUserEditError| error:" + JSON.stringify(error) );
        this.message += "An error occurred while modyfied client.";

    }

    saveClient(){
        this.dataService.postUserEdit( this.usuario,this.cliente,this.renderista )
            .subscribe(
                res => this.postUserEditOk(res),
                error => this.postUserEditError(error),
                () => console.log("[my-profile-client.component.ts] - postUserEdit: Completed")
            );
    }
    cancelEdit(){
        this.cargarCliente();
        this.editar=true;

    }
    cargarCliente(){
        this.dataService.postUsuario()
            .subscribe(
                res => this.parseUsuarioOk(res),
                error => this.parseUsuarioError(error),
                () => console.log("[my-profile-client.component.ts] - cargarCliente: Completed")
            );
    }
    parseUsuarioOk(response:any){
        console.log("[my-profile-client.component.ts] - parseUsuarioOk");

        this.message="";
        this.errores = response.Errors;

        if(response.ErrorCode ==  200){
            this.cliente=response.SDTCliente;
            this.usuario=response.SDTUsuario;
        }
        else{
            //Acá podría controlar los códigos de error que me mando desde el backend
        }
    }

    parseUsuarioError(error:any){
        console.log("[my-profile-client.component.ts] - parseUsuarioError | error: " + JSON.stringify(error));
        this.message = "An error has ocurred.";
    }


}