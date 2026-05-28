/// Nova Forge - Configuration Types
/// Sovereign ICP Mainnet Build & Deploy System

import Principal "mo:core/Principal";
import Time "mo:core/Time";

module {
  /// Network target - ALWAYS mainnet
  public type Network = {
    #ic;  // Internet Computer mainnet - the ONLY option
  };

  /// Canister type classification
  public type CanisterType = {
    #motoko;
    #rust;
    #assets;
  };

  /// Canister configuration
  public type CanisterConfig = {
    name : Text;
    canisterType : CanisterType;
    main : ?Text;           // For Motoko/Rust
    source : ?Text;         // For assets
    cycles : CycleConfig;
    dependencies : [Text];
  };

  /// Cycle allocation strategy
  public type CycleConfig = {
    #auto;                  // AI estimates optimal
    #fixed : Nat;           // Specific amount
    #minimum : Nat;         // At least this much
  };

  /// AI configuration for deployment safety
  public type AIConfig = {
    preDeployScan : Bool;
    cycleOptimization : Bool;
    upgradeSafetyCheck : Bool;
    securityLevel : SecurityLevel;
  };

  /// Security scan strictness
  public type SecurityLevel = {
    #strict;    // Block any warnings
    #standard;  // Block errors only
    #minimal;   // Advisory only
  };

  /// Build configuration
  public type BuildConfig = {
    outputDir : Text;
    mocArgs : [Text];
    packTool : Text;
  };

  /// Deploy configuration
  public type DeployConfig = {
    confirmRequired : Bool;
    autoTopUp : Bool;
    minCycles : Nat;
  };

  /// Project configuration (parsed from nova.toml)
  public type NovaConfig = {
    name : Text;
    version : Text;
    description : Text;
    network : Network;
    canisters : [CanisterConfig];
    build : BuildConfig;
    ai : AIConfig;
    deploy : DeployConfig;
  };

  /// Deployment status
  public type DeployStatus = {
    #pending;
    #building;
    #scanning;
    #estimating;
    #deploying;
    #success;
    #failed : Text;
  };

  /// Deployment record
  public type Deployment = {
    id : Text;
    project : Text;
    version : Text;
    timestamp : Time.Time;
    status : DeployStatus;
    canisterId : ?Principal;
    cyclesUsed : Nat;
    scanReport : ?ScanReport;
  };

  /// Security scan report
  public type ScanReport = {
    passed : Bool;
    warnings : [ScanWarning];
    errors : [ScanError];
    cycleEstimate : Nat;
    recommendations : [Text];
  };

  /// Scan warning
  public type ScanWarning = {
    code : Text;
    message : Text;
    location : ?Text;
    severity : Nat;  // 1-5
  };

  /// Scan error
  public type ScanError = {
    code : Text;
    message : Text;
    location : ?Text;
    fatal : Bool;
  };

  /// Canister health status
  public type CanisterHealth = {
    canisterId : Principal;
    name : Text;
    status : CanisterStatus;
    cyclesBalance : Nat;
    memoryUsed : Nat;
    lastDeployed : Time.Time;
  };

  /// Canister runtime status
  public type CanisterStatus = {
    #running;
    #stopping;
    #stopped;
    #unknown;
  };

  /// CLI command types
  public type Command = {
    #init;
    #build;
    #scan;
    #estimate;
    #deploy : { confirm : Bool };
    #status;
    #upgrade;
    #canisters;
  };
};
