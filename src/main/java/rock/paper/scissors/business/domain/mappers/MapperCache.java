package rock.paper.scissors.business.domain.mappers;

/**
 * Cache the mappers for ease of use
 */
public class MapperCache {
  public static final HandShapeMapper handShapeMapper = new HandShapeMapper();
  public static final RoundOutcomeMapper fightRoundResultMapper = new RoundOutcomeMapper();
  public static final MatchMapper matchMapper = new MatchMapper();

}
