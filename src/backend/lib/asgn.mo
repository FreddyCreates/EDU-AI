// ASGN — Assignment Engine lib
import List "mo:core/List";
import Map "mo:core/Map";
import Types "../types/asgn";

module {
  public type AssignmentStore = Map.Map<Nat, Types.Assignment>;
  public type SubmissionStore = List.List<Types.Submission>;
  public type GradeStore      = List.List<Types.GradeRecord>;
  public type Counter         = { var nextId : Nat };

  public func newAssignmentStore() : AssignmentStore {
    Map.empty()
  };

  public func newSubmissionStore() : SubmissionStore {
    List.empty()
  };

  public func newGradeStore() : GradeStore {
    List.empty()
  };

  public func newCounter() : Counter {
    { var nextId = 1 }
  };

  // Fibonacci floor helper
  func fibFloorNat(n : Nat) : Nat {
    let fibs = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
    let sc = n * 1618 / 1000;
    var best : Nat = 1;
    for (f in fibs.vals()) {
      if (f <= sc) { best := f };
    };
    best
  };

  public func createAssignment(
    store : AssignmentStore,
    counter : Counter,
    assignment : Types.Assignment
  ) : Nat {
    let id = counter.nextId;
    counter.nextId += 1;
    store.add(id, { assignment with id });
    id
  };

  public func getAssignment(
    store : AssignmentStore,
    id : Nat
  ) : ?Types.Assignment {
    store.get(id)
  };

  public func getAssignmentsByClass(
    store : AssignmentStore,
    classCode : Text
  ) : [Types.Assignment] {
    store.values().toArray().filter(func(a) { a.classCode == classCode })
  };

  public func submitAssignment(
    subStore : SubmissionStore,
    counter : Counter,
    submission : Types.Submission
  ) : Nat {
    let id = counter.nextId;
    counter.nextId += 1;
    subStore.add({ submission with id });
    id
  };

  public func getSubmissionsByAssignment(
    subStore : SubmissionStore,
    assignmentId : Nat
  ) : [Types.Submission] {
    subStore.filter(func(s) { s.assignmentId == assignmentId }).toArray()
  };

  public func getSubmissionsByStudent(
    subStore : SubmissionStore,
    studentPrincipal : Principal
  ) : [Types.Submission] {
    subStore.filter(func(s) { s.studentPrincipal == studentPrincipal }).toArray()
  };

  public func gradeSubmission(
    gradeStore : GradeStore,
    subStore : SubmissionStore,
    counter : Counter,
    gradeRecord : Types.GradeRecord
  ) : Nat {
    let id = counter.nextId;
    counter.nextId += 1;
    // Mark the submission as graded
    subStore.mapInPlace(func(s) {
      if (s.id == gradeRecord.submissionId) {
        { s with status = #graded }
      } else { s }
    });
    gradeStore.add({ gradeRecord with
      submissionId = gradeRecord.submissionId;
      score = fibFloorNat(gradeRecord.score);
    });
    id
  };

  public func getGradesByStudent(
    gradeStore : GradeStore,
    studentPrincipal : Principal
  ) : [Types.GradeRecord] {
    gradeStore.filter(func(g) { g.studentPrincipal == studentPrincipal }).toArray()
  };

  public func computeClassAverage(
    gradeStore : GradeStore,
    assignmentId : Nat
  ) : Nat {
    let grades = gradeStore.filter(func(g) { g.assignmentId == assignmentId });
    let count = grades.size();
    if (count == 0) { return 0 };
    var total : Nat = 0;
    for (g in grades.toArray().vals()) { total += g.score };
    fibFloorNat(total / count)
  };

  public func getStats(
    aStore : AssignmentStore,
    sStore : SubmissionStore,
    gStore : GradeStore
  ) : Types.AsgnStats {
    let gradedCount = gStore.size();
    var totalScore : Nat = 0;
    for (g in gStore.toArray().vals()) { totalScore += g.score };
    let avgScore    = if (gradedCount == 0) 0 else fibFloorNat(totalScore / gradedCount);
    {
      totalAssignments = aStore.size();
      totalSubmissions = sStore.size();
      gradedCount;
      avgScore;
    }
  };
}
