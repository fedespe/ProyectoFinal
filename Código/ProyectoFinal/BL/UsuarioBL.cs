using DAL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class UsuarioBL
    {
        private UsuarioDAL usuarioDAL = new UsuarioDAL();
        protected void validarUsuario(Usuario usu)
        {
            validarActualizacionUsuario(usu);
            validarContrasena(usu.Contrasena);
            if (usu.NombreUsuario.Length < 3 || usu.NombreUsuario.Length > 50)
            {
                throw new ProyectoException("Error: NombreUsuario");
            }
            //Verificar metodo de comprobar email.
            if (!(ET.Utilidades.ComprobarFormatoEmail(usu.CorreoElectronico)))
            {
                throw new ProyectoException("Error: CorreoElectronico");
            }
            if (existeCorreoElectronico(usu.CorreoElectronico)) {
                throw new ProyectoException("Error: CorreoElectronico ya existe");
            }
            if (existeNombreUsuario(usu.NombreUsuario))
            {
                throw new ProyectoException("Error: NombreUsuario ya existe");
            }
        }
        protected void validarActualizacionUsuario(Usuario usu)
        {
            if (usu.Nombre.Length < 2 || usu.Nombre.Length > 30)
            {
                throw new ProyectoException("Error: Nombre");
            }
            if (usu.Apellido.Length < 2 || usu.Apellido.Length > 30)
            {
                throw new ProyectoException("Error: Apellido");
            }
            if (usu.Telefono.Length < 6 || usu.Telefono.Length > 20)
            {
                throw new ProyectoException("Error: Teléfono");
            }
            if (usu.Direccion.Length < 4 || usu.Direccion.Length > 100)
            {
                throw new ProyectoException("Error: Dirección");
            }
            if (usu.Barrio==null)
            {
                throw new ProyectoException("Error: Barrio");
            }
        }
        protected void validarContrasena(string contrasenaNueva)
        {
            //Ver si se le va agregar mas restricciones (expresion regular)
            if (contrasenaNueva.Length < 8)
            {
                throw new ProyectoException("Error: Contraseña");
            }
        }
        protected bool existeNombreUsuario(string nombreUsuario) {
            return usuarioDAL.existeNombreUsuario(nombreUsuario);
        }
        protected bool existeCorreoElectronico(string correo)
        {
            return usuarioDAL.existeCorreoElectronico(correo);
        }

        public Usuario obtenerPorToken(string token)
        {
            if (token != null && token != "")
            {
                return usuarioDAL.obtenerPorToken(token);
            }
            else
            {
                throw new ProyectoException("Error: Token");
            }
        }
    }
}
