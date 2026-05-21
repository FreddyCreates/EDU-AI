import Types "../types/silver-builders";
import SilverBuildersLib "../lib/silver-builders";
import Map "mo:core/Map";

mixin (
  silverBuilders : SilverBuildersLib.SilverBuilderStore,
  builderStats   : SilverBuildersLib.StatsStore,
) {
  public query func getSilverBuilders() : async [Types.SilverBuilder] {
    SilverBuildersLib.getSilverBuilderRegistry(silverBuilders);
  };

  public query func getSilverBuilderById(id : Text) : async ?Types.SilverBuilder {
    SilverBuildersLib.getById(silverBuilders, id);
  };

  public query func getBuilderStats(builderId : Text) : async ?Types.BuilderStats {
    SilverBuildersLib.getBuilderStats(builderStats, builderId);
  };

  public query func getAllBuilderStats() : async [(Text, Types.BuilderStats)] {
    SilverBuildersLib.getAllBuilderStats(builderStats);
  };
};
