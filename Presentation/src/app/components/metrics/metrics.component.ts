import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, map, Subscription } from 'rxjs';
import { GameService } from '../../services/game.service';
import { MetricsService } from '../../services/metrics.service';
import { Match } from '../../shared/interfaces/match.interface';
import { utils } from '../../shared/util/utils';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styles: [
  ]
})
export class MetricsComponent implements OnInit, OnDestroy {

  public matches$ = this.metricsService.evtRestResponse$.pipe(
    filter(utils.isResponseWithData),
    map(utils.mapResponseData)
  );

  private cleanupSubscriptions: Subscription[] = [];

  constructor(private gameService: GameService,
    private metricsService: MetricsService) { }

  ngOnInit(): void {
    this.cleanupSubscriptions = [
      this.gameService.evtRestResponse$.subscribe(() => {
        this.metricsService.getMatches();
      }),
      this.matches$.subscribe(this.processMatches)
    ]
  }

  ngOnDestroy(): void {
    utils.unsubscribe(this.cleanupSubscriptions);
  }

  private processMatches = (matches: Match[]) => {

  }
}
