package rock.paper.scissors.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import rock.paper.scissors.business.MetricsService;
import rock.paper.scissors.business.domain.MatchDto;

@RestController
@RequestMapping("metrics")
@CrossOrigin(origins = "http://localhost:4200")

public class MetricsController {

    private final MetricsService metricsService;

    public MetricsController(MetricsService metricsService) {
        this.metricsService = metricsService;
    }

    /**
     * Retrieves the list of possible shapes to use in the game: rock, paper or
     * scissors
     *
     * @return valid shapes
     */
    @GetMapping("/matches")
    public List<MatchDto> getMatches() {
        return metricsService.getMatches();
    }
}