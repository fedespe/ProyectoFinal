using DAL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ClienteBL : UsuarioBL
    {
        private ClienteDAL clienteDAL = new ClienteDAL();

        public void altaCliente(Cliente cli)
        {
            base.validarUsuario(cli);//Falta validar barrio, se va a seleccionar de un combo y solo se trabaja con el id
            //validarCliente(cli); tendriamos que hacer este metodo si tuviera datos particulares
            clienteDAL.altaCliente(cli);
        }       
        public void actualizarCliente(Cliente cli) {
            base.validarActualizacionUsuario(cli);
            clienteDAL.actualizarCliente(cli);
        }       
        public void actualizarContrasena(int id, string contrasenaAnterior, string contrasenaNueva) {
            base.validarContrasena(contrasenaNueva);
            if (contrasenaAnterior.Equals(contrasenaNueva))
            {
                throw new ProyectoException("Error: Contrasena anterior igual a nueva");
            }
            Cliente cli = clienteDAL.obtener(id);
            if (cli == null)
            {
                throw new ProyectoException("Error: Cliente no encontrado");
            }
            if (!Utilidades.calcularMD5Hash(contrasenaAnterior).Equals(cli.Contrasena))
            {
                throw new ProyectoException("Error: Contrasena anterior");
            }
            clienteDAL.actualizarContrasena(id,contrasenaNueva);
        }       
        public List<Cliente> obtenerTodos() {
           return clienteDAL.obtenerTodos();
        }
        public void habilitarCliente(int id) {
            clienteDAL.habilitarUsuario(id);
        }
        public void deshabilitarCliente(int id) {
            clienteDAL.deshabilitarUsuario(id);
        }
        public Cliente ingresarCliente(string nombreUsu, string pass) {
            return clienteDAL.ingresarCliente(nombreUsu, pass);
        }

    }
}
