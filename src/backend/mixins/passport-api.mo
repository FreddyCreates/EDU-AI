import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Types "../types/passport";
import PassportLib "../lib/passport";
import Principal "mo:core/Principal";
import SovereignMemory "../lib/sovereign-memory";
import Array "mo:core/Array";

mixin (
  passports  : PassportLib.PassportStore,
  seedStore  : PassportLib.SeedStore,
  allocState : SovereignMemory.AllocatorState,
) {
  /// Returns the caller's sovereign passport with all sealed kernel seeds.
  public query ({ caller }) func getSovereignPassport() : async ?Types.SovereignPassport {
    PassportLib.getPassport(passports, seedStore, caller);
  };

  /// Creates a new passport for the caller. Traps if one already exists.
  public shared ({ caller }) func createSovereignPassport(
    studentName : Text,
    gradeLevel : Text,
    collegium : Text,
  ) : async Types.SovereignPassport {
    switch (passports.get(caller)) {
      case (?_) Runtime.trap("Passport already exists for this principal");
      case null {};
    };
    PassportLib.createPassport(passports, seedStore, caller, studentName, gradeLevel, collegium, Time.now());
  };

  /// Seals a kernel seed into the caller's passport. Returns false if no passport found.
  public shared ({ caller }) func sealKernelSeed(
    seed : Types.KernelSeed,
  ) : async Bool {
    // Register seed as VAULT_PENDING (hotness=0 → TTL=1 heartbeat)
    ignore SovereignMemory.alloc(allocState, 80, 0, "seed", false);
    PassportLib.sealKernelSeed(passports, seedStore, caller, seed, Time.now());
  };

  /// Returns all sealed kernel seeds for the caller.
  public query ({ caller }) func getKernelSeeds() : async [Types.KernelSeed] {
    PassportLib.getKernelSeeds(seedStore, caller);
  };

  /// Returns summary stats for the caller's passport.
  public query ({ caller }) func getPassportStats() : async ?{
    totalSeeds : Nat;
    totalSessions : Nat;
    lastActive : Int;
  } {
    PassportLib.getPassportStats(passports, seedStore, caller);
  };

  /// Returns full PHI-compound passport stats with zone breakdown.
  public query ({ caller }) func getFullPassportStats() : async ?Types.PassportStats {
    PassportLib.getFullPassportStats(passports, seedStore, caller);
  };

  /// Returns a paginated slice of the caller's sealed kernel seeds.
  public query ({ caller }) func getPassportSeeds(
    page     : Nat,
    pageSize : Nat,
  ) : async [Types.KernelSeed] {
    let all = PassportLib.getKernelSeeds(seedStore, caller);
    let total = all.size();
    let offset = page * pageSize;
    if (offset >= total) return [];
    let remaining = if (total >= offset) total - offset else 0;
    let count = if (remaining < pageSize) remaining else pageSize;
    Array.tabulate<Types.KernelSeed>(count, func i = all[offset + i]);
  };

  /// Auto-seals a kernel seed from a study session. Returns the seed ID.
  public shared ({ caller }) func autoSealFromSession(
    sessionSummary : Text,
    engineUsed     : Text,
    subject        : Text,
    gradeLevel     : Text,
  ) : async Text {
    ignore SovereignMemory.alloc(allocState, 80, 0, "auto_seed", false);
    PassportLib.autoSealFromSession(
      passports, seedStore, caller,
      sessionSummary, engineUsed, subject, gradeLevel,
      Time.now(),
    );
  };
};
