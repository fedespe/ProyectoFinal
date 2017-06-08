using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BL;
using WebAPI.Models;
using WebAPI.Controllers;
using ET;
using System.Collections.Generic;

namespace ProyectoTesting.Tests
{
    [TestClass]
    public class WebAPITest
    {       
        private Retorno retorno = new Retorno();

        //**********************************************************
        //PRUEBAS BARRIO
        //**********************************************************
        private BarrioBL barrioBL = new BarrioBL();
        [TestMethod]
        public void GetAllBarrios_ObtieneBarriosConCapaBLOK()
        {
            var barrios = barrioBL.obtenerTodos();
            var controller = new BarrioController();

            var result = controller.GetAllBarrios().Objetos;
            Assert.AreEqual(barrios.Count, result.Count);
        }
        [TestMethod]
        public void GetAllBarrios_ObtieneBarriosComparaConBDOK()
        {
            int cantidadBarrios = 60;//ver la cantidad de barrios ingresada en la base
            var controller = new BarrioController();

            var result = controller.GetAllBarrios().Objetos;
            Assert.AreEqual(cantidadBarrios, result.Count);
        }
        //**********************************************************
        //FIN PRUEBAS BARRIO
        //**********************************************************

        //**********************************************************
        //PRUEBAS CLIENTE
        //**********************************************************
        private ClienteBL clienteBL = new ClienteBL();
        private ClienteController controllerCliente = new ClienteController();

        [TestMethod]
        public void GetAllClientes_ObtieneClientesConCapaBLOK()
        {
            var clientes = clienteBL.obtenerTodos();            
            var result = controllerCliente.GetAllClientes().Objetos;
            Assert.AreEqual(clientes.Count, result.Count);
        }
        [TestMethod]
        public void GetAllClientes_ObtieneClientesComparaConBDOK()
        {
            int cantClientes = 2;//ver cantidad de clientes en la base
            var result = controllerCliente.GetAllClientes().Objetos;
            Assert.AreEqual(cantClientes, result.Count);
        }
        [TestMethod]
        public void GetCliente_ObtieneClientesOK()
        {
            Cliente cli = new Cliente
            {
                Id=3,
                Apellido="Cliente1",
                Nombre= "Cliente1",
                Contrasena= "25f9e794323b453885f5181f1b624d0b",
                Direccion= "Cliente1 dir",
                Habilitado= true,
                NombreUsuario= "Cliente1",
                CorreoElectronico= "Cliente1@hotmail.com",
                Tipo="CLIENTE",
                Telefono= "099845498",
                Barrio=new Barrio { Id=1},
                //FechaAlta= Convert.ToDateTime("2017-06-08 11:50:12.143"),
                //UltimaModificacionContrasena= Convert.ToDateTime("2017-06-08 11:50:12.143")
            };
            Cliente result = (Cliente)controllerCliente.GetCliente(3).Objetos[0];
            Assert.AreEqual(cli.Id, result.Id);
            Assert.AreEqual(cli.Apellido, result.Apellido);
            Assert.AreEqual(cli.Nombre, result.Nombre);
            Assert.AreEqual(cli.Contrasena, result.Contrasena);
            Assert.AreEqual(cli.Direccion, result.Direccion);
            Assert.AreEqual(cli.Habilitado, result.Habilitado);
            Assert.AreEqual(cli.NombreUsuario, result.NombreUsuario);
            Assert.AreEqual(cli.CorreoElectronico, result.CorreoElectronico);
            Assert.AreEqual(cli.Tipo, result.Tipo);
            Assert.AreEqual(cli.Telefono, result.Telefono);
            Assert.AreEqual(cli.Barrio.Id, result.Barrio.Id);
            //Assert.AreEqual(cli.FechaAlta, result.FechaAlta);
            //Assert.AreEqual(cli.UltimaModificacionContrasena, result.UltimaModificacionContrasena);
        }
        [TestMethod]
        public void PostAltaCliente_AltaClienteOK()
        {
            Cliente cli = new Cliente
            {
                Id = 3,
                Apellido = "Cliente3",
                Nombre = "Cliente3",
                Contrasena = "123456789",
                Direccion = "Cliente3 dir",
                Habilitado = true,
                NombreUsuario = "Cliente3",
                CorreoElectronico = "Cliente3@hotmail.com",
                Tipo = "CLIENTE",
                Telefono = "099845498",
                Barrio = new Barrio { Id = 1 },
                FechaAlta = DateTime.Now,
                UltimaModificacionContrasena = DateTime.Now
            };
            int result = Convert.ToInt32(controllerCliente.PostAltaCliente(cli).Codigo);
            Assert.AreEqual(200, result);
        }
        [TestMethod]
        public void PostAltaCliente_NombreIncorrecto()
        {
            Cliente cli = new Cliente
            {
                Id = 3,
                Apellido = "ClienteIncorrecto",
                Nombre = "C",
                Contrasena = "123456789",
                Direccion = "ClienteIncorrecto dir",
                Habilitado = true,
                NombreUsuario = "ClienteIncorrecto",
                CorreoElectronico = "ClienteIncorrecto@hotmail.com",
                Tipo = "CLIENTE",
                Telefono = "099845498",
                Barrio = new Barrio { Id = 1 },
                FechaAlta = DateTime.Now,
                UltimaModificacionContrasena = DateTime.Now
            };
            string result = controllerCliente.PostAltaCliente(cli).Mensaje.ToString();
            Assert.AreEqual("Error: Nombre", result);
        }
        [TestMethod]
        public void PostAltaCliente_ApellidoIncorrecto()
        {
            Cliente cli = new Cliente
            {
                Id = 3,
                Apellido = "C",
                Nombre = "ClienteIncorrecto",
                Contrasena = "123456789",
                Direccion = "ClienteIncorrecto dir",
                Habilitado = true,
                NombreUsuario = "ClienteIncorrecto",
                CorreoElectronico = "ClienteIncorrecto@hotmail.com",
                Tipo = "CLIENTE",
                Telefono = "099845498",
                Barrio = new Barrio { Id = 1 },
                FechaAlta = DateTime.Now,
                UltimaModificacionContrasena = DateTime.Now
            };
            string result = controllerCliente.PostAltaCliente(cli).Mensaje.ToString();
            Assert.AreEqual("Error: Apellido", result);
        }
        [TestMethod]
        public void PostAltaCliente_ContrasenaIncorrecto()
        {
            Cliente cli = new Cliente
            {
                Id = 3,
                Apellido = "ClienteIncorrecto",
                Nombre = "ClienteIncorrecto",
                Contrasena = "1234567",
                Direccion = "ClienteIncorrecto dir",
                Habilitado = true,
                NombreUsuario = "ClienteIncorrecto",
                CorreoElectronico = "ClienteIncorrecto@hotmail.com",
                Tipo = "CLIENTE",
                Telefono = "099845498",
                Barrio = new Barrio { Id = 1 },
                FechaAlta = DateTime.Now,
                UltimaModificacionContrasena = DateTime.Now
            };
            string result = controllerCliente.PostAltaCliente(cli).Mensaje.ToString();
            Assert.AreEqual("Error: Contrasena", result);
        }
        [TestMethod]
        public void PostAltaCliente_NombreUsuarioExistente()
        {
            Cliente cli = new Cliente
            {
                Id = 3,
                Apellido = "ClienteIncorrecto",
                Nombre = "ClienteIncorrecto",
                Contrasena = "123456789",
                Direccion = "ClienteIncorrecto dir",
                Habilitado = true,
                NombreUsuario = "Cliente1",
                CorreoElectronico = "ClienteIncorrecto@hotmail.com",
                Tipo = "CLIENTE",
                Telefono = "099845498",
                Barrio = new Barrio { Id = 1 },
                FechaAlta = DateTime.Now,
                UltimaModificacionContrasena = DateTime.Now
            };
            string result = controllerCliente.PostAltaCliente(cli).Mensaje.ToString();
            Assert.AreEqual("Error: NombreUsuario ya existe", result);
        }
        [TestMethod]
        public void PostAltaCliente_NombreUsuarioIncorrecto()
        {
            Cliente cli = new Cliente
            {
                Id = 3,
                Apellido = "ClienteIncorrecto",
                Nombre = "ClienteIncorrecto",
                Contrasena = "123456789",
                Direccion = "ClienteIncorrecto dir",
                Habilitado = true,
                NombreUsuario = "No",
                CorreoElectronico = "ClienteIncorrecto@hotmail.com",
                Tipo = "CLIENTE",
                Telefono = "099845498",
                Barrio = new Barrio { Id = 1 },
                FechaAlta = DateTime.Now,
                UltimaModificacionContrasena = DateTime.Now
            };
            string result = controllerCliente.PostAltaCliente(cli).Mensaje.ToString();
            Assert.AreEqual("Error: NombreUsuario", result);
        }
        [TestMethod]
        public void PostAltaCliente_CorreoIncorrecto()
        {
            Cliente cli = new Cliente
            {
                Id = 3,
                Apellido = "ClienteIncorrecto",
                Nombre = "ClienteIncorrecto",
                Contrasena = "123456789",
                Direccion = "ClienteIncorrecto dir",
                Habilitado = true,
                NombreUsuario = "ClienteIncorrecto",
                CorreoElectronico = "ClienteIncorrectohotmail.com",
                Tipo = "CLIENTE",
                Telefono = "099845498",
                Barrio = new Barrio { Id = 1 },
                FechaAlta = DateTime.Now,
                UltimaModificacionContrasena = DateTime.Now
            };
            string result = controllerCliente.PostAltaCliente(cli).Mensaje.ToString();
            Assert.AreEqual("Error: CorreoElectronico", result);
        }
        [TestMethod]
        public void PutActualizarCliente_OK()
        {
            Cliente cli = new Cliente
            {
                Id = 5,
                Apellido = "Cliente3Actualizado",
                Nombre = "Cliente3Actualizado",                
                Direccion = "Cliente3Actualizado dir",               
                Telefono = "099845498A",
                Barrio = new Barrio { Id = 2 },               
            };
            int result =Convert.ToInt32(controllerCliente.PutActualizarCliente(cli).Codigo);
            Assert.AreEqual(200, result);
        }

        //**********************************************************
        //FIN PRUEBAS CLIENTE
        //**********************************************************
    }
}
