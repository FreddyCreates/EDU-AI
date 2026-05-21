module {
  public type QuizType = { #multipleChoice; #freeResponse };

  public type QuizResult = {
    topicId : Text;
    agentId : Text;
    score : Nat;
    totalQuestions : Nat;
    timestamp : Int;
    quizType : QuizType;
  };

  public type SessionMode = { #workNight; #freeAfternoon };

  public type SessionSchedule = {
    mode            : SessionMode;
    intervalMinutes : Nat;
    missedCount     : Nat;
    nextReviewAt    : Int;
    compressRatio   : Float;
  };
};
