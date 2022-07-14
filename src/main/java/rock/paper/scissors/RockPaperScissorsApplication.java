package rock.paper.scissors;

import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import rock.paper.scissors.data.HandShapeRepository;
import rock.paper.scissors.data.UserRepository;
import rock.paper.scissors.data.entities.HandShape;
import rock.paper.scissors.data.entities.User2;

@SpringBootApplication
public class RockPaperScissorsApplication {

	public static void main(String[] args) {
		SpringApplication.run(RockPaperScissorsApplication.class, args);
	}

	@Bean
    CommandLineRunner init(UserRepository userRepository, HandShapeRepository handShapeRepository) {
        return args -> {
            Stream.of("John", "Julie", "Jennifer", "Helen", "Rachel").forEach(name -> {
                User2 user = new User2(name, name.toLowerCase() + "@domain.com");
                userRepository.save(user);
            });
            userRepository.findAll().forEach(System.out::println);

            // Not sure why the schema.sql is not running
            HandShape rockShape = new HandShape();
            rockShape.setId("1");
            rockShape.setName("Rock");
            HandShape paperShape = new HandShape();
            paperShape.setId("2");
            paperShape.setName("Paper");
            HandShape scissorsShape = new HandShape();
            scissorsShape.setId("3");
            scissorsShape.setName("Scissors");

            handShapeRepository.save(rockShape);
            handShapeRepository.save(paperShape);
            handShapeRepository.save(scissorsShape);
        };
    }
}
