// Re-export backend types with frontend-friendly extensions
export type {
  StudentProfile,
  Agent,
  Subject,
  Topic,
  QuizResult,
  PassportStats,
  AdaptiveWorkflow,
  BuilderStats,
  SonrStatus,
} from "@/backend";
export {
  AgentRole,
  QuizType,
  AdaptiveAction,
  Variant_ok_muta,
  Variant_quiet_mutaTriggered,
} from "@/backend";

export interface AgentMeta {
  id: string;
  name: string;
  role: import("@/backend").AgentRole;
  emoji: string;
  tagline: string;
  color: string;
  coherenceScore?: number;
  sessionCount?: bigint;
}

export interface SubjectMeta {
  id: string;
  name: string;
  gradeLevel: string;
  emoji: string;
}

export interface StudySession {
  subjectId: string;
  topicId: string;
  agentId: string;
}
export interface SilverBuilderMeta {
  id: string;
  codeName: string;
  domain: string;
  purpose: string;
  domainsOwned: string[];
  status: import("@/backend").SilverBuilderStatus;
  protocol: string;
}

export interface AdaptiveSuggestionMeta {
  action: string;
  message: string;
}

export interface DemoStudentData {
  subjects: import("@/backend").Subject[];
  samplePassport: import("@/backend").SovereignPassport;
  sampleSessions: import("@/backend").QuizResult[];
}

// Lesson content types (matches backend getLessonContent response)
export interface QuizQuestion {
  question: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonContent {
  title: string;
  introduction: string;
  coreConceptBlock: string;
  expansionBlock: string;
  practicePrompt: string;
  quizQuestion: QuizQuestion | null;
  reviewSummary: string;
}

// SKAI teach response (matches backend SkaiTeachResponse)
export interface SkaiTeachResponseMeta {
  step: number;
  doctrineStatement: string;
  buildPrompt: string;
  nextSeedHint: string;
  engineAssigned: string;
}

// Collegium info
export interface CollegiumInfo {
  name: string;
  description: string;
  college: string;
  track: string;
  enrolledCount: number;
  activeStudents: number;
}

// Factory status
export interface FactoryStatus {
  adminExists: boolean;
  factoryLocked: boolean;
  studentCount: bigint;
}

// Diag result
export interface DiagResult {
  status: "ok" | "muta";
  errors: string[];
  pilScore: number;
  avgCoh: number;
  heartbeatCount: bigint;
}

// ─── District & SIS ──────────────────────────────────────────────
export interface DistrictProfile {
  id: string;
  name: string;
  state: string;
  schoolCount: number;
  totalEnrollment: number;
  masteryAverage: number;
  achievementGapScore: number;
  lastUpdated: string;
}

export interface SisRecord {
  studentId: string;
  sisId: string;
  enrollmentDate: string;
  status: "active" | "inactive" | "transferred" | "graduated";
  gradeLevel: number;
  homeroom: string;
  schoolId: string;
}

export interface AttendanceRecord {
  studentId: string;
  date: string;
  status: "present" | "absent" | "tardy" | "excused";
  periodsMissed: number;
  note?: string;
}

export interface ClassRoster {
  classId: string;
  className: string;
  teacherId: string;
  subject: string;
  gradeLevel: number;
  period: string;
  studentIds: string[];
  term: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "assessment" | "holiday" | "meeting" | "deadline" | "event";
  description?: string;
  allDay: boolean;
}

export interface Standard {
  code: string;
  description: string;
  subject: string;
  gradeLevel: number;
  domain: string;
  masteryRate?: number;
}

// ─── Parent Portal ───────────────────────────────────────────────
export interface ParentRecord {
  parentId: string;
  name: string;
  email: string;
  phone?: string;
  studentIds: string[];
  preferredContact: "email" | "phone" | "app";
  language: string;
}

// ─── Counselor Portal ────────────────────────────────────────────
export interface CounselorPlan {
  planId: string;
  studentId: string;
  counselorId: string;
  type: "iep" | "504" | "esl" | "career" | "college" | "general";
  goals: string[];
  milestones: CounselorMilestone[];
  nextReview: string;
  status: "active" | "completed" | "pending";
}

export interface CounselorMilestone {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
  notes?: string;
}

export interface IepAccommodation {
  id: string;
  studentId: string;
  type:
    | "extended_time"
    | "reduced_assignments"
    | "preferential_seating"
    | "assistive_tech"
    | "other";
  description: string;
  startDate: string;
  reviewDate: string;
  active: boolean;
}

export interface EslProfile {
  studentId: string;
  proficiencyLevel: "beginner" | "intermediate" | "advanced" | "proficient";
  homeLanguage: string;
  yearsInProgram: number;
  assessmentScore: number;
  targetProficiency: "intermediate" | "advanced" | "proficient";
}

// ─── Test Prep & College Readiness ───────────────────────────────
export interface TestPrepSession {
  sessionId: string;
  studentId: string;
  testType: "STAAR" | "SAT" | "ACT" | "PSAT" | "AP";
  subject: string;
  practiceScore: number;
  targetScore: number;
  date: string;
  duration: number;
  questionsAttempted: number;
  questionsCorrect: number;
}

export interface ScoreProjection {
  testType: "STAAR" | "SAT" | "ACT" | "PSAT" | "AP";
  currentScore: number;
  projectedScore: number;
  targetScore: number;
  confidence: number;
  sessionsToTarget: number;
}

export interface CareerPathway {
  id: string;
  title: string;
  cluster: string;
  description: string;
  requiredCourses: string[];
  averageSalary: number;
  growthRate: number;
  relatedCareers: string[];
  matchScore?: number;
}

export interface ScholarshipMatch {
  id: string;
  name: string;
  organization: string;
  amount: number;
  deadline: string;
  eligibilityCriteria: string[];
  matchScore: number;
  applicationStatus:
    | "not_started"
    | "in_progress"
    | "submitted"
    | "awarded"
    | "denied";
  url?: string;
}

export interface CollegeReadinessRecord {
  studentId: string;
  gpa: number;
  apCourses: string[];
  ibCourses: string[];
  satScore?: number;
  actScore?: number;
  extracurriculars: string[];
  readinessStage:
    | "exploring"
    | "preparing"
    | "applying"
    | "deciding"
    | "enrolled";
  targetColleges: string[];
  firstGeneration: boolean;
}

// ─── Mental Health & Wellness ─────────────────────────────────────
export interface MentalHealthCheckIn {
  sessionId: string;
  moodScore: number;
  note?: string;
  timestamp: string;
  anonymous: true;
}

export interface MoodAggregate {
  weekLabel: string;
  averageMood: number;
  checkInCount: number;
  trend: "improving" | "stable" | "declining";
}

// ─── Tutoring & Study Groups ──────────────────────────────────────
export interface TutoringSession {
  sessionId: string;
  studentId: string;
  tutorId: string;
  type: "peer" | "teacher" | "ai";
  subject: string;
  date: string;
  duration: number;
  topics: string[];
  rating?: number;
  notes?: string;
}

export interface StudyGroup {
  groupId: string;
  name: string;
  subject: string;
  memberIds: string[];
  sssRange: [number, number];
  sessionLogs: StudyGroupSession[];
  createdAt: string;
  active: boolean;
}

export interface StudyGroupSession {
  date: string;
  duration: number;
  topics: string[];
  attendees: string[];
}

// ─── Assignments & Grades ─────────────────────────────────────────
export interface Assignment {
  assignmentId: string;
  classId: string;
  teacherId: string;
  title: string;
  description: string;
  dueDate: string;
  type: "homework" | "quiz" | "test" | "project" | "essay";
  totalPoints: number;
  standards: string[];
  published: boolean;
}

export interface Submission {
  submissionId: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  status: "draft" | "submitted" | "graded" | "returned";
  score?: number;
  feedback?: string;
  attachments: string[];
}

export interface GradeRecord {
  studentId: string;
  classId: string;
  term: string;
  grade: string;
  percentage: number;
  assignments: number;
  completed: number;
  masteryLevel: number;
}

// ─── Professional Development & Staff ────────────────────────────
export interface PdRecord {
  pdId: string;
  staffId: string;
  title: string;
  provider: string;
  date: string;
  hours: number;
  category:
    | "curriculum"
    | "technology"
    | "equity"
    | "leadership"
    | "compliance";
  completed: boolean;
  certificateUrl?: string;
}

export interface SubRecord {
  subId: string;
  date: string;
  classId: string;
  substituteId: string;
  teacherId: string;
  confirmed: boolean;
  notes?: string;
}

// ─── School Programs ──────────────────────────────────────────────
export interface FieldTripRecord {
  tripId: string;
  title: string;
  date: string;
  destination: string;
  classIds: string[];
  chaperones: string[];
  educationalObjective: string;
  status: "planned" | "approved" | "completed" | "cancelled";
}

export interface LibraryRecord {
  recordId: string;
  studentId: string;
  bookTitle: string;
  author: string;
  checkedOutDate: string;
  dueDate: string;
  returnedDate?: string;
  status: "active" | "overdue" | "returned";
}

export interface ClubRecord {
  clubId: string;
  name: string;
  sponsor: string;
  description: string;
  meetingSchedule: string;
  memberCount: number;
  active: boolean;
}

export interface ClubMembership {
  membershipId: string;
  studentId: string;
  clubId: string;
  role: "member" | "officer" | "president";
  joinDate: string;
  active: boolean;
}

export interface CommMessage {
  messageId: string;
  fromId: string;
  fromName: string;
  fromRole: "teacher" | "admin" | "counselor" | "parent" | "system";
  toIds: string[];
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  priority: "normal" | "urgent" | "announcement";
}
