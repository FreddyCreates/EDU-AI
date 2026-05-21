// FTRP — Field Trip / Enrichment Engine API mixin
import Map     "mo:core/Map";
import Time    "mo:core/Time";
import FtrpLib "../lib/ftrp";
import Types   "../types/ftrp";

mixin () {
  var ftrpStore   : FtrpLib.TripStore = Map.empty<Nat, Types.FieldTripRecord>();
  var ftrpCounter : FtrpLib.Counter   = { var nextId = 1 };

  public shared ({ caller }) func createFieldTrip(
    title          : Text,
    schoolId       : Nat,
    gradeLevel     : Nat,
    activityDate   : Int,
    location       : Text,
    enrichmentType : Types.EnrichmentType
  ) : async Nat {
    let record : Types.FieldTripRecord = {
      id = 0;
      title;
      organizer          = caller;
      schoolId;
      gradeLevel;
      activityDate;
      location;
      attendeeCount      = 0;
      attendeePrincipals = [];
      preAssessmentId    = null;
      postAssessmentId   = null;
      passportArchived   = false;
      enrichmentType;
    };
    FtrpLib.createTrip(ftrpStore, ftrpCounter, record)
  };

  public shared func addFieldTripAttendee(
    tripId : Nat,
    p      : Principal
  ) : async () {
    FtrpLib.addAttendee(ftrpStore, tripId, p)
  };

  public shared func removeFieldTripAttendee(
    tripId : Nat,
    p      : Principal
  ) : async () {
    FtrpLib.removeAttendee(ftrpStore, tripId, p)
  };

  public shared func linkFieldTripPreAssessment(
    tripId   : Nat,
    assessId : Nat
  ) : async () {
    FtrpLib.linkPreAssessment(ftrpStore, tripId, assessId)
  };

  public shared func archiveTripToPassport(
    tripId : Nat
  ) : async () {
    FtrpLib.archiveToPassport(ftrpStore, tripId)
  };

  public query func getFieldTripsBySchool(
    schoolId : Nat
  ) : async [Types.FieldTripRecord] {
    FtrpLib.getTripsBySchool(ftrpStore, schoolId)
  };

  public query func getFieldTripsByGrade(
    gradeLevel : Nat
  ) : async [Types.FieldTripRecord] {
    FtrpLib.getTripsByGrade(ftrpStore, gradeLevel)
  };

  public query func getFtrpStats() : async Types.FtrpStats {
    FtrpLib.getStats(ftrpStore)
  };
}
