module {
  public type MLTVQuery = {
    id        : Text;
    queryText : Text;
    requesterId : Text;
    timestamp : Int;
    domain    : Text;
  };

  public type ArchCouncilVoice = {
    voiceId    : Text;
    engine     : Text;
    answer     : Text;
    confidence : Nat;   // Fibonacci-floored, max 89
    mathBasis  : Text;
  };

  public type MLTVResponse = {
    queryId        : Text;
    voices         : [ArchCouncilVoice];
    novelVoice     : ArchCouncilVoice;
    totalCoherence : Nat;
    fibFlooredAt   : Nat;
    timestamp      : Int;
  };

  public type MLTVStats = {
    totalQueries        : Nat;
    totalVoices         : Nat;
    novelAnswersGenerated : Nat;
    avgCoherence        : Nat;
  };
};
