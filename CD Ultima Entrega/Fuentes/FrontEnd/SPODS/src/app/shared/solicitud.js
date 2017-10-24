"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var publicacion_1 = require("./publicacion");
var Solicitud = (function (_super) {
    __extends(Solicitud, _super);
    function Solicitud() {
        var _this = _super.call(this) || this;
        _this.Presupuestos = [];
        return _this;
    }
    return Solicitud;
}(publicacion_1.Publicacion));
exports.Solicitud = Solicitud;
//# sourceMappingURL=solicitud.js.map