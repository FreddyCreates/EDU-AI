// STMP — Subject Template Registry Domain Logic
import Debug "mo:core/Debug";
import Map "mo:core/Map";
import Types "../types/stmp";
import Common "../types/common";
import Runtime "mo:core/Runtime";

module {
  // Max templates enforced at Fibonacci F(12) = 144.
  public let MAX_TEMPLATES : Nat = 144;

  // Return all templates as a flat array.
  public func getAll(
    store : Map.Map<Text, Types.SubjectTemplate>,
  ) : [Types.SubjectTemplate] {
    var results : [Types.SubjectTemplate] = [];
    for ((_k, t) in store.entries()) {
      results := results.concat([t]);
    };
    results
  };

  // Seed master-locked templates for all 12 subjects x K-12 if store is empty.
  public func seedDefaults(
    store : Map.Map<Text, Types.SubjectTemplate>,
  ) : () {
    if (store.size() > 0) { return };
    let grades = ["K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    let subjects = [
      "ELA", "Math", "Science", "Social Studies", "Geography",
      "Art", "Music", "PE", "Computer Science", "Spanish", "Health", "Electives",
    ];
    for (grade in grades.values()) {
      for (subject in subjects.values()) {
        let key = compositeKey(grade, subject);
        let template : Types.SubjectTemplate = {
          templateId   = key;
          subject      = subject;
          gradeLevel   = grade;
          topicIds     = [];
          standardsRef = [];
          masterLocked = true;
          createdBy    = "SYSTEM";
        };
        store.add(key, template);
      };
    };
  };

  // Return all templates for a given gradeLevel.
  public func getByGrade(
    store : Map.Map<Text, Types.SubjectTemplate>,
    gradeLevel : Common.GradeLevel,
  ) : [Types.SubjectTemplate] {
    var results : [Types.SubjectTemplate] = [];
    for ((_k, t) in store.entries()) {
      if (t.gradeLevel == gradeLevel) {
        results := results.concat([t]);
      };
    };
    results
  };

  // Upsert a template; traps if over the F(12)=144 ceiling.
  public func upsert(
    store : Map.Map<Text, Types.SubjectTemplate>,
    template : Types.SubjectTemplate,
  ) : () {
    let key = compositeKey(template.gradeLevel, template.subject);
    // Only enforce ceiling for new entries (not updates)
    if (store.get(key) == null and store.size() >= MAX_TEMPLATES) {
      Runtime.trap("STMP: MAX_TEMPLATES (" # debug_show(MAX_TEMPLATES) # ") ceiling reached");
    };
    store.add(key, template);
  };

  // Composite key helper: "<gradeLevel>:<subject>"
  public func compositeKey(gradeLevel : Common.GradeLevel, subject : Text) : Text {
    gradeLevel # "_" # subject
  };
};
