using DAL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class AdministradorBL
    {
        private AdministradorDAL administradorDAL = new AdministradorDAL();

        public void altaAdministrador(Administrador admin)
        {
            validarAdministrador(admin);
            administradorDAL.altaAdministrador(admin);
        }
        private void validarAdministrador(Administrador admin)
        {
            validarActualizacion(admin);
            validarContrasena(admin.Contrasena);
            if (admin.NombreUsuario.Length < 3 || admin.NombreUsuario.Length > 15)
            {
                throw new ProyectoException("Error: mensaje...");
            }
            //Verificar metodo de comprobar email.
            if (!(ET.Utilidades.ComprobarFormatoEmail(admin.CorreElectronico)))
            {
                throw new ProyectoException("Error: mensaje...");
            }
        }
        public void actualizarAdministrador(Administrador admin)
        {
            validarActualizacion(admin);
            administradorDAL.actualizarAdministrador(admin);
        }
        private void validarActualizacion(Administrador admin)
        {
            if (admin.Nombre.Length < 3 || admin.Nombre.Length > 20)
            {
                throw new ProyectoException("Error: mensaje...");
            }
            if (admin.Apellido.Length < 3 || admin.Apellido.Length > 20)
            {
                throw new ProyectoException("Error: mensaje...");
            }
            if (admin.Telefono.Length < 6 || admin.Telefono.Length > 30)
            {
                throw new ProyectoException("Error: mensaje...");
            }
        }
        public void actualizarContrasena(int id, string contrasenaAnterior, string contrasenaNueva)
        {
            validarContrasena(contrasenaNueva);
            administradorDAL.actualizarContrasena(id,contrasenaAnterior,contrasenaNueva);
        }
        private void validarContrasena(string contrasenaNueva)
        {
            //Ver si se le va agregar mas restricciones (expresion regular)
            if (contrasenaNueva.Length < 8)
            {
                throw new ProyectoException("Error: mensaje...");
            }
        }
        public List<Administrador> getAdministradores()
        {
            return administradorDAL.getAdministradores();
        }
        public void habilitarAdminitrador(int id)
        {
            administradorDAL.habilitarAdministrador(id);
        }
        public void deshabilitarAdministrador(int id)
        {
            administradorDAL.deshabilitarAdministrador(id);
        }
        public Administrador ingresarAdministrador(string nombre, string pass)
        {
            return administradorDAL.ingresarAdministrador(nombre, pass);
        }
    }
}
