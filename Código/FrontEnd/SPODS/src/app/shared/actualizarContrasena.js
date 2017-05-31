"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilidades_1 = require("./utilidades");
var error_1 = require("./error");
var ActualizarContrasena = (function () {
    function ActualizarContrasena() {
    }
    ActualizarContrasena.prototype.validarCambioContrasena = function () {
        utilidades_1.Utilidades.log("[cliente.ts] - validarCambioContrasena | this: " + JSON.stringify(this));
        var error;
        var errores = [];
        if (this.Contrasena == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe ingresar una contraseña.";
            errores.push(error);
        }
        if (this.ContrasenaNueva == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe ingresar una contraseña nueva.";
            errores.push(error);
        }
        else {
            if (this.ContrasenaNueva.trim().length < 8) {
                error = new error_1.Error();
                error.Descripcion = "La contraseña nueva debe tener al menos 8 caracteres.";
                errores.push(error);
            }
        }
        if (this.ContrasenaNueva != this.ConfirmacionContrasenaNueva) {
            error = new error_1.Error();
            error.Descripcion = "La contraseña nueva no coincide con la confirmación.";
            errores.push(error);
        }
        return errores;
    };
    return ActualizarContrasena;
}());
exports.ActualizarContrasena = ActualizarContrasena;
//# sourceMappingURL=actualizarContrasena.js.map