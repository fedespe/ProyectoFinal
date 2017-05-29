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
        private string mensajeOk = "OK";

        //**********************************************************
        //CLIENTE
        //**********************************************************       
        public string altaCliente(DtoCliente dtoCliente)
        {
            Cliente cli = new Cliente
            {
                Apellido = dtoCliente.Apellido,
                Contrasena = dtoCliente.Contrasena,
                CorreElectronico = dtoCliente.CorreElectronico,
                Habilitado = dtoCliente.Habilitado,
                Nombre = dtoCliente.Nombre,
                NombreUsuario = dtoCliente.NombreUsuario,
                Telefono = dtoCliente.Telefono,
                Direccion = dtoCliente.Direccion,
            };
            try
            {
                clienteBL.altaCliente(cli);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }

        }
        
        public string actualizarCliente(DtoCliente dtoCliente)
        {
            Cliente cli = new Cliente
            {
                Id = dtoCliente.Id,
                Apellido = dtoCliente.Apellido,
                Nombre = dtoCliente.Nombre,
                Telefono = dtoCliente.Telefono,
                Direccion = dtoCliente.Direccion,
            };
            try
            {
                clienteBL.actualizarCliente(cli);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }
        }
        public string actualizarContrasenaCliente(int id, string contrasenaAnterior, string contrasenaNueva)
        {
            try
            {
                clienteBL.actualizarContrasena(id, contrasenaAnterior, contrasenaNueva);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }
            
        }
        public List<DtoCliente> obtenerTodosClientes()
        {
            List<DtoCliente> dtoClientes = cargaDtoClientes();
            return dtoClientes;
        }
        public string habilitarCliente(int id)
        {           
            try
            {
                clienteBL.habilitarCliente(id);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }
        }
        public string deshabilitarCliente(int id)
        {
            try
            {
                clienteBL.deshabilitarCliente(id);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }            
        }
        public DtoCliente ingresarCliente(string nombreUsuario, string pass)
        {
            Cliente cli = clienteBL.ingresarCliente(nombreUsuario, pass);
            DtoCliente dtoCli = null;
            if (cli != null) {
                dtoCli = new DtoCliente {
                        Id=cli.Id,
                        Apellido=cli.Apellido,
                        Contrasena=cli.Contrasena,
                        CorreElectronico=cli.CorreElectronico,
                        Habilitado=cli.Habilitado,
                        Nombre=cli.Nombre,
                        NombreUsuario=cli.NombreUsuario,
                        Telefono=cli.Telefono,
                        IdBarrio=cli.Barrio.Id,
                        Direccion=cli.Direccion,
                        FechaAlta=cli.FechaAlta,
                        UltimaModificacionContrasena=cli.UltimaModificacionContrasena
                };   
            }
            return dtoCli;
        }

        //**********************************************************
        //FIN CLIENTE
        //**********************************************************
        //**********************************************************
        //ADMINISTRADOR
        //**********************************************************
        public string altaAdministrador(DtoAdministrador dtoAdministrador)
        {
            Administrador admin = new Administrador
            {
                Apellido = dtoAdministrador.Apellido,
                Contrasena = dtoAdministrador.Contrasena,
                CorreElectronico = dtoAdministrador.CorreElectronico,
                Documento = dtoAdministrador.Documento,
                Habilitado = dtoAdministrador.Habilitado,
                Nombre = dtoAdministrador.Nombre,
                NombreUsuario = dtoAdministrador.NombreUsuario,
                Telefono = dtoAdministrador.Telefono,
                Direccion = dtoAdministrador.Direccion,
            };
            try
            {
                adminBL.altaAdministrador(admin);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }

        }

        public string actualizarAdministrador(DtoAdministrador dtoAdministrador)
        {
            Administrador admin = new Administrador
            {
                Id = dtoAdministrador.Id,
                Apellido = dtoAdministrador.Apellido,
                Documento = dtoAdministrador.Documento,
                Nombre = dtoAdministrador.Nombre,
                Telefono = dtoAdministrador.Telefono,
                Direccion = dtoAdministrador.Direccion,
            };
            try
            {
                adminBL.actualizarAdministrador(admin);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }
        }
        public string actualizarContrasenaAdministrador(int id, string contrasenaAnterior, string contrasenaNueva)
        {
            try
            {
                adminBL.actualizarContrasena(id, contrasenaAnterior, contrasenaNueva);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }

        }
        public List<DtoAdministrador> obtenerTodosAdministradores()
        {
            List<DtoAdministrador> dtoAdministrador = cargaDtoAdministradores();
            return dtoAdministrador;
        }
        public string habilitarAdministrador(int id)
        {
            try
            {
                adminBL.habilitarAdministrador(id);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }
        }
        public string deshabilitarAdministrador(int id)
        {
            try
            {
                adminBL.deshabilitarAdministrador(id);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }
        }
        public DtoAdministrador ingresarAdministrador(string nombreUsuario, string pass)
        {
            Administrador admin = adminBL.ingresarAdministrador(nombreUsuario, pass);
            DtoAdministrador dtoAdmin = null;
            if (admin != null)
            {
                dtoAdmin = new DtoAdministrador
                {
                    Id = admin.Id,
                    Apellido = admin.Apellido,
                    Contrasena = admin.Contrasena,
                    CorreElectronico = admin.CorreElectronico,
                    Documento = admin.Documento,
                    Habilitado = admin.Habilitado,
                    Nombre = admin.Nombre,
                    NombreUsuario = admin.NombreUsuario,
                    Telefono = admin.Telefono,
                    IdBarrio = admin.Barrio.Id,
                    Direccion = admin.Direccion,
                    FechaAlta = admin.FechaAlta,
                    UltimaModificacionContrasena = admin.UltimaModificacionContrasena
                };
            }
            return dtoAdmin;
        }
        //**********************************************************
        //FIN ADMINISTRADOR
        //**********************************************************


        //**********************************************************
        //METODOS AUXILIARES
        //**********************************************************
        private List<DtoCliente> cargaDtoClientes() {
            List<DtoCliente> dtoClientes = new List<DtoCliente>();
            foreach (Cliente c in clienteBL.obtenerTodos()) {
                dtoClientes.Add(new DtoCliente
                {
                    Id = c.Id,
                    Nombre = c.Nombre,
                    Apellido = c.Apellido,
                    NombreUsuario = c.NombreUsuario,
                    Contrasena = c.Contrasena,//ver si hay que cargarla
                    UltimaModificacionContrasena = c.UltimaModificacionContrasena,
                    Habilitado = c.Habilitado,
                    CorreElectronico = c.CorreElectronico,
                    Telefono = c.Telefono,
                    Direccion = c.Direccion,
                    FechaAlta = c.FechaAlta,
                    IdBarrio = c.Barrio.Id //ver que se podria trabajar con DtoBarrio
                });
            }
            return dtoClientes;
        }

        private List<DtoAdministrador> cargaDtoAdministradores()
        {
            List<DtoAdministrador> dtoAdministrador = new List<DtoAdministrador>();
            foreach (Administrador a in adminBL.obtenerTodos())
            {
                dtoAdministrador.Add(new DtoAdministrador
                {
                    Id = a.Id,
                    Nombre = a.Nombre,
                    Apellido = a.Apellido,
                    NombreUsuario = a.NombreUsuario,
                    Contrasena = a.Contrasena,//ver si hay que cargarla
                    UltimaModificacionContrasena = a.UltimaModificacionContrasena,
                    Habilitado = a.Habilitado,
                    CorreElectronico = a.CorreElectronico,
                    Documento = a.Documento,
                    Telefono = a.Documento,
                    Direccion = a.Direccion,
                    FechaAlta = a.FechaAlta,
                    IdBarrio = a.Barrio.Id //ver que se podria trabajar con DtoBarrio
                });
            }
            return dtoAdministrador;
        }
        //**********************************************************
        //FIN METODOS AUXILIARES
        //**********************************************************
    }
}
