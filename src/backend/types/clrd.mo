// CLRD — College Readiness Tracker types
module {
  public type CollegeReadinessRecord = {
    studentPrincipal : Principal;
    apCourseIds : [Nat];     // aligned to STND/curriculum
    ibCourseIds : [Nat];
    transcriptMilestones : [TranscriptMilestone];
    admissionsTimeline : [AdmissionsEvent];
    collegeExplorationList : [CollegeEntry];
    updatedAt : Int;
  };

  public type TranscriptMilestone = {
    id : Nat;
    title : Text;
    gradeLevel : Nat;
    completedAt : ?Int;
    gpaImpact : ?Int; // signed, Fibonacci-floored
  };

  public type AdmissionsEvent = {
    id : Nat;
    eventType : Text; // "FAFSA", "CommonApp", "TestReg", "Interview"
    scheduledDate : ?Int;
    completedAt : ?Int;
    notes : Text;
  };

  public type CollegeEntry = {
    collegeName : Text;
    matchTier : CollegeMatchTier;
    addedAt : Int;
    applicationStatus : Text;
  };

  public type CollegeMatchTier = {
    #safety;
    #target;
    #reach;
  };

  public type ClrdStats = {
    totalRecords : Nat;
    avgApCourseCount : Nat;
    collegeListSize : Nat;
  };
}
