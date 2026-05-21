// CRPT — Career Pathway Engine lib
import Map "mo:core/Map";
import Types "../types/crpt";
import Array "mo:core/Array";

module {
  public type PathwayStore = Map.Map<Principal, Types.CareerPathway>;
  public type Counter      = { var nextId : Nat };

  public func newStore() : PathwayStore {
    Map.empty()
  };

  public func newCounter() : Counter {
    { var nextId = 1 }
  };

  public func createOrUpdatePathway(
    store : PathwayStore,
    counter : Counter,
    pathway : Types.CareerPathway
  ) : Nat {
    let id = if (pathway.id == 0) {
      let newId = counter.nextId;
      counter.nextId += 1;
      newId
    } else { pathway.id };
    store.add(pathway.studentPrincipal, { pathway with id });
    id
  };

  public func getPathway(
    store : PathwayStore,
    studentPrincipal : Principal
  ) : ?Types.CareerPathway {
    store.get(studentPrincipal)
  };

  public func recordExploration(
    store : PathwayStore,
    studentPrincipal : Principal,
    entry : Types.CareerExplorationEntry
  ) : Bool {
    switch (store.get(studentPrincipal)) {
      case null { false };
      case (?p) {
        store.add(studentPrincipal, { p with explorationHistory = p.explorationHistory.concat([entry]) });
        true
      };
    }
  };

  public func computeRecommendedClusters(
    passportMastery : [(Nat, Nat)]
  ) : [Types.CareerCluster] {
    // PHI-weighted: high mastery subjects map to clusters
    let avgMastery = if (passportMastery.size() > 0) {
      var total : Nat = 0;
      for (pair in passportMastery.vals()) { total += pair.1 };
      total / passportMastery.size()
    } else { 0 };
    if (avgMastery >= 55) { ["STEM", "Arts", "Health"] }
    else if (avgMastery >= 21) { ["Business", "Education"] }
    else { ["General"] }
  };

  public func getStats(
    store : PathwayStore
  ) : Types.CrptStats {
    let all = store.values().toArray();
    let avgDepth = if (all.size() > 0) {
      var depthSum : Nat = 0;
      for (p in all.vals()) { depthSum += p.explorationHistory.size() };
      depthSum / all.size()
    } else { 0 };
    { totalPathways = all.size(); topClusters = []; avgExplorationDepth = avgDepth }
  };
}
