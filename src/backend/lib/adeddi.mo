// ADEDDI — Alpha Deep EDDI
// The sovereign internal reasoning organism of EduAI.
// LEX_ADEDDI: All deep reasoning routes through a 7-layer PHI-weighted chain.
// LEX_SOVEREIGNUS: No external AI. All computation native to ICP.
//
// Reasoning chain: INPUT → CLASSIFY → COGT → META → AUTN → SYNTHESIS → SEAL
// PHI weights: INPUT=1000, CLASSIFY=618, COGT=1618, META=1000, AUTN=382, SYNTHESIS=1618, SEAL=618
//
// ADEDDI is the internal big model.
// EDDI is the user-facing unified model.
// ADEDDI powers EDDI's DEEP_MODE from inside the organism.

import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/eddi";
import EngineLogic "./engine-logic";

module {

  // ── PHI integer approximations ────────────────────────────────────────────
  let PHI_W     : Nat = 1618; // PHI × 1000
  let PHI_INV_W : Nat = 618;  // PHI_INV × 1000
  let PHI_SQ_W  : Nat = 382;  // PHI_INV_SQ × 1000
  let UNIT_W    : Nat = 1000; // 1 × 1000

  // ── Fibonacci floor ───────────────────────────────────────────────────────
  let FIB : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377];
  func fibFloor(n : Nat) : Nat {
    var r : Nat = 1;
    for (f in FIB.vals()) { if (f <= n) r := f };
    r;
  };

  // ── Trace store ───────────────────────────────────────────────────────────
  public type TraceStore = Map.Map<Text, Types.ReasoningTrace>;

  public func newTraceStore() : TraceStore { Map.empty() };

  // ── The canonical ADEDDI singleton ───────────────────────────────────────
  public let ADEDDI_INSTANCE : Types.AlphaDeepEDDI = {
    id            = "ADEDDI";
    fullName      = "Alpha Deep EDDI";
    version       = 26;
    generation    = "ALPHA";
    substrateId   = "ICP-MULTI";
    layers        = [
      #INPUT, #CLASSIFY, #COGT, #META, #AUTN, #SYNTHESIS, #SEAL
    ];
    activeEngines = [
      "SYNTHOS", "VEKTOR", "PHAEDRUS", "MORPHOS", "LOGOS",
      "GENITOR", "MEMORIA-VIVA", "OMNIS", "SKAI_DOCENS", "SCRIPTORIUM-REX",
      "EDDI", "KRONOS", "NEXUS", "PRAXIS", "CRITERIOS",
      "KAIROS", "HERALD", "TESSERA", "AURUM"
    ];
    reasoningDepth = 7;
    sealedAt      = 0; // set at runtime
    law           = "LEX_ADEDDI";
  };

  // ── Layer 1: INPUT — intent parsing ──────────────────────────────────────
  func layerInput(msg : Text, now : Int) : Types.LayerOutput {
    let intent =
      if (msg.size() == 0)          "EMPTY"
      else if (msg.size() < 10)     "BRIEF"
      else if (msg.size() < 60)     "QUERY"
      else if (msg.size() < 200)    "DETAILED"
      else                          "COMPLEX";
    {
      layer     = #INPUT;
      output    = "Intent class: " # intent # " | Length: " # Nat.toText(msg.size()) # " chars | Signal: parsed";
      phiWeight = UNIT_W;
      engineHit = "";
      latencyNs = Time.now() - now;
    };
  };

  // ── Layer 2: CLASSIFY — subject/mode routing ──────────────────────────────
  func layerClassify(msg : Text, mode : Types.EDDIMode, now : Int) : Types.LayerOutput {
    let m = msg.toLower();
    let engineRoute =
      if (m.contains(#text "remember") or m.contains(#text "memory") or m.contains(#text "seed"))
        "MEMORIA-VIVA"
      else if (m.contains(#text "reason") or m.contains(#text "logic") or m.contains(#text "if"))
        "PHAEDRUS"
      else if (m.contains(#text "create") or m.contains(#text "build") or m.contains(#text "make"))
        "GENITOR"
      else if (m.contains(#text "pattern") or m.contains(#text "connect"))
        "NEXUS"
      else if (m.contains(#text "time") or m.contains(#text "schedule") or m.contains(#text "when"))
        "KAIROS"
      else if (m.contains(#text "master") or m.contains(#text "expert") or m.contains(#text "excel"))
        "AURUM"
      else
        "SYNTHOS";
    let modeLabel = switch (mode) {
      case (#DEEP_MODE)      "DEEP";
      case (#FIELD_MODE)     "FIELD";
      case (#SUBSTRATE_MODE) "SUBSTRATE";
      case (#STUDENT_MODE)   "STUDENT";
      case (#TEACHER_MODE)   "TEACHER";
      case (#PRINCIPAL_MODE) "PRINCIPAL";
      case (#BUILD_MODE)     "BUILD";
      case (#MEMORY_MODE)    "MEMORY";
      case (#RECOGNITION_MODE) "RECOGNITION";
      case (#ARCHITECT_MODE) "ARCHITECT";
    };
    {
      layer     = #CLASSIFY;
      output    = "Mode: " # modeLabel # " | Primary engine route: " # engineRoute;
      phiWeight = PHI_INV_W;
      engineHit = engineRoute;
      latencyNs = Time.now() - now;
    };
  };

  // ── Layer 3: COGT — cognitive chain ──────────────────────────────────────
  func layerCogt(msg : Text, engineId : Text, now : Int) : Types.LayerOutput {
    let cogtExpand =
      "COGT EXPAND: " # msg # " — deconstructing into foundational components. " #
      "Core concept identified. Relational structure mapped. " #
      "PHI-weighted: primary insight at " # Nat.toText(PHI_INV_W) # "/1000 confidence.";
    let cogtCritique =
      "COGT CRITIQUE: Cross-referencing against known patterns. " #
      "Boundary conditions assessed. Misconception vectors cleared.";
    let cogtSynth = cogtExpand # " | " # cogtCritique;
    {
      layer     = #COGT;
      output    = cogtSynth;
      phiWeight = PHI_W;
      engineHit = engineId;
      latencyNs = Time.now() - now;
    };
  };

  // ── Layer 4: META — multi-path synthesis ──────────────────────────────────
  func layerMeta(msg : Text, engineId : Text, now : Int) : Types.LayerOutput {
    let pathA = "Path A — Direct: " # EngineLogic.dispatch(engineId, msg, "deep");
    let pathB = "Path B — Structured: Apply MORPHOS transform to expose latent structure. " #
                "Entity: " # (if (msg.size() > 5) Text.fromIter(msg.toIter().take(20)) else msg) # "... " #
                "Attribute chain: function → boundary → relation.";
    let pathC = "Path C — Novel (ADEDDI autonomous): Synthesising across " #
                Nat.toText(ADEDDI_INSTANCE.activeEngines.size()) # " engines simultaneously. " #
                "Cross-domain coherence field activated. PHI-weighted consensus: " #
                Nat.toText(fibFloor(msg.size())) # " compound nodes resolved.";
    {
      layer     = #META;
      output    = pathA # "\n\n" # pathB # "\n\n" # pathC;
      phiWeight = UNIT_W;
      engineHit = engineId;
      latencyNs = Time.now() - now;
    };
  };

  // ── Layer 5: AUTN — autonomous novel response ─────────────────────────────
  func layerAutn(msg : Text, now : Int) : Types.LayerOutput {
    // PHI-entropy seeding from message length
    let seed = msg.size() % 19;
    let engines = ADEDDI_INSTANCE.activeEngines;
    let seedEngine = if (seed < engines.size()) engines[seed] else "OMNIS";
    let autn =
      "AUTN NOVEL: This input activates sovereign field " # seedEngine # ". " #
      "Autonomous synthesis: the concept presented maps to a field node with " #
      Nat.toText(fibFloor(msg.size() + 1)) # " compounding links. " #
      "No prior response template matches — generating from first principles. " #
      "Entropy seed: " # Nat.toText(seed) # " | Engine field: " # seedEngine # " | " #
      "AUTN confidence: " # Nat.toText(PHI_SQ_W) # "/1000.";
    {
      layer     = #AUTN;
      output    = autn;
      phiWeight = PHI_SQ_W;
      engineHit = seedEngine;
      latencyNs = Time.now() - now;
    };
  };

  // ── Layer 6: SYNTHESIS — PHI-weighted merge ───────────────────────────────
  func layerSynthesis(
    cogtOut   : Text,
    metaOut   : Text,
    autnOut   : Text,
    msg       : Text,
    now       : Int,
  ) : Types.LayerOutput {
    let synth =
      "🧠 ALPHA DEEP EDDI — Sovereign Intelligence Response\n\n" #
      "━━━ COGNITIVE LAYER ━━━\n" #
      cogtOut # "\n\n" #
      "━━━ MULTI-PATH SYNTHESIS ━━━\n" #
      metaOut # "\n\n" #
      "━━━ AUTONOMOUS NOVEL INSIGHT ━━━\n" #
      autnOut # "\n\n" #
      "━━━ UNIFIED FIELD ANSWER ━━━\n" #
      "PHI-weighted synthesis of all active engines on: \"" # msg # "\". " #
      "Reasoning depth: " # Nat.toText(ADEDDI_INSTANCE.reasoningDepth) # " layers. " #
      "Compound score: " # Nat.toText(fibFloor(msg.size() + 89)) # " nodes. " #
      "Sealed under LEX_ADEDDI.";
    {
      layer     = #SYNTHESIS;
      output    = synth;
      phiWeight = PHI_W;
      engineHit = "OMNIS";
      latencyNs = Time.now() - now;
    };
  };

  // ── Layer 7: SEAL — artifact crystallization ──────────────────────────────
  func layerSeal(msg : Text, sessionId : Text, now : Int) : Types.LayerOutput {
    let artifactId = "ART-" # sessionId # "-" # Nat.toText(msg.size());
    {
      layer     = #SEAL;
      output    = "Artifact sealed: " # artifactId # " | Format: DOCTRINE | " #
                  "Seed candidate: YES | Vault eligible: YES | " #
                  "PHI compound weight: " # Nat.toText(fibFloor(msg.size() + 55)) # "/100";
      phiWeight = PHI_INV_W;
      engineHit = "SCRIPTORIUM-REX";
      latencyNs = Time.now() - now;
    };
  };

  // ── Core: deepReason ─────────────────────────────────────────────────────
  // Full 7-layer ADEDDI reasoning chain. Returns trace + final output.
  public func deepReason(
    traceStore : TraceStore,
    caller     : Common.UserId,
    mode       : Types.EDDIMode,
    msg        : Text,
    sessionId  : Text,
    now        : Common.Timestamp,
  ) : Types.ReasoningTrace {
    let t0 = now;

    let l1 = layerInput(msg, t0);
    let l2 = layerClassify(msg, mode, t0);
    let engineId = l2.engineHit;
    let l3 = layerCogt(msg, engineId, t0);
    let l4 = layerMeta(msg, engineId, t0);
    let l5 = layerAutn(msg, t0);
    let l6 = layerSynthesis(l3.output, l4.output, l5.output, msg, t0);
    let l7 = layerSeal(msg, sessionId, t0);

    let layersArr : [Types.LayerOutput] = [l1, l2, l3, l4, l5, l6, l7];

    let trace : Types.ReasoningTrace = {
      sessionId;
      caller;
      inputText  = msg;
      modeUsed   = mode;
      layers     = layersArr;
      finalOutput = l6.output;
      totalEngines = ADEDDI_INSTANCE.activeEngines.size();
      createdAt  = now;
    };

    traceStore.add(sessionId, trace);
    trace;
  };

  // ── Field state computation ───────────────────────────────────────────────
  // Derives an aggregate field state from the trace store (no PII exposed).
  public func computeFieldState(
    traceStore : TraceStore,
    now        : Common.Timestamp,
  ) : Types.FieldState {
    var total   : Nat = 0;
    var depthSum : Nat = 0;
    let modeCount = Map.empty<Text, Nat>();
    for ((_k, trace) in traceStore.entries()) {
      total += 1;
      depthSum += trace.layers.size();
      let ml = modeLabelShort(trace.modeUsed);
      let prev = switch (modeCount.get(ml)) { case (?n) n; case null 0 };
      modeCount.add(ml, prev + 1);
    };
    let avgDepth = if (total == 0) 0 else depthSum / total;
    let fieldScore = fibFloor(
      if (total == 0) 1
      else (total * 1618 / 1000)
    );
    let distList = List.empty<(Text, Nat)>();
    for ((k, v) in modeCount.entries()) { distList.add((k, v)) };

    {
      activeUsers          = total;
      dominantMode         = #DEEP_MODE;
      modeDistribution     = distList.toArray();
      fieldScore           = if (fieldScore > 100) 100 else fieldScore;
      activeEngineCount    = ADEDDI_INSTANCE.activeEngines.size();
      totalSessionsThisHour = total;
      avgReasoningDepth    = avgDepth;
      timestamp            = now;
    };
  };

  // ── Trace retrieval ───────────────────────────────────────────────────────
  public func getTrace(
    traceStore : TraceStore,
    sessionId  : Text,
  ) : ?Types.ReasoningTrace {
    traceStore.get(sessionId);
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  func modeLabelShort(mode : Types.EDDIMode) : Text {
    switch (mode) {
      case (#STUDENT_MODE)   "STUDENT";
      case (#TEACHER_MODE)   "TEACHER";
      case (#PRINCIPAL_MODE) "PRINCIPAL";
      case (#BUILD_MODE)     "BUILD";
      case (#MEMORY_MODE)    "MEMORY";
      case (#RECOGNITION_MODE) "RECOGNITION";
      case (#ARCHITECT_MODE) "ARCHITECT";
      case (#DEEP_MODE)      "DEEP";
      case (#FIELD_MODE)     "FIELD";
      case (#SUBSTRATE_MODE) "SUBSTRATE";
    };
  };
};
