// FTRP — Field Trip / Enrichment Engine types
module {
  public type FieldTripRecord = {
    id : Nat;
    title : Text;
    organizer : Principal;
    schoolId : Nat;
    gradeLevel : Nat;
    activityDate : Int;
    location : Text;
    attendeeCount : Nat;
    attendeePrincipals : [Principal];
    preAssessmentId : ?Nat;  // ASGN assignment id
    postAssessmentId : ?Nat; // ASGN assignment id
    passportArchived : Bool;
    enrichmentType : EnrichmentType;
  };

  public type EnrichmentType = {
    #fieldTrip;
    #labVisit;
    #guestSpeaker;
    #museumVisit;
    #STEMEvent;
    #other : Text;
  };

  public type FtrpStats = {
    totalActivities : Nat;
    totalAttendees : Nat;
    passportArchivedCount : Nat;
    byType : [(Text, Nat)];
  };
}
