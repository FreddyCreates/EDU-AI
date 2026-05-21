// SCHF — Scholarship Finder types
module {
  public type ScholarshipProgram = {
    id : Nat;
    name : Text;
    sponsor : Text;
    eligibilityCriteria : [Text];
    deadline : ?Int;
    awardAmount : ?Nat;
    url : Text;
    categories : [Text]; // "math", "science", "minority", "need-based"
  };

  public type ScholarshipMatch = {
    id : Nat;
    studentPrincipal : Principal;
    programId : Nat;
    matchScore : Nat; // Fibonacci-floored
    matchedAt : Int;
    applicationStatus : ApplicationStatus;
    notes : Text;
  };

  public type ApplicationStatus = {
    #matched;     // found, not yet reviewed by student
    #interested;  // student flagged it
    #applied;     // application submitted
    #awarded;     // won
    #declined;    // chose not to apply
    #expired;     // deadline passed
  };

  public type SchfStats = {
    totalPrograms : Nat;
    totalMatches : Nat;
    awardedCount : Nat;
    topCategories : [(Text, Nat)];
  };
}
