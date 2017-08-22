import { Cliente } from "./cliente";
import { Publicacion } from "./publicacion";
import { Contacto } from "./contacto";
import { Utilidades } from "./utilidades";
import { Error } from "./error";

export class ComentarioPuntuacion {
    Id: number;
    Comentario: string;
    Fecha: Date;
    Respuesta: string;
    Puntuacion: number=0;
    Cliente:Cliente = new Cliente();
    Publicacion: Publicacion;
    Contacto:Contacto;


    public validarDatos(): Error[]{
        Utilidades.log("[comentarioPuntuacion.ts] - validarDatos | this: " + JSON.stringify(this));

        var error : Error;
        var errores : Error[] = [];

        if(this.Comentario==null || this.Comentario==""){
            error = new Error();
            error.Descripcion = "El comentario no puede estar vacio.";
            errores.push(error);
        }else{
            if(this.Comentario.length<2){
                error = new Error();
                error.Descripcion = "El comentario debe tener al menos 2 caracteres.";
                errores.push(error);
            }
        }
        
        return errores
    }
}

