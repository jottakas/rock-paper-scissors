package rock.paper.scissors.business.api;

import java.util.List;

import rock.paper.scissors.business.domain.FightRoundResultDto;
import rock.paper.scissors.business.domain.handShapes.HandShapeDto;

public interface GameService {
  /**
   * Retrieves the list of possible shapes to use in the game: rock, paper or
   * scissors
   *
   * @return valid shapes
   */
  public List<HandShapeDto> getHandShapes();

  /**
   * Creates a match to link rounds
   *
   * @return created match id
   */
  public long createMatch();

  /**
   * Sends the user choice to check randomly if it wins.
   * Should also store the results in the database
   *
   * @param userShapeId user choice
   * @return win, loss or tie depending on randomness
   * @throws Exception when the random cpu shape id is unexpected
   */
  public FightRoundResultDto fightRound(long matchId, String userShapeId) throws Exception;
}
