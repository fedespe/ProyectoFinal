using ET;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AdministradoresWeb.ViewModel.PreguntaViewModel
{
    public class AltaPreguntaViewModel
    {
        public Pregunta pregunta { get; set; }

        [Required]
        [Display(Name = "Pregunta")]
        public string UnaPregunta { get; set; }

        public int IdPregunta { get; set; }
        public int IdCategoria { get; set; }
        public string Categoria { get; set; }


        public AltaPreguntaViewModel()
        {
            this.pregunta = new Pregunta();
        }

        public void completarPregunta()
        {
            pregunta.unaPregunta = UnaPregunta;

            //Ver seleccion de categoria, con desplegable o con checkbox
            pregunta.Categoria = new CategoriaPregunta { Id = 1 };
        }

        public void completarAltaPreguntaVM() {
            IdPregunta = pregunta.Id;
            UnaPregunta = pregunta.unaPregunta;
            IdCategoria = pregunta.Categoria.Id;
            Categoria = pregunta.Categoria.Categoria;
        }



    }
}