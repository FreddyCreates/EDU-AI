import Map "mo:core/Map";
import List "mo:core/List";
import Types "../types/eddi";
import PassportLib "./passport";
import SovereignResponses "./sovereign-responses";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Common "../types/common";

module {
  // ── Store types ────────────────────────────────────────────────────────────
  /// Maps Principal -> current session mode
  public type ModeStore = Map.Map<Common.UserId, Types.ModeSetting>;
  /// Maps Principal -> user-created agents (List for efficient append)
  public type UserAgentStore = Map.Map<Common.UserId, List.List<Types.UserAgent>>;

  // ────────────────────────────────────────────────────────────────────────────
  // EDDI ARCHITECTURE CONSTANTS
  // ────────────────────────────────────────────────────────────────────────────
  // These constants define EDDI's AI model architecture specification.
  // All values align with the sovereign transformer architecture.

  /// Default EDDI architecture specification
  public let EDDI_ARCHITECTURE : Types.EDDIArchitecture = {
    // Parameters: Billions to trillions of weights (~10¹² floats)
    parameterScale = "Billions to trillions of weights";
    parameterMagnitude = 12;  // 10¹² = 1 trillion

    // Attention: Multi-head self-attention mechanisms, O(n²) per layer
    attentionType = "Multi-head self-attention";
    attentionComplexity = "O(n²) per layer";
    attentionHeads = 96;  // Sovereign-scale attention heads

    // Feed-Forward: Dense neural network layers (~4d² per layer)
    feedForwardType = "Dense neural network layers";
    feedForwardComplexity = "~4d² per layer";
    layerCount = 96;  // Deep transformer stack

    // Normalization: Layer norm, RMS norm for stabilization
    normalizationType = "Layer norm + RMS norm";
    normalizationPurpose = "Stabilization";

    // Tokenization: BPE, SentencePiece vocabularies (~100k tokens)
    tokenizationType = "BPE + SentencePiece";
    vocabularySize = 100000;  // ~100k tokens

    // Embeddings: High-dimensional vector spaces (~10⁴ dimensions)
    embeddingType = "High-dimensional vector spaces";
    embeddingDimensions = 10000;  // ~10⁴ dimensions

    // Training Corpus: Vast text data (~10¹² tokens)
    // Note: Using order of magnitude (12) for memory efficiency instead of raw count
    trainingCorpusScale = "Vast text data";
    trainingTokensMagnitude = 12;  // 10¹² tokens (order of magnitude)

    // Emergent Capabilities: Reasoning, code, translation (Unpredicted)
    emergentCapabilities = [
      "Reasoning",
      "Code generation",
      "Translation",
      "Mathematical problem solving",
      "Creative writing",
      "Knowledge synthesis",
      "Context adaptation"
    ];
    emergenceClassification = "Unpredicted";
  };

  /// Default intelligence probabilities for EDDI capabilities
  public let EDDI_INTELLIGENCE_PROBABILITIES : [Types.IntelligenceProbability] = [
    { domain = "Reasoning"; confidenceScore = 89; entropyLevel = "low"; predictionAccuracy = 91 },
    { domain = "Code generation"; confidenceScore = 87; entropyLevel = "low"; predictionAccuracy = 89 },
    { domain = "Translation"; confidenceScore = 85; entropyLevel = "medium"; predictionAccuracy = 88 },
    { domain = "Mathematical problem solving"; confidenceScore = 82; entropyLevel = "medium"; predictionAccuracy = 85 },
    { domain = "Creative writing"; confidenceScore = 78; entropyLevel = "high"; predictionAccuracy = 75 },
    { domain = "Knowledge synthesis"; confidenceScore = 88; entropyLevel = "low"; predictionAccuracy = 90 },
    { domain = "Context adaptation"; confidenceScore = 91; entropyLevel = "low"; predictionAccuracy = 93 }
  ];

  // ── The canonical EDDI singleton ──────────────────────────────────────────
  public let EDDI_INSTANCE : Types.EDDI = {
    id        = "EDDI";
    name      = "EDDI";
    version   = 24;  // Updated for architecture spec
    modeCount = 7;
    sealedAt  = 0;   // updated at runtime via getEddi()
    law       = "LEX_EDDI_UNIFIED";
    architecture = EDDI_ARCHITECTURE;
    intelligenceProbabilities = EDDI_INTELLIGENCE_PROBABILITIES;
  };

  // ── Mode inference from a context hint string ─────────────────────────────
  public func inferMode(hint : Text) : Types.EDDIMode {
    let h = hint.toLower();
    if (h.contains(#text "teacher") or h.contains(#text "teach") or h.contains(#text "class"))
      #TEACHER_MODE
    else if (h.contains(#text "principal") or h.contains(#text "admin") or h.contains(#text "school"))
      #PRINCIPAL_MODE
    else if (h.contains(#text "build") or h.contains(#text "create") or h.contains(#text "agent") or h.contains(#text "university"))
      #BUILD_MODE
    else if (h.contains(#text "memory") or h.contains(#text "passport") or h.contains(#text "seed") or h.contains(#text "vault"))
      #MEMORY_MODE
    else if (h.contains(#text "recognition") or h.contains(#text "award") or h.contains(#text "achieve") or h.contains(#text "nominate"))
      #RECOGNITION_MODE
    else if (h.contains(#text "architect") or h.contains(#text "design") or h.contains(#text "system") or h.contains(#text "protocol"))
      #ARCHITECT_MODE
    else
      #STUDENT_MODE
  };

  // ── Mode label helper (for response framing) ──────────────────────────────
  func modeLabel(mode : Types.EDDIMode) : Text {
    switch (mode) {
      case (#STUDENT_MODE)      "Student";
      case (#TEACHER_MODE)      "Teacher";
      case (#PRINCIPAL_MODE)    "Principal";
      case (#BUILD_MODE)        "Builder";
      case (#MEMORY_MODE)       "Memory";
      case (#RECOGNITION_MODE)  "Recognition";
      case (#ARCHITECT_MODE)    "Architect";
    };
  };

  // ── Persona mapping — internal protocol arrays per mode ───────────────────
  // The 6 personalities (Sage/Quill/Spark/Atlas/Echo/Nova) are internal mode
  // protocols — not separate agents. EDDI switches persona based on mode + msg.
  func selectPersona(mode : Types.EDDIMode, msg : Text) : Text {
    let m = msg.toLower();
    switch (mode) {
      case (#STUDENT_MODE) {
        if (m.contains(#text "quiz") or m.contains(#text "test") or m.contains(#text "question"))
          "quill"
        else if (m.contains(#text "help") or m.contains(#text "stuck") or m.contains(#text "motivat"))
          "spark"
        else if (m.contains(#text "path") or m.contains(#text "next") or m.contains(#text "guide"))
          "atlas"
        else if (m.contains(#text "assess") or m.contains(#text "gap") or m.contains(#text "check"))
          "echo"
        else
          "sage"
      };
      case (#TEACHER_MODE)     "atlas";    // guide persona for teacher routing
      case (#PRINCIPAL_MODE)   "echo";     // assessor persona for principal insights
      case (#BUILD_MODE)       "nova";     // curator/builder persona
      case (#MEMORY_MODE)      "sage";     // explainer for memory analysis
      case (#RECOGNITION_MODE) "spark";   // encourager for recognition
      case (#ARCHITECT_MODE)   "nova";    // master router for architect
    };
  };

  // ── Mode-aware framing prefix ─────────────────────────────────────────────
  func modeFrame(mode : Types.EDDIMode) : Text {
    switch (mode) {
      case (#STUDENT_MODE)      "";
      case (#TEACHER_MODE)      "🏫 EDDI [TEACHER MODE] — ";
      case (#PRINCIPAL_MODE)    "🏛️ EDDI [PRINCIPAL MODE] — ";
      case (#BUILD_MODE)        "⚡ EDDI [BUILD MODE] — ";
      case (#MEMORY_MODE)       "🧠 EDDI [MEMORY MODE] — ";
      case (#RECOGNITION_MODE)  "🏆 EDDI [RECOGNITION MODE] — ";
      case (#ARCHITECT_MODE)    "🔭 EDDI [ARCHITECT MODE] — ";
    };
  };

  // ── Next mode suggestion logic ─────────────────────────────────────────────
  func suggestNextMode(mode : Types.EDDIMode, msg : Text) : ?Types.EDDIMode {
    let m = msg.toLower();
    switch (mode) {
      case (#STUDENT_MODE) {
        if (m.contains(#text "build") or m.contains(#text "create"))
          ?#BUILD_MODE
        else if (m.contains(#text "remember") or m.contains(#text "review"))
          ?#MEMORY_MODE
        else null
      };
      case (#BUILD_MODE)        ?#MEMORY_MODE;
      case (#MEMORY_MODE)       ?#RECOGNITION_MODE;
      case (#RECOGNITION_MODE)  ?#ARCHITECT_MODE;
      case (#ARCHITECT_MODE)    ?#BUILD_MODE;
      case (_)                  null;
    };
  };

  // ── Core chat function ────────────────────────────────────────────────────
  public func chat(
    modeStore   : ModeStore,
    caller      : Common.UserId,
    mode        : Types.EDDIMode,
    message     : Text,
    sessionId   : Text,
  ) : { response : Text; modeUsed : Types.EDDIMode; nextModeSuggestion : ?Types.EDDIMode } {
    // Store the mode for this caller
    let setting : Types.ModeSetting = { mode; setAt = Time.now() };
    modeStore.add(caller, setting);

    let persona = selectPersona(mode, message);
    // Extract topic/subject from sessionId or message (best-effort)
    let topic   = if (sessionId.size() > 0) sessionId else "learning";
    let subject = "General";
    let grade   = "9";
    let frame   = modeFrame(mode);
    ignore sessionId;

    let raw = SovereignResponses.dispatch(persona, message, topic, subject, grade, 0);
    let response = if (frame.size() > 0) frame # raw else raw;

    { response; modeUsed = mode; nextModeSuggestion = suggestNextMode(mode, message) };
  };

  // ── ARCHITECT_MODE insight for passport state ─────────────────────────────
  public func getPassportInsight(
    passports : PassportLib.PassportStore,
    seedStore : PassportLib.SeedStore,
    caller    : Common.UserId,
  ) : Text {
    switch (PassportLib.getFullPassportStats(passports, seedStore, caller)) {
      case null {
        "🔭 EDDI ARCHITECT MODE — No passport found. Begin your first session to seed sovereign memory."
      };
      case (?stats) {
        let PHI : Float = 1.6180339887;
        let totalF = stats.totalSeeds;
        let scoreRounded = Float.floor(stats.compoundScore);
        // Fibonacci zone labels
        let zoneStatus =
          if (stats.hotSeeds >= 5)       "SOVEREIGN — you are in full active mastery"
          else if (stats.hotSeeds >= 3)  "GROWING — momentum is building"
          else if (stats.warmSeeds > 0)  "BUILDING — seeds are warming toward mastery"
          else                           "GENESIS — first seeds planted, compound growth begins";

        // Multi-path architect response (COGT + META + AUTN law)
        let path_a = "Path A — Deepen: Focus your next 5 sessions on your warmest subject to cross the mastery threshold.";
        let path_b = "Path B — Expand: Plant seeds in 2 new subjects to build cross-domain coherence and raise your compound score.";
        let path_c = "Path C — Architect (novel): Your " # totalF.toText() # " seeds currently compound at score " # Float.toText(scoreRounded) # " (PHI=" # Float.toText(PHI) # "). At 55 seeds, sovereign recognition threshold activates automatically.";

        "🔭 EDDI ARCHITECT MODE — Passport Intelligence Report\n\n" #
        "Status: " # zoneStatus # "\n" #
        "Total Seeds: " # totalF.toText() # " | Hot: " # stats.hotSeeds.toText() # " | Warm: " # stats.warmSeeds.toText() # " | Cold: " # stats.coldSeeds.toText() # "\n" #
        "Compound Score: " # Float.toText(scoreRounded) # "\n\n" #
        path_a # "\n" # path_b # "\n" # path_c
      };
    };
  };

  // ── Mode store accessors ──────────────────────────────────────────────────
  public func getMode(modeStore : ModeStore, caller : Common.UserId) : Types.EDDIMode {
    switch (modeStore.get(caller)) {
      case (?s) s.mode;
      case null  #STUDENT_MODE;
    };
  };

  public func setMode(modeStore : ModeStore, caller : Common.UserId, mode : Types.EDDIMode) {
    modeStore.add(caller, { mode; setAt = Time.now() });
  };

  // ── User agent management ─────────────────────────────────────────────────
  public func createUserAgent(
    agentStore : UserAgentStore,
    caller     : Common.UserId,
    name       : Text,
    modeBinding: Types.EDDIMode,
    reasoningSeed : Text,
    memoryConfig  : Text,
    now        : Common.Timestamp,
  ) : Types.UserAgent {
    let id = "UA-" # Text.fromIter(caller.toText().toIter().take(6)) # "-" # name;
    let agent : Types.UserAgent = {
      id; owner = caller; name;
      modeBinding; reasoningSeed; memoryConfig;
      createdAt = now;
    };
    let list = switch (agentStore.get(caller)) {
      case (?l) l;
      case null {
        let fresh = List.empty<Types.UserAgent>();
        agentStore.add(caller, fresh);
        fresh;
      };
    };
    list.add(agent);
    // update map entry (list is already reference-shared but re-add to be safe)
    agentStore.add(caller, list);
    agent;
  };

  public func getUserAgents(
    agentStore : UserAgentStore,
    caller     : Common.UserId,
  ) : [Types.UserAgent] {
    switch (agentStore.get(caller)) {
      case (?list) list.toArray();
      case null [];
    };
  };

  // ── Mode label exposed publicly (for API responses) ───────────────────────
  public func modeLabelPublic(mode : Types.EDDIMode) : Text { modeLabel(mode) };
};
