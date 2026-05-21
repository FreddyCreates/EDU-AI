// PRNT — Parent/Guardian Registry types
module {
  public type ParentId = Principal;

  public type ParentRecord = {
    parentId : ParentId;
    displayName : Text;
    linkedStudentPrincipals : [Principal];
    permissionLevel : PermissionLevel;
    contactPrefs : ContactPreferences;
    messageHistory : [MessageRef];
    createdAt : Int;
  };

  public type PermissionLevel = {
    #readOnly;   // view grades and progress
    #standard;   // + receive alerts
    #full;       // + message teachers
  };

  public type ContactPreferences = {
    preferEmail : Bool;
    preferInApp : Bool;
    language : Text;  // ISO 639-1 code
    quietHoursStart : ?Nat; // hour 0-23
    quietHoursEnd   : ?Nat;
  };

  public type MessageRef = {
    messageId : Nat;
    sentAt : Int;
    subject : Text;
    read : Bool;
  };
}
