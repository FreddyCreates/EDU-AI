// SOVEREIGN MEMORY ALLOCATOR — PHI GEOMETRIC ENGINE
// All constants derived from φ = 1.6180339887...
// No platform memory management. Deterministic. Sovereign.
// State lives in the actor; every function takes an explicit AllocatorState.
import Float "mo:core/Float";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Blob "mo:core/Blob";
import Array "mo:core/Array";
import List "mo:core/List";
import Text "mo:core/Text";
import SovereignTypes "../types/sovereign-memory";

module {

  // ── PHI CONSTANTS ─────────────────────────────────────────────────────────
  let PHI         : Float = 1.6180339887;
  let PHI_INV     : Float = 0.6180339887; // 1/φ — growth / compression trigger
  let PHI_INV_SQ  : Float = 0.3819660113; // 1/φ² — vault remainder ratio
  let PHI_MINOR   : Float = 0.2360679775; // 1 − 1/φ² — HOT zone boundary

  // ── FIBONACCI BLOCK SIZES (bytes) ─────────────────────────────────────────
  let FIB_BLOCKS : [Nat] = [
    1024, 2048, 3072, 5120, 8192, 13312, 21504,
    34816, 55296, 89088, 144384, 233472, 377856,
    611328, 989184,
  ];

  // ── FIBONACCI TTL LEVELS (heartbeats) ─────────────────────────────────────
  let FIB_TTL : [Nat] = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

  // ── Re-export shared types ────────────────────────────────────────────────
  public type Block           = SovereignTypes.Block;
  public type AllocatorState  = SovereignTypes.AllocatorState;
  public type AllocatorStats  = SovereignTypes.AllocatorStats;

  // ── newState ──────────────────────────────────────────────────────────────
  // Creates a fresh AllocatorState. Call once in the actor.
  public func newState() : AllocatorState {
    {
      blocks          = List.empty<Block>();
      var totalAllocated  = 0;
      var totalCapacity   = 1_048_576; // Start: 1MB
      var nextBlockId     = 0;
      var heartbeatCount  = 0;
    };
  };

  // ── fibAlignSize ──────────────────────────────────────────────────────────
  // Round requestedBytes up to the nearest Fibonacci block size.
  // If beyond the table max, φ-multiply until large enough.
  public func fibAlignSize(requestedBytes : Nat) : Nat {
    let found = FIB_BLOCKS.find(func(s : Nat) : Bool { s >= requestedBytes });
    switch (found) {
      case (?s) s;
      case null {
        let maxFib = FIB_BLOCKS[FIB_BLOCKS.size() - 1];
        var size = maxFib;
        while (size < requestedBytes) {
          let grown = (size.toFloat() * PHI).toInt();
          size := Int.abs(grown);
        };
        size;
      };
    };
  };

  // ── shouldGrow ────────────────────────────────────────────────────────────
  // Returns true when utilization exceeds 61.8% (1/φ)
  public func shouldGrow(state : AllocatorState) : Bool {
    if (state.totalCapacity == 0) return true;
    let utilization = state.totalAllocated.toFloat() / state.totalCapacity.toFloat();
    utilization > PHI_INV;
  };

  // ── grow ─────────────────────────────────────────────────────────────────
  // φ-geometric expansion: new capacity = floor(current × φ)
  public func grow(state : AllocatorState) {
    let grown = (state.totalCapacity.toFloat() * PHI).toInt();
    state.totalCapacity := Int.abs(grown);
  };

  // ── phiFoldBlob ───────────────────────────────────────────────────────────
  // PHI-stride sampling: extract floor(size × ratio) bytes from data.
  // Samples are spread at even φ-stride intervals across the full blob.
  func phiFoldBlob(data : Blob, ratio : Float) : Blob {
    let bytes = data.toArray();
    let srcLen = bytes.size();
    if (srcLen == 0) return data;
    let targetLen = Int.abs((srcLen.toFloat() * ratio).toInt());
    if (targetLen == 0) return "" : Blob;
    let stride = srcLen.toFloat() / targetLen.toFloat();
    let result = Array.tabulate(
      targetLen,
      func(i : Nat) : Nat8 {
        let srcIdx = Int.abs((i.toFloat() * stride).toInt());
        let clamped = Nat.min(srcIdx, srcLen - 1);
        bytes[clamped];
      },
    );
    Blob.fromArray(result);
  };

  // ── compressBlock ─────────────────────────────────────────────────────────
  // Compress block data to 61.8% (PHI_INV) via phiFoldBlob.
  // Returns (compressedBlock, vaultPayload) where vaultPayload holds
  // the 38.2% (PHI_INV_SQ) remainder for routing to ABYSSUS-VAULT.
  public func compressBlock(_state : AllocatorState, block : Block) : (Block, Blob) {
    let compressedData = phiFoldBlob(block.data, PHI_INV);
    let vaultData      = phiFoldBlob(block.data, PHI_INV_SQ);
    let compressedSize = fibAlignSize(compressedData.size());
    let compressed : Block = {
      block with
      size       = compressedSize;
      compressed = true;
      data       = compressedData;
    };
    (compressed, vaultData);
  };

  // ── assignZone ────────────────────────────────────────────────────────────
  // Zone assignment from TTL ratio relative to the Fibonacci max TTL.
  //   ratio > 0.764  → zone 0 (HOT)
  //   ratio > 0.382  → zone 1 (WARM)
  //   ratio > 0.0    → zone 2 (COLD)
  //   ratio == 0.0   → zone 3 (VAULT_PENDING)
  public func assignZone(ttlRemaining : Nat, maxTtl : Nat) : Nat {
    if (maxTtl == 0) return 3;
    let ratio = ttlRemaining.toFloat() / maxTtl.toFloat();
    if (ratio > (1.0 - PHI_MINOR)) 0
    else if (ratio > PHI_INV_SQ) 1
    else if (ratio > 0.0) 2
    else 3;
  };

  // ── heartbeat ─────────────────────────────────────────────────────────────
  // Tick all TTLs, re-zone, compress expired non-pinned blocks,
  // collect vault payloads, update totalAllocated, grow if needed.
  // Returns vault payloads for the caller to forward to ABYSSUS-VAULT.
  public func heartbeat(state : AllocatorState) : [Blob] {
    state.heartbeatCount += 1;
    let maxTtl = FIB_TTL[FIB_TTL.size() - 1];

    // Tick TTLs and re-zone all blocks
    state.blocks.mapInPlace(func(b : Block) : Block {
      if (b.pinned) {
        { b with zone = 1 };
      } else {
        let newTtl  = if (b.ttl > 0) { b.ttl - 1 : Nat } else { 0 : Nat };
        let newZone = assignZone(newTtl, maxTtl);
        { b with ttl = newTtl; zone = newZone };
      };
    });

    // Collect vault payloads from zone-3 blocks
    let vaultPayloads : List.List<Blob> = List.empty<Blob>();
    state.blocks.forEach(func(b : Block) {
      if (b.zone == 3 and not b.vaultRouted and not b.pinned) {
        let (_, vaultPayload) = compressBlock(state, b);
        vaultPayloads.add(vaultPayload);
      };
    });

    // Compress zone-3 blocks in place and update accounting
    state.blocks.mapInPlace(func(b : Block) : Block {
      if (b.zone == 3 and not b.vaultRouted and not b.pinned) {
        let (compressed, _) = compressBlock(state, b);
        if (state.totalAllocated >= b.size) {
          state.totalAllocated -= b.size;
        };
        state.totalAllocated += compressed.size;
        { compressed with vaultRouted = true };
      } else {
        b;
      };
    });

    if (shouldGrow(state)) grow(state);

    vaultPayloads.toArray();
  };

  // ── alloc ─────────────────────────────────────────────────────────────────
  // Allocate a sovereign block. Returns the new block's ID.
  // hotness: index into FIB_TTL — 0 = hottest (TTL=1), 9 = coldest (TTL=89)
  public func alloc(
    state          : AllocatorState,
    requestedBytes : Nat,
    hotness        : Nat,
    tag            : Text,
    pinned         : Bool,
  ) : Nat {
    let alignedSize = fibAlignSize(requestedBytes);
    let ttlIdx      = Nat.min(hotness, FIB_TTL.size() - 1);
    let ttl         = FIB_TTL[ttlIdx];
    let maxTtl      = FIB_TTL[FIB_TTL.size() - 1];
    let zone        = if (pinned) 1 else assignZone(ttl, maxTtl);
    let id          = state.nextBlockId;
    state.nextBlockId += 1;
    let block : Block = {
      id          = id;
      size        = alignedSize;
      zone        = zone;
      ttl         = ttl;
      compressed  = false;
      vaultRouted = false;
      pinned      = pinned;
      data        = "" : Blob;
      tag         = tag;
    };
    state.blocks.add(block);
    state.totalAllocated += alignedSize;
    if (shouldGrow(state)) grow(state);
    id;
  };

  // ── getStats ──────────────────────────────────────────────────────────────
  // Returns a health snapshot of the allocator.
  public func getStats(state : AllocatorState) : AllocatorStats {
    let zoneCounts : [var Nat] = [var 0, 0, 0, 0];
    state.blocks.forEach(func(b : Block) {
      let z = Nat.min(b.zone, 3);
      zoneCounts[z] += 1;
    });
    let utilPct = if (state.totalCapacity == 0) 0.0
      else state.totalAllocated.toFloat() / state.totalCapacity.toFloat() * 100.0;
    let blockCount = state.blocks.size();
    {
      totalAllocated   = state.totalAllocated;
      totalCapacity    = state.totalCapacity;
      blockCount       = blockCount;
      utilizationPct   = utilPct;
      zoneDistribution = Array.tabulate<Nat>(4, func(i : Nat) : Nat { zoneCounts[i] });
    };
  };

  // ── markVaultRouted ───────────────────────────────────────────────────────
  // Mark a block as vaultRouted so future heartbeat passes skip it.
  public func markVaultRouted(state : AllocatorState, blockId : Nat) {
    state.blocks.mapInPlace(func(b) {
      if (b.id == blockId) { { b with vaultRouted = true } } else { b };
    });
  };
};
