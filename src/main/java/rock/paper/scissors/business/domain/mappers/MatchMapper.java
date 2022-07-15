package rock.paper.scissors.business.domain.mappers;

import java.util.List;

import rock.paper.scissors.business.domain.FightRoundResultDto;
import rock.paper.scissors.business.domain.MatchDto;
import rock.paper.scissors.data.entities.Match;

public class MatchMapper extends EntityToDtoMapper<Match, MatchDto> {
  /**
   * Maps an entity to a Data Transfer Object
   *
   * @param entity entity to map
   * @return mapped dto
   */
  @Override
  public MatchDto mapFrom(Match entity) {
    MatchDto result = new MatchDto();

    result.setId(entity.getId());

    List<FightRoundResultDto> roundsDto = MapperCache.fightRoundResultMapper.mapListFrom(entity.getFightRoundResult());
    result.setRounds(roundsDto);

    return result;
  }
}
