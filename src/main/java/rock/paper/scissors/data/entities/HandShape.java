package rock.paper.scissors.data.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Possible hand shape dictionary: Rock, Paper or Scissors
 */
@Entity
public class HandShape {
  @Id
  private String id;
  private String name;

  public HandShape() {
  }

  public HandShape(String id, String name) {
    this.id = id;
    this.name = name;
  }

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

}
