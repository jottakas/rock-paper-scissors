package rock.paper.scissors.business.domain;

import java.util.List;

/**
 * Match with the rounds
 */
public class MatchDto {
  private long id;
  private List<RoundOutcomeDto> rounds;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public List<RoundOutcomeDto> getRounds() {
    return rounds;
  }

  public void setRounds(List<RoundOutcomeDto> rounds) {
    this.rounds = rounds;
  }

}
