"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cliente_1 = require("./cliente");
var solicitud_1 = require("./solicitud");
var Presupuesto = (function () {
    function Presupuesto() {
        this.Cliente = new cliente_1.Cliente();
        this.Solicitud = new solicitud_1.Solicitud();
    }
    return Presupuesto;
}());
exports.Presupuesto = Presupuesto;
//# sourceMappingURL=presupuesto.js.map