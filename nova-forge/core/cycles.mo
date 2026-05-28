/// Nova Forge - Cycle Management
/// AI-powered cycle estimation and management for ICP mainnet

import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Time "mo:core/Time";
import Result "mo:core/Result";
import Array "mo:core/Array";

import Types "../types/config";

module {
  /// Cycle estimation result
  public type CycleEstimate = {
    installation : Nat;      // Cycles for initial install
    monthly : Nat;           // Estimated monthly burn
    recommended : Nat;       // Recommended allocation
    confidence : Float;      // 0.0 - 1.0
    factors : [CostFactor];  // Breakdown
  };

  /// Cost breakdown factor
  public type CostFactor = {
    name : Text;
    cycles : Nat;
    description : Text;
  };

  /// Cycle balance status
  public type CycleStatus = {
    #healthy;           // > 1T cycles
    #adequate;          // 100B - 1T
    #low;              // 10B - 100B
    #critical;         // < 10B
  };

  // ═══════════════════════════════════════════════════════════════
  // CYCLE CONSTANTS (as of 2024 ICP pricing)
  // ═══════════════════════════════════════════════════════════════

  /// Cycles per byte of WASM (installation)
  public let CYCLES_PER_WASM_BYTE : Nat = 10;

  /// Cycles per byte of stable memory
  public let CYCLES_PER_STABLE_BYTE : Nat = 127;

  /// Cycles per byte of heap memory
  public let CYCLES_PER_HEAP_BYTE : Nat = 127;

  /// Base cycles for canister creation
  public let CANISTER_CREATION_COST : Nat = 100_000_000_000; // 100B

  /// Minimum cycles for a canister
  public let MINIMUM_CYCLES : Nat = 100_000_000_000; // 100B

  /// Recommended cycles for new deployment
  public let RECOMMENDED_CYCLES : Nat = 1_000_000_000_000; // 1T

  /// Critical threshold
  public let CRITICAL_THRESHOLD : Nat = 10_000_000_000; // 10B

  /// Low threshold
  public let LOW_THRESHOLD : Nat = 100_000_000_000; // 100B

  /// Healthy threshold
  public let HEALTHY_THRESHOLD : Nat = 1_000_000_000_000; // 1T

  // ═══════════════════════════════════════════════════════════════
  // ESTIMATION FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  /// Estimate cycles needed for deployment
  public func estimateDeployment(
    wasmSize : Nat,
    estimatedMemory : Nat,
    isUpgrade : Bool
  ) : CycleEstimate {
    let factors = Array.tabulate<CostFactor>(4, func(i) {
      switch (i) {
        case (0) {{
          name = "WASM Installation";
          cycles = wasmSize * CYCLES_PER_WASM_BYTE;
          description = "Cost to install " # Nat.toText(wasmSize) # " bytes of WASM";
        }};
        case (1) {{
          name = "Memory Allocation";
          cycles = estimatedMemory * CYCLES_PER_STABLE_BYTE;
          description = "Cost for " # Nat.toText(estimatedMemory) # " bytes of memory";
        }};
        case (2) {{
          name = "Canister Creation";
          cycles = if (isUpgrade) 0 else CANISTER_CREATION_COST;
          description = if (isUpgrade) "N/A (upgrade)" else "One-time creation cost";
        }};
        case (_) {{
          name = "Safety Buffer";
          cycles = MINIMUM_CYCLES;
          description = "20% safety margin";
        }};
      };
    });

    var total : Nat = 0;
    for (factor in factors.vals()) {
      total += factor.cycles;
    };

    // Add 20% safety buffer
    let withBuffer = total + (total / 5);
    
    // Ensure minimum
    let recommended = Nat.max(withBuffer, RECOMMENDED_CYCLES);

    {
      installation = total;
      monthly = estimateMonthlyBurn(wasmSize, estimatedMemory);
      recommended = recommended;
      confidence = 0.85; // High confidence for standard deployments
      factors = factors;
    };
  };

  /// Estimate monthly cycle burn
  public func estimateMonthlyBurn(
    wasmSize : Nat,
    memoryUsage : Nat
  ) : Nat {
    // Base compute (assuming moderate usage)
    let baseCompute : Nat = 10_000_000_000; // 10B/month base
    
    // Memory cost (per GB per month)
    let memoryCost = (memoryUsage / (1024 * 1024 * 1024)) * 127_000_000_000;
    
    // Estimate based on WASM complexity
    let complexityFactor = wasmSize / 1_000_000; // Per MB of WASM
    let computeCost = baseCompute * Nat.max(1, complexityFactor);
    
    computeCost + memoryCost;
  };

  /// Get cycle status from balance
  public func getStatus(balance : Nat) : CycleStatus {
    if (balance >= HEALTHY_THRESHOLD) { #healthy }
    else if (balance >= LOW_THRESHOLD) { #adequate }
    else if (balance >= CRITICAL_THRESHOLD) { #low }
    else { #critical };
  };

  /// Format cycle count for display
  public func formatCycles(cycles : Nat) : Text {
    if (cycles >= 1_000_000_000_000) {
      Nat.toText(cycles / 1_000_000_000_000) # "T"
    } else if (cycles >= 1_000_000_000) {
      Nat.toText(cycles / 1_000_000_000) # "B"
    } else if (cycles >= 1_000_000) {
      Nat.toText(cycles / 1_000_000) # "M"
    } else {
      Nat.toText(cycles)
    };
  };

  /// Format estimate for display
  public func formatEstimate(estimate : CycleEstimate) : Text {
    var output = "💰 CYCLE ESTIMATE\n";
    output #= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    output #= "Installation: " # formatCycles(estimate.installation) # " cycles\n";
    output #= "Monthly Burn: ~" # formatCycles(estimate.monthly) # " cycles\n";
    output #= "Recommended:  " # formatCycles(estimate.recommended) # " cycles\n";
    output #= "Confidence:   " # Int.toText(Float.toInt(estimate.confidence * 100.0)) # "%\n";
    output #= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    output #= "BREAKDOWN:\n";
    
    for (factor in estimate.factors.vals()) {
      output #= "  • " # factor.name # ": " # formatCycles(factor.cycles) # "\n";
      output #= "    " # factor.description # "\n";
    };
    
    output;
  };

  /// Check if top-up needed
  public func needsTopUp(
    currentBalance : Nat,
    estimatedMonthlyBurn : Nat
  ) : Bool {
    // Need top-up if less than 3 months runway
    currentBalance < (estimatedMonthlyBurn * 3);
  };

  /// Calculate recommended top-up amount
  public func recommendedTopUp(
    currentBalance : Nat,
    estimatedMonthlyBurn : Nat
  ) : Nat {
    // Target 6 months runway
    let targetBalance = estimatedMonthlyBurn * 6;
    if (currentBalance >= targetBalance) { 0 }
    else { targetBalance - currentBalance };
  };
};
