// TPRP — Test Prep Engine lib
import Map "mo:core/Map";
import List "mo:core/List";
import Types "../types/tprp";
import Int "mo:core/Int";

module {
  public type SessionStore    = List.List<Types.TestPrepSession>;
  public type ProjectionStore = Map.Map<Principal, Types.ScoreProjection>;
  public type Counter         = { var nextId : Nat };

  public func newSessionStore() : SessionStore {
    List.empty()
  };

  public func newProjectionStore() : ProjectionStore {
    Map.empty()
  };

  public func newCounter() : Counter {
    { var nextId = 1 }
  };

    func fibFloorNat(n : Nat) : Nat {
    var a : Nat = 1;
    var b : Nat = 1;
    while (b <= n) { let t = a + b; a := b; b := t };
    a
  };

public func startSession(
    store : SessionStore,
    counter : Counter,
    studentPrincipal : Principal,
    mode : Types.TestPrepMode,
    subjectId : Nat,
    startedAt : Int
  ) : Nat {
    let id = counter.nextId;
    counter.nextId += 1;
    let session : Types.TestPrepSession = {
      id;
      studentPrincipal;
      mode;
      subjectId;
      startedAt;
      completedAt = null;
      questionsAttempted = 0;
      correctCount = 0;
      masteryDelta = 0;
      strategyNotes = [];
    };
    store.add(session);
    id
  };

  public func completeSession(
    store : SessionStore,
    sessionId : Nat,
    correct : Nat,
    attempted : Nat,
    completedAt : Int
  ) : Bool {
    switch (store.findIndex(func(s) { s.id == sessionId })) {
      case null { false };
      case (?idx) {
        let s = store.at(idx);
        let delta : Int = if (attempted > 0) { Int.fromNat((correct * 100) / attempted) - 50 } else { 0 };
        store.put(idx, { s with
          completedAt = ?completedAt;
          questionsAttempted = attempted;
          correctCount = correct;
          masteryDelta = delta;
        });
        true
      };
    }
  };

  public func getSessionsByStudent(
    store : SessionStore,
    studentPrincipal : Principal
  ) : [Types.TestPrepSession] {
    store.filter(func(s) { s.studentPrincipal == studentPrincipal }).toArray()
  };

  public func computeProjection(
    projStore : ProjectionStore,
    sessionStore : SessionStore,
    studentPrincipal : Principal,
    mode : Types.TestPrepMode,
    computedAt : Int
  ) : Types.ScoreProjection {
    let sessions = sessionStore.filter(func(s) {
      s.studentPrincipal == studentPrincipal and debug_show(s.mode) == debug_show(mode) and s.completedAt != null
    }).toArray();
    let count = sessions.size();
    // PHI=1618/1000 weighting for score projection
    let rawScore : Int = if (count > 0) {
      var totalDelta : Int = 0;
      for (s in sessions.vals()) { totalDelta += s.masteryDelta };
      (50 + (totalDelta / Int.fromNat(count))) * 1618 / 1000
    } else { 50 };
    let projected = fibFloorNat(if (rawScore > 0) { rawScore.toNat() } else { 0 });
    let confidence = fibFloorNat(if (count >= 5) { 89 } else { count * 13 });
    let proj : Types.ScoreProjection = {
      studentPrincipal;
      mode;
      projectedScore = projected;
      confidenceLevel = confidence;
      computedAt;
      sessionsUsed = count;
    };
    projStore.add(studentPrincipal, proj);
    proj
  };

  public func getStats(
    store : SessionStore
  ) : Types.TprpStats {
    let all = store.toArray();
    let total = all.size();
    var totalDelta : Int = 0;
    for (s in all.vals()) { totalDelta += s.masteryDelta };
    let avgDelta = if (total > 0) { totalDelta / Int.fromNat(total) } else { 0 };
    { totalSessions = total; byMode = []; avgMasteryDelta = avgDelta }
  };
}
