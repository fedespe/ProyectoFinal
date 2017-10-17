using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ET
{
    public class Barrio
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public Departamento Departamento { get; set; }
    }
}
