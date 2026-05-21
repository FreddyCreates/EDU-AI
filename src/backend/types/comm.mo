// COMM — School-to-Home Communication Layer types
module {
  public type CommMessage = {
    id : Nat;
    sender : Principal;
    recipientRefs : [RecipientRef];
    subject : Text;
    body : Text;
    messageType : MessageType;
    translationNeeded : Bool;
    sentAt : Int;
    expiresAt : ?Int;
    attachmentHashes : [Blob]; // hashes only, no raw files
  };

  public type RecipientRef = {
    #parent : Principal;
    #student : Principal;
    #teacher : Principal;
    #classCode : Text;
    #gradeLevel : Nat;
    #schoolWide : Nat; // schoolId
  };

  public type MessageType = {
    #announcement;
    #alert;
    #eventInvitation;
    #parentTeacherMessage;
    #progressUpdate;
    #recognitionAlert;
    #systemNotice;
  };

  public type CommStats = {
    totalMessages : Nat;
    byType : [(Text, Nat)];
    translationRequestCount : Nat;
    unreadCount : Nat;
  };
}
