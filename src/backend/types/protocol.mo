// Protocol types — structured instructional sequences
import Common "common";

module {
  public type ProtocolKind = {
    #socratic;       // Socratic Seminar: text-based discussion, student-led inquiry
    #thinkPairShare; // Think-Pair-Share: individual → pair → group
    #jigsaw;         // Jigsaw: expert groups → home groups
    #galleryWalk;    // Gallery Walk: rotate through stations
    #fibonacci;      // Fibonacci spaced repetition sprint
    #closeReading;   // Close Reading: annotate → infer → synthesize
  };

  public type ProtocolStep = {
    stepNum         : Nat;
    role            : Text;   // "Student" | "Teacher" | "Pair" | "Group"
    instruction     : Text;
    durationMinutes : Nat;    // Fibonacci-aligned (1,2,3,5,8,13,21)
  };

  public type LearningProtocol = {
    id           : Text;
    name         : Text;
    kind         : ProtocolKind;
    description  : Text;
    steps        : [ProtocolStep];
    totalMinutes : Nat;
    gradeRange   : Text;    // e.g. "K-5" | "6-8" | "9-12" | "K-12"
    subjectFit   : [Text];  // subject IDs or "any"
  };

  public type AssignmentStatus = { #pending; #active; #completed; #cancelled };

  /// A teacher assigns a protocol to a class/lesson.
  public type ProtocolAssignment = {
    id           : Text;
    protocolId   : Text;
    teacherId    : Common.UserId;
    classId      : Text;
    topicId      : Text;
    status       : AssignmentStatus;
    assignedAt   : Common.Timestamp;
    scheduledFor : ?Common.Timestamp;
    completedAt  : ?Common.Timestamp;
    notes        : ?Text;
  };
};
