/**
 * Created by Bruno on 23/04/2017.
 */

export class Usuario{
    UsuarioGUId: string;
    UsuarioNombre:string;
    UsuarioApellido: string;
    UsuarioEmail: string;
    UsuarioSitioWeb: string;
    TipoUsuario: string;
    PaisId:string;
    PaisNombre: string;
    UsuarioCiudad: string;
    UsuarioPassword: string;

    constructor(nombre:string,apellido:string,email:string,website:string,tipo:string,paisId:string,ciudad:string,password:string){
        this.UsuarioNombre = nombre;
        this.UsuarioApellido = apellido;
        this.UsuarioEmail = email;
        this.UsuarioSitioWeb = website;
        this.TipoUsuario = tipo;
        this.PaisId = paisId;
        this.UsuarioCiudad = ciudad;
        this.UsuarioPassword = password;
    }
}