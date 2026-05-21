import List  "mo:core/List";
import Text  "mo:core/Text";
import Time  "mo:core/Time";
import Types "../types/digt";
import Map "mo:core/Map";

module {
  // ── PHI constants (integer, ×1000) ───────────────────────────────────────
  let _PHI_INV : Nat = 618;

  // ── Fibonacci sequence (first 16 values) ─────────────────────────────────
  let FIB_SEQUENCE : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];

  // ── FLOR: largest Fibonacci number ≤ n ───────────────────────────────────
  public func fibFloor(n : Nat) : Nat {
    if (n == 0) return 1;
    var result : Nat = 1;
    for (f in FIB_SEQUENCE.values()) {
      if (f <= n) { result := f };
    };
    result;
  };

  // ── State types ──────────────────────────────────────────────────────────
  public type TextInputStore   = List.List<Types.DigtTextInput>;
  public type ConceptStore     = List.List<Types.DigtConcept>;
  public type QuizSeedStore    = List.List<Types.DigtQuizSeed>;
  public type WorkedExStore    = List.List<Types.DigtWorkedExample>;

  // ── Helper: split text into sentences on '.' ─────────────────────────────
  func splitSentences(raw : Text) : [Text] {
    let iter = raw.split(#char '.');
    List.fromIter<Text>(iter).toArray();
  };

  // ── Helper: simple sentence-level concept detector ───────────────────────
  // Looks for "is defined as", "refers to", "means", "is a ", "is an ".
  // Returns ?(term, definition) or null.
  func detectConcept(sentence : Text) : ?(Text, Text) {
    let lower = sentence.toLower();
    let markers : [Text] = ["is defined as", "refers to", "means", "is a ", "is an "];
    label search for (marker in markers.values()) {
      if (lower.contains(#text marker)) {
        // split on the marker
        let parts = lower.split(#text marker);
        let partsArr = List.fromIter(parts).toArray();
        if (partsArr.size() >= 2) {
          let rawTerm = partsArr[0];
          let rawDef  = partsArr[1];
          // capitalise first char of term as the canonical name
          let term = rawTerm.trimEnd(#text " ").trimStart(#text " ");
          let def  = rawDef.trimStart(#text " ").trimEnd(#text " ");
          if (term.size() > 0 and def.size() > 0) {
            return ?(term, def);
          };
        };
        break search;
      };
    };
    null;
  };

  // ── Helper: does a sentence look like a worked example header? ───────────
  func isExampleHeader(sentence : Text) : Bool {
    let lower = sentence.toLower();
    lower.contains(#text "for example") or
    lower.contains(#text "step 1") or
    lower.contains(#text "step 2") or
    lower.contains(#text "therefore") or
    lower.contains(#text "solution:");
  };

  // ── digestText: ingest raw curriculum text ────────────────────────────────
  public func digestText(
    textInputs    : TextInputStore,
    concepts      : ConceptStore,
    quizSeeds     : QuizSeedStore,
    workedExamples : WorkedExStore,
    input         : Types.DigtTextInput,
  ) : Types.DigtDigestResult {
    // Enforce max 89 inputs (F(11))
    if (textInputs.size() >= 89) {
      return {
        inputId             = input.id;
        conceptsExtracted   = 0;
        quizSeedsGenerated  = 0;
        workedExamplesFound = 0;
        gradeLevel          = input.gradeLevel;
        subject             = input.subject;
        processingCycles    = 1;
        timestamp           = Time.now();
      };
    };
    textInputs.add(input);

    let sentences    = splitSentences(input.rawText);
    var conceptCount : Nat = 0;
    var quizCount    : Nat = 0;
    var exCount      : Nat = 0;
    let baseId       = input.id;
    let grade        = input.gradeLevel;
    let subject      = input.subject;
    let fibW         = fibFloor(grade * 8);

    // Collect concept terms for distractor generation
    let termBuf = List.empty<Text>();

    // Pass 1: extract concepts
    var sentIdx : Nat = 0;
    for (sent in sentences.values()) {
      switch (detectConcept(sent)) {
        case (?(term, def)) {
          let cid    = baseId # "-C" # conceptCount.toText();
          let diff   = fibFloor(grade + sentIdx % 5);
          let concept : Types.DigtConcept = {
            id = cid; term; definition = def;
            gradeLevel = grade; subject;
            difficulty = diff; fibWeight = fibW;
          };
          concepts.add(concept);
          termBuf.add(term);
          conceptCount += 1;
        };
        case null {};
      };
      sentIdx += 1;
    };

    let allTerms = termBuf.toArray();

    // Pass 2: generate quiz seeds from extracted concepts
    var cIdx : Nat = 0;
    for (sent in sentences.values()) {
      switch (detectConcept(sent)) {
        case (?(term, def)) {
          let qid    = baseId # "-Q" # quizCount.toText();
          let cid    = baseId # "-C" # cIdx.toText();
          // Two distractors: neighbouring terms or generic fallbacks
          let d1 = if (allTerms.size() > cIdx + 1) allTerms[cIdx + 1] else "unknown";
          let d2 = if (allTerms.size() > cIdx + 2) allTerms[cIdx + 2] else "not applicable";
          let qSeed : Types.DigtQuizSeed = {
            id = qid;
            question    = "What is " # term # "?";
            answer      = def;
            distractors = [d1, d2];
            gradeLevel  = grade;
            subject;
            conceptId   = cid;
          };
          quizSeeds.add(qSeed);
          quizCount += 1;
          cIdx += 1;
        };
        case null {};
      };
    };

    // Pass 3: extract worked examples
    var prevSent : Text = "";
    var exSteps  = List.empty<Text>();
    var inEx     : Bool = false;
    for (sent in sentences.values()) {
      if (isExampleHeader(sent)) {
        // Flush previous example if any
        if (inEx and exSteps.size() > 0) {
          let eid = baseId # "-E" # exCount.toText();
          let ex : Types.DigtWorkedExample = {
            id = eid;
            problem  = prevSent;
            steps    = exSteps.toArray();
            solution = exSteps.toArray()[exSteps.size() - 1];
            gradeLevel = grade; subject;
          };
          workedExamples.add(ex);
          exCount += 1;
          exSteps := List.empty<Text>();
        };
        inEx := true;
        exSteps.add(sent);
      } else if (inEx) {
        exSteps.add(sent);
      };
      prevSent := sent;
    };
    // Flush any trailing example
    if (inEx and exSteps.size() > 0) {
      let eid = baseId # "-E" # exCount.toText();
      let ex : Types.DigtWorkedExample = {
        id = eid;
        problem  = prevSent;
        steps    = exSteps.toArray();
        solution = exSteps.toArray()[exSteps.size() - 1];
        gradeLevel = grade; subject;
      };
      workedExamples.add(ex);
      exCount += 1;
    };

    let rawCycles = conceptCount + quizCount + exCount + 1;
    {
      inputId             = input.id;
      conceptsExtracted   = conceptCount;
      quizSeedsGenerated  = quizCount;
      workedExamplesFound = exCount;
      gradeLevel          = grade;
      subject;
      processingCycles    = fibFloor(rawCycles);
      timestamp           = Time.now();
    };
  };

  // ── getConceptsByGrade ────────────────────────────────────────────────────
  public func getConceptsByGrade(
    concepts   : ConceptStore,
    grade      : Nat,
  ) : [Types.DigtConcept] {
    concepts.filter(func(c) { c.gradeLevel == grade }).toArray();
  };

  // ── getQuizSeedsByGrade ───────────────────────────────────────────────────
  public func getQuizSeedsByGrade(
    quizSeeds  : QuizSeedStore,
    grade      : Nat,
  ) : [Types.DigtQuizSeed] {
    quizSeeds.filter(func(q) { q.gradeLevel == grade }).toArray();
  };

  // ── getWorkedExamplesByGrade ──────────────────────────────────────────────
  public func getWorkedExamplesByGrade(
    workedExamples : WorkedExStore,
    grade          : Nat,
  ) : [Types.DigtWorkedExample] {
    workedExamples.filter(func(e) { e.gradeLevel == grade }).toArray();
  };

  // ── getAllInputs ──────────────────────────────────────────────────────────
  public func getAllInputs(textInputs : TextInputStore) : [Types.DigtTextInput] {
    textInputs.toArray();
  };

  // ── Job tracking types ───────────────────────────────────────────────────
  public type JobStore = Map.Map<Text, Types.DigestJob>;

  public func newJobStore() : JobStore = Map.empty<Text, Types.DigestJob>();

  // ── digestCurriculumText ──────────────────────────────────────────────────
  // Full pipeline: digests raw text, creates a job record, returns DigestResult
  public func digestCurriculumText(
    textInputs     : TextInputStore,
    concepts       : ConceptStore,
    quizSeeds      : QuizSeedStore,
    workedExamples : WorkedExStore,
    jobs           : JobStore,
    jobId          : Text,
    title          : Text,
    gradeLevel     : Nat,
    subject        : Text,
    rawText        : Text,
    teacherId      : Text,
  ) : Types.DigestResult {
    let now   = Time.now();
    let input : Types.DigtTextInput = {
      id = jobId; title; gradeLevel; subject; rawText;
      uploadedBy = teacherId;
      timestamp  = now;
    };
    // Record job as processing
    let jobProcessing : Types.DigestJob = {
      jobId; title; gradeLevel; subject; teacherId;
      status        = "processing";
      submittedAt   = now;
      completedAt   = 0;
      conceptsFound = 0;
      quizSeeds     = 0;
    };
    jobs.add(jobId, jobProcessing);

    let result = digestText(textInputs, concepts, quizSeeds, workedExamples, input);

    // Update job as complete
    let jobComplete : Types.DigestJob = {
      jobId; title; gradeLevel; subject; teacherId;
      status        = "complete";
      submittedAt   = now;
      completedAt   = Time.now();
      conceptsFound = result.conceptsExtracted;
      quizSeeds     = result.quizSeedsGenerated;
    };
    jobs.add(jobId, jobComplete);

    // Collect extracted concepts for this job
    let extractedConcepts = concepts.filter(
      func(c : Types.DigtConcept) : Bool { c.id.contains(#text jobId) }
    ).toArray();

    let gradeVaultEntryId = "GV-" # gradeLevel.toText() # "-" # jobId;
    {
      jobId;
      conceptsExtracted       = extractedConcepts;
      quizSeedsGenerated      = result.quizSeedsGenerated;
      workedExamplesGenerated = result.workedExamplesFound;
      gradeVaultEntryId;
      status = "complete";
    };
  };

  // ── getDigestStatus ───────────────────────────────────────────────────────
  public func getDigestStatus(
    jobs  : JobStore,
    jobId : Text,
  ) : ?Types.DigestStatus {
    switch (jobs.get(jobId)) {
      case null null;
      case (?job) {
        let progress : Nat = if (job.status == "complete") 89
          else if (job.status == "processing") 34
          else 0;
        ?{
          jobId;
          status      = job.status;
          progress    = fibFloor(progress);
          completedAt = job.completedAt;
        };
      };
    };
  };

  // ── listDigestJobs ────────────────────────────────────────────────────────
  public func listDigestJobs(jobs : JobStore) : [Types.DigestJob] {
    jobs.values().toArray();
  };

  // ── getGradeVaultContents ─────────────────────────────────────────────────
  // Returns VaultEntry array for a given grade by scanning concepts + quiz seeds
  public func getGradeVaultContents(
    concepts  : ConceptStore,
    quizSeeds : QuizSeedStore,
    grade     : Nat,
  ) : [Types.VaultEntry] {
    let buf  = List.empty<Types.VaultEntry>();
    let now  = Time.now();

    for (c in concepts.values()) {
      if (c.gradeLevel == grade) {
        let entry : Types.VaultEntry = {
          entryId     = "VE-C-" # c.id;
          gradeLevel  = grade;
          subject     = c.subject;
          contentType = "concept";
          summary     = c.term # ": " # c.definition;
          addedAt     = now;
        };
        buf.add(entry);
      };
    };

    for (q in quizSeeds.values()) {
      if (q.gradeLevel == grade) {
        let entry : Types.VaultEntry = {
          entryId     = "VE-Q-" # q.id;
          gradeLevel  = grade;
          subject     = q.subject;
          contentType = "quiz_seed";
          summary     = q.question;
          addedAt     = now;
        };
        buf.add(entry);
      };
    };

    buf.toArray();
  };

  // ── getDigtStats ─────────────────────────────────────────────────────────
  public func getDigtStats(
    textInputs : TextInputStore,
    concepts   : ConceptStore,
    quizSeeds  : QuizSeedStore,
  ) : Types.DigtStats {
    let subBuf = List.empty<Text>();
    for (inp in textInputs.values()) {
      if (not subBuf.any(func(s) { s == inp.subject })) {
        subBuf.add(inp.subject);
      };
    };
    {
      totalInputs    = textInputs.size();
      totalConcepts  = concepts.size();
      totalQuizSeeds = quizSeeds.size();
      subjectsDigested = subBuf.toArray();
    };
  };
};
