import Types     "../types/qryx";
import QryxLib   "../lib/qryx";
import EngLib    "../lib/engines";
import LawsLib   "../lib/laws";
import ApixLib   "../lib/apix";
import Time      "mo:core/Time";

mixin (apixState : ApixLib.State) {
  let qryxState : QryxLib.State = QryxLib.newState();

  // ── Parse text target to QueryTarget variant ──────────────────────────
  func parseTarget(t : Text) : Types.QueryTarget {
    switch (t) {
      case "engines"       { #engines };
      case "laws"          { #laws };
      case "entanglements" { #entanglements };
      case "passport"      { #passport };
      case "builders"      { #builders };
      case "curriculum"    { #curriculum };
      case "mltv"          { #mltv };
      case "sdk"           { #sdk };
      case _               { #engines };
    };
  };

  // filters: [(field, operator, value)]
  public func executeQuery(
    target  : Text,
    filters : [(Text, Text, Text)],
    limit   : Nat,
  ) : async Types.QueryResult {
    let now = Time.now();
    let qFilters = filters.map(
      func((field, operator, value)) : Types.QueryFilter { { field; operator; value } }
    );
    let sqry : Types.SovereignQuery = {
      id          = target # "-" # now.toText();
      target      = parseTarget(target);
      filters     = qFilters;
      limit;
      requesterId = "PUBLIC";
      timestamp   = now;
    };
    ApixLib.recordCall(apixState, "QRYX");
    QryxLib.executeQuery(qryxState, sqry, EngLib.getEngines(), LawsLib.getLaws());
  };

  public func getQueryHistory() : async [Types.QueryResult] {
    QryxLib.getQueryHistory(qryxState);
  };
};
