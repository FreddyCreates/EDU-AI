import AdaptiveLib "../lib/adaptive";
import SessionsLib "../lib/sessions";
import AdaptiveTypes "../types/adaptive";

mixin (
  results : SessionsLib.ResultStore,
) {
  public query ({ caller }) func getAdaptiveSuggestion(
    subjectId : Text,
  ) : async AdaptiveTypes.AdaptiveSuggestion {
    AdaptiveLib.getAdaptiveSuggestion(results, caller, subjectId);
  };

  public query ({ caller }) func getAdaptiveWorkflow(
    subjectId  : Text,
    gradeLevel : Text,
  ) : async AdaptiveTypes.AdaptiveWorkflow {
    AdaptiveLib.getAdaptiveWorkflow(results, caller, subjectId, gradeLevel);
  };
};
