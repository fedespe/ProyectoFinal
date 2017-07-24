import { Utilidades } from "./utilidades";
import { Servicio } from "./servicio";
import { Cliente } from "./cliente";
import { Respuesta } from "./respuesta";
import { Error } from "./error";
import { Contacto } from "./contacto";

export class Publicacion {
    Id: number;
    Titulo: string;
    Descripcion: string;
    Activa: boolean;
    FechaAlta: Date;
    FechaVencimiento: Date;
    Tipo: string;
    Imagenes: string[] = [];
    Servicio: Servicio=new Servicio();
    Cliente: Cliente=new Cliente();
    Respuestas: Respuesta[] = [];
    ContactoConComentarioPendiente: Contacto= new Contacto();
    

    constructor() {      
    }
    
    public validarDatos1() : Error[]{
        Utilidades.log("[publicacion.ts] - validarDatos | this: " + JSON.stringify(this));

        var error : Error;
        var errores : Error[] = [];
        
        if(this.Titulo == null){
            error = new Error();
            error.Descripcion = "Debe ingresar un título a la publicación.";
            errores.push(error);
        }else{
            if(this.Titulo.trim().length < 3){
                error = new Error();
                error.Descripcion = "El título debe tener al menos 3 caracteres.";
                errores.push(error);
            }
        }  

        if(this.Servicio.Id == null){
            error = new Error();
            error.Descripcion = "Debe seleccionar un servicio.";
            errores.push(error);
        }   
        if(this.Servicio.Id == 0){
            error = new Error();
            error.Descripcion = "Debe seleccionar un servicio.";
            errores.push(error);
        }     
        if(this.Descripcion == null){
            this.Descripcion="Sin descripción.";
        }      
        
        return errores;
    }

public validarDatos() : Error[]{
        Utilidades.log("[publicacion.ts] - validarDatos | this: " + JSON.stringify(this));

        var error : Error;
        var errores : Error[] = [];
        
        if(this.Titulo == null){
            error = new Error();
            error.Descripcion = "Debe ingresar un título a la publicación.";
            errores.push(error);
        }else{
            if(this.Titulo.trim().length < 3){
                error = new Error();
                error.Descripcion = "El título debe tener al menos 3 caracteres.";
                errores.push(error);
            }
        }
        
        if(this.Imagenes == null){
            error = new Error();
            error.Descripcion = "Debe ingresar al menos una imagen.";
            errores.push(error);
        }     

        if(this.Servicio.Id == null){
            error = new Error();
            error.Descripcion = "Debe seleccionar un servicio.";
            errores.push(error);
        }   
        if(this.Servicio.Id == 0){
            error = new Error();
            error.Descripcion = "Debe seleccionar un servicio.";
            errores.push(error);
        }     
        if(this.Descripcion == null){
            this.Descripcion="Sin descripción.";
        }      
        
        return errores;
    }

}