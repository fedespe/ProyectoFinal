using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class carroController : ApiController
    {
        Carro[] carros = new Carro[]
        {
            new Carro { idCarro = 1, marca = "Ferrari", modelo=2012 },
            new Carro { idCarro = 2, marca = "BMW", modelo=2010 },
            new Carro { idCarro = 3, marca = "Mazda", modelo=2002 },
            new Carro { idCarro = 4, marca = "Nissan", modelo=2004 },
            new Carro { idCarro = 5, marca = "Renault", modelo=1998 }
        };

        public IEnumerable<Carro> GetAllCarro()
        {
            return carros;
        }

        public IHttpActionResult GetCarro(int id)
        {
            var carro = carros.FirstOrDefault((c) => c.idCarro == id);

            if(carro != null)
            {
                return Ok(carro);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
