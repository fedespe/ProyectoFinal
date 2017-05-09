using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ClienteDAL
    {
        public void altaCliente(Cliente cli) {

        }
        public void actualizarCliente(Cliente cli)
        {

        }
        public void actualizarContrasena(int id, string contrasenaAnterior, string contrasenaNueva)
        {

        }
        public List<Cliente> getClientes() {
            List<Cliente> clientes = new List<Cliente>();
            clientes.Add(new Cliente
            {
                Id = 1,
                Nombre = "Federico"
            });
            clientes.Add(new Cliente
            {
                Id = 2,
                Nombre = "Carlos"
            });
            return clientes;
        }
        public void habilitarCliente(int id) {

        }
        public void deshabilitarCliente(int id)
        {

        }
        public Cliente ingresarCliente(string nombre, string pass) {
            return null;
        }
    }
}
