// TUTL — Tutoring Session Engine types
module {
  public type TutorType = {
    #teacher;
    #peer; // peer identity anonymized in records
  };

  public type TutoringSession = {
    id : Nat;
    studentPrincipal : Principal;
    tutorType : TutorType;
    tutorRef : Text; // teacher principal text OR anonymized peer token
    subjectId : Nat;
    gradeLevel : Nat;
    startedAt : Int;
    durationMinutes : Nat;
    masteryDeltaBefore : Nat;
    masteryDeltaAfter : Nat;
    transcriptHash : ?Blob; // hash of session transcript, not the transcript itself
    sealed : Bool;
  };

  public type TutlStats = {
    totalSessions : Nat;
    avgDurationMinutes : Nat;
    avgMasteryGain : Nat; // Fibonacci-floored
    teacherSessionCount : Nat;
    peerSessionCount : Nat;
  };
}
