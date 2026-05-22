// Feedback Loop lib — formative assessment cycle: attempt → EDDI gap analysis → re-attempt.
// Loops close as #mastered when pctCorrect >= masteryTarget.
// Loops escalate when maxAttempts exhausted without mastery.
import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Common "../types/common";
import Types "../types/feedbackloop";

module {
  public type LoopStore = Map.Map<Text, Types.FeedbackLoop>;

  public func newLoopStore() : LoopStore { Map.empty() };

  // ── EDDI gap analysis — COGT+META+AUTN sovereign chain ───────────────────
  func _buildGapAnalysis(topicId : Text, pct : Nat, attemptNum : Nat) : Text {
    let cogt = "COGT path: Score " # pct.toText() # "% on attempt " # attemptNum.toText() # " for topic [" # topicId # "]. Parsing performance signal against expected mastery trajectory.";
    let meta =
      if (pct < 50) {
        "META path: Below foundational threshold (50%). Pattern match: foundational concept gap detected. Cross-referencing with scaffold frame for [" # topicId # "]. Mapping to prerequisite knowledge nodes."
      } else if (pct < 80) {
        "META path: Approaching mastery threshold (80%). Pattern match: procedural accuracy gap. Student understands the concept but is making execution errors. Identifying specific question types with lowest accuracy."
      } else {
        "META path: Mastery threshold met. Performance signal consistent with deep encoding. Confirming no fluency gaps before closing loop."
      };
    let autn =
      if (pct < 50) {
        "AUTN novel path: Activate scaffold support — begin with Tier 1 hint for [" # topicId # "]. Reduce problem complexity by one Fibonacci level. Require worked-example review before next attempt."
      } else if (pct < 70) {
        "AUTN novel path: Target mid-band gaps — identify the 2-3 question types with lowest accuracy. Practice those question types in isolation. Use Think-Pair-Share protocol to verbalize reasoning."
      } else if (pct < 80) {
        "AUTN novel path: Near-mastery refinement — focus on careless errors and time management. Try one more timed attempt. Fibonacci Sprint Review (5-minute) before re-attempting."
      } else {
        "AUTN novel path: Mastery confirmed. Recommend advancing to next Fibonacci difficulty level. Flag for passport mastery seal on topic [" # topicId # "]."
      };
    cogt # " | " # meta # " | " # autn;
  };

  func _buildCoachNote(pct : Nat, attemptNum : Nat) : Text {
    if (pct >= 80) {
      "Outstanding — you've reached mastery on this topic. Your score of " # pct.toText() # "% clears the mastery threshold. Move forward with confidence."
    } else if (pct >= 70) {
      "Almost there — " # pct.toText() # "% on attempt " # attemptNum.toText() # ". You're in the near-mastery zone. Focus on the question types you missed. One more targeted attempt will get you there."
    } else if (pct >= 50) {
      "Building momentum — " # pct.toText() # "% on attempt " # attemptNum.toText() # ". Review the worked examples in your scaffold frame. Try Think-Pair-Share with a classmate on the concepts you missed before attempting again."
    } else {
      "Let's rebuild the foundation — " # pct.toText() # "% on attempt " # attemptNum.toText() # ". Open your scaffold frame and work through all three hint tiers before your next attempt. Take your time — mastery compounds."
    };
  };

  func _makeLoopId(caller : Common.UserId, topicId : Text, now : Common.Timestamp) : Text {
    let p = Text.fromIter(caller.toText().toIter().take(8));
    let t = Text.fromIter(topicId.toIter().take(10));
    "LOOP-" # p # "-" # t # "-" # Int.abs(now).toText();
  };

  // ── Public API ─────────────────────────────────────────────────────────────

  /// Open a new feedback loop for a student on a topic.
  /// masteryTarget: pct threshold to close as #mastered (recommended: 80).
  /// maxAttempts: loop escalates after this many attempts (Fibonacci: default 5).
  /// Returns the loop ID.
  public func openLoop(
    store         : LoopStore,
    caller        : Common.UserId,
    topicId       : Text,
    masteryTarget : Nat,
    maxAttempts   : Nat,
    now           : Common.Timestamp,
  ) : Text {
    let id = _makeLoopId(caller, topicId, now);
    let loop : Types.FeedbackLoop = {
      id             = id;
      studentId      = caller;
      topicId        = topicId;
      status         = #open;
      attempts       = [];
      masteryTarget  = if (masteryTarget == 0) 80 else masteryTarget;
      currentMastery = 0;
      maxAttempts    = if (maxAttempts == 0) 5 else maxAttempts;
      createdAt      = now;
      closedAt       = null;
    };
    store.add(id, loop);
    id;
  };

  /// Record a new attempt on an open feedback loop.
  /// Returns true if mastery achieved (loop closes as #mastered).
  /// Returns false on progress or escalation.
  public func recordAttempt(
    store          : LoopStore,
    caller         : Common.UserId,
    loopId         : Text,
    score          : Nat,
    totalQuestions : Nat,
    now            : Common.Timestamp,
  ) : Bool {
    switch (store.get(loopId)) {
      case null false;
      case (?loop) {
        if (loop.studentId != caller) return false;
        switch (loop.status) {
          case (#mastered or #escalated) return false;
          case (#open) {
            let pct : Nat = if (totalQuestions == 0) 0 else (score * 100) / totalQuestions;
            let attemptNum = loop.attempts.size() + 1;
            let record : Types.AttemptRecord = {
              attemptNum       = attemptNum;
              score            = score;
              totalQuestions   = totalQuestions;
              pctCorrect       = pct;
              eddiGapAnalysis  = _buildGapAnalysis(loop.topicId, pct, attemptNum);
              eddiCoachNote    = _buildCoachNote(pct, attemptNum);
              timestamp        = now;
            };
            let newAttempts = Array.tabulate(
              loop.attempts.size() + 1,
              func(i) {
                if (i < loop.attempts.size()) loop.attempts[i] else record
              },
            );
            let mastered = pct >= loop.masteryTarget;
            let exhausted = attemptNum >= loop.maxAttempts and not mastered;
            let newStatus : Types.LoopStatus =
              if (mastered) #mastered
              else if (exhausted) #escalated
              else #open;
            let updated : Types.FeedbackLoop = {
              loop with
              attempts       = newAttempts;
              currentMastery = pct;
              status         = newStatus;
              closedAt       = if (mastered or exhausted) ?now else null;
            };
            store.add(loopId, updated);
            mastered;
          };
        };
      };
    };
  };

  /// Return all feedback loops belonging to the caller.
  public func getMyLoops(
    store  : LoopStore,
    caller : Common.UserId,
  ) : [Types.FeedbackLoop] {
    let buf = List.empty<Types.FeedbackLoop>();
    for ((_id, loop) in store.entries()) {
      if (loop.studentId == caller) { buf.add(loop) };
    };
    buf.toArray();
  };

  /// Return a single feedback loop by ID (caller must own it).
  public func getLoop(
    store  : LoopStore,
    caller : Common.UserId,
    loopId : Text,
  ) : ?Types.FeedbackLoop {
    switch (store.get(loopId)) {
      case null null;
      case (?loop) {
        if (loop.studentId == caller) ?loop else null;
      };
    };
  };

  /// Return all open loops for a student (for teacher portal view).
  public func getOpenLoopsForStudent(
    store     : LoopStore,
    studentId : Common.UserId,
  ) : [Types.FeedbackLoop] {
    let buf = List.empty<Types.FeedbackLoop>();
    for ((_id, loop) in store.entries()) {
      switch (loop.status) {
        case (#open) {
          if (loop.studentId == studentId) { buf.add(loop) };
        };
        case _ {};
      };
    };
    buf.toArray();
  };
};
