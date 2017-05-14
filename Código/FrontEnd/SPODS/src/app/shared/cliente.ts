/**
 * Created by Bruno on 28/04/2017.
 */

export class Cliente {
    ClienteId:string;
    ClienteEmpresa:string;
    ClienteRubro:string;

    constructor(empresa:string,rubro:string){
        this.ClienteEmpresa = empresa;
        this.ClienteRubro = rubro;
    }
}