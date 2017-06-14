using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ET
{
    public class Publicacion
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descripcion { get; set; }
        public bool Activa { get; set; }
        public DateTime FechaAlta { get; set; }
        public DateTime FechaVencimiento { get; set; }
        public string Tipo { get; set; }
        public List<string> Imagenes { get; set; }
        public Servicio Servicio { get; set; }
        public Cliente Cliente { get; set; }
        public List<Respuesta> Respuestas { get; set; }
    }
}
