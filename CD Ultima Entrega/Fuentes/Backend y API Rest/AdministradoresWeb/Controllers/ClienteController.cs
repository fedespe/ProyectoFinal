using AdministradoresWeb.ViewModel.ClienteViewModel;
using BL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdministradoresWeb.Controllers
{
    public class ClienteController : Controller
    {
        private ClienteBL clienteBL = new ClienteBL();
        private AdministradorBL adminBL = new AdministradorBL();

        public ActionResult ListaClientes()
        {
            if (Session["TipoUsuario"] != null && (Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR") || Session["TipoUsuario"].ToString().Equals("ADMINISTRADOR")))
            {
                try
                {
                    return View(clienteBL.obtenerTodos());
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

        //GET: Cliente/NuevoPass
        public ActionResult NuevoPass(int id = 0)
        {
            if (Session["TipoUsuario"] != null && (Session["TipoUsuario"].ToString().Equals("ADMINISTRADOR") || Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR")))
            {
                try
                {
                    NuevoPassViewModel nuevoPassVM = new NuevoPassViewModel();
                    nuevoPassVM.cli = clienteBL.obtener(id);
                    if (nuevoPassVM.cli != null)
                    {
                        nuevoPassVM.NombreUsuario = nuevoPassVM.cli.NombreUsuario;
                        nuevoPassVM.Id = id;
                        return View(nuevoPassVM);
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

        //POST: Cliente/NuevoPass
        [HttpPost]
        public ActionResult NuevoPass(NuevoPassViewModel nuevoPassVM)
        {
            if (ModelState.IsValid)
            {
                if (Session["TipoUsuario"] != null && (Session["TipoUsuario"].ToString().Equals("ADMINISTRADOR") || Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR")))
                {
                    try
                    {
                        if (nuevoPassVM.PasswordNuevo.Equals(nuevoPassVM.PasswordConfirmacion))
                        {
                            clienteBL.nuevaContrasena(nuevoPassVM.Id, nuevoPassVM.PasswordNuevo);
                            nuevoPassVM.MensajeOK = "Contraseña modificada correctamente.";
                            return View(nuevoPassVM);

                        }
                        nuevoPassVM.Mensaje = "La contraseña nueva no coincide con la confirmación de contraseña. Por favor, inténtelo otra vez.";
                        return View(nuevoPassVM);
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
                return View(nuevoPassVM);
            }
        }

        public ActionResult Ver(int Id)
        {
            if (Session["TipoUsuario"] != null && (Session["TipoUsuario"].ToString().Equals("ADMINISTRADOR") || Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR")))
            {
                try
                {
                    return View(clienteBL.obtener(Id));
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

        public ActionResult Deshabilitar(int id)
        {
            if (Session["TipoUsuario"] != null && (Session["TipoUsuario"].ToString().Equals("ADMINISTRADOR") || Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR")))
            {
                try
                {
                    clienteBL.deshabilitarCliente(id);
                    return RedirectToAction("ListaClientes");
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
            if (Session["TipoUsuario"] != null && (Session["TipoUsuario"].ToString().Equals("ADMINISTRADOR") || Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR")))
            {
                try
                {
                    clienteBL.habilitarCliente(id);
                    return RedirectToAction("ListaClientes");
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

        //GET: Cliente/IngresarImagen
        public ActionResult IngresarImagen(int idCliente = 0, string contrasena="")
        {
            try
            {
                if (idCliente != 0 && contrasena != "")//FALTA CONTROL DE SEGURIDAD... VERIFICAR LA CONTRASENA
                {
                    IngresarImagenViewModel ingImgVM = new IngresarImagenViewModel();
                    ingImgVM.Id = idCliente;
                    ingImgVM.Contrasena = contrasena;
                    ingImgVM.completarCliente();
                    ingImgVM.asignarArchivoPorDefecto();

                    return View(ingImgVM);
                }
                else {
                    ViewBag.Mensaje = "No selecciono el usuario correctamente.";
                    return View("~/Views/Shared/_MensajeAngular.cshtml");
                }
            }
            catch (ProyectoException ex)
            {
                ViewBag.Mensaje = ex.Message;
                return View("~/Views/Shared/_MensajeAngular.cshtml");
            }           
        }

        //POST: Cliente/NuevoPass
        [HttpPost]
        public ActionResult IngresarImagen(IngresarImagenViewModel ingImgVM)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ingImgVM.completarCliente();
                    ingImgVM.guardarArchivo();
                    ViewBag.Mensaje = "Imagen guardada con exito.";
                    return View("~/Views/Shared/_MensajeAngular.cshtml");
                }
                catch (ProyectoException ex)
                {
                    ViewBag.Mensaje = ex.Message;
                    return View("~/Views/Shared/_MensajeAngular.cshtml");
                }
            }
            else {
                try
                {
                    ViewBag.Mensaje = "No tiene permisos para relalizar esta acción.";
                    return View("~/Views/Shared/_MensajeAngular.cshtml");
                }
                catch (ProyectoException ex)
                {
                    ViewBag.Mensaje = ex.Message;
                    return View("~/Views/Shared/_MensajeAngular.cshtml");
                }
            }
        }


    }
}