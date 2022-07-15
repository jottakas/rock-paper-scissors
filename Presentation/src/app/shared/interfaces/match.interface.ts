import { FightRoundResult } from './fight-round-result.interface';

export interface Match {
    id: number;
    /** Data about the rounds played */
    rounds: FightRoundResult;
}