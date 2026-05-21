import UnivTypes "../types/university";
import UnivLib "../lib/university";
import PassportLib "../lib/passport";
import Time "mo:core/Time";

mixin (
  courseStore  : UnivLib.CourseStore,
  enrollStore  : UnivLib.EnrollmentStore,
  passports    : PassportLib.PassportStore,
  seedStore    : PassportLib.SeedStore,
) {
  /// Get all 8 courses with caller's lock/enroll/progress status.
  public query ({ caller }) func getCourses() : async [UnivTypes.CourseSummary] {
    UnivLib.getCoursesForCaller(courseStore, enrollStore, passports, seedStore, caller);
  };

  /// Get all courses the caller is currently enrolled in.
  public query ({ caller }) func getEnrolledCourses() : async [UnivTypes.EnrolledCourse] {
    UnivLib.getEnrolledCourses(courseStore, enrollStore, caller);
  };

  /// Enroll the caller in a course. Validates SSS threshold.
  public shared ({ caller }) func enrollInCourse(courseId : Text) : async { #ok; #err : Text } {
    UnivLib.enroll(courseStore, enrollStore, passports, seedStore, caller, courseId, Time.now());
  };

  /// Mark a module as complete. Awards a passport seed when the whole course is done.
  public shared ({ caller }) func completeModule(courseId : Text, moduleIndex : Nat) : async { #ok : Text; #err : Text } {
    UnivLib.completeModule(courseStore, enrollStore, passports, seedStore, caller, courseId, moduleIndex, Time.now());
  };
};
