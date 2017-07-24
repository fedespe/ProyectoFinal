"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utilidades_1 = require("./utilidades");
var servicio_1 = require("./servicio");
var cliente_1 = require("./cliente");
var error_1 = require("./error");
var contacto_1 = require("./contacto");
var Publicacion = (function () {
    function Publicacion() {
        this.Imagenes = [];
        this.Servicio = new servicio_1.Servicio();
        this.Cliente = new cliente_1.Cliente();
        this.Respuestas = [];
        this.ContactoConComentarioPendiente = new contacto_1.Contacto();
    }
    Publicacion.prototype.validarDatos1 = function () {
        utilidades_1.Utilidades.log("[publicacion.ts] - validarDatos | this: " + JSON.stringify(this));
        var error;
        var errores = [];
        if (this.Titulo == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe ingresar un título a la publicación.";
            errores.push(error);
        }
        else {
            if (this.Titulo.trim().length < 3) {
                error = new error_1.Error();
                error.Descripcion = "El título debe tener al menos 3 caracteres.";
                errores.push(error);
            }
        }
        if (this.Servicio.Id == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe seleccionar un servicio.";
            errores.push(error);
        }
        if (this.Servicio.Id == 0) {
            error = new error_1.Error();
            error.Descripcion = "Debe seleccionar un servicio.";
            errores.push(error);
        }
        if (this.Descripcion == null) {
            this.Descripcion = "Sin descripción.";
        }
        return errores;
    };
    Publicacion.prototype.validarDatos = function () {
        utilidades_1.Utilidades.log("[publicacion.ts] - validarDatos | this: " + JSON.stringify(this));
        var error;
        var errores = [];
        if (this.Titulo == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe ingresar un título a la publicación.";
            errores.push(error);
        }
        else {
            if (this.Titulo.trim().length < 3) {
                error = new error_1.Error();
                error.Descripcion = "El título debe tener al menos 3 caracteres.";
                errores.push(error);
            }
        }
        if (this.Imagenes == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe ingresar al menos una imagen.";
            errores.push(error);
        }
        if (this.Servicio.Id == null) {
            error = new error_1.Error();
            error.Descripcion = "Debe seleccionar un servicio.";
            errores.push(error);
        }
        if (this.Servicio.Id == 0) {
            error = new error_1.Error();
            error.Descripcion = "Debe seleccionar un servicio.";
            errores.push(error);
        }
        if (this.Descripcion == null) {
            this.Descripcion = "Sin descripción.";
        }
        return errores;
    };
    return Publicacion;
}());
exports.Publicacion = Publicacion;
//# sourceMappingURL=publicacion.js.map