// COUN — Counselor Engine types
module {
  public type CounselorPlan = {
    studentPrincipal : Principal;
    counselorPrincipal : Principal;
    createdAt : Int;
    updatedAt : Int;
    iepFlagged : Bool;
    accommodationTypes : [Text]; // from IESM engine
    careerPathwayId : ?Nat;
    collegeReadinessStage : ?CollegeReadinessStage;
    milestones : [CounselorMilestone];
    notes : Text;
  };

  public type CollegeReadinessStage = {
    #exploring;
    #planning;
    #preparing;
    #applying;
    #committed;
  };

  public type CounselorMilestone = {
    id : Nat;
    title : Text;
    targetDate : ?Int;
    completedAt : ?Int;
    category : MilestoneCategory;
  };

  public type MilestoneCategory = {
    #academic;
    #social;
    #career;
    #college;
    #postsecondary;
  };

  public type CounPlanStats = {
    totalPlans : Nat;
    iepFlaggedCount : Nat;
    withCareerPathway : Nat;
    milestoneCompletionRate : Nat; // Fibonacci-floored %
  };
}
