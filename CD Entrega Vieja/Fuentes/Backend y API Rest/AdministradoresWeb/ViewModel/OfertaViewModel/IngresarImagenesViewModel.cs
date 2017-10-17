using BL;
using ET;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace AdministradoresWeb.ViewModel.OfertaViewModel
{
    public class IngresarImagenesViewModel
    {
        private PublicacionBL publicacionBL = new PublicacionBL();
        public Publicacion publicacion = new Publicacion();

        public int IdPublicacion { get; set; }
        public int IdCliente { get; set; }
        public string Contrasena { get; set; }
        public string Titulo { get; set; }
        public HttpPostedFileBase Archivo1 { get; set; }
        public HttpPostedFileBase Archivo2 { get; set; }
        public HttpPostedFileBase Archivo3 { get; set; }
        public HttpPostedFileBase Archivo4 { get; set; }
        public HttpPostedFileBase Archivo5 { get; set; }

        public String Img1Anterior { get; set; }
        public String Img2Anterior { get; set; }
        public String Img3Anterior { get; set; }
        public String Img4Anterior { get; set; }
        public String Img5Anterior { get; set; }

        public bool EliminarArchivo1 { get; set; }
        public bool EliminarArchivo2 { get; set; }
        public bool EliminarArchivo3 { get; set; }
        public bool EliminarArchivo4 { get; set; }
        public bool EliminarArchivo5 { get; set; }
        public List<HttpPostedFileBase> Archivos { get; set; }


        public IngresarImagenesViewModel()
        {
            Archivos = new List<HttpPostedFileBase>();
        }

        public void completarVM()
        {
            publicacion = publicacionBL.obtener(IdPublicacion);
            if (publicacion.Imagenes == null || publicacion.Imagenes.Count == 0)
            {
                publicacion.Imagenes = new List<string>();
                //publicacion.Imagenes.Add("SinImagen.jpg");
            }
            Titulo = publicacion.Titulo;
            
            int c = 1;
            foreach (string i in publicacion.Imagenes)
            {
                if (i != null && i != "")
                {
                    if (c == 1) Img1Anterior = i;
                    if (c == 2) Img2Anterior = i;
                    if (c == 3) Img3Anterior = i;
                    if (c == 4) Img4Anterior = i;
                    if (c == 5) Img5Anterior = i;
                }
                c++;
            }

            
        }

        public void completarPublicacion() {
            cargarImagenes();
        }
        public void cargarImagenes() {
            publicacion.Imagenes = new List<string>();
            String nombreImg = Titulo.ToUpper().Replace(" ", "") + "_IMG";
            if (!EliminarArchivo1 && (Archivo1 != null || Img1Anterior != null))
                publicacion.Imagenes.Add(nombreImg + 1 + ".jpg");
            if (!EliminarArchivo2 && (Archivo2 != null || Img2Anterior != null))
                publicacion.Imagenes.Add(nombreImg + 2 + ".jpg");
            if (!EliminarArchivo3 && (Archivo3 != null || Img3Anterior != null))
                publicacion.Imagenes.Add(nombreImg + 3 + ".jpg");
            if (!EliminarArchivo4 && (Archivo4 != null || Img4Anterior != null))
                publicacion.Imagenes.Add(nombreImg + 4 + ".jpg");
            if (!EliminarArchivo5 && (Archivo5 != null || Img5Anterior != null))
                publicacion.Imagenes.Add(nombreImg + 5 + ".jpg");
            publicacion.Id = IdPublicacion;
            publicacionBL.guardarImagenesPublicacion(publicacion);
        }

        public void guardarArchivos()
        {
            String nombreImg = Titulo.ToUpper().Replace(" ", "") + "_IMG";
            string ruta = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Imagenes/Ofertas/" + nombreImg);
            if (Archivo1 != null || Img1Anterior != null)
            {
                if (!EliminarArchivo1)
                {
                    guardarUnArchivo(Archivo1, nombreImg + 1 + ".jpg", Img1Anterior);
                }
                else {
                    if (Img1Anterior != null)
                        eliminarArchivo(Img1Anterior);
                }
            }
            if (Archivo2 != null || Img2Anterior != null)
            {
                if (!EliminarArchivo2)
                {
                    guardarUnArchivo(Archivo2, nombreImg + 2 + ".jpg", Img2Anterior);
                }
                else {
                    if (Img2Anterior != null)
                        eliminarArchivo(Img2Anterior);
                }
            }
            if (Archivo3 != null || Img3Anterior != null)
            {
                if (!EliminarArchivo3)
                {
                    guardarUnArchivo(Archivo3, nombreImg + 3 + ".jpg", Img3Anterior);
                }
                else {
                    if (Img3Anterior != null)
                        eliminarArchivo(Img3Anterior);
                }
            }
            if (Archivo4 != null || Img4Anterior != null)
            {
                if (!EliminarArchivo4)
                {
                    guardarUnArchivo(Archivo4, nombreImg + 4 + ".jpg", Img4Anterior);
                }
                else {
                    if (Img4Anterior != null)
                        eliminarArchivo(Img4Anterior);
                }
            }
            if (Archivo5 != null || Img5Anterior != null)
            {
                if (!EliminarArchivo5)
                {
                    guardarUnArchivo(Archivo5, nombreImg + 5 + ".jpg", Img5Anterior);
                }
                else {
                    if (Img5Anterior != null)
                        eliminarArchivo(Img5Anterior);
                }
            }
        }
        public void guardarUnArchivo(HttpPostedFileBase archivo, String nombreImagen, String imgAnterior)
        {
            string ruta = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Imagenes/Ofertas/");
            if (archivo != null)
            {
                //Si no existe directorio se crea             
                if (!System.IO.Directory.Exists(ruta))
                    System.IO.Directory.CreateDirectory(ruta);
                //Guardo el nuevo archivo
                archivo.SaveAs(System.IO.Path.Combine(ruta, nombreImagen));
                //Cambia el nombre y cambia la imagen, elimino la imagen anterior
                if (imgAnterior != null && !imgAnterior.Equals("") && !imgAnterior.Equals(nombreImagen))
                {
                    //Elimino la imagen anterior
                    File.Delete(System.IO.Path.Combine(ruta, imgAnterior));
                }
            }
            else {
                //Cambia el nombre de usuario y no imagen, actualizo el nombre de la imagen
                if (imgAnterior != null)
                {
                    //Cambiar nombre de imagen
                    File.Move(System.IO.Path.Combine(ruta, imgAnterior), System.IO.Path.Combine(ruta, nombreImagen));
                }
            }
        }

        public void eliminarArchivo(String img)
        {
            string ruta = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Imagenes/Ofertas/");
            File.Delete(System.IO.Path.Combine(ruta, img));
        }
        public void asignarArchivoPorDefecto()
        {
           //Utilidades.Utilidades.asignarArchivoPorDefecto("Imagenes/Ofertas/", this.Publicacion.Imagen);
        }


    }
}