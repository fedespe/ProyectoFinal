import { Cliente } from "./cliente";
import { Publicacion } from "./publicacion";
import { Contacto } from "./contacto";

export class ComentarioPuntuacion {
    Id: number;
    Comentario: string;
    Fecha: Date;
    Respuesta: string;
    Puntuacion: number=0;
    Cliente:Cliente = new Cliente();
    Publicacion: Publicacion;
    Contacto:Contacto;
}