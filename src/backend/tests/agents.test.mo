// Test suite for Agents library
// Run with: mops test

import Map "mo:core/Map";
import Set "mo:core/Set";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Debug "mo:core/Debug";
import AgentsLib "../lib/agents";
import Types "../types/agents";

// Test helpers
func assertTrue(condition : Bool, message : Text) {
  if (not condition) {
    Debug.trap("Assertion failed: " # message);
  };
};

func assertArrayContains(arr : [Text], item : Text, message : Text) {
  let found = arr.find(func(x) { x == item }) != null;
  if (not found) {
    Debug.trap("Array assertion failed: " # message);
  };
};

// Test: Seed Agents
func testSeedAgents() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  
  AgentsLib.seedAgents(agentStore);
  
  let agents = AgentsLib.getAll(agentStore);
  
  assertTrue(agents.size() == 6, "Should have 6 seeded agents");
  Debug.print("✓ testSeedAgents passed");
};

// Test: Get All Agents
func testGetAllAgents() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let agents = AgentsLib.getAll(agentStore);
  
  assertTrue(agents.size() > 0, "Should return agents");
  
  // Verify agent structure
  for (agent in agents.vals()) {
    assertTrue(agent.id.size() > 0, "Agent should have an ID");
    assertTrue(agent.name.size() > 0, "Agent should have a name");
    assertTrue(agent.engine == "SovereignResponses", "Agent should use SovereignResponses engine");
    assertTrue(agent.protocols.size() > 0, "Agent should have protocols");
  };
  Debug.print("✓ testGetAllAgents passed");
};

// Test: Get Agent By ID - Existing
func testGetAgentByIdExisting() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let result = AgentsLib.getById(agentStore, "ALPHA-1");
  
  switch (result) {
    case (?agent) {
      assertTrue(agent.id == "ALPHA-1", "ID should be ALPHA-1");
      assertTrue(agent.name == "Sage", "Name should be Sage");
      switch (agent.role) {
        case (#explainer) { /* expected */ };
        case _ { Debug.trap("Role should be explainer"); };
      };
    };
    case null {
      Debug.trap("Agent ALPHA-1 should exist");
    };
  };
  Debug.print("✓ testGetAgentByIdExisting passed");
};

// Test: Get Agent By ID - Non-existing
func testGetAgentByIdNonExisting() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let result = AgentsLib.getById(agentStore, "NON-EXISTENT");
  
  switch (result) {
    case (?_) {
      Debug.trap("Agent should not exist");
    };
    case null {
      // Expected
    };
  };
  Debug.print("✓ testGetAgentByIdNonExisting passed");
};

// Test: Get Agents By Workspace
func testGetAgentsByWorkspace() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let alphaAgents = AgentsLib.getByWorkspace(agentStore, "alpha");
  
  assertTrue(alphaAgents.size() == 6, "All seeded agents should be in alpha workspace");
  
  for (agent in alphaAgents.vals()) {
    assertTrue(agent.workspace == "alpha", "Agent workspace should be alpha");
  };
  Debug.print("✓ testGetAgentsByWorkspace passed");
};

// Test: Get Agents By Workspace - Empty
func testGetAgentsByWorkspaceEmpty() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let betaAgents = AgentsLib.getByWorkspace(agentStore, "beta");
  
  assertTrue(betaAgents.size() == 0, "No agents should be in beta workspace");
  Debug.print("✓ testGetAgentsByWorkspaceEmpty passed");
};

// Test: Get Agents By Protocol
func testGetAgentsByProtocol() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let conceptAgents = AgentsLib.getByProtocol(agentStore, "concept-explanation");
  
  assertTrue(conceptAgents.size() >= 1, "Should have at least one agent with concept-explanation protocol");
  
  for (agent in conceptAgents.vals()) {
    let hasProtocol = agent.protocols.find(func(p) { p == "concept-explanation" }) != null;
    assertTrue(hasProtocol, "Agent should have concept-explanation protocol");
  };
  Debug.print("✓ testGetAgentsByProtocol passed");
};

// Test: Get Agents By Protocol - Question Generation
func testGetAgentsByProtocolQuiz() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let quizAgents = AgentsLib.getByProtocol(agentStore, "question-generation");
  
  assertTrue(quizAgents.size() >= 1, "Should have at least one quiz agent");
  Debug.print("✓ testGetAgentsByProtocolQuiz passed");
};

// Test: Get Agents By Engine
func testGetAgentsByEngine() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let sovereignAgents = AgentsLib.getByEngine(agentStore, "SovereignResponses");
  
  assertTrue(sovereignAgents.size() == 6, "All agents should use SovereignResponses engine");
  Debug.print("✓ testGetAgentsByEngine passed");
};

// Test: Get Agents By Engine - Non-existing
func testGetAgentsByEngineNonExisting() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let otherAgents = AgentsLib.getByEngine(agentStore, "OtherEngine");
  
  assertTrue(otherAgents.size() == 0, "No agents should use OtherEngine");
  Debug.print("✓ testGetAgentsByEngineNonExisting passed");
};

// Test: List Workspaces
func testListWorkspaces() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let workspaces = AgentsLib.listWorkspaces(agentStore);
  
  assertTrue(workspaces.size() >= 1, "Should have at least one workspace");
  assertArrayContains(workspaces, "alpha", "Should include alpha workspace");
  Debug.print("✓ testListWorkspaces passed");
};

// Test: Verify Sage Agent
func testVerifySageAgent() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let result = AgentsLib.getById(agentStore, "ALPHA-1");
  
  switch (result) {
    case (?sage) {
      assertTrue(sage.name == "Sage", "Name should be Sage");
      switch (sage.role) {
        case (#explainer) { /* expected */ };
        case _ { Debug.trap("Sage should be an explainer"); };
      };
      assertArrayContains(sage.protocols, "concept-explanation", "Should have concept-explanation");
      assertArrayContains(sage.protocols, "socratic-dialogue", "Should have socratic-dialogue");
      assertTrue(sage.systemPrompt.size() > 50, "Should have detailed system prompt");
    };
    case null {
      Debug.trap("Sage should exist");
    };
  };
  Debug.print("✓ testVerifySageAgent passed");
};

// Test: Verify Quill Agent
func testVerifyQuillAgent() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let result = AgentsLib.getById(agentStore, "ALPHA-2");
  
  switch (result) {
    case (?quill) {
      assertTrue(quill.name == "Quill", "Name should be Quill");
      switch (quill.role) {
        case (#quizmaster) { /* expected */ };
        case _ { Debug.trap("Quill should be a quizmaster"); };
      };
      assertArrayContains(quill.protocols, "question-generation", "Should have question-generation");
      assertArrayContains(quill.protocols, "multiple-choice", "Should have multiple-choice");
    };
    case null {
      Debug.trap("Quill should exist");
    };
  };
  Debug.print("✓ testVerifyQuillAgent passed");
};

// Test: Verify Spark Agent
func testVerifySparkAgent() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let result = AgentsLib.getById(agentStore, "ALPHA-3");
  
  switch (result) {
    case (?spark) {
      assertTrue(spark.name == "Spark", "Name should be Spark");
      switch (spark.role) {
        case (#encourager) { /* expected */ };
        case _ { Debug.trap("Spark should be an encourager"); };
      };
      assertArrayContains(spark.protocols, "positive-reinforcement", "Should have positive-reinforcement");
      assertArrayContains(spark.protocols, "growth-mindset", "Should have growth-mindset");
    };
    case null {
      Debug.trap("Spark should exist");
    };
  };
  Debug.print("✓ testVerifySparkAgent passed");
};

// Test: Verify Atlas Agent (Guide)
func testVerifyAtlasAgent() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let result = AgentsLib.getById(agentStore, "ALPHA-4");
  
  switch (result) {
    case (?atlas) {
      assertTrue(atlas.name == "Atlas", "Name should be Atlas");
      switch (atlas.role) {
        case (#guide) { /* expected */ };
        case _ { Debug.trap("Atlas should be a guide"); };
      };
      assertArrayContains(atlas.protocols, "curriculum-navigation", "Should have curriculum-navigation");
    };
    case null {
      Debug.trap("Atlas should exist");
    };
  };
  Debug.print("✓ testVerifyAtlasAgent passed");
};

// Test: Verify Echo Agent (Assessor)
func testVerifyEchoAgent() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let result = AgentsLib.getById(agentStore, "ALPHA-5");
  
  switch (result) {
    case (?echo) {
      assertTrue(echo.name == "Echo", "Name should be Echo");
      switch (echo.role) {
        case (#assessor) { /* expected */ };
        case _ { Debug.trap("Echo should be an assessor"); };
      };
      assertArrayContains(echo.protocols, "diagnostic-assessment", "Should have diagnostic-assessment");
      assertArrayContains(echo.protocols, "gap-analysis", "Should have gap-analysis");
    };
    case null {
      Debug.trap("Echo should exist");
    };
  };
  Debug.print("✓ testVerifyEchoAgent passed");
};

// Test: Verify Nova Agent (Curator)
func testVerifyNovaAgent() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let result = AgentsLib.getById(agentStore, "ALPHA-6");
  
  switch (result) {
    case (?nova) {
      assertTrue(nova.name == "Nova", "Name should be Nova");
      switch (nova.role) {
        case (#curator) { /* expected */ };
        case _ { Debug.trap("Nova should be a curator"); };
      };
      assertArrayContains(nova.protocols, "content-curation", "Should have content-curation");
      assertArrayContains(nova.protocols, "teks-alignment", "Should have teks-alignment");
    };
    case null {
      Debug.trap("Nova should exist");
    };
  };
  Debug.print("✓ testVerifyNovaAgent passed");
};

// Test: Agent Version
func testAgentVersion() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let agents = AgentsLib.getAll(agentStore);
  
  for (agent in agents.vals()) {
    assertTrue(agent.version == "1.0.0", "All agents should be version 1.0.0");
  };
  Debug.print("✓ testAgentVersion passed");
};

// Test: Agent Active Status
func testAgentActiveStatus() {
  let agentStore : AgentsLib.AgentStore = Map.empty();
  AgentsLib.seedAgents(agentStore);
  
  let agents = AgentsLib.getAll(agentStore);
  
  for (agent in agents.vals()) {
    assertTrue(agent.isActive, "All seeded agents should be active");
  };
  Debug.print("✓ testAgentActiveStatus passed");
};

// Run all tests
func runTests() {
  Debug.print("Running Agents Library Tests...\n");
  
  testSeedAgents();
  testGetAllAgents();
  testGetAgentByIdExisting();
  testGetAgentByIdNonExisting();
  testGetAgentsByWorkspace();
  testGetAgentsByWorkspaceEmpty();
  testGetAgentsByProtocol();
  testGetAgentsByProtocolQuiz();
  testGetAgentsByEngine();
  testGetAgentsByEngineNonExisting();
  testListWorkspaces();
  testVerifySageAgent();
  testVerifyQuillAgent();
  testVerifySparkAgent();
  testVerifyAtlasAgent();
  testVerifyEchoAgent();
  testVerifyNovaAgent();
  testAgentVersion();
  testAgentActiveStatus();
  
  Debug.print("\n✅ All Agents Library tests passed!");
};

// Entry point for test runner
runTests();
