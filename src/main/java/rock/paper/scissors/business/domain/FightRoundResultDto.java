package rock.paper.scissors.business.domain;

public class FightRoundResultDto {
  /** Shape chosen by the computer */
  private String cpuShapeId;
  /** True if the user wins. False on loss or tie */
  private boolean isUserVictory;
  /** True on tie. False otherwise */
  private boolean isTie;

  public String getCpuShapeId() {
    return cpuShapeId;
  }

  public void setCpuShapeId(String cpuShapeId) {
    this.cpuShapeId = cpuShapeId;
  }

  public boolean isUserVictory() {
    return isUserVictory;
  }

  public void setUserVictory(boolean isUserVictory) {
    this.isUserVictory = isUserVictory;
  }

  public boolean isTie() {
    return isTie;
  }

  public void setTie(boolean isTie) {
    this.isTie = isTie;
  }

}
