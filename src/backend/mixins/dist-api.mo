// DIST — District Engine API mixin
import DistLib "../lib/dist";
import Types "../types/dist";

mixin (
  districtStore : DistLib.DistrictStore,
  trendStore    : DistLib.TrendStore,
  gapStore      : DistLib.GapStore
) {
  public shared ({ caller }) func createDistrict(
    name : Text,
    state : Text,
    contactEmail : Text,
    createdAt : Int
  ) : async Types.DistrictId {
    ignore caller;
    DistLib.createDistrict(districtStore, name, state, contactEmail, createdAt)
  };

  public query func getDistrict(
    districtId : Types.DistrictId
  ) : async ?Types.DistrictProfile {
    DistLib.getDistrict(districtStore, districtId)
  };

  public shared ({ caller }) func addSchoolToDistrict(
    districtId : Types.DistrictId,
    schoolId : Types.SchoolId
  ) : async Bool {
    ignore caller;
    DistLib.addSchoolToDistrict(districtStore, districtId, schoolId)
  };

  public query func getDistrictStats(
    districtId : Types.DistrictId
  ) : async Types.DistrictStats {
    ignore districtId;
    DistLib.computeDistrictStats(districtStore, trendStore)
  };

  public query func getCrossSchoolTrends(
    districtId : Types.DistrictId
  ) : async [Types.CrossSchoolTrend] {
    DistLib.getCrossSchoolTrends(trendStore, districtId)
  };

  public query func getAchievementGaps(
    districtId : Types.DistrictId
  ) : async [Types.AchievementGapRecord] {
    DistLib.getAchievementGaps(gapStore, districtId)
  };
}
