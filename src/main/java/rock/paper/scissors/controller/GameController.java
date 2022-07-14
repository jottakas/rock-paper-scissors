package rock.paper.scissors.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rock.paper.scissors.business.GameService;
import rock.paper.scissors.business.domain.HandShapeDto;

@RestController
@RequestMapping("rock-paper-scissors")
@CrossOrigin(origins = "http://localhost:4200")
public class GameController {

    // standard constructors

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/hand-shapes")
    public List<HandShapeDto> getHandShapes() {
        return gameService.getHandShapes();
    }

    // @PostMapping("/users")
    // void addUser(@RequestBody User2 user) {
    //     userRepository.save(user);
    // }
}