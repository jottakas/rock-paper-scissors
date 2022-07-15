package rock.paper.scissors.business.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

public class FightRoundResultDto {
  /** Shape chosen by the user */
  private String userShapeId;
  /** Shape chosen by the computer */
  private String cpuShapeId;
  /** True if the user wins. False on loss or tie */
  @JsonProperty("isUserVictory")
  private boolean isUserVictory;
  /** True on tie. False otherwise */
  @JsonProperty("isTie")
  private boolean isTie;

  /** Which round it is */
  private int roundNumber;

  /** When was the round played */
  private Date date;

  /** Represents the state: Victory 1 Loss 2 Tie 3 */
  private BaseDto resultDto;

  public String getUserShapeId() {
    return userShapeId;
  }

  public void setUserShapeId(String userShapeId) {
    this.userShapeId = userShapeId;
  }

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

  public int getRoundNumber() {
    return roundNumber;
  }

  public void setRoundNumber(int roundNumber) {
    this.roundNumber = roundNumber;
  }

  public BaseDto getResultDto() {
    return resultDto;
  }

  public void setResultDto(BaseDto resultDto) {
    this.resultDto = resultDto;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }
}
