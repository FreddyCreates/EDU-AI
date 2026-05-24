// ExternalTerminal — Kiosk entry for Parents and District Admin
// External stakeholder portal selection

import EddiOrb from "@/components/EddiOrb";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BarChart3,
  BookOpen,
  Building2,
  Calendar,
  ChevronRight,
  FileText,
  Globe,
  Heart,
  LayoutDashboard,
  MessageSquare,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const PARENT_ACCENT = "oklch(0.76 0.18 30)";
const PARENT_GLOW = "rgba(255, 180, 100, 0.25)";
const PARENT_BORDER = "rgba(255, 180, 100, 0.35)";

const DISTRICT_ACCENT = "oklch(0.70 0.16 240)";
const DISTRICT_BORDER = "rgba(120, 140, 255, 0.35)";
const DISTRICT_GLOW = "rgba(120, 140, 255, 0.25)";

// External role selection
const EXTERNAL_ROLES = [
  {
    id: "parent",
    label: "Parent Portal",
    description: "Student Progress, Attendance & Communication",
    icon: Heart,
    color: PARENT_ACCENT,
    border: PARENT_BORDER,
    glow: PARENT_GLOW,
    links: [
      { label: "Dashboard", href: "/parent", icon: LayoutDashboard },
      { label: "Student Progress", href: "/parent/progress", icon: TrendingUp },
      { label: "Attendance", href: "/parent/attendance", icon: Calendar },
      { label: "Messages", href: "/parent/messages", icon: MessageSquare },
      { label: "Reports", href: "/parent/reports", icon: FileText },
    ],
  },
  {
    id: "district",
    label: "District Portal",
    description: "District-wide Analytics, Schools & Gap Analysis",
    icon: Globe,
    color: DISTRICT_ACCENT,
    border: DISTRICT_BORDER,
    glow: DISTRICT_GLOW,
    links: [
      { label: "Dashboard", href: "/district", icon: LayoutDashboard },
      { label: "Schools", href: "/district/schools", icon: Building2 },
      { label: "Analytics", href: "/district/analytics", icon: BarChart3 },
      { label: "Gap Analysis", href: "/district/gaps", icon: TrendingUp },
      { label: "Reports", href: "/district/reports", icon: FileText },
    ],
  },
] as const;

function RoleSection({
  role,
  index,
}: {
  role: (typeof EXTERNAL_ROLES)[number];
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
              data-ocid={`external_terminal.${role.id}.${link.label.toLowerCase().replace(/\s/g, "_")}`}
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

export default function ExternalTerminal() {
  return (
    <div
      data-ocid="external_terminal.page"
      className="min-h-screen px-4 py-8 md:px-8 md:py-12"
      style={{
        background:
          "radial-gradient(ellipse at top, oklch(0.10 0.03 30) 0%, oklch(0.07 0.01 260) 50%)",
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
            <EddiOrb size="md" mode="REFLECT" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5" style={{ color: DISTRICT_ACCENT }} />
              <Badge
                className="text-[10px] font-mono"
                style={{
                  background: `${PARENT_ACCENT.replace(")", " / 0.12)")}`,
                  color: PARENT_ACCENT,
                  border: `1px solid ${PARENT_BORDER}`,
                }}
              >
                EXTERNAL TERMINAL
              </Badge>
            </div>
            <h1 className="font-display text-2xl font-bold text-white/90 mt-1">
              External Access
            </h1>
            <p className="text-sm text-white/50">
              Parents, District & Community Stakeholders
            </p>
          </div>
        </motion.div>

        {/* EDDI Mode Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-4 mb-6 flex items-center justify-between"
          style={{ border: `1px solid ${PARENT_BORDER}` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: PARENT_ACCENT }}
            />
            <span className="text-sm text-white/70">
              EDDI Mode: <span style={{ color: PARENT_ACCENT }}>Memory</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" style={{ color: PARENT_ACCENT }} />
            <span className="text-xs font-mono text-white/50">
              Progress Visibility
            </span>
          </div>
        </motion.div>

        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="glass-sm rounded-xl p-4 mb-6"
          style={{ border: `1px solid ${PARENT_BORDER.replace("0.35", "0.20")}` }}
        >
          <p className="text-sm text-white/60">
            Welcome to EduAI's external access portal. Parents can monitor their children's academic progress, 
            while district administrators can view school-wide analytics and reports.
          </p>
        </motion.div>

        {/* Role Sections */}
        <div className="space-y-6">
          {EXTERNAL_ROLES.map((role, i) => (
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
            data-ocid="external_terminal.back_to_hub"
          >
            ← Back to Terminal Hub
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
