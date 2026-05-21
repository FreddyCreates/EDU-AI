// SOVEREIGN MEMORY API — Public canister endpoints for the PHI-geometric allocator
import SovereignMemory "../lib/sovereign-memory";
import SovereignTypes "../types/sovereign-memory";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

mixin (
  adminState : { var owner : ?Principal },
  memState   : { var vaultCanisterId : ?Principal },
  allocState : SovereignTypes.AllocatorState,
) {

  // ── Authorization helper ──────────────────────────────────────────────────
  func requireAdmin(caller : Principal) {
    switch (adminState.owner) {
      case (?owner) {
        if (caller != owner) Runtime.trap("Sovereign: caller is not admin");
      };
      case null {
        // No owner set yet — first caller becomes owner implicitly handled upstream
        // Treat null as unlocked during bootstrap only
      };
    };
  };

  // ── Read: allocator health snapshot ──────────────────────────────────────
  public query func getAllocatorStats() : async SovereignTypes.AllocatorStats {
    SovereignMemory.getStats(allocState);
  };

  // ── Write: manual heartbeat trigger (admin only) ──────────────────────────
  // Returns raw vault payloads — useful for testing vault routing.
  public shared ({ caller }) func runHeartbeat() : async [Blob] {
    requireAdmin(caller);
    SovereignMemory.heartbeat(allocState);
  };

  // ── Write: set vault routing target (admin only) ──────────────────────────
  public shared ({ caller }) func setVaultCanisterId(id : Principal) : async () {
    requireAdmin(caller);
    memState.vaultCanisterId := ?id;
  };

  // ── Read: current vault routing target ───────────────────────────────────
  public query func getVaultCanisterId() : async ?Principal {
    memState.vaultCanisterId;
  };
};
