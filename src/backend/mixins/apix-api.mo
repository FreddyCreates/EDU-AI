import Types   "../types/apix";
import ApixLib "../lib/apix";
import Time    "mo:core/Time";

mixin (apixState : ApixLib.State) {
  public query func getApiEndpoints() : async [Types.ApiEndpoint] {
    ApixLib.getEndpoints(apixState);
  };

  public query func getApiEndpointById(id : Text) : async ?Types.ApiEndpoint {
    ApixLib.getEndpointById(apixState, id);
  };

  public query func getApiEndpointsByDomain(domain : Text) : async [Types.ApiEndpoint] {
    ApixLib.getEndpointsByDomain(apixState, domain);
  };

  public query func getApiStats() : async Types.ApiStats {
    ApixLib.getApiStats(apixState);
  };

  public query func getApiCallLogs(n : Nat) : async [Types.ApiCallLog] {
    ApixLib.getApiCallLogs(apixState, n);
  };

  public func logApiCall(
    callerId     : Text,
    endpointId   : Text,
    responseTime : Nat,
    success      : Bool,
  ) : async () {
    ApixLib.logApiCall(apixState, callerId, endpointId, responseTime, success);
  };

  public func registerApiCaller(
    id      : Text,
    name    : Text,
    pubKey  : Text,
    allowed : [Text],
  ) : async Bool {
    ApixLib.registerApiCaller(apixState, id, name, pubKey, allowed);
  };

  public query func getApiVersions() : async [Types.ApiVersion] {
    ApixLib.getApiVersions(apixState);
  };
  // ── registerExternalClient ────────────────────────────────────────────────
  public func registerExternalClient(
    requestId          : Text,
    name               : Text,
    description        : Text,
    requestedEndpoints : [Text],
  ) : async Types.RegistrationRequest {
    ApixLib.registerExternalClient(apixState, requestId, name, description, requestedEndpoints);
  };

  // ── approveClient ─────────────────────────────────────────────────────────
  public func approveClient(
    requestId : Text,
    apiKey    : Text,
  ) : async ?Types.RegistrationResult {
    ApixLib.approveClient(apixState, requestId, apiKey);
  };

  // ── listPendingRegistrations ──────────────────────────────────────────────
  public query func listPendingRegistrations() : async [Types.RegistrationRequest] {
    ApixLib.listPendingRegistrations(apixState);
  };

  // ── getApiUsageStats ──────────────────────────────────────────────────────
  public query func getApiUsageStats(clientId : Text) : async ?Types.ApiUsageStats {
    ApixLib.getApiUsageStats(apixState, clientId);
  };
};
