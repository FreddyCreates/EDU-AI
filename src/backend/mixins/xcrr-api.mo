// XCRR — Extracurricular/Club Tracking API mixin
import List    "mo:core/List";
import Map     "mo:core/Map";
import Time    "mo:core/Time";
import XcrrLib "../lib/xcrr";
import Types   "../types/xcrr";

mixin () {
  var xcrrClubs       : XcrrLib.ClubStore       = Map.empty<Nat, Types.ClubRecord>();
  var xcrrMemberships : XcrrLib.MembershipStore = List.empty<Types.ClubMembership>();
  var xcrrCounter     : XcrrLib.Counter         = { var nextId = 1 };

  public shared ({ caller }) func createClub(
    name     : Text,
    category : Types.ClubCategory,
    schoolId : Nat
  ) : async Nat {
    let record : Types.ClubRecord = {
      id = 0;
      name;
      category;
      advisorPrincipal = caller;
      schoolId;
      memberPrincipals = [];
      createdAt        = Time.now();
      active           = true;
    };
    XcrrLib.createClub(xcrrClubs, xcrrCounter, record)
  };

  public shared ({ caller }) func joinClub(
    clubId : Nat,
    role   : Types.ClubRole
  ) : async () {
    let membership : Types.ClubMembership = {
      studentPrincipal = caller;
      clubId;
      role;
      joinedAt     = Time.now();
      hoursLogged  = 0;
      linkedAchvId = null;
    };
    XcrrLib.addMember(xcrrMemberships, membership)
  };

  public shared func updateMemberRole(
    clubId           : Nat,
    studentPrincipal : Principal,
    role             : Types.ClubRole
  ) : async () {
    XcrrLib.updateMemberRoleByKey(xcrrMemberships, clubId, studentPrincipal, role)
  };

  public shared func logClubHours(
    clubId           : Nat,
    studentPrincipal : Principal,
    hours            : Nat
  ) : async () {
    XcrrLib.logHours(xcrrMemberships, clubId, studentPrincipal, hours)
  };

  public shared func linkClubAchievement(
    clubId           : Nat,
    studentPrincipal : Principal,
    achvId           : Nat
  ) : async () {
    XcrrLib.linkAchievement(xcrrMemberships, clubId, studentPrincipal, achvId)
  };

  public shared func dissolveClub(
    clubId : Nat
  ) : async () {
    XcrrLib.dissolveClub(xcrrClubs, clubId)
  };

  public query func getClubsBySchool(
    schoolId : Nat
  ) : async [Types.ClubRecord] {
    XcrrLib.getClubsBySchool(xcrrClubs, schoolId)
  };

  public query ({ caller }) func getMyClubs() : async [Types.ClubMembership] {
    XcrrLib.getMembershipsByStudent(xcrrMemberships, caller)
  };

  public query func getMembershipsByStudent(
    studentPrincipal : Principal
  ) : async [Types.ClubMembership] {
    XcrrLib.getMembershipsByStudent(xcrrMemberships, studentPrincipal)
  };

  public query func getClubEngagementScore(
    studentPrincipal : Principal
  ) : async Nat {
    XcrrLib.computeEngagementScore(xcrrMemberships, studentPrincipal)
  };

  public query func getXcrrStats() : async Types.XcrrStats {
    XcrrLib.getStats(xcrrClubs, xcrrMemberships)
  };
}
