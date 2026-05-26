/// Nova Forge - Deployment History Tracker
/// Tracks deployment history for dashboard and analytics
/// Phase 3: CLI & UX

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
import Order "mo:core/Order";
import Iter "mo:core/Iter";

import Types "../types/deployment";

module {
  /// Deployment ID counter
  public type DeploymentCounter = Nat;

  /// History state
  public type HistoryState = {
    var nextId : DeploymentCounter;
    deployments : Map.Map<Types.DeploymentId, Types.DeploymentRecord>;
    byProject : Map.Map<Text, Buffer.Buffer<Types.DeploymentId>>;
    byStatus : Map.Map<Text, Buffer.Buffer<Types.DeploymentId>>;
  };

  /// Initialize empty history state
  public func init() : HistoryState {
    {
      var nextId = 1;
      deployments = Map.new<Types.DeploymentId, Types.DeploymentRecord>();
      byProject = Map.new<Text, Buffer.Buffer<Types.DeploymentId>>();
      byStatus = Map.new<Text, Buffer.Buffer<Types.DeploymentId>>();
    };
  };

  /// Generate unique deployment ID
  public func generateId(state : HistoryState) : Types.DeploymentId {
    let id = "deploy-" # Nat.toText(state.nextId);
    state.nextId += 1;
    id;
  };

  /// Start a new deployment
  public func startDeployment(
    state : HistoryState,
    project : Text,
    version : Text,
    initiatedBy : Principal
  ) : Types.DeploymentRecord {
    let id = generateId(state);
    let now = Time.now();

    let record : Types.DeploymentRecord = {
      id = id;
      project = project;
      version = version;
      initiatedBy = initiatedBy;
      network = "ic";  // ALWAYS mainnet
      startedAt = now;
      completedAt = null;
      status = #pending;
      events = [{
        event = #started;
        timestamp = now;
        message = ?"Deployment initiated";
        metadata = null;
      }];
      canisters = [];
      scanReport = null;
      cycleEstimate = null;
      webhooksSent = [];
    };

    // Store deployment
    ignore Map.put(state.deployments, thash, id, record);

    // Index by project
    switch (Map.get(state.byProject, thash, project)) {
      case (?buf) { buf.add(id) };
      case (null) {
        let buf = Buffer.Buffer<Types.DeploymentId>(10);
        buf.add(id);
        ignore Map.put(state.byProject, thash, project, buf);
      };
    };

    // Index by status
    let statusKey = statusToText(#pending);
    switch (Map.get(state.byStatus, thash, statusKey)) {
      case (?buf) { buf.add(id) };
      case (null) {
        let buf = Buffer.Buffer<Types.DeploymentId>(10);
        buf.add(id);
        ignore Map.put(state.byStatus, thash, statusKey, buf);
      };
    };

    record;
  };

  /// Add event to deployment
  public func addEvent(
    state : HistoryState,
    deploymentId : Types.DeploymentId,
    event : Types.DeploymentEvent,
    message : ?Text,
    metadata : ?Text
  ) : Bool {
    switch (Map.get(state.deployments, thash, deploymentId)) {
      case (?record) {
        let eventLog : Types.DeploymentEventLog = {
          event = event;
          timestamp = Time.now();
          message = message;
          metadata = metadata;
        };

        let newEvents = Array.append(record.events, [eventLog]);
        let newStatus = eventToStatus(event);

        // Update status index if changed
        if (statusToText(record.status) != statusToText(newStatus)) {
          removeFromStatusIndex(state, deploymentId, record.status);
          addToStatusIndex(state, deploymentId, newStatus);
        };

        let updatedRecord = {
          record with
          events = newEvents;
          status = newStatus;
          completedAt = switch (event) {
            case (#completed or #failed(_)) { ?Time.now() };
            case (_) { record.completedAt };
          };
        };

        ignore Map.put(state.deployments, thash, deploymentId, updatedRecord);
        true;
      };
      case (null) { false };
    };
  };

  /// Update scan report for deployment
  public func setScanReport(
    state : HistoryState,
    deploymentId : Types.DeploymentId,
    report : Types.ScanReportSummary
  ) : Bool {
    switch (Map.get(state.deployments, thash, deploymentId)) {
      case (?record) {
        let updated = { record with scanReport = ?report };
        ignore Map.put(state.deployments, thash, deploymentId, updated);
        true;
      };
      case (null) { false };
    };
  };

  /// Update cycle estimate for deployment
  public func setCycleEstimate(
    state : HistoryState,
    deploymentId : Types.DeploymentId,
    estimate : Types.CycleEstimateSummary
  ) : Bool {
    switch (Map.get(state.deployments, thash, deploymentId)) {
      case (?record) {
        let updated = { record with cycleEstimate = ?estimate };
        ignore Map.put(state.deployments, thash, deploymentId, updated);
        true;
      };
      case (null) { false };
    };
  };

  /// Add canister deployment info
  public func addCanisterDeployment(
    state : HistoryState,
    deploymentId : Types.DeploymentId,
    canister : Types.CanisterDeployment
  ) : Bool {
    switch (Map.get(state.deployments, thash, deploymentId)) {
      case (?record) {
        let updated = {
          record with
          canisters = Array.append(record.canisters, [canister])
        };
        ignore Map.put(state.deployments, thash, deploymentId, updated);
        true;
      };
      case (null) { false };
    };
  };

  /// Log webhook delivery
  public func logWebhook(
    state : HistoryState,
    deploymentId : Types.DeploymentId,
    webhook : Types.WebhookLog
  ) : Bool {
    switch (Map.get(state.deployments, thash, deploymentId)) {
      case (?record) {
        let updated = {
          record with
          webhooksSent = Array.append(record.webhooksSent, [webhook])
        };
        ignore Map.put(state.deployments, thash, deploymentId, updated);
        true;
      };
      case (null) { false };
    };
  };

  /// Get deployment by ID
  public func getDeployment(
    state : HistoryState,
    deploymentId : Types.DeploymentId
  ) : ?Types.DeploymentRecord {
    Map.get(state.deployments, thash, deploymentId);
  };

  /// List deployments with filter
  public func listDeployments(
    state : HistoryState,
    filter : Types.DeploymentFilter
  ) : Types.DeploymentListResult {
    var candidates : [Types.DeploymentRecord] = [];

    // Get candidates based on filter
    switch (filter.project) {
      case (?proj) {
        switch (Map.get(state.byProject, thash, proj)) {
          case (?ids) {
            for (id in ids.vals()) {
              switch (Map.get(state.deployments, thash, id)) {
                case (?rec) { candidates := Array.append(candidates, [rec]) };
                case (null) {};
              };
            };
          };
          case (null) {};
        };
      };
      case (null) {
        // Get all deployments
        for ((_, rec) in Map.entries(state.deployments)) {
          candidates := Array.append(candidates, [rec]);
        };
      };
    };

    // Apply status filter
    switch (filter.status) {
      case (?status) {
        candidates := Array.filter<Types.DeploymentRecord>(candidates, func(r) {
          statusToText(r.status) == statusToText(status)
        });
      };
      case (null) {};
    };

    // Apply date filters
    switch (filter.startDate) {
      case (?start) {
        candidates := Array.filter<Types.DeploymentRecord>(candidates, func(r) {
          r.startedAt >= start
        });
      };
      case (null) {};
    };

    switch (filter.endDate) {
      case (?end) {
        candidates := Array.filter<Types.DeploymentRecord>(candidates, func(r) {
          r.startedAt <= end
        });
      };
      case (null) {};
    };

    // Sort by time (newest first)
    candidates := Array.sort<Types.DeploymentRecord>(candidates, func(a, b) {
      Int.compare(b.startedAt, a.startedAt)
    });

    let total = candidates.size();

    // Apply pagination
    let start = Nat.min(filter.offset, total);
    let end = Nat.min(filter.offset + filter.limit, total);

    let paginated = if (start >= total) {
      []
    } else {
      Array.tabulate<Types.DeploymentRecord>(
        end - start,
        func(i) { candidates[start + i] }
      )
    };

    {
      deployments = paginated;
      total = total;
      hasMore = end < total;
    };
  };

  /// Get dashboard summary
  public func getDashboardSummary(
    state : HistoryState,
    project : ?Text
  ) : Types.DashboardSummary {
    var all : [Types.DeploymentRecord] = [];

    switch (project) {
      case (?proj) {
        switch (Map.get(state.byProject, thash, proj)) {
          case (?ids) {
            for (id in ids.vals()) {
              switch (Map.get(state.deployments, thash, id)) {
                case (?rec) { all := Array.append(all, [rec]) };
                case (null) {};
              };
            };
          };
          case (null) {};
        };
      };
      case (null) {
        for ((_, rec) in Map.entries(state.deployments)) {
          all := Array.append(all, [rec]);
        };
      };
    };

    let total = all.size();

    let successful = Array.filter<Types.DeploymentRecord>(all, func(r) {
      switch (r.status) { case (#success) { true }; case (_) { false } }
    }).size();

    let failed = Array.filter<Types.DeploymentRecord>(all, func(r) {
      switch (r.status) { case (#failed(_)) { true }; case (_) { false } }
    }).size();

    // Calculate average deploy time for completed deployments
    var totalTime : Int = 0;
    var completedCount : Nat = 0;
    for (rec in all.vals()) {
      switch (rec.completedAt) {
        case (?completed) {
          totalTime += (completed - rec.startedAt);
          completedCount += 1;
        };
        case (null) {};
      };
    };
    let avgTime = if (completedCount > 0) {
      Int.abs(totalTime / completedCount / 1_000_000_000)  // Convert to seconds
    } else { 0 };

    // Calculate total cycles used
    var totalCycles : Nat = 0;
    for (rec in all.vals()) {
      for (can in rec.canisters.vals()) {
        totalCycles += can.cyclesUsed;
      };
    };

    // Sort by time to get recent
    let sorted = Array.sort<Types.DeploymentRecord>(all, func(a, b) {
      Int.compare(b.startedAt, a.startedAt)
    });

    let lastDeploy = if (sorted.size() > 0) { ?sorted[0] } else { null };
    let recent = Array.tabulate<Types.DeploymentRecord>(
      Nat.min(10, sorted.size()),
      func(i) { sorted[i] }
    );

    {
      totalDeployments = total;
      successfulDeployments = successful;
      failedDeployments = failed;
      averageDeployTime = avgTime;
      totalCyclesUsed = totalCycles;
      lastDeployment = lastDeploy;
      recentDeployments = recent;
      canisterHealth = [];  // Populated by canister status queries
    };
  };

  // ═══════════════════════════════════════════════════════════════
  // HELPER FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  func statusToText(status : Types.DeploymentStatus) : Text {
    switch (status) {
      case (#pending) { "pending" };
      case (#inProgress) { "inProgress" };
      case (#success) { "success" };
      case (#failed(_)) { "failed" };
      case (#cancelled) { "cancelled" };
    };
  };

  func eventToStatus(event : Types.DeploymentEvent) : Types.DeploymentStatus {
    switch (event) {
      case (#started or #building or #scanning or #estimating or #deploying) {
        #inProgress
      };
      case (#completed) { #success };
      case (#failed(msg)) { #failed(msg) };
      case (#rollback) { #failed("Rolled back") };
    };
  };

  func removeFromStatusIndex(
    state : HistoryState,
    id : Types.DeploymentId,
    status : Types.DeploymentStatus
  ) {
    let key = statusToText(status);
    switch (Map.get(state.byStatus, thash, key)) {
      case (?buf) {
        // Filter out the ID
        let filtered = Buffer.Buffer<Types.DeploymentId>(buf.size());
        for (existing in buf.vals()) {
          if (existing != id) { filtered.add(existing) };
        };
        ignore Map.put(state.byStatus, thash, key, filtered);
      };
      case (null) {};
    };
  };

  func addToStatusIndex(
    state : HistoryState,
    id : Types.DeploymentId,
    status : Types.DeploymentStatus
  ) {
    let key = statusToText(status);
    switch (Map.get(state.byStatus, thash, key)) {
      case (?buf) { buf.add(id) };
      case (null) {
        let buf = Buffer.Buffer<Types.DeploymentId>(10);
        buf.add(id);
        ignore Map.put(state.byStatus, thash, key, buf);
      };
    };
  };

  /// Text hash for map
  let thash = Map.thash;
};
