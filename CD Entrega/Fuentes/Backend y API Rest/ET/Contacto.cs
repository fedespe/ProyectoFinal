using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ET
{
    public class Contacto
    {
        public int Id { get; set; }
        public Cliente Cliente { get; set; }
        public Publicacion Publicacion { get; set; }
        public ComentarioPuntuacion ComentarioPublicacion { get; set; }
        public DateTime Fecha { get; set; }
    }
}
