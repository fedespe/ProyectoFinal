using BL;
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

        [HttpGet, Route("api/Cliente/obtenerTodos")]
        public IEnumerable<Cliente> GetAllClientes()
        {
            return clienteBL.obtenerTodos();
        }
        [HttpGet, Route("api/Cliente/obtener/{id}")]
        public Cliente GetCliente(int id)
        {
            return clienteBL.obtener(id);
        }
        [HttpPost, Route("api/Cliente/altaCliente")]
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
        [HttpPut, Route("api/Cliente/actualizarCliente")]
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
        [HttpGet, Route("api/Cliente/actualizarContrasena/{id}/{contrasenaAnterior}/{contrasenaNueva}")]
        public string GetActualizarContrasenaCliente(int id, string contrasenaAnterior, string contrasenaNueva)
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
        [HttpGet, Route("api/Cliente/habilitarCliente/{id}")]
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
        [HttpGet, Route("api/Cliente/deshabilitarCliente/{id}")]
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
        [HttpGet, Route("api/Cliente/ingresarCliente/{nombreUsuario}/{pass}")]
        public Cliente GetIngresarCliente(string nombreUsuario, string pass)
        {
            Cliente cli = clienteBL.ingresarCliente(nombreUsuario, pass);
            
            return cli;
        }

    }
}
