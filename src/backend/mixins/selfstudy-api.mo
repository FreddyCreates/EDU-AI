import SelfStudyLib "../lib/selfstudy";
import SelfStudyTypes "../types/selfstudy";
import Time "mo:core/Time";

mixin (
  trackStore : SelfStudyLib.TrackStore,
) {
  /// Create a new self-study preparation track for the caller.
  /// category examples: "UIL_CTE", "Skills USA", "UIL_ACADEMIC", "UIL_MUSIC", "UIL_ATHLETICS", "CUSTOM".
  /// competitionDate is a nanosecond UTC timestamp.
  public shared ({ caller }) func createSelfStudyTrack(
    title           : Text,
    category        : Text,
    competitionDate : Int,
  ) : async Text {
    SelfStudyLib.createSelfStudyTrack(
      trackStore, caller, title, category, competitionDate, Time.now(),
    );
  };

  /// Return all self-study tracks belonging to the caller.
  public query ({ caller }) func getMyTracks() : async [SelfStudyTypes.SelfStudyTrack] {
    SelfStudyLib.getMyTracks(trackStore, caller);
  };

  /// Mark a milestone as complete and recompute masteryPct.
  public shared ({ caller }) func completeSelfStudyMilestone(
    trackId        : Text,
    milestoneIndex : Nat,
  ) : async Bool {
    SelfStudyLib.completeMilestone(trackStore, caller, trackId, milestoneIndex, Time.now());
  };

  /// Get the full track record for a given ID (caller must own the track).
  public query ({ caller }) func getSelfStudyStats(
    trackId : Text,
  ) : async ?SelfStudyTypes.SelfStudyTrack {
    SelfStudyLib.getSelfStudyStats(trackStore, caller, trackId);
  };
};
