using BL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using WebAPI.Models;
using WebAPI.Models.Cliente;

namespace WebAPI.Controllers
{
    public class ClienteController : ApiController
    {
        private ClienteBL clienteBL = new ClienteBL();
        private Retorno retorno = new Retorno();
        private HttpContext httpContext = HttpContext.Current;

        [Authorize(Roles = "CLIENTE")]
        [HttpGet, Route("api/Cliente/obtenerClienteLogueado")]
        public Retorno GetClienteLogueado()
        {
            //De esta forma puedo obtener el id del usuario logueado
            //Ver el tema del Lambda que seguro se puede mejorar, tiré ese que se que anda...
            var identity = (ClaimsIdentity)User.Identity;
            var id = identity.Claims.Where(c => c.Type == "id").Select(c => c.Value);
            string idString = string.Join(",", id.ToList());
            int idInt = Int32.Parse(idString);
            try
            {
                Cliente cliente = clienteBL.obtener(idInt);
                retorno.Objetos.Add(cliente);
                retorno.Codigo = 200;
            }
            catch (ProyectoException ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
                retorno.Objetos = null;
            }
            return retorno;
        }

        //Servicio por Get sin parámetros (Retorna todos)
        [Authorize(Roles = "SUPERADMINISTRADOR,ADMINISTRADOR")]
        [HttpGet, Route("api/Cliente/obtenerTodos")]
        public Retorno GetAllClientes()
        {
            //De esta forma puedo obtener el id del usuario logueado
            //Ver el tema del Lambda que seguro se puede mejorar, tiré ese que se que anda...
            //var identity = (ClaimsIdentity)User.Identity;
            //var id = identity.Claims.Where(c => c.Type == "id").Select(c => c.Value);
            //retorno.Objetos.Add(new { Id = string.Join(",", id.ToList())});

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
                retorno.Objetos = null;
            }
            return retorno;
        }

        //Servicio por Get con parámetro (Retorna el que tiene el id que llega por parámetro)
        [Authorize]
        //Tenemos que controlar que si pide los datos de un cliente y no es administrador o él mismo, tenga alguna publicación por la que justifique que vea los datos
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
                retorno.Objetos = null;
            }
            return retorno;
        }

        //Servicio por Post para alta
        [AllowAnonymous]
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
                retorno.Objetos = null;
            }
            return retorno;
        }

        //Servicio por Put para modificación (Recibe el objeto a modificar en el Body)
        [Authorize]
        //Tenemos que controlar que si es un cliente, se esté actualizando a sí mismo y no a otro
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
                retorno.Objetos = null;
            }
            return retorno;
        }

        //Servicio por Put para modificación (Recibe el objeto a modificar en el Body)
        [HttpPut, Route("api/Cliente/habilitarCliente")]
        //Lo necesitan los clientes? No recuerdo...
        //Verlo con Federico
        //El servicio que actualiza los datos, no actualiza este?
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
                retorno.Objetos = null;
            }
            return retorno;
        }

        //Servicio por Put para modificación (Recibe el objeto a modificar en el Body)
        [HttpPut, Route("api/Cliente/habilitarCliente")]
        //Lo necesitan los clientes? No recuerdo...
        //Verlo con Federico
        //El servicio que actualiza los datos, no actualiza este?
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
                retorno.Objetos = null;
            }
            return retorno;
        }

        //Servicio por Put para modificación (Recibe el objeto a modificar en el Body)
        [Authorize]
        //Tenemos que controlar que si lo hace un cliente, esté actualizando su propia contraseña
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
                retorno.Objetos = null;
            }
            return retorno;
        }

        [AllowAnonymous]
        [HttpPut, Route("api/Cliente/recuperarPassword")]
        public Retorno recuperarPassword([FromBody]string email)
        {
            try
            {
                this.clienteBL.recuperarPassword(email);
                retorno.Codigo = 200;
                retorno.Mensaje = string.Empty;
                retorno.Objetos = null;
            }
            catch(Exception ex)
            {
                retorno.Codigo = 1;
                retorno.Mensaje = ex.Message;
                retorno.Objetos = null;
            }
            return retorno;
        }

        /*[AllowAnonymous]
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
                retorno.Objetos = null;
            }
            return retorno;
        }*/
    }
}
