// TUTL — Tutoring Session Engine API mixin
import TutlLib "../lib/tutl";
import Types "../types/tutl";

mixin (
  tutlStore   : TutlLib.SessionStore,
  tutlCounter : TutlLib.Counter
) {
  public shared ({ caller = _ }) func createTutoringSession(
    session : Types.TutoringSession
  ) : async Nat {
    TutlLib.createSession(tutlStore, tutlCounter, session)
  };

  public shared ({ caller = _ }) func completeTutoringSession(
    sessionId : Nat,
    masteryDeltaAfter : Nat,
    transcriptHash : ?Blob
  ) : async Bool {
    TutlLib.completeSession(tutlStore, sessionId, masteryDeltaAfter, transcriptHash)
  };

  public query ({ caller }) func getMyTutoringSessions() : async [Types.TutoringSession] {
    TutlLib.getSessionsByStudent(tutlStore, caller)
  };

  public query func getSessionsByTutor(
    tutorRef : Text
  ) : async [Types.TutoringSession] {
    TutlLib.getSessionsByTutor(tutlStore, tutorRef)
  };

  public query func getTutoringStats() : async { total : Nat; sealed : Nat } {
    TutlLib.getTutoringStats(tutlStore)
  };
}
