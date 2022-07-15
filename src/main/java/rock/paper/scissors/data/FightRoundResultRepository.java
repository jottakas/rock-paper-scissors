package rock.paper.scissors.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import rock.paper.scissors.data.entities.FightRoundResult;

@Repository
public interface FightRoundResultRepository  extends CrudRepository<FightRoundResult, Long>{}
