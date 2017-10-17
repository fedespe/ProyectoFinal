import { Utilidades } from "./utilidades";
import { Servicio } from "./servicio";
import { Cliente } from "./cliente";
import { Respuesta } from "./respuesta";
import { Error } from "./error";
import { Solicitud } from "./solicitud";

export class Presupuesto {
    Id: number;
    Cliente: Cliente=new Cliente();
    Comentario: string;
    Aceptado:boolean;
    Solicitud: Solicitud= new Solicitud();
    

    constructor() {      
    }
    public validarDatos(): Error[]{
        Utilidades.log("[presupuesto.ts] - validarDatos | this: " + JSON.stringify(this));

        var error : Error;
        var errores : Error[] = [];

        if(this.Comentario==null || this.Comentario==""){
            error = new Error();
            error.Descripcion = "El comentario no puede estar vacio.";
            errores.push(error);
        }
        
        return errores
    }
}