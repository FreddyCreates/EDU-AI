// Repetition Registry API mixin — sovereign spaced-repetition public endpoints.
// Exposes schedule management and registry question access to the caller's principal.
import RepReg      "../lib/repetition-registry";
import GvltLib     "../lib/gvlt";
import SessionTypes "../types/sessions";
import Principal   "mo:core/Principal";

mixin (scheduleStore : RepReg.SessionScheduleStore) {

  // ── getRegistryQuestion ────────────────────────────────────────────────────
  // Returns a JSON-encoded quiz question for grade 10 and the given subject.
  // Grade != 10 returns a locked error JSON.
  public func getRegistryQuestion(grade : Nat, subject : Text) : async Text {
    if (grade != 10) {
      return "{\"error\":\"grade_locked\",\"message\":\"Content locked to grade 10\"}";
    };
    let seeds = GvltLib.getGrade10Questions([], subject);
    RepReg.buildQuestion(seeds, 0);
  };

  // ── getSessionSchedule ────────────────────────────────────────────────────
  public shared ({ caller }) func getSessionSchedule() : async SessionTypes.SessionSchedule {
    RepReg.getSchedule(scheduleStore, caller);
  };

  // ── updateSessionMode ─────────────────────────────────────────────────────
  public shared ({ caller }) func updateSessionMode(mode : SessionTypes.SessionMode) : async () {
    RepReg.updateMode(scheduleStore, caller, mode);
  };

  // ── saveSessionMode (alias for updateSessionMode) ─────────────────────────
  public shared ({ caller }) func saveSessionMode(mode : SessionTypes.SessionMode) : async () {
    RepReg.updateMode(scheduleStore, caller, mode);
  };

  // ── getSessionMode ────────────────────────────────────────────────────────
  public shared ({ caller }) func getSessionMode() : async SessionTypes.SessionMode {
    RepReg.getSchedule(scheduleStore, caller).mode;
  };

  // ── recordMissedSession ───────────────────────────────────────────────────
  public shared ({ caller }) func recordMissedSession() : async () {
    RepReg.recordMiss(scheduleStore, caller);
  };
};
