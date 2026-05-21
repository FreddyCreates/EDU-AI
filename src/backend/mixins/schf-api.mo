// SCHF — Scholarship Finder API mixin
import Array "mo:core/Array";
import SchfLib "../lib/schf";
import Types "../types/schf";

mixin (
  programStore : SchfLib.ProgramStore,
  matchStore   : SchfLib.MatchStore,
  schfCounter  : SchfLib.Counter
) {
  public shared ({ caller }) func addScholarshipProgram(
    program : Types.ScholarshipProgram
  ) : async Nat {
    ignore caller;
    SchfLib.addProgram(programStore, schfCounter, program);
  };

  public shared ({ caller }) func matchStudentToScholarships(
    achvSummary : [Text],
    matchedAt   : Int,
  ) : async [Types.ScholarshipMatch] {
    SchfLib.matchStudent(programStore, matchStore, schfCounter, caller, achvSummary, matchedAt);
  };

  public shared ({ caller }) func updateScholarshipStatus(
    matchId : Nat,
    status  : Types.ApplicationStatus,
  ) : async Bool {
    ignore caller;
    SchfLib.updateStatus(matchStore, matchId, status);
  };

  public query ({ caller }) func getMyScholarshipMatches() : async [Types.ScholarshipMatch] {
    SchfLib.getMatchesForStudent(matchStore, caller);
  };

  /// Returns scholarship matches for a student by principal text ID (admin/district use).
  public query func getScholarshipMatches(
    studentId : Text
  ) : async [Types.ScholarshipMatch] {
    ignore studentId;
    // Note: matches are stored by Principal; district can filter by studentPrincipal.toText()
    matchStore.filter(
      func(m : Types.ScholarshipMatch) : Bool {
        m.studentPrincipal.toText() == studentId
      }
    ).toArray();
  };

  /// Returns matches created after sinceTimestamp (for polling after RCGN threshold crossings).
  public query func getNewScholarshipMatches(
    studentId       : Text,
    sinceTimestamp  : Int,
  ) : async [Types.ScholarshipMatch] {
    matchStore.filter(
      func(m : Types.ScholarshipMatch) : Bool {
        m.studentPrincipal.toText() == studentId and m.matchedAt > sinceTimestamp
      }
    ).toArray();
  };

  public query func getSchfStats() : async Types.SchfStats {
    SchfLib.getStats(programStore, matchStore);
  };
}
