// XCRR — Extracurricular/Club Tracking types
module {
  public type ClubRecord = {
    id : Nat;
    name : Text;
    category : ClubCategory;
    advisorPrincipal : Principal;
    schoolId : Nat;
    memberPrincipals : [Principal];
    createdAt : Int;
    active : Bool;
  };

  public type ClubMembership = {
    studentPrincipal : Principal;
    clubId : Nat;
    role : ClubRole;
    joinedAt : Int;
    hoursLogged : Nat; // Fibonacci-floored
    linkedAchvId : ?Nat; // ACHV record
  };

  public type ClubRole = {
    #member;
    #officer;
    #president;
    #vicePresident;
    #secretary;
    #treasurer;
  };

  public type ClubCategory = {
    #academic;
    #arts;
    #sports;
    #stem;
    #community;
    #civic;
    #other : Text;
  };

  public type XcrrStats = {
    totalClubs : Nat;
    totalMemberships : Nat;
    activeClubCount : Nat;
    avgMembersPerClub : Nat;
  };
}
