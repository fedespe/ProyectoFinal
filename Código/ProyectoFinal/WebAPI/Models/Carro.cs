﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Carro
    {
        public int Id { get; set; }
        public Marca Marca { get; set; }
        public int Modelo { get; set; }
    }
}
