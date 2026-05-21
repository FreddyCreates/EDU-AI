import Time    "mo:core/Time";
import List    "mo:core/List";
import DigtLib "../lib/digt";
import Types   "../types/digt";

mixin () {
  // ── Stable state ─────────────────────────────────────────────────────────
  var digtTextInputs     : DigtLib.TextInputStore = List.empty<Types.DigtTextInput>();
  var digtConcepts       : DigtLib.ConceptStore   = List.empty<Types.DigtConcept>();
  var digtQuizSeeds      : DigtLib.QuizSeedStore  = List.empty<Types.DigtQuizSeed>();
  var digtWorkedExamples : DigtLib.WorkedExStore  = List.empty<Types.DigtWorkedExample>();
  var digtJobs           : DigtLib.JobStore       = DigtLib.newJobStore();

  // ── Counter for id generation ────────────────────────────────────────────
  var digtCounter : Nat = 0;

  // ── digestTextbook (legacy path) ────────────────────────────────────────
  public func digestTextbook(
    title      : Text,
    gradeLevel : Nat,
    subject    : Text,
    rawText    : Text,
  ) : async Types.DigtDigestResult {
    digtCounter += 1;
    let id = "DIGT-" # digtCounter.toText() # "-" # gradeLevel.toText();
    let input : Types.DigtTextInput = {
      id; title; gradeLevel; subject; rawText;
      uploadedBy = "admin";
      timestamp  = Time.now();
    };
    DigtLib.digestText(
      digtTextInputs,
      digtConcepts,
      digtQuizSeeds,
      digtWorkedExamples,
      input,
    );
  };

  // ── digestCurriculumText ────────────────────────────────────────────────
  public func digestCurriculumText(
    title      : Text,
    gradeLevel : Nat,
    subject    : Text,
    rawText    : Text,
    teacherId  : Text,
  ) : async Types.DigestResult {
    digtCounter += 1;
    let jobId = "JOB-" # digtCounter.toText() # "-G" # gradeLevel.toText();
    DigtLib.digestCurriculumText(
      digtTextInputs,
      digtConcepts,
      digtQuizSeeds,
      digtWorkedExamples,
      digtJobs,
      jobId,
      title,
      gradeLevel,
      subject,
      rawText,
      teacherId,
    );
  };

  // ── getDigestStatus ────────────────────────────────────────────────────────
  public query func getDigestStatus(jobId : Text) : async ?Types.DigestStatus {
    DigtLib.getDigestStatus(digtJobs, jobId);
  };

  // ── listDigestJobs ────────────────────────────────────────────────────────
  public query func listDigestJobs() : async [Types.DigestJob] {
    DigtLib.listDigestJobs(digtJobs);
  };

  // ── getGradeVaultContents ─────────────────────────────────────────────────
  public query func getGradeVaultContents(grade : Nat) : async [Types.VaultEntry] {
    DigtLib.getGradeVaultContents(digtConcepts, digtQuizSeeds, grade);
  };

  // ── getConceptsByGrade ────────────────────────────────────────────────────
  public query func getConceptsByGrade(grade : Nat) : async [Types.DigtConcept] {
    DigtLib.getConceptsByGrade(digtConcepts, grade);
  };

  // ── getQuizSeedsByGrade ───────────────────────────────────────────────────
  public query func getQuizSeedsByGrade(grade : Nat) : async [Types.DigtQuizSeed] {
    DigtLib.getQuizSeedsByGrade(digtQuizSeeds, grade);
  };

  // ── getDigtStats ──────────────────────────────────────────────────────────
  public query func getDigtStats() : async Types.DigtStats {
    DigtLib.getDigtStats(digtTextInputs, digtConcepts, digtQuizSeeds);
  };
};
