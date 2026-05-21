// Knowledge — Grade-gated knowledge query logic
import Debug "mo:core/Debug";
import Map "mo:core/Map";
import KnowledgeTypes "../types/knowledge";
import CurriculumTypes "../types/curriculum";
import Int "mo:core/Int";
import Nat32 "mo:core/Nat32";
import Text "mo:core/Text";

module {
  // Resolve a KnowledgeQuery against the subject/topic maps.
  // lockedForStudent is set to true for any result whose gradeLevel > studentGrade.
  public func runQuery(
    subjects : Map.Map<Text, CurriculumTypes.Subject>,
    topics   : Map.Map<Text, CurriculumTypes.Topic>,
    q        : KnowledgeTypes.KnowledgeQuery,
  ) : [KnowledgeTypes.KnowledgeResult] {
    let grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    var results : [KnowledgeTypes.KnowledgeResult] = [];

    // Iterate grades from K to studentGrade (inclusive)
    for (grade in grades.values()) {
      if (q.includeGradeRange or grade == q.studentGrade) {
        var gradeTopics : [CurriculumTypes.Topic] = [];
        for ((_k, t) in topics.entries()) {
          if (t.gradeLevel == grade) {
            let sid = t.subjectId;
            let matchesSubject = sid.contains(#text(q.subject.toLower())) or
              (switch (subjects.get(sid)) {
                case (?s) { s.name == q.subject };
                case null { false };
              });
            if (matchesSubject) {
              gradeTopics := gradeTopics.concat([t]);
            };
          };
        };
        if (gradeTopics.size() > 0) {
          results := results.concat([{
            subject          = q.subject;
            gradeLevel       = grade;
            topics           = gradeTopics;
            lockedForStudent = false;
          }]);
        };
      };
      if (grade == q.studentGrade and not q.includeGradeRange) {
        // reached student grade in non-range mode — remaining grades are skipped above
      };
    };

    results
  };

  // Grade comparison: returns true when a (Text) grade is strictly greater than b.
  // "K" < "1" < "2" ... < "12" (GATE-enforced ordering).
  public func gradeGT(a : Text, b : Text) : Bool {
    func gradeToInt(g : Text) : Int {
      if (g == "K") { 0 } else {
        var n : Int = 0;
        for (c in g.chars()) {
          n := n * 10 + Int.fromNat(c.toNat32().toNat() - 48);
        };
        n
      }
    };
    gradeToInt(a) > gradeToInt(b)
  };
};
