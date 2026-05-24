// Test suite for Sessions library
// Run with: mops test

import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Debug "mo:core/Debug";
import Int "mo:core/Int";
import SessionsLib "../lib/sessions";
import Common "../types/common";
import Types "../types/sessions";

// Test helpers
func assertTrue(condition : Bool, message : Text) {
  if (not condition) {
    Debug.trap("Assertion failed: " # message);
  };
};

func testPrincipal(id : Nat) : Common.UserId {
  Principal.fromText("aaaaa-aa");
};

// Create a test quiz result
func createTestResult(topicId : Text, score : Nat, total : Nat, timestamp : Int) : Types.QuizResult {
  {
    topicId = topicId;
    score = score;
    totalQuestions = total;
    timestamp = timestamp;
    sessionType = "quiz";
    answers = [];
  };
};

// Test: Save Result
func testSaveResult() {
  let resultsStore : SessionsLib.ResultStore = Map.empty();
  let caller = testPrincipal(1);
  let result = createTestResult("5-math-1", 8, 10, Time.now());
  
  SessionsLib.saveResult(resultsStore, caller, result);
  
  let results = SessionsLib.getResults(resultsStore, caller);
  assertTrue(results.size() == 1, "Should have 1 result");
  assertTrue(results[0].score == 8, "Score should be 8");
  Debug.print("✓ testSaveResult passed");
};

// Test: Get Results - Empty
func testGetResultsEmpty() {
  let resultsStore : SessionsLib.ResultStore = Map.empty();
  let caller = testPrincipal(2);
  
  let results = SessionsLib.getResults(resultsStore, caller);
  
  assertTrue(results.size() == 0, "Should have no results");
  Debug.print("✓ testGetResultsEmpty passed");
};

// Test: Multiple Results for Same User
func testMultipleResultsSameUser() {
  let resultsStore : SessionsLib.ResultStore = Map.empty();
  let caller = testPrincipal(3);
  
  let result1 = createTestResult("5-math-1", 7, 10, Time.now());
  let result2 = createTestResult("5-math-2", 9, 10, Time.now() + 1000);
  let result3 = createTestResult("5-ela-1", 8, 10, Time.now() + 2000);
  
  SessionsLib.saveResult(resultsStore, caller, result1);
  SessionsLib.saveResult(resultsStore, caller, result2);
  SessionsLib.saveResult(resultsStore, caller, result3);
  
  let results = SessionsLib.getResults(resultsStore, caller);
  
  assertTrue(results.size() == 3, "Should have 3 results");
  Debug.print("✓ testMultipleResultsSameUser passed");
};

// Test: Multiple Users
func testMultipleUsers() {
  let resultsStore : SessionsLib.ResultStore = Map.empty();
  let user1 = testPrincipal(4);
  let user2 = testPrincipal(5);
  
  let result1 = createTestResult("5-math-1", 10, 10, Time.now());
  let result2 = createTestResult("5-ela-1", 6, 10, Time.now());
  
  SessionsLib.saveResult(resultsStore, user1, result1);
  SessionsLib.saveResult(resultsStore, user2, result2);
  
  let results1 = SessionsLib.getResults(resultsStore, user1);
  let results2 = SessionsLib.getResults(resultsStore, user2);
  
  assertTrue(results1.size() == 1, "User 1 should have 1 result");
  assertTrue(results2.size() == 1, "User 2 should have 1 result");
  assertTrue(results1[0].score == 10, "User 1 score should be 10");
  assertTrue(results2[0].score == 6, "User 2 score should be 6");
  Debug.print("✓ testMultipleUsers passed");
};

// Test: Get Session Count Today
func testGetSessionCountToday() {
  let resultsStore : SessionsLib.ResultStore = Map.empty();
  let user1 = testPrincipal(6);
  let user2 = testPrincipal(7);
  let now = Time.now();
  
  // Today's results
  let result1 = createTestResult("5-math-1", 8, 10, now);
  let result2 = createTestResult("5-ela-1", 9, 10, now);
  let result3 = createTestResult("5-science-1", 7, 10, now);
  
  SessionsLib.saveResult(resultsStore, user1, result1);
  SessionsLib.saveResult(resultsStore, user1, result2);
  SessionsLib.saveResult(resultsStore, user2, result3);
  
  let count = SessionsLib.getSessionCountToday(resultsStore);
  
  assertTrue(count == 3, "Should have 3 sessions today");
  Debug.print("✓ testGetSessionCountToday passed");
};

// Test: Session Count - No Results
func testSessionCountNoResults() {
  let resultsStore : SessionsLib.ResultStore = Map.empty();
  
  let count = SessionsLib.getSessionCountToday(resultsStore);
  
  assertTrue(count == 0, "Should have 0 sessions");
  Debug.print("✓ testSessionCountNoResults passed");
};

// Test: Score Boundaries
func testScoreBoundaries() {
  let resultsStore : SessionsLib.ResultStore = Map.empty();
  let caller = testPrincipal(8);
  
  // Test minimum score
  let result1 = createTestResult("5-math-1", 0, 10, Time.now());
  SessionsLib.saveResult(resultsStore, caller, result1);
  
  // Test maximum score
  let result2 = createTestResult("5-math-2", 10, 10, Time.now() + 1);
  SessionsLib.saveResult(resultsStore, caller, result2);
  
  let results = SessionsLib.getResults(resultsStore, caller);
  
  assertTrue(results[0].score == 0, "Minimum score should be 0");
  assertTrue(results[1].score == 10, "Maximum score should be 10");
  Debug.print("✓ testScoreBoundaries passed");
};

// Test: Different Quiz Sizes
func testDifferentQuizSizes() {
  let resultsStore : SessionsLib.ResultStore = Map.empty();
  let caller = testPrincipal(9);
  
  let result1 = createTestResult("5-math-1", 3, 5, Time.now());
  let result2 = createTestResult("5-math-2", 15, 20, Time.now() + 1);
  let result3 = createTestResult("5-math-3", 48, 50, Time.now() + 2);
  
  SessionsLib.saveResult(resultsStore, caller, result1);
  SessionsLib.saveResult(resultsStore, caller, result2);
  SessionsLib.saveResult(resultsStore, caller, result3);
  
  let results = SessionsLib.getResults(resultsStore, caller);
  
  assertTrue(results[0].totalQuestions == 5, "First quiz should have 5 questions");
  assertTrue(results[1].totalQuestions == 20, "Second quiz should have 20 questions");
  assertTrue(results[2].totalQuestions == 50, "Third quiz should have 50 questions");
  Debug.print("✓ testDifferentQuizSizes passed");
};

// Test: Topic ID Patterns
func testTopicIdPatterns() {
  let resultsStore : SessionsLib.ResultStore = Map.empty();
  let caller = testPrincipal(10);
  let now = Time.now();
  
  // Test various grade/subject combinations
  let results = [
    createTestResult("K-ela-1", 5, 5, now),
    createTestResult("1-math-3", 8, 10, now + 1),
    createTestResult("5-science-2", 7, 10, now + 2),
    createTestResult("12-cs-4", 9, 10, now + 3),
  ];
  
  for (result in results.vals()) {
    SessionsLib.saveResult(resultsStore, caller, result);
  };
  
  let savedResults = SessionsLib.getResults(resultsStore, caller);
  
  assertTrue(savedResults.size() == 4, "Should save all 4 results");
  assertTrue(savedResults[0].topicId == "K-ela-1", "First topic should be K-ela-1");
  assertTrue(savedResults[3].topicId == "12-cs-4", "Last topic should be 12-cs-4");
  Debug.print("✓ testTopicIdPatterns passed");
};

// Run all tests
func runTests() {
  Debug.print("Running Sessions Library Tests...\n");
  
  testSaveResult();
  testGetResultsEmpty();
  testMultipleResultsSameUser();
  testMultipleUsers();
  testGetSessionCountToday();
  testSessionCountNoResults();
  testScoreBoundaries();
  testDifferentQuizSizes();
  testTopicIdPatterns();
  
  Debug.print("\n✅ All Sessions Library tests passed!");
};

// Entry point for test runner
runTests();
