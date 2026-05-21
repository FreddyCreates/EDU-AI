module {
  public type EntanglementDirection = { #bidirectional; #unidirectional };
  public type EntanglementStatus = { #active; #dormant };

  public type EntanglementRecord = {
    id : Text;                   // 4-letter lock name
    name : Text;                 // full name
    sourceSubstrate : Text;      // e.g. "ICPM", "JLIA", "EART", "EMRT", "FRONTEND"
    targetSubstrate : Text;      // e.g. "FRONTEND", "ICPM", "EMRT"
    direction : EntanglementDirection;
    transitCount : Nat;          // Fibonacci-floored on each increment
    lastEntanglement : Int;      // nanosecond timestamp
    coherenceDelta : Int;        // Fibonacci-floored before storing
    status : EntanglementStatus;
  };

  public type NrveState = {
    cogtPhase : Text;            // "expand" | "critique" | "synthesize"
    phiRatio : Nat;              // 618 for expand, 382 for critique (Fibonacci-floored)
    coherenceScore : Nat;        // Fibonacci-floored 0-1000
    activeEngine : Text;         // e.g. "SYNTHOS", "VEKTOR"
    cycleCount : Nat;            // how many COGT cycles have run
  };

  public type PlseSeed = { concept : Text; timestamp : Int };
  public type PlseNudge = { prompt : Text; ttl : Nat };

  public type PlseState = {
    lastAutonSeed : PlseSeed;
    curiosityQueue : [PlseNudge]; // up to F(5)=5 nudges
    heartbeatCycle : Nat;         // current EART heartbeat cycle count
    phiHeartbeatInterval : Nat;   // F(8)=21
  };

  public type MsryState = {
    zone : Text;                 // "hot" | "warm" | "cold" | "frozen" | "vault"
    lastZoneTransition : Int;
    fibonacciFloorLevel : Nat;   // which F(k) boundary was crossed (e.g. 5, 13, 55)
    masteryCompound : Nat;       // Fibonacci-compounded mastery score
    seedCount : Nat;
  };

  public type EchoEventType = { #answer; #pause; #click; #scroll };

  public type EchoResult = {
    coherenceDelta : Int;        // Fibonacci-floored
    newCoherence : Nat;          // updated coherence score
    passportUpdated : Bool;
  };

  public type FluxState = {
    difficultyLevel : Nat;       // Fibonacci: 1|2|3|5|8|13|21|34|55
    masteryFloor : Nat;          // current F(k) floor value
    phiConfidence : Nat;         // 0-1000 Fibonacci-floored
    nextFloorThreshold : Nat;    // next F(k+1) to reach
    phiRatio : Nat;              // 618 = PHI_INV * 1000
  };
};
