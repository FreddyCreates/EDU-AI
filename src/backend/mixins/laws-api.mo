import Types "../types/laws";
import LawsLib "../lib/laws";

mixin () {
  public query func getLaws() : async [Types.SovereignLaw] {
    LawsLib.getLaws();
  };

  public query func getLawById(id : Nat) : async ?Types.SovereignLaw {
    LawsLib.getLawById(id);
  };

  public query func getLawByLatinName(name : Text) : async ?Types.SovereignLaw {
    LawsLib.getLawByLatinName(name);
  };
};
