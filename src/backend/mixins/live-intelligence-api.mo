// LIVE INTELLIGENCE API MIXIN — Sovereign Data Bus
// LEX_SOVEREIGNUS: All intelligence native. No external calls.
// LEX_FIBONACCI_FLOOR: All values Fibonacci-floored.
//
// Exposes:
//   getLiveIntelligenceState(studentId)  — sovereign data bus endpoint
//   computeStudentState(studentId)       — same but caller-scoped
//   recognizeStudent(studentId, subject, score) — RCGN + ACHV pipeline
//   getStudentRcgnThreshold(studentId)   — RCGN_T query
//   getRecognitionTimeline(studentId)    — K-12 achievement timeline
//   getVisionWithFundingTracker()        — vision document + funding targets
//   getPrincipalHeatmapWithNoms()        — heatmap + NOMS overlay

import Time    "mo:core/Time";
import Common  "../types/common";
import LITypes "../types/live-intelligence";
import LILib   "../lib/live-intelligence";
import RcgnLib "../lib/rcgn";
import NomsLib "../lib/noms";
import AchvLib "../lib/achv";
import PassportLib "../lib/passport";
import SessionsLib "../lib/sessions";
import List    "mo:core/List";
import Map     "mo:core/Map";
import SessionTypes "../types/sessions";

mixin (
  passports    : PassportLib.PassportStore,
  seedStore    : PassportLib.SeedStore,
  resultsStore : Map.Map<Common.UserId, List.List<SessionTypes.QuizResult>>,
  rcgnStore    : RcgnLib.RcgnStore,
  nomStore     : NomsLib.NomStore,
  achvStore    : AchvLib.AchvStore,
) {

  // ── getLiveIntelligenceState ───────────────────────────────────────────────
  // Sovereign data bus endpoint — every frontend page polls this.
  // sssPrev defaults to 0 (first-call assumption).
  public query func getLiveIntelligenceState(
    studentId : Common.UserId,
  ) : async LITypes.LiveIntelligenceState {
    LILib.computeStudentState(
      passports, seedStore, resultsStore, achvStore, studentId, 0
    );
  };

  // ── computeStudentState (caller-scoped) ────────────────────────────────────
  // Caller queries their own state without specifying studentId.
  public query ({ caller }) func computeStudentState(
    sssPrev : Nat,
  ) : async LITypes.LiveIntelligenceState {
    LILib.computeStudentState(
      passports, seedStore, resultsStore, achvStore, caller, sssPrev
    );
  };

  // ── getStudentRcgnThreshold ────────────────────────────────────────────────
  public query func getStudentRcgnThreshold(
    studentId : Common.UserId,
  ) : async Nat {
    LILib.getStudentRcgnThreshold(rcgnStore, passports, seedStore, studentId);
  };

  // ── recognizeStudent ──────────────────────────────────────────────────────
  // Full RCGN → ACHV pipeline. Creates flags and seals gold achievements.
  public shared func recognizeStudent(
    studentId : Common.UserId,
    subject   : Text,
    score     : Nat,
  ) : async { rcgnT : Nat; isGold : Bool; flagCreated : Bool } {
    LILib.recognizeStudentLogic(
      rcgnStore, achvStore, studentId, subject, score, Time.now()
    );
  };

  // ── getRecognitionTimeline ────────────────────────────────────────────────
  // Powers the K-12 recognition timeline page.
  public query func getRecognitionTimeline(
    studentId : Common.UserId,
  ) : async [LITypes.RecognitionTimelineEntry] {
    LILib.getRecognitionTimeline(passports, seedStore, achvStore, studentId);
  };

  // ── getVisionWithFundingTracker ────────────────────────────────────────────
  // Vision document + live stats + funding tracker for landing page + admin.
  public query func getVisionWithFundingTracker() : async LITypes.VisionWithFunding {
    LILib.getVisionWithFunding(rcgnStore, nomStore, achvStore, passports);
  };

  // ── getPrincipalHeatmapWithNoms ───────────────────────────────────────────
  // Principal portal: class heatmap + pending NOMS + hot-zone achievements.
  public query func getPrincipalHeatmapWithNoms() : async [LITypes.HeatmapWithNoms] {
    LILib.getPrincipalHeatmapWithNoms(resultsStore, nomStore, achvStore);
  };

  // ── getPassportInsight ────────────────────────────────────────────────────
  // EDDI orb narration: seed counts by zone, SSS, brief for passport page.
  public query func getPassportInsight(
    studentId : Common.UserId,
  ) : async LITypes.PassportInsight {
    LILib.getPassportInsight(studentId, passports, seedStore);
  };

  // ── computeIAS ────────────────────────────────────────────────────────────
  // Interface Adaptation Score — drives layout state selection.
  public query func computeIAS(
    sssScore : Nat,
    cohScore : Nat,
  ) : async LITypes.IasResult {
    LILib.computeIASResult(sssScore, cohScore);
  };

  // ── getRcgnAlerts ─────────────────────────────────────────────────────────
  // Teacher portal: alerts for students crossing RCGN_T >= F(10)=55.
  public query ({ caller }) func getRcgnAlerts() : async [LITypes.RcgnAlert] {
    LILib.getRcgnAlerts(caller, rcgnStore, passports);
  };

  // ── getPrcpNarrative ──────────────────────────────────────────────────────
  // Principal portal: plain-language class intelligence summaries.
  public query ({ caller }) func getPrcpNarrative() : async [LITypes.PrcpNarrativeEntry] {
    LILib.getPrcpNarrative(caller, passports, seedStore);
  };

  // ── getAchievementTimeline ────────────────────────────────────────────────
  // K-12 chronological achievement timeline for a student.
  public query func getAchievementTimeline(
    studentId : Common.UserId,
  ) : async [LITypes.AchievementTimelineEntry] {
    LILib.getAchievementTimeline(studentId, achvStore);
  };

  // ── getSessionMetrics ─────────────────────────────────────────────────────
  // Principal portal: live session counts grouped by class.
  public query ({ caller }) func getSessionMetrics() : async LITypes.SessionMetrics {
    LILib.getSessionMetrics(caller, passports, seedStore);
  };

  // ── enrollInCourseWithStart ───────────────────────────────────────────────
  // Starts a course: seeds passport, returns first module to open immediately.
  public shared ({ caller }) func enrollInCourseWithStart(
    courseId : Text,
  ) : async LITypes.EnrollmentResult {
    LILib.enrollInCourseWithStart(caller, courseId, achvStore);
  };
};
