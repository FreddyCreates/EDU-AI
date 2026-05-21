// catalog-vision lib — UIL/CTE course catalog, competition templates,
// vision document v2, funding tracker, impact calculator.
// LEX_SOVEREIGNUS: All intelligence sovereign. No external data.
// LEX_FIBONACCI_FLOOR: Gate scores are Fibonacci values (5, 13, 34, 89).
import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/catalog-vision";
import VisionLib "../lib/vision";
import RcgnLib "../lib/rcgn";
import NomsLib "../lib/noms";
import AchvLib "../lib/achv";

module {

  // ─── Store types ─────────────────────────────────────────────────────────
  public type FundingStore = Map.Map<Text, Types.FundingEntry>;

  public func emptyFundingStore() : FundingStore { Map.empty() };

  // ─── CATALOG DATA ─────────────────────────────────────────────────────────
  // 25 courses covering all 18 categories. PHI gate scores: F(5)=5, F(7)=13, F(9)=34, F(11)=89.

  let CATALOG : [Types.CatalogCourse] = [
    // ── ACADEMICS ─────────────────────────────────────────────────────────
    { courseId="ACAD-001"; title="Algebra I Foundations"; category=#ACADEMICS; description="Core algebraic reasoning: variables, equations, functions, and modeling. Aligned to UIL Number Sense and Mathematics events."; gradeMin=8; gradeMax=10; phiGateScore=5; totalModules=5; uilProgram="UIL Mathematics"; cteProgram="" },
    { courseId="ACAD-002"; title="Pre-Calculus & Trigonometry"; category=#ACADEMICS; description="Polynomials, rational functions, trigonometric identities, and limits. Gateway to UIL Calculator Applications."; gradeMin=10; gradeMax=12; phiGateScore=13; totalModules=5; uilProgram="UIL Calculator Applications"; cteProgram="" },

    // ── UIL MATH ──────────────────────────────────────────────────────────
    { courseId="UIL-MATH-001"; title="UIL Number Sense"; category=#UIL_MATH; description="Speed arithmetic, estimation, and mental math strategies for the 80-problem UIL Number Sense exam."; gradeMin=6; gradeMax=12; phiGateScore=5; totalModules=4; uilProgram="UIL Number Sense"; cteProgram="" },
    { courseId="UIL-MATH-002"; title="UIL Mathematics Competition Prep"; category=#UIL_MATH; description="Proof-based problem solving, combinatorics, and competition-style mathematics for UIL Math events."; gradeMin=8; gradeMax=12; phiGateScore=13; totalModules=5; uilProgram="UIL Mathematics"; cteProgram="" },

    // ── UIL SCIENCE ───────────────────────────────────────────────────────
    { courseId="UIL-SCI-001"; title="UIL Science Competition Prep"; category=#UIL_SCIENCE; description="Biology, chemistry, and physics problem sets aligned to UIL Science event question banks."; gradeMin=8; gradeMax=12; phiGateScore=13; totalModules=5; uilProgram="UIL Science"; cteProgram="" },

    // ── UIL ENGLISH ───────────────────────────────────────────────────────
    { courseId="UIL-ENG-001"; title="UIL Ready Writing"; category=#UIL_ENGLISH; description="Expository and persuasive composition under timed conditions. Voice, structure, and argumentation."; gradeMin=6; gradeMax=12; phiGateScore=5; totalModules=4; uilProgram="UIL Ready Writing"; cteProgram="" },
    { courseId="UIL-ENG-002"; title="UIL Literary Criticism"; category=#UIL_ENGLISH; description="Critical reading and analysis of poetry, prose, and drama. Close reading strategies for UIL Literary Criticism."; gradeMin=9; gradeMax=12; phiGateScore=13; totalModules=4; uilProgram="UIL Literary Criticism"; cteProgram="" },

    // ── UIL SPEECH ────────────────────────────────────────────────────────
    { courseId="UIL-SPK-001"; title="UIL Informative Speaking"; category=#UIL_SPEECH; description="Research, structure, and delivery of an informative speech. Feedback cycles using EDDI coaching."; gradeMin=6; gradeMax=12; phiGateScore=5; totalModules=4; uilProgram="UIL Informative Speaking"; cteProgram="" },
    { courseId="UIL-SPK-002"; title="UIL Persuasive Speaking"; category=#UIL_SPEECH; description="Argumentation, rhetorical strategy, and delivery for UIL Persuasive Speaking competition."; gradeMin=8; gradeMax=12; phiGateScore=13; totalModules=4; uilProgram="UIL Persuasive Speaking"; cteProgram="" },

    // ── UIL MUSIC ─────────────────────────────────────────────────────────
    { courseId="UIL-MUS-001"; title="UIL Sight-Reading Prep"; category=#UIL_MUSIC; description="Rhythmic and melodic sight-reading for UIL Concert and Sightreading evaluation. Fibonacci-spaced practice cycles."; gradeMin=7; gradeMax=12; phiGateScore=5; totalModules=4; uilProgram="UIL Concert & Sight-Reading"; cteProgram="" },
    { courseId="UIL-MUS-002"; title="UIL Solo & Ensemble"; category=#UIL_MUSIC; description="Performance preparation, stage presence, and adjudicator rubric mastery for UIL Solo & Ensemble."; gradeMin=7; gradeMax=12; phiGateScore=13; totalModules=4; uilProgram="UIL Solo & Ensemble"; cteProgram="" },

    // ── CTE CONSTRUCTION ─────────────────────────────────────────────────
    { courseId="CTE-CONST-001"; title="Skills USA Construction Technology"; category=#CTE_CONSTRUCTION; description="Blueprint reading, structural framing, OSHA safety, and project estimating for Skills USA Construction competition."; gradeMin=9; gradeMax=12; phiGateScore=5; totalModules=6; uilProgram=""; cteProgram="Skills USA Construction Technology" },

    // ── CTE WELDING ───────────────────────────────────────────────────────
    { courseId="CTE-WELD-001"; title="Skills USA Welding"; category=#CTE_WELDING; description="SMAW, GMAW, and FCAW welding techniques, joint design, and AWS quality standards for Skills USA Welding."; gradeMin=9; gradeMax=12; phiGateScore=5; totalModules=6; uilProgram=""; cteProgram="Skills USA Welding" },

    // ── CTE CULINARY ──────────────────────────────────────────────────────
    { courseId="CTE-CUL-001"; title="ProStart Culinary Arts"; category=#CTE_CULINARY; description="Food safety, knife skills, and menu development for NRAEF ProStart and Skills USA Culinary Arts competition."; gradeMin=9; gradeMax=12; phiGateScore=5; totalModules=5; uilProgram=""; cteProgram="ProStart / Skills USA Culinary" },

    // ── CTE COSMETOLOGY ───────────────────────────────────────────────────
    { courseId="CTE-COSM-001"; title="Skills USA Cosmetology"; category=#CTE_COSMETOLOGY; description="Color theory, chemical services, sanitation standards, and client consultation for Skills USA Cosmetology."; gradeMin=10; gradeMax=12; phiGateScore=5; totalModules=4; uilProgram=""; cteProgram="Skills USA Cosmetology" },

    // ── CTE AUTOMOTIVE ────────────────────────────────────────────────────
    { courseId="CTE-AUTO-001"; title="Skills USA Automotive Service"; category=#CTE_AUTOMOTIVE; description="Engine systems, diagnostics, and ASE-aligned repair procedures for Skills USA Automotive Service Technology."; gradeMin=9; gradeMax=12; phiGateScore=5; totalModules=5; uilProgram=""; cteProgram="Skills USA Automotive Service" },

    // ── CTE HEALTH ────────────────────────────────────────────────────────
    { courseId="CTE-HLTH-001"; title="HOSA Health Science"; category=#CTE_HEALTH; description="Medical terminology, anatomy essentials, CPR/First Aid, and health career knowledge for HOSA competitions."; gradeMin=9; gradeMax=12; phiGateScore=5; totalModules=5; uilProgram=""; cteProgram="HOSA Future Health Professionals" },

    // ── CTE HVAC ──────────────────────────────────────────────────────────
    { courseId="CTE-HVAC-001"; title="Skills USA HVAC Technology"; category=#CTE_HVAC; description="Refrigeration cycles, EPA 608 certification prep, and system diagnosis for Skills USA HVAC Technology."; gradeMin=10; gradeMax=12; phiGateScore=13; totalModules=5; uilProgram=""; cteProgram="Skills USA HVAC" },

    // ── CTE ROBOTICS ──────────────────────────────────────────────────────
    { courseId="CTE-ROBO-001"; title="Skills USA Robotics & Automation"; category=#CTE_ROBOTICS; description="Mechatronics, PLC programming, sensor integration, and competition strategy for Skills USA Robotics."; gradeMin=9; gradeMax=12; phiGateScore=13; totalModules=6; uilProgram=""; cteProgram="Skills USA Robotics & Automation" },

    // ── SKILLS USA ────────────────────────────────────────────────────────
    { courseId="SKUSA-001"; title="Skills USA Professional Development"; category=#SKILLS_USA; description="Leadership, career readiness, workplace ethics, and professional communication for Skills USA Professional Development event."; gradeMin=9; gradeMax=12; phiGateScore=5; totalModules=4; uilProgram=""; cteProgram="Skills USA" },

    // ── DECA ─────────────────────────────────────────────────────────────
    { courseId="DECA-001"; title="DECA Business Management & Admin"; category=#DECA; description="Marketing principles, financial literacy, and case study analysis for DECA Business Management and Administration."; gradeMin=9; gradeMax=12; phiGateScore=5; totalModules=5; uilProgram=""; cteProgram="DECA" },
    { courseId="DECA-002"; title="DECA Entrepreneurship"; category=#DECA; description="Business plan development, pitch strategy, and market analysis for DECA Entrepreneurship events."; gradeMin=10; gradeMax=12; phiGateScore=13; totalModules=5; uilProgram=""; cteProgram="DECA" },

    // ── HOSA ─────────────────────────────────────────────────────────────
    { courseId="HOSA-001"; title="HOSA Medical Spelling & Terminology"; category=#HOSA; description="Root words, prefixes, suffixes, and precise medical terminology for HOSA Medical Spelling event."; gradeMin=9; gradeMax=12; phiGateScore=5; totalModules=4; uilProgram=""; cteProgram="HOSA" },

    // ── FFA ──────────────────────────────────────────────────────────────
    { courseId="FFA-001"; title="FFA Agricultural Science Prep"; category=#FFA; description="Soil science, plant pathology, livestock management, and agribusiness for FFA Career Development Events."; gradeMin=8; gradeMax=12; phiGateScore=5; totalModules=5; uilProgram=""; cteProgram="FFA" },
  ];

  // ─── MODULE DATA ─────────────────────────────────────────────────────────
  // Modules for each course indexed by courseId.
  // Each course has 3-6 modules with title, description, and Fibonacci week milestone.

  func buildModules(courseId : Text) : [Types.CatalogModule] {
    if (courseId == "CTE-CONST-001") {
      [
        { moduleId=courseId#"-M1"; title="Safety & OSHA 10"; description="OSHA 10-hour safety certification and site hazard identification."; order=1; fibMilestone=13 },
        { moduleId=courseId#"-M2"; title="Blueprint Reading"; description="Orthographic projection, tolerances, material callouts, and scale reading."; order=2; fibMilestone=8 },
        { moduleId=courseId#"-M3"; title="Structural Framing"; description="Wood framing members, layout, and assembly sequences."; order=3; fibMilestone=5 },
        { moduleId=courseId#"-M4"; title="Concrete & Masonry"; description="Mix ratios, formwork, and masonry joint techniques."; order=4; fibMilestone=3 },
        { moduleId=courseId#"-M5"; title="Construction Math"; description="Linear measurement, area, volume, and estimate calculations."; order=5; fibMilestone=2 },
        { moduleId=courseId#"-M6"; title="Competition Simulation"; description="Full timed build under competition conditions with quality checklist."; order=6; fibMilestone=1 },
      ]
    } else if (courseId == "CTE-WELD-001") {
      [
        { moduleId=courseId#"-M1"; title="Metal Properties & Safety"; description="Material grades, PPE requirements, and OSHA welding safety."; order=1; fibMilestone=13 },
        { moduleId=courseId#"-M2"; title="Joint Design & Fit-Up"; description="Butt, T, lap, and corner joints with proper tack welding."; order=2; fibMilestone=8 },
        { moduleId=courseId#"-M3"; title="SMAW Technique Drills"; description="Shielded Metal Arc Welding across flat, horizontal, and vertical positions."; order=3; fibMilestone=5 },
        { moduleId=courseId#"-M4"; title="GMAW Technique Drills"; description="Gas Metal Arc Welding bead consistency and penetration control."; order=4; fibMilestone=3 },
        { moduleId=courseId#"-M5"; title="Weld Quality Inspection"; description="Visual inspection criteria and AWS acceptance standards."; order=5; fibMilestone=2 },
        { moduleId=courseId#"-M6"; title="Competition Simulation"; description="Full timed weld with judge-style quality evaluation."; order=6; fibMilestone=1 },
      ]
    } else if (courseId == "UIL-MATH-001") {
      [
        { moduleId=courseId#"-M1"; title="Integer & Fraction Shortcuts"; description="Mental math patterns for integers, fractions, and mixed numbers."; order=1; fibMilestone=8 },
        { moduleId=courseId#"-M2"; title="Percent & Ratio Drills"; description="Speed computation for percent change, ratios, and proportions."; order=2; fibMilestone=5 },
        { moduleId=courseId#"-M3"; title="Estimation Strategies"; description="Bounding and rounding strategies for 80-problem format."; order=3; fibMilestone=3 },
        { moduleId=courseId#"-M4"; title="Timed Practice Sets"; description="Full 80-question timed simulations with immediate feedback."; order=4; fibMilestone=1 },
      ]
    } else if (courseId == "DECA-001" or courseId == "DECA-002") {
      [
        { moduleId=courseId#"-M1"; title="Core Business Concepts"; description="Marketing mix, financial statements, and business law fundamentals."; order=1; fibMilestone=13 },
        { moduleId=courseId#"-M2"; title="Case Study Analysis"; description="Structured problem-solving framework for DECA roleplay scenarios."; order=2; fibMilestone=8 },
        { moduleId=courseId#"-M3"; title="Presentation & Communication"; description="Professional presentation skills, persuasion, and Q&A preparation."; order=3; fibMilestone=5 },
        { moduleId=courseId#"-M4"; title="Written Event Prep"; description="Report structure, executive summary, and judge expectations."; order=4; fibMilestone=3 },
        { moduleId=courseId#"-M5"; title="Competition Simulation"; description="Full roleplay scenario under timed competition conditions."; order=5; fibMilestone=1 },
      ]
    } else if (courseId == "FFA-001") {
      [
        { moduleId=courseId#"-M1"; title="Soil Science Fundamentals"; description="Soil horizons, texture, pH, and nutrient management."; order=1; fibMilestone=13 },
        { moduleId=courseId#"-M2"; title="Plant Science & Pathology"; description="Crop identification, disease recognition, and pest management."; order=2; fibMilestone=8 },
        { moduleId=courseId#"-M3"; title="Animal Science"; description="Livestock breeds, nutrition, health management, and evaluation."; order=3; fibMilestone=5 },
        { moduleId=courseId#"-M4"; title="Agribusiness Principles"; description="Farm records, marketing, and agricultural economics."; order=4; fibMilestone=3 },
        { moduleId=courseId#"-M5"; title="CDE Practice Problems"; description="Career Development Event practice sets across all FFA categories."; order=5; fibMilestone=1 },
      ]
    } else {
      // Generic 4-module structure for remaining courses
      [
        { moduleId=courseId#"-M1"; title="Foundations & Vocabulary"; description="Core concepts, terminology, and domain-specific vocabulary for this competition area."; order=1; fibMilestone=8 },
        { moduleId=courseId#"-M2"; title="Concept Mastery"; description="Deep study of primary domains covered in competition. Practice problems and worked examples."; order=2; fibMilestone=5 },
        { moduleId=courseId#"-M3"; title="Applied Practice"; description="Applied problem sets and hands-on practice aligned to competition format."; order=3; fibMilestone=3 },
        { moduleId=courseId#"-M4"; title="Competition Simulation"; description="Full timed simulation under competition conditions with EDDI feedback."; order=4; fibMilestone=1 },
      ]
    }
  };

  // ─── PUBLIC CATALOG FUNCTIONS ─────────────────────────────────────────────

  /// Return all 25 catalog courses.
  public func getCatalog() : [Types.CatalogCourse] { CATALOG };

  /// Return detail for a single course including its modules.
  public func getCourseDetail(courseId : Text) : ?Types.CatalogCourseDetail {
    let match = Array.find(CATALOG, func(c : Types.CatalogCourse) : Bool {
      c.courseId == courseId
    });
    switch (match) {
      case null null;
      case (?c) {
        ?{
          courseId   = c.courseId;
          title      = c.title;
          modules    = buildModules(c.courseId);
          uilProgram = c.uilProgram;
          cteProgram = c.cteProgram;
          gradeMin   = c.gradeMin;
          gradeMax   = c.gradeMax;
        };
      };
    };
  };

  // ─── COMPETITION TEMPLATES ────────────────────────────────────────────────

  let TEMPLATES : [Types.CompetitionTemplate] = [
    {
      name="Skills USA Construction Technology"; category=#CTE_CONSTRUCTION;
      organization="Skills USA";
      description="Students demonstrate residential construction skills: blueprint reading, framing, concrete, and safety.";
      domains=["Blueprint Reading", "Safety & OSHA", "Structural Framing", "Concrete & Masonry", "Construction Math", "Project Planning"];
      prepWeeksTypical=13;
    },
    {
      name="Skills USA Welding"; category=#CTE_WELDING;
      organization="Skills USA";
      description="Welding technique proficiency across SMAW and GMAW processes with AWS quality standards evaluation.";
      domains=["Metal Properties", "Joint Design", "SMAW Technique", "GMAW Technique", "Weld Quality Inspection", "Safety"];
      prepWeeksTypical=13;
    },
    {
      name="DECA Business Management"; category=#DECA;
      organization="DECA Inc.";
      description="Marketing, finance, business law, and case study roleplay across Business Management and Administration cluster.";
      domains=["Marketing Mix", "Financial Statements", "Business Law", "Case Study Analysis", "Presentation Skills", "Written Report"];
      prepWeeksTypical=8;
    },
    {
      name="HOSA Health Sciences"; category=#HOSA;
      organization="HOSA — Future Health Professionals";
      description="Medical knowledge, clinical skills, and healthcare career awareness across HOSA competitive events.";
      domains=["Medical Terminology", "Anatomy & Physiology", "CPR/First Aid", "Health Career Knowledge", "Clinical Skills", "Health Policy"];
      prepWeeksTypical=8;
    },
    {
      name="FFA Agricultural Science"; category=#FFA;
      organization="National FFA Organization";
      description="Comprehensive agricultural science preparation for FFA Career Development Events across all CDE categories.";
      domains=["Soil Science", "Plant Science", "Animal Science", "Agricultural Mechanics", "Agribusiness", "Environmental Science"];
      prepWeeksTypical=13;
    },
    {
      name="UIL Mathematics"; category=#UIL_MATH;
      organization="University Interscholastic League";
      description="Proof-based and competition-style mathematics for the UIL Mathematics individual and team events.";
      domains=["Algebra", "Geometry", "Trigonometry", "Pre-Calculus", "Statistics", "Number Theory", "Combinatorics"];
      prepWeeksTypical=21;
    },
    {
      name="UIL Science"; category=#UIL_SCIENCE;
      organization="University Interscholastic League";
      description="Biology, chemistry, and physics problem sets for the UIL Science individual and team competition.";
      domains=["Biology", "Chemistry", "Physics", "Lab Skills", "Data Analysis", "Scientific Method"];
      prepWeeksTypical=13;
    },
    {
      name="UIL Ready Writing"; category=#UIL_ENGLISH;
      organization="University Interscholastic League";
      description="Expository and persuasive essay composition under timed conditions for UIL Ready Writing.";
      domains=["Expository Writing", "Persuasive Writing", "Thesis Development", "Evidence Integration", "Voice & Style", "Timed Composition"];
      prepWeeksTypical=8;
    },
    {
      name="UIL Computer Science"; category=#UIL_SCIENCE;
      organization="University Interscholastic League";
      description="Algorithmic problem solving, data structures, and programming for UIL Computer Science team and individual events.";
      domains=["Algorithms", "Data Structures", "Sorting & Searching", "Recursion", "Programming Contests", "Computer Theory"];
      prepWeeksTypical=13;
    },
  ];

  public func getCompetitionTemplates() : [Types.CompetitionTemplate] { TEMPLATES };

  // ─── VISION DOCUMENT v2 ───────────────────────────────────────────────────

  public func getVisionDocumentV2(
    rcgnStore : RcgnLib.RcgnStore,
    nomStore  : NomsLib.NomStore,
    achvStore : AchvLib.AchvStore,
  ) : Types.VisionDocumentV2 {
    let stats = VisionLib.getVisionStats(rcgnStore, nomStore, achvStore);
    let flagsTxt = stats.totalStudentsFlagged.toText();
    let nomsTxt  = stats.nominationsSent.toText();
    let achvsTxt = stats.achievementsSealed.toText();

    let missionStatement =
      "EduAI is a fully sovereign, non-commercial AI education platform for every K-12 student in the United States. " #
      "Its mission: make the recognition infrastructure that elite schools take for granted available as a permanent right for every student in every forgotten school, at zero marginal cost, forever.";

    let founderStory =
      "Alfredo Medina Hernandez grew up in Ferris, Texas — a small public school district with no budget for recognition programs. " #
      "Before Ferris, he attended J.P. Starks Math, Science and Technology Vanguard School in Dallas ISD, where he was already moving faster than the system could accommodate. " #
      "At Ferris High School, he earned a 100 in geometry. One teacher noticed. That teacher submitted his name — without telling him — to the National Society of High School Scholars. " #
      "He was selected. Twice. Flown to Orlando, Florida. Housed in a Hilton convention hotel with thousands of students from across the country. A professional national yearbook. All paid. " #
      "He did not know it was exceptional. His school had no mechanism to tell him how exceptional it was. " #
      "He won full scholarships to UTA and to King's College New York. He was offered a $60,000 scholarship to Baylor. He turned them down — family obligations, economic reality, the decisions that intelligence alone cannot solve. " #
      "EduAI exists because every kid from Ferris, from every underfunded district, deserves a system that sees them first — not by accident, not because one teacher remembered to submit a form, but by design. " #
      "The system should have seen Alfredo coming years earlier. EduAI is that system.";

    let architectureSection =
      "Technical Architecture:\n" #
      "Multi-substrate sovereign execution: ICP/Motoko (state, execution, identity), Julia (PHI/Fibonacci math engine), EduAI Native Runtimes (protocol enforcement, memory zones, autonomous heartbeat).\n" #
      "All intelligence is native — no external APIs, no commercial LLMs, no cloud dependencies.\n" #
      "EDDI (EduAI Deep Deterministic Intelligence): One unified self-thinking model encapsulating all 7 agent modes. EXPAND, CRITIQUE, SYNTHESIZE, MEDI, LOGOS, MORPHOS, OMNIS.\n" #
      "RCGN/NOMS/ACHV pipeline: Autonomous recognition engine fires every F(6)=8 heartbeat cycles. No human trigger required.\n" #
      "Fibonacci memory zones: HOT (5 sessions), WARM (13), COLD (55), FROZEN (144), VAULT (permanent). All transitions governed by PHI math.\n" #
      "Internet Computer deployment: Canister-grade security. Orthogonal persistence. Internet Identity auth. Zero-knowledge student data sovereignty.\n" #
      "57+ engine mixins. 4-letter registry IDs. All engines sealed under ALPH (Alpha Registry). All laws sealed under LEX_SOVEREIGNUS.";

    let impactCase =
      "The Gap EduAI Closes:\n" #
      "Platform currently tracking " # flagsTxt # " recognition flags, " # nomsTxt # " nominations sent, " # achvsTxt # " achievements sealed.\n" #
      "Every student at every funding level runs on the same recognition pipeline. " #
      "RCGN does not ask whether the school has a budget — it scans every passport autonomously.\n" #
      "Skills USA, DECA, HOSA, FFA, UIL — these competitions require students to achieve at a high level with no prep infrastructure in most Title I schools. " #
      "EduAI's Fibonacci milestone engine builds the preparation path backward from the competition date. " #
      "The Diego Protocol makes this universal: every competition, every domain, every student.";

    let marketGap =
      "Market Gap Analysis:\n" #
      "Every major EdTech platform rents its intelligence. Khan Academy: external content delivery. Google Classroom: hosted infrastructure with Google as data owner. Schoology: SaaS LMS with per-seat pricing. Canvas: $50-150 per student per year.\n" #
      "None of them own their intelligence. None of them have a Fibonacci-spaced recognition engine. None of them have a sovereign passport that persists from kindergarten to graduation without a vendor lock-in risk.\n" #
      "EduAI is the only platform in this market whose intelligence is structural, not rented. That is a permanent competitive moat.";

    let fundingSection =
      "Funding Strategy:\n" #
      "1. US Department of Education Title I & IDEA grants — EduAI directly serves highest-need schools with a free sovereign platform.\n" #
      "2. NSF STEM Education grants — PHI/Fibonacci mathematical foundation and sovereign AI curriculum qualify under STEM innovation.\n" #
      "3. ICP Ecosystem grants — DFINITY Foundation and SNS DAO funding for Internet Computer native education applications.\n" #
      "4. Impact investors — New Schools Venture Fund, Gates Foundation EdTech, Luminate Group.\n" #
      "5. CTE equity grants — Federal Perkins V and state CTE funds for sovereign AI prep infrastructure in Title I schools.\n" #
      "6. School district SaaS replacement — Districts currently paying $50–150/student/year for commercial platforms can transition to EduAI at zero marginal cost.\n" #
      "Economic sovereignty argument: every dollar invested builds permanent infrastructure, not recurring service fees.";

    let diegoProtocol = VisionLib.getDiegoProtocol();

    {
      version           = "2.0";
      generatedBy       = "COGT_v4+META_v3+AUTN_v2 — Architecture Council";
      missionStatement;
      founderStory;
      architectureSection;
      impactCase;
      marketGap;
      fundingSection;
      diegoProtocol;
      timestamp         = Time.now();
    };
  };

  // ─── FUNDING TRACKER ─────────────────────────────────────────────────────

  func makeEntryId(store : FundingStore, now : Int) : Text {
    "FUND-" # store.size().toText() # "-" # Int.abs(now).toText();
  };

  func parseStage(s : Text) : Types.FundingStage {
    if (s == "APPLIED")   return #APPLIED;
    if (s == "PENDING")   return #PENDING;
    if (s == "AWARDED")   return #AWARDED;
    if (s == "DECLINED")  return #DECLINED;
    #IDENTIFIED; // default
  };

  public func recordFundingEntry(
    store : FundingStore,
    input : Types.FundingEntryInput,
    now   : Int,
  ) : Types.FundingEntryResult {
    let entryId = makeEntryId(store, now);
    let entry : Types.FundingEntry = {
      entryId;
      programName  = input.programName;
      stage        = parseStage(input.stage);
      targetAmount = input.targetAmount;
      contactEmail = input.contactEmail;
      notes        = input.notes;
      timestamp    = now;
    };
    store.add(entryId, entry);
    { entryId; success = true };
  };

  public func getFundingTracker(store : FundingStore) : [Types.FundingEntry] {
    let buf = List.empty<Types.FundingEntry>();
    for ((_, entry) in store.entries()) {
      buf.add(entry);
    };
    buf.toArray();
  };

  // ─── IMPACT CALCULATOR ───────────────────────────────────────────────────

  // Recognition rate: ~6% of students per year (RCGN_T Fibonacci threshold)
  let RCGN_RATE_PCT : Nat = 6;
  // Nomination rate: ~4% of recognized students go through NOMS pipeline
  let NOMS_RATE_PCT : Nat = 4;

  public func computeImpact(
    schoolCount       : Nat,
    studentsPerSchool : Nat,
  ) : Types.ImpactResult {
    let totalStudents = schoolCount * studentsPerSchool;
    let estimatedRecognitionsPerYear = (totalStudents * RCGN_RATE_PCT) / 100;
    let projectedNominationsPerYear  = (totalStudents * NOMS_RATE_PCT) / 100;
    let costPerStudent : Float = 0.0;
    let roiForDistrict =
      "A district deploying EduAI for " # totalStudents.toText() #
      " students saves an estimated $" # (totalStudents * 75).toText() #
      " annually versus commercial LMS platforms while closing the recognition gap — " #
      "autonomously surfacing approximately " # estimatedRecognitionsPerYear.toText() #
      " student recognition events per year at zero marginal AI cost.";
    {
      totalStudents;
      estimatedRecognitionsPerYear;
      costPerStudent;
      roiForDistrict;
      projectedNominationsPerYear;
    };
  };
};
