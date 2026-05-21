// ACHV — Achievement Vault
// LEX_SOVEREIGNUS: All achievement data is sovereign, native, and permanent.
// LEX_PERSONA: Every record is bound to its student.
//
// Append-only ledger. Records are never deleted.
// Zone transitions follow Fibonacci schedule:
//   hot    = last F(5)=5 sessions
//   warm   = last F(8)=21 sessions
//   cold   = last F(13)=89 sessions
//   frozen = beyond 89 sessions

import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Common "../types/common";
import Types "../types/recognition";

module {

  public type AchvStore = Map.Map<Common.UserId, List.List<Types.AchievementRecord>>;

  // ── Fibonacci zone boundaries ─────────────────────────────────────────────
  let HOT_BOUNDARY    : Nat = 5;   // F(5)
  let WARM_BOUNDARY   : Nat = 21;  // F(8)
  let COLD_BOUNDARY   : Nat = 89;  // F(13)

  // ── computeZone ───────────────────────────────────────────────────────────
  // posFromEnd = (total - index), 1-based. Most recent record = posFromEnd 1.
  func computeZone(posFromEnd : Nat) : Types.AchievementZone {
    if (posFromEnd <= HOT_BOUNDARY) #hot
    else if (posFromEnd <= WARM_BOUNDARY) #warm
    else if (posFromEnd <= COLD_BOUNDARY) #cold
    else #frozen;
  };

  // ── makeId ────────────────────────────────────────────────────────────────
  func makeId(studentId : Common.UserId, now : Common.Timestamp) : Text {
    "ACHV-" # Text.fromIter(studentId.toText().toIter().take(6)) # "-" # Int.abs(now).toText();
  };

  // ── sealAchievement ───────────────────────────────────────────────────────
  // Appends to hot zone. Zone labels are recalculated on read.
  public func sealAchievement(
    achvStore       : AchvStore,
    studentId       : Common.UserId,
    achievementType : Types.AchievementType,
    description     : Text,
    source          : Text,
    now             : Common.Timestamp,
  ) : Types.AchievementRecord {
    let record : Types.AchievementRecord = {
      id              = makeId(studentId, now);
      studentId       = studentId;
      achievementType = achievementType;
      description     = description;
      source          = source;
      zone            = #hot;          // always written to hot; recalculated on read
      sealedAt        = now;
    };
    let list = switch (achvStore.get(studentId)) {
      case (?l) l;
      case null {
        let fresh = List.empty<Types.AchievementRecord>();
        achvStore.add(studentId, fresh);
        fresh;
      };
    };
    list.add(record);
    record;
  };

  // ── getAchievements ───────────────────────────────────────────────────────
  // Returns all records with recalculated zone labels.
  public func getAchievements(
    achvStore : AchvStore,
    studentId : Common.UserId,
  ) : [Types.AchievementRecord] {
    switch (achvStore.get(studentId)) {
      case null [];
      case (?list) {
        let arr = list.toArray();
        let total = arr.size();
        arr.mapEntries(func(rec, i) {
          let posFromEnd : Nat = total - i; // 1-based, most recent = 1
          { rec with zone = computeZone(posFromEnd) };
        });
      };
    };
  };

  // ── totalAchvCount ────────────────────────────────────────────────────────
  public func totalAchvCount(achvStore : AchvStore) : Nat {
    var n = 0;
    for ((_id, list) in achvStore.entries()) {
      n += list.size();
    };
    n;
  };
};
