// SISR — SIS Sync Layer API mixin
import Time "mo:core/Time";
import SisrLib "../lib/sisr";
import Types "../types/sisr";

mixin (
  sisStore        : SisrLib.SisStore,
  attendanceStore : SisrLib.AttendanceStore,
  rosterStore     : SisrLib.RosterStore,
  calendarStore   : SisrLib.CalendarStore,
  sisState        : SisrLib.SyncState
) {
  // ── Record management ─────────────────────────────────────────────────────
  public shared ({ caller }) func upsertSisRecord(
    record : Types.SisRecord
  ) : async () {
    ignore caller;
    SisrLib.upsertSisRecord(sisStore, record);
    sisState.lastSync := Time.now();
    sisState.nextSync := sisState.lastSync + 3_600_000_000_000; // 1h in ns
  };

  public query func getSisRecord(
    sisId : Types.SisStudentId
  ) : async ?Types.SisRecord {
    SisrLib.getSisRecord(sisStore, sisId);
  };

  /// Alias used by Parent/District portals — returns all SIS data for a student.
  public query func getSisStudentData(
    sisId : Types.SisStudentId
  ) : async ?Types.SisRecord {
    SisrLib.getSisRecord(sisStore, sisId);
  };

  /// Returns all SIS records as a flat list (admin/district use).
  public query func getSisEnrollments() : async [Types.SisRecord] {
    sisStore.values().toArray();
  };

  // ── Attendance ────────────────────────────────────────────────────────────
  public shared ({ caller }) func recordAttendance(
    record : Types.AttendanceRecord
  ) : async () {
    ignore caller;
    SisrLib.recordAttendance(attendanceStore, record);
  };

  public query func getAttendance(
    sisId : Types.SisStudentId
  ) : async [Types.AttendanceRecord] {
    SisrLib.getAttendance(attendanceStore, sisId);
  };

  /// Alias used by Parent portal.
  public query func getSisAttendance(
    sisId : Types.SisStudentId
  ) : async [Types.AttendanceRecord] {
    SisrLib.getAttendance(attendanceStore, sisId);
  };

  // ── Rosters ───────────────────────────────────────────────────────────────
  public shared ({ caller }) func upsertRoster(
    roster : Types.ClassRoster
  ) : async () {
    ignore caller;
    SisrLib.upsertRoster(rosterStore, roster);
  };

  public query func getRoster(
    classCode : Text
  ) : async ?Types.ClassRoster {
    SisrLib.getRoster(rosterStore, classCode);
  };

  /// Returns all class rosters for a school (District/Principal use).
  public query func getSisRosters() : async [Types.ClassRoster] {
    rosterStore.values().toArray();
  };

  // ── Calendar ──────────────────────────────────────────────────────────────
  public shared ({ caller }) func addCalendarEvent(
    event : Types.CalendarEvent
  ) : async () {
    ignore caller;
    SisrLib.addCalendarEvent(calendarStore, event);
  };

  public query func getCalendarEvents(
    schoolId : Nat
  ) : async [Types.CalendarEvent] {
    SisrLib.getCalendarEvents(calendarStore, schoolId);
  };

  // ── Sync status ───────────────────────────────────────────────────────────
  /// Health probe for Parent/District portal sync panel.
  public query func getSisSyncStatus() : async {
    lastSync : Int;
    nextSync : Int;
    isHealthy : Bool;
    errorMessage : ?Text;
  } {
    let now = Time.now();
    let healthy = sisState.lastSync > 0 and (now - sisState.lastSync) < 7_200_000_000_000; // <2h
    {
      lastSync     = sisState.lastSync;
      nextSync     = sisState.nextSync;
      isHealthy    = healthy;
      errorMessage = if (healthy) null else ?("No sync in last 2 hours");
    };
  };
}
