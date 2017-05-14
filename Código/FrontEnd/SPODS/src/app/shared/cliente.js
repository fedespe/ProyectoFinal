"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("./error");
var Cliente = (function () {
    function Cliente() {
    }
    Cliente.prototype.validarDatos = function () {
        console.log("[cliente.ts] - validarDatos | cliente: " + JSON.stringify(this));
        var errores = [];
        var error;
        if (this.Nombre == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe ingresar un nombre.";
            errores.push(error);
        }
        else {
            if (this.Nombre.trim().length < 2) {
                error = new error_1.Error();
                error.Descripcion = "El nombre debe tener al menos 2 carateres.";
                errores.push(error);
            }
            if (this.Nombre.trim().length > 20) {
                error = new error_1.Error();
                error.Descripcion = "El nombre no puede tener más de 20 caracteres.";
                errores.push(error);
            }
        }
        if (this.Nombre == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe ingresar un apellido.";
            errores.push(error);
        }
        else {
            if (this.Apellido.trim().length < 2) {
                error = new error_1.Error();
                error.Descripcion = "El apellido debe tener al menos 2 carateres.";
                errores.push(error);
            }
            if (this.Apellido.trim().length > 20) {
                error = new error_1.Error();
                error.Descripcion = "El apellido no puede tener más de 20 caracteres.";
                errores.push(error);
            }
        }
        return errores;
    };
    return Cliente;
}());
exports.Cliente = Cliente;
//# sourceMappingURL=cliente.js.map