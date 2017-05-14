/**
 * Created by Bruno on 17/04/2017.
 */
export class ProjectFile {
    ProyectoId: number;
    ArchivoDescripcion: string;
    ArchivoURL: string;



    constructor(Url:string, Descripion:string, ProjectId:number){
        this.ArchivoURL = Url;
        this.ArchivoDescripcion = Descripion;
        this.ProyectoId = ProjectId;
    }
}