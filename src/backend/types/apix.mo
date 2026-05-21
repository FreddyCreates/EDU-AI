module {
  // ── APIX: Sovereign Gateway Types ────────────────────────────────────────

  // Versioned API contract envelope (flat, shareable)
  public type ApiVersion = {
    version      : Text;   // semver string e.g. "1.0.0"
    releaseDate  : Int;    // nanoseconds (Time.now())
    deprecated   : Bool;
    endpointCount : Nat;
  };

  public type ApiEndpoint = {
    id              : Text;   // 4-letter lock name
    name            : Text;
    path            : Text;
    method          : Text;   // "query" or "update"
    version         : Text;   // semver string
    substrateDomain : Text;   // e.g. "ICPM", "JLIA", "EDRT"
    domain          : Text;   // functional domain
    rateLimit       : Nat;    // max calls per F(8)=21 cycles
    requiresAuth    : Bool;
    description     : Text;
    sealedAt        : Int;
  };

  // Caller registration for sovereign gateway access
  public type ApiRegistration = {
    callerId         : Text;   // 4-letter lock name or principal text
    name             : Text;
    publicKey        : Text;   // base64-encoded or principal text
    allowedEndpoints : [Text]; // endpoint IDs this caller may access
  };

  // Per-call audit log entry
  public type ApiCallLog = {
    callerId     : Text;
    endpointId   : Text;
    timestamp    : Int;   // nanoseconds (Time.now())
    responseTime : Nat;   // nanoseconds elapsed
    success      : Bool;
  };

  public type ApiContract = {
    endpointId      : Text;
    schema          : Text;
    exampleRequest  : Text;
    exampleResponse : Text;
  };

  public type ApiStats = {
    totalEndpoints  : Nat;
    totalCalls      : Nat;
    activeEndpoints : Nat;
  };

  // External client registration request
  public type RegistrationRequest = {
    requestId          : Text;
    name               : Text;
    description        : Text;
    requestedEndpoints : [Text];
    submittedAt        : Int;
    status             : Text;   // "pending" | "approved" | "rejected"
  };

  // Result returned to external client on registration
  public type RegistrationResult = {
    clientId           : Text;
    apiKey             : Text;
    rateLimitPerMinute : Nat;   // Fibonacci-tiered: 5, 21, or 55
    approvedEndpoints  : [Text];
    status             : Text;
  };

  // Per-client call rate bucket for Fibonacci rate limiting
  public type RateBucket = {
    clientId   : Text;
    callsThisMinute : Nat;
    minuteStart     : Int;   // nanoseconds
    tier            : Nat;   // Fibonacci tier: 5, 21, or 55
  };

  // API usage stats for a specific external client
  public type ApiUsageStats = {
    clientId        : Text;
    totalCalls      : Nat;
    callsThisMinute : Nat;
    rateLimitTier   : Nat;
    approvedEndpoints : [Text];
    lastCall        : Int;
  };
};

