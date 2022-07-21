package rock.paper.scissors.data.entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 * Dictionary to represent the three result states: win 1 lose 2 tie 3
 */
@Entity
public class DdOutcome {
  @Id
  private String id;
  private String name;

  public DdOutcome() {
  }

  public DdOutcome(String id, String name) {
    this.id = id;
    this.name = name;
  }

  @OneToMany(mappedBy = "ddOutcome")
  private Set<RoundOutcome> roundOutcomes;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Set<RoundOutcome> getRoundOutcomes() {
    return roundOutcomes;
  }

  public void setRoundOutcomes(Set<RoundOutcome> roundOutcomes) {
    this.roundOutcomes = roundOutcomes;
  }

}
