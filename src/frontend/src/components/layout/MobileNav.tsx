import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  Award,
  BookMarked,
  BookOpen,
  BrainCircuit,
  Building2,
  Compass,
  Database,
  Globe,
  GraduationCap,
  Heart,
  LayoutDashboard,
  MessageSquare,
  PieChart,
  School,
  Shield,
  UserCheck,
  Users,
  Wifi,
} from "lucide-react";

export type Portal =
  | "student"
  | "teacher"
  | "principal"
  | "it"
  | "parent"
  | "counselor"
  | "district";

interface NavItem {
  to: string;
  label: string;
  icon: React.ElementType;
  ocid: string;
}

interface MobileNavProps {
  portal: Portal;
  navItems?: NavItem[];
  isActive: (to: string) => boolean;
}

const PORTAL_ACCENT: Record<Portal, string> = {
  student: "text-[oklch(0.78_0.22_200)]",
  teacher: "text-[oklch(0.68_0.18_280)]",
  principal: "text-[oklch(0.75_0.16_70)]",
  it: "text-[oklch(0.72_0.17_155)]",
  parent: "text-[oklch(0.76_0.18_30)]",
  counselor: "text-[oklch(0.74_0.18_320)]",
  district: "text-[oklch(0.70_0.16_240)]",
};

const _PORTAL_PORTAL_ICON: Record<Portal, React.ElementType> = {
  student: GraduationCap,
  teacher: Users,
  principal: Building2,
  it: Shield,
  parent: Heart,
  counselor: UserCheck,
  district: Globe,
};

// Pick the 4 most important nav items for mobile
const MOBILE_NAV_ITEMS: Record<
  Portal,
  { to: string; label: string; icon: React.ElementType; ocid: string }[]
> = {
  student: [
    {
      to: "/dashboard",
      label: "Home",
      icon: LayoutDashboard,
      ocid: "mobile_nav.student.home",
    },
    {
      to: "/learning",
      label: "Learning",
      icon: BookOpen,
      ocid: "mobile_nav.student.learning",
    },
    {
      to: "/subjects",
      label: "Subjects",
      icon: Activity,
      ocid: "mobile_nav.student.subjects",
    },
    {
      to: "/passport",
      label: "Passport",
      icon: BookMarked,
      ocid: "mobile_nav.student.passport",
    },
    {
      to: "/collegium",
      label: "Study",
      icon: BrainCircuit,
      ocid: "mobile_nav.student.study",
    },
    {
      to: "/student/self-study",
      label: "Self-Study",
      icon: Compass,
      ocid: "mobile_nav.student.selfstudy",
    },
  ],
  teacher: [
    {
      to: "/teacher",
      label: "Dashboard",
      icon: LayoutDashboard,
      ocid: "mobile_nav.teacher.home",
    },
    {
      to: "/teacher/classes",
      label: "Classes",
      icon: Users,
      ocid: "mobile_nav.teacher.classes",
    },
    {
      to: "/teacher/grades",
      label: "Grades",
      icon: Database,
      ocid: "mobile_nav.teacher.grades",
    },
    {
      to: "/teacher/lessons",
      label: "Lessons",
      icon: BookOpen,
      ocid: "mobile_nav.teacher.lessons",
    },
    {
      to: "/teacher/progress",
      label: "Progress",
      icon: Activity,
      ocid: "mobile_nav.teacher.progress",
    },
  ],
  principal: [
    {
      to: "/principal",
      label: "Dashboard",
      icon: LayoutDashboard,
      ocid: "mobile_nav.principal.home",
    },
    {
      to: "/principal/heatmap",
      label: "Heatmap",
      icon: Activity,
      ocid: "mobile_nav.principal.heatmap",
    },
    {
      to: "/principal/staff",
      label: "Staff",
      icon: Users,
      ocid: "mobile_nav.principal.staff",
    },
    {
      to: "/principal/reports",
      label: "Reports",
      icon: BookOpen,
      ocid: "mobile_nav.principal.reports",
    },
    {
      to: "/principal/analytics",
      label: "Analytics",
      icon: Building2,
      ocid: "mobile_nav.principal.analytics",
    },
  ],
  it: [
    {
      to: "/it-security",
      label: "Dashboard",
      icon: LayoutDashboard,
      ocid: "mobile_nav.it.home",
    },
    {
      to: "/it/network",
      label: "Network",
      icon: Wifi,
      ocid: "mobile_nav.it.network",
    },
    {
      to: "/it/audit",
      label: "Audit",
      icon: Database,
      ocid: "mobile_nav.it.audit",
    },
    {
      to: "/it/engines",
      label: "Engines",
      icon: Activity,
      ocid: "mobile_nav.it.engines",
    },
    { to: "/it/apix", label: "APIX", icon: Shield, ocid: "mobile_nav.it.apix" },
  ],
  parent: [
    {
      to: "/parent",
      label: "Dashboard",
      icon: LayoutDashboard,
      ocid: "mobile_nav.parent.home",
    },
    {
      to: "/parent/children",
      label: "Children",
      icon: Users,
      ocid: "mobile_nav.parent.children",
    },
    {
      to: "/parent/progress",
      label: "Progress",
      icon: Activity,
      ocid: "mobile_nav.parent.progress",
    },
    {
      to: "/parent/messages",
      label: "Messages",
      icon: MessageSquare,
      ocid: "mobile_nav.parent.messages",
    },
    {
      to: "/parent/achievements",
      label: "Awards",
      icon: Award,
      ocid: "mobile_nav.parent.achievements",
    },
  ],
  counselor: [
    {
      to: "/counselor",
      label: "Dashboard",
      icon: LayoutDashboard,
      ocid: "mobile_nav.counselor.home",
    },
    {
      to: "/counselor/students",
      label: "Students",
      icon: Users,
      ocid: "mobile_nav.counselor.students",
    },
    {
      to: "/counselor/college-planning",
      label: "College",
      icon: School,
      ocid: "mobile_nav.counselor.college",
    },
    {
      to: "/counselor/career",
      label: "Careers",
      icon: Compass,
      ocid: "mobile_nav.counselor.career",
    },
    {
      to: "/counselor/mental-health",
      label: "Wellness",
      icon: Heart,
      ocid: "mobile_nav.counselor.mental_health",
    },
  ],
  district: [
    {
      to: "/district",
      label: "Dashboard",
      icon: LayoutDashboard,
      ocid: "mobile_nav.district.home",
    },
    {
      to: "/district/schools",
      label: "Schools",
      icon: School,
      ocid: "mobile_nav.district.schools",
    },
    {
      to: "/district/analytics",
      label: "Analytics",
      icon: PieChart,
      ocid: "mobile_nav.district.analytics",
    },
    {
      to: "/district/staff",
      label: "Staff",
      icon: UserCheck,
      ocid: "mobile_nav.district.staff",
    },
    {
      to: "/district/compliance",
      label: "Compliance",
      icon: Globe,
      ocid: "mobile_nav.district.compliance",
    },
  ],
};

export function MobileNav({ portal, isActive }: MobileNavProps) {
  const accent = PORTAL_ACCENT[portal];
  const items = MOBILE_NAV_ITEMS[portal];

  return (
    <nav
      aria-label="Mobile navigation"
      data-ocid="mobile_nav.bar"
      className="md:hidden fixed bottom-0 inset-x-0 z-50"
      style={{
        backdropFilter: "blur(20px) saturate(200%)",
        WebkitBackdropFilter: "blur(20px) saturate(200%)",
        background: "rgba(8,6,20,0.92)",
        borderTop: "1px solid rgba(255,255,255,0.10)",
      }}
    >
      <div
        className="flex items-stretch"
        style={{
          minHeight: 64,
          paddingBottom: "max(env(safe-area-inset-bottom, 0px), 4px)",
        }}
      >
        {items.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to);
          return (
            <Link
              key={item.ocid}
              to={item.to as never}
              data-ocid={item.ocid}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 px-1 transition-all duration-150 min-w-0 relative touch-target",
                "min-h-[44px]",
                active
                  ? cn(accent, "opacity-100")
                  : "text-white/35 hover:text-white/60",
              )}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform duration-150",
                  active && "scale-110",
                )}
              />
              <span className="text-[9px] font-mono font-semibold uppercase tracking-wider truncate max-w-full leading-none">
                {item.label}
              </span>
              {active && (
                <span
                  className="absolute bottom-0 h-0.5 w-8 rounded-full"
                  style={{
                    background:
                      portal === "student"
                        ? "oklch(0.78 0.22 200)"
                        : portal === "teacher"
                          ? "oklch(0.68 0.18 280)"
                          : portal === "principal"
                            ? "oklch(0.75 0.16 70)"
                            : portal === "parent"
                              ? "oklch(0.76 0.18 30)"
                              : portal === "counselor"
                                ? "oklch(0.74 0.18 320)"
                                : portal === "district"
                                  ? "oklch(0.70 0.16 240)"
                                  : "oklch(0.72 0.17 155)",
                  }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
