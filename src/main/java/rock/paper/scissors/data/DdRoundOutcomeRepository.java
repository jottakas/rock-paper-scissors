package rock.paper.scissors.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import rock.paper.scissors.data.entities.DdOutcome;

@Repository
public interface DdRoundOutcomeRepository  extends CrudRepository<DdOutcome, String>{}
