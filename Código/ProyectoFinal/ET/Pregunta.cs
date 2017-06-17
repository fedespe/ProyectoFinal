using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ET
{
    public class Pregunta
    {
        public int Id { get; set; }
        public string unaPregunta { get; set; }
        public CategoriaPregunta Categoria { get; set; }

        public override bool Equals(object obj)
        {
            if (obj is Pregunta)
            {//No se por que cuando edito una pregunta entra y compara con string vacio que no es una categoria por eso el control
                Pregunta p = (Pregunta)obj;
                return p.Id == this.Id;
            }
            return false;
        }
    }
}
