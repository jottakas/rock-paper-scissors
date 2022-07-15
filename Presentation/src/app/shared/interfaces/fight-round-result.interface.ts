import { HAND_SHAPES } from "../enums/hand-shapes.enum";

export interface FightRoundResult {
    /** User Shape chosen by the computer */
    userShapeId?: HAND_SHAPES;
    /** Shape chosen by the computer */
    cpuShapeId: HAND_SHAPES;
    /** True if the user wins. False on loss or tie */
    isUserVictory: boolean;
    /** True on tie. False otherwise */
    isTie: boolean;

    /** Round played */
    roundNumber?: number;
    /** Represents the state: Victory 1 Loss 2 Tie 3 */
    resultDto?: { id: string, name: string }
}