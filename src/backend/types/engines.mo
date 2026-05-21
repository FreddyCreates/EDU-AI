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
  };
};
