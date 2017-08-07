using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ET
{
    public class Presupuesto
    {
        public Cliente Cliente { get; set; }
        public string Comentario { get; set; }
        public bool Aceptado { get; set; }
    }
}
