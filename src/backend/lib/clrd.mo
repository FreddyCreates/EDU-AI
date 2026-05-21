// CLRD — College Readiness Tracker lib
import Map "mo:core/Map";
import Types "../types/clrd";
import Array "mo:core/Array";

module {
  public type ClrdStore = Map.Map<Principal, Types.CollegeReadinessRecord>;

  public func newStore() : ClrdStore {
    Map.empty()
  };

  public func upsertRecord(
    store : ClrdStore,
    record : Types.CollegeReadinessRecord
  ) : () {
    store.add(record.studentPrincipal, record)
  };

  public func getRecord(
    store : ClrdStore,
    studentPrincipal : Principal
  ) : ?Types.CollegeReadinessRecord {
    store.get(studentPrincipal)
  };

  public func addAdmissionsEvent(
    store : ClrdStore,
    studentPrincipal : Principal,
    event : Types.AdmissionsEvent
  ) : Bool {
    switch (store.get(studentPrincipal)) {
      case null { false };
      case (?r) {
        store.add(studentPrincipal, { r with admissionsTimeline = r.admissionsTimeline.concat([event]) });
        true
      };
    }
  };

  public func addCollegeToList(
    store : ClrdStore,
    studentPrincipal : Principal,
    entry : Types.CollegeEntry
  ) : Bool {
    switch (store.get(studentPrincipal)) {
      case null { false };
      case (?r) {
        store.add(studentPrincipal, { r with collegeExplorationList = r.collegeExplorationList.concat([entry]) });
        true
      };
    }
  };

  public func getStats(
    store : ClrdStore
  ) : Types.ClrdStats {
    let all = store.values().toArray();
    let total = all.size();
    let avgAp = if (total > 0) {
      var apSum : Nat = 0; for (r in all.vals()) { apSum += r.apCourseIds.size() }; apSum / total
    } else { 0 };
    let avgList = if (total > 0) {
      var listSum : Nat = 0; for (r in all.vals()) { listSum += r.collegeExplorationList.size() }; listSum / total
    } else { 0 };
    { totalRecords = total; avgApCourseCount = avgAp; collegeListSize = avgList }
  };
}
