// StaffTerminal — Kiosk entry for Teachers and Counselors
// Staff-focused portal selection

import EddiOrb from "@/components/EddiOrb";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  BrainCircuit,
  Briefcase,
  ChevronRight,
  ClipboardList,
  FileText,
  GraduationCap,
  Heart,
  LayoutDashboard,
  PenTool,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const TEACHER_ACCENT = "oklch(0.68 0.18 280)";
const TEACHER_GLOW = "rgba(160, 100, 255, 0.25)";
const TEACHER_BORDER = "rgba(160, 100, 255, 0.35)";

const COUNSELOR_ACCENT = "oklch(0.74 0.18 320)";
const COUNSELOR_BORDER = "rgba(220, 120, 200, 0.35)";

// Staff role selection
const STAFF_ROLES = [
  {
    id: "teacher",
    label: "Teacher Portal",
    description: "Classes, Grades, Lesson Builder & Student Progress",
    icon: Users,
    color: TEACHER_ACCENT,
    border: TEACHER_BORDER,
    glow: TEACHER_GLOW,
    links: [
      { label: "Dashboard", href: "/teacher", icon: LayoutDashboard },
      { label: "My Classes", href: "/teacher/classes", icon: Users },
      { label: "Grade Vault", href: "/teacher/grades", icon: ClipboardList },
      { label: "Lesson Builder", href: "/teacher/lessons", icon: PenTool },
      { label: "Student Progress", href: "/teacher/progress", icon: TrendingUp },
      { label: "Assignments", href: "/teacher/assignments", icon: FileText },
      { label: "Recognition", href: "/teacher/recognition", icon: Award },
    ],
  },
  {
    id: "counselor",
    label: "Counselor Portal",
    description: "Student Support, Career Guidance & Academic Plans",
    icon: UserCheck,
    color: COUNSELOR_ACCENT,
    border: COUNSELOR_BORDER,
    glow: "rgba(220, 120, 200, 0.25)",
    links: [
      { label: "Dashboard", href: "/counselor", icon: LayoutDashboard },
      { label: "My Students", href: "/counselor/students", icon: Users },
      { label: "Academic Plans", href: "/counselor/plans", icon: BookOpen },
      { label: "Career Guidance", href: "/counselor/career", icon: Briefcase },
      { label: "College Prep", href: "/counselor/college", icon: GraduationCap },
    ],
  },
] as const;

function RoleSection({
  role,
  index,
}: {
  role: (typeof STAFF_ROLES)[number];
  index: number;
}) {
  const Icon = role.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + index * 0.15 }}
      className="glass rounded-3xl p-6 space-y-5"
      style={{
        border: `1px solid ${role.border}`,
        background: `linear-gradient(135deg, ${role.color.replace(")", " / 0.06)")} 0%, rgba(12,14,28,0.9) 100%)`,
      }}
    >
      {/* Role Header */}
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: `${role.color.replace(")", " / 0.15)")}`,
            border: `1px solid ${role.border}`,
            boxShadow: `0 0 20px ${role.glow}`,
          }}
        >
          <Icon className="w-7 h-7" style={{ color: role.color }} />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold" style={{ color: role.color }}>
            {role.label}
          </h2>
          <p className="text-sm text-white/50">{role.description}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {role.links.map((link, i) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.label}
              to={link.href}
              data-ocid={`staff_terminal.${role.id}.${link.label.toLowerCase().replace(/\s/g, "_")}`}
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.15 + i * 0.04 }}
                whileHover={{ x: 3 }}
                className="group flex items-center gap-3 p-3 rounded-xl glass-sm border border-white/10 hover:border-white/20 cursor-pointer transition-all"
              >
                <LinkIcon
                  className="w-4 h-4"
                  style={{ color: role.color }}
                />
                <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors flex-1">
                  {link.label}
                </span>
                <ChevronRight className="w-3 h-3 text-white/20 group-hover:text-white/40" />
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function StaffTerminal() {
  return (
    <div
      data-ocid="staff_terminal.page"
      className="min-h-screen px-4 py-8 md:px-8 md:py-12"
      style={{
        background:
          "radial-gradient(ellipse at top, oklch(0.10 0.03 280) 0%, oklch(0.07 0.01 260) 50%)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="relative">
            <EddiOrb size="md" mode="EXPLAIN" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" style={{ color: TEACHER_ACCENT }} />
              <Badge
                className="text-[10px] font-mono"
                style={{
                  background: `${TEACHER_ACCENT.replace(")", " / 0.12)")}`,
                  color: TEACHER_ACCENT,
                  border: `1px solid ${TEACHER_BORDER}`,
                }}
              >
                STAFF TERMINAL
              </Badge>
            </div>
            <h1 className="font-display text-2xl font-bold text-white/90 mt-1">
              Staff Portal
            </h1>
            <p className="text-sm text-white/50">
              Teachers, Counselors & Support Staff Access
            </p>
          </div>
        </motion.div>

        {/* EDDI Mode Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-4 mb-6 flex items-center justify-between"
          style={{ border: `1px solid ${TEACHER_BORDER}` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: TEACHER_ACCENT }}
            />
            <span className="text-sm text-white/70">
              EDDI Mode: <span style={{ color: TEACHER_ACCENT }}>Teacher</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-[oklch(0.72_0.17_155)]" />
            <span className="text-xs font-mono text-white/50">
              Instructional Intelligence
            </span>
          </div>
        </motion.div>

        {/* Role Sections */}
        <div className="space-y-6">
          {STAFF_ROLES.map((role, i) => (
            <RoleSection key={role.id} role={role} index={i} />
          ))}
        </div>

        {/* Back to Hub */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <Link
            to="/terminals"
            className="text-xs font-mono text-white/30 hover:text-white/50 transition-colors"
            data-ocid="staff_terminal.back_to_hub"
          >
            ← Back to Terminal Hub
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
