// Knowledge — Grade-gated knowledge query public API mixin
import Debug "mo:core/Debug";
import Map "mo:core/Map";
import CurriculumTypes "../types/curriculum";
import KnowledgeTypes "../types/knowledge";
import KnowledgeLib "../lib/knowledge";
import CurriculumLib "../lib/curriculum";

mixin (
  subjects : Map.Map<Text, CurriculumTypes.Subject>,
  topics   : Map.Map<Text, CurriculumTypes.Topic>,
) {
  // Return grade-appropriate knowledge for a student.
  // Results with gradeLevel > studentGrade have lockedForStudent = true.
  public query func getKnowledgeByGrade(q : KnowledgeTypes.KnowledgeQuery) : async [KnowledgeTypes.KnowledgeResult] {
    KnowledgeLib.runQuery(subjects, topics, q)
  };

  // Seed the curriculum maps with default subjects and topics when empty.
  // Idempotent — no-op if subjects map already has entries.
  public func seedCurriculumIfEmpty() : async Text {
    if (subjects.size() == 0) {
      CurriculumLib.seedCurriculum(subjects, topics);
    };
    "Curriculum defaults seeded (idempotent)"
  };
};
