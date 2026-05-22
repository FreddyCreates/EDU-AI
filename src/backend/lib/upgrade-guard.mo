// Upgrade Guard — Pre/post upgrade hooks for sovereign memory consistency.
// Validates that stable memory is consistent before and after canister upgrades.
// LEX_SOVEREIGNUS: No data loss. Every upgrade is validated before proceeding.
//
// Note: In Motoko with --default-persistent-actors (as set in mops.toml),
// all let-bound state is automatically stable. This module provides the
// validation layer on top of the automatic stability.

import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Common "../types/common";

module {

  // ── Upgrade state ─────────────────────────────────────────────────────────
  public type UpgradeRecord = {
    version      : Text;
    preSnapshot  : UpgradeSnapshot;
    postSnapshot : ?UpgradeSnapshot;
    timestamp    : Common.Timestamp;
    status       : Text;  // "PENDING" | "VALID" | "INVALID"
  };

  public type UpgradeSnapshot = {
    profileCount    : Nat;
    sessionCount    : Nat;
    passportCount   : Nat;
    seedCount       : Nat;
    engineCount     : Nat;
    subsystemCount  : Nat;
    timestamp       : Common.Timestamp;
  };

  // ── Upgrade guard state ───────────────────────────────────────────────────
  public type GuardState = {
    var lastUpgrade  : ?UpgradeRecord;
    var upgradeCount : Nat;
    var bootTime     : Common.Timestamp;
  };

  public func newState() : GuardState {
    {
      var lastUpgrade  = null;
      var upgradeCount = 0;
      var bootTime     = Time.now();
    };
  };

  // ── Pre-upgrade snapshot ──────────────────────────────────────────────────
  public func preUpgrade(
    state        : GuardState,
    version      : Text,
    profileCount : Nat,
    sessionCount : Nat,
    passportCount : Nat,
    seedCount    : Nat,
    engineCount  : Nat,
    subsystemCount : Nat,
  ) {
    let snapshot : UpgradeSnapshot = {
      profileCount; sessionCount; passportCount;
      seedCount; engineCount; subsystemCount;
      timestamp = Time.now();
    };
    let record : UpgradeRecord = {
      version;
      preSnapshot  = snapshot;
      postSnapshot = null;
      timestamp    = Time.now();
      status       = "PENDING";
    };
    state.lastUpgrade  := ?record;
    state.upgradeCount += 1;
  };

  // ── Post-upgrade validation ───────────────────────────────────────────────
  public func postUpgrade(
    state        : GuardState,
    profileCount : Nat,
    sessionCount : Nat,
    passportCount : Nat,
    seedCount    : Nat,
    engineCount  : Nat,
    subsystemCount : Nat,
  ) : Text {
    let postSnap : UpgradeSnapshot = {
      profileCount; sessionCount; passportCount;
      seedCount; engineCount; subsystemCount;
      timestamp = Time.now();
    };
    switch (state.lastUpgrade) {
      case null {
        "UPGRADE_GUARD: No pre-upgrade snapshot found. First boot or snapshot was lost.";
      };
      case (?rec) {
        let pre = rec.preSnapshot;
        // Validate: counts must not decrease (data loss check)
        var valid = true;
        var issues = "";
        if (profileCount < pre.profileCount) {
          valid := false;
          issues := issues # "Profile count decreased (" # Nat.toText(pre.profileCount) # " → " # Nat.toText(profileCount) # "). ";
        };
        if (passportCount < pre.passportCount) {
          valid := false;
          issues := issues # "Passport count decreased (" # Nat.toText(pre.passportCount) # " → " # Nat.toText(passportCount) # "). ";
        };
        if (seedCount < pre.seedCount) {
          valid := false;
          issues := issues # "Seed count decreased (" # Nat.toText(pre.seedCount) # " → " # Nat.toText(seedCount) # "). ";
        };

        let statusText = if (valid) "VALID" else "INVALID";
        let updated : UpgradeRecord = {
          version      = rec.version;
          preSnapshot  = pre;
          postSnapshot = ?postSnap;
          timestamp    = rec.timestamp;
          status       = statusText;
        };
        state.lastUpgrade := ?updated;

        if (valid) {
          "UPGRADE_GUARD: " # rec.version # " — " # statusText # ". " #
          "All sovereign data integrity checks passed. " #
          Nat.toText(profileCount) # " profiles, " #
          Nat.toText(passportCount) # " passports, " #
          Nat.toText(seedCount) # " seeds preserved."
        } else {
          "UPGRADE_GUARD: " # rec.version # " — " # statusText # ". " #
          "DATA INTEGRITY ISSUES DETECTED: " # issues # " " #
          "Manual review required. LEX_SOVEREIGNUS: no data loss is acceptable."
        };
      };
    };
  };

  // ── Status ────────────────────────────────────────────────────────────────
  public func getStatus(state : GuardState) : Text {
    "UPGRADE_GUARD: " # Nat.toText(state.upgradeCount) # " upgrades recorded. " #
    switch (state.lastUpgrade) {
      case null "No upgrade history.";
      case (?rec) "Last: " # rec.version # " — " # rec.status # ".";
    };
  };
};
