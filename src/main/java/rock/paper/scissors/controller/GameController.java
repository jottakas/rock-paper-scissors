package rock.paper.scissors.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rock.paper.scissors.business.GameService;
import rock.paper.scissors.business.domain.FightRoundResultDto;
import rock.paper.scissors.business.domain.HandShapeDto;

@RestController
@RequestMapping("rock-paper-scissors")
@CrossOrigin(origins = "http://localhost:4200")

public class GameController {

    Logger log = LoggerFactory.getLogger(GameController.class);

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    /**
     * Retrieves the list of possible shapes to use in the game: rock, paper or
     * scissors
     *
     * @return valid shapes
     */
    @GetMapping("/hand-shapes")
    public List<HandShapeDto> getHandShapes() {
        return gameService.getHandShapes();
    }

    /**
     * Randomly determines the winner of a round
     *
     * @param shapeId shape sent by the user
     * @throws Exception
     */
    @PostMapping("/fight-round")
    public FightRoundResultDto fightRound(@RequestBody String shapeId) throws Exception {
        return gameService.fightRound(shapeId);
    }
}