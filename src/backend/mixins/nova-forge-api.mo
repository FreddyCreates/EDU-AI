/// Nova Forge API Mixin
/// Exposes Nova Forge functionality to the EduAI platform
/// Phase 4: Native Nova Forge support in EduAI

import Principal "mo:core/Principal";
import Result "mo:core/Result";
import Time "mo:core/Time";
import Array "mo:core/Array";

import NovaForgeLib "../lib/nova-forge";
import DeployTypes "../nova-forge/types/deployment";
import HistoryLib "../nova-forge/core/history";
import WebhookLib "../nova-forge/core/webhooks";

module {
  /// Nova Forge API endpoints
  public type NovaForgeAPI = {
    // Dashboard
    getDashboard : shared query () -> async NovaForgeLib.DashboardData;
    getDeploymentHistory : shared query (DeployTypes.DeploymentFilter) -> async DeployTypes.DeploymentListResult;
    getDeployment : shared query (DeployTypes.DeploymentId) -> async ?DeployTypes.DeploymentRecord;

    // Self-deploy
    requestDeploy : shared (DeployTypes.SelfDeployRequest) -> async DeployTypes.SelfDeployResult;
    approveDeploy : shared (Text) -> async Result.Result<DeployTypes.SelfDeployResult, Text>;
    getPendingApprovals : shared query () -> async [PendingApproval];

    // Configuration (admin only)
    addDeployer : shared (Principal) -> async Bool;
    removeDeployer : shared (Principal) -> async Bool;
    listDeployers : shared query () -> async [Principal];
    configureSelfDeploy : shared (Bool, Nat) -> async ();
    setNovaForgeEnabled : shared (Bool) -> async ();

    // Webhooks
    registerWebhook : shared (DeployTypes.WebhookConfig) -> async ();
    removeWebhook : shared (Text) -> async Bool;
    listWebhooks : shared query () -> async [DeployTypes.WebhookConfig];

    // Health
    novaForgeHealthCheck : shared () -> async HealthCheckResult;
  };

  /// Pending approval info for UI
  public type PendingApproval = {
    requestId : Text;
    version : Text;
    requestedBy : Principal;
    currentApprovals : Nat;
    requiredApprovals : Nat;
    expiresAt : Time.Time;
  };

  /// Health check result
  public type HealthCheckResult = {
    healthy : Bool;
    timestamp : Time.Time;
    details : {
      historyOk : Bool;
      webhooksOk : Bool;
      selfDeployOk : Bool;
    };
  };

  /// Create Nova Forge API implementation
  public func createAPI(
    state : NovaForgeLib.NovaForgeState,
    isAdmin : (Principal) -> Bool
  ) : {
    // Dashboard queries
    getDashboard : () -> NovaForgeLib.DashboardData;
    getDeploymentHistory : (DeployTypes.DeploymentFilter) -> DeployTypes.DeploymentListResult;
    getDeployment : (DeployTypes.DeploymentId) -> ?DeployTypes.DeploymentRecord;

    // Self-deploy actions
    requestDeploy : (Principal, DeployTypes.SelfDeployRequest) -> DeployTypes.SelfDeployResult;
    approveDeploy : (Principal, Text) -> Result.Result<DeployTypes.SelfDeployResult, Text>;
    getPendingApprovals : () -> [PendingApproval];

    // Admin configuration
    addDeployer : (Principal, Principal) -> Bool;
    removeDeployer : (Principal, Principal) -> Bool;
    listDeployers : () -> [Principal];
    configureSelfDeploy : (Principal, Bool, Nat) -> Result.Result<(), Text>;
    setEnabled : (Principal, Bool) -> Result.Result<(), Text>;

    // Webhook management
    registerWebhook : (Principal, DeployTypes.WebhookConfig) -> Result.Result<(), Text>;
    removeWebhook : (Principal, Text) -> Result.Result<Bool, Text>;
    listWebhooks : () -> [DeployTypes.WebhookConfig];

    // Health
    healthCheck : () -> HealthCheckResult;
  } {
    {
      // ═══════════════════════════════════════════════════════════════
      // DASHBOARD QUERIES
      // ═══════════════════════════════════════════════════════════════

      getDashboard = func() : NovaForgeLib.DashboardData {
        NovaForgeLib.getDashboardData(state, ?"edu-ai");
      };

      getDeploymentHistory = func(
        filter : DeployTypes.DeploymentFilter
      ) : DeployTypes.DeploymentListResult {
        HistoryLib.listDeployments(state.history, filter);
      };

      getDeployment = func(
        id : DeployTypes.DeploymentId
      ) : ?DeployTypes.DeploymentRecord {
        HistoryLib.getDeployment(state.history, id);
      };

      // ═══════════════════════════════════════════════════════════════
      // SELF-DEPLOY ACTIONS
      // ═══════════════════════════════════════════════════════════════

      requestDeploy = func(
        caller : Principal,
        request : DeployTypes.SelfDeployRequest
      ) : DeployTypes.SelfDeployResult {
        if (not state.isEnabled) {
          return #rejected("Nova Forge is disabled");
        };
        NovaForgeLib.requestSelfDeploy(state, caller, request);
      };

      approveDeploy = func(
        caller : Principal,
        requestId : Text
      ) : Result.Result<DeployTypes.SelfDeployResult, Text> {
        if (not state.isEnabled) {
          return #err("Nova Forge is disabled");
        };
        NovaForgeLib.approveDeploy(state, caller, requestId);
      };

      getPendingApprovals = func() : [PendingApproval] {
        var approvals : [PendingApproval] = [];
        for ((id, auth) in Map.entries(state.selfDeploy.approvals)) {
          approvals := Array.append(approvals, [{
            requestId = id;
            version = "pending";  // Simplified
            requestedBy = auth.requestedBy;
            currentApprovals = auth.currentApprovals.size();
            requiredApprovals = auth.requiredApprovals;
            expiresAt = auth.expiresAt;
          }]);
        };
        approvals;
      };

      // ═══════════════════════════════════════════════════════════════
      // ADMIN CONFIGURATION
      // ═══════════════════════════════════════════════════════════════

      addDeployer = func(
        caller : Principal,
        deployer : Principal
      ) : Bool {
        if (not isAdmin(caller)) { return false };
        NovaForgeLib.addDeployer(state, deployer);
        true;
      };

      removeDeployer = func(
        caller : Principal,
        deployer : Principal
      ) : Bool {
        if (not isAdmin(caller)) { return false };
        NovaForgeLib.removeDeployer(state, deployer);
      };

      listDeployers = func() : [Principal] {
        NovaForgeLib.listDeployers(state);
      };

      configureSelfDeploy = func(
        caller : Principal,
        autoEnabled : Bool,
        requiredApprovers : Nat
      ) : Result.Result<(), Text> {
        if (not isAdmin(caller)) {
          return #err("Admin access required");
        };
        NovaForgeLib.configureSelfDeploy(state, autoEnabled, requiredApprovers);
        #ok(());
      };

      setEnabled = func(
        caller : Principal,
        enabled : Bool
      ) : Result.Result<(), Text> {
        if (not isAdmin(caller)) {
          return #err("Admin access required");
        };
        NovaForgeLib.setEnabled(state, enabled);
        #ok(());
      };

      // ═══════════════════════════════════════════════════════════════
      // WEBHOOK MANAGEMENT
      // ═══════════════════════════════════════════════════════════════

      registerWebhook = func(
        caller : Principal,
        config : DeployTypes.WebhookConfig
      ) : Result.Result<(), Text> {
        if (not isAdmin(caller)) {
          return #err("Admin access required");
        };
        NovaForgeLib.registerWebhook(state, config);
        #ok(());
      };

      removeWebhook = func(
        caller : Principal,
        url : Text
      ) : Result.Result<Bool, Text> {
        if (not isAdmin(caller)) {
          return #err("Admin access required");
        };
        #ok(NovaForgeLib.removeWebhook(state, url));
      };

      listWebhooks = func() : [DeployTypes.WebhookConfig] {
        WebhookLib.listWebhooks(state.webhooks);
      };

      // ═══════════════════════════════════════════════════════════════
      // HEALTH CHECK
      // ═══════════════════════════════════════════════════════════════

      healthCheck = func() : HealthCheckResult {
        NovaForgeLib.recordHealthCheck(state);
        {
          healthy = state.isEnabled;
          timestamp = Time.now();
          details = {
            historyOk = true;
            webhooksOk = true;
            selfDeployOk = state.selfDeploy.authorizedDeployers.size() > 0;
          };
        };
      };
    };
  };

  // Import Map for iteration
  import Map "mo:core/Map";
};
