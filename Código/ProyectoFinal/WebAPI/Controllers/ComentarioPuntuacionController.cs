using BL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class ComentarioPuntuacionController : ApiController
    {
        private ComentarioPuntuacionBL comentarioPuntuacionBL = new ComentarioPuntuacionBL();
        private Retorno retorno = new Retorno();

        [HttpPost, Route("api/ComentarioPuntuacion/altaContacto")]
        //Qué sería? Cuando solicito ver los datos de alguien?
        public Retorno PostAltaContacto([FromBody]Contacto contacto)
        {
            try
            {
                comentarioPuntuacionBL.altaContacto(contacto);
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }
        [HttpPost, Route("api/ComentarioPuntuacion/altaRespuestaComentario")]
        //Sería cuando se responde una puntuación? Qué cliente lo utilizaría exactamente?
        public Retorno PostAltaRespuestaComentario([FromBody]ComentarioPuntuacion comentarioPuntuacion)
        {
            try
            {
                comentarioPuntuacionBL.altaRespuestaComentario(comentarioPuntuacion);
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }
        [HttpPost, Route("api/ComentarioPuntuacion/altaComentarioPuntuacion")]
        //Sería al puntuar a un cliente? Qué cliente lo utilizaría exactamente?
        public Retorno PostAltaComentarioPuntuacion([FromBody]ComentarioPuntuacion comentarioPuntuacion)
        {
            try
            {
                comentarioPuntuacionBL.altaComentarioPuntuacion(comentarioPuntuacion);
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }

        [HttpGet, Route("api/ComentarioPuntuacion/obtenerPorPublicacion/{id}")]
        //Para qué se usa con exactitud?
        public Retorno GetComentarioPuntuacionPorPublicacion(int id)
        {
            try
            {
                List<ComentarioPuntuacion> comentariosPuntuacion = comentarioPuntuacionBL.obtenerPorPublicacion(id);
                foreach (ComentarioPuntuacion c in comentariosPuntuacion)
                {
                    retorno.Objetos.Add(c);
                }
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }

        [HttpGet, Route("api/ComentarioPuntuacion/obtenerPromedioPuntajePublicacion/{id}")]
        //Para qué se usa con exactitud?
        public Retorno GetPromedioPuntajePublicacion(int id)
        {
            try
            {
                double promedio = comentarioPuntuacionBL.obtenerPromedioPuntajePublicacion(id);
                retorno.Objetos.Add(promedio);
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }
        [HttpGet, Route("api/ComentarioPuntuacion/obtenerPromedioPuntajeClienteServicio/{idCli}/{idServicio}")]
        //Para qué se usa con exactitud?
        public Retorno GetPromedioPuntajeClienteServicio(int idCli, int idServicio)
        {
            try
            {
                double promedio = comentarioPuntuacionBL.obtenerPromedioPuntajeClienteServicio(idCli,idServicio);
                retorno.Objetos.Add(promedio);
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }

        [HttpGet, Route("api/ComentarioPuntuacion/obtenerContactoConComentarioPendienteCliente/{idPublicacion}/{idCliente}")]
        //Qué cliente tendría acceso?
        public Retorno GetContactoConComentarioPendienteCliente(int idPublicacion, int idCliente)
        {
            try
            {
                Contacto contacto = comentarioPuntuacionBL.obtenerContactoConComentarioPendienteCliente(idPublicacion, idCliente);
                retorno.Objetos.Add(contacto);
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }
        [HttpGet, Route("api/ComentarioPuntuacion/obtenerTodosContactosConComentariosPendientesOferta/{idCliente}")]
        //Qué cliente tendría acceso?
        public Retorno GetTodosContactosConComentariosPendientesOferta(int idCliente)
        {
            try
            {
                List<Contacto> contactos = comentarioPuntuacionBL.obtenerTodosContactosConComentariosPendientesOferta(idCliente);
                foreach (Contacto c in contactos)
                {
                    retorno.Objetos.Add(c);
                }
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }
        [HttpGet, Route("api/ComentarioPuntuacion/obtenerTodosContactosConComentariosPendientesSolicitud/{idCliente}")]
        //Qué cliente tendría acceso?
        public Retorno GetTodosContactosConComentariosPendientesSolicitud(int idCliente)
        {
            try
            {
                List<Contacto> contactos = comentarioPuntuacionBL.obtenerTodosContactosConComentariosPendientesSolicitud(idCliente);
                foreach (Contacto c in contactos)
                {
                    retorno.Objetos.Add(c);
                }
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }

        [HttpGet, Route("api/ComentarioPuntuacion/obtenerComentariosOferta/{idCliente}")]
        //Que sería exactamente?
        public Retorno GetComentariosOferta(int idCliente)
        {
            try
            {
                List<ComentarioPuntuacion> comentariosPuntuacion = comentarioPuntuacionBL.obtenerComentariosOferta(idCliente);
                foreach (ComentarioPuntuacion c in comentariosPuntuacion)
                {
                    retorno.Objetos.Add(c);
                }
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }
        [HttpGet, Route("api/ComentarioPuntuacion/obtenerComentariosSolicitud/{idCliente}")]
        //Qué sería exactamente?
        public Retorno GetComentariosSolicitud(int idCliente)
        {
            try
            {
                List<ComentarioPuntuacion> comentariosPuntuacion = comentarioPuntuacionBL.obtenerComentariosSolicitud(idCliente);
                foreach (ComentarioPuntuacion c in comentariosPuntuacion)
                {
                    retorno.Objetos.Add(c);
                }
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }

    }
}
