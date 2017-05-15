import { Component } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import { Annotation } from '../../../shared/annotation';

//Declaramos la referncia a la libería externa "Annotorious"
declare var anno: any;

@Component({
    selector: 'render',
    templateUrl: 'app/dashboard/project/render/render.component.html',
})
export class RenderComponent {
    constructor(private dataService: DataService) {
    }

    //En éste método se inicializa la librería para la imagen según un ID y se carga un array de objetos de anotaciones
    //TODO: Integración con servicios reales
    public edit() {
        //Convertir en editable una imágen utilizando el método de la variable global "anno"
        anno.makeAnnotatable(document.getElementById('render'))
        //Obtenemos las anotaciones como array de objetos
        //TODO: Obtenerlas desde un servicio (según vimos en ejemplos anteriores)
        var annotations: Annotation[] = JSON.parse('[{"src":"http://localhost:3000/img/render.jpg","text":"Arbol","shapes":[{"type":"rect","geometry":{"x":0.14,"y":0.49556213017751477,"width":0.09052631578947369,"height":0.21005917159763313},"style":{}}],"context":"http://localhost:3000/dashboard/render"},{"src":"http://localhost:3000/img/render.jpg","text":"Mujer","shapes":[{"type":"rect","geometry":{"x":0.4189473684210526,"y":0.6863905325443787,"width":0.06315789473684211,"height":0.1760355029585799},"style":{}}],"context":"http://localhost:3000/dashboard/render"},{"src":"http://localhost:3000/img/render.jpg","text":"Arbusto","shapes":[{"type":"rect","geometry":{"x":0.016842105263157894,"y":0.8150887573964497,"width":0.15263157894736842,"height":0.16124260355029585},"style":{}}],"context":"http://localhost:3000/dashboard/render"},{"src":"http://localhost:3000/img/render.jpg","text":"Sin color","shapes":[{"type":"rect","geometry":{"x":0.07789473684210527,"y":0.060650887573964495,"width":0.3021052631578947,"height":0.2677514792899408},"style":{}}],"context":"http://localhost:3000/dashboard/render"},{"src":"http://localhost:3000/img/render.jpg","text":"Cielo azul","shapes":[{"type":"rect","geometry":{"x":0.4673684210526316,"y":0.047337278106508875,"width":0.17473684210526316,"height":0.15828402366863906},"style":{}}],"context":"http://localhost:3000/dashboard/render"}]');
        //Por cada objeto se agrega una anotación utilizando el método de la variable global "anno"
        for (let annotation of annotations) {
            anno.addAnnotation(annotation)
        }
        console.log("[render.component.ts] - edit: " + JSON.stringify(annotations))
    }

    //En éste método obtenemos todas las anotaciones realizadas y se asignan a un array de objetos de anotaciones
    //TODO: Integración con servicios reales
    public save() {
        var annotations: Annotation[] = [];
        //Obtenemos las anotaciones como array de objetos utlizando el método de la variable global "anno"
        annotations = anno.getAnnotations();
        console.log("[render.component.ts] - save: " + JSON.stringify(annotations))
    }
}
