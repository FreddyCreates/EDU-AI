// DEEP KERNEL API — Exposes EDDI's internal formula engine to the canister surface.
// All calls are query-only (pure computation, no state mutation).
// Requires no additional stable state — the kernel is stateless formula computation.

import DeepKernelLib "../lib/deep-kernel";
import Array "mo:core/Array";

mixin () {

  /// Returns the deep kernel status: version, PHI constant, Fibonacci sequence,
  /// engine count, and formula count.
  public query func getDeepKernelStatus() : async DeepKernelLib.KernelStatus {
    DeepKernelLib.STATUS;
  };

  /// Computes a PHI-weighted mastery score from hot/warm/cold seed counts.
  /// Returns 0–100.
  public query func computePhiMasteryScore(
    hotSeeds  : Nat,
    warmSeeds : Nat,
    coldSeeds : Nat,
  ) : async Nat {
    DeepKernelLib.phiMasteryScore({ hotSeeds; warmSeeds; coldSeeds });
  };

  /// Computes a compound knowledge score across multiple subjects.
  /// Each entry is (subject label, score 0–100).
  /// Returns a PHI-weighted aggregate 0–100.
  public query func computeCompoundKnowledgeScore(
    scores : [(Text, Nat)],
  ) : async Nat {
    let subjects : [DeepKernelLib.SubjectScore] =
      Array.map<(Text, Nat), DeepKernelLib.SubjectScore>(
        scores,
        func(pair) { { subject = pair.0; score = pair.1 } },
      );
    DeepKernelLib.compoundKnowledgeScore(subjects);
  };

  /// Returns the recommended next study interval (hours) given the number
  /// of sessions already completed. Uses Fibonacci spacing.
  public query func nextStudyInterval(sessionsCompleted : Nat) : async Nat {
    DeepKernelLib.nextStudyIntervalHours(sessionsCompleted);
  };

  /// Returns the optimal 5-step sovereign learning pathway for a student
  /// given their current mastery score, grade, subject, and hot seed count.
  public query func computeLearningPathway(
    currentScore : Nat,
    grade        : Text,
    subject      : Text,
    hotSeeds     : Nat,
  ) : async DeepKernelLib.LearningPathway {
    DeepKernelLib.computeLearningPathway(currentScore, grade, subject, hotSeeds);
  };

  /// Routes a message to the best-matching internal engine using the
  /// domain routing formula. Returns the engine name.
  public query func routeMessageToEngine(message : Text) : async Text {
    DeepKernelLib.routeToEngine(message);
  };

  /// Computes a PHI blend of two scores (primary φ-weighted, secondary φ⁻¹-weighted).
  public query func phiBlendScores(primary : Nat, secondary : Nat) : async Nat {
    DeepKernelLib.phiBlend(primary, secondary);
  };

  /// Returns the Fibonacci floor for a given natural number.
  public query func fibFloor(n : Nat) : async Nat {
    DeepKernelLib.fibFloor(n);
  };

  /// Returns the field zone label for a given field health score.
  public query func fieldZoneLabel(fieldScore : Nat) : async Text {
    DeepKernelLib.fieldZoneLabel(DeepKernelLib.fieldZone(fieldScore));
  };
};
