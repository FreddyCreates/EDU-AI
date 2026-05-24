// Test suite for Students library
// Run with: mops test

import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Debug "mo:core/Debug";
import Nat "mo:core/Nat";
import StudentsLib "../lib/students";
import Common "../types/common";
import Types "../types/students";

// Test helpers
func assertTrue(condition : Bool, message : Text) {
  if (not condition) {
    Debug.trap("Assertion failed: " # message);
  };
};

func assertFalse(condition : Bool, message : Text) {
  if (condition) {
    Debug.trap("Assertion failed: " # message);
  };
};

func assertEqual<T>(actual : T, expected : T, message : Text, eq : (T, T) -> Bool) {
  if (not eq(actual, expected)) {
    Debug.trap("Equality assertion failed: " # message);
  };
};

// Create test principal
func testPrincipal(id : Nat) : Common.UserId {
  let text = "test-user-" # Nat.toText(id) # "-" # Nat.toText(id);
  Principal.fromText("aaaaa-aa");
};

// Test: Create Profile
func testCreateProfile() {
  let profiles : StudentsLib.ProfileStore = Map.empty();
  let caller = testPrincipal(1);
  
  let profile = StudentsLib.createProfile(profiles, caller, "Alice", "5");
  
  assertTrue(profile.name == "Alice", "Profile name should be Alice");
  assertTrue(profile.gradeLevel == "5", "Grade level should be 5");
  assertTrue(profile.id == caller, "Profile ID should match caller");
  Debug.print("✓ testCreateProfile passed");
};

// Test: Get Profile - Existing
func testGetProfileExisting() {
  let profiles : StudentsLib.ProfileStore = Map.empty();
  let caller = testPrincipal(2);
  
  ignore StudentsLib.createProfile(profiles, caller, "Bob", "3");
  
  let result = StudentsLib.getProfile(profiles, caller);
  
  switch (result) {
    case (?profile) {
      assertTrue(profile.name == "Bob", "Retrieved profile name should be Bob");
      assertTrue(profile.gradeLevel == "3", "Retrieved grade level should be 3");
    };
    case null {
      Debug.trap("Profile should exist");
    };
  };
  Debug.print("✓ testGetProfileExisting passed");
};

// Test: Get Profile - Non-existing
func testGetProfileNonExisting() {
  let profiles : StudentsLib.ProfileStore = Map.empty();
  let caller = testPrincipal(3);
  
  let result = StudentsLib.getProfile(profiles, caller);
  
  switch (result) {
    case (?_) {
      Debug.trap("Profile should not exist");
    };
    case null {
      // Expected
    };
  };
  Debug.print("✓ testGetProfileNonExisting passed");
};

// Test: Update Grade
func testUpdateGrade() {
  let profiles : StudentsLib.ProfileStore = Map.empty();
  let caller = testPrincipal(4);
  
  ignore StudentsLib.createProfile(profiles, caller, "Charlie", "4");
  let updated = StudentsLib.updateGrade(profiles, caller, "5");
  
  assertTrue(updated.gradeLevel == "5", "Grade level should be updated to 5");
  assertTrue(updated.name == "Charlie", "Name should remain unchanged");
  Debug.print("✓ testUpdateGrade passed");
};

// Test: Multiple Profiles
func testMultipleProfiles() {
  let profiles : StudentsLib.ProfileStore = Map.empty();
  let caller1 = testPrincipal(5);
  let caller2 = testPrincipal(6);
  
  ignore StudentsLib.createProfile(profiles, caller1, "Diana", "K");
  ignore StudentsLib.createProfile(profiles, caller2, "Eve", "12");
  
  let p1 = StudentsLib.getProfile(profiles, caller1);
  let p2 = StudentsLib.getProfile(profiles, caller2);
  
  switch (p1, p2) {
    case (?profile1, ?profile2) {
      assertTrue(profile1.name == "Diana", "First profile name should be Diana");
      assertTrue(profile2.name == "Eve", "Second profile name should be Eve");
      assertTrue(profile1.gradeLevel == "K", "First grade should be K");
      assertTrue(profile2.gradeLevel == "12", "Second grade should be 12");
    };
    case (_, _) {
      Debug.trap("Both profiles should exist");
    };
  };
  Debug.print("✓ testMultipleProfiles passed");
};

// Test: Profile Overwrite
func testProfileOverwrite() {
  let profiles : StudentsLib.ProfileStore = Map.empty();
  let caller = testPrincipal(7);
  
  ignore StudentsLib.createProfile(profiles, caller, "Frank", "6");
  ignore StudentsLib.createProfile(profiles, caller, "Frank Updated", "7");
  
  let result = StudentsLib.getProfile(profiles, caller);
  
  switch (result) {
    case (?profile) {
      assertTrue(profile.name == "Frank Updated", "Profile should be overwritten");
      assertTrue(profile.gradeLevel == "7", "Grade should be updated");
    };
    case null {
      Debug.trap("Profile should exist");
    };
  };
  Debug.print("✓ testProfileOverwrite passed");
};

// Test: All Grade Levels
func testAllGradeLevels() {
  let profiles : StudentsLib.ProfileStore = Map.empty();
  let grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  
  var i = 0;
  for (grade in grades.vals()) {
    let caller = testPrincipal(100 + i);
    ignore StudentsLib.createProfile(profiles, caller, "Student-" # grade, grade);
    
    let result = StudentsLib.getProfile(profiles, caller);
    switch (result) {
      case (?profile) {
        assertTrue(profile.gradeLevel == grade, "Grade level should match: " # grade);
      };
      case null {
        Debug.trap("Profile should exist for grade: " # grade);
      };
    };
    i += 1;
  };
  Debug.print("✓ testAllGradeLevels passed");
};

// Run all tests
func runTests() {
  Debug.print("Running Students Library Tests...\n");
  
  testCreateProfile();
  testGetProfileExisting();
  testGetProfileNonExisting();
  testUpdateGrade();
  testMultipleProfiles();
  testProfileOverwrite();
  testAllGradeLevels();
  
  Debug.print("\n✅ All Students Library tests passed!");
};

// Entry point for test runner
runTests();
