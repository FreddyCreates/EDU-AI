// TPRP — Test Prep Engine types
module {
  public type TestPrepMode = {
    #STAAR;
    #SAT;
    #ACT;
    #PSAT;
    #AP : Text; // AP subject name
  };

  public type TestPrepSession = {
    id : Nat;
    studentPrincipal : Principal;
    mode : TestPrepMode;
    subjectId : Nat;
    startedAt : Int;
    completedAt : ?Int;
    questionsAttempted : Nat;
    correctCount : Nat;
    masteryDelta : Int; // can be negative
    strategyNotes : [Text];
  };

  public type ScoreProjection = {
    studentPrincipal : Principal;
    mode : TestPrepMode;
    projectedScore : Nat; // Fibonacci-floored
    confidenceLevel : Nat; // Fibonacci-floored 1-89
    computedAt : Int;
    sessionsUsed : Nat;
  };

  public type TprpStats = {
    totalSessions : Nat;
    byMode : [(Text, Nat)];
    avgMasteryDelta : Int;
  };
}
