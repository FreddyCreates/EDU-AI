import { FeedbackPanel } from "@/components/FeedbackPanel";
import {
  PortalTransitionOverlay,
  usePortalTransition,
} from "@/components/PortalTransitionOverlay";
import { MobileNav } from "@/components/layout/MobileNav";
import type { Portal } from "@/components/layout/MobileNav";
import { GoldCelebrationOverlay } from "@/components/recognition/GoldCelebrationOverlay";
import { useIntelligence } from "@/context/IntelligenceContext";
import { cn } from "@/lib/utils";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Award,
  BookMarked,
  BookOpen,
  BrainCircuit,
  Building2,
  ClipboardList,
  Code2,
  Compass,
  Cpu,
  Database,
  Globe,
  GraduationCap,
  Heart,
  Layers,
  LayoutDashboard,
  Lightbulb,
  LogIn,
  LogOut,
  MessageSquare,
  Network,
  PieChart,
  RefreshCw,
  Scale,
  School,
  Server,
  Shield,
  Star,
  TerminalSquare,
  User,
  UserCheck,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const PORTAL_CONFIG = {
  student: {
    label: "Student",
    color: "oklch(0.78 0.22 200)",
    glow: "var(--student-glow)",
    border: "var(--student-border)",
    glassClass: "glass-portal-student",
    glowClass: "glow-student",
    icon: GraduationCap,
    accent: "text-[oklch(0.78_0.22_200)]",
    activeBg: "bg-[oklch(0.78_0.22_200/0.12)]",
    dot: "bg-[oklch(0.78_0.22_200)]",
  },
  teacher: {
    label: "Teacher",
    color: "oklch(0.68 0.18 280)",
    glow: "var(--teacher-glow)",
    border: "var(--teacher-border)",
    glassClass: "glass-portal-teacher",
    glowClass: "glow-teacher",
    icon: Users,
    accent: "text-[oklch(0.68_0.18_280)]",
    activeBg: "bg-[oklch(0.68_0.18_280/0.12)]",
    dot: "bg-[oklch(0.68_0.18_280)]",
  },
  principal: {
    label: "Principal",
    color: "oklch(0.75 0.16 70)",
    glow: "var(--principal-glow)",
    border: "var(--principal-border)",
    glassClass: "glass-portal-principal",
    glowClass: "glow-principal",
    icon: Building2,
    accent: "text-[oklch(0.75_0.16_70)]",
    activeBg: "bg-[oklch(0.75_0.16_70/0.12)]",
    dot: "bg-[oklch(0.75_0.16_70)]",
  },
  it: {
    label: "IT / Security",
    color: "oklch(0.72 0.17 155)",
    glow: "var(--it-glow)",
    border: "var(--it-border)",
    glassClass: "glass-portal-it",
    glowClass: "glow-it",
    icon: Shield,
    accent: "text-[oklch(0.72_0.17_155)]",
    activeBg: "bg-[oklch(0.72_0.17_155/0.12)]",
    dot: "bg-[oklch(0.72_0.17_155)]",
  },
  parent: {
    label: "Parent",
    color: "oklch(0.76 0.18 30)",
    glow: "oklch(0.76 0.18 30 / 0.4)",
    border: "oklch(0.76 0.18 30 / 0.3)",
    glassClass: "glass-portal-parent",
    glowClass: "glow-parent",
    icon: Heart,
    accent: "text-[oklch(0.76_0.18_30)]",
    activeBg: "bg-[oklch(0.76_0.18_30/0.12)]",
    dot: "bg-[oklch(0.76_0.18_30)]",
  },
  counselor: {
    label: "Counselor",
    color: "oklch(0.74 0.18 320)",
    glow: "oklch(0.74 0.18 320 / 0.4)",
    border: "oklch(0.74 0.18 320 / 0.3)",
    glassClass: "glass-portal-counselor",
    glowClass: "glow-counselor",
    icon: UserCheck,
    accent: "text-[oklch(0.74_0.18_320)]",
    activeBg: "bg-[oklch(0.74_0.18_320/0.12)]",
    dot: "bg-[oklch(0.74_0.18_320)]",
  },
  district: {
    label: "District",
    color: "oklch(0.70 0.16 240)",
    glow: "oklch(0.70 0.16 240 / 0.4)",
    border: "oklch(0.70 0.16 240 / 0.3)",
    glassClass: "glass-portal-district",
    glowClass: "glow-district",
    icon: Globe,
    accent: "text-[oklch(0.70_0.16_240)]",
    activeBg: "bg-[oklch(0.70_0.16_240/0.12)]",
    dot: "bg-[oklch(0.70_0.16_240)]",
  },
} satisfies Record<
  Portal,
  {
    label: string;
    color: string;
    glow: string;
    border: string;
    glassClass: string;
    glowClass: string;
    icon: React.ElementType;
    accent: string;
    activeBg: string;
    dot: string;
  }
>;

const PORTAL_DISPLAY_ORDER: Portal[] = [
  "student",
  "teacher",
  "principal",
  "it",
  "parent",
  "counselor",
  "district",
];

const NAV_SECTIONS: Record<
  Portal,
  { to: string; label: string; icon: React.ElementType; ocid: string }[]
> = {
  student: [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      ocid: "nav.student_dashboard_link",
    },
    {
      to: "/learning",
      label: "My Learning",
      icon: BookOpen,
      ocid: "nav.student_learning_link",
    },
    {
      to: "/subjects",
      label: "Subjects",
      icon: Layers,
      ocid: "nav.student_subjects_link",
    },
    {
      to: "/passport",
      label: "Passport",
      icon: BookMarked,
      ocid: "nav.student_passport_link",
    },
    {
      to: "/collegium",
      label: "Study Session",
      icon: BrainCircuit,
      ocid: "nav.student_study_link",
    },
    {
      to: "/student/agents",
      label: "Agents",
      icon: User,
      ocid: "nav.student_agents_link",
    },
    {
      to: "/student/test-prep",
      label: "Test Prep",
      icon: ClipboardList,
      ocid: "nav.student_test_prep_link",
    },
    {
      to: "/student/career",
      label: "Career Explorer",
      icon: Compass,
      ocid: "nav.student_career_link",
    },
    {
      to: "/student/scholarships",
      label: "Scholarship Finder",
      icon: Award,
      ocid: "nav.student_scholarships_link",
    },
    {
      to: "/student/college",
      label: "College Readiness",
      icon: School,
      ocid: "nav.student_college_link",
    },
    {
      to: "/student/mental-health",
      label: "Mental Health",
      icon: Heart,
      ocid: "nav.student_mental_health_link",
    },
    {
      to: "/student/tutoring",
      label: "Tutoring",
      icon: MessageSquare,
      ocid: "nav.student_tutoring_link",
    },
    {
      to: "/student/self-study",
      label: "Self-Study",
      icon: Star,
      ocid: "nav.student_self_study_link",
    },
    {
      to: "/student/knowledge",
      label: "Knowledge Browser",
      icon: Globe,
      ocid: "nav.student_knowledge_link",
    },
    {
      to: "/student/scaffold",
      label: "Scaffold Support",
      icon: Lightbulb,
      ocid: "nav.student_scaffold_link",
    },
    {
      to: "/student/feedback-loops",
      label: "Feedback Loops",
      icon: RefreshCw,
      ocid: "nav.student_feedback_loops_link",
    },
  ],
  teacher: [
    {
      to: "/teacher",
      label: "Dashboard",
      icon: LayoutDashboard,
      ocid: "nav.teacher_dashboard_link",
    },
    {
      to: "/teacher/classes",
      label: "My Classes",
      icon: Users,
      ocid: "nav.teacher_classes_link",
    },
    {
      to: "/teacher/grades",
      label: "Grade Vault",
      icon: Database,
      ocid: "nav.teacher_grades_link",
    },
    {
      to: "/teacher/lessons",
      label: "Lesson Builder",
      icon: BookOpen,
      ocid: "nav.teacher_lessons_link",
    },
    {
      to: "/teacher/progress",
      label: "Student Progress",
      icon: Activity,
      ocid: "nav.teacher_progress_link",
    },
    {
      to: "/admin/digester",
      label: "DIGT Upload",
      icon: Zap,
      ocid: "nav.teacher_digt_link",
    },
    {
      to: "/teacher/assignments",
      label: "Assignments",
      icon: ClipboardList,
      ocid: "nav.teacher_assignments_link",
    },
    {
      to: "/teacher/study-groups",
      label: "Study Groups",
      icon: Users,
      ocid: "nav.teacher_study_groups_link",
    },
    {
      to: "/teacher/protocols",
      label: "Protocols",
      icon: Layers,
      ocid: "nav.teacher_protocols_link",
    },
    {
      to: "/teacher/recognition",
      label: "Recognition",
      icon: Award,
      ocid: "nav.teacher_recognition_link",
    },
  ],
  principal: [
    {
      to: "/principal",
      label: "Dashboard",
      icon: LayoutDashboard,
      ocid: "nav.principal_dashboard_link",
    },
    {
      to: "/principal/heatmap",
      label: "Live Heatmap",
      icon: Activity,
      ocid: "nav.principal_heatmap_link",
    },
    {
      to: "/principal/staff",
      label: "Staff Overview",
      icon: Users,
      ocid: "nav.principal_staff_link",
    },
    {
      to: "/principal/reports",
      label: "Grade Reports",
      icon: BookOpen,
      ocid: "nav.principal_reports_link",
    },
    {
      to: "/principal/analytics",
      label: "School Analytics",
      icon: Network,
      ocid: "nav.principal_analytics_link",
    },
    {
      to: "/principal/registry",
      label: "Registry",
      icon: Cpu,
      ocid: "nav.principal_registry_link",
    },
  ],
  it: [
    {
      to: "/it-security",
      label: "Dashboard",
      icon: LayoutDashboard,
      ocid: "nav.it_dashboard_link",
    },
    {
      to: "/it/network",
      label: "Network Status",
      icon: Wifi,
      ocid: "nav.it_network_link",
    },
    {
      to: "/it/audit",
      label: "Audit Log",
      icon: Database,
      ocid: "nav.it_audit_link",
    },
    {
      to: "/it/apix",
      label: "APIX Gateway",
      icon: TerminalSquare,
      ocid: "nav.it_apix_link",
    },
    {
      to: "/it/engines",
      label: "Engine Monitor",
      icon: Server,
      ocid: "nav.it_engines_link",
    },
    {
      to: "/engines",
      label: "Engine Registry",
      icon: Cpu,
      ocid: "nav.it_engine_registry_link",
    },
  ],
  parent: [
    {
      to: "/parent",
      label: "Dashboard",
      icon: LayoutDashboard,
      ocid: "nav.parent_dashboard_link",
    },
    {
      to: "/parent/children",
      label: "My Children",
      icon: Users,
      ocid: "nav.parent_children_link",
    },
    {
      to: "/parent/progress",
      label: "Progress Reports",
      icon: Activity,
      ocid: "nav.parent_progress_link",
    },
    {
      to: "/parent/messages",
      label: "Messages",
      icon: MessageSquare,
      ocid: "nav.parent_messages_link",
    },
    {
      to: "/parent/attendance",
      label: "Attendance",
      icon: BookMarked,
      ocid: "nav.parent_attendance_link",
    },
    {
      to: "/parent/achievements",
      label: "Achievements",
      icon: Award,
      ocid: "nav.parent_achievements_link",
    },
  ],
  counselor: [
    {
      to: "/counselor",
      label: "Dashboard",
      icon: LayoutDashboard,
      ocid: "nav.counselor_dashboard_link",
    },
    {
      to: "/counselor/students",
      label: "Student Caseload",
      icon: Users,
      ocid: "nav.counselor_students_link",
    },
    {
      to: "/counselor/college-planning",
      label: "College Planning",
      icon: School,
      ocid: "nav.counselor_college_link",
    },
    {
      to: "/counselor/career",
      label: "Career Pathways",
      icon: Compass,
      ocid: "nav.counselor_career_link",
    },
    {
      to: "/counselor/mental-health",
      label: "Mental Health",
      icon: Heart,
      ocid: "nav.counselor_mental_health_link",
    },
    {
      to: "/counselor/scholarships",
      label: "Scholarships",
      icon: Award,
      ocid: "nav.counselor_scholarships_link",
    },
  ],
  district: [
    {
      to: "/district",
      label: "Dashboard",
      icon: LayoutDashboard,
      ocid: "nav.district_dashboard_link",
    },
    {
      to: "/district/schools",
      label: "Schools",
      icon: School,
      ocid: "nav.district_schools_link",
    },
    {
      to: "/district/analytics",
      label: "District Analytics",
      icon: PieChart,
      ocid: "nav.district_analytics_link",
    },
    {
      to: "/district/staff",
      label: "Staff Management",
      icon: UserCheck,
      ocid: "nav.district_staff_link",
    },
    {
      to: "/district/curriculum",
      label: "Curriculum",
      icon: BookOpen,
      ocid: "nav.district_curriculum_link",
    },
    {
      to: "/district/compliance",
      label: "Compliance",
      icon: Scale,
      ocid: "nav.district_compliance_link",
    },
  ],
};

function detectPortal(path: string): Portal {
  if (path.startsWith("/teacher")) return "teacher";
  if (path.startsWith("/principal")) return "principal";
  if (path.startsWith("/it")) return "it";
  if (path.startsWith("/parent")) return "parent";
  if (path.startsWith("/counselor")) return "counselor";
  if (path.startsWith("/district")) return "district";
  if (path.startsWith("/student")) return "student";
  if (path.startsWith("/learning")) return "student";
  if (path.startsWith("/subjects")) return "student";
  if (path.startsWith("/passport")) return "student";
  if (path.startsWith("/collegium")) return "student";
  return "student";
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, login, clear } = useInternetIdentity();
  const { layoutState, isGoldMoment } = useIntelligence();
  const router = useRouterState();
  const currentPath = router.location.pathname;

  // Public pages have their own standalone layouts — skip the shell
  const isPublicPage = currentPath === "/" || currentPath === "/vision";
  const autoPortal = detectPortal(currentPath) as Exclude<Portal, "builder">;

  const {
    portal: activePortal,
    isTransitioning,
    pendingPortal,
    switchPortal,
    handleTransitionComplete,
  } = usePortalTransition(autoPortal);

  if (isPublicPage) return <>{children}</>;

  const portal = PORTAL_CONFIG[activePortal];
  const navItems = NAV_SECTIONS[activePortal];

  const isActive = (to: string) => {
    if (
      to === "/dashboard" ||
      to === "/teacher" ||
      to === "/principal" ||
      to === "/it-security"
    ) {
      return currentPath === to;
    }
    return currentPath.startsWith(to) && to !== "/";
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* ── Portal transition overlay ── */}
      <PortalTransitionOverlay
        portal={pendingPortal ?? activePortal}
        isTransitioning={isTransitioning}
        onComplete={handleTransitionComplete}
      />

      {/* ── Sidebar ── */}
      <aside
        data-ocid="layout.sidebar"
        className="hidden md:flex fixed inset-y-0 left-0 z-40 w-[233px] flex-col glass-xl border-r border-r-white/5 glass-shimmer transition-glass"
      >
        {/* Brand strip */}
        <div className="flex h-[55px] items-center gap-3 px-[21px] border-b border-white/5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0 bg-primary/15 border border-primary/30"
            style={{ boxShadow: `0 0 12px ${portal.glow}` }}
          >
            <GraduationCap className="h-4 w-4 text-primary" />
          </div>
          <Link
            to="/dashboard"
            className="flex flex-col leading-none"
            data-ocid="nav.brand_link"
          >
            <span className="font-display font-extrabold text-foreground text-base tracking-tight">
              Edu<span className="text-primary">AI</span>
            </span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-widest">
              Sovereign Platform
            </span>
          </Link>
        </div>

        {/* Portal switcher — all 4 portals always visible */}
        <div className="px-3 py-3 border-b border-white/5">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-2 mb-2">
            Portals
          </p>
          <div className="grid grid-cols-2 gap-1">
            {PORTAL_DISPLAY_ORDER.map((p) => {
              const cfg = PORTAL_CONFIG[p];
              const Icon = cfg.icon;
              const isSelected = activePortal === p;
              return (
                <button
                  key={p}
                  type="button"
                  data-ocid={`nav.portal_switch.${p}`}
                  onClick={() => switchPortal(p)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-xl px-2 py-2.5 text-[11px] font-medium transition-smooth border relative overflow-hidden",
                    isSelected
                      ? cn(
                          cfg.activeBg,
                          cfg.accent,
                          "border-white/10 shadow-sm",
                        )
                      : "text-muted-foreground hover:text-foreground border-transparent hover:border-white/5 hover:bg-white/5",
                  )}
                  style={
                    isSelected
                      ? { boxShadow: `0 0 16px ${cfg.glow}` }
                      : undefined
                  }
                >
                  {isSelected && (
                    <motion.span
                      layoutId="portal-active-bg"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: cfg.activeBg
                          .replace("bg-[", "")
                          .replace("]", ""),
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 40,
                      }}
                    />
                  )}
                  <Icon className="h-3 w-3 shrink-0 relative z-10" />
                  <span className="truncate relative z-10">{cfg.label}</span>
                  {isSelected && (
                    <motion.span
                      layoutId="portal-dot"
                      className={cn(
                        "ml-auto h-1.5 w-1.5 rounded-full shrink-0 relative z-10",
                        cfg.dot,
                      )}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 40,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main nav */}
        <nav
          className="flex-1 overflow-y-auto px-3 py-3"
          aria-label={`${portal.label} navigation`}
        >
          <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-2 mb-2">
            {portal.label} Menu
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={activePortal}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="flex flex-col gap-0.5"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.ocid}
                    to={item.to as never}
                    data-ocid={item.ocid}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-smooth relative",
                      active
                        ? cn(
                            portal.activeBg,
                            portal.accent,
                            "border border-white/10",
                          )
                        : "text-muted-foreground hover:text-foreground hover:bg-white/5 border border-transparent",
                    )}
                    style={
                      active
                        ? { boxShadow: `0 0 12px ${portal.glow}` }
                        : undefined
                    }
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="flex-1">{item.label}</span>
                    {active && (
                      <motion.span
                        layoutId={`nav-indicator-${activePortal}`}
                        className={cn(
                          "h-1.5 w-1.5 rounded-full shrink-0",
                          portal.dot,
                        )}
                      />
                    )}
                  </Link>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Builder system tools — always accessible */}
          <div className="mt-4">
            <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-2 mb-2">
              System
            </p>
            <Link
              to="/engines"
              data-ocid="nav.system_engines_link"
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-smooth border border-transparent",
                isActive("/engines")
                  ? "bg-primary/10 text-primary border-white/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5",
              )}
            >
              <Server className="h-3.5 w-3.5 shrink-0" />
              <span>Engines</span>
            </Link>
            <Link
              to="/laws"
              data-ocid="nav.system_laws_link"
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-smooth border border-transparent",
                isActive("/laws")
                  ? "bg-primary/10 text-primary border-white/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5",
              )}
            >
              <Scale className="h-3.5 w-3.5 shrink-0" />
              <span>Sovereign Laws</span>
            </Link>
          </div>
        </nav>

        {/* Status strip */}
        <div className="border-t border-white/5 px-3 py-3">
          {/* Auth state */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 mb-2 px-1">
              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-3 w-3 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground flex-1 truncate">
                Logged in
              </span>
              <button
                type="button"
                data-ocid="nav.logout_button"
                onClick={() => clear()}
                className="text-muted-foreground hover:text-destructive transition-smooth p-1 rounded"
                aria-label="Sign out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              data-ocid="nav.login_button"
              onClick={() => login()}
              className="flex items-center gap-2 w-full rounded-xl px-3 py-2 text-sm font-medium mb-2 glass-sm border-primary/20 text-primary hover:border-primary/40 transition-smooth"
            >
              <LogIn className="h-3.5 w-3.5" />
              Sign In
            </button>
          )}

          {/* System health indicators */}
          <div className="glass-sm rounded-xl px-3 py-2 space-y-1.5 animate-pulse-fib-8">
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-[oklch(0.72_0.17_155)]" />
              <span className="text-[10px] text-muted-foreground flex-1">
                CORE
              </span>
              <span className="text-[9px] text-[oklch(0.72_0.17_155)] font-mono">
                LIVE
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.17_155)] animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-3 w-3 text-[oklch(0.62_0.20_260)]" />
              <span className="text-[10px] text-muted-foreground flex-1">
                PHI ENGINE
              </span>
              <span className="text-[9px] text-[oklch(0.62_0.20_260)] font-mono">
                φ
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full bg-[oklch(0.62_0.20_260)] animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          </div>

          {/* Branding */}
          <p className="text-[9px] text-muted-foreground/40 text-center mt-2">
            © {new Date().getFullYear()}{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              className="hover:text-muted-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </aside>

      {/* ── Mobile Bottom Nav ── */}
      <MobileNav
        portal={activePortal}
        navItems={navItems}
        isActive={isActive}
      />

      {/* ── Main content ── */}
      <div className="flex flex-1 flex-col w-full min-w-0 md:pl-[233px]">
        {/* Top bar */}
        <header
          data-ocid="layout.topbar"
          className="sticky top-0 z-30 h-[55px] flex items-center justify-between px-[21px] glass-max border-b border-white/5"
        >
          <div className="flex items-center gap-3">
            {/* Animated portal identity badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePortal}
                initial={{ opacity: 0, scale: 0.9, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 4 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium glass-sm min-h-0",
                  portal.accent,
                )}
                style={{
                  borderColor: portal.border,
                  boxShadow: `0 0 16px ${portal.glow}`,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{
                    background: portal.color,
                    boxShadow: `0 0 8px ${portal.glow}`,
                  }}
                />
                {portal.label} Portal
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            {!isAuthenticated && (
              <button
                type="button"
                data-ocid="nav.topbar_login_button"
                onClick={() => login()}
                className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium glass-sm text-primary border-primary/25 hover:border-primary/40 transition-smooth"
              >
                <LogIn className="h-3.5 w-3.5" />
                Sign In
              </button>
            )}
          </div>
        </header>

        {/* Page content */}
        <main
          className={cn(
            "flex-1 overflow-x-hidden pb-20 md:pb-0 w-full",
            layoutState,
          )}
        >
          {isGoldMoment && <GoldCelebrationOverlay />}
          {children} <FeedbackPanel />
        </main>
      </div>
    </div>
  );
}
