// TPDF — Teacher Professional Development Tracking API mixin
import List    "mo:core/List";
import Time    "mo:core/Time";
import TpdfLib "../lib/tpdf";
import Types   "../types/tpdf";

mixin () {
  var tpdfStore   : TpdfLib.PdStore = List.empty<Types.PdRecord>();
  var tpdfCounter : TpdfLib.Counter = { var nextId = 1 };

  public shared ({ caller }) func logPdRecord(
    title               : Text,
    pdType              : Types.PdType,
    hoursLogged         : Nat,
    provider            : Text,
    certificationEarned : ?Text,
    growthMilestone     : ?Types.GrowthMilestone
  ) : async Nat {
    let record : Types.PdRecord = {
      id = 0;
      teacherPrincipal = caller;
      title;
      pdType;
      hoursLogged;
      completedAt = Time.now();
      certificationEarned;
      provider;
      growthMilestone;
    };
    let (newStore, id) = TpdfLib.logPdRecord(tpdfStore, tpdfCounter, record);
    tpdfStore := newStore;
    id
  };

  public query ({ caller }) func getMyPdRecords() : async [Types.PdRecord] {
    TpdfLib.getRecordsByTeacher(tpdfStore, caller)
  };

  public query ({ caller }) func getMyPdHours() : async Nat {
    TpdfLib.getTotalHours(tpdfStore, caller)
  };

  public query ({ caller }) func getMyPdGrowthScore() : async Nat {
    TpdfLib.computeGrowthScore(tpdfStore, caller)
  };

  public query func getPdRecordsByTeacher(
    teacherPrincipal : Principal
  ) : async [Types.PdRecord] {
    TpdfLib.getRecordsByTeacher(tpdfStore, teacherPrincipal)
  };

  public query func getPdTotalHours(
    teacherPrincipal : Principal
  ) : async Nat {
    TpdfLib.getTotalHours(tpdfStore, teacherPrincipal)
  };

  public query func getPdGrowthScore(
    teacherPrincipal : Principal
  ) : async Nat {
    TpdfLib.computeGrowthScore(tpdfStore, teacherPrincipal)
  };

  public query func getTpdfStats() : async Types.TpdfStats {
    TpdfLib.getStats(tpdfStore)
  };
}
