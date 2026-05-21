import { StaffRole } from "@/backend";
import { Badge } from "@/components/ui/badge";
import {
  useStaffActivityLog,
  useStaffRoster,
  useUpdateStaffRole,
} from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import {
  Award,
  BookOpen,
  CheckCircle,
  Edit2,
  GraduationCap,
  Mail,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const AMBER = "oklch(0.75 0.16 70)";

type StaffType = "teacher" | "it" | "admin" | "counselor" | "support";

const STAFF: {
  name: string;
  role: string;
  grade: string;
  students: number;
  mastery: number;
  type: StaffType;
}[] = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Mathematics",
    grade: "9–12",
    students: 87,
    mastery: 82,
    type: "teacher",
  },
  {
    name: "James Okonkwo",
    role: "Science & Biology",
    grade: "6–8",
    students: 94,
    mastery: 79,
    type: "teacher",
  },
  {
    name: "Maria Santos",
    role: "English Language Arts",
    grade: "K–5",
    students: 112,
    mastery: 91,
    type: "teacher",
  },
  {
    name: "Robert Chen",
    role: "History & Gov",
    grade: "10–12",
    students: 73,
    mastery: 85,
    type: "teacher",
  },
  {
    name: "Angela Reyes",
    role: "IT Coordinator",
    grade: "All",
    students: 0,
    mastery: 0,
    type: "it",
  },
  {
    name: "David Williams",
    role: "Curriculum Admin",
    grade: "All",
    students: 0,
    mastery: 0,
    type: "admin",
  },
  {
    name: "Patricia Monroe",
    role: "School Counselor",
    grade: "K–12",
    students: 0,
    mastery: 0,
    type: "counselor",
  },
  {
    name: "Kevin Park",
    role: "Student Support Lead",
    grade: "All",
    students: 0,
    mastery: 0,
    type: "support",
  },
];

const TYPE_STYLE: Record<
  StaffType,
  { label: string; color: string; bg: string }
> = {
  teacher: {
    label: "Teacher",
    color: "oklch(0.68 0.18 280)",
    bg: "rgba(160,100,255,0.1)",
  },
  it: {
    label: "IT Staff",
    color: "oklch(0.72 0.17 155)",
    bg: "rgba(0,220,130,0.1)",
  },
  admin: { label: "Admin", color: AMBER, bg: "rgba(255,185,0,0.1)" },
  counselor: {
    label: "Counselor",
    color: "oklch(0.75 0.20 330)",
    bg: "rgba(255,100,220,0.1)",
  },
  support: {
    label: "Support",
    color: "oklch(0.72 0.17 200)",
    bg: "rgba(0,210,255,0.1)",
  },
};

type FilterTab = "ALL" | Uppercase<StaffType>;
const FILTER_TABS: FilterTab[] = [
  "ALL",
  "TEACHER",
  "IT",
  "ADMIN",
  "COUNSELOR",
  "SUPPORT",
];

function ActivityLog({ staffId }: { staffId: string }) {
  const { data: log = [] } = useStaffActivityLog(staffId);
  if (log.length === 0)
    return (
      <p className="text-xs text-muted-foreground px-4 py-2">
        No recent activity recorded.
      </p>
    );
  return (
    <div className="px-4 py-2 space-y-1">
      {log.slice(0, 5).map((entry, i) => (
        <div
          key={`activity-${entry.timestamp ?? i}`}
          className="flex items-start gap-2 text-xs"
        >
          <span className="font-mono text-muted-foreground shrink-0">
            {new Date(Number(entry.timestamp) / 1_000_000).toLocaleTimeString()}
          </span>
          <span className="text-foreground/70">
            <span className="font-semibold text-foreground/90">
              {entry.action}
            </span>
            {entry.details ? ` — ${entry.details}` : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

function roleLabel(role: StaffRole): string {
  switch (role) {
    case StaffRole.STAFF_ADMIN:
      return "Admin";
    case StaffRole.STAFF_IT:
      return "IT Staff";
    case StaffRole.STAFF_COUNSELOR:
      return "Counselor";
    case StaffRole.STAFF_SUPPORT:
      return "Support";
    case StaffRole.STAFF_COACH:
      return "Coach";
    case StaffRole.STAFF_LIBRARIAN:
      return "Librarian";
    default:
      return "Staff";
  }
}

export default function PrincipalStaffOverview() {
  const [activeTab, setActiveTab] = useState<FilterTab>("ALL");
  const [expandedStaffId, setExpandedStaffId] = useState<string | null>(null);
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [roleSuccess, setRoleSuccess] = useState<string | null>(null);
  const { data: staffList = [] } = useStaffRoster();
  const updateRole = useUpdateStaffRole();

  function handleRoleUpdate(staffId: string, newRole: StaffRole) {
    updateRole.mutate(
      { staffId, newRole },
      {
        onSuccess: () => {
          setRoleSuccess(staffId);
          setEditingRole(null);
          setTimeout(() => setRoleSuccess(null), 3000);
        },
      },
    );
  }

  // Merge live roster with static fallback
  const displayStaff =
    staffList.length > 0
      ? staffList.map((s) => ({
          name: s.name,
          role: roleLabel(s.role),
          grade: s.department,
          students: 0,
          mastery: 0,
          type: (s.role === StaffRole.STAFF_IT
            ? "it"
            : s.role === StaffRole.STAFF_ADMIN
              ? "admin"
              : s.role === StaffRole.STAFF_COUNSELOR
                ? "counselor"
                : s.role === StaffRole.STAFF_SUPPORT
                  ? "support"
                  : "teacher") as StaffType,
          staffId: s.staffId,
          accessLevel: Number(s.accessLevel),
          lastActive: Number(s.lastActive),
          backendRole: s.role,
        }))
      : STAFF.map((s, i) => ({
          ...s,
          staffId: `static-${i}`,
          accessLevel: 0,
          lastActive: 0,
          backendRole: StaffRole.STAFF_ADMIN,
        }));

  const filtered =
    activeTab === "ALL"
      ? displayStaff
      : displayStaff.filter((p) => p.type.toUpperCase() === activeTab);

  const counts: Record<FilterTab, number> = {
    ALL: displayStaff.length,
    TEACHER: displayStaff.filter((p) => p.type === "teacher").length,
    IT: displayStaff.filter((p) => p.type === "it").length,
    ADMIN: displayStaff.filter((p) => p.type === "admin").length,
    COUNSELOR: displayStaff.filter((p) => p.type === "counselor").length,
    SUPPORT: displayStaff.filter((p) => p.type === "support").length,
  };

  const teacherCount = counts.TEACHER;
  const avgMastery = displayStaff
    .filter((s) => s.mastery > 0)
    .reduce((sum, s, _, arr) => sum + s.mastery / arr.length, 0);

  return (
    <div className="p-[21px] space-y-[21px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Staff Overview
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            All non-student facing roles, activity logs, and role management
          </p>
        </div>
        <Badge
          className="glass-portal-principal border-0 text-xs"
          style={{ color: AMBER }}
        >
          {displayStaff.length} Staff Members
        </Badge>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[13px]">
        {[
          { label: "Teachers", value: String(counts.TEACHER), icon: Users },
          { label: "IT Staff", value: String(counts.IT), icon: Shield },
          { label: "Admin", value: String(counts.ADMIN), icon: Award },
          {
            label: "Avg Mastery",
            value:
              teacherCount > 0 && avgMastery > 0
                ? `${Math.round(avgMastery)}%`
                : "N/A",
            icon: TrendingUp,
          },
        ].map(({ label, value, icon: Icon }, i) => (
          <motion.div
            key={label}
            data-ocid={`staff_overview.summary_card.${i + 1}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-portal-principal rounded-xl p-[13px] text-center space-y-1"
          >
            <Icon className="h-4 w-4 mx-auto mb-1" style={{ color: AMBER }} />
            <p className="text-xl font-bold font-mono text-foreground">
              {value}
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Filter tabs */}
      <div
        className="flex flex-wrap gap-2"
        data-ocid="staff_overview.filter_tabs"
      >
        {FILTER_TABS.map((tab) => {
          const active = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              data-ocid={`staff_overview.filter_tab.${tab.toLowerCase()}`}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest transition-smooth",
                active
                  ? "text-foreground"
                  : "glass-sm text-muted-foreground hover:text-foreground",
              )}
              style={
                active
                  ? {
                      background: "rgba(255,185,0,0.15)",
                      border: "1px solid rgba(255,185,0,0.35)",
                      color: AMBER,
                      boxShadow: "0 0 10px rgba(255,185,0,0.15)",
                    }
                  : {}
              }
            >
              {tab} <span className="opacity-60 ml-1">{counts[tab]}</span>
            </button>
          );
        })}
      </div>

      {/* Staff list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div
            className="glass-sm rounded-2xl p-12 text-center"
            data-ocid="staff_overview.empty_state"
          >
            <GraduationCap className="h-10 w-10 mx-auto mb-3 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">
              No staff members in this category.
            </p>
          </div>
        ) : (
          filtered.map((person, i) => {
            const style = TYPE_STYLE[person.type];
            const isExpanded = expandedStaffId === person.staffId;
            const isEditing = editingRole === person.staffId;
            const justUpdated = roleSuccess === person.staffId;
            return (
              <motion.div
                key={person.staffId ?? person.name}
                data-ocid={`staff_overview.staff_card.${i + 1}`}
                initial={{ opacity: 0, x: -13 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.06 }}
                className="glass-sm rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full p-5 flex items-center gap-4 cursor-pointer transition-smooth hover:bg-white/[0.02] text-left"
                  onClick={() =>
                    setExpandedStaffId(
                      isExpanded ? null : (person.staffId ?? null),
                    )
                  }
                  data-ocid={`staff_overview.expand_button.${i + 1}`}
                >
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: style.bg,
                      border: `1px solid ${style.color}40`,
                    }}
                  >
                    <GraduationCap
                      className="h-4 w-4"
                      style={{ color: style.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm text-foreground">
                        {person.name}
                      </p>
                      <Badge
                        className="text-[9px] px-1.5 py-0 border-0"
                        style={{ background: style.bg, color: style.color }}
                      >
                        {style.label}
                      </Badge>
                      {person.accessLevel > 0 && (
                        <Badge
                          className="text-[9px] px-1.5 py-0 font-mono"
                          style={{
                            background: "rgba(255,185,0,0.08)",
                            color: AMBER,
                            border: "1px solid rgba(255,185,0,0.20)",
                          }}
                        >
                          L{person.accessLevel}
                        </Badge>
                      )}
                      {justUpdated && (
                        <span className="flex items-center gap-1 text-[9px] font-mono text-emerald-400">
                          <CheckCircle className="h-3 w-3" />
                          Updated
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {person.role} · {person.grade}
                    </p>
                  </div>
                  {person.students > 0 && (
                    <div className="flex items-center gap-5 shrink-0 text-right">
                      <div>
                        <p
                          className="text-sm font-bold font-mono"
                          style={{ color: AMBER }}
                        >
                          {person.students}
                        </p>
                        <p className="text-[9px] text-muted-foreground">
                          Students
                        </p>
                      </div>
                      <div>
                        <p
                          className="text-sm font-bold font-mono"
                          style={{ color: AMBER }}
                        >
                          {person.mastery}%
                        </p>
                        <p className="text-[9px] text-muted-foreground">
                          Avg Mastery
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      data-ocid={`staff_overview.edit_role_button.${i + 1}`}
                      className="glass-sm rounded-lg p-2 text-muted-foreground hover:text-foreground transition-smooth"
                      aria-label={`Edit role for ${person.name}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingRole(
                          isEditing ? null : (person.staffId ?? null),
                        );
                      }}
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      data-ocid={`staff_overview.contact_button.${i + 1}`}
                      className="glass-sm rounded-lg p-2 text-muted-foreground hover:text-foreground transition-smooth"
                      aria-label={`Contact ${person.name}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </button>

                {/* Role Editor */}
                {isEditing && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="border-t border-white/5 px-5 py-4"
                    data-ocid={`staff_overview.role_editor.${i + 1}`}
                  >
                    <p className="text-[10px] font-mono text-muted-foreground mb-3 uppercase tracking-wider">
                      UPDATE ROLE
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(Object.values(StaffRole) as StaffRole[]).map((role) => (
                        <button
                          key={role}
                          type="button"
                          data-ocid={`staff_overview.role_option.${role.toLowerCase()}`}
                          onClick={() =>
                            handleRoleUpdate(person.staffId ?? "", role)
                          }
                          disabled={updateRole.isPending}
                          className="px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold transition-smooth hover:border-amber-500/40 glass-sm"
                          style={{
                            color:
                              role === person.backendRole ? AMBER : undefined,
                            border:
                              role === person.backendRole
                                ? "1px solid rgba(255,185,0,0.35)"
                                : undefined,
                            background:
                              role === person.backendRole
                                ? "rgba(255,185,0,0.12)"
                                : undefined,
                          }}
                        >
                          {roleLabel(role)}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Activity Log */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-white/5"
                    data-ocid={`staff_overview.activity_log.${i + 1}`}
                  >
                    <ActivityLog staffId={person.staffId ?? ""} />
                  </motion.div>
                )}
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
