package rock.paper.scissors.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rock.paper.scissors.business.api.GameService;
import rock.paper.scissors.business.domain.RoundOutcomeDto;
import rock.paper.scissors.business.domain.handShapes.HandShapeDto;

@RestController
@RequestMapping("rock-paper-scissors")
@CrossOrigin(origins = "http://localhost:4200")

public class GameController {

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
     * Creates a match and returns its id
     *
     * @return created match id
     * @throws Exception
     */
    @PostMapping("/create-match")
    public long createMatch() throws Exception {
        return gameService.createMatch();
    }

    /**
     * Randomly determines the winner of a round
     *
     * @param shapeId shape sent by the user
     * @throws Exception
     */
    @PostMapping("/{matchId}/fight-round")
    public RoundOutcomeDto fightRound(@PathVariable() long matchId, @RequestBody String shapeId)
            throws Exception {
        return gameService.fightRound(matchId, shapeId);
    }
}