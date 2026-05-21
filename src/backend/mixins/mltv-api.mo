import Types   "../types/mltv";
import MltvLib "../lib/mltv";
import Time    "mo:core/Time";

mixin (mltvState : MltvLib.State) {
  // ── Fire the Architecture Council ─────────────────────────────────────
  public func fireArchCouncil(queryText : Text, domain : Text) : async Types.MLTVResponse {
    let now = Time.now();
    let mltvQuery : Types.MLTVQuery = {
      id          = domain # "-" # now.toText();
      queryText;
      requesterId = "PUBLIC";
      timestamp   = now;
      domain;
    };
    MltvLib.fireArchCouncil(mltvState, mltvQuery);
  };

  public query func getMLTVStats() : async Types.MLTVStats {
    MltvLib.getMLTVStats(mltvState);
  };

  public query func getRecentMLTVResponses(n : Nat) : async [Types.MLTVResponse] {
    MltvLib.getRecentResponses(mltvState, n);
  };
};
