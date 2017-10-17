using DAL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ServicioBL
    {
        private ServicioDAL servicioDAL = new ServicioDAL();

        //VER SI ES NECESARIO ELIMINAR UNA PREGUNTA
        public void altaServicio(Servicio servicio)
        {
            validarServicio(servicio);
            servicioDAL.altaServicio(servicio);
        }
        public void actualizarServicio(Servicio servicio)
        {
            validarServicio(servicio);
            servicioDAL.actualizarServicio(servicio);
        }
        public List<Servicio> obtenerTodos()
        {
            return servicioDAL.obtenerTodos();
        }
        public Servicio obtener(int id)
        {
            return servicioDAL.obtener(id);
        }
        public void habilitarServicio(int id)
        {
            servicioDAL.habilitarServicio(id);
        }
        public void deshabilitarServicio(int id)
        {
            servicioDAL.deshabilitarServicio(id);
        }


        //ver validaciones
        private void validarServicio(Servicio servicio)
        {
            if (servicio.Nombre.Length < 3)
            {
                throw new ProyectoException("Error: Nombre");
            }
            if (servicio.Preguntas.Count == 0)
            {
                throw new ProyectoException("Error: El servicio debe contener preguntas.");
            }
        }
    }
}
