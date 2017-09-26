using BL;
using ET;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AdministradoresWeb.ViewModel.ClienteViewModel
{
    public class IngresarImagenViewModel
    {
        private ClienteBL ClienteBL = new ClienteBL();
        private Cliente Cliente = new Cliente();

        public int Id { get; set; }
        public string Contrasena { get; set; }
        public HttpPostedFileBase Archivo { get; set; }


        public IngresarImagenViewModel()
        {           
        }

        public void completarCliente()
        {
            Cliente.Id = Id;
            Cliente.Contrasena = Contrasena;
            Cliente c = ClienteBL.obtener(Id);
            Cliente.Imagen = c.NombreUsuario.ToUpper().Replace(" ", "") + ".jpg";
        }


        public void guardarArchivo()
        {
            Utilidades.Utilidades.guardarArchivoNuevo("Imagenes/Clientes/", this.Cliente.Imagen, Archivo);
        }
        public void asignarArchivoPorDefecto()
        {
            Utilidades.Utilidades.asignarArchivoPorDefecto("Imagenes/Clientes/", this.Cliente.Imagen);
        }
    }
}