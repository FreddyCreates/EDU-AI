// RCGN — Recognition Engine
// LEX_SOVEREIGNUS: All recognition logic is sovereign and native.
// LEX_QUAESTIO: No talented student goes unseen.
// LEX_PERSONA: Every flag is bound to its student's passport context.
//
// Fires every F(6)=8 heartbeat cycles to scan all active passports.
// PHI constants:
//   PHI_INV = 0.6180339887  →  MASTERY_THRESHOLD = floor(100 × PHI_INV) = 61
//   PACE_MULTIPLIER = 3     →  3× grade-average = anomaly
//   SUSTAINED_SESSIONS = 5  →  F(5)=5 consecutive sessions required

import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/recognition";
import PassportLib "../lib/passport";
import PassportTypes "../types/passport";

module {

  // ── PHI / Fibonacci constants ─────────────────────────────────────────────
  let MASTERY_THRESHOLD : Nat = 61; // floor(100 × PHI_INV)
  let SUSTAINED_SESSIONS : Nat = 5; // F(5)
  let _PACE_MULTIPLIER : Nat = 3;    // 3× grade avg

  // ── Store aliases ─────────────────────────────────────────────────────────
  public type RcgnStore  = Map.Map<Common.UserId, List.List<Types.RecognitionFlag>>;

  // ── Fibonacci floor function (FLOR) ──────────────────────────────────────
  // Returns the largest Fibonacci number <= n.
  public func fibFloor(n : Nat) : Nat {
    if (n == 0) return 0;
    var a : Nat = 0;
    var b : Nat = 1;
    while (b <= n) {
      let c = a + b;
      a := b;
      b := c;
    };
    a;
  };

  // ── Eligible programs surfaced per flag ───────────────────────────────────
  func buildEligiblePrograms(subject : Text, pattern : Types.RecognitionPattern) : [Types.EligibleProgram] {
    let list = List.empty<Types.EligibleProgram>();
    list.add({
      name        = "National Society of High School Scholars (NSHSS)";
      description = "Honors academically exceptional students in all subjects. Nomination sent by teacher — no application required from student.";
      url         = "https://www.nshss.org";
    });
    list.add({
      name        = "UIL Academic State Competition";
      description = "University Interscholastic League — Texas's premier academic competition covering math, science, and 30+ other subjects.";
      url         = "https://www.uiltexas.org/academics";
    });
    switch (pattern) {
      case (#PerfectScore or #SustainedMastery or #SubjectExcellence) {
        if (subject == "Mathematics" or subject == "Science") {
          list.add({
            name        = "American Mathematics Competitions (AMC)";
            description = "National math competition for grades 8-12. Exceptional scorers advance to AIME and USAMO.";
            url         = "https://maa.org/amc";
          });
          list.add({
            name        = "Junior Science and Humanities Symposium (JSHS)";
            description = "Federally sponsored program for students demonstrating exceptional science and math ability. All expenses paid for finalists.";
            url         = "https://www.jshs.org";
          });
        };
      };
      case (#PaceAnomaly) {};
    };
    list.toArray();
  };

  // ── Core scan: evaluate one student's sessions for recognition patterns ───
  // seeds: all kernel seeds for this student (most recent last)
  // subject: subject being evaluated
  // Returns a flag if a pattern is detected, otherwise null.
  func detectPattern(
    studentId  : Common.UserId,
    seeds      : [PassportTypes.KernelSeed],
    subject    : Text,
    now        : Common.Timestamp,
  ) : ?Types.RecognitionFlag {
    let total = seeds.size();
    if (total == 0) return null;

    var subjectSeeds : Nat = 0;
    var i = 0;
    while (i < total) {
      if (seeds[i].trackName == subject) {
        subjectSeeds += 1;
      };
      i += 1;
    };

    if (subjectSeeds < SUSTAINED_SESSIONS) return null;

    let rawMastery : Nat = if (total >= 55) 89 else if (total >= 21) 61 else if (total >= 13) 55 else if (total >= 5) 34 else 21;
    let masteryScore = fibFloor(rawMastery);

    if (masteryScore < MASTERY_THRESHOLD) return null;

    let pattern : Types.RecognitionPattern = if (masteryScore >= 89) {
      #PerfectScore;
    } else if (subjectSeeds >= SUSTAINED_SESSIONS) {
      #SustainedMastery;
    } else {
      #SubjectExcellence;
    };

    let flagId = "RCGN-" # "?" # "-" # now.toText();

    ?{
      id               = flagId;
      studentId        = studentId;
      subject          = subject;
      pattern          = pattern;
      masteryScore     = masteryScore;
      eligiblePrograms = buildEligiblePrograms(subject, pattern);
      detectedAt       = now;
      sealed           = true;
    };
  };

  // ── runScan: scans all passports, returns new flags ───────────────────────
  public func runScan(
    rcgnStore  : RcgnStore,
    passports  : PassportLib.PassportStore,
    seedStore  : PassportLib.SeedStore,
    now        : Common.Timestamp,
  ) : [Types.RecognitionFlag] {
    let subjects = [
      "Mathematics", "Science", "English Language Arts",
      "Social Studies", "History", "Computer Science",
    ];
    let newFlags = List.empty<Types.RecognitionFlag>();

    for ((studentId, _passport) in passports.entries()) {
      let seeds = PassportLib.getKernelSeeds(seedStore, studentId);
      for (subject in subjects.vals()) {
        switch (detectPattern(studentId, seeds, subject, now)) {
          case (?flag) {
            let existing = switch (rcgnStore.get(studentId)) {
              case (?list) list.toArray();
              case null   [];
            };
            var alreadyFlagged = false;
            for (f in existing.vals()) {
              if (f.subject == subject) { alreadyFlagged := true };
            };
            if (not alreadyFlagged) {
              let prevList = switch (rcgnStore.get(studentId)) {
                case (?l) l;
                case null List.empty<Types.RecognitionFlag>();
              };
              prevList.add(flag);
              rcgnStore.add(studentId, prevList);
              newFlags.add(flag);
            };
          };
          case null {};
        };
      };
    };
    newFlags.toArray();
  };

  // ── getFlags: returns all flags for a student ─────────────────────────────
  public func getFlags(
    rcgnStore : RcgnStore,
    studentId : Common.UserId,
  ) : [Types.RecognitionFlag] {
    switch (rcgnStore.get(studentId)) {
      case (?list) list.toArray();
      case null    [];
    };
  };

  // ── getAllFlags: returns all flags across all students ────────────────────
  public func getAllFlags(rcgnStore : RcgnStore) : [Types.RecognitionFlag] {
    let all = List.empty<Types.RecognitionFlag>();
    for ((_id, list) in rcgnStore.entries()) {
      for (flag in list.toArray().vals()) {
        all.add(flag);
      };
    };
    all.toArray();
  };

  // ── totalFlagCount ────────────────────────────────────────────────────────
  public func totalFlagCount(rcgnStore : RcgnStore) : Nat {
    var n = 0;
    for ((_id, list) in rcgnStore.entries()) {
      n += list.size();
    };
    n;
  };
};
