// IESM — IEP Accommodation Layer API mixin
import IesmLib "../lib/iesm";
import Types "../types/iesm";

mixin (
  iesmStore : IesmLib.IesmStore
) {
  public shared ({ caller }) func setAccommodations(
    record : Types.IepAccommodation
  ) : async () {
    ignore caller;
    IesmLib.setAccommodations(iesmStore, record)
  };

  public query func getAccommodations(
    studentPrincipal : Principal
  ) : async ?Types.IepAccommodation {
    IesmLib.getAccommodations(iesmStore, studentPrincipal)
  };

  public query func hasAccommodation(
    studentPrincipal : Principal,
    accomType : Types.AccommodationType
  ) : async Bool {
    IesmLib.hasAccommodation(iesmStore, studentPrincipal, accomType)
  };

  public shared ({ caller }) func deactivateAccommodations(
    studentPrincipal : Principal
  ) : async Bool {
    ignore caller;
    IesmLib.deactivateAccommodations(iesmStore, studentPrincipal)
  };

  public query func getIesmStats() : async Types.IesmStats {
    IesmLib.getStats(iesmStore)
  };
}
