// PGRP — Peer Study Group Engine lib
import Array "mo:core/Array";
import List "mo:core/List";
import Map "mo:core/Map";
import Types "../types/pgrp";

module {
  public type GroupStore    = Map.Map<Nat, Types.StudyGroup>;
  public type SessionStore  = List.List<Types.GroupSession>;
  public type Counter       = { var nextId : Nat };

  public func newGroupStore() : GroupStore {
    Map.empty()
  };

  public func newSessionStore() : SessionStore {
    List.empty()
  };

  public func newCounter() : Counter {
    { var nextId = 1 }
  };

  // Fibonacci floor helper
  func fibFloorNat(n : Nat) : Nat {
    let fibs = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
    let sc = n * 1618 / 1000;
    var best : Nat = 1;
    for (f in fibs.vals()) {
      if (f <= sc) { best := f };
    };
    best
  };

  public func formGroup(
    groupStore : GroupStore,
    counter : Counter,
    subjectId : Nat,
    gradeLevel : Nat,
    memberPrincipals : [Principal],
    sssLow : Nat,
    sssHigh : Nat,
    createdAt : Int
  ) : Nat {
    let id = counter.nextId;
    counter.nextId += 1;
    let group : Types.StudyGroup = {
      id; subjectId; gradeLevel; memberPrincipals;
      sssRangeLow = sssLow; sssRangeHigh = sssHigh;
      createdAt; active = true;
    };
    groupStore.add(id, group);
    id
  };

  public func addMember(
    groupStore : GroupStore,
    groupId : Nat,
    member : Principal
  ) : Bool {
    switch (groupStore.get(groupId)) {
      case null { false };
      case (?g) {
        let updated : Types.StudyGroup = {
          g with
          memberPrincipals = g.memberPrincipals.concat([member]);
        };
        groupStore.add(groupId, updated);
        true
      };
    }
  };

  public func removeMember(
    groupStore : GroupStore,
    groupId : Nat,
    member : Principal
  ) : Bool {
    switch (groupStore.get(groupId)) {
      case null { false };
      case (?g) {
        let updated : Types.StudyGroup = {
          g with
          memberPrincipals = g.memberPrincipals.filter(func(p) { p != member });
        };
        groupStore.add(groupId, updated);
        true
      };
    }
  };

  public func dissolveGroup(
    groupStore : GroupStore,
    groupId : Nat
  ) : Bool {
    switch (groupStore.get(groupId)) {
      case null { false };
      case (?g) {
        groupStore.add(groupId, { g with active = false });
        true
      };
    }
  };

  public func recordGroupSession(
    sessionStore : SessionStore,
    counter : Counter,
    session : Types.GroupSession
  ) : Nat {
    let id = counter.nextId;
    counter.nextId += 1;
    let gs : Types.GroupSession = {
      session with
      id;
      sharedMasteryDelta = fibFloorNat(session.sharedMasteryDelta);
    };
    sessionStore.add(gs);
    id
  };

  public func getGroupsBySubject(
    groupStore : GroupStore,
    subjectId : Nat
  ) : [Types.StudyGroup] {
    groupStore.values().toArray().filter(func(g) {
      g.subjectId == subjectId and g.active
    })
  };

  public func getGroupsByStudent(
    groupStore : GroupStore,
    studentPrincipal : Principal
  ) : [Types.StudyGroup] {
    groupStore.values().toArray().filter(func(g) {
      g.active and g.memberPrincipals.find(func(p) { p == studentPrincipal }) != null
    })
  };

  public func getGroupStats(
    groupStore : GroupStore,
    sessionStore : SessionStore
  ) : Types.PgrpStats {
    let groups = groupStore.values().toArray();
    let totalGroups = groups.size();
    var totalMembers : Nat = 0;
    for (g in groups.vals()) { totalMembers += g.memberPrincipals.size() };
    let avgGroupSize = if (totalGroups == 0) 0 else fibFloorNat(totalMembers / totalGroups);
    let sessionArr = sessionStore.toArray();
    let totalSessions = sessionArr.size();
    var totalDelta : Nat = 0;
    for (s in sessionArr.vals()) { totalDelta += s.sharedMasteryDelta };
    let avgMasteryGain = if (totalSessions == 0) 0 else fibFloorNat(totalDelta / totalSessions);
    { totalGroups; totalSessions; avgGroupSize; avgMasteryGain }
  };
}
