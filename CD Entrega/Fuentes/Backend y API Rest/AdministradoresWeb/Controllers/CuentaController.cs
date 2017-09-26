using AdministradoresWeb.ViewModel.CuentaViewModel;
using BL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdministradoresWeb.Controllers
{
    public class CuentaController : Controller
    {
        public ActionResult Login()
        {
            if (Session["TipoUsuario"] == null)
            {
                try
                {
                    return View(new LoginViewModel());
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
                    return RedirectToAction("Index", "Home");
                }
                catch (ProyectoException ex)
                {
                    ViewBag.Mensaje = ex.Message;
                    return View("~/Views/Shared/_Mensajes.cshtml");
                }
            }
        }


        //POST: Account/Login
        [HttpPost]
        public ActionResult Login(LoginViewModel loginVM)
        {
            try
            {
                AdministradorBL administradorBL = new AdministradorBL();
                Administrador admin = administradorBL.ingresarAdministrador(loginVM.NombreUsuario, loginVM.Password);
                if (admin != null)
                {
                    Session["IdUsuario"] = admin.Id;
                    Session["NombreUsuario"] = admin.NombreUsuario;
                    Session["TipoUsuario"] = admin.Tipo;

                    return RedirectToAction("Index", "Home");
                }

                loginVM.Mensaje = "Datos erróneos. Por favor, inténtelo otra vez.";
                return View(loginVM);
            }
            catch (ProyectoException ex)
            {
                ViewBag.Mensaje = ex.Message;
                return View("~/Views/Shared/_Mensajes.cshtml");
            }
        }

        //GET: Account/LogOff
        public ActionResult LogOff()
        {
            try
            {
                Session.Clear();
                return RedirectToAction("Index", "Home");
            }
            catch (ProyectoException ex)
            {
                ViewBag.Mensaje = ex.Message;
                return View("~/Views/Shared/_Mensajes.cshtml");
            }
        }
    }
}