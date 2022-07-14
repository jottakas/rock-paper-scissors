package rock.paper.scissors.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import rock.paper.scissors.data.entities.User2;

@Repository
public interface UserRepository extends CrudRepository<User2, Long>{}
