﻿using BL;
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
                Documento = dtoCliente.Documento,
                Habilitado = dtoCliente.Habilitado,
                Nombre = dtoCliente.Nombre,
                NombreUsuario = dtoCliente.NombreUsuario,
                Telefono = dtoCliente.Telefono,
                Direccion = dtoCliente.Direccion,
                Barrio = new Barrio { Id=dtoCliente.IdBarrio}
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
                Documento = dtoCliente.Documento,
                Nombre = dtoCliente.Nombre,
                Telefono = dtoCliente.Telefono,
                Direccion = dtoCliente.Direccion,
                Barrio = new Barrio { Id = dtoCliente.IdBarrio }
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
        public void actualizarContrasenaCliente(int id, string contrasenaAnterior, string contrasenaNueva)
        {
            clienteBL.actualizarContrasena(id, contrasenaAnterior, contrasenaNueva);
        }
        public void habilitarCliente(int id)
        {
            clienteBL.habilitarCliente(id);
        }
        public void deshabilitarCliente(int id)
        {
            clienteBL.deshabilitarCliente(id);
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
                        Documento=cli.Documento,
                        Habilitado=cli.Habilitado,
                        Nombre=cli.Nombre,
                        NombreUsuario=cli.NombreUsuario,
                        Telefono=cli.Telefono
                };   
            }
            return dtoCli;
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
        public void altaAdministrador(string nombre, string apellido, string contrasena, 
            string nombreUsuario, string correoElectronico, string telefono, bool habilitado)
        {
            Administrador admin = new Administrador
            {
                Apellido = apellido,
                Contrasena = contrasena,
                CorreElectronico = correoElectronico,
                Habilitado = habilitado,
                Nombre = nombre,
                NombreUsuario = nombreUsuario,
                Telefono = telefono
            };
            adminBL.altaAdministrador(admin);
        }
        public void actualizarAdministrador(string nombre, string apellido, string telefono)
        {
            Administrador admin = new Administrador
            {
                Apellido = apellido,
                Nombre = nombre,
                Telefono = telefono
            };
            adminBL.altaAdministrador(admin);
        }
        public void actualizarContrasenaAdministrador(int id, string contrasenaAnterior, string contrasenaNueva)
        {
            adminBL.actualizarContrasena(id, contrasenaAnterior, contrasenaNueva);
        }
        public List<DtoAdministrador> getAdministradores()
        {
            List<DtoAdministrador> dtoAdministradores = cargaDtoAdministradores();
            return dtoAdministradores;
        }
        public void habilitarAdminitrador(int id)
        {
            adminBL.habilitarAdminitrador(id);
        }
        public void deshabilitarAdministrador(int id)
        {
            adminBL.deshabilitarAdministrador(id);
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
                    Habilitado = admin.Habilitado,
                    Nombre = admin.Nombre,
                    NombreUsuario = admin.NombreUsuario,
                    Telefono = admin.Telefono
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
            foreach (Cliente c in clienteBL.getClientes()) {
                dtoClientes.Add(new DtoCliente
                {
                    Id = c.Id,
                    Nombre = c.Nombre,
                });
            }
            return dtoClientes;
        }

        private List<DtoAdministrador> cargaDtoAdministradores()
        {
            List<DtoAdministrador> dtoAdministradores = new List<DtoAdministrador>();
            foreach (Administrador a in adminBL.getAdministradores())
            {
                dtoAdministradores.Add(new DtoAdministrador
                {
                    Id = a.Id,
                    Nombre = a.Nombre,
                });
            }
            return dtoAdministradores;
        }



        //public string altaCliente(string nombre, string apellido, string contrasena, 
        //    string nombreUsuario, string correoElectronico, string telefono, bool habilitado, string documento)
        //{
        //    Cliente cli = new Cliente {
        //        Apellido=apellido,
        //        Contrasena=contrasena,
        //        CorreElectronico=correoElectronico,
        //        Documento=documento,
        //        Habilitado=habilitado,
        //        Nombre=nombre,
        //        NombreUsuario=nombreUsuario,
        //        Telefono=telefono
        //    };
        //    try {
        //        clienteBL.altaCliente(cli);
        //        return mensajeOk;
        //    }
        //    catch (ET.ProyectoException ex) {
        //        return ex.Message;
        //    }

        //}
        //public string actualizarCliente(string nombre, string apellido, string telefono, string documento)
        //{
        //    Cliente cli = new Cliente
        //    {
        //        Apellido = apellido,
        //        Documento = documento,
        //        Nombre = nombre,
        //        Telefono = telefono
        //    };
        //    try
        //    {
        //        clienteBL.actualizarCliente(cli);
        //        return mensajeOk;
        //    }
        //    catch (ET.ProyectoException ex)
        //    {
        //        return ex.Message;
        //    }
        //}
    }
}
