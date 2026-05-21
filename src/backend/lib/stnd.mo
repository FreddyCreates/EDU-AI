// STND — Standards Alignment Registry lib
import Map "mo:core/Map";
import List "mo:core/List";
import Types "../types/stnd";

module {
  public type StandardStore   = Map.Map<Types.StandardCode, Types.Standard>;
  public type AlignmentStore  = List.List<Types.StandardAlignment>;
  /// Tracks DIGT-generated content counts per standard code.
  public type DigtContentStore = Map.Map<Types.StandardCode, Types.DigtStatus>;

  public func newStandardStore() : StandardStore {
    Map.empty()
  };

  public func newAlignmentStore() : AlignmentStore {
    List.empty()
  };

  public func registerStandard(
    store : StandardStore,
    standard : Types.Standard
  ) : () {
    store.add(standard.code, standard)
  };

  public func getStandard(
    store : StandardStore,
    code : Types.StandardCode
  ) : ?Types.Standard {
    store.get(code)
  };

  public func getStandardsByGrade(
    store : StandardStore,
    gradeLevel : Nat
  ) : [Types.Standard] {
    store.values().filter(func(s) { s.gradeLevel == gradeLevel }).toArray()
  };

  public func getStandardsBySubject(
    store : StandardStore,
    subject : Text
  ) : [Types.Standard] {
    store.values().filter(func(s) { s.subject == subject }).toArray()
  };

  public func alignContent(
    store : AlignmentStore,
    alignment : Types.StandardAlignment
  ) : () {
    store.add(alignment)
  };

  public func getAlignments(
    store : AlignmentStore,
    standardCode : Types.StandardCode
  ) : [Types.StandardAlignment] {
    store.filter(func(a) { a.standardCode == standardCode }).toArray()
  };

  public func getStats(
    store : StandardStore
  ) : Types.StndStats {
    let total = store.size();
    { totalStandards = total; byFramework = []; byGrade = [] }
  };

  public func newDigtContentStore() : DigtContentStore {
    Map.empty()
  };

  /// Called by DIGT when it finishes digesting content for a standard.
  public func recordDigtContent(
    store        : DigtContentStore,
    standardCode : Types.StandardCode,
    conceptCount : Nat,
    quizSeedCount : Nat,
    now          : Int,
  ) : () {
    let prev = switch (store.get(standardCode)) {
      case (?s) s;
      case null ({ standardId = standardCode; hasContent = false; conceptCount = 0; quizSeedCount = 0; lastDigested = null });
    };
    store.add(standardCode, {
      prev with
      hasContent    = true;
      conceptCount  = prev.conceptCount + conceptCount;
      quizSeedCount = prev.quizSeedCount + quizSeedCount;
      lastDigested  = ?now;
    });
  };

  public func getDigtStatus(
    store        : DigtContentStore,
    standardCode : Types.StandardCode,
  ) : Types.DigtStatus {
    switch (store.get(standardCode)) {
      case (?s) s;
      case null ({ standardId = standardCode; hasContent = false; conceptCount = 0; quizSeedCount = 0; lastDigested = null });
    };
  };
}
