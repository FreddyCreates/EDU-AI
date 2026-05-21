// FTRP — Field Trip / Enrichment Engine lib
import Map "mo:core/Map";
import Types "../types/ftrp";
import Array "mo:core/Array";

module {
  public type TripStore = Map.Map<Nat, Types.FieldTripRecord>;
  public type Counter   = { var nextId : Nat };

  public func newStore() : TripStore {
    Map.empty()
  };

  public func newCounter() : Counter {
    { var nextId = 1 }
  };

  public func createTrip(
    store : TripStore,
    counter : Counter,
    record : Types.FieldTripRecord
  ) : Nat {
    let id = counter.nextId;
    counter.nextId += 1;
    let r : Types.FieldTripRecord = { record with id };
    store.add(id, r);
    id
  };

  public func addAttendee(
    store : TripStore,
    tripId : Nat,
    p : Principal
  ) : () {
    switch (store.get(tripId)) {
      case (?trip) {
        let updated : Types.FieldTripRecord = {
          trip with
          attendeePrincipals = Array.tabulate<Principal>(
            trip.attendeePrincipals.size() + 1,
            func(i) { if (i < trip.attendeePrincipals.size()) { trip.attendeePrincipals[i] } else { p } }
          );
          attendeeCount = trip.attendeeCount + 1;
        };
        store.add(tripId, updated);
      };
      case null {}
    }
  };

  public func removeAttendee(
    store : TripStore,
    tripId : Nat,
    p : Principal
  ) : () {
    switch (store.get(tripId)) {
      case (?trip) {
        let filtered = trip.attendeePrincipals.filter(func(a) { a != p });
        let updated : Types.FieldTripRecord = {
          trip with
          attendeePrincipals = filtered;
          attendeeCount = filtered.size();
        };
        store.add(tripId, updated);
      };
      case null {}
    }
  };

  public func linkPreAssessment(
    store : TripStore,
    tripId : Nat,
    assessId : Nat
  ) : () {
    switch (store.get(tripId)) {
      case (?trip) {
        store.add(tripId, { trip with preAssessmentId = ?assessId });
      };
      case null {}
    }
  };

  public func archiveToPassport(
    store : TripStore,
    tripId : Nat
  ) : () {
    switch (store.get(tripId)) {
      case (?trip) {
        store.add(tripId, { trip with passportArchived = true });
      };
      case null {}
    }
  };

  public func getTripsBySchool(
    store : TripStore,
    schoolId : Nat
  ) : [Types.FieldTripRecord] {
    var result : [Types.FieldTripRecord] = [];
    for ((_, trip) in store.entries()) {
      if (trip.schoolId == schoolId) {
        result := Array.tabulate<Types.FieldTripRecord>(
          result.size() + 1,
          func(i) { if (i < result.size()) { result[i] } else { trip } }
        );
      }
    };
    result
  };

  public func getTripsByGrade(
    store : TripStore,
    gradeLevel : Nat
  ) : [Types.FieldTripRecord] {
    var result : [Types.FieldTripRecord] = [];
    for ((_, trip) in store.entries()) {
      if (trip.gradeLevel == gradeLevel) {
        result := Array.tabulate<Types.FieldTripRecord>(
          result.size() + 1,
          func(i) { if (i < result.size()) { result[i] } else { trip } }
        );
      }
    };
    result
  };

  public func getStats(
    store : TripStore
  ) : Types.FtrpStats {
    var total : Nat = 0;
    var attendees : Nat = 0;
    var archived : Nat = 0;
    for ((_, trip) in store.entries()) {
      total += 1;
      attendees += trip.attendeeCount;
      if (trip.passportArchived) { archived += 1 };
    };
    { totalActivities = total; totalAttendees = attendees; passportArchivedCount = archived; byType = [] }
  };
}
