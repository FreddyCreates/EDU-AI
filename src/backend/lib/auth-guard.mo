// Auth Guard — Internet Identity enforcement.
// Enforces non-anonymous principal on every write call.
// LEX_SOVEREIGNUS: No anonymous access to any state-mutating operation.
// Returns #ok for valid principals, #err for anonymous.

import Principal "mo:core/Principal";
import Common "../types/common";

module {

  public type AuthResult = { #ok; #err : Text };

  // ── isAnonymous check ─────────────────────────────────────────────────────
  // Returns #ok if caller is authenticated (non-anonymous), #err otherwise.
  public func requireAuth(caller : Common.UserId) : AuthResult {
    if (Principal.isAnonymous(caller)) {
      #err("AUTH_GUARD: Anonymous principals are not permitted to call state-mutating operations. " #
           "Please authenticate with Internet Identity before proceeding. " #
           "LEX_SOVEREIGNUS: Sovereign identity is required.")
    } else {
      #ok
    };
  };

  // ── Convenience unwrap — traps on anonymous ───────────────────────────────
  // Use in shared functions that should never reach anonymous callers.
  public func assertAuth(caller : Common.UserId) {
    switch (requireAuth(caller)) {
      case (#ok) {};
      case (#err msg) assert false; // trap with error
        ignore msg;
    };
  };
};
