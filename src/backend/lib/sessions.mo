import Time "mo:core/Time";
import Map "mo:core/Map";
import List "mo:core/List";
import Common "../types/common";
import Types "../types/sessions";

module {
  public type ResultStore = Map.Map<Common.UserId, List.List<Types.QuizResult>>;

  public func saveResult(
    resultsStore : ResultStore,
    caller : Common.UserId,
    result : Types.QuizResult,
  ) {
    let existing = switch (resultsStore.get(caller)) {
      case (?list) list;
      case null List.empty<Types.QuizResult>();
    };
    existing.add(result);
    resultsStore.add(caller, existing);
  };

  public func getResults(
    resultsStore : ResultStore,
    caller : Common.UserId,
  ) : [Types.QuizResult] {
    switch (resultsStore.get(caller)) {
      case (?list) list.toArray();
      case null [];
    };
  };

  public func getSessionCountToday(
    resultsStore : ResultStore,
  ) : Nat {
    let today = Time.now() / 86_400_000_000_000;
    var count = 0;
    for ((_, list) in resultsStore.entries()) {
      for (result in list.values()) {
        let day = result.timestamp / 86_400_000_000_000;
        if (day == today) { count += 1 };
      };
    };
    count;
  };
};
