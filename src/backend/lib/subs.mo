// SUBS — Substitute Teacher Mode lib
import List "mo:core/List";
import Types "../types/subs";
import Array "mo:core/Array";

module {
  public type SubStore = List.List<Types.SubRecord>;
  public type Counter  = { var nextId : Nat };

  public func newStore() : SubStore {
    List.empty()
  };

  public func newCounter() : Counter {
    { var nextId = 1 }
  };

  public func createSubRecord(
    store : SubStore,
    counter : Counter,
    record : Types.SubRecord
  ) : Nat {
    let id = counter.nextId;
    counter.nextId += 1;
    let r : Types.SubRecord = { record with id };
    store.add(r);
    id
  };

  public func logIncident(
    store : SubStore,
    subRecordId : Nat,
    incident : Types.IncidentEntry
  ) : () {
    store.mapInPlace(func(r : Types.SubRecord) : Types.SubRecord {
      if (r.id == subRecordId) {
        { r with incidentLog = Array.tabulate<Types.IncidentEntry>(
            r.incidentLog.size() + 1,
            func(i) { if (i < r.incidentLog.size()) { r.incidentLog[i] } else { incident } }
          )
        }
      } else { r }
    })
  };

  public func addHandoffNote(
    store : SubStore,
    subRecordId : Nat,
    note : Text
  ) : () {
    store.mapInPlace(func(r : Types.SubRecord) : Types.SubRecord {
      if (r.id == subRecordId) { { r with handoffNotes = note } } else { r }
    })
  };

  public func getRecordsByDate(
    store : SubStore,
    date : Int
  ) : [Types.SubRecord] {
    store.filter(func(r) { r.date == date }).toArray()
  };

  public func getRecordsByClass(
    store : SubStore,
    classCode : Text
  ) : [Types.SubRecord] {
    store.filter(func(r) { r.classCode == classCode }).toArray()
  };

  public func getRecordsBySub(
    store : SubStore,
    subPrincipal : Principal
  ) : [Types.SubRecord] {
    store.filter(func(r) { r.subPrincipal == subPrincipal }).toArray()
  };

  public func getStats(
    store : SubStore
  ) : Types.SubsStats {
    let arr = store.toArray();
    var incidents : Nat = 0;
    for (r in arr.vals()) { incidents += r.incidentLog.size() };
    { totalSubRecords = arr.size(); totalIncidents = incidents; avgDailySubCount = 1 }
  };
}
