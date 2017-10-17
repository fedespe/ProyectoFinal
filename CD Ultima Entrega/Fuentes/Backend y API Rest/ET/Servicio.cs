using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ET
{
    public class Servicio
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Imagen { get; set; }
        public bool Habilitado { get; set; }
        public DateTime FechaCreacion { get; set; }
        public List<Pregunta> Preguntas { get; set; }

        public Servicio() {
            Preguntas = new List<Pregunta>();
        }
    }
}
