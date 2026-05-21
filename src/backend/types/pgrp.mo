// PGRP — Peer Study Group Engine types
module {
  public type StudyGroup = {
    id : Nat;
    subjectId : Nat;
    gradeLevel : Nat;
    memberPrincipals : [Principal];
    sssRangeLow : Nat;   // Fibonacci-floored SSS range for group formation
    sssRangeHigh : Nat;
    createdAt : Int;
    active : Bool;
  };

  public type GroupSession = {
    id : Nat;
    groupId : Nat;
    startedAt : Int;
    durationMinutes : Nat;
    participantCount : Nat;
    sharedMasteryDelta : Nat; // Fibonacci-floored avg delta
  };

  public type PgrpStats = {
    totalGroups : Nat;
    totalSessions : Nat;
    avgGroupSize : Nat;
    avgMasteryGain : Nat;
  };
}
