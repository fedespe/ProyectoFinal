using AdministradoresWeb.ViewModel.PreguntaViewModel;
using BL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdministradoresWeb.Controllers
{
    public class PreguntaController : Controller
    {
        private PreguntaBL preguntaBL = new PreguntaBL();

        public ActionResult ListaPreguntas()
        {
            if (Session["TipoUsuario"] != null && (Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR") || Session["TipoUsuario"].ToString().Equals("ADMINISTRADOR")))
            {
                try
                {
                    return View(preguntaBL.obtenerTodos());
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
        //GET: Pregunta/AltaPregunta
        public ActionResult AltaPregunta()
        {
            if (Session["TipoUsuario"] != null && (Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR") || Session["TipoUsuario"].ToString().Equals("ADMINISTRADOR")))
            {
                try
                {
                    return View(new AltaPreguntaViewModel());
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
        public ActionResult AltaPregunta(AltaPreguntaViewModel crearVM)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    crearVM.completarPregunta();
                    preguntaBL.altaPregunta(crearVM.pregunta);
                    return RedirectToAction("ListaPreguntas");
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

        //GET: Pregunta/Editar
        public ActionResult Editar(int id = 0)
        {
            if (Session["TipoUsuario"] != null && (Session["TipoUsuario"].ToString().Equals("SUPERADMINISTRADOR") || Session["TipoUsuario"].ToString().Equals("ADMINISTRADOR")))
            {
                try
                {
                    if (id != 0)
                    {
                        AltaPreguntaViewModel editVM = new AltaPreguntaViewModel();
                        editVM.pregunta = preguntaBL.obtener(id);
                        editVM.completarAltaPreguntaVM();
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

        //POST: Pregunta/Editar
        [HttpPost]
        public ActionResult Editar(AltaPreguntaViewModel editVM)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    editVM.completarPregunta();
                    preguntaBL.actualizarPregunta(editVM.pregunta);

                    return RedirectToAction("ListaPreguntas");

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