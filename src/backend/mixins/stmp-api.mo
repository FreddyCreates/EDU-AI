// STMP — Subject Template Registry Public API Mixin
import Debug "mo:core/Debug";
import Map "mo:core/Map";
import Types "../types/stmp";
import Common "../types/common";
import StmpLib "../lib/stmp";

mixin (stmpStore : Map.Map<Text, Types.SubjectTemplate>) {
  // Return all subject templates for the requested gradeLevel.
  // Teachers receive read-only views; Admin can mutate via separate admin endpoint.
  public query func getSubjectTemplates(gradeLevel : Common.GradeLevel) : async [Types.SubjectTemplate] {
    StmpLib.getByGrade(stmpStore, gradeLevel)
  };
};
