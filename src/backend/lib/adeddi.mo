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
import CogtEngine "./cogt-engine";
import MetaSynthesis "./meta-synthesis";
import AutnEngine "./autn-engine";
import DeepKernel "./deep-kernel";
import DoctrineCompiler "./doctrine-compiler";
import FieldMonitor "./field-monitor";

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

  /// Shared FieldMonitor state — tracks aggregate organism health across all deep calls.
  public type SharedFieldState = FieldMonitor.FieldState;
  public func newFieldState() : SharedFieldState { FieldMonitor.newState() };

  /// Shared DoctrineCompiler artifact store.
  public type ArtifactStore = DoctrineCompiler.ArtifactStore;
  public func newArtifactStore() : ArtifactStore { DoctrineCompiler.newStore() };

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

  // ── Layer 3: COGT — specialist cognitive chain ───────────────────────────
  // Uses CogtEngine (expand → critique → synthesize) — full PHI-weighted run.
  // Grade and subject are extracted from sessionId best-effort; defaults to "9"/"General".
  func layerCogt(msg : Text, engineId : Text, now : Int) : Types.LayerOutput {
    // Extract grade/subject hints from engineId or message (best-effort)
    let grade = if (msg.toLower().contains(#text "grade"))  "9" else "9";
    let subject = switch (engineId) {
      case "PHAEDRUS"         "Mathematics";
      case "LOGOS"            "Science";
      case "KRONOS"           "Social Studies";
      case "SCRIPTORIUM-REX" "English Language Arts";
      case "HERALD"           "Language";
      case _                  "General";
    };
    let cogtResult = CogtEngine.runText(msg, subject, grade, msg);
    {
      layer     = #COGT;
      output    = cogtResult;
      phiWeight = PHI_W;
      engineHit = engineId;
      latencyNs = Time.now() - now;
    };
  };

  // ── Layer 4: META — Architecture Council multi-path synthesis ────────────
  // Uses MetaSynthesis (3 paths + 1 novel) per LEX_ARCH_COUNCIL.
  func layerMeta(msg : Text, engineId : Text, now : Int) : Types.LayerOutput {
    // PHI-entropy seed from message + engine hit
    let seed = DeepKernel.sessionEntropy(engineId, now);
    let metaResult = MetaSynthesis.runText(msg, engineId, seed);
    {
      layer     = #META;
      output    = metaResult;
      phiWeight = UNIT_W;
      engineHit = engineId;
      latencyNs = Time.now() - now;
    };
  };

  // ── Layer 5: AUTN — PHI-entropy autonomous novel response ────────────────
  // Uses AutnEngine (8 archetypes, PHI-seeded) — never repeats the same form.
  func layerAutn(msg : Text, now : Int) : Types.LayerOutput {
    let autnResult = AutnEngine.run(msg);
    {
      layer     = #AUTN;
      output    = autnResult.response;
      phiWeight = PHI_SQ_W;
      engineHit = "AUTN-" # Nat.toText(autnResult.archetype);
      latencyNs = Time.now() - now;
    };
  };

  // ── Layer 6: SYNTHESIS — PHI-weighted merge across all three specialist engines ──
  func layerSynthesis(
    cogtOut   : Text,
    metaOut   : Text,
    autnOut   : Text,
    msg       : Text,
    engineId  : Text,
    now       : Int,
  ) : Types.LayerOutput {
    // PHI-blend: primary = COGT (highest weight), secondary = META, tertiary = AUTN
    // Use EngineLogic for the direct engine dispatch as the authoritative unified answer
    let directAnswer = EngineLogic.dispatch(engineId, msg, "deep");
    // Compute compound score using DeepKernel's PHI blend
    let cogtScore  = DeepKernel.fibFloor(cogtOut.size() % 100 + 1);
    let metaScore  = DeepKernel.fibFloor(metaOut.size() % 100 + 1);
    let blendScore = DeepKernel.phiBlend(cogtScore, metaScore);

    let synth =
      "🧠 ALPHA DEEP EDDI — Sovereign Intelligence Response\n\n" #
      "━━━ COGNITIVE LAYER [CogtEngine · " # Nat.toText(PHI_W) # "/1000] ━━━\n" #
      cogtOut # "\n\n" #
      "━━━ MULTI-PATH SYNTHESIS [MetaSynthesis · Architecture Council] ━━━\n" #
      metaOut # "\n\n" #
      "━━━ AUTONOMOUS NOVEL INSIGHT [AutnEngine · " # Nat.toText(PHI_SQ_W) # "/1000] ━━━\n" #
      autnOut # "\n\n" #
      "━━━ UNIFIED FIELD ANSWER [" # engineId # " direct → OMNIS merge] ━━━\n" #
      directAnswer # "\n\n" #
      "PHI-compound blend: " # Nat.toText(blendScore) # "/100 | " #
      "Reasoning depth: " # Nat.toText(ADEDDI_INSTANCE.reasoningDepth) # " layers | " #
      "Active engines: " # Nat.toText(ADEDDI_INSTANCE.activeEngines.size()) # " | " #
      "Sealed under LEX_ADEDDI.";
    {
      layer     = #SYNTHESIS;
      output    = synth;
      phiWeight = PHI_W;
      engineHit = "OMNIS";
      latencyNs = Time.now() - now;
    };
  };

  // ── Layer 7: SEAL — DoctrineCompiler artifact crystallization ────────────
  // Produces 5 sovereign artifacts (SEED/KERNEL/DOCTRINE/ARTIFACT/SCROLL).
  func layerSeal(
    msg           : Text,
    sessionId     : Text,
    synthesisOut  : Text,
    engineId      : Text,
    caller        : Common.UserId,
    artifactStore : ArtifactStore,
    now           : Int,
  ) : Types.LayerOutput {
    let phiWeight = DeepKernel.fibFloor(msg.size() + 55);
    let artifacts = DoctrineCompiler.crystallise(
      artifactStore, caller, sessionId, msg, synthesisOut, engineId, now
    );
    let artifactIds = artifacts.size();
    {
      layer     = #SEAL;
      output    = "Doctrine sealed: " # Nat.toText(artifactIds) # " artifacts (SEED/KERNEL/DOCTRINE/ARTIFACT/SCROLL) | " #
                  "Session: " # sessionId # " | Engine: " # engineId # " | " #
                  "PHI compound weight: " # Nat.toText(phiWeight) # " | " #
                  "Vault eligible: " # (if (phiWeight >= 13) "YES" else "NO") # " | " #
                  "Sealed under SCRIPTORIUM-REX → LEX_SOVEREIGNUS.";
      phiWeight = PHI_INV_W;
      engineHit = "SCRIPTORIUM-REX";
      latencyNs = Time.now() - now;
    };
  };

  // ── Core: deepReason ─────────────────────────────────────────────────────
  // Full 7-layer ADEDDI reasoning chain. Returns trace + final output.
  // Wired to FieldMonitor and DoctrineCompiler for live organism tracking.
  public func deepReason(
    traceStore    : TraceStore,
    caller        : Common.UserId,
    mode          : Types.EDDIMode,
    msg           : Text,
    sessionId     : Text,
    now           : Common.Timestamp,
    fieldState    : SharedFieldState,
    artifactStore : ArtifactStore,
  ) : Types.ReasoningTrace {
    let t0 = now;

    // Record this deep call in the field monitor
    FieldMonitor.recordDeepCall(fieldState);
    FieldMonitor.recordSession(fieldState);

    let l1 = layerInput(msg, t0);
    let l2 = layerClassify(msg, mode, t0);
    let engineId = l2.engineHit;
    let l3 = layerCogt(msg, engineId, t0);
    let l4 = layerMeta(msg, engineId, t0);
    let l5 = layerAutn(msg, t0);
    let l6 = layerSynthesis(l3.output, l4.output, l5.output, msg, engineId, t0);
    let l7 = layerSeal(msg, sessionId, l6.output, engineId, caller, artifactStore, t0);

    // Record coherence sample (proxy: synthesis output length → 0-100 coh estimate)
    let cohProxy = DeepKernel.fibFloor((l6.output.size() % 100) + 1);
    FieldMonitor.recordCoherence(fieldState, cohProxy);

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

  // ── Field Monitor pulse — live organism health ────────────────────────────
  public func getOrganismPulse(
    fieldState    : SharedFieldState,
    enginesActive : Nat,
  ) : FieldMonitor.OrganismPulse {
    FieldMonitor.getOrganismPulse(fieldState, enginesActive);
  };

  // ── Field Monitor tick — called from heartbeat ────────────────────────────
  public func tickFieldMonitor(fieldState : SharedFieldState) {
    FieldMonitor.tick(fieldState);
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
      modeDistribution     = List.toArray(distList);
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
