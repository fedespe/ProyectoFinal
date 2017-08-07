using DAL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class SolicitudBL
    {
        private SolicitudDAL solicitudDAL = new SolicitudDAL();

        //Alta solicitud es realizada por altaPublicacion en PublicacionBL.
        //Actualizar solicitud es realizada por actualizarPublicacion en PublicacionBL

        public List<Solicitud> obtenerTodos()
        {
            return solicitudDAL.obtenerTodos();
        }
        public Solicitud obtener(int id)
        {
            return solicitudDAL.obtener(id);
        }
        public List<Solicitud> obtenerSolicitudesCliente(int idCliente)
        {
            return solicitudDAL.obtenerSolicitudesCliente(idCliente);
        }
        public List<Solicitud> obtenerSolicitudesContratadasPorCliente(int idCliente)
        {
            return solicitudDAL.obtenerSolicitudesContratadasPorCliente(idCliente);
        }
        public List<Solicitud> obtenerSolicitudesServicio(int idServicio)
        {
            return solicitudDAL.obtenerSolicitudesServicio(idServicio);
        }


        //VER VALIDACIONES
        private void validarSolicitud(Solicitud solicitud)
        {
            if (solicitud.Titulo.Length < 3)
            {
                throw new ProyectoException("Error: Título debe contener al menos 3 caracteres");
            }
            if (solicitud.Imagenes == null)
            {
                throw new ProyectoException("Error: La publicación debe tener al menos una imagen");
            }
        }

        //PRESUPUESTO
        public void altaPresupuesto(Presupuesto presupuesto)
        {
            validarPresupuesto(presupuesto);
            solicitudDAL.altaPresupuesto(presupuesto);
        }
        public List<Presupuesto> obtenerPresupuestos(int idPublicacion)
        {
            return solicitudDAL.obtenerPresupuestos(idPublicacion);
        }
        private void validarPresupuesto(Presupuesto presupuesto)
        {
            if (presupuesto.Cliente==null || presupuesto.Cliente.Id==0)
            {
               throw new ProyectoException("Error: Cliente");
            }
            if (presupuesto.Solicitud==null || presupuesto.Solicitud.Id == 0)
            {
                throw new ProyectoException("Error: Solicitud");
            }
        }


    }
}
