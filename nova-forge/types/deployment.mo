/// Nova Forge - Deployment Types
/// Types for tracking deployment history and notifications
/// Phase 3-4: Enhanced UX & EduAI Integration

import Principal "mo:core/Principal";
import Time "mo:core/Time";

module {
  // ═══════════════════════════════════════════════════════════════
  // DEPLOYMENT HISTORY TYPES
  // ═══════════════════════════════════════════════════════════════

  /// Unique deployment ID
  public type DeploymentId = Text;

  /// Deployment event type
  public type DeploymentEvent = {
    #started;
    #building;
    #scanning;
    #estimating;
    #deploying;
    #completed;
    #failed : Text;
    #rollback;
  };

  /// Full deployment record with history
  public type DeploymentRecord = {
    id : DeploymentId;
    project : Text;
    version : Text;
    initiatedBy : Principal;
    network : Text;  // Always "ic" for mainnet
    startedAt : Time.Time;
    completedAt : ?Time.Time;
    status : DeploymentStatus;
    events : [DeploymentEventLog];
    canisters : [CanisterDeployment];
    scanReport : ?ScanReportSummary;
    cycleEstimate : ?CycleEstimateSummary;
    webhooksSent : [WebhookLog];
  };

  /// Deployment status
  public type DeploymentStatus = {
    #pending;
    #inProgress;
    #success;
    #failed : Text;
    #cancelled;
  };

  /// Individual event log entry
  public type DeploymentEventLog = {
    event : DeploymentEvent;
    timestamp : Time.Time;
    message : ?Text;
    metadata : ?Text;  // JSON metadata
  };

  /// Canister deployment info
  public type CanisterDeployment = {
    name : Text;
    canisterId : ?Principal;
    mode : DeployMode;
    cyclesUsed : Nat;
    moduleHash : ?Text;
    wasmSize : Nat;
  };

  /// Deployment mode
  public type DeployMode = {
    #install;
    #upgrade;
    #reinstall;
  };

  /// Compact scan report summary
  public type ScanReportSummary = {
    passed : Bool;
    errorCount : Nat;
    warningCount : Nat;
    securityLevel : Text;
    topIssues : [Text];
  };

  /// Compact cycle estimate summary
  public type CycleEstimateSummary = {
    installation : Nat;
    monthly : Nat;
    recommended : Nat;
    confidence : Float;
  };

  // ═══════════════════════════════════════════════════════════════
  // WEBHOOK TYPES
  // ═══════════════════════════════════════════════════════════════

  /// Webhook configuration
  public type WebhookConfig = {
    url : Text;
    secret : ?Text;  // For HMAC signing
    events : [WebhookEventType];
    enabled : Bool;
  };

  /// Events that can trigger webhooks
  public type WebhookEventType = {
    #deploymentStarted;
    #deploymentCompleted;
    #deploymentFailed;
    #scanCompleted;
    #cycleWarning;
    #all;
  };

  /// Webhook payload
  public type WebhookPayload = {
    eventType : WebhookEventType;
    timestamp : Time.Time;
    deploymentId : DeploymentId;
    project : Text;
    version : Text;
    status : DeploymentStatus;
    message : Text;
    metadata : ?Text;  // JSON additional data
  };

  /// Webhook delivery log
  public type WebhookLog = {
    timestamp : Time.Time;
    eventType : WebhookEventType;
    url : Text;
    status : WebhookDeliveryStatus;
    responseCode : ?Nat;
    error : ?Text;
  };

  /// Webhook delivery status
  public type WebhookDeliveryStatus = {
    #pending;
    #delivered;
    #failed;
    #retrying : Nat;  // retry count
  };

  // ═══════════════════════════════════════════════════════════════
  // DASHBOARD VIEW TYPES
  // ═══════════════════════════════════════════════════════════════

  /// Dashboard summary for UI
  public type DashboardSummary = {
    totalDeployments : Nat;
    successfulDeployments : Nat;
    failedDeployments : Nat;
    averageDeployTime : Nat;  // in seconds
    totalCyclesUsed : Nat;
    lastDeployment : ?DeploymentRecord;
    recentDeployments : [DeploymentRecord];
    canisterHealth : [CanisterHealthStatus];
  };

  /// Canister health for dashboard
  public type CanisterHealthStatus = {
    name : Text;
    canisterId : Principal;
    status : CanisterRunStatus;
    cyclesBalance : Nat;
    memoryUsed : Nat;
    lastUpdated : Time.Time;
    cyclesBurnRate : Nat;  // cycles per day estimate
    daysUntilEmpty : ?Nat;
  };

  /// Canister runtime status
  public type CanisterRunStatus = {
    #running;
    #stopping;
    #stopped;
    #unknown;
  };

  /// Deployment filter for queries
  public type DeploymentFilter = {
    status : ?DeploymentStatus;
    project : ?Text;
    startDate : ?Time.Time;
    endDate : ?Time.Time;
    limit : Nat;
    offset : Nat;
  };

  /// Paginated deployment list
  public type DeploymentListResult = {
    deployments : [DeploymentRecord];
    total : Nat;
    hasMore : Bool;
  };

  // ═══════════════════════════════════════════════════════════════
  // SELF-DEPLOY TYPES (Phase 4)
  // ═══════════════════════════════════════════════════════════════

  /// Self-deploy request from platform
  public type SelfDeployRequest = {
    version : Text;
    buildArgs : ?[Text];
    skipScan : Bool;
    skipEstimate : Bool;
    confirmOverride : Bool;
  };

  /// Self-deploy authorization
  public type SelfDeployAuth = {
    requiredApprovals : Nat;
    currentApprovals : [Principal];
    expiresAt : Time.Time;
    requestedBy : Principal;
  };

  /// Self-deploy result
  public type SelfDeployResult = {
    #queued : DeploymentId;
    #needsApproval : SelfDeployAuth;
    #rejected : Text;
    #inProgress : DeploymentId;
  };
};
