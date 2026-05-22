// Field Monitor — Organism Health Monitor
// Tracks system-wide aggregate learning patterns (no PII — aggregate only).
// Computes FieldScore: overall sovereign organism health metric 0–100.
// Fires from EDDI OS heartbeat. Powers FIELD_MODE in EDDI.
// LEX_SOVEREIGNUS: All computation native. No PII stored or exposed.

import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Common "../types/common";

module {

  // ── Fibonacci ─────────────────────────────────────────────────────────────
  let FIB : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  func fibFloor(n : Nat) : Nat {
    var r : Nat = 1;
    for (f in FIB.vals()) { if (f <= n) r := f };
    r;
  };

  // ── Organism Pulse record ─────────────────────────────────────────────────
  public type OrganismPulse = {
    fieldScore         : Nat;   // 0-100 Fibonacci-floored organism health
    activeSessionCount : Nat;   // total active sessions in current window
    totalSeedCount     : Nat;   // total KERNEL_SEEDs ever produced
    deepReasonCalls    : Nat;   // ADEDDI deep reason calls since boot
    avgCoherence       : Nat;   // avg COH score 0-100
    enginesActive      : Nat;   // count of active sovereign engines
    heartbeatCycle     : Nat;   // current heartbeat count
    fieldStatus        : Text;  // "SOVEREIGN" | "GROWING" | "BUILDING" | "GENESIS"
    timestamp          : Common.Timestamp;
  };

  // ── Field Monitor state ───────────────────────────────────────────────────
  public type FieldState = {
    var activeSessions  : Nat;
    var totalSeeds      : Nat;
    var deepCalls       : Nat;
    var cohSum          : Nat;   // sum for avg computation
    var cohCount        : Nat;
    var heartbeats      : Nat;
    var lastPulseAt     : Common.Timestamp;
  };

  public func newState() : FieldState {
    {
      var activeSessions  = 0;
      var totalSeeds      = 0;
      var deepCalls       = 0;
      var cohSum          = 0;
      var cohCount        = 0;
      var heartbeats      = 0;
      var lastPulseAt     = Time.now();
    };
  };

  // ── Tick — called from heartbeat ──────────────────────────────────────────
  public func tick(state : FieldState) {
    state.heartbeats += 1;
    state.lastPulseAt := Time.now();
  };

  // ── Record a session start ────────────────────────────────────────────────
  public func recordSession(state : FieldState) {
    state.activeSessions += 1;
  };

  // ── Record a seed sealed ──────────────────────────────────────────────────
  public func recordSeed(state : FieldState) {
    state.totalSeeds += 1;
  };

  // ── Record a deep reasoning call ──────────────────────────────────────────
  public func recordDeepCall(state : FieldState) {
    state.deepCalls += 1;
  };

  // ── Record a coherence score sample ──────────────────────────────────────
  public func recordCoherence(state : FieldState, coh : Nat) {
    state.cohSum   += coh;
    state.cohCount += 1;
  };

  // ── Compute organism pulse ────────────────────────────────────────────────
  // PHI-weighted field score:
  //   score = FLOR((activeSessions × 618 + totalSeeds × 382 + deepCalls × 1618) / 1000)
  //   clamped to 0-100, then Fibonacci-floored.
  public func getOrganismPulse(state : FieldState, enginesActive : Nat) : OrganismPulse {
    let raw : Nat = (
      state.activeSessions * 618 +
      state.totalSeeds * 382 +
      state.deepCalls * 1618
    ) / 1000;
    let clamped = if (raw > 100) 100 else raw;
    let score = fibFloor(if (clamped == 0) 1 else clamped);
    let avgCoh = if (state.cohCount == 0) 0 else state.cohSum / state.cohCount;
    let status =
      if (score >= 89)      "SOVEREIGN"
      else if (score >= 55) "GROWING"
      else if (score >= 21) "BUILDING"
      else                  "GENESIS";
    {
      fieldScore         = score;
      activeSessionCount = state.activeSessions;
      totalSeedCount     = state.totalSeeds;
      deepReasonCalls    = state.deepCalls;
      avgCoherence       = avgCoh;
      enginesActive;
      heartbeatCycle     = state.heartbeats;
      fieldStatus        = status;
      timestamp          = Time.now();
    };
  };
};
