import FeedbackAILib "../lib/feedbackai";
import FeedbackTypes "../types/feedback";
import Time "mo:core/Time";

mixin (
  feedbackStore : FeedbackAILib.FeedbackStore,
) {
  /// Submit a feedback event. EDDI processes and attempts self-correction.
  /// severity: "INFO" | "WARNING" | "BUG" | "CRITICAL"
  /// Returns the generated event ID.
  public shared ({ caller }) func submitFeedback(
    message  : Text,
    severity : Text,
  ) : async Text {
    FeedbackAILib.submitFeedback(feedbackStore, caller, message, severity, Time.now());
  };

  /// Return all feedback events — IT portal only.
  public query func getFeedbackEvents() : async [FeedbackTypes.FeedbackEvent] {
    FeedbackAILib.getFeedbackEvents(feedbackStore);
  };

  /// Return feedback events submitted by the caller.
  public query ({ caller }) func getMyFeedback() : async [FeedbackTypes.FeedbackEvent] {
    FeedbackAILib.getMyFeedback(feedbackStore, caller);
  };

  /// Mark a feedback event as resolved. Returns true on success.
  public shared func resolveFeedback(eventId : Text) : async Bool {
    FeedbackAILib.resolveFeedback(feedbackStore, eventId, Time.now());
  };
};
