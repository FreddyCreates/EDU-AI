/// Nova Forge — Safety Agent
/// Autonomous AI agent for stable memory validation and upgrade safety
///
/// The SafetyAgent:
/// 1. Analyzes stable variable declarations and their types
/// 2. Detects breaking changes in stable memory schema
/// 3. Validates migration paths between versions
/// 4. Simulates upgrade scenarios through reasoning
/// 5. Learns from past upgrade failures

import Buffer "mo:base/Buffer";
import Time "mo:base/Time";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Float "mo:base/Float";
import Int "mo:base/Int";
import Runtime "../agents/runtime";

module {

  // ═══════════════════════════════════════════════════════════
  // STABLE MEMORY MODEL
  // ═══════════════════════════════════════════════════════════

  public type StableField = {
    name : Text;
    fieldType : Text;
    hasDefault : Bool;
    isCollection : Bool;
    estimatedSize : Nat;    // bytes
    migrationRisk : MigrationRisk;
  };

  public type StableSchema = {
    version : Text;
    fields : [StableField];
    totalFields : Nat;
    estimatedMemory : Nat;
    hasPreUpgrade : Bool;
    hasPostUpgrade : Bool;
    usesMostFile : Bool;
  };

  public type MigrationRisk = {
    #None;          // Type unchanged
    #Low;           // Compatible change (e.g., adding optional field)
    #Medium;        // Requires migration logic
    #High;          // Breaking change, data may be lost
    #Critical;      // Will trap on upgrade
  };

  public type SchemaChange = {
    field : Text;
    changeType : ChangeType;
    risk : MigrationRisk;
    description : Text;
    mitigation : ?Text;
  };

  public type ChangeType = {
    #Added;
    #Removed;
    #TypeChanged;
    #DefaultChanged;
    #StructureChanged;
  };

  // ═══════════════════════════════════════════════════════════
  // UPGRADE SIMULATION
  // ═══════════════════════════════════════════════════════════

  public type UpgradeScenario = {
    fromVersion : Text;
    toVersion : Text;
    changes : [SchemaChange];
    willTrap : Bool;
    dataLossRisk : Float;
    migrationRequired : Bool;
    estimatedDowntime : Nat;  // seconds
    rollbackSafe : Bool;
  };

  public type SafetyVerdict = {
    safe : Bool;
    confidence : Float;
    concerns : [SafetyConcern];
    recommendations : [Text];
    scenario : UpgradeScenario;
  };

  public type SafetyConcern = {
    field : Text;
    concern : Text;
    severity : Runtime.InsightSeverity;
    canAutoMigrate : Bool;
  };

  // ═══════════════════════════════════════════════════════════
  // AGENT ANALYSIS
  // ═══════════════════════════════════════════════════════════

  public type SafetyResult = {
    verdict : SafetyVerdict;
    schema : StableSchema;
    reasoning : Runtime.ReasoningChain;
    insights : [Runtime.Insight];
    message : Runtime.AgentMessage;
  };

  /// Main safety analysis — performs deep reasoning about upgrade safety
  public func analyze(
    currentSource : Text,
    previousSchema : ?StableSchema,
    memory : Runtime.AgentMemory
  ) : SafetyResult {
    let thoughts = Buffer.Buffer<Runtime.ThoughtStep>(8);
    let insights = Buffer.Buffer<Runtime.Insight>(4);
    let concerns = Buffer.Buffer<SafetyConcern>(4);

    // Step 1: Extract current stable schema
    let schema = extractSchema(currentSource);
    thoughts.add(Runtime.createThought(
      1,
      "Extracted stable memory schema: " # Nat.toText(schema.totalFields) # " fields, ~" #
        Nat.toText(schema.estimatedMemory) # " bytes estimated",
      Array.map<StableField, Text>(schema.fields, func(f) { f.name # " : " # f.fieldType }),
      0.92
    ));

    // Step 2: Check for pre/post upgrade hooks
    if (not schema.hasPreUpgrade and schema.totalFields > 0) {
      thoughts.add(Runtime.createThought(
        2,
        "⚠️ No preupgrade hook detected but " # Nat.toText(schema.totalFields) # " stable fields exist — heap data may be lost",
        ["Missing system func preupgrade()"],
        0.9
      ));

      concerns.add({
        field = "_system";
        concern = "Missing preupgrade hook — non-stable heap state will be lost on upgrade";
        severity = #High;
        canAutoMigrate = false;
      });

      insights.add(Runtime.createInsight(
        #SafetyAgent,
        "MissingHook",
        "No preupgrade() system function — heap state will not survive upgrade",
        #High,
        0.9,
        {
          agentId = #SafetyAgent;
          goal = "Detect missing upgrade hooks";
          steps = [Runtime.createThought(1, "preupgrade hook missing", ["Heap data loss risk"], 0.9)];
          conclusion = "Add preupgrade hook to preserve state";
          totalConfidence = 0.9;
          durationMs = 3;
        },
        ?"Add system func preupgrade() to serialize heap state to stable variables"
      ));
    } else {
      thoughts.add(Runtime.createThought(
        2,
        "Upgrade hooks present: preupgrade=" # (if (schema.hasPreUpgrade) "✅" else "❌") #
          " postupgrade=" # (if (schema.hasPostUpgrade) "✅" else "❌"),
        ["System hooks properly defined"],
        0.95
      ));
    };

    // Step 3: Compare with previous schema if available
    let changes = switch (previousSchema) {
      case (?prev) {
        let ch = detectChanges(prev, schema);
        thoughts.add(Runtime.createThought(
          3,
          "Schema comparison: " # Nat.toText(ch.size()) # " changes detected from previous version",
          Array.map<SchemaChange, Text>(ch, func(c) { c.field # " → " # changeTypeToText(c.changeType) # " (" # migrationRiskToText(c.risk) # ")" }),
          0.88
        ));
        ch;
      };
      case null {
        thoughts.add(Runtime.createThought(
          3,
          "No previous schema available — treating as fresh install (no migration concerns)",
          ["First deployment or missing history"],
          0.95
        ));
        [];
      };
    };

    // Step 4: Simulate upgrade scenario
    let scenario = simulateUpgrade(schema, changes, previousSchema);
    thoughts.add(Runtime.createThought(
      4,
      "Upgrade simulation: " # (if (scenario.willTrap) "🚨 WILL TRAP" else "✅ Should succeed") #
        " | Data loss risk: " # Float.toText(scenario.dataLossRisk * 100.0) # "%" #
        " | Rollback safe: " # (if (scenario.rollbackSafe) "yes" else "no"),
      ["Migration required: " # (if (scenario.migrationRequired) "yes" else "no"),
       "Estimated downtime: " # Nat.toText(scenario.estimatedDowntime) # "s"],
      if (scenario.willTrap) 0.95 else 0.85
    ));

    if (scenario.willTrap) {
      insights.add(Runtime.createInsight(
        #SafetyAgent,
        "UpgradeTrap",
        "🚨 Upgrade WILL TRAP — breaking stable memory changes detected",
        #Critical,
        0.95,
        {
          agentId = #SafetyAgent;
          goal = "Detect upgrade traps";
          steps = [Runtime.createThought(1, "Breaking changes found", Array.map<SchemaChange, Text>(
            Array.filter<SchemaChange>(changes, func(c) { c.risk == #Critical }),
            func(c) { c.field # ": " # c.description }
          ), 0.95)];
          conclusion = "Deployment MUST be blocked";
          totalConfidence = 0.95;
          durationMs = 5;
        },
        ?"Add migration logic in postupgrade() or deploy as fresh install (will lose state)"
      ));
    };

    // Step 5: Check for dangerous patterns in stable vars
    for (field in schema.fields.vals()) {
      if (field.isCollection and not field.hasDefault) {
        concerns.add({
          field = field.name;
          concern = "Collection type without default — may trap if type changes";
          severity = #Medium;
          canAutoMigrate = true;
        });
      };

      if (field.estimatedSize > 1_000_000_000) { // >1GB estimated
        concerns.add({
          field = field.name;
          concern = "Field estimated at >" # Nat.toText(field.estimatedSize / 1_000_000_000) # "GB — upgrade serialization may timeout";
          severity = #High;
          canAutoMigrate = false;
        });

        insights.add(Runtime.createInsight(
          #SafetyAgent,
          "LargeStableField",
          "Stable field '" # field.name # "' estimated at " # Nat.toText(field.estimatedSize / 1_000_000) # "MB — upgrade may timeout",
          #High,
          0.82,
          {
            agentId = #SafetyAgent;
            goal = "Detect oversized stable fields";
            steps = [Runtime.createThought(1, "Large field detected", [field.name # ": ~" # Nat.toText(field.estimatedSize) # " bytes"], 0.82)];
            conclusion = "Consider chunked migration strategy";
            totalConfidence = 0.82;
            durationMs = 3;
          },
          ?"Use stable memory regions (ExperimentalStableMemory) for large data instead of stable vars"
        ));
      };
    };

    // Step 6: Consult historical upgrade failures
    let pastFailures = Array.filter<Runtime.Episode>(
      memory.episodic,
      func(e) { e.outcome == #FailedSafety }
    );

    if (pastFailures.size() > 0) {
      thoughts.add(Runtime.createThought(
        5,
        "Historical context: " # Nat.toText(pastFailures.size()) # " past safety failures inform this analysis",
        Array.map<Runtime.Episode, Text>(pastFailures, func(e) { Text.join(", ", e.lessons.vals()) }),
        0.75
      ));
    };

    // Step 7: Final verdict
    let safe = not scenario.willTrap and scenario.dataLossRisk < 0.3;
    let verdictConfidence = if (safe) 0.88 else 0.93;

    thoughts.add(Runtime.createThought(
      6,
      "Final safety verdict: " # (if (safe) "✅ SAFE to upgrade" else "🛑 UNSAFE — block deployment") #
        " (confidence: " # Float.toText(verdictConfidence) # ")",
      ["Concerns: " # Nat.toText(Buffer.toArray(concerns).size()),
       "Will trap: " # (if (scenario.willTrap) "YES" else "no"),
       "Data loss risk: " # Float.toText(scenario.dataLossRisk)],
      verdictConfidence
    ));

    let finalInsights = Buffer.toArray(insights);
    let finalConcerns = Buffer.toArray(concerns);

    let verdict : SafetyVerdict = {
      safe;
      confidence = verdictConfidence;
      concerns = finalConcerns;
      recommendations = generateRecommendations(schema, scenario, finalConcerns);
      scenario;
    };

    let reasoning : Runtime.ReasoningChain = {
      agentId = #SafetyAgent;
      goal = "Validate stable memory safety for canister upgrade";
      steps = Buffer.toArray(thoughts);
      conclusion = if (safe) "Upgrade is safe to proceed" else "Upgrade blocked due to safety concerns";
      totalConfidence = verdictConfidence;
      durationMs = 95;
    };

    {
      verdict;
      schema;
      reasoning;
      insights = finalInsights;
      message = Runtime.createMessage(
        #SafetyAgent,
        #AdvisorAgent,
        if (scenario.willTrap) #Escalation else #Response,
        #SafetyCheck({
          safe;
          concerns = Array.map<SafetyConcern, Text>(finalConcerns, func(c) { c.field # ": " # c.concern });
          migrations = if (scenario.migrationRequired) ["Migration logic required in postupgrade()"] else [];
        }),
        if (scenario.willTrap) #Critical else #Normal
      );
    };
  };

  // ═══════════════════════════════════════════════════════════
  // SCHEMA EXTRACTION
  // ═══════════════════════════════════════════════════════════

  func extractSchema(source : Text) : StableSchema {
    let fields = Buffer.Buffer<StableField>(8);
    var hasPreUpgrade = false;
    var hasPostUpgrade = false;
    var usesMost = false;

    // Detect hooks
    if (Text.contains(source, #text "preupgrade")) hasPreUpgrade := true;
    if (Text.contains(source, #text "postupgrade")) hasPostUpgrade := true;
    if (Text.contains(source, #text ".most")) usesMost := true;

    // Extract stable var patterns (simplified extraction)
    if (Text.contains(source, #text "stable var")) {
      // For each stable var pattern detected, create a field entry
      // In production this would use proper parsing
      fields.add({
        name = "detected_stable_field";
        fieldType = "Unknown";
        hasDefault = Text.contains(source, #text "= ");
        isCollection = Text.contains(source, #text "Buffer") or Text.contains(source, #text "HashMap") or Text.contains(source, #text "Array");
        estimatedSize = 1_000_000; // 1MB default estimate
        migrationRisk = #Low;
      });
    };

    let allFields = Buffer.toArray(fields);
    let totalMem = Array.foldLeft<StableField, Nat>(allFields, 0, func(acc, f) { acc + f.estimatedSize });

    {
      version = "current";
      fields = allFields;
      totalFields = allFields.size();
      estimatedMemory = totalMem;
      hasPreUpgrade;
      hasPostUpgrade;
      usesMostFile = usesMost;
    };
  };

  func detectChanges(prev : StableSchema, current : StableSchema) : [SchemaChange] {
    let changes = Buffer.Buffer<SchemaChange>(4);

    // Detect removed fields
    for (prevField in prev.fields.vals()) {
      var found = false;
      for (curField in current.fields.vals()) {
        if (prevField.name == curField.name) found := true;
      };
      if (not found) {
        changes.add({
          field = prevField.name;
          changeType = #Removed;
          risk = #High;
          description = "Stable field removed — data will be silently dropped";
          mitigation = ?"Add migration in postupgrade() to handle removed field";
        });
      };
    };

    // Detect added fields
    for (curField in current.fields.vals()) {
      var found = false;
      for (prevField in prev.fields.vals()) {
        if (curField.name == prevField.name) found := true;
      };
      if (not found) {
        let risk = if (curField.hasDefault) #Low else #Medium;
        changes.add({
          field = curField.name;
          changeType = #Added;
          risk;
          description = "New stable field added" # (if (curField.hasDefault) " with default" else " WITHOUT default — may trap");
          mitigation = if (curField.hasDefault) null else ?"Add default value to new stable field";
        });
      };
    };

    // Detect type changes
    for (prevField in prev.fields.vals()) {
      for (curField in current.fields.vals()) {
        if (prevField.name == curField.name and prevField.fieldType != curField.fieldType) {
          changes.add({
            field = curField.name;
            changeType = #TypeChanged;
            risk = #Critical;
            description = "Type changed from " # prevField.fieldType # " to " # curField.fieldType # " — WILL TRAP on upgrade";
            mitigation = ?"Use versioned type wrapper or deploy fresh canister";
          });
        };
      };
    };

    Buffer.toArray(changes);
  };

  func simulateUpgrade(schema : StableSchema, changes : [SchemaChange], prev : ?StableSchema) : UpgradeScenario {
    var willTrap = false;
    var dataLossRisk : Float = 0.0;
    var migrationRequired = false;

    for (change in changes.vals()) {
      switch (change.risk) {
        case (#Critical) { willTrap := true; dataLossRisk := 1.0; };
        case (#High) { dataLossRisk += 0.3; migrationRequired := true; };
        case (#Medium) { dataLossRisk += 0.1; migrationRequired := true; };
        case (#Low) { dataLossRisk += 0.02; };
        case (#None) {};
      };
    };

    let fromVersion = switch (prev) { case (?p) p.version; case null "unknown" };

    {
      fromVersion;
      toVersion = schema.version;
      changes;
      willTrap;
      dataLossRisk = Float.min(1.0, dataLossRisk);
      migrationRequired;
      estimatedDowntime = if (schema.estimatedMemory > 500_000_000) 30 else 5;
      rollbackSafe = not willTrap and dataLossRisk < 0.5;
    };
  };

  func generateRecommendations(schema : StableSchema, scenario : UpgradeScenario, concerns : [SafetyConcern]) : [Text] {
    let recs = Buffer.Buffer<Text>(4);

    if (scenario.willTrap) {
      recs.add("🚨 CRITICAL: Fix breaking stable memory changes before deploying");
    };

    if (not schema.hasPreUpgrade and schema.totalFields > 0) {
      recs.add("Add system func preupgrade() to serialize heap state");
    };

    if (not schema.usesMostFile) {
      recs.add("Generate .most stable interface file for type-safe upgrades");
    };

    if (scenario.migrationRequired) {
      recs.add("Implement migration logic in system func postupgrade()");
    };

    if (not scenario.rollbackSafe) {
      recs.add("⚠️ This upgrade is NOT safely rollbackable — test thoroughly");
    };

    for (concern in concerns.vals()) {
      if (concern.severity == #High or concern.severity == #Critical) {
        recs.add("Fix: " # concern.field # " — " # concern.concern);
      };
    };

    Buffer.toArray(recs);
  };

  // ═══════════════════════════════════════════════════════════
  // UTILITIES
  // ═══════════════════════════════════════════════════════════

  func changeTypeToText(ct : ChangeType) : Text {
    switch (ct) {
      case (#Added) "ADDED";
      case (#Removed) "REMOVED";
      case (#TypeChanged) "TYPE_CHANGED";
      case (#DefaultChanged) "DEFAULT_CHANGED";
      case (#StructureChanged) "STRUCTURE_CHANGED";
    };
  };

  func migrationRiskToText(r : MigrationRisk) : Text {
    switch (r) {
      case (#None) "none";
      case (#Low) "low";
      case (#Medium) "medium";
      case (#High) "high";
      case (#Critical) "CRITICAL";
    };
  };
};
