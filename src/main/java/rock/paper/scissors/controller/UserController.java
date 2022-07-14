package rock.paper.scissors.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import rock.paper.scissors.data.UserRepository;
import rock.paper.scissors.data.entities.User2;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    // standard constructors

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public List<User2> getUsers() {
        return (List<User2>) userRepository.findAll();
    }

    @PostMapping("/users")
    void addUser(@RequestBody User2 user) {
        userRepository.save(user);
    }
}