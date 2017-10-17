"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var settings_1 = require("./settings");
var Utilidades = (function () {
    function Utilidades() {
    }
    Utilidades.log = function (texto) {
        if (settings_1.Settings.debug) {
            console.log(texto);
        }
    };
    return Utilidades;
}());
exports.Utilidades = Utilidades;
//# sourceMappingURL=utilidades.js.map