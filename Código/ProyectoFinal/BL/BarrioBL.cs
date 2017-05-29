using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using ET;

namespace BL
{
    public class BarrioBL
    {
        private BarrioDAL barrioDAL = new BarrioDAL();

        public void altaBarrio(Barrio barrio)
        {
            barrioDAL.altaBarrio(barrio);
        }
        public void actualizarBarrio(Barrio barrio)
        {
            barrioDAL.actualizarBarrio(barrio);
        }
        public void eliminarBarrio(Barrio barrio)
        {
            barrioDAL.eliminarBarrio(barrio);
        }
        public Barrio obtener(int id)
        {
            return barrioDAL.obtener(id);
        }
        public List<Barrio> obtener(Departamento departamento)
        {
            return barrioDAL.obtener(departamento);
        }
        public List<Barrio> obtenerTodos()
        {
            return barrioDAL.obtenerTodos();
        } 
    }
}
