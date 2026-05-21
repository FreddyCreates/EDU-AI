// ESLL — ESL/ELL Support API mixin
import EsllLib "../lib/esll";
import Types "../types/esll";

mixin (
  esllStore : EsllLib.EsllStore
) {
  public shared ({ caller }) func upsertEslProfile(
    profile : Types.EslProfile
  ) : async () {
    ignore caller;
    EsllLib.upsertProfile(esllStore, profile)
  };

  public query func getEslProfile(
    studentPrincipal : Principal
  ) : async ?Types.EslProfile {
    EsllLib.getProfile(esllStore, studentPrincipal)
  };

  public shared ({ caller }) func setEslScaffolding(
    studentPrincipal : Principal,
    enabled : Bool
  ) : async Bool {
    ignore caller;
    EsllLib.setScaffolding(esllStore, studentPrincipal, enabled)
  };

  public query func getEsllStats() : async Types.EsllStats {
    EsllLib.getStats(esllStore)
  };
}
