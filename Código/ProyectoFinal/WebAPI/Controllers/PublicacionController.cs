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
    public class PublicacionController : ApiController
    {
        private PublicacionBL publicacionBL = new PublicacionBL();
        private Retorno retorno = new Retorno();

        //Servicio por Get sin parámetros (Retorna todos)
        [HttpGet, Route("api/Publicacion/obtenerTodas")]
        public Retorno GetAllPublicaciones()
        {
            try
            {
                List<Publicacion> publicaciones = publicacionBL.obtenerTodos();
                foreach (Publicacion p in publicaciones)
                {
                    retorno.Objetos.Add(p);
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

        //Servicio por Get con parámetro (Retorna el que tiene el id que llega por parámetro)
        [HttpGet, Route("api/Publicacion/obtener/{id}")]
        public Retorno GetPublicacion(int id)
        {
            try
            {
                Publicacion publicacion = publicacionBL.obtener(id);
                retorno.Objetos.Add(publicacion);
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }
        //Servicio por Get con parámetro (Retorna el que tiene el id que llega por parámetro)
        [HttpGet, Route("api/Publicacion/obtenerPublicacionesClienteOferta/{id}")]
        public Retorno GetPublicacionesClienteOferta(int id)
        {
            try
            {               
                List<Publicacion> publicaciones = publicacionBL.obtenerPublicacionesCliente(id).Where(p => p.Tipo.Equals("OFERTA")).OrderBy(p => p.Servicio.Nombre).ToList();
                foreach (Publicacion p in publicaciones)
                {
                    retorno.Objetos.Add(p);
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

        //Servicio por Get con parámetro (Retorna el que tiene el id que llega por parámetro)
        [HttpGet, Route("api/Publicacion/obtenerPublicacionesClienteSolicitud/{id}")]
        public Retorno GetPublicacionesClienteSolicitud(int id)
        {
            try
            {
                List<Publicacion> publicaciones = publicacionBL.obtenerPublicacionesCliente(id).Where(p => p.Tipo.Equals("SOLICITUD")).OrderBy(p => p.Servicio.Nombre).ToList();
                foreach (Publicacion p in publicaciones)
                {
                    retorno.Objetos.Add(p);
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
        //Servicio por Get con parámetro (Retorna el que tiene el id que llega por parámetro)
        [HttpGet, Route("api/Publicacion/obtenerPublicacionesServicio/{id}")]
        public Retorno GetPublicacionesServicio(int id)
        {
            try
            {
                List<Publicacion> publicaciones = publicacionBL.obtenerPublicacionesServicio(id);
                foreach (Publicacion p in publicaciones)
                {
                    retorno.Objetos.Add(p);
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

        //Servicio por Post para alta
        [HttpPost, Route("api/Publicacion/altaPublicacion")]
        public Retorno PostAltaPublicacion([FromBody]Publicacion publicacion)
        {
            try
            {
                publicacionBL.altaPublicacion(publicacion);
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }
        //Servicio por Put para modificación (Recibe el objeto a modificar en el Body)
        [HttpPut, Route("api/Publicacion/actualizarPublicacion")]
        public Retorno PutActualizarPublicacion([FromBody]Publicacion publicacion)
        {
            try
            {
                publicacionBL.actualizarPublicacion(publicacion);
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }
        //Servicio por Put para modificación (Recibe el objeto a modificar en el Body)
        [HttpGet, Route("api/Publicacion/habilitarPublicacion/{id}")]
        public Retorno GetHabilitarPublicacion(int id)
        {
            try
            {
                publicacionBL.habilitarPublicacion(id);
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }

        //Servicio por Put para modificación (Recibe el objeto a modificar en el Body)
        [HttpGet, Route("api/Publicacion/deshabilitarPublicacion/{id}")]
        public Retorno GetDeshabilitarPublicacion(int id)
        {
            try
            {
                publicacionBL.deshabilitarPublicacion(id);
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }

        [HttpGet, Route("api/Publicacion/obtenerUltimoIdPublicacionCliente/{id}")]
        public Retorno obtenerUltimoIdPublicacionCliente(int id)
        {
            try
            {
                retorno.Objetos.Add(publicacionBL.obtenerUltimoIdPublicacionCliente(id)); ;
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
