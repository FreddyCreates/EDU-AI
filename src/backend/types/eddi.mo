import Common "common";

module {
  /// EDDI unified mode variant — all intelligence routes through one of these.
  /// v26 adds DEEP_MODE (full ADEDDI reasoning), FIELD_MODE (organism awareness),
  /// SUBSTRATE_MODE (multi-substrate operations).
  public type EDDIMode = {
    #STUDENT_MODE;
    #TEACHER_MODE;
    #PRINCIPAL_MODE;
    #BUILD_MODE;
    #MEMORY_MODE;
    #RECOGNITION_MODE;
    #ARCHITECT_MODE;
    // ── Alpha Deep EDDI (v26) ──────────────────────────────────────────────
    #DEEP_MODE;        // Full ADEDDI 7-layer reasoning chain
    #FIELD_MODE;       // Organism-level field awareness
    #SUBSTRATE_MODE;   // Multi-substrate routing operations
  };

  /// Canonical EDDI unified model record.
  public type EDDI = {
    id : Text;         // always "EDDI"
    name : Text;       // always "EDDI"
    version : Nat;     // 26 (Alpha Deep EDDI)
    modeCount : Nat;   // 10
    sealedAt : Common.Timestamp;
    law : Text;        // LEX_EDDI_UNIFIED
  };

  /// A session-mode binding — stores which mode a principal is currently in.
  public type ModeSetting = {
    mode : EDDIMode;
    setAt : Common.Timestamp;
  };

  /// A user-created agent bound to an EDDI mode.
  public type UserAgent = {
    id : Text;
    owner : Common.UserId;
    name : Text;
    modeBinding : EDDIMode;
    reasoningSeed : Text;
    memoryConfig : Text;
    createdAt : Common.Timestamp;
  };

  // ── Alpha Deep EDDI (ADEDDI) types ─────────────────────────────────────────

  /// The 7 internal reasoning layers of ADEDDI.
  /// Every response passes through all layers in sequence.
  public type EDDILayer = {
    #INPUT;      // Raw input parsing + intent classification
    #CLASSIFY;   // Subject/grade/mode routing
    #COGT;       // Cognitive reasoning chain (PHI-weighted)
    #META;       // META synthesis — 3 paths + 1 novel answer
    #AUTN;       // AUTN autonomous novel response layer
    #SYNTHESIS;  // PHI-weighted output merge across all layers
    #SEAL;       // Artifact crystallization + seed generation
  };

  /// A single layer's output in a reasoning trace.
  public type LayerOutput = {
    layer     : EDDILayer;
    output    : Text;
    phiWeight : Nat;   // integer PHI weight × 1000 (618 = PHI_INV, 382 = PHI_INV_SQ, 1618 = PHI)
    engineHit : Text;  // which engine was invoked (empty if none)
    latencyNs : Int;   // nanoseconds for this layer
  };

  /// Full reasoning trace for a single ADEDDI response — powers explainability.
  public type ReasoningTrace = {
    sessionId  : Text;
    caller     : Common.UserId;
    inputText  : Text;
    modeUsed   : EDDIMode;
    layers     : [LayerOutput];
    finalOutput : Text;
    totalEngines : Nat;    // how many engines were invoked
    createdAt  : Common.Timestamp;
  };

  /// Aggregate field state — organism-level awareness (no PII).
  public type FieldState = {
    activeUsers          : Nat;
    dominantMode         : EDDIMode;
    modeDistribution     : [(Text, Nat)];  // (modeLabel, count)
    fieldScore           : Nat;            // 0-100, Fibonacci-floored organism health
    activeEngineCount    : Nat;
    totalSessionsThisHour : Nat;
    avgReasoningDepth    : Nat;            // avg layers activated per response
    timestamp            : Common.Timestamp;
  };

  /// The Alpha Deep EDDI organism record — singleton, sealed under ALPH v26.
  public type AlphaDeepEDDI = {
    id              : Text;   // "ADEDDI"
    fullName        : Text;   // "Alpha Deep EDDI"
    version         : Nat;    // 26
    generation      : Text;   // "ALPHA"
    substrateId     : Text;   // "ICP-MULTI"
    layers          : [EDDILayer];       // ordered 7-layer chain
    activeEngines   : [Text];            // codenames of all active engines
    reasoningDepth  : Nat;               // max layers activated per call (7)
    sealedAt        : Common.Timestamp;
    law             : Text;   // LEX_ADEDDI
  };

  // ── EDDI OS types ──────────────────────────────────────────────────────────

  /// Status of a named EDDI OS subsystem.
  public type SubsystemStatus = {
    #ACTIVE;
    #DORMANT;
    #BOOTING;
    #FAULT;
  };

  /// A single EDDI OS subsystem descriptor.
  public type Subsystem = {
    id          : Text;
    name        : Text;
    status      : SubsystemStatus;
    bootedAt    : ?Common.Timestamp;
    heartbeats  : Nat;
    description : Text;
  };

  /// Full EDDI OS status snapshot.
  public type EddiOsStatus = {
    osVersion        : Text;   // "EDDI_OS v1.0 ALPHA"
    activeSubsystems : Nat;
    totalSubsystems  : Nat;
    subsystems       : [Subsystem];
    uptimeHeartbeats : Nat;
    fieldScore       : Nat;
    timestamp        : Common.Timestamp;
  };
};
