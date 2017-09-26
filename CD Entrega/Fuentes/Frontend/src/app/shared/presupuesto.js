"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilidades_1 = require("./utilidades");
var cliente_1 = require("./cliente");
var error_1 = require("./error");
var solicitud_1 = require("./solicitud");
var Presupuesto = (function () {
    function Presupuesto() {
        this.Cliente = new cliente_1.Cliente();
        this.Solicitud = new solicitud_1.Solicitud();
    }
    Presupuesto.prototype.validarDatos = function () {
        utilidades_1.Utilidades.log("[presupuesto.ts] - validarDatos | this: " + JSON.stringify(this));
        var error;
        var errores = [];
        if (this.Comentario == null || this.Comentario == "") {
            error = new error_1.Error();
            error.Descripcion = "El comentario no puede estar vacio.";
            errores.push(error);
        }
        return errores;
    };
    return Presupuesto;
}());
exports.Presupuesto = Presupuesto;
//# sourceMappingURL=presupuesto.js.map