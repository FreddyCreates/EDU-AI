// Vision API Mixin
// LEX_SOVEREIGNUS: All narrative is deterministic and native.
// LEX_SPECULA: The platform observes and surfaces its own value.
//
// Exposes vision document and live stats for public landing page and admin portal.

import Types "../types/recognition";
import VisionLib "../lib/vision";
import RcgnLib "../lib/rcgn";
import NomsLib "../lib/noms";
import AchvLib "../lib/achv";

mixin (
  rcgnStore : RcgnLib.RcgnStore,
  nomStore  : NomsLib.NomStore,
  achvStore : AchvLib.AchvStore,
) {

  /// Returns the full Sovereign Vision Document with live platform stats.
  public query func generateVisionDocument() : async Types.VisionDocument {
    VisionLib.generateVisionDocument(rcgnStore, nomStore, achvStore);
  };

  /// Returns live platform stats: flags, nominations, achievements.
  public query func getVisionStats() : async Types.VisionStats {
    VisionLib.getVisionStats(rcgnStore, nomStore, achvStore);
  };
};
