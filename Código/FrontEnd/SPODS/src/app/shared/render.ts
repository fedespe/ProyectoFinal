/**
 * Created by Bruno on 27/04/2017.
 */

import {RenderVersion} from "./renderVersion";

export class Render{
    RenderId: number;
    RenderDescripcion:string
    ProyectoId: number;
    TipoRenderId: number;
    RenderEstado: number;
    RenderEtapa: number;
    TipoRenderDescripcion: string;
    SDTRenderVersion: RenderVersion[];
}