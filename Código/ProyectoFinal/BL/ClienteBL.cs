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
            validarActualizacion(cli);
            validarContrasena(cli.Contrasena);
            if (cli.NombreUsuario.Length < 3 || cli.NombreUsuario.Length > 15)
            {
                throw new ProyectoException("Error: NombreUsuario");
            }
            //Verificar metodo de comprobar email.
            if (!(ET.Utilidades.ComprobarFormatoEmail(cli.CorreElectronico)))
            {
                throw new ProyectoException("Error: CorreElectronico");
            }            
        }
        public void actualizarCliente(Cliente cli) {
            validarActualizacion(cli);
            clienteDAL.actualizarCliente(cli);
        }
        private void validarActualizacion(Cliente cli) {
            if (cli.Nombre.Length < 3 || cli.Nombre.Length > 20)
            {
                throw new ProyectoException("Error: Nombre");
            }
            if (cli.Apellido.Length < 3 || cli.Apellido.Length > 20)
            {
                throw new ProyectoException("Error: Apellido");
            }
            if (cli.Telefono.Length < 6 || cli.Telefono.Length > 30)
            {
                throw new ProyectoException("Error: Telefono");
            }
            if (cli.Documento.Length < 6 || cli.Documento.Length > 20)
            {
                throw new ProyectoException("Error: Documento");
            }
        }
        public void actualizarContrasena(int id, string contrasenaAnterior, string contrasenaNueva) {
            validarContrasena(contrasenaNueva);
            clienteDAL.actualizarContrasena(id,contrasenaAnterior,contrasenaNueva);
        }
        private void validarContrasena(string contrasenaNueva) {
            //Ver si se le va agregar mas restricciones (expresion regular)
            if (contrasenaNueva.Length < 8)
            {
                throw new ProyectoException("Error: Contrasena");
            }
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
