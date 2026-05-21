import Types "../types/staff";
import List  "mo:core/List";
import Map   "mo:core/Map";
import Time  "mo:core/Time";

module {
  // ── STAF: Non-student-facing Staff Library ───────────────────────────────

  // Fibonacci constants
  let FIB_SEQUENCE : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

  public func fibFloor(n : Nat) : Nat {
    if (n == 0) return 1;
    var result : Nat = 1;
    for (f in FIB_SEQUENCE.values()) {
      if (f <= n) { result := f };
    };
    result;
  };

  public type StaffStore    = Map.Map<Text, Types.StaffMember>;
  public type ActivityStore = Map.Map<Text, List.List<Types.ActivityEntry>>;

  // ── Seed 8 sample staff members ─────────────────────────────────────────
  // 2 IT (level 5), 2 admin (level 3), 2 counselors (level 2), 2 support (level 1)
  public func seedStaff(store : StaffStore) {
    let now = Time.now();
    let seeds : [Types.StaffMember] = [
      { staffId = "IT01"; name = "Marcus Webb";    role = #STAFF_IT;        department = "Technology";  accessLevel = 5; lastActive = now },
      { staffId = "IT02"; name = "Diana Torres";  role = #STAFF_IT;        department = "Technology";  accessLevel = 5; lastActive = now },
      { staffId = "AD01"; name = "Principal Chen"; role = #STAFF_ADMIN;    department = "Administration"; accessLevel = 3; lastActive = now },
      { staffId = "AD02"; name = "Vice-P. Reyes"; role = #STAFF_ADMIN;     department = "Administration"; accessLevel = 3; lastActive = now },
      { staffId = "CO01"; name = "Dr. Amara Osei"; role = #STAFF_COUNSELOR; department = "Student Services"; accessLevel = 2; lastActive = now },
      { staffId = "CO02"; name = "James Patel";   role = #STAFF_COUNSELOR; department = "Student Services"; accessLevel = 2; lastActive = now },
      { staffId = "SP01"; name = "Sofia Nakamura"; role = #STAFF_SUPPORT;  department = "Operations";   accessLevel = 1; lastActive = now },
      { staffId = "SP02"; name = "Ray Okonkwo";   role = #STAFF_SUPPORT;   department = "Operations";   accessLevel = 1; lastActive = now },
    ];
    for (m in seeds.values()) {
      store.add(m.staffId, m);
    };
  };

  // ── addStaff ─────────────────────────────────────────────────────────────
  public func addStaff(
    store       : StaffStore,
    staffId     : Text,
    name        : Text,
    role        : Types.StaffRole,
    department  : Text,
    accessLevel : Nat,
  ) {
    let floored = fibFloor(accessLevel);
    let member : Types.StaffMember = {
      staffId;
      name;
      role;
      department;
      accessLevel = floored;
      lastActive  = Time.now();
    };
    store.add(staffId, member);
  };

  // ── getStaff ─────────────────────────────────────────────────────────────
  public func getStaff(
    store   : StaffStore,
    staffId : Text,
  ) : ?Types.StaffMember {
    store.get(staffId);
  };

  // ── getAllStaff ───────────────────────────────────────────────────────────
  public func getAllStaff(store : StaffStore) : [Types.StaffMember] {
    store.values().toArray();
  };

  // ── getStaffByRole ───────────────────────────────────────────────────────
  public func getStaffByRole(
    store : StaffStore,
    role  : Types.StaffRole,
  ) : [Types.StaffMember] {
    store.values().toArray().filter(
      func(m : Types.StaffMember) : Bool {
        switch (m.role, role) {
          case (#STAFF_IT,        #STAFF_IT)        true;
          case (#STAFF_ADMIN,     #STAFF_ADMIN)     true;
          case (#STAFF_COUNSELOR, #STAFF_COUNSELOR) true;
          case (#STAFF_SUPPORT,   #STAFF_SUPPORT)   true;
          case _                                    false;
        };
      }
    );
  };

  // ── removeStaff ──────────────────────────────────────────────────────────
  public func removeStaff(
    store   : StaffStore,
    staffId : Text,
  ) : Bool {
    if (store.get(staffId) == null) return false;
    store.remove(staffId);
    true;
  };

  // ── logActivity ──────────────────────────────────────────────────────────
  public func logActivity(
    activityLog : ActivityStore,
    staffId     : Text,
    action      : Text,
    details     : Text,
  ) {
    let entry : Types.ActivityEntry = {
      staffId;
      action;
      details;
      timestamp = Time.now();
    };
    let listOpt = activityLog.get(staffId);
    let log : List.List<Types.ActivityEntry> = switch (listOpt) {
      case (?existing) existing;
      case null {
        let newList = List.empty<Types.ActivityEntry>();
        activityLog.add(staffId, newList);
        newList;
      };
    };
    // Ring buffer: keep last F(8)=21 entries per staff member
    if (log.size() >= 21) {
      let arr = log.toArray();
      log.clear();
      var i : Nat = 1;
      while (i < arr.size()) {
        log.add(arr[i]);
        i += 1;
      };
    };
    log.add(entry);
  };

  // ── getActivityLog ────────────────────────────────────────────────────────
  public func getActivityLog(
    activityLog : ActivityStore,
    staffId     : Text,
  ) : [Types.ActivityEntry] {
    switch (activityLog.get(staffId)) {
      case null [];
      case (?log) log.toArray();
    };
  };

  // ── getAllActivity ────────────────────────────────────────────────────────
  // Aggregates all activity entries across all staff members
  public func getAllActivity(activityLog : ActivityStore) : [Types.ActivityEntry] {
    let buf = List.empty<Types.ActivityEntry>();
    for (log in activityLog.values()) {
      for (entry in log.values()) {
        buf.add(entry);
      };
    };
    buf.toArray();
  };

  // ── updateStaffRole ───────────────────────────────────────────────────────
  public func updateStaffRole(
    store       : StaffStore,
    activityLog : ActivityStore,
    staffId     : Text,
    newRole     : Types.StaffRole,
    updatedBy   : Text,
  ) : Bool {
    switch (store.get(staffId)) {
      case null false;
      case (?member) {
        store.add(staffId, { member with role = newRole });
        let roleText = switch (newRole) {
          case (#STAFF_IT)        "STAFF_IT";
          case (#STAFF_ADMIN)     "STAFF_ADMIN";
          case (#STAFF_COUNSELOR) "STAFF_COUNSELOR";
          case (#STAFF_SUPPORT)   "STAFF_SUPPORT";
          case (#STAFF_LIBRARIAN) "STAFF_LIBRARIAN";
          case (#STAFF_COACH)     "STAFF_COACH";
        };
        logActivity(activityLog, staffId, "ROLE_UPDATE",
          "Role changed to " # roleText # " by " # updatedBy);
        true;
      };
    };
  };
};
