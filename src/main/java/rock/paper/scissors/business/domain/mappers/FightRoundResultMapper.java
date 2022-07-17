package rock.paper.scissors.business.domain.mappers;

import rock.paper.scissors.business.domain.BaseDto;
import rock.paper.scissors.business.domain.RoundOutcomeDto;
import rock.paper.scissors.data.entities.FightRoundResult;

public class FightRoundResultMapper extends EntityToDtoMapper<FightRoundResult, RoundOutcomeDto> {
  /**
   * Maps an entity to a Data Transfer Object
   *
   * @param entity entity to map
   * @return mapped dto
   */
  @Override
  public RoundOutcomeDto mapFrom(FightRoundResult entity) {
    RoundOutcomeDto result = new RoundOutcomeDto();

    result.setUserShapeId(entity.getUserHandShapeId());
    result.setCpuShapeId(entity.getCpuHandShapeId());
    result.setRoundNumber(entity.getRoundNumber());
    result.setDate(entity.getDate());
    result.setResultDto(new BaseDto(entity.getDdFightRoundResult().getId(), entity.getDdFightRoundResult().getName()));

    return result;
  }
}
