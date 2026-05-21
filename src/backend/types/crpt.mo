// CRPT — Career Pathway Engine types
module {
  public type CareerCluster = Text; // e.g. "STEM", "Arts", "Health", "Business"

  public type CareerPathway = {
    id : Nat;
    studentPrincipal : Principal;
    recommendedClusters : [CareerCluster];
    interestSurveyResults : [InterestScore];
    explorationHistory : [CareerExplorationEntry];
    milestones : [CareerMilestone];
    updatedAt : Int;
  };

  public type InterestScore = {
    cluster : CareerCluster;
    score : Nat; // Fibonacci-floored
    surveyDate : Int;
  };

  public type CareerExplorationEntry = {
    careerId : Nat;
    careerTitle : Text;
    cluster : CareerCluster;
    exploredAt : Int;
    bookmarked : Bool;
  };

  public type CareerMilestone = {
    id : Nat;
    title : Text;
    completedAt : ?Int;
    linkedSubjectId : ?Nat;
  };

  public type CrptStats = {
    totalPathways : Nat;
    topClusters : [(CareerCluster, Nat)];
    avgExplorationDepth : Nat;
  };
}
