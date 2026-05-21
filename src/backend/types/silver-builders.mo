module {
  public type SilverBuilderStatus = { #active; #dormant; #sealed };

  public type SilverBuilder = {
    id : Text;
    codeName : Text;
    domain : Text;
    purpose : Text;
    domainsOwned : [Text];
    status : SilverBuilderStatus;
    createdAt : Int;
    protocol : Text;
  };

  public type BuilderStatField = { #session; #seed; #workflow };

  public type BuilderStats = {
    sessionsProcessed : Nat;
    seedsSealed : Nat;
    workflowCompletions : Nat;
    lastActiveAt : Int;
  };
};
