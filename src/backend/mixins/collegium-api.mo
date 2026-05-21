// COLLEGIUM-PUBLICA — public API mixin
import Types "../types/collegium";
import CollegiumLib "../lib/collegium";

mixin (
  enrollments : CollegiumLib.EnrollmentStore,
  gateEntries : CollegiumLib.GateEntryStore,
) {
  // ── Track catalogue ───────────────────────────────────────────────────────
  public query func getTracks() : async [Types.Track] {
    CollegiumLib.getTracks();
  };

  public query func getTrackById(id : Types.TrackId) : async ?Types.Track {
    CollegiumLib.getTrackById(id);
  };

  // ── NEXUM-GATE ────────────────────────────────────────────────────────────
  public shared ({ caller }) func enterNexumGate(
    collegium : Text,
    now       : Int,
  ) : async Types.NexumGateEntry {
    CollegiumLib.enterNexumGate(gateEntries, caller, collegium, now);
  };

  public query ({ caller }) func getMyGateEntries() : async [Types.NexumGateEntry] {
    CollegiumLib.getGateEntries(gateEntries, caller);
  };

  // ── Enrollment ────────────────────────────────────────────────────────────
  /// Returns #ok(enrollment) on success or #err(reason) if the track does not exist.
  public shared ({ caller }) func enrollInTrack(
    trackId : Types.TrackId,
    now     : Int,
  ) : async { #ok : Types.TrackEnrollment; #err : Text } {
    // Guard: verify the track exists in the catalogue before enrolling
    switch (CollegiumLib.getTrackById(trackId)) {
      case null {
        #err("Track not found in catalogue — cannot enroll");
      };
      case (?_) {
        let enrollment = CollegiumLib.enrollInTrack(enrollments, caller, trackId, now);
        #ok(enrollment);
      };
    };
  };

  public shared ({ caller }) func advanceTrackStep(
    trackId      : Types.TrackId,
    artifactName : ?Text,
    now          : Int,
  ) : async { #ok : Types.TrackEnrollment; #err : Text } {
    switch (CollegiumLib.advanceTrackStep(enrollments, caller, trackId, artifactName, now)) {
      case null { #err("No active enrollment found for this track") };
      case (?e)  { #ok(e) };
    };
  };

  public shared ({ caller }) func completeTrack(
    trackId      : Types.TrackId,
    artifactName : ?Text,
    now          : Int,
  ) : async { #ok : Types.TrackEnrollment; #err : Text } {
    switch (CollegiumLib.completeTrack(enrollments, caller, trackId, artifactName, now)) {
      case null { #err("No active enrollment found for this track") };
      case (?e)  { #ok(e) };
    };
  };

  public query ({ caller }) func getMyEnrollments() : async [Types.TrackEnrollment] {
    CollegiumLib.getEnrollments(enrollments, caller);
  };
};
