using DAL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class PublicacionBL
    {
        private PublicacionDAL publicacionDAL = new PublicacionDAL();

        public void altaPublicacion(Publicacion publicacion)
        {
            validarPublicacion(publicacion);
            publicacionDAL.altaPublicacion(publicacion);
        }
        public void actualizarPublicacion(Publicacion publicacion)
        {
            validarPublicacion(publicacion);
            publicacionDAL.actualizarPublicacion(publicacion);
        }
        public List<Publicacion> obtenerTodos()
        {
            return publicacionDAL.obtenerTodos();
        }
        public Publicacion obtener(int id)
        {
            return publicacionDAL.obtener(id);
        }
        public List<Publicacion> obtenerPublicacionesCliente(int idCliente)
        {
            return publicacionDAL.obtenerPublicacionesCliente(idCliente);
        }
        public List<Publicacion> obtenerPublicacionesServicio(int idServicio)
        {
            return publicacionDAL.obtenerPublicacionesServicio(idServicio);
        }
        public void habilitarPublicacion(int id)
        {
            publicacionDAL.habilitarPublicacion(id);
        }
        public void deshabilitarPublicacion(int id)
        {
            publicacionDAL.deshabilitarPublicacion(id);
        }
        public int obtenerUltimoIdPublicacionCliente(int idCliente) {
            return publicacionDAL.obtenerUltimoIdPublicacionCliente(idCliente);
        }
        public void guardarImagenesPublicacion(Publicacion publicacion) {
            publicacionDAL.guardarImagenePublicacion(publicacion);
        }
        //VER VALIDACIONES
        private void validarPublicacion(Publicacion publicacion)
        {
            //if (publicacion.Respuestas == null)
            //{
            //    throw new ProyectoException("Error: La publicación debe contener respuestas asociadas");
            //}
            if (publicacion.Titulo.Length < 3)
            {
                throw new ProyectoException("Error: Título debe contener al menos 3 caracteres");
            }
            if (publicacion.Imagenes==null)
            {
                throw new ProyectoException("Error: La publicación debe tener al menos una imagen");
            }
        }
    }
}
