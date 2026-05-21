import Common "common";

module {
  public type StudentProfile = {
    id : Common.UserId;
    name : Text;
    gradeLevel : Common.GradeLevel;
    createdAt : Common.Timestamp;
  };
};
