package rockPaperScissors.business;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.params.provider.Arguments.arguments;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.Answers;
import org.mockito.ArgumentMatchers;
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

    @Mock(answer = Answers.RETURNS_DEEP_STUBS)
    private Match mockMatch;

    @Mock
    private RoundOutcome mockRoundOutcome;

    @Mock
    private DdOutcome mockDdOutcome;

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

    @Nested
    class Fight_Rounds {

        private static Stream<Arguments> fightRoundParams() {
            return Stream.of(
                    arguments(Constants.HandShapes.ROCK, Constants.HandShapes.SCISSORS, Constants.Outcome.VICTORY),
                    arguments(Constants.HandShapes.ROCK, Constants.HandShapes.PAPER, Constants.Outcome.LOSS),
                    arguments(Constants.HandShapes.ROCK, Constants.HandShapes.ROCK, Constants.Outcome.TIE),

                    arguments(Constants.HandShapes.PAPER, Constants.HandShapes.ROCK, Constants.Outcome.VICTORY),
                    arguments(Constants.HandShapes.PAPER, Constants.HandShapes.SCISSORS, Constants.Outcome.LOSS),
                    arguments(Constants.HandShapes.PAPER, Constants.HandShapes.PAPER, Constants.Outcome.TIE),

                    arguments(Constants.HandShapes.SCISSORS, Constants.HandShapes.PAPER, Constants.Outcome.VICTORY),
                    arguments(Constants.HandShapes.SCISSORS, Constants.HandShapes.ROCK, Constants.Outcome.LOSS),
                    arguments(Constants.HandShapes.SCISSORS, Constants.HandShapes.SCISSORS, Constants.Outcome.TIE));
        }

        private void setupMocks(String userShapeId, String cpuShapeId, String ddOutcomeId) {
            try (MockedStatic<Utils> utils = Mockito.mockStatic(Utils.class)) {
                utils.when(() -> Utils.getRandom(anyInt(), anyInt()))
                        .thenReturn(Integer.valueOf(cpuShapeId));
            }

            Mockito.when(mockMatch.getFightRoundResult().size())
                    .thenReturn(1);

            // Mock Repositories
            Mockito.when(ddFightRoundResultRepository.findById(anyString()))
                    .thenReturn(Optional.of(mockDdOutcome));
            Mockito.when(handShapeRepository.findById(anyString()))
                    .thenReturn(Optional.of(createHandShapeEntity(cpuShapeId)));
            Mockito.when(matchRepository.findById(anyLong()))
                    .thenReturn(Optional.of(mockMatch));
        }

        @ParameterizedTest
        @MethodSource("fightRoundParams")
        void Fight_Rounds_Check_Outcomes(String userShapeId, String cpuShapeId, String ddOutcomeId) throws Exception {
            final long mockMatchId = 1L;
            setupMocks(userShapeId, cpuShapeId, ddOutcomeId);

            // Act
            RoundOutcomeDto result = gameServiceImpl.fightRound(mockMatchId, userShapeId);

            // Assert
            assertThat(result.getResultDto().getId()).isEqualTo(ddOutcomeId);
        }

        @Test
        void Fight_Rounds_Saves_the_Metrics() throws Exception {
            final String userShapeId = Constants.HandShapes.ROCK;
            final String cpuShapeId = Constants.HandShapes.PAPER;
            final String ddOutcomeId = Constants.Outcome.LOSS;

            final long mockMatchId = 1L;
            setupMocks(userShapeId, cpuShapeId, ddOutcomeId);

            // Act
            gameServiceImpl.fightRound(mockMatchId, userShapeId);

            // Assert
            RoundOutcome expected = new RoundOutcome();
            expected.setUserHandShapeId(userShapeId);
            expected.setCpuHandShapeId(cpuShapeId);

            expected.setDdOutcome(mockDdOutcome);
            expected.setMatch(mockMatch);

            // Current round number is 1. After the fight, the new round is two
            expected.setRoundNumber(2);

            verify(roundOutcomeRepository, times(1))
                    .save(ArgumentMatchers.refEq(expected, "id", "date"));
        }
    }
}
