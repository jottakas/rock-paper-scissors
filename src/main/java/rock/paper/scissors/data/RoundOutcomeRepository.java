package rock.paper.scissors.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import rock.paper.scissors.data.entities.RoundOutcome;

@Repository
public interface RoundOutcomeRepository  extends CrudRepository<RoundOutcome, Long>{}
