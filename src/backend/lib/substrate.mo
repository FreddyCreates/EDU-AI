// Substrate Registry — Multi-Substrate Layer
// LEX_SUBSTRATE_MULTI: EduAI routes computation optimally across ICP, Julia, and EduAI-Native runtimes.
// ICP = default for all state, authentication, and canister logic.
// Julia = numeric computation offload path (spaced repetition, compound scoring).
// EduAI Native = local sovereign model inference (ADEDDI on-device).
//
// The substrate layer is declarative — no live inter-substrate RPC in this module.
// It defines the registry and routing logic. ICP inter-canister calls are handled separately.

import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";

module {

  // ── Substrate type ────────────────────────────────────────────────────────
  public type SubstrateType = {
    #ICP;           // Internet Computer Protocol — sovereign default
    #JULIA;         // Julia runtime — numeric + scientific computation
    #EDURAI_NATIVE; // EduAI native runtime — local model inference
    #MULTI;         // Multi-substrate composite (spans 2+ substrates)
  };

  // ── Substrate status ──────────────────────────────────────────────────────
  public type SubstrateStatus = {
    #ONLINE;
    #DEGRADED;
    #OFFLINE;
  };

  // ── Capability flags ──────────────────────────────────────────────────────
  // Each flag indicates what this substrate can handle.
  public type CapabilityFlag =
    #STATE_STORAGE | #AUTHENTICATION | #COMPUTATION |
    #NUMERIC_HEAVY | #MODEL_INFERENCE | #REALTIME_STREAM;

  // ── Substrate node ────────────────────────────────────────────────────────
  public type SubstrateNode = {
    id               : Text;
    substrateType    : SubstrateType;
    status           : SubstrateStatus;
    capabilityFlags  : [CapabilityFlag];
    latencyMs        : Nat;   // estimated round-trip latency in ms
    description      : Text;
  };

  // ── Compute type — what kind of work needs routing ─────────────────────────
  public type ComputeType =
    #SOVEREIGN_STATE |   // canonical state, auth, history → ICP
    #DEEP_REASONING |    // ADEDDI multi-layer chain → ICP (native)
    #NUMERIC_COMPOUND |  // Fibonacci scoring, spaced repetition → Julia
    #LOCAL_INFERENCE |   // On-device model inference → EduAI Native
    #STREAM_METRICS;     // Real-time field monitor stream → ICP multi-cast

  // ── Registry store ────────────────────────────────────────────────────────
  public type SubstrateRegistry = Map.Map<Text, SubstrateNode>;

  public func newRegistry() : SubstrateRegistry {
    let reg : SubstrateRegistry = Map.empty();
    // Seed canonical substrates
    let nodes : [SubstrateNode] = [
      {
        id = "ICP-MAIN";
        substrateType = #ICP;
        status = #ONLINE;
        capabilityFlags = [#STATE_STORAGE, #AUTHENTICATION, #COMPUTATION, #REALTIME_STREAM];
        latencyMs = 2000; // ICP consensus ~2s
        description = "Internet Computer Protocol — primary sovereign substrate. All state, auth, and canister logic. Default for all operations.";
      },
      {
        id = "ICP-VAULT";
        substrateType = #ICP;
        status = #ONLINE;
        capabilityFlags = [#STATE_STORAGE, #COMPUTATION];
        latencyMs = 2000;
        description = "AbyssusVault canister — sovereign memory substrate. Stores KERNEL_SEEDs and compressed passport blobs.";
      },
      {
        id = "ICP-INTELLIGENCE";
        substrateType = #ICP;
        status = #ONLINE;
        capabilityFlags = [#COMPUTATION, #MODEL_INFERENCE];
        latencyMs = 2000;
        description = "Intelligence canister — ADEDDI deep reasoning. Separate cycle budget for compute-heavy 7-layer chains.";
      },
      {
        id = "ICP-RECOGNITION";
        substrateType = #ICP;
        status = #ONLINE;
        capabilityFlags = [#COMPUTATION, #REALTIME_STREAM];
        latencyMs = 2000;
        description = "Recognition canister — autonomous RCGN→NOMS→ACHV pipeline. Fires every F(6)=8 heartbeat cycles.";
      },
      {
        id = "JULIA-NUMERIC";
        substrateType = #JULIA;
        status = #ONLINE;
        capabilityFlags = [#NUMERIC_HEAVY, #COMPUTATION];
        latencyMs = 50; // local Julia runtime
        description = "Julia runtime — numeric computation offload. Spaced repetition intervals, compound PHI scoring, Fibonacci sequences at scale.";
      },
      {
        id = "EDURAI-LOCAL";
        substrateType = #EDURAI_NATIVE;
        status = #ONLINE;
        capabilityFlags = [#MODEL_INFERENCE, #COMPUTATION];
        latencyMs = 10; // local inference
        description = "EduAI Native runtime — local sovereign model inference. Runs ADEDDI-derived models on-device without ICP round-trips.";
      },
    ];
    for (n in nodes.vals()) { reg.add(n.id, n) };
    reg;
  };

  // ── Route: find optimal substrate for a compute type ──────────────────────
  // Returns the best-match substrate node ID for the given compute requirement.
  public func routeToSubstrate(reg : SubstrateRegistry, computeType : ComputeType) : ?SubstrateNode {
    let preferredId = switch (computeType) {
      case (#SOVEREIGN_STATE)   "ICP-MAIN";
      case (#DEEP_REASONING)    "ICP-INTELLIGENCE";
      case (#NUMERIC_COMPOUND)  "JULIA-NUMERIC";
      case (#LOCAL_INFERENCE)   "EDURAI-LOCAL";
      case (#STREAM_METRICS)    "ICP-MAIN";
    };
    // Return preferred if online, else search for any online substrate with matching capability
    switch (reg.get(preferredId)) {
      case (?node) {
        if (node.status == #ONLINE) ?node
        else {
          // Fallback: find any ONLINE ICP substrate
          var fallback : ?SubstrateNode = null;
          for ((_id, n) in reg.entries()) {
            if (n.substrateType == #ICP and n.status == #ONLINE and fallback == null) {
              fallback := ?n;
            };
          };
          fallback;
        };
      };
      case null null;
    };
  };

  // ── Get all nodes ─────────────────────────────────────────────────────────
  public func getAll(reg : SubstrateRegistry) : [SubstrateNode] {
    let list = List.empty<SubstrateNode>();
    for ((_id, n) in reg.entries()) { list.add(n) };
    list.toArray();
  };

  // ── Update node status ────────────────────────────────────────────────────
  public func setStatus(reg : SubstrateRegistry, id : Text, status : SubstrateStatus) : Bool {
    switch (reg.get(id)) {
      case null false;
      case (?node) {
        let updated : SubstrateNode = {
          id               = node.id;
          substrateType    = node.substrateType;
          status;
          capabilityFlags  = node.capabilityFlags;
          latencyMs        = node.latencyMs;
          description      = node.description;
        };
        reg.add(id, updated);
        true;
      };
    };
  };
};
