// PRNT — Parent/Guardian Registry API mixin
import PrntLib "../lib/prnt";
import Types "../types/prnt";

mixin (
  parentStore : PrntLib.ParentStore
) {
  public shared ({ caller }) func registerParent(
    displayName : Text,
    contactPrefs : Types.ContactPreferences
  ) : async () {
    let record : Types.ParentRecord = {
      parentId                 = caller;
      displayName;
      linkedStudentPrincipals  = [];
      permissionLevel          = #readOnly;
      contactPrefs;
      messageHistory           = [];
      createdAt                = 0;
    };
    PrntLib.registerParent(parentStore, record)
  };

  public query ({ caller }) func getMyParentRecord() : async ?Types.ParentRecord {
    PrntLib.getParent(parentStore, caller)
  };

  public shared ({ caller }) func linkStudentToParent(
    studentPrincipal : Principal
  ) : async Bool {
    PrntLib.linkStudent(parentStore, caller, studentPrincipal)
  };

  public shared ({ caller }) func updateParentPermission(
    level : Types.PermissionLevel
  ) : async Bool {
    PrntLib.updatePermission(parentStore, caller, level)
  };

  public query func getParentsByStudent(
    studentPrincipal : Principal
  ) : async [Types.ParentRecord] {
    PrntLib.getByStudent(parentStore, studentPrincipal)
  };
}
