import { Utilidades } from "./utilidades";
import { Pregunta } from "./pregunta";

export class Servicio {
    Id: number;
    Nombre: string;
    Imagen: string;
    Habilitado: boolean;
    FechaCreacion: Date;
    Preguntas : Pregunta[] = [];
    

    constructor() {      
        // this.Barrio = new Barrio();
        // this.Barrio.Id=0;
    }
}