using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ET
{
    public class ComentarioPuntuacion
    {
        public int Id { get; set; }
        public string Comentario { get; set; }
        public int Puntuacion { get; set; }
        public Publicacion Publicacion { get; set; }
        //Cliente que utiliza el servicio y realiza comentario y puntuacion
        public Cliente Cliente { get; set; }

    }
}
