import List    "mo:core/List";
import Map     "mo:core/Map";
import Time    "mo:core/Time";
import TchrLib "../lib/tchr";
import Types   "../types/tchr";
import Array "mo:core/Array";

mixin () {
  // ── Stable state ─────────────────────────────────────────────────────────
  var tchrClasses  : TchrLib.ClassStore = List.empty<Types.TeacherClass>();
  var tchrCards    : TchrLib.CardStore  = Map.empty<Text, Types.StudentMasteryCard>();
  var tchrCounters : TchrLib.TchrCounters = { var recommendationsGenerated = 0 };

  // ── createClass ──────────────────────────────────────────────────────────
  public func createClass(
    teacherId  : Text,
    name       : Text,
    subject    : Text,
    gradeLevel : Nat,
    studentIds : [Text],
  ) : async Bool {
    let now = Time.now();
    let id  = "CLS-" # teacherId # "-" # tchrClasses.size().toText();
    let cls : Types.TeacherClass = {
      id; teacherId; name; subject; gradeLevel; studentIds;
      createdAt = now;
    };
    TchrLib.createClass(tchrClasses, cls);
  };

  // ── getClassesByTeacher ───────────────────────────────────────────────────
  public query func getClassesByTeacher(
    teacherId : Text,
  ) : async [Types.TeacherClass] {
    TchrLib.getClassesByTeacher(tchrClasses, teacherId);
  };

  // ── getStudentMasteryCard ─────────────────────────────────────────────────
  public query func getStudentMasteryCard(
    studentId : Text,
  ) : async ?Types.StudentMasteryCard {
    TchrLib.getStudentMasteryCard(tchrCards, studentId);
  };

  // ── updateStudentMastery (teacher updates a student's subject mastery) ────
  public func updateStudentMasteryScore(
    studentId : Text,
    subject   : Text,
    mastery   : Nat,
  ) : async () {
    TchrLib.updateStudentMastery(tchrCards, studentId, subject, mastery);
  };

  // ── generateClassHeatmap ─────────────────────────────────────────────────
  public query func generateClassHeatmap(
    classId : Text,
  ) : async ?Types.ClassHeatmap {
    TchrLib.generateClassHeatmap(tchrClasses, tchrCards, classId);
  };

  // ── generateTeacherRecommendations ───────────────────────────────────────
  public func generateTeacherRecommendations(
    classId : Text,
  ) : async [Types.TeacherRecommendation] {
    TchrLib.generateRecommendations(tchrClasses, tchrCards, tchrCounters, classId);
  };

  // ── getTchrStats ─────────────────────────────────────────────────────────
  public query func getTchrStats() : async Types.TchrStats {
    TchrLib.getTchrStats(tchrClasses, tchrCounters);
  };

  // ── getClassesByTeacher (Principal overload) ──────────────────────────────
  // Returns 3 seeded demo classes with PHI-weighted mastery scores
  public query func getClassesByTeacherId(teacherId : Principal) : async [Types.ClassRecord] {
    let tid = teacherId.toText();
    let subjects = ["Mathematics", "Science", "English"];
    let grades   = [4, 5, 6];
    let mastery  = [0.618, 0.382, 0.500]; // PHI_INV, PHI_INV_SQ, midpoint
    Array.tabulate<Types.ClassRecord>(3, func(i) {
      {
        classId      = "CLS-" # tid # "-" # i.toText();
        className    = subjects[i] # " — Grade " # grades[i].toText();
        subject      = subjects[i];
        grade        = grades[i];
        studentCount = if (i == 0) 34 else if (i == 1) 21 else 13; // Fibonacci
        avgMastery   = mastery[i];
      };
    });
  };

  // ── getClassDetail ───────────────────────────────────────────────────────
  public query func getClassDetail(classId : Text) : async ?Types.ClassDetail {
    // Deterministic PHI-seeded detail for any classId
    let phiBase : Float = 0.618;
    let students : [Types.StudentSummary] = Array.tabulate<Types.StudentSummary>(5, func(i) {
      {
        studentId    = "STU-" # classId # "-" # i.toText();
        name         = ["Alex", "Jordan", "Morgan", "Taylor", "Casey"][i];
        masteryScore = phiBase - (i.toFloat() * 0.055);
        lastActive   = 0;
        currentTopic = ["Fractions", "Algebra", "Geometry", "Statistics", "Calculus"][i];
      };
    });
    let activity : [Types.ActivityRecord] = Array.tabulate<Types.ActivityRecord>(5, func(i) {
      {
        timestamp   = 0;
        studentName = students[i].name;
        action      = ["completed quiz", "started lesson", "reviewed topic", "earned stamp", "asked question"][i];
        score       = phiBase + (i.toFloat() * 0.034);
      };
    });
    ?{
      classId;
      className = "Class " # classId;
      subject   = "Mathematics";
      grade     = 5;
      students;
      recentActivity = activity;
    };
  };
};
