package rock.paper.scissors.business;

import java.util.List;

import org.springframework.stereotype.Service;

import rock.paper.scissors.business.domain.MatchDto;
import rock.paper.scissors.business.domain.mappers.MapperCache;
import rock.paper.scissors.data.MatchRepository;
import rock.paper.scissors.data.entities.Match;

@Service
public class MetricsService {

  private final MatchRepository matchRepository;

  public MetricsService(MatchRepository matchRepository) {
    this.matchRepository = matchRepository;
  }

  /**
   * Retrieves the list of possible shapes to use in the game: rock, paper or
   * scissors
   *
   * @return valid shapes
   */
  public List<MatchDto> getMatches() {
    List<Match> entities = (List<Match>) matchRepository.findAll();
    return MapperCache.matchMapper.mapListFrom(entities);
  }
}
