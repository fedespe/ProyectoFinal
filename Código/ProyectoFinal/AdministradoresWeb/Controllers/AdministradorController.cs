using AdministradoresWeb.ViewModel.AdministradorViewModel;
using BL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdministradoresWeb.Controllers
{
    public class AdministradorController : Controller
    {
        private ClienteBL clienteBL = new ClienteBL();
        private AdministradorBL adminBL = new AdministradorBL();

        //GET: Administrador/AltaAdmin
        public ActionResult AltaAdmin()
        {
            if (Session["TipoUsuario"] != null && Session["TipoUsuario"].ToString() == "SUPERADMINISTRADOR")
            {
                try
                {
                    return View(new AltaAdminViewModel());
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

        //POST: Cliente/AltaAdmin
        [HttpPost]
        public ActionResult AltaAdmin(AltaAdminViewModel crearVM)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    crearVM.completarAdministrador();
                    adminBL.altaAdministrador(crearVM.administrador);
                    return RedirectToAction("ListaAdministradores");
                }
                catch (ProyectoException ex)
                {
                    ViewBag.Mensaje = ex.Message;
                    return View("~/Views/Shared/_Mensajes.cshtml");
                }
            }
            else {
                return View(crearVM);
            }
        }

        public ActionResult ListaAdministradores()
        {
            if (Session["TipoUsuario"] != null && Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR"))
            {
                try
                {
                    return View(adminBL.obtenerTodos());
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

        //GET: Administrador/Editar
        public ActionResult Editar(int id = 0)
        {
            if (Session["TipoUsuario"] != null && (Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR") || (Session["TipoUsuario"].ToString().Equals("ADMINISTRADOR")) && (Convert.ToInt32(Session["IdUsuario"]) == id)))
            {
                try
                {
                    if (id != 0)
                    {
                        EditarViewModel editVM = new EditarViewModel();
                        editVM.administrador = adminBL.obtener(id);
                        editVM.completarEditarVM();
                        return View(editVM);
                    }
                    else {
                        ViewBag.Mensaje = "No selecciono el usuario correctamente.";
                        return View("~/Views/Shared/_Mensajes.cshtml");
                    }
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

        //POST: Administrador/Editar
        [HttpPost]
        public ActionResult Editar(EditarViewModel editVM)
        {
            if (ModelState.IsValid)
            {
                try
                {    
                    editVM.completarAdministrador();
                    adminBL.actualizarAdministrador(editVM.administrador);
                 
                    if (Session["TipoUsuario"] != null && Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR"))
                    {
                        return RedirectToAction("ListaAdministradores");
                    }
                    else {
                        return RedirectToAction("Index", "Home");
                    }

                }
                catch (ProyectoException ex)
                {
                    ViewBag.Mensaje = ex.Message;
                    return View("~/Views/Shared/_Mensajes.cshtml");
                }
            }
            else {
                return View(editVM);
            }
        }
        //GET: Administrador/CambiarPass
        public ActionResult CambiarPass(int id = 0)
        {
            if (Session["TipoUsuario"] != null && ((Session["TipoUsuario"].ToString().Equals("ADMINISTRADOR") && Convert.ToInt32(Session["IdUsuario"]) == id) || Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR")))
            {
                try
                {
                    CambiarPassViewModel cambiarPassVM = new CambiarPassViewModel();
                    cambiarPassVM.Admin = adminBL.obtener(id);
                    if (cambiarPassVM.Admin != null)
                    {
                        cambiarPassVM.NombreUsuario = cambiarPassVM.Admin.NombreUsuario;
                        cambiarPassVM.Id = id;
                        return View(cambiarPassVM);
                    }
                    else {
                        ViewBag.Mensaje = "No selecciono el usuario correctamente.";
                        return View("~/Views/Shared/_Mensajes.cshtml");
                    }
                    
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

        //POST: Cliente/CambiarPass
        [HttpPost]
        public ActionResult CambiarPass(CambiarPassViewModel cambiarPassVM)
        {
            if (ModelState.IsValid)
            {
                if (Session["TipoUsuario"] != null && ((Session["TipoUsuario"].ToString().Equals("ADMINISTRADOR") && Convert.ToInt32(Session["IdUsuario"]) == cambiarPassVM.Id) || Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR")))
                {
                    try
                    {
                        if (cambiarPassVM.PasswordNuevo.Equals(cambiarPassVM.PasswordConfirmacion))
                        {
                            adminBL.actualizarContrasena(cambiarPassVM.Id, cambiarPassVM.PasswordActual, cambiarPassVM.PasswordNuevo);
                            return RedirectToAction("Index", "Home");                  

                        }
                        cambiarPassVM.Mensaje = "La contraseña nueva no coincide con la confirmación de contraseña. Por favor, inténtelo otra vez.";
                        return View(cambiarPassVM);
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
            else {
                return View(cambiarPassVM);
            }
        }


        public ActionResult Deshabilitar(int id)
        {
            if (Session["TipoUsuario"] != null && Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR"))
            {
                try
                {
                    adminBL.deshabilitarAdministrador(id);
                    return RedirectToAction("ListaAdministradores");
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

        public ActionResult Habilitar(int id)
        {
            if (Session["TipoUsuario"] != null && Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR"))
            {
                try
                {
                    adminBL.habilitarAdministrador(id);
                    return RedirectToAction("ListaAdministradores");
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
        public ActionResult Ver(int Id)
        {
            if (Session["TipoUsuario"] != null && Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR"))
            {
                try
                {
                    return View(adminBL.obtener(Id));
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