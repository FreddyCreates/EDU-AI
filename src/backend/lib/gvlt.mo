import List  "mo:core/List";
import Types "../types/gvlt";
import DigtTypes "../types/digt";
import Array "mo:core/Array";

module {
  // ── Fibonacci sequence (first 16 values) ─────────────────────────────────
  let FIB_SEQUENCE : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];

  public func fibFloor(n : Nat) : Nat {
    if (n == 0) return 1;
    var result : Nat = 1;
    for (f in FIB_SEQUENCE.values()) {
      if (f <= n) { result := f };
    };
    result;
  };

  // ── State type ───────────────────────────────────────────────────────────
  public type VaultStore = List.List<Types.GradeVaultEntry>;

  // Blocked-content id set (stored as parallel text list for simplicity)
  public type BlockedSet  = List.List<Text>;

  // ── getGrade10Questions ──────────────────────────────────────────────────
  // Filters a [DigtQuizSeed] array to gradeLevel == 10 and the given subject.
  public func getGrade10Questions(
    quizSeeds : [DigtTypes.DigtQuizSeed],
    subject   : Text,
  ) : [DigtTypes.DigtQuizSeed] {
    quizSeeds.filter<DigtTypes.DigtQuizSeed>(
      func(q) { q.gradeLevel == 10 and q.subject == subject },
    );
  };

  // ── checkGradeAccess ─────────────────────────────────────────────────────
  // Rule: student can only access content AT or BELOW their grade level.
  public func checkGradeAccess(
    studentGrade   : Nat,
    contentGrade   : Nat,
  ) : Types.GradeGate {
    let allowed = studentGrade >= contentGrade;
    let reason  = if (allowed)
      "Access granted"
    else
      "Content locked until grade " # contentGrade.toText();
    { studentGrade; requestedGrade = contentGrade; allowed; reason };
  };

  // ── registerContent ──────────────────────────────────────────────────────
  // Max 233 entries (F(13)).
  public func registerContent(
    vault   : VaultStore,
    entry   : Types.GradeVaultEntry,
  ) : Bool {
    if (vault.size() >= 233) return false;
    // Deduplicate by contentId
    if (vault.any(func(e) { e.contentId == entry.contentId })) return false;
    vault.add(entry);
    true;
  };

  // ── getAccessibleContent ─────────────────────────────────────────────────
  public func getAccessibleContent(
    vault        : VaultStore,
    blocked      : BlockedSet,
    studentGrade : Nat,
  ) : [Types.GradeVaultEntry] {
    vault.filter(func(e) {
      let gateOk     = studentGrade >= e.gradeLevel;
      let notBlocked = not blocked.any(func(bid) { bid == e.contentId });
      gateOk and notBlocked;
    }).toArray();
  };

  // ── blockContent ─────────────────────────────────────────────────────────
  public func blockContent(
    blocked   : BlockedSet,
    contentId : Text,
  ) : Bool {
    if (blocked.any(func(bid) { bid == contentId })) return false;
    blocked.add(contentId);
    true;
  };

  // ── getGvltStats ─────────────────────────────────────────────────────────
  public func getGvltStats(
    vault   : VaultStore,
    blocked : BlockedSet,
  ) : Types.GvltStats {
    let totalEntries = vault.size();
    let totalBlocked = blocked.size();
    let totalAllowed = if (totalEntries >= totalBlocked) (totalEntries - totalBlocked : Nat) else 0;
    { totalEntries; totalBlocked; totalAllowed };
  };
};
