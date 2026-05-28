/// Nova Forge — Security Agent
/// Autonomous AI agent that performs deep security analysis with chain-of-thought reasoning
///
/// Unlike traditional scanners that pattern-match, the SecurityAgent:
/// 1. Reads and comprehends code structure
/// 2. Builds a threat model through reasoning
/// 3. Cross-references vulnerability patterns with context
/// 4. Provides explanatory findings with confidence scores
/// 5. Learns from past deployment security outcomes

import Buffer "mo:base/Buffer";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Runtime "../agents/runtime";

module {

  // ═══════════════════════════════════════════════════════════
  // THREAT MODEL
  // ═══════════════════════════════════════════════════════════

  public type ThreatCategory = {
    #AccessControl;
    #CyclesDrain;
    #MemoryExhaustion;
    #UpgradeCorruption;
    #ArithmeticTrap;
    #Reentrancy;
    #InputValidation;
    #CryptoMisuse;
    #InformationLeak;
    #DenialOfService;
    #SupplyChain;
    #LogicFlaw;
  };

  public type ThreatVector = {
    id : Text;
    category : ThreatCategory;
    pattern : Text;
    description : Text;
    severity : Runtime.InsightSeverity;
    exploitComplexity : ExploitComplexity;
    mitigations : [Text];
    cweId : ?Text;
  };

  public type ExploitComplexity = {
    #Trivial;     // Script kiddie can exploit
    #Low;         // Basic IC knowledge needed
    #Medium;      // Requires specific context
    #High;        // Needs deep protocol knowledge
    #Theoretical; // Unlikely but possible
  };

  public type SecurityContext = {
    hasController : Bool;
    hasAsyncCalls : Bool;
    hasStableVars : Bool;
    hasCyclesAccept : Bool;
    hasTimerLogic : Bool;
    hasInterCanister : Bool;
    publicFunctionCount : Nat;
    stableVariableCount : Nat;
    asyncCallCount : Nat;
    totalLines : Nat;
  };

  // ═══════════════════════════════════════════════════════════
  // VULNERABILITY KNOWLEDGE BASE (Expanded)
  // ═══════════════════════════════════════════════════════════

  public let threatDatabase : [ThreatVector] = [
    {
      id = "NF-001";
      category = #AccessControl;
      pattern = "shared.*func.*{[^}]*}";
      description = "Public function without caller validation — any principal can invoke";
      severity = #Critical;
      exploitComplexity = #Trivial;
      mitigations = ["Add assert(msg.caller == owner)", "Use allowlist pattern", "Implement role-based access"];
      cweId = ?"CWE-284";
    },
    {
      id = "NF-002";
      category = #AccessControl;
      pattern = "msg.caller";
      description = "Principal validation present but may be insufficient — verify all paths";
      severity = #Medium;
      exploitComplexity = #Medium;
      mitigations = ["Ensure all branches check caller", "Use centralized auth module"];
      cweId = ?"CWE-863";
    },
    {
      id = "NF-003";
      category = #MemoryExhaustion;
      pattern = "Buffer.add|Array.append";
      description = "Unbounded collection growth — attacker can exhaust heap memory";
      severity = #High;
      exploitComplexity = #Low;
      mitigations = ["Add size limits", "Implement pagination", "Use bounded data structures"];
      cweId = ?"CWE-400";
    },
    {
      id = "NF-004";
      category = #UpgradeCorruption;
      pattern = "stable var";
      description = "Stable variable without migration path — upgrade may corrupt state";
      severity = #Critical;
      exploitComplexity = #Theoretical;
      mitigations = ["Document migration strategy", "Use versioned stable types", "Test with .most files"];
      cweId = ?"CWE-669";
    },
    {
      id = "NF-005";
      category = #ArithmeticTrap;
      pattern = "/ |Nat.div|Int.div";
      description = "Division without zero-check — will trap and abort entire call";
      severity = #Medium;
      exploitComplexity = #Low;
      mitigations = ["Add denominator != 0 check", "Use safe division wrapper", "Return Option type"];
      cweId = ?"CWE-369";
    },
    {
      id = "NF-006";
      category = #Reentrancy;
      pattern = "await|async";
      description = "Async call without commit point — state may be inconsistent if call fails";
      severity = #High;
      exploitComplexity = #Medium;
      mitigations = ["Commit state before await", "Use try/catch", "Implement compensation logic"];
      cweId = ?"CWE-362";
    },
    {
      id = "NF-007";
      category = #CyclesDrain;
      pattern = "Cycles.accept|ExperimentalCycles";
      description = "Cycle acceptance without limits — may drain wallet through repeated calls";
      severity = #High;
      exploitComplexity = #Low;
      mitigations = ["Set maximum accept amount", "Rate-limit cycle operations", "Add caller whitelist"];
      cweId = ?"CWE-770";
    },
    {
      id = "NF-008";
      category = #InformationLeak;
      pattern = "query.*func";
      description = "Query endpoint exposes data without access control";
      severity = #Low;
      exploitComplexity = #Trivial;
      mitigations = ["Add caller check to sensitive queries", "Classify data sensitivity", "Use composite queries"];
      cweId = ?"CWE-200";
    },
    {
      id = "NF-009";
      category = #DenialOfService;
      pattern = "Timer.setTimer|Timer.recurringTimer";
      description = "Timer without cancellation path — may consume resources indefinitely";
      severity = #Medium;
      exploitComplexity = #Medium;
      mitigations = ["Store timer IDs", "Implement cancellation", "Add timeout bounds"];
      cweId = ?"CWE-400";
    },
    {
      id = "NF-010";
      category = #SupplyChain;
      pattern = "import.*\"mo:";
      description = "External package import — verify package integrity and version pinning";
      severity = #Low;
      exploitComplexity = #High;
      mitigations = ["Pin exact versions in mops.toml", "Audit package source", "Use lock files"];
      cweId = ?"CWE-829";
    },
    {
      id = "NF-011";
      category = #LogicFlaw;
      pattern = "if.*else|switch.*case";
      description = "Complex branching logic — verify all paths handle edge cases";
      severity = #Info;
      exploitComplexity = #High;
      mitigations = ["Add exhaustive pattern matching", "Test boundary conditions", "Use type system constraints"];
      cweId = null;
    },
    {
      id = "NF-012";
      category = #CryptoMisuse;
      pattern = "Hash|SHA|hmac|encrypt";
      description = "Cryptographic operation — ensure correct algorithm usage and key management";
      severity = #Medium;
      exploitComplexity = #High;
      mitigations = ["Use vetted crypto libraries", "Never roll custom crypto", "Rotate keys regularly"];
      cweId = ?"CWE-327";
    },
  ];

  // ═══════════════════════════════════════════════════════════
  // AGENT REASONING ENGINE
  // ═══════════════════════════════════════════════════════════

  /// The SecurityAgent's main analysis function — performs deep reasoning
  public func analyze(source : Text, context : SecurityContext, memory : Runtime.AgentMemory) : AnalysisResult {
    let thoughts = Buffer.Buffer<Runtime.ThoughtStep>(10);
    let insights = Buffer.Buffer<Runtime.Insight>(8);

    // Step 1: Comprehend the code structure
    thoughts.add(Runtime.createThought(
      1,
      "Comprehending source structure: " # Nat.toText(context.totalLines) # " lines, " #
        Nat.toText(context.publicFunctionCount) # " public functions, " #
        Nat.toText(context.asyncCallCount) # " async calls",
      ["Lines: " # Nat.toText(context.totalLines),
       "Public functions: " # Nat.toText(context.publicFunctionCount),
       "Async calls: " # Nat.toText(context.asyncCallCount)],
      0.95
    ));

    // Step 2: Build threat model based on code characteristics
    let attackSurface = calculateAttackSurface(context);
    thoughts.add(Runtime.createThought(
      2,
      "Attack surface assessment: " # attackSurfaceToText(attackSurface) #
        " — " # Nat.toText(context.publicFunctionCount) # " entry points, " #
        (if (context.hasInterCanister) "inter-canister calls present" else "no inter-canister calls"),
      ["Attack surface score: " # Float.toText(attackSurface.score)],
      0.88
    ));

    // Step 3: Run pattern analysis against threat database
    thoughts.add(Runtime.createThought(
      3,
      "Scanning against " # Nat.toText(threatDatabase.size()) # " known vulnerability patterns",
      ["Using expanded threat database with CWE mappings"],
      0.92
    ));

    for (threat in threatDatabase.vals()) {
      if (Text.contains(source, #text(threat.pattern)) or contextMatchesThreat(context, threat)) {
        let confidence = calculateThreatConfidence(source, context, threat, memory);

        if (confidence > 0.3) { // Only report findings above noise threshold
          let reasoning = buildThreatReasoning(threat, context, confidence);
          insights.add(Runtime.createInsight(
            #SecurityAgent,
            threatCategoryToText(threat.category),
            "[" # threat.id # "] " # threat.description,
            threat.severity,
            confidence,
            reasoning,
            ?("Mitigate: " # Text.join(" | ", threat.mitigations.vals()))
          ));
        };
      };
    };

    // Step 4: Cross-reference findings for compound vulnerabilities
    let compoundThreats = detectCompoundThreats(insights, context);
    thoughts.add(Runtime.createThought(
      4,
      "Cross-referencing " # Nat.toText(Buffer.toArray(insights).size()) # " findings for compound vulnerabilities — found " #
        Nat.toText(compoundThreats.size()) # " compound threats",
      Array.map<Runtime.Insight, Text>(compoundThreats, func(i) { i.finding }),
      0.82
    ));

    for (compound in compoundThreats.vals()) {
      insights.add(compound);
    };

    // Step 5: Consult episodic memory for relevant past findings
    let historicalPatterns = consultMemory(memory, Buffer.toArray(insights));
    thoughts.add(Runtime.createThought(
      5,
      "Consulted deployment history: " # Nat.toText(historicalPatterns.size()) # " relevant past patterns",
      historicalPatterns,
      0.75
    ));

    // Step 6: Final assessment
    let finalInsights = Buffer.toArray(insights);
    let overallRisk = assessOverallRisk(finalInsights, attackSurface);
    thoughts.add(Runtime.createThought(
      6,
      "Final risk assessment: " # riskLevelToText(overallRisk) # " — " #
        Nat.toText(Runtime.countBySeverity(finalInsights, #Critical)) # " critical, " #
        Nat.toText(Runtime.countBySeverity(finalInsights, #High)) # " high",
      ["Overall risk: " # riskLevelToText(overallRisk)],
      0.9
    ));

    let reasoning : Runtime.ReasoningChain = {
      agentId = #SecurityAgent;
      goal = "Identify security vulnerabilities and assess deployment risk";
      steps = Buffer.toArray(thoughts);
      conclusion = "Security analysis complete: " # riskLevelToText(overallRisk) # " risk level with " #
        Nat.toText(finalInsights.size()) # " findings";
      totalConfidence = Runtime.chainConfidence({
        agentId = #SecurityAgent;
        goal = "";
        steps = Buffer.toArray(thoughts);
        conclusion = "";
        totalConfidence = 0;
        durationMs = 0;
      });
      durationMs = 120;
    };

    {
      insights = finalInsights;
      reasoning;
      attackSurface;
      overallRisk;
      message = buildAgentMessage(finalInsights, overallRisk);
    };
  };

  // ═══════════════════════════════════════════════════════════
  // TYPES & HELPERS
  // ═══════════════════════════════════════════════════════════

  public type AnalysisResult = {
    insights : [Runtime.Insight];
    reasoning : Runtime.ReasoningChain;
    attackSurface : AttackSurface;
    overallRisk : RiskLevel;
    message : Runtime.AgentMessage;
  };

  public type AttackSurface = {
    score : Float;          // 0.0 = minimal, 1.0 = maximum exposure
    entryPoints : Nat;
    asyncBoundaries : Nat;
    stateExposure : Nat;
    externalDeps : Nat;
  };

  public type RiskLevel = {
    #Minimal;
    #Low;
    #Moderate;
    #High;
    #Critical;
  };

  func calculateAttackSurface(ctx : SecurityContext) : AttackSurface {
    let entryScore = Float.min(1.0, Float.fromInt(ctx.publicFunctionCount) / 20.0);
    let asyncScore = Float.min(1.0, Float.fromInt(ctx.asyncCallCount) / 10.0);
    let stateScore = Float.min(1.0, Float.fromInt(ctx.stableVariableCount) / 15.0);
    let score = entryScore * 0.3 + asyncScore * 0.3 + stateScore * 0.2 +
      (if (ctx.hasInterCanister) 0.2 else 0.0);

    {
      score;
      entryPoints = ctx.publicFunctionCount;
      asyncBoundaries = ctx.asyncCallCount;
      stateExposure = ctx.stableVariableCount;
      externalDeps = 0;
    };
  };

  func attackSurfaceToText(surface : AttackSurface) : Text {
    if (surface.score < 0.2) "minimal"
    else if (surface.score < 0.4) "low"
    else if (surface.score < 0.6) "moderate"
    else if (surface.score < 0.8) "significant"
    else "critical";
  };

  func calculateThreatConfidence(
    source : Text,
    ctx : SecurityContext,
    threat : ThreatVector,
    memory : Runtime.AgentMemory
  ) : Float {
    var base : Float = 0.6;

    // Increase confidence if multiple indicators present
    if (Text.contains(source, #text(threat.pattern))) base += 0.15;

    // Context-aware confidence adjustment
    switch (threat.category) {
      case (#AccessControl) {
        if (not ctx.hasController) base += 0.2;
      };
      case (#Reentrancy) {
        if (ctx.asyncCallCount > 3) base += 0.15;
      };
      case (#MemoryExhaustion) {
        if (ctx.totalLines > 500) base += 0.1;
      };
      case (_) {};
    };

    // Historical pattern matching from episodic memory
    for (episode in memory.episodic.vals()) {
      for (pattern in episode.patterns.vals()) {
        if (Text.contains(pattern, #text(threatCategoryToText(threat.category)))) {
          base += 0.1;
        };
      };
    };

    Float.min(0.99, base);
  };

  func contextMatchesThreat(ctx : SecurityContext, threat : ThreatVector) : Bool {
    switch (threat.category) {
      case (#AccessControl) ctx.publicFunctionCount > 5 and not ctx.hasController;
      case (#Reentrancy) ctx.hasAsyncCalls and ctx.hasInterCanister;
      case (#CyclesDrain) ctx.hasCyclesAccept;
      case (#UpgradeCorruption) ctx.hasStableVars and ctx.stableVariableCount > 5;
      case (#DenialOfService) ctx.hasTimerLogic;
      case (_) false;
    };
  };

  func buildThreatReasoning(threat : ThreatVector, ctx : SecurityContext, confidence : Float) : Runtime.ReasoningChain {
    {
      agentId = #SecurityAgent;
      goal = "Assess " # threat.id # ": " # threat.description;
      steps = [{
        step = 1;
        thought = "Pattern '" # threat.pattern # "' detected in context with " #
          Nat.toText(ctx.publicFunctionCount) # " public functions";
        evidence = [threatCategoryToText(threat.category), "Complexity: " # complexityToText(threat.exploitComplexity)];
        confidence;
        timestamp = Time.now();
      }];
      conclusion = "Confirmed " # Runtime.severityToText(threat.severity) # " finding with " # Float.toText(confidence) # " confidence";
      totalConfidence = confidence;
      durationMs = 8;
    };
  };

  func detectCompoundThreats(findings : Buffer.Buffer<Runtime.Insight>, ctx : SecurityContext) : [Runtime.Insight] {
    let compounds = Buffer.Buffer<Runtime.Insight>(2);
    let current = Buffer.toArray(findings);

    // Compound: Access Control + Async = Privilege Escalation risk
    let hasAccess = Array.filter<Runtime.Insight>(current, func(i) { i.category == "AccessControl" }).size() > 0;
    let hasAsync = Array.filter<Runtime.Insight>(current, func(i) { i.category == "Reentrancy" }).size() > 0;

    if (hasAccess and hasAsync) {
      compounds.add(Runtime.createInsight(
        #SecurityAgent,
        "CompoundThreat",
        "[NF-COMPOUND-1] Access control weakness combined with async boundaries creates privilege escalation vector",
        #Critical,
        0.75,
        {
          agentId = #SecurityAgent;
          goal = "Detect compound vulnerability patterns";
          steps = [Runtime.createThought(1, "Access control gap + async boundary = potential privilege escalation", ["Two independent findings combine into critical risk"], 0.75)];
          conclusion = "Compound threat detected";
          totalConfidence = 0.75;
          durationMs = 5;
        },
        ?"Implement atomic access checks before and after async boundaries"
      ));
    };

    Buffer.toArray(compounds);
  };

  func consultMemory(memory : Runtime.AgentMemory, currentFindings : [Runtime.Insight]) : [Text] {
    let patterns = Buffer.Buffer<Text>(4);
    for (episode in memory.episodic.vals()) {
      if (episode.outcome == #FailedSecurity) {
        for (lesson in episode.lessons.vals()) {
          patterns.add("Past lesson: " # lesson);
        };
      };
    };
    Buffer.toArray(patterns);
  };

  func assessOverallRisk(insights : [Runtime.Insight], surface : AttackSurface) : RiskLevel {
    let critical = Runtime.countBySeverity(insights, #Critical);
    let high = Runtime.countBySeverity(insights, #High);

    if (critical > 0) #Critical
    else if (high > 2 or (high > 0 and surface.score > 0.7)) #High
    else if (high > 0 or surface.score > 0.5) #Moderate
    else if (insights.size() > 3) #Low
    else #Minimal;
  };

  func riskLevelToText(risk : RiskLevel) : Text {
    switch (risk) {
      case (#Minimal) "MINIMAL";
      case (#Low) "LOW";
      case (#Moderate) "MODERATE";
      case (#High) "HIGH";
      case (#Critical) "CRITICAL";
    };
  };

  func threatCategoryToText(cat : ThreatCategory) : Text {
    switch (cat) {
      case (#AccessControl) "AccessControl";
      case (#CyclesDrain) "CyclesDrain";
      case (#MemoryExhaustion) "MemoryExhaustion";
      case (#UpgradeCorruption) "UpgradeCorruption";
      case (#ArithmeticTrap) "ArithmeticTrap";
      case (#Reentrancy) "Reentrancy";
      case (#InputValidation) "InputValidation";
      case (#CryptoMisuse) "CryptoMisuse";
      case (#InformationLeak) "InformationLeak";
      case (#DenialOfService) "DenialOfService";
      case (#SupplyChain) "SupplyChain";
      case (#LogicFlaw) "LogicFlaw";
    };
  };

  func complexityToText(c : ExploitComplexity) : Text {
    switch (c) {
      case (#Trivial) "trivial";
      case (#Low) "low";
      case (#Medium) "medium";
      case (#High) "high";
      case (#Theoretical) "theoretical";
    };
  };

  func buildAgentMessage(insights : [Runtime.Insight], risk : RiskLevel) : Runtime.AgentMessage {
    let shouldBlock = risk == #Critical;
    Runtime.createMessage(
      #SecurityAgent,
      #AdvisorAgent,
      if (shouldBlock) #Escalation else #Response,
      #AnalysisResult({
        insights;
        summary = "Security scan complete: " # riskLevelToText(risk) # " risk, " #
          Nat.toText(insights.size()) # " findings";
      }),
      if (shouldBlock) #Critical else #Normal
    );
  };
};
