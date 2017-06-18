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
    public class ServicioController : ApiController
    {
        private ServicioBL servicioBL = new ServicioBL();
        private Retorno retorno = new Retorno();

        //Servicio por Get sin parámetros (Retorna todos)
        [HttpGet, Route("api/Servicio/obtenerTodosHabilitados")]
        public Retorno GetAllServiciosHabilitados()
        {
            try
            {
                List<Servicio> servicios = servicioBL.obtenerTodos();
                foreach (Servicio s in servicios)
                {
                    if(s.Habilitado) retorno.Objetos.Add(s);
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
