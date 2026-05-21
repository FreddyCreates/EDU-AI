// TPDF — Teacher Professional Development Tracking lib
import List "mo:core/List";
import Types "../types/tpdf";

module {
  public type PdStore = List.List<Types.PdRecord>;
  public type Counter = { var nextId : Nat };

  public func newStore() : PdStore {
    List.empty()
  };

  public func newCounter() : Counter {
    { var nextId = 1 }
  };

  // Fibonacci floor helper
  func fibFloorNat(n : Nat) : Nat {
    let fibs : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
    let sc = n * 1618 / 1000;
    var result : Nat = 1;
    for (f in fibs.vals()) {
      if (f <= sc) { result := f }
    };
    result
  };

  public func logPdRecord(
    store : PdStore,
    counter : Counter,
    record : Types.PdRecord
  ) : (PdStore, Nat) {
    let id = counter.nextId;
    counter.nextId += 1;
    let r : Types.PdRecord = { record with id; hoursLogged = fibFloorNat(record.hoursLogged) };
    store.add(r);
    (store, id)
  };

  public func getRecordsByTeacher(
    store : PdStore,
    teacherPrincipal : Principal
  ) : [Types.PdRecord] {
    store.filter(func(r : Types.PdRecord) : Bool { r.teacherPrincipal == teacherPrincipal }).toArray()
  };

  public func getTotalHours(
    store : PdStore,
    teacherPrincipal : Principal
  ) : Nat {
    var acc : Nat = 0;
    for (r in store.toArray().vals()) {
      if (r.teacherPrincipal == teacherPrincipal) { acc += r.hoursLogged };
    };
    acc
  };

  public func computeGrowthScore(
    store : PdStore,
    teacherPrincipal : Principal
  ) : Nat {
    let total = getTotalHours(store, teacherPrincipal);
    fibFloorNat(total * 1618 / 1000)
  };

  public func getStats(
    store : PdStore
  ) : Types.TpdfStats {
    let arr = store.toArray();
    let total = arr.size();
    var hours : Nat = 0;
    var certs : Nat = 0;
    for (r in arr.vals()) {
      hours += r.hoursLogged;
      switch (r.certificationEarned) { case (?_) { certs += 1 }; case null {} };
    };
    let avg = if (total == 0) { 0 } else { hours / total };
    { totalTeachers = total; totalHoursLogged = hours; totalCertificationsEarned = certs; avgHoursPerTeacher = avg }
  };
}
