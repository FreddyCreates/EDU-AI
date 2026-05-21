import Common "common";

module {
  /// EDDI unified mode variant — all intelligence routes through one of these.
  public type EDDIMode = {
    #STUDENT_MODE;
    #TEACHER_MODE;
    #PRINCIPAL_MODE;
    #BUILD_MODE;
    #MEMORY_MODE;
    #RECOGNITION_MODE;
    #ARCHITECT_MODE;
  };

  /// Canonical EDDI unified model record.
  public type EDDI = {
    id : Text;         // always "EDDI"
    name : Text;       // always "EDDI"
    version : Nat;     // 23
    modeCount : Nat;   // 7
    sealedAt : Common.Timestamp;
    law : Text;        // LEX_EDDI_UNIFIED
  };

  /// A session-mode binding — stores which mode a principal is currently in.
  public type ModeSetting = {
    mode : EDDIMode;
    setAt : Common.Timestamp;
  };

  /// A user-created agent bound to an EDDI mode.
  public type UserAgent = {
    id : Text;
    owner : Common.UserId;
    name : Text;
    modeBinding : EDDIMode;
    reasoningSeed : Text;
    memoryConfig : Text;
    createdAt : Common.Timestamp;
  };
};
