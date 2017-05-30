"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilidades_1 = require("./utilidades");
var error_1 = require("./error");
var barrio_1 = require("./barrio");
var Cliente = (function () {
    function Cliente() {
        this.Barrio = new barrio_1.Barrio();
        this.Barrio.Id = 0;
    }
    //Para validar los datos de alta de un cliente, ver que se separo la validacion de la contrase;a y la validacion de los datos a actualizar para reuso de codigo
    Cliente.prototype.validarDatos = function (contrasenaConfirmacion) {
        utilidades_1.Utilidades.log("[cliente.ts] - validarDatos | this: " + JSON.stringify(this));
        var error;
        var errores = [];
        errores = errores.concat(this.validarActualizacionUsuario());
        errores = errores.concat(this.validarContrasena(contrasenaConfirmacion));
        if (this.NombreUsuario == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe ingresar un nombre de usuario.";
            errores.push(error);
        }
        else {
            if (this.NombreUsuario.trim().length < 3) {
                error = new error_1.Error();
                error.Descripcion = "El nombre de usuario debe tener al menos 3 caracteres.";
                errores.push(error);
            }
            if (this.NombreUsuario.trim().length > 50) {
                error = new error_1.Error();
                error.Descripcion = "El nombre de usuario no puede tener más de 50 caracteres.";
                errores.push(error);
            }
        }
        if (this.CorreoElectronico == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe ingresar un correo electrónico.";
            errores.push(error);
        }
        if (this.Barrio.Id == 0) {
            error = new error_1.Error();
            error.Descripcion = "Debe seleccionar un barrio.";
            errores.push(error);
        }
        return errores;
    };
    Cliente.prototype.validarActualizacionUsuario = function () {
        utilidades_1.Utilidades.log("[cliente.ts] - validarContrasena | this: " + JSON.stringify(this));
        var error;
        var errores = [];
        if (this.Nombre == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe ingresar un nombre.";
            errores.push(error);
        }
        else {
            if (this.Nombre.trim().length < 2) {
                error = new error_1.Error();
                error.Descripcion = "El nombre debe tener al menos 2 caracteres.";
                errores.push(error);
            }
            if (this.Nombre.trim().length > 20) {
                error = new error_1.Error();
                error.Descripcion = "El nombre no puede tener más de 20 caracteres.";
                errores.push(error);
            }
        }
        if (this.Apellido == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe ingresar un apellido.";
            errores.push(error);
        }
        else {
            if (this.Apellido.trim().length < 2) {
                error = new error_1.Error();
                error.Descripcion = "El apellido debe tener al menos 2 caracteres.";
                errores.push(error);
            }
            if (this.Apellido.trim().length > 30) {
                error = new error_1.Error();
                error.Descripcion = "El apellido no puede tener más de 30 caracteres.";
                errores.push(error);
            }
        }
        if (this.Telefono == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe ingresar un teléfono.";
            errores.push(error);
        }
        else {
            if (this.Telefono.trim().length < 6) {
                error = new error_1.Error();
                error.Descripcion = "El teléfono debe tener al menos 6 caracteres.";
                errores.push(error);
            }
            if (this.Telefono.trim().length > 20) {
                error = new error_1.Error();
                error.Descripcion = "El teléfono no puede tener más de 20 caracteres.";
                errores.push(error);
            }
        }
        if (this.Direccion == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe ingresar una dirección.";
            errores.push(error);
        }
        else {
            if (this.Direccion.trim().length < 4) {
                error = new error_1.Error();
                error.Descripcion = "La dirección debe tener al menos 4 caracteres.";
                errores.push(error);
            }
            if (this.Direccion.trim().length > 100) {
                error = new error_1.Error();
                error.Descripcion = "La dirección no puede tener más de 100 caracteres.";
                errores.push(error);
            }
        }
        return errores;
    };
    Cliente.prototype.validarContrasena = function (contrasenaConfirmacion) {
        utilidades_1.Utilidades.log("[cliente.ts] - validarContrasena | this: " + JSON.stringify(this));
        var error;
        var errores = [];
        if (this.Contrasena == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe ingresar una contraseña.";
            errores.push(error);
        }
        else {
            if (this.Contrasena.trim().length < 8) {
                error = new error_1.Error();
                error.Descripcion = "La contraseña debe tener al menos 8 caracteres.";
                errores.push(error);
            }
        }
        if (contrasenaConfirmacion == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe ingresar la confirmación de la contraseña.";
            errores.push(error);
        }
        else {
            if (this.Contrasena != contrasenaConfirmacion) {
                error = new error_1.Error();
                error.Descripcion = "La confirmación de la contraseña no coincide con la contraseña.";
                errores.push(error);
            }
        }
        return errores;
    };
    return Cliente;
}());
exports.Cliente = Cliente;
//# sourceMappingURL=cliente.js.map