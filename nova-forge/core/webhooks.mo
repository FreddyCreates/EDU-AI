/// Nova Forge - Webhook Notifications
/// Sends webhook notifications for deployment events
/// Phase 3: CLI & UX

import Array "mo:core/Array";
import Buffer "mo:core/Buffer";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Blob "mo:core/Blob";
import Nat8 "mo:core/Nat8";
import Iter "mo:core/Iter";
import Char "mo:core/Char";

import Types "../types/deployment";

module {
  /// Webhook state
  public type WebhookState = {
    configs : Buffer.Buffer<Types.WebhookConfig>;
    pendingDeliveries : Buffer.Buffer<PendingWebhook>;
    var retryQueue : [PendingWebhook];
  };

  /// Pending webhook delivery
  public type PendingWebhook = {
    payload : Types.WebhookPayload;
    config : Types.WebhookConfig;
    attempts : Nat;
    nextRetry : Time.Time;
  };

  /// Maximum retry attempts
  public let MAX_RETRIES : Nat = 3;

  /// Retry delay in nanoseconds (exponential backoff base)
  public let RETRY_DELAY_NS : Int = 60_000_000_000;  // 1 minute

  /// Initialize webhook state
  public func init() : WebhookState {
    {
      configs = Buffer.Buffer<Types.WebhookConfig>(5);
      pendingDeliveries = Buffer.Buffer<PendingWebhook>(20);
      var retryQueue = [];
    };
  };

  /// Register a webhook configuration
  public func registerWebhook(
    state : WebhookState,
    config : Types.WebhookConfig
  ) {
    // Check for duplicate URL
    for (existing in state.configs.vals()) {
      if (existing.url == config.url) {
        return;  // Already registered
      };
    };
    state.configs.add(config);
  };

  /// Remove a webhook by URL
  public func removeWebhook(
    state : WebhookState,
    url : Text
  ) : Bool {
    let filtered = Buffer.Buffer<Types.WebhookConfig>(state.configs.size());
    var found = false;
    
    for (config in state.configs.vals()) {
      if (config.url != url) {
        filtered.add(config);
      } else {
        found := true;
      };
    };

    if (found) {
      state.configs.clear();
      for (c in filtered.vals()) {
        state.configs.add(c);
      };
    };

    found;
  };

  /// List all webhooks
  public func listWebhooks(state : WebhookState) : [Types.WebhookConfig] {
    Buffer.toArray(state.configs);
  };

  /// Queue webhook notifications for an event
  public func queueNotifications(
    state : WebhookState,
    eventType : Types.WebhookEventType,
    deployment : Types.DeploymentRecord,
    message : Text,
    metadata : ?Text
  ) : Nat {
    let payload : Types.WebhookPayload = {
      eventType = eventType;
      timestamp = Time.now();
      deploymentId = deployment.id;
      project = deployment.project;
      version = deployment.version;
      status = deployment.status;
      message = message;
      metadata = metadata;
    };

    var queued : Nat = 0;

    for (config in state.configs.vals()) {
      if (config.enabled and shouldNotify(config, eventType)) {
        state.pendingDeliveries.add({
          payload = payload;
          config = config;
          attempts = 0;
          nextRetry = Time.now();
        });
        queued += 1;
      };
    };

    queued;
  };

  /// Check if config should receive event type
  func shouldNotify(
    config : Types.WebhookConfig,
    eventType : Types.WebhookEventType
  ) : Bool {
    for (evt in config.events.vals()) {
      switch (evt) {
        case (#all) { return true };
        case (e) {
          if (eventTypeEqual(e, eventType)) { return true };
        };
      };
    };
    false;
  };

  /// Compare event types
  func eventTypeEqual(
    a : Types.WebhookEventType,
    b : Types.WebhookEventType
  ) : Bool {
    switch (a, b) {
      case (#deploymentStarted, #deploymentStarted) { true };
      case (#deploymentCompleted, #deploymentCompleted) { true };
      case (#deploymentFailed, #deploymentFailed) { true };
      case (#scanCompleted, #scanCompleted) { true };
      case (#cycleWarning, #cycleWarning) { true };
      case (#all, #all) { true };
      case (_, _) { false };
    };
  };

  /// Generate webhook payload JSON
  public func generatePayloadJson(payload : Types.WebhookPayload) : Text {
    let status = switch (payload.status) {
      case (#pending) { "pending" };
      case (#inProgress) { "inProgress" };
      case (#success) { "success" };
      case (#failed(msg)) { "failed" };
      case (#cancelled) { "cancelled" };
    };

    let eventType = switch (payload.eventType) {
      case (#deploymentStarted) { "deploymentStarted" };
      case (#deploymentCompleted) { "deploymentCompleted" };
      case (#deploymentFailed) { "deploymentFailed" };
      case (#scanCompleted) { "scanCompleted" };
      case (#cycleWarning) { "cycleWarning" };
      case (#all) { "all" };
    };

    let meta = switch (payload.metadata) {
      case (?m) { m };
      case (null) { "null" };
    };

    "{" #
      "\"eventType\":\"" # eventType # "\"," #
      "\"timestamp\":" # Int.toText(payload.timestamp) # "," #
      "\"deploymentId\":\"" # payload.deploymentId # "\"," #
      "\"project\":\"" # escapeJson(payload.project) # "\"," #
      "\"version\":\"" # escapeJson(payload.version) # "\"," #
      "\"status\":\"" # status # "\"," #
      "\"message\":\"" # escapeJson(payload.message) # "\"," #
      "\"metadata\":" # meta #
    "}";
  };

  /// Escape JSON string
  func escapeJson(s : Text) : Text {
    var result = "";
    for (c in s.chars()) {
      switch (c) {
        case ('"') { result #= "\\\"" };
        case ('\\') { result #= "\\\\" };
        case ('\n') { result #= "\\n" };
        case ('\r') { result #= "\\r" };
        case ('\t') { result #= "\\t" };
        case (_) { result #= Text.fromChar(c) };
      };
    };
    result;
  };

  /// Generate HMAC signature for webhook
  /// NOTE: This is a placeholder implementation. In production, integrate with
  /// a proper cryptographic library like mo:crypto for HMAC-SHA256 signatures.
  /// The current implementation is NOT cryptographically secure.
  public func generateSignature(
    payload : Text,
    secret : Text
  ) : Text {
    // TODO: Replace with proper HMAC-SHA256 implementation
    // Requires: import Crypto "mo:crypto";
    // Implementation: Crypto.hmacSha256(secret, payload)
    // 
    // Current placeholder uses a simple hash for development only.
    // DO NOT use in production without proper HMAC implementation.
    var hash : Nat = 5381;  // DJB2 hash seed
    for (c in payload.chars()) {
      hash := ((hash * 33) + Nat32.toNat(Char.toNat32(c))) % 2147483647;
    };
    for (c in secret.chars()) {
      hash := ((hash * 33) + Nat32.toNat(Char.toNat32(c))) % 2147483647;
    };
    "sha256=" # Nat.toText(hash) # "-dev-only";
  };

  /// Create webhook log entry
  public func createLog(
    eventType : Types.WebhookEventType,
    url : Text,
    status : Types.WebhookDeliveryStatus,
    responseCode : ?Nat,
    error : ?Text
  ) : Types.WebhookLog {
    {
      timestamp = Time.now();
      eventType = eventType;
      url = url;
      status = status;
      responseCode = responseCode;
      error = error;
    };
  };

  /// Get pending webhooks ready for delivery
  public func getPendingWebhooks(state : WebhookState) : [PendingWebhook] {
    let now = Time.now();
    let ready = Buffer.Buffer<PendingWebhook>(state.pendingDeliveries.size());

    for (pending in state.pendingDeliveries.vals()) {
      if (pending.nextRetry <= now) {
        ready.add(pending);
      };
    };

    Buffer.toArray(ready);
  };

  /// Mark webhook as delivered (remove from pending)
  public func markDelivered(
    state : WebhookState,
    payload : Types.WebhookPayload,
    url : Text
  ) {
    let remaining = Buffer.Buffer<PendingWebhook>(state.pendingDeliveries.size());

    for (pending in state.pendingDeliveries.vals()) {
      if (not (pending.payload.deploymentId == payload.deploymentId and 
               pending.config.url == url)) {
        remaining.add(pending);
      };
    };

    state.pendingDeliveries.clear();
    for (p in remaining.vals()) {
      state.pendingDeliveries.add(p);
    };
  };

  /// Mark webhook for retry
  public func markForRetry(
    state : WebhookState,
    payload : Types.WebhookPayload,
    url : Text
  ) : Bool {
    let updated = Buffer.Buffer<PendingWebhook>(state.pendingDeliveries.size());
    var found = false;

    for (pending in state.pendingDeliveries.vals()) {
      if (pending.payload.deploymentId == payload.deploymentId and 
          pending.config.url == url) {
        found := true;
        if (pending.attempts < MAX_RETRIES) {
          // Exponential backoff using manual power calculation
          let multiplier = Nat.pow(2, pending.attempts);
          let delay = RETRY_DELAY_NS * multiplier;
          updated.add({
            pending with
            attempts = pending.attempts + 1;
            nextRetry = Time.now() + delay;
          });
        };
        // If max retries exceeded, drop it
      } else {
        updated.add(pending);
      };
    };

    state.pendingDeliveries.clear();
    for (p in updated.vals()) {
      state.pendingDeliveries.add(p);
    };

    found;
  };

  /// Get statistics
  public type WebhookStats = {
    totalConfigs : Nat;
    enabledConfigs : Nat;
    pendingDeliveries : Nat;
  };

  public func getStats(state : WebhookState) : WebhookStats {
    var enabled : Nat = 0;
    for (config in state.configs.vals()) {
      if (config.enabled) { enabled += 1 };
    };

    {
      totalConfigs = state.configs.size();
      enabledConfigs = enabled;
      pendingDeliveries = state.pendingDeliveries.size();
    };
  };
};
