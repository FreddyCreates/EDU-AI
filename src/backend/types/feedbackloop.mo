// Feedback loop types — formative assessment cycle: attempt → EDDI gap analysis → re-attempt
import Common "common";

module {
  public type LoopStatus = {
    #open;      // loop is active, student can submit attempts
    #mastered;  // mastery target reached, loop closed successfully
    #escalated; // student exhausted attempts without mastery — escalated to teacher
  };

  /// A single attempt within a feedback loop.
  public type AttemptRecord = {
    attemptNum       : Nat;
    score            : Nat;            // questions correct
    totalQuestions   : Nat;
    pctCorrect       : Nat;            // 0–100
    eddiGapAnalysis  : Text;           // EDDI reasoning chain output
    eddiCoachNote    : Text;           // actionable next step from EDDI
    timestamp        : Common.Timestamp;
  };

  /// A complete feedback loop for a student on a specific topic.
  public type FeedbackLoop = {
    id            : Text;
    studentId     : Common.UserId;
    topicId       : Text;
    status        : LoopStatus;
    attempts      : [AttemptRecord];   // ordered oldest → newest
    masteryTarget : Nat;               // pct threshold to close as #mastered (default 80)
    currentMastery : Nat;             // most recent pctCorrect; 0 until first attempt
    maxAttempts   : Nat;              // Fibonacci: default 5
    createdAt     : Common.Timestamp;
    closedAt      : ?Common.Timestamp;
  };
};
