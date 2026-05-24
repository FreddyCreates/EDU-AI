// Test suite for Passport library
// Run with: mops test

import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Debug "mo:core/Debug";
import Float "mo:core/Float";
import PassportLib "../lib/passport";
import Common "../types/common";
import Types "../types/passport";

// Test helpers
func assertTrue(condition : Bool, message : Text) {
  if (not condition) {
    Debug.trap("Assertion failed: " # message);
  };
};

func assertApproxEqual(actual : Float, expected : Float, epsilon : Float, message : Text) {
  if (Float.abs(actual - expected) > epsilon) {
    Debug.trap("Float assertion failed: " # message);
  };
};

func testPrincipal(id : Nat) : Common.UserId {
  Principal.fromText("aaaaa-aa");
};

// Create a test kernel seed
func createTestSeed(id : Text, summary : Text, engine : Text, track : Text, timestamp : Int) : Types.KernelSeed {
  {
    id = id;
    sessionSummary = summary;
    engineUsed = engine;
    trackName = track;
    createdAt = timestamp;
    artifactName = ?(track # " Session");
  };
};

// Test: Create Passport
func testCreatePassport() {
  let passports : PassportLib.PassportStore = Map.empty();
  let seedStore : PassportLib.SeedStore = Map.empty();
  let caller = testPrincipal(1);
  let now = Time.now();
  
  let passport = PassportLib.createPassport(passports, seedStore, caller, "Alice", "5", "COLLEGIUM-COGNITIO", now);
  
  assertTrue(passport.studentName == "Alice", "Student name should be Alice");
  assertTrue(passport.gradeLevel == "5", "Grade level should be 5");
  assertTrue(passport.collegium == "COLLEGIUM-COGNITIO", "Collegium should match");
  assertTrue(passport.totalSessions == 0, "Should have 0 sessions initially");
  assertTrue(passport.kernelSeeds.size() == 0, "Should have no kernel seeds");
  Debug.print("✓ testCreatePassport passed");
};

// Test: Passport ID Format
func testPassportIdFormat() {
  let passports : PassportLib.PassportStore = Map.empty();
  let seedStore : PassportLib.SeedStore = Map.empty();
  let caller = testPrincipal(2);
  let now = Time.now();
  
  let passport = PassportLib.createPassport(passports, seedStore, caller, "Bob", "3", "COLLEGIUM-VERITAS", now);
  
  assertTrue(passport.passportId.startsWith(#text "PP-"), "Passport ID should start with PP-");
  assertTrue(passport.passportId.size() >= 11, "Passport ID should have minimum length");
  Debug.print("✓ testPassportIdFormat passed");
};

// Test: Get Passport - Existing
func testGetPassportExisting() {
  let passports : PassportLib.PassportStore = Map.empty();
  let seedStore : PassportLib.SeedStore = Map.empty();
  let caller = testPrincipal(3);
  let now = Time.now();
  
  ignore PassportLib.createPassport(passports, seedStore, caller, "Charlie", "K", "COLLEGIUM-INITIUM", now);
  
  let result = PassportLib.getPassport(passports, seedStore, caller);
  
  switch (result) {
    case (?passport) {
      assertTrue(passport.studentName == "Charlie", "Name should be Charlie");
      assertTrue(passport.gradeLevel == "K", "Grade should be K");
    };
    case null {
      Debug.trap("Passport should exist");
    };
  };
  Debug.print("✓ testGetPassportExisting passed");
};

// Test: Get Passport - Non-existing
func testGetPassportNonExisting() {
  let passports : PassportLib.PassportStore = Map.empty();
  let seedStore : PassportLib.SeedStore = Map.empty();
  let caller = testPrincipal(4);
  
  let result = PassportLib.getPassport(passports, seedStore, caller);
  
  switch (result) {
    case (?_) {
      Debug.trap("Passport should not exist");
    };
    case null {
      // Expected
    };
  };
  Debug.print("✓ testGetPassportNonExisting passed");
};

// Test: Seal Kernel Seed
func testSealKernelSeed() {
  let passports : PassportLib.PassportStore = Map.empty();
  let seedStore : PassportLib.SeedStore = Map.empty();
  let caller = testPrincipal(5);
  let now = Time.now();
  
  ignore PassportLib.createPassport(passports, seedStore, caller, "Diana", "5", "COLLEGIUM-COGNITIO", now);
  
  let seed = createTestSeed("seed-1", "Math session completed", "ALPHA-1", "5-math", now + 1000);
  let success = PassportLib.sealKernelSeed(passports, seedStore, caller, seed, now + 1000);
  
  assertTrue(success, "Sealing should succeed");
  
  let seeds = PassportLib.getKernelSeeds(seedStore, caller);
  assertTrue(seeds.size() == 1, "Should have 1 seed");
  assertTrue(seeds[0].id == "seed-1", "Seed ID should match");
  Debug.print("✓ testSealKernelSeed passed");
};

// Test: Seal Kernel Seed - No Passport
func testSealKernelSeedNoPassport() {
  let passports : PassportLib.PassportStore = Map.empty();
  let seedStore : PassportLib.SeedStore = Map.empty();
  let caller = testPrincipal(6);
  let now = Time.now();
  
  let seed = createTestSeed("seed-x", "Test session", "ALPHA-1", "5-math", now);
  let success = PassportLib.sealKernelSeed(passports, seedStore, caller, seed, now);
  
  assertTrue(not success, "Sealing should fail without passport");
  Debug.print("✓ testSealKernelSeedNoPassport passed");
};

// Test: Achievement Badges - First Seed
func testAchievementFirstSeed() {
  let passports : PassportLib.PassportStore = Map.empty();
  let seedStore : PassportLib.SeedStore = Map.empty();
  let caller = testPrincipal(7);
  let now = Time.now();
  
  ignore PassportLib.createPassport(passports, seedStore, caller, "Eve", "3", "COLLEGIUM-INITIUM", now);
  
  let seed = createTestSeed("seed-first", "First session", "ALPHA-1", "3-ela", now + 1);
  ignore PassportLib.sealKernelSeed(passports, seedStore, caller, seed, now + 1);
  
  let result = PassportLib.getPassport(passports, seedStore, caller);
  switch (result) {
    case (?passport) {
      assertTrue(passport.achievements.size() >= 1, "Should have at least 1 achievement");
      let hasFirstSeed = passport.achievements.find(func(a) { a == "First Seed" }) != null;
      assertTrue(hasFirstSeed, "Should have 'First Seed' achievement");
    };
    case null {
      Debug.trap("Passport should exist");
    };
  };
  Debug.print("✓ testAchievementFirstSeed passed");
};

// Test: Achievement Badges - Scholar (5 seeds)
func testAchievementScholar() {
  let passports : PassportLib.PassportStore = Map.empty();
  let seedStore : PassportLib.SeedStore = Map.empty();
  let caller = testPrincipal(8);
  let now = Time.now();
  
  ignore PassportLib.createPassport(passports, seedStore, caller, "Frank", "6", "COLLEGIUM-SCHOLAR", now);
  
  for (i in [1, 2, 3, 4, 5].vals()) {
    let seed = createTestSeed("seed-" # Nat.toText(i), "Session " # Nat.toText(i), "ALPHA-1", "6-math", now + i);
    ignore PassportLib.sealKernelSeed(passports, seedStore, caller, seed, now + i);
  };
  
  let result = PassportLib.getPassport(passports, seedStore, caller);
  switch (result) {
    case (?passport) {
      let hasScholar = passport.achievements.find(func(a) { a == "Scholar" }) != null;
      assertTrue(hasScholar, "Should have 'Scholar' achievement");
    };
    case null {
      Debug.trap("Passport should exist");
    };
  };
  Debug.print("✓ testAchievementScholar passed");
};

// Test: Get Kernel Seeds - Empty
func testGetKernelSeedsEmpty() {
  let seedStore : PassportLib.SeedStore = Map.empty();
  let caller = testPrincipal(9);
  
  let seeds = PassportLib.getKernelSeeds(seedStore, caller);
  
  assertTrue(seeds.size() == 0, "Should have no seeds");
  Debug.print("✓ testGetKernelSeedsEmpty passed");
};

// Test: SSS Score Calculation
func testSSSScoreCalculation() {
  let passports : PassportLib.PassportStore = Map.empty();
  let seedStore : PassportLib.SeedStore = Map.empty();
  let caller = testPrincipal(10);
  let now = Time.now();
  
  ignore PassportLib.createPassport(passports, seedStore, caller, "Grace", "5", "COLLEGIUM-COGNITIO", now);
  
  // Add some seeds
  for (i in [1, 2, 3].vals()) {
    let seed = createTestSeed("seed-" # Nat.toText(i), "Session", "ALPHA-1", "5-math", now + i);
    ignore PassportLib.sealKernelSeed(passports, seedStore, caller, seed, now + i);
  };
  
  let sss = PassportLib.getSSSScore(passports, seedStore, caller);
  
  // SSS should be a Fibonacci number between 1 and 89
  let fibSeq = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  let isFib = fibSeq.find(func(f) { f == sss }) != null;
  assertTrue(isFib, "SSS should be a Fibonacci number");
  Debug.print("✓ testSSSScoreCalculation passed");
};

// Test: SSS Score - No Seeds
func testSSSScoreNoSeeds() {
  let passports : PassportLib.PassportStore = Map.empty();
  let seedStore : PassportLib.SeedStore = Map.empty();
  let caller = testPrincipal(11);
  
  let sss = PassportLib.getSSSScore(passports, seedStore, caller);
  
  assertTrue(sss == 1, "SSS should be minimum (1) with no seeds");
  Debug.print("✓ testSSSScoreNoSeeds passed");
};

// Test: Full Passport Stats
func testFullPassportStats() {
  let passports : PassportLib.PassportStore = Map.empty();
  let seedStore : PassportLib.SeedStore = Map.empty();
  let caller = testPrincipal(12);
  let now = Time.now();
  
  ignore PassportLib.createPassport(passports, seedStore, caller, "Henry", "7", "COLLEGIUM-VERITAS", now);
  
  for (i in [1, 2, 3, 4, 5, 6].vals()) {
    let seed = createTestSeed("seed-" # Nat.toText(i), "Session", "ALPHA-1", "7-science", now + i);
    ignore PassportLib.sealKernelSeed(passports, seedStore, caller, seed, now + i);
  };
  
  let stats = PassportLib.getFullPassportStats(passports, seedStore, caller);
  
  switch (stats) {
    case (?s) {
      assertTrue(s.totalSeeds == 6, "Should have 6 total seeds");
      assertTrue(s.hotSeeds > 0, "Should have some hot seeds");
      assertTrue(s.compoundScore > 0.0, "Compound score should be positive");
    };
    case null {
      Debug.trap("Stats should exist");
    };
  };
  Debug.print("✓ testFullPassportStats passed");
};

// Test: Auto-Seal From Session
func testAutoSealFromSession() {
  let passports : PassportLib.PassportStore = Map.empty();
  let seedStore : PassportLib.SeedStore = Map.empty();
  let caller = testPrincipal(13);
  let now = Time.now();
  
  // Should auto-create passport if it doesn't exist
  let seedId = PassportLib.autoSealFromSession(
    passports,
    seedStore,
    caller,
    "Completed math quiz with 90%",
    "ALPHA-2",
    "math",
    "5",
    now
  );
  
  assertTrue(seedId.startsWith(#text "seed-"), "Seed ID should start with seed-");
  
  let passport = PassportLib.getPassport(passports, seedStore, caller);
  switch (passport) {
    case (?p) {
      assertTrue(p.totalSessions == 1, "Should have 1 session");
      assertTrue(p.kernelSeeds.size() == 1, "Should have 1 kernel seed");
    };
    case null {
      Debug.trap("Passport should have been auto-created");
    };
  };
  Debug.print("✓ testAutoSealFromSession passed");
};

// Test: Passport Stats
func testPassportStats() {
  let passports : PassportLib.PassportStore = Map.empty();
  let seedStore : PassportLib.SeedStore = Map.empty();
  let caller = testPrincipal(14);
  let now = Time.now();
  
  ignore PassportLib.createPassport(passports, seedStore, caller, "Ivy", "4", "COLLEGIUM-INITIUM", now);
  
  for (i in [1, 2].vals()) {
    let seed = createTestSeed("seed-" # Nat.toText(i), "Session", "ALPHA-1", "4-ela", now + i);
    ignore PassportLib.sealKernelSeed(passports, seedStore, caller, seed, now + i);
  };
  
  let stats = PassportLib.getPassportStats(passports, seedStore, caller);
  
  switch (stats) {
    case (?s) {
      assertTrue(s.totalSeeds == 2, "Should have 2 seeds");
      assertTrue(s.totalSessions == 2, "Should have 2 sessions");
    };
    case null {
      Debug.trap("Stats should exist");
    };
  };
  Debug.print("✓ testPassportStats passed");
};

// Run all tests
func runTests() {
  Debug.print("Running Passport Library Tests...\n");
  
  testCreatePassport();
  testPassportIdFormat();
  testGetPassportExisting();
  testGetPassportNonExisting();
  testSealKernelSeed();
  testSealKernelSeedNoPassport();
  testAchievementFirstSeed();
  testAchievementScholar();
  testGetKernelSeedsEmpty();
  testSSSScoreCalculation();
  testSSSScoreNoSeeds();
  testFullPassportStats();
  testAutoSealFromSession();
  testPassportStats();
  
  Debug.print("\n✅ All Passport Library tests passed!");
};

// Entry point for test runner
runTests();
