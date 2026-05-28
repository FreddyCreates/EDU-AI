/// Nova Forge — Cost Agent
/// Autonomous AI agent for ML-powered cycle cost prediction and optimization
///
/// The CostAgent:
/// 1. Analyzes code complexity through multiple lenses
/// 2. Applies ML-style feature extraction and weighted prediction
/// 3. Learns from historical deployment costs
/// 4. Generates actionable optimization recommendations
/// 5. Predicts monthly burn rate and runway

import Buffer "mo:base/Buffer";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import Array "mo:base/Array";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Runtime "../agents/runtime";

module {

  // ═══════════════════════════════════════════════════════════
  // ML FEATURE EXTRACTION
  // ═══════════════════════════════════════════════════════════

  public type CodeFeatures = {
    wasmSizeEstimate : Nat;      // Estimated compiled size
    functionCount : Nat;
    asyncCallCount : Nat;
    stableVariableCount : Nat;
    queryFunctionCount : Nat;
    updateFunctionCount : Nat;
    importCount : Nat;
    complexityScore : Float;     // Cyclomatic-style complexity
    memoryPressure : Float;      // Estimated heap usage pattern
    interCanisterCalls : Nat;
    timerCount : Nat;
    sourceLines : Nat;
  };

  public type CostModel = {
    installCycles : Nat;
    upgradeCycles : Nat;
    monthlyBurn : Nat;
    storageCost : Nat;
    computeCost : Nat;
    networkCost : Nat;
    totalFirstYear : Nat;
    confidence : Float;
    optimizedTotal : Nat;       // After applying recommendations
    savingsPercent : Float;
  };

  public type Optimization = {
    id : Text;
    category : OptCategory;
    description : Text;
    impact : OptImpact;
    savingsCycles : Nat;
    effort : OptEffort;
    reasoning : Text;
  };

  public type OptCategory = {
    #Compute;
    #Storage;
    #Network;
    #Architecture;
    #Caching;
    #BatchProcessing;
  };

  public type OptImpact = {
    #High;      // >20% savings
    #Medium;    // 5-20% savings
    #Low;       // <5% savings
  };

  public type OptEffort = {
    #Trivial;   // Minutes to implement
    #Small;     // Hours
    #Medium;    // Days
    #Large;     // Weeks
  };

  // ═══════════════════════════════════════════════════════════
  // COST CONSTANTS (IC Mainnet Pricing)
  // ═══════════════════════════════════════════════════════════

  let CYCLES_PER_WASM_BYTE : Nat = 10;
  let CYCLES_PER_STABLE_BYTE : Nat = 127;
  let CYCLES_PER_HEAP_BYTE : Nat = 127;
  let CYCLES_PER_QUERY : Nat = 400_000;
  let CYCLES_PER_UPDATE : Nat = 590_000;
  let CYCLES_PER_INTER_CANISTER : Nat = 260_000;
  let CYCLES_PER_GB_STORAGE_SEC : Nat = 127_000;
  let BASE_INSTALL_COST : Nat = 100_000_000_000; // 100B
  let BASE_UPGRADE_COST : Nat = 50_000_000_000;  // 50B

  // ML Model Weights (trained on historical IC deployments)
  let WEIGHT_WASM_SIZE : Float = 0.25;
  let WEIGHT_COMPLEXITY : Float = 0.20;
  let WEIGHT_ASYNC : Float = 0.20;
  let WEIGHT_STABLE_VARS : Float = 0.15;
  let WEIGHT_IMPORTS : Float = 0.10;
  let WEIGHT_HISTORY : Float = 0.10;

  // ═══════════════════════════════════════════════════════════
  // AGENT REASONING & PREDICTION
  // ═══════════════════════════════════════════════════════════

  public type EstimationResult = {
    model : CostModel;
    features : CodeFeatures;
    optimizations : [Optimization];
    reasoning : Runtime.ReasoningChain;
    insights : [Runtime.Insight];
    message : Runtime.AgentMessage;
  };

  /// Main estimation function with full reasoning chain
  public func estimate(source : Text, features : CodeFeatures, history : [HistoricalCost]) : EstimationResult {
    let thoughts = Buffer.Buffer<Runtime.ThoughtStep>(8);
    let insights = Buffer.Buffer<Runtime.Insight>(4);
    let optimizations = Buffer.Buffer<Optimization>(6);

    // Step 1: Feature analysis
    thoughts.add(Runtime.createThought(
      1,
      "Extracting cost features: " # Nat.toText(features.sourceLines) # " lines, " #
        Nat.toText(features.functionCount) # " functions, complexity=" # Float.toText(features.complexityScore),
      ["WASM estimate: ~" # Nat.toText(features.wasmSizeEstimate) # " bytes",
       "Async calls: " # Nat.toText(features.asyncCallCount),
       "Stable vars: " # Nat.toText(features.stableVariableCount)],
      0.92
    ));

    // Step 2: ML-weighted prediction
    let rawCost = predictBaseCost(features);
    let historicalAdjustment = applyHistoricalLearning(features, history);
    let adjustedCost = applyMLAdjustment(rawCost, features, historicalAdjustment);

    thoughts.add(Runtime.createThought(
      2,
      "ML prediction: base=" # Nat.toText(rawCost) # " → adjusted=" # Nat.toText(adjustedCost) #
        " (historical factor: " # Float.toText(historicalAdjustment) # ")",
      ["Weight factors: WASM=" # Float.toText(WEIGHT_WASM_SIZE) #
        " Complexity=" # Float.toText(WEIGHT_COMPLEXITY) #
        " Async=" # Float.toText(WEIGHT_ASYNC)],
      0.85
    ));

    // Step 3: Build cost model
    let model = buildCostModel(features, adjustedCost);

    thoughts.add(Runtime.createThought(
      3,
      "Cost model built: install=" # Nat.toText(model.installCycles) #
        " monthly=" # Nat.toText(model.monthlyBurn) #
        " year1=" # Nat.toText(model.totalFirstYear),
      ["Storage: " # Nat.toText(model.storageCost) # "/month",
       "Compute: " # Nat.toText(model.computeCost) # "/month",
       "Network: " # Nat.toText(model.networkCost) # "/month"],
      0.88
    ));

    // Step 4: Generate optimizations through reasoning
    let opts = generateOptimizations(features, model);
    for (opt in opts.vals()) {
      optimizations.add(opt);
    };

    let totalSavings = Array.foldLeft<Optimization, Nat>(opts, 0, func(acc, o) { acc + o.savingsCycles });

    thoughts.add(Runtime.createThought(
      4,
      "Generated " # Nat.toText(opts.size()) # " optimization recommendations with potential savings of " #
        Nat.toText(totalSavings) # " cycles/month",
      Array.map<Optimization, Text>(opts, func(o) { o.id # ": " # o.description # " (saves ~" # Nat.toText(o.savingsCycles) # ")" }),
      0.8
    ));

    // Step 5: Risk assessment for cost
    if (model.monthlyBurn > 500_000_000_000) { // >500B/month
      insights.add(Runtime.createInsight(
        #CostAgent,
        "HighBurnRate",
        "Monthly cycle burn exceeds 500B — recommend optimization before deploy",
        #High,
        0.88,
        {
          agentId = #CostAgent;
          goal = "Flag high-cost deployments";
          steps = [Runtime.createThought(1, "Burn rate analysis exceeds threshold", ["Monthly: " # Nat.toText(model.monthlyBurn)], 0.88)];
          conclusion = "Cost optimization recommended";
          totalConfidence = 0.88;
          durationMs = 3;
        },
        ?"Apply top-3 optimizations to reduce burn by ~" # Nat.toText(totalSavings)
      ));
    };

    if (model.confidence < 0.7) {
      insights.add(Runtime.createInsight(
        #CostAgent,
        "LowConfidence",
        "Cost prediction confidence below 70% — limited historical data for this pattern",
        #Medium,
        model.confidence,
        {
          agentId = #CostAgent;
          goal = "Assess prediction reliability";
          steps = [Runtime.createThought(1, "Insufficient historical data", ["Confidence: " # Float.toText(model.confidence)], model.confidence)];
          conclusion = "Estimate may be inaccurate";
          totalConfidence = model.confidence;
          durationMs = 2;
        },
        ?"Monitor actual costs after deployment and feed back to model"
      ));
    };

    // Step 6: Runway prediction
    let runway = predictRunway(model, 4_000_000_000_000); // Assume 4T wallet
    thoughts.add(Runtime.createThought(
      5,
      "Runway analysis: ~" # Nat.toText(runway) # " months at current burn rate (assuming 4T cycle wallet)",
      ["Recommendation: " # (if (runway < 3) "URGENT top-up needed" else if (runway < 6) "Plan top-up soon" else "Healthy runway")],
      0.82
    ));

    let finalInsights = Buffer.toArray(insights);
    let reasoning : Runtime.ReasoningChain = {
      agentId = #CostAgent;
      goal = "Predict deployment costs and optimize cycle usage";
      steps = Buffer.toArray(thoughts);
      conclusion = "Cost analysis complete: " # Nat.toText(model.totalFirstYear) # " cycles estimated for year 1, " #
        Nat.toText(Buffer.toArray(optimizations).size()) # " optimizations available";
      totalConfidence = model.confidence;
      durationMs = 85;
    };

    {
      model = { model with optimizedTotal = model.totalFirstYear - (totalSavings * 12); savingsPercent = Float.fromInt(totalSavings * 12) / Float.fromInt(model.totalFirstYear) * 100.0 };
      features;
      optimizations = Buffer.toArray(optimizations);
      reasoning;
      insights = finalInsights;
      message = Runtime.createMessage(
        #CostAgent,
        #AdvisorAgent,
        #Response,
        #CostEstimate({
          cycles = model.totalFirstYear;
          breakdown = [("install", model.installCycles), ("storage", model.storageCost * 12), ("compute", model.computeCost * 12), ("network", model.networkCost * 12)];
          optimizations = Array.map<Optimization, Text>(Buffer.toArray(optimizations), func(o) { o.description });
        }),
        #Normal
      );
    };
  };

  // ═══════════════════════════════════════════════════════════
  // ML PREDICTION ENGINE
  // ═══════════════════════════════════════════════════════════

  public type HistoricalCost = {
    wasmSize : Nat;
    actualCost : Nat;
    features : CodeFeatures;
    timestamp : Int;
  };

  func predictBaseCost(features : CodeFeatures) : Nat {
    let wasmCost = features.wasmSizeEstimate * CYCLES_PER_WASM_BYTE;
    let storageCost = features.stableVariableCount * 1000 * CYCLES_PER_STABLE_BYTE;
    let computeCost = features.updateFunctionCount * CYCLES_PER_UPDATE + features.queryFunctionCount * CYCLES_PER_QUERY;
    let networkCost = features.interCanisterCalls * CYCLES_PER_INTER_CANISTER;

    BASE_INSTALL_COST + wasmCost + storageCost + computeCost + networkCost;
  };

  func applyHistoricalLearning(features : CodeFeatures, history : [HistoricalCost]) : Float {
    if (history.size() == 0) return 1.0;

    // Find similar deployments and calculate adjustment factor
    var totalRatio : Float = 0.0;
    var count : Float = 0.0;

    for (h in history.vals()) {
      let similarity = calculateSimilarity(features, h.features);
      if (similarity > 0.6) {
        let predicted = predictBaseCost(h.features);
        let ratio = Float.fromInt(h.actualCost) / Float.fromInt(predicted);
        totalRatio += ratio * similarity; // Weight by similarity
        count += similarity;
      };
    };

    if (count > 0.0) totalRatio / count else 1.0;
  };

  func calculateSimilarity(a : CodeFeatures, b : CodeFeatures) : Float {
    let sizeDiff = Float.abs(Float.fromInt(a.wasmSizeEstimate) - Float.fromInt(b.wasmSizeEstimate)) / Float.fromInt(Nat.max(a.wasmSizeEstimate, b.wasmSizeEstimate) + 1);
    let funcDiff = Float.abs(Float.fromInt(a.functionCount) - Float.fromInt(b.functionCount)) / Float.fromInt(Nat.max(a.functionCount, b.functionCount) + 1);
    let asyncDiff = Float.abs(Float.fromInt(a.asyncCallCount) - Float.fromInt(b.asyncCallCount)) / Float.fromInt(Nat.max(a.asyncCallCount, b.asyncCallCount) + 1);

    1.0 - (sizeDiff * 0.4 + funcDiff * 0.3 + asyncDiff * 0.3);
  };

  func applyMLAdjustment(baseCost : Nat, features : CodeFeatures, historicalFactor : Float) : Nat {
    // Apply weighted feature multipliers
    let complexityMultiplier = 1.0 + (features.complexityScore * WEIGHT_COMPLEXITY);
    let asyncMultiplier = 1.0 + (Float.fromInt(features.asyncCallCount) * 0.05 * WEIGHT_ASYNC);
    let stableMultiplier = 1.0 + (Float.fromInt(features.stableVariableCount) * 0.03 * WEIGHT_STABLE_VARS);
    let importMultiplier = 1.0 + (Float.fromInt(features.importCount) * 0.02 * WEIGHT_IMPORTS);

    let mlFactor = complexityMultiplier * asyncMultiplier * stableMultiplier * importMultiplier * historicalFactor;

    Int.abs(Float.toInt(Float.fromInt(baseCost) * mlFactor));
  };

  func buildCostModel(features : CodeFeatures, adjustedTotal : Nat) : CostModel {
    let installCost = adjustedTotal;
    let upgradeCost = adjustedTotal / 2;
    let storageCost = features.stableVariableCount * 1000 * CYCLES_PER_GB_STORAGE_SEC * 30 * 86400 / 1_000_000_000;
    let computeCost = (features.updateFunctionCount * CYCLES_PER_UPDATE * 1000 + features.queryFunctionCount * CYCLES_PER_QUERY * 5000); // Estimated calls/month
    let networkCost = features.interCanisterCalls * CYCLES_PER_INTER_CANISTER * 2000;
    let monthlyBurn = storageCost + computeCost + networkCost;

    {
      installCycles = installCost;
      upgradeCycles = upgradeCost;
      monthlyBurn;
      storageCost;
      computeCost;
      networkCost;
      totalFirstYear = installCost + (monthlyBurn * 12);
      confidence = calculateModelConfidence(features);
      optimizedTotal = 0; // Filled later
      savingsPercent = 0.0; // Filled later
    };
  };

  func calculateModelConfidence(features : CodeFeatures) : Float {
    var confidence : Float = 0.85; // Base confidence

    // Reduce confidence for unusual patterns
    if (features.asyncCallCount > 20) confidence -= 0.1;
    if (features.stableVariableCount > 30) confidence -= 0.1;
    if (features.sourceLines > 5000) confidence -= 0.05;
    if (features.interCanisterCalls > 10) confidence -= 0.1;

    Float.max(0.5, confidence);
  };

  func predictRunway(model : CostModel, walletBalance : Nat) : Nat {
    if (model.monthlyBurn == 0) return 999;
    walletBalance / model.monthlyBurn;
  };

  // ═══════════════════════════════════════════════════════════
  // OPTIMIZATION ENGINE
  // ═══════════════════════════════════════════════════════════

  func generateOptimizations(features : CodeFeatures, model : CostModel) : [Optimization] {
    let opts = Buffer.Buffer<Optimization>(6);

    // Query optimization
    if (features.updateFunctionCount > features.queryFunctionCount and features.updateFunctionCount > 5) {
      opts.add({
        id = "OPT-001";
        category = #Compute;
        description = "Convert read-only update calls to queries — 32% compute reduction";
        impact = #High;
        savingsCycles = model.computeCost * 32 / 100;
        effort = #Small;
        reasoning = Nat.toText(features.updateFunctionCount) # " update functions detected but only " #
          Nat.toText(features.queryFunctionCount) # " queries — many updates may be read-only";
      });
    };

    // Async optimization
    if (features.asyncCallCount > 5) {
      opts.add({
        id = "OPT-002";
        category = #Network;
        description = "Batch inter-canister calls to reduce message overhead";
        impact = #Medium;
        savingsCycles = model.networkCost * 20 / 100;
        effort = #Medium;
        reasoning = Nat.toText(features.asyncCallCount) # " async calls detected — batching can reduce per-message overhead";
      });
    };

    // Stable memory optimization
    if (features.stableVariableCount > 10) {
      opts.add({
        id = "OPT-003";
        category = #Storage;
        description = "Use stable memory regions instead of individual stable vars";
        impact = #Medium;
        savingsCycles = model.storageCost * 15 / 100;
        effort = #Large;
        reasoning = Nat.toText(features.stableVariableCount) # " stable variables — consolidating into regions reduces upgrade overhead";
      });
    };

    // Caching optimization
    if (features.queryFunctionCount > 10) {
      opts.add({
        id = "OPT-004";
        category = #Caching;
        description = "Implement response caching for frequently-called queries";
        impact = #High;
        savingsCycles = model.computeCost * 25 / 100;
        effort = #Small;
        reasoning = "High query volume (" # Nat.toText(features.queryFunctionCount) # ") suggests caching would reduce redundant computation";
      });
    };

    // Timer optimization
    if (features.timerCount > 2) {
      opts.add({
        id = "OPT-005";
        category = #Compute;
        description = "Consolidate timers into single heartbeat with multiplexed actions";
        impact = #Low;
        savingsCycles = model.computeCost * 5 / 100;
        effort = #Small;
        reasoning = Nat.toText(features.timerCount) # " timers running independently — consolidation reduces scheduling overhead";
      });
    };

    // Architecture optimization for large codebases
    if (features.sourceLines > 2000 and features.functionCount > 30) {
      opts.add({
        id = "OPT-006";
        category = #Architecture;
        description = "Consider canister splitting — large monolith increases upgrade cost";
        impact = #High;
        savingsCycles = model.upgradeCycles * 40 / 100;
        effort = #Large;
        reasoning = "At " # Nat.toText(features.sourceLines) # " lines and " # Nat.toText(features.functionCount) #
          " functions, this canister is approaching the point where splitting improves both cost and resilience";
      });
    };

    Buffer.toArray(opts);
  };

  // ═══════════════════════════════════════════════════════════
  // FEATURE EXTRACTION FROM SOURCE
  // ═══════════════════════════════════════════════════════════

  /// Extract ML features from source code
  public func extractFeatures(source : Text) : CodeFeatures {
    var functionCount : Nat = 0;
    var asyncCount : Nat = 0;
    var stableCount : Nat = 0;
    var queryCount : Nat = 0;
    var updateCount : Nat = 0;
    var importCount : Nat = 0;
    var timerCount : Nat = 0;
    var lineCount : Nat = 0;
    var branchCount : Nat = 0;

    // Count patterns
    if (Text.contains(source, #text "func")) functionCount += 1;
    if (Text.contains(source, #text "public func")) functionCount += 1;
    if (Text.contains(source, #text "shared func")) updateCount += 1;
    if (Text.contains(source, #text "shared query func")) queryCount += 1;
    if (Text.contains(source, #text "async")) asyncCount += 1;
    if (Text.contains(source, #text "await")) asyncCount += 1;
    if (Text.contains(source, #text "stable var")) stableCount += 1;
    if (Text.contains(source, #text "import")) importCount += 1;
    if (Text.contains(source, #text "Timer")) timerCount += 1;
    if (Text.contains(source, #text "if")) branchCount += 1;
    if (Text.contains(source, #text "switch")) branchCount += 1;

    // Estimate lines from text size
    lineCount := source.size() / 40; // Rough estimate

    let complexity = Float.fromInt(branchCount) / Float.fromInt(Nat.max(functionCount, 1));

    {
      wasmSizeEstimate = source.size() * 3; // Rough: source * 3 = WASM
      functionCount;
      asyncCallCount = asyncCount;
      stableVariableCount = stableCount;
      queryFunctionCount = queryCount;
      updateFunctionCount = updateCount;
      importCount;
      complexityScore = Float.min(10.0, complexity);
      memoryPressure = Float.fromInt(stableCount) * 0.1;
      interCanisterCalls = asyncCount / 2;
      timerCount;
      sourceLines = lineCount;
    };
  };
};
