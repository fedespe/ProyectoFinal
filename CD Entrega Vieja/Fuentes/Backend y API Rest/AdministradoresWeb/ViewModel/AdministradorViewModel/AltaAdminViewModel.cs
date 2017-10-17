using ET;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AdministradoresWeb.ViewModel.AdministradorViewModel
{
    public class AltaAdminViewModel
    {

        public Administrador administrador { get; set; }

        [Required]
        [Display(Name = "Nombre")]
        public string Nombre { get; set; }
        [Required]
        [Display(Name = "Apellido")]
        public string Apellido { get; set; }
        [Required]
        [Display(Name = "Nombre Usuario")]
        public string NombreUsuario { get; set; }
        [Required]
        [Display(Name = "Contraseña")]
        public string Contrasena { get; set; }
        [Required]
        [Display(Name = "Correo Electrónico")]
        public string CorreoElectronico { get; set; }
        [Required]
        [Display(Name = "Telefono")]
        public string Telefono { get; set; }
        [Required]
        [Display(Name = "Dirección")]
        public string Direccion { get; set; }

        //public Barrio Barrio { get; set; } hacer select para barrio

        public AltaAdminViewModel()
        {
            this.administrador = new Administrador();
        }

        public void completarAdministrador()
        {
            administrador.Nombre = Nombre;
            administrador.Apellido = Apellido;
            administrador.Contrasena = Contrasena;
            administrador.CorreoElectronico = CorreoElectronico;
            administrador.Direccion = Direccion;
            administrador.Habilitado = true;
            administrador.Apellido = Apellido;
            administrador.NombreUsuario = NombreUsuario;
            administrador.Telefono = Telefono;
            administrador.Barrio = new Barrio { Id = 1 };
        }
    }
}