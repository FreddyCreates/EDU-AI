// PNDR — Pandoras Actor lib
// Knowledge discovery engine — unlocks hidden learning pathways
import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Types "../types/pndr";
import Common "../types/common";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";

module {
  // ── Store types ────────────────────────────────────────────────────────────
  public type FragmentStore = Map.Map<Nat, Types.KnowledgeFragment>;
  public type VaultStore = Map.Map<Common.UserId, Types.PandoraVault>;
  public type EventStore = List.List<Types.DiscoveryEvent>;
  public type PathwayStore = Map.Map<Nat, Types.DiscoveryPathway>;
  public type Counter = { var nextId : Nat };

  // ── Store constructors ─────────────────────────────────────────────────────
  public func newFragmentStore() : FragmentStore { Map.empty() };
  public func newVaultStore() : VaultStore { Map.empty() };
  public func newEventStore() : EventStore { List.empty() };
  public func newPathwayStore() : PathwayStore { Map.empty() };
  public func newCounter() : Counter { { var nextId = 1 } };

  // ── Fibonacci helpers ──────────────────────────────────────────────────────
  let FIB_SCALE : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

  func fibFloor(n : Nat) : Nat {
    var best : Nat = 1;
    for (f in FIB_SCALE.vals()) {
      if (f <= n) { best := f };
    };
    best
  };

  func fibCeil(n : Nat) : Nat {
    for (f in FIB_SCALE.vals()) {
      if (f >= n) { return f };
    };
    144
  };

  // ── Fragment management ────────────────────────────────────────────────────
  public func createFragment(
    store : FragmentStore,
    counter : Counter,
    title : Text,
    domain : Text,
    prerequisiteIds : [Nat],
    complexityTier : Nat,
    contentHash : ?Blob
  ) : Nat {
    let id = counter.nextId;
    counter.nextId += 1;
    let fragment : Types.KnowledgeFragment = {
      id;
      title;
      domain;
      prerequisiteIds;
      complexityTier = fibCeil(complexityTier);
      state = #sealed;
      revealedAt = null;
      contentHash;
    };
    store.add(id, fragment);
    id
  };

  public func getFragment(store : FragmentStore, id : Nat) : ?Types.KnowledgeFragment {
    store.get(id)
  };

  public func getFragmentsByDomain(store : FragmentStore, domain : Text) : [Types.KnowledgeFragment] {
    let filtered = Array.filter<Types.KnowledgeFragment>(
      store.vals().toArray(),
      func(f) { f.domain == domain }
    );
    filtered
  };

  // ── Vault management ───────────────────────────────────────────────────────
  public func getOrCreateVault(
    vaultStore : VaultStore,
    owner : Common.UserId,
    now : Common.Timestamp
  ) : Types.PandoraVault {
    switch (vaultStore.get(owner)) {
      case (?v) v;
      case null {
        let vault : Types.PandoraVault = {
          owner;
          createdAt = now;
          totalFragments = 0;
          unlockedCount = 0;
          masteredCount = 0;
          lastDiscoveryAt = null;
          coherenceScore = 0;
        };
        vaultStore.add(owner, vault);
        vault
      };
    };
  };

  public func getVault(vaultStore : VaultStore, owner : Common.UserId) : ?Types.PandoraVault {
    vaultStore.get(owner)
  };

  // ── Discovery mechanics ────────────────────────────────────────────────────
  func checkPrerequisites(
    fragmentStore : FragmentStore,
    fragment : Types.KnowledgeFragment
  ) : Bool {
    for (prereqId in fragment.prerequisiteIds.vals()) {
      switch (fragmentStore.get(prereqId)) {
        case (?prereq) {
          switch (prereq.state) {
            case (#unlocked or #mastered) {};
            case _ { return false };
          };
        };
        case null { return false };
      };
    };
    true
  };

  public func attemptDiscovery(
    fragmentStore : FragmentStore,
    vaultStore : VaultStore,
    eventStore : EventStore,
    eventCounter : Counter,
    owner : Common.UserId,
    fragmentId : Nat,
    triggerContext : Text,
    now : Common.Timestamp
  ) : { #ok : Types.DiscoveryEvent; #err : Text } {
    switch (fragmentStore.get(fragmentId)) {
      case null { #err("Fragment not found") };
      case (?fragment) {
        // Check if already unlocked
        switch (fragment.state) {
          case (#unlocked or #mastered) {
            #err("Fragment already discovered")
          };
          case _ {
            // Check prerequisites
            if (not checkPrerequisites(fragmentStore, fragment)) {
              #err("Prerequisites not met")
            } else {
              // Perform discovery
              let previousState = fragment.state;
              let newState : Types.DiscoveryState = switch (previousState) {
                case (#sealed) #glimpsed;
                case (#glimpsed) #unlocked;
                case _ previousState;
              };

              // Update fragment
              let updated : Types.KnowledgeFragment = {
                fragment with
                state = newState;
                revealedAt = ?now;
              };
              fragmentStore.add(fragmentId, updated);

              // Log event
              let eventId = eventCounter.nextId;
              eventCounter.nextId += 1;
              let event : Types.DiscoveryEvent = {
                id = eventId;
                studentPrincipal = owner;
                fragmentId;
                previousState;
                newState;
                timestamp = now;
                triggerContext;
              };
              eventStore.add(event);

              // Update vault
              let vault = getOrCreateVault(vaultStore, owner, now);
              let newUnlocked = switch (newState) {
                case (#unlocked) vault.unlockedCount + 1;
                case _ vault.unlockedCount;
              };
              let updatedVault : Types.PandoraVault = {
                vault with
                unlockedCount = newUnlocked;
                lastDiscoveryAt = ?now;
                coherenceScore = fibFloor((newUnlocked * 100) / Nat.max(vault.totalFragments, 1));
              };
              vaultStore.add(owner, updatedVault);

              #ok(event)
            };
          };
        };
      };
    };
  };

  // ── Mastery progression ────────────────────────────────────────────────────
  public func markMastered(
    fragmentStore : FragmentStore,
    vaultStore : VaultStore,
    owner : Common.UserId,
    fragmentId : Nat,
    now : Common.Timestamp
  ) : Bool {
    switch (fragmentStore.get(fragmentId)) {
      case null false;
      case (?fragment) {
        switch (fragment.state) {
          case (#unlocked) {
            let updated : Types.KnowledgeFragment = { fragment with state = #mastered };
            fragmentStore.add(fragmentId, updated);

            switch (vaultStore.get(owner)) {
              case (?vault) {
                let updatedVault : Types.PandoraVault = {
                  vault with
                  masteredCount = vault.masteredCount + 1;
                  coherenceScore = fibFloor((vault.masteredCount + 1) * 144 / Nat.max(vault.totalFragments, 1));
                };
                vaultStore.add(owner, updatedVault);
              };
              case null {};
            };
            true
          };
          case _ false;
        };
      };
    };
  };

  // ── Pathway management ─────────────────────────────────────────────────────
  public func createPathway(
    pathwayStore : PathwayStore,
    counter : Counter,
    name : Text,
    description : Text,
    fragmentIds : [Nat],
    gradeLevel : Common.GradeLevel,
    domain : Text,
    now : Common.Timestamp
  ) : Nat {
    let id = counter.nextId;
    counter.nextId += 1;
    let pathway : Types.DiscoveryPathway = {
      id;
      name;
      description;
      fragmentIds;
      gradeLevel;
      domain;
      estimatedSessions = fibCeil(fragmentIds.size());
      createdAt = now;
    };
    pathwayStore.add(id, pathway);
    id
  };

  public func getPathway(pathwayStore : PathwayStore, id : Nat) : ?Types.DiscoveryPathway {
    pathwayStore.get(id)
  };

  public func getPathwaysByDomain(pathwayStore : PathwayStore, domain : Text) : [Types.DiscoveryPathway] {
    Array.filter<Types.DiscoveryPathway>(
      pathwayStore.vals().toArray(),
      func(p) { p.domain == domain }
    )
  };

  // ── Discovery events query ─────────────────────────────────────────────────
  public func getDiscoveryHistory(
    eventStore : EventStore,
    owner : Common.UserId
  ) : [Types.DiscoveryEvent] {
    eventStore.filter(func(e) { e.studentPrincipal == owner }).toArray()
  };

  // ── Stats ──────────────────────────────────────────────────────────────────
  public func getStats(
    fragmentStore : FragmentStore,
    vaultStore : VaultStore,
    eventStore : EventStore,
    fibCycleStamp : Nat
  ) : Types.PandoraStats {
    let fragments = fragmentStore.vals().toArray();
    let vaults = vaultStore.vals().toArray();

    // Calculate average coherence
    var totalCoherence : Nat = 0;
    for (v in vaults.vals()) {
      totalCoherence += v.coherenceScore;
    };
    let avgCoherence = if (vaults.size() > 0) fibFloor(totalCoherence / vaults.size()) else 0;

    // Find top domain
    let domainCounts = Map.empty<Text, Nat>();
    for (f in fragments.vals()) {
      switch (domainCounts.get(f.domain)) {
        case (?c) domainCounts.add(f.domain, c + 1);
        case null domainCounts.add(f.domain, 1);
      };
    };

    var topDomain = "";
    var topCount : Nat = 0;
    for ((domain, count) in domainCounts.entries()) {
      if (count > topCount) {
        topDomain := domain;
        topCount := count;
      };
    };

    {
      totalFragments = fragments.size();
      totalVaults = vaults.size();
      totalDiscoveries = eventStore.size();
      avgCoherence;
      topDomain;
      fibCycleStamp;
    }
  };

  // ── Seed initial fragments ─────────────────────────────────────────────────
  public func seedFragments(store : FragmentStore, counter : Counter) {
    // Seed foundational knowledge fragments
    let seeds : [(Text, Text, [Nat], Nat)] = [
      ("Number Sense", "Mathematics", [], 1),
      ("Basic Operations", "Mathematics", [1], 2),
      ("Fractions Foundation", "Mathematics", [2], 3),
      ("Algebraic Thinking", "Mathematics", [2, 3], 5),
      ("Reading Comprehension", "Language Arts", [], 1),
      ("Writing Fundamentals", "Language Arts", [5], 2),
      ("Scientific Method", "Science", [], 2),
      ("Basic Physics", "Science", [1, 7], 3),
    ];

    for ((title, domain, prereqs, complexity) in seeds.vals()) {
      ignore createFragment(store, counter, title, domain, prereqs, complexity, null);
    };
  };
}
