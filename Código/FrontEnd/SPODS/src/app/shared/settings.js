"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Settings = (function () {
    function Settings() {
    }
    return Settings;
}());
//Desarrollo
Settings.debug = true; //Variable para escribir o dejar de escribir en consola
Settings.baseUrl = 'http://localhost:6075'; //Servicios
Settings.srcImg = 'http://localhost:39770'; //Backend (COn esta URL se arma el SRC de los IFrame para las imágenes)
exports.Settings = Settings;
//# sourceMappingURL=settings.js.map