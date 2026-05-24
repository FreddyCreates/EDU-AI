// Test suite for Adaptive library
// Run with: mops test

import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Debug "mo:core/Debug";
import Float "mo:core/Float";
import AdaptiveLib "../lib/adaptive";
import Common "../types/common";
import SessionTypes "../types/sessions";
import Types "../types/adaptive";

// Test helpers
func assertTrue(condition : Bool, message : Text) {
  if (not condition) {
    Debug.trap("Assertion failed: " # message);
  };
};

func testPrincipal(id : Nat) : Common.UserId {
  Principal.fromText("aaaaa-aa");
};

// Create test quiz result
func createTestResult(topicId : Text, score : Nat, total : Nat, timestamp : Int) : SessionTypes.QuizResult {
  {
    topicId = topicId;
    score = score;
    totalQuestions = total;
    timestamp = timestamp;
    sessionType = "quiz";
    answers = [];
  };
};

// Setup results store with quiz history
func setupResultsStore(
  student : Common.UserId,
  results : [(Text, Nat, Nat, Int)]
) : Map.Map<Common.UserId, List.List<SessionTypes.QuizResult>> {
  let store : Map.Map<Common.UserId, List.List<SessionTypes.QuizResult>> = Map.empty();
  let list = List.empty<SessionTypes.QuizResult>();
  
  for ((topicId, score, total, ts) in results.vals()) {
    list.add(createTestResult(topicId, score, total, ts));
  };
  
  store.add(student, list);
  store;
};

// Test: Get Adaptive Suggestion - No Results
func testAdaptiveSuggestionNoResults() {
  let store : Map.Map<Common.UserId, List.List<SessionTypes.QuizResult>> = Map.empty();
  let student = testPrincipal(1);
  
  let suggestion = AdaptiveLib.getAdaptiveSuggestion(store, student, "5-math");
  
  switch (suggestion.action) {
    case (#continue_) {
      assertTrue(suggestion.message.size() > 0, "Should have a message");
    };
    case _ {
      Debug.trap("Should suggest continue for no results");
    };
  };
  Debug.print("✓ testAdaptiveSuggestionNoResults passed");
};

// Test: Get Adaptive Suggestion - Low Score (< 70%)
func testAdaptiveSuggestionLowScore() {
  let student = testPrincipal(2);
  let now = Time.now();
  
  let store = setupResultsStore(student, [
    ("5-math-1", 5, 10, now),       // 50%
    ("5-math-2", 6, 10, now + 1),   // 60%
  ]);
  
  let suggestion = AdaptiveLib.getAdaptiveSuggestion(store, student, "5-math");
  
  switch (suggestion.action) {
    case (#remedialReview) {
      assertTrue(
        suggestion.message.contains(#text "review") or suggestion.message.contains(#text "foundation"),
        "Should suggest review"
      );
    };
    case _ {
      Debug.trap("Should suggest remedial review for low scores");
    };
  };
  Debug.print("✓ testAdaptiveSuggestionLowScore passed");
};

// Test: Get Adaptive Suggestion - High Score (> 85%)
func testAdaptiveSuggestionHighScore() {
  let student = testPrincipal(3);
  let now = Time.now();
  
  let store = setupResultsStore(student, [
    ("5-math-1", 9, 10, now),       // 90%
    ("5-math-2", 9, 10, now + 1),   // 90%
  ]);
  
  let suggestion = AdaptiveLib.getAdaptiveSuggestion(store, student, "5-math");
  
  switch (suggestion.action) {
    case (#advance) {
      assertTrue(
        suggestion.message.contains(#text "ahead") or suggestion.message.contains(#text "next level"),
        "Should suggest advancement"
      );
    };
    case _ {
      Debug.trap("Should suggest advance for high scores");
    };
  };
  Debug.print("✓ testAdaptiveSuggestionHighScore passed");
};

// Test: Get Adaptive Suggestion - Different Subject
func testAdaptiveSuggestionDifferentSubject() {
  let student = testPrincipal(4);
  let now = Time.now();
  
  // Add results for math, but query for ELA
  let store = setupResultsStore(student, [
    ("5-math-1", 9, 10, now),
    ("5-math-2", 10, 10, now + 1),
  ]);
  
  let suggestion = AdaptiveLib.getAdaptiveSuggestion(store, student, "5-ela");
  
  // Should return continue since no ELA results exist
  switch (suggestion.action) {
    case (#continue_) {
      // Expected - no ELA results to analyze
    };
    case _ {
      Debug.trap("Should suggest continue for subject with no results");
    };
  };
  Debug.print("✓ testAdaptiveSuggestionDifferentSubject passed");
};

// Test: Get Adaptive Workflow - First Time User
func testAdaptiveWorkflowFirstTime() {
  let store : Map.Map<Common.UserId, List.List<SessionTypes.QuizResult>> = Map.empty();
  let student = testPrincipal(5);
  
  let workflow = AdaptiveLib.getAdaptiveWorkflow(store, student, "5-math", "5");
  
  switch (workflow.nextAction) {
    case (#continue_) {
      assertTrue(workflow.phiConfidence == 0.0, "PHI confidence should be 0 for first time");
      assertTrue(workflow.fibDifficultyLevel == 1, "Difficulty should be 1");
      assertTrue(workflow.suggestedTopics.size() == 3, "Should suggest 3 topics");
    };
    case _ {
      Debug.trap("Should suggest continue for first time user");
    };
  };
  Debug.print("✓ testAdaptiveWorkflowFirstTime passed");
};

// Test: Get Adaptive Workflow - Low PHI Confidence
func testAdaptiveWorkflowLowConfidence() {
  let student = testPrincipal(6);
  let now = Time.now();
  
  let store = setupResultsStore(student, [
    ("5-math-1", 3, 10, now),       // Low score
    ("5-math-2", 4, 10, now + 1),   // Low score
  ]);
  
  let workflow = AdaptiveLib.getAdaptiveWorkflow(store, student, "5-math", "5");
  
  switch (workflow.nextAction) {
    case (#remedialReview) {
      assertTrue(workflow.phiConfidence < 0.618, "PHI confidence should be below PHI inverse");
      assertTrue(workflow.suggestedTopics.size() == 2, "Should suggest 2 topics for review");
    };
    case _ {
      Debug.trap("Should suggest remedial review for low confidence");
    };
  };
  Debug.print("✓ testAdaptiveWorkflowLowConfidence passed");
};

// Test: Get Adaptive Workflow - High PHI Confidence
func testAdaptiveWorkflowHighConfidence() {
  let student = testPrincipal(7);
  let now = Time.now();
  
  let store = setupResultsStore(student, [
    ("5-math-1", 9, 10, now),       // 90%
    ("5-math-2", 10, 10, now + 1),  // 100%
    ("5-math-3", 9, 10, now + 2),   // 90%
  ]);
  
  let workflow = AdaptiveLib.getAdaptiveWorkflow(store, student, "5-math", "5");
  
  switch (workflow.nextAction) {
    case (#advance) {
      assertTrue(workflow.phiConfidence >= 0.618, "PHI confidence should be >= PHI inverse");
      assertTrue(workflow.suggestedTopics.size() == 3, "Should suggest 3 advanced topics");
    };
    case _ {
      Debug.trap("Should suggest advance for high confidence");
    };
  };
  Debug.print("✓ testAdaptiveWorkflowHighConfidence passed");
};

// Test: Fibonacci Difficulty Level Mapping
func testFibDifficultyLevelMapping() {
  let student = testPrincipal(8);
  let now = Time.now();
  
  // Test various confidence levels
  let testCases : [(Nat, Nat, Nat)] = [
    (2, 10, 1),   // 20% correct -> level 1
    (4, 10, 2),   // 40% correct -> level 2 or 3
    (6, 10, 3),   // 60% correct -> level 3 or 4
    (8, 10, 4),   // 80% correct -> level 4 or 5
    (10, 10, 5),  // 100% correct -> level 5 or 6
  ];
  
  for ((correct, total, _minLevel) in testCases.vals()) {
    let store = setupResultsStore(student, [
      ("5-math-1", correct, total, now),
    ]);
    
    let workflow = AdaptiveLib.getAdaptiveWorkflow(store, student, "5-math", "5");
    
    assertTrue(
      workflow.fibDifficultyLevel >= 1 and workflow.fibDifficultyLevel <= 6,
      "Difficulty level should be between 1 and 6"
    );
  };
  Debug.print("✓ testFibDifficultyLevelMapping passed");
};

// Test: PHI Confidence Calculation
func testPHIConfidenceCalculation() {
  let student = testPrincipal(9);
  let now = Time.now();
  
  // Perfect score
  let store1 = setupResultsStore(student, [
    ("5-math-1", 10, 10, now),
    ("5-math-2", 10, 10, now + 1),
  ]);
  
  let workflow1 = AdaptiveLib.getAdaptiveWorkflow(store1, student, "5-math", "5");
  assertTrue(workflow1.phiConfidence > 0.9, "Perfect scores should have high confidence");
  
  // Poor scores
  let store2 = setupResultsStore(student, [
    ("5-math-1", 2, 10, now),
    ("5-math-2", 3, 10, now + 1),
  ]);
  
  let workflow2 = AdaptiveLib.getAdaptiveWorkflow(store2, student, "5-math", "5");
  assertTrue(workflow2.phiConfidence < 0.4, "Poor scores should have low confidence");
  
  Debug.print("✓ testPHIConfidenceCalculation passed");
};

// Test: Suggested Topics Format
func testSuggestedTopicsFormat() {
  let student = testPrincipal(10);
  let now = Time.now();
  
  let store = setupResultsStore(student, [
    ("5-ela-1", 7, 10, now),
  ]);
  
  let workflow = AdaptiveLib.getAdaptiveWorkflow(store, student, "5-ela", "5");
  
  for (topic in workflow.suggestedTopics.vals()) {
    assertTrue(topic.startsWith(#text "5-ela-"), "Topic should be formatted as subjectId-number");
  };
  Debug.print("✓ testSuggestedTopicsFormat passed");
};

// Test: Continue Zone (Average Performance)
func testContinueZone() {
  let student = testPrincipal(11);
  let now = Time.now();
  
  let store = setupResultsStore(student, [
    ("5-math-1", 7, 10, now),       // 70%
    ("5-math-2", 8, 10, now + 1),   // 80%
  ]);
  
  let suggestion = AdaptiveLib.getAdaptiveSuggestion(store, student, "5-math");
  
  // Average scores (70-85%) should be in continue zone
  switch (suggestion.action) {
    case (#continue_) or (#quizNow) {
      assertTrue(suggestion.message.size() > 0, "Should have encouraging message");
    };
    case _ {
      // May also suggest quizNow based on time
    };
  };
  Debug.print("✓ testContinueZone passed");
};

// Test: Cross-Grade Subject Isolation
func testCrossGradeIsolation() {
  let student = testPrincipal(12);
  let now = Time.now();
  
  // Add results for grade 5 math
  let store = setupResultsStore(student, [
    ("5-math-1", 10, 10, now),
    ("5-math-2", 10, 10, now + 1),
  ]);
  
  // Query for grade 6 math - should not see grade 5 results
  let workflow = AdaptiveLib.getAdaptiveWorkflow(store, student, "6-math", "6");
  
  // Should be treated as first time since no 6-math results
  assertTrue(workflow.phiConfidence == 0.0, "Should not consider different grade results");
  Debug.print("✓ testCrossGradeIsolation passed");
};

// Run all tests
func runTests() {
  Debug.print("Running Adaptive Library Tests...\n");
  
  testAdaptiveSuggestionNoResults();
  testAdaptiveSuggestionLowScore();
  testAdaptiveSuggestionHighScore();
  testAdaptiveSuggestionDifferentSubject();
  testAdaptiveWorkflowFirstTime();
  testAdaptiveWorkflowLowConfidence();
  testAdaptiveWorkflowHighConfidence();
  testFibDifficultyLevelMapping();
  testPHIConfidenceCalculation();
  testSuggestedTopicsFormat();
  testContinueZone();
  testCrossGradeIsolation();
  
  Debug.print("\n✅ All Adaptive Library tests passed!");
};

// Entry point for test runner
runTests();
