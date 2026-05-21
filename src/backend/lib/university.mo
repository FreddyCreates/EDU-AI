import Map "mo:core/Map";
import List "mo:core/List";
import Types "../types/university";
import PassportLib "./passport";
import Common "../types/common";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Array "mo:core/Array";

module {
  // ── Store types ────────────────────────────────────────────────────────────
  public type CourseStore     = Map.Map<Text, Types.Course>;
  public type EnrollmentStore = Map.Map<Text, Types.EnrolledCourse>; // key = principal+courseId

  // Fibonacci SSS thresholds for the 8 university courses
  // F(1)=1  F(2)=1  F(3)=2  F(4)=3  F(5)=5  F(6)=8  F(7)=13  F(8)=21
  let COURSES : [Types.Course] = [
    {
      id = "UNIV-001"; order = 1; category = "GENERAL";
      title = "Foundations of EDDI";
      description = "Understand the EDDI unified model, its 7 modes, and how sovereign intelligence operates. Build your first mode-bound interaction.";
      moduleCount = 5;
      requiredSssThreshold = 5;  // F(5) — base minimum
    },
    {
      id = "UNIV-002"; order = 2; category = "GENERAL";
      title = "Sovereign Memory Architecture";
      description = "Deep dive into KERNEL_SEEDs, HOT/WARM/COLD/FROZEN/VAULT zones, and PHI-compound scoring. Build memory systems that grow.";
      moduleCount = 5;
      requiredSssThreshold = 5;  // F(5)
    },
    {
      id = "UNIV-003"; order = 3; category = "GENERAL";
      title = "Agent Builder: Mode Binding";
      description = "Create agents bound to each EDDI mode. Learn how reasoning seeds and memory configs determine agent behavior.";
      moduleCount = 7;
      requiredSssThreshold = 8;  // F(6)
    },
    {
      id = "UNIV-004"; order = 4; category = "GENERAL";
      title = "Recognition & Nomination Pipeline";
      description = "Wire RCGN thresholds, NOMS auto-generation, and ACHV sealing. Build the pipeline that ensures no student is missed.";
      moduleCount = 5;
      requiredSssThreshold = 8;  // F(6)
    },
    {
      id = "UNIV-005"; order = 5; category = "GENERAL";
      title = "University Enrollment Engine";
      description = "Design Fibonacci-gated enrollment systems, course progression logic, and module completion flows.";
      moduleCount = 8;
      requiredSssThreshold = 13;  // F(7)
    },
    {
      id = "UNIV-006"; order = 6; category = "GENERAL";
      title = "PHI Geometry & Intelligence Formulas";
      description = "Master SSS, COH, ADX, IAS formulas. Build UI-driving intelligence layers that adapt in real time using golden ratio math.";
      moduleCount = 8;
      requiredSssThreshold = 13;  // F(7)
    },
    {
      id = "UNIV-007"; order = 7; category = "GENERAL";
      title = "Multi-Substrate Bridge Design";
      description = "Architect entanglement layers, bridge protocols (PONT, NRVE, MSRY), and sovereign inter-substrate communication.";
      moduleCount = 8;
      requiredSssThreshold = 21;  // F(8)
    },
    {
      id = "UNIV-008"; order = 8; category = "GENERAL";
      title = "Sovereign APIX & External Intelligence";
      description = "Expose EduAI engines as versioned sovereign API endpoints. Build the gateway that lets the protocol speak outward while staying closed inside.";
      moduleCount = 8;
      requiredSssThreshold = 21;  // F(8)
    },
  ];

  public func seedCourses(store : CourseStore) {
    for (c in COURSES.values()) {
      store.add(c.id, c);
    };
  };

  // ── Enrollment key: principal text + "-" + courseId ──────────────────────
  func enrollKey(holder : Common.UserId, courseId : Text) : Text {
    holder.toText() # "-" # courseId;
  };

  // ── Get all courses with lock/enroll status for a caller ─────────────────
  public func getCoursesForCaller(
    _courseStore   : CourseStore,
    enrollStore    : EnrollmentStore,
    passports      : PassportLib.PassportStore,
    seedStore      : PassportLib.SeedStore,
    caller         : Common.UserId,
  ) : [Types.CourseSummary] {
    // Compute caller's current SSS proxy = total seeds (simple, deterministic)
    let callerSss = switch (PassportLib.getPassportStats(passports, seedStore, caller)) {
      case (?s) s.totalSeeds;
      case null 0;
    };
    let buf = List.empty<Types.CourseSummary>();
    for (c in COURSES.values()) {
      let isUnlocked = callerSss >= c.requiredSssThreshold;
      let key = enrollKey(caller, c.id);
      let (isEnrolled, progress) = switch (enrollStore.get(key)) {
        case (?e) (true, e.progressPercent);
        case null (false, 0);
      };
      buf.add({ course = c; isUnlocked; isEnrolled; progressPercent = progress });
    };
    buf.toArray();
  };

  // ── Enroll: validates SSS threshold ──────────────────────────────────────
  public func enroll(
    courseStore : CourseStore,
    enrollStore : EnrollmentStore,
    passports   : PassportLib.PassportStore,
    seedStore   : PassportLib.SeedStore,
    caller      : Common.UserId,
    courseId    : Text,
    now         : Common.Timestamp,
  ) : { #ok; #err : Text } {
    let course = switch (courseStore.get(courseId)) {
      case null return #err("Course not found: " # courseId);
      case (?c) c;
    };
    let key = enrollKey(caller, courseId);
    // Already enrolled — idempotent
    switch (enrollStore.get(key)) {
      case (?_) return #ok;
      case null {};
    };
    // Check SSS threshold
    let callerSss = switch (PassportLib.getPassportStats(passports, seedStore, caller)) {
      case (?s) s.totalSeeds;
      case null 0;
    };
    if (callerSss < course.requiredSssThreshold) {
      return #err(
        "SSS threshold not met. Required: " # course.requiredSssThreshold.toText() #
        ", current: " # callerSss.toText() #
        ". Complete more study sessions to unlock this course."
      );
    };
    let enrollment : Types.EnrolledCourse = {
      courseId;
      enrolledAt = now;
      progressPercent = 0;
      agentsBuilt = [];
      completedModules = [];
    };
    enrollStore.add(key, enrollment);
    #ok;
  };

  // ── Get enrolled courses for a caller ────────────────────────────────────
  public func getEnrolledCourses(
    courseStore : CourseStore,
    enrollStore : EnrollmentStore,
    caller      : Common.UserId,
  ) : [Types.EnrolledCourse] {
    ignore courseStore;
    let buf = List.empty<Types.EnrolledCourse>();
    for (c in COURSES.values()) {
      let key = enrollKey(caller, c.id);
      switch (enrollStore.get(key)) {
        case (?e) buf.add(e);
        case null {};
      };
    };
    buf.toArray();
  };

  // ── Complete a module ─────────────────────────────────────────────────────
  public func completeModule(
    courseStore : CourseStore,
    enrollStore : EnrollmentStore,
    passports   : PassportLib.PassportStore,
    seedStore   : PassportLib.SeedStore,
    caller      : Common.UserId,
    courseId    : Text,
    moduleIndex : Nat,
    now         : Common.Timestamp,
  ) : { #ok : Text; #err : Text } {
    let course = switch (courseStore.get(courseId)) {
      case null return #err("Course not found");
      case (?c) c;
    };
    let key = enrollKey(caller, courseId);
    let enrollment = switch (enrollStore.get(key)) {
      case null return #err("Not enrolled in this course");
      case (?e) e;
    };
    if (moduleIndex >= course.moduleCount) {
      return #err("Module index out of range");
    };
    // Already completed — idempotent
    let alreadyDone = enrollment.completedModules.find(func(i : Nat) : Bool { i == moduleIndex });
    if (alreadyDone != null) return #ok("Module already completed");

    let newCompleted = Array.tabulate(enrollment.completedModules.size() + 1, func i = if (i < enrollment.completedModules.size()) enrollment.completedModules[i] else moduleIndex);
    let newProgress  = Nat.min(100, (newCompleted.size() * 100) / course.moduleCount);
    let isFullyDone  = newCompleted.size() >= course.moduleCount;

    // Award passport seed on full completion
    if (isFullyDone) {
      ignore PassportLib.autoSealFromSession(
        passports, seedStore, caller,
        "Completed EDDI University course: " # course.title,
        "EDDI-UNIVERSITY",
        course.title,
        "university",
        now,
      );
    };

    let updated : Types.EnrolledCourse = {
      enrollment with
      progressPercent  = newProgress;
      completedModules = newCompleted;
    };
    enrollStore.add(key, updated);
    if (isFullyDone)
      #ok("Course completed! Passport seed sealed.")
    else
      #ok("Module " # moduleIndex.toText() # " completed. Progress: " # newProgress.toText() # "%")
  };
};
