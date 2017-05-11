using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace Testing
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void PruebaGetCliente2ClientesCorrectos()
        {
            using (Servicio.ServicioProyectoFinalClient cliente = new Servicio.ServicioProyectoFinalClient())
            {
                WCFProyectoFinal.DtoCliente[] resultadoEsperado = new WCFProyectoFinal.DtoCliente[2] 
                {
                    new WCFProyectoFinal.DtoCliente {
                        Id=1,
                        Nombre="Federico",
                    },
                    new WCFProyectoFinal.DtoCliente{
                    Id = 2,
                    Nombre = "Carlos",
                    }
                };

                WCFProyectoFinal.DtoCliente[] resultadoObtenido = cliente.getClientes();
                Assert.AreEqual(resultadoEsperado[0].Id, resultadoObtenido[0].Id);
                Assert.AreEqual(resultadoEsperado[0].Nombre, resultadoObtenido[0].Nombre);
                Assert.AreEqual(resultadoEsperado[1].Id, resultadoObtenido[1].Id);
                Assert.AreEqual(resultadoEsperado[1].Nombre, resultadoObtenido[1].Nombre);
            }
        }
    }
}
