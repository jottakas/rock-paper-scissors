package rock.paper.scissors.business.domain.mappers;

import rock.paper.scissors.business.domain.handShapes.HandShapeDto;
import rock.paper.scissors.business.domain.handShapes.PaperShapeDto;
import rock.paper.scissors.business.domain.handShapes.RockShapeDto;
import rock.paper.scissors.business.domain.handShapes.ScissorsShapeDto;
import rock.paper.scissors.data.entities.HandShape;
import rock.paper.scissors.utils.Constants;

public class HandShapeMapper extends EntityToDtoMapper<HandShape, HandShapeDto> {
  /**
   * Maps an entity to a Data Transfer Object
   *
   * @param entity entity to map
   * @return mapped dto
   */
  @Override
  public HandShapeDto mapFrom(HandShape entity) {
    HandShapeDto result = null;

    switch (entity.getId()) {
      case Constants.HandShapes.ROCK:
        result = new RockShapeDto();
        break;
      case Constants.HandShapes.PAPER:
        result = new PaperShapeDto();
        break;
      case Constants.HandShapes.SCISSORS:
        result = new ScissorsShapeDto();
        break;
    }

    if (result != null) {
      result.setId(entity.getId());
      result.setName(entity.getName());
    }

    return result;
  }
}
