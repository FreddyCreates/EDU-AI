/// Nova Forge - Mainnet Deployer
/// Direct deployment to Internet Computer mainnet - NO testnets, NO local replicas

import Principal "mo:core/Principal";
import Result "mo:core/Result";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Nat "mo:core/Nat";

import Types "../types/config";

module {
  /// Deployment result
  public type DeployResult = Result.Result<DeployOutput, DeployError>;

  /// Successful deployment output
  public type DeployOutput = {
    canisterId : Principal;
    network : Types.Network;
    timestamp : Time.Time;
    cyclesUsed : Nat;
    moduleHash : Text;
  };

  /// Deployment error
  public type DeployError = {
    code : Text;
    message : Text;
    recoverable : Bool;
  };

  /// Deployment mode
  public type DeployMode = {
    #install;   // Fresh installation
    #upgrade;   // Upgrade existing canister
    #reinstall; // Wipe and reinstall (DANGEROUS)
  };

  /// IC Management canister interface (partial)
  public type ManagementCanister = actor {
    create_canister : shared { settings : ?CanisterSettings } -> async { canister_id : Principal };
    install_code : shared InstallCodeArgs -> async ();
    canister_status : shared { canister_id : Principal } -> async CanisterStatusResult;
    deposit_cycles : shared { canister_id : Principal } -> async ();
  };

  /// Canister settings for creation
  public type CanisterSettings = {
    controllers : ?[Principal];
    compute_allocation : ?Nat;
    memory_allocation : ?Nat;
    freezing_threshold : ?Nat;
  };

  /// Install code arguments
  public type InstallCodeArgs = {
    mode : { #install; #upgrade; #reinstall };
    canister_id : Principal;
    wasm_module : Blob;
    arg : Blob;
  };

  /// Canister status result
  public type CanisterStatusResult = {
    status : { #running; #stopping; #stopped };
    memory_size : Nat;
    cycles : Nat;
    settings : CanisterSettings;
    module_hash : ?Blob;
  };

  /// IC Mainnet Management Canister
  public let IC_MANAGEMENT : Principal = Principal.fromText("aaaaa-aa");

  /// Minimum cycles for canister creation (0.1T)
  public let MIN_CREATE_CYCLES : Nat = 100_000_000_000;

  /// Default cycles for new canister (1T)
  public let DEFAULT_CYCLES : Nat = 1_000_000_000_000;

  /// Pre-deployment checklist
  public type PreDeployCheck = {
    wasmExists : Bool;
    didExists : Bool;
    cyclesSufficient : Bool;
    scanPassed : Bool;
    upgradeCompatible : Bool;
  };

  /// Validate pre-deployment requirements
  public func validatePreDeploy(
    check : PreDeployCheck,
    securityLevel : Types.SecurityLevel
  ) : Result.Result<(), DeployError> {
    if (not check.wasmExists) {
      return #err({
        code = "D001";
        message = "WASM file not found - run 'nova build' first";
        recoverable = true;
      });
    };

    if (not check.didExists) {
      return #err({
        code = "D002";
        message = "Candid interface file not found";
        recoverable = true;
      });
    };

    if (not check.cyclesSufficient) {
      return #err({
        code = "D003";
        message = "Insufficient cycles for deployment";
        recoverable = true;
      });
    };

    switch (securityLevel) {
      case (#strict) {
        if (not check.scanPassed) {
          return #err({
            code = "D004";
            message = "Security scan failed - cannot deploy in strict mode";
            recoverable = true;
          });
        };
        if (not check.upgradeCompatible) {
          return #err({
            code = "D005";
            message = "Upgrade compatibility check failed";
            recoverable = false;
          });
        };
      };
      case (#standard) {
        if (not check.scanPassed) {
          return #err({
            code = "D004";
            message = "Security scan found errors";
            recoverable = true;
          });
        };
      };
      case (#minimal) {
        // Advisory only - proceed regardless
      };
    };

    #ok(());
  };

  /// Generate deployment manifest for CLI
  public type DeployManifest = {
    canisterName : Text;
    wasmPath : Text;
    didPath : Text;
    mode : DeployMode;
    cycles : Nat;
    controllers : [Principal];
    network : Text;  // Always "ic"
  };

  /// Create deployment manifest
  public func createManifest(
    config : Types.CanisterConfig,
    wasmPath : Text,
    didPath : Text,
    mode : DeployMode,
    controllers : [Principal]
  ) : DeployManifest {
    let cycles = switch (config.cycles) {
      case (#auto) { DEFAULT_CYCLES };
      case (#fixed(n)) { n };
      case (#minimum(n)) { Nat.max(n, DEFAULT_CYCLES) };
    };

    {
      canisterName = config.name;
      wasmPath = wasmPath;
      didPath = didPath;
      mode = mode;
      cycles = cycles;
      controllers = controllers;
      network = "ic";  // ALWAYS mainnet
    };
  };

  /// Format deployment summary
  public func formatDeploymentSummary(output : DeployOutput) : Text {
    "🚀 DEPLOYED TO MAINNET\n" #
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n" #
    "Canister ID: " # Principal.toText(output.canisterId) # "\n" #
    "Network: ic (mainnet)\n" #
    "Cycles Used: " # Nat.toText(output.cyclesUsed) # "\n" #
    "Module Hash: " # output.moduleHash # "\n" #
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
  };

  /// Deployment confirmation message
  public let DEPLOY_WARNING : Text = 
    "⚠️  MAINNET DEPLOYMENT\n" #
    "This will deploy directly to the Internet Computer mainnet.\n" #
    "There is no testnet. There is no staging.\n" #
    "This is PRODUCTION.\n\n" #
    "Type 'yes' to confirm: ";
};
