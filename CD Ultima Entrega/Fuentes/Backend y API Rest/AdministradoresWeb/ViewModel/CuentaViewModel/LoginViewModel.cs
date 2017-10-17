using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AdministradoresWeb.ViewModel.CuentaViewModel
{
    public class LoginViewModel
    {
        [Display(Name = "Nombre Usuario")]
        public string NombreUsuario { get; set; }

        [Display(Name = "Contraseña")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        public string Mensaje { get; set; }
    }
}