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
    }
}
