import { Utilidades } from "./utilidades";
import { Error } from "./error";
import { Barrio } from "./barrio";

export class Cliente {
    Id: number;
    Nombre: string;
    Apellido: string;
    NombreUsuario: string;
    CorreoElectronico: string;
    Contrasena: string;
    Telefono: string;
    Habilitado: boolean;
    Documento: string;
    Direccion: string;
    Barrio: Barrio;

    public validarDatos() : Error[]{
        Utilidades.log("[cliente.ts] - validarDatos | this: " + JSON.stringify(this));

        var error : Error;
        var errores : Error[] = [];

        if(this.Nombre == null){
            error = new Error();
            error.Descripcion = "Debe ingresar un nombre.";
            errores.push(error);
        }else{
            if(this.Nombre.trim().length < 2){
                error = new Error();
                error.Descripcion = "El nombre debe tener al menos 2 carateres.";
                errores.push(error);
            }
            if(this.Nombre.trim().length > 20){
                error = new Error();
                error.Descripcion = "El nombre no puede tener más de 20 caracteres.";
                errores.push(error);
            }
        }
        
        if(this.Apellido == null){
            error = new Error();
            error.Descripcion = "Debe ingresar un apellido.";
            errores.push(error);
        }else{
            if(this.Apellido.trim().length < 2){
                error = new Error();
                error.Descripcion = "El apellido debe tener al menos 2 carateres.";
                errores.push(error);
            }
            if(this.Apellido.trim().length > 20){
                error = new Error();
                error.Descripcion = "El apellido no puede tener más de 20 caracteres.";
                errores.push(error);
            }
        }

        // if(this.Barrio == null){
        //     error = new Error();
        //     error.Descripcion = "Debe seleccionar un barrio.";
        //     errores.push(error);
        // }
        
        return errores;
    }
}