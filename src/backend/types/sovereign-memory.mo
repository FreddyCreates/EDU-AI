// Sovereign Memory Allocator — Type Definitions
// All zone/block types for the PHI-geometric memory engine.
import List "mo:core/List";

module {

  /// A sovereign memory block. All allocations are Fibonacci-aligned.
  /// Pinned blocks are zone-locked to WARM (zone 1) and never evicted.
  public type Block = {
    id          : Nat;
    size        : Nat;      // Fibonacci-aligned byte size
    zone        : Nat;      // 0=HOT 1=WARM 2=COLD 3=VAULT_PENDING
    ttl         : Nat;      // heartbeats remaining before eviction
    compressed  : Bool;
    vaultRouted : Bool;
    pinned      : Bool;     // exempt from TTL eviction
    data        : Blob;
    tag         : Text;     // semantic label for the allocation
  };

  /// Mutable allocator state — lives in the actor, passed into every lib call.
  public type AllocatorState = {
    blocks          : List.List<Block>;
    var totalAllocated  : Nat;
    var totalCapacity   : Nat;
    var nextBlockId     : Nat;
    var heartbeatCount  : Nat;
  };

  /// Payload sent to ABYSSUS-VAULT after PHI-fold compression.
  public type VaultPayload = {
    blockId  : Nat;
    tag      : Text;
    data     : Blob;        // 38.2% (PHI_INV_SQ) remainder
  };

  /// Health snapshot returned by getStats().
  public type AllocatorStats = {
    totalAllocated   : Nat;
    totalCapacity    : Nat;
    blockCount       : Nat;
    utilizationPct   : Float;
    zoneDistribution : [Nat]; // [zone0count, zone1count, zone2count, zone3count]
  };
};
