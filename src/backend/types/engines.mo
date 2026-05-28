module {
  public type EngineStatus = { #active; #dormant };

  public type SovereignEngine = {
    id : Nat;
    codeName : Text;
    fullName : Text;
    domain : Text;
    description : Text;
    mathFoundation : Text;
    teachingMethod : Text;
    lessonsAvailable : [Text];
    status : EngineStatus;
    platformRole : Text;  // Internal platform system role — how this engine powers user-facing features
  };
};
