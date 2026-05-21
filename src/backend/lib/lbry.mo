// LBRY — Library/Media Center Integration lib
import List "mo:core/List";
import Types "../types/lbry";

module {
  public type LibStore = List.List<Types.LibraryRecord>;
  public type Counter  = { var nextId : Nat };

  public func newStore() : LibStore {
    List.empty()
  };

  public func newCounter() : Counter {
    { var nextId = 1 }
  };

  public func checkoutResource(
    store : LibStore,
    counter : Counter,
    record : Types.LibraryRecord
  ) : Nat {
    let id = counter.nextId;
    counter.nextId += 1;
    let r : Types.LibraryRecord = { record with id };
    store.add(r);
    id
  };

  public func returnResource(
    store : LibStore,
    recordId : Nat,
    ts : Int
  ) : () {
    store.mapInPlace(func(r : Types.LibraryRecord) : Types.LibraryRecord {
      if (r.id == recordId) { { r with returnedAt = ?ts } } else { r }
    })
  };

  public func updateReadingProgress(
    store : LibStore,
    recordId : Nat,
    pct : Nat
  ) : () {
    store.mapInPlace(func(r : Types.LibraryRecord) : Types.LibraryRecord {
      if (r.id == recordId) { { r with readingProgressPct = pct } } else { r }
    })
  };

  public func linkToSubject(
    store : LibStore,
    recordId : Nat,
    subjectId : Nat
  ) : () {
    store.mapInPlace(func(r : Types.LibraryRecord) : Types.LibraryRecord {
      if (r.id == recordId) { { r with linkedSubjectId = ?subjectId; masteryLinked = true } } else { r }
    })
  };

  public func getCheckoutsByStudent(
    store : LibStore,
    studentPrincipal : Principal
  ) : [Types.LibraryRecord] {
    store.filter(func(r) { r.studentPrincipal == studentPrincipal }).toArray()
  };

  public func getOverdueCheckouts(
    store : LibStore,
    now : Int
  ) : [Types.LibraryRecord] {
    store.filter(func(r) {
      switch (r.dueDate) {
        case (?due) { due < now and r.returnedAt == null };
        case null { false };
      }
    }).toArray()
  };

  public func getByStudent(
    store : LibStore,
    studentPrincipal : Principal
  ) : [Types.LibraryRecord] {
    getCheckoutsByStudent(store, studentPrincipal)
  };

  public func getStats(
    store : LibStore
  ) : Types.LbryStats {
    let arr = store.toArray();
    var active : Nat = 0;
    let overdue : Nat = 0;
    var linked : Nat = 0;
    for (r in arr.vals()) {
      if (r.returnedAt == null) { active += 1 };
      if (r.masteryLinked) { linked += 1 };
    };
    { totalCheckouts = arr.size(); activeCheckouts = active; overdueCount = overdue; masteryLinkedCount = linked }
  };
}
