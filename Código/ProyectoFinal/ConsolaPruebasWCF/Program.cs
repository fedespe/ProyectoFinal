using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsolaPruebasWCF
{
    class Program
    {
        static void Main(string[] args)
        {
            using (ServicioProyectFinal.ServicioProyectoFinalClient cliente = new ServicioProyectFinal.ServicioProyectoFinalClient()) {
                //var clientes = cliente.getClientes();

                //**********************************************************
                //ALTA CLIENTE
                //**********************************************************
                ServicioProyectFinal.DtoCliente dtoCliente = new ServicioProyectFinal.DtoCliente {
                    Nombre= "Federico",
                    Apellido= "Speroni",
                    Contrasena= "Fede1234",
                    NombreUsuario= "FedeSpe",
                    CorreElectronico= "fsperonip@hotmail.com",
                    Telefono= "099845498",
                    Habilitado= true,
                    Documento= "42614099",
                    Direccion= "18 de Julio 1591",
                    IdBarrio= 1
                };

                Console.WriteLine("Alta Cliente");
                Console.WriteLine(cliente.altaCliente(dtoCliente));
                Console.WriteLine("*****");

                dtoCliente = new ServicioProyectFinal.DtoCliente
                {
                    Nombre = "Bruno",
                    Apellido = "Diaz",
                    Contrasena = "Bruno1234",
                    NombreUsuario = "BrunoDi",
                    CorreElectronico = "brunodiaz@hotmail.com",
                    Telefono = "099845477",
                    Habilitado = false,
                    Documento = "42614777",
                    Direccion = "Defensa 1591",
                    IdBarrio = 1
                };

                Console.WriteLine("Alta Cliente");
                Console.WriteLine(cliente.altaCliente(dtoCliente));
                Console.WriteLine("*****");

                //**********************************************************
                //FIN ALTA CLIENTE
                //**********************************************************
                //**********************************************************
                //ACTUALIZAR CLIENTE
                //**********************************************************

                dtoCliente.Id = 1;//OJO PARA PRUEBAS FIJARSE CUAL VA A SER EL PROXIMO ID
                dtoCliente.Nombre = "Carlos";
                dtoCliente.Apellido = "Piaggio";
                dtoCliente.Documento = "88888888";
                dtoCliente.Direccion = "Av. Italia 4562";
                dtoCliente.IdBarrio = 2;
                dtoCliente.Telefono = "099888888";

                Console.WriteLine("Actualizar Cliente");
                Console.WriteLine(cliente.actualizarCliente(dtoCliente));
                Console.WriteLine("*****");

                //**********************************************************
                //FIN ACTUALIZAR CLIENTE
                //**********************************************************
                //**********************************************************
                //ACTUALIZAR CONTRASENA CLIENTE
                //**********************************************************
                Console.WriteLine("Actualizar contrasena Cliente");
                Console.WriteLine(cliente.actualizarContrasenaCliente(1, "Fede1234","12345678"));
                Console.WriteLine("*****");
                //**********************************************************
                //FIN ACTUALIZAR CONTRASENA CLIENTE
                //**********************************************************
                //**********************************************************
                //OBTENER CLIENTES
                //**********************************************************
                Console.WriteLine("Obtener Clientes");
                ServicioProyectFinal.DtoCliente[] dtoClientes = cliente.obtenerTodosClientes();
                foreach (ServicioProyectFinal.DtoCliente c in dtoClientes) {
                    Console.WriteLine(c.Id + ", " + c.Nombre + ", " + c.Apellido+ ", " + c.NombreUsuario + ", " + c.IdBarrio + ", " + c.Habilitado + ", " + c.Telefono + ", " + c.UltimaModificacionContrasena + ", " + c.FechaAlta);
                }
                Console.WriteLine("*****");
                //**********************************************************
                //FIN OBTENER CLIENTES
                //**********************************************************
                //**********************************************************
                //HABILITAR CLIENTES
                //**********************************************************
                Console.WriteLine("Habilitar Cliente");
                Console.WriteLine(cliente.habilitarCliente(1));
                Console.WriteLine("*****");
                //**********************************************************
                //FIN HABILITAR CLIENTES
                //**********************************************************
                //**********************************************************
                //DESHABILITAR CLIENTES
                //**********************************************************
                Console.WriteLine("Deshabilitar Cliente");
                Console.WriteLine(cliente.deshabilitarCliente(2));
                Console.WriteLine("*****");
                //**********************************************************
                //FIN DESHABILITAR CLIENTES
                //**********************************************************
                //**********************************************************
                //INGRESAR CLIENTES
                //**********************************************************
                Console.WriteLine("Ingresar Cliente");
                ServicioProyectFinal.DtoCliente cli = cliente.ingresarCliente("FedeSpe", "12345678");
                if (cli != null)
                {
                    Console.WriteLine(cli.Id + ", " + cli.Nombre + ", " + cli.Apellido);
                }
                else {
                    Console.WriteLine("Usuario o contrasena no validos");
                }
                Console.WriteLine("*****");
                //**********************************************************
                //FIN INGRESAR CLIENTES
                //**********************************************************



                //**********************************************************
                //ALTA ADMINISTRADOR
                //**********************************************************
                ServicioProyectFinal.DtoAdministrador dtoAdministrador = new ServicioProyectFinal.DtoAdministrador
                {
                    Nombre = "FedericoAdmin",
                    Apellido = "Speroni",
                    Contrasena = "Fede1234",
                    NombreUsuario = "FedeSpeAdmin",
                    CorreElectronico = "fsperonipadmin@hotmail.com",
                    Telefono = "099845498",
                    Habilitado = true,
                    Documento = "42614099",
                    Direccion = "18 de Julio 1591",
                    IdBarrio = 1
                };

                Console.WriteLine("Alta Administrador");
                Console.WriteLine(cliente.altaAdministrador(dtoAdministrador));
                Console.WriteLine("*****");

                dtoAdministrador = new ServicioProyectFinal.DtoAdministrador
                {
                    Nombre = "BrunoAdmin",
                    Apellido = "Diaz",
                    Contrasena = "Bruno1234",
                    NombreUsuario = "BrunoDiAdmin",
                    CorreElectronico = "brunodiazadmin@hotmail.com",
                    Telefono = "099845477",
                    Habilitado = false,
                    Documento = "42614777",
                    Direccion = "Defensa 1591",
                    IdBarrio = 1
                };

                Console.WriteLine("Alta Administrador");
                Console.WriteLine(cliente.altaAdministrador(dtoAdministrador));
                Console.WriteLine("*****");

                //**********************************************************
                //FIN ALTA ADMINISTRADOR
                //**********************************************************
                //**********************************************************
                //ACTUALIZAR ADMINISTRADOR
                //**********************************************************

                dtoAdministrador.Id = 3;//OJO PARA PRUEBAS FIJARSE CUAL VA A SER EL PROXIMO ID
                dtoAdministrador.Nombre = "CarlosAdmin";
                dtoAdministrador.Apellido = "Piaggio";
                dtoAdministrador.Documento = "88888888";
                dtoAdministrador.Direccion = "Av. Italia 4562";
                dtoAdministrador.IdBarrio = 2;
                dtoAdministrador.Telefono = "099888888";

                Console.WriteLine("Actualizar Administrador");
                Console.WriteLine(cliente.actualizarAdministrador(dtoAdministrador));
                Console.WriteLine("*****");

                //**********************************************************
                //FIN ACTUALIZAR ADMINISTRADOR
                //**********************************************************
                //**********************************************************
                //ACTUALIZAR CONTRASENA ADMINISTRADOR
                //**********************************************************
                Console.WriteLine("Actualizar contrasena Administrador");
                Console.WriteLine(cliente.actualizarContrasenaAdministrador(3, "Fede1234", "Fedeadmin1234nueva"));
                Console.WriteLine("*****");
                //**********************************************************
                //FIN ACTUALIZAR CONTRASENA ADMINISTRADOR
                //**********************************************************
                //**********************************************************
                //OBTENER ADMINISTRADOR
                //**********************************************************
                Console.WriteLine("Obtener Administradores");
                ServicioProyectFinal.DtoAdministrador[] dtoAdministradores = cliente.obtenerTodosAdministradores();
                foreach (ServicioProyectFinal.DtoAdministrador c in dtoAdministradores)
                {
                    Console.WriteLine(c.Id + ", " + c.Nombre + ", " + c.Apellido + ", " + c.NombreUsuario + ", " + c.IdBarrio + ", " + c.Habilitado + ", " + c.Telefono + ", " + c.UltimaModificacionContrasena + ", " + c.FechaAlta);
                }
                Console.WriteLine("*****");
                //**********************************************************
                //FIN OBTENER ADMINISTRADOR
                //**********************************************************
                //**********************************************************
                //HABILITAR ADMINISTRADOR
                //**********************************************************
                Console.WriteLine("Habilitar Administrador");
                Console.WriteLine(cliente.habilitarAdministrador(3));
                Console.WriteLine("*****");
                //**********************************************************
                //FIN HABILITAR ADMINISTRADOR
                //**********************************************************
                //**********************************************************
                //DESHABILITAR ADMINISTRADOR
                //**********************************************************
                Console.WriteLine("Deshabilitar Administrador");
                Console.WriteLine(cliente.deshabilitarAdministrador(4));
                Console.WriteLine("*****");
                //**********************************************************
                //FIN DESHABILITAR ADMINISTRADOR
                //**********************************************************
                //**********************************************************
                //INGRESAR ADMINISTRADOR
                //**********************************************************
                Console.WriteLine("Ingresar Administrador");
                ServicioProyectFinal.DtoAdministrador admin = cliente.ingresarAdministrador("FedeSpeAdmin", "Fedeadmin1234nueva");
                if (admin != null)
                {
                    Console.WriteLine(admin.Id + ", " + admin.Nombre + ", " + admin.Apellido);
                }
                else {
                    Console.WriteLine("Usuario o contrasena no validos");
                }
                Console.WriteLine("*****");
                //**********************************************************
                //FIN INGRESAR ADMINISTRADOR
                //**********************************************************

                Console.ReadKey();
            }
        }
    }
}
