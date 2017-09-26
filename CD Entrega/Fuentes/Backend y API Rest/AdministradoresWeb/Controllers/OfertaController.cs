using AdministradoresWeb.ViewModel.OfertaViewModel;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AdministradoresWeb.Controllers
{
    public class OfertaController : Controller
    {
        //GET: Cliente/IngresarImagen
        public ActionResult IngresarImagenes(int idPublicacion = 0, int idCliente = 0, string contrasena = "")
        {
            try
            {
                if (idPublicacion != 0 && idCliente != 0 && contrasena != "")
                {
                    IngresarImagenesViewModel ingImgVM = new IngresarImagenesViewModel();
                    ingImgVM.IdPublicacion = idPublicacion;
                    ingImgVM.Contrasena = contrasena;
                    ingImgVM.IdCliente = idCliente;
                    ingImgVM.completarVM();
                    //ingImgVM.asignarArchivoPorDefecto();

                    return View(ingImgVM);
                }
                else {
                    ViewBag.Mensaje = "Publicación incorrecta o los datos de usuario no son correctos.";
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
        public ActionResult IngresarImagenes(IngresarImagenesViewModel ingImgVM)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ingImgVM.completarPublicacion();
                    ingImgVM.guardarArchivos();
                    ViewBag.Mensaje = "Imagenes guardadas con exito.";
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
                    ViewBag.Mensaje = "Error. Consulte al administrador.";
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