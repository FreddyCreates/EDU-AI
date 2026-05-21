module {
  public type QueryTarget = {
    #engines;
    #laws;
    #entanglements;
    #passport;
    #builders;
    #curriculum;
    #mltv;
    #sdk;
  };

  public type QueryFilter = {
    field    : Text;   // e.g. "domain"
    operator : Text;   // e.g. "eq"
    value    : Text;
  };

  public type SovereignQuery = {
    id          : Text;
    target      : QueryTarget;
    filters     : [QueryFilter];
    limit       : Nat;   // max 55 = F(10)
    requesterId : Text;
    timestamp   : Int;
  };

  public type QueryResultItem = {
    id    : Text;
    data  : Text;   // JSON-like Text
    score : Nat;    // Fibonacci-floored relevance
  };

  public type QueryResult = {
    queryId        : Text;
    target         : Text;
    items          : [QueryResultItem];
    totalFound     : Nat;
    fibFlooredAt   : Nat;
    executionCycles : Nat;
    timestamp      : Int;
  };
};
