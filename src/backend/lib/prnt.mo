// PRNT — Parent/Guardian Registry lib
import Map "mo:core/Map";
import Types "../types/prnt";
import Array "mo:core/Array";

module {
  public type ParentStore = Map.Map<Types.ParentId, Types.ParentRecord>;

  public func newStore() : ParentStore {
    Map.empty()
  };

  public func registerParent(
    store : ParentStore,
    record : Types.ParentRecord
  ) : () {
    store.add(record.parentId, record)
  };

  public func getParent(
    store : ParentStore,
    parentId : Types.ParentId
  ) : ?Types.ParentRecord {
    store.get(parentId)
  };

  public func linkStudent(
    store : ParentStore,
    parentId : Types.ParentId,
    studentPrincipal : Principal
  ) : Bool {
    switch (store.get(parentId)) {
      case null { false };
      case (?r) {
        let updated = { r with linkedStudentPrincipals = r.linkedStudentPrincipals.concat([studentPrincipal]) };
        store.add(parentId, updated);
        true
      };
    }
  };

  public func updatePermission(
    store : ParentStore,
    parentId : Types.ParentId,
    level : Types.PermissionLevel
  ) : Bool {
    switch (store.get(parentId)) {
      case null { false };
      case (?r) {
        store.add(parentId, { r with permissionLevel = level });
        true
      };
    }
  };

  public func appendMessageRef(
    store : ParentStore,
    parentId : Types.ParentId,
    ref : Types.MessageRef
  ) : () {
    switch (store.get(parentId)) {
      case null {};
      case (?r) {
        store.add(parentId, { r with messageHistory = r.messageHistory.concat([ref]) })
      };
    }
  };

  public func getByStudent(
    store : ParentStore,
    studentPrincipal : Principal
  ) : [Types.ParentRecord] {
    store.values().filter(func(r) {
      r.linkedStudentPrincipals.find(func(p) { p == studentPrincipal }) != null
    }).toArray()
  };
}
