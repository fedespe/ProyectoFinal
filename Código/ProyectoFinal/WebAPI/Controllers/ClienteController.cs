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

        public IEnumerable<Cliente> GetAllClientes()
        {
            return clienteBL.obtenerTodos();
        }
        public Cliente GetCliente(int id)
        {
            return clienteBL.obtener(id);
        }
        [HttpPost]
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
    }
}
