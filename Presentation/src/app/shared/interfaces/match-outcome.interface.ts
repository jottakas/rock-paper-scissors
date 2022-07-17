import { RoundOutcome } from './round-outcome.interface';

export interface MatchOutcome {
    id: number;
    /** Data about the rounds played */
    rounds: RoundOutcome[];
}