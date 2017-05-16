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
            validarCliente(cli);//Falta validar barrio, se va a seleccionar de un combo y solo se trabaja con el id
            clienteDAL.altaCliente(cli);
        }       
        public void actualizarCliente(Cliente cli) {
            validarActualizacion(cli);
            clienteDAL.actualizarCliente(cli);
        }       
        public void actualizarContrasena(int id, string contrasenaAnterior, string contrasenaNueva) {
            validarContrasena(contrasenaNueva);
            if (contrasenaAnterior.Equals(contrasenaNueva))
            {
                throw new ProyectoException("Error: Contrasena anterior igual a nueva");
            }
            Cliente cli = clienteDAL.obtener(id);
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
            clienteDAL.habilitarCliente(id);
        }
        public void deshabilitarCliente(int id) {
            clienteDAL.deshabilitarCliente(id);
        }
        public Cliente ingresarCliente(string nombre, string pass) {
            return clienteDAL.ingresarCliente(nombre, pass);
        }


        private void validarCliente(Cliente cli)
        {
            validarActualizacion(cli);
            validarContrasena(cli.Contrasena);
            if (cli.NombreUsuario.Length < 3 || cli.NombreUsuario.Length > 50)
            {
                throw new ProyectoException("Error: NombreUsuario");
            }
            //Verificar metodo de comprobar email.
            if (!(ET.Utilidades.ComprobarFormatoEmail(cli.CorreElectronico)))
            {
                throw new ProyectoException("Error: CorreElectronico");
            }
        }
        private void validarActualizacion(Cliente cli)
        {
            if (cli.Nombre.Length < 2 || cli.Nombre.Length > 30)
            {
                throw new ProyectoException("Error: Nombre");
            }
            if (cli.Apellido.Length < 2 || cli.Apellido.Length > 30)
            {
                throw new ProyectoException("Error: Apellido");
            }
            if (cli.Telefono.Length < 6 || cli.Telefono.Length > 20)
            {
                throw new ProyectoException("Error: Telefono");
            }
            if (cli.Documento.Length < 6 || cli.Documento.Length > 20)
            {
                throw new ProyectoException("Error: Documento");
            }
            if (cli.Direccion.Length < 4 || cli.Direccion.Length > 100)
            {
                throw new ProyectoException("Error: Direccion");
            }
        }
        private void validarContrasena(string contrasenaNueva)
        {
            //Ver si se le va agregar mas restricciones (expresion regular)
            if (contrasenaNueva.Length < 8)
            {
                throw new ProyectoException("Error: Contrasena");
            }           
        }


    }
}
