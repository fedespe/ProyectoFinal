"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Settings = (function () {
    function Settings() {
    }
    return Settings;
}());
//Desarrollo
//public static debug : boolean = true; //Variable para escribir o dejar de escribir en consola
//public static baseUrl : string = 'http://localhost:6075'; //Servicios
//public static srcImg : string = 'http://localhost:39770';//Backend (COn esta URL se arma el SRC de los IFrame para las imágenes)
//Producción
//La variable de debug en realidad va en false en producción, pero por ahora la dejamos en true para poder verificar si saltan errores cuando vamos subiendo las versiones
Settings.debug = true; //Variable para escribir o dejar de escribir en consola
Settings.baseUrl = 'http://api.spods.isamarina.com'; //Desarollo - Servicios
Settings.srcImg = 'http://backend.spods.isamarina.com'; //Desarrollo - Backend (Con esta URL se arma el SRC de los IFrame para las imágenes)
exports.Settings = Settings;
//# sourceMappingURL=settings.js.map