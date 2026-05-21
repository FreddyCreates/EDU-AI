import List    "mo:core/List";
import GvltLib "../lib/gvlt";
import Types   "../types/gvlt";
import Array "mo:core/Array";
import Time "mo:core/Time";

mixin () {
  // ── Stable state ─────────────────────────────────────────────────────────
  var gvltVault   : GvltLib.VaultStore  = List.empty<Types.GradeVaultEntry>();
  var gvltBlocked : GvltLib.BlockedSet  = List.empty<Text>();

  // ── checkGradeAccess ─────────────────────────────────────────────────────
  public query func checkGradeAccess(
    studentGrade   : Nat,
    contentGrade   : Nat,
  ) : async Types.GradeGate {
    GvltLib.checkGradeAccess(studentGrade, contentGrade);
  };

  // ── getAccessibleContent ─────────────────────────────────────────────────
  public query func getAccessibleContent(
    studentGrade : Nat,
  ) : async [Types.GradeVaultEntry] {
    GvltLib.getAccessibleContent(gvltVault, gvltBlocked, studentGrade);
  };

  // ── registerVaultContent ─────────────────────────────────────────────────
  public func registerVaultContent(
    contentId        : Text,
    contentType      : Text,
    gradeLevel       : Nat,
    subject          : Text,
    lockedUntilGrade : Nat,
  ) : async Bool {
    let entry : Types.GradeVaultEntry = {
      contentId; contentType; gradeLevel; subject; lockedUntilGrade;
    };
    GvltLib.registerContent(gvltVault, entry);
  };

  // ── getGvltStats ─────────────────────────────────────────────────────────
  public query func getGvltStats() : async Types.GvltStats {
    GvltLib.getGvltStats(gvltVault, gvltBlocked);
  };

  // ── getGradeVaultSummary — drill-down for a specific grade ────────────────
  public query func getGradeVaultSummary(grade : Nat) : async Types.GradeVaultSummary {
    // PHI-weighted deterministic data per grade
    let phiBase : Float = 0.6180339887;
    let totalStudents = if (grade <= 6) 89 else 55; // Fibonacci splits
    let avgMastery = phiBase - (grade.toFloat() * 0.008);
    let subjects = ["Mathematics", "Science", "English", "History", "Art", "PE"];
    let topSubject = subjects[grade % 6];
    let struggleIdx = (grade + 3) % 6;
    let strugglingSubject = subjects[struggleIdx];
    // F(1)..F(8) week numbers: 1,1,2,3,5,8,13,21
    let fibWeeks : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21];
    let weeklyProgress : [Types.WeekProgress] = Array.tabulate<Types.WeekProgress>(8, func(i) {
      {
        week             = fibWeeks[i];
        completedLessons = fibWeeks[i] * 3;
        avgScore         = phiBase + (i.toFloat() * 0.013);
      };
    });
    {
      grade;
      totalStudents;
      avgMastery;
      topSubject;
      strugglingSubject;
      weeklyProgress;
    };
  };
};
