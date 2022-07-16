package rock.paper.scissors.business;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;

import rock.paper.scissors.business.api.GameService;
import rock.paper.scissors.business.domain.FightRoundResultDto;
import rock.paper.scissors.business.domain.FightRoundResultDtoBuilder;
import rock.paper.scissors.business.domain.handShapes.HandShapeDto;
import rock.paper.scissors.business.domain.mappers.MapperCache;
import rock.paper.scissors.data.DdFightRoundResultRepository;
import rock.paper.scissors.data.FightRoundResultRepository;
import rock.paper.scissors.data.HandShapeRepository;
import rock.paper.scissors.data.MatchRepository;
import rock.paper.scissors.data.entities.DdFightRoundResult;
import rock.paper.scissors.data.entities.FightRoundResult;
import rock.paper.scissors.data.entities.HandShape;
import rock.paper.scissors.data.entities.Match;
import rock.paper.scissors.utils.Constants;
import rock.paper.scissors.utils.Utils;

@Service
public class GameServiceImpl implements GameService {

  private final HandShapeRepository handShapeRepository;
  private final MatchRepository matchRepository;
  private final FightRoundResultRepository fightRoundResultRepository;
  private final DdFightRoundResultRepository ddFightRoundResultRepository;

  public GameServiceImpl(HandShapeRepository handShapeRepository, MatchRepository matchRepository,
      FightRoundResultRepository fightRoundResultRepository,
      DdFightRoundResultRepository ddFightRoundResultRepository) {
    this.handShapeRepository = handShapeRepository;
    this.matchRepository = matchRepository;
    this.fightRoundResultRepository = fightRoundResultRepository;
    this.ddFightRoundResultRepository = ddFightRoundResultRepository;
  }

  /**
   * Retrieves the list of possible shapes to use in the game: rock, paper or
   * scissors
   *
   * @return valid shapes
   */
  public List<HandShapeDto> getHandShapes() {
    List<HandShape> entities = (List<HandShape>) handShapeRepository.findAll();
    return MapperCache.handShapeMapper.mapListFrom(entities);
  }

  public long createMatch() {
    return matchRepository.save(new Match()).getId();
  }

  /**
   * Sends the user choice to check randomly if it wins
   *
   * @param userShapeId user choice
   * @return win, loss or tie depending on randomness
   * @throws Exception when the random cpu shape id is unexpected
   */
  public FightRoundResultDto fightRound(long matchId, String userShapeId) throws Exception {
    int cpuShapeId = Utils.getRandom(1, 3);

    HandShape cpuHandShape = handShapeRepository
        .findById(String.valueOf(cpuShapeId))
        .orElseThrow(() -> new EntityNotFoundException(userShapeId));

    HandShapeDto cpuDto = MapperCache.handShapeMapper.mapFrom(cpuHandShape);
    FightRoundResultDto result = processFightRoundResult(userShapeId, cpuDto.getId());

    saveMetric(matchId, userShapeId, cpuDto.getId(), result);

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
    FightRoundResultDtoBuilder resultBuilder = new FightRoundResultDtoBuilder(cpuShapeId)
        .withUserLoss();

    if (isTie) {
      resultBuilder.withTie();
    } else if (isUserVictory(userShapeId, cpuShapeId)) {
      resultBuilder.withUserVictory();
    }

    return resultBuilder.build();
  }

  /**
   * Saves the fight result for metric purpouses
   */
  private void saveMetric(long matchId, String userHandShapeId, String cpuHandShapeId,
      FightRoundResultDto fightResultDto) {

    FightRoundResult fightResult = new FightRoundResult();
    fightResult.setUserHandShapeId(userHandShapeId);
    fightResult.setCpuHandShapeId(cpuHandShapeId);
    fightResult.setDate(new Date());

    Match match = matchRepository.findById(matchId).orElseThrow();
    fightResult.setMatch(match);

    // Increment the roound number by one
    int roundNumber = match.getFightRoundResult().size() + 1;
    fightResult.setRoundNumber(roundNumber);

    DdFightRoundResult ddFightRoundResult = resolveDdFightRoundResult(fightResultDto);
    fightResult.setDdFightRoundResult(ddFightRoundResult);

    fightRoundResultRepository.save(fightResult);
  }

  /** Retrieves the corresponding fight result entity based on the result DTO */
  private DdFightRoundResult resolveDdFightRoundResult(FightRoundResultDto fightResultDto) {
    String ddResultId = Constants.FightRoundResult.TIE;
    if (!fightResultDto.isTie()) {
      ddResultId = fightResultDto.isUserVictory() ? Constants.FightRoundResult.VICTORY
          : Constants.FightRoundResult.LOSS;
    }
    DdFightRoundResult ddResult = ddFightRoundResultRepository.findById(ddResultId)
        .orElseThrow(() -> new EntityNotFoundException());

    return ddResult;
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
