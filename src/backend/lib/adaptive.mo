import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Common "../types/common";
import SessionTypes "../types/sessions";
import Types "../types/adaptive";

module {
  // 10 minutes in nanoseconds
  let TEN_MINUTES_NS : Int = 600_000_000_000;

  /// Analyze quiz history for a student+subject and return a sovereign adaptive suggestion.
  /// Pure deterministic logic — no external dependencies.
  public func getAdaptiveSuggestion(
    results : Map.Map<Common.UserId, List.List<SessionTypes.QuizResult>>,
    student : Common.UserId,
    subjectId : Text,
  ) : Types.AdaptiveSuggestion {
    let allResults = switch (results.get(student)) {
      case null { return { action = #continue_; message = "Keep going — you're making solid progress." } };
      case (?list) list.toArray();
    };

    // Filter results for the given subject (topicId starts with subjectId)
    let subjectResults = allResults.filter(func(r : SessionTypes.QuizResult) : Bool {
      r.topicId.startsWith(#text subjectId)
    });

    if (subjectResults.size() == 0) {
      return { action = #continue_; message = "Keep going — you're making solid progress." };
    };

    // Compute average score percentage
    var totalScore : Nat = 0;
    for (r in subjectResults.vals()) {
      totalScore += if (r.totalQuestions == 0) 0 else (r.score * 100) / r.totalQuestions;
    };
    let avgScore = totalScore / subjectResults.size();

    // Check last session timestamp for quiz-now trigger
    let lastResult = subjectResults[subjectResults.size() - 1];
    let now = Time.now();
    let timeSinceLast = now - lastResult.timestamp;

    // Adaptive routing — sovereign deterministic rules
    if (avgScore < 70) {
      {
        action = #remedialReview;
        message = "Let's review this topic — you've got the right foundation, just need more practice.";
      };
    } else if (avgScore > 85 and subjectResults.size() >= 2) {
      {
        action = #advance;
        message = "You're ahead of the curve — ready for the next level?";
      };
    } else if (timeSinceLast > TEN_MINUTES_NS) {
      {
        action = #quizNow;
        message = "Great studying — ready to test what you've learned?";
      };
    } else {
      {
        action = #continue_;
        message = "Keep going — you're making solid progress.";
      };
    };
  };
  /// PHI-confidence-gated adaptive workflow — full v2.
  /// Returns the next action, suggested topics, and PHI confidence score.
  public func getAdaptiveWorkflow(
    results    : Map.Map<Common.UserId, List.List<SessionTypes.QuizResult>>,
    student    : Common.UserId,
    subjectId  : Text,
    _gradeLevel : Text,
  ) : Types.AdaptiveWorkflow {
    let PHI_INV : Float = 0.6180339887;
    // Collect subject results
    let allResults = switch (results.get(student)) {
      case null { [] };
      case (?list) list.toArray();
    };
    let subjectResults = allResults.filter(func(r : SessionTypes.QuizResult) : Bool {
      r.topicId.startsWith(#text subjectId)
    });

    if (subjectResults.size() == 0) {
      return {
        nextAction       = #continue_;
        reasonPhrase     = "Start your first session — you're about to begin building real mastery.";
        suggestedTopics  = [subjectId # "-1", subjectId # "-2", subjectId # "-3"];
        phiConfidence    = 0.0;
        fibDifficultyLevel = 1;
      };
    };

    // Count correct vs wrong
    var correct : Nat = 0;
    var wrong   : Nat = 0;
    for (r in subjectResults.vals()) {
      correct += r.score;
      wrong   += if (r.totalQuestions > r.score) r.totalQuestions - r.score else 0;
    };
    // PHI-confidence: correct / (correct + wrong + PHI_INV)
    let phiConf : Float = correct.toFloat() / (correct.toFloat() + wrong.toFloat() + PHI_INV);

    // Fibonacci difficulty level: clamp to 1-6
    let fibDiff : Nat = if (phiConf >= 0.9) 6
      else if (phiConf >= 0.75) 5
      else if (phiConf >= 0.618) 4
      else if (phiConf >= 0.5) 3
      else if (phiConf >= 0.3) 2
      else 1;

    // Average score %
    var totalScore : Nat = 0;
    for (r in subjectResults.vals()) {
      totalScore += if (r.totalQuestions == 0) 0 else (r.score * 100) / r.totalQuestions;
    };
    let avgScore = totalScore / subjectResults.size();

    // Decision: only advance if confidence >= PHI_INV
    if (avgScore < 70 or phiConf < PHI_INV) {
      {
        nextAction       = #remedialReview;
        reasonPhrase     = "Strengthening the foundation — your PHI confidence is building toward mastery.";
        suggestedTopics  = [subjectId # "-1", subjectId # "-2"];
        phiConfidence    = phiConf;
        fibDifficultyLevel = fibDiff;
      };
    } else if (avgScore > 85 and phiConf >= PHI_INV and subjectResults.size() >= 2) {
      {
        nextAction       = #advance;
        reasonPhrase     = "PHI confidence reached — ready for the next sovereign level.";
        suggestedTopics  = [subjectId # "-3", subjectId # "-4", subjectId # "-5"];
        phiConfidence    = phiConf;
        fibDifficultyLevel = fibDiff;
      };
    } else {
      {
        nextAction       = #continue_;
        reasonPhrase     = "Golden ratio zone — keep the momentum, you're building compound mastery.";
        suggestedTopics  = [subjectId # "-2", subjectId # "-3"];
        phiConfidence    = phiConf;
        fibDifficultyLevel = fibDiff;
      };
    };
  };
};
