import Types "../types/apix";
import Time  "mo:core/Time";
import List  "mo:core/List";
import Array "mo:core/Array";

module {
  let MAX_ENDPOINTS  : Nat = 144; // F(12)
  let LOG_RING_SIZE  : Nat = 55;  // F(10)

  public type State = {
    endpoints           : List.List<Types.ApiEndpoint>;
    callCounts          : List.List<(Text, Nat)>;           // (endpointId, count)
    callLogs            : List.List<Types.ApiCallLog>;      // ring buffer F(10)=55
    callerRegs          : List.List<Types.ApiRegistration>;
    apiVersions         : List.List<Types.ApiVersion>;
    pendingRequests     : List.List<Types.RegistrationRequest>; // awaiting admin approval
    rateBuckets         : List.List<Types.RateBucket>;          // per-client rate limiting
    usageCounters       : List.List<(Text, Nat, Int)>;          // (clientId, totalCalls, lastCall)
  };

  public func newState() : State = {
    endpoints       = List.empty<Types.ApiEndpoint>();
    callCounts      = List.empty<(Text, Nat)>();
    callLogs        = List.empty<Types.ApiCallLog>();
    callerRegs      = List.empty<Types.ApiRegistration>();
    apiVersions     = List.empty<Types.ApiVersion>();
    pendingRequests = List.empty<Types.RegistrationRequest>();
    rateBuckets     = List.empty<Types.RateBucket>();
    usageCounters   = List.empty<(Text, Nat, Int)>();
  };

  // ── Seed pre-registered endpoints + version history ───────────────────
  public func seedEndpoints(state : State) {
    let epoch : Int = 1_700_000_000_000_000_000; // approximate sealed epoch ns
    let versions : [Types.ApiVersion] = [
      { version = "1.0.0"; releaseDate = epoch;                  deprecated = false; endpointCount = 6 },
      { version = "1.1.0"; releaseDate = epoch + 2_592_000_000_000_000; deprecated = false; endpointCount = 8 },
    ];
    for (v in versions.values()) {
      state.apiVersions.add(v);
    };
    let now = Time.now();
    let seeds : [Types.ApiEndpoint] = [
      { id = "ENGI"; name = "List Engines";          path = "/api/v1/engines";       method = "query";  version = "1.0.0"; substrateDomain = "ICPM"; domain = "INTELLIGENCE"; rateLimit = 21; requiresAuth = false; description = "Returns all registered sovereign engines.";              sealedAt = now },
      { id = "LAWS"; name = "List Laws";             path = "/api/v1/laws";          method = "query";  version = "1.0.0"; substrateDomain = "ICPM"; domain = "REGISTRY";     rateLimit = 21; requiresAuth = false; description = "Returns all sovereign laws (LEX_*).";                   sealedAt = now },
      { id = "MLTI"; name = "Arch Council Query";    path = "/api/v1/arch-council";  method = "update"; version = "1.0.0"; substrateDomain = "ICPM"; domain = "INTELLIGENCE"; rateLimit = 13; requiresAuth = false; description = "Fires the Architecture Council (MLTV). Returns 3+1 voices."; sealedAt = now },
      { id = "PASS"; name = "Passport Stats";        path = "/api/v1/passport";      method = "query";  version = "1.0.0"; substrateDomain = "ICPM"; domain = "MEMORY";       rateLimit = 21; requiresAuth = true;  description = "Returns passport stats for the authenticated student.";  sealedAt = now },
      { id = "QRYX"; name = "Sovereign Query";       path = "/api/v1/query";         method = "update"; version = "1.0.0"; substrateDomain = "ICPM"; domain = "REGISTRY";     rateLimit = 13; requiresAuth = false; description = "Executes a sovereign query against any internal registry."; sealedAt = now },
      { id = "BLDR"; name = "Builder Stats";         path = "/api/v1/builders";      method = "query";  version = "1.0.0"; substrateDomain = "ICPM"; domain = "REGISTRY";     rateLimit = 21; requiresAuth = false; description = "Returns all silver builder stats.";                    sealedAt = now },
      { id = "ENTS"; name = "Entanglement States";   path = "/api/v1/entanglements"; method = "query";  version = "1.0.0"; substrateDomain = "BRDG"; domain = "BRIDGES";      rateLimit = 21; requiresAuth = false; description = "Returns all entanglement bridge states.";              sealedAt = now },
      { id = "DIAG"; name = "System Diagnostics";    path = "/api/v1/diagnostics";   method = "query";  version = "1.0.0"; substrateDomain = "ICPM"; domain = "CORE";         rateLimit = 8;  requiresAuth = true;  description = "Returns system diagnostics (admin/IT only).";          sealedAt = now },
    ];
    for (ep in seeds.values()) {
      state.endpoints.add(ep);
    };
  };

  // ── logApiCall ───────────────────────────────────────────────────────────
  // Appends to the Fibonacci ring buffer (size F(10)=55); evicts oldest entry
  public func logApiCall(
    state        : State,
    callerId     : Text,
    endpointId   : Text,
    responseTime : Nat,
    success      : Bool,
  ) {
    let entry : Types.ApiCallLog = {
      callerId;
      endpointId;
      timestamp    = Time.now();
      responseTime;
      success;
    };
    if (state.callLogs.size() >= LOG_RING_SIZE) {
      let arr = state.callLogs.toArray();
      state.callLogs.clear();
      var i : Nat = 1;
      while (i < arr.size()) {
        state.callLogs.add(arr[i]);
        i += 1;
      };
    };
    state.callLogs.add(entry);
    recordCall(state, endpointId);
  };

  // ── getApiCallLogs ───────────────────────────────────────────────────────
  // Returns the most recent n logs from the ring buffer
  public func getApiCallLogs(state : State, n : Nat) : [Types.ApiCallLog] {
    let all  = state.callLogs.toArray();
    let size = all.size();
    if (n >= size) return all;
    let start : Nat = if (n < size) size - n else 0;
    let buf = List.empty<Types.ApiCallLog>();
    var i = start;
    while (i < size) {
      buf.add(all[i]);
      i += 1;
    };
    buf.toArray();
  };

  // ── registerApiCaller ────────────────────────────────────────────────────
  // Registers a sovereign caller; rejects duplicates
  public func registerApiCaller(
    state            : State,
    id               : Text,
    name             : Text,
    publicKey        : Text,
    allowedEndpoints : [Text],
  ) : Bool {
    let exists = state.callerRegs.find(
      func(r : Types.ApiRegistration) : Bool { r.callerId == id }
    ) != null;
    if (exists) return false;
    let reg : Types.ApiRegistration = {
      callerId         = id;
      name;
      publicKey;
      allowedEndpoints;
    };
    state.callerRegs.add(reg);
    true;
  };

  // ── getApiVersions ───────────────────────────────────────────────────────
  public func getApiVersions(state : State) : [Types.ApiVersion] {
    state.apiVersions.toArray();
  };

  // ── Fibonacci rate-limit tiers: F(5)=5, F(8)=21, F(10)=55 ──────────────
  let TIER_BASIC    : Nat = 5;   // F(5)
  let TIER_STANDARD : Nat = 21;  // F(8)
  let TIER_PREMIUM  : Nat = 55;  // F(10)

  func assignTier(endpointCount : Nat) : Nat {
    if (endpointCount <= 2) TIER_BASIC
    else if (endpointCount <= 5) TIER_STANDARD
    else TIER_PREMIUM;
  };

  // ── registerExternalClient ────────────────────────────────────────────────
  // Creates a pending RegistrationRequest for admin approval
  public func registerExternalClient(
    state              : State,
    requestId          : Text,
    name               : Text,
    description        : Text,
    requestedEndpoints : [Text],
  ) : Types.RegistrationRequest {
    let req : Types.RegistrationRequest = {
      requestId;
      name;
      description;
      requestedEndpoints;
      submittedAt = Time.now();
      status      = "pending";
    };
    // Replace if already exists (idempotent submit)
    let existing = state.pendingRequests.findIndex(
      func(r : Types.RegistrationRequest) : Bool { r.requestId == requestId }
    );
    switch (existing) {
      case (?i) { state.pendingRequests.put(i, req) };
      case null  { state.pendingRequests.add(req) };
    };
    req;
  };

  // ── approveClient ─────────────────────────────────────────────────────────
  // Promotes a pending request to an active ApiRegistration with rate bucket
  public func approveClient(
    state     : State,
    requestId : Text,
    apiKey    : Text,
  ) : ?Types.RegistrationResult {
    let reqOpt = state.pendingRequests.findIndex(
      func(r : Types.RegistrationRequest) : Bool { r.requestId == requestId }
    );
    switch (reqOpt) {
      case null null;
      case (?i) {
        let req = state.pendingRequests.at(i);
        // Mark as approved
        state.pendingRequests.put(i, { req with status = "approved" });
        let tier = assignTier(req.requestedEndpoints.size());
        // Create ApiRegistration
        let reg : Types.ApiRegistration = {
          callerId         = requestId;
          name             = req.name;
          publicKey        = apiKey;
          allowedEndpoints = req.requestedEndpoints;
        };
        state.callerRegs.add(reg);
        // Create rate bucket
        let bucket : Types.RateBucket = {
          clientId        = requestId;
          callsThisMinute = 0;
          minuteStart     = Time.now();
          tier;
        };
        state.rateBuckets.add(bucket);
        // Init usage counter
        state.usageCounters.add((requestId, 0, Time.now()));
        ?{
          clientId           = requestId;
          apiKey;
          rateLimitPerMinute = tier;
          approvedEndpoints  = req.requestedEndpoints;
          status             = "approved";
        };
      };
    };
  };

  // ── listPendingRegistrations ──────────────────────────────────────────────
  public func listPendingRegistrations(state : State) : [Types.RegistrationRequest] {
    state.pendingRequests.toArray().filter(
      func(r : Types.RegistrationRequest) : Bool { r.status == "pending" }
    );
  };

  // ── checkRateLimit ────────────────────────────────────────────────────────
  // Returns true if client is within its Fibonacci rate tier for this minute
  public func checkRateLimit(state : State, clientId : Text) : Bool {
    let oneMinute : Int = 60_000_000_000;
    let now = Time.now();
    let bucketIdx = state.rateBuckets.findIndex(
      func(b : Types.RateBucket) : Bool { b.clientId == clientId }
    );
    switch (bucketIdx) {
      case null false; // not registered
      case (?i) {
        let b = state.rateBuckets.at(i);
        if (now - b.minuteStart > oneMinute) {
          // Reset bucket for new minute window
          state.rateBuckets.put(i, { b with callsThisMinute = 1; minuteStart = now });
          true;
        } else if (b.callsThisMinute < b.tier) {
          state.rateBuckets.put(i, { b with callsThisMinute = b.callsThisMinute + 1 });
          true;
        } else {
          false; // rate limit exceeded
        };
      };
    };
  };

  // ── getApiUsageStats ──────────────────────────────────────────────────────
  public func getApiUsageStats(state : State, clientId : Text) : ?Types.ApiUsageStats {
    let regOpt = state.callerRegs.find(
      func(r : Types.ApiRegistration) : Bool { r.callerId == clientId }
    );
    switch (regOpt) {
      case null null;
      case (?reg) {
        let oneMinute : Int = 60_000_000_000;
        let now = Time.now();
        var totalCalls      : Nat = 0;
        var callsThisMinute : Nat = 0;
        var rateLimitTier   : Nat = TIER_BASIC;
        var lastCall        : Int = 0;
        // Get total from usage counters
        for ((cid, total, last) in state.usageCounters.values()) {
          if (cid == clientId) {
            totalCalls := total;
            lastCall   := last;
          };
        };
        // Get this-minute count from rate bucket
        for (b in state.rateBuckets.values()) {
          if (b.clientId == clientId) {
            rateLimitTier := b.tier;
            callsThisMinute := if (now - b.minuteStart <= oneMinute) b.callsThisMinute else 0;
          };
        };
        ?{
          clientId;
          totalCalls;
          callsThisMinute;
          rateLimitTier;
          approvedEndpoints = reg.allowedEndpoints;
          lastCall;
        };
      };
    };
  };

  // ── Register a new endpoint ──────────────────────────────────────────────
  public func registerEndpoint(state : State, endpoint : Types.ApiEndpoint) : Bool {
    if (state.endpoints.size() >= MAX_ENDPOINTS) return false;
    let exists = state.endpoints.find(func(ep : Types.ApiEndpoint) : Bool { ep.id == endpoint.id }) != null;
    if (exists) return false;
    state.endpoints.add(endpoint);
    true;
  };

  public func getEndpoints(state : State) : [Types.ApiEndpoint] {
    state.endpoints.toArray();
  };

  public func getEndpointById(state : State, id : Text) : ?Types.ApiEndpoint {
    state.endpoints.find(func(ep : Types.ApiEndpoint) : Bool { ep.id == id });
  };

  public func getEndpointsByDomain(state : State, domain : Text) : [Types.ApiEndpoint] {
    state.endpoints.toArray().filter(func(ep : Types.ApiEndpoint) : Bool { ep.domain == domain });
  };

  // ── Record a call ────────────────────────────────────────────────────────
  public func recordCall(state : State, endpointId : Text) {
    var found = false;
    var i = 0;
    while (i < state.callCounts.size()) {
      let (id, count) = state.callCounts.at(i);
      if (id == endpointId) {
        state.callCounts.put(i, (id, count + 1));
        found := true;
      };
      i += 1;
    };
    if (not found) {
      state.callCounts.add((endpointId, 1));
    };
  };

  public func getApiStats(state : State) : Types.ApiStats {
    var total = 0;
    var i = 0;
    while (i < state.callCounts.size()) {
      let (_, count) = state.callCounts.at(i);
      total += count;
      i += 1;
    };
    {
      totalEndpoints  = state.endpoints.size();
      totalCalls      = total;
      activeEndpoints = state.endpoints.size();
    }
  };
};
