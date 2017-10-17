using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace AdministradoresWeb.ViewModel.Utilidades
{
    public static class Utilidades
    {
        //Utilizada para asignar archivo cuando se da de alta el cliente desde angular, por si no selecciona una imagen y ya se creo el usuario, el mismo no quede sin imagen
        public static void asignarArchivoPorDefecto(string directorio, string nombreArchivo)
        {
            string ruta = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, directorio);            
            //Asiganar imagen 
            if (!System.IO.File.Exists(System.IO.Path.Combine(ruta, nombreArchivo)))
                File.Copy(System.IO.Path.Combine(ruta, "SinImagen.jpg"), System.IO.Path.Combine(ruta, nombreArchivo));
        }

        //Para guardar archivos recien creados NO MODIFICADOS
        //Ejemplo de uso Utilidades.Utilidades.guardarArchivo("Imagenes/Servicios/", "nombreImg1.jpg", Archivo);
        public static void guardarArchivoNuevo(string directorio, string nombreArchivo, HttpPostedFileBase archivo)
        {
            string ruta = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, directorio);
            if (archivo != null)
            {
                //Si no existe directorio se crea             
                if (!System.IO.Directory.Exists(ruta))
                    System.IO.Directory.CreateDirectory(ruta);
                //Guardo el nuevo archivo
                archivo.SaveAs(System.IO.Path.Combine(ruta, nombreArchivo));
            }
            else {
                //Asiganar imagen 
                if (!System.IO.File.Exists(System.IO.Path.Combine(ruta, nombreArchivo)))
                    File.Copy(System.IO.Path.Combine(ruta, "SinImagen.jpg"), System.IO.Path.Combine(ruta, nombreArchivo));
            }
        }

        //elimina archivo anterior si hay archivo nuevo, o modifica el nombre en caso que no haya archivo nuevo
        public static void modificarArchivoAnterior(string directorio, string nombreImgAnterior, string nombreImgNueva, HttpPostedFileBase archivo)
        {
            string ruta = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, directorio);
            if (archivo != null)
            {              
                if (nombreImgAnterior != null && !nombreImgAnterior.Equals("") && !nombreImgAnterior.Equals(nombreImgNueva))
                {
                    //Elimino la imagen anterior
                    File.Delete(System.IO.Path.Combine(ruta, nombreImgAnterior));
                }
            }
            else {
                //Cambia el nombre de usuario y no imagen, actualizo el nombre de la imagen
                if (nombreImgAnterior != null)
                {
                    //Cambiar nombre de imagen
                    File.Move(System.IO.Path.Combine(ruta, nombreImgAnterior), System.IO.Path.Combine(ruta, nombreImgNueva));
                }
            }
        }

        //Para utilizar en modificacion de archivos, se debe llamar a modificarArchivoAnterior(...) luego de este metodo para borrar imagen anterior o modificar el nombre en caso de no haber cambiado la imagen.
        public static void guardarArchivoModificado(string directorio, string nombreImgAnterior, string nombreImgNueva, HttpPostedFileBase archivo)
        {
            string ruta = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, directorio);
            if (archivo != null)
            {
                //Si no existe directorio se crea             
                if (!System.IO.Directory.Exists(ruta))
                    System.IO.Directory.CreateDirectory(ruta);
                //Guardo el nuevo archivo
                archivo.SaveAs(System.IO.Path.Combine(ruta, nombreImgNueva));
            }
        }
        public static void eliminarArchivo(string directorio, string nombreImg)
        {
            string rutaAnterior = System.IO.Path.Combine(AppDomain.CurrentDomain.BaseDirectory, directorio);
            File.Delete(System.IO.Path.Combine(rutaAnterior, nombreImg));
        }


    }
}