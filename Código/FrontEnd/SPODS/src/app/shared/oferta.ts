import { Utilidades } from "./utilidades";
import { Servicio } from "./servicio";
import { Cliente } from "./cliente";
import { Respuesta } from "./respuesta";
import { Error } from "./error";
import { Publicacion } from "./publicacion";
import { Presupuesto } from "./presupuesto";

export class Oferta extends Publicacion{
    PuntajePromedio: number;
    CantidadComentarios: number;
    
    constructor() {  
        super();    
    }
}