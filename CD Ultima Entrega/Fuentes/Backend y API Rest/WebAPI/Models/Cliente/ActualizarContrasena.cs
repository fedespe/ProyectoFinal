using ET;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models.Cliente
{
    public class ActualizarContrasena
    {
        public int IdUsuario { get; set; }
        public string Contrasena { get; set; }
        public string ContrasenaNueva { get; set; }
    }
}