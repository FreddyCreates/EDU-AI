// catalog-vision types — UIL/CTE course catalog, competition templates,
// vision document v2, funding tracker, and impact calculator.
// LEX_SOVEREIGNUS: All values are deterministic and native.
// LEX_FIBONACCI_FLOOR: All gate scores are Fibonacci values.

module {

  // ─── CATALOG ─────────────────────────────────────────────────────────────

  public type CourseCategory = {
    #ACADEMICS;
    #CTE_CONSTRUCTION;
    #CTE_CULINARY;
    #CTE_COSMETOLOGY;
    #CTE_AUTOMOTIVE;
    #CTE_HEALTH;
    #CTE_WELDING;
    #CTE_HVAC;
    #CTE_ROBOTICS;
    #UIL_MATH;
    #UIL_SCIENCE;
    #UIL_ENGLISH;
    #UIL_SPEECH;
    #UIL_MUSIC;
    #SKILLS_USA;
    #DECA;
    #HOSA;
    #FFA;
  };

  public type CatalogModule = {
    moduleId     : Text;    // e.g. "CONST-001-M1"
    title        : Text;
    description  : Text;
    order        : Nat;     // 1-based
    fibMilestone : Nat;     // Fibonacci week milestone (e.g. 13, 8, 5, 3, 2, 1)
  };

  /// Full catalog entry — returned by getCatalog().
  public type CatalogCourse = {
    courseId     : Text;
    title        : Text;
    category     : CourseCategory;
    description  : Text;
    gradeMin     : Nat;
    gradeMax     : Nat;
    phiGateScore : Nat;   // Fibonacci: 5 | 13 | 34 | 89
    totalModules : Nat;
    uilProgram   : Text;  // UIL program name or ""
    cteProgram   : Text;  // CTE program name or ""
  };

  /// Detailed course entry — returned by getCourseDetail().
  public type CatalogCourseDetail = {
    courseId    : Text;
    title       : Text;
    modules     : [CatalogModule];
    uilProgram  : Text;
    cteProgram  : Text;
    gradeMin    : Nat;
    gradeMax    : Nat;
  };

  // ─── COMPETITION TEMPLATES ────────────────────────────────────────────────

  public type CompetitionTemplate = {
    name            : Text;
    category        : CourseCategory;
    organization    : Text;   // e.g. "Skills USA", "UIL", "DECA"
    description     : Text;
    domains         : [Text]; // knowledge domains for prep
    prepWeeksTypical: Nat;    // typical weeks of prep time
  };

  // ─── VISION DOCUMENT v2 ───────────────────────────────────────────────────

  public type VisionDocumentV2 = {
    version           : Text;
    generatedBy       : Text;
    missionStatement  : Text;
    founderStory      : Text;
    architectureSection: Text;
    impactCase        : Text;
    marketGap         : Text;
    fundingSection    : Text;
    diegoProtocol     : Text;
    timestamp         : Int;
  };

  // ─── FUNDING TRACKER ─────────────────────────────────────────────────────

  public type FundingStage = {
    #IDENTIFIED;
    #APPLIED;
    #PENDING;
    #AWARDED;
    #DECLINED;
  };

  public type FundingEntry = {
    entryId       : Text;
    programName   : Text;
    stage         : FundingStage;
    targetAmount  : Nat;
    contactEmail  : Text;
    notes         : Text;
    timestamp     : Int;
  };

  public type FundingEntryInput = {
    programName   : Text;
    stage         : Text;   // "IDENTIFIED" | "APPLIED" | "PENDING" | "AWARDED" | "DECLINED"
    targetAmount  : Nat;
    contactEmail  : Text;
    notes         : Text;
  };

  public type FundingEntryResult = {
    entryId : Text;
    success : Bool;
  };

  // ─── IMPACT CALCULATOR ───────────────────────────────────────────────────

  public type ImpactResult = {
    totalStudents               : Nat;
    estimatedRecognitionsPerYear: Nat;
    costPerStudent              : Float;
    roiForDistrict              : Text;
    projectedNominationsPerYear : Nat;
  };
};
