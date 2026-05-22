// Protocol lib — structured instructional sequences for sovereign classrooms.
// All durations are Fibonacci-aligned (1,2,3,5,8,13,21 minutes).
import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Common "../types/common";
import Types "../types/protocol";

module {
  public type ProtocolStore    = Map.Map<Text, Types.LearningProtocol>;
  public type AssignmentStore  = Map.Map<Text, Types.ProtocolAssignment>;

  public func newProtocolStore()   : ProtocolStore   { Map.empty() };
  public func newAssignmentStore() : AssignmentStore { Map.empty() };

  // ── Seed sovereign protocol library ──────────────────────────────────────
  public func seedProtocols(store : ProtocolStore) {
    let protocols : [Types.LearningProtocol] = [
      {
        id          = "PROT-SOCRATIC";
        name        = "Socratic Seminar";
        kind        = #socratic;
        description = "Text-based discussion where students take ownership of inquiry. Teacher facilitates; students drive the questions and reasoning. Develops critical thinking and evidence-based argumentation.";
        gradeRange  = "6-12";
        subjectFit  = ["reading", "history", "science", "philosophy", "any"];
        totalMinutes = 55;
        steps       = [
          { stepNum = 1; role = "Teacher";  instruction = "Distribute the anchor text. Students read independently and annotate key passages, questions, and points of confusion."; durationMinutes = 13 };
          { stepNum = 2; role = "Student";  instruction = "Write one open-ended question about the text that has no single correct answer. Questions must reference specific evidence."; durationMinutes = 5 };
          { stepNum = 3; role = "Teacher";  instruction = "Arrange seating in a circle (inner/outer if large class). Explain norms: cite evidence, build on others' ideas, disagree respectfully."; durationMinutes = 3 };
          { stepNum = 4; role = "Student";  instruction = "Inner circle discusses: pose questions, respond with textual evidence, challenge reasoning. Outer circle observes and takes notes on discussion quality."; durationMinutes = 21 };
          { stepNum = 5; role = "Group";    instruction = "Switch inner/outer circles if using fishbowl format. Outer circle adds unaddressed ideas."; durationMinutes = 8 };
          { stepNum = 6; role = "Student";  instruction = "Individual reflection: What claim do you now hold? What evidence most changed your thinking? Write 3-5 sentences."; durationMinutes = 5 };
        ];
      };
      {
        id          = "PROT-TPS";
        name        = "Think-Pair-Share";
        kind        = #thinkPairShare;
        description = "Individual thinking → paired discussion → whole-class synthesis. Low-stakes protocol for activating prior knowledge, processing new content, or formative checking.";
        gradeRange  = "K-12";
        subjectFit  = ["any"];
        totalMinutes = 13;
        steps       = [
          { stepNum = 1; role = "Student";  instruction = "Think independently. Process the prompt silently. Write your initial response — no sharing yet."; durationMinutes = 3 };
          { stepNum = 2; role = "Pair";     instruction = "Share your response with your partner. Each partner explains their thinking fully before responding."; durationMinutes = 5 };
          { stepNum = 3; role = "Pair";     instruction = "Synthesize: agree on the strongest combined answer. Identify one point where your thinking differed."; durationMinutes = 2 };
          { stepNum = 4; role = "Group";    instruction = "Pairs share their synthesis with the class. Teacher records key ideas and patterns on the board."; durationMinutes = 3 };
        ];
      };
      {
        id          = "PROT-JIGSAW";
        name        = "Jigsaw";
        kind        = #jigsaw;
        description = "Expert groups master one section of content, then teach it to home groups. Each student becomes both learner and teacher. Promotes accountability and collaborative depth.";
        gradeRange  = "4-12";
        subjectFit  = ["science", "history", "reading", "any"];
        totalMinutes = 55;
        steps       = [
          { stepNum = 1; role = "Teacher";  instruction = "Divide content into 4-5 equal sections. Assign students to expert groups — one section per group. Distribute materials."; durationMinutes = 5 };
          { stepNum = 2; role = "Group";    instruction = "Expert group study: read, discuss, and master your assigned section. Create a teaching outline and 2 comprehension questions."; durationMinutes = 21 };
          { stepNum = 3; role = "Teacher";  instruction = "Regroup: form home groups with one expert from each section. Confirm group composition."; durationMinutes = 2 };
          { stepNum = 4; role = "Student";  instruction = "Each expert teaches their section to the home group using the teaching outline. Home group members take notes and ask questions."; durationMinutes = 21 };
          { stepNum = 5; role = "Student";  instruction = "Home group synthesis: summarize the full content together. Each member identifies their most important takeaway."; durationMinutes = 3 };
          { stepNum = 6; role = "Student";  instruction = "Individual assessment: answer the comprehension questions from each expert group without notes."; durationMinutes = 3 };
        ];
      };
      {
        id          = "PROT-GALLERY";
        name        = "Gallery Walk";
        kind        = #galleryWalk;
        description = "Students rotate through posted stations, responding to prompts or artifacts. Builds exposure to multiple perspectives and supports collaborative note-making.";
        gradeRange  = "3-12";
        subjectFit  = ["any"];
        totalMinutes = 34;
        steps       = [
          { stepNum = 1; role = "Teacher";  instruction = "Post 5-8 stations around the room. Each station has a prompt, image, data set, or student work sample and space for written responses."; durationMinutes = 5 };
          { stepNum = 2; role = "Student";  instruction = "Rotate through stations in small groups. At each station: read, discuss, and add your group's response or annotation. Do not repeat what a prior group wrote."; durationMinutes = 21 };
          { stepNum = 3; role = "Group";    instruction = "Return to your starting station. Read all the responses that accumulated. Synthesize: What patterns do you see? What surprises you?"; durationMinutes = 5 };
          { stepNum = 4; role = "Group";    instruction = "Each group shares one synthesis insight. Class discussion: identify the most compelling idea from the gallery."; durationMinutes = 3 };
        ];
      };
      {
        id          = "PROT-FIB";
        name        = "Fibonacci Sprint Review";
        kind        = #fibonacci;
        description = "Spaced repetition review protocol using Fibonacci-interval micro-sessions. Each sprint is timed to a Fibonacci minute value, building mastery through progressively compressed retrieval.";
        gradeRange  = "K-12";
        subjectFit  = ["any"];
        totalMinutes = 34;
        steps       = [
          { stepNum = 1; role = "Student";  instruction = "1-minute sprint: rapid free recall. Write everything you remember about the topic without notes."; durationMinutes = 1 };
          { stepNum = 2; role = "Student";  instruction = "2-minute sprint: fill the gaps. What did you miss? Open notes for 2 minutes and add what you forgot."; durationMinutes = 2 };
          { stepNum = 3; role = "Pair";     instruction = "3-minute pair check: compare your recall sheets. Explain one concept to your partner from memory."; durationMinutes = 3 };
          { stepNum = 4; role = "Student";  instruction = "5-minute application sprint: apply the concept to a new problem or scenario without notes."; durationMinutes = 5 };
          { stepNum = 5; role = "Group";    instruction = "8-minute group synthesis: share application attempts. Identify the hardest concept. Build a shared explanation together."; durationMinutes = 8 };
          { stepNum = 6; role = "Student";  instruction = "13-minute deep dive: individually solve 3 practice problems at increasing difficulty. Self-check with the rubric."; durationMinutes = 13 };
          { stepNum = 7; role = "Teacher";  instruction = "2-minute close: teacher addresses the top 2 misconceptions surfaced in the group synthesis."; durationMinutes = 2 };
        ];
      };
      {
        id          = "PROT-CLOSE";
        name        = "Close Reading Protocol";
        kind        = #closeReading;
        description = "Three-pass close reading: literal → inferential → evaluative. Builds disciplinary literacy across subjects. Anchors all reasoning in textual evidence.";
        gradeRange  = "3-12";
        subjectFit  = ["reading", "history", "science", "any"];
        totalMinutes = 34;
        steps       = [
          { stepNum = 1; role = "Student";  instruction = "First read — get the gist. Read the full text without stopping. Answer: What is this text mostly about? Write 1 sentence."; durationMinutes = 5 };
          { stepNum = 2; role = "Student";  instruction = "Second read — mark the text. Underline key terms. Circle transitions. Put a ? next to confusing sections. Mark evidence with [ ]."; durationMinutes = 8 };
          { stepNum = 3; role = "Pair";     instruction = "Discuss your markings with a partner. Resolve confusing sections together. Identify the 3 most important sentences in the text."; durationMinutes = 5 };
          { stepNum = 4; role = "Student";  instruction = "Third read — analytical read. Answer the text-dependent questions using direct evidence. Every answer must contain a quote."; durationMinutes = 13 };
          { stepNum = 5; role = "Group";    instruction = "Share your evidence-based answers. Discuss: Does the evidence fully support the claim? What counterevidence exists?"; durationMinutes = 3 };
        ];
      };
    ];
    for (p in protocols.vals()) {
      store.add(p.id, p);
    };
  };

  // ── Public API ────────────────────────────────────────────────────────────

  /// Return all available learning protocols.
  public func getAllProtocols(store : ProtocolStore) : [Types.LearningProtocol] {
    let buf = List.empty<Types.LearningProtocol>();
    for ((_id, p) in store.entries()) { buf.add(p) };
    buf.toArray();
  };

  /// Return one protocol by ID.
  public func getProtocol(store : ProtocolStore, protocolId : Text) : ?Types.LearningProtocol {
    store.get(protocolId);
  };

  func _makeAssignmentId(caller : Common.UserId, protocolId : Text, now : Common.Timestamp) : Text {
    let p = Text.fromIter(caller.toText().toIter().take(8));
    let pr = Text.fromIter(protocolId.toIter().take(10));
    "PASN-" # p # "-" # pr # "-" # Int.abs(now).toText();
  };

  /// Teacher assigns a protocol to a class and topic.
  /// Returns the assignment ID.
  public func assignProtocol(
    store        : AssignmentStore,
    caller       : Common.UserId,
    protocolId   : Text,
    classId      : Text,
    topicId      : Text,
    scheduledFor : ?Common.Timestamp,
    notes        : ?Text,
    now          : Common.Timestamp,
  ) : Text {
    let id = _makeAssignmentId(caller, protocolId, now);
    let assignment : Types.ProtocolAssignment = {
      id           = id;
      protocolId   = protocolId;
      teacherId    = caller;
      classId      = classId;
      topicId      = topicId;
      status       = #pending;
      assignedAt   = now;
      scheduledFor = scheduledFor;
      completedAt  = null;
      notes        = notes;
    };
    store.add(id, assignment);
    id;
  };

  /// Return all assignments for a given class.
  public func getClassAssignments(
    store   : AssignmentStore,
    classId : Text,
  ) : [Types.ProtocolAssignment] {
    let buf = List.empty<Types.ProtocolAssignment>();
    for ((_id, a) in store.entries()) {
      if (a.classId == classId) { buf.add(a) };
    };
    buf.toArray();
  };

  /// Return all assignments created by the calling teacher.
  public func getMyAssignments(
    store  : AssignmentStore,
    caller : Common.UserId,
  ) : [Types.ProtocolAssignment] {
    let buf = List.empty<Types.ProtocolAssignment>();
    for ((_id, a) in store.entries()) {
      if (a.teacherId == caller) { buf.add(a) };
    };
    buf.toArray();
  };

  /// Activate a pending assignment.
  public func activateAssignment(
    store        : AssignmentStore,
    assignmentId : Text,
    caller       : Common.UserId,
  ) : Bool {
    switch (store.get(assignmentId)) {
      case null false;
      case (?a) {
        if (a.teacherId != caller) return false;
        store.add(assignmentId, { a with status = #active });
        true;
      };
    };
  };

  /// Complete an active assignment.
  public func completeAssignment(
    store        : AssignmentStore,
    assignmentId : Text,
    caller       : Common.UserId,
    now          : Common.Timestamp,
  ) : Bool {
    switch (store.get(assignmentId)) {
      case null false;
      case (?a) {
        if (a.teacherId != caller) return false;
        store.add(assignmentId, { a with status = #completed; completedAt = ?now });
        true;
      };
    };
  };
};
