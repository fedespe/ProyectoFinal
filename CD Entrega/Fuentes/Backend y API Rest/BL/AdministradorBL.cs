using DAL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class AdministradorBL : UsuarioBL
    {
        private AdministradorDAL adminitsradorDAL = new AdministradorDAL();

        public void altaAdministrador(Administrador admin)
        {
            base.validarUsuario(admin);//Falta validar barrio, se va a seleccionar de un combo y solo se trabaja con el id
            //validarAdministrador(admin); tendriamos que hacer este metodo si tuviera datos particulares
            adminitsradorDAL.altaAdministrador(admin);
        }
        public void actualizarAdministrador(Administrador admin)
        {
            base.validarActualizacionUsuario(admin);
            adminitsradorDAL.actualizarAdministrador(admin);
        }
        public void actualizarContrasena(int id, string contrasenaAnterior, string contrasenaNueva)
        {
            base.validarContrasena(contrasenaNueva);
            if (contrasenaAnterior.Equals(contrasenaNueva))
            {
                throw new ProyectoException("Error: Contrasena anterior igual a nueva");
            }
            Administrador admin = adminitsradorDAL.obtener(id);
            if (admin == null) {
                throw new ProyectoException("Error: Administrador no encontrado");
            }
            if (!Utilidades.calcularMD5Hash(contrasenaAnterior).Equals(admin.Contrasena))
            {
                throw new ProyectoException("Error: Contrasena anterior");
            }
            adminitsradorDAL.actualizarContrasena(id, contrasenaNueva);
        }
        public List<Administrador> obtenerTodos()
        {
            return adminitsradorDAL.obtenerTodos();
        }
        public Administrador obtener(int id)
        {
            return adminitsradorDAL.obtener(id);
        }
        public void habilitarAdministrador(int id)
        {
            adminitsradorDAL.habilitarUsuario(id);
        }
        public void deshabilitarAdministrador(int id)
        {
            adminitsradorDAL.deshabilitarUsuario(id);
        }
        public Administrador ingresarAdministrador(string nombreUsu, string pass)
        {
            return adminitsradorDAL.ingresarAdministrador(nombreUsu, pass);
        }
        //Para uso del super administrador en caso de perdida de la misma por parte del administrador
        public void nuevaContrasena(int id, string contrasenaNueva)
        {
            base.validarContrasena(contrasenaNueva);
            Administrador admin = adminitsradorDAL.obtener(id);
            if (admin == null)
            {
                throw new ProyectoException("Error: Cliente no encontrado");
            }
            adminitsradorDAL.actualizarContrasena(id, contrasenaNueva);
        }
    }
}
