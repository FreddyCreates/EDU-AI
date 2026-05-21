// RCGN API Mixin
// LEX_SOVEREIGNUS: Sovereign recognition — no external nominations.
// LEX_QUAESTIO: Every talented student has a pathway surfaced.
//
// Autonomous scan fires every F(6)=8 heartbeat cycles via rcgnCycleCount in main.mo.
// Manual scan trigger available for admin/teacher use.

import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/recognition";
import RcgnLib "../lib/rcgn";
import NomsLib "../lib/noms";
import AchvLib "../lib/achv";
import PassportLib "../lib/passport";
import Principal "mo:core/Principal";

mixin (
  rcgnStore : RcgnLib.RcgnStore,
  nomStore  : NomsLib.NomStore,
  achvStore : AchvLib.AchvStore,
  passports : PassportLib.PassportStore,
  seedStore : PassportLib.SeedStore,
) {

  /// Returns all RCGN flags for a specific student.
  public query func getRecognitionFlags(studentId : Common.UserId) : async [Types.RecognitionFlag] {
    RcgnLib.getFlags(rcgnStore, studentId);
  };

  /// Returns all RCGN flags across all students. Admin/teacher use.
  public query func getAllRecognitionFlags() : async [Types.RecognitionFlag] {
    RcgnLib.getAllFlags(rcgnStore);
  };

  /// Admin-triggered manual RCGN scan cycle. Returns all newly created flags.
  public shared func runRCGNScan() : async [Types.RecognitionFlag] {
    RcgnLib.runScan(rcgnStore, passports, seedStore, Time.now());
  };

  /// Submit a nomination for a student to an eligible program.
  public shared func submitNomination(
    studentId   : Common.UserId,
    programName : Text,
    teacherNote : Text,
  ) : async Types.NominationRecord {
    let nom = NomsLib.submitNomination(nomStore, studentId, programName, teacherNote, Time.now());
    // Seal nomination as an achievement
    ignore AchvLib.sealAchievement(
      achvStore, studentId, #NominationSent,
      "Nominated for " # programName,
      "NOMS",
      Time.now(),
    );
    nom;
  };

  /// Returns all nominations for a specific student.
  public query func getNominations(studentId : Common.UserId) : async [Types.NominationRecord] {
    NomsLib.getNominations(nomStore, studentId);
  };

  /// Returns all achievements for a specific student, with zone labels.
  public query func getAchievements(studentId : Common.UserId) : async [Types.AchievementRecord] {
    AchvLib.getAchievements(achvStore, studentId);
  };
};
