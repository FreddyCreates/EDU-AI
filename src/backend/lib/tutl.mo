// TUTL — Tutoring Session Engine lib
import List "mo:core/List";
import Types "../types/tutl";

module {
  public type SessionStore = List.List<Types.TutoringSession>;
  public type Counter      = { var nextId : Nat };

  public func newStore() : SessionStore {
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

  public func createSession(
    store : SessionStore,
    counter : Counter,
    session : Types.TutoringSession
  ) : Nat {
    let id = counter.nextId;
    counter.nextId += 1;
    let s : Types.TutoringSession = { session with id };
    store.add(s);
    id
  };

  // completeSession — seal, set masteryDeltaAfter and transcriptHash
  public func completeSession(
    store : SessionStore,
    sessionId : Nat,
    masteryDeltaAfter : Nat,
    transcriptHash : ?Blob
  ) : Bool {
    var found = false;
    store.mapInPlace(func(s) {
      if (s.id == sessionId and not s.sealed) {
        found := true;
        { s with
          sealed            = true;
          masteryDeltaAfter = fibFloorNat(masteryDeltaAfter);
          transcriptHash;
        }
      } else { s }
    });
    found
  };

  public func getSessionsByStudent(
    store : SessionStore,
    studentPrincipal : Principal
  ) : [Types.TutoringSession] {
    store.filter(func(s) { s.studentPrincipal == studentPrincipal }).toArray()
  };

  public func getSessionsByTutor(
    store : SessionStore,
    tutorRef : Text
  ) : [Types.TutoringSession] {
    store.filter(func(s) { s.tutorRef == tutorRef }).toArray()
  };

  public func getTutoringStats(
    store : SessionStore
  ) : { total : Nat; sealed : Nat } {
    let total  = store.size();
    let sealed = store.filter(func(s) { s.sealed }).size();
    { total; sealed }
  };
}
