import Types "../types/sessions";
import SessionsLib "../lib/sessions";
import PassportTypes "../types/passport";
import CurriculumTypes "../types/curriculum";
import PassportLib "../lib/passport";
import CurriculumLib "../lib/curriculum";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import SovereignMemory "../lib/sovereign-memory";
import List "mo:core/List";

mixin (
  results    : SessionsLib.ResultStore,
  allocState : SovereignMemory.AllocatorState,
  subjects   : CurriculumLib.SubjectStore,
  passports  : Map.Map<Principal, PassportTypes.SovereignPassport>,
) {
  public shared ({ caller }) func saveQuizResult(
    result : Types.QuizResult,
  ) : async () {
    // Register quiz result as COLD (hotness=5 → TTL=13 heartbeats, Fibonacci-aligned)
    ignore SovereignMemory.alloc(allocState, 80, 5, "quiz_result", false);
    SessionsLib.saveResult(results, caller, result);
  };

  public query ({ caller }) func getStudentQuizResults() : async [Types.QuizResult] {
    SessionsLib.getResults(results, caller);
  };

  // Public query — returns demo student data for /demo route (no auth required)
  public query func getDemoStudentData() : async {
    subjects : [CurriculumTypes.Subject];
    samplePassport : PassportTypes.SovereignPassport;
    sampleSessions : [Types.QuizResult];
  } {
    let demoSubjectsBufMut = List.empty<CurriculumTypes.Subject>();
    for ((_, s) in subjects.entries()) {
      if (s.gradeLevel == "5") {
        demoSubjectsBufMut.add(s);
      };
    };
    let demoSubjects = demoSubjectsBufMut.toArray();
    let demoPassport : PassportTypes.SovereignPassport = {
      holder = Principal.fromText("aaaaa-aa");
      passportId = "PP-DEMO001";
      studentName = "Demo Student";
      gradeLevel = "5";
      collegium = "COLLEGIUM-PUBLICA";
      kernelSeeds = [
        {
          id = "seed-demo-1";
          sessionSummary = "Completed Fractions Operations lesson";
          engineUsed = "Study Engine";
          trackName = "Mathematics";
          createdAt = 0;
          artifactName = ?"Fractions Mastery";
        },
        {
          id = "seed-demo-2";
          sessionSummary = "Studied Persuasive Writing techniques";
          engineUsed = "Study Engine";
          trackName = "English Language Arts";
          createdAt = 0;
          artifactName = ?"Persuasive Essay Draft";
        },
      ];
      totalSessions = 2;
      createdAt = 0;
      lastActiveAt = 0;
      achievements = ["First Session", "Quiz Champion"];
    };
    let demoSessions : [Types.QuizResult] = [
      {
        topicId = "5-math-2";
        agentId = "quill";
        score = 8;
        totalQuestions = 10;
        timestamp = 0;
        quizType = #multipleChoice;
      },
      {
        topicId = "5-ela-3";
        agentId = "sage";
        score = 9;
        totalQuestions = 10;
        timestamp = 0;
        quizType = #multipleChoice;
      },
    ];
    { subjects = demoSubjects; samplePassport = demoPassport; sampleSessions = demoSessions };
  };

  public query ({ caller }) func getSessionCount() : async Nat {
    SessionsLib.getSessionCountToday(results);
  };
};
