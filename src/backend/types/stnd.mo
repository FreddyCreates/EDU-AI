// STND — Standards Alignment Registry types
module {
  public type StandardCode = Text; // e.g. "TEKS.Math.6.1A"

  public type Standard = {
    code : StandardCode;
    framework : StandardFramework;
    subject : Text;
    gradeLevel : Nat;
    description : Text;
    strand : ?Text;
    bloomsLevel : ?Nat; // 1-6
    fibWeight : Nat;    // Fibonacci-floored importance weight
  };

  public type StandardFramework = {
    #TEKS;
    #CommonCore;
    #NGSS;
    #WIDA; // for ELL standards
    #Other : Text;
  };

  public type StandardAlignment = {
    standardCode : StandardCode;
    contentId : Nat;   // links to DIGT concept or GVLT entry
    masteryThreshold : Nat; // Fibonacci-floored
    alignedAt : Int;
  };

  public type StndStats = {
    totalStandards : Nat;
    byFramework : [(Text, Nat)];
    byGrade : [(Nat, Nat)];
  };

  public type DigtStatus = {
    standardId    : Text;
    hasContent    : Bool;
    conceptCount  : Nat;
    quizSeedCount : Nat;
    lastDigested  : ?Int;
  };

  public type StandardWithDigestStatus = {
    standard      : Standard;
    hasContent    : Bool;
    conceptCount  : Nat;
    quizSeedCount : Nat;
    lastDigested  : ?Int;
  };
}
