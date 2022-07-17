import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from '../../../services/game.service';
import { MetricsService } from '../../../services/metrics.service';
import { ComponentWithSubscriptions } from '../../../shared/classes/component-with-subscriptions.class';
import { DD_OUTCOME } from '../../../shared/enums/dd-outcome.enum';
import { MatchMetrics } from '../../../shared/interfaces/match-metrics.interface';
import { MatchOutcome } from '../../../shared/interfaces/match-outcome.interface';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styles: [
  ]
})
export class MetricsComponent extends ComponentWithSubscriptions {

  public matches$ = this.metricsService.selectors.selectMatches;

  /** Retrieve the created match id */
  currentMatchId$: Observable<number> = this.gameService.selectors.selectMatchId;

  public currentMatchMetrics: MatchMetrics = this.initMatchMetrics();

  constructor(private gameService: GameService,
    private metricsService: MetricsService) {
    super();
  }

  init(): void {
    this.cleanupSubscriptions = [
      this.gameService.evtRestResponse$.subscribe(() => {
        this.metricsService.getMatches();
      }),
      this.matches$.subscribe(this.processMatches)
    ]
  }

  private initMatchMetrics() {
    return {
      matchId: -1,
      victories: 0,
      losses: 0,
      ties: 0,
      victoryRate: 0,
      lossRate: 0,
      tieRate: 0,
      roundsPlayed: 0
    }
  };

  /**
   * Processes the matches to create the latest match metrics
   * @param matches List of all the matches
   */
  private processMatches = (matches: MatchOutcome[]) => {
    const maxMatchId = Math.max(...matches.map(m => m.id));
    const currentMatch = matches.find(m => m.id === maxMatchId)!;

    const { rounds } = currentMatch;
    const roundsPlayed = rounds.length;

    this.currentMatchMetrics = this.initMatchMetrics();

    if (roundsPlayed > 0) {
      const victoryRounds = rounds.filter(r => r.resultDto?.id === DD_OUTCOME.Victory);
      const lossRounds = rounds.filter(r => r.resultDto?.id === DD_OUTCOME.Loss);
      const tieRounds = rounds.filter(r => r.resultDto?.id === DD_OUTCOME.Tie);

      this.currentMatchMetrics = {
        matchId: currentMatch.id,
        victories: victoryRounds.length,
        losses: lossRounds.length,
        ties: tieRounds.length,
        victoryRate: victoryRounds.length / roundsPlayed,
        lossRate: lossRounds.length / roundsPlayed,
        tieRate: tieRounds.length / roundsPlayed,
        roundsPlayed
      }
    }
  }
}
