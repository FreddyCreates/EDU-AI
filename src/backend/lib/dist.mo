// DIST — District Engine lib
import Map "mo:core/Map";
import List "mo:core/List";
import Types "../types/dist";
import Array "mo:core/Array";

module {
  public type DistrictStore = Map.Map<Types.DistrictId, Types.DistrictProfile>;
  public type TrendStore    = List.List<Types.CrossSchoolTrend>;
  public type GapStore      = List.List<Types.AchievementGapRecord>;

  public func newDistrictStore() : DistrictStore {
    Map.empty()
  };

  public func newTrendStore() : TrendStore {
    List.empty()
  };

  public func newGapStore() : GapStore {
    List.empty()
  };

    // Fibonacci floor helper — returns largest F(n) <= n
  func fibFloorNat(n : Nat) : Nat {
    var a : Nat = 1;
    var b : Nat = 1;
    while (b <= n) {
      let tmp = a + b;
      a := b;
      b := tmp;
    };
    a
  };

public func createDistrict(
    store : DistrictStore,
    name : Text,
    state : Text,
    contactEmail : Text,
    createdAt : Int
  ) : Types.DistrictId {
    let id = store.size() + 1;
    let profile : Types.DistrictProfile = {
      id;
      name;
      state;
      schoolIds = [];
      contactEmail;
      createdAt;
    };
    store.add(id, profile);
    id
  };

  public func getDistrict(
    store : DistrictStore,
    id : Types.DistrictId
  ) : ?Types.DistrictProfile {
    store.get(id)
  };

  public func addSchoolToDistrict(
    store : DistrictStore,
    districtId : Types.DistrictId,
    schoolId : Types.SchoolId
  ) : Bool {
    switch (store.get(districtId)) {
      case null { false };
      case (?p) {
        let updated = { p with schoolIds = p.schoolIds.concat([schoolId]) };
        store.add(districtId, updated);
        true
      };
    }
  };

  public func getCrossSchoolTrends(
    trendStore : TrendStore,
    districtId : Types.DistrictId
  ) : [Types.CrossSchoolTrend] {
    ignore districtId;
    trendStore.toArray()
  };

  public func recordTrend(
    trendStore : TrendStore,
    trend : Types.CrossSchoolTrend
  ) : () {
    trendStore.add(trend)
  };

  public func getAchievementGaps(
    gapStore : GapStore,
    districtId : Types.DistrictId
  ) : [Types.AchievementGapRecord] {
    gapStore.filter(func(g) { g.districtId == districtId }).toArray()
  };

  public func computeDistrictStats(
    store : DistrictStore,
    trendStore : TrendStore
  ) : Types.DistrictStats {
    var totalSchools : Nat = 0;
    for ((_k, p) in store.entries()) { totalSchools += p.schoolIds.size() };
    let trendCount = trendStore.size();
    // PHI=1618/1000 integer arithmetic for gap index
    let rawGap = if (trendCount > 0) { (trendCount * 1618) / 1000 } else { 0 };
    // Fibonacci floor: find largest F(n) <= rawGap
    let fibFloor = fibFloorNat(rawGap);
    {
      totalSchools;
      totalStudents = 0;   // populated by STUD registry
      avgMasteryScore = 0; // populated by passport aggregation
      achievementGapIndex = fibFloor;
    }
  };
}
