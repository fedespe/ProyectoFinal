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
        //Bidireccionalidad
        //public List<Contacto> ContactosConComentarioPendiente { get; set; }
        public ComentarioPuntuacion ComentarioPuntuacion { get; set; }
        public bool Finalizada { get; set; }
        public bool Habilitada { get; set; }
        //public override bool Equals(object obj)
        //{
        //    if (obj is Publicacion)
        //    {//No se por que cuando edito una pregunta entra y compara con string vacio que no es una categoria por eso el control
        //        Publicacion p = (Publicacion)obj;
        //        return p.Id == this.Id;
        //    }
        //    return false;
        //}
    }
}
