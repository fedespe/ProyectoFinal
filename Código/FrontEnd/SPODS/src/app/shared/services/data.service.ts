import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Settings } from "../settings";
import { Utilidades } from "../utilidades";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Cliente} from "../cliente";
import {Carro} from "../carro";
import {ActualizarContrasena} from "../actualizarContrasena";
import {Publicacion} from "../publicacion";

@Injectable()
export class DataService {
    baseUrl : string;
    private headers : Headers;

    constructor(private http:Http, private router: Router) {
        this.headers = new Headers({ 'Accept': 'application/json', 'Content-Type' : 'application/json' });
        this.baseUrl = Settings.baseUrl;
    }

    //*************************** */
    // SERVICIOS CLIENTE
    //*************************** */
    //Prueba llamando un método por Post y pasando algo para dar de alta en el Body (Da de alta un carro)
    public postRegistrarCliente(cliente:Cliente){
        var URL : string = this.baseUrl + '/api/Cliente/altaCliente';
        let body = JSON.stringify(cliente);

        Utilidades.log("[data.service.ts] - postRegistroCliente | URL: " + URL);
        Utilidades.log("[data.service.ts] - postRegistroCliente | body: " + JSON.stringify(body));
        Utilidades.log("[data.service.ts] - postRegistroCliente | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.post(URL, body, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

     public postIngresarCliente(cliente:Cliente){
        var URL : string = this.baseUrl + '/api/Cliente/ingresarCliente';
        let body = JSON.stringify(cliente);

        Utilidades.log("[data.service.ts] - postRegistroCliente | URL: " + URL);
        Utilidades.log("[data.service.ts] - postRegistroCliente | body: " + JSON.stringify(body));
        Utilidades.log("[data.service.ts] - postRegistroCliente | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.post(URL, body, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    
    public putActualizarCliente(cliente:Cliente){
        var URL : string = this.baseUrl + '/api/Cliente/actualizarCliente';
        let body = JSON.stringify(cliente);
        
        Utilidades.log("[data.service.ts] - putActualizarCliente | URL: " + URL);
        Utilidades.log("[data.service.ts] - putActualizarCliente | body: " + body);
        Utilidades.log("[data.service.ts] - putActualizarCliente | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.put(URL, body, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    
    public getObtenerCliente(id:number){
        var URL : string = this.baseUrl + '/api/Cliente/obtener/' + id;

        Utilidades.log("[data.service.ts] - getCarroObtenerPorId | URL: " + URL);
        Utilidades.log("[data.service.ts] - getCarroObtenerPorId | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.get(URL, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    
    public putActualizarContrasena(actualizarContrasena:ActualizarContrasena){
        var URL : string = this.baseUrl + '/api/Cliente/actualizarContrasena';
        let body = JSON.stringify(actualizarContrasena);
        
        Utilidades.log("[data.service.ts] - putActualizarContrasena | URL: " + URL);
        Utilidades.log("[data.service.ts] - putActualizarContrasena | body: " + body);
        Utilidades.log("[data.service.ts] - putActualizarContrasena | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.put(URL, body, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    //*************************** */
    // FIN SERVICIOS CLIENTE
    //*************************** */

    //*************************** */
    // SERVICIOS BARRIO
    //*************************** */

    public getBarrioObtenerTodos(){
        var URL : string = this.baseUrl + '/api/Barrio/obtenerTodos';

        Utilidades.log("[data.service.ts] - getCarroObtenerTodos | URL: " + URL);
        Utilidades.log("[data.service.ts] - getCarroObtenerTodos | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.get(URL, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    //*************************** */
    // FIN SERVICIOS BARRIO
    //*************************** */

    //*************************** */
    // SERVICIOS SERVICIO
    //*************************** */

    public getServicioObtenerTodos(){
        var URL : string = this.baseUrl + '/api/Servicio/obtenerTodosHabilitados';

        Utilidades.log("[data.service.ts] - getServicioObtenerTodos | URL: " + URL);
        Utilidades.log("[data.service.ts] - getServicioObtenerTodos | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.get(URL, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getObtenerServicio(id:number){
        var URL : string = this.baseUrl + '/api/Servicio/obtener/' + id;

        Utilidades.log("[data.service.ts] - getObtenerServicio | URL: " + URL);
        Utilidades.log("[data.service.ts] - getObtenerServicio | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.get(URL, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    

    //*************************** */
    // FIN SERVICIOS SERVICIO
    //*************************** */
    //*************************** */
    // FIN SERVICIOS PUBLICACION
    //*************************** */

    public postAltaPublicacion(publicacion:Publicacion){
        var URL : string = this.baseUrl + '/api/Publicacion/altaPublicacion';
        let body = JSON.stringify(publicacion);

        Utilidades.log("[data.service.ts] - postAltaPublicacion | URL: " + URL);
        Utilidades.log("[data.service.ts] - postAltaPublicacion | body: " + JSON.stringify(body));
        Utilidades.log("[data.service.ts] - postAltaPublicacion | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.post(URL, body, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getObtenerPublicacionesClienteOferta(id:number){
        var URL : string = this.baseUrl + '/api/Publicacion/obtenerPublicacionesClienteOferta/' + id;

        Utilidades.log("[data.service.ts] - getObtenerPublicacionesCliente | URL: " + URL);
        Utilidades.log("[data.service.ts] - getObtenerPublicacionesCliente | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.get(URL, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getDesactivarPublicacion(id:number){
        var URL : string = this.baseUrl + '/api/Publicacion/deshabilitarPublicacion/' + id;

        Utilidades.log("[data.service.ts] - getDesactivarPublicacion | URL: " + URL);
        Utilidades.log("[data.service.ts] - getDesactivarPublicacion | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.get(URL, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getActivarPublicacion(id:number){
        var URL : string = this.baseUrl + '/api/Publicacion/habilitarPublicacion/' + id;

        Utilidades.log("[data.service.ts] - getActivarPublicacion | URL: " + URL);
        Utilidades.log("[data.service.ts] - getActivarPublicacion | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.get(URL, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getPublicacion(id:number){
        var URL : string = this.baseUrl + '/api/Publicacion/obtener/' + id;

        Utilidades.log("[data.service.ts] - getActivarPublicacion | URL: " + URL);
        Utilidades.log("[data.service.ts] - getActivarPublicacion | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.get(URL, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    public putActualizarPublicacion(publicacion:Publicacion){
        var URL : string = this.baseUrl + '/api/Publicacion/actualizarPublicacion';
        let body = JSON.stringify(publicacion);
        
        Utilidades.log("[data.service.ts] - putActualizarPublicacion | URL: " + URL);
        Utilidades.log("[data.service.ts] - putActualizarPublicacion | body: " + body);
        Utilidades.log("[data.service.ts] - putActualizarPublicacion | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.put(URL, body, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    public getPublicacionesServicio(id:number){
        var URL : string = this.baseUrl + '/api/Publicacion/obtenerPublicacionesServicio/' + id;

        Utilidades.log("[data.service.ts] - getPublicacionesServicio | URL: " + URL);
        Utilidades.log("[data.service.ts] - getPublicacionesServicio | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.get(URL, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    //*************************** */
    // FIN SERVICIOS PUBLICACION
    //*************************** */

    //*************************** */
    //PRUEBA SERVICIOS
    //*************************** */

    //Prueba llamando un método por Get sin parámetros (Obtiene todos los carros)
    //Retorna una colección de Carro
    public getCarroObtenerTodos(){
        var URL : string = this.baseUrl + '/api/Carro/obtenerTodos';

        Utilidades.log("[data.service.ts] - getCarroObtenerTodos | URL: " + URL);
        Utilidades.log("[data.service.ts] - getCarroObtenerTodos | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.get(URL, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    //Prueba llamando un método por Get con parámetro (Obtiene el carro con el id que se pasa)
    //Retorna un Carro
    public getCarroObtenerPorId(id:number){
        var URL : string = this.baseUrl + '/api/Carro/obtener/' + id;

        Utilidades.log("[data.service.ts] - getCarroObtenerPorId | URL: " + URL);
        Utilidades.log("[data.service.ts] - getCarroObtenerPorId | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.get(URL, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    //Prueba llamando un método por Post y pasando algo para dar de alta en el Body (Da de alta el carro que se pasa)
    //Retorna una colección de Carro
    public postCarroAlta(carro:Carro){
        var URL : string = this.baseUrl + '/api/Carro/altaCarro';
        let body = JSON.stringify(carro);

        Utilidades.log("[data.service.ts] - postCarroAlta | URL: " + URL);
        Utilidades.log("[data.service.ts] - postCarroAlta | body: " + body);
        Utilidades.log("[data.service.ts] - postCarroAlta | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.post(URL, body, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    //Prueba llamando un método por Put y pasando algo para modificar en el Body (Modifica el carro que se pasa buscándolo por el Id)
    //Retorna una colección de Carro
    public putCarroActualizar(carro:Carro){
        var URL : string = this.baseUrl + '/api/Carro/actualizarCarro';
        let body = JSON.stringify(carro);
        
        Utilidades.log("[data.service.ts] - putCarroActualizar | URL: " + URL);
        Utilidades.log("[data.service.ts] - putCarroActualizar | body: " + body);
        Utilidades.log("[data.service.ts] - putCarroActualizar | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.put(URL, body, { headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    //Prueba llamando un método por Delete y pasando algo para eliminar en el Body (Elimina el carro que se pasa buscándolo por el Id)
    //Retorna una colección de Carro
    public deleteCarroEliminar(carro:Carro){
        var URL : string = this.baseUrl + '/api/Carro/eliminarCarro';
        let body = JSON.stringify(carro);
        
        Utilidades.log("[data.service.ts] - deleteCarroEliminar | URL: " + URL);
        Utilidades.log("[data.service.ts] - deleteCarroEliminar | body: " + body);
        Utilidades.log("[data.service.ts] - deleteCarroEliminar | headers: " + JSON.stringify({ headers: this.headers }));

        return this.http.delete(URL, { body: body, headers: this.headers })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    

    //*************************** */
    //PRUEBA SERVICIOS
    //*************************** */


    //Función para lanzar excepciones que pueden surgir en las llamadas a los servicios
    private handleError(error: any) {
        return Observable.throw(error.json().error || " server error");
    }
}
