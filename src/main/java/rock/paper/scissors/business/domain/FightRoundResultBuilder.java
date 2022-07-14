package rock.paper.scissors.business.domain;

/** Builder for the result to set victory, loss or tie */
public class FightRoundResultBuilder {
  private FightRoundResultDto dto;

  public FightRoundResultBuilder(String cpuShapeId) {
    this.dto = new FightRoundResultDto();
    this.dto.setCpuShapeId(cpuShapeId);
  }

  public FightRoundResultBuilder withUserVictory() {
    this.dto.setUserVictory(true);
    this.dto.setTie(false);
    return this;
  }

  public FightRoundResultBuilder withUserLoss() {
    this.dto.setUserVictory(false);
    this.dto.setTie(false);
    return this;
  }

  public FightRoundResultBuilder withTie() {
    this.dto.setUserVictory(false);
    this.dto.setTie(true);
    return this;
  }

  public FightRoundResultDto build() {
    return this.dto;
  }
}
