import {ProjectFile} from "./projectFile";

export class Project{
    ProyectoId: string;
    ProyectoTitulo:string
    ProyectoDescripcion: string;
    ProyectoFechaAlta: string;
    ProyectoFechaDeseada: string;
    ProyectoPresupuesto: string;
    ProyectoFechaEstimada: string;
    ProyectoCantidadRenders: number;
    ProyectoEstado: number;
    ProyectoEstadoVarChar: string;
    ProyectoPago:boolean;
    ClienteNombre: string;
    RenderistaNombre:string;
}