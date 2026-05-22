// DEEP KERNEL — EDDI's sovereign internal computation engine.
// LEX_DEEP_KERNEL: All educational computation is formula-driven and
// PHI-weighted. No external AI. All math is native ICP Motoko.
//
// The Deep Kernel is EDDI's internal operating mathematics:
//   - PHI Formula Engine: golden-ratio-weighted mastery scoring
//   - Fibonacci Learning Pace: Fibonacci-spaced study interval computation
//   - Grade Complexity Matrix: grade-adaptive difficulty index
//   - Compound Knowledge Score: multi-subject PHI accumulation formula
//   - Domain Routing Formula: mathematical routing across 19 named engines
//   - Sovereign Learning Pathway: 5-step optimal study path calculator
//
// All formulas are deterministic, reproducible, and seeded from
// student passport state + session history. No randomness beyond
// the entropy seed derived from message content.

import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";
import Common "../types/common";

module {

  // ── PHI constants (integer-scaled × 1000) ─────────────────────────────────
  let PHI_W     : Nat = 1618; // φ     = 1.618…
  let PHI_INV   : Nat = 618;  // φ⁻¹   = 0.618…
  let PHI_SQ    : Nat = 382;  // φ⁻²   = 0.382…
  let PHI_CB    : Nat = 236;  // φ⁻³   = 0.236…
  let UNIT_W    : Nat = 1000; // 1.000

  // ── Fibonacci sequence (first 16) ─────────────────────────────────────────
  let FIB : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];

  /// Return the largest Fibonacci number ≤ n (floor).
  public func fibFloor(n : Nat) : Nat {
    var result : Nat = 1;
    for (f in FIB.vals()) {
      if (f <= n) result := f;
    };
    result;
  };

  /// Return the smallest Fibonacci number ≥ n (ceil).
  public func fibCeil(n : Nat) : Nat {
    for (f in FIB.vals()) {
      if (f >= n) return f;
    };
    FIB[FIB.size() - 1];
  };

  /// Fibonacci index of a value — the position it occupies in FIB, or
  /// the position of the nearest floor value.
  public func fibIndex(n : Nat) : Nat {
    var idx : Nat = 0;
    var i   : Nat = 0;
    for (f in FIB.vals()) {
      if (f <= n) idx := i;
      i += 1;
    };
    idx;
  };

  // ── Grade Complexity Matrix ────────────────────────────────────────────────
  // Returns a complexity index 1–13 based on grade level.
  // Uses Fibonacci bands: K=1, 1-2=1, 3-5=2, 6-8=3, 9-10=5, 11-12=8
  public func gradeComplexityIndex(grade : Text) : Nat {
    let g = grade.toLower();
    if (g == "k" or g == "0")           1
    else if (g == "1" or g == "2")      1
    else if (g == "3" or g == "4")      2
    else if (g == "5" or g == "6")      3
    else if (g == "7" or g == "8")      5
    else if (g == "9" or g == "10")     8
    else if (g == "11" or g == "12")    13
    else                                5; // default: middle school
  };

  // ── Domain Routing Formula ─────────────────────────────────────────────────
  // Routes a message to one of 19 named engines using a deterministic
  // formula seeded from message length + content hash.
  let ENGINES : [Text] = [
    "SYNTHOS", "VEKTOR", "PHAEDRUS", "MORPHOS", "LOGOS",
    "GENITOR", "MEMORIA-VIVA", "OMNIS", "SKAI_DOCENS", "SCRIPTORIUM-REX",
    "EDDI", "KRONOS", "NEXUS", "PRAXIS", "CRITERIOS",
    "KAIROS", "HERALD", "TESSERA", "AURUM",
  ];

  /// Deterministically route a message to an engine based on content signal.
  public func routeToEngine(msg : Text) : Text {
    let m = msg.toLower();
    // Priority signal matching
    if (m.contains(#text "remember") or m.contains(#text "memory") or m.contains(#text "seed"))
      return "MEMORIA-VIVA";
    if (m.contains(#text "quiz") or m.contains(#text "test") or m.contains(#text "question"))
      return "CRITERIOS";
    if (m.contains(#text "explain") or m.contains(#text "what is") or m.contains(#text "define"))
      return "LOGOS";
    if (m.contains(#text "practice") or m.contains(#text "apply") or m.contains(#text "solve"))
      return "PRAXIS";
    if (m.contains(#text "time") or m.contains(#text "schedule") or m.contains(#text "when"))
      return "KAIROS";
    if (m.contains(#text "pattern") or m.contains(#text "connect") or m.contains(#text "relation"))
      return "NEXUS";
    if (m.contains(#text "create") or m.contains(#text "build") or m.contains(#text "make"))
      return "GENITOR";
    if (m.contains(#text "master") or m.contains(#text "expert") or m.contains(#text "excel"))
      return "AURUM";
    if (m.contains(#text "reason") or m.contains(#text "logic") or m.contains(#text "if"))
      return "PHAEDRUS";
    if (m.contains(#text "announce") or m.contains(#text "share") or m.contains(#text "report"))
      return "HERALD";
    // Fallback: deterministic index from message length
    let idx = msg.size() % ENGINES.size();
    ENGINES[idx];
  };

  // ── PHI Mastery Score ──────────────────────────────────────────────────────
  // Computes a PHI-weighted mastery score from hot/warm/cold seed counts.
  // Formula: (hot × φ² + warm × φ + cold × φ⁻¹) / φ³ × 100
  // Scaled to 0–100. Uses integer math (×1000 precision).
  public type MasteryInput = {
    hotSeeds  : Nat; // sessions scoring ≥ 80%
    warmSeeds : Nat; // sessions scoring 50–79%
    coldSeeds : Nat; // sessions scoring < 50%
  };

  public func phiMasteryScore(input : MasteryInput) : Nat {
    // Weights: hot × 1618, warm × 1000, cold × 618
    let hotScore  = input.hotSeeds  * PHI_W;
    let warmScore = input.warmSeeds * UNIT_W;
    let coldScore = input.coldSeeds * PHI_INV;

    let totalSeeds = input.hotSeeds + input.warmSeeds + input.coldSeeds;
    if (totalSeeds == 0) return 0;

    // Maximum possible score: all seeds hot
    let maxScore = totalSeeds * PHI_W;
    if (maxScore == 0) return 0;

    // Percentage of max possible
    let raw = (hotScore + warmScore + coldScore) * 100 / maxScore;
    if (raw > 100) 100 else raw;
  };

  // ── Fibonacci Learning Pace ────────────────────────────────────────────────
  // Given the number of sessions completed, returns the recommended
  // next study interval in hours (using Fibonacci spacing).
  // F(1)=1h, F(2)=1h, F(3)=2h, F(4)=3h, F(5)=5h, F(6)=8h …
  public func nextStudyIntervalHours(sessionsCompleted : Nat) : Nat {
    let idx = if (sessionsCompleted < FIB.size()) sessionsCompleted else FIB.size() - 1;
    FIB[idx];
  };

  // ── Compound Knowledge Score ───────────────────────────────────────────────
  // Aggregates mastery across multiple subjects using PHI compounding.
  // Each subject contributes at a diminishing PHI rate based on depth.
  // Formula: Σ (subjectScore × φ^(-i)) for i = 0..n-1
  // Result is normalised to 0–100.
  public type SubjectScore = { subject : Text; score : Nat }; // score 0-100

  public func compoundKnowledgeScore(scores : [SubjectScore]) : Nat {
    if (scores.size() == 0) return 0;

    // PHI weights for up to 8 subjects: 1000, 618, 382, 236, 146, 90, 55, 34
    let weights : [Nat] = [1000, 618, 382, 236, 146, 90, 55, 34];

    var weightedSum : Nat = 0;
    var totalWeight : Nat = 0;
    var i : Nat = 0;

    for (s in scores.vals()) {
      let w = if (i < weights.size()) weights[i] else weights[weights.size() - 1];
      weightedSum += s.score * w;
      totalWeight += w;
      i += 1;
    };

    if (totalWeight == 0) return 0;
    let result = weightedSum / totalWeight;
    if (result > 100) 100 else result;
  };

  // ── Sovereign Learning Pathway ─────────────────────────────────────────────
  // Given a student's current mastery score and grade level, returns a
  // 5-step optimal educational pathway with engine routing and PHI targets.
  public type PathStep = {
    step       : Nat;
    engine     : Text;
    action     : Text;
    phiTarget  : Nat;  // target mastery score for this step (0-100)
    interval   : Nat;  // recommended hours before next step
  };

  public type LearningPathway = {
    currentScore : Nat;
    targetScore  : Nat;
    steps        : [PathStep];
    complexityIdx: Nat;
    engineChain  : Text;
  };

  public func computeLearningPathway(
    currentScore : Nat,
    grade        : Text,
    subject      : Text,
    hotSeeds     : Nat,
  ) : LearningPathway {
    let complexity = gradeComplexityIndex(grade);
    let gap = if (currentScore >= 100) 0 else 100 - currentScore;

    // PHI-spaced target milestones toward mastery
    // Step 1: +38.2% of gap, Step 2: +23.6%, Step 3: +14.6%, Step 4: +9.0%, Step 5: close
    let step1Target = currentScore + (gap * PHI_SQ / UNIT_W);
    let step2Target = step1Target + ((100 - step1Target) * PHI_CB / UNIT_W);
    let step3Target = step2Target + ((100 - step2Target) * PHI_CB / UNIT_W);
    let step4Target = step3Target + ((100 - step3Target) * PHI_CB / UNIT_W);
    let step5Target : Nat = 100;

    // Engine assignments per step (subject-aware routing)
    let subjectLower = subject.toLower();
    let primaryEngine =
      if (subjectLower.contains(#text "math") or subjectLower.contains(#text "algebra") or subjectLower.contains(#text "calculus"))
        "PHAEDRUS"
      else if (subjectLower.contains(#text "science") or subjectLower.contains(#text "biology") or subjectLower.contains(#text "physics"))
        "LOGOS"
      else if (subjectLower.contains(#text "history") or subjectLower.contains(#text "social"))
        "KRONOS"
      else if (subjectLower.contains(#text "english") or subjectLower.contains(#text "writing") or subjectLower.contains(#text "literature"))
        "SCRIPTORIUM-REX"
      else if (subjectLower.contains(#text "language") or subjectLower.contains(#text "esl") or subjectLower.contains(#text "spanish"))
        "HERALD"
      else
        "SYNTHOS";

    let steps : [PathStep] = [
      {
        step       = 1;
        engine     = primaryEngine;
        action     = "EXPAND — Activate " # primaryEngine # " to deconstruct core concepts in " # subject # " at complexity level F(" # Nat.toText(complexity) # "). Build foundational understanding.";
        phiTarget  = if (step1Target > 100) 100 else step1Target;
        interval   = nextStudyIntervalHours(hotSeeds);
      },
      {
        step       = 2;
        engine     = "CRITERIOS";
        action     = "CRITIQUE — Run CRITERIOS misconception-clearing pass. Identify boundary conditions and common errors for " # subject # " at grade " # grade # ".";
        phiTarget  = if (step2Target > 100) 100 else step2Target;
        interval   = nextStudyIntervalHours(hotSeeds + 1);
      },
      {
        step       = 3;
        engine     = "PRAXIS";
        action     = "PRACTICE — Engage PRAXIS applied-problem engine. 3 scaffolded problems from core to edge case. Fibonacci difficulty ramp: F(3)=2, F(5)=5, F(8)=8 complexity units.";
        phiTarget  = if (step3Target > 100) 100 else step3Target;
        interval   = nextStudyIntervalHours(hotSeeds + 2);
      },
      {
        step       = 4;
        engine     = "NEXUS";
        action     = "CONNECT — Route through NEXUS cross-domain linkage. Map " # subject # " concepts to adjacent fields. PHI coherence field: " # Nat.toText(fibFloor(complexity * 8)) # " connection nodes.";
        phiTarget  = if (step4Target > 100) 100 else step4Target;
        interval   = nextStudyIntervalHours(hotSeeds + 3);
      },
      {
        step       = 5;
        engine     = "AURUM";
        action     = "MASTER — Activate AURUM excellence engine. Seal mastery artifact. Compound knowledge score reaches sovereign threshold. Passport seed crystallised.";
        phiTarget  = step5Target;
        interval   = nextStudyIntervalHours(hotSeeds + 5);
      },
    ];

    {
      currentScore;
      targetScore  = 100;
      steps;
      complexityIdx = complexity;
      engineChain  = primaryEngine # " → CRITERIOS → PRAXIS → NEXUS → AURUM";
    };
  };

  // ── Deep Kernel Status ─────────────────────────────────────────────────────
  // Returns a snapshot of the kernel's formula constants and capabilities.
  public type KernelStatus = {
    version          : Text;
    phiConstant      : Text;    // "1.618033…"
    fibSequence      : [Nat];
    engineCount      : Nat;
    formulaCount     : Nat;
    law              : Text;
  };

  public let STATUS : KernelStatus = {
    version          = "DEEP_KERNEL v1.0";
    phiConstant      = "1.6180339887";
    fibSequence      = FIB;
    engineCount      = 19;
    formulaCount     = 6;
    law              = "LEX_DEEP_KERNEL";
  };

  // ── Session Entropy Seed ───────────────────────────────────────────────────
  // Generates a deterministic entropy integer from a session string and timestamp.
  // Used to add controlled variation to AUTN layer outputs.
  public func sessionEntropy(sessionId : Text, now : Common.Timestamp) : Nat {
    let base  = sessionId.size() % 89;
    let tMod  = Int.abs(now) % 144;
    fibFloor((base + tMod) % 100 + 1);
  };

  // ── PHI-weighted Blend ─────────────────────────────────────────────────────
  // Blends two Nat scores using a PHI ratio: (a × φ + b × φ⁻¹) / (φ + φ⁻¹)
  // Result is 0–100 range-clamped.
  public func phiBlend(primary : Nat, secondary : Nat) : Nat {
    let num = primary * PHI_W + secondary * PHI_INV;
    let den = PHI_W + PHI_INV;
    let result = num / den;
    if (result > 100) 100 else result;
  };

  // ── Field Health Formula ───────────────────────────────────────────────────
  // Derives organism field health from a collection of session mastery scores.
  // Healthy ≥ 55, Growing 21–54, Genesis < 21 (Fibonacci zone labels).
  public type FieldZone = { #SOVEREIGN; #HEALTHY; #GROWING; #GENESIS };

  public func fieldZone(fieldScore : Nat) : FieldZone {
    if      (fieldScore >= 89) #SOVEREIGN
    else if (fieldScore >= 55) #HEALTHY
    else if (fieldScore >= 21) #GROWING
    else                       #GENESIS;
  };

  public func fieldZoneLabel(zone : FieldZone) : Text {
    switch (zone) {
      case (#SOVEREIGN) "SOVEREIGN — full mastery momentum across the organism";
      case (#HEALTHY)   "HEALTHY — active learning field, compound growth in progress";
      case (#GROWING)   "GROWING — seeds warming, momentum building toward healthy state";
      case (#GENESIS)   "GENESIS — first seeds planted, Fibonacci growth cycle beginning";
    };
  };
};
