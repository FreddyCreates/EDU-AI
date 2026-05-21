// COMM — School-to-Home Communication Layer API mixin
import List    "mo:core/List";
import Map     "mo:core/Map";
import Time    "mo:core/Time";
import CommLib "../lib/comm";
import Types   "../types/comm";

mixin () {
  var commMessages : CommLib.MessageStore = List.empty<Types.CommMessage>();
  var commReadLog  : CommLib.ReadLog      = Map.empty<Nat, [Principal]>();
  var commCounter  : CommLib.Counter      = { var nextId = 1 };

  public shared ({ caller }) func sendCommMessage(
    recipientRefs     : [Types.RecipientRef],
    subject           : Text,
    body              : Text,
    messageType       : Types.MessageType,
    translationNeeded : Bool,
    expiresAt         : ?Int
  ) : async Nat {
    let message : Types.CommMessage = {
      id = 0;
      sender = caller;
      recipientRefs;
      subject;
      body;
      messageType;
      translationNeeded;
      sentAt           = Time.now();
      expiresAt;
      attachmentHashes = [];
    };
    CommLib.sendMessage(commMessages, commCounter, message)
  };

  public shared ({ caller }) func markMessageRead(
    messageId : Nat
  ) : async () {
    CommLib.markRead(commReadLog, messageId, caller)
  };

  public query func getMessagesForRecipient(
    ref : Types.RecipientRef
  ) : async [Types.CommMessage] {
    CommLib.getMessagesForRecipient(commMessages, ref)
  };

  public shared ({ caller }) func sendAnnouncement(
    schoolId : Nat,
    subject  : Text,
    body     : Text
  ) : async Nat {
    CommLib.sendAnnouncement(commMessages, commCounter, schoolId, subject, body, caller, Time.now())
  };

  public query func getUnreadCount(
    ref : Types.RecipientRef
  ) : async Nat {
    CommLib.getUnreadCount(commMessages, commReadLog, ref)
  };

  public query func getAnnouncementsBySchool(
    schoolId : Nat
  ) : async [Types.CommMessage] {
    CommLib.getAnnouncementsBySchool(commMessages, schoolId)
  };

  public query func getCommStats() : async Types.CommStats {
    CommLib.getStats(commMessages)
  };
}
