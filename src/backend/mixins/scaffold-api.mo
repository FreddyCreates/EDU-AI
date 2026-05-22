import ScaffoldLib "../lib/scaffold";
import ScaffoldTypes "../types/scaffold";
import Time "mo:core/Time";

mixin (
  frameStore   : ScaffoldLib.FrameStore,
  sessionStore : ScaffoldLib.SessionStore,
) {
  /// Return all seeded scaffold frames (one per subject domain).
  public query func getScaffoldFrames() : async [ScaffoldTypes.ScaffoldFrame] {
    ScaffoldLib.getAllFrames(frameStore);
  };

  /// Return the scaffold frame for a specific topic (prefix-matched).
  public query func getScaffoldFrame(topicId : Text) : async ?ScaffoldTypes.ScaffoldFrame {
    ScaffoldLib.getFrame(frameStore, topicId);
  };

  /// Open a new scaffold session for the caller on a topic.
  /// masteryBefore: the student's current mastery score (0-100).
  /// Returns the session ID.
  public shared ({ caller }) func startScaffoldSession(
    topicId       : Text,
    masteryBefore : Nat,
  ) : async Text {
    ScaffoldLib.startSession(sessionStore, caller, topicId, masteryBefore, Time.now());
  };

  /// Request the next scaffold hint for an open session.
  /// Returns the hint or null if all hints consumed or session closed.
  public shared ({ caller }) func requestScaffoldHint(
    sessionId : Text,
  ) : async ?ScaffoldTypes.ScaffoldHint {
    ScaffoldLib.requestHint(frameStore, sessionStore, caller, sessionId);
  };

  /// Close a scaffold session and record the student's mastery after scaffolding.
  public shared ({ caller }) func closeScaffoldSession(
    sessionId    : Text,
    masteryAfter : Nat,
  ) : async Bool {
    ScaffoldLib.closeSession(sessionStore, caller, sessionId, masteryAfter, Time.now());
  };

  /// Return all scaffold sessions belonging to the caller.
  public query ({ caller }) func getMyScaffoldSessions() : async [ScaffoldTypes.ScaffoldSession] {
    ScaffoldLib.getMySessions(sessionStore, caller);
  };

  /// Return a single scaffold session by ID (caller must own it).
  public query ({ caller }) func getScaffoldSession(
    sessionId : Text,
  ) : async ?ScaffoldTypes.ScaffoldSession {
    ScaffoldLib.getSession(sessionStore, caller, sessionId);
  };
};
