import {Settings} from "./settings";

export class Utilidades {
    public static log( texto: string){
        if(Settings.debug){
            console.log(texto);
        }
    }
}


    