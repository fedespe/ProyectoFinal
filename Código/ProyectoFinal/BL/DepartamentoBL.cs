using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using ET;

namespace BL
{
    public class DepartamentoBL
    {
        private DepartamentoDAL departamentoDAL = new DepartamentoDAL();

        public void altaDepartamento(Departamento departamento)
        {
            departamentoDAL.altaDepartamento(departamento);
        }
        public void actualizarDepartamento(Departamento departamento)
        {
            departamentoDAL.actualizarDepartamento(departamento);
        }
        public void eliminarDepartamento(Departamento departamento)
        {
            departamentoDAL.eliminarDepartamento(departamento);
        }
        public Departamento obtener(int id)
        {
            return departamentoDAL.obtener(id);
        }
        public List<Departamento> obtenerTodos()
        {
            return departamentoDAL.obtenerTodos();
        }
    }
}
