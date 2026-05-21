import Time "mo:core/Time";
import Array "mo:core/Array";
import Types "../types/entanglements";
import EntanglementsLib "../lib/entanglements";

mixin () {
  // ── Stable state ─────────────────────────────────────────────────────────
  var entanglements : [Types.EntanglementRecord] = EntanglementsLib.seedEntanglements();
  var entanglementCycleCount : Nat = 0;
  var echoCoherenceStore : [(Text, Nat)] = [];

  // ── Helper: look up coherence for a student (default 89 = F(11)) ─────────
  func lookupCoherence(studentId : Text) : Nat {
    switch (echoCoherenceStore.find(func((sid, _)) { sid == studentId })) {
      case (?(_, coh)) coh;
      case null 89;
    };
  };

  // ── Helper: update coherence in store ────────────────────────────────────
  func updateCoherence(studentId : Text, newCoh : Nat) {
    let exists = echoCoherenceStore.find(func((sid, _)) { sid == studentId }) != null;
    if (exists) {
      echoCoherenceStore := echoCoherenceStore.map(
        func((sid, coh)) {
          if (sid == studentId) (sid, newCoh) else (sid, coh);
        }
      );
    } else {
      echoCoherenceStore := echoCoherenceStore.concat([(studentId, newCoh)]);
    };
  };

  // ── Helper: mutate entanglement by id ────────────────────────────────────
  func bumpTransit(id : Text, delta : Int) {
    let now = Time.now();
    entanglements := entanglements.map(
      func(r) {
        if (r.id == id) {
          {
            r with
            transitCount       = EntanglementsLib.fibFloor(r.transitCount + 1);
            lastEntanglement   = now;
            coherenceDelta     = EntanglementsLib.fibFloorInt(delta);
          };
        } else r;
      }
    );
  };

  // ── Public query: all entanglement records ────────────────────────────────
  public query func getEntanglements() : async [Types.EntanglementRecord] {
    entanglements;
  };

  // ── Public query: single entanglement by id ───────────────────────────────
  public query func getEntanglementById(id : Text) : async ?Types.EntanglementRecord {
    entanglements.find(func(r) { r.id == id });
  };

  // ── Update: record a transit event ───────────────────────────────────────
  public func recordEntanglementTransit(id : Text, rawCoherenceDelta : Int) : async () {
    bumpTransit(id, rawCoherenceDelta);
  };

  // ── Query: NRVE live state ────────────────────────────────────────────────
  public query func getNrveState() : async Types.NrveState {
    EntanglementsLib.buildNrveState(entanglementCycleCount);
  };

  // ── Query: PLSE pulse state ───────────────────────────────────────────────
  public query func getPlseState() : async Types.PlseState {
    EntanglementsLib.buildPlseState(entanglementCycleCount);
  };

  // ── Query: MSRY mastery state for a student ───────────────────────────────
  public query func getMsryState(studentId : Text) : async Types.MsryState {
    // seedCount defaults to 0 — frontend provides studentId for future passport wiring
    let seedCount : Nat = 0;
    EntanglementsLib.buildMsryState(seedCount, entanglementCycleCount);
  };

  // ── Update: record an echo event from the frontend ───────────────────────
  public func recordEchoEvent(
    studentId   : Text,
    eventTypeStr : Text,
    value       : Nat,
    duration    : Nat,
  ) : async Types.EchoResult {
    let eventType : Types.EchoEventType = switch (eventTypeStr) {
      case "answer" #answer;
      case "pause"  #pause;
      case "click"  #click;
      case "scroll" #scroll;
      case _        #click;
    };
    let currentCoherence = lookupCoherence(studentId);
    let result = EntanglementsLib.computeEchoResult(currentCoherence, eventType, value, duration);
    updateCoherence(studentId, result.newCoherence);
    entanglementCycleCount += 1;
    bumpTransit("ECHO", result.coherenceDelta);
    result;
  };

  // ── Query: FLUX surface state for a student ───────────────────────────────
  public query func getFluxState(studentId : Text) : async Types.FluxState {
    let coherenceScore = lookupCoherence(studentId);
    let seedCount : Nat = 5; // default if no passport available
    EntanglementsLib.buildFluxState(seedCount, coherenceScore);
  };

  // ── Query: aggregate entanglement stats ──────────────────────────────────
  public query func getEntanglementStats() : async {
    totalTransits : Nat;
    activeCount : Nat;
    avgCoherenceDelta : Int;
    lastRefresh : Int;
  } {
    var totalTransits : Nat = 0;
    for (r in entanglements.vals()) { totalTransits += r.transitCount };
    let activeCount = entanglements.filter(func(r) { r.status == #active }).size();
    var sumDelta : Int = 0;
    for (r in entanglements.vals()) { sumDelta += r.coherenceDelta };
    let avgCoherenceDelta : Int = EntanglementsLib.fibFloorInt(sumDelta / 10);
    {
      totalTransits;
      activeCount;
      avgCoherenceDelta;
      lastRefresh = Time.now();
    };
  };

  // ── Update: tick cycle (called from main heartbeat) ───────────────────────
  public func tickEntanglementCycle() : async () {
    entanglementCycleCount += 1;
  };
};
