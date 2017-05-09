using BL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace WCFProyectoFinal
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "Service1" en el código, en svc y en el archivo de configuración.
    // NOTE: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione Service1.svc o Service1.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class ServicioProyectoFinal : IServicioProyectoFinal
    {
        private ClienteBL clienteBL = new ClienteBL();
        private AdministradorBL adminBL = new AdministradorBL();

        //**********************************************************
        //CLIENTE
        //**********************************************************
        public void altaCliente(int id, string nombre, string apellido, string contrasena, 
            string nombreUsuario, string correoElectronico, string telefono, bool habilitado, string documento)
        {
            throw new NotImplementedException();
        }
        public void actualizarCliente(string nombre, string apellido, string telefono, string documento)
        {
            throw new NotImplementedException();
        }
        public void actualizarContrasenaCliente(int id, string contrasenaAnterior, string nuevaContrasena)
        {
            throw new NotImplementedException();
        }
        public void habilitarCliente(int id)
        {
            throw new NotImplementedException();
        }
        public void deshabilitarCliente(int id)
        {
            throw new NotImplementedException();
        }
        public DtoCliente ingresarCliente(string nombreUsuario, string pass)
        {
            throw new NotImplementedException();
        }
        public List<DtoCliente> getClientes()
        {
            List<DtoCliente> dtoClientes = cargaDtoClientes();
            return dtoClientes;
        }
        //**********************************************************
        //FIN CLIENTE
        //**********************************************************
        //**********************************************************
        //ADMINISTRADOR
        //**********************************************************
        public void altaAdministrador(int id, string nombre, string apellido, string contrasena, 
            string nombreUsuario, string correoElectronico, string telefono, bool habilitado)
        {
            throw new NotImplementedException();
        }
        public void actualizarAdministrador(string nombre, string apellido, string telefono)
        {
            throw new NotImplementedException();
        }
        public void actualizarContrasenaAdministrador(int id, string contrasenaAnterior, string nuevaContrasena)
        {
            throw new NotImplementedException();
        }
        public List<DtoAdministrador> getAdministradores()
        {
            throw new NotImplementedException();
        }
        public void habilitarAdminitrador(int id)
        {
            throw new NotImplementedException();
        }
        public void deshabilitarAdministrador(int id)
        {
            throw new NotImplementedException();
        }
        public DtoAdministrador ingresarAdministrador(string nombre, string pass)
        {
            throw new NotImplementedException();
        }
        //**********************************************************
        //FIN ADMINISTRADOR
        //**********************************************************


        //**********************************************************
        //METODOS AUXILIARES
        //**********************************************************
        private List<DtoCliente> cargaDtoClientes() {
            List<DtoCliente> dtoClientes = new List<DtoCliente>();
            foreach (Cliente c in clienteBL.getClientes()) {
                dtoClientes.Add(new DtoCliente
                {
                    Id = c.Id,
                    Nombre = c.Nombre,
                });
            }
            return dtoClientes;
        }

        

        
    }
}
