// Rate Limiter — Fibonacci-gated rate limiting.
// Limits: F(8)=21 requests per principal per minute.
// Uses a sliding window approach with nanosecond timestamps.
// LEX_SOVEREIGNUS: Protects the sovereign platform from abuse while preserving student access.

import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Common "../types/common";

module {

  // ── Constants ─────────────────────────────────────────────────────────────
  let WINDOW_NS  : Int = 60_000_000_000;  // 1 minute in nanoseconds
  let MAX_CALLS  : Nat = 21;              // F(8) = 21 calls per window

  // ── Rate limiter state ────────────────────────────────────────────────────
  public type RateLimiter = Map.Map<Common.UserId, List.List<Int>>; // principal → list of call timestamps

  public func newLimiter() : RateLimiter { Map.empty() };

  // ── Check and record a call ────────────────────────────────────────────────
  // Returns true if call is allowed, false if rate limit exceeded.
  public func check(limiter : RateLimiter, caller : Common.UserId) : Bool {
    let now = Time.now();
    let cutoff : Int = now - WINDOW_NS;

    // Get existing timestamps, prune old ones outside the window
    let existing : List.List<Int> = switch (limiter.get(caller)) {
      case (?l) l;
      case null List.empty<Int>();
    };

    // Count calls within the window
    var count : Nat = 0;
    let fresh = List.empty<Int>();
    for (ts in existing.toArray().vals()) {
      if (ts > cutoff) {
        count += 1;
        fresh.add(ts);
      };
    };

    if (count >= MAX_CALLS) {
      // Over limit — update store with pruned list but don't add new call
      limiter.add(caller, fresh);
      false;
    } else {
      // Under limit — record this call
      fresh.add(now);
      limiter.add(caller, fresh);
      true;
    };
  };

  // ── Remaining calls in current window ─────────────────────────────────────
  public func remaining(limiter : RateLimiter, caller : Common.UserId) : Nat {
    let now = Time.now();
    let cutoff : Int = now - WINDOW_NS;
    let count : Nat = switch (limiter.get(caller)) {
      case null 0;
      case (?l) {
        var n : Nat = 0;
        for (ts in l.toArray().vals()) {
          if (ts > cutoff) n += 1;
        };
        n;
      };
    };
    if (MAX_CALLS > count) MAX_CALLS - count else 0;
  };

  // ── Error message ─────────────────────────────────────────────────────────
  public func rateLimitError(caller : Common.UserId) : Text {
    "RATE_GATE: Fibonacci rate limit exceeded. " #
    "Maximum F(8)=21 requests per minute per principal. " #
    "Principal: " # caller.toText() # ". " #
    "Wait for the current 60-second window to reset before retrying. " #
    "LEX_SOVEREIGNUS: Rate limiting protects the sovereign field for all students.";
  };
};
