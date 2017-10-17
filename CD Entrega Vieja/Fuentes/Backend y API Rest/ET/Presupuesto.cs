using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ET
{
    public class Presupuesto
    {
        public int Id { get; set; }
        public Cliente Cliente { get; set; }
        public string Comentario { get; set; }
        public bool Aceptado { get; set; }
        public DateTime Fecha { get; set; }
        //Bidireccionalidad para poder guardar los datos del front mas facil
        public Solicitud Solicitud { get; set; }
    }
}
