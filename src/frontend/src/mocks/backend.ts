import type { backendInterface } from "../backend";

const MOCK_PRINCIPAL = "aaaaa-aa" as unknown as import("@icp-sdk/core/principal").Principal;
const NOW = BigInt(Date.now()) * BigInt(1_000_000);

export const mockBackend = {
  // ─── Student / Session ────────────────────────────────────────────
  getStudentProfile: async () => ({
    id: MOCK_PRINCIPAL,
    name: "Diego Reyes",
    createdAt: NOW,
    gradeLevel: "10",
  }),
  getSessionMode: async () => ({ __kind__: "workNight", workNight: null } as any),
  getSessionSchedule: async () => ({
    compressRatio: 1.0,
    mode: { __kind__: "workNight", workNight: null } as any,
    nextReviewAt: NOW,
    missedCount: BigInt(0),
    intervalMinutes: BigInt(15),
  }),
  saveSessionMode: async () => {},
  updateSessionMode: async () => {},

  // ─── Subjects / Topics ────────────────────────────────────────────
  getSubjectsByGrade: async () => [
    { id: "math-10", name: "Mathematics", gradeLevel: "10" },
    { id: "geometry-10", name: "Geometry", gradeLevel: "10" },
    { id: "science-10", name: "Science", gradeLevel: "10" },
    { id: "english-10", name: "English", gradeLevel: "10" },
    { id: "history-10", name: "History", gradeLevel: "10" },
  ],
  getAllSubjects: async () => [
    { id: "math-10", name: "Mathematics", gradeLevel: "10" },
    { id: "geometry-10", name: "Geometry", gradeLevel: "10" },
    { id: "science-10", name: "Science", gradeLevel: "10" },
  ],
  getTopicsBySubject: async () => [
    {
      id: "topic-1",
      title: "The Pythagorean Theorem",
      gradeLevel: "10",
      masteryScore: BigInt(72),
      subjectId: "geometry-10",
      description: "Understanding right triangles and the Pythagorean relationship",
      fibWeight: BigInt(8),
    } as any,
    {
      id: "topic-2",
      title: "Properties of Parallel Lines",
      gradeLevel: "10",
      masteryScore: BigInt(55),
      subjectId: "geometry-10",
      description: "Transversals and angle relationships",
      fibWeight: BigInt(5),
    } as any,
  ],
  getSubjectTemplates: async () => [],

  // ─── Passport ─────────────────────────────────────────────────────
  getSovereignPassport: async () => ({
    studentId: MOCK_PRINCIPAL,
    gradeLevel: "10",
    name: "Diego Reyes",
    seeds: [],
    createdAt: NOW,
    lastActive: NOW,
    compoundScore: 76.4,
    hotSeeds: BigInt(5),
    warmSeeds: BigInt(12),
    coldSeeds: BigInt(8),
    frozenSeeds: BigInt(2),
  } as any),
  getPassportStats: async () => ({
    totalSeeds: BigInt(27),
    totalSessions: BigInt(14),
    lastActive: NOW,
  }),
  getFullPassportStats: async () => ({
    frozenSeeds: BigInt(2),
    totalSeeds: BigInt(27),
    achievements: ["National Math Recognition", "Geometry Mastery"],
    hotSeeds: BigInt(5),
    warmSeeds: BigInt(12),
    coldSeeds: BigInt(8),
    compoundScore: 76.4,
  }),
  getPassportSeeds: async () => [],
  getKernelSeeds: async () => [
    {
      id: "seed-1",
      trackName: "Geometry Track",
      createdAt: NOW,
      sessionSummary: "Mastered Pythagorean theorem application",
      engineUsed: "PHIX",
    },
  ],
  sealKernelSeed: async () => true,
  getSessionCount: async () => BigInt(14),

  // ─── EDDI ─────────────────────────────────────────────────────────
  getEddi: async () => ({
    id: "EDDI-001",
    law: "LEX_SOVEREIGNUS",
    modeCount: BigInt(7),
    name: "EDDI",
    sealedAt: NOW,
    version: BigInt(3),
  }),
  getEddiInsight: async () =>
    "Your geometry mastery has grown 18% this week. The Pythagorean theorem is solidifying — you're ready to advance.",
  getEddiMode: async () => ({ __kind__: "tutor", tutor: null } as any),
  setEddiMode: async () => {},
  inferEddiMode: async () => ({ __kind__: "tutor", tutor: null } as any),

  // ─── Intelligence / Entanglements ─────────────────────────────────
  getLiveIntelligenceState: async () => ({
    adx: BigInt(13),
    coh: BigInt(8),
    ias: BigInt(21),
    sss: BigInt(72),
    isGoldMoment: false,
    layoutState: "GROWING",
    rcgnThreshold: BigInt(55),
  }),
  getNrveState: async () => ({
    coherenceScore: BigInt(8),
    activeEngine: "COGT",
    phiRatio: BigInt(618),
    cogtPhase: "EXPAND",
    cycleCount: BigInt(34),
  }),
  getFluxState: async () => ({
    difficultyLevel: BigInt(5),
    phiRatio: BigInt(618),
    masteryFloor: BigInt(55),
    phiConfidence: BigInt(76),
    nextFloorThreshold: BigInt(89),
  }),
  getMsryState: async () => ({
    hotCount: BigInt(5),
    warmCount: BigInt(12),
    coldCount: BigInt(8),
    frozenCount: BigInt(2),
    vaultCount: BigInt(0),
    sessionWeight: BigInt(72),
  } as any),
  getPlseState: async () => ({
    pulseRate: BigInt(8),
    lastPulse: NOW,
    entanglementId: "PLSE-001",
  } as any),
  getEntanglements: async () => [],
  getEntanglementById: async () => null,
  getEntanglementStats: async () => ({
    totalTransits: BigInt(144),
    avgCoherenceDelta: BigInt(3),
    lastRefresh: NOW,
    activeCount: BigInt(5),
  }),
  recordEntanglementTransit: async () => {},
  tickEntanglementCycle: async () => {},
  recordEchoEvent: async () => ({
    coherenceDelta: BigInt(2),
    newCoherence: BigInt(8),
    passportUpdated: true,
  }),

  // ─── Agents ────────────────────────────────────────────────────────
  getAgents: async () => ([
    {
      id: "atlas-001",
      name: "Atlas",
      role: "tutor" as any,
      protocols: ["PRTL_SSSC"],
      isActive: true,
      version: "2.1",
      systemPrompt: "I help students master geometry through Socratic reasoning",
      workspace: "student",
      registeredAt: NOW,
      engine: "PHIX",
    },
    {
      id: "echo-001",
      name: "Echo",
      role: "reviewer" as any,
      protocols: ["PRTL_COHG"],
      isActive: true,
      version: "1.8",
      systemPrompt: "I review and reinforce learning through spaced repetition",
      workspace: "student",
      registeredAt: NOW,
      engine: "FIBR",
    },
  ] as any),
  getAgent: async () => null,
  getAgentsByEngine: async () => [],
  getAgentsByProtocol: async () => [],
  getAgentsByWorkspace: async () => [],
  getUserAgents: async () => [],

  // ─── Adaptive / Study ─────────────────────────────────────────────
  getAdaptiveSuggestion: async () => ({
    action: { __kind__: "quizNow", quizNow: null } as any,
    message: "You've reviewed this concept twice — quiz yourself to lock it in.",
  }),
  getAdaptiveWorkflow: async () => ({
    reasonPhrase: "Your SSS score is rising — time to advance difficulty",
    fibDifficultyLevel: BigInt(8),
    nextAction: { __kind__: "advance", advance: null } as any,
    suggestedTopics: ["Pythagorean Theorem", "Special Right Triangles"],
    phiConfidence: 0.76,
  }),
  getLessonContent: async () => ({
    title: "The Pythagorean Theorem — Grade 10",
    introduction:
      "In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c².",
    coreConceptBlock:
      "This relationship holds for ALL right triangles regardless of size. The PHI ratio appears in many geometric proofs.",
    practicePrompt:
      "A right triangle has legs of length 3 and 4. What is the hypotenuse?",
    expansionBlock:
      "The Pythagorean theorem is foundational to trigonometry, construction, and navigation.",
    reviewSummary:
      "You learned the core theorem statement, its visual proof, and three application examples.",
  }),
  queryEngine: async () =>
    "The Pythagorean theorem states that a² + b² = c² for any right triangle. This is one of the most fundamental theorems in all of mathematics.",
  queryEngineWithPassport: async () => ({
    seedGenerated: {
      id: "seed-new",
      trackName: "Geometry Track",
      createdAt: NOW,
      sessionSummary: "Applied Pythagorean theorem to real-world construction scenario",
      engineUsed: "PHIX",
    },
    response:
      "Great question, Diego! In construction, the 3-4-5 right triangle is used constantly to ensure corners are square.",
  }),
  skaiTeach: async () => ({
    response:
      "Let me explain this step by step. The Pythagorean theorem: for a right triangle with legs a and b and hypotenuse c, a² + b² = c².",
    suggestedTopics: ["Special Right Triangles", "Distance Formula"],
    seedId: "seed-skai-1",
  } as any),
  skaiRoute: async () => "PHIX",

  // ─── Quiz / Registry Questions ────────────────────────────────────
  getRegistryQuestion: async () =>
    "Grade 10 Geometry: A right triangle has legs measuring 5 cm and 12 cm. What is the length of the hypotenuse?",
  getStudentQuizResults: async () => [
    {
      agentId: "atlas-001",
      score: BigInt(85),
      totalQuestions: BigInt(5),
      timestamp: NOW,
      quizType: { __kind__: "multipleChoice", multipleChoice: null } as any,
      topicId: "topic-1",
    },
  ],
  saveQuizResult: async () => {},
  getQuizSeedsByGrade: async () => [
    {
      id: "qseed-1",
      question: "What is the hypotenuse of a right triangle with legs 3 and 4?",
      subject: "Geometry",
      conceptId: "pythagorean",
      answer: "5",
      distractors: ["7", "6", "4.5"],
      gradeLevel: BigInt(10),
    },
  ],

  // ─── Recognition / Achievements ───────────────────────────────────
  getRecognitionFlags: async () => [],
  getAllRecognitionFlags: async () => [],
  getRecognitionTimeline: async () => [
    {
      id: "rcgn-1",
      isGoldMoment: true,
      source: "RCGN Engine",
      zone: "SOVEREIGN",
      sealedAt: NOW,
      description: "National Math Recognition — Skills USA Mathematics",
      achievementType: "NationalAward",
      gradeContext: "Grade 10",
    },
  ],
  getAchievements: async () => [],
  runRCGNScan: async () => [],
  recognizeStudent: async () => ({
    flagCreated: false,
    isGold: false,
    rcgnT: BigInt(45),
  }),
  getNominations: async () => [],
  submitNomination: async () => ({
    id: BigInt(1),
    studentId: MOCK_PRINCIPAL,
    programName: "Skills USA",
    teacherNote: "",
    submittedAt: NOW,
    status: "pending",
  } as any),
  getStudentRcgnThreshold: async () => BigInt(55),

  // ─── Courses / University ─────────────────────────────────────────
  getCourses: async () => [
    {
      progressPercent: BigInt(45),
      isEnrolled: true,
      course: {
        id: "course-1",
        title: "Sovereign Mathematics",
        description: "PHI-based mathematics from foundational to advanced",
        gradeLevel: "10",
        phiGateScore: BigInt(34),
        modules: [],
      } as any,
      isUnlocked: true,
    },
    {
      progressPercent: BigInt(0),
      isEnrolled: false,
      course: {
        id: "course-2",
        title: "Geometry & Construction",
        description: "Spatial reasoning and real-world geometry applications",
        gradeLevel: "10",
        phiGateScore: BigInt(55),
        modules: [],
      } as any,
      isUnlocked: false,
    },
  ],
  getEnrolledCourses: async () => [],
  getTracks: async () => [
    {
      id: "track-1" as any,
      title: "PHI Mathematics Track",
      description: "Master mathematics through the golden ratio",
      codeName: "PHIX",
      durationMinutes: BigInt(89),
      stepCount: BigInt(8),
      guidingEngines: ["PHIX", "FIBR"],
      subtitle: "Geometry, Algebra, and the sovereign number",
    },
    {
      id: "track-2" as any,
      title: "Skills USA Construction Prep",
      description: "Diego Protocol: Fibonacci-spaced competition preparation",
      codeName: "DIEG",
      durationMinutes: BigInt(55),
      stepCount: BigInt(5),
      guidingEngines: ["COGT", "META"],
      subtitle: "Blueprint reading, construction math, safety codes",
    },
  ],
  getTrackById: async () => null,
  getMyEnrollments: async () => [],

  // ─── Heatmap / StudentLearning ─────────────────────────────────────
  getHeatmapData: async () => [
    {
      classId: "class-geo-10",
      subject: "Geometry",
      grade: BigInt(10),
      avgMastery: BigInt(72),
      topicMastery: [
        ["Pythagorean Theorem", BigInt(85)],
        ["Parallel Lines", BigInt(64)],
        ["Triangles", BigInt(78)],
        ["Circles", BigInt(55)],
        ["Quadrilaterals", BigInt(70)],
        ["Transformations", BigInt(45)],
        ["Area & Perimeter", BigInt(90)],
        ["3D Solids", BigInt(38)],
      ],
      needsSupport: ["Student A", "Student B"],
      highPerformers: ["Student C", "Diego Reyes"],
      timestamp: NOW,
    } as any,
  ],
  getPrincipalHeatmapWithNoms: async () => [],
  getPrincipalGradeDrilldown: async () => ({
    fibCycleStamp: BigInt(55),
    masteryDistribution: [
      ["STRUGGLE", BigInt(3)],
      ["BUILDING", BigInt(8)],
      ["GROWING", BigInt(12)],
      ["MASTERY", BigInt(5)],
    ],
    totalStudents: BigInt(28),
    grade: BigInt(10),
    subjectBreakdown: [
      ["Geometry", BigInt(72)],
      ["Math", BigInt(68)],
      ["Science", BigInt(75)],
    ],
    strugglingStudents: ["Student A", "Student B", "Student C"],
  }),

  // ─── Live Metrics ─────────────────────────────────────────────────
  getLiveMetrics: async () => ({
    totalQueriesThisHour: BigInt(144),
    fibonacciCycleCount: BigInt(55),
    avgCoherenceScore: BigInt(76),
    activeStudents: BigInt(89),
    topSubject: "Geometry",
    timestamp: NOW,
    activeSessions: BigInt(34),
  }),
  getLiveSessionMetrics: async () => ({
    topSubjects: ["Geometry", "Mathematics", "Science"],
    totalActiveSessions: BigInt(34),
    timestamp: NOW,
    studentsOnline: BigInt(89),
    systemCoherence: BigInt(76),
  }),

  // ─── Knowledge ────────────────────────────────────────────────────
  getKnowledgeByGrade: async () => [
    {
      conceptId: "concept-1",
      title: "Pythagorean Theorem",
      subject: "Geometry",
      gradeLevel: BigInt(10),
      summary: "a² + b² = c² for all right triangles",
      fibWeight: BigInt(8),
      masteryScore: BigInt(85),
    } as any,
  ],
  getConceptsByGrade: async () => [],
  getGradeVaultContents: async () => [],
  getGradeVaultSummary: async () => ({
    grade: BigInt(10),
    conceptCount: BigInt(55),
    quizSeedCount: BigInt(144),
    lastUpdated: NOW,
  } as any),
  registerVaultContent: async () => true,

  // ─── Engine / Registry ────────────────────────────────────────────
  getEngines: async () => [
    {
      id: BigInt(1),
      status: { __kind__: "active", active: null } as any,
      domain: "intelligence",
      fullName: "Cognitive Engine",
      description: "Primary reasoning engine using PHI-chain logic",
      codeName: "COGT",
      mathFoundation: "PHI",
      teachingMethod: "Socratic",
      lessonsAvailable: ["Geometry", "Algebra"],
    },
  ],
  getEngineByCodeName: async () => null,
  getEngineById: async () => null,

  // ─── Laws ─────────────────────────────────────────────────────────
  getLaws: async () => [
    {
      id: BigInt(1),
      latinName: "LEX_SOVEREIGNUS",
      domain: "sovereignty",
      description: "All layers are sovereign and native — no commercial dependencies",
      englishName: "Sovereignty Law",
      attribution: "EduAI Architecture Council",
    },
  ],
  getLawById: async () => null,
  getLawByLatinName: async () => null,

  // ─── Vision ───────────────────────────────────────────────────────
  getVisionWithFundingTracker: async () => ({
    founderStory:
      "Built by a public school kid from Ferris, Texas, who won a national academic award twice — by accident, not by design. EduAI makes that systematic.",
    totalRecognitions: BigInt(1247),
    totalStudents: BigInt(3421),
    activePrograms: BigInt(8),
    visionText:
      "Every student in every forgotten school deserves the same recognition infrastructure as the most elite institutions.",
    fundingTargets: [
      { status: "Researching", name: "Department of Education STEM Grant", amount: "$500,000" },
      { status: "Drafting", name: "ICP Ecosystem Fund", amount: "$250,000" },
    ],
  }),
  getVisionStats: async () => ({
    totalStudents: BigInt(3421),
    totalRecognitions: BigInt(1247),
    activePrograms: BigInt(8),
    fundingTargets: BigInt(2),
  } as any),

  // ─── Demo ─────────────────────────────────────────────────────────
  getDemoStudentData: async () => ({
    sampleSessions: [],
    subjects: [{ id: "math-10", name: "Mathematics", gradeLevel: "10" }],
    samplePassport: {
      studentId: MOCK_PRINCIPAL,
      gradeLevel: "10",
      name: "Diego Reyes",
      seeds: [],
      createdAt: NOW,
      compoundScore: 76.4,
    } as any,
  }),

  // ─── Misc stubs ───────────────────────────────────────────────────
  isFactoryInitialized: async () => true,
  initFactory: async () => ({ __kind__: "ok", ok: "initialized" }),
  getOwner: async () => MOCK_PRINCIPAL,
  runHeartbeat: async () => [],
  seedCurriculumIfEmpty: async () => "Curriculum already populated",
  getWorkspaces: async () => ["student", "teacher", "admin"],

  // ─── SKAI ─────────────────────────────────────────────────────────
  getSkaiDocensInfo: async () => ({
    protocol: "PRTL_SKAI",
    doctrine: "sovereign-intelligence",
    title: "Sovereign Knowledge AI Interface",
    name: "SKAI Docens",
  }),

  // ─── Teacher ──────────────────────────────────────────────────────
  getClassesByTeacher: async () => [],
  getClassesByTeacherId: async () => [],
  getClassDetail: async () => null,
  getRoster: async () => null,
  getTeacherClassMetrics: async () => [],
  getStudentMasteryCard: async () => null,
  getAssignment: async () => null,
  getAssignmentsByClass: async () => [],
  submitAssignment: async () => BigInt(1),
  getSubmissionsByAssignment: async () => [],
  getMySubmissions: async () => [],
  gradeSubmission: async () => BigInt(1),
  getClassAverage: async () => BigInt(72),
  getAsgnStats: async () => ({
    gradedCount: BigInt(45),
    avgScore: BigInt(78),
    totalAssignments: BigInt(60),
    totalSubmissions: BigInt(55),
  }),

  // ─── Grades ───────────────────────────────────────────────────────
  getMyGrades: async () => [],
  getGradePerformance: async () => [],
  updateStudentGrade: async () => ({
    id: MOCK_PRINCIPAL,
    name: "Diego Reyes",
    createdAt: NOW,
    gradeLevel: "10",
  }),

  // ─── SIS/LMS ──────────────────────────────────────────────────────
  getSisRecord: async () => null,
  getSisStudentData: async () => null,
  getSisEnrollments: async () => [],
  getSisRosters: async () => [],
  upsertSisRecord: async () => {},
  upsertRoster: async () => {},
  getSisSyncStatus: async () => ({
    isHealthy: true,
    lastSync: NOW,
    nextSync: NOW,
  }),
  getSisAttendance: async () => [],
  getAttendance: async () => [],
  recordAttendance: async () => {},
  getStudentCountByGrade: async () => [
    { grade: BigInt(10), studentCount: BigInt(28), activeSessionCount: BigInt(14), avgMastery: 72 },
  ],

  // ─── Standards ────────────────────────────────────────────────────
  getStandardsByGrade: async () => [],
  getStandardsBySubject: async () => [],
  getStandard: async () => null,
  getAlignments: async () => [],
  getStandardsWithDigestedContent: async () => [],
  registerStandard: async () => {},
  getStndStats: async () => ({ totalStandards: BigInt(144), byFramework: [] as any } as any),

  // ─── Parent / Counselor ────────────────────────────────────────────
  getMyParentRecord: async () => null,
  registerParent: async () => {},
  getParentsByStudent: async () => [],
  linkStudentToParent: async () => true,
  updateParentPermission: async () => true,
  getCounselorPlan: async () => null,
  updateCounselorPlan: async () => true,
  getCounPlanStats: async () => ({
    withCareerPathway: BigInt(5),
    milestoneCompletionRate: BigInt(72),
    iepFlaggedCount: BigInt(3),
    totalPlans: BigInt(28),
  }),

  // ─── IEP / ESL ────────────────────────────────────────────────────
  getAccommodations: async () => null,
  setAccommodations: async () => {},
  hasAccommodation: async () => false,
  getEslProfile: async () => null,
  upsertEslProfile: async () => {},
  setEslScaffolding: async () => true,
  getEsllStats: async () => ({
    totalEllStudents: BigInt(12),
    scaffoldingEnabledCount: BigInt(8),
    byProficiencyLevel: [],
  }),
  getIesmStats: async () => ({} as any),

  // ─── Career / College ─────────────────────────────────────────────
  getMyCareerPathway: async () => null,
  upsertCareerPathway: async () => BigInt(1),
  recordCareerExploration: async () => true,
  getMyCollegeReadinessRecord: async () => null,
  upsertCollegeReadinessRecord: async () => {},
  getMyScholarshipMatches: async () => [],
  getScholarshipMatches: async () => [],
  matchStudentToScholarships: async () => [],
  updateScholarshipStatus: async () => true,
  getNewScholarshipMatches: async () => [],
  getSchfStats: async () => ({
    totalMatches: BigInt(8),
    awardedCount: BigInt(2),
    topCategories: [],
    totalPrograms: BigInt(15),
  }),
  getClrdStats: async () => ({
    collegeListSize: BigInt(5),
    totalRecords: BigInt(28),
    avgApCourseCount: BigInt(2),
  }),

  // ─── Library ──────────────────────────────────────────────────────
  getMyLibraryRecords: async () => [],
  getCheckoutsByStudent: async () => [],
  getOverdueCheckouts: async () => [],
  returnResource: async () => {},
  updateReadingProgress: async () => {},
  linkToSubject: async () => {},
  getLbryStats: async () => ({} as any),

  // ─── Clubs / Extracurriculars ─────────────────────────────────────
  getMyClubs: async () => [],
  getClubsBySchool: async () => [],
  getMembershipsByStudent: async () => [],
  joinClub: async () => {},
  updateMemberRole: async () => {},
  logClubHours: async () => {},
  linkClubAchievement: async () => {},
  getClubEngagementScore: async () => BigInt(34),
  getXcrrStats: async () => ({
    totalMemberships: BigInt(144),
    totalClubs: BigInt(21),
    avgMembersPerClub: BigInt(8),
    activeClubCount: BigInt(13),
  }),

  // ─── Comms ────────────────────────────────────────────────────────
  sendCommMessage: async () => BigInt(1),
  sendAnnouncement: async () => BigInt(1),
  getAnnouncementsBySchool: async () => [],
  getMessagesForRecipient: async () => [],
  markMessageRead: async () => {},
  getUnreadCount: async () => BigInt(0),
  getCommStats: async () => ({} as any),

  // ─── Field Trips ──────────────────────────────────────────────────
  getFieldTripsByGrade: async () => [],
  getFieldTripsBySchool: async () => [],
  removeFieldTripAttendee: async () => {},
  linkFieldTripPreAssessment: async () => {},
  addFieldTripAttendee: async () => {},
  getFtrpStats: async () => ({
    byType: [],
    totalActivities: BigInt(5),
    passportArchivedCount: BigInt(2),
    totalAttendees: BigInt(55),
  }),

  // ─── Mental Health ────────────────────────────────────────────────
  submitMoodCheckIn: async () => {},
  getMoodAggregate: async () => null,
  getAllMoodAggregates: async () => [],
  getMhckStats: async () => ({
    schoolsMonitored: BigInt(3),
    totalCheckIns: BigInt(144),
  }),

  // ─── District ─────────────────────────────────────────────────────
  getDistrict: async () => null,
  getDistrictStats: async () => ({} as any),
  getCrossSchoolTrends: async () => [],
  getAchievementGaps: async () => [],

  // ─── Staff ────────────────────────────────────────────────────────
  getStaffRoster: async () => [],
  getStaffMember: async () => null,
  listStaff: async () => [],
  updateStaffRole: async () => true,
  getStaffActivityLog: async () => [],

  // ─── Sub Records ──────────────────────────────────────────────────
  getMySubRecords: async () => [],
  getSubRecordsByClass: async () => [],
  getSubRecordsByDate: async () => [],
  logSubIncident: async () => {},
  getSubsStats: async () => ({
    avgDailySubCount: BigInt(2),
    totalSubRecords: BigInt(34),
    totalIncidents: BigInt(5),
  }),

  // ─── Test Prep ────────────────────────────────────────────────────
  startTestPrepSession: async () => BigInt(1),
  getMyTestPrepSessions: async () => [],
  getTprpStats: async () => ({} as any),

  // ─── Tutoring ─────────────────────────────────────────────────────
  getMyTutoringSessions: async () => [],
  getSessionsByTutor: async () => [],
  getTutoringStats: async () => ({ total: BigInt(5), sealed: BigInt(3) }),

  // ─── Study Groups ─────────────────────────────────────────────────
  getMyStudyGroups: async () => [],
  getGroupsBySubject: async () => [],
  removeGroupMember: async () => true,
  recordStudyGroupSession: async () => BigInt(1),
  getPgrpStats: async () => ({
    avgGroupSize: BigInt(4),
    avgMasteryGain: BigInt(8),
    totalSessions: BigInt(21),
    totalGroups: BigInt(5),
  }),

  // ─── PD ───────────────────────────────────────────────────────────
  getMyPdRecords: async () => [],
  getMyPdHours: async () => BigInt(0),
  getMyPdGrowthScore: async () => BigInt(0),
  getPdRecordsByTeacher: async () => [],
  getPdTotalHours: async () => BigInt(0),
  getPdGrowthScore: async () => BigInt(0),
  logPdRecord: async () => BigInt(1),
  getTpdfStats: async () => ({
    totalCertificationsEarned: BigInt(5),
    totalTeachers: BigInt(34),
    avgHoursPerTeacher: BigInt(8),
    totalHoursLogged: BigInt(272),
  }),

  // ─── Calendar ─────────────────────────────────────────────────────
  getCalendarEvents: async () => [],

  // ─── DIGT ─────────────────────────────────────────────────────────
  getDigtStats: async () => ({} as any),
  getDigestStatus: async () => null,
  getDigtStatusForStandard: async () => ({
    conceptCount: BigInt(12),
    quizSeedCount: BigInt(8),
    standardId: "std-1",
    hasContent: true,
  }),
  listDigestJobs: async () => [],

  // ─── API / Registry ────────────────────────────────────────────────
  getApiEndpoints: async () => [],
  getApiEndpointById: async () => null,
  getApiEndpointsByDomain: async () => [],
  getApiVersions: async () => [],
  getApiStats: async () => ({
    activeEndpoints: BigInt(21),
    totalCalls: BigInt(1444),
    totalEndpoints: BigInt(34),
  }),
  getApiCallLogs: async () => [],
  getApiUsageStats: async () => null,
  registerApiCaller: async () => true,
  registerExternalClient: async () => ({
    status: "pending",
    requestId: "req-1",
    name: "External Client",
    submittedAt: NOW,
    description: "Test",
    requestedEndpoints: [],
  }),
  listPendingRegistrations: async () => [],
  logApiCall: async () => {},

  // ─── MLTV / Arch Council ──────────────────────────────────────────
  getMLTVStats: async () => ({
    totalVoices: BigInt(3),
    totalQueries: BigInt(89),
    avgCoherence: BigInt(76),
    novelAnswersGenerated: BigInt(34),
  }),
  getRecentMLTVResponses: async () => [],

  // ─── Portal Transitions ───────────────────────────────────────────
  getPortalTransitions: async () => [],
  logPortalTransition: async () => {},

  // ─── Gateway Entry ────────────────────────────────────────────────
  getMyGateEntries: async () => [],
  sonrCheck: async () => ({
    isHealthy: true,
    lastCheck: NOW,
  } as any),

  // ─── Misc Stats ───────────────────────────────────────────────────
  getSystemMetricsSummary: async () => ({
    totalStudents: BigInt(3421),
    totalSessions: BigInt(14889),
    avgCoherence: BigInt(76),
    uptimePct: 99.8,
  } as any),
  getAllBuilderStats: async () => [],
  getBuilderStats: async () => null,
  getAllocatorStats: async () => ({} as any),
  getSilverBuilders: async () => [],
  getSilverBuilderById: async () => null,
  getSdkEntries: async () => [],
  getSdkEntriesByCategory: async () => [],
  getSdkEntryById: async () => null,
  getQueryHistory: async () => [],
  getTchrStats: async () => ({} as any),
  getGvltStats: async () => ({} as any),
  getCrptStats: async () => ({} as any),
  updateStudentMasteryScore: async () => {},
  recordMissedSession: async () => {},
  setVaultCanisterId: async () => {},
  getVaultCanisterId: async () => MOCK_PRINCIPAL,
  getVaultStats: async () => ({
    totalBytesBuffered: BigInt(0),
    lastDrainAt: NOW,
    totalPayloads: BigInt(0),
  }),

  // ─── Injected stubs ───────────────────────────────────────────────
  addAdmissionsEvent: async () => true,
  addCalendarEvent: async () => {},
  addCollegeToList: async () => true,
  addCounselorMilestone: async () => true,
  addGroupMember: async () => true,
  addScholarshipProgram: async () => BigInt(1),
  addSchoolToDistrict: async () => true,
  addStaffMember: async () => true,
  addSubHandoffNote: async () => {},
  advanceTrackStep: async () => ({ __kind__: "ok", ok: {} } as any),
  alignContent: async () => {},
  approveClient: async () => null,
  archiveTripToPassport: async () => {},
  askAgent: async () => "",
  autoSealFromSession: async () => "",
  chatWithEddi: async () => ({ response: "", modeUsed: "STUDENT_MODE" as any }),
  checkGradeAccess: async () => ({ studentGrade: BigInt(10), requestedGrade: BigInt(10), allowed: true, reason: "" }),
  checkOutResource: async () => BigInt(1),
  completeModule: async () => ({ __kind__: "ok", ok: "" } as any),
  completeTestPrepSession: async () => true,
  completeTrack: async () => ({ __kind__: "ok", ok: {} } as any),
  completeTutoringSession: async () => true,
  computeCareerRecommendations: async () => [],
  computeScoreProjection: async () => ({} as any),
  computeStudentState: async () => ({} as any),
  createAgent: async () => ({} as any),
  createAssignment: async () => BigInt(1),
  createClass: async () => true,
  createClub: async () => BigInt(1),
  createCounselorPlan: async () => {},
  createDistrict: async () => BigInt(1),
  createFactoryStudent: async () => ({ __kind__: "ok", ok: "" } as any),
  createFieldTrip: async () => BigInt(1),
  createSovereignPassport: async () => ({} as any),
  createStudentProfile: async () => ({} as any),
  createSubRecord: async () => BigInt(1),
  createTutoringSession: async () => BigInt(1),
  deactivateAccommodations: async () => true,
  diagSystem: async () => ({ status: "ok" as any, pilScore: 0, errors: [], heartbeatCount: BigInt(0), avgCoh: 0 }),
  digestCurriculumText: async () => ({} as any),
  digestTextbook: async () => ({} as any),
  dissolveClub: async () => {},
  dissolveStudyGroup: async () => true,
  drainVaultBuffer: async () => [],
  enrollInCourse: async () => ({ __kind__: "ok", ok: null } as any),
  enrollInTrack: async () => ({ __kind__: "ok", ok: {} } as any),
  enterNexumGate: async () => ({} as any),
  executeQuery: async () => ({} as any),
  factoryAdminSetup: async () => ({ __kind__: "ok", ok: "" } as any),
  factoryStatus: async () => ({ adminExists: true, factoryLocked: false, studentCount: BigInt(0) }),
  fireArchCouncil: async () => ({} as any),
  flagStudentIep: async () => true,
  formStudyGroup: async () => BigInt(1),
  generateClassHeatmap: async () => null,
  generateTeacherRecommendations: async () => [],
  generateVisionDocument: async () => ({} as any),
  getAccessibleContent: async () => [],
} as unknown as backendInterface;
