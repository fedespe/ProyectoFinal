﻿using ET;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AdministradoresWeb.ViewModel.AdministradorViewModel
{
    public class CambiarPassViewModel
    {
        public int Id { get; set; }
        public Administrador Admin { get; set; }
        [Display(Name = "Nombre Usuario")]
        public string NombreUsuario { get; set; }
        [Display(Name = "Contraseña Actual")]
        [DataType(DataType.Password)]
        public string PasswordActual { get; set; }
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