package rock.paper.scissors.business.api;

import java.util.List;

import org.springframework.stereotype.Service;

import rock.paper.scissors.business.domain.MatchDto;

@Service
public interface MetricsService {

  /**
   * Retrieves the list of possible shapes to use in the game: rock, paper or
   * scissors
   *
   * @return valid shapes
   */
  public List<MatchDto> getMatches();
}
