import Types "../types/engines";
import EnginesLib "../lib/engines";

mixin () {
  public query func getEngines() : async [Types.SovereignEngine] {
    EnginesLib.getEngines();
  };

  public query func getEngineById(id : Nat) : async ?Types.SovereignEngine {
    EnginesLib.getEngineById(id);
  };

  public query func getEngineByCodeName(name : Text) : async ?Types.SovereignEngine {
    EnginesLib.getEngineByCodeName(name);
  };
};
