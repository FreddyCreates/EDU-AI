import Time "mo:core/Time";
import Array "mo:core/Array";
import Types "../types/entanglements";
import Int "mo:core/Int";

module {
  // ── PHI constants (integer, * 1000) ─────────────────────────────────────
  public let PHI_INV     : Nat = 618;  // 0.618 × 1000
  public let PHI_INV_SQ  : Nat = 382;  // 0.382 × 1000

  // ── Fibonacci sequence (first 16 values) ────────────────────────────────
  let FIB_SEQUENCE : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];

  // ── FLOR: largest Fibonacci number ≤ n ──────────────────────────────────
  public func fibFloor(n : Nat) : Nat {
    if (n == 0) return 1;
    var result : Nat = 1;
    for (f in FIB_SEQUENCE.values()) {
      if (f <= n) { result := f };
    };
    result;
  };

  // ── fibFloorInt: fibFloor for Int, preserving sign ───────────────────────
  public func fibFloorInt(n : Int) : Int {
    if (n == 0) return 1;
    let absVal : Nat = if (n < 0) Int.abs(n) else n.toNat();
    let floored = fibFloor(absVal);
    if (n < 0) -(floored : Nat) else floored;
  };

  // ── nextFib: smallest Fibonacci number > n ───────────────────────────────
  public func nextFib(n : Nat) : Nat {
    for (f in FIB_SEQUENCE.values()) {
      if (f > n) return f;
    };
    987; // cap
  };

  // ── Seed all 10 canonical entanglement records ───────────────────────────
  public func seedEntanglements() : [Types.EntanglementRecord] {
    [
      { id = "PONT"; name = "Pontifex Bridge";      sourceSubstrate = "ICPM";     targetSubstrate = "JLIA";     direction = #bidirectional;  transitCount = 0; lastEntanglement = 0; coherenceDelta = 0; status = #active },
      { id = "MRDM"; name = "Meridian Bridge";      sourceSubstrate = "ICPM";     targetSubstrate = "EMRT";     direction = #bidirectional;  transitCount = 0; lastEntanglement = 0; coherenceDelta = 0; status = #active },
      { id = "AXON"; name = "Axon Bridge";          sourceSubstrate = "EART";     targetSubstrate = "ICPM";     direction = #unidirectional; transitCount = 0; lastEntanglement = 0; coherenceDelta = 0; status = #active },
      { id = "CRUX"; name = "Crux Bridge";          sourceSubstrate = "JLIA";     targetSubstrate = "EMRT";     direction = #unidirectional; transitCount = 0; lastEntanglement = 0; coherenceDelta = 0; status = #active },
      { id = "NXUS"; name = "Nexus Bridge";         sourceSubstrate = "ALL";      targetSubstrate = "RGST";     direction = #unidirectional; transitCount = 0; lastEntanglement = 0; coherenceDelta = 0; status = #active },
      { id = "NRVE"; name = "Neural Entanglement";  sourceSubstrate = "ICPM";     targetSubstrate = "FRONTEND"; direction = #bidirectional;  transitCount = 0; lastEntanglement = 0; coherenceDelta = 0; status = #active },
      { id = "PLSE"; name = "Pulse Entanglement";   sourceSubstrate = "EART";     targetSubstrate = "FRONTEND"; direction = #unidirectional; transitCount = 0; lastEntanglement = 0; coherenceDelta = 0; status = #active },
      { id = "MSRY"; name = "Mastery Entanglement"; sourceSubstrate = "EMRT";     targetSubstrate = "FRONTEND"; direction = #unidirectional; transitCount = 0; lastEntanglement = 0; coherenceDelta = 0; status = #active },
      { id = "ECHO"; name = "Echo Entanglement";    sourceSubstrate = "FRONTEND"; targetSubstrate = "ICPM";     direction = #unidirectional; transitCount = 0; lastEntanglement = 0; coherenceDelta = 0; status = #active },
      { id = "FLUX"; name = "Flux Entanglement";    sourceSubstrate = "JLIA";     targetSubstrate = "FRONTEND"; direction = #unidirectional; transitCount = 0; lastEntanglement = 0; coherenceDelta = 0; status = #active },
    ];
  };

  // ── Engine rotation for NRVE ─────────────────────────────────────────────
  let ENGINES : [Text] = ["SYNTHOS", "VEKTOR", "PHAEDRUS", "MORPHOS", "LOGOS"];

  // ── NRVE: live COGT reasoning state ─────────────────────────────────────
  public func buildNrveState(cycleCount : Nat) : Types.NrveState {
    let phase = cycleCount % 3;
    let phiRatio : Nat = if (phase == 0) 618 else if (phase == 1) 382 else 500;
    let cogtPhase : Text = if (phase == 0) "expand" else if (phase == 1) "critique" else "synthesize";
    let rawCoh = (cycleCount * 618 / 1000) % 988;
    let coherenceScore = fibFloor(rawCoh);
    let activeEngine = ENGINES[cycleCount % 5];
    { cogtPhase; phiRatio; coherenceScore; activeEngine; cycleCount };
  };

  // ── PLSE: pulse / EART heartbeat state ──────────────────────────────────
  let AUTON_CONCEPTS : [Text] = [
    "Golden ratio in architecture",
    "Fibonacci spirals in nature",
    "Prime number patterns",
    "Wave interference",
    "Set theory",
    "Photosynthesis chemistry",
    "Plate tectonics",
    "Renaissance perspective geometry",
  ];

  let CURIOSITY_PROMPTS : [Text] = [
    "What connects this to what you learned last session?",
    "Can you find this pattern in daily life?",
    "What would happen if this were reversed?",
    "How does this relate to mathematics?",
    "What is the opposite of this concept?",
  ];

  public func buildPlseState(cycleCount : Nat) : Types.PlseState {
    let conceptIdx = cycleCount % 8;
    let lastAutonSeed : Types.PlseSeed = {
      concept = AUTON_CONCEPTS[conceptIdx];
      timestamp = cycleCount;
    };
    // Build up to 5 nudges cycling through prompts
    let nudgeCount : Nat = if (cycleCount % 5 == 0) 1 else if (cycleCount % 5 == 1) 2 else if (cycleCount % 5 == 2) 3 else if (cycleCount % 5 == 3) 4 else 5;
    let curiosityQueue : [Types.PlseNudge] = Array.tabulate<Types.PlseNudge>(
      nudgeCount,
      func(i) {
        { prompt = CURIOSITY_PROMPTS[(cycleCount + i) % 5]; ttl = FIB_SEQUENCE[i % 16] };
      },
    );
    {
      lastAutonSeed;
      curiosityQueue;
      heartbeatCycle = cycleCount;
      phiHeartbeatInterval = 21;
    };
  };

  // ── MSRY: mastery entanglement state ─────────────────────────────────────
  public func buildMsryState(seedCount : Nat, _cycleCount : Nat) : Types.MsryState {
    let zone : Text =
      if (seedCount >= 144) "vault"
      else if (seedCount >= 55) "frozen"
      else if (seedCount >= 13) "cold"
      else if (seedCount >= 5)  "warm"
      else "hot";
    let fibonacciFloorLevel = fibFloor(seedCount);
    let masteryCompound     = fibFloor(seedCount * 618 / 100);
    {
      zone;
      lastZoneTransition = 0;
      fibonacciFloorLevel;
      masteryCompound;
      seedCount;
    };
  };

  // ── ECHO: compute result from a frontend event ───────────────────────────
  public func computeEchoResult(
    currentCoherence : Nat,
    eventType : Types.EchoEventType,
    value : Nat,
    duration : Nat,
  ) : Types.EchoResult {
    let rawDelta : Nat = switch (eventType) {
      case (#answer) value * 2;
      case (#pause)  if (duration > 5) 3 else 1;
      case (#click)  1;
      case (#scroll) 0;
    };
    let coherenceDelta : Int  = fibFloorInt(rawDelta);
    let newCoh : Nat          = currentCoherence + rawDelta;
    let newCoherence : Nat    = fibFloor(if (newCoh > 987) 987 else newCoh);
    let passportUpdated : Bool = rawDelta > 0;
    { coherenceDelta; newCoherence; passportUpdated };
  };

  // ── FLUX: Julia FLOR surface state ───────────────────────────────────────
  public func buildFluxState(seedCount : Nat, coherenceScore : Nat) : Types.FluxState {
    let difficultyLevel   = fibFloor(seedCount + 1);
    let masteryFloor      = fibFloor(seedCount);
    let phiConfidence     = fibFloor(coherenceScore * 618 / 1000);
    let nextFloorThreshold = nextFib(fibFloor(seedCount));
    { difficultyLevel; masteryFloor; phiConfidence; nextFloorThreshold; phiRatio = 618 };
  };
};
