import { Injectable } from '@angular/core';
import { MatchOutcome } from '../shared/interfaces/match-outcome.interface';
import { HttpService } from './http.service';
import { ServiceActions } from './service-actions';

@Injectable({
  providedIn: 'root'
})
export class MetricsService extends HttpService {
  protected override readonly apiUrl = 'metrics';

  /** Selectors for the different events */
  public selectors = {
    /** Retrieve all the matches data */
    selectMatches: super.createSelector<MatchOutcome[]>(ServiceActions.Metrics.GET_MATCHES)
  }

  /**
   * Gets the hand shapes
   * @returns Correlation id
   */
  public getMatches(): string {
    return super.get({ endpoint: 'matches', action: ServiceActions.Metrics.GET_MATCHES });
  }
}
