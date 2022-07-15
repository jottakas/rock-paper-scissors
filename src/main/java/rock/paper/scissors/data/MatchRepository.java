package rock.paper.scissors.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import rock.paper.scissors.data.entities.Match;

@Repository
public interface MatchRepository  extends CrudRepository<Match, Long>{}
