import PortalLib "../lib/portal";
import Types     "../types/portal";

mixin (portalTransitions : PortalLib.TransitionStore) {
  // ── getPortalTransitions ─────────────────────────────────────────────────
  public query func getPortalTransitions(n : Nat) : async [Types.PortalTransition] {
    PortalLib.getRecentTransitions(portalTransitions, n);
  };

  // ── logPortalTransition ────────────────────────────────────────────────────
  public func logPortalTransition(
    from   : Text,
    to     : Text,
    userId : Text,
  ) : async () {
    PortalLib.logTransition(portalTransitions, from, to, userId);
  };
};
