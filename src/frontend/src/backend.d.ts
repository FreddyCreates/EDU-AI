import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface DigtDigestResult {
    subject: string;
    quizSeedsGenerated: bigint;
    workedExamplesFound: bigint;
    conceptsExtracted: bigint;
    gradeLevel: bigint;
    processingCycles: bigint;
    timestamp: bigint;
    inputId: string;
}
export type CareerCluster = string;
export type ResourceType = {
    __kind__: "referenceDoc";
    referenceDoc: null;
} | {
    __kind__: "periodical";
    periodical: null;
} | {
    __kind__: "other";
    other: string;
} | {
    __kind__: "video";
    video: null;
} | {
    __kind__: "book";
    book: null;
} | {
    __kind__: "ebook";
    ebook: null;
} | {
    __kind__: "audiobook";
    audiobook: null;
};
export interface StandardWithDigestStatus {
    lastDigested?: bigint;
    conceptCount: bigint;
    quizSeedCount: bigint;
    hasContent: boolean;
    standard: Standard;
}
export interface ClassSessionMetrics {
    rcgnStream: bigint;
    classId: string;
    sssAvg: bigint;
    activeCount: bigint;
    masteryAvg: bigint;
    className: string;
}
export type ParentId = Principal;
export interface AdaptiveWorkflow {
    reasonPhrase: string;
    fibDifficultyLevel: bigint;
    nextAction: AdaptiveAction;
    suggestedTopics: Array<string>;
    phiConfidence: number;
}
export interface KnowledgeQuery {
    subject: string;
    studentGrade: GradeLevel;
    includeGradeRange: boolean;
}
export interface ParentRecord {
    contactPrefs: ContactPreferences;
    linkedStudentPrincipals: Array<Principal>;
    displayName: string;
    createdAt: bigint;
    messageHistory: Array<MessageRef>;
    permissionLevel: PermissionLevel;
    parentId: ParentId;
}
export interface ActivityRecord {
    action: string;
    studentName: string;
    score: number;
    timestamp: bigint;
}
export interface FeedbackEvent {
    id: string;
    resolved: boolean;
    userId: UserId;
    createdAt: bigint;
    eddiResponse: string;
    message: string;
    severity: string;
    selfCorrectionAttempts: bigint;
    itEscalated: boolean;
    proposedFix?: string;
    resolvedAt?: bigint;
}
export interface LibraryRecord {
    id: bigint;
    title: string;
    masteryLinked: boolean;
    resourceId: string;
    checkedOutAt: bigint;
    linkedSubjectId?: bigint;
    studentPrincipal: Principal;
    dueDate?: bigint;
    resourceType: ResourceType;
    readingProgressPct: bigint;
    returnedAt?: bigint;
}
export interface LiveSessionMetrics {
    topSubjects: Array<string>;
    totalActiveSessions: bigint;
    timestamp: bigint;
    studentsOnline: bigint;
    systemCoherence: bigint;
}
export interface CourseSummary {
    progressPercent: bigint;
    isEnrolled: boolean;
    course: Course;
    isUnlocked: boolean;
}
export interface EligibleProgram {
    url: string;
    name: string;
    description: string;
}
export interface EnrollmentResult {
    firstModuleContent: string;
    eddiBrief: string;
    firstModuleTitle: string;
    passportSeeded: boolean;
    success: boolean;
    firstModuleId: string;
}
export interface TeacherRecommendation {
    affectedStudents: Array<string>;
    action: string;
    novelApproach: string;
    suggestedEngine: string;
    classId: string;
    priority: bigint;
}
export interface SdkEntry {
    id: string;
    status: string;
    name: string;
    entryPoints: Array<string>;
    description: string;
    version: string;
    category: string;
    accessProtocol: string;
}
export interface RegistrationResult {
    status: string;
    clientId: string;
    apiKey: string;
    rateLimitPerMinute: bigint;
    approvedEndpoints: Array<string>;
}
export interface RecognitionFlag {
    id: string;
    pattern: RecognitionPattern;
    studentId: UserId;
    subject: string;
    detectedAt: Timestamp;
    masteryScore: bigint;
    eligiblePrograms: Array<EligibleProgram>;
    sealed: boolean;
}
export interface QuizResult {
    agentId: string;
    score: bigint;
    totalQuestions: bigint;
    timestamp: bigint;
    quizType: QuizType;
    topicId: string;
}
export interface RcgnAlert {
    alertType: string;
    studentId: string;
    studentName: string;
    subject: string;
    threshold: bigint;
    timestamp: bigint;
    rcgnScore: bigint;
    nominationReady: boolean;
}
export interface IepAccommodation {
    active: boolean;
    accommodationTypes: Array<AccommodationType>;
    reviewDate?: bigint;
    studentPrincipal: Principal;
    addedBy: Principal;
    effectiveFrom: bigint;
}
export interface StaffMember {
    accessLevel: bigint;
    staffId: string;
    name: string;
    role: StaffRole;
    department: string;
    lastActive: bigint;
}
export type UserId = Principal;
export interface GradePerformance {
    subject: string;
    lastUpdated: bigint;
    topicBreakdown: Array<[string, bigint]>;
    studentsAtLevel: bigint;
    weeklyTrend: Array<bigint>;
    gradeLevel: bigint;
    avgMastery: bigint;
}
export interface DigestStatus {
    status: string;
    completedAt: bigint;
    jobId: string;
    progress: bigint;
}
export interface AsgnStats {
    gradedCount: bigint;
    avgScore: bigint;
    totalAssignments: bigint;
    totalSubmissions: bigint;
}
export interface ApiStats {
    activeEndpoints: bigint;
    totalCalls: bigint;
    totalEndpoints: bigint;
}
export interface SessionMetrics {
    activeStudents: bigint;
    activeSessions: bigint;
    classBreakdown: Array<ClassSessionMetrics>;
}
export interface FtrpStats {
    byType: Array<[string, bigint]>;
    totalActivities: bigint;
    passportArchivedCount: bigint;
    totalAttendees: bigint;
}
export interface GroupSession {
    id: bigint;
    startedAt: bigint;
    groupId: bigint;
    durationMinutes: bigint;
    participantCount: bigint;
    sharedMasteryDelta: bigint;
}
export interface TeacherClassMetrics {
    lastActivity: bigint;
    currentTopic: string;
    advancedCount: bigint;
    classId: string;
    strugglingCount: bigint;
    className: string;
    studentCount: bigint;
    avgMastery: bigint;
}
export interface MoodAggregate {
    lowMoodCount: bigint;
    highMoodCount: bigint;
    periodEnd: bigint;
    schoolId: bigint;
    periodStart: bigint;
    checkInCount: bigint;
    avgMoodScore: bigint;
}
export interface RecognitionTimelineEntry {
    id: string;
    isGoldMoment: boolean;
    source: string;
    zone: string;
    sealedAt: bigint;
    description: string;
    achievementType: string;
    gradeContext: string;
}
export interface DigestResult {
    status: string;
    quizSeedsGenerated: bigint;
    jobId: string;
    gradeVaultEntryId: string;
    conceptsExtracted: Array<DigtConcept>;
    workedExamplesGenerated: bigint;
}
export interface CounselorPlan {
    collegeReadinessStage?: CollegeReadinessStage;
    accommodationTypes: Array<string>;
    createdAt: bigint;
    studentPrincipal: Principal;
    updatedAt: bigint;
    notes: string;
    careerPathwayId?: bigint;
    iepFlagged: boolean;
    counselorPrincipal: Principal;
    milestones: Array<CounselorMilestone>;
}
export type RecipientRef = {
    __kind__: "schoolWide";
    schoolWide: bigint;
} | {
    __kind__: "teacher";
    teacher: Principal;
} | {
    __kind__: "gradeLevel";
    gradeLevel: bigint;
} | {
    __kind__: "student";
    student: Principal;
} | {
    __kind__: "classCode";
    classCode: string;
} | {
    __kind__: "parent";
    parent: Principal;
};
export interface EchoResult {
    coherenceDelta: bigint;
    newCoherence: bigint;
    passportUpdated: boolean;
}
export interface SchfStats {
    totalMatches: bigint;
    awardedCount: bigint;
    topCategories: Array<[string, bigint]>;
    totalPrograms: bigint;
}
export interface ImpactResult {
    projectedNominationsPerYear: bigint;
    totalStudents: bigint;
    estimatedRecognitionsPerYear: bigint;
    costPerStudent: number;
    roiForDistrict: string;
}
export interface ClassRecord {
    subject: string;
    classId: string;
    grade: bigint;
    className: string;
    studentCount: bigint;
    avgMastery: number;
}
export interface EslProfile {
    preferredLanguage: string;
    studentPrincipal: Principal;
    updatedAt: bigint;
    proficiencyLevel: ProficiencyLevel;
    translationFlags: Array<string>;
    vocabScaffoldingEnabled: boolean;
    adaptedPromptsEnabled: boolean;
    nativeLanguage: string;
}
export interface SessionSchedule {
    compressRatio: number;
    mode: SessionMode;
    nextReviewAt: bigint;
    missedCount: bigint;
    intervalMinutes: bigint;
}
export interface HeatmapWithNoms {
    subject: string;
    recentAchievements: bigint;
    activeStudents: bigint;
    classId: string;
    grade: bigint;
    pendingNoms: bigint;
    sessionCount: bigint;
    lastActive: bigint;
    avgMastery: bigint;
}
export interface GradeDrilldown {
    fibCycleStamp: bigint;
    masteryDistribution: Array<[string, bigint]>;
    totalStudents: bigint;
    grade: bigint;
    subjectBreakdown: Array<[string, bigint]>;
    strugglingStudents: Array<string>;
}
export interface CounPlanStats {
    withCareerPathway: bigint;
    milestoneCompletionRate: bigint;
    iepFlaggedCount: bigint;
    totalPlans: bigint;
}
export interface SubjectTemplate {
    subject: string;
    templateId: string;
    createdBy: string;
    masterLocked: boolean;
    topicIds: Array<string>;
    gradeLevel: GradeLevel;
    standardsRef: Array<string>;
}
export type AccommodationType = {
    __kind__: "other";
    other: string;
} | {
    __kind__: "simplifiedLanguage";
    simplifiedLanguage: null;
} | {
    __kind__: "reducedDistraction";
    reducedDistraction: null;
} | {
    __kind__: "preferredSeating";
    preferredSeating: null;
} | {
    __kind__: "breaksBetweenTasks";
    breaksBetweenTasks: null;
} | {
    __kind__: "extendedTime";
    extendedTime: null;
} | {
    __kind__: "calculator";
    calculator: null;
} | {
    __kind__: "spellChecker";
    spellChecker: null;
} | {
    __kind__: "readAloud";
    readAloud: null;
} | {
    __kind__: "largeFontSize";
    largeFontSize: null;
};
export interface PdRecord {
    id: bigint;
    completedAt: bigint;
    title: string;
    provider: string;
    growthMilestone?: GrowthMilestone;
    certificationEarned?: string;
    pdType: PdType;
    teacherPrincipal: Principal;
    hoursLogged: bigint;
}
export interface CollegeReadinessRecord {
    apCourseIds: Array<bigint>;
    studentPrincipal: Principal;
    transcriptMilestones: Array<TranscriptMilestone>;
    updatedAt: bigint;
    ibCourseIds: Array<bigint>;
    collegeExplorationList: Array<CollegeEntry>;
    admissionsTimeline: Array<AdmissionsEvent>;
}
export interface SilverBuilder {
    id: string;
    protocol: string;
    status: SilverBuilderStatus;
    domain: string;
    createdAt: bigint;
    domainsOwned: Array<string>;
    codeName: string;
    purpose: string;
}
export interface ContactPreferences {
    preferEmail: boolean;
    preferInApp: boolean;
    language: string;
    quietHoursStart?: bigint;
    quietHoursEnd?: bigint;
}
export interface UserAgent {
    id: string;
    owner: UserId;
    name: string;
    memoryConfig: string;
    createdAt: Timestamp;
    modeBinding: EDDIMode;
    reasoningSeed: string;
}
export type SchoolId = bigint;
export interface RegistrationRequest {
    status: string;
    requestId: string;
    name: string;
    submittedAt: bigint;
    description: string;
    requestedEndpoints: Array<string>;
}
export interface StandardAlignment {
    contentId: bigint;
    masteryThreshold: bigint;
    standardCode: StandardCode;
    alignedAt: bigint;
}
export interface EDDI {
    id: string;
    law: string;
    modeCount: bigint;
    name: string;
    sealedAt: Timestamp;
    version: bigint;
}
export interface CompetitionTemplate {
    name: string;
    description: string;
    prepWeeksTypical: bigint;
    domains: Array<string>;
    category: CourseCategory;
    organization: string;
}
export interface ClassHeatmap {
    needsSupport: Array<string>;
    highPerformers: Array<string>;
    subject: string;
    topicMastery: Array<[string, bigint]>;
    classId: string;
    gradeLevel: bigint;
    timestamp: bigint;
    avgClassMastery: bigint;
}
export interface DigestJob {
    status: string;
    completedAt: bigint;
    title: string;
    quizSeeds: bigint;
    subject: string;
    jobId: string;
    submittedAt: bigint;
    gradeLevel: bigint;
    teacherId: string;
    conceptsFound: bigint;
}
export interface PassportStats {
    frozenSeeds: bigint;
    totalSeeds: bigint;
    achievements: Array<string>;
    hotSeeds: bigint;
    warmSeeds: bigint;
    coldSeeds: bigint;
    compoundScore: number;
}
export type GradeLevel = string;
export interface EsllStats {
    totalEllStudents: bigint;
    scaffoldingEnabledCount: bigint;
    byProficiencyLevel: Array<[string, bigint]>;
}
export interface PassportInsight {
    eddiBrief: string;
    frozenSeeds: bigint;
    orbMode: string;
    sssScore: bigint;
    seedCount: bigint;
    hotSeeds: bigint;
    warmSeeds: bigint;
    coldSeeds: bigint;
}
export interface VisionDocument {
    impactCase: string;
    liveStats: VisionStats;
    platformVision: string;
    technicalSovereignty: string;
    fundingStrategy: string;
    foundingStory: string;
}
export interface FluxState {
    difficultyLevel: bigint;
    phiRatio: bigint;
    masteryFloor: bigint;
    phiConfidence: bigint;
    nextFloorThreshold: bigint;
}
export interface ClassDetail {
    students: Array<StudentSummary>;
    subject: string;
    classId: string;
    recentActivity: Array<ActivityRecord>;
    grade: bigint;
    className: string;
}
export interface NrveState {
    coherenceScore: bigint;
    activeEngine: string;
    phiRatio: bigint;
    cogtPhase: string;
    cycleCount: bigint;
}
export interface ApiCallLog {
    endpointId: string;
    callerId: string;
    timestamp: bigint;
    success: boolean;
    responseTime: bigint;
}
export interface VisionDocumentV2 {
    impactCase: string;
    founderStory: string;
    missionStatement: string;
    marketGap: string;
    generatedBy: string;
    version: string;
    timestamp: bigint;
    fundingSection: string;
    diegoProtocol: string;
    architectureSection: string;
}
export interface Assignment {
    id: bigint;
    standardCodes: Array<string>;
    title: string;
    maxScore: bigint;
    createdAt: bigint;
    dueDate?: bigint;
    description: string;
    autoSeedPassport: boolean;
    subjectId: bigint;
    gradeLevel: bigint;
    teacherPrincipal: Principal;
    classCode: string;
}
export interface AdaptiveSuggestion {
    action: SuggestionAction;
    message: string;
}
export interface AttendanceRecord {
    periodCode?: string;
    status: AttendanceStatus;
    date: bigint;
    sisId: SisStudentId;
}
export interface LiveMetrics {
    totalQueriesThisHour: bigint;
    fibonacciCycleCount: bigint;
    avgCoherenceScore: bigint;
    activeStudents: bigint;
    topSubject: string;
    timestamp: bigint;
    activeSessions: bigint;
}
export interface StudentSummary {
    studentId: string;
    name: string;
    masteryScore: number;
    currentTopic: string;
    lastActive: bigint;
}
export interface TpdfStats {
    totalCertificationsEarned: bigint;
    totalTeachers: bigint;
    avgHoursPerTeacher: bigint;
    totalHoursLogged: bigint;
}
export interface TeacherClass {
    id: string;
    subject: string;
    name: string;
    createdAt: bigint;
    studentIds: Array<string>;
    gradeLevel: bigint;
    teacherId: string;
}
export interface XcrrStats {
    totalMemberships: bigint;
    totalClubs: bigint;
    avgMembersPerClub: bigint;
    activeClubCount: bigint;
}
export interface VaultEntry {
    subject: string;
    contentType: string;
    entryId: string;
    summary: string;
    addedAt: bigint;
    gradeLevel: bigint;
}
export type SisStudentId = string;
export type EnrichmentType = {
    __kind__: "STEMEvent";
    STEMEvent: null;
} | {
    __kind__: "other";
    other: string;
} | {
    __kind__: "museumVisit";
    museumVisit: null;
} | {
    __kind__: "guestSpeaker";
    guestSpeaker: null;
} | {
    __kind__: "labVisit";
    labVisit: null;
} | {
    __kind__: "fieldTrip";
    fieldTrip: null;
};
export interface GvltStats {
    totalAllowed: bigint;
    totalEntries: bigint;
    totalBlocked: bigint;
}
export interface PlseSeed {
    concept: string;
    timestamp: bigint;
}
export interface GradeGate {
    studentGrade: bigint;
    requestedGrade: bigint;
    allowed: boolean;
    reason: string;
}
export type Timestamp = bigint;
export interface IesmStats {
    activeAccomCount: bigint;
    totalStudentsWithAccom: bigint;
    mostCommonAccom: string;
}
export type StandardFramework = {
    __kind__: "NGSS";
    NGSS: null;
} | {
    __kind__: "TEKS";
    TEKS: null;
} | {
    __kind__: "WIDA";
    WIDA: null;
} | {
    __kind__: "CommonCore";
    CommonCore: null;
} | {
    __kind__: "Other";
    Other: string;
};
export interface GradeVaultEntry {
    contentId: string;
    subject: string;
    contentType: string;
    lockedUntilGrade: bigint;
    gradeLevel: bigint;
}
export type TestPrepMode = {
    __kind__: "AP";
    AP: string;
} | {
    __kind__: "ACT";
    ACT: null;
} | {
    __kind__: "SAT";
    SAT: null;
} | {
    __kind__: "STAAR";
    STAAR: null;
} | {
    __kind__: "PSAT";
    PSAT: null;
};
export interface ClassHeatmapData {
    subject: string;
    activeStudents: bigint;
    classId: string;
    grade: bigint;
    sessionCount: bigint;
    lastActive: bigint;
    avgMastery: bigint;
}
export interface CrptStats {
    avgExplorationDepth: bigint;
    totalPathways: bigint;
    topClusters: Array<[CareerCluster, bigint]>;
}
export interface SovereignPassport {
    studentName: string;
    lastActiveAt: Timestamp;
    createdAt: Timestamp;
    passportId: string;
    collegium: string;
    achievements: Array<string>;
    gradeLevel: string;
    holder: UserId;
    totalSessions: bigint;
    kernelSeeds: Array<KernelSeed>;
}
export interface SisRecord {
    studentPrincipal?: Principal;
    enrollmentStatus: EnrollmentStatus;
    sisId: SisStudentId;
    updatedAt: bigint;
    schoolId: bigint;
    grade: bigint;
}
export interface ScoreProjection {
    computedAt: bigint;
    mode: TestPrepMode;
    studentPrincipal: Principal;
    sessionsUsed: bigint;
    confidenceLevel: bigint;
    projectedScore: bigint;
}
export interface DigtStats {
    totalInputs: bigint;
    subjectsDigested: Array<string>;
    totalConcepts: bigint;
    totalQuizSeeds: bigint;
}
export interface MsryState {
    fibonacciFloorLevel: bigint;
    zone: string;
    lastZoneTransition: bigint;
    seedCount: bigint;
    masteryCompound: bigint;
}
export interface ApiVersion {
    endpointCount: bigint;
    version: string;
    deprecated: boolean;
    releaseDate: bigint;
}
export interface DistrictStats {
    totalSchools: bigint;
    avgMasteryScore: bigint;
    totalStudents: bigint;
    achievementGapIndex: bigint;
}
export interface DigtConcept {
    id: string;
    subject: string;
    difficulty: bigint;
    term: string;
    gradeLevel: bigint;
    fibWeight: bigint;
    definition: string;
}
export interface CatalogCourse {
    title: string;
    gradeMax: bigint;
    gradeMin: bigint;
    cteProgram: string;
    uilProgram: string;
    description: string;
    phiGateScore: bigint;
    totalModules: bigint;
    category: CourseCategory;
    courseId: string;
}
export interface ClubRecord {
    id: bigint;
    active: boolean;
    memberPrincipals: Array<Principal>;
    name: string;
    createdAt: bigint;
    schoolId: bigint;
    category: ClubCategory;
    advisorPrincipal: Principal;
}
export interface CatalogModule {
    fibMilestone: bigint;
    moduleId: string;
    title: string;
    order: bigint;
    description: string;
}
export interface GrowthMilestone {
    title: string;
    achievedAt: bigint;
    category: string;
}
export interface CounselorMilestone {
    id: bigint;
    completedAt?: bigint;
    title: string;
    targetDate?: bigint;
    category: MilestoneCategory;
}
export interface CareerExplorationEntry {
    exploredAt: bigint;
    careerTitle: string;
    careerId: bigint;
    cluster: CareerCluster;
    bookmarked: boolean;
}
export interface CatalogCourseDetail {
    title: string;
    gradeMax: bigint;
    gradeMin: bigint;
    cteProgram: string;
    uilProgram: string;
    courseId: string;
    modules: Array<CatalogModule>;
}
export interface PrcpNarrativeEntry {
    studentsAccelerating: bigint;
    classId: string;
    studentsAtRisk: bigint;
    narrative: string;
    masteryAvg: bigint;
    sessionCount: bigint;
    className: string;
    rcgnEvents: bigint;
}
export interface AchievementGapRecord {
    highGroupAvg: bigint;
    computedAt: bigint;
    lowGroupAvg: bigint;
    districtId: DistrictId;
    gapScore: bigint;
    subjectId: bigint;
    gradeLevel: bigint;
}
export interface StudentMasteryCard {
    subjectMastery: Array<[string, bigint]>;
    studentId: string;
    predictedStruggle: Array<string>;
    name: string;
    gradeLevel: bigint;
    recommendation: string;
    lastActive: bigint;
    currentStreak: bigint;
}
export interface SkaiDocensInfo {
    protocol: string;
    doctrine: string;
    title: string;
    name: string;
}
export interface SovereignLaw {
    id: bigint;
    latinName: string;
    domain: string;
    description: string;
    englishName: string;
    attribution: string;
}
export type StandardCode = string;
export interface CareerPathway {
    id: bigint;
    recommendedClusters: Array<CareerCluster>;
    interestSurveyResults: Array<InterestScore>;
    studentPrincipal: Principal;
    updatedAt: bigint;
    explorationHistory: Array<CareerExplorationEntry>;
    milestones: Array<CareerMilestone>;
}
export interface Standard {
    strand?: string;
    subject: string;
    code: StandardCode;
    framework: StandardFramework;
    description: string;
    bloomsLevel?: bigint;
    gradeLevel: bigint;
    fibWeight: bigint;
}
export interface MLTVStats {
    totalVoices: bigint;
    totalQueries: bigint;
    avgCoherence: bigint;
    novelAnswersGenerated: bigint;
}
export interface Track {
    id: TrackId;
    title: string;
    description: string;
    codeName: string;
    durationMinutes: bigint;
    stepCount: bigint;
    guidingEngines: Array<string>;
    subtitle: string;
}
export interface StudyGroup {
    id: bigint;
    active: boolean;
    memberPrincipals: Array<Principal>;
    createdAt: bigint;
    sssRangeHigh: bigint;
    subjectId: bigint;
    gradeLevel: bigint;
    sssRangeLow: bigint;
}
export interface ClrdStats {
    collegeListSize: bigint;
    totalRecords: bigint;
    avgApCourseCount: bigint;
}
export interface IasResult {
    layoutState: string;
    iasScore: bigint;
}
export interface WeekProgress {
    avgScore: number;
    week: bigint;
    completedLessons: bigint;
}
export interface TranscriptMilestone {
    id: bigint;
    completedAt?: bigint;
    title: string;
    gradeLevel: bigint;
    gpaImpact?: bigint;
}
export interface IncidentEntry {
    description: string;
    timestamp: bigint;
    severity: IncidentSeverity;
}
export interface SelfStudyTrack {
    id: string;
    title: string;
    createdAt: bigint;
    isActive: boolean;
    passportSealed: boolean;
    masteryPct: bigint;
    category: string;
    competitionDate: bigint;
    milestones: Array<SelfStudyMilestone>;
}
export interface TestPrepSession {
    id: bigint;
    completedAt?: bigint;
    startedAt: bigint;
    mode: TestPrepMode;
    questionsAttempted: bigint;
    studentPrincipal: Principal;
    subjectId: bigint;
    masteryDelta: bigint;
    correctCount: bigint;
    strategyNotes: Array<string>;
}
export type ClubCategory = {
    __kind__: "other";
    other: string;
} | {
    __kind__: "arts";
    arts: null;
} | {
    __kind__: "civic";
    civic: null;
} | {
    __kind__: "stem";
    stem: null;
} | {
    __kind__: "community";
    community: null;
} | {
    __kind__: "academic";
    academic: null;
} | {
    __kind__: "sports";
    sports: null;
};
export interface SubsStats {
    avgDailySubCount: bigint;
    totalSubRecords: bigint;
    totalIncidents: bigint;
}
export interface KernelSeed {
    id: string;
    artifactName?: string;
    trackName: string;
    createdAt: Timestamp;
    sessionSummary: string;
    engineUsed: string;
}
export interface CommMessage {
    id: bigint;
    expiresAt?: bigint;
    subject: string;
    body: string;
    sender: Principal;
    sentAt: bigint;
    messageType: MessageType;
    recipientRefs: Array<RecipientRef>;
    attachmentHashes: Array<Uint8Array>;
    translationNeeded: boolean;
}
export interface VisionWithFunding {
    founderStory: string;
    totalRecognitions: bigint;
    totalStudents: bigint;
    activePrograms: bigint;
    visionText: string;
    fundingTargets: Array<FundingTarget>;
}
export interface CrossSchoolTrend {
    schoolId: SchoolId;
    subjectId: bigint;
    gradeLevel: bigint;
    periodLabel: string;
    sessionCount: bigint;
    avgMastery: bigint;
}
export interface FieldTripRecord {
    id: bigint;
    passportArchived: boolean;
    activityDate: bigint;
    organizer: Principal;
    title: string;
    attendeeCount: bigint;
    postAssessmentId?: bigint;
    schoolId: bigint;
    gradeLevel: bigint;
    attendeePrincipals: Array<Principal>;
    enrichmentType: EnrichmentType;
    location: string;
    preAssessmentId?: bigint;
}
export interface MentalHealthCheckIn {
    recordedAt: bigint;
    anonymousNote?: string;
    schoolId: bigint;
    gradeLevel: bigint;
    sessionToken: Uint8Array;
    moodScore: bigint;
}
export interface SubRecord {
    id: bigint;
    accessLevel: SubAccessLevel;
    date: bigint;
    coveringTeacherPrincipal: Principal;
    subPrincipal: Principal;
    incidentLog: Array<IncidentEntry>;
    classCode: string;
    handoffNotes: string;
}
export interface PgrpStats {
    avgGroupSize: bigint;
    avgMasteryGain: bigint;
    totalSessions: bigint;
    totalGroups: bigint;
}
export interface DigtQuizSeed {
    id: string;
    question: string;
    subject: string;
    conceptId: string;
    answer: string;
    distractors: Array<string>;
    gradeLevel: bigint;
}
export interface CollegeEntry {
    matchTier: CollegeMatchTier;
    collegeName: string;
    applicationStatus: string;
    addedAt: bigint;
}
export interface DistrictProfile {
    id: DistrictId;
    name: string;
    createdAt: bigint;
    schoolIds: Array<SchoolId>;
    state: string;
    contactEmail: string;
}
export type PdType = {
    __kind__: "workshop";
    workshop: null;
} | {
    __kind__: "other";
    other: string;
} | {
    __kind__: "conference";
    conference: null;
} | {
    __kind__: "peerCoaching";
    peerCoaching: null;
} | {
    __kind__: "onlineCourse";
    onlineCourse: null;
} | {
    __kind__: "certification";
    certification: null;
} | {
    __kind__: "selfStudy";
    selfStudy: null;
};
export interface StudentProfile {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    gradeLevel: GradeLevel;
}
export interface CalendarEvent {
    title: string;
    schoolId: bigint;
    affectedGrades: Array<bigint>;
    eventDate: bigint;
    eventType: string;
}
export interface MLTVResponse {
    voices: Array<ArchCouncilVoice>;
    totalCoherence: bigint;
    queryId: string;
    timestamp: bigint;
    fibFlooredAt: bigint;
    novelVoice: ArchCouncilVoice;
}
export interface SovereignEngine {
    id: bigint;
    status: EngineStatus;
    domain: string;
    fullName: string;
    description: string;
    codeName: string;
    mathFoundation: string;
    teachingMethod: string;
    lessonsAvailable: Array<string>;
}
export interface GradeCount {
    grade: bigint;
    activeSessionCount: bigint;
    studentCount: bigint;
    avgMastery: number;
}
export interface ApiEndpoint {
    id: string;
    method: string;
    requiresAuth: boolean;
    domain: string;
    name: string;
    path: string;
    sealedAt: bigint;
    description: string;
    version: string;
    substrateDomain: string;
    rateLimit: bigint;
}
export interface ActivityEntry {
    action: string;
    staffId: string;
    timestamp: bigint;
    details: string;
}
export interface LiveIntelligenceState {
    adx: bigint;
    coh: bigint;
    ias: bigint;
    sss: bigint;
    isGoldMoment: boolean;
    layoutState: string;
    rcgnThreshold: bigint;
}
export interface FundingTarget {
    status: string;
    name: string;
    amount: string;
}
export interface BuilderStats {
    sessionsProcessed: bigint;
    workflowCompletions: bigint;
    lastActiveAt: bigint;
    seedsSealed: bigint;
}
export interface TrackEnrollment {
    completedAt?: bigint;
    studentId: Principal;
    currentStep: bigint;
    trackId: TrackId;
    enrolledAt: bigint;
    createdArtifactName?: string;
}
export interface FundingEntryResult {
    entryId: string;
    success: boolean;
}
export type DistrictId = bigint;
export interface ScholarshipMatch {
    id: bigint;
    matchedAt: bigint;
    studentPrincipal: Principal;
    matchScore: bigint;
    applicationStatus: ApplicationStatus;
    notes: string;
    programId: bigint;
}
export interface Submission {
    id: bigint;
    status: SubmissionStatus;
    contentHash: Uint8Array;
    studentPrincipal: Principal;
    submittedAt: bigint;
    assignmentId: bigint;
}
export interface Subject {
    id: string;
    name: string;
    gradeLevel: string;
}
export interface TutoringSession {
    id: bigint;
    startedAt: bigint;
    studentPrincipal: Principal;
    sealed: boolean;
    tutorRef: string;
    durationMinutes: bigint;
    subjectId: bigint;
    gradeLevel: bigint;
    transcriptHash?: Uint8Array;
    tutorType: TutorType;
    masteryDeltaAfter: bigint;
    masteryDeltaBefore: bigint;
}
export interface QueryResult {
    totalFound: bigint;
    target: string;
    queryId: string;
    timestamp: bigint;
    items: Array<QueryResultItem>;
    fibFlooredAt: bigint;
    executionCycles: bigint;
}
export interface GradeRecord {
    maxScore: bigint;
    gradedAt: bigint;
    gradedBy: Principal;
    studentPrincipal: Principal;
    feedback: string;
    score: bigint;
    passportSeedId?: bigint;
    assignmentId: bigint;
    submissionId: bigint;
}
export interface Agent {
    id: string;
    name: string;
    role: AgentRole;
    protocols: Array<string>;
    isActive: boolean;
    version: string;
    systemPrompt: string;
    workspace: string;
    registeredAt: bigint;
    engine: string;
}
export interface AdmissionsEvent {
    id: bigint;
    completedAt?: bigint;
    scheduledDate?: bigint;
    notes: string;
    eventType: string;
}
export interface ArchCouncilVoice {
    mathBasis: string;
    voiceId: string;
    answer: string;
    confidence: bigint;
    engine: string;
}
export interface StndStats {
    totalStandards: bigint;
    byFramework: Array<[string, bigint]>;
    byGrade: Array<[bigint, bigint]>;
}
export interface EntanglementRecord {
    id: string;
    status: EntanglementStatus;
    direction: EntanglementDirection;
    targetSubstrate: string;
    name: string;
    coherenceDelta: bigint;
    lastEntanglement: bigint;
    transitCount: bigint;
    sourceSubstrate: string;
}
export interface EnrolledCourse {
    completedModules: Array<bigint>;
    agentsBuilt: Array<string>;
    progressPercent: bigint;
    enrolledAt: Timestamp;
    courseId: string;
}
export interface Topic {
    id: string;
    title: string;
    description: string;
    subjectId: string;
    gradeLevel: string;
}
export interface CareerMilestone {
    id: bigint;
    completedAt?: bigint;
    title: string;
    linkedSubjectId?: bigint;
}
export interface PlseNudge {
    ttl: bigint;
    prompt: string;
}
export interface DigtStatus {
    lastDigested?: bigint;
    conceptCount: bigint;
    quizSeedCount: bigint;
    standardId: string;
    hasContent: boolean;
}
export interface TchrStats {
    recommendationsGenerated: bigint;
    totalClasses: bigint;
    totalStudents: bigint;
}
export interface NexumGateEntry {
    studentId: Principal;
    appliedLaw: string;
    collegium: string;
    enteredAt: bigint;
}
export interface ApiUsageStats {
    rateLimitTier: bigint;
    clientId: string;
    totalCalls: bigint;
    approvedEndpoints: Array<string>;
    lastCall: bigint;
    callsThisMinute: bigint;
}
export interface SelfStudyMilestone {
    completedAt?: bigint;
    title: string;
    domain: string;
    masteryScore: bigint;
    description: string;
    weeksBefore: bigint;
    isComplete: boolean;
}
export interface InterestScore {
    score: bigint;
    surveyDate: bigint;
    cluster: CareerCluster;
}
export interface Course {
    id: string;
    title: string;
    requiredSssThreshold: bigint;
    order: bigint;
    description: string;
    moduleCount: bigint;
    category: string;
}
export interface CommStats {
    byType: Array<[string, bigint]>;
    translationRequestCount: bigint;
    totalMessages: bigint;
    unreadCount: bigint;
}
export interface VisionStats {
    totalStudentsFlagged: bigint;
    achievementsSealed: bigint;
    nominationsSent: bigint;
}
export interface QueryResultItem {
    id: string;
    data: string;
    score: bigint;
}
export interface FundingEntryInput {
    stage: string;
    targetAmount: bigint;
    notes: string;
    contactEmail: string;
    programName: string;
}
export interface SkaiTeachResponse {
    doctrine: string;
    engineSelected: string;
    suggestedNext: string;
    studentWelcome: string;
}
export interface KnowledgeResult {
    subject: string;
    lockedForStudent: boolean;
    topics: Array<Topic>;
    gradeLevel: GradeLevel;
}
export interface SystemMetrics {
    avgPlatformMastery: number;
    totalLessonsCompleted: bigint;
    totalStudents: bigint;
    activeSessions: bigint;
}
export interface ClubMembership {
    clubId: bigint;
    joinedAt: bigint;
    role: ClubRole;
    studentPrincipal: Principal;
    linkedAchvId?: bigint;
    hoursLogged: bigint;
}
export interface AchievementRecord {
    id: string;
    studentId: UserId;
    source: string;
    zone: AchievementZone;
    sealedAt: Timestamp;
    description: string;
    achievementType: AchievementType;
}
export interface PlseState {
    phiHeartbeatInterval: bigint;
    curiosityQueue: Array<PlseNudge>;
    heartbeatCycle: bigint;
    lastAutonSeed: PlseSeed;
}
export interface MessageRef {
    messageId: bigint;
    subject: string;
    read: boolean;
    sentAt: bigint;
}
export interface AllocatorStats {
    utilizationPct: number;
    totalAllocated: bigint;
    blockCount: bigint;
    zoneDistribution: Array<bigint>;
    totalCapacity: bigint;
}
export interface FundingEntry {
    entryId: string;
    stage: FundingStage;
    targetAmount: bigint;
    notes: string;
    timestamp: bigint;
    contactEmail: string;
    programName: string;
}
export interface ScholarshipProgram {
    id: bigint;
    url: string;
    categories: Array<string>;
    name: string;
    deadline?: bigint;
    sponsor: string;
    eligibilityCriteria: Array<string>;
    awardAmount?: bigint;
}
export interface AchievementTimelineEntry {
    eventId: string;
    title: string;
    domain: string;
    year: bigint;
    description: string;
    grade: bigint;
    timestamp: bigint;
    programName: string;
    goldSealed: boolean;
    eventType: string;
}
export interface ClassRoster {
    subjectId: bigint;
    gradeLevel: bigint;
    teacherPrincipal: Principal;
    studentSisIds: Array<SisStudentId>;
    classCode: string;
}
export interface GradeVaultSummary {
    weeklyProgress: Array<WeekProgress>;
    totalStudents: bigint;
    topSubject: string;
    grade: bigint;
    strugglingSubject: string;
    avgMastery: number;
}
export interface TprpStats {
    byMode: Array<[string, bigint]>;
    avgMasteryDelta: bigint;
    totalSessions: bigint;
}
export interface SonrStatus {
    coh: number;
    pil: number;
    status: Variant_quiet_mutaTriggered;
    risk: number;
}
export interface NominationRecord {
    id: string;
    status: NominationStatus;
    studentId: UserId;
    submittedAt: Timestamp;
    teacherNote: string;
    programName: string;
}
export interface LbryStats {
    overdueCount: bigint;
    masteryLinkedCount: bigint;
    totalCheckouts: bigint;
    activeCheckouts: bigint;
}
export interface PortalTransition {
    toPortal: string;
    fromPortal: string;
    userId: string;
    timestamp: bigint;
}
export enum AchievementType {
    PaceAnomaly = "PaceAnomaly",
    PerfectScore = "PerfectScore",
    MasterySeal = "MasterySeal",
    NominationSent = "NominationSent",
    RecognitionFlag = "RecognitionFlag"
}
export enum AchievementZone {
    hot = "hot",
    cold = "cold",
    warm = "warm",
    frozen = "frozen"
}
export enum AdaptiveAction {
    remedialReview = "remedialReview",
    continue_ = "continue",
    quizNow = "quizNow",
    advance = "advance"
}
export enum AgentRole {
    quizmaster = "quizmaster",
    encourager = "encourager",
    explainer = "explainer",
    guide = "guide",
    curator = "curator",
    assessor = "assessor"
}
export enum ApplicationStatus {
    expired = "expired",
    applied = "applied",
    awarded = "awarded",
    matched = "matched",
    declined = "declined",
    interested = "interested"
}
export enum AttendanceStatus {
    tardy = "tardy",
    present = "present",
    absent = "absent",
    excused = "excused"
}
export enum ClubRole {
    member = "member",
    vicePresident = "vicePresident",
    secretary = "secretary",
    treasurer = "treasurer",
    officer = "officer",
    president = "president"
}
export enum CollegeMatchTier {
    safety = "safety",
    target = "target",
    reach = "reach"
}
export enum CollegeReadinessStage {
    preparing = "preparing",
    applying = "applying",
    committed = "committed",
    exploring = "exploring",
    planning = "planning"
}
export enum CourseCategory {
    FFA = "FFA",
    CTE_HEALTH = "CTE_HEALTH",
    CTE_HVAC = "CTE_HVAC",
    UIL_MATH = "UIL_MATH",
    DECA = "DECA",
    HOSA = "HOSA",
    CTE_CONSTRUCTION = "CTE_CONSTRUCTION",
    ACADEMICS = "ACADEMICS",
    CTE_COSMETOLOGY = "CTE_COSMETOLOGY",
    SKILLS_USA = "SKILLS_USA",
    UIL_MUSIC = "UIL_MUSIC",
    CTE_AUTOMOTIVE = "CTE_AUTOMOTIVE",
    CTE_WELDING = "CTE_WELDING",
    UIL_SPEECH = "UIL_SPEECH",
    CTE_ROBOTICS = "CTE_ROBOTICS",
    UIL_ENGLISH = "UIL_ENGLISH",
    UIL_SCIENCE = "UIL_SCIENCE",
    CTE_CULINARY = "CTE_CULINARY"
}
export enum EDDIMode {
    STUDENT_MODE = "STUDENT_MODE",
    ARCHITECT_MODE = "ARCHITECT_MODE",
    RECOGNITION_MODE = "RECOGNITION_MODE",
    TEACHER_MODE = "TEACHER_MODE",
    BUILD_MODE = "BUILD_MODE",
    PRINCIPAL_MODE = "PRINCIPAL_MODE",
    MEMORY_MODE = "MEMORY_MODE"
}
export enum EnrollmentStatus {
    active = "active",
    inactive = "inactive",
    transferred = "transferred",
    graduated = "graduated"
}
export enum EntanglementDirection {
    bidirectional = "bidirectional",
    unidirectional = "unidirectional"
}
export enum EntanglementStatus {
    active = "active",
    dormant = "dormant"
}
export enum FundingStage {
    DECLINED = "DECLINED",
    PENDING = "PENDING",
    IDENTIFIED = "IDENTIFIED",
    APPLIED = "APPLIED",
    AWARDED = "AWARDED"
}
export enum IncidentSeverity {
    major = "major",
    minor = "minor",
    moderate = "moderate"
}
export enum MessageType {
    parentTeacherMessage = "parentTeacherMessage",
    systemNotice = "systemNotice",
    eventInvitation = "eventInvitation",
    alert = "alert",
    announcement = "announcement",
    recognitionAlert = "recognitionAlert",
    progressUpdate = "progressUpdate"
}
export enum MilestoneCategory {
    social = "social",
    academic = "academic",
    postsecondary = "postsecondary",
    career = "career",
    college = "college"
}
export enum NominationStatus {
    submitted = "submitted",
    confirmed = "confirmed",
    draft = "draft"
}
export enum PermissionLevel {
    full = "full",
    readOnly = "readOnly",
    standard = "standard"
}
export enum ProficiencyLevel {
    bridging = "bridging",
    entering = "entering",
    developing = "developing",
    emerging = "emerging",
    expanding = "expanding",
    reaching = "reaching"
}
export enum QuizType {
    freeResponse = "freeResponse",
    multipleChoice = "multipleChoice"
}
export enum RecognitionPattern {
    PaceAnomaly = "PaceAnomaly",
    PerfectScore = "PerfectScore",
    SubjectExcellence = "SubjectExcellence",
    SustainedMastery = "SustainedMastery"
}
export enum SessionMode {
    freeAfternoon = "freeAfternoon",
    workNight = "workNight"
}
export enum SilverBuilderStatus {
    active = "active",
    sealed = "sealed",
    dormant = "dormant"
}
export enum StaffRole {
    STAFF_ADMIN = "STAFF_ADMIN",
    STAFF_SUPPORT = "STAFF_SUPPORT",
    STAFF_COACH = "STAFF_COACH",
    STAFF_COUNSELOR = "STAFF_COUNSELOR",
    STAFF_LIBRARIAN = "STAFF_LIBRARIAN",
    STAFF_IT = "STAFF_IT"
}
export enum SubAccessLevel {
    readOnly = "readOnly",
    limited = "limited"
}
export enum SubmissionStatus {
    graded = "graded",
    submitted = "submitted",
    pending = "pending",
    returned = "returned"
}
export enum TrackId {
    giveAIAVoice = "giveAIAVoice",
    buildFirstAI = "buildFirstAI",
    teachAIToRemember = "teachAIToRemember"
}
export enum TutorType {
    peer = "peer",
    teacher = "teacher"
}
export enum Variant_ok_muta {
    ok = "ok",
    muta = "muta"
}
export enum Variant_quiet_mutaTriggered {
    quiet = "quiet",
    mutaTriggered = "mutaTriggered"
}
export interface backendInterface {
    addAdmissionsEvent(event: AdmissionsEvent): Promise<boolean>;
    addCalendarEvent(event: CalendarEvent): Promise<void>;
    addCollegeToList(entry: CollegeEntry): Promise<boolean>;
    addCounselorMilestone(studentPrincipal: Principal, milestone: CounselorMilestone): Promise<boolean>;
    addFieldTripAttendee(tripId: bigint, p: Principal): Promise<void>;
    addGroupMember(groupId: bigint, member: Principal): Promise<boolean>;
    addScholarshipProgram(program: ScholarshipProgram): Promise<bigint>;
    addSchoolToDistrict(districtId: DistrictId, schoolId: SchoolId): Promise<boolean>;
    addStaffMember(id: string, name: string, role: StaffRole, dept: string, level: bigint): Promise<boolean>;
    addSubHandoffNote(subRecordId: bigint, note: string): Promise<void>;
    advanceTrackStep(trackId: TrackId, artifactName: string | null, now: bigint): Promise<{
        __kind__: "ok";
        ok: TrackEnrollment;
    } | {
        __kind__: "err";
        err: string;
    }>;
    alignContent(alignment: StandardAlignment): Promise<void>;
    approveClient(requestId: string, apiKey: string): Promise<RegistrationResult | null>;
    archiveTripToPassport(tripId: bigint): Promise<void>;
    askAgent(agentRole: string, userMessage: string, topic: string, subject: string, gradeLevel: string, messageIndex: bigint): Promise<string>;
    autoSealFromSession(sessionSummary: string, engineUsed: string, subject: string, gradeLevel: string): Promise<string>;
    chatWithEddi(mode: EDDIMode, message: string, sessionId: string): Promise<{
        nextModeSuggestion?: EDDIMode;
        response: string;
        modeUsed: EDDIMode;
    }>;
    checkGradeAccess(studentGrade: bigint, contentGrade: bigint): Promise<GradeGate>;
    checkOutResource(resourceType: ResourceType, resourceId: string, title: string, dueDate: bigint | null): Promise<bigint>;
    completeModule(courseId: string, moduleIndex: bigint): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    completeSelfStudyMilestone(trackId: string, milestoneIndex: bigint): Promise<boolean>;
    completeTestPrepSession(sessionId: bigint, correct: bigint, attempted: bigint, completedAt: bigint): Promise<boolean>;
    completeTrack(trackId: TrackId, artifactName: string | null, now: bigint): Promise<{
        __kind__: "ok";
        ok: TrackEnrollment;
    } | {
        __kind__: "err";
        err: string;
    }>;
    completeTutoringSession(sessionId: bigint, masteryDeltaAfter: bigint, transcriptHash: Uint8Array | null): Promise<boolean>;
    computeCareerRecommendations(passportMastery: Array<[bigint, bigint]>): Promise<Array<CareerCluster>>;
    computeIAS(sssScore: bigint, cohScore: bigint): Promise<IasResult>;
    computeImpact(schoolCount: bigint, studentsPerSchool: bigint): Promise<ImpactResult>;
    computeScoreProjection(mode: TestPrepMode, computedAt: bigint): Promise<ScoreProjection>;
    computeStudentState(sssPrev: bigint): Promise<LiveIntelligenceState>;
    createAgent(name: string, modeBinding: EDDIMode, reasoningSeed: string, memoryConfig: string): Promise<UserAgent>;
    createAssignment(assignment: Assignment): Promise<bigint>;
    createClass(teacherId: string, name: string, subject: string, gradeLevel: bigint, studentIds: Array<string>): Promise<boolean>;
    createClub(name: string, category: ClubCategory, schoolId: bigint): Promise<bigint>;
    createCounselorPlan(plan: CounselorPlan): Promise<void>;
    createDistrict(name: string, state: string, contactEmail: string, createdAt: bigint): Promise<DistrictId>;
    createFactoryStudent(username: string, gradeLevel: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createFieldTrip(title: string, schoolId: bigint, gradeLevel: bigint, activityDate: bigint, location: string, enrichmentType: EnrichmentType): Promise<bigint>;
    createSelfStudyTrack(title: string, category: string, competitionDate: bigint): Promise<string>;
    createSovereignPassport(studentName: string, gradeLevel: string, collegium: string): Promise<SovereignPassport>;
    createStudentProfile(name: string, gradeLevel: string): Promise<StudentProfile>;
    createSubRecord(coveringTeacherPrincipal: Principal, classCode: string, date: bigint, accessLevel: SubAccessLevel): Promise<bigint>;
    createTutoringSession(session: TutoringSession): Promise<bigint>;
    deactivateAccommodations(studentPrincipal: Principal): Promise<boolean>;
    diagSystem(): Promise<{
        status: Variant_ok_muta;
        pilScore: number;
        errors: Array<string>;
        heartbeatCount: bigint;
        avgCoh: number;
    }>;
    digestCurriculumText(title: string, gradeLevel: bigint, subject: string, rawText: string, teacherId: string): Promise<DigestResult>;
    digestTextbook(title: string, gradeLevel: bigint, subject: string, rawText: string): Promise<DigtDigestResult>;
    dissolveClub(clubId: bigint): Promise<void>;
    dissolveStudyGroup(groupId: bigint): Promise<boolean>;
    drainVaultBuffer(): Promise<Array<Uint8Array>>;
    enrollInCourse(courseId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    enrollInCourseWithStart(courseId: string): Promise<EnrollmentResult>;
    enrollInTrack(trackId: TrackId, now: bigint): Promise<{
        __kind__: "ok";
        ok: TrackEnrollment;
    } | {
        __kind__: "err";
        err: string;
    }>;
    enterNexumGate(collegium: string, now: bigint): Promise<NexumGateEntry>;
    executeQuery(target: string, filters: Array<[string, string, string]>, limit: bigint): Promise<QueryResult>;
    factoryAdminSetup(adminName: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    factoryStatus(): Promise<{
        adminExists: boolean;
        factoryLocked: boolean;
        studentCount: bigint;
    }>;
    fireArchCouncil(queryText: string, domain: string): Promise<MLTVResponse>;
    flagStudentIep(studentPrincipal: Principal): Promise<boolean>;
    formStudyGroup(subjectId: bigint, gradeLevel: bigint, memberPrincipals: Array<Principal>, sssLow: bigint, sssHigh: bigint): Promise<bigint>;
    generateClassHeatmap(classId: string): Promise<ClassHeatmap | null>;
    generateTeacherRecommendations(classId: string): Promise<Array<TeacherRecommendation>>;
    generateVisionDocument(): Promise<VisionDocument>;
    getAccessibleContent(studentGrade: bigint): Promise<Array<GradeVaultEntry>>;
    getAccommodations(studentPrincipal: Principal): Promise<IepAccommodation | null>;
    getAchievementGaps(districtId: DistrictId): Promise<Array<AchievementGapRecord>>;
    getAchievementTimeline(studentId: UserId): Promise<Array<AchievementTimelineEntry>>;
    getAchievements(studentId: UserId): Promise<Array<AchievementRecord>>;
    getAdaptiveSuggestion(subjectId: string): Promise<AdaptiveSuggestion>;
    getAdaptiveWorkflow(subjectId: string, gradeLevel: string): Promise<AdaptiveWorkflow>;
    getAgent(id: string): Promise<Agent | null>;
    getAgents(): Promise<Array<Agent>>;
    getAgentsByEngine(engine: string): Promise<Array<Agent>>;
    getAgentsByProtocol(protocol: string): Promise<Array<Agent>>;
    getAgentsByWorkspace(workspace: string): Promise<Array<Agent>>;
    getAlignments(standardCode: StandardCode): Promise<Array<StandardAlignment>>;
    getAllBuilderStats(): Promise<Array<[string, BuilderStats]>>;
    getAllMoodAggregates(): Promise<Array<MoodAggregate>>;
    getAllRecognitionFlags(): Promise<Array<RecognitionFlag>>;
    getAllSubjects(): Promise<Array<Subject>>;
    getAllocatorStats(): Promise<AllocatorStats>;
    getAnnouncementsBySchool(schoolId: bigint): Promise<Array<CommMessage>>;
    getApiCallLogs(n: bigint): Promise<Array<ApiCallLog>>;
    getApiEndpointById(id: string): Promise<ApiEndpoint | null>;
    getApiEndpoints(): Promise<Array<ApiEndpoint>>;
    getApiEndpointsByDomain(domain: string): Promise<Array<ApiEndpoint>>;
    getApiStats(): Promise<ApiStats>;
    getApiUsageStats(clientId: string): Promise<ApiUsageStats | null>;
    getApiVersions(): Promise<Array<ApiVersion>>;
    getAsgnStats(): Promise<AsgnStats>;
    getAssignment(id: bigint): Promise<Assignment | null>;
    getAssignmentsByClass(classCode: string): Promise<Array<Assignment>>;
    getAttendance(sisId: SisStudentId): Promise<Array<AttendanceRecord>>;
    getBuilderStats(builderId: string): Promise<BuilderStats | null>;
    getCalendarEvents(schoolId: bigint): Promise<Array<CalendarEvent>>;
    getCatalog(): Promise<Array<CatalogCourse>>;
    getCheckoutsByStudent(studentPrincipal: Principal): Promise<Array<LibraryRecord>>;
    getClassAverage(assignmentId: bigint): Promise<bigint>;
    getClassDetail(classId: string): Promise<ClassDetail | null>;
    getClassesByTeacher(teacherId: string): Promise<Array<TeacherClass>>;
    getClassesByTeacherId(teacherId: Principal): Promise<Array<ClassRecord>>;
    getClrdStats(): Promise<ClrdStats>;
    getClubEngagementScore(studentPrincipal: Principal): Promise<bigint>;
    getClubsBySchool(schoolId: bigint): Promise<Array<ClubRecord>>;
    getCommStats(): Promise<CommStats>;
    getCompetitionTemplates(): Promise<Array<CompetitionTemplate>>;
    getConceptsByGrade(grade: bigint): Promise<Array<DigtConcept>>;
    getCounPlanStats(): Promise<CounPlanStats>;
    getCounselorPlan(studentPrincipal: Principal): Promise<CounselorPlan | null>;
    getCourseDetail(courseId: string): Promise<CatalogCourseDetail | null>;
    getCourses(): Promise<Array<CourseSummary>>;
    getCrossSchoolTrends(districtId: DistrictId): Promise<Array<CrossSchoolTrend>>;
    getCrptStats(): Promise<CrptStats>;
    getDemoStudentData(): Promise<{
        sampleSessions: Array<QuizResult>;
        subjects: Array<Subject>;
        samplePassport: SovereignPassport;
    }>;
    getDigestStatus(jobId: string): Promise<DigestStatus | null>;
    getDigtStats(): Promise<DigtStats>;
    getDigtStatusForStandard(standardId: string): Promise<DigtStatus>;
    getDistrict(districtId: DistrictId): Promise<DistrictProfile | null>;
    getDistrictStats(districtId: DistrictId): Promise<DistrictStats>;
    getEddi(): Promise<EDDI>;
    getEddiInsight(): Promise<string>;
    getEddiMode(): Promise<EDDIMode>;
    getEngineByCodeName(name: string): Promise<SovereignEngine | null>;
    getEngineById(id: bigint): Promise<SovereignEngine | null>;
    getEngines(): Promise<Array<SovereignEngine>>;
    getEnrolledCourses(): Promise<Array<EnrolledCourse>>;
    getEntanglementById(id: string): Promise<EntanglementRecord | null>;
    getEntanglementStats(): Promise<{
        totalTransits: bigint;
        avgCoherenceDelta: bigint;
        lastRefresh: bigint;
        activeCount: bigint;
    }>;
    getEntanglements(): Promise<Array<EntanglementRecord>>;
    getEslProfile(studentPrincipal: Principal): Promise<EslProfile | null>;
    getEsllStats(): Promise<EsllStats>;
    getFeedbackEvents(): Promise<Array<FeedbackEvent>>;
    getFieldTripsByGrade(gradeLevel: bigint): Promise<Array<FieldTripRecord>>;
    getFieldTripsBySchool(schoolId: bigint): Promise<Array<FieldTripRecord>>;
    getFluxState(studentId: string): Promise<FluxState>;
    getFtrpStats(): Promise<FtrpStats>;
    getFullPassportStats(): Promise<PassportStats | null>;
    getFundingTracker(): Promise<Array<FundingEntry>>;
    getGradePerformance(gradeLevel: bigint): Promise<Array<GradePerformance>>;
    getGradeVaultContents(grade: bigint): Promise<Array<VaultEntry>>;
    getGradeVaultSummary(grade: bigint): Promise<GradeVaultSummary>;
    getGroupsBySubject(subjectId: bigint): Promise<Array<StudyGroup>>;
    getGvltStats(): Promise<GvltStats>;
    getHeatmapData(): Promise<Array<ClassHeatmapData>>;
    getIesmStats(): Promise<IesmStats>;
    getKernelSeeds(): Promise<Array<KernelSeed>>;
    getKnowledgeByGrade(q: KnowledgeQuery): Promise<Array<KnowledgeResult>>;
    getLawById(id: bigint): Promise<SovereignLaw | null>;
    getLawByLatinName(name: string): Promise<SovereignLaw | null>;
    getLaws(): Promise<Array<SovereignLaw>>;
    getLbryStats(): Promise<LbryStats>;
    getLessonContent(topicId: string, gradeLevel: string, agentRole: string): Promise<{
        title: string;
        practicePrompt: string;
        expansionBlock: string;
        reviewSummary: string;
        introduction: string;
        coreConceptBlock: string;
    }>;
    getLiveIntelligenceState(studentId: UserId): Promise<LiveIntelligenceState>;
    getLiveMetrics(): Promise<LiveMetrics>;
    getLiveSessionMetrics(): Promise<LiveSessionMetrics>;
    getMLTVStats(): Promise<MLTVStats>;
    getMembershipsByStudent(studentPrincipal: Principal): Promise<Array<ClubMembership>>;
    getMessagesForRecipient(ref: RecipientRef): Promise<Array<CommMessage>>;
    getMhckStats(): Promise<{
        schoolsMonitored: bigint;
        totalCheckIns: bigint;
    }>;
    getMoodAggregate(schoolId: bigint): Promise<MoodAggregate | null>;
    getMsryState(studentId: string): Promise<MsryState>;
    getMyCareerPathway(): Promise<CareerPathway | null>;
    getMyClubs(): Promise<Array<ClubMembership>>;
    getMyCollegeReadinessRecord(): Promise<CollegeReadinessRecord | null>;
    getMyEnrollments(): Promise<Array<TrackEnrollment>>;
    getMyFeedback(): Promise<Array<FeedbackEvent>>;
    getMyGateEntries(): Promise<Array<NexumGateEntry>>;
    getMyGrades(): Promise<Array<GradeRecord>>;
    getMyLibraryRecords(): Promise<Array<LibraryRecord>>;
    getMyParentRecord(): Promise<ParentRecord | null>;
    getMyPdGrowthScore(): Promise<bigint>;
    getMyPdHours(): Promise<bigint>;
    getMyPdRecords(): Promise<Array<PdRecord>>;
    getMyScholarshipMatches(): Promise<Array<ScholarshipMatch>>;
    getMyStudyGroups(): Promise<Array<StudyGroup>>;
    getMySubRecords(): Promise<Array<SubRecord>>;
    getMySubmissions(): Promise<Array<Submission>>;
    getMyTestPrepSessions(): Promise<Array<TestPrepSession>>;
    getMyTracks(): Promise<Array<SelfStudyTrack>>;
    getMyTutoringSessions(): Promise<Array<TutoringSession>>;
    getNewScholarshipMatches(studentId: string, sinceTimestamp: bigint): Promise<Array<ScholarshipMatch>>;
    getNominations(studentId: UserId): Promise<Array<NominationRecord>>;
    getNrveState(): Promise<NrveState>;
    getOverdueCheckouts(): Promise<Array<LibraryRecord>>;
    getOwner(): Promise<Principal | null>;
    getParentsByStudent(studentPrincipal: Principal): Promise<Array<ParentRecord>>;
    getPassportInsight(studentId: UserId): Promise<PassportInsight>;
    getPassportSeeds(page: bigint, pageSize: bigint): Promise<Array<KernelSeed>>;
    getPassportStats(): Promise<{
        totalSeeds: bigint;
        totalSessions: bigint;
        lastActive: bigint;
    } | null>;
    getPdGrowthScore(teacherPrincipal: Principal): Promise<bigint>;
    getPdRecordsByTeacher(teacherPrincipal: Principal): Promise<Array<PdRecord>>;
    getPdTotalHours(teacherPrincipal: Principal): Promise<bigint>;
    getPgrpStats(): Promise<PgrpStats>;
    getPlseState(): Promise<PlseState>;
    getPortalTransitions(n: bigint): Promise<Array<PortalTransition>>;
    getPrcpNarrative(): Promise<Array<PrcpNarrativeEntry>>;
    getPrincipalGradeDrilldown(grade: bigint): Promise<GradeDrilldown>;
    getPrincipalHeatmapWithNoms(): Promise<Array<HeatmapWithNoms>>;
    getQueryHistory(): Promise<Array<QueryResult>>;
    getQuizSeedsByGrade(grade: bigint): Promise<Array<DigtQuizSeed>>;
    getRcgnAlerts(): Promise<Array<RcgnAlert>>;
    getRecentMLTVResponses(n: bigint): Promise<Array<MLTVResponse>>;
    getRecognitionFlags(studentId: UserId): Promise<Array<RecognitionFlag>>;
    getRecognitionTimeline(studentId: UserId): Promise<Array<RecognitionTimelineEntry>>;
    getRegistryQuestion(grade: bigint, subject: string): Promise<string>;
    getRoster(classCode: string): Promise<ClassRoster | null>;
    getSchfStats(): Promise<SchfStats>;
    getScholarshipMatches(studentId: string): Promise<Array<ScholarshipMatch>>;
    getSdkEntries(): Promise<Array<SdkEntry>>;
    getSdkEntriesByCategory(category: string): Promise<Array<SdkEntry>>;
    getSdkEntryById(id: string): Promise<SdkEntry | null>;
    getSelfStudyStats(trackId: string): Promise<SelfStudyTrack | null>;
    getSessionCount(): Promise<bigint>;
    getSessionMetrics(): Promise<SessionMetrics>;
    getSessionMode(): Promise<SessionMode>;
    getSessionSchedule(): Promise<SessionSchedule>;
    getSessionsByTutor(tutorRef: string): Promise<Array<TutoringSession>>;
    getSilverBuilderById(id: string): Promise<SilverBuilder | null>;
    getSilverBuilders(): Promise<Array<SilverBuilder>>;
    getSisAttendance(sisId: SisStudentId): Promise<Array<AttendanceRecord>>;
    getSisEnrollments(): Promise<Array<SisRecord>>;
    getSisRecord(sisId: SisStudentId): Promise<SisRecord | null>;
    getSisRosters(): Promise<Array<ClassRoster>>;
    getSisStudentData(sisId: SisStudentId): Promise<SisRecord | null>;
    getSisSyncStatus(): Promise<{
        errorMessage?: string;
        isHealthy: boolean;
        lastSync: bigint;
        nextSync: bigint;
    }>;
    getSkaiDocensInfo(): Promise<SkaiDocensInfo>;
    getSovereignPassport(): Promise<SovereignPassport | null>;
    getStaffActivityLog(staffId: string): Promise<Array<ActivityEntry>>;
    getStaffMember(id: string): Promise<StaffMember | null>;
    getStaffRoster(): Promise<Array<StaffMember>>;
    getStandard(code: StandardCode): Promise<Standard | null>;
    getStandardsByGrade(gradeLevel: bigint): Promise<Array<Standard>>;
    getStandardsBySubject(subject: string): Promise<Array<Standard>>;
    getStandardsWithDigestedContent(gradeLevel: bigint): Promise<Array<StandardWithDigestStatus>>;
    getStndStats(): Promise<StndStats>;
    getStudentCountByGrade(): Promise<Array<GradeCount>>;
    getStudentMasteryCard(studentId: string): Promise<StudentMasteryCard | null>;
    getStudentProfile(): Promise<StudentProfile | null>;
    getStudentQuizResults(): Promise<Array<QuizResult>>;
    getStudentRcgnThreshold(studentId: UserId): Promise<bigint>;
    getSubRecordsByClass(classCode: string): Promise<Array<SubRecord>>;
    getSubRecordsByDate(date: bigint): Promise<Array<SubRecord>>;
    getSubjectTemplates(gradeLevel: GradeLevel): Promise<Array<SubjectTemplate>>;
    getSubjectsByGrade(gradeLevel: string): Promise<Array<Subject>>;
    getSubmissionsByAssignment(assignmentId: bigint): Promise<Array<Submission>>;
    getSubsStats(): Promise<SubsStats>;
    getSystemMetricsSummary(): Promise<SystemMetrics>;
    getTchrStats(): Promise<TchrStats>;
    getTeacherClassMetrics(teacherId: string): Promise<Array<TeacherClassMetrics>>;
    getTopicsBySubject(subjectId: string): Promise<Array<Topic>>;
    getTpdfStats(): Promise<TpdfStats>;
    getTprpStats(): Promise<TprpStats>;
    getTrackById(id: TrackId): Promise<Track | null>;
    getTracks(): Promise<Array<Track>>;
    getTutoringStats(): Promise<{
        total: bigint;
        sealed: bigint;
    }>;
    getUnreadCount(ref: RecipientRef): Promise<bigint>;
    getUserAgents(): Promise<Array<UserAgent>>;
    getVaultCanisterId(): Promise<Principal | null>;
    getVaultStats(): Promise<{
        totalBytesBuffered: bigint;
        lastDrainAt: bigint;
        totalPayloads: bigint;
    }>;
    getVisionDocumentV2(): Promise<VisionDocumentV2>;
    getVisionStats(): Promise<VisionStats>;
    getVisionWithFundingTracker(): Promise<VisionWithFunding>;
    getWorkspaces(): Promise<Array<string>>;
    getXcrrStats(): Promise<XcrrStats>;
    gradeSubmission(gradeRecord: GradeRecord): Promise<bigint>;
    hasAccommodation(studentPrincipal: Principal, accomType: AccommodationType): Promise<boolean>;
    inferEddiMode(hint: string): Promise<EDDIMode>;
    initFactory(adminName: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    isFactoryInitialized(): Promise<boolean>;
    joinClub(clubId: bigint, role: ClubRole): Promise<void>;
    linkClubAchievement(clubId: bigint, studentPrincipal: Principal, achvId: bigint): Promise<void>;
    linkFieldTripPreAssessment(tripId: bigint, assessId: bigint): Promise<void>;
    linkStudentToParent(studentPrincipal: Principal): Promise<boolean>;
    linkToSubject(recordId: bigint, subjectId: bigint): Promise<void>;
    listDigestJobs(): Promise<Array<DigestJob>>;
    listPendingRegistrations(): Promise<Array<RegistrationRequest>>;
    listStaff(): Promise<Array<StaffMember>>;
    logApiCall(callerId: string, endpointId: string, responseTime: bigint, success: boolean): Promise<void>;
    logClubHours(clubId: bigint, studentPrincipal: Principal, hours: bigint): Promise<void>;
    logPdRecord(title: string, pdType: PdType, hoursLogged: bigint, provider: string, certificationEarned: string | null, growthMilestone: GrowthMilestone | null): Promise<bigint>;
    logPortalTransition(from: string, to: string, userId: string): Promise<void>;
    logSubIncident(subRecordId: bigint, description: string, severity: IncidentSeverity): Promise<void>;
    markMessageRead(messageId: bigint): Promise<void>;
    matchStudentToScholarships(achvSummary: Array<string>, matchedAt: bigint): Promise<Array<ScholarshipMatch>>;
    queryEngine(engineId: string, userInput: string, context: string): Promise<string>;
    queryEngineWithPassport(engineId: string, userInput: string, context: string): Promise<{
        seedGenerated: KernelSeed;
        response: string;
    }>;
    recognizeStudent(studentId: UserId, subject: string, score: bigint): Promise<{
        flagCreated: boolean;
        isGold: boolean;
        rcgnT: bigint;
    }>;
    recordAttendance(record: AttendanceRecord): Promise<void>;
    recordCareerExploration(entry: CareerExplorationEntry): Promise<boolean>;
    recordEchoEvent(studentId: string, eventTypeStr: string, value: bigint, duration: bigint): Promise<EchoResult>;
    recordEntanglementTransit(id: string, rawCoherenceDelta: bigint): Promise<void>;
    recordFundingEntry(entry: FundingEntryInput): Promise<FundingEntryResult>;
    recordMissedSession(): Promise<void>;
    recordStudyGroupSession(session: GroupSession): Promise<bigint>;
    registerApiCaller(id: string, name: string, pubKey: string, allowed: Array<string>): Promise<boolean>;
    registerExternalClient(requestId: string, name: string, description: string, requestedEndpoints: Array<string>): Promise<RegistrationRequest>;
    registerParent(displayName: string, contactPrefs: ContactPreferences): Promise<void>;
    registerStandard(standard: Standard): Promise<void>;
    registerVaultContent(contentId: string, contentType: string, gradeLevel: bigint, subject: string, lockedUntilGrade: bigint): Promise<boolean>;
    removeFieldTripAttendee(tripId: bigint, p: Principal): Promise<void>;
    removeGroupMember(groupId: bigint, member: Principal): Promise<boolean>;
    resolveFeedback(eventId: string): Promise<boolean>;
    returnResource(recordId: bigint): Promise<void>;
    runHeartbeat(): Promise<Array<Uint8Array>>;
    runRCGNScan(): Promise<Array<RecognitionFlag>>;
    saveQuizResult(result: QuizResult): Promise<void>;
    saveSessionMode(mode: SessionMode): Promise<void>;
    sealKernelSeed(seed: KernelSeed): Promise<boolean>;
    seedCurriculumIfEmpty(): Promise<string>;
    sendAnnouncement(schoolId: bigint, subject: string, body: string): Promise<bigint>;
    sendCommMessage(recipientRefs: Array<RecipientRef>, subject: string, body: string, messageType: MessageType, translationNeeded: boolean, expiresAt: bigint | null): Promise<bigint>;
    setAccommodations(record: IepAccommodation): Promise<void>;
    setEddiMode(mode: EDDIMode): Promise<void>;
    setEslScaffolding(studentPrincipal: Principal, enabled: boolean): Promise<boolean>;
    setVaultCanisterId(id: Principal): Promise<void>;
    skaiRoute(studentIntent: string, currentEngineId: string, sessionSummary: string): Promise<string>;
    skaiTeach(studentIntent: string): Promise<SkaiTeachResponse>;
    sonrCheck(): Promise<SonrStatus>;
    startTestPrepSession(mode: TestPrepMode, subjectId: bigint, startedAt: bigint): Promise<bigint>;
    submitAssignment(submission: Submission): Promise<bigint>;
    submitFeedback(message: string, severity: string): Promise<string>;
    submitMoodCheckIn(checkIn: MentalHealthCheckIn): Promise<void>;
    submitNomination(studentId: UserId, programName: string, teacherNote: string): Promise<NominationRecord>;
    tickEntanglementCycle(): Promise<void>;
    updateCounselorPlan(studentPrincipal: Principal, updatedPlan: CounselorPlan): Promise<boolean>;
    updateMemberRole(clubId: bigint, studentPrincipal: Principal, role: ClubRole): Promise<void>;
    updateParentPermission(level: PermissionLevel): Promise<boolean>;
    updateReadingProgress(recordId: bigint, progressPct: bigint): Promise<void>;
    updateScholarshipStatus(matchId: bigint, status: ApplicationStatus): Promise<boolean>;
    updateSessionMode(mode: SessionMode): Promise<void>;
    updateStaffRole(staffId: string, newRole: StaffRole): Promise<boolean>;
    updateStudentGrade(gradeLevel: string): Promise<StudentProfile>;
    updateStudentMasteryScore(studentId: string, subject: string, mastery: bigint): Promise<void>;
    upsertCareerPathway(pathway: CareerPathway): Promise<bigint>;
    upsertCollegeReadinessRecord(record: CollegeReadinessRecord): Promise<void>;
    upsertEslProfile(profile: EslProfile): Promise<void>;
    upsertRoster(roster: ClassRoster): Promise<void>;
    upsertSisRecord(record: SisRecord): Promise<void>;
}
