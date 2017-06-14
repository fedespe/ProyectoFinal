using DAL;
using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class PreguntaBL
    {
        private PreguntaDAL preguntaDAL = new PreguntaDAL();

        //VER SI ES NECESARIO ELIMINAR UNA PREGUNTA
        public void altaPregunta(Pregunta pregunta)
        {
            validarPregunta(pregunta);
            preguntaDAL.altaPregunta(pregunta);       
        }
        public void actualizarPregunta(Pregunta pregunta)
        {
            validarPregunta(pregunta);
            preguntaDAL.actualizarPregunta(pregunta);
        }    
        public List<Pregunta> obtenerTodos()
        {
            return preguntaDAL.obtenerTodos();
        }
        public Pregunta obtener(int id)
        {
            return preguntaDAL.obtener(id);
        }
        //ver validaciones
        private void validarPregunta(Pregunta pregunta) {
            if (pregunta.unaPregunta.Length < 3) {
                throw new ProyectoException("Error: Validación pregunta");
            }
            if (pregunta.Categoria.Id == 0)
            {
                throw new ProyectoException("Error: La pregunta debe contener una categoría");
            }
        }
    }
}
