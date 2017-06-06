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

        //GET: Cliente/Editar
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

        //POST: Cliente/Editar
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
    }
}