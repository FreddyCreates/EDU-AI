/// Nova Forge - AI Deployment Advisor
/// Intelligent recommendations for ICP mainnet deployment

import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Buffer "mo:core/Buffer";
import Time "mo:core/Time";

import Types "../types/config";
import Scanner "scanner";
import Estimator "estimator";
import Cycles "../core/cycles";

module {
  /// Deployment readiness assessment
  public type ReadinessAssessment = {
    ready : Bool;
    score : Nat;           // 0-100
    blockers : [Blocker];
    warnings : [Warning];
    suggestions : [Suggestion];
    summary : Text;
  };

  /// Something that blocks deployment
  public type Blocker = {
    id : Text;
    title : Text;
    description : Text;
    resolution : Text;
  };

  /// Non-blocking warning
  public type Warning = {
    id : Text;
    title : Text;
    description : Text;
    impact : Text;
  };

  /// Helpful suggestion
  public type Suggestion = {
    id : Text;
    title : Text;
    description : Text;
    benefit : Text;
    priority : SuggestionPriority;
  };

  /// Suggestion priority
  public type SuggestionPriority = {
    #high;
    #medium;
    #low;
  };

  /// Deployment timing recommendation
  public type TimingAdvice = {
    recommended : Bool;
    reason : Text;
    bestTime : ?Text;
  };

  // ═══════════════════════════════════════════════════════════════
  // ADVISOR FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  /// Assess deployment readiness
  public func assessReadiness(
    scanReport : Types.ScanReport,
    cycleEstimate : Cycles.CycleEstimate,
    currentCycles : Nat,
    config : Types.AIConfig
  ) : ReadinessAssessment {
    let blockers = Buffer.Buffer<Blocker>(5);
    let warnings = Buffer.Buffer<Warning>(5);
    let suggestions = Buffer.Buffer<Suggestion>(5);
    var score : Nat = 100;

    // Check security scan
    if (not scanReport.passed) {
      blockers.add({
        id = "BLK-001";
        title = "Security Scan Failed";
        description = "The security scan found critical issues that must be resolved";
        resolution = "Review and fix all errors in the scan report";
      });
      score := 0;
    } else if (scanReport.warnings.size() > 0) {
      let warningPenalty = Nat.min(30, scanReport.warnings.size() * 5);
      score -= warningPenalty;
      
      warnings.add({
        id = "WRN-001";
        title = "Security Warnings Present";
        description = Nat.toText(scanReport.warnings.size()) # " warnings found in security scan";
        impact = "May indicate potential issues in production";
      });
    };

    // Check cycle sufficiency
    if (currentCycles < cycleEstimate.recommended) {
      let deficit = cycleEstimate.recommended - currentCycles;
      
      if (currentCycles < Cycles.MINIMUM_CYCLES) {
        blockers.add({
          id = "BLK-002";
          title = "Insufficient Cycles";
          description = "Current cycle balance is below minimum deployment threshold";
          resolution = "Top up wallet with at least " # Cycles.formatCycles(deficit) # " cycles";
        });
        score := 0;
      } else {
        warnings.add({
          id = "WRN-002";
          title = "Low Cycle Balance";
          description = "Cycle balance is below recommended amount";
          impact = "Canister may run out of cycles within " # estimateRunway(currentCycles, cycleEstimate.monthly);
        });
        score -= 20;
      };
    };

    // Check upgrade safety if enabled
    if (config.upgradeSafetyCheck) {
      suggestions.add({
        id = "SUG-001";
        title = "Test Upgrade Path";
        description = "Run upgrade compatibility check with previous stable memory schema";
        benefit = "Prevents data loss during upgrades";
        priority = #high;
      });
    };

    // General suggestions
    if (scanReport.warnings.size() == 0 and score >= 80) {
      suggestions.add({
        id = "SUG-002";
        title = "Consider Monitoring";
        description = "Set up cycle monitoring for production canister";
        benefit = "Early warning of cycle depletion";
        priority = #medium;
      });
    };

    if (cycleEstimate.confidence < 0.8) {
      warnings.add({
        id = "WRN-003";
        title = "Low Estimation Confidence";
        description = "AI cycle estimation has lower than 80% confidence";
        impact = "Actual costs may differ significantly from estimates";
      });
      score -= 10;
    };

    let summary = generateSummary(score, Buffer.toArray(blockers), Buffer.toArray(warnings));

    {
      ready = blockers.size() == 0;
      score = score;
      blockers = Buffer.toArray(blockers);
      warnings = Buffer.toArray(warnings);
      suggestions = Buffer.toArray(suggestions);
      summary = summary;
    };
  };

  /// Estimate runway from cycles
  func estimateRunway(balance : Nat, monthlyBurn : Nat) : Text {
    if (monthlyBurn == 0) { return "indefinitely" };
    
    let months = balance / monthlyBurn;
    if (months < 1) {
      Nat.toText((balance * 30) / monthlyBurn) # " days"
    } else if (months < 12) {
      Nat.toText(months) # " months"
    } else {
      Nat.toText(months / 12) # " years"
    };
  };

  /// Generate assessment summary
  func generateSummary(
    score : Nat,
    blockers : [Blocker],
    warnings : [Warning]
  ) : Text {
    if (blockers.size() > 0) {
      "🛑 DEPLOYMENT BLOCKED - " # Nat.toText(blockers.size()) # " issue(s) must be resolved"
    } else if (score >= 90) {
      "✅ READY FOR MAINNET - All systems go!"
    } else if (score >= 70) {
      "⚠️ PROCEED WITH CAUTION - " # Nat.toText(warnings.size()) # " warning(s) to review"
    } else {
      "🟡 REVIEW RECOMMENDED - Score: " # Nat.toText(score) # "/100"
    };
  };

  /// Get deployment timing advice
  public func getTimingAdvice() : TimingAdvice {
    // Note: In production, this would check IC network conditions
    {
      recommended = true;
      reason = "Current network conditions appear stable";
      bestTime = ?"Deploy during low-traffic hours (UTC 2:00-8:00) for optimal performance";
    };
  };

  /// Generate pre-deployment checklist
  public func generateChecklist(
    assessment : ReadinessAssessment
  ) : [ChecklistItem] {
    let items = Buffer.Buffer<ChecklistItem>(10);

    // Security items
    items.add({
      item = "Security scan passed";
      checked = assessment.blockers.size() == 0 or not hasBlocker(assessment.blockers, "BLK-001");
      critical = true;
    });

    // Cycle items
    items.add({
      item = "Sufficient cycles allocated";
      checked = not hasBlocker(assessment.blockers, "BLK-002");
      critical = true;
    });

    // Optional items
    items.add({
      item = "Backup of current canister state";
      checked = false;
      critical = false;
    });

    items.add({
      item = "Rollback plan documented";
      checked = false;
      critical = false;
    });

    items.add({
      item = "Team notified of deployment";
      checked = false;
      critical = false;
    });

    Buffer.toArray(items);
  };

  /// Checklist item
  public type ChecklistItem = {
    item : Text;
    checked : Bool;
    critical : Bool;
  };

  /// Check if blocker exists
  func hasBlocker(blockers : [Blocker], id : Text) : Bool {
    for (b in blockers.vals()) {
      if (b.id == id) { return true };
    };
    false;
  };

  /// Format readiness assessment for display
  public func formatAssessment(assessment : ReadinessAssessment) : Text {
    var output = "🎯 DEPLOYMENT READINESS ASSESSMENT\n";
    output #= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    output #= assessment.summary # "\n";
    output #= "Score: " # Nat.toText(assessment.score) # "/100\n\n";

    if (assessment.blockers.size() > 0) {
      output #= "🛑 BLOCKERS:\n";
      for (blocker in assessment.blockers.vals()) {
        output #= "  [" # blocker.id # "] " # blocker.title # "\n";
        output #= "    " # blocker.description # "\n";
        output #= "    → " # blocker.resolution # "\n\n";
      };
    };

    if (assessment.warnings.size() > 0) {
      output #= "⚠️ WARNINGS:\n";
      for (warning in assessment.warnings.vals()) {
        output #= "  [" # warning.id # "] " # warning.title # "\n";
        output #= "    " # warning.description # "\n";
        output #= "    Impact: " # warning.impact # "\n\n";
      };
    };

    if (assessment.suggestions.size() > 0) {
      output #= "💡 SUGGESTIONS:\n";
      for (suggestion in assessment.suggestions.vals()) {
        let priority = switch (suggestion.priority) {
          case (#high) { "🔴" };
          case (#medium) { "🟡" };
          case (#low) { "🟢" };
        };
        output #= "  " # priority # " " # suggestion.title # "\n";
        output #= "    " # suggestion.description # "\n";
        output #= "    Benefit: " # suggestion.benefit # "\n\n";
      };
    };

    output #= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    
    if (assessment.ready) {
      output #= "🚀 Ready to deploy with: nova deploy --confirm\n";
    } else {
      output #= "❌ Resolve blockers before deploying\n";
    };

    output;
  };

  /// Generate deployment recommendation
  public func recommend(
    assessment : ReadinessAssessment,
    timing : TimingAdvice
  ) : Text {
    if (not assessment.ready) {
      return "❌ DO NOT DEPLOY - Blockers must be resolved first";
    };

    if (assessment.score >= 90) {
      "✅ RECOMMENDED: Deploy now - all checks passed"
    } else if (assessment.score >= 70) {
      "🟡 CONDITIONAL: Review warnings before deploying"
    } else {
      "⚠️ CAUTION: Consider addressing issues before mainnet deployment"
    };
  };
};
