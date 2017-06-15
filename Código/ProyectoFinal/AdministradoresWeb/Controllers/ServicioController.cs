using BL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdministradoresWeb.Controllers
{
    public class ServicioController : Controller
    {
        private ServicioBL servicioBL = new ServicioBL();

        public ActionResult ListaServicios()
        {
            if (Session["TipoUsuario"] != null && (Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR") || Session["TipoUsuario"].ToString().Equals("ADMINISTRADOR")))
            {
                try
                {
                    return View(servicioBL.obtenerTodos());
                }
                catch (ProyectoException ex)
                {
                    ViewBag.Mensaje = ex.Message;
                    return View("~/Views/Shared/_Mensajes.cshtml");
                }
            }
            else
            {
                try
                {
                    ViewBag.Mensaje = "No tiene permisos para relalizar esta acción.";
                    return View("~/Views/Shared/_Mensajes.cshtml");
                }
                catch (ProyectoException ex)
                {
                    ViewBag.Mensaje = ex.Message;
                    return View("~/Views/Shared/_Mensajes.cshtml");
                }
            }
        }






    }
}