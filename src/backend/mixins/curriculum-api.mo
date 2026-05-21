import Types "../types/curriculum";
import CurriculumLib "../lib/curriculum";

mixin (
  subjects : CurriculumLib.SubjectStore,
  topics : CurriculumLib.TopicStore,
) {
  // getAllSubjects — returns one Subject per unique subject type (12 subjects).
  // Use this for logged-out dashboards and landing pages.
  public query func getAllSubjects() : async [Types.Subject] {
    CurriculumLib.getAllSubjects(subjects);
  };

  // getSubjectsByGrade — returns subjects for a specific grade.
  // When gradeLevel is empty string, falls back to getAllSubjects.
  public query func getSubjectsByGrade(gradeLevel : Text) : async [Types.Subject] {
    CurriculumLib.getSubjectsByGrade(subjects, gradeLevel);
  };

  public query func getTopicsBySubject(subjectId : Text) : async [Types.Topic] {
    CurriculumLib.getTopicsBySubject(topics, subjectId);
  };
};
