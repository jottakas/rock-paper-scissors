package rock.paper.scissors;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import rock.paper.scissors.data.DdFightRoundResultRepository;
import rock.paper.scissors.data.HandShapeRepository;
import rock.paper.scissors.data.entities.DdFightRoundResult;
import rock.paper.scissors.data.entities.HandShape;

@SpringBootApplication
public class RockPaperScissorsApplication {

    public static void main(String[] args) {
        SpringApplication.run(RockPaperScissorsApplication.class, args);
    }

    @Bean
    CommandLineRunner init(HandShapeRepository handShapeRepository,
            DdFightRoundResultRepository ddFightRoundResultRepository) {
        return args -> {
            // Not sure why the schema.sql is not running
            createHandShapes(handShapeRepository);
            createDdFightRoundResults(ddFightRoundResultRepository);
        };
    }

    private void createHandShapes(HandShapeRepository repository) {
        HandShape rockShape = new HandShape();
        rockShape.setId("1");
        rockShape.setName("Rock");
        HandShape paperShape = new HandShape();
        paperShape.setId("2");
        paperShape.setName("Paper");
        HandShape scissorsShape = new HandShape();
        scissorsShape.setId("3");
        scissorsShape.setName("Scissors");

        repository.save(rockShape);
        repository.save(paperShape);
        repository.save(scissorsShape);
    }

    private void createDdFightRoundResults(DdFightRoundResultRepository repository) {
        DdFightRoundResult victory = new DdFightRoundResult();
        victory.setId("1");
        victory.setName("Victory");
        DdFightRoundResult loss = new DdFightRoundResult();
        loss.setId("2");
        loss.setName("Loss");
        DdFightRoundResult tie = new DdFightRoundResult();
        tie.setId("3");
        tie.setName("Tie");
        repository.save(victory);
        repository.save(loss);
        repository.save(tie);
    }
}
