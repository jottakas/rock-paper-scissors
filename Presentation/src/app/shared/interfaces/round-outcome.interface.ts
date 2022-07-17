import { DD_OUTCOME } from '../enums/dd-outcome.enum';
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
    resultDto?: { id: DD_OUTCOME, name?: DD_OUTCOME[keyof DD_OUTCOME] }
}