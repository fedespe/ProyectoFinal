import { Utilidades } from "./utilidades";
import { Error } from "./error";
import { Barrio } from "./barrio";

export class Cliente {
    Id: number;
    Nombre: string;
    Apellido: string;
    NombreUsuario: string;
    Contrasena: string;
    Habilitado: boolean;
    CorreoElectronico: string;
    Telefono: string;
    Direccion: string;
    Barrio: Barrio; 
    Imagen: string;

    constructor() {      
        this.Barrio = new Barrio();
        this.Barrio.Id=0;
    }

//VER QUE VALIDAR DATOS 1 Y 2 SE REALIZARON DESPUES CON LA LOGICA PARA LOS STEPS... 
//CAPAZ ABRIA QUE SACAR VALIDAR DATOS Y ACTUALIZACION DE DATOS... 
//NO SE ELIMINARON POR EL MOMENTO POR QUE SE ESTAN UTILIZANDO EN EDITAR USUARIO
    public validarDatos1(): Error[]{
        Utilidades.log("[cliente.ts] - validarDatos1 | this: " + JSON.stringify(this));

        var error : Error;
        var errores : Error[] = [];

        if(this.Nombre == null){
            error = new Error();
            error.Descripcion = "Debe ingresar un nombre.";
            errores.push(error);
        }else{
            if(this.Nombre.trim().length < 2){
                error = new Error();
                error.Descripcion = "El nombre debe tener al menos 2 caracteres.";
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
                error.Descripcion = "El apellido debe tener al menos 2 caracteres.";
                errores.push(error);
            }
            if(this.Apellido.trim().length > 30){
                error = new Error();
                error.Descripcion = "El apellido no puede tener más de 30 caracteres.";
                errores.push(error);
            }
        }

        if(this.CorreoElectronico == null){
            error = new Error();
            error.Descripcion = "Debe ingresar un correo electrónico.";
            errores.push(error);
        }else{
            var regExp = new RegExp("\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*");
            var test = regExp.test(this.CorreoElectronico);
            if(!test){
                error = new Error();
                error.Descripcion = "Correo electrónico no valido. El correo electrónico debe tener una arroba y un punto.";
                errores.push(error);
            }
        }   

        if(this.Telefono == null){
            error = new Error();
            error.Descripcion = "Debe ingresar un teléfono.";
            errores.push(error);
        }else{
            if(this.Telefono.trim().length < 6){
                error = new Error();
                error.Descripcion = "El teléfono debe tener al menos 6 caracteres.";
                errores.push(error);
            }
            if(this.Telefono.trim().length > 20){
                error = new Error();
                error.Descripcion = "El teléfono no puede tener más de 20 caracteres.";
                errores.push(error);
            }
        }
        
        if(this.Direccion == null){
            error = new Error();
            error.Descripcion = "Debe ingresar una dirección.";
            errores.push(error);
        }else{
            if(this.Direccion.trim().length < 4){
                error = new Error();
                error.Descripcion = "La dirección debe tener al menos 4 caracteres.";
                errores.push(error);
            }
            if(this.Direccion.trim().length > 100){
                error = new Error();
                error.Descripcion = "La dirección no puede tener más de 100 caracteres.";
                errores.push(error);
            }
        }
        if(this.Barrio.Id == 0){
            error = new Error();
            error.Descripcion = "Debe seleccionar un barrio.";
            errores.push(error);
        }

        return errores
    }

    public validarDatos2(contrasenaConfirmacion:string): Error[]{
        Utilidades.log("[cliente.ts] - validarDatos2 | this: " + JSON.stringify(this));

        var error : Error;
        var errores : Error[] = [];

        if(this.NombreUsuario == null){
            error = new Error();
            error.Descripcion = "Debe ingresar un nombre de usuario.";
            errores.push(error);
        }else{
            if(this.NombreUsuario.trim().length < 3){
                error = new Error();
                error.Descripcion = "El nombre de usuario debe tener al menos 3 caracteres.";
                errores.push(error);
            }
            if(this.NombreUsuario.trim().length > 50){
                error = new Error();
                error.Descripcion = "El nombre de usuario no puede tener más de 50 caracteres.";
                errores.push(error);
            }
        }

        errores = errores.concat(this.validarContrasena(contrasenaConfirmacion));

        return errores
    }


    //Para validar los datos de alta de un cliente, ver que se separo la validacion de la contrase;a y la validacion de los datos a actualizar para reuso de codigo
    public validarDatos(contrasenaConfirmacion:string) : Error[]{
        Utilidades.log("[cliente.ts] - validarDatos | this: " + JSON.stringify(this));

        var error : Error;
        var errores : Error[] = [];

        errores = errores.concat(this.validarActualizacionUsuario());
        errores = errores.concat(this.validarContrasena(contrasenaConfirmacion));
        
        if(this.NombreUsuario == null){
            error = new Error();
            error.Descripcion = "Debe ingresar un nombre de usuario.";
            errores.push(error);
        }else{
            if(this.NombreUsuario.trim().length < 3){
                error = new Error();
                error.Descripcion = "El nombre de usuario debe tener al menos 3 caracteres.";
                errores.push(error);
            }
            if(this.NombreUsuario.trim().length > 50){
                error = new Error();
                error.Descripcion = "El nombre de usuario no puede tener más de 50 caracteres.";
                errores.push(error);
            }
        }
        
        if(this.CorreoElectronico == null){
            error = new Error();
            error.Descripcion = "Debe ingresar un correo electrónico.";
            errores.push(error);
        }               
        
        return errores;
    }
    public validarActualizacionUsuario() : Error[]{
        Utilidades.log("[cliente.ts] - validarActualizacionUsuario | this: " + JSON.stringify(this));

        var error : Error;
        var errores : Error[] = [];

        if(this.Nombre == null){
            error = new Error();
            error.Descripcion = "Debe ingresar un nombre.";
            errores.push(error);
        }else{
            if(this.Nombre.trim().length < 2){
                error = new Error();
                error.Descripcion = "El nombre debe tener al menos 2 caracteres.";
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
                error.Descripcion = "El apellido debe tener al menos 2 caracteres.";
                errores.push(error);
            }
            if(this.Apellido.trim().length > 30){
                error = new Error();
                error.Descripcion = "El apellido no puede tener más de 30 caracteres.";
                errores.push(error);
            }
        }

        if(this.Telefono == null){
            error = new Error();
            error.Descripcion = "Debe ingresar un teléfono.";
            errores.push(error);
        }else{
            if(this.Telefono.trim().length < 6){
                error = new Error();
                error.Descripcion = "El teléfono debe tener al menos 6 caracteres.";
                errores.push(error);
            }
            if(this.Telefono.trim().length > 20){
                error = new Error();
                error.Descripcion = "El teléfono no puede tener más de 20 caracteres.";
                errores.push(error);
            }
        }
        
        if(this.Direccion == null){
            error = new Error();
            error.Descripcion = "Debe ingresar una dirección.";
            errores.push(error);
        }else{
            if(this.Direccion.trim().length < 4){
                error = new Error();
                error.Descripcion = "La dirección debe tener al menos 4 caracteres.";
                errores.push(error);
            }
            if(this.Direccion.trim().length > 100){
                error = new Error();
                error.Descripcion = "La dirección no puede tener más de 100 caracteres.";
                errores.push(error);
            }
        }
        if(this.Barrio.Id == 0){
            error = new Error();
            error.Descripcion = "Debe seleccionar un barrio.";
            errores.push(error);
        }

        return errores
    }

    public validarContrasena(contrasenaConfirmacion:string) : Error[]{
        Utilidades.log("[cliente.ts] - validarContrasena | this: " + JSON.stringify(this));

        var error : Error;
        var errores : Error[] = [];

        if(this.Contrasena == null){
            error = new Error();
            error.Descripcion = "Debe ingresar una contraseña.";
            errores.push(error);
        }else{
            if(this.Contrasena.trim().length < 8){
                error = new Error();
                error.Descripcion = "La contraseña debe tener al menos 8 caracteres.";
                errores.push(error);
            }            
        }

        if(contrasenaConfirmacion == null){
            error = new Error();
            error.Descripcion = "Debe ingresar la confirmación de la contraseña.";
            errores.push(error);
        }else{
            if(this.Contrasena!=contrasenaConfirmacion){
                error = new Error();
                error.Descripcion = "La confirmación de la contraseña no coincide con la contraseña.";
                errores.push(error);
            }            
        }

        return errores
    }   


}