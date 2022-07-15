package rock.paper.scissors.business.domain;

/**
 * Generic Data Transfer Object with id and name
 */
public class BaseDto {
  private String id;
  private String name;

  public BaseDto(String id) {
    this.id = id;
  }

  public BaseDto(String id, String name) {
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
