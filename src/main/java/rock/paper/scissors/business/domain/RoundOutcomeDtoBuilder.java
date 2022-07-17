package rock.paper.scissors.business.domain;

import rock.paper.scissors.utils.Constants;

/** Builder for the result to set victory, loss or tie */
public class RoundOutcomeDtoBuilder {
  private RoundOutcomeDto dto;

  /**
   * Builder constructor. The CPU selection is required
   *
   * @param userShapeId User selection
   * @param cpuShapeId  CPU selection
   */
  public RoundOutcomeDtoBuilder(String userShapeId, String cpuShapeId) {
    this.dto = new RoundOutcomeDto();
    this.dto.setUserShapeId(userShapeId);
    this.dto.setCpuShapeId(cpuShapeId);
  }

  /**
   * A victory means that victory is true and tie is false
   *
   * @return builder to keep building
   */
  public RoundOutcomeDtoBuilder withUserVictory() {
    this.dto.setUserVictory(true);
    this.dto.setTie(false);
    this.dto.setResultDto(new BaseDto(Constants.Outcome.VICTORY));

    return this;
  }

  /**
   * A loss means that victory is false and tie is false
   *
   * @return builder to keep building
   */
  public RoundOutcomeDtoBuilder withUserLoss() {
    this.dto.setUserVictory(false);
    this.dto.setTie(false);
    this.dto.setResultDto(new BaseDto(Constants.Outcome.LOSS));

    return this;
  }

  /**
   * A victory means that victory is false and tie is true
   *
   * @return builder to keep building
   */
  public RoundOutcomeDtoBuilder withTie() {
    this.dto.setUserVictory(false);
    this.dto.setTie(true);
    this.dto.setResultDto(new BaseDto(Constants.Outcome.TIE));

    return this;
  }

  /**
   * Builds the result
   *
   * @return resulting DTO
   */
  public RoundOutcomeDto build() {
    return this.dto;
  }
}
