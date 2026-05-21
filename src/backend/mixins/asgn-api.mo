// ASGN — Assignment Engine API mixin
import AsgnLib "../lib/asgn";
import Types "../types/asgn";

mixin (
  assignmentStore : AsgnLib.AssignmentStore,
  submissionStore : AsgnLib.SubmissionStore,
  gradeStore      : AsgnLib.GradeStore,
  asgnCounter     : AsgnLib.Counter
) {
  public shared ({ caller = _ }) func createAssignment(
    assignment : Types.Assignment
  ) : async Nat {
    AsgnLib.createAssignment(assignmentStore, asgnCounter, assignment)
  };

  public query func getAssignment(
    id : Nat
  ) : async ?Types.Assignment {
    AsgnLib.getAssignment(assignmentStore, id)
  };

  public query func getAssignmentsByClass(
    classCode : Text
  ) : async [Types.Assignment] {
    AsgnLib.getAssignmentsByClass(assignmentStore, classCode)
  };

  public shared ({ caller = _ }) func submitAssignment(
    submission : Types.Submission
  ) : async Nat {
    AsgnLib.submitAssignment(submissionStore, asgnCounter, submission)
  };

  public query func getSubmissionsByAssignment(
    assignmentId : Nat
  ) : async [Types.Submission] {
    AsgnLib.getSubmissionsByAssignment(submissionStore, assignmentId)
  };

  public query ({ caller }) func getMySubmissions() : async [Types.Submission] {
    AsgnLib.getSubmissionsByStudent(submissionStore, caller)
  };

  public shared ({ caller = _ }) func gradeSubmission(
    gradeRecord : Types.GradeRecord
  ) : async Nat {
    AsgnLib.gradeSubmission(gradeStore, submissionStore, asgnCounter, gradeRecord)
  };

  public query ({ caller }) func getMyGrades() : async [Types.GradeRecord] {
    AsgnLib.getGradesByStudent(gradeStore, caller)
  };

  public query func getClassAverage(
    assignmentId : Nat
  ) : async Nat {
    AsgnLib.computeClassAverage(gradeStore, assignmentId)
  };

  public query func getAsgnStats() : async Types.AsgnStats {
    AsgnLib.getStats(assignmentStore, submissionStore, gradeStore)
  };
}
