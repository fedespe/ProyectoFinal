import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Settings } from "../settings";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Cliente} from "../cliente";

@Injectable()
export class DataService {
    contentHeadersUrlEncoded: Headers;
    contentHeadersJson: Headers;
    baseUrl : string;

    constructor(private http:Http, private router: Router) {
        this.contentHeadersUrlEncoded = new Headers({'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded'});
        this.baseUrl = Settings.baseUrl;
        this.ini();
    }
    
    public ini(){
        this.contentHeadersJson = new Headers({'Authorization': 'OAuth ' + localStorage.getItem('access_token'), 'Content-Type': 'application/json'});
    }

    //2017-05-14
    public postRegistroCliente(cliente:Cliente){
        console.log("[data.service.ts] - postRegistroCliente");

        let body = '{"dtoCliente": '+ JSON.stringify(cliente) +'}';

        //Ver el baseURL
        //Ver los Headers
        return this.http.post(this.baseUrl + '/altaCliente', body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error.json().error || " server error");
    }
}
