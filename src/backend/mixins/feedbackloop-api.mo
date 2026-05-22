import FeedbackLoopLib "../lib/feedbackloop";
import FeedbackLoopTypes "../types/feedbackloop";
import Time "mo:core/Time";

mixin (
  loopStore : FeedbackLoopLib.LoopStore,
) {
  /// Open a new feedback loop for the caller on a topic.
  /// masteryTarget: pct correct to close as mastered (0 → defaults to 80).
  /// maxAttempts: loop escalates after this count (0 → defaults to 5).
  /// Returns the loop ID.
  public shared ({ caller }) func openFeedbackLoop(
    topicId       : Text,
    masteryTarget : Nat,
    maxAttempts   : Nat,
  ) : async Text {
    FeedbackLoopLib.openLoop(loopStore, caller, topicId, masteryTarget, maxAttempts, Time.now());
  };

  /// Record an attempt on an open feedback loop.
  /// EDDI generates gap analysis and coach notes for the attempt.
  /// Returns true if mastery is achieved (loop closed), false otherwise.
  public shared ({ caller }) func recordFeedbackLoopAttempt(
    loopId         : Text,
    score          : Nat,
    totalQuestions : Nat,
  ) : async Bool {
    FeedbackLoopLib.recordAttempt(loopStore, caller, loopId, score, totalQuestions, Time.now());
  };

  /// Return all feedback loops belonging to the caller.
  public query ({ caller }) func getMyFeedbackLoops() : async [FeedbackLoopTypes.FeedbackLoop] {
    FeedbackLoopLib.getMyLoops(loopStore, caller);
  };

  /// Return a single feedback loop by ID (caller must own it).
  public query ({ caller }) func getFeedbackLoop(
    loopId : Text,
  ) : async ?FeedbackLoopTypes.FeedbackLoop {
    FeedbackLoopLib.getLoop(loopStore, caller, loopId);
  };
};
