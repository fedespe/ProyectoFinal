﻿using BL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebAPI.Controllers
{
    public class ClienteController : ApiController
    {
        private ClienteBL clienteBL = new ClienteBL();
        private string mensajeOk = "OK";

        //[HttpGet]
        public IEnumerable<Cliente> GetAllClientes()
        {
            return clienteBL.obtenerTodos();
        }
        //[HttpGet]       
        public Cliente GetCliente(int id)
        {
            return clienteBL.obtener(id);
        }
        //[HttpPost]
        [ActionName("AltaCliente")]
        public string PostAltaCliente([FromBody]Cliente cli)
        {
            try
            {
                clienteBL.altaCliente(cli);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }
        }
        //[HttpPut]
        public string PutActualizarCliente([FromBody]Cliente cli)
        {
            try
            {
                clienteBL.actualizarCliente(cli);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }
        }
        //[HttpPost]//VER SI EL METODO ES GET, POST O PUT... 
        [HttpGet, Route("api/Cliente/actualizarContrasena/{id}/{contrasenaAnterior}/{contrasenaNueva}")]
        public string ActualizarContrasenaCliente(int id, string contrasenaAnterior, string contrasenaNueva)
        {
            try
            {
                clienteBL.actualizarContrasena(id, contrasenaAnterior, contrasenaNueva);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }
        }
        [HttpGet]
        public string GetHabilitarCliente(int id)
        {
            try
            {
                clienteBL.habilitarCliente(id);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }
        }
        [HttpGet]
        public string GetDeshabilitarCliente(int id)
        {
            try
            {
                clienteBL.deshabilitarCliente(id);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]//VER SI EL METODO ES GET, POST 
        public Cliente GetIngresarCliente(string nombreUsuario, string pass)
        {
            Cliente cli = clienteBL.ingresarCliente(nombreUsuario, pass);
            
            return cli;
        }

    }
}
