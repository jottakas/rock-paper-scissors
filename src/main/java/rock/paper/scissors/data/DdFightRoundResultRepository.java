package rock.paper.scissors.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import rock.paper.scissors.data.entities.DdFightRoundResult;

@Repository
public interface DdFightRoundResultRepository  extends CrudRepository<DdFightRoundResult, String>{}
