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
                ServicioProyectFinal.DtoCliente[] dtoClientes = cliente.obtenerTodos();
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

                Console.ReadKey();
            }
        }
    }
}
