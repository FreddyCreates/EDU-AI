module {
  // ── DIGT: Textbook Digester Types ────────────────────────────────────────

  public type DigtTextInput = {
    id          : Text;
    title       : Text;
    gradeLevel  : Nat;
    subject     : Text;
    rawText     : Text;
    uploadedBy  : Text;
    timestamp   : Int;
  };

  public type DigtConcept = {
    id          : Text;
    term        : Text;
    definition  : Text;
    gradeLevel  : Nat;
    subject     : Text;
    difficulty  : Nat;   // fibFloor'd
    fibWeight   : Nat;   // fibFloor(gradeLevel × 8)
  };

  public type DigtQuizSeed = {
    id          : Text;
    question    : Text;
    answer      : Text;
    distractors : [Text];
    gradeLevel  : Nat;
    subject     : Text;
    conceptId   : Text;
  };

  public type DigtWorkedExample = {
    id          : Text;
    problem     : Text;
    steps       : [Text];
    solution    : Text;
    gradeLevel  : Nat;
    subject     : Text;
  };

  public type DigtDigestResult = {
    inputId              : Text;
    conceptsExtracted    : Nat;
    quizSeedsGenerated   : Nat;
    workedExamplesFound  : Nat;
    gradeLevel           : Nat;
    subject              : Text;
    processingCycles     : Nat;  // Fibonacci-floored
    timestamp            : Int;
  };

  public type DigtStats = {
    totalInputs      : Nat;
    totalConcepts    : Nat;
    totalQuizSeeds   : Nat;
    subjectsDigested : [Text];
  };

  // Digest job tracking
  public type DigestJob = {
    jobId         : Text;
    title         : Text;
    gradeLevel    : Nat;
    subject       : Text;
    teacherId     : Text;
    status        : Text;   // "processing" | "complete" | "failed"
    submittedAt   : Int;
    completedAt   : Int;    // 0 if not yet complete
    conceptsFound : Nat;
    quizSeeds     : Nat;
  };

  // Status of a single digest job
  public type DigestStatus = {
    jobId       : Text;
    status      : Text;
    progress    : Nat;   // Fibonacci-floored 0-100
    completedAt : Int;
  };

  // DigestResult returned to caller (richer than DigtDigestResult)
  public type DigestResult = {
    jobId                : Text;
    conceptsExtracted    : [DigtConcept];
    quizSeedsGenerated   : Nat;
    workedExamplesGenerated : Nat;
    gradeVaultEntryId    : Text;
    status               : Text;
  };

  // Vault entry as seen through the digester lens
  public type VaultEntry = {
    entryId    : Text;
    gradeLevel : Nat;
    subject    : Text;
    contentType : Text;  // "concept" | "quiz_seed" | "worked_example"
    summary    : Text;
    addedAt    : Int;
  };
};
