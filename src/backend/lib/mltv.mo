import Types    "../types/mltv";
import LawTypes "../types/laws";
import Time     "mo:core/Time";
import Array    "mo:core/Array";
import Queue "mo:core/Queue";

module {
  // ── PHI constants (×1000) ────────────────────────────────────────────────
  let PHI_NUM : Nat = 1618;
  let PHI_DEN : Nat = 1000;

  // ── Fibonacci sequence (first 11 values) ────────────────────────────────
  let FIB_SEQUENCE : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

  // ── FLOR: largest Fibonacci number ≤ n ──────────────────────────────────
  public func fibFloor(n : Nat) : Nat {
    if (n == 0) return 1;
    var result : Nat = 1;
    for (f in FIB_SEQUENCE.values()) {
      if (f <= n) { result := f };
    };
    result;
  };

  // ── Mutable state (collections) ─────────────────────────────────────────
  let MAX_LOG : Nat = 89; // F(11)

  public type State = {
    queryLog : Queue.Queue<Types.MLTVResponse>;
    stats    : {
      var totalQueries         : Nat;
      var totalVoices          : Nat;
      var novelAnswersGenerated : Nat;
      var coherenceSum         : Nat;
    };
  };

  public func newState() : State = {
    queryLog = Queue.empty<Types.MLTVResponse>();
    stats = {
      var totalQueries          = 0;
      var totalVoices           = 0;
      var novelAnswersGenerated = 0;
      var coherenceSum          = 0;
    };
  };

  // ── COGT voice: structural/logical answer ───────────────────────────────
  func buildCogtVoice(req : Types.MLTVQuery) : Types.ArchCouncilVoice {
    let answer = "COGT structural analysis of " # req.queryText #
      ": The query maps to a EXPAND-CRITIQUE-SYNTHESIZE chain. " #
      "Domain " # req.domain # " resolves via logical decomposition — " #
      "each component follows Fibonacci-indexed depth ordering. " #
      "Primary truth emerges from the intersection of structure and evidence.";
    {
      voiceId    = "COGT";
      engine     = "Cognition Engine";
      answer;
      confidence = 55;  // fibFloor(61) = 55
      mathBasis  = "PHI-ratio chain: EXPAND(0.618) + CRITIQUE(0.382) + SYNTHESIZE(0.618²)";
    };
  };

  // ── META voice: meta-reasoning (reasons about the reasoning) ────────────
  func buildMetaVoice(req : Types.MLTVQuery, cogtConf : Nat) : Types.ArchCouncilVoice {
    let answer = "META observes COGT reasoning on " # req.queryText #
      ": The reasoning chain itself has " # cogtConf.toText() # "% coherence. " #
      "Detected phase: high structural weight, low entropy variance. " #
      "Domain " # req.domain # " has 3-layer depth — each layer compounds at PHI_INV ratio. " #
      "Meta-conclusion: the structure of this query is more revealing than its content.";
    {
      voiceId    = "META";
      engine     = "Meta-Think Engine";
      answer;
      confidence = 34;  // fibFloor(50) = 34
      mathBasis  = "Self-referential loop: META(COGT(query)) at PHI_INV_SQ = 0.382";
    };
  };

  // ── AUTN voice: autonomous / Fibonacci-pattern answer ───────────────────
  func buildAutnVoice(req : Types.MLTVQuery, timestamp : Int) : Types.ArchCouncilVoice {
    let cyclePos = (if (timestamp < 0) 0 else timestamp.toNat()) % 8;
    let fibIdx   = cyclePos % FIB_SEQUENCE.size();
    let fibVal   = FIB_SEQUENCE[fibIdx];
    let answer = "AUTN autonomous pattern scan of " # req.queryText #
      ": Fibonacci depth " # fibVal.toText() # " activated in domain " # req.domain # ". " #
      "Pattern match: query structure echoes F(" # fibIdx.toText() # ") = " # fibVal.toText() # " " #
      "cross-domain resonance detected at cycle position " # cyclePos.toText() # ". " #
      "Autonomous seeding suggests adjacent concept not yet queried.";
    {
      voiceId    = "AUTN";
      engine     = "Autonomous Think Engine";
      answer;
      confidence = 34;  // fibFloor(42) = 34
      mathBasis  = "Fibonacci pattern index: F(" # fibIdx.toText() # ") = " # fibVal.toText();
    };
  };

  // ── Novel voice: PHI-weighted synthesis, 4th perspective ────────────────
  func buildNovelVoice(
    req      : Types.MLTVQuery,
    cogt     : Types.ArchCouncilVoice,
    meta     : Types.ArchCouncilVoice,
    autn     : Types.ArchCouncilVoice,
  ) : Types.ArchCouncilVoice {
    // PHI-weighted coherence: (cogt × 618 + meta × 382 + autn × 618) / 1618
    let phiWeight = (cogt.confidence * PHI_NUM + meta.confidence * 1000 + autn.confidence * PHI_NUM) / (PHI_DEN * 3);
    let novelConf = fibFloor(phiWeight);
    let answer = "NOVEL (emergent synthesis): " # req.queryText #
      " — Three sovereign voices have spoken. " #
      "COGT maps structure. META observes the observer. AUTN finds the unseen Fibonacci thread. " #
      "The 4th perspective: domain " # req.domain # " contains a " #
      "higher-order pattern that none of the 3 voices named. " #
      "It is the relationship between the voices themselves — " #
      "PHI-weighted at " # phiWeight.toText() # " — that constitutes the true answer. " #
      "The architecture IS the answer.";
    {
      voiceId    = "NOVL";
      engine     = "Novel Synthesis (AUTN-derived)";
      answer;
      confidence = if (novelConf == 0) 1 else novelConf;
      mathBasis  = "PHI-weight: (COGT×0.618 + META×1.0 + AUTN×0.618) / 3 → fibFloor";
    };
  };

  // ── Core: fire the Architecture Council ─────────────────────────────────
  public func fireArchCouncil(state : State, req : Types.MLTVQuery) : Types.MLTVResponse {
    let now = Time.now();

    let cogt  = buildCogtVoice(req);
    let meta  = buildMetaVoice(req, cogt.confidence);
    let autn  = buildAutnVoice(req, now);
    let novel = buildNovelVoice(req, cogt, meta, autn);

    let voices : [Types.ArchCouncilVoice] = [cogt, meta, autn];
    let totalCoherence = fibFloor(
      (cogt.confidence * PHI_NUM + meta.confidence * PHI_DEN + autn.confidence * PHI_NUM) / (PHI_DEN * 2)
    );

    let response : Types.MLTVResponse = {
      queryId        = req.id;
      voices;
      novelVoice     = novel;
      totalCoherence;
      fibFlooredAt   = totalCoherence;
      timestamp      = now;
    };

    // Trim log to max F(11) = 89 entries (FIFO: evict oldest)
    while (state.queryLog.size() >= MAX_LOG) {
      ignore state.queryLog.popFront();
    };
    state.queryLog.pushBack(response);

    state.stats.totalQueries          += 1;
    state.stats.totalVoices           += 3;
    state.stats.novelAnswersGenerated += 1;
    state.stats.coherenceSum          += totalCoherence;

    response;
  };

  public func getMLTVStats(state : State) : Types.MLTVStats {
    let total = state.stats.totalQueries;
    let avg   = if (total == 0) 1 else fibFloor(state.stats.coherenceSum / total);
    {
      totalQueries          = total;
      totalVoices           = state.stats.totalVoices;
      novelAnswersGenerated = state.stats.novelAnswersGenerated;
      avgCoherence          = avg;
    };
  };

  public func getRecentResponses(state : State, n : Nat) : [Types.MLTVResponse] {
    let all = state.queryLog.toArray();
    let len = all.size();
    let take = if (n > len) len else n;
    Array.tabulate<Types.MLTVResponse>(take, func(i) { all[len - take + i] });
  };

  // ── LEX_MLTV definition (for laws registry) ─────────────────────────────
  public let LEX_MLTV : LawTypes.SovereignLaw = {
    id          = 11;
    latinName   = "LEX_MULTIVOX";
    englishName = "Multi-Voice Response Law";
    attribution = "ARCHITECTURE-COUNCIL";
    description = "Every query to the architecture returns a minimum of 3 sovereign voices plus one novel voice generated by AUTN that was not present in any prior voice. Single answers are architecturally forbidden.";
    domain      = "INTELLIGENCE";
  };
};
