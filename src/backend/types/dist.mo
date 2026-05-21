// DIST — District Engine types
module {
  public type DistrictId = Nat;
  public type SchoolId = Nat;

  public type DistrictProfile = {
    id : DistrictId;
    name : Text;
    state : Text;
    schoolIds : [SchoolId];
    contactEmail : Text;
    createdAt : Int;
  };

  public type DistrictStats = {
    totalSchools : Nat;
    totalStudents : Nat;
    avgMasteryScore : Nat;
    achievementGapIndex : Nat; // Fibonacci-floored
  };

  public type CrossSchoolTrend = {
    subjectId : Nat;
    gradeLevel : Nat;
    schoolId : SchoolId;
    avgMastery : Nat;
    sessionCount : Nat;
    periodLabel : Text;
  };

  public type AchievementGapRecord = {
    districtId : DistrictId;
    subjectId : Nat;
    gradeLevel : Nat;
    highGroupAvg : Nat;
    lowGroupAvg : Nat;
    gapScore : Nat; // Fibonacci-floored
    computedAt : Int;
  };
}
