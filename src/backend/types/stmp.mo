// STMP — Subject Template Registry Types
import Common "common";

module {
  // A master subject template for a given grade and subject.
  // masterLocked: when true, only Admin can modify; teachers read-only.
  public type SubjectTemplate = {
    templateId  : Text;
    subject     : Text;
    gradeLevel  : Common.GradeLevel;
    topicIds    : [Text];
    standardsRef : [Text];
    masterLocked : Bool;
    createdBy   : Text;
  };

  // Container keyed by composite "<gradeLevel>:<subject>" for O(log n) lookup.
  // Enforced max: 144 templates (Fibonacci F(12)).
  public type StmpStore = {
    templateCount : Nat;
  };
};
