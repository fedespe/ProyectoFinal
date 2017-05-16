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

                Console.ReadKey();
            }
        }
    }
}
