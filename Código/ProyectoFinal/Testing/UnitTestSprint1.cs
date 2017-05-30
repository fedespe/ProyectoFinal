using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;

namespace Testing
{
    [TestClass]
    public class UnitTestSprint1
    {
        [TestMethod]
        public void getCliente2ClientesCorrectos()
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
        //**********************************************************
        //PRUEBAS ALTA CLIENTE
        //**********************************************************
        [TestMethod]
        public void altaClienteClienteConNombreIncorrecto()
        {
            using (Servicio.ServicioProyectoFinalClient cliente = new Servicio.ServicioProyectoFinalClient())
            {
                string resultadoObtenido = cliente.altaCliente("Fe","Speroni","Federico1234","Fede1234","fsperonip@hotmail.com","099845498",true,"42614099");
                Assert.AreEqual("Error: Nombre", resultadoObtenido);
            }
        }
        [TestMethod]
        public void altaClienteClienteConApellidoIncorrecto()
        {
            using (Servicio.ServicioProyectoFinalClient cliente = new Servicio.ServicioProyectoFinalClient())
            {
                string resultadoObtenido = cliente.altaCliente("Federico", "Sp", "Federico1234", "Fede1234", "fsperonip@hotmail.com", "099845498", true, "42614099");
                Assert.AreEqual("Error: Apellido", resultadoObtenido);
            }
        }
        [TestMethod]
        public void altaClienteClienteConTelefonoIncorrecto()
        {
            using (Servicio.ServicioProyectoFinalClient cliente = new Servicio.ServicioProyectoFinalClient())
            {
                string resultadoObtenido = cliente.altaCliente("Federico", "Speroni", "Federico1234", "Fede1234", "fsperonip@hotmail.com", "09984", true, "42614099");
                Assert.AreEqual("Error: Telefono", resultadoObtenido);
            }
        }
        [TestMethod]
        public void altaClienteClienteConDocumentoIncorrecto()
        {
            using (Servicio.ServicioProyectoFinalClient cliente = new Servicio.ServicioProyectoFinalClient())
            {
                string resultadoObtenido = cliente.altaCliente("Federico", "Speroni", "Federico1234", "Fede1234", "fsperonip@hotmail.com", "099845498", true, "42614");
                Assert.AreEqual("Error: Documento", resultadoObtenido);
            }
        }
        [TestMethod]
        public void altaClienteClienteConContrasenaIncorrecto()
        {
            using (Servicio.ServicioProyectoFinalClient cliente = new Servicio.ServicioProyectoFinalClient())
            {
                string resultadoObtenido = cliente.altaCliente("Federico", "Speroni", "Federic", "Fede1234", "fsperonip@hotmail.com", "099845498", true, "42614099");
                Assert.AreEqual("Error: Contrasena", resultadoObtenido);
            }
        }
        [TestMethod]
        public void altaClienteClienteConNombreUsuarioIncorrecto()
        {
            using (Servicio.ServicioProyectoFinalClient cliente = new Servicio.ServicioProyectoFinalClient())
            {
                string resultadoObtenido = cliente.altaCliente("Federico", "Speroni", "Federico1234", "Fe", "fsperonip@hotmail.com", "099845498", true, "42614099");
                Assert.AreEqual("Error: NombreUsuario", resultadoObtenido);
            }
        }
        [TestMethod]
        public void altaClienteClienteConCorreElectronicoIncorrecto()
        {
            using (Servicio.ServicioProyectoFinalClient cliente = new Servicio.ServicioProyectoFinalClient())
            {
                string resultadoObtenido = cliente.altaCliente("Federico", "Speroni", "Federico1234", "Fede1234", "fsperoniphotmail.com", "099845498", true, "42614099");
                Assert.AreEqual("Error: CorreoElectronico", resultadoObtenido);
            }
        }
        [TestMethod]
        public void altaClienteClienteCorrecto()
        {
            using (Servicio.ServicioProyectoFinalClient cliente = new Servicio.ServicioProyectoFinalClient())
            {
                string resultadoObtenido = cliente.altaCliente("Federico", "Speroni", "Federico1234", "Fede1234", "fsperonip@hotmail.com", "099845498", true, "42614099");
                Assert.AreEqual("OK", resultadoObtenido);
            }
        }
        //**********************************************************
        //FIN PRUEBAS ALTA CLIENTE
        //**********************************************************
        //**********************************************************
        //PRUEBAS ACTUALIZAR CLIENTE
        //**********************************************************
        [TestMethod]
        public void actualizarClienteClienteConNombreIncorrecto()
        {
            using (Servicio.ServicioProyectoFinalClient cliente = new Servicio.ServicioProyectoFinalClient())
            {
                string resultadoObtenido = cliente.actualizarCliente("Fe", "Speroni","099845498", "42614099");
                Assert.AreEqual("Error: Nombre", resultadoObtenido);
            }
        }
        [TestMethod]
        public void actualizarClienteClienteConApellidoIncorrecto()
        {
            using (Servicio.ServicioProyectoFinalClient cliente = new Servicio.ServicioProyectoFinalClient())
            {
                string resultadoObtenido = cliente.actualizarCliente("Federico", "Sp", "099845498", "42614099");
                Assert.AreEqual("Error: Apellido", resultadoObtenido);
            }
        }
        [TestMethod]
        public void actualizarClienteClienteConTelefonoIncorrecto()
        {
            using (Servicio.ServicioProyectoFinalClient cliente = new Servicio.ServicioProyectoFinalClient())
            {
                string resultadoObtenido = cliente.actualizarCliente("Federico", "Speroni", "09984", "42614099");
                Assert.AreEqual("Error: Telefono", resultadoObtenido);
            }
        }
        [TestMethod]
        public void actualizarClienteClienteConDocumentoIncorrecto()
        {
            using (Servicio.ServicioProyectoFinalClient cliente = new Servicio.ServicioProyectoFinalClient())
            {
                string resultadoObtenido = cliente.actualizarCliente("Federico", "Speroni", "099845498", "42614");
                Assert.AreEqual("Error: Documento", resultadoObtenido);
            }
        }
        [TestMethod]
        public void actualizarClienteClienteCorrecto()
        {
            using (Servicio.ServicioProyectoFinalClient cliente = new Servicio.ServicioProyectoFinalClient())
            {
                string resultadoObtenido = cliente.actualizarCliente("Federico", "Speroni", "099845498", "42614099"); ;
                Assert.AreEqual("OK", resultadoObtenido);
            }
        }
        //**********************************************************
        //FIN PRUEBAS ACTUALIZAR CLIENTE
        //**********************************************************
        //**********************************************************
        //PRUEBAS ACTUALIZAR CLIENTE
        //**********************************************************
    }
}
