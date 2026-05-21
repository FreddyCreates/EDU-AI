// COMM — School-to-Home Communication Layer lib
import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Types "../types/comm";

module {
  public type MessageStore = List.List<Types.CommMessage>;
  public type ReadLog      = Map.Map<Nat, [Principal]>; // messageId → readers
  public type Counter      = { var nextId : Nat };

  public func newStore() : MessageStore {
    List.empty()
  };

  public func newReadLog() : ReadLog {
    Map.empty()
  };

  public func newCounter() : Counter {
    { var nextId = 1 }
  };

  public func sendMessage(
    store : MessageStore,
    counter : Counter,
    message : Types.CommMessage
  ) : Nat {
    let id = counter.nextId;
    counter.nextId += 1;
    let msg : Types.CommMessage = { message with id };
    store.add(msg);
    id
  };

  public func markRead(
    readLog : ReadLog,
    messageId : Nat,
    reader : Principal
  ) : () {
    let existing = switch (readLog.get(messageId)) {
      case (?readers) { readers };
      case null { [] };
    };
    // Only add if not already present
    let alreadyRead = existing.find<Principal>(func(p) { p == reader }) != null;
    if (not alreadyRead) {
      let updated = Array.tabulate(
        existing.size() + 1,
        func(i) { if (i < existing.size()) { existing[i] } else { reader } }
      );
      readLog.add(messageId, updated);
    }
  };

  // Check if a message targets a given RecipientRef
  func matchesRef(msg : Types.CommMessage, ref : Types.RecipientRef) : Bool {
    for (r in msg.recipientRefs.vals()) {
      let matched = switch (r, ref) {
        case (#parent(a),    #parent(b))    { a == b };
        case (#student(a),   #student(b))   { a == b };
        case (#teacher(a),   #teacher(b))   { a == b };
        case (#classCode(a), #classCode(b)) { a == b };
        case (#gradeLevel(a),#gradeLevel(b)){ a == b };
        case (#schoolWide(a),#schoolWide(b)){ a == b };
        case _ { false };
      };
      if (matched) { return true };
    };
    false
  };

  public func getMessagesForRecipient(
    store : MessageStore,
    ref : Types.RecipientRef
  ) : [Types.CommMessage] {
    store.filter(func(msg) { matchesRef(msg, ref) }).toArray()
  };

  public func sendAnnouncement(
    store : MessageStore,
    counter : Counter,
    schoolId : Nat,
    subj : Text,
    body : Text,
    sender : Principal,
    ts : Int
  ) : Nat {
    let msg : Types.CommMessage = {
      id = 0; // will be replaced
      sender;
      recipientRefs = [#schoolWide(schoolId)];
      subject = subj;
      body;
      messageType = #announcement;
      translationNeeded = false;
      sentAt = ts;
      expiresAt = null;
      attachmentHashes = [];
    };
    sendMessage(store, counter, msg)
  };

  public func getUnreadCount(
    store : MessageStore,
    readLog : ReadLog,
    ref : Types.RecipientRef
  ) : Nat {
    let msgs = getMessagesForRecipient(store, ref);
    // Extract principal from ref for read-check
    switch (ref) {
      case (#parent(p) or #student(p) or #teacher(p)) {
        var count : Nat = 0;
        for (msg in msgs.vals()) {
          let readers = switch (readLog.get(msg.id)) {
            case (?rs) { rs }; case null { [] }
          };
          let read = readers.find<Principal>(func(r) { r == p }) != null;
          if (not read) { count += 1 };
        };
        count
      };
      case _ {
        // For class/grade/school refs, count all messages
        msgs.size()
      };
    }
  };

  public func getAnnouncementsBySchool(
    store : MessageStore,
    schoolId : Nat
  ) : [Types.CommMessage] {
    store.filter(func(msg) {
      msg.messageType == #announcement and
      matchesRef(msg, #schoolWide(schoolId))
    }).toArray()
  };

  public func getStats(
    store : MessageStore
  ) : Types.CommStats {
    let arr = store.toArray();
    var translations : Nat = 0;
    for (msg in arr.vals()) {
      if (msg.translationNeeded) { translations += 1 };
    };
    { totalMessages = arr.size(); byType = []; translationRequestCount = translations; unreadCount = 0 }
  };
}
