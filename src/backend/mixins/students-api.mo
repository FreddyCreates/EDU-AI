import Types "../types/students";
import StudentsLib "../lib/students";

mixin (profiles : StudentsLib.ProfileStore) {
  public query ({ caller }) func getStudentProfile() : async ?Types.StudentProfile {
    StudentsLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func createStudentProfile(
    name : Text,
    gradeLevel : Text,
  ) : async Types.StudentProfile {
    StudentsLib.createProfile(profiles, caller, name, gradeLevel);
  };

  public shared ({ caller }) func updateStudentGrade(
    gradeLevel : Text,
  ) : async Types.StudentProfile {
    StudentsLib.updateGrade(profiles, caller, gradeLevel);
  };
};
