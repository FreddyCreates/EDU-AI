/// Nova Forge - Build Orchestrator
/// Compiles Motoko/Rust canisters for ICP mainnet deployment

import Array "mo:core/Array";
import Text "mo:core/Text";
import Result "mo:core/Result";
import Time "mo:core/Time";
import Buffer "mo:core/Buffer";

import Types "../types/config";

module {
  /// Build result
  public type BuildResult = Result.Result<BuildOutput, BuildError>;

  /// Successful build output
  public type BuildOutput = {
    wasmPath : Text;
    didPath : Text;
    mostPath : ?Text;
    buildTime : Time.Time;
    wasmSize : Nat;
  };

  /// Build error
  public type BuildError = {
    code : Text;
    message : Text;
    details : ?Text;
  };

  /// Build state machine
  public type BuildState = {
    #idle;
    #compiling : { canister : Text; progress : Nat };
    #linking;
    #optimizing;
    #complete : BuildOutput;
    #failed : BuildError;
  };

  /// Build pipeline stages
  public let STAGES : [Text] = [
    "RESOLVE_DEPS",
    "COMPILE_MOTOKO", 
    "GENERATE_CANDID",
    "OPTIMIZE_WASM",
    "VALIDATE_OUTPUT"
  ];

  /// Default MOC compiler arguments for mainnet
  public let DEFAULT_MOC_ARGS : [Text] = [
    "--release",
    "--default-persistent-actors",
    "-no-check-ir"
  ];

  /// Build a single canister
  public func buildCanister(
    config : Types.CanisterConfig,
    buildConfig : Types.BuildConfig
  ) : BuildResult {
    switch (config.canisterType) {
      case (#motoko) { buildMotoko(config, buildConfig) };
      case (#rust) { buildRust(config, buildConfig) };
      case (#assets) { buildAssets(config, buildConfig) };
    };
  };

  /// Build Motoko canister
  func buildMotoko(
    config : Types.CanisterConfig,
    buildConfig : Types.BuildConfig
  ) : BuildResult {
    let main = switch (config.main) {
      case (?m) { m };
      case (null) { 
        return #err({
          code = "E001";
          message = "Missing main file for Motoko canister";
          details = ?"Specify 'main' in canister config";
        });
      };
    };

    // Build command construction (executed by CLI)
    let outputDir = buildConfig.outputDir;
    let wasmPath = outputDir # "/" # config.name # ".wasm";
    let didPath = outputDir # "/" # config.name # ".did";
    let mostPath = outputDir # "/" # config.name # ".most";

    #ok({
      wasmPath = wasmPath;
      didPath = didPath;
      mostPath = ?mostPath;
      buildTime = Time.now();
      wasmSize = 0; // Calculated by CLI
    });
  };

  /// Build Rust canister (placeholder)
  func buildRust(
    config : Types.CanisterConfig,
    buildConfig : Types.BuildConfig
  ) : BuildResult {
    #err({
      code = "E002";
      message = "Rust canister builds not yet implemented";
      details = ?"Coming soon - use Motoko for now";
    });
  };

  /// Build assets canister
  func buildAssets(
    config : Types.CanisterConfig,
    buildConfig : Types.BuildConfig
  ) : BuildResult {
    let source = switch (config.source) {
      case (?s) { s };
      case (null) {
        return #err({
          code = "E003";
          message = "Missing source directory for assets canister";
          details = ?"Specify 'source' in canister config";
        });
      };
    };

    #ok({
      wasmPath = ""; // Assets use certified asset canister
      didPath = "";
      mostPath = null;
      buildTime = Time.now();
      wasmSize = 0;
    });
  };

  /// Generate MOC command for CLI execution
  public func generateMocCommand(
    mainFile : Text,
    outputDir : Text,
    canisterName : Text,
    extraArgs : [Text]
  ) : Text {
    let args = Buffer.Buffer<Text>(10);
    args.add("moc");
    
    // Add default args
    for (arg in DEFAULT_MOC_ARGS.vals()) {
      args.add(arg);
    };
    
    // Add extra args
    for (arg in extraArgs.vals()) {
      args.add(arg);
    };
    
    // Add output
    args.add("-o");
    args.add(outputDir # "/" # canisterName # ".wasm");
    
    // Add main file
    args.add(mainFile);
    
    Text.join(" ", args.vals());
  };

  /// Validate build output exists and is valid
  public func validateBuildOutput(output : BuildOutput) : Result.Result<(), BuildError> {
    if (output.wasmSize == 0) {
      return #err({
        code = "E004";
        message = "WASM file is empty or missing";
        details = ?"Build may have failed silently";
      });
    };
    #ok(());
  };
};
