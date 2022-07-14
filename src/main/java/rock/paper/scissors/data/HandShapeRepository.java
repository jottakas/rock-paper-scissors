package rock.paper.scissors.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import rock.paper.scissors.data.entities.HandShape;

@Repository
public interface HandShapeRepository extends CrudRepository<HandShape, String>{}
