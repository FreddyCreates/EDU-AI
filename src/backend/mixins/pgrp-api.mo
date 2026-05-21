// PGRP — Peer Study Group Engine API mixin
import PgrpLib "../lib/pgrp";
import Time "mo:core/Time";
import Types "../types/pgrp";

mixin (
  groupStore   : PgrpLib.GroupStore,
  pgrpSessions : PgrpLib.SessionStore,
  pgrpCounter  : PgrpLib.Counter
) {
  public shared ({ caller = _ }) func formStudyGroup(
    subjectId : Nat,
    gradeLevel : Nat,
    memberPrincipals : [Principal],
    sssLow : Nat,
    sssHigh : Nat
  ) : async Nat {
    PgrpLib.formGroup(
      groupStore, pgrpCounter,
      subjectId, gradeLevel, memberPrincipals,
      sssLow, sssHigh, Time.now()
    )
  };

  public shared ({ caller = _ }) func addGroupMember(
    groupId : Nat,
    member : Principal
  ) : async Bool {
    PgrpLib.addMember(groupStore, groupId, member)
  };

  public shared ({ caller = _ }) func removeGroupMember(
    groupId : Nat,
    member : Principal
  ) : async Bool {
    PgrpLib.removeMember(groupStore, groupId, member)
  };

  public shared ({ caller = _ }) func dissolveStudyGroup(
    groupId : Nat
  ) : async Bool {
    PgrpLib.dissolveGroup(groupStore, groupId)
  };

  public shared ({ caller = _ }) func recordStudyGroupSession(
    session : Types.GroupSession
  ) : async Nat {
    PgrpLib.recordGroupSession(pgrpSessions, pgrpCounter, session)
  };

  public query func getGroupsBySubject(
    subjectId : Nat
  ) : async [Types.StudyGroup] {
    PgrpLib.getGroupsBySubject(groupStore, subjectId)
  };

  public query ({ caller }) func getMyStudyGroups() : async [Types.StudyGroup] {
    PgrpLib.getGroupsByStudent(groupStore, caller)
  };

  public query func getPgrpStats() : async Types.PgrpStats {
    PgrpLib.getGroupStats(groupStore, pgrpSessions)
  };
}
