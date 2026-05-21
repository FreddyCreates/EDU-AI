import EDDITypes "../types/eddi";
import EDDILib "../lib/eddi";
import PassportLib "../lib/passport";
import Time "mo:core/Time";

mixin (
  modeStore    : EDDILib.ModeStore,
  agentStore   : EDDILib.UserAgentStore,
  passports    : PassportLib.PassportStore,
  seedStore    : PassportLib.SeedStore,
) {
  /// Returns the canonical EDDI singleton record.
  public query func getEddi() : async EDDITypes.EDDI {
    EDDILib.EDDI_INSTANCE;
  };

  /// Infer an EDDI mode from a plain-text context hint.
  public query func inferEddiMode(hint : Text) : async EDDITypes.EDDIMode {
    EDDILib.inferMode(hint);
  };

  /// Get the caller's current session mode.
  public query ({ caller }) func getEddiMode() : async EDDITypes.EDDIMode {
    EDDILib.getMode(modeStore, caller);
  };

  /// Set the caller's session mode.
  public shared ({ caller }) func setEddiMode(mode : EDDITypes.EDDIMode) : async () {
    EDDILib.setMode(modeStore, caller, mode);
  };

  /// Chat with EDDI. Returns the response, mode used, and an optional next-mode suggestion.
  public shared ({ caller }) func chatWithEddi(
    mode      : EDDITypes.EDDIMode,
    message   : Text,
    sessionId : Text,
  ) : async { response : Text; modeUsed : EDDITypes.EDDIMode; nextModeSuggestion : ?EDDITypes.EDDIMode } {
    EDDILib.chat(modeStore, caller, mode, message, sessionId);
  };

  /// Get EDDI ARCHITECT_MODE insight for the caller's current passport state.
  public query ({ caller }) func getEddiInsight() : async Text {
    EDDILib.getPassportInsight(passports, seedStore, caller);
  };

  /// Create a user agent bound to an EDDI mode.
  public shared ({ caller }) func createAgent(
    name          : Text,
    modeBinding   : EDDITypes.EDDIMode,
    reasoningSeed : Text,
    memoryConfig  : Text,
  ) : async EDDITypes.UserAgent {
    EDDILib.createUserAgent(agentStore, caller, name, modeBinding, reasoningSeed, memoryConfig, Time.now());
  };

  /// Get all agents created by the caller.
  public query ({ caller }) func getUserAgents() : async [EDDITypes.UserAgent] {
    EDDILib.getUserAgents(agentStore, caller);
  };
};
