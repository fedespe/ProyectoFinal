using DAL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ClienteBL
    {
        private ClienteDAL clienteDAL = new ClienteDAL();

        public void altaCliente(Cliente cli)
        {
            validarCliente(cli);
            clienteDAL.altaCliente(cli);
        }
        private void validarCliente(Cliente cli)
        {
            //Falta validación
        }
        public void actualizarCliente(Cliente cli) {
            validarActualizacion(cli);
            clienteDAL.actualizarCliente(cli);
        }
        private void validarActualizacion(Cliente cli) {
            //Falta validación
        }
        public void actualizarContrasena(Cliente cli) {
            validarContrasena(cli);
            clienteDAL.actualizarContrasena(cli);
        }
        private void validarContrasena(Cliente cli) {
            //Falta validación
        }
        public List<Cliente> getClientes() {
           return clienteDAL.getClientes();
        }
        public void habilitarCliente(int id) {
            clienteDAL.habilitarCliente(id);
        }
        public void deshabilitarCliente(int id) {
            clienteDAL.deshabilitarCliente(id);
        }
        public Cliente ingresarCliente(string nombre, string pass) {
            return clienteDAL.ingresarCliente(nombre, pass);
        }
    }
}
