import { ROUND_OUTCOME } from '../enums/round-outcome.enum';
import { HAND_SHAPES } from "../enums/hand-shapes.enum";

export interface RoundOutcome {
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
    /** When was the round played */
    date?: Date;

    /** Represents the state: Victory 1 Loss 2 Tie 3 */
    resultDto?: { id: ROUND_OUTCOME, name: ROUND_OUTCOME[keyof ROUND_OUTCOME] }
}