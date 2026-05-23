// ADEDDI API — Alpha Deep EDDI public interface
// Exposes deep reasoning, field state, reasoning traces, and EDDI OS status.
import ADEDDILib "../lib/adeddi";
import EddiOsLib "../lib/eddi-os";
import FieldMonitor "../lib/field-monitor";
import DoctrineCompiler "../lib/doctrine-compiler";
import Types "../types/eddi";
import Time "mo:core/Time";
import Common "../types/common";

mixin (
  traceStore    : ADEDDILib.TraceStore,
  osState       : EddiOsLib.OsState,
  fieldState    : ADEDDILib.SharedFieldState,
  artifactStore : ADEDDILib.ArtifactStore,
) {
  /// Returns the Alpha Deep EDDI singleton record.
  public query func getAdeddi() : async Types.AlphaDeepEDDI {
    ADEDDILib.ADEDDI_INSTANCE;
  };

  /// Deep reasoning chat — routes through the full 7-layer ADEDDI chain.
  /// Wired to FieldMonitor and DoctrineCompiler.
  /// Returns the reasoning trace including all layer outputs.
  public shared ({ caller }) func chatDeep(
    mode      : Types.EDDIMode,
    message   : Text,
    sessionId : Text,
  ) : async { response : Text; trace : Types.ReasoningTrace } {
    let now : Common.Timestamp = Time.now();
    let trace = ADEDDILib.deepReason(
      traceStore, caller, mode, message, sessionId, now,
      fieldState, artifactStore,
    );
    { response = trace.finalOutput; trace };
  };

  /// Returns the current organism-level field state (aggregate, no PII).
  public query func getFieldState() : async Types.FieldState {
    ADEDDILib.computeFieldState(traceStore, Time.now());
  };

  /// Returns the live organism pulse from FieldMonitor.
  /// Includes deep call count, session count, average coherence, and field status.
  public query func getOrganismPulse() : async FieldMonitor.OrganismPulse {
    ADEDDILib.getOrganismPulse(
      fieldState,
      ADEDDILib.ADEDDI_INSTANCE.activeEngines.size(),
    );
  };

  /// Returns the reasoning trace for a given session ID.
  /// Returns null if the session ID has not been processed by ADEDDI.
  public query func getReasoningTrace(sessionId : Text) : async ?Types.ReasoningTrace {
    ADEDDILib.getTrace(traceStore, sessionId);
  };

  /// Returns all doctrine artifacts produced for a given session.
  public query func getSessionArtifacts(sessionId : Text) : async [DoctrineCompiler.SovereignArtifact] {
    DoctrineCompiler.getBySession(artifactStore, sessionId);
  };

  /// Returns all vault-eligible doctrine artifacts (PHI weight ≥ F(7)=13).
  public query func getVaultEligibleArtifacts() : async [DoctrineCompiler.SovereignArtifact] {
    DoctrineCompiler.getVaultEligible(artifactStore);
  };

  /// Returns the full EDDI OS status snapshot.
  public query func getEddiOs() : async Types.EddiOsStatus {
    let field = ADEDDILib.computeFieldState(traceStore, Time.now());
    EddiOsLib.getStatus(osState, field.fieldScore);
  };

  /// Boot a named EDDI OS subsystem (admin operation).
  public shared func bootOsSubsystem(id : Text) : async Bool {
    EddiOsLib.bootSubsystem(osState, id);
  };

  /// Shutdown a named EDDI OS subsystem (admin operation).
  public shared func shutdownOsSubsystem(id : Text) : async Bool {
    EddiOsLib.shutdownSubsystem(osState, id);
  };

  /// Returns a single EDDI OS subsystem record.
  public query func getOsSubsystem(id : Text) : async ?Types.Subsystem {
    EddiOsLib.getSubsystem(osState, id);
  };
};
