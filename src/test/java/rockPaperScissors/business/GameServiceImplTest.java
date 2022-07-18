package rockPaperScissors.business;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import rock.paper.scissors.business.GameServiceImpl;
import rock.paper.scissors.business.domain.handShapes.HandShapeDto;
import rock.paper.scissors.business.domain.handShapes.PaperShapeDto;
import rock.paper.scissors.business.domain.handShapes.RockShapeDto;
import rock.paper.scissors.business.domain.handShapes.ScissorsShapeDto;
import rock.paper.scissors.data.DdRoundOutcomeRepository;
import rock.paper.scissors.data.HandShapeRepository;
import rock.paper.scissors.data.MatchRepository;
import rock.paper.scissors.data.RoundOutcomeRepository;
import rock.paper.scissors.data.entities.HandShape;
import rock.paper.scissors.utils.Constants;

@ExtendWith(MockitoExtension.class)
public class GameServiceImplTest {
    @Mock
    private HandShapeRepository handShapeRepository;
    @Mock
    private MatchRepository matchRepository;
    @Mock
    private RoundOutcomeRepository roundOutcomeRepository;
    @Mock
    private DdRoundOutcomeRepository ddFightRoundResultRepository;

    @InjectMocks
    private GameServiceImpl gameServiceImpl;

    // @Bean
    // public GameService gameService() {
    // return new GameServiceImpl(handShapeRepository, matchRepository,
    // roundOutcomeRepository,
    // ddFightRoundResultRepository);
    // }

    @BeforeEach
    void initUseCase() {
        // registerUseCase = new RegisterUseCase(userRepository);
    }

    @Test
    void getHandShapesShouldReturnMappedDtos() {
        final HandShape rock = new HandShape();
        rock.setId(Constants.HandShapes.ROCK);
        rock.setName("Rock");
        final HandShape paper = new HandShape();
        paper.setId(Constants.HandShapes.PAPER);
        paper.setName("Paper");
        final HandShape scissors = new HandShape();
        scissors.setId(Constants.HandShapes.SCISSORS);
        scissors.setName("Scissors");

        List<HandShape> entities = Arrays.asList(rock, paper, scissors);

        final HandShapeDto rockDto = new RockShapeDto(Constants.HandShapes.ROCK, "Rock");
        final HandShapeDto paperDto = new PaperShapeDto(Constants.HandShapes.PAPER, "Paper");
        final HandShapeDto scissorsDto = new ScissorsShapeDto(Constants.HandShapes.SCISSORS, "Scissors");

        List<HandShapeDto> expected = Arrays.asList(rockDto, paperDto, scissorsDto);
        Mockito.when(handShapeRepository.findAll()).thenReturn(entities);

        List<HandShapeDto> result = gameServiceImpl.getHandShapes();

        // assertThat(result).isEqualTo(expected);
        assertThat(result).isEqualTo(expected);
    }
}
