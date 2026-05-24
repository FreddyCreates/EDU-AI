// PNDR — Pandoras Actor types
// Pandoras Actor unlocks hidden knowledge pathways and discovery mechanisms
import Common "common";

module {
  /// Knowledge discovery state — tracks what has been unlocked
  public type DiscoveryState = {
    #sealed;      // not yet discovered
    #glimpsed;    // partially revealed
    #unlocked;    // fully accessible
    #mastered;    // complete understanding achieved
  };

  /// A hidden knowledge fragment waiting to be discovered
  public type KnowledgeFragment = {
    id : Nat;
    title : Text;
    domain : Text;           // subject/topic domain
    prerequisiteIds : [Nat]; // fragments that must be unlocked first
    complexityTier : Nat;    // Fibonacci-scaled difficulty (1, 2, 3, 5, 8, 13...)
    state : DiscoveryState;
    revealedAt : ?Common.Timestamp;
    contentHash : ?Blob;     // sovereign memory reference
  };

  /// A student's Pandora vault — their personal discovery journey
  public type PandoraVault = {
    owner : Common.UserId;
    createdAt : Common.Timestamp;
    totalFragments : Nat;
    unlockedCount : Nat;
    masteredCount : Nat;
    lastDiscoveryAt : ?Common.Timestamp;
    coherenceScore : Nat;    // Fibonacci-floored discovery coherence
  };

  /// Discovery event — logged when a fragment is unlocked
  public type DiscoveryEvent = {
    id : Nat;
    studentPrincipal : Principal;
    fragmentId : Nat;
    previousState : DiscoveryState;
    newState : DiscoveryState;
    timestamp : Common.Timestamp;
    triggerContext : Text;   // what action triggered the discovery
  };

  /// Pandora pathway — a curated sequence of fragments
  public type DiscoveryPathway = {
    id : Nat;
    name : Text;
    description : Text;
    fragmentIds : [Nat];
    gradeLevel : Common.GradeLevel;
    domain : Text;
    estimatedSessions : Nat; // Fibonacci-scaled
    createdAt : Common.Timestamp;
  };

  /// Stats for the Pandoras system
  public type PandoraStats = {
    totalFragments : Nat;
    totalVaults : Nat;
    totalDiscoveries : Nat;
    avgCoherence : Nat;      // Fibonacci-floored
    topDomain : Text;
    fibCycleStamp : Nat;
  };
}
