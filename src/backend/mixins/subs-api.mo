// SUBS — Substitute Teacher Mode API mixin
import List    "mo:core/List";
import Time    "mo:core/Time";
import SubsLib "../lib/subs";
import Types   "../types/subs";

mixin () {
  var subsStore   : SubsLib.SubStore = List.empty<Types.SubRecord>();
  var subsCounter : SubsLib.Counter  = { var nextId = 1 };

  public shared ({ caller }) func createSubRecord(
    coveringTeacherPrincipal : Principal,
    classCode                : Text,
    date                     : Int,
    accessLevel              : Types.SubAccessLevel
  ) : async Nat {
    let record : Types.SubRecord = {
      id = 0;
      subPrincipal = caller;
      coveringTeacherPrincipal;
      classCode;
      date;
      incidentLog  = [];
      handoffNotes = "";
      accessLevel;
    };
    SubsLib.createSubRecord(subsStore, subsCounter, record)
  };

  public shared func logSubIncident(
    subRecordId : Nat,
    description : Text,
    severity    : Types.IncidentSeverity
  ) : async () {
    let incident : Types.IncidentEntry = {
      timestamp = Time.now();
      description;
      severity;
    };
    SubsLib.logIncident(subsStore, subRecordId, incident)
  };

  public shared func addSubHandoffNote(
    subRecordId : Nat,
    note        : Text
  ) : async () {
    SubsLib.addHandoffNote(subsStore, subRecordId, note)
  };

  public query func getSubRecordsByDate(
    date : Int
  ) : async [Types.SubRecord] {
    SubsLib.getRecordsByDate(subsStore, date)
  };

  public query func getSubRecordsByClass(
    classCode : Text
  ) : async [Types.SubRecord] {
    SubsLib.getRecordsByClass(subsStore, classCode)
  };

  public query ({ caller }) func getMySubRecords() : async [Types.SubRecord] {
    SubsLib.getRecordsBySub(subsStore, caller)
  };

  public query func getSubsStats() : async Types.SubsStats {
    SubsLib.getStats(subsStore)
  };
}
