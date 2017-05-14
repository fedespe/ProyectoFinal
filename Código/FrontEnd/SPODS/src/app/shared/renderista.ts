/**
 * Created by Bruno on 28/04/2017.
 */

export class Renderista {
    RenderistaId: string;
    RenderistaEmpresa:string;
    RenderistaRubro: string;
    RenderistaHabilitado: boolean;
    RenderistaTarifa: string;

    constructor(empresa:string,rubro:string){
        this.RenderistaEmpresa = empresa;
        this.RenderistaRubro = rubro;
    }

}