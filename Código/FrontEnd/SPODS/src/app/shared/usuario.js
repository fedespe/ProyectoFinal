/**
 * Created by Bruno on 23/04/2017.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Usuario = (function () {
    function Usuario(nombre, apellido, email, website, tipo, paisId, ciudad, password) {
        this.UsuarioNombre = nombre;
        this.UsuarioApellido = apellido;
        this.UsuarioEmail = email;
        this.UsuarioSitioWeb = website;
        this.TipoUsuario = tipo;
        this.PaisId = paisId;
        this.UsuarioCiudad = ciudad;
        this.UsuarioPassword = password;
    }
    return Usuario;
}());
exports.Usuario = Usuario;
//# sourceMappingURL=usuario.js.map