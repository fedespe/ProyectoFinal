using BL;
using ET;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AdministradoresWeb.ViewModel.ServicioViewModel
{
    public class AltaServicioViewModel
    {
        private PreguntaBL preguntaBL = new PreguntaBL();
        public Servicio Servicio { get; set; }

        [Required]
        [Display(Name = "Nombre")]
        public string Nombre { get; set; }
        public int IdServicio { get; set; }
        public List<Pregunta> Preguntas { get; set;}
        public string CadenaPreguntas { get; set; }
        //FALTA IMAGEN


        public AltaServicioViewModel()
        {
            this.Servicio = new Servicio();
            Preguntas = preguntaBL.obtenerTodos();
        }

        public void completarServicio()
        {
            Servicio.FechaCreacion = DateTime.Now;
            Servicio.Habilitado = true;
            Servicio.Nombre = Nombre;
            cargarPreguntas();

            //Ver seleccion de imagen
            Servicio.Imagen="imagen1.jpg";
        }

        public void completarAltaServicioVM()
        {
            IdServicio = Servicio.Id;
            Nombre = Servicio.Nombre;
            Preguntas = Servicio.Preguntas;
        }

        private void cargarPreguntas()
        {
            if (CadenaPreguntas != null)
            {
                CadenaPreguntas = CadenaPreguntas.Trim();
                Char c1 = ' ';
                Char c2 = ';';
                String[] substrings = CadenaPreguntas.Split(c1);
                for (int i = 0; i < substrings.Length; i++)
                {
                    String[] substrings2 = substrings[i].Split(c2);
                    Pregunta p = new Pregunta { Id = Convert.ToInt32(substrings2[0]) };
                    if (substrings2[1] == "true")
                    {
                        Servicio.Preguntas.Remove(p);
                        Servicio.Preguntas.Add(p);
                    }
                    else {
                        Servicio.Preguntas.Remove(p);
                    }
                }
            }
        }




    }
}