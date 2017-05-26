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
    public class AdministradorController : ApiController
    {
        private AdministradorBL adminBL = new AdministradorBL();
        private string mensajeOk = "OK";

        [HttpGet]
        public IEnumerable<Administrador> GetAllAdministradores()
        {
            return adminBL.obtenerTodos();
        }
        [HttpGet]
        public Administrador GetAdministrador(int id)
        {
            return adminBL.obtener(id);
        }
        [HttpPost]
        public string PostAltaAdministrador([FromBody]Administrador admin)
        {
            try
            {
                adminBL.altaAdministrador(admin);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }
        }
        [HttpPut]
        public string PutActualizarAdministrador([FromBody]Administrador admin)
        {
            try
            {
                adminBL.actualizarAdministrador(admin);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]//VER SI EL METODO ES GET, POST O PUT... 
        public string PostActualizarContrasenaAdministrador(int id, string contrasenaAnterior, string contrasenaNueva)
        {
            try
            {
                adminBL.actualizarContrasena(id, contrasenaAnterior, contrasenaNueva);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }
        }
        [HttpGet]
        public string GetHabilitarAdministrador(int id)
        {
            try
            {
                adminBL.habilitarAdministrador(id);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }
        }
        [HttpGet]
        public string GetDeshabilitarAdministrador(int id)
        {
            try
            {
                adminBL.deshabilitarAdministrador(id);
                return mensajeOk;
            }
            catch (ET.ProyectoException ex)
            {
                return ex.Message;
            }
        }
        [HttpPost]//VER SI EL METODO ES GET, POST 
        public Administrador GetIngresarAdministrador(string nombreUsuario, string pass)
        {
            Administrador admin = adminBL.ingresarAdministrador(nombreUsuario, pass);

            return admin;
        }
    }
}
