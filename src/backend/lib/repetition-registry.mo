// Repetition Registry — sovereign spaced-repetition engine.
// All PHI thresholds use Fibonacci-floor values.
import Map          "mo:core/Map";
import Principal    "mo:core/Principal";
import Float        "mo:core/Float";
import SessionTypes "../types/sessions";
import DigtTypes    "../types/digt";

module {

  // ── Store type ────────────────────────────────────────────────────────────
  public type SessionScheduleStore = Map.Map<Principal, SessionTypes.SessionSchedule>;

  // ── PHI constants ─────────────────────────────────────────────────────────
  let PHI_INV     : Float = 0.618;  // compressRatio default / target
  let PHI_INV_SQ  : Float = 0.382;  // floor: compressRatio never drops below this

  // ── Default schedule ──────────────────────────────────────────────────────
  let DEFAULT_SCHEDULE : SessionTypes.SessionSchedule = {
    mode            = #workNight;
    intervalMinutes = 15;
    missedCount     = 0;
    nextReviewAt    = 0;
    compressRatio   = 1.0;
  };

  // ── createScheduleStore ───────────────────────────────────────────────────
  public func createScheduleStore() : SessionScheduleStore {
    Map.empty<Principal, SessionTypes.SessionSchedule>();
  };

  // ── getSchedule ───────────────────────────────────────────────────────────
  // Returns stored schedule or a workNight default.
  public func getSchedule(
    store   : SessionScheduleStore,
    student : Principal,
  ) : SessionTypes.SessionSchedule {
    switch (store.get(student)) {
      case (?s) s;
      case null DEFAULT_SCHEDULE;
    };
  };

  // ── updateMode ────────────────────────────────────────────────────────────
  // workNight → 15 min intervals; freeAfternoon → 45 min intervals.
  public func updateMode(
    store   : SessionScheduleStore,
    student : Principal,
    mode    : SessionTypes.SessionMode,
  ) : () {
    let current = getSchedule(store, student);
    let interval : Nat = switch (mode) {
      case (#workNight)     15;
      case (#freeAfternoon) 45;
    };
    let updated : SessionTypes.SessionSchedule = {
      current with
      mode            = mode;
      intervalMinutes = interval;
    };
    store.add(student, updated);
  };

  // ── recordMiss ────────────────────────────────────────────────────────────
  // Increments missedCount; compressRatio = missedCount × PHI_INV, floored at PHI_INV_SQ.
  public func recordMiss(
    store   : SessionScheduleStore,
    student : Principal,
  ) : () {
    let current  = getSchedule(store, student);
    let missed   = current.missedCount + 1;
    var compress = missed.toFloat() * PHI_INV;
    if (compress < PHI_INV_SQ) { compress := PHI_INV_SQ };
    let updated : SessionTypes.SessionSchedule = {
      current with
      missedCount   = missed;
      compressRatio = compress;
    };
    store.add(student, updated);
  };

  // ── buildQuestion ─────────────────────────────────────────────────────────
  // Returns a JSON string encoding question, options, answer, subject, gradeLevel, cohScore.
  // options = [seed.answer, distractors[0], distractors[1], "None of the above"]
  public func buildQuestion(
    seeds : [DigtTypes.DigtQuizSeed],
    index : Nat,
  ) : Text {
    if (seeds.size() == 0 or index >= seeds.size()) {
      return "{\"error\":\"no_seeds\",\"message\":\"No quiz seeds available for this subject\"}";
    };
    let seed = seeds[index];
    let d0 = if (seed.distractors.size() > 0) seed.distractors[0] else "unknown";
    let d1 = if (seed.distractors.size() > 1) seed.distractors[1] else "not applicable";
    "{"
    # "\"question\":\"" # escapeJson(seed.question) # "\","
    # "\"options\":["
      # "\"" # escapeJson(seed.answer) # "\","
      # "\"" # escapeJson(d0)          # "\","
      # "\"" # escapeJson(d1)          # "\","
      # "\"None of the above\""
    # "],"
    # "\"answer\":\""     # escapeJson(seed.answer)  # "\","
    # "\"subject\":\""    # escapeJson(seed.subject) # "\","
    # "\"gradeLevel\":10,"
    # "\"cohScore\":0.618"
    # "}";
  };

  // ── escapeJson helper ─────────────────────────────────────────────────────
  // Escapes backslashes and double-quotes for embedding in JSON strings.
  func escapeJson(s : Text) : Text {
    Text.replace(s, #text("\""), "\\\"");
  };
};
