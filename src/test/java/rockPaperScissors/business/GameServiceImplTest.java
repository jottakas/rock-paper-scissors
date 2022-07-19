package rockPaperScissors.business;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Answers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import rock.paper.scissors.business.GameServiceImpl;
import rock.paper.scissors.business.domain.RoundOutcomeDto;
import rock.paper.scissors.business.domain.handShapes.HandShapeDto;
import rock.paper.scissors.business.domain.handShapes.PaperShapeDto;
import rock.paper.scissors.business.domain.handShapes.RockShapeDto;
import rock.paper.scissors.business.domain.handShapes.ScissorsShapeDto;
import rock.paper.scissors.data.DdRoundOutcomeRepository;
import rock.paper.scissors.data.HandShapeRepository;
import rock.paper.scissors.data.MatchRepository;
import rock.paper.scissors.data.RoundOutcomeRepository;
import rock.paper.scissors.data.entities.DdOutcome;
import rock.paper.scissors.data.entities.HandShape;
import rock.paper.scissors.data.entities.Match;
import rock.paper.scissors.data.entities.RoundOutcome;
import rock.paper.scissors.utils.Constants;
import rock.paper.scissors.utils.Utils;

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

    @Mock
    private Match mockMatch;

    @Mock
    private RoundOutcome mockRoundOutcome;

    @Mock
    private DdOutcome mockDdOutcome;

    // @Bean
    // public GameService gameService() {
    // return new GameServiceImpl(handShapeRepository, matchRepository,
    // roundOutcomeRepository,
    // ddFightRoundResultRepository);
    // }

    @BeforeEach
    void setup() {
    }

    private List<HandShape> createHandShapeEntities() {
        final HandShape rock = createHandShapeEntity(Constants.HandShapes.ROCK);
        final HandShape paper = createHandShapeEntity(Constants.HandShapes.PAPER);
        final HandShape scissors = createHandShapeEntity(Constants.HandShapes.SCISSORS);

        return Arrays.asList(rock, paper, scissors);
    }

    private HandShape createHandShapeEntity(String handShapId) {
        Map<String, String> idToName = Map.of(
                Constants.HandShapes.ROCK, "Rock",
                Constants.HandShapes.PAPER, "Paper",
                Constants.HandShapes.SCISSORS, "Scissors");

        return new HandShape(handShapId, idToName.get(handShapId));
    }

    @Test
    void Retrieve_Hand_Shapes() {
        // Arrange
        List<HandShape> entities = createHandShapeEntities();

        final HandShapeDto rockDto = new RockShapeDto(Constants.HandShapes.ROCK, "Rock");
        final HandShapeDto paperDto = new PaperShapeDto(Constants.HandShapes.PAPER, "Paper");
        final HandShapeDto scissorsDto = new ScissorsShapeDto(Constants.HandShapes.SCISSORS, "Scissors");

        List<HandShapeDto> expected = Arrays.asList(rockDto, paperDto, scissorsDto);
        Mockito.when(handShapeRepository.findAll()).thenReturn(entities);

        // Act
        List<HandShapeDto> result = gameServiceImpl.getHandShapes();

        // Assert
        assertThat(result).isEqualTo(expected);
    }

    @Test
    void Rock_Vs_Rock_Is_Tie() throws Exception {
        final long mockMatchId = 1L;
        final String mockUserShapeId = Constants.HandShapes.ROCK;
        final String mockCpuShapeId = Constants.HandShapes.ROCK;

        try (MockedStatic<Utils> utils = Mockito.mockStatic(Utils.class)) {
            utils.when(() -> Utils.getRandom(anyInt(), anyInt()))
                    .thenReturn(Integer.valueOf(mockCpuShapeId));
        }

        Mockito.when(ddFightRoundResultRepository.findById(Constants.Outcome.TIE))
                .thenReturn(Optional.of(mockDdOutcome));

        Mockito.when(handShapeRepository.findById(anyString()))
                .thenReturn(Optional.of(createHandShapeEntity(mockCpuShapeId)));

        Mockito.when(mockMatch.getFightRoundResult())
                .thenReturn(new HashSet<RoundOutcome>(Arrays.asList(mockRoundOutcome)));
        Mockito.when(matchRepository.findById(anyLong()))
                .thenReturn(Optional.of(mockMatch));

        RoundOutcomeDto result = gameServiceImpl.fightRound(mockMatchId, mockUserShapeId);

        assertThat(result.getResultDto().getId()).isEqualTo(Constants.Outcome.TIE);
    }
}
