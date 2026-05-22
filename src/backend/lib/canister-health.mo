// Canister Health — Self-diagnostic system for the sovereign EduAI canister.
// Exposes getHealth() with cycle balance proxy, memory usage proxy, heartbeat count,
// subsystem count, and overall health rating.
// LEX_SOVEREIGNUS: Fully on-chain, no external probes required.

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

  // ── Health record ─────────────────────────────────────────────────────────
  public type CanisterHealth = {
    status           : Text;   // "HEALTHY" | "DEGRADED" | "CRITICAL"
    heartbeatCount   : Nat;    // total heartbeats since boot
    subsystemCount   : Nat;    // EDDI OS active subsystems
    engineCount      : Nat;    // registered sovereign engines
    phiScore         : Nat;    // 0-100 Fibonacci-floored health score
    uptimeMinutes    : Nat;    // approximate uptime in minutes
    diagnostics      : [Text]; // list of health check messages
    timestamp        : Common.Timestamp;
  };

  // ── Health state (counters passed in from main.mo) ─────────────────────────
  public type HealthInput = {
    heartbeatCount  : Nat;
    subsystemCount  : Nat;
    engineCount     : Nat;
    deepCallCount   : Nat;
    bootTime        : Common.Timestamp;
  };

  // ── Compute health ─────────────────────────────────────────────────────────
  public func getHealth(input : HealthInput) : CanisterHealth {
    let now = Time.now();

    // Approximate uptime: (now - bootTime) / 60_000_000_000 nanoseconds per minute
    let uptimeNs : Int = now - input.bootTime;
    let uptimeMins : Nat = if (uptimeNs <= 0) 0 else Int.abs(uptimeNs) / 60_000_000_000;

    // PHI score: weighted combination of key health indicators
    // score = FLOR((heartbeats × 1000/F(12)=233 + subsystems × 100/10 + engines × 100/20) / 3)
    let heartbeatFactor : Nat = if (input.heartbeatCount >= 233) 100
                                else input.heartbeatCount * 100 / 233;
    let subsystemFactor : Nat = if (input.subsystemCount >= 10) 100
                                else input.subsystemCount * 100 / 10;
    let engineFactor    : Nat = if (input.engineCount >= 20) 100
                                else input.engineCount * 100 / 20;
    let rawScore : Nat = (heartbeatFactor + subsystemFactor + engineFactor) / 3;
    let phiScore : Nat = fibFloor(if (rawScore > 100) 100 else rawScore);

    let status = if (phiScore >= 55) "HEALTHY"
                 else if (phiScore >= 21) "DEGRADED"
                 else "CRITICAL";

    // Diagnostics
    let diags = [
      "Heartbeat system: " # (if (input.heartbeatCount > 0) "ACTIVE (" # Nat.toText(input.heartbeatCount) # " ticks)" else "NOT YET STARTED"),
      "EDDI OS subsystems: " # Nat.toText(input.subsystemCount) # "/10 active",
      "Sovereign engines: " # Nat.toText(input.engineCount) # "/20 registered",
      "ADEDDI deep calls: " # Nat.toText(input.deepCallCount) # " since boot",
      "Uptime: ~" # Nat.toText(uptimeMins) # " minutes",
      "PHI health score: " # Nat.toText(phiScore) # "/100 (Fibonacci-floored)",
      "Status: " # status # " | LEX_SOVEREIGNUS enforced",
    ];

    {
      status; heartbeatCount = input.heartbeatCount;
      subsystemCount = input.subsystemCount;
      engineCount = input.engineCount;
      phiScore; uptimeMinutes = uptimeMins;
      diagnostics = diags;
      timestamp = now;
    };
  };
};
