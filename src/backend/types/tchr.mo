module {
  // ── TCHR: Teacher Intelligence Types ─────────────────────────────────────

  public type TeacherClass = {
    id         : Text;
    teacherId  : Text;
    name       : Text;      // e.g. "Ms. Johnson's 4th Grade Math"
    subject    : Text;
    gradeLevel : Nat;
    studentIds : [Text];
    createdAt  : Int;
  };

  public type StudentMasteryCard = {
    studentId        : Text;
    name             : Text;
    gradeLevel       : Nat;
    subjectMastery   : [(Text, Nat)];  // (subject, mastery 0-100 fibFloor'd)
    lastActive       : Int;
    currentStreak    : Nat;            // consecutive sessions, Fibonacci-floored
    predictedStruggle : [Text];        // subjects/topics where mastery < F(5)=5
    recommendation   : Text;
  };

  public type ClassHeatmap = {
    classId        : Text;
    subject        : Text;
    gradeLevel     : Nat;
    topicMastery   : [(Text, Nat)];   // (topic, class avg mastery 0-100 fibFloor'd)
    highPerformers : [Text];           // studentIds with mastery > 55 (F(10))
    needsSupport   : [Text];           // studentIds with mastery < 13 (F(7))
    avgClassMastery : Nat;             // Fibonacci-floored class average
    timestamp      : Int;
  };

  public type TeacherRecommendation = {
    classId          : Text;
    priority         : Nat;    // 1-3 (1=critical), Fibonacci-floored
    action           : Text;
    affectedStudents : [Text];
    suggestedEngine  : Text;
    novelApproach    : Text;   // MLTV compliant novel 4th suggestion
  };

  // Compact class-level metrics for principal and teacher dashboards
  public type TeacherClassMetrics = {
    classId          : Text;
    className        : Text;
    studentCount     : Nat;
    avgMastery       : Nat;   // Fibonacci-floored 0-100
    strugglingCount  : Nat;   // students with mastery < F(7)=13
    advancedCount    : Nat;   // students with mastery > F(10)=55
    currentTopic     : Text;
    lastActivity     : Int;   // nanoseconds (Time.now())
  };

  public type TchrStats = {
    totalClasses              : Nat;
    totalStudents             : Nat;
    recommendationsGenerated  : Nat;
  };
  public type ClassRecord = {
    classId      : Text;
    className    : Text;
    subject      : Text;
    grade        : Nat;
    studentCount : Nat;
    avgMastery   : Float;
  };

  public type StudentSummary = {
    studentId    : Text;
    name         : Text;
    masteryScore : Float;
    lastActive   : Int;
    currentTopic : Text;
  };

  public type ActivityRecord = {
    timestamp   : Int;
    studentName : Text;
    action      : Text;
    score       : Float;
  };

  public type ClassDetail = {
    classId        : Text;
    className      : Text;
    subject        : Text;
    grade          : Nat;
    students       : [StudentSummary];
    recentActivity : [ActivityRecord];
  };
};
