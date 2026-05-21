// MHCK — Mental Health Check-In types (anonymous, ephemeral)
module {
  // NOTE: No persistent link to student identity — only anonymized aggregates stored
  public type MentalHealthCheckIn = {
    sessionToken : Blob;  // anonymized, not linked to Principal
    schoolId : Nat;
    gradeLevel : Nat;     // bucketed: elementary/middle/high only
    moodScore : Nat;      // Fibonacci-indexed 1-13
    anonymousNote : ?Text; // optional, max 280 chars, never stored with identity
    recordedAt : Int;
  };

  public type MoodAggregate = {
    schoolId : Nat;
    periodStart : Int;
    periodEnd : Int;
    avgMoodScore : Nat; // Fibonacci-floored
    checkInCount : Nat;
    lowMoodCount : Nat; // moodScore <= 3
    highMoodCount : Nat; // moodScore >= 8
  };

  public type MhckStats = {
    totalCheckIns : Nat;
    schoolAggregates : [MoodAggregate];
    systemAvgMood : Nat;
  };
}
