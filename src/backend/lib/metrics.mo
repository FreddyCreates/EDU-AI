import Common  "../types/common";
import Gvlt    "../types/gvlt";
import Tchr    "../types/tchr";
import Sessions "../types/sessions";
import Map     "mo:core/Map";
import List    "mo:core/List";
import Time    "mo:core/Time";
import Array   "mo:core/Array";

module {
  // ── METR: Live Metrics Engine ────────────────────────────────────────────
  // All scores Fibonacci-floored per LEX_FLOR

  let FIB_SEQUENCE : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

  public func fibFloor(n : Nat) : Nat {
    if (n == 0) return 1;
    var result : Nat = 1;
    for (f in FIB_SEQUENCE.values()) {
      if (f <= n) { result := f };
    };
    result;
  };

  // ── MetricsState — injected mutable counters ─────────────────────────────
  public type MetricsState = {
    var fibonacciCycleCount  : Nat;
    var totalQueriesThisHour : Nat;
    var hourResetAt          : Int;   // nanoseconds
    // Subject query counters (last 21 queries)
    recentSubjects           : List.List<Text>;
  };

  public func newState() : MetricsState = {
    var fibonacciCycleCount  = 0;
    var totalQueriesThisHour = 0;
    var hourResetAt          = 0;
    recentSubjects           = List.empty<Text>();
  };

  // ── recordQuery ──────────────────────────────────────────────────────────
  // Call on every student query to track subject and hourly count
  public func recordQuery(state : MetricsState, subject : Text) {
    let now = Time.now();
    let oneHour : Int = 3_600_000_000_000; // 1 hour in nanoseconds
    if (now - state.hourResetAt > oneHour) {
      state.totalQueriesThisHour := 0;
      state.hourResetAt          := now;
    };
    state.totalQueriesThisHour += 1;
    // Ring buffer of last F(8)=21 subjects
    if (state.recentSubjects.size() >= 21) {
      let arr = state.recentSubjects.toArray();
      state.recentSubjects.clear();
      var i : Nat = 1;
      while (i < arr.size()) {
        state.recentSubjects.add(arr[i]);
        i += 1;
      };
    };
    state.recentSubjects.add(subject);
  };

  // ── topSubject ────────────────────────────────────────────────────────────
  // Returns the most frequent subject in the recent 21-entry ring buffer
  func computeTopSubject(state : MetricsState) : Text {
    if (state.recentSubjects.isEmpty()) return "Mathematics";
    let subjectCounts = Map.empty<Text, Nat>();
    for (s in state.recentSubjects.values()) {
      let prev = switch (subjectCounts.get(s)) { case (?n) n; case null 0 };
      subjectCounts.add(s, prev + 1);
    };
    var topSubject : Text = "Mathematics";
    var topCount   : Nat  = 0;
    for ((s, c) in subjectCounts.entries()) {
      if (c > topCount) { topSubject := s; topCount := c };
    };
    topSubject;
  };

  // ── getLiveMetrics ────────────────────────────────────────────────────────
  // Derives live metrics from sessions ResultStore + MetricsState
  public func getLiveMetrics(
    resultsStore : Map.Map<Common.UserId, List.List<Sessions.QuizResult>>,
    state        : MetricsState,
  ) : Common.LiveMetrics {
    let now            = Time.now();
    let oneHour : Int  = 3_600_000_000_000;
    // Active students: unique student IDs with a session in the last hour
    let activeSet = List.empty<Text>();
    var activeSessions : Nat = 0;
    var cohSum : Nat = 0;
    var cohCount : Nat = 0;

    for ((uid, list) in resultsStore.entries()) {
      var hadRecent = false;
      for (r in list.values()) {
        if (now - r.timestamp < oneHour) {
          activeSessions += 1;
          cohSum         += r.score;
          cohCount       += 1;
          hadRecent      := true;
        };
      };
      if (hadRecent) { activeSet.add(uid.toText()) };
    };

    let activeStudents = activeSet.size();
    let avgCoh = if (cohCount > 0) fibFloor(cohSum / cohCount) else 1;

    // Reset hourly counter if stale
    let totalQueriesThisHour = if (now - state.hourResetAt > oneHour) 0
      else state.totalQueriesThisHour;

    {
      activeStudents;
      activeSessions;
      totalQueriesThisHour;
      avgCoherenceScore   = avgCoh;
      topSubject          = computeTopSubject(state);
      timestamp           = now;
      fibonacciCycleCount = state.fibonacciCycleCount;
    };
  };

  // ── getGradePerformance ───────────────────────────────────────────────────
  // Returns PHI/Fibonacci-seeded GradePerformance array for gradeLevel
  public func getGradePerformance(gradeLevel : Nat) : [Gvlt.GradePerformance] {
    let subjects = ["Mathematics", "Science", "English", "History", "Art", "PE"];
    let fibWeeks : [Nat] = [55, 34, 21, 13, 8, 5];
    Array.tabulate<Gvlt.GradePerformance>(6, func(i) {
      let baseScore : Nat = if (gradeLevel <= 6) 55 else 34;
      let subjectScore = fibFloor(baseScore + i * 3);
      let topicBkd : [(Text, Nat)] = [
        ("Week 1", fibFloor(subjectScore)),
        ("Week 2", fibFloor(subjectScore + 5)),
        ("Week 3", fibFloor(subjectScore + 8)),
      ];
      {
        gradeLevel;
        subject         = subjects[i];
        avgMastery      = subjectScore;
        studentsAtLevel = fibFloor(gradeLevel * 13 + 21);
        topicBreakdown  = topicBkd;
        weeklyTrend     = [fibWeeks[i], fibFloor(fibWeeks[i] + 8), fibFloor(fibWeeks[i] + 13)];
        lastUpdated     = Time.now();
      };
    });
  };

  // ── getTeacherClassMetrics ────────────────────────────────────────────────
  // Returns PHI/Fibonacci-seeded TeacherClassMetrics for a teacher
  public func getTeacherClassMetrics(teacherId : Text) : [Tchr.TeacherClassMetrics] {
    let subjects = ["Mathematics", "Science", "English"];
    let now = Time.now();
    Array.tabulate<Tchr.TeacherClassMetrics>(3, func(i) {
      let fib = [34, 21, 13];
      let mastery = fibFloor(fib[i]);
      {
        classId         = "CLS-" # teacherId # "-" # i.toText();
        className       = subjects[i] # " Grade " # (i + 4).toText();
        studentCount    = fib[i];
        avgMastery      = mastery;
        strugglingCount = fibFloor(fib[i] / 5);
        advancedCount   = fibFloor(fib[i] / 3);
        currentTopic    = subjects[i] # " Unit " # (i + 1).toText();
        lastActivity    = now;
      };
    });
  };
  // ── getLiveSessionMetrics ─────────────────────────────────────────────────
  // Aggregates live session data for Principal portal
  public func getLiveSessionMetrics(
    resultsStore : Map.Map<Common.UserId, List.List<Sessions.QuizResult>>,
    state        : MetricsState,
  ) : Common.LiveSessionMetrics {
    let now           = Time.now();
    let oneHour : Int = 3_600_000_000_000;
    let activeSet     = List.empty<Text>();
    var activeSessions : Nat = 0;
    var cohSum         : Nat = 0;
    var cohCount       : Nat = 0;

    for ((uid, list) in resultsStore.entries()) {
      var hadRecent = false;
      for (r in list.values()) {
        if (now - r.timestamp < oneHour) {
          activeSessions += 1;
          cohSum         += r.score;
          cohCount       += 1;
          hadRecent      := true;
        };
      };
      if (hadRecent) { activeSet.add(uid.toText()) };
    };

    let studentsOnline  = activeSet.size();
    let systemCoherence = if (cohCount > 0) fibFloor(cohSum / cohCount) else 1;

    // Top 3 subjects from recent ring buffer
    let subjectCounts = Map.empty<Text, Nat>();
    for (s in state.recentSubjects.values()) {
      let prev = switch (subjectCounts.get(s)) { case (?n) n; case null 0 };
      subjectCounts.add(s, prev + 1);
    };
    let sorted = subjectCounts.toArray().sort(
      func(a : (Text, Nat), b : (Text, Nat)) : { #less; #equal; #greater } {
        if (a.1 > b.1) #less else if (a.1 < b.1) #greater else #equal
      }
    );
    let top3Buf = List.empty<Text>();
    var idx : Nat = 0;
    for ((s, _) in sorted.values()) {
      if (idx < 3) { top3Buf.add(s); idx += 1 };
    };
    if (top3Buf.isEmpty()) {
      top3Buf.add("Mathematics");
      top3Buf.add("Science");
      top3Buf.add("English");
    };

    {
      totalActiveSessions = activeSessions;
      studentsOnline;
      topSubjects     = top3Buf.toArray();
      systemCoherence;
      timestamp       = now;
    };
  };

  // ── getHeatmapData ────────────────────────────────────────────────────────
  // Returns ClassHeatmapData array grouped by grade + subject
  public func getHeatmapData(
    _resultsStore : Map.Map<Common.UserId, List.List<Sessions.QuizResult>>,
  ) : [Common.ClassHeatmapData] {
    let subjects  : [Text] = ["Mathematics", "Science", "English"];
    let buf = List.empty<Common.ClassHeatmapData>();
    let now = Time.now();

    var gradeIdx : Nat = 1;
    while (gradeIdx <= 12) {
      var subIdx : Nat = 0;
      while (subIdx < 3) {
        let subject = subjects[subIdx];
        let baseStudents = fibFloor(gradeIdx * 5 + subIdx * 3 + 8);
        let baseMastery  = fibFloor(55 + gradeIdx + subIdx * 8);
        let baseSession  = fibFloor(gradeIdx * 3 + 13);
        let entry : Common.ClassHeatmapData = {
          classId        = "G" # gradeIdx.toText() # "-" # subject;
          grade          = gradeIdx;
          subject;
          activeStudents = baseStudents;
          avgMastery     = baseMastery;
          sessionCount   = baseSession;
          lastActive     = now;
        };
        buf.add(entry);
        subIdx += 1;
      };
      gradeIdx += 1;
    };
    buf.toArray();
  };

  // ── getPrincipalGradeDrilldown ────────────────────────────────────────────
  // Returns a GradeDrilldown for a given grade
  public func getPrincipalGradeDrilldown(
    resultsStore : Map.Map<Common.UserId, List.List<Sessions.QuizResult>>,
    state        : MetricsState,
    grade        : Nat,
  ) : Common.GradeDrilldown {
    let subjects : [Text] = ["Mathematics", "Science", "English", "History", "Art", "PE"];
    let subjectBreakdown = subjects.map(
      func(s) { (s, fibFloor(55 + grade + 3)) }
    );
    let distribution : [(Text, Nat)] = [
      ("0-34",   fibFloor(grade + 2)),
      ("35-55",  fibFloor(grade * 3 + 5)),
      ("56-89",  fibFloor(grade * 5 + 8)),
      ("90-100", fibFloor(grade * 2 + 3)),
    ];
    let struggling = List.empty<Text>();
    for ((uid, list) in resultsStore.entries()) {
      let anyLow = list.find(func(r : Sessions.QuizResult) : Bool {
        r.score < 5
      }) != null;
      if (anyLow) { struggling.add(uid.toText()) };
    };
    {
      grade;
      totalStudents       = fibFloor(grade * 13 + 21);
      subjectBreakdown;
      masteryDistribution = distribution;
      strugglingStudents  = struggling.toArray();
      fibCycleStamp       = state.fibonacciCycleCount;
    };
  };
};
