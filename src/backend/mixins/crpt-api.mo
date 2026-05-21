// CRPT — Career Pathway Engine API mixin
import CrptLib "../lib/crpt";
import Types "../types/crpt";

mixin (
  pathwayStore : CrptLib.PathwayStore,
  crptCounter  : CrptLib.Counter
) {
  public shared ({ caller }) func upsertCareerPathway(
    pathway : Types.CareerPathway
  ) : async Nat {
    ignore caller;
    CrptLib.createOrUpdatePathway(pathwayStore, crptCounter, pathway)
  };

  public query ({ caller }) func getMyCareerPathway() : async ?Types.CareerPathway {
    CrptLib.getPathway(pathwayStore, caller)
  };

  public shared ({ caller }) func recordCareerExploration(
    entry : Types.CareerExplorationEntry
  ) : async Bool {
    CrptLib.recordExploration(pathwayStore, caller, entry)
  };

  public shared ({ caller }) func computeCareerRecommendations(
    passportMastery : [(Nat, Nat)]
  ) : async [Types.CareerCluster] {
    ignore caller;
    CrptLib.computeRecommendedClusters(passportMastery)
  };

  public query func getCrptStats() : async Types.CrptStats {
    CrptLib.getStats(pathwayStore)
  };
}
