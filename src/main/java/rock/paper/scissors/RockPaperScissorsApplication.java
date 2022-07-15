package rock.paper.scissors;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import rock.paper.scissors.data.HandShapeRepository;
import rock.paper.scissors.data.entities.HandShape;

@SpringBootApplication
public class RockPaperScissorsApplication {

	public static void main(String[] args) {
		SpringApplication.run(RockPaperScissorsApplication.class, args);
	}

	@Bean
    CommandLineRunner init(HandShapeRepository handShapeRepository) {
        return args -> {
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
