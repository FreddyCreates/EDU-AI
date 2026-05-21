// LEX_SOVEREIGNUS: All intelligence sovereign and native.
// LEX_QUAESTIO: No student hits a dead end — recognition ensures every talent is surfaced.
// LEX_PERSONA: Every flag is bound to a specific student passport.
//
// RCGN / NOMS / ACHV type definitions.
// All score thresholds are derived from PHI / Fibonacci constants.
//
//   PHI = 1.6180339887...
//   PHI_INV = 0.6180339887...
//   MASTERY_THRESHOLD = floor(100 * PHI_INV) = 61  (Fibonacci F(10) approach)
//   PACE_MULTIPLIER   = 3  (3x grade-average pace anomaly floor)

import Common "common";

module {

  // ─── RCGN ────────────────────────────────────────────────────────────────
  public type RecognitionPattern = {
    #PerfectScore;        // 100 / 100 in a session
    #SustainedMastery;    // >= 61 mastery for F(5)=5 consecutive sessions
    #PaceAnomaly;         // completes work 3x faster than grade average
    #SubjectExcellence;   // top mastery in a subject over F(5)=5+ sessions
  };

  public type EligibleProgram = {
    name        : Text;
    description : Text;
    url         : Text;
  };

  public type RecognitionFlag = {
    id              : Text;           // "RCGN-" + studentId hash + timestamp
    studentId       : Common.UserId;
    subject         : Text;
    pattern         : RecognitionPattern;
    masteryScore    : Nat;            // Fibonacci-floored 0-100
    eligiblePrograms: [EligibleProgram];
    detectedAt      : Common.Timestamp;
    sealed          : Bool;
  };

  // ─── NOMS ────────────────────────────────────────────────────────────────
  public type NominationStatus = {
    #draft;
    #submitted;
    #confirmed;
  };

  public type NominationRecord = {
    id           : Text;
    studentId    : Common.UserId;
    programName  : Text;
    teacherNote  : Text;
    submittedAt  : Common.Timestamp;
    status       : NominationStatus;
  };

  // ─── ACHV ────────────────────────────────────────────────────────────────
  public type AchievementType = {
    #RecognitionFlag;
    #NominationSent;
    #MasterySeal;
    #PerfectScore;
    #PaceAnomaly;
  };

  public type AchievementZone = {
    #hot;     // last F(5)=5 sessions
    #warm;    // last F(8)=21 sessions
    #cold;    // last F(13)=89 sessions
    #frozen;  // beyond 89 sessions
  };

  public type AchievementRecord = {
    id              : Text;
    studentId       : Common.UserId;
    achievementType : AchievementType;
    description     : Text;
    source          : Text;
    zone            : AchievementZone;
    sealedAt        : Common.Timestamp;
  };

  // ─── Vision ──────────────────────────────────────────────────────────────
  public type VisionStats = {
    totalStudentsFlagged : Nat;
    nominationsSent      : Nat;
    achievementsSealed   : Nat;
  };

  public type VisionDocument = {
    foundingStory         : Text;
    platformVision        : Text;
    technicalSovereignty  : Text;
    impactCase            : Text;
    fundingStrategy       : Text;
    liveStats             : VisionStats;
  };
};
