// CLRD — College Readiness Tracker API mixin
import ClrdLib "../lib/clrd";
import Types "../types/clrd";

mixin (
  clrdStore : ClrdLib.ClrdStore
) {
  public shared ({ caller }) func upsertCollegeReadinessRecord(
    record : Types.CollegeReadinessRecord
  ) : async () {
    ignore caller;
    ClrdLib.upsertRecord(clrdStore, record)
  };

  public query ({ caller }) func getMyCollegeReadinessRecord() : async ?Types.CollegeReadinessRecord {
    ClrdLib.getRecord(clrdStore, caller)
  };

  public shared ({ caller }) func addAdmissionsEvent(
    event : Types.AdmissionsEvent
  ) : async Bool {
    ClrdLib.addAdmissionsEvent(clrdStore, caller, event)
  };

  public shared ({ caller }) func addCollegeToList(
    entry : Types.CollegeEntry
  ) : async Bool {
    ClrdLib.addCollegeToList(clrdStore, caller, entry)
  };

  public query func getClrdStats() : async Types.ClrdStats {
    ClrdLib.getStats(clrdStore)
  };
}
