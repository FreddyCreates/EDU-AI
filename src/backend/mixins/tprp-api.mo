// TPRP — Test Prep Engine API mixin
import TprpLib "../lib/tprp";
import Types "../types/tprp";

mixin (
  sessionStore    : TprpLib.SessionStore,
  projectionStore : TprpLib.ProjectionStore,
  tprpCounter     : TprpLib.Counter
) {
  public shared ({ caller }) func startTestPrepSession(
    mode : Types.TestPrepMode,
    subjectId : Nat,
    startedAt : Int
  ) : async Nat {
    TprpLib.startSession(sessionStore, tprpCounter, caller, mode, subjectId, startedAt)
  };

  public shared ({ caller }) func completeTestPrepSession(
    sessionId : Nat,
    correct : Nat,
    attempted : Nat,
    completedAt : Int
  ) : async Bool {
    ignore caller;
    TprpLib.completeSession(sessionStore, sessionId, correct, attempted, completedAt)
  };

  public query ({ caller }) func getMyTestPrepSessions() : async [Types.TestPrepSession] {
    TprpLib.getSessionsByStudent(sessionStore, caller)
  };

  public shared ({ caller }) func computeScoreProjection(
    mode : Types.TestPrepMode,
    computedAt : Int
  ) : async Types.ScoreProjection {
    TprpLib.computeProjection(projectionStore, sessionStore, caller, mode, computedAt)
  };

  public query func getTprpStats() : async Types.TprpStats {
    TprpLib.getStats(sessionStore)
  };
}
