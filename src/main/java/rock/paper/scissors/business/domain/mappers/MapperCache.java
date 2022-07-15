package rock.paper.scissors.business.domain.mappers;

/**
 * Cache the mappers for ease of use
 */
public class MapperCache {
  public static final HandShapeMapper handShapeMapper = new HandShapeMapper();
  public static final FightRoundResultMapper fightRoundResultMapper = new FightRoundResultMapper();
  public static final MatchMapper matchMapper = new MatchMapper();

}
