package rock.paper.scissors.data.entities;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 * A match contains multiple rounds
 */
@Entity
public class Match {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;

  @OneToMany(mappedBy = "match")
  private Set<FightRoundResult> fightRoundResult;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public Set<FightRoundResult> getFightRoundResult() {
    return fightRoundResult;
  }

  public void setFightRoundResult(Set<FightRoundResult> fightRoundResult) {
    this.fightRoundResult = fightRoundResult;
  }
}
