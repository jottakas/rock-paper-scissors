package rock.paper.scissors.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import rock.paper.scissors.data.entities.DdRoundOutcome;

@Repository
public interface DdRoundOutcomeRepository  extends CrudRepository<DdRoundOutcome, String>{}
