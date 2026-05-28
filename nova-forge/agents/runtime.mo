/// Nova Forge Agent Runtime
/// Core framework for autonomous AI agents that reason, collaborate, and act
///
/// Architecture:
/// - Each agent operates as an autonomous reasoning entity
/// - Agents communicate through structured messages
/// - The runtime manages lifecycle, memory, and inter-agent coordination
/// - All decisions include chain-of-thought reasoning traces

import Buffer "mo:base/Buffer";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Int "mo:base/Int";

module {

  // ═══════════════════════════════════════════════════════════
  // AGENT IDENTITY & CAPABILITIES
  // ═══════════════════════════════════════════════════════════

  public type AgentId = {
    #SecurityAgent;
    #CostAgent;
    #SafetyAgent;
    #AdvisorAgent;
    #Orchestrator;
  };

  public type AgentCapability = {
    #CodeAnalysis;
    #CostPrediction;
    #MemoryValidation;
    #DecisionMaking;
    #PatternRecognition;
    #RiskAssessment;
    #Optimization;
    #Communication;
  };

  public type AgentState = {
    #Idle;
    #Thinking;
    #Analyzing;
    #Reasoning;
    #Deciding;
    #Communicating;
    #Waiting;
    #Complete;
    #Error : Text;
  };

  // ═══════════════════════════════════════════════════════════
  // REASONING ENGINE
  // ═══════════════════════════════════════════════════════════

  public type ThoughtStep = {
    step : Nat;
    thought : Text;
    evidence : [Text];
    confidence : Float;
    timestamp : Int;
  };

  public type ReasoningChain = {
    agentId : AgentId;
    goal : Text;
    steps : [ThoughtStep];
    conclusion : Text;
    totalConfidence : Float;
    durationMs : Nat;
  };

  public type Insight = {
    source : AgentId;
    category : Text;
    finding : Text;
    severity : InsightSeverity;
    confidence : Float;
    reasoning : ReasoningChain;
    actionable : Bool;
    suggestedAction : ?Text;
  };

  public type InsightSeverity = {
    #Critical;
    #High;
    #Medium;
    #Low;
    #Info;
  };

  // ═══════════════════════════════════════════════════════════
  // INTER-AGENT COMMUNICATION
  // ═══════════════════════════════════════════════════════════

  public type AgentMessage = {
    from : AgentId;
    to : AgentId;
    messageType : MessageType;
    payload : MessagePayload;
    timestamp : Int;
    correlationId : Text;
    priority : MessagePriority;
  };

  public type MessageType = {
    #Request;
    #Response;
    #Alert;
    #Broadcast;
    #Escalation;
    #Acknowledgment;
  };

  public type MessagePriority = {
    #Critical;
    #High;
    #Normal;
    #Low;
  };

  public type MessagePayload = {
    #AnalysisRequest : { source : Text; context : Text };
    #AnalysisResult : { insights : [Insight]; summary : Text };
    #CostEstimate : { cycles : Nat; breakdown : [(Text, Nat)]; optimizations : [Text] };
    #SafetyCheck : { safe : Bool; concerns : [Text]; migrations : [Text] };
    #Decision : { go : Bool; confidence : Float; reasoning : Text; conditions : [Text] };
    #Escalation : { reason : Text; severity : InsightSeverity; context : Text };
    #Context : { key : Text; value : Text };
  };

  // ═══════════════════════════════════════════════════════════
  // AGENT MEMORY (Short-term + Long-term)
  // ═══════════════════════════════════════════════════════════

  public type AgentMemory = {
    shortTerm : [MemoryEntry];   // Current session context
    longTerm : [MemoryEntry];    // Persisted across deployments
    episodic : [Episode];        // Past deployment experiences
  };

  public type MemoryEntry = {
    key : Text;
    value : Text;
    source : AgentId;
    timestamp : Int;
    relevance : Float;        // Decays over time
    accessCount : Nat;
  };

  public type Episode = {
    deploymentId : Text;
    timestamp : Int;
    outcome : EpisodeOutcome;
    lessons : [Text];
    patterns : [Text];
  };

  public type EpisodeOutcome = {
    #Success;
    #FailedSecurity;
    #FailedCost;
    #FailedSafety;
    #RolledBack;
  };

  // ═══════════════════════════════════════════════════════════
  // AGENT PIPELINE & ORCHESTRATION
  // ═══════════════════════════════════════════════════════════

  public type PipelineStage = {
    agent : AgentId;
    action : Text;
    status : StageStatus;
    startTime : ?Int;
    endTime : ?Int;
    result : ?StageResult;
  };

  public type StageStatus = {
    #Pending;
    #Running;
    #Complete;
    #Failed : Text;
    #Skipped : Text;
  };

  public type StageResult = {
    insights : [Insight];
    messages : [AgentMessage];
    reasoning : ReasoningChain;
    nextActions : [Text];
  };

  public type Pipeline = {
    id : Text;
    stages : [PipelineStage];
    currentStage : Nat;
    startTime : Int;
    status : PipelineStatus;
    context : PipelineContext;
  };

  public type PipelineStatus = {
    #Running;
    #Paused : Text;
    #Complete;
    #Failed : Text;
    #Aborted : Text;
  };

  public type PipelineContext = {
    projectName : Text;
    version : Text;
    sources : [Text];
    config : Text;
    previousDeployments : Nat;
    agentMemory : AgentMemory;
  };

  // ═══════════════════════════════════════════════════════════
  // DECISION FRAMEWORK
  // ═══════════════════════════════════════════════════════════

  public type Decision = {
    id : Text;
    madeBy : AgentId;
    decision : DecisionType;
    confidence : Float;
    reasoning : ReasoningChain;
    factors : [DecisionFactor];
    overridable : Bool;
    expiresAt : ?Int;
  };

  public type DecisionType = {
    #Deploy;
    #Block;
    #Warn;
    #RequestHumanInput;
    #Retry;
    #Rollback;
    #Optimize;
  };

  public type DecisionFactor = {
    name : Text;
    weight : Float;
    value : Float;
    contribution : Text;
  };

  // ═══════════════════════════════════════════════════════════
  // RUNTIME UTILITIES
  // ═══════════════════════════════════════════════════════════

  public func agentIdToText(id : AgentId) : Text {
    switch (id) {
      case (#SecurityAgent) "🛡️ SecurityAgent";
      case (#CostAgent) "💰 CostAgent";
      case (#SafetyAgent) "✅ SafetyAgent";
      case (#AdvisorAgent) "🎯 AdvisorAgent";
      case (#Orchestrator) "🧠 Orchestrator";
    };
  };

  public func severityToText(s : InsightSeverity) : Text {
    switch (s) {
      case (#Critical) "🚨 CRITICAL";
      case (#High) "🔴 HIGH";
      case (#Medium) "🟡 MEDIUM";
      case (#Low) "🔵 LOW";
      case (#Info) "ℹ️ INFO";
    };
  };

  public func severityWeight(s : InsightSeverity) : Float {
    switch (s) {
      case (#Critical) 1.0;
      case (#High) 0.8;
      case (#Medium) 0.5;
      case (#Low) 0.2;
      case (#Info) 0.05;
    };
  };

  public func createThought(step : Nat, thought : Text, evidence : [Text], confidence : Float) : ThoughtStep {
    {
      step;
      thought;
      evidence;
      confidence;
      timestamp = Time.now();
    };
  };

  public func createInsight(
    source : AgentId,
    category : Text,
    finding : Text,
    severity : InsightSeverity,
    confidence : Float,
    reasoning : ReasoningChain,
    action : ?Text
  ) : Insight {
    {
      source;
      category;
      finding;
      severity;
      confidence;
      reasoning;
      actionable = action != null;
      suggestedAction = action;
    };
  };

  public func createMessage(
    from : AgentId,
    to : AgentId,
    msgType : MessageType,
    payload : MessagePayload,
    priority : MessagePriority
  ) : AgentMessage {
    {
      from;
      to;
      messageType = msgType;
      payload;
      timestamp = Time.now();
      correlationId = Int.toText(Time.now());
      priority;
    };
  };

  /// Calculate overall confidence from a reasoning chain
  public func chainConfidence(chain : ReasoningChain) : Float {
    if (chain.steps.size() == 0) return 0.0;
    var total : Float = 0.0;
    for (step in chain.steps.vals()) {
      total += step.confidence;
    };
    total / Float.fromInt(chain.steps.size());
  };

  /// Determine if insights contain any blockers
  public func hasBlockers(insights : [Insight]) : Bool {
    for (insight in insights.vals()) {
      switch (insight.severity) {
        case (#Critical) return true;
        case (_) {};
      };
    };
    false;
  };

  /// Count insights by severity
  public func countBySeverity(insights : [Insight], target : InsightSeverity) : Nat {
    var count = 0;
    for (insight in insights.vals()) {
      if (insight.severity == target) count += 1;
    };
    count;
  };
};
