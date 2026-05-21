// IESM — IEP Accommodation Layer lib
import Map "mo:core/Map";
import Types "../types/iesm";

module {
  public type IesmStore = Map.Map<Principal, Types.IepAccommodation>;

  public func newStore() : IesmStore {
    Map.empty()
  };

  public func setAccommodations(
    store : IesmStore,
    record : Types.IepAccommodation
  ) : () {
    store.add(record.studentPrincipal, record)
  };

  public func getAccommodations(
    store : IesmStore,
    studentPrincipal : Principal
  ) : ?Types.IepAccommodation {
    store.get(studentPrincipal)
  };

  public func hasAccommodation(
    store : IesmStore,
    studentPrincipal : Principal,
    accomType : Types.AccommodationType
  ) : Bool {
    switch (store.get(studentPrincipal)) {
      case null { false };
      case (?rec) {
        if (not rec.active) { return false };
        rec.accommodationTypes.find(func(a) { debug_show(a) == debug_show(accomType) }) != null
      };
    }
  };

  public func deactivateAccommodations(
    store : IesmStore,
    studentPrincipal : Principal
  ) : Bool {
    switch (store.get(studentPrincipal)) {
      case null { false };
      case (?rec) {
        store.add(studentPrincipal, { rec with active = false });
        true
      };
    }
  };

  public func getStats(
    store : IesmStore
  ) : Types.IesmStats {
    let recs = store.values().toArray();
    let active = recs.filter(func(r) { r.active });
    {
      totalStudentsWithAccom = recs.size();
      mostCommonAccom = "extendedTime";
      activeAccomCount = active.size();
    }
  };
}
