package rock.paper.scissors.business.domain.mappers;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import rock.paper.scissors.utils.Utils;

/**
 * Maps Entities to Data Transfer Objects
 */
public abstract class EntityToDtoMapper<Entity, Dto> {
  /**
   * Maps an entity to a Data Transfer Object
   *
   * @param entity entity to map
   * @return mapped dto
   */
  public abstract Dto mapFrom(Entity entity);

  /**
   * Maps an entity list to a Data Transfer Object list
   *
   * @param entities entities to map
   * @return mapped dtos or an empty list if the entities are empty
   */
  public List<Dto> mapListFrom(Collection<Entity> entities) {
    List<Dto> result = Collections.emptyList();

    if (Utils.isCollectionNotEmpty(entities)) {
      result = entities.stream()
          .map(this::mapFrom)
          .collect(Collectors.toList());
    }

    return result;
  }
}
