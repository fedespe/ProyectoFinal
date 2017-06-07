using ET;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AdministradoresWeb.ViewModel.ClienteViewModel
{
    public class NuevoPassViewModel
    {
        public int Id { get; set; }
        public Cliente cli { get; set; }
        [Display(Name = "Nombre Usuario")]
        public string NombreUsuario { get; set; }
       
        [Display(Name = "Contraseña Nueva")]
        [DataType(DataType.Password)]
        [Required]
        public string PasswordNuevo { get; set; }
        [Display(Name = "Confirmar Contraseña")]
        [DataType(DataType.Password)]
        [Required]
        public string PasswordConfirmacion { get; set; }
        public string Mensaje { get; set; }
    }
}