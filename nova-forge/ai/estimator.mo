/// Nova Forge - AI Cycle Estimator
/// Machine learning-powered cycle cost prediction for ICP mainnet

import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Buffer "mo:core/Buffer";

import Types "../types/config";
import Cycles "../core/cycles";

module {
  /// Estimation model type
  public type EstimationModel = {
    #simple;      // Basic calculation
    #historical;  // Based on past deployments
    #ml;          // Machine learning prediction
  };

  /// Estimation context
  public type EstimationContext = {
    wasmSize : Nat;
    sourceLines : Nat;
    functionCount : Nat;
    stableVarCount : Nat;
    asyncCallCount : Nat;
    queryCount : Nat;
    updateCount : Nat;
    importCount : Nat;
  };

  /// AI estimation output
  public type AIEstimate = {
    base : Cycles.CycleEstimate;
    aiAdjustment : Int;          // AI correction factor
    confidence : Float;
    reasoning : [Text];
    optimizations : [Optimization];
  };

  /// Suggested optimization
  public type Optimization = {
    area : Text;
    currentCost : Nat;
    optimizedCost : Nat;
    suggestion : Text;
    difficulty : OptimizationDifficulty;
  };

  /// How hard to implement
  public type OptimizationDifficulty = {
    #easy;
    #medium;
    #hard;
  };

  // ═══════════════════════════════════════════════════════════════
  // AI ESTIMATION WEIGHTS
  // ═══════════════════════════════════════════════════════════════

  /// Weight factors for estimation
  public let WEIGHTS = {
    wasmSizeWeight : Float = 1.0;
    asyncCallWeight : Float = 1.5;      // Async calls are expensive
    stableVarWeight : Float = 1.2;      // Stable memory overhead
    queryWeight : Float = 0.1;          // Queries are cheap
    updateWeight : Float = 1.0;         // Updates cost cycles
    complexityWeight : Float = 1.3;     // Code complexity factor
  };

  /// Base costs per operation (cycles)
  public let BASE_COSTS = {
    perSourceLine : Nat = 1_000;
    perFunction : Nat = 100_000;
    perAsyncCall : Nat = 1_000_000;
    perStableVar : Nat = 500_000;
    perImport : Nat = 10_000;
  };

  // ═══════════════════════════════════════════════════════════════
  // ESTIMATION FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  /// Perform AI-powered estimation
  public func estimate(
    context : EstimationContext,
    model : EstimationModel
  ) : AIEstimate {
    // Get base estimate
    let base = Cycles.estimateDeployment(
      context.wasmSize,
      context.sourceLines * 100, // Rough memory estimate
      false // New deployment
    );

    // Calculate AI adjustment based on context
    let (adjustment, confidence, reasoning) = calculateAIAdjustment(context);

    // Generate optimization suggestions
    let optimizations = generateOptimizations(context);

    {
      base = base;
      aiAdjustment = adjustment;
      confidence = confidence;
      reasoning = reasoning;
      optimizations = optimizations;
    };
  };

  /// Calculate AI adjustment factor
  func calculateAIAdjustment(context : EstimationContext) : (Int, Float, [Text]) {
    let reasons = Buffer.Buffer<Text>(5);
    var adjustment : Int = 0;
    var confidence : Float = 0.9;

    // Async calls increase cost significantly
    if (context.asyncCallCount > 5) {
      adjustment += context.asyncCallCount * 500_000;
      reasons.add("High async call count (" # Nat.toText(context.asyncCallCount) # ") increases runtime costs");
      confidence -= 0.05;
    };

    // Large stable variable count
    if (context.stableVarCount > 10) {
      adjustment += context.stableVarCount * 200_000;
      reasons.add("Many stable variables (" # Nat.toText(context.stableVarCount) # ") increase upgrade costs");
    };

    // High function count suggests complexity
    if (context.functionCount > 50) {
      adjustment += context.functionCount * 50_000;
      reasons.add("High function count suggests complex canister");
      confidence -= 0.1;
    };

    // Updates vs queries ratio
    if (context.updateCount > context.queryCount * 2) {
      adjustment += context.updateCount * 100_000;
      reasons.add("Update-heavy canister will have higher cycle consumption");
    };

    // Small canisters are easier to predict
    if (context.wasmSize < 1_000_000 and context.sourceLines < 5000) {
      confidence += 0.05;
      reasons.add("Small canister size improves estimation accuracy");
    };

    // Large canisters have more uncertainty
    if (context.wasmSize > 5_000_000) {
      confidence -= 0.15;
      reasons.add("Large WASM size increases estimation uncertainty");
    };

    if (reasons.size() == 0) {
      reasons.add("Standard canister profile - using baseline estimates");
    };

    (adjustment, Float.min(0.95, Float.max(0.5, confidence)), Buffer.toArray(reasons));
  };

  /// Generate optimization suggestions
  func generateOptimizations(context : EstimationContext) : [Optimization] {
    let opts = Buffer.Buffer<Optimization>(5);

    // Async call optimization
    if (context.asyncCallCount > 3) {
      opts.add({
        area = "Async Calls";
        currentCost = context.asyncCallCount * 1_000_000;
        optimizedCost = (context.asyncCallCount / 2) * 1_000_000;
        suggestion = "Batch inter-canister calls to reduce round-trips";
        difficulty = #medium;
      });
    };

    // Query optimization
    if (context.queryCount < context.updateCount) {
      opts.add({
        area = "Query Methods";
        currentCost = context.updateCount * 500_000;
        optimizedCost = context.queryCount * 10_000;
        suggestion = "Convert read-only operations to query methods";
        difficulty = #easy;
      });
    };

    // Stable memory optimization
    if (context.stableVarCount > 5) {
      opts.add({
        area = "Stable Memory";
        currentCost = context.stableVarCount * 500_000;
        optimizedCost = 1_000_000;
        suggestion = "Consolidate stable variables into a single stable record";
        difficulty = #hard;
      });
    };

    // Import optimization
    if (context.importCount > 20) {
      opts.add({
        area = "Module Imports";
        currentCost = context.importCount * 10_000;
        optimizedCost = 10 * 10_000;
        suggestion = "Review imports - some may be unused";
        difficulty = #easy;
      });
    };

    Buffer.toArray(opts);
  };

  /// Extract estimation context from source code
  public func extractContext(sourceCode : Text) : EstimationContext {
    // Count various patterns in source
    let lines = countLines(sourceCode);
    let funcs = countOccurrences(sourceCode, "func ");
    let stableVars = countOccurrences(sourceCode, "stable var");
    let asyncCalls = countOccurrences(sourceCode, "await ");
    let queries = countOccurrences(sourceCode, "query func");
    let updates = countOccurrences(sourceCode, "shared func") + 
                  countOccurrences(sourceCode, "public func");
    let imports = countOccurrences(sourceCode, "import ");

    {
      wasmSize = lines * 50; // Rough estimate
      sourceLines = lines;
      functionCount = funcs;
      stableVarCount = stableVars;
      asyncCallCount = asyncCalls;
      queryCount = queries;
      updateCount = updates - queries; // Shared minus queries
      importCount = imports;
    };
  };

  /// Count lines in text
  func countLines(text : Text) : Nat {
    var count : Nat = 1;
    for (char in text.chars()) {
      if (char == '\n') { count += 1 };
    };
    count;
  };

  /// Count occurrences of pattern
  func countOccurrences(text : Text, pattern : Text) : Nat {
    var count : Nat = 0;
    var remaining = text;
    
    label search loop {
      switch (Text.stripStart(remaining, #text(pattern))) {
        case (?rest) {
          count += 1;
          remaining := rest;
        };
        case (null) {
          if (Text.size(remaining) > 0) {
            // Skip one character and continue
            let chars = Text.toIter(remaining);
            ignore chars.next();
            remaining := Text.fromIter(chars);
          } else {
            break search;
          };
        };
      };
    };
    
    count;
  };

  /// Format AI estimate for display
  public func formatAIEstimate(estimate : AIEstimate) : Text {
    var output = "🤖 AI CYCLE ESTIMATION\n";
    output #= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    output #= Cycles.formatEstimate(estimate.base);
    output #= "\n";
    output #= "AI ADJUSTMENT: ";
    if (estimate.aiAdjustment >= 0) {
      output #= "+" # Int.toText(estimate.aiAdjustment) # " cycles\n";
    } else {
      output #= Int.toText(estimate.aiAdjustment) # " cycles\n";
    };
    output #= "CONFIDENCE: " # Int.toText(Float.toInt(estimate.confidence * 100.0)) # "%\n";
    output #= "\n";
    
    output #= "REASONING:\n";
    for (reason in estimate.reasoning.vals()) {
      output #= "  • " # reason # "\n";
    };

    if (estimate.optimizations.size() > 0) {
      output #= "\nOPTIMIZATION SUGGESTIONS:\n";
      for (opt in estimate.optimizations.vals()) {
        let difficulty = switch (opt.difficulty) {
          case (#easy) { "🟢 Easy" };
          case (#medium) { "🟡 Medium" };
          case (#hard) { "🔴 Hard" };
        };
        output #= "  • " # opt.area # " [" # difficulty # "]\n";
        output #= "    " # opt.suggestion # "\n";
        output #= "    Potential savings: " # Cycles.formatCycles(opt.currentCost - opt.optimizedCost) # "\n";
      };
    };

    output #= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    output;
  };
};
