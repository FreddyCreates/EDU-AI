// Self-study track and milestone types for UIL/CTE/Custom programs
module {
  /// A single milestone in a self-study prep track,
  /// spaced by Fibonacci-indexed weeks before the competition date.
  public type SelfStudyMilestone = {
    weeksBefore  : Nat;    // Fibonacci-indexed distance from competition date
    title        : Text;
    description  : Text;
    domain       : Text;   // e.g. "Blueprint Reading", "GMAW Welding", "Safety Certification"
    isComplete   : Bool;
    completedAt  : ?Int;   // nanosecond timestamp
    masteryScore : Nat;    // 0-100
  };

  /// A sovereign self-study track created by a student for UIL or custom programs.
  public type SelfStudyTrack = {
    id              : Text;   // deterministic from caller + title
    title           : Text;   // e.g. "Skills USA Construction"
    category        : Text;   // UIL_CTE | UIL_ACADEMIC | UIL_MUSIC | UIL_ATHLETICS | CUSTOM
    competitionDate : Int;    // Unix nanosecond timestamp of competition day
    createdAt       : Int;
    milestones      : [SelfStudyMilestone];
    masteryPct      : Nat;    // 0-100 aggregate
    isActive        : Bool;
    passportSealed  : Bool;
  };
};
