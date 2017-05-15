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
                cliente.altaCliente("Federico", "Speroni", "Fede1234", "FedeSpe", "fsperonip@hotmail.com", "099845498", true, "42614099");
            }
        }
    }
}
