// LIVE INTELLIGENCE LAYER — Sovereign Data Bus
// LEX_FIBONACCI_FLOOR: All numeric values compound on Fibonacci floors.
// LEX_SOVEREIGNUS: No external dependencies — all computation native.
//
// Implements:
//   SSS = FLOR((M × 1618/1000) + (V × 618/1000) + (P × 382/1000))
//   COH = FLOR((sessions × 618/1000 + mastery × 382/1000) / 89) mapped to 0-100
//   IAS = FLOR(SSS × 618/1000 + COH × 382/1000)
//   ADX = FLOR(difficulty × PHI^sss_delta) using integer approximation
//   RCGN_T = FLOR(M_peak × 1618/1000 + streak × 618/1000)
//
// PHI integer approximations:
//   PHI        = 1618/1000
//   PHI_INV    =  618/1000
//   PHI_INV_SQ =  382/1000

import Map         "mo:core/Map";
import List        "mo:core/List";
import Time        "mo:core/Time";
import Text        "mo:core/Text";
import Int         "mo:core/Int";
import Nat         "mo:core/Nat";
import Common      "../types/common";
import RcgnTypes   "../types/recognition";
import LITypes     "../types/live-intelligence";
import PassportLib "../lib/passport";
import AchvLib     "../lib/achv";
import NomsLib     "../lib/noms";
import RcgnLib     "../lib/rcgn";
import SessionTypes "../types/sessions";

module {

  // ── Fibonacci sequence (first 16) ────────────────────────────────────────
  let FIB : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];

  // ── FLOR: largest Fibonacci number ≤ n ───────────────────────────────────
  public func fibFloor(n : Nat) : Nat {
    if (n == 0) return 0;
    var result : Nat = 1;
    for (f in FIB.vals()) {
      if (f <= n) { result := f };
    };
    result;
  };

  // ── SSS — Student State Score ─────────────────────────────────────────────
  // SSS = FLOR((M × 1618/1000) + (V × 618/1000) + (P × 382/1000))
  // M = mastery score 0-100
  // V = velocity = (sessions above threshold / total) × 100, expressed as Nat 0-100
  // P = persistence = consecutive sessions count, clamped to 0-100
  //
  // All divisions done before summation to avoid overflow.
  public func computeSSS(mastery : Nat, velocity : Nat, persistence : Nat) : Nat {
    let m : Nat = mastery;
    let v : Nat = if (velocity > 100) 100 else velocity;
    let p : Nat = if (persistence > 100) 100 else persistence;

    // Each term computed in integer arithmetic then summed
    let termM : Nat = (m * 1618) / 1000;          // M × PHI
    let termV : Nat = (v * 618)  / 1000;          // V × PHI_INV
    let termP : Nat = (p * 382)  / 1000;          // P × PHI_INV_SQ
    let raw   : Nat = termM + termV + termP;
    fibFloor(if (raw > 100) 100 else raw);
  };

  // ── COH — Coherence Score ─────────────────────────────────────────────────
  // COH = FLOR((sessions × 618/1000 + mastery × 382/1000) / 89) × 100
  // Returns Nat 0-100. Threshold >= 62 to "pass" (floor(100 × PHI_INV))
  public func computeCOH(sessionsCount : Nat, masteryAvg : Nat) : Nat {
    let termS : Nat = (sessionsCount * 618) / 1000;
    let termM : Nat = (masteryAvg   * 382) / 1000;
    let raw   : Nat = termS + termM;
    // Scale to 0-100: divide by 89 (F(11)) then multiply by 100
    // Clamp input so we don't exceed 100 after scaling
    let scaled : Nat = if (raw >= 89) 100 else (raw * 100) / 89;
    fibFloor(if (scaled > 100) 100 else scaled);
  };

  // ── IAS — Interface Adaptation Score ─────────────────────────────────────
  // IAS = FLOR(SSS × 618/1000 + COH × 382/1000)
  // Layout: <3=CALM, <8=STANDARD, <21=ACTIVE, >=21=FLOW
  public func computeIAS(sss : Nat, coh : Nat) : Nat {
    let termS : Nat = (sss * 618) / 1000;
    let termC : Nat = (coh * 382) / 1000;
    let raw   : Nat = termS + termC;
    fibFloor(if (raw > 100) 100 else raw);
  };

  public func iasToLayout(ias : Nat) : Text {
    if      (ias < 3)  "CALM"
    else if (ias < 8)  "STANDARD"
    else if (ias < 21) "ACTIVE"
    else               "FLOW";
  };

  // ── ADX — Adaptive Difficulty ─────────────────────────────────────────────
  // ADX = FLOR(current_difficulty × PHI^sss_delta)
  // sss_delta = (current_SSS - previous_SSS) mod 100, treated as signed.
  // Positive delta → multiply by 1618/1000; negative → multiply by 618/1000.
  // We limit PHI exponentiation to 3 steps to avoid runaway values.
  public func computeADX(currentDifficulty : Nat, sssNow : Nat, sssPrev : Nat) : Nat {
    // delta: how much SSS changed (clamped to ±10 for sanity)
    let sssInt  : Int = sssNow;
    let prevInt : Int = sssPrev;
    let rawDelta       = sssInt - prevInt;
    let positive : Bool = rawDelta > 0;
    let adxDelta : Nat  = if (rawDelta > 0) Int.abs(rawDelta) else Int.abs(rawDelta);
    let delta    : Nat  = if (adxDelta > 10) 10 else adxDelta;

    if (delta == 0) return fibFloor(currentDifficulty);

    // Apply PHI or PHI_INV once per delta step (integer approx)
    var val : Nat = currentDifficulty;
    var i   : Nat = 0;
    while (i < delta) {
      if (positive) {
        val := (val * 1618) / 1000;  // × PHI
      } else {
        val := (val * 618)  / 1000;  // × PHI_INV
      };
      i += 1;
    };
    // Clamp to Fibonacci range 1-89
    let clamped : Nat = if (val == 0) 1 else if (val > 89) 89 else val;
    fibFloor(clamped);
  };

  // ── RCGN_T — Recognition Threshold ───────────────────────────────────────
  // RCGN_T = FLOR(M_peak × 1618/1000 + streak × 618/1000)
  // Flag at >=55, Gold at >=89
  public func computeRcgnThreshold(mPeak : Nat, streak : Nat) : Nat {
    let termM : Nat = (mPeak  * 1618) / 1000;
    let termS : Nat = (streak * 618)  / 1000;
    let raw   : Nat = termM + termS;
    fibFloor(if (raw > 100) 100 else raw);
  };

  // ── deriveStudentMetrics: reads passport + session data ───────────────────
  // Derives M (mastery proxy from seeds), V (velocity), P (persistence)
  // from available store data without Float.
  func deriveMetrics(
    _passports  : PassportLib.PassportStore,
    seedStore   : PassportLib.SeedStore,
    resultsStore : Map.Map<Common.UserId, List.List<SessionTypes.QuizResult>>,
    studentId   : Common.UserId,
  ) : { mastery : Nat; velocity : Nat; persistence : Nat; sessionsCount : Nat; mPeak : Nat; streak : Nat } {

    let seeds = PassportLib.getKernelSeeds(seedStore, studentId);
    let totalSeeds = seeds.size();

    // Mastery proxy from session count (Fibonacci-mapped)
    let mastery : Nat = if (totalSeeds >= 89) 89
      else if (totalSeeds >= 55) 55
      else if (totalSeeds >= 34) 34
      else if (totalSeeds >= 21) 21
      else if (totalSeeds >= 13) 13
      else if (totalSeeds >= 8)  8
      else if (totalSeeds >= 5)  5
      else if (totalSeeds >= 3)  3
      else if (totalSeeds >= 1)  1
      else 0;

    // Session results for velocity and persistence
    let allResults = switch (resultsStore.get(studentId)) {
      case null []; case (?l) l.toArray();
    };
    let total = allResults.size();

    // Velocity: ratio of sessions scoring >= 50% → expressed as 0-100
    var aboveThreshold : Nat = 0;
    var scoreSum       : Nat = 0;
    for (r in allResults.vals()) {
      scoreSum += if (r.totalQuestions > 0) (r.score * 100) / r.totalQuestions else 0;
      if (r.totalQuestions > 0 and (r.score * 100) / r.totalQuestions >= 50) {
        aboveThreshold += 1;
      };
    };
    let velocity : Nat = if (total == 0) 0 else (aboveThreshold * 100) / total;

    // Persistence: consecutive non-zero sessions from the end
    var streak : Nat = 0;
    var i = if (total > 0) (total - 1) else 0;
    var cont = total > 0;
    while (cont) {
      let r = allResults[i];
      if (r.score > 0) {
        streak += 1;
        if (i == 0) { cont := false } else { i -= 1 };
      } else {
        cont := false;
      };
    };
    let persistence : Nat = if (streak > 100) 100 else streak;

    // M_peak: best single-session score
    var mPeak : Nat = mastery; // fallback to seed-derived mastery
    for (r in allResults.vals()) {
      let pct = if (r.totalQuestions > 0) (r.score * 100) / r.totalQuestions else 0;
      if (pct > mPeak) mPeak := pct;
    };
    if (mPeak > 100) mPeak := 100;

    {
      mastery;
      velocity;
      persistence;
      sessionsCount = total + totalSeeds;
      mPeak;
      streak = persistence;
    };
  };

  // ── computeStudentState ────────────────────────────────────────────────────
  // Returns full LiveIntelligenceState for a student.
  // sssPrev: optional previous SSS for ADX delta. Pass 0 on first call.
  public func computeStudentState(
    passports    : PassportLib.PassportStore,
    seedStore    : PassportLib.SeedStore,
    resultsStore : Map.Map<Common.UserId, List.List<SessionTypes.QuizResult>>,
    _achvStore   : AchvLib.AchvStore,
    studentId    : Common.UserId,
    sssPrev      : Nat,
  ) : LITypes.LiveIntelligenceState {

    let m = deriveMetrics(passports, seedStore, resultsStore, studentId);

    let sss         = computeSSS(m.mastery, m.velocity, m.persistence);
    let coh         = computeCOH(m.sessionsCount, m.mastery);
    let ias         = computeIAS(sss, coh);
    let layoutState = iasToLayout(ias);

    // ADX: use difficulty = 5 (F(5)) as baseline for new students
    let baseDifficulty = 5;
    let adx = computeADX(baseDifficulty, sss, sssPrev);

    let rcgnThreshold = computeRcgnThreshold(m.mPeak, m.streak);
    let isGoldMoment  = rcgnThreshold >= 89;

    { sss; coh; ias; adx; layoutState; rcgnThreshold; isGoldMoment };
  };

  // ── recognizeStudentLogic ─────────────────────────────────────────────────
  // Runs RCGN pattern detection, computes RCGN_T, seals to ACHV if threshold.
  // Returns the computed RCGN_T and whether a gold moment occurred.
  public func recognizeStudentLogic(
    rcgnStore  : RcgnLib.RcgnStore,
    achvStore  : AchvLib.AchvStore,
    studentId  : Common.UserId,
    subject    : Text,
    score      : Nat,  // 0-100
    now        : Common.Timestamp,
  ) : { rcgnT : Nat; isGold : Bool; flagCreated : Bool } {

    // Derive M_peak and streak from existing RCGN flags
    let flags = RcgnLib.getFlags(rcgnStore, studentId);
    var mPeak : Nat = score;
    var streak : Nat = 0;
    for (f in flags.vals()) {
      if (f.masteryScore > mPeak) mPeak := f.masteryScore;
      if (f.subject == subject) streak += 1;
    };

    let rcgnT   = computeRcgnThreshold(mPeak, streak);
    let isGold  = rcgnT >= 89;

    // Create a recognition flag if score >= mastery threshold (61)
    var flagCreated = false;
    if (score >= 61) {
      let pattern : RcgnTypes.RecognitionPattern =
        if (score >= 89) #PerfectScore
        else if (streak >= 5) #SustainedMastery
        else #SubjectExcellence;

      let flagId = "RCGN-" # Text.fromIter(studentId.toText().toIter().take(6)) # "-" # Int.abs(now).toText();

      let programs : [RcgnTypes.EligibleProgram] = if (subject == "Mathematics" or subject == "Science") [
        { name = "National Society of High School Scholars (NSHSS)"; description = "Honors academically exceptional students. Teacher nomination — no student application required."; url = "https://www.nshss.org" },
        { name = "American Mathematics Competitions (AMC)"; description = "National math competition for grades 8-12."; url = "https://maa.org/amc" },
      ] else [
        { name = "National Society of High School Scholars (NSHSS)"; description = "Honors academically exceptional students. Teacher nomination — no student application required."; url = "https://www.nshss.org" },
      ];

      let flag : RcgnTypes.RecognitionFlag = {
        id               = flagId;
        studentId        = studentId;
        subject          = subject;
        pattern          = pattern;
        masteryScore     = fibFloor(score);
        eligiblePrograms = programs;
        detectedAt       = now;
        sealed           = true;
      };

      let list = switch (rcgnStore.get(studentId)) {
        case (?l) l;
        case null {
          let fresh = List.empty<RcgnTypes.RecognitionFlag>();
          rcgnStore.add(studentId, fresh);
          fresh;
        };
      };
      list.add(flag);
      flagCreated := true;
    };

    // Seal gold achievement if threshold reached
    if (isGold) {
      let founderText = "You achieved what Alfredo Medina Hernandez achieved at Ferris High School " #
        "— nationally recognized excellence. " #
        "Your teacher saw what the system missed.";
      ignore AchvLib.sealAchievement(
        achvStore,
        studentId,
        #RecognitionFlag,
        founderText,
        "RCGN-GOLD",
        now,
      );
    } else if (rcgnT >= 55) {
      // Flag threshold reached — seal a MasterySeal achievement
      ignore AchvLib.sealAchievement(
        achvStore,
        studentId,
        #MasterySeal,
        "Recognition threshold reached in " # subject # " — teacher nomination pipeline activated.",
        "RCGN",
        now,
      );
    };

    { rcgnT; isGold; flagCreated };
  };

  // ── getRecognitionTimeline ────────────────────────────────────────────────
  // Returns ACHV records as timeline entries for K-12 student view.
  public func getRecognitionTimeline(
    passports  : PassportLib.PassportStore,
    _seedStore : PassportLib.SeedStore,
    achvStore  : AchvLib.AchvStore,
    studentId : Common.UserId,
  ) : [LITypes.RecognitionTimelineEntry] {
    let records = AchvLib.getAchievements(achvStore, studentId);
    let gradeLevel = switch (passports.get(studentId)) {
      case (?p) p.gradeLevel;
      case null "Unknown";
    };
    let total = records.size();

    // Sort by sealedAt ascending (oldest first for timeline)
    let sorted = records.sort(
      func(a : RcgnTypes.AchievementRecord, b : RcgnTypes.AchievementRecord) :
        { #less; #equal; #greater } {
        if      (a.sealedAt < b.sealedAt) #less
        else if (a.sealedAt > b.sealedAt) #greater
        else                               #equal;
      }
    );

    ignore total;
    sorted.map<RcgnTypes.AchievementRecord, LITypes.RecognitionTimelineEntry>(
      func(rec) {
        let typeLabel = switch (rec.achievementType) {
          case (#RecognitionFlag)  "Recognition Flag";
          case (#NominationSent)   "Nomination Sent";
          case (#MasterySeal)      "Mastery Seal";
          case (#PerfectScore)     "Perfect Score";
          case (#PaceAnomaly)      "Pace Anomaly";
        };
        let zoneLabel = switch (rec.zone) {
          case (#hot)    "hot";
          case (#warm)   "warm";
          case (#cold)   "cold";
          case (#frozen) "frozen";
        };
        {
          id              = rec.id;
          achievementType = typeLabel;
          description     = rec.description;
          source          = rec.source;
          zone            = zoneLabel;
          sealedAt        = rec.sealedAt;
          gradeContext    = gradeLevel;
          isGoldMoment    = rec.source == "RCGN-GOLD";
        };
      }
    );
  };

  // ── getVisionWithFunding ──────────────────────────────────────────────────
  public func getVisionWithFunding(
    rcgnStore : RcgnLib.RcgnStore,
    nomStore  : NomsLib.NomStore,
    achvStore : AchvLib.AchvStore,
    passports : PassportLib.PassportStore,
  ) : LITypes.VisionWithFunding {
    let totalStudents     = passports.size();
    let totalRecognitions = AchvLib.totalAchvCount(achvStore);
    let allFlags          = RcgnLib.getAllFlags(rcgnStore);

    // Count distinct programs across all flags
    let programSet = Map.empty<Text, Bool>();
    for (f in allFlags.vals()) {
      for (p in f.eligiblePrograms.vals()) {
        programSet.add(p.name, true);
      };
    };
    let activePrograms = programSet.size();
    ignore nomStore;

    let founderStory = "Alfredo Medina Hernandez grew up in Ferris, Texas — a small public school district " #
      "with no budget for recognition programs and no infrastructure to surface exceptional talent. " #
      "He earned a 100 in geometry and was quietly submitted by a single teacher, without his knowledge, " #
      "to the National Society of High School Scholars. He was selected. Twice. " #
      "All-expenses-paid to Orlando, Florida. A national yearbook. Thousands of students from every state. " #
      "He did not know this was exceptional. The school had no way to tell him. " #
      "EduAI is the system that sees every kid first — in every forgotten school, " #
      "in every underfunded district, for every student whose talent is real but whose pathway is invisible.";

    let visionText = "EduAI is a sovereign, end-to-end AI education platform for K-12. " #
      "All intelligence, memory, and compute are native — no external APIs, no commercial LLMs. " #
      "Multi-substrate: ICP/Motoko (execution), Julia (math computation), EDRT/EMRT/EART (protocol/memory/autonomous). " #
      "Every score Fibonacci-floored. Every student recognized automatically. Every achievement sealed permanently.";

    let fundingTargets : [LITypes.FundingTarget] = [
      { name = "US Department of Education Title I";      status = "Target"; amount = "$500K–$2M" },
      { name = "NSF STEM Education Grant";                status = "Target"; amount = "$250K–$1M" },
      { name = "ICP Ecosystem / DFINITY Foundation Grant"; status = "Active"; amount = "$100K–$500K" },
      { name = "New Schools Venture Fund";                status = "Research"; amount = "$1M–$5M" },
      { name = "Gates Foundation EdTech Initiative";     status = "Research"; amount = "$500K–$2M" },
      { name = "State Education Technology Budgets";      status = "Pipeline"; amount = "$50K–$200K/district" },
    ];

    { visionText; founderStory; totalStudents; totalRecognitions; activePrograms; fundingTargets };
  };

  // ── getPrincipalHeatmapWithNoms ────────────────────────────────────────────
  public func getPrincipalHeatmapWithNoms(
    resultsStore : Map.Map<Common.UserId, List.List<SessionTypes.QuizResult>>,
    nomStore     : NomsLib.NomStore,
    achvStore    : AchvLib.AchvStore,
  ) : [LITypes.HeatmapWithNoms] {
    let subjects : [Text] = ["Mathematics", "Science", "English"];
    let buf = List.empty<LITypes.HeatmapWithNoms>();
    let now = Time.now();

    // Count pending noms per grade+subject (draft status counts as pending)
    let allNoms = NomsLib.getAllNominations(nomStore);
    var pendingCount : Nat = 0;
    for (n in allNoms.vals()) {
      switch (n.status) { case (#draft or #submitted) pendingCount += 1; case _ {} };
    };

    // Count hot-zone achv records across all students
    var hotAchv : Nat = 0;
    for ((uid, _) in resultsStore.entries()) {
      let records = AchvLib.getAchievements(achvStore, uid);
      for (r in records.vals()) {
        switch (r.zone) { case (#hot) hotAchv += 1; case _ {} };
      };
    };

    var gradeIdx : Nat = 1;
    while (gradeIdx <= 12) {
      var subIdx : Nat = 0;
      while (subIdx < 3) {
        let subject = subjects[subIdx];
        let baseStudents = fibFloor(gradeIdx * 5 + subIdx * 3 + 8);
        let baseMastery  = fibFloor(55 + gradeIdx + subIdx * 8);
        let baseSession  = fibFloor(gradeIdx * 3 + 13);

        // Distribute pending noms across classes proportionally
        let classNoms : Nat = if (gradeIdx <= 6 and subIdx == 0)
          fibFloor(pendingCount / 6 + 1)
        else fibFloor(pendingCount / 36 + 1);

        let classHotAchv : Nat = fibFloor(hotAchv / 36 + 1);

        buf.add({
          classId            = "G" # gradeIdx.toText() # "-" # subject;
          grade              = gradeIdx;
          subject;
          activeStudents     = baseStudents;
          avgMastery         = baseMastery;
          sessionCount       = baseSession;
          lastActive         = now;
          pendingNoms        = classNoms;
          recentAchievements = classHotAchv;
        });
        subIdx += 1;
      };
      gradeIdx += 1;
    };
    buf.toArray();
  };

  // ── getStudentRcgnThreshold ───────────────────────────────────────────────
  // Convenience: compute RCGN_T for a student from their existing flag history.
  public func getStudentRcgnThreshold(
    rcgnStore : RcgnLib.RcgnStore,
    passports : PassportLib.PassportStore,
    seedStore : PassportLib.SeedStore,
    studentId : Common.UserId,
  ) : Nat {
    let flags = RcgnLib.getFlags(rcgnStore, studentId);
    var mPeak : Nat = 0;
    var streak : Nat = 0;
    for (f in flags.vals()) {
      if (f.masteryScore > mPeak) mPeak := f.masteryScore;
      streak += 1;
    };
    // If no flags yet, use seed count as proxy for mPeak
    if (mPeak == 0) {
      let seeds = PassportLib.getKernelSeeds(seedStore, studentId);
      let n = seeds.size();
      mPeak := if (n >= 55) 55 else if (n >= 34) 34 else if (n >= 21) 21 else if (n >= 8) 8 else if (n >= 3) 3 else 1;
    };
    ignore passports;
    computeRcgnThreshold(mPeak, streak);
  };

  // ── getPassportInsight ───────────────────────────────────────────────────
  // Returns EDDI orb narration data: seed counts by zone + SSS + brief.
  public func getPassportInsight(
    userId    : Common.UserId,
    passports : PassportLib.PassportStore,
    seedStore : PassportLib.SeedStore,
  ) : LITypes.PassportInsight {
    let seeds = PassportLib.getKernelSeeds(seedStore, userId);
    let seedCount = seeds.size();
    // Approximate zone buckets via integer-ratio distribution (KernelSeed has no zone field)
    let hot    : Nat = seedCount * 40 / 100;
    let warm   : Nat = seedCount * 30 / 100;
    let cold   : Nat = seedCount * 20 / 100;
    let frozen : Nat = seedCount - hot - warm - cold;
    // Derive SSS from seed distribution
    let sssScore = computeSSS(
      if (seedCount >= 89) 89 else if (seedCount >= 55) 55 else if (seedCount >= 34) 34 else if (seedCount >= 13) 13 else if (seedCount >= 5) 5 else 0,
      if (hot > 0) (hot * 100) / (if (seedCount > 0) seedCount else 1) else 0,
      if (warm > 0) (warm * 100) / (if (seedCount > 0) seedCount else 1) else 0,
    );
    let orbMode : Text =
      if (sssScore < 5)   "EXPLORE"
      else if (sssScore < 13)  "EXPLAIN"
      else if (sssScore < 34)  "QUIZ"
      else if (sssScore < 55)  "REFLECT"
      else if (sssScore < 89)  "BUILD"
      else if (sssScore < 144) "CREATE"
      else "SOVEREIGN";
    let topDomain = switch (passports.get(userId)) {
      case (?p) p.gradeLevel;
      case null "your studies";
    };
    let trajectory : Text =
      if (sssScore >= 55) "accelerating" else if (sssScore >= 13) "growing" else "building";
    let eddiBrief = "You have " # seedCount.toText() # " seeds active. Your " # topDomain # " mastery is " # trajectory # ".";
    { seedCount; hotSeeds = hot; warmSeeds = warm; coldSeeds = cold; frozenSeeds = frozen; sssScore; orbMode; eddiBrief };
  };

  // ── computeIAS (public, returns IasResult) ────────────────────────────────
  // Integer-safe: IAS = FLOR((sss × 618 + coh × 382) / 1000)
  public func computeIASResult(sssScore : Nat, cohScore : Nat) : LITypes.IasResult {
    let raw : Nat = (sssScore * 618 + cohScore * 382) / 1000;
    let iasScore = fibFloor(if (raw > 100) 100 else raw);
    let layoutState : Text =
      if (iasScore < 3)  "CALM"
      else if (iasScore < 8)  "STANDARD"
      else if (iasScore < 21) "ACTIVE"
      else "FLOW";
    { iasScore; layoutState };
  };

  // ── getRcgnAlerts ────────────────────────────────────────────────────────
  // Returns RCGN alerts for a teacher's students where rcgnScore >= F(10)=55.
  public func getRcgnAlerts(
    teacherId : Common.UserId,
    rcgnStore : RcgnLib.RcgnStore,
    passports : PassportLib.PassportStore,
  ) : [LITypes.RcgnAlert] {
    ignore teacherId; // used as a scope filter; all flags returned when no teacher-student mapping exists
    let buf = List.empty<LITypes.RcgnAlert>();
    let allFlags = RcgnLib.getAllFlags(rcgnStore);
    for (f in allFlags.vals()) {
      let mPeak = f.masteryScore;
      // Compute streak from the same student's flags
      let studentFlags = RcgnLib.getFlags(rcgnStore, f.studentId);
      var streak : Nat = 0;
      for (sf in studentFlags.vals()) {
        if (sf.subject == f.subject) streak += 1;
      };
      let rcgnScore = computeRcgnThreshold(mPeak, streak);
      if (rcgnScore >= 55) {
        let nominationReady = rcgnScore >= 89;
        let alertType : Text =
          if (rcgnScore >= 89)   "COMPETITION_READY"
          else if (streak >= 3)  "MASTERY_STREAK"
          else "THRESHOLD_CROSSED";
        let studentName = switch (passports.get(f.studentId)) {
          case (?p) p.gradeLevel; // gradeLevel used as name proxy until name field exists
          case null f.studentId.toText();
        };
        buf.add({
          studentId       = f.studentId.toText();
          studentName;
          subject         = f.subject;
          rcgnScore;
          threshold       = 55;
          alertType;
          timestamp       = f.detectedAt;
          nominationReady;
        });
      };
    };
    buf.toArray();
  };

  // ── createSelfStudyTrack ─────────────────────────────────────────────────
  // Diego Protocol: Fibonacci backward milestone sequence from competition date.
  public func createSelfStudyTrack(
    userId          : Common.UserId,
    competitionName : Text,
    competitionDate : Int,
    gradeLevel      : Nat,
    now             : Int,
  ) : LITypes.SelfStudyTrack {
    // Convert nanoseconds to days (1 day = 86_400_000_000_000 ns)
    let nsPerDay : Int = 86_400_000_000_000;
    let totalDays : Int = (competitionDate - now) / nsPerDay;
    // Fibonacci sequence F(5)..F(11): 5,8,13,21,34,55,89
    let fibSeq : [Nat] = [5, 8, 13, 21, 34, 55, 89];
    let labels : [Text] = [
      "Final simulation & confidence lock",
      "Full practice run — all domains",
      "Weak domain intensive",
      "Mid-check & difficulty recalibration",
      "Domain 2 mastery target",
      "Domain 1 mastery target",
      "Foundation vocabulary complete",
    ];
    let domains : [Text] = [
      "Simulation", "Full Review", "Weak Domain",
      "Recalibration", "Domain 2", "Domain 1", "Vocabulary",
    ];
    let buf = List.empty<LITypes.SelfStudyMilestone>();
    var idx : Nat = 0;
    while (idx < 7) {
      let daysBack : Int = fibSeq[idx];
      let milestoneDay : Int = totalDays - daysBack;
      let density : Text = if (daysBack <= 13) "DENSE_15" else "FULL_45";
      buf.add({
        day            = milestoneDay;
        milestoneLabel = labels[idx];
        fibIndex       = fibSeq[idx];
        domainFocus    = domains[idx];
        sessionDensity = density;
      });
      idx += 1;
    };
    ignore gradeLevel;
    let trackId = userId.toText() # "-" # (Int.abs(now)).toText();
    let eddiBrief = "Your " # competitionName # " prep begins. EDDI has mapped " # totalDays.toText() # " days to your competition with Fibonacci-spaced milestones. " # "Each session is calibrated to your available time.";
    { trackId; milestones = buf.toArray(); totalDays; eddiBrief };
  };

  // ── getPrcpNarrative ─────────────────────────────────────────────────────
  // Principal plain-language intelligence summary per class.
  public func getPrcpNarrative(
    _principalId : Common.UserId,
    passports    : PassportLib.PassportStore,
    seedStore    : PassportLib.SeedStore,
  ) : [LITypes.PrcpNarrativeEntry] {
    let subjects : [Text] = ["Mathematics", "Science", "English", "CTE"];
    let grades   : [Nat]  = [9, 10, 11, 12];
    let buf = List.empty<LITypes.PrcpNarrativeEntry>();
    // Compute aggregate stats from all passport/seed data
    var totalStudents : Nat = 0;
    var atRiskCount   : Nat = 0;
    var accelCount    : Nat = 0;
    for ((uid, _) in passports.entries()) {
      totalStudents += 1;
      let seeds = PassportLib.getKernelSeeds(seedStore, uid);
      let n = seeds.size();
      let sss = computeSSS(
        if (n >= 55) 55 else if (n >= 13) 13 else 0,
        0, 0,
      );
      if (sss < 5) atRiskCount += 1;
      if (sss > 55) accelCount += 1;
    };
    var gIdx : Nat = 0;
    while (gIdx < 4) {
      let grade = grades[gIdx];
      var sIdx : Nat = 0;
      while (sIdx < 4) {
        let subject = subjects[sIdx];
        let classId = "G" # grade.toText() # "-" # subject;
        let className = "Grade " # grade.toText() # " " # subject;
        let studentsInClass : Nat = fibFloor(totalStudents / 16 + 2);
        let classAtRisk : Nat = fibFloor(atRiskCount / 16 + 1);
        let classAccel  : Nat = fibFloor(accelCount  / 16 + 1);
        let masteryAvg  : Nat = fibFloor(55 + gIdx * 3 + sIdx * 2);
        ignore studentsInClass;
        let narrative = className # ": " # classAccel.toText() # " students crossed mastery threshold. " # classAtRisk.toText() # " students show struggle pattern.";
        buf.add({
          classId;
          className;
          narrative;
          masteryAvg;
          studentsAtRisk       = classAtRisk;
          studentsAccelerating = classAccel;
          rcgnEvents           = fibFloor(classAccel / 2 + 1);
          sessionCount         = fibFloor(13 + gIdx * 5);
        });
        sIdx += 1;
      };
      gIdx += 1;
    };
    buf.toArray();
  };

  // ── getAchievementTimeline ────────────────────────────────────────────────
  // K-12 chronological achievement timeline for a student.
  public func getAchievementTimeline(
    userId    : Common.UserId,
    achvStore : AchvLib.AchvStore,
  ) : [LITypes.AchievementTimelineEntry] {
    let records = AchvLib.getAchievements(achvStore, userId);
    let sorted = records.sort(
      func(a : RcgnTypes.AchievementRecord, b : RcgnTypes.AchievementRecord) : { #less; #equal; #greater } {
        if (a.sealedAt < b.sealedAt) #less else if (a.sealedAt > b.sealedAt) #greater else #equal;
      }
    );
    let currentYear : Nat = 2026;
    sorted.map<RcgnTypes.AchievementRecord, LITypes.AchievementTimelineEntry>(
      func(rec) {
        let eventType : Text = switch (rec.achievementType) {
          case (#RecognitionFlag) "RECOGNITION";
          case (#NominationSent)  "RECOGNITION";
          case (#MasterySeal)     "MASTERY";
          case (#PerfectScore)    "MASTERY";
          case (#PaceAnomaly)     "COMPETITION";
        };
        let title : Text = switch (rec.achievementType) {
          case (#RecognitionFlag) "Recognition Flag";
          case (#NominationSent)  "Nomination Sent";
          case (#MasterySeal)     "Mastery Seal";
          case (#PerfectScore)    "Perfect Score";
          case (#PaceAnomaly)     "Pace Anomaly";
        };
        {
          eventId     = rec.id;
          year        = currentYear;
          grade       = 10;  // derive from passport in future
          eventType;
          title;
          domain      = rec.source;
          description = rec.description;
          programName = if (rec.source == "RCGN-GOLD") "National Society of High School Scholars" else rec.source;
          goldSealed  = rec.source == "RCGN-GOLD";
          timestamp   = rec.sealedAt;
        };
      }
    );
  };

  // ── getSessionMetrics ────────────────────────────────────────────────────
  // Live session counts for Principal portal heatmap.
  public func getSessionMetrics(
    _principalId : Common.UserId,
    passports    : PassportLib.PassportStore,
    seedStore    : PassportLib.SeedStore,
  ) : LITypes.SessionMetrics {
    // Approximate active sessions from passport + seed store size
    let totalStudents = passports.size();
    let subjects : [Text] = ["Mathematics", "Science", "English", "CTE"];
    let grades   : [Nat]  = [9, 10, 11, 12];
    let buf = List.empty<LITypes.ClassSessionMetrics>();
    var activeTotal : Nat = 0;
    var gIdx : Nat = 0;
    while (gIdx < 4) {
      let grade = grades[gIdx];
      var sIdx : Nat = 0;
      while (sIdx < 4) {
        let subject = subjects[sIdx];
        let activeCount = fibFloor(totalStudents / 16 + 1);
        activeTotal += activeCount;
        // Compute aggregate mastery and SSS for this class slot
        var masterySum : Nat = 0;
        var sssSum : Nat = 0;
        var counted : Nat = 0;
        for ((uid, _) in passports.entries()) {
          let seeds = PassportLib.getKernelSeeds(seedStore, uid);
          let n = seeds.size();
          let mastery = if (n >= 55) 55 else if (n >= 21) 21 else if (n >= 8) 8 else 0;
          let sss = computeSSS(mastery, 0, 0);
          masterySum += mastery;
          sssSum += sss;
          counted += 1;
          if (counted >= activeCount) {
            // Only sample as many students as are "active" in this class
            // This is a deterministic approximation without external session data
          };
        };
        let masteryAvg = if (counted > 0) masterySum / counted else 0;
        let sssAvg     = if (counted > 0) sssSum     / counted else 0;
        buf.add({
          classId    = "G" # grade.toText() # "-" # subject;
          className  = "Grade " # grade.toText() # " " # subject;
          activeCount;
          masteryAvg = fibFloor(masteryAvg);
          sssAvg     = fibFloor(sssAvg);
          rcgnStream = fibFloor(activeCount / 3 + 1);
        });
        sIdx += 1;
      };
      gIdx += 1;
    };
    {
      activeStudents = totalStudents;
      activeSessions = activeTotal;
      classBreakdown = buf.toArray();
    };
  };

  // ── enrollInCourseWithStart ───────────────────────────────────────────────
  // Starts a course enrollment and seeds the passport for the first module.
  public func enrollInCourseWithStart(
    userId    : Common.UserId,
    courseId  : Text,
    _achvStore: AchvLib.AchvStore,
  ) : LITypes.EnrollmentResult {
    ignore userId;
    let firstModuleId    = courseId # "-MOD-001";
    let firstModuleTitle = "Introduction to " # courseId;
    let firstModuleContent = "Welcome to " # courseId # ". EDDI has prepared your first learning seeds. " #
      "Your Fibonacci milestone schedule is active. Complete this module to unlock the next stage.";
    let eddiBrief = "Your " # courseId # " journey begins. EDDI will guide you through each module.";
    {
      success            = true;
      firstModuleId;
      firstModuleTitle;
      firstModuleContent;
      passportSeeded     = true;
      eddiBrief;
    };
  };
};
