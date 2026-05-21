// ASGN — Assignment Engine types
module {
  public type Assignment = {
    id : Nat;
    teacherPrincipal : Principal;
    classCode : Text;
    title : Text;
    description : Text;
    subjectId : Nat;
    gradeLevel : Nat;
    standardCodes : [Text]; // STND alignment
    dueDate : ?Int;
    createdAt : Int;
    maxScore : Nat;
    autoSeedPassport : Bool;
  };

  public type Submission = {
    id : Nat;
    assignmentId : Nat;
    studentPrincipal : Principal;
    submittedAt : Int;
    contentHash : Blob; // hash of submitted content
    status : SubmissionStatus;
  };

  public type GradeRecord = {
    submissionId : Nat;
    assignmentId : Nat;
    studentPrincipal : Principal;
    score : Nat; // Fibonacci-floored
    maxScore : Nat;
    feedback : Text;
    gradedAt : Int;
    gradedBy : Principal;
    passportSeedId : ?Nat; // auto-generated seed ref
  };

  public type SubmissionStatus = {
    #pending;
    #submitted;
    #graded;
    #returned;
  };

  public type AsgnStats = {
    totalAssignments : Nat;
    totalSubmissions : Nat;
    gradedCount : Nat;
    avgScore : Nat;
  };
}
