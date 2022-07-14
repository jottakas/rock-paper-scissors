package rock.paper.scissors.business;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;

import rock.paper.scissors.business.domain.FightRoundResultBuilder;
import rock.paper.scissors.business.domain.FightRoundResultDto;
import rock.paper.scissors.business.domain.HandShapeDto;
import rock.paper.scissors.data.HandShapeRepository;
import rock.paper.scissors.data.entities.HandShape;
import rock.paper.scissors.utils.Constants;
import rock.paper.scissors.utils.Utils;

@Service
public class GameService {

  private final HandShapeRepository handShapeRepository;

  public GameService(HandShapeRepository handShapeRepository) {
    this.handShapeRepository = handShapeRepository;
  }

  public List<HandShapeDto> getHandShapes() {
    List<HandShape> entities = (List<HandShape>) handShapeRepository.findAll();
    System.out.println("aaa" + entities.size());
    HandShape cpuHandShape = handShapeRepository
        .findById(String.valueOf("1"))
        .orElseThrow(() -> new EntityNotFoundException("1"));

        System.out.println("bbb " + (cpuHandShape!= null));

    return HandShapeMapper.mapListFrom(entities);
  }

  /**
   * Sends the user choice to check randomly if it wins
   *
   * @param shapeId user choice
   * @return win, loss or tie depending on randomness
   * @throws Exception when the random cpu shape id is unexpected
   */
  public FightRoundResultDto fightRound(String shapeId) throws Exception {
    int cpuShapeId = Utils.getRandom(1, 3);

    HandShape cpuHandShape = handShapeRepository
        .findById(String.valueOf(cpuShapeId))
        .orElseThrow(() -> new EntityNotFoundException(shapeId));

    HandShapeDto cpuDto = HandShapeMapper.mapFrom(cpuHandShape);
    FightRoundResultDto result = processFightRoundResult(shapeId, cpuDto.getId());

    return result;
  }

  /**
   * Creates the result of the round
   *
   * @param userShapeId
   * @param cpuShapeId
   * @return fight round result
   */
  private FightRoundResultDto processFightRoundResult(String userShapeId, String cpuShapeId) {
    boolean isTie = userShapeId.equals(cpuShapeId);

    // Assume it's a loss
    FightRoundResultBuilder resultBuilder = new FightRoundResultBuilder(cpuShapeId)
        .withUserLoss();

    if (isTie) {
      resultBuilder.withTie();
    } else if (isUserVictory(userShapeId, cpuShapeId)) {
      resultBuilder.withUserVictory();
    }

    return resultBuilder.build();
  }

  /**
   * True if user wins against the cpu. False otherwise
   *
   * @param userShapeId
   * @param cpuShapeId
   * @return user victory
   */
  private boolean isUserVictory(String userShapeId, String cpuShapeId) {
    boolean isUserVictory = false;

    switch (userShapeId) {
      case Constants.HandShapes.ROCK:
        isUserVictory = cpuShapeId.equals(Constants.HandShapes.SCISSORS);
        break;
      case Constants.HandShapes.PAPER:
        isUserVictory = cpuShapeId.equals(Constants.HandShapes.ROCK);
        break;
      case Constants.HandShapes.SCISSORS:
        isUserVictory = cpuShapeId.equals(Constants.HandShapes.PAPER);
        break;
    }

    return isUserVictory;
  }
}
