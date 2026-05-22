import ProtocolLib "../lib/protocol";
import ProtocolTypes "../types/protocol";
import Time "mo:core/Time";

mixin (
  protocolStore   : ProtocolLib.ProtocolStore,
  assignmentStore : ProtocolLib.AssignmentStore,
) {
  /// Return all available sovereign learning protocols.
  public query func getLearningProtocols() : async [ProtocolTypes.LearningProtocol] {
    ProtocolLib.getAllProtocols(protocolStore);
  };

  /// Return a specific protocol by ID.
  public query func getLearningProtocol(protocolId : Text) : async ?ProtocolTypes.LearningProtocol {
    ProtocolLib.getProtocol(protocolStore, protocolId);
  };

  /// Teacher assigns a protocol to a class and topic.
  /// scheduledFor: optional nanosecond timestamp of planned session.
  /// Returns the assignment ID.
  public shared ({ caller }) func assignLearningProtocol(
    protocolId   : Text,
    classId      : Text,
    topicId      : Text,
    scheduledFor : ?Int,
    notes        : ?Text,
  ) : async Text {
    ProtocolLib.assignProtocol(
      assignmentStore, caller, protocolId, classId, topicId, scheduledFor, notes, Time.now(),
    );
  };

  /// Return all protocol assignments for a specific class.
  public query func getClassProtocolAssignments(
    classId : Text,
  ) : async [ProtocolTypes.ProtocolAssignment] {
    ProtocolLib.getClassAssignments(assignmentStore, classId);
  };

  /// Return all protocol assignments created by the calling teacher.
  public query ({ caller }) func getMyProtocolAssignments() : async [ProtocolTypes.ProtocolAssignment] {
    ProtocolLib.getMyAssignments(assignmentStore, caller);
  };

  /// Activate a pending protocol assignment.
  public shared ({ caller }) func activateProtocolAssignment(assignmentId : Text) : async Bool {
    ProtocolLib.activateAssignment(assignmentStore, assignmentId, caller);
  };

  /// Mark a protocol assignment as completed.
  public shared ({ caller }) func completeProtocolAssignment(assignmentId : Text) : async Bool {
    ProtocolLib.completeAssignment(assignmentStore, assignmentId, caller, Time.now());
  };
};
