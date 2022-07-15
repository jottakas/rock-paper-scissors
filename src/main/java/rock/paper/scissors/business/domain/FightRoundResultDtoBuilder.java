package rock.paper.scissors.business.domain;

/** Builder for the result to set victory, loss or tie */
public class FightRoundResultDtoBuilder {
  private FightRoundResultDto dto;

  /**
   * Builder constructor. The CPU selection is required
   * @param cpuShapeId CPU selection
   */
  public FightRoundResultDtoBuilder(String cpuShapeId) {
    this.dto = new FightRoundResultDto();
    this.dto.setCpuShapeId(cpuShapeId);
  }

  /**
   * A victory means that victory is true and tie is false
   * @return builder to keep building
   */
  public FightRoundResultDtoBuilder withUserVictory() {
    this.dto.setUserVictory(true);
    this.dto.setTie(false);
    return this;
  }

  /**
   * A loss means that victory is false and tie is false
   * @return builder to keep building
   */
  public FightRoundResultDtoBuilder withUserLoss() {
    this.dto.setUserVictory(false);
    this.dto.setTie(false);
    return this;
  }

  /**
   * A victory means that victory is false and tie is true
   * @return builder to keep building
   */
  public FightRoundResultDtoBuilder withTie() {
    this.dto.setUserVictory(false);
    this.dto.setTie(true);
    return this;
  }

  /**
   * Builds the result
   * @return resulting DTO
   */
  public FightRoundResultDto build() {
    return this.dto;
  }
}
