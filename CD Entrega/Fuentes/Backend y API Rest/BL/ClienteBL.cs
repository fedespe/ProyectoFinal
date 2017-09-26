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
                throw new ProyectoException("Error: Contraseña anterior igual a nueva");
            }
            Cliente cli = clienteDAL.obtener(id);
            if (cli == null)
            {
                throw new ProyectoException("Error: Cliente no encontrado");
            }
            if (!Utilidades.calcularMD5Hash(contrasenaAnterior).Equals(cli.Contrasena))
            {
                throw new ProyectoException("Error: Contraseña anterior");
            }
            clienteDAL.actualizarContrasena(id,contrasenaNueva);
        }

        //Para uso del administrador en caso de perdida de la misma por parte del cliente
        public void nuevaContrasena(int id, string contrasenaNueva)
        {
            base.validarContrasena(contrasenaNueva);           
            Cliente cli = clienteDAL.obtener(id);
            if (cli == null)
            {
                throw new ProyectoException("Error: Cliente no encontrado");
            }
            clienteDAL.actualizarContrasena(id, contrasenaNueva);
        }
        public List<Cliente> obtenerTodos() {
           return clienteDAL.obtenerTodos();
        }
        public Cliente obtener(int id)
        {
            return clienteDAL.obtener(id);
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
        public Cliente obtener(string email)
        {
            return clienteDAL.obtener(email);
        }
        public Cliente recuperarPassword(string email)
        {
            Cliente cliente = this.obtener(email);
            if (cliente != null)
            {
                string passwordGenerado = Utilidades.generarPassword(10);
                this.clienteDAL.actualizarContrasena(cliente.Id, passwordGenerado);
                List<string> destinatariosCorreo = new List<string>();
                destinatariosCorreo.Add(cliente.CorreoElectronico);
                string cuerpoCorreo = "Su nueva constraseña es: <strong>" + passwordGenerado + "</strong><br>Sugerimos cambiarla luego de ingresar al sistema.";
                Utilidades.enviarCorreo(destinatariosCorreo, "SPODS", "Recuperación de Contraseña", cuerpoCorreo);
            }
            else {
                throw new ProyectoException("Error: No existe un usuario con el correo indicado.");
            }
            return cliente;
        }
    }
}
