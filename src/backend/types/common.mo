// Cross-cutting types shared across all domains
import Time "mo:core/Time";

module {
  public type UserId = Principal;
  public type Timestamp = Int; // nanoseconds from Time.now()
  public type GradeLevel = Text; // "K", "1".."12"

  public type GradeCount = {
    grade              : Nat;
    studentCount       : Nat;
    activeSessionCount : Nat;
    avgMastery         : Float;
  };

  public type SystemMetrics = {
    totalStudents         : Nat;
    activeSessions        : Nat;
    totalLessonsCompleted : Nat;
    avgPlatformMastery    : Float;
  };

  // Live platform telemetry — Fibonacci-cycle stamped
  public type LiveMetrics = {
    activeStudents       : Nat;
    activeSessions       : Nat;
    totalQueriesThisHour : Nat;
    avgCoherenceScore    : Nat;   // Fibonacci-floored 0-100
    topSubject           : Text;
    timestamp            : Int;   // nanoseconds (Time.now())
    fibonacciCycleCount  : Nat;   // heartbeat cycle index
  };

  // Live session metrics for Principal portal
  public type LiveSessionMetrics = {
    totalActiveSessions : Nat;
    studentsOnline      : Nat;
    topSubjects         : [Text];   // top 3 subjects by activity
    systemCoherence     : Nat;      // Fibonacci-floored 0-100
    timestamp           : Int;
  };

  // Per-class heatmap entry for Principal heatmap
  public type ClassHeatmapData = {
    classId        : Text;
    grade          : Nat;
    subject        : Text;
    activeStudents : Nat;
    avgMastery     : Nat;  // Fibonacci-floored
    sessionCount   : Nat;
    lastActive     : Int;
  };

  // Grade drill-down for Principal view
  public type GradeDrilldown = {
    grade               : Nat;
    totalStudents       : Nat;
    subjectBreakdown    : [(Text, Nat)];   // (subject, avgMastery fibFloored)
    masteryDistribution : [(Text, Nat)];   // (bucket, count) e.g. ("0-34", 5)
    strugglingStudents  : [Text];          // student IDs below mastery floor
    fibCycleStamp       : Nat;
  };
};
