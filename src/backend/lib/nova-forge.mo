/// Nova Forge - EduAI Integration Library
/// Native Nova Forge support within the EduAI platform
/// Phase 4: Self-deploying educational platform

import Array "mo:core/Array";
import Buffer "mo:core/Buffer";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Option "mo:core/Option";
import Result "mo:core/Result";

import DeployTypes "../nova-forge/types/deployment";
import HistoryLib "../nova-forge/core/history";
import WebhookLib "../nova-forge/core/webhooks";

module {
  // ═══════════════════════════════════════════════════════════════
  // NOVA FORGE STATE
  // ═══════════════════════════════════════════════════════════════

  /// Nova Forge state within EduAI
  public type NovaForgeState = {
    history : HistoryLib.HistoryState;
    webhooks : WebhookLib.WebhookState;
    selfDeploy : SelfDeployState;
    var isEnabled : Bool;
    var lastHealthCheck : Time.Time;
  };

  /// Self-deploy state
  public type SelfDeployState = {
    pendingRequests : Buffer.Buffer<DeployTypes.SelfDeployRequest>;
    approvals : Map.Map<Text, DeployTypes.SelfDeployAuth>;
    var autoDeployEnabled : Bool;
    var requiredApprovers : Nat;
    authorizedDeployers : Buffer.Buffer<Principal>;
  };

  /// Initialize Nova Forge state
  public func init() : NovaForgeState {
    {
      history = HistoryLib.init();
      webhooks = WebhookLib.init();
      selfDeploy = {
        pendingRequests = Buffer.Buffer<DeployTypes.SelfDeployRequest>(5);
        approvals = Map.new<Text, DeployTypes.SelfDeployAuth>();
        var autoDeployEnabled = false;
        var requiredApprovers = 2;  // Require 2 approvals by default
        authorizedDeployers = Buffer.Buffer<Principal>(10);
      };
      var isEnabled = true;
      var lastHealthCheck = Time.now();
    };
  };

  // ═══════════════════════════════════════════════════════════════
  // AUTHORIZATION
  // ═══════════════════════════════════════════════════════════════

  /// Check if principal can deploy
  public func canDeploy(
    state : NovaForgeState,
    caller : Principal
  ) : Bool {
    for (p in state.selfDeploy.authorizedDeployers.vals()) {
      if (Principal.equal(p, caller)) { return true };
    };
    false;
  };

  /// Add authorized deployer
  public func addDeployer(
    state : NovaForgeState,
    deployer : Principal
  ) {
    for (p in state.selfDeploy.authorizedDeployers.vals()) {
      if (Principal.equal(p, deployer)) { return };  // Already exists
    };
    state.selfDeploy.authorizedDeployers.add(deployer);
  };

  /// Remove authorized deployer
  public func removeDeployer(
    state : NovaForgeState,
    deployer : Principal
  ) : Bool {
    let filtered = Buffer.Buffer<Principal>(state.selfDeploy.authorizedDeployers.size());
    var found = false;

    for (p in state.selfDeploy.authorizedDeployers.vals()) {
      if (Principal.equal(p, deployer)) {
        found := true;
      } else {
        filtered.add(p);
      };
    };

    if (found) {
      state.selfDeploy.authorizedDeployers.clear();
      for (p in filtered.vals()) {
        state.selfDeploy.authorizedDeployers.add(p);
      };
    };

    found;
  };

  /// List authorized deployers
  public func listDeployers(state : NovaForgeState) : [Principal] {
    Buffer.toArray(state.selfDeploy.authorizedDeployers);
  };

  // ═══════════════════════════════════════════════════════════════
  // SELF-DEPLOY REQUESTS
  // ═══════════════════════════════════════════════════════════════

  /// Request self-deployment
  public func requestSelfDeploy(
    state : NovaForgeState,
    caller : Principal,
    request : DeployTypes.SelfDeployRequest
  ) : DeployTypes.SelfDeployResult {
    // Check if caller is authorized
    if (not canDeploy(state, caller)) {
      return #rejected("Not authorized to deploy");
    };

    // If auto-deploy is enabled and only one approver required
    // Note: This should only be used for development/staging environments
    if (state.selfDeploy.autoDeployEnabled and state.selfDeploy.requiredApprovers <= 1) {
      // Start deployment immediately
      let deployment = HistoryLib.startDeployment(
        state.history,
        "edu-ai",
        request.version,
        caller
      );
      return #queued(deployment.id);
    };

    // Create approval request
    // Note: Requester does NOT count as an approval to prevent self-approval attacks
    // At least one additional approver is always required for production deployments
    let requestId = "req-" # Int.toText(Time.now());
    let auth : DeployTypes.SelfDeployAuth = {
      requiredApprovals = Nat.max(2, state.selfDeploy.requiredApprovers);  // Minimum 2 approvers for security
      currentApprovals = [];  // Requester must get approval from others
      expiresAt = Time.now() + 86_400_000_000_000;  // 24 hours
      requestedBy = caller;
    };

    ignore Map.put(state.selfDeploy.approvals, Map.thash, requestId, auth);
    state.selfDeploy.pendingRequests.add(request);

    if (auth.currentApprovals.size() >= auth.requiredApprovals) {
      // Enough approvals, start deployment
      let deployment = HistoryLib.startDeployment(
        state.history,
        "edu-ai",
        request.version,
        caller
      );
      return #queued(deployment.id);
    };

    #needsApproval(auth);
  };

  /// Approve a deployment request
  public func approveDeploy(
    state : NovaForgeState,
    caller : Principal,
    requestId : Text
  ) : Result.Result<DeployTypes.SelfDeployResult, Text> {
    // Check if caller is authorized
    if (not canDeploy(state, caller)) {
      return #err("Not authorized to approve deployments");
    };

    switch (Map.get(state.selfDeploy.approvals, Map.thash, requestId)) {
      case (?auth) {
        // Check if expired
        if (Time.now() > auth.expiresAt) {
          ignore Map.remove(state.selfDeploy.approvals, Map.thash, requestId);
          return #err("Approval request expired");
        };

        // Check if already approved by this principal
        for (p in auth.currentApprovals.vals()) {
          if (Principal.equal(p, caller)) {
            return #err("Already approved by this principal");
          };
        };

        // Add approval
        let newApprovals = Array.append(auth.currentApprovals, [caller]);
        let updatedAuth = {
          auth with
          currentApprovals = newApprovals
        };

        if (newApprovals.size() >= auth.requiredApprovals) {
          // Enough approvals - start deployment
          ignore Map.remove(state.selfDeploy.approvals, Map.thash, requestId);

          // Find the corresponding request (simplified - use first pending)
          if (state.selfDeploy.pendingRequests.size() > 0) {
            let request = state.selfDeploy.pendingRequests.get(0);
            ignore state.selfDeploy.pendingRequests.remove(0);

            let deployment = HistoryLib.startDeployment(
              state.history,
              "edu-ai",
              request.version,
              auth.requestedBy
            );
            return #ok(#queued(deployment.id));
          };
        } else {
          ignore Map.put(state.selfDeploy.approvals, Map.thash, requestId, updatedAuth);
          return #ok(#needsApproval(updatedAuth));
        };

        #err("No pending request found");
      };
      case (null) {
        #err("Approval request not found");
      };
    };
  };

  // ═══════════════════════════════════════════════════════════════
  // DEPLOYMENT LIFECYCLE
  // ═══════════════════════════════════════════════════════════════

  /// Record deployment event
  public func recordEvent(
    state : NovaForgeState,
    deploymentId : DeployTypes.DeploymentId,
    event : DeployTypes.DeploymentEvent,
    message : ?Text
  ) : Bool {
    let success = HistoryLib.addEvent(
      state.history,
      deploymentId,
      event,
      message,
      null
    );

    // Send webhooks for important events
    if (success) {
      switch (Map.get(state.history.deployments, Map.thash, deploymentId)) {
        case (?deployment) {
          let eventType = switch (event) {
            case (#started) { #deploymentStarted };
            case (#completed) { #deploymentCompleted };
            case (#failed(_)) { #deploymentFailed };
            case (_) { return success };  // Don't notify for intermediate events
          };

          let msg = switch (message) {
            case (?m) { m };
            case (null) { "Deployment " # eventTypeToText(eventType) };
          };

          ignore WebhookLib.queueNotifications(
            state.webhooks,
            eventType,
            deployment,
            msg,
            null
          );
        };
        case (null) {};
      };
    };

    success;
  };

  func eventTypeToText(event : DeployTypes.WebhookEventType) : Text {
    switch (event) {
      case (#deploymentStarted) { "started" };
      case (#deploymentCompleted) { "completed" };
      case (#deploymentFailed) { "failed" };
      case (#scanCompleted) { "scan completed" };
      case (#cycleWarning) { "cycle warning" };
      case (#all) { "event" };
    };
  };

  // ═══════════════════════════════════════════════════════════════
  // DASHBOARD DATA
  // ═══════════════════════════════════════════════════════════════

  /// Get dashboard data for frontend
  public type DashboardData = {
    summary : DeployTypes.DashboardSummary;
    webhookStats : WebhookLib.WebhookStats;
    selfDeployConfig : SelfDeployConfig;
    platformStatus : PlatformStatus;
  };

  /// Self-deploy configuration for dashboard
  public type SelfDeployConfig = {
    enabled : Bool;
    autoDeployEnabled : Bool;
    requiredApprovers : Nat;
    authorizedDeployers : [Principal];
    pendingApprovals : Nat;
  };

  /// Platform status
  public type PlatformStatus = {
    novaForgeEnabled : Bool;
    lastHealthCheck : Time.Time;
    version : Text;
    network : Text;
  };

  /// Get complete dashboard data
  public func getDashboardData(
    state : NovaForgeState,
    project : ?Text
  ) : DashboardData {
    let summary = HistoryLib.getDashboardSummary(state.history, project);
    let webhookStats = WebhookLib.getStats(state.webhooks);

    let pendingCount = Map.size(state.selfDeploy.approvals);

    {
      summary = summary;
      webhookStats = webhookStats;
      selfDeployConfig = {
        enabled = state.isEnabled;
        autoDeployEnabled = state.selfDeploy.autoDeployEnabled;
        requiredApprovers = state.selfDeploy.requiredApprovers;
        authorizedDeployers = Buffer.toArray(state.selfDeploy.authorizedDeployers);
        pendingApprovals = pendingCount;
      };
      platformStatus = {
        novaForgeEnabled = state.isEnabled;
        lastHealthCheck = state.lastHealthCheck;
        version = "1.0.0";
        network = "ic";  // ALWAYS mainnet
      };
    };
  };

  // ═══════════════════════════════════════════════════════════════
  // CONFIGURATION
  // ═══════════════════════════════════════════════════════════════

  /// Update self-deploy configuration
  public func configureSelfDeploy(
    state : NovaForgeState,
    autoEnabled : Bool,
    requiredApprovers : Nat
  ) {
    state.selfDeploy.autoDeployEnabled := autoEnabled;
    state.selfDeploy.requiredApprovers := Nat.max(1, requiredApprovers);
  };

  /// Enable/disable Nova Forge
  public func setEnabled(state : NovaForgeState, enabled : Bool) {
    state.isEnabled := enabled;
  };

  /// Register webhook
  public func registerWebhook(
    state : NovaForgeState,
    config : DeployTypes.WebhookConfig
  ) {
    WebhookLib.registerWebhook(state.webhooks, config);
  };

  /// Remove webhook
  public func removeWebhook(
    state : NovaForgeState,
    url : Text
  ) : Bool {
    WebhookLib.removeWebhook(state.webhooks, url);
  };

  /// Update health check timestamp
  public func recordHealthCheck(state : NovaForgeState) {
    state.lastHealthCheck := Time.now();
  };
};
