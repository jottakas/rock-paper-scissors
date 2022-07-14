package rock.paper.scissors.business;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import rock.paper.scissors.business.domain.HandShapeDto;
import rock.paper.scissors.business.domain.RockShapeDto;

@Service
public class GameService {

  public List<HandShapeDto> getHandShapes() {
    HandShapeDto dto = new RockShapeDto();
    dto.setId("1");
    dto.setName("Rock");

    return Arrays.asList(dto);
  }
}
