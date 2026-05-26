import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/sonner";
import { IntelligenceProvider } from "@/context/IntelligenceContext";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Suspense, lazy } from "react";

// Lazy-load pages
const OnboardingPage = lazy(() => import("@/pages/Onboarding"));
const DashboardPage = lazy(() => import("@/pages/Dashboard"));
const StudyPage = lazy(() => import("@/pages/Study"));
const AdminPage = lazy(() => import("@/pages/Admin"));
const AgentRegistryPage = lazy(() => import("@/pages/AgentRegistry"));
const AgentPage = lazy(() => import("@/pages/AgentPage"));
const LawRegistryPage = lazy(() => import("@/pages/LawRegistry"));
const EngineRegistryPage = lazy(() => import("@/pages/EngineRegistry"));
const SdkRegistryPage = lazy(() => import("@/pages/SdkRegistry"));
const EnginePageComponent = lazy(() => import("@/pages/EnginePage"));
const CollegiumPage = lazy(() => import("@/pages/Collegium"));
const CourseDetailPage = lazy(() => import("@/pages/CourseDetail"));
const PassportPage = lazy(() => import("@/pages/Passport"));
const SkaiDocensPage = lazy(() => import("@/pages/SkaiDocens"));
const DemoPage = lazy(() => import("@/pages/Demo"));
const FactorySetupPage = lazy(() => import("@/pages/FactorySetup"));
const BuilderRegistryPage = lazy(() => import("@/pages/BuilderRegistry"));
const EntanglementMonitorPage = lazy(
  () => import("@/pages/EntanglementMonitor"),
);
const LandingPage = lazy(() => import("@/pages/Landing"));
const VisionPage = lazy(() => import("@/pages/Vision"));
const RecognitionPage = lazy(() => import("@/pages/Recognition"));
const NominationsPage = lazy(() => import("@/pages/Nominations"));
const AchievementsPage = lazy(() => import("@/pages/Achievements"));
const RecognitionTimelinePage = lazy(
  () => import("@/pages/RecognitionTimeline"),
);

const SelfStudyPage = lazy(() => import("@/pages/SelfStudy"));
const AchievementTimelinePage = lazy(
  () => import("@/pages/AchievementTimeline"),
);

// Terminal pages - school kiosk entry points
const TerminalHubPage = lazy(() => import("@/pages/terminals/TerminalHub"));
const StudentTerminalPage = lazy(() => import("@/pages/terminals/StudentTerminal"));
const StaffTerminalPage = lazy(() => import("@/pages/terminals/StaffTerminal"));
const AdminTerminalPage = lazy(() => import("@/pages/terminals/AdminTerminal"));
const ExternalTerminalPage = lazy(() => import("@/pages/terminals/ExternalTerminal"));

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense
        fallback={
          <div className="p-fib-21 space-y-fib-13">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        }
      >
        {/* Outlet rendered by child routes */}
        <RouterOutlet />
      </Suspense>
    </Layout>
  ),
});

// We need the Outlet for TanStack Router v1
function RouterOutlet() {
  const { location } = useRouterState();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{ minHeight: "100%" }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
}

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const visionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/vision",
  component: VisionPage,
});

const recognitionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/recognition",
  component: RecognitionPage,
});

const nominationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nominations",
  component: NominationsPage,
});

const achievementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/achievements",
  component: AchievementsPage,
});

const recognitionTimelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/recognition-timeline",
  component: RecognitionTimelinePage,
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: OnboardingPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const studyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/study/$subjectId/$topicId",
  component: StudyPage,
});

const studySubjectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/study/$subjectId",
  component: StudyPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const agentRegistryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/agents",
  component: AgentRegistryPage,
});
const agentsPublicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/agents",
  component: AgentRegistryPage,
});
const agentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/agents/$agentName",
  component: AgentPage,
});

const lawRegistryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/laws",
  component: LawRegistryPage,
});

const lawsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/laws",
  component: LawRegistryPage,
});

const collegiumRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collegium",
  component: CollegiumPage,
});

const courseDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/collegium/$courseId",
  component: CourseDetailPage,
});

const passportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/passport",
  component: PassportPage,
});

const skaiRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/skai",
  component: SkaiDocensPage,
});

const engineRegistryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/engines",
  component: EngineRegistryPage,
});

const enginePageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/engines/$engineId",
  component: EnginePageComponent,
});

const sdkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sdk",
  component: SdkRegistryPage,
});

const adminSdkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/sdk",
  component: SdkRegistryPage,
});
const demoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/demo",
  component: DemoPage,
});

const factorySetupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/factory-setup",
  component: FactorySetupPage,
});

const builderRegistryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/builders",
  component: BuilderRegistryPage,
});

const entanglementsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/entanglements",
  component: EntanglementMonitorPage,
});

// New portal lazy imports — Parent, Counselor, District
const ParentDashboard = lazy(() => import("@/pages/parent/ParentDashboard"));
const ParentProgress = lazy(() => import("@/pages/parent/ParentProgress"));
const ParentAttendance = lazy(() => import("@/pages/parent/ParentAttendance"));
const ParentMessages = lazy(() => import("@/pages/parent/ParentMessages"));
const ParentReports = lazy(() => import("@/pages/parent/ParentReports"));

const CounselorDashboard = lazy(
  () => import("@/pages/counselor/CounselorDashboard"),
);
const CounselorStudents = lazy(
  () => import("@/pages/counselor/CounselorStudents"),
);
const CounselorPlans = lazy(() => import("@/pages/counselor/CounselorPlans"));
const CounselorCareer = lazy(() => import("@/pages/counselor/CounselorCareer"));
const CounselorCollege = lazy(
  () => import("@/pages/counselor/CounselorCollege"),
);

const DistrictDashboard = lazy(
  () => import("@/pages/district/DistrictDashboard"),
);
const DistrictSchools = lazy(() => import("@/pages/district/DistrictSchools"));
const DistrictAnalytics = lazy(
  () => import("@/pages/district/DistrictAnalytics"),
);
const DistrictGaps = lazy(() => import("@/pages/district/DistrictGaps"));
const DistrictReports = lazy(() => import("@/pages/district/DistrictReports"));

// New student feature pages
const StudentTestPrep = lazy(() => import("@/pages/student/TestPrep"));
const StudentCareerExplorer = lazy(
  () => import("@/pages/student/CareerExplorer"),
);
const StudentScholarshipFinder = lazy(
  () => import("@/pages/student/ScholarshipFinder"),
);
const StudentCollegeReadiness = lazy(
  () => import("@/pages/student/CollegeReadiness"),
);
const StudentMentalHealth = lazy(
  () => import("@/pages/student/MentalHealthCheckIn"),
);
const StudentTutoring = lazy(() => import("@/pages/student/TutoringSession"));

// New teacher feature pages
const TeacherAssignments = lazy(() => import("@/pages/teacher/Assignments"));
const TeacherStudyGroups = lazy(() => import("@/pages/teacher/StudyGroups"));
const TeacherRecognitionPage = lazy(
  () => import("@/pages/teacher/TeacherRecognition"),
);

// Knowledge & STMP pages
const StudentKnowledgeBrowserPage = lazy(
  () => import("@/pages/student/StudentKnowledgeBrowser"),
);

// Portal sub-pages
const TeacherClasses = lazy(() => import("@/pages/TeacherClasses"));
const TeacherClassDetail = lazy(() => import("@/pages/TeacherClassDetail"));
const PrincipalGradeDrilldown = lazy(
  () => import("@/pages/PrincipalGradeDrilldown"),
);
const ITNetworkStatus = lazy(() => import("@/pages/ITNetworkStatus"));
const ITAuditLog = lazy(() => import("@/pages/ITAuditLog"));

const ArchCouncilMonitorPage = lazy(() => import("@/pages/ArchCouncilMonitor"));
const ApiExplorerPage = lazy(() => import("@/pages/ApiExplorer"));
const DigtAdminPageLazy = lazy(() => import("@/pages/DigtAdmin"));
const TeacherDashboardLazy = lazy(() => import("@/pages/TeacherDashboard"));
const PrincipalDashboardLazy = lazy(() => import("@/pages/PrincipalDashboard"));
const PrincipalHeatmapLazy = lazy(() => import("@/pages/PrincipalHeatmap"));
const ITSecurityPanelLazy = lazy(() => import("@/pages/ITSecurityPanel"));

// New portal sub-pages (wave 2)
const StudentLearningPage = lazy(() => import("@/pages/StudentLearning"));
const StudentSubjectsPage = lazy(() => import("@/pages/StudentSubjects"));
const StudentAgentsPage = lazy(() => import("@/pages/StudentAgents"));
const TeacherGradeVaultPage = lazy(() => import("@/pages/TeacherGradeVault"));
const TeacherLessonBuilderPage = lazy(
  () => import("@/pages/TeacherLessonBuilder"),
);
const TeacherStudentProgressPage = lazy(
  () => import("@/pages/TeacherStudentProgress"),
);
const PrincipalStaffOverviewPage = lazy(
  () => import("@/pages/PrincipalStaffOverview"),
);
const PrincipalGradeReportsPage = lazy(
  () => import("@/pages/PrincipalGradeReports"),
);
const PrincipalSchoolAnalyticsPage = lazy(
  () => import("@/pages/PrincipalSchoolAnalytics"),
);
const PrincipalRegistryPage = lazy(() => import("@/pages/PrincipalRegistry"));
const ITApixGatewayPage = lazy(() => import("@/pages/ITApixGateway"));
const ITEngineMonitorPage = lazy(() => import("@/pages/ITEngineMonitor"));
const ITPortalPage = lazy(() => import("@/pages/ITPortal"));

// New feature pages - Phase 1 & 2
// Student features
const StudentHomeworkTracker = lazy(() => import("@/pages/student/HomeworkTracker"));
const StudentStudyPlanner = lazy(() => import("@/pages/student/StudyPlanner"));
const StudentPeerCollaboration = lazy(() => import("@/pages/student/PeerCollaboration"));
const StudentProgressJournal = lazy(() => import("@/pages/student/ProgressJournal"));

// Teacher features
const TeacherGradebook = lazy(() => import("@/pages/teacher/Gradebook"));
const TeacherAttendanceTracker = lazy(() => import("@/pages/teacher/AttendanceTracker"));
const TeacherCommunicationCenter = lazy(() => import("@/pages/teacher/CommunicationCenter"));
const TeacherResourceLibrary = lazy(() => import("@/pages/teacher/ResourceLibrary"));

// IT features
const ITUserManagement = lazy(() => import("@/pages/it/UserManagement"));
const ITSystemAlerts = lazy(() => import("@/pages/it/SystemAlerts"));
const ITDataBackup = lazy(() => import("@/pages/it/DataBackup"));
const ITIntegrationHub = lazy(() => import("@/pages/it/IntegrationHub"));

// Nova Forge - Phase 3-4
const NovaForgeDashboard = lazy(() => import("@/pages/NovaForgeDashboard"));

// Parent portal routes
const parentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/parent",
  component: ParentDashboard,
});
const parentDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/parent/dashboard",
  component: ParentDashboard,
});
const parentProgressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/parent/progress",
  component: ParentProgress,
});
const parentAttendanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/parent/attendance",
  component: ParentAttendance,
});
const parentMessagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/parent/messages",
  component: ParentMessages,
});
const parentReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/parent/reports",
  component: ParentReports,
});

// Counselor portal routes
const counselorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/counselor",
  component: CounselorDashboard,
});
const counselorDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/counselor/dashboard",
  component: CounselorDashboard,
});
const counselorStudentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/counselor/students",
  component: CounselorStudents,
});
const counselorPlansRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/counselor/plans",
  component: CounselorPlans,
});
const counselorCareerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/counselor/career",
  component: CounselorCareer,
});
const counselorCollegeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/counselor/college",
  component: CounselorCollege,
});

// District portal routes
const districtRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/district",
  component: DistrictDashboard,
});
const districtDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/district/dashboard",
  component: DistrictDashboard,
});
const districtSchoolsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/district/schools",
  component: DistrictSchools,
});
const districtAnalyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/district/analytics",
  component: DistrictAnalytics,
});
const districtGapsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/district/gaps",
  component: DistrictGaps,
});
const districtReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/district/reports",
  component: DistrictReports,
});

// Terminal routes - school kiosk entry points
const terminalsHubRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terminals",
  component: TerminalHubPage,
});

const studentTerminalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terminal/student",
  component: StudentTerminalPage,
});

const staffTerminalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terminal/staff",
  component: StaffTerminalPage,
});

const adminTerminalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terminal/admin",
  component: AdminTerminalPage,
});

const externalTerminalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terminal/external",
  component: ExternalTerminalPage,
});

// New student feature routes
const studentTestPrepRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/test-prep",
  component: StudentTestPrep,
});
const studentCareerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/career",
  component: StudentCareerExplorer,
});
const studentScholarshipsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/scholarships",
  component: StudentScholarshipFinder,
});
const studentCollegeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/college",
  component: StudentCollegeReadiness,
});
const studentMentalHealthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/mental-health",
  component: StudentMentalHealth,
});
const studentTutoringRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/tutoring",
  component: StudentTutoring,
});

// New teacher feature routes
const teacherAssignmentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher/assignments",
  component: TeacherAssignments,
});
const teacherStudyGroupsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher/study-groups",
  component: TeacherStudyGroups,
});
const teacherRecognitionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher/recognition",
  component: TeacherRecognitionPage,
});

const studentSelfStudyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/self-study",
  component: SelfStudyPage,
});

const achievementTimelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/achievement-timeline",
  component: AchievementTimelinePage,
});

// Knowledge browser route (student-facing sovereign content)
const studentKnowledgeBrowserRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/knowledge",
  component: StudentKnowledgeBrowserPage,
});

const digtAdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/digester",
  component: DigtAdminPageLazy,
});

const archCouncilRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/arch-council",
  component: ArchCouncilMonitorPage,
});

const apiExplorerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/api-explorer",
  component: ApiExplorerPage,
});

const teacherRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher",
  component: TeacherDashboardLazy,
});

const principalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/principal",
  component: PrincipalDashboardLazy,
});

const itSecurityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/it-security",
  component: ITSecurityPanelLazy,
});

const teacherClassesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher/classes",
  component: TeacherClasses,
});

const teacherClassDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher/class/$classId",
  component: TeacherClassDetail,
});

const principalGradeDrilldownRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/principal/grade/$grade",
  component: PrincipalGradeDrilldown,
});

const itNetworkStatusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/it/network",
  component: ITNetworkStatus,
});

const itAuditLogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/it/audit",
  component: ITAuditLog,
});

// Wave-2 student routes
const studentLearningRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/learning",
  component: StudentLearningPage,
});

const studentSubjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/subjects",
  component: StudentSubjectsPage,
});

const studentAgentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/agents",
  component: StudentAgentsPage,
});

// Wave-2 teacher routes
const teacherGradeVaultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher/grades",
  component: TeacherGradeVaultPage,
});

const teacherLessonBuilderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher/lessons",
  component: TeacherLessonBuilderPage,
});

const teacherStudentProgressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher/progress",
  component: TeacherStudentProgressPage,
});

// Wave-2 principal routes
const principalStaffRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/principal/staff",
  component: PrincipalStaffOverviewPage,
});

const principalReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/principal/reports",
  component: PrincipalGradeReportsPage,
});

const principalAnalyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/principal/analytics",
  component: PrincipalSchoolAnalyticsPage,
});

const principalRegistryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/principal/registry",
  component: PrincipalRegistryPage,
});

const principalHeatmapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/principal/heatmap",
  component: PrincipalHeatmapLazy,
});

// Wave-2 IT routes
const itApixRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/it/apix",
  component: ITApixGatewayPage,
});

const itEnginesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/it/engines",
  component: ITEngineMonitorPage,
});

const itPortalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/it/portal",
  component: ITPortalPage,
});

// New student feature routes - Phase 1 & 2
const studentHomeworkRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/homework",
  component: StudentHomeworkTracker,
});

const studentPlannerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/planner",
  component: StudentStudyPlanner,
});

const studentCollaborationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/collaboration",
  component: StudentPeerCollaboration,
});

const studentJournalRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/student/journal",
  component: StudentProgressJournal,
});

// New teacher feature routes - Phase 1 & 2
const teacherGradebookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher/gradebook",
  component: TeacherGradebook,
});

const teacherAttendanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher/attendance",
  component: TeacherAttendanceTracker,
});

const teacherMessagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher/messages",
  component: TeacherCommunicationCenter,
});

const teacherResourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/teacher/resources",
  component: TeacherResourceLibrary,
});

// New IT feature routes - Phase 1 & 2
const itUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/it/users",
  component: ITUserManagement,
});

const itAlertsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/it/alerts",
  component: ITSystemAlerts,
});

const itBackupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/it/backup",
  component: ITDataBackup,
});

const itIntegrationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/it/integrations",
  component: ITIntegrationHub,
});

// Nova Forge routes - Phase 3-4
const novaForgeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/nova-forge",
  component: NovaForgeDashboard,
});

const novaForgeDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/nova-forge",
  component: NovaForgeDashboard,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  visionRoute,
  recognitionRoute,
  nominationsRoute,
  achievementsRoute,
  recognitionTimelineRoute,
  onboardingRoute,
  dashboardRoute,
  studyRoute,
  studySubjectRoute,
  adminRoute,
  agentRegistryRoute,
  agentsPublicRoute,
  agentRoute,
  lawRegistryRoute,
  lawsRoute,
  engineRegistryRoute,
  enginePageRoute,
  collegiumRoute,
  courseDetailRoute,
  passportRoute,
  skaiRoute,
  sdkRoute,
  adminSdkRoute,
  demoRoute,
  factorySetupRoute,
  builderRegistryRoute,
  entanglementsRoute,
  archCouncilRoute,
  apiExplorerRoute,
  digtAdminRoute,
  teacherRoute,
  teacherClassesRoute,
  teacherClassDetailRoute,
  principalRoute,
  principalGradeDrilldownRoute,
  itSecurityRoute,
  itNetworkStatusRoute,
  itAuditLogRoute,
  // Wave-2 routes
  studentLearningRoute,
  studentSubjectsRoute,
  studentAgentsRoute,
  teacherGradeVaultRoute,
  teacherLessonBuilderRoute,
  teacherStudentProgressRoute,
  principalStaffRoute,
  principalReportsRoute,
  principalAnalyticsRoute,
  principalRegistryRoute,
  principalHeatmapRoute,
  itApixRoute,
  itEnginesRoute,
  itPortalRoute,
  // Parent portal
  parentRoute,
  parentDashboardRoute,
  parentProgressRoute,
  parentAttendanceRoute,
  parentMessagesRoute,
  parentReportsRoute,
  // Counselor portal
  counselorRoute,
  counselorDashboardRoute,
  counselorStudentsRoute,
  counselorPlansRoute,
  counselorCareerRoute,
  counselorCollegeRoute,
  // District portal
  districtRoute,
  districtDashboardRoute,
  districtSchoolsRoute,
  districtAnalyticsRoute,
  districtGapsRoute,
  districtReportsRoute,
  // New student features
  studentTestPrepRoute,
  studentCareerRoute,
  studentScholarshipsRoute,
  studentCollegeRoute,
  studentMentalHealthRoute,
  studentTutoringRoute,
  // New teacher features
  teacherAssignmentsRoute,
  teacherStudyGroupsRoute,
  teacherRecognitionRoute,
  // Knowledge routes
  studentKnowledgeBrowserRoute,
  // Self-study
  studentSelfStudyRoute,
  // Achievement timeline
  achievementTimelineRoute,
  // Terminal routes
  terminalsHubRoute,
  studentTerminalRoute,
  staffTerminalRoute,
  adminTerminalRoute,
  externalTerminalRoute,
  // New feature routes - Phase 1 & 2
  // Student features
  studentHomeworkRoute,
  studentPlannerRoute,
  studentCollaborationRoute,
  studentJournalRoute,
  // Teacher features
  teacherGradebookRoute,
  teacherAttendanceRoute,
  teacherMessagesRoute,
  teacherResourcesRoute,
  // IT features
  itUsersRoute,
  itAlertsRoute,
  itBackupRoute,
  itIntegrationsRoute,
  // Nova Forge - Phase 3-4
  novaForgeRoute,
  novaForgeDashboardRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <IntelligenceProvider>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </IntelligenceProvider>
  );
}
