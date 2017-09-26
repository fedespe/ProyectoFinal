"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cliente_1 = require("./cliente");
var comentarioPuntuacion_1 = require("./comentarioPuntuacion");
var Contacto = (function () {
    function Contacto() {
        this.Id = 0;
        this.Cliente = new cliente_1.Cliente();
        this.ComentarioPuntuacion = new comentarioPuntuacion_1.ComentarioPuntuacion();
    }
    return Contacto;
}());
exports.Contacto = Contacto;
//# sourceMappingURL=contacto.js.map