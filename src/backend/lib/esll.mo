// ESLL — ESL/ELL Support lib
import Map "mo:core/Map";
import Types "../types/esll";

module {
  public type EsllStore = Map.Map<Principal, Types.EslProfile>;

  public func newStore() : EsllStore {
    Map.empty()
  };

  public func upsertProfile(
    store : EsllStore,
    profile : Types.EslProfile
  ) : () {
    store.add(profile.studentPrincipal, profile)
  };

  public func getProfile(
    store : EsllStore,
    studentPrincipal : Principal
  ) : ?Types.EslProfile {
    store.get(studentPrincipal)
  };

  public func setScaffolding(
    store : EsllStore,
    studentPrincipal : Principal,
    enabled : Bool
  ) : Bool {
    switch (store.get(studentPrincipal)) {
      case null { false };
      case (?p) {
        store.add(studentPrincipal, { p with vocabScaffoldingEnabled = enabled; adaptedPromptsEnabled = enabled });
        true
      };
    }
  };

  public func getStats(
    store : EsllStore
  ) : Types.EsllStats {
    let all = store.values().toArray();
    let scaffolded = all.filter(func(p) { p.vocabScaffoldingEnabled }).size();
    {
      totalEllStudents = all.size();
      byProficiencyLevel = [];
      scaffoldingEnabledCount = scaffolded;
    }
  };
}
