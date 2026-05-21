// Live Intelligence Layer types — sovereign data bus
// All scores are Nat, Fibonacci-floored per LEX_FIBONACCI_FLOOR.
// No Float fields — all PHI arithmetic uses integer approximation.

module {

  // ── Student State Score result ─────────────────────────────────────────────
  // layoutState: "CALM" | "STANDARD" | "ACTIVE" | "FLOW"
  // IAS thresholds: <3=CALM, <8=STANDARD, <21=ACTIVE, >=21=FLOW
  public type LiveIntelligenceState = {
    sss            : Nat;   // Student State Score  (FLOR, 0-100)
    coh            : Nat;   // Coherence Score      (FLOR, 0-100)
    ias            : Nat;   // Interface Adaptation Score
    adx            : Nat;   // Adaptive Difficulty Level
    layoutState    : Text;  // CALM / STANDARD / ACTIVE / FLOW
    rcgnThreshold  : Nat;   // RCGN_T for this student
    isGoldMoment   : Bool;  // true when rcgnThreshold >= F(11)=89
  };

  // ── Funding tracker entry ──────────────────────────────────────────────────
  public type FundingTarget = {
    name   : Text;
    status : Text;
    amount : Text;
  };

  // ── Vision Document + funding tracker (combined query) ────────────────────
  public type VisionWithFunding = {
    visionText        : Text;
    founderStory      : Text;
    totalStudents     : Nat;
    totalRecognitions : Nat;
    activePrograms    : Nat;
    fundingTargets    : [FundingTarget];
  };

  // ── Principal heatmap entry with pending NOMS ─────────────────────────────
  public type HeatmapWithNoms = {
    classId          : Text;
    grade            : Nat;
    subject          : Text;
    activeStudents   : Nat;
    avgMastery       : Nat;
    sessionCount     : Nat;
    lastActive       : Int;
    pendingNoms      : Nat;   // NOMS pending nominations for this class
    recentAchievements : Nat; // ACHV records in hot zone for this class
  };

  // ── Passport insight for EDDI orb narration ──────────────────────────────
  public type PassportInsight = {
    seedCount  : Nat;
    hotSeeds   : Nat;
    warmSeeds  : Nat;
    coldSeeds  : Nat;
    frozenSeeds: Nat;
    sssScore   : Nat;
    orbMode    : Text;  // EXPLORE/EXPLAIN/QUIZ/REFLECT/BUILD/CREATE/SOVEREIGN
    eddiBrief  : Text;
  };

  // ── RCGN alert for teacher portal ─────────────────────────────────────────
  public type RcgnAlert = {
    studentId      : Text;
    studentName    : Text;
    subject        : Text;
    rcgnScore      : Nat;
    threshold      : Nat;
    alertType      : Text;  // THRESHOLD_CROSSED / MASTERY_STREAK / COMPETITION_READY
    timestamp      : Int;
    nominationReady: Bool;
  };

  // ── Self-study milestone (Diego Protocol) ─────────────────────────────────
  public type SelfStudyMilestone = {
    day            : Int;
    milestoneLabel : Text;
    fibIndex       : Nat;
    domainFocus    : Text;
    sessionDensity : Text;  // DENSE_15 | FULL_45
  };

  public type SelfStudyTrack = {
    trackId    : Text;
    milestones : [SelfStudyMilestone];
    totalDays  : Int;
    eddiBrief  : Text;
  };

  // ── Principal narrative entry ─────────────────────────────────────────────
  public type PrcpNarrativeEntry = {
    classId              : Text;
    className            : Text;
    narrative            : Text;
    masteryAvg           : Nat;
    studentsAtRisk       : Nat;
    studentsAccelerating : Nat;
    rcgnEvents           : Nat;
    sessionCount         : Nat;
  };

  // ── K-12 achievement timeline ─────────────────────────────────────────────
  public type AchievementTimelineEntry = {
    eventId     : Text;
    year        : Nat;
    grade       : Nat;
    eventType   : Text;  // RECOGNITION / MASTERY / COMPETITION
    title       : Text;
    domain      : Text;
    description : Text;
    programName : Text;
    goldSealed  : Bool;
    timestamp   : Int;
  };

  // ── Live session metrics for Principal portal ─────────────────────────────
  public type ClassSessionMetrics = {
    classId   : Text;
    className : Text;
    activeCount: Nat;
    masteryAvg : Nat;
    sssAvg     : Nat;
    rcgnStream : Nat;
  };

  public type SessionMetrics = {
    activeStudents : Nat;
    activeSessions : Nat;
    classBreakdown : [ClassSessionMetrics];
  };

  // ── Enrollment result ─────────────────────────────────────────────────────
  public type EnrollmentResult = {
    success           : Bool;
    firstModuleId     : Text;
    firstModuleTitle  : Text;
    firstModuleContent: Text;
    passportSeeded    : Bool;
    eddiBrief         : Text;
  };

  // ── IAS result ────────────────────────────────────────────────────────────
  public type IasResult = {
    iasScore   : Nat;
    layoutState: Text;
  };

  // ── Recognition timeline entry (K-12 student view) ────────────────────────
  public type RecognitionTimelineEntry = {
    id             : Text;
    achievementType: Text;   // human-readable variant label
    description    : Text;
    source         : Text;
    zone           : Text;   // "hot" | "warm" | "cold" | "frozen"
    sealedAt       : Int;
    gradeContext   : Text;   // derived from student passport grade level
    isGoldMoment   : Bool;   // true when sealed via RCGN_T >= 89
  };
};
