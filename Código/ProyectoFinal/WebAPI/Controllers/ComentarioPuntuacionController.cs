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

    }
}
