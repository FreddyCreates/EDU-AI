// SUBS — Substitute Teacher Mode types
module {
  public type SubRecord = {
    id : Nat;
    subPrincipal : Principal;
    coveringTeacherPrincipal : Principal;
    classCode : Text;
    date : Int;
    incidentLog : [IncidentEntry];
    handoffNotes : Text;
    accessLevel : SubAccessLevel;
  };

  public type IncidentEntry = {
    timestamp : Int;
    description : Text;
    severity : IncidentSeverity;
  };

  public type IncidentSeverity = {
    #minor;
    #moderate;
    #major;
  };

  public type SubAccessLevel = {
    #readOnly;   // roster + schedule view only
    #limited;    // + attendance recording
  };

  public type SubsStats = {
    totalSubRecords : Nat;
    totalIncidents : Nat;
    avgDailySubCount : Nat;
  };
}
