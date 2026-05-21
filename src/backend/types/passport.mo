import Common "common";

module {
  public type KernelSeed = {
    id : Text;                // unique seed ID (timestamp + principal hash)
    sessionSummary : Text;    // what was created/learned this session
    engineUsed : Text;        // e.g. "GENITOR", "MEMORIA-VIVA"
    trackName : Text;         // which COLLEGIUM-PUBLICA track or study track
    createdAt : Common.Timestamp;
    artifactName : ?Text;     // optional: name of the thing they built
  };

  public type SovereignPassport = {
    holder : Common.UserId;
    passportId : Text;        // "PP-" + short principal hash
    studentName : Text;
    gradeLevel : Text;
    collegium : Text;         // "COLLEGIUM-PUBLICA" or "COLLEGIUM-COGNITO"
    kernelSeeds : [KernelSeed];
    totalSessions : Nat;
    createdAt : Common.Timestamp;
    lastActiveAt : Common.Timestamp;
    achievements : [Text];
  };

  public type PassportStats = {
    totalSeeds : Nat;
    hotSeeds : Nat;
    warmSeeds : Nat;
    coldSeeds : Nat;
    frozenSeeds : Nat;
    achievements : [Text];
    compoundScore : Float;
  };
};
