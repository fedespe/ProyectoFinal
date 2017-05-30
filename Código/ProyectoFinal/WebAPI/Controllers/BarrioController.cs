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
    public class BarrioController : ApiController
    {
        private BarrioBL barrioBL = new BarrioBL();
        private Retorno retorno = new Retorno();

        [HttpGet, Route("api/Barrio/obtenerTodos")]
        public Retorno GetAllClientes()
        {
            try
            {
                List<Barrio> barrios = barrioBL.obtenerTodos();
                foreach (Barrio b in barrios)
                {
                    retorno.Objetos.Add(b);
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
