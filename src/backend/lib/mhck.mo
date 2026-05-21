// MHCK — Mental Health Check-In lib (anonymous, ephemeral by design)
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/mhck";

module {
  // Check-ins are stored without any Principal link
  public type CheckInStore  = List.List<Types.MentalHealthCheckIn>;
  public type AggregateStore = Map.Map<Nat, Types.MoodAggregate>; // keyed by schoolId

  public func newCheckInStore() : CheckInStore {
    List.empty()
  };

  public func newAggregateStore() : AggregateStore {
    Map.empty()
  };

  // Fibonacci floor helper
  func fibFloorNat(n : Nat) : Nat {
    let fibs = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
    let sc = n * 1618 / 1000;
    var best : Nat = 1;
    for (f in fibs.vals()) {
      if (f <= sc) { best := f };
    };
    best
  };

  // Recompute and upsert aggregate for a school from all check-ins
  func recomputeAggregate(
    store : CheckInStore,
    aggStore : AggregateStore,
    schoolId : Nat
  ) {
    let schoolCheckIns = store.filter(func(ci) { ci.schoolId == schoolId });
    let count = schoolCheckIns.size();
    if (count == 0) { return };
    var totalMood : Nat = 0;
    for (ci in schoolCheckIns.values()) { totalMood += ci.moodScore };
    let avgRaw = totalMood / count;
    let lowCount = schoolCheckIns.filter(func(ci) { ci.moodScore <= 3 }).size();
    let highCount = schoolCheckIns.filter(func(ci) { ci.moodScore >= 8 }).size();
    let now = Time.now();
    let agg : Types.MoodAggregate = {
      schoolId;
      periodStart = now - 30_000_000_000; // last 30s of nanoseconds, approximate
      periodEnd   = now;
      avgMoodScore = fibFloorNat(avgRaw);
      checkInCount = count;
      lowMoodCount = lowCount;
      highMoodCount = highCount;
    };
    aggStore.add(schoolId, agg);
  };

  public func recordCheckIn(
    store : CheckInStore,
    aggStore : AggregateStore,
    checkIn : Types.MentalHealthCheckIn
  ) : () {
    store.add(checkIn);
    recomputeAggregate(store, aggStore, checkIn.schoolId);
  };

  public func getSchoolAggregate(
    aggStore : AggregateStore,
    schoolId : Nat
  ) : ?Types.MoodAggregate {
    aggStore.get(schoolId)
  };

  public func getAllAggregates(
    aggStore : AggregateStore
  ) : [Types.MoodAggregate] {
    aggStore.values().toArray()
  };

  public func getStats(
    checkInStore : CheckInStore,
    aggStore : AggregateStore
  ) : { totalCheckIns : Nat; schoolsMonitored : Nat } {
    {
      totalCheckIns   = checkInStore.size();
      schoolsMonitored = aggStore.size();
    }
  };
}
