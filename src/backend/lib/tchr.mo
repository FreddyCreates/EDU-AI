import List  "mo:core/List";
import Map   "mo:core/Map";
import Time  "mo:core/Time";
import Types "../types/tchr";

module {
  // ── PHI constants (integer, ×1000) ───────────────────────────────────────
  let _PHI_INV : Nat = 618;

  // ── Fibonacci sequence (first 16 values) ─────────────────────────────────
  let FIB_SEQUENCE : [Nat] = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987];

  // ── FLOR: largest Fibonacci number ≤ n ───────────────────────────────────
  public func fibFloor(n : Nat) : Nat {
    if (n == 0) return 1;
    var result : Nat = 1;
    for (f in FIB_SEQUENCE.values()) {
      if (f <= n) { result := f };
    };
    result;
  };

  // ── State types ──────────────────────────────────────────────────────────
  public type ClassStore  = List.List<Types.TeacherClass>;
  public type CardStore   = Map.Map<Text, Types.StudentMasteryCard>;

  // Tracks total recommendations generated
  public type TchrCounters = { var recommendationsGenerated : Nat };

  // ── createClass ──────────────────────────────────────────────────────────
  // Max 144 classes (F(12)).
  public func createClass(
    classes : ClassStore,
    cls     : Types.TeacherClass,
  ) : Bool {
    if (classes.size() >= 144) return false;
    if (classes.any(func(c) { c.id == cls.id })) return false;
    classes.add(cls);
    true;
  };

  // ── updateStudentMastery ─────────────────────────────────────────────────
  public func updateStudentMastery(
    cards     : CardStore,
    studentId : Text,
    subject   : Text,
    mastery   : Nat,
  ) : () {
    let floored = fibFloor(mastery);
    switch (cards.get(studentId)) {
      case (?card) {
        // Update or insert the subject entry
        let newMastery = card.subjectMastery.map(
          func((s, m)) { if (s == subject) (s, floored) else (s, m) }
        );
        let exists = card.subjectMastery.find(func((s, _)) { s == subject }) != null;
        let merged : [(Text, Nat)] = if (exists) newMastery
          else newMastery.concat([(subject, floored)]);

        // Rebuild predictedStruggle
        let struggling = merged.filter(func((_, m)) { m < 5 })
          .map(func((s, _)) { s });

        // Recommendation text
        let rec = if (floored >= 55)
          "Excellent mastery — introduce extension challenges in " # subject
        else if (floored >= 21)
          "Good progress — reinforce with practice problems in " # subject
        else if (floored >= 8)
          "Developing — schedule focused review sessions for " # subject
        else
          "Needs support — trigger GENEX repair cycle for " # subject;

        let newStreak = fibFloor(card.currentStreak + 1);
        let updated : Types.StudentMasteryCard = {
          card with
          subjectMastery    = merged;
          currentStreak     = newStreak;
          predictedStruggle = struggling;
          recommendation    = rec;
          lastActive        = Time.now();
        };
        cards.add(studentId, updated);
      };
      case null {
        // Create a new card
        let struggling : [Text] = if (floored < 5) [subject] else [];
        let rec = if (floored >= 55)
          "Excellent mastery — introduce extension challenges in " # subject
        else if (floored >= 21)
          "Good progress — reinforce with practice problems in " # subject
        else if (floored >= 8)
          "Developing — schedule focused review sessions for " # subject
        else
          "Needs support — trigger GENEX repair cycle for " # subject;

        let newCard : Types.StudentMasteryCard = {
          studentId;
          name             = "Student-" # studentId;
          gradeLevel       = 0;
          subjectMastery   = [(subject, floored)];
          lastActive       = Time.now();
          currentStreak    = 1;
          predictedStruggle = struggling;
          recommendation   = rec;
        };
        cards.add(studentId, newCard);
      };
    };
  };

  // ── getStudentMasteryCard ─────────────────────────────────────────────────
  public func getStudentMasteryCard(
    cards     : CardStore,
    studentId : Text,
  ) : ?Types.StudentMasteryCard {
    cards.get(studentId);
  };

  // ── generateClassHeatmap ──────────────────────────────────────────────────
  public func generateClassHeatmap(
    classes : ClassStore,
    cards   : CardStore,
    classId : Text,
  ) : ?Types.ClassHeatmap {
    switch (classes.find(func(c) { c.id == classId })) {
      case null null;
      case (?cls) {
        // Aggregate mastery for each student in class
        let allMastery = List.empty<(Text, Nat)>(); // (subject, mastery)
        let highBuf    = List.empty<Text>();
        let lowBuf     = List.empty<Text>();
        var totalMastery : Nat = 0;
        var count        : Nat = 0;

        for (sid in cls.studentIds.values()) {
          switch (cards.get(sid)) {
            case (?card) {
              // Sum all subject masteries for this student
              var studentTotal : Nat = 0;
              var studentSubjects : Nat = 0;
              for ((subj, m) in card.subjectMastery.values()) {
                allMastery.add((subj, m));
                studentTotal += m;
                studentSubjects += 1;
              };
              let avgStudent = if (studentSubjects > 0)
                fibFloor(studentTotal / studentSubjects) else 1;
              if (avgStudent > 55) { highBuf.add(sid) };
              if (avgStudent < 13) { lowBuf.add(sid) };
              totalMastery += avgStudent;
              count += 1;
            };
            case null {};
          };
        };

        // Aggregate by topic: group allMastery entries, average per topic
        let topicMap = Map.empty<Text, (Nat, Nat)>(); // topic -> (sum, count)
        for ((topic, m) in allMastery.values()) {
          switch (topicMap.get(topic)) {
            case (?(s, c)) { topicMap.add(topic, (s + m, c + 1)) };
            case null      { topicMap.add(topic, (m, 1)) };
          };
        };
        let topicMastery = topicMap.entries()
          .map(
            func((t, (s, c))) { (t, fibFloor(s / c)) }
          )
          .toArray();

        let avgClassMastery = if (count > 0) fibFloor(totalMastery / count) else 1;

        ?{
          classId;
          subject    = cls.subject;
          gradeLevel = cls.gradeLevel;
          topicMastery;
          highPerformers = highBuf.toArray();
          needsSupport   = lowBuf.toArray();
          avgClassMastery;
          timestamp      = Time.now();
        };
      };
    };
  };

  // ── generateRecommendations ────────────────────────────────────────────────
  public func generateRecommendations(
    classes   : ClassStore,
    cards     : CardStore,
    counters  : TchrCounters,
    classId   : Text,
  ) : [Types.TeacherRecommendation] {
    switch (classes.find(func(c) { c.id == classId })) {
      case null [];
      case (?cls) {
        // Students needing support (mastery < 13) and high performers (>55)
        let needsSupport  = List.empty<Text>();
        let highPerf      = List.empty<Text>();
        var lowestMastery : Nat = 100;
        var lowestSubject : Text = cls.subject;

        for (sid in cls.studentIds.values()) {
          switch (cards.get(sid)) {
            case (?card) {
              for ((subj, m) in card.subjectMastery.values()) {
                if (m < 13) { needsSupport.add(sid) };
                if (m > 55) { highPerf.add(sid) };
                if (m < lowestMastery) {
                  lowestMastery := m;
                  lowestSubject := subj;
                };
              };
            };
            case null {};
          };
        };

        let needsSupportArr = needsSupport.toArray();
        let highPerfArr     = highPerf.toArray();

        // 3 standard recommendations
        let r1 : Types.TeacherRecommendation = {
          classId;
          priority         = 1;
          action           = "Remediate " # lowestSubject # " — " # needsSupportArr.size().toText() # " students below threshold";
          affectedStudents = needsSupportArr;
          suggestedEngine  = "COGT";
          novelApproach    = "Cross-subject bridge: connect " # lowestSubject # " to geometry using Fibonacci spirals";
        };
        let r2 : Types.TeacherRecommendation = {
          classId;
          priority         = 2;
          action           = "Enrich high performers with advanced " # cls.subject # " extension material";
          affectedStudents = highPerfArr;
          suggestedEngine  = "PHIX";
          novelApproach    = "PHI-ratio challenge: design a " # cls.subject # " problem where the answer is a Fibonacci number";
        };
        let r3 : Types.TeacherRecommendation = {
          classId;
          priority         = 3;
          action           = "Run a whole-class collaborative review of " # cls.subject;
          affectedStudents = cls.studentIds;
          suggestedEngine  = "COHR";
          novelApproach    = "Peer-teaching pairing: high performers coach students needing support — MSRY entanglement active";
        };
        // Novel 4th recommendation (MLTV compliant — always a new angle)
        let r4 : Types.TeacherRecommendation = {
          classId;
          priority         = fibFloor(2);
          action           = "Novel cross-substrate insight: use AUTN autonomous seed to inject an unexpected " # cls.subject # " connection";
          affectedStudents = cls.studentIds;
          suggestedEngine  = "AUTN";
          novelApproach    = "AUTN fires on cycle F(8)=21 — schedule a discovery session where students predict what concept AUTN will surface next";
        };

        counters.recommendationsGenerated += 4;
        [r1, r2, r3, r4];
      };
    };
  };

  // ── getClassesByTeacher ───────────────────────────────────────────────────
  public func getClassesByTeacher(
    classes   : ClassStore,
    teacherId : Text,
  ) : [Types.TeacherClass] {
    classes.filter(func(c) { c.teacherId == teacherId }).toArray();
  };

  // ── getTchrStats ──────────────────────────────────────────────────────────
  public func getTchrStats(
    classes  : ClassStore,
    counters : TchrCounters,
  ) : Types.TchrStats {
    var totalStudents : Nat = 0;
    for (cls in classes.values()) {
      totalStudents += cls.studentIds.size();
    };
    {
      totalClasses             = classes.size();
      totalStudents;
      recommendationsGenerated = counters.recommendationsGenerated;
    };
  };
};
