module {
  // ── PRLT: Portal Transition Registry Types ───────────────────────────────

  public type PortalId = {
    #student;
    #teacher;
    #principal;
    #systemPortal;
  };

  public type PortalTransition = {
    fromPortal : Text;  // portal name, e.g. "student"
    toPortal   : Text;  // portal name, e.g. "teacher"
    userId     : Text;
    timestamp  : Int;   // nanoseconds (Time.now())
  };
};
