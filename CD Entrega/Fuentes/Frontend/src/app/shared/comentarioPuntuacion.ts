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

        var errores : Error[] = [];

        if(this.Comentario==null || this.Comentario.trim()==""){
            var error:Error = new Error();
            error.Descripcion = "El comentario no puede estar vacio.";
            errores.push(error);
        }else{
            if(this.Comentario.trim().length<2){
                var error:Error = new Error();
                error.Descripcion = "El comentario debe tener al menos 2 caracteres.";
                errores.push(error);
            }
        }
        if(this.Puntuacion <= 0 || this.Puntuacion > 5){
            var error:Error = new Error();
            error.Descripcion = "Debe indicar una calificación entre 1 y 5 estrellas.";
            errores.push(error);
        }
        
        return errores
    }
}

