// Feedback event types for the sovereign self-healing Feedback AI
import Common "common";

module {
  /// A feedback event submitted by any user and processed by the EDDI feedback chain.
  public type FeedbackEvent = {
    id                    : Text;
    userId                : Common.UserId;
    message               : Text;
    severity              : Text;  // INFO | WARNING | BUG | CRITICAL
    eddiResponse          : Text;  // EDDI reasoning chain output
    selfCorrectionAttempts : Nat;  // 0, 1, or 2 before escalation to IT portal
    resolved              : Bool;
    createdAt             : Int;
    resolvedAt            : ?Int;
    itEscalated           : Bool;
    proposedFix           : ?Text;
  };
};
