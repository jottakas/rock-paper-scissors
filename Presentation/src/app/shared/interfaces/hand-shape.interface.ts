import { HandShapeEnum } from "../enums/hand-shape.enum";

export interface HandShape {
    id: HandShapeEnum;
    name: HandShapeEnum[keyof HandShapeEnum];
}