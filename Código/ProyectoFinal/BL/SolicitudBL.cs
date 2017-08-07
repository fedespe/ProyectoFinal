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
        //public void habilitarSolicitud(int id)
        //{
        //    solicitudDAL.habilitarSolicitud(id);
        //}
        //public void deshabilitarSolicitud(int id)
        //{
        //    solicitudDAL.deshabilitarSolicitud(id);
        //}
        //public int obtenerUltimoIdSolicitudCliente(int idCliente)
        //{
        //    return publicacionDAL.obtenerUltimoIdSolicitudCliente(idCliente);
        //}
        //public void guardarImagenesSolicitud(Solicitud solicitud)
        //{
        //    publicacionDAL.guardarImagenePublicacion(publicacion);
        //}

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
    }
}
