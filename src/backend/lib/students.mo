import Time "mo:core/Time";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Common "../types/common";
import Types "../types/students";

module {
  public type ProfileStore = Map.Map<Common.UserId, Types.StudentProfile>;

  public func getProfile(
    profiles : ProfileStore,
    caller : Common.UserId,
  ) : ?Types.StudentProfile {
    profiles.get(caller);
  };

  public func createProfile(
    profiles : ProfileStore,
    caller : Common.UserId,
    name : Text,
    gradeLevel : Text,
  ) : Types.StudentProfile {
    let profile : Types.StudentProfile = {
      id = caller;
      name = name;
      gradeLevel = gradeLevel;
      createdAt = Time.now();
    };
    profiles.add(caller, profile);
    profile;
  };

  public func updateGrade(
    profiles : ProfileStore,
    caller : Common.UserId,
    gradeLevel : Text,
  ) : Types.StudentProfile {
    let existing = switch (profiles.get(caller)) {
      case (?p) p;
      case null Runtime.trap("Profile not found");
    };
    let updated : Types.StudentProfile = { existing with gradeLevel = gradeLevel };
    profiles.add(caller, updated);
    updated;
  };
};
