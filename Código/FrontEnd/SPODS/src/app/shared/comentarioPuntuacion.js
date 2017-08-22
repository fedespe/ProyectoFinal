"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cliente_1 = require("./cliente");
var utilidades_1 = require("./utilidades");
var error_1 = require("./error");
var ComentarioPuntuacion = (function () {
    function ComentarioPuntuacion() {
        this.Puntuacion = 0;
        this.Cliente = new cliente_1.Cliente();
    }
    ComentarioPuntuacion.prototype.validarDatos = function () {
        utilidades_1.Utilidades.log("[comentarioPuntuacion.ts] - validarDatos | this: " + JSON.stringify(this));
        var error;
        var errores = [];
        if (this.Comentario == null || this.Comentario == "") {
            error = new error_1.Error();
            error.Descripcion = "El comentario no puede estar vacio.";
            errores.push(error);
        }
        else {
            if (this.Comentario.length < 2) {
                error = new error_1.Error();
                error.Descripcion = "El comentario debe tener al menos 2 caracteres.";
                errores.push(error);
            }
        }
        return errores;
    };
    return ComentarioPuntuacion;
}());
exports.ComentarioPuntuacion = ComentarioPuntuacion;
//# sourceMappingURL=comentarioPuntuacion.js.map