import Types     "../types/qryx";
import ETypes    "../types/engines";
import LTypes    "../types/laws";
import Time      "mo:core/Time";
import Array     "mo:core/Array";
import Queue "mo:core/Queue";

module {
  // ── PHI constants (×1000) ────────────────────────────────────────────────
  let PHI_NUM : Nat = 1618;
  let PHI_DEN : Nat = 1000;

  let FIB_SEQUENCE : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

  func fibFloor(n : Nat) : Nat {
    if (n == 0) return 1;
    var result : Nat = 1;
    for (f in FIB_SEQUENCE.values()) {
      if (f <= n) { result := f };
    };
    result;
  };

  // ── Clamp limit to max 55 = F(10) ───────────────────────────────────────
  func clampLimit(n : Nat) : Nat {
    if (n > 55) 55 else if (n == 0) 1 else n;
  };

  // ── Text filter match helper ─────────────────────────────────────────────
  func matchesFilter(text : Text, filter : Types.QueryFilter) : Bool {
    switch (filter.operator) {
      case "eq"       { text == filter.value };
      case "contains" { text.size() > 0 and filter.value.size() > 0 };
      case _          { false };
    };
  };

  // ── Score relevance (how many filters matched × PHI factor, floored) ────
  func scoreRelevance(matchCount : Nat, filterCount : Nat) : Nat {
    if (filterCount == 0) return 8; // default F(6)
    let raw = matchCount * PHI_NUM / PHI_DEN;
    fibFloor(raw);
  };

  // ── Query engines ────────────────────────────────────────────────────────
  func queryEngines(
    filters : [Types.QueryFilter],
    limit   : Nat,
    engines : [ETypes.SovereignEngine],
  ) : [Types.QueryResultItem] {
    var results : [Types.QueryResultItem] = [];
    for (eng in engines.values()) {
      var matchCount : Nat = 0;
      for (f in filters.values()) {
        let fieldVal = switch (f.field) {
          case "domain"        { eng.domain };
          case "codeName"      { eng.codeName };
          case "mathFoundation" { eng.mathFoundation };
          case _               { "" };
        };
        if (matchesFilter(fieldVal, f)) { matchCount += 1 };
      };
      if (filters.size() == 0 or matchCount > 0) {
        let score = scoreRelevance(matchCount, filters.size());
        let item : Types.QueryResultItem = {
          id    = eng.codeName;
          data  = "{\"id\":\"" # eng.codeName # "\",\"domain\":\"" # eng.domain # "\",\"mathFoundation\":\"" # eng.mathFoundation # "\"}";
          score;
        };
        results := results.concat([item]);
        if (results.size() >= limit) return results;
      };
    };
    results;
  };

  // ── Query laws ───────────────────────────────────────────────────────────
  func queryLaws(
    filters : [Types.QueryFilter],
    limit   : Nat,
    laws    : [LTypes.SovereignLaw],
  ) : [Types.QueryResultItem] {
    var results : [Types.QueryResultItem] = [];
    for (law in laws.values()) {
      var matchCount : Nat = 0;
      for (f in filters.values()) {
        let fieldVal = switch (f.field) {
          case "domain"     { law.domain };
          case "latinName"  { law.latinName };
          case "attribution" { law.attribution };
          case _            { "" };
        };
        if (matchesFilter(fieldVal, f)) { matchCount += 1 };
      };
      if (filters.size() == 0 or matchCount > 0) {
        let score = scoreRelevance(matchCount, filters.size());
        let item : Types.QueryResultItem = {
          id    = law.latinName;
          data  = "{\"id\":\"" # law.latinName # "\",\"domain\":\"" # law.domain # "\",\"attribution\":\"" # law.attribution # "\"}";
          score;
        };
        results := results.concat([item]);
        if (results.size() >= limit) return results;
      };
    };
    results;
  };

  // ── Stable state ─────────────────────────────────────────────────────────
  let MAX_HISTORY : Nat = 34; // F(9)

  public type State = {
    history : Queue.Queue<Types.QueryResult>;
  };

  public func newState() : State = {
    history = Queue.empty<Types.QueryResult>();
  };

  // ── Core execute ─────────────────────────────────────────────────────────
  public func executeQuery(
    state     : State,
    qry       : Types.SovereignQuery,
    engineData : [ETypes.SovereignEngine],
    lawData   : [LTypes.SovereignLaw],
  ) : Types.QueryResult {
    let now   = Time.now();
    let limit = clampLimit(qry.limit);

    let targetText : Text = switch (qry.target) {
      case (#engines)       "engines";
      case (#laws)          "laws";
      case (#entanglements) "entanglements";
      case (#passport)      "passport";
      case (#builders)      "builders";
      case (#curriculum)    "curriculum";
      case (#mltv)          "mltv";
      case (#sdk)           "sdk";
    };

    let items : [Types.QueryResultItem] = switch (qry.target) {
      case (#engines) { queryEngines(qry.filters, limit, engineData) };
      case (#laws)    { queryLaws(qry.filters, limit, lawData) };
      case _          { [] };
    };

    let result : Types.QueryResult = {
      queryId        = qry.id;
      target         = targetText;
      items;
      totalFound     = items.size();
      fibFlooredAt   = fibFloor(items.size());
      executionCycles = 1;
      timestamp      = now;
    };

    while (state.history.size() >= MAX_HISTORY) {
      ignore state.history.popFront();
    };
    state.history.pushBack(result);
    result;
  };

  public func getQueryHistory(state : State) : [Types.QueryResult] {
    state.history.toArray();
  };
};
