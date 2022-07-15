package rock.paper.scissors.data.entities;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Fight round result
 */
@Entity
public class FightRoundResult {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long id;
  /** User selection */
  @Column(nullable = false)
  private String userHandShapeId;
  /** CPU selection */
  @Column(nullable = false)
  private String cpuHandShapeId;

  /** Which round it's played */
  @Column(nullable = false)
  private int roundNumber;

  @Column(nullable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date date;

  @ManyToOne(optional = false)
  @JoinColumn(name = "id_match")
  private Match match;

  /** Result of the round: Victory 1 Loss 2 TIe 3 */
  @ManyToOne(optional = false)
  @JoinColumn(name = "id_dd_fight_round_result")
  private DdFightRoundResult ddFightRoundResult;

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getUserHandShapeId() {
    return userHandShapeId;
  }

  public void setUserHandShapeId(String userHandShapeId) {
    this.userHandShapeId = userHandShapeId;
  }

  public String getCpuHandShapeId() {
    return cpuHandShapeId;
  }

  public void setCpuHandShapeId(String cpuHandShapeId) {
    this.cpuHandShapeId = cpuHandShapeId;
  }

  public int getRoundNumber() {
    return roundNumber;
  }

  public void setRoundNumber(int roundNumber) {
    this.roundNumber = roundNumber;
  }

  public DdFightRoundResult getDdFightRoundResult() {
    return ddFightRoundResult;
  }

  public void setDdFightRoundResult(DdFightRoundResult ddFightRoundResult) {
    this.ddFightRoundResult = ddFightRoundResult;
  }

  public Match getMatch() {
    return match;
  }

  public void setMatch(Match match) {
    this.match = match;
  }

  public Date getDate() {
    return date;
  }

  public void setDate(Date date) {
    this.date = date;
  }
}
