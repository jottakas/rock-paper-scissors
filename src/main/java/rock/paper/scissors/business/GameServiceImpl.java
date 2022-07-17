package rock.paper.scissors.business;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.springframework.stereotype.Service;

import rock.paper.scissors.business.api.GameService;
import rock.paper.scissors.business.domain.RoundOutcomeDto;
import rock.paper.scissors.business.domain.RoundOutcomeDtoBuilder;
import rock.paper.scissors.business.domain.handShapes.HandShapeDto;
import rock.paper.scissors.business.domain.mappers.MapperCache;
import rock.paper.scissors.data.DdRoundOutcomeRepository;
import rock.paper.scissors.data.RoundOutcomeRepository;
import rock.paper.scissors.data.HandShapeRepository;
import rock.paper.scissors.data.MatchRepository;
import rock.paper.scissors.data.entities.DdRoundOutcome;
import rock.paper.scissors.data.entities.RoundOutcome;
import rock.paper.scissors.data.entities.HandShape;
import rock.paper.scissors.data.entities.Match;
import rock.paper.scissors.utils.Constants;
import rock.paper.scissors.utils.Utils;

@Service
public class GameServiceImpl implements GameService {

  private final HandShapeRepository handShapeRepository;
  private final MatchRepository matchRepository;
  private final RoundOutcomeRepository roundOutcomeRepository;
  private final DdRoundOutcomeRepository ddFightRoundResultRepository;

  public GameServiceImpl(HandShapeRepository handShapeRepository, MatchRepository matchRepository,
      RoundOutcomeRepository roundOutcomeRepository,
      DdRoundOutcomeRepository ddFightRoundResultRepository) {
    this.handShapeRepository = handShapeRepository;
    this.matchRepository = matchRepository;
    this.roundOutcomeRepository = roundOutcomeRepository;
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
  public RoundOutcomeDto fightRound(long matchId, String userShapeId) throws Exception {
    int cpuShapeId = Utils.getRandom(1, 3);

    HandShape cpuHandShape = handShapeRepository
        .findById(String.valueOf(cpuShapeId))
        .orElseThrow(() -> new EntityNotFoundException(userShapeId));

    HandShapeDto cpuDto = MapperCache.handShapeMapper.mapFrom(cpuHandShape);
    RoundOutcomeDto result = buildRoundOutcome(userShapeId, cpuDto.getId());

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
  private RoundOutcomeDto buildRoundOutcome(String userShapeId, String cpuShapeId) {
    boolean isTie = userShapeId.equals(cpuShapeId);

    // Assume it's a loss
    RoundOutcomeDtoBuilder roundOutcomeBuilder = new RoundOutcomeDtoBuilder(userShapeId, cpuShapeId)
        .withUserLoss();

    if (isTie) {
      roundOutcomeBuilder.withTie();
    } else if (isUserVictory(userShapeId, cpuShapeId)) {
      roundOutcomeBuilder.withUserVictory();
    }

    return roundOutcomeBuilder.build();
  }

  /**
   * Saves the fight result for metric purpouses
   */
  private void saveMetric(long matchId, String userHandShapeId, String cpuHandShapeId,
      RoundOutcomeDto fightResultDto) {

    RoundOutcome roundOutcome = new RoundOutcome();
    roundOutcome.setUserHandShapeId(userHandShapeId);
    roundOutcome.setCpuHandShapeId(cpuHandShapeId);
    roundOutcome.setDate(new Date());

    Match match = matchRepository.findById(matchId).orElseThrow();
    roundOutcome.setMatch(match);

    // Increment the roound number by one
    int roundNumber = match.getFightRoundResult().size() + 1;
    roundOutcome.setRoundNumber(roundNumber);

    DdRoundOutcome ddRoundOutcome = resolveDdFightRoundResult(fightResultDto);
    roundOutcome.setDdRoundOutcome(ddRoundOutcome);

    roundOutcomeRepository.save(roundOutcome);
  }

  /** Retrieves the corresponding fight result entity based on the result DTO */
  private DdRoundOutcome resolveDdFightRoundResult(RoundOutcomeDto fightResultDto) {
    String ddResultId = Constants.Outcome.TIE;
    if (!fightResultDto.isTie()) {
      ddResultId = fightResultDto.isUserVictory() ? Constants.Outcome.VICTORY
          : Constants.Outcome.LOSS;
    }
    DdRoundOutcome ddResult = ddFightRoundResultRepository.findById(ddResultId)
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
