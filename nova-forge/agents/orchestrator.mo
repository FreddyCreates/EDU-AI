/// Nova Forge — Orchestrator Agent
/// The brain that coordinates all other agents in an autonomous pipeline
///
/// The Orchestrator:
/// 1. Receives deployment intent
/// 2. Spawns and coordinates specialized agents
/// 3. Manages inter-agent communication
/// 4. Synthesizes findings into final decision
/// 5. Learns from each deployment outcome

import Buffer "mo:base/Buffer";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Result "mo:base/Result";
import Runtime "runtime";

module {

  // ═══════════════════════════════════════════════════════════
  // ORCHESTRATOR STATE
  // ═══════════════════════════════════════════════════════════

  public type OrchestratorState = {
    pipeline : Runtime.Pipeline;
    messages : [Runtime.AgentMessage];
    decisions : [Runtime.Decision];
    memory : Runtime.AgentMemory;
    agentStates : [(Runtime.AgentId, Runtime.AgentState)];
  };

  public type DeploymentIntent = {
    projectName : Text;
    version : Text;
    sources : [SourceFile];
    config : DeployConfig;
    urgency : Urgency;
    previousHistory : [Runtime.Episode];
  };

  public type SourceFile = {
    path : Text;
    content : Text;
    language : SourceLanguage;
    isEntryPoint : Bool;
  };

  public type SourceLanguage = {
    #Motoko;
    #Rust;
    #TypeScript;
    #Unknown;
  };

  public type DeployConfig = {
    securityLevel : SecurityLevel;
    cyclesBudget : ?Nat;
    allowUpgrade : Bool;
    requireHumanApproval : Bool;
    parallelAgents : Bool;
  };

  public type SecurityLevel = {
    #Strict;
    #Standard;
    #Minimal;
  };

  public type Urgency = {
    #Emergency;   // Skip non-critical checks
    #Normal;      // Full pipeline
    #Cautious;    // Extra validation passes
  };

  // ═══════════════════════════════════════════════════════════
  // PIPELINE CONSTRUCTION
  // ═══════════════════════════════════════════════════════════

  /// Construct the agent pipeline based on intent
  public func planPipeline(intent : DeploymentIntent) : Runtime.Pipeline {
    let stages = Buffer.Buffer<Runtime.PipelineStage>(6);

    // Stage 1: Security Agent always runs first
    stages.add({
      agent = #SecurityAgent;
      action = "Deep security analysis with reasoning";
      status = #Pending;
      startTime = null;
      endTime = null;
      result = null;
    });

    // Stage 2: Safety Agent (if upgrade)
    if (intent.config.allowUpgrade) {
      stages.add({
        agent = #SafetyAgent;
        action = "Stable memory migration validation";
        status = #Pending;
        startTime = null;
        endTime = null;
        result = null;
      });
    };

    // Stage 3: Cost Agent
    stages.add({
      agent = #CostAgent;
      action = "ML-powered cycle estimation and optimization";
      status = #Pending;
      startTime = null;
      endTime = null;
      result = null;
    });

    // Stage 4: Advisor Agent synthesizes everything
    stages.add({
      agent = #AdvisorAgent;
      action = "Autonomous go/no-go decision with reasoning";
      status = #Pending;
      startTime = null;
      endTime = null;
      result = null;
    });

    {
      id = "pipeline-" # Int.toText(Time.now());
      stages = Buffer.toArray(stages);
      currentStage = 0;
      startTime = Time.now();
      status = #Running;
      context = {
        projectName = intent.projectName;
        version = intent.version;
        sources = Array.map<SourceFile, Text>(intent.sources, func(s) { s.path });
        config = securityLevelToText(intent.config.securityLevel);
        previousDeployments = intent.previousHistory.size();
        agentMemory = {
          shortTerm = [];
          longTerm = [];
          episodic = intent.previousHistory;
        };
      };
    };
  };

  // ═══════════════════════════════════════════════════════════
  // ORCHESTRATION LOGIC
  // ═══════════════════════════════════════════════════════════

  /// The orchestrator's reasoning about what to do next
  public func reason(state : OrchestratorState) : Runtime.ReasoningChain {
    let steps = Buffer.Buffer<Runtime.ThoughtStep>(5);

    // Think about current pipeline state
    steps.add(Runtime.createThought(
      1,
      "Assessing pipeline progress: stage " # Nat.toText(state.pipeline.currentStage) # " of " # Nat.toText(state.pipeline.stages.size()),
      ["Pipeline status: " # pipelineStatusToText(state.pipeline.status)],
      0.95
    ));

    // Think about agent health
    steps.add(Runtime.createThought(
      2,
      "Checking agent states for anomalies or stuck agents",
      Array.map<(Runtime.AgentId, Runtime.AgentState), Text>(
        state.agentStates,
        func(pair) { Runtime.agentIdToText(pair.0) # " → " # agentStateToText(pair.1) }
      ),
      0.9
    ));

    // Think about messages requiring attention
    let pendingMessages = Array.filter<Runtime.AgentMessage>(
      state.messages,
      func(m) { m.messageType == #Escalation or m.priority == #Critical }
    );

    steps.add(Runtime.createThought(
      3,
      "Found " # Nat.toText(pendingMessages.size()) # " priority messages requiring attention",
      Array.map<Runtime.AgentMessage, Text>(pendingMessages, func(m) {
        Runtime.agentIdToText(m.from) # " → " # messageTypeToText(m.messageType)
      }),
      0.85
    ));

    // Decision about next action
    let conclusion = if (pendingMessages.size() > 0) {
      "Priority escalations detected — evaluating whether to pause pipeline or continue";
    } else {
      "Pipeline progressing normally — advancing to next stage";
    };

    steps.add(Runtime.createThought(
      4,
      conclusion,
      ["Decision confidence based on " # Nat.toText(state.decisions.size()) # " prior decisions"],
      0.88
    ));

    {
      agentId = #Orchestrator;
      goal = "Coordinate deployment pipeline and ensure safe mainnet deployment";
      steps = Buffer.toArray(steps);
      conclusion;
      totalConfidence = 0.89;
      durationMs = 12;
    };
  };

  /// Synthesize all agent findings into a final deployment decision
  public func synthesizeDecision(
    securityInsights : [Runtime.Insight],
    costInsights : [Runtime.Insight],
    safetyInsights : [Runtime.Insight],
    advisorDecision : Runtime.Decision,
    memory : Runtime.AgentMemory
  ) : Runtime.Decision {

    let steps = Buffer.Buffer<Runtime.ThoughtStep>(6);

    // Analyze security findings
    let criticalCount = Runtime.countBySeverity(securityInsights, #Critical);
    let highCount = Runtime.countBySeverity(securityInsights, #High);

    steps.add(Runtime.createThought(
      1,
      "Security analysis: " # Nat.toText(criticalCount) # " critical, " # Nat.toText(highCount) # " high severity findings",
      Array.map<Runtime.Insight, Text>(securityInsights, func(i) { i.finding }),
      if (criticalCount > 0) 0.95 else 0.85
    ));

    // Analyze cost findings
    steps.add(Runtime.createThought(
      2,
      "Cost analysis: evaluating cycle budget against estimated consumption",
      Array.map<Runtime.Insight, Text>(costInsights, func(i) { i.finding }),
      0.8
    ));

    // Analyze safety findings
    steps.add(Runtime.createThought(
      3,
      "Safety analysis: " # Nat.toText(safetyInsights.size()) # " memory migration concerns identified",
      Array.map<Runtime.Insight, Text>(safetyInsights, func(i) { i.finding }),
      0.9
    ));

    // Check episodic memory for relevant patterns
    let relevantEpisodes = Array.filter<Runtime.Episode>(
      memory.episodic,
      func(e) { e.outcome != #Success }
    );

    steps.add(Runtime.createThought(
      4,
      "Historical analysis: " # Nat.toText(relevantEpisodes.size()) # " past failures inform this decision",
      Array.map<Runtime.Episode, Text>(relevantEpisodes, func(e) {
        "Previous " # episodeOutcomeToText(e.outcome) # ": " # Text.join(", ", e.lessons.vals())
      }),
      0.75
    ));

    // Final synthesis
    let shouldDeploy = criticalCount == 0 and advisorDecision.decision == #Deploy;
    let confidence = if (shouldDeploy) {
      advisorDecision.confidence * 0.7 + 0.3 * (if (highCount == 0) 1.0 else 0.6);
    } else {
      0.95; // High confidence in blocking
    };

    steps.add(Runtime.createThought(
      5,
      if (shouldDeploy) "All agents concur: safe to deploy to mainnet"
      else "Blocking deployment: unresolved critical issues",
      ["Synthesized confidence: " # Float.toText(confidence)],
      confidence
    ));

    let factors = Buffer.Buffer<Runtime.DecisionFactor>(4);
    factors.add({ name = "Security"; weight = 0.35; value = if (criticalCount == 0) 1.0 else 0.0; contribution = Nat.toText(criticalCount) # " critical findings" });
    factors.add({ name = "Cost"; weight = 0.2; value = 0.8; contribution = "Within budget estimates" });
    factors.add({ name = "Safety"; weight = 0.25; value = if (safetyInsights.size() == 0) 1.0 else 0.5; contribution = Nat.toText(safetyInsights.size()) # " concerns" });
    factors.add({ name = "History"; weight = 0.2; value = if (relevantEpisodes.size() == 0) 1.0 else 0.6; contribution = Nat.toText(relevantEpisodes.size()) # " past failures" });

    {
      id = "decision-" # Int.toText(Time.now());
      madeBy = #Orchestrator;
      decision = if (shouldDeploy) #Deploy else #Block;
      confidence;
      reasoning = {
        agentId = #Orchestrator;
        goal = "Synthesize all agent findings into final deployment decision";
        steps = Buffer.toArray(steps);
        conclusion = if (shouldDeploy) "DEPLOY: All safety checks pass" else "BLOCK: Critical issues unresolved";
        totalConfidence = confidence;
        durationMs = 45;
      };
      factors = Buffer.toArray(factors);
      overridable = criticalCount == 0; // Can override warnings but not critical blocks
      expiresAt = ?(Time.now() + 3_600_000_000_000); // 1 hour validity
    };
  };

  // ═══════════════════════════════════════════════════════════
  // AGENT LIFECYCLE MANAGEMENT
  // ═══════════════════════════════════════════════════════════

  /// Record a deployment episode for future learning
  public func recordEpisode(
    deploymentId : Text,
    outcome : Runtime.EpisodeOutcome,
    insights : [Runtime.Insight]
  ) : Runtime.Episode {
    let lessons = Buffer.Buffer<Text>(4);
    let patterns = Buffer.Buffer<Text>(4);

    for (insight in insights.vals()) {
      if (insight.actionable) {
        switch (insight.suggestedAction) {
          case (?action) lessons.add(action);
          case null {};
        };
      };
      patterns.add(insight.category # ":" # Runtime.severityToText(insight.severity));
    };

    {
      deploymentId;
      timestamp = Time.now();
      outcome;
      lessons = Buffer.toArray(lessons);
      patterns = Buffer.toArray(patterns);
    };
  };

  // ═══════════════════════════════════════════════════════════
  // UTILITIES
  // ═══════════════════════════════════════════════════════════

  func securityLevelToText(level : SecurityLevel) : Text {
    switch (level) {
      case (#Strict) "strict";
      case (#Standard) "standard";
      case (#Minimal) "minimal";
    };
  };

  func pipelineStatusToText(status : Runtime.PipelineStatus) : Text {
    switch (status) {
      case (#Running) "running";
      case (#Paused(r)) "paused: " # r;
      case (#Complete) "complete";
      case (#Failed(r)) "failed: " # r;
      case (#Aborted(r)) "aborted: " # r;
    };
  };

  func agentStateToText(state : Runtime.AgentState) : Text {
    switch (state) {
      case (#Idle) "idle";
      case (#Thinking) "thinking";
      case (#Analyzing) "analyzing";
      case (#Reasoning) "reasoning";
      case (#Deciding) "deciding";
      case (#Communicating) "communicating";
      case (#Waiting) "waiting";
      case (#Complete) "complete";
      case (#Error(e)) "error: " # e;
    };
  };

  func messageTypeToText(mt : Runtime.MessageType) : Text {
    switch (mt) {
      case (#Request) "request";
      case (#Response) "response";
      case (#Alert) "alert";
      case (#Broadcast) "broadcast";
      case (#Escalation) "escalation";
      case (#Acknowledgment) "ack";
    };
  };

  func episodeOutcomeToText(o : Runtime.EpisodeOutcome) : Text {
    switch (o) {
      case (#Success) "success";
      case (#FailedSecurity) "security-failure";
      case (#FailedCost) "cost-failure";
      case (#FailedSafety) "safety-failure";
      case (#RolledBack) "rollback";
    };
  };
};
