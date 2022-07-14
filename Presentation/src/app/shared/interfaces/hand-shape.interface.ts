import { HAND_SHAPES } from "../enums/hand-shapes.enum";

export interface HandShape {
    id: HAND_SHAPES;
    name: HAND_SHAPES[keyof HAND_SHAPES];
}