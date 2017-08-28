import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Settings } from "../settings";
import { Utilidades } from "../utilidades";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Cliente} from "../cliente";
import {Contacto} from "../contacto";
import {Carro} from "../carro";
import {ActualizarContrasena} from "../actualizarContrasena";
import {Publicacion} from "../publicacion";
import {ComentarioPuntuacion} from "../comentarioPuntuacion";
import {Presupuesto} from "../presupuesto";

@Injectable()
export class DataService {
    contentHeadersUrlEncoded: Headers;
    contentHeadersJson: Headers;
    baseUrl : string;

    public ini(){
        this.contentHeadersJson = new Headers({'Authorization': 'bearer ' + localStorage.getItem('access_token'), 'Content-Type': 'application/json'});
    }

    constructor(private http:Http, private router: Router) {
        this.contentHeadersUrlEncoded = new Headers({'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded'});
        this.baseUrl = Settings.baseUrl;
        this.ini();
    }

    //Servicios del BackEnd
    public postAccessToken(username:string, password:string) {
        console.log("[data.service.ts] - postAccessToken: " + username + " / " + password);
        let body = "grant_type=password&username="+username+"&password="+password;
        //let body = "client_id=8b56c11c15734bd780d4adc6dc5c6b04&client_secret=41dca83e9e204d7eb91bc31cb408c1c5&grant_type=local&username=" + username + "&password=" + password + "&scope=FullControl";
        return this.http.post(this.baseUrl + '/api/access_token', body, { headers: this.contentHeadersUrlEncoded })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getObtenerClienteLogueado(){
        var URL : string = this.baseUrl + '/api/Cliente/obtenerClienteLogueado/';

        Utilidades.log("[data.service.ts] - getObtenerClienteLogueado | URL: " + URL);
        Utilidades.log("[data.service.ts] - getObtenerClienteLogueado | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    //*************************** */
    // SERVICIOS COMENTARIOPUNTUACION
    //*************************** */

    public postAltaContacto(contacto:Contacto){
        var URL : string = this.baseUrl + '/api/ComentarioPuntuacion/altaContacto';
        let body = JSON.stringify(contacto);

        Utilidades.log("[data.service.ts] - postAltaContacto | URL: " + URL);
        Utilidades.log("[data.service.ts] - postAltaContacto | body: " + JSON.stringify(body));
        Utilidades.log("[data.service.ts] - postAltaContacto | this.contentHeadersJson: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.post(URL, body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postIngresarComentario(comentarioPuntuacion:ComentarioPuntuacion){
        var URL : string = this.baseUrl + '/api/ComentarioPuntuacion/altaComentarioPuntuacion';
        let body = JSON.stringify(comentarioPuntuacion);

        Utilidades.log("[data.service.ts] - postIngresarComentario | URL: " + URL);
        Utilidades.log("[data.service.ts] - postIngresarComentario | body: " + JSON.stringify(body));
        Utilidades.log("[data.service.ts] - postIngresarComentario | this.contentHeadersJson: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.post(URL, body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getObtenerComentarioPublicacion(id:number){
        var URL : string = this.baseUrl + '/api/ComentarioPuntuacion/obtenerPorPublicacion/' + id;

        Utilidades.log("[data.service.ts] - getObtenerComentarioPublicacion | URL: " + URL);
        Utilidades.log("[data.service.ts] - getObtenerComentarioPublicacion | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    public getObetenerPromedioPublicacion(id:number){
        var URL : string = this.baseUrl + '/api/ComentarioPuntuacion/obtenerPromedioPuntajePublicacion/' + id;

        Utilidades.log("[data.service.ts] - getObtenerComentarioPublicacion | URL: " + URL);
        Utilidades.log("[data.service.ts] - getObtenerComentarioPublicacion | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    public getObetenerPromedioClienteServicio(idCli:number,idServicio:number){
        var URL : string = this.baseUrl + '/api/ComentarioPuntuacion/obtenerPromedioPuntajeClienteServicio/' + idCli + "/" + idServicio;

        Utilidades.log("[data.service.ts] - getObetenerPromedioClienteServicio | URL: " + URL);
        Utilidades.log("[data.service.ts] - getObetenerPromedioClienteServicio | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public postAltaRespuestaComentario(comentarioPuntuacion:ComentarioPuntuacion){
        var URL : string = this.baseUrl + '/api/ComentarioPuntuacion/altaRespuestaComentario';
        let body = JSON.stringify(comentarioPuntuacion);

        Utilidades.log("[data.service.ts] - postAltaRespuestaComentario | URL: " + URL);
        Utilidades.log("[data.service.ts] - postAltaRespuestaComentario | body: " + JSON.stringify(body));
        Utilidades.log("[data.service.ts] - postAltaRespuestaComentario | this.contentHeadersJson: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.post(URL, body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    public getObtenerContactoPendienteCliente(idPublicacion:number, idCliente:number){
        var URL : string = this.baseUrl + '/api/ComentarioPuntuacion/obtenerContactoConComentarioPendienteCliente/' + idPublicacion + '/' + idCliente;

        Utilidades.log("[data.service.ts] - getObtenerContactoPendienteCliente | URL: " + URL);
        Utilidades.log("[data.service.ts] - getObtenerContactoPendienteCliente | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    public getobtenerTodosContactosConComentariosPendientesOferta(id:number){
        var URL : string = this.baseUrl + '/api/ComentarioPuntuacion/obtenerTodosContactosConComentariosPendientesOferta/' + id;

        Utilidades.log("[data.service.ts] - getobtenerTodosContactosConComentariosPendientesOferta | URL: " + URL);
        Utilidades.log("[data.service.ts] - getobtenerTodosContactosConComentariosPendientesOferta | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    public getobtenerTodosContactosConComentariosPendientesSolicitud(id:number){
        var URL : string = this.baseUrl + '/api/ComentarioPuntuacion/obtenerTodosContactosConComentariosPendientesSolicitud/' + id;

        Utilidades.log("[data.service.ts] - getobtenerTodosContactosConComentariosPendientesSolicitud | URL: " + URL);
        Utilidades.log("[data.service.ts] - getobtenerTodosContactosConComentariosPendientesSolicitud | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    public getComentariosOferta(id:number){
        var URL : string = this.baseUrl + '/api/ComentarioPuntuacion/obtenerComentariosOferta/' + id;

        Utilidades.log("[data.service.ts] - getComentariosOferta | URL: " + URL);
        Utilidades.log("[data.service.ts] - getComentariosOferta | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    public getComentariosSolicitud(id:number){
        var URL : string = this.baseUrl + '/api/ComentarioPuntuacion/obtenerComentariosSolicitud/' + id;

        Utilidades.log("[data.service.ts] - getComentariosSolicitud | URL: " + URL);
        Utilidades.log("[data.service.ts] - getComentariosSolicitud | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    //*************************** */
    // FIN SERVICIOS COMENTARIOPUNTUACION
    //*************************** */

    //*************************** */
    // SERVICIOS CLIENTE
    //*************************** */
    //Prueba llamando un método por Post y pasando algo para dar de alta en el Body (Da de alta un carro)
    public postRegistrarCliente(cliente:Cliente){
        var URL : string = this.baseUrl + '/api/Cliente/altaCliente';
        let body = JSON.stringify(cliente);

        Utilidades.log("[data.service.ts] - postRegistroCliente | URL: " + URL);
        Utilidades.log("[data.service.ts] - postRegistroCliente | body: " + JSON.stringify(body));
        Utilidades.log("[data.service.ts] - postRegistroCliente | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.post(URL, body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

     public postIngresarCliente(cliente:Cliente){
        var URL : string = this.baseUrl + '/api/Cliente/ingresarCliente';
        let body = JSON.stringify(cliente);

        Utilidades.log("[data.service.ts] - postRegistroCliente | URL: " + URL);
        Utilidades.log("[data.service.ts] - postRegistroCliente | body: " + JSON.stringify(body));
        Utilidades.log("[data.service.ts] - postRegistroCliente | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.post(URL, body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    
    public putActualizarCliente(cliente:Cliente){
        var URL : string = this.baseUrl + '/api/Cliente/actualizarCliente';
        let body = JSON.stringify(cliente);
        
        Utilidades.log("[data.service.ts] - putActualizarCliente | URL: " + URL);
        Utilidades.log("[data.service.ts] - putActualizarCliente | body: " + body);
        Utilidades.log("[data.service.ts] - putActualizarCliente | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.put(URL, body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    
    public getObtenerCliente(id:number){
        var URL : string = this.baseUrl + '/api/Cliente/obtener/' + id;

        Utilidades.log("[data.service.ts] - getCarroObtenerPorId | URL: " + URL);
        Utilidades.log("[data.service.ts] - getCarroObtenerPorId | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    
    public putActualizarContrasena(actualizarContrasena:ActualizarContrasena){
        var URL : string = this.baseUrl + '/api/Cliente/actualizarContrasena';
        let body = JSON.stringify(actualizarContrasena);
        
        Utilidades.log("[data.service.ts] - putActualizarContrasena | URL: " + URL);
        Utilidades.log("[data.service.ts] - putActualizarContrasena | body: " + body);
        Utilidades.log("[data.service.ts] - putActualizarContrasena | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.put(URL, body, { headers: this.contentHeadersJson })
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
        Utilidades.log("[data.service.ts] - getCarroObtenerTodos | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
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
        Utilidades.log("[data.service.ts] - getServicioObtenerTodos | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getObtenerServicio(id:number){
        var URL : string = this.baseUrl + '/api/Servicio/obtener/' + id;

        Utilidades.log("[data.service.ts] - getObtenerServicio | URL: " + URL);
        Utilidades.log("[data.service.ts] - getObtenerServicio | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
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
        Utilidades.log("[data.service.ts] - postAltaPublicacion | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.post(URL, body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getObtenerPublicacionesClienteOferta(id:number){
        var URL : string = this.baseUrl + '/api/Publicacion/obtenerPublicacionesClienteOferta/' + id;

        Utilidades.log("[data.service.ts] - getObtenerPublicacionesCliente | URL: " + URL);
        Utilidades.log("[data.service.ts] - getObtenerPublicacionesCliente | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getobtenerPublicacionesContratadasPorCliente(id:number){
        var URL : string = this.baseUrl + '/api/Publicacion/obtenerPublicacionesContratadasPorCliente/' + id;

        Utilidades.log("[data.service.ts] - getobtenerPublicacionesContratadasPorCliente | URL: " + URL);
        Utilidades.log("[data.service.ts] - getobtenerPublicacionesContratadasPorCliente | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getDesactivarPublicacion(id:number){
        var URL : string = this.baseUrl + '/api/Publicacion/deshabilitarPublicacion/' + id;

        Utilidades.log("[data.service.ts] - getDesactivarPublicacion | URL: " + URL);
        Utilidades.log("[data.service.ts] - getDesactivarPublicacion | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getActivarPublicacion(id:number){
        var URL : string = this.baseUrl + '/api/Publicacion/habilitarPublicacion/' + id;

        Utilidades.log("[data.service.ts] - getActivarPublicacion | URL: " + URL);
        Utilidades.log("[data.service.ts] - getActivarPublicacion | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getPublicacion(id:number){
        var URL : string = this.baseUrl + '/api/Publicacion/obtener/' + id;

        Utilidades.log("[data.service.ts] - getActivarPublicacion | URL: " + URL);
        Utilidades.log("[data.service.ts] - getActivarPublicacion | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    public putActualizarPublicacion(publicacion:Publicacion){
        var URL : string = this.baseUrl + '/api/Publicacion/actualizarPublicacion';
        let body = JSON.stringify(publicacion);
        
        Utilidades.log("[data.service.ts] - putActualizarPublicacion | URL: " + URL);
        Utilidades.log("[data.service.ts] - putActualizarPublicacion | body: " + body);
        Utilidades.log("[data.service.ts] - putActualizarPublicacion | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.put(URL, body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    public getPublicacionesServicioOferta(id:number){
        var URL : string = this.baseUrl + '/api/Publicacion/obtenerPublicacionesServicioOferta/' + id;

        Utilidades.log("[data.service.ts] - getPublicacionesServicioOferta | URL: " + URL);
        Utilidades.log("[data.service.ts] - getPublicacionesServicioOferta | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

     public getObtenerPublicacionesClienteSolicitud(id:number){
        var URL : string = this.baseUrl + '/api/Publicacion/obtenerPublicacionesClienteSolicitud/' + id;

        Utilidades.log("[data.service.ts] - getObtenerPublicacionesCliente | URL: " + URL);
        Utilidades.log("[data.service.ts] - getObtenerPublicacionesCliente | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getUltimoIdPublicacionCliente(id:number){
        var URL : string = this.baseUrl + '/api/Publicacion/obtenerUltimoIdPublicacionCliente/' + id;

        Utilidades.log("[data.service.ts] - getUltimoIdPublicacionCliente | URL: " + URL);
        Utilidades.log("[data.service.ts] - getUltimoIdPublicacionCliente | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    public getPublicacionesServicioSolicitud(id:number){
        var URL : string = this.baseUrl + '/api/Publicacion/obtenerPublicacionesServicioSolicitud/' + id;

        Utilidades.log("[data.service.ts] - getPublicacionesServicioSolicitud | URL: " + URL);
        Utilidades.log("[data.service.ts] - getPublicacionesServicioSolicitud | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    public postIngresarPresupuesto(presupuesto:Presupuesto){
        var URL : string = this.baseUrl + '/api/Publicacion/altaPresupuesto';
        let body = JSON.stringify(presupuesto);

        Utilidades.log("[data.service.ts] - postIngresarPresupuesto | URL: " + URL);
        Utilidades.log("[data.service.ts] - postIngresarPresupuesto | body: " + JSON.stringify(body));
        Utilidades.log("[data.service.ts] - postIngresarPresupuesto | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.post(URL, body, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    public getObtenerPresupuestos(id:number){
        var URL : string = this.baseUrl + '/api/Publicacion/obtenerPresupuestos/' + id;

        Utilidades.log("[data.service.ts] - getObtenerPresupuestos | URL: " + URL);
        Utilidades.log("[data.service.ts] - getObtenerPresupuestos | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }
    public putAceptarPresupuesto(presupuesto:Presupuesto){
        var URL : string = this.baseUrl + '/api/Publicacion/aceptarPresupuesto';
        let body = JSON.stringify(presupuesto);
        
        Utilidades.log("[data.service.ts] - putAceptarPresupuesto | URL: " + URL);
        Utilidades.log("[data.service.ts] - putAceptarPresupuesto | body: " + body);
        Utilidades.log("[data.service.ts] - putAceptarPresupuesto | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.put(URL, body, { headers: this.contentHeadersJson })
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
        Utilidades.log("[data.service.ts] - getCarroObtenerTodos | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    //Prueba llamando un método por Get con parámetro (Obtiene el carro con el id que se pasa)
    //Retorna un Carro
    public getCarroObtenerPorId(id:number){
        var URL : string = this.baseUrl + '/api/Carro/obtener/' + id;

        Utilidades.log("[data.service.ts] - getCarroObtenerPorId | URL: " + URL);
        Utilidades.log("[data.service.ts] - getCarroObtenerPorId | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.get(URL, { headers: this.contentHeadersJson })
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
        Utilidades.log("[data.service.ts] - postCarroAlta | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.post(URL, body, { headers: this.contentHeadersJson })
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
        Utilidades.log("[data.service.ts] - putCarroActualizar | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.put(URL, body, { headers: this.contentHeadersJson })
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
        Utilidades.log("[data.service.ts] - deleteCarroEliminar | headers: " + JSON.stringify({ headers: this.contentHeadersJson }));

        return this.http.delete(URL, { body: body, headers: this.contentHeadersJson })
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
