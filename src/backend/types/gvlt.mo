module {
  // ── GVLT: Grade Vault Types ───────────────────────────────────────────────

  public type GradeGate = {
    studentGrade   : Nat;
    requestedGrade : Nat;
    allowed        : Bool;
    reason         : Text;
  };

  public type GradeVaultEntry = {
    contentId       : Text;
    contentType     : Text;
    gradeLevel      : Nat;
    subject         : Text;
    lockedUntilGrade : Nat;
  };

  public type GvltStats = {
    totalEntries : Nat;
    totalBlocked : Nat;
    totalAllowed : Nat;
  };
  // Per-grade, per-subject performance aggregation
  public type GradePerformance = {
    gradeLevel      : Nat;
    subject         : Text;
    avgMastery      : Nat;             // Fibonacci-floored 0-100
    studentsAtLevel : Nat;
    topicBreakdown  : [(Text, Nat)];   // (topic, avg mastery fibFloor'd)
    weeklyTrend     : [Nat];           // last N weekly averages, Fibonacci-floored
    lastUpdated     : Int;             // nanoseconds (Time.now())
  };

  public type WeekProgress = {
    week             : Nat;
    completedLessons : Nat;
    avgScore         : Float;
  };

  public type GradeVaultSummary = {
    grade             : Nat;
    totalStudents     : Nat;
    avgMastery        : Float;
    topSubject        : Text;
    strugglingSubject : Text;
    weeklyProgress    : [WeekProgress];
  };
};
