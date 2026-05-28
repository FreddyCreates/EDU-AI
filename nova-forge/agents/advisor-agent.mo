/// Nova Forge — Advisor Agent
/// The autonomous decision-making agent that synthesizes all findings
/// and produces intelligent go/no-go deployment recommendations
///
/// The AdvisorAgent:
/// 1. Receives analysis from Security, Cost, and Safety agents
/// 2. Weighs findings against deployment context
/// 3. Applies decision framework with explicit reasoning
/// 4. Produces actionable recommendations with confidence levels
/// 5. Adapts decision thresholds based on historical outcomes

import Buffer "mo:base/Buffer";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Runtime "../agents/runtime";

module {

  // ═══════════════════════════════════════════════════════════
  // DECISION FRAMEWORK
  // ═══════════════════════════════════════════════════════════

  public type DeploymentContext = {
    projectName : Text;
    version : Text;
    isUpgrade : Bool;
    isEmergency : Bool;
    previousDeployments : Nat;
    lastDeployOutcome : ?Runtime.EpisodeOutcome;
    securityLevel : SecurityLevel;
    timeOfDay : Nat;          // 0-23 hour
    dayOfWeek : Nat;          // 0-6
  };

  public type SecurityLevel = {
    #Strict;
    #Standard;
    #Minimal;
  };

  public type AgentFindings = {
    security : SecurityFindings;
    cost : CostFindings;
    safety : SafetyFindings;
  };

  public type SecurityFindings = {
    insights : [Runtime.Insight];
    overallRisk : Text;
    criticalCount : Nat;
    highCount : Nat;
    mediumCount : Nat;
  };

  public type CostFindings = {
    totalCycles : Nat;
    monthlyBurn : Nat;
    confidence : Float;
    optimizationCount : Nat;
    withinBudget : Bool;
  };

  public type SafetyFindings = {
    safe : Bool;
    willTrap : Bool;
    dataLossRisk : Float;
    migrationRequired : Bool;
    rollbackSafe : Bool;
  };

  // ═══════════════════════════════════════════════════════════
  // RECOMMENDATION OUTPUT
  // ═══════════════════════════════════════════════════════════

  public type Recommendation = {
    decision : DeployDecision;
    confidence : Float;
    reasoning : Runtime.ReasoningChain;
    conditions : [Condition];
    alternatives : [Alternative];
    timing : TimingAdvice;
    checklist : [ChecklistItem];
    humanMessage : Text;     // Natural language summary for operator
  };

  public type DeployDecision = {
    #Go;                     // ✅ Safe to deploy
    #GoWithCaution;          // ⚠️ Deploy but monitor closely
    #HoldForReview;          // 🔍 Needs human review
    #Block;                  // 🛑 Do not deploy
    #Abort;                  // 🚨 Critical issue, abort immediately
  };

  public type Condition = {
    requirement : Text;
    met : Bool;
    blocking : Bool;
    importance : Float;      // 0.0 - 1.0
  };

  public type Alternative = {
    action : Text;
    benefit : Text;
    tradeoff : Text;
    recommended : Bool;
  };

  public type TimingAdvice = {
    deployNow : Bool;
    reason : Text;
    suggestedWindow : ?Text;
    riskMultiplier : Float;
  };

  public type ChecklistItem = {
    item : Text;
    status : CheckStatus;
    critical : Bool;
  };

  public type CheckStatus = {
    #Pass;
    #Fail;
    #Warning;
    #Skipped;
    #NotApplicable;
  };

  // ═══════════════════════════════════════════════════════════
  // ADVISORY REASONING ENGINE
  // ═══════════════════════════════════════════════════════════

  public type AdvisoryResult = {
    recommendation : Recommendation;
    insights : [Runtime.Insight];
    message : Runtime.AgentMessage;
  };

  /// The Advisor's main decision function
  public func advise(
    context : DeploymentContext,
    findings : AgentFindings,
    memory : Runtime.AgentMemory
  ) : AdvisoryResult {
    let thoughts = Buffer.Buffer<Runtime.ThoughtStep>(10);
    let insights = Buffer.Buffer<Runtime.Insight>(4);

    // ─── Step 1: Understand the deployment context ───
    thoughts.add(Runtime.createThought(
      1,
      "Analyzing deployment context: " # context.projectName # " v" # context.version #
        (if (context.isUpgrade) " (UPGRADE)" else " (FRESH INSTALL)") #
        (if (context.isEmergency) " [EMERGENCY]" else ""),
      ["Previous deployments: " # Nat.toText(context.previousDeployments),
       "Security level: " # securityLevelToText(context.securityLevel),
       "Time: " # Nat.toText(context.timeOfDay) # ":00, day " # Nat.toText(context.dayOfWeek)],
      0.95
    ));

    // ─── Step 2: Evaluate security findings ───
    let securityScore = evaluateSecurity(findings.security, context.securityLevel);
    thoughts.add(Runtime.createThought(
      2,
      "Security evaluation: score=" # Float.toText(securityScore) # " | " #
        Nat.toText(findings.security.criticalCount) # " critical, " #
        Nat.toText(findings.security.highCount) # " high, " #
        Nat.toText(findings.security.mediumCount) # " medium",
      ["Overall risk: " # findings.security.overallRisk,
       "Security level policy: " # securityLevelToText(context.securityLevel)],
      0.9
    ));

    // ─── Step 3: Evaluate cost findings ───
    let costScore = evaluateCost(findings.cost);
    thoughts.add(Runtime.createThought(
      3,
      "Cost evaluation: score=" # Float.toText(costScore) #
        " | Total: " # Nat.toText(findings.cost.totalCycles) #
        " | Monthly: " # Nat.toText(findings.cost.monthlyBurn) #
        " | Within budget: " # (if (findings.cost.withinBudget) "yes" else "NO"),
      ["Model confidence: " # Float.toText(findings.cost.confidence),
       "Optimizations available: " # Nat.toText(findings.cost.optimizationCount)],
      0.85
    ));

    // ─── Step 4: Evaluate safety findings ───
    let safetyScore = evaluateSafety(findings.safety);
    thoughts.add(Runtime.createThought(
      4,
      "Safety evaluation: score=" # Float.toText(safetyScore) #
        " | Safe: " # (if (findings.safety.safe) "✅" else "❌") #
        " | Will trap: " # (if (findings.safety.willTrap) "🚨 YES" else "no") #
        " | Data loss: " # Float.toText(findings.safety.dataLossRisk * 100.0) # "%",
      ["Migration required: " # (if (findings.safety.migrationRequired) "yes" else "no"),
       "Rollback safe: " # (if (findings.safety.rollbackSafe) "yes" else "no")],
      0.92
    ));

    // ─── Step 5: Timing analysis ───
    let timing = evaluateTiming(context);
    thoughts.add(Runtime.createThought(
      5,
      "Timing analysis: " # timing.reason #
        " | Risk multiplier: " # Float.toText(timing.riskMultiplier),
      [if (timing.deployNow) "Good deployment window" else "Suboptimal timing"],
      0.78
    ));

    // ─── Step 6: Historical pattern matching ───
    let historicalConfidence = consultHistory(memory, findings);
    thoughts.add(Runtime.createThought(
      6,
      "Historical analysis: similar deployments had " # Float.toText(historicalConfidence * 100.0) # "% success rate",
      Array.map<Runtime.Episode, Text>(
        Array.filter<Runtime.Episode>(memory.episodic, func(e) { e.outcome != #Success }),
        func(e) { "Past failure: " # Text.join(", ", e.lessons.vals()) }
      ),
      0.75
    ));

    // ─── Step 7: Synthesize decision ───
    let weightedScore = (securityScore * 0.35) + (costScore * 0.15) + (safetyScore * 0.30) +
      (historicalConfidence * 0.10) + (if (timing.deployNow) 0.1 else 0.0);

    let decision = decideFromScore(weightedScore, findings, context);
    let confidence = calculateDecisionConfidence(weightedScore, findings);

    thoughts.add(Runtime.createThought(
      7,
      "Decision synthesis: weighted score=" # Float.toText(weightedScore) #
        " → " # decisionToText(decision) # " (confidence: " # Float.toText(confidence) # ")",
      ["Security weight: 35%", "Safety weight: 30%", "Cost weight: 15%", "History weight: 10%", "Timing weight: 10%"],
      confidence
    ));

    // ─── Step 8: Generate conditions and alternatives ───
    let conditions = buildConditions(findings, context);
    let alternatives = buildAlternatives(decision, findings);
    let checklist = buildChecklist(findings, context);

    thoughts.add(Runtime.createThought(
      8,
      "Generated " # Nat.toText(conditions.size()) # " conditions, " #
        Nat.toText(alternatives.size()) # " alternatives, " #
        Nat.toText(checklist.size()) # " checklist items",
      [],
      0.9
    ));

    // Build human-readable message
    let humanMessage = buildHumanMessage(decision, confidence, findings, conditions);

    // Create insight if decision is non-trivial
    if (decision != #Go) {
      insights.add(Runtime.createInsight(
        #AdvisorAgent,
        "DeploymentDecision",
        decisionToText(decision) # ": " # humanMessage,
        decisionToSeverity(decision),
        confidence,
        {
          agentId = #AdvisorAgent;
          goal = "Make deployment decision";
          steps = Buffer.toArray(thoughts);
          conclusion = decisionToText(decision);
          totalConfidence = confidence;
          durationMs = 150;
        },
        ?buildActionSuggestion(decision, findings)
      ));
    };

    let reasoning : Runtime.ReasoningChain = {
      agentId = #AdvisorAgent;
      goal = "Produce intelligent go/no-go deployment recommendation";
      steps = Buffer.toArray(thoughts);
      conclusion = decisionToEmoji(decision) # " " # decisionToText(decision) # " — " # humanMessage;
      totalConfidence = confidence;
      durationMs = 150;
    };

    let recommendation : Recommendation = {
      decision;
      confidence;
      reasoning;
      conditions;
      alternatives;
      timing;
      checklist;
      humanMessage;
    };

    {
      recommendation;
      insights = Buffer.toArray(insights);
      message = Runtime.createMessage(
        #AdvisorAgent,
        #Orchestrator,
        #Response,
        #Decision({
          go = decision == #Go or decision == #GoWithCaution;
          confidence;
          reasoning = humanMessage;
          conditions = Array.map<Condition, Text>(
            Array.filter<Condition>(conditions, func(c) { not c.met and c.blocking }),
            func(c) { c.requirement }
          );
        }),
        if (decision == #Block or decision == #Abort) #Critical else #Normal
      );
    };
  };

  // ═══════════════════════════════════════════════════════════
  // SCORING FUNCTIONS
  // ═══════════════════════════════════════════════════════════

  func evaluateSecurity(findings : SecurityFindings, level : SecurityLevel) : Float {
    if (findings.criticalCount > 0) return 0.0;

    let baseScore : Float = switch (level) {
      case (#Strict) {
        if (findings.highCount > 0) 0.2
        else if (findings.mediumCount > 2) 0.5
        else 1.0;
      };
      case (#Standard) {
        if (findings.highCount > 2) 0.3
        else if (findings.highCount > 0) 0.6
        else 1.0;
      };
      case (#Minimal) {
        if (findings.highCount > 5) 0.4
        else 0.9;
      };
    };

    baseScore;
  };

  func evaluateCost(findings : CostFindings) : Float {
    var score : Float = 1.0;
    if (not findings.withinBudget) score -= 0.4;
    if (findings.confidence < 0.7) score -= 0.2;
    if (findings.monthlyBurn > 1_000_000_000_000) score -= 0.2; // >1T/month
    Float.max(0.0, score);
  };

  func evaluateSafety(findings : SafetyFindings) : Float {
    if (findings.willTrap) return 0.0;
    var score : Float = 1.0;
    score -= findings.dataLossRisk * 0.5;
    if (findings.migrationRequired) score -= 0.2;
    if (not findings.rollbackSafe) score -= 0.15;
    Float.max(0.0, score);
  };

  func evaluateTiming(context : DeploymentContext) : TimingAdvice {
    // Avoid deploying during high-risk windows
    let isWeekend = context.dayOfWeek == 0 or context.dayOfWeek == 6;
    let isNight = context.timeOfDay < 6 or context.timeOfDay > 22;
    let isRiskyTime = isWeekend or isNight;

    if (context.isEmergency) {
      { deployNow = true; reason = "Emergency deployment — timing override"; suggestedWindow = null; riskMultiplier = 1.0 };
    } else if (isRiskyTime) {
      { deployNow = false; reason = "Deploying outside business hours increases incident response risk"; suggestedWindow = ?"Tuesday-Thursday, 10:00-16:00 UTC"; riskMultiplier = 1.3 };
    } else {
      { deployNow = true; reason = "Good deployment window — team likely available for monitoring"; suggestedWindow = null; riskMultiplier = 1.0 };
    };
  };

  func consultHistory(memory : Runtime.AgentMemory, findings : AgentFindings) : Float {
    if (memory.episodic.size() == 0) return 0.8; // No history = moderate confidence

    var successes : Float = 0;
    var total : Float = 0;

    for (episode in memory.episodic.vals()) {
      total += 1;
      if (episode.outcome == #Success) successes += 1;
    };

    if (total > 0) successes / total else 0.8;
  };

  // ═══════════════════════════════════════════════════════════
  // DECISION LOGIC
  // ═══════════════════════════════════════════════════════════

  func decideFromScore(score : Float, findings : AgentFindings, context : DeploymentContext) : DeployDecision {
    // Hard blockers
    if (findings.safety.willTrap) return #Abort;
    if (findings.security.criticalCount > 0) {
      return switch (context.securityLevel) {
        case (#Strict) #Block;
        case (#Standard) #Block;
        case (#Minimal) #HoldForReview;
      };
    };

    // Score-based decision
    if (score >= 0.85) #Go
    else if (score >= 0.65) #GoWithCaution
    else if (score >= 0.45) #HoldForReview
    else #Block;
  };

  func calculateDecisionConfidence(score : Float, findings : AgentFindings) : Float {
    // High confidence when decision is clear-cut
    if (score > 0.9 or score < 0.2) 0.95
    else if (score > 0.8 or score < 0.3) 0.85
    else 0.7; // Borderline decisions have lower confidence
  };

  func buildConditions(findings : AgentFindings, context : DeploymentContext) : [Condition] {
    let conditions = Buffer.Buffer<Condition>(6);

    conditions.add({
      requirement = "No critical security vulnerabilities";
      met = findings.security.criticalCount == 0;
      blocking = true;
      importance = 1.0;
    });

    conditions.add({
      requirement = "Upgrade will not trap";
      met = not findings.safety.willTrap;
      blocking = true;
      importance = 1.0;
    });

    conditions.add({
      requirement = "Within cycle budget";
      met = findings.cost.withinBudget;
      blocking = context.securityLevel == #Strict;
      importance = 0.7;
    });

    conditions.add({
      requirement = "Rollback path available";
      met = findings.safety.rollbackSafe;
      blocking = false;
      importance = 0.6;
    });

    conditions.add({
      requirement = "No high severity findings (strict mode)";
      met = findings.security.highCount == 0;
      blocking = context.securityLevel == #Strict;
      importance = 0.8;
    });

    conditions.add({
      requirement = "Cost estimation confidence above 70%";
      met = findings.cost.confidence >= 0.7;
      blocking = false;
      importance = 0.4;
    });

    Buffer.toArray(conditions);
  };

  func buildAlternatives(decision : DeployDecision, findings : AgentFindings) : [Alternative] {
    let alts = Buffer.Buffer<Alternative>(3);

    switch (decision) {
      case (#Block or #Abort) {
        alts.add({
          action = "Fix critical issues and re-run pipeline";
          benefit = "Removes deployment blockers";
          tradeoff = "Requires additional development time";
          recommended = true;
        });
        alts.add({
          action = "Deploy as fresh install (new canister ID)";
          benefit = "Avoids upgrade safety issues";
          tradeoff = "Loses all existing state and canister ID";
          recommended = false;
        });
      };
      case (#HoldForReview) {
        alts.add({
          action = "Apply recommended optimizations and re-scan";
          benefit = "May elevate to GO status";
          tradeoff = "30-60 minutes additional work";
          recommended = true;
        });
        alts.add({
          action = "Override with --force flag";
          benefit = "Immediate deployment";
          tradeoff = "Accepting known risks without mitigation";
          recommended = false;
        });
      };
      case (#GoWithCaution) {
        alts.add({
          action = "Deploy with enhanced monitoring";
          benefit = "Proceed with safety net";
          tradeoff = "Requires manual monitoring";
          recommended = true;
        });
      };
      case (_) {};
    };

    Buffer.toArray(alts);
  };

  func buildChecklist(findings : AgentFindings, context : DeploymentContext) : [ChecklistItem] {
    let items = Buffer.Buffer<ChecklistItem>(8);

    items.add({ item = "Security scan passed"; status = if (findings.security.criticalCount == 0) #Pass else #Fail; critical = true });
    items.add({ item = "No critical vulnerabilities"; status = if (findings.security.criticalCount == 0) #Pass else #Fail; critical = true });
    items.add({ item = "Upgrade safety validated"; status = if (findings.safety.safe) #Pass else if (findings.safety.willTrap) #Fail else #Warning; critical = context.isUpgrade });
    items.add({ item = "Cycle budget confirmed"; status = if (findings.cost.withinBudget) #Pass else #Warning; critical = false });
    items.add({ item = "Rollback path verified"; status = if (findings.safety.rollbackSafe) #Pass else #Warning; critical = false });
    items.add({ item = "Cost model confidence"; status = if (findings.cost.confidence >= 0.7) #Pass else #Warning; critical = false });
    items.add({ item = "Deployment timing appropriate"; status = #Pass; critical = false });
    items.add({ item = "Historical success rate acceptable"; status = #Pass; critical = false });

    Buffer.toArray(items);
  };

  // ═══════════════════════════════════════════════════════════
  // MESSAGE GENERATION
  // ═══════════════════════════════════════════════════════════

  func buildHumanMessage(decision : DeployDecision, confidence : Float, findings : AgentFindings, conditions : [Condition]) : Text {
    let unmetBlockers = Array.filter<Condition>(conditions, func(c) { not c.met and c.blocking });

    switch (decision) {
      case (#Go) {
        "All checks pass. " # "Safe to deploy to mainnet with " # Float.toText(confidence * 100.0) # "% confidence.";
      };
      case (#GoWithCaution) {
        "Deploy is possible but proceed with caution. " #
          Nat.toText(findings.security.highCount) # " high-severity findings and " #
          (if (not findings.safety.rollbackSafe) "no rollback path. " else "") #
          "Monitor closely post-deployment.";
      };
      case (#HoldForReview) {
        "Deployment paused for human review. " #
          Nat.toText(unmetBlockers.size()) # " conditions not met. " #
          "Review findings and decide whether to proceed or fix issues first.";
      };
      case (#Block) {
        "🛑 Deployment BLOCKED. " #
          Nat.toText(unmetBlockers.size()) # " critical conditions failed: " #
          Text.join(", ", Array.map<Condition, Text>(unmetBlockers, func(c) { c.requirement }).vals()) # ". " #
          "Fix these issues before attempting deployment.";
      };
      case (#Abort) {
        "🚨 ABORT — Critical safety issue detected. " #
          (if (findings.safety.willTrap) "Upgrade WILL TRAP and corrupt canister state. " else "") #
          "Do NOT deploy. Immediate remediation required.";
      };
    };
  };

  func buildActionSuggestion(decision : DeployDecision, findings : AgentFindings) : Text {
    switch (decision) {
      case (#Block) "Fix " # Nat.toText(findings.security.criticalCount) # " critical and " # Nat.toText(findings.security.highCount) # " high findings, then re-run nova scan";
      case (#Abort) "Revert stable memory changes or deploy as fresh install";
      case (#HoldForReview) "Run `nova scan --verbose` for detailed remediation guidance";
      case (#GoWithCaution) "Deploy with `nova deploy --monitor` for enhanced post-deployment checks";
      case (#Go) "Deploy with `nova deploy --confirm`";
    };
  };

  // ═══════════════════════════════════════════════════════════
  // UTILITIES
  // ═══════════════════════════════════════════════════════════

  func securityLevelToText(level : SecurityLevel) : Text {
    switch (level) { case (#Strict) "strict"; case (#Standard) "standard"; case (#Minimal) "minimal" };
  };

  func decisionToText(d : DeployDecision) : Text {
    switch (d) {
      case (#Go) "GO";
      case (#GoWithCaution) "GO WITH CAUTION";
      case (#HoldForReview) "HOLD FOR REVIEW";
      case (#Block) "BLOCKED";
      case (#Abort) "ABORT";
    };
  };

  func decisionToEmoji(d : DeployDecision) : Text {
    switch (d) {
      case (#Go) "✅";
      case (#GoWithCaution) "⚠️";
      case (#HoldForReview) "🔍";
      case (#Block) "🛑";
      case (#Abort) "🚨";
    };
  };

  func decisionToSeverity(d : DeployDecision) : Runtime.InsightSeverity {
    switch (d) {
      case (#Go) #Info;
      case (#GoWithCaution) #Medium;
      case (#HoldForReview) #High;
      case (#Block) #Critical;
      case (#Abort) #Critical;
    };
  };
};
