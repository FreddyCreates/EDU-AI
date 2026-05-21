// STND — Standards Alignment Registry API mixin
import Array "mo:core/Array";
import Time "mo:core/Time";
import StndLib "../lib/stnd";
import Types "../types/stnd";

mixin (
  standardStore  : StndLib.StandardStore,
  alignmentStore : StndLib.AlignmentStore,
  digtContentIds : StndLib.DigtContentStore
) {
  public shared ({ caller }) func registerStandard(
    standard : Types.Standard
  ) : async () {
    ignore caller;
    StndLib.registerStandard(standardStore, standard);
  };

  public query func getStandard(
    code : Types.StandardCode
  ) : async ?Types.Standard {
    StndLib.getStandard(standardStore, code);
  };

  public query func getStandardsByGrade(
    gradeLevel : Nat
  ) : async [Types.Standard] {
    StndLib.getStandardsByGrade(standardStore, gradeLevel);
  };

  public query func getStandardsBySubject(
    subject : Text
  ) : async [Types.Standard] {
    StndLib.getStandardsBySubject(standardStore, subject);
  };

  public shared ({ caller }) func alignContent(
    alignment : Types.StandardAlignment
  ) : async () {
    ignore caller;
    StndLib.alignContent(alignmentStore, alignment);
  };

  public query func getAlignments(
    standardCode : Types.StandardCode
  ) : async [Types.StandardAlignment] {
    StndLib.getAlignments(alignmentStore, standardCode);
  };

  public query func getStndStats() : async Types.StndStats {
    StndLib.getStats(standardStore);
  };

  /// Returns standards for a grade annotated with whether DIGT has generated content.
  public query func getStandardsWithDigestedContent(
    gradeLevel : Nat
  ) : async [Types.StandardWithDigestStatus] {
    let standards = StndLib.getStandardsByGrade(standardStore, gradeLevel);
    standards.map<Types.Standard, Types.StandardWithDigestStatus>(
      func(s) {
        let status = StndLib.getDigtStatus(digtContentIds, s.code);
        {
          standard    = s;
          hasContent  = status.conceptCount > 0 or status.quizSeedCount > 0;
          conceptCount   = status.conceptCount;
          quizSeedCount  = status.quizSeedCount;
          lastDigested   = status.lastDigested;
        };
      },
    );
  };

  /// Returns the DIGT content status for one standard.
  public query func getDigtStatusForStandard(
    standardId : Text
  ) : async Types.DigtStatus {
    StndLib.getDigtStatus(digtContentIds, standardId);
  };
}
