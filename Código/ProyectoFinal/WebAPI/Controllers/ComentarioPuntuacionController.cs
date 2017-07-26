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

    }
}
