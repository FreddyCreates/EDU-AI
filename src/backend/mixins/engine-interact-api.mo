import Time "mo:core/Time";
import EngineLogic "../lib/engine-logic";
import PassportLib "../lib/passport";
import PassportTypes "../types/passport";
import Common "../types/common";

mixin (
  passports : PassportLib.PassportStore,
  passportSeeds : PassportLib.SeedStore,
) {

  /// Route a student input to the named sovereign engine and return its doctrine response.
  /// engineId must be one of: SYNTHOS, VEKTOR, PHAEDRUS, MORPHOS, LOGOS, GENITOR, MEMORIA-VIVA, OMNIS
  public shared func queryEngine(
    engineId : Text,
    userInput : Text,
    context : Text,
  ) : async Text {
    EngineLogic.dispatch(engineId, userInput, context);
  };

  /// Same as queryEngine but also generates a KernelSeed from the session.
  /// The caller can choose to seal the seed via sealKernelSeed if they wish.
  public shared ({ caller }) func queryEngineWithPassport(
    engineId : Text,
    userInput : Text,
    context : Text,
  ) : async { response : Text; seedGenerated : PassportTypes.KernelSeed } {
    let now : Common.Timestamp = Time.now();
    let response = EngineLogic.dispatch(engineId, userInput, context);
    let trackName = switch (context) {
      case "" "COLLEGIUM-PUBLICA";
      case t t;
    };
    let seed = EngineLogic.buildSeed(engineId, response, userInput, trackName, now);
    { response = response; seedGenerated = seed };
  };
};
