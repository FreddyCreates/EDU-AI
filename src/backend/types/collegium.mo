// COLLEGIUM-PUBLICA — type definitions for the public sovereign college
module {
  public type TrackId = {
    #buildFirstAI;
    #teachAIToRemember;
    #giveAIAVoice;
  };

  public type Track = {
    id : TrackId;
    codeName : Text;
    title : Text;
    subtitle : Text;
    description : Text;
    guidingEngines : [Text];
    durationMinutes : Nat;
    stepCount : Nat;
  };

  public type TrackEnrollment = {
    studentId : Principal;
    trackId : TrackId;
    enrolledAt : Int;
    completedAt : ?Int;
    currentStep : Nat;
    createdArtifactName : ?Text;
  };

  public type NexumGateEntry = {
    studentId : Principal;
    collegium : Text;
    enteredAt : Int;
    appliedLaw : Text;
  };
};
