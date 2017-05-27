import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Settings } from "../settings";
import { Utilidades } from "../utilidades";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Cliente} from "../cliente";

@Injectable()
export class DataService {
    baseUrl : string;
    private headers : Headers;

    constructor(private http:Http, private router: Router) {
        this.headers = new Headers({ 'Accept': 'application/json', 'Content-Type' : 'application/json' });
        this.baseUrl = Settings.baseUrl;
    }

    public postRegistroCliente(cliente:Cliente){
        var URL : string = this.baseUrl + '/api/carro/PostAltaCarro';
        let body = {"IdCarro":1,"Marca":"Ferrari","Modelo":2012};
        
        Utilidades.log("[data.service.ts] - postRegistroCliente | URL: " + URL);
        Utilidades.log("[data.service.ts] - postRegistroCliente | body: " + JSON.stringify(body));
        Utilidades.log("[data.service.ts] - postRegistroCliente | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.post(URL, body, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }


    //Función para lanzar excepciones que pueden surgir en las llamadas a los servicios
    private handleError(error: any) {
        return Observable.throw(error.json().error || " server error");
    }
}
