// ESLL — ESL/ELL Support types
module {
  public type EslProfile = {
    studentPrincipal : Principal;
    nativeLanguage : Text;   // ISO 639-1
    preferredLanguage : Text;
    proficiencyLevel : ProficiencyLevel;
    vocabScaffoldingEnabled : Bool;
    adaptedPromptsEnabled : Bool;
    translationFlags : [Text]; // subject codes needing translation aid
    updatedAt : Int;
  };

  public type ProficiencyLevel = {
    #entering;    // WIDA Level 1
    #emerging;    // WIDA Level 2
    #developing;  // WIDA Level 3
    #expanding;   // WIDA Level 4
    #bridging;    // WIDA Level 5
    #reaching;    // WIDA Level 6
  };

  public type EsllStats = {
    totalEllStudents : Nat;
    byProficiencyLevel : [(Text, Nat)];
    scaffoldingEnabledCount : Nat;
  };
}
