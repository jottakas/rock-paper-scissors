import { HAND_SHAPES } from "../enums/hand-shapes.enum";

export interface FightRoundResult {
    /** Shape chosen by the computer */
    cpuShapeId: HAND_SHAPES;
    /** True if the user wins. False on loss or tie */
    isUserVictory: boolean;
    /** True on tie. False otherwise */
    isTie: boolean;
}