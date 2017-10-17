using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using BL;
using ET;

namespace WebAPI.Tests
{
    [TestClass]
    public class TestingBL
    {
        //**********************************************************
        //PRUEBAS CLIENTE
        //**********************************************************
        //private ClienteBL clienteBL = new ClienteBL();
        //[TestMethod]
        //public void altaCliente_AltaClienteOK()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        //Id = 3,
        //        Apellido = "Cliente3",
        //        Nombre = "Cliente3",
        //        Contrasena = "123456789",
        //        Direccion = "Cliente3 dir",
        //        Habilitado = true,
        //        NombreUsuario = "Cliente3",
        //        CorreoElectronico = "Cliente3@hotmail.com",
        //        Tipo = "CLIENTE",
        //        Telefono = "099845498",
        //        Barrio = new Barrio { Id = 1 },
        //        FechaAlta = DateTime.Now,
        //        UltimaModificacionContrasena = DateTime.Now
        //    };
        //    clienteBL.altaCliente(cli);
        //}
        //[TestMethod]
        //public void altaCliente_NombreIncorrecto()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        //Id = 3,
        //        Apellido = "ClienteIncorrecto",
        //        Nombre = "C",
        //        Contrasena = "123456789",
        //        Direccion = "ClienteIncorrecto dir",
        //        Habilitado = true,
        //        NombreUsuario = "ClienteIncorrecto",
        //        CorreoElectronico = "ClienteIncorrecto@hotmail.com",
        //        Tipo = "CLIENTE",
        //        Telefono = "099845498",
        //        Barrio = new Barrio { Id = 1 },
        //        FechaAlta = DateTime.Now,
        //        UltimaModificacionContrasena = DateTime.Now
        //    };
        //    string result = "";
        //    try
        //    {
        //        clienteBL.altaCliente(cli);
        //    }
        //    catch(ProyectoException ex)
        //    {
        //        result = ex.Message;
        //        Assert.AreEqual("Error: Nombre", result);
        //    }
        //}
        //[TestMethod]
        //public void altaCliente_ApellidoIncorrecto()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        //Id = 3,
        //        Apellido = "C",
        //        Nombre = "ClienteIncorrecto",
        //        Contrasena = "123456789",
        //        Direccion = "ClienteIncorrecto dir",
        //        Habilitado = true,
        //        NombreUsuario = "ClienteIncorrecto",
        //        CorreoElectronico = "ClienteIncorrecto@hotmail.com",
        //        Tipo = "CLIENTE",
        //        Telefono = "099845498",
        //        Barrio = new Barrio { Id = 1 },
        //        FechaAlta = DateTime.Now,
        //        UltimaModificacionContrasena = DateTime.Now
        //    };
        //    string result = "";
        //    try
        //    {
        //        clienteBL.altaCliente(cli);
        //    }
        //    catch (ProyectoException ex)
        //    {
        //        result = ex.Message;
        //        Assert.AreEqual("Error: Apellido", result);
        //    }
        //}
        //[TestMethod]
        //public void altaCliente_ContrasenaIncorrecto()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        Id = 3,
        //        Apellido = "ClienteIncorrecto",
        //        Nombre = "ClienteIncorrecto",
        //        Contrasena = "1234567",
        //        Direccion = "ClienteIncorrecto dir",
        //        Habilitado = true,
        //        NombreUsuario = "ClienteIncorrecto",
        //        CorreoElectronico = "ClienteIncorrecto@hotmail.com",
        //        Tipo = "CLIENTE",
        //        Telefono = "099845498",
        //        Barrio = new Barrio { Id = 1 },
        //        FechaAlta = DateTime.Now,
        //        UltimaModificacionContrasena = DateTime.Now
        //    };
        //    string result = "";
        //    try
        //    {
        //        clienteBL.altaCliente(cli);
        //    }
        //    catch (ProyectoException ex)
        //    {
        //        result = ex.Message;
        //        Assert.AreEqual("Error: Contraseña", result);
        //    }
        //}
        //[TestMethod]
        //public void altaCliente_NombreUsuarioExistente()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        Id = 3,
        //        Apellido = "ClienteIncorrecto",
        //        Nombre = "ClienteIncorrecto",
        //        Contrasena = "123456789",
        //        Direccion = "ClienteIncorrecto dir",
        //        Habilitado = true,
        //        NombreUsuario = "Cliente1",
        //        CorreoElectronico = "ClienteIncorrecto@hotmail.com",
        //        Tipo = "CLIENTE",
        //        Telefono = "099845498",
        //        Barrio = new Barrio { Id = 1 },
        //        FechaAlta = DateTime.Now,
        //        UltimaModificacionContrasena = DateTime.Now
        //    };
        //    string result = "";
        //    try
        //    {
        //        clienteBL.altaCliente(cli);
        //    }
        //    catch (ProyectoException ex)
        //    {
        //        result = ex.Message;
        //        Assert.AreEqual("Error: NombreUsuario ya existe", result);
        //    }
        //}
        //[TestMethod]
        //public void altaCliente_NombreUsuarioIncorrecto()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        Id = 3,
        //        Apellido = "ClienteIncorrecto",
        //        Nombre = "ClienteIncorrecto",
        //        Contrasena = "123456789",
        //        Direccion = "ClienteIncorrecto dir",
        //        Habilitado = true,
        //        NombreUsuario = "No",
        //        CorreoElectronico = "ClienteIncorrecto@hotmail.com",
        //        Tipo = "CLIENTE",
        //        Telefono = "099845498",
        //        Barrio = new Barrio { Id = 1 },
        //        FechaAlta = DateTime.Now,
        //        UltimaModificacionContrasena = DateTime.Now
        //    };
        //    string result = "";
        //    try
        //    {
        //        clienteBL.altaCliente(cli);
        //    }
        //    catch (ProyectoException ex)
        //    {
        //        result = ex.Message;
        //        Assert.AreEqual("Error: NombreUsuario", result);
        //    }
        //}
        //[TestMethod]
        //public void altaCliente_CorreoIncorrecto()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        Id = 3,
        //        Apellido = "ClienteIncorrecto",
        //        Nombre = "ClienteIncorrecto",
        //        Contrasena = "123456789",
        //        Direccion = "ClienteIncorrecto dir",
        //        Habilitado = true,
        //        NombreUsuario = "ClienteIncorrecto",
        //        CorreoElectronico = "ClienteIncorrectohotmail.com",
        //        Tipo = "CLIENTE",
        //        Telefono = "099845498",
        //        Barrio = new Barrio { Id = 1 },
        //        FechaAlta = DateTime.Now,
        //        UltimaModificacionContrasena = DateTime.Now
        //    };
        //    string result = "";
        //    try
        //    {
        //        clienteBL.altaCliente(cli);
        //    }
        //    catch (ProyectoException ex)
        //    {
        //        result = ex.Message;
        //        Assert.AreEqual("Error: CorreoElectronico", result);
        //    }
        //}
        //[TestMethod]
        //public void actualizarCliente_OK()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        Id = 6,
        //        Apellido = "Cliente1Actualizado",
        //        Nombre = "Cliente1Actualizado",
        //        Direccion = "Cliente1Actualizado dir",
        //        Telefono = "099845498A",
        //        Barrio = new Barrio { Id = 2 },
        //    };
        //    clienteBL.actualizarCliente(cli);
            
        //}
        //[TestMethod]
        //public void PutActualizarCliente_NombreIncorrecto()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        Id = 5,
        //        Apellido = "Cliente3Actualizado",
        //        Nombre = "C",
        //        Direccion = "Cliente3Actualizado dir",
        //        Telefono = "099845498A",
        //        Barrio = new Barrio { Id = 2 },
        //    };
        //    string result = Convert.ToString(controllerCliente.PutActualizarCliente(cli).Mensaje);
        //    Assert.AreEqual("Error: Nombre", result);
        //}
        //[TestMethod]
        //public void PutActualizarCliente_ApellidoIncorrecto()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        Id = 5,
        //        Apellido = "C",
        //        Nombre = "Cliente3Actualizado",
        //        Direccion = "Cliente3Actualizado dir",
        //        Telefono = "099845498A",
        //        Barrio = new Barrio { Id = 2 },
        //    };
        //    string result = Convert.ToString(controllerCliente.PutActualizarCliente(cli).Mensaje);
        //    Assert.AreEqual("Error: Apellido", result);
        //}
        //[TestMethod]
        //public void PutActualizarCliente_DireccionIncorrecto()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        Id = 5,
        //        Apellido = "Cliente3Actualizado",
        //        Nombre = "Cliente3Actualizado",
        //        Direccion = "",
        //        Telefono = "099845498A",
        //        Barrio = new Barrio { Id = 2 },
        //    };
        //    string result = Convert.ToString(controllerCliente.PutActualizarCliente(cli).Mensaje);
        //    Assert.AreEqual("Error: Dirección", result);
        //}
        //[TestMethod]
        //public void PutActualizarCliente_TelefonoIncorrecto()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        Id = 5,
        //        Apellido = "Cliente3Actualizado",
        //        Nombre = "Cliente3Actualizado",
        //        Direccion = "Cliente3Actualizado dir",
        //        Telefono = "",
        //        Barrio = new Barrio { Id = 2 },
        //    };
        //    string result = Convert.ToString(controllerCliente.PutActualizarCliente(cli).Mensaje);
        //    Assert.AreEqual("Error: Teléfono", result);
        //}
        //[TestMethod]
        //public void PutActualizarCliente_BarrioNull()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        Id = 5,
        //        Apellido = "Cliente3Actualizado",
        //        Nombre = "Cliente3Actualizado",
        //        Direccion = "Cliente3Actualizado dir",
        //        Telefono = "099845498A",
        //        Barrio = null,
        //    };
        //    string result = Convert.ToString(controllerCliente.PutActualizarCliente(cli).Mensaje);
        //    Assert.AreEqual("Error: Barrio", result);
        //}




        //[TestMethod]
        //public void GetAllClientes_ObtieneClientesConCapaBLOK()
        //{
        //    var clientes = clienteBL.obtenerTodos();
        //    var result = controllerCliente.GetAllClientes().Objetos;
        //    Assert.AreEqual(clientes.Count, result.Count);
        //}
        //[TestMethod]
        //public void GetAllClientes_ObtieneClientesComparaConBDOK()
        //{
        //    int cantClientes = 2;//ver cantidad de clientes en la base
        //    var result = controllerCliente.GetAllClientes().Objetos;
        //    Assert.AreEqual(cantClientes, result.Count);
        //}
        //[TestMethod]
        //public void GetCliente_ObtieneClientesOK()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        Id = 3,
        //        Apellido = "Cliente1",
        //        Nombre = "Cliente1",
        //        Contrasena = "25f9e794323b453885f5181f1b624d0b",
        //        Direccion = "Cliente1 dir",
        //        Habilitado = true,
        //        NombreUsuario = "Cliente1",
        //        CorreoElectronico = "Cliente1@hotmail.com",
        //        Tipo = "CLIENTE",
        //        Telefono = "099845498",
        //        Barrio = new Barrio { Id = 1 },
        //        //FechaAlta= Convert.ToDateTime("2017-06-08 11:50:12.143"),
        //        //UltimaModificacionContrasena= Convert.ToDateTime("2017-06-08 11:50:12.143")
        //    };
        //    Cliente result = (Cliente)controllerCliente.GetCliente(3).Objetos[0];
        //    Assert.AreEqual(cli.Id, result.Id);
        //    Assert.AreEqual(cli.Apellido, result.Apellido);
        //    Assert.AreEqual(cli.Nombre, result.Nombre);
        //    Assert.AreEqual(cli.Contrasena, result.Contrasena);
        //    Assert.AreEqual(cli.Direccion, result.Direccion);
        //    Assert.AreEqual(cli.Habilitado, result.Habilitado);
        //    Assert.AreEqual(cli.NombreUsuario, result.NombreUsuario);
        //    Assert.AreEqual(cli.CorreoElectronico, result.CorreoElectronico);
        //    Assert.AreEqual(cli.Tipo, result.Tipo);
        //    Assert.AreEqual(cli.Telefono, result.Telefono);
        //    Assert.AreEqual(cli.Barrio.Id, result.Barrio.Id);
        //    //Assert.AreEqual(cli.FechaAlta, result.FechaAlta);
        //    //Assert.AreEqual(cli.UltimaModificacionContrasena, result.UltimaModificacionContrasena);
        //}


        //[TestMethod]
        //public void PutHabilitarCliente_OK()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        Id = 5,
        //    };
        //    int result = Convert.ToInt32(controllerCliente.PutHabilitarCliente(cli).Codigo);
        //    Assert.AreEqual(200, result);
        //}
        //[TestMethod]
        //public void PutDeshabilitarCliente_OK()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        Id = 5,
        //    };
        //    int result = Convert.ToInt32(controllerCliente.PutDeshabilitarCliente(cli).Codigo);
        //    Assert.AreEqual(200, result);
        //}
        //[TestMethod]
        //public void PutActualizarContrasenaCliente_OK()
        //{
        //    ActualizarContrasena actCon = new ActualizarContrasena
        //    {
        //        Contrasena = "123456789",
        //        ContrasenaNueva = "789456123",
        //        IdUsuario = 5
        //    };
        //    int result = Convert.ToInt32(controllerCliente.PutActualizarContrasenaCliente(actCon).Codigo);
        //    Assert.AreEqual(200, result);
        //}
        //[TestMethod]
        //public void PutActualizarContrasenaCliente_ContrasenaAnteriorIncorrecta()
        //{
        //    ActualizarContrasena actCon = new ActualizarContrasena
        //    {
        //        Contrasena = "123456789",
        //        ContrasenaNueva = "789456123",
        //        IdUsuario = 5
        //    };
        //    string result = Convert.ToString(controllerCliente.PutActualizarContrasenaCliente(actCon).Mensaje);
        //    Assert.AreEqual("Error: Contraseña anterior", result);
        //}
        //[TestMethod]
        //public void PutActualizarContrasenaCliente_ContrasenaAnteriorIgualAlaNueva()
        //{
        //    ActualizarContrasena actCon = new ActualizarContrasena
        //    {
        //        Contrasena = "789456123",
        //        ContrasenaNueva = "789456123",
        //        IdUsuario = 5
        //    };
        //    string result = Convert.ToString(controllerCliente.PutActualizarContrasenaCliente(actCon).Mensaje);
        //    Assert.AreEqual("Error: Contraseña anterior igual a nueva", result);
        //}
        //[TestMethod]
        //public void PutActualizarContrasenaCliente_ClienteNoExistente()
        //{
        //    ActualizarContrasena actCon = new ActualizarContrasena
        //    {
        //        Contrasena = "789456123",
        //        ContrasenaNueva = "123456789",
        //        IdUsuario = 50000
        //    };
        //    string result = Convert.ToString(controllerCliente.PutActualizarContrasenaCliente(actCon).Mensaje);
        //    Assert.AreEqual("Error: Cliente no encontrado", result);
        //}

        //[TestMethod]
        //public void PostIngresarCliente_OK()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        NombreUsuario = "Cliente1",
        //        Contrasena = "123456789"
        //    };
        //    Cliente result = (Cliente)controllerCliente.PostIngresarCliente(cli).Objetos[0];
        //    Assert.AreEqual(3, result.Id);
        //    Assert.AreEqual("Cliente1", result.Nombre);
        //}
        //[TestMethod]
        //public void PostIngresarCliente_NombreIncorrecto()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        NombreUsuario = "Cliente199999999",
        //        Contrasena = "123456789"
        //    };
        //    string result = controllerCliente.PostIngresarCliente(cli).Mensaje;
        //    Assert.AreEqual("Datos incorrectos.", result);
        //}
        //[TestMethod]
        //public void PostIngresarCliente_ContrasenaIncorrecta()
        //{
        //    Cliente cli = new Cliente
        //    {
        //        NombreUsuario = "Cliente1",
        //        Contrasena = "123456789000"
        //    };
        //    string result = controllerCliente.PostIngresarCliente(cli).Mensaje;
        //    Assert.AreEqual("Datos incorrectos.", result);
        //}

        //**********************************************************
        //FIN PRUEBAS CLIENTE
        //**********************************************************
    }
}
