using BL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;
using WebAPI.Models.Cliente;

namespace WebAPI.Controllers
{
    public class ClienteController : ApiController
    {
        private ClienteBL clienteBL = new ClienteBL();
        private Retorno retorno = new Retorno();

        //Servicio por Get sin parámetros (Retorna todos)
        [HttpGet, Route("api/Cliente/obtenerTodos")]
        public Retorno GetAllClientes()
        {
            try
            {
                List<Cliente> clientes = clienteBL.obtenerTodos();
                foreach (Cliente c in clientes)
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

        //Servicio por Get con parámetro (Retorna el que tiene el id que llega por parámetro)
        [HttpGet, Route("api/Cliente/obtener/{id}")]
        public Retorno GetCliente(int id)
        {
            try
            {
                Cliente cliente = clienteBL.obtener(id);
                retorno.Objetos.Add(cliente);
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
        [HttpPost, Route("api/Cliente/altaCliente")]
        public Retorno PostAltaCliente([FromBody]Cliente cliente)
        {
            try
            {
                clienteBL.altaCliente(cliente);
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
        [HttpPut, Route("api/Cliente/actualizarCliente")]
        public Retorno PutActualizarCliente([FromBody]Cliente cliente)
        {
            try
            {
                clienteBL.actualizarCliente(cliente);
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
        [HttpPut, Route("api/Cliente/habilitarCliente")]
        public Retorno PutHabilitarCliente([FromBody]Cliente cliente)
        {
            try
            {
                clienteBL.habilitarCliente(cliente.Id);
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
        [HttpPut, Route("api/Cliente/habilitarCliente")]
        public Retorno PutDeshabilitarCliente([FromBody]Cliente cliente)
        {
            try
            {
                clienteBL.deshabilitarCliente(cliente.Id);
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
        [HttpPut, Route("api/Cliente/actualizarContrasena")]
        public Retorno PutActualizarContrasenaCliente([FromBody]ActualizarContrasena actualizarContrasena)
        {
            try
            {
                clienteBL.actualizarContrasena(actualizarContrasena.IdUsuario, actualizarContrasena.Contrasena, actualizarContrasena.ContrasenaNueva);
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
            }
            return retorno;
        }

        [HttpPost, Route("api/Cliente/ingresarCliente")]
        public Retorno PostIngresarCliente([FromBody]Cliente cliente)
        {
            try
            {
                Cliente cli = clienteBL.ingresarCliente(cliente.NombreUsuario, cliente.Contrasena);
                if (cli != null)
                {
                    retorno.Objetos.Add(cli);
                    retorno.Codigo = 200;
                }
                else {
                    retorno.Codigo = 1;
                    retorno.Mensaje = "Datos incorrectos.";
                }
                
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
