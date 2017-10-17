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

        [HttpGet, Route("api/Administrador/obtenerTodos")]
        [Authorize(Roles = "SUPERADMINISTRADOR")]
        //Confirmar que Federico que los Administradores puedan obtener los datos de todos, o ver si necesita ser SuperAdministrador
        public IEnumerable<Administrador> GetAllAdministradores()
        {
            return adminBL.obtenerTodos();
        }

        [HttpGet, Route("api/Administrador/obtener/{id}")]
        [Authorize(Roles = "SUPERADMINISTRADOR,ADMINISTRADOR")]
        //Filtrar para que si es Administrador, esté viendo sus propios datos y no los de otro
        public Administrador GetAdministrador(int id)
        {
            return adminBL.obtener(id);
        }

        [HttpPost, Route("api/Administrador/altaAdministrador")]
        [Authorize(Roles = "SUPERADMINISTRADOR")]
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

        [HttpPut, Route("api/Administrador/actualizarAdministrador")]
        [Authorize(Roles = "SUPERADMINISTRADOR,ADMINISTRADOR")]
        //Corroborar que si es administrador, esté actualizando sus propios datos
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

        [HttpGet, Route("api/Administrador/actualizarContrasena/{id}/{contrasenaAnterior}/{contrasenaNueva}")]
        [Authorize(Roles = "SUPERADMINISTRADOR,ADMINISTRADOR")]
        //Controlar que si es administrador, esté modificando su propia contraseña
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

        [HttpGet, Route("api/Administrador/habilitarAdministrador/{id}")]
        [Authorize(Roles = "SUPERADMINISTRADOR")]
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

        [HttpGet, Route("api/Administrador/deshabilitarAdministrador/{id}")]
        [Authorize(Roles = "SUPERADMINISTRADOR")]
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

        /*[HttpGet, Route("api/Administrador/ingresarAdministrador/{nombreUsuario}/{pass}")]
        [AllowAnonymous]
        public Administrador GetIngresarAdministrador(string nombreUsuario, string pass)
        {
            Administrador admin = adminBL.ingresarAdministrador(nombreUsuario, pass);

            return admin;
        }*/
    }
}
