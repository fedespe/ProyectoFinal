import { Cliente } from "./cliente";
import { Publicacion } from "./publicacion";

export class ComentarioPuntuacion {
    Id: number;
    Comentario: string;
    Fecha: Date;
    Respuesta: string;
    Puntuacion: number;
    Cliente:Cliente;
    Publicacion: Publicacion;
    
}