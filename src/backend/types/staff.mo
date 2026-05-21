module {
  // ── STAF: Non-student-facing Staff Types ─────────────────────────────────

  public type StaffRole = {
    #STAFF_IT;
    #STAFF_ADMIN;
    #STAFF_COUNSELOR;
    #STAFF_SUPPORT;
    #STAFF_LIBRARIAN;
    #STAFF_COACH;
  };

  public type StaffMember = {
    staffId     : Text;       // 4-letter lock name or UUID
    name        : Text;
    role        : StaffRole;
    department  : Text;
    accessLevel : Nat;        // Fibonacci-indexed: 1=support,2=counselor,3=admin,5=IT
    lastActive  : Int;        // nanoseconds (Time.now())
  };

  public type ActivityEntry = {
    staffId   : Text;
    action    : Text;
    details   : Text;
    timestamp : Int;
  };
};
