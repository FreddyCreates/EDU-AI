// TPDF — Teacher Professional Development Tracking types
module {
  public type PdRecord = {
    id : Nat;
    teacherPrincipal : Principal;
    title : Text;
    pdType : PdType;
    hoursLogged : Nat; // Fibonacci-floored
    completedAt : Int;
    certificationEarned : ?Text;
    provider : Text;
    growthMilestone : ?GrowthMilestone;
  };

  public type PdType = {
    #workshop;
    #onlineCourse;
    #conference;
    #peerCoaching;
    #selfStudy;
    #certification;
    #other : Text;
  };

  public type GrowthMilestone = {
    title : Text;
    category : Text;
    achievedAt : Int;
  };

  public type TpdfStats = {
    totalTeachers : Nat;
    totalHoursLogged : Nat;
    totalCertificationsEarned : Nat;
    avgHoursPerTeacher : Nat;
  };
}
