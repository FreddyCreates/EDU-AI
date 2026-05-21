// SISR — SIS Sync Layer lib
import Map "mo:core/Map";
import List "mo:core/List";
import Types "../types/sisr";

module {
  /// Mutable sync state — wraps vars so mixins can mutate via reference.
  public type SyncState = { var lastSync : Int; var nextSync : Int };

  public func newSyncState() : SyncState {
    { var lastSync = 0; var nextSync = 0 };
  };
  public type SisStore        = Map.Map<Types.SisStudentId, Types.SisRecord>;
  public type AttendanceStore = List.List<Types.AttendanceRecord>;
  public type RosterStore     = Map.Map<Text, Types.ClassRoster>;
  public type CalendarStore   = List.List<Types.CalendarEvent>;

  public func newSisStore() : SisStore {
    Map.empty()
  };

  public func newAttendanceStore() : AttendanceStore {
    List.empty()
  };

  public func newRosterStore() : RosterStore {
    Map.empty()
  };

  public func newCalendarStore() : CalendarStore {
    List.empty()
  };

  public func upsertSisRecord(
    store : SisStore,
    record : Types.SisRecord
  ) : () {
    store.add(record.sisId, record)
  };

  public func getSisRecord(
    store : SisStore,
    sisId : Types.SisStudentId
  ) : ?Types.SisRecord {
    store.get(sisId)
  };

  public func recordAttendance(
    store : AttendanceStore,
    record : Types.AttendanceRecord
  ) : () {
    store.add(record)
  };

  public func getAttendance(
    store : AttendanceStore,
    sisId : Types.SisStudentId
  ) : [Types.AttendanceRecord] {
    store.filter(func(r) { r.sisId == sisId }).toArray()
  };

  public func upsertRoster(
    store : RosterStore,
    roster : Types.ClassRoster
  ) : () {
    store.add(roster.classCode, roster)
  };

  public func getRoster(
    store : RosterStore,
    classCode : Text
  ) : ?Types.ClassRoster {
    store.get(classCode)
  };

  public func addCalendarEvent(
    store : CalendarStore,
    event : Types.CalendarEvent
  ) : () {
    store.add(event)
  };

  public func getCalendarEvents(
    store : CalendarStore,
    schoolId : Nat
  ) : [Types.CalendarEvent] {
    store.filter(func(e) { e.schoolId == schoolId }).toArray()
  };
}
