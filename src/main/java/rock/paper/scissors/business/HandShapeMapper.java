package rock.paper.scissors.business;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import rock.paper.scissors.business.domain.HandShapeDto;
import rock.paper.scissors.business.domain.PaperShapeDto;
import rock.paper.scissors.business.domain.RockShapeDto;
import rock.paper.scissors.business.domain.ScissorsShapeDto;
import rock.paper.scissors.data.entities.HandShape;
import rock.paper.scissors.utils.Constants;
import rock.paper.scissors.utils.Utils;

public class HandShapeMapper {
  /**
   * Maps an entity to a Data Transfer Object
   *
   * @param entity entity to map
   * @return mapped dto
   */
  public static HandShapeDto mapFrom(HandShape entity) {
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

  /**
   * Maps an entity list to a Data Transfer Object list
   *
   * @param entities entities to map
   * @return mapped dtos or an empty list if the entities are empty
   */
  public static List<HandShapeDto> mapListFrom(List<HandShape> entities) {
    List<HandShapeDto> result = Collections.emptyList();

    if (Utils.isListNotEmpty(entities)) {
      result = entities.stream()
        .map(HandShapeMapper::mapFrom)
        .collect(Collectors.toList());
    }

    return result;
  }
}
