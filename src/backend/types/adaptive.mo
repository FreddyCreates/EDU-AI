module {
  /// Actions the adaptive engine can suggest to a student.
  /// #continue_ uses trailing underscore because 'continue' is a reserved word.
  public type SuggestionAction = {
    #remedialReview;
    #advance;
    #quizNow;
    #continue_;
  };

  public type AdaptiveSuggestion = {
    action : SuggestionAction;
    message : Text;
  };

  public type AdaptiveAction = {
    #remedialReview;
    #advance;
    #continue_;
    #quizNow;
  };

  public type AdaptiveWorkflow = {
    nextAction : AdaptiveAction;
    reasonPhrase : Text;
    suggestedTopics : [Text];
    phiConfidence : Float;
    fibDifficultyLevel : Nat;
  };
};
