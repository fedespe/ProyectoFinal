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
        var errores = [];
        if (this.Comentario == null || this.Comentario.trim() == "") {
            var error = new error_1.Error();
            error.Descripcion = "El comentario no puede estar vacio.";
            errores.push(error);
        }
        else {
            if (this.Comentario.trim().length < 2) {
                var error = new error_1.Error();
                error.Descripcion = "El comentario debe tener al menos 2 caracteres.";
                errores.push(error);
            }
        }
        if (this.Puntuacion <= 0 || this.Puntuacion > 5) {
            var error = new error_1.Error();
            error.Descripcion = "Debe indicar una calificación entre 1 y 5 estrellas.";
            errores.push(error);
        }
        return errores;
    };
    return ComentarioPuntuacion;
}());
exports.ComentarioPuntuacion = ComentarioPuntuacion;
//# sourceMappingURL=comentarioPuntuacion.js.map