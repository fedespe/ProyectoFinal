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
            //Falta validación
        }
        public void actualizarAdministrador(Administrador admin)
        {
            validarActualizacion(admin);
            administradorDAL.actualizarAdministrador(admin);
        }
        private void validarActualizacion(Administrador admin)
        {
            //Falta validación
        }
        public void actualizarContrasena(Administrador admin)
        {
            validarContrasena(admin);
            administradorDAL.actualizarContrasena(admin);
        }
        private void validarContrasena(Administrador admin)
        {
            //Falta validación
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
