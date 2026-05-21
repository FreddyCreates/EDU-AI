// Knowledge — Cross-grade knowledge query/result types
import Common "common";
import CurriculumTypes "curriculum";

module {
  // Issued by a student portal or GVLT gate to query knowledge for a grade.
  public type KnowledgeQuery = {
    studentGrade     : Common.GradeLevel;
    subject          : Text;
    includeGradeRange : Bool;
  };

  // Result entry per grade-level band within the response.
  // lockedForStudent = true when gradeLevel > studentGrade (GATE enforced).
  public type KnowledgeResult = {
    subject          : Text;
    gradeLevel       : Common.GradeLevel;
    topics           : [CurriculumTypes.Topic];
    lockedForStudent : Bool;
  };
};
