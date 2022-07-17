package rock.paper.scissors.business.domain;

import java.util.List;

/**
 * Generic Data Transfer Object with id and name
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
