// MHCK — Mental Health Check-In API mixin (anonymous, school-level only)
import MhckLib "../lib/mhck";
import Types "../types/mhck";

mixin (
  checkInStore  : MhckLib.CheckInStore,
  aggregateStore : MhckLib.AggregateStore
) {
  // No caller link stored — anonymous by design (PRTL_MHCK)
  public shared func submitMoodCheckIn(
    checkIn : Types.MentalHealthCheckIn
  ) : async () {
    MhckLib.recordCheckIn(checkInStore, aggregateStore, checkIn);
  };

  public query func getMoodAggregate(
    schoolId : Nat
  ) : async ?Types.MoodAggregate {
    MhckLib.getSchoolAggregate(aggregateStore, schoolId)
  };

  public query func getAllMoodAggregates() : async [Types.MoodAggregate] {
    MhckLib.getAllAggregates(aggregateStore)
  };

  public query func getMhckStats() : async { totalCheckIns : Nat; schoolsMonitored : Nat } {
    MhckLib.getStats(checkInStore, aggregateStore)
  };
}
