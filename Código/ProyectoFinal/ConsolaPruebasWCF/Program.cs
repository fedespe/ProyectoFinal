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
                var clientes = cliente.getClientes();
            }
        }
    }
}
