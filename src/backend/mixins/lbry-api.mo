// LBRY — Library/Media Center Integration API mixin
import List    "mo:core/List";
import Time    "mo:core/Time";
import LbryLib "../lib/lbry";
import Types   "../types/lbry";

mixin () {
  var lbryStore   : LbryLib.LibStore = List.empty<Types.LibraryRecord>();
  var lbryCounter : LbryLib.Counter  = { var nextId = 1 };

  public shared ({ caller }) func checkOutResource(
    resourceType : Types.ResourceType,
    resourceId   : Text,
    title        : Text,
    dueDate      : ?Int
  ) : async Nat {
    let record : Types.LibraryRecord = {
      id = 0;
      studentPrincipal   = caller;
      resourceType;
      resourceId;
      title;
      checkedOutAt       = Time.now();
      dueDate;
      returnedAt         = null;
      readingProgressPct = 0;
      linkedSubjectId    = null;
      masteryLinked      = false;
    };
    LbryLib.checkoutResource(lbryStore, lbryCounter, record)
  };

  public shared func returnResource(
    recordId : Nat
  ) : async () {
    LbryLib.returnResource(lbryStore, recordId, Time.now())
  };

  public shared func updateReadingProgress(
    recordId    : Nat,
    progressPct : Nat
  ) : async () {
    LbryLib.updateReadingProgress(lbryStore, recordId, progressPct)
  };

  public shared func linkToSubject(
    recordId  : Nat,
    subjectId : Nat
  ) : async () {
    LbryLib.linkToSubject(lbryStore, recordId, subjectId)
  };

  public query ({ caller }) func getMyLibraryRecords() : async [Types.LibraryRecord] {
    LbryLib.getCheckoutsByStudent(lbryStore, caller)
  };

  public query func getCheckoutsByStudent(
    studentPrincipal : Principal
  ) : async [Types.LibraryRecord] {
    LbryLib.getCheckoutsByStudent(lbryStore, studentPrincipal)
  };

  public query func getOverdueCheckouts() : async [Types.LibraryRecord] {
    LbryLib.getOverdueCheckouts(lbryStore, Time.now())
  };

  public query func getLbryStats() : async Types.LbryStats {
    LbryLib.getStats(lbryStore)
  };
}
