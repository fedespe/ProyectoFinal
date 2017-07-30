import { Cliente } from "./cliente";
import { Publicacion } from "./publicacion";
import { ComentarioPuntuacion } from "./comentarioPuntuacion";

export class Contacto {
    Id: number=0;
    Publicacion: Publicacion;// = new Publicacion();
    Cliente:Cliente = new Cliente();
    ComentarioPuntuacion: ComentarioPuntuacion = new ComentarioPuntuacion();
    Fecha: Date;
}