import { Utilidades } from "./utilidades";
import { Error } from "./error";

export class ActualizarContrasena {
    IdUsuario: number;
    Contrasena: string;
    ContrasenaNueva: string;
    ConfirmacionContrasenaNueva:string;


    public validarCambioContrasena() : Error[]{
        Utilidades.log("[cliente.ts] - validarCambioContrasena | this: " + JSON.stringify(this));

        var error : Error;
        var errores : Error[] = [];

        if(this.Contrasena == null || this.Contrasena.trim() == ""){
            error = new Error();
            error.Descripcion = "Debe ingresar una contraseña.";
            errores.push(error);
        }

        if(this.ContrasenaNueva == null || this.ContrasenaNueva.trim() == ""){
            error = new Error();
            error.Descripcion = "Debe ingresar una contraseña nueva.";
            errores.push(error);
        }else{
            if(this.ContrasenaNueva.trim().length < 8){
                error = new Error();
                error.Descripcion = "La contraseña nueva debe tener al menos 8 caracteres.";
                errores.push(error);
            }            
        }
        if(this.ContrasenaNueva != this.ConfirmacionContrasenaNueva){
            error = new Error();
            error.Descripcion = "La contraseña nueva no coincide con la confirmación.";
            errores.push(error);
        }

        return errores
    }
}

