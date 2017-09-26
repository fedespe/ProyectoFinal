using DAL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class OfertaBL
    {
        private OfertaDAL ofertaDAL = new OfertaDAL();

        public List<Oferta> obtenerPublicacionesOfertaServicio(int idServicio)
        {
            return ofertaDAL.obtenerPublicacionesOfertaServicio(idServicio);
        }
    }
}
