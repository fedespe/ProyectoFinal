import { Utilidades } from "./utilidades";
import { Servicio } from "./servicio";
import { Cliente } from "./cliente";
import { Respuesta } from "./respuesta";
import { Error } from "./error";
import { Solicitud } from "./solicitud";

export class Presupuesto {
    Id: number;
    Cliente: Cliente=new Cliente();
    Comentario: string;
    Aceptado:boolean;
    Solicitud: Solicitud= new Solicitud();
    

    constructor() {      
    }
}