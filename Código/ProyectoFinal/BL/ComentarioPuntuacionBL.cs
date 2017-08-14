﻿using DAL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class ComentarioPuntuacionBL
    {
        private ComentarioPuntuacionDAL comentarioPuntuacionDAL = new ComentarioPuntuacionDAL();

        //VER SI ES NECESARIO ELIMINAR UNA PREGUNTA
        public void altaComentarioPuntuacion(ComentarioPuntuacion comentarioPuntuacion)
        {
            validarComentarioPuntuacion(comentarioPuntuacion);
            comentarioPuntuacionDAL.altaComentarioPuntuacion(comentarioPuntuacion);
        }
        public void altaRespuestaComentario(ComentarioPuntuacion comentarioPuntuacion)
        {
            validarRespuesta(comentarioPuntuacion);
            comentarioPuntuacionDAL.altaRespuestaComentario(comentarioPuntuacion);
        }
        //Solo para administradores
        public void borrarComentarioPuntuacion(ComentarioPuntuacion comentarioPuntuacion)
        {         
            comentarioPuntuacionDAL.borrarComentarioPuntuacion(comentarioPuntuacion);
        }
        public List<ComentarioPuntuacion> obtenerPorPublicacion(int idPublicacion)
        {
            return comentarioPuntuacionDAL.obtenerPorPublicacion(idPublicacion);
        }
        public double obtenerPromedioPuntajePublicacion(int idPublicacion)
        {
            return comentarioPuntuacionDAL.obtenerPromedioPuntajePublicacion(idPublicacion);
        }

        public double obtenerPromedioPuntajeClienteServicio(int idCliente, int idServicio)
        {
            return comentarioPuntuacionDAL.obtenerPromedioPuntajeClienteServicio(idCliente, idServicio);
        }
        public List<ComentarioPuntuacion> obtenerComentariosOferta(int idCliente)
        {
            return comentarioPuntuacionDAL.obtenerComentariosOferta(idCliente);
        }
        public List<ComentarioPuntuacion> obtenerComentariosSolicitud(int idCliente)
        {
            return comentarioPuntuacionDAL.obtenerComentariosSolicitud(idCliente);
        }

        private void validarRespuesta(ComentarioPuntuacion comentarioPuntuacion)
        {
            if (comentarioPuntuacion.Respuesta == null || comentarioPuntuacion.Respuesta == "")
            {
                throw new ProyectoException("Error: Respuesta");
            }
            if (comentarioPuntuacion.Id == 0)
            {
                throw new ProyectoException("Error: Id Comentario");
            }
        }
        //ver validaciones
        private void validarComentarioPuntuacion(ComentarioPuntuacion comentarioPuntuacion)
        {
            if (comentarioPuntuacion.Comentario==null || comentarioPuntuacion.Comentario.Length < 2)
            {
                throw new ProyectoException("Error: Comentario");
            }
            if (comentarioPuntuacion.Puntuacion < 0 || comentarioPuntuacion.Puntuacion >5)
            {
                throw new ProyectoException("Error: Puntuación");
            }
            if (comentarioPuntuacion.Publicacion.Id == 0)
            {
                throw new ProyectoException("Error: Id Publicación");
            }
            if (comentarioPuntuacion.Cliente.Id == 0)
            {
                throw new ProyectoException("Error: Id Cliente");
            }
        }



        //Contacto!

        public void altaContacto(Contacto contacto)
        {
            validarContacto(contacto);
            comentarioPuntuacionDAL.altaContacto(contacto);
        }
        //Obtiene si es que tiene concto con comentario pendiente de cliente idCliente en la publicacion idPublicacion
        public Contacto obtenerContactoConComentarioPendienteCliente(int idPublicacion, int idCliente)
        {
            return comentarioPuntuacionDAL.obtenerContactoConComentarioPendienteCliente(idPublicacion, idCliente);
        }
        public List<Contacto> obtenerTodosContactosConComentariosPendientesOferta(int idCliente)
        {
            return comentarioPuntuacionDAL.obtenerTodosContactosConComentariosPendientesOferta(idCliente);
        }
        public List<Contacto> obtenerTodosContactosConComentariosPendientesSolicitud(int idCliente)
        {
            return comentarioPuntuacionDAL.obtenerTodosContactosConComentariosPendientesSolicitud(idCliente);
        }

        private void validarContacto(Contacto contacto)
        {
            if(contacto == null)
            {
                throw new ProyectoException("Error: Contacto");
            }
            else
            {
                if (contacto.Publicacion.Id == 0)
                {
                    throw new ProyectoException("Error: IdPublicacion");
                }
                if (contacto.Cliente.Id == 0)
                {
                    throw new ProyectoException("Error: IdCliente");
                }
            }
        }

    }
}
