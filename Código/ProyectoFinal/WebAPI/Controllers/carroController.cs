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
        List<Carro> carros = new List<Carro>();

        public carroController()
        {
            this.carros.Add(new Carro { Id = 1, Marca = "Ferrari", Modelo = 2012 });
            this.carros.Add(new Carro { Id = 2, Marca = "BMW", Modelo = 2010 });
            this.carros.Add(new Carro { Id = 3, Marca = "Mazda", Modelo = 2002 });
            this.carros.Add(new Carro { Id = 4, Marca = "Nissan", Modelo = 2004 });
            this.carros.Add(new Carro { Id = 5, Marca = "Renault", Modelo = 1998 });
        }

        //Servicio por Get sin parámetros (Retorna todos)
        [HttpGet, Route("api/Carro/obtenerTodos")]
        public IEnumerable<Carro> GetAllCarros()
        {
            return this.carros;
        }

        //Servicio por Get con parámetro (Retorna el que tiene el id que llega por parámetro)
        [HttpGet, Route("api/Carro/obtener/{id}")]
        public Carro GetCarro(int id)
        {
            var carro = carros.FirstOrDefault((c) => c.Id == id);
            return carro;
        }

        //Servicio por Post para alta
        [HttpPost, Route("api/Carro/altaCarro")]
        public IEnumerable<Carro> PostAltaCarro([FromBody]Carro carro)
        {
            this.carros.Add(carro);
            return this.carros;
        }

        //Servicio por Put para modificación (Recibe el objeto a modificar en el Body)
        [HttpPut, Route("api/Carro/actualizarCarro")]
        public IEnumerable<Carro> PutActualizarCarro([FromBody]Carro carro)
        {
            foreach(Carro c in this.carros)
            {
                if (c.Id == carro.Id)
                {
                    c.Marca = carro.Marca;
                    c.Modelo = carro.Modelo;
                    break;
                }
            }

            return this.carros;
        }

        //Servicio por Delete para eliminar (Recibe el objeto a eliminar en el Body)
        [HttpDelete, Route("api/Carro/eliminarCarro")]
        public IEnumerable<Carro> PutEliminarCarro([FromBody]Carro carro)
        {
            foreach (Carro c in this.carros)
            {
                if (c.Id == carro.Id)
                {
                    this.carros.Remove(c);
                    break;
                }
            }

            return this.carros;
        }
    }
}
