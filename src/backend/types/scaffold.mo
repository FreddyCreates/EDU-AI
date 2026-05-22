// Scaffold types — graduated ZPD (Zone of Proximal Development) support
import Common "common";

module {
  /// Three tiers of hints: gentle prompt → guided question → explicit walkthrough
  public type HintTier = { #tier1; #tier2; #tier3 };

  public type ScaffoldHint = {
    tier : HintTier;
    text : Text;
  };

  /// A scaffold frame is the full set of support materials for a topic.
  public type ScaffoldFrame = {
    topicId       : Text;
    concept       : Text;
    hints         : [ScaffoldHint];
    workedExample : Text;
    visualCue     : Text;
  };

  /// A scaffold session tracks a student consuming scaffold support for one topic.
  public type ScaffoldSession = {
    id            : Text;
    studentId     : Common.UserId;
    topicId       : Text;
    hintsConsumed : Nat;             // 0–3; increments with each requestHint call
    masteryBefore : Nat;             // 0–100 snapshot at session start
    masteryAfter  : Nat;             // 0–100; set when session is closed
    createdAt     : Common.Timestamp;
    closedAt      : ?Common.Timestamp;
    resolved      : Bool;
  };
};
