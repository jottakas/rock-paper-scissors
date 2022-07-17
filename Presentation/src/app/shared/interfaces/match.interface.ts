import { RoundOutcome } from './round-outcome.interface';

export interface Match {
    id: number;
    /** Data about the rounds played */
    rounds: RoundOutcome[];
}