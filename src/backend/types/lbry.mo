// LBRY — Library/Media Center Integration types
module {
  public type LibraryRecord = {
    id : Nat;
    studentPrincipal : Principal;
    resourceType : ResourceType;
    resourceId : Text; // ISBN or internal media ID
    title : Text;
    checkedOutAt : Int;
    dueDate : ?Int;
    returnedAt : ?Int;
    readingProgressPct : Nat; // Fibonacci-floored 0-89
    linkedSubjectId : ?Nat;
    masteryLinked : Bool;
  };

  public type ResourceType = {
    #book;
    #ebook;
    #audiobook;
    #video;
    #periodical;
    #referenceDoc;
    #other : Text;
  };

  public type LbryStats = {
    totalCheckouts : Nat;
    activeCheckouts : Nat;
    overdueCount : Nat;
    masteryLinkedCount : Nat;
  };
}
