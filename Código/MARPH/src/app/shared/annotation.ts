export class Geometry {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class Style {
}

export class Shape {
    type: string;
    geometry: Geometry;
    style: Style;
}

export class Annotation {
    src: string;
    text: string;
    shapes: Shape[];
    context: string;
}