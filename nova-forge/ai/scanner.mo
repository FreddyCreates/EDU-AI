/// Nova Forge - AI Security Scanner
/// Pre-deployment security analysis for ICP mainnet

import Array "mo:core/Array";
import Text "mo:core/Text";
import Result "mo:core/Result";
import Buffer "mo:core/Buffer";

import Types "../types/config";

module {
  /// Scan result
  public type ScanResult = Result.Result<Types.ScanReport, ScanError>;

  /// Scanner error
  public type ScanError = {
    code : Text;
    message : Text;
  };

  /// Vulnerability severity
  public type Severity = {
    #critical;  // Must fix before deploy
    #high;      // Should fix
    #medium;    // Recommended fix
    #low;       // Advisory
    #info;      // Informational
  };

  /// Vulnerability category
  public type VulnCategory = {
    #accessControl;     // Unauthorized access risks
    #cyclesDrain;       // Cycle drainage attacks
    #memoryLeak;        // Memory management issues
    #upgradeUnsafe;     // Breaking stable memory
    #trapRisk;          // Potential trap conditions
    #reentrancy;        // Reentrancy vulnerabilities
    #inputValidation;   // Missing input validation
    #cryptographic;     // Crypto weaknesses
    #informational;     // General issues
  };

  /// Known vulnerability pattern
  public type VulnPattern = {
    id : Text;
    name : Text;
    category : VulnCategory;
    severity : Severity;
    pattern : Text;        // Pattern to match
    description : Text;
    recommendation : Text;
  };

  // ═══════════════════════════════════════════════════════════════
  // VULNERABILITY DATABASE
  // ═══════════════════════════════════════════════════════════════

  /// Known vulnerability patterns for Motoko
  public let VULN_PATTERNS : [VulnPattern] = [
    {
      id = "NF-001";
      name = "Unrestricted Controller Access";
      category = #accessControl;
      severity = #critical;
      pattern = "shared.*func.*controller";
      description = "Controller-level functions may be accessible to non-controllers";
      recommendation = "Add explicit caller validation: assert(Principal.isController(caller))";
    },
    {
      id = "NF-002";
      name = "Missing Principal Validation";
      category = #accessControl;
      severity = #high;
      pattern = "shared.*msg.*caller";
      description = "Function uses caller but may not validate it";
      recommendation = "Validate caller against expected principals or roles";
    },
    {
      id = "NF-003";
      name = "Unbounded Array Growth";
      category = #memoryLeak;
      severity = #high;
      pattern = "Array\\.append|Buffer\\.add";
      description = "Unbounded collection growth can exhaust canister memory";
      recommendation = "Implement size limits or use paginated storage";
    },
    {
      id = "NF-004";
      name = "Stable Memory Migration Risk";
      category = #upgradeUnsafe;
      severity = #critical;
      pattern = "stable var";
      description = "Stable variables require careful migration during upgrades";
      recommendation = "Document stable memory schema and test upgrade paths";
    },
    {
      id = "NF-005";
      name = "Potential Trap on Division";
      category = #trapRisk;
      severity = #medium;
      pattern = "/|%";
      description = "Division or modulo without zero check can trap";
      recommendation = "Add explicit zero checks before division operations";
    },
    {
      id = "NF-006";
      name = "Async Call Without Error Handling";
      category = #trapRisk;
      severity = #high;
      pattern = "await.*[^try]";
      description = "Async calls should handle potential failures";
      recommendation = "Use try/catch for inter-canister calls";
    },
    {
      id = "NF-007";
      name = "Cycles Acceptance Without Limits";
      category = #cyclesDrain;
      severity = #medium;
      pattern = "Cycles\\.accept";
      description = "Accepting cycles without validation";
      recommendation = "Validate cycle amounts and set acceptance limits";
    },
    {
      id = "NF-008";
      name = "Open Query Endpoint";
      category = #informational;
      severity = #low;
      pattern = "public query func";
      description = "Query functions are publicly accessible";
      recommendation = "Consider if data exposure is intentional";
    },
  ];

  // ═══════════════════════════════════════════════════════════════
  // SCANNING FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  /// Analyze source code for vulnerabilities
  public func analyzeSource(
    sourceFiles : [(Text, Text)],  // (filename, content)
    securityLevel : Types.SecurityLevel
  ) : Types.ScanReport {
    let warnings = Buffer.Buffer<Types.ScanWarning>(10);
    let errors = Buffer.Buffer<Types.ScanError>(5);
    var passed = true;

    for ((filename, content) in sourceFiles.vals()) {
      for (pattern in VULN_PATTERNS.vals()) {
        if (Text.contains(content, #text(pattern.pattern))) {
          let finding = createFinding(pattern, filename);
          
          switch (pattern.severity) {
            case (#critical) {
              errors.add({
                code = pattern.id;
                message = pattern.name # " in " # filename;
                location = ?filename;
                fatal = true;
              });
              passed := false;
            };
            case (#high) {
              switch (securityLevel) {
                case (#strict) {
                  errors.add({
                    code = pattern.id;
                    message = pattern.name # " in " # filename;
                    location = ?filename;
                    fatal = false;
                  });
                  passed := false;
                };
                case (_) {
                  warnings.add(finding);
                };
              };
            };
            case (_) {
              warnings.add(finding);
            };
          };
        };
      };
    };

    let recommendations = generateRecommendations(
      Buffer.toArray(warnings), 
      Buffer.toArray(errors)
    );

    {
      passed = passed;
      warnings = Buffer.toArray(warnings);
      errors = Buffer.toArray(errors);
      cycleEstimate = 0; // Filled by estimator
      recommendations = recommendations;
    };
  };

  /// Create a warning from vulnerability pattern
  func createFinding(pattern : VulnPattern, filename : Text) : Types.ScanWarning {
    let severityNum = switch (pattern.severity) {
      case (#critical) { 5 };
      case (#high) { 4 };
      case (#medium) { 3 };
      case (#low) { 2 };
      case (#info) { 1 };
    };

    {
      code = pattern.id;
      message = pattern.name # ": " # pattern.description;
      location = ?filename;
      severity = severityNum;
    };
  };

  /// Generate recommendations based on findings
  func generateRecommendations(
    warnings : [Types.ScanWarning],
    errors : [Types.ScanError]
  ) : [Text] {
    let recs = Buffer.Buffer<Text>(5);

    if (errors.size() > 0) {
      recs.add("🚨 Address all errors before deploying to mainnet");
    };

    if (warnings.size() > 3) {
      recs.add("⚠️ Consider a security audit - multiple warnings detected");
    };

    // Add specific recommendations based on patterns found
    for (warning in warnings.vals()) {
      for (pattern in VULN_PATTERNS.vals()) {
        if (pattern.id == warning.code) {
          recs.add("💡 " # pattern.recommendation);
        };
      };
    };

    if (recs.size() == 0) {
      recs.add("✅ No critical issues found - ready for mainnet");
    };

    Buffer.toArray(recs);
  };

  /// Format scan report for display
  public func formatReport(report : Types.ScanReport) : Text {
    var output = "🔍 NOVA FORGE SECURITY SCAN\n";
    output #= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    
    if (report.passed) {
      output #= "✅ PASSED\n";
    } else {
      output #= "❌ FAILED\n";
    };
    
    output #= "\n";

    if (report.errors.size() > 0) {
      output #= "ERRORS (" # debug_show(report.errors.size()) # "):\n";
      for (error in report.errors.vals()) {
        output #= "  ❌ [" # error.code # "] " # error.message # "\n";
      };
      output #= "\n";
    };

    if (report.warnings.size() > 0) {
      output #= "WARNINGS (" # debug_show(report.warnings.size()) # "):\n";
      for (warning in report.warnings.vals()) {
        output #= "  ⚠️  [" # warning.code # "] " # warning.message # "\n";
      };
      output #= "\n";
    };

    output #= "RECOMMENDATIONS:\n";
    for (rec in report.recommendations.vals()) {
      output #= "  " # rec # "\n";
    };

    output #= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    output;
  };
};
