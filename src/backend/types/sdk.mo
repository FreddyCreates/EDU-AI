module {
  /// A single entry in the sovereign SDK registry.
  /// Describes a public interface surface that external systems can use to connect
  /// to the platform. Latin/engine names are never exposed here — only public-facing
  /// names and callable method names that are already live in the canister.
  public type SdkEntry = {
    id          : Text;
    name        : Text;
    version     : Text;
    description : Text;
    /// How to invoke this interface ("query", "update", "canister-call")
    accessProtocol : Text;
    /// Grouping category ("teaching", "passport", "registry", "interaction", "curriculum", "collegium")
    category    : Text;
    /// Callable method names that are live in the canister
    entryPoints : [Text];
    /// "active" | "draft" | "deprecated"
    status      : Text;
  };
}
