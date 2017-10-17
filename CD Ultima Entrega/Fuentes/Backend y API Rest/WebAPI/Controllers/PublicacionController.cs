﻿using BL;
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
        private SolicitudBL solicitudBL = new SolicitudBL();
        private OfertaBL ofertaBL = new OfertaBL();
        private Retorno retorno = new Retorno();

        //Servicio por Get sin parámetros (Retorna todos)
        [HttpGet, Route("api/Publicacion/obtenerTodas")]
        [Authorize]
        //Confirmar con Federico que todos puedan acceder a esto
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
        [Authorize]
        //Confirmar con Federico que todos puedan acceder a esto
        //En caso se estar deshabilitada? Si es cliente solo podría el dueño? Otro que la haya contratado antes? Se puede dar el caso?
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
        [HttpGet, Route("api/Publicacion/obtenerPublicacionesContratadasPorCliente/{id}")]
        [Authorize]
        //El Id que llega es el del cliente no?
        //En caso de ser cliente, sólo podría ver las suyas?
        public Retorno GetPublicacionesContratadasPorCliente(int id)
        {
            try
            {
                List<Publicacion> publicaciones = publicacionBL.obtenerPublicacionesContratadasPorCliente(id).Where(p => p.Tipo.Equals("OFERTA")).ToList();
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
        [HttpGet, Route("api/Publicacion/obtenerPublicacionesClienteOferta/{id}")]
        [Authorize]
        //El Id que llega es el del cliente no?
        //En caso de ser cliente, sólo podría ver las suyas?
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
        [Authorize]
        //El Id que llega es el del cliente no?
        //En caso de ser cliente, sólo podría ver las suyas?
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
        [HttpGet, Route("api/Publicacion/obtenerPublicacionesServicioOferta/{id}")]
        [Authorize]
        //El Id que llega es el del servicio no?
        //En caso de ser cliente, sólo podría ver las suyas?
        public Retorno GetPublicacionesServicioOferta(int id)
        {
            try
            {
                List<Oferta> publicaciones = ofertaBL.obtenerPublicacionesOfertaServicio(id).Where(p => p.Activa).Where(p => !p.Finalizada).ToList();
                foreach (Oferta p in publicaciones)
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
        [HttpGet, Route("api/Publicacion/obtenerPublicacionesServicioSolicitud/{id}")]
        [Authorize]
        //El Id que llega es el del servicio no?
        //En caso de ser cliente, sólo podría ver las suyas?
        public Retorno GetPublicacionesServicioSolicitud(int id)
        {
            try
            {
                List<Publicacion> publicaciones = publicacionBL.obtenerPublicacionesServicio(id).Where(p => p.Tipo.Equals("SOLICITUD")).Where(p => p.Activa).Where(p => !p.Finalizada).ToList();
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
        [Authorize(Roles = "CLIENTE")]
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
        [Authorize]
        //Administradores pueden editarlas? Lo necesitan?
        //Si es cliente sólo debería poder editarla si es suya
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
        [Authorize]
        //Administradores pueden habilitarlas? Lo necesitan?
        //Si es cliente solo puede habilitar alguna suya
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
        [Authorize]
        //Administradores pueden deshabilitarlas? Lo necesitan?
        //Si es cliente solo puede deshabilitar alguna suya
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
        //Ver con Federico a ver qué es exactamente
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

        //Servicio por Post para alta
        [HttpPost, Route("api/Publicacion/altaPresupuesto")]
        [Authorize(Roles = "CLIENTE")]
        public Retorno PostAltaPresupuesto([FromBody]Presupuesto presupuesto)
        {
            try
            {
                solicitudBL.altaPresupuesto(presupuesto);
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }
        //Servicio por Get sin parámetros (Retorna todos)
        [HttpGet, Route("api/Publicacion/obtenerPresupuestos/{idPub}")]
        [Authorize(Roles = "CLIENTE")]
        //El Administrador lo necesitaría?
        //Sólo lo podría ver el cliente dueño de la publicación, no? O quedó visible de forma pública esto al final?
        public Retorno GetAllPresupuestos(int idPub)
        {
            try
            {
                List<Presupuesto> presupuestos = solicitudBL.obtenerPresupuestos(idPub);
                foreach (Presupuesto p in presupuestos)
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

        [Authorize(Roles = "CLIENTE")]
        //Corroborar que sea el cliente dueño de la publicación
        [HttpPut, Route("api/Publicacion/aceptarPresupuesto")]
        public Retorno PutAceptarPresupuesto([FromBody]Presupuesto presupuesto)
        {
            try
            {
                solicitudBL.aceptarPresupuesto(presupuesto);
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }


        [HttpGet, Route("api/Publicacion/obtenerSolicitudesCliente/{id}")]
        //Qué cliente podría verlo?
        public Retorno GetSolicitudesCliente(int id)
        {
            try
            {
                List<Solicitud> solicitudes = solicitudBL.obtenerSolicitudesCliente(id);
                foreach (Solicitud s in solicitudes)
                {
                    retorno.Objetos.Add(s);
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
        [HttpGet, Route("api/Publicacion/obtenerSolicitudesAceptadas/{idClienteAceptado}")]
        //Qué cliente podría verlo?
        public Retorno GetSolicitudesAceptadas(int idClienteAceptado)
        {
            try
            {
                List<Solicitud> solicitudes = solicitudBL.obtenerSolicitudesAceptadas(idClienteAceptado);
                foreach (Solicitud s in solicitudes)
                {
                    retorno.Objetos.Add(s);
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