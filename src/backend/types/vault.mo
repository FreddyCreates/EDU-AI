// ABYSSUS-VAULT inter-canister interface
// The sovereign memory heartbeat routes compressed payloads here.
module {

  /// Remote actor interface for the vault canister.
  /// The main heartbeat caller casts the vault principal to this type and
  /// forwards compressed seed blobs produced by SovereignMemory.heartbeat().
  public type AbyssusVaultActor = actor {
    receiveCompressedSeeds : (payloads : [Blob]) -> async ();
  };
};
