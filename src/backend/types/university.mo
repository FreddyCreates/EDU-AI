import Common "common";

module {
  /// A course in the EDDI University.
  public type Course = {
    id : Text;
    title : Text;
    description : Text;
    moduleCount : Nat;
    requiredSssThreshold : Nat;  // Fibonacci-floor minimum SSS to enroll
    order : Nat;                  // display / unlock order
    category : Text;              // GENERAL | UIL_ACADEMIC | UIL_CTE | UIL_MUSIC | UIL_ATHLETICS
  };

  /// A caller's enrollment record for a course.
  public type EnrolledCourse = {
    courseId : Text;
    enrolledAt : Common.Timestamp;
    progressPercent : Nat;        // 0-100
    agentsBuilt : [Text];         // IDs of agents created in this course
    completedModules : [Nat];     // indexes of completed modules
  };

  /// Lightweight course summary returned to caller with lock status.
  public type CourseSummary = {
    course : Course;
    isUnlocked : Bool;
    isEnrolled : Bool;
    progressPercent : Nat;
  };
};
