import StaffLib "../lib/staff";
import Types    "../types/staff";
import Map "mo:core/Map";
import List "mo:core/List";

mixin (staffStore : StaffLib.StaffStore) {
  // ── Internal activity log (ring-buffered per LEX_FLOR) ────────────────────
  var activityLog : StaffLib.ActivityStore = Map.empty<Text, List.List<Types.ActivityEntry>>();
  // ── listStaff ───────────────────────────────────────────────────────────────
  public query func listStaff() : async [Types.StaffMember] {
    StaffLib.getAllStaff(staffStore);
  };

  // ── getStaffMember ──────────────────────────────────────────────────────────
  public query func getStaffMember(id : Text) : async ?Types.StaffMember {
    StaffLib.getStaff(staffStore, id);
  };

  // ── addStaffMember ──────────────────────────────────────────────────────────
  public func addStaffMember(
    id    : Text,
    name  : Text,
    role  : Types.StaffRole,
    dept  : Text,
    level : Nat,
  ) : async Bool {
    // Prevent duplicate IDs
    if (StaffLib.getStaff(staffStore, id) != null) return false;
    StaffLib.addStaff(staffStore, id, name, role, dept, level);
    true;
  };
  // ── getStaffRoster ────────────────────────────────────────────────────────
  public query func getStaffRoster() : async [Types.StaffMember] {
    StaffLib.getAllStaff(staffStore);
  };

  // ── getStaffActivityLog ───────────────────────────────────────────────────
  public query func getStaffActivityLog(staffId : Text) : async [Types.ActivityEntry] {
    StaffLib.getActivityLog(activityLog, staffId);
  };

  // ── updateStaffRole ───────────────────────────────────────────────────────
  public func updateStaffRole(
    staffId : Text,
    newRole : Types.StaffRole,
  ) : async Bool {
    StaffLib.updateStaffRole(staffStore, activityLog, staffId, newRole, "system");
  };
};
