// EDDI OS — The sovereign AI operating system kernel of EduAI.
// LEX_EDDI_OS: All internal AI subsystems are registered, booted, and monitored here.
// LEX_SOVEREIGNUS: Fully on-chain, ICP-native, no external dependencies.
//
// EDDI OS orchestrates all internal AI subsystem lifecycle:
//   boot → active → dormant → shutdown
//
// Subsystems registered:
//   ADEDDI-CORE    — Alpha Deep EDDI reasoning engine
//   COGT-CHAIN     — Cognitive reasoning subsystem
//   META-SYNTH     — META synthesis subsystem
//   AUTN-ENGINE    — Autonomous novel response subsystem
//   FIELD-MONITOR  — Organism field health monitor
//   DOCTRINE-COMP  — Sovereign doctrine compiler
//   RCGN-AUTO      — Recognition autonomous pipeline
//   VAULT-SYNC     — Sovereign memory vault synchroniser
//   RATE-GATE      — Fibonacci rate limiting subsystem
//   AUTH-GUARD     — Internet Identity enforcement layer

import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Common "../types/common";
import Types "../types/eddi";

module {

  // ── Fibonacci floor ───────────────────────────────────────────────────────
  let FIB : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  func fibFloor(n : Nat) : Nat {
    var r : Nat = 1;
    for (f in FIB.vals()) { if (f <= n) r := f };
    r;
  };

  // ── OS state ──────────────────────────────────────────────────────────────
  public type OsState = {
    var subsystems       : Map.Map<Text, Types.Subsystem>;
    var uptimeHeartbeats : Nat;
    var bootedAt         : Common.Timestamp;
  };

  public func newOsState() : OsState {
    let state : OsState = {
      var subsystems       = Map.empty();
      var uptimeHeartbeats = 0;
      var bootedAt         = Time.now();
    };
    // Register all EDDI OS subsystems at boot
    let subsystemDefs : [(Text, Text, Text)] = [
      ("ADEDDI-CORE",   "Alpha Deep EDDI",             "7-layer PHI-weighted sovereign reasoning engine. Powers DEEP_MODE and all deep reasoning calls."),
      ("COGT-CHAIN",    "Cognitive Chain",              "COGT expand-critique-synthesize chain. PHI_INV=61.8% primary, PHI_INV_SQ=38.2% critique."),
      ("META-SYNTH",    "META Synthesis",               "Multi-path synthesis: always returns 3 paths + 1 novel autonomous answer. Architecture Council law enforced."),
      ("AUTN-ENGINE",   "Autonomous Engine",            "PHI-entropy seeded novel response generator. Fires when COGT/META produce low-confidence outputs."),
      ("FIELD-MONITOR", "Field Monitor",                "Tracks aggregate organism health metrics. Computes FieldScore. No PII stored."),
      ("DOCTRINE-COMP", "Doctrine Compiler",            "Compresses session outputs to 5 sovereign artifact formats: seed/kernel/doctrine/artifact/scroll."),
      ("RCGN-AUTO",     "Recognition Pipeline",         "Autonomous RCGN→NOMS→ACHV pipeline. Fires every F(6)=8 heartbeat cycles."),
      ("VAULT-SYNC",    "Vault Synchroniser",           "Routes KERNEL_SEEDs to AbyssusVault canister. Fibonacci-batched drain cycle."),
      ("RATE-GATE",     "Fibonacci Rate Gate",          "F(8)=21 requests/minute per principal. Rejects excess calls with sovereign error."),
      ("AUTH-GUARD",    "Internet Identity Guard",      "Enforces non-anonymous principal on every write call. Rejects anonymous access."),
    ];
    for ((id, name, desc) in subsystemDefs.vals()) {
      let sub : Types.Subsystem = {
        id; name;
        status      = #ACTIVE;
        bootedAt    = ?Time.now();
        heartbeats  = 0;
        description = desc;
      };
      state.subsystems.add(id, sub);
    };
    state;
  };

  // ── Heartbeat tick ────────────────────────────────────────────────────────
  // Called from main.mo heartbeat. Increments heartbeat counters on all subsystems.
  public func tick(state : OsState) {
    state.uptimeHeartbeats += 1;
    for ((id, sub) in state.subsystems.entries()) {
      let updated : Types.Subsystem = {
        id          = sub.id;
        name        = sub.name;
        status      = sub.status;
        bootedAt    = sub.bootedAt;
        heartbeats  = sub.heartbeats + 1;
        description = sub.description;
      };
      state.subsystems.add(id, updated);
    };
  };

  // ── Boot / shutdown ───────────────────────────────────────────────────────
  public func bootSubsystem(state : OsState, id : Text) : Bool {
    switch (state.subsystems.get(id)) {
      case null false;
      case (?sub) {
        let updated : Types.Subsystem = {
          id          = sub.id;
          name        = sub.name;
          status      = #ACTIVE;
          bootedAt    = ?Time.now();
          heartbeats  = sub.heartbeats;
          description = sub.description;
        };
        state.subsystems.add(id, updated);
        true;
      };
    };
  };

  public func shutdownSubsystem(state : OsState, id : Text) : Bool {
    switch (state.subsystems.get(id)) {
      case null false;
      case (?sub) {
        let updated : Types.Subsystem = {
          id          = sub.id;
          name        = sub.name;
          status      = #DORMANT;
          bootedAt    = sub.bootedAt;
          heartbeats  = sub.heartbeats;
          description = sub.description;
        };
        state.subsystems.add(id, updated);
        true;
      };
    };
  };

  // ── Status snapshot ───────────────────────────────────────────────────────
  public func getStatus(state : OsState, fieldScore : Nat) : Types.EddiOsStatus {
    let list = List.empty<Types.Subsystem>();
    var active : Nat = 0;
    var total  : Nat = 0;
    for ((_id, sub) in state.subsystems.entries()) {
      list.add(sub);
      total += 1;
      if (sub.status == #ACTIVE) active += 1;
    };
    {
      osVersion        = "EDDI_OS v1.0 ALPHA";
      activeSubsystems = active;
      totalSubsystems  = total;
      subsystems       = list.toArray();
      uptimeHeartbeats = state.uptimeHeartbeats;
      fieldScore       = fibFloor(if (fieldScore > 100) 100 else fieldScore);
      timestamp        = Time.now();
    };
  };

  // ── Get a single subsystem ────────────────────────────────────────────────
  public func getSubsystem(state : OsState, id : Text) : ?Types.Subsystem {
    state.subsystems.get(id);
  };
};
