using ET;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AdministradoresWeb.ViewModel.AdministradorViewModel
{
    public class EditarViewModel
    {
        public Administrador administrador { get; set; }

        public int Id { get; set; }
        [Required]
        [Display(Name = "Nombre")]
        public string Nombre { get; set; }
        [Required]
        [Display(Name = "Apellido")]
        public string Apellido { get; set; }       
        [Required]
        [Display(Name = "Telefono")]
        public string Telefono { get; set; }
        [Required]
        [Display(Name = "Dirección")]
        public string Direccion { get; set; }

        //public Barrio Barrio { get; set; } hacer select para barrio

        public EditarViewModel()
        {
            this.administrador = new Administrador();
        }
        public void completarEditarVM() {
            Id = administrador.Id;
            Nombre = administrador.Nombre;
            Apellido = administrador.Apellido;
            Direccion = administrador.Direccion;
            Telefono = administrador.Telefono;
            //Barrio = new Barrio { Id = 1 };
        }

        public void completarAdministrador()
        {
            administrador.Id = Id;
            administrador.Nombre = Nombre;
            administrador.Apellido = Apellido;
            administrador.Direccion = Direccion;
            administrador.Habilitado = true;
            administrador.Telefono = Telefono;
            administrador.Barrio = new Barrio { Id = 1 };
        }
    }
}