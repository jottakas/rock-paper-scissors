package rock.paper.scissors.data.entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 * Dictionary to represent the three result states: win 1 lose 2 tie 3
 */
@Entity
public class DdFightRoundResult {
  @Id
  private String id;
  private String name;

  @OneToMany(mappedBy = "ddFightRoundResult")
  private Set<FightRoundResult> fightRoundResult;

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

  public Set<FightRoundResult> getFightRoundResult() {
    return fightRoundResult;
  }

  public void setFightRoundResult(Set<FightRoundResult> fightRoundResult) {
    this.fightRoundResult = fightRoundResult;
  }
}
