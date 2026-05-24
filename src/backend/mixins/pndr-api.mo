// PNDR — Pandoras Actor API mixin
// Exposes knowledge discovery functions to the canister interface
import PndrLib "../lib/pndr";
import Types "../types/pndr";
import Time "mo:core/Time";

mixin (
  fragmentStore : PndrLib.FragmentStore,
  vaultStore : PndrLib.VaultStore,
  eventStore : PndrLib.EventStore,
  pathwayStore : PndrLib.PathwayStore,
  pndrCounter : PndrLib.Counter
) {
  // ── Fragment queries ───────────────────────────────────────────────────────
  public query func getKnowledgeFragment(id : Nat) : async ?Types.KnowledgeFragment {
    PndrLib.getFragment(fragmentStore, id)
  };

  public query func getFragmentsByDomain(domain : Text) : async [Types.KnowledgeFragment] {
    PndrLib.getFragmentsByDomain(fragmentStore, domain)
  };

  // ── Fragment creation (admin/teacher) ──────────────────────────────────────
  public shared ({ caller = _ }) func createKnowledgeFragment(
    title : Text,
    domain : Text,
    prerequisiteIds : [Nat],
    complexityTier : Nat,
    contentHash : ?Blob
  ) : async Nat {
    PndrLib.createFragment(fragmentStore, pndrCounter, title, domain, prerequisiteIds, complexityTier, contentHash)
  };

  // ── Vault queries ──────────────────────────────────────────────────────────
  public query ({ caller }) func getMyPandoraVault() : async ?Types.PandoraVault {
    PndrLib.getVault(vaultStore, caller)
  };

  public shared ({ caller }) func initializePandoraVault() : async Types.PandoraVault {
    PndrLib.getOrCreateVault(vaultStore, caller, Time.now())
  };

  // ── Discovery mechanics ────────────────────────────────────────────────────
  public shared ({ caller }) func attemptDiscovery(
    fragmentId : Nat,
    triggerContext : Text
  ) : async { #ok : Types.DiscoveryEvent; #err : Text } {
    PndrLib.attemptDiscovery(
      fragmentStore,
      vaultStore,
      eventStore,
      pndrCounter,
      caller,
      fragmentId,
      triggerContext,
      Time.now()
    )
  };

  public shared ({ caller }) func markFragmentMastered(fragmentId : Nat) : async Bool {
    PndrLib.markMastered(fragmentStore, vaultStore, caller, fragmentId, Time.now())
  };

  // ── Discovery history ──────────────────────────────────────────────────────
  public query ({ caller }) func getMyDiscoveryHistory() : async [Types.DiscoveryEvent] {
    PndrLib.getDiscoveryHistory(eventStore, caller)
  };

  // ── Pathway queries ────────────────────────────────────────────────────────
  public query func getDiscoveryPathway(id : Nat) : async ?Types.DiscoveryPathway {
    PndrLib.getPathway(pathwayStore, id)
  };

  public query func getPathwaysByDomain(domain : Text) : async [Types.DiscoveryPathway] {
    PndrLib.getPathwaysByDomain(pathwayStore, domain)
  };

  // ── Pathway creation (admin/teacher) ───────────────────────────────────────
  public shared ({ caller = _ }) func createDiscoveryPathway(
    name : Text,
    description : Text,
    fragmentIds : [Nat],
    gradeLevel : Text,
    domain : Text
  ) : async Nat {
    PndrLib.createPathway(pathwayStore, pndrCounter, name, description, fragmentIds, gradeLevel, domain, Time.now())
  };

  // ── Stats ──────────────────────────────────────────────────────────────────
  public query func getPandoraStats() : async Types.PandoraStats {
    PndrLib.getStats(fragmentStore, vaultStore, eventStore, 0)
  };
}
