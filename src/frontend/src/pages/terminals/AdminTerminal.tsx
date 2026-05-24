// AdminTerminal — Kiosk entry for Principal and IT/Security
// Administration-focused portal selection

import EddiOrb from "@/components/EddiOrb";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Building2,
  ChevronRight,
  Cpu,
  Database,
  FileText,
  LayoutDashboard,
  Network,
  PieChart,
  Server,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const PRINCIPAL_ACCENT = "oklch(0.75 0.16 70)";
const PRINCIPAL_GLOW = "rgba(255, 185, 0, 0.25)";
const PRINCIPAL_BORDER = "rgba(255, 185, 0, 0.35)";

const IT_ACCENT = "oklch(0.72 0.17 155)";
const IT_BORDER = "rgba(0, 220, 130, 0.35)";
const IT_GLOW = "rgba(0, 220, 130, 0.25)";

// Admin role selection
const ADMIN_ROLES = [
  {
    id: "principal",
    label: "Principal Portal",
    description: "School Analytics, Staff Overview & Grade Reports",
    icon: Building2,
    color: PRINCIPAL_ACCENT,
    border: PRINCIPAL_BORDER,
    glow: PRINCIPAL_GLOW,
    links: [
      { label: "Dashboard", href: "/principal", icon: LayoutDashboard },
      { label: "School Analytics", href: "/principal/analytics", icon: BarChart3 },
      { label: "Grade Heatmap", href: "/principal/heatmap", icon: PieChart },
      { label: "Staff Overview", href: "/principal/staff", icon: Users },
      { label: "Grade Reports", href: "/principal/reports", icon: FileText },
      { label: "Recognition Registry", href: "/principal/registry", icon: Zap },
    ],
  },
  {
    id: "it",
    label: "IT / Security Portal",
    description: "System Health, Security Panel & Engine Monitor",
    icon: Shield,
    color: IT_ACCENT,
    border: IT_BORDER,
    glow: IT_GLOW,
    links: [
      { label: "IT Dashboard", href: "/it", icon: LayoutDashboard },
      { label: "Security Panel", href: "/it-security", icon: Shield },
      { label: "Network Status", href: "/it/network", icon: Network },
      { label: "Audit Log", href: "/it/audit", icon: FileText },
      { label: "Engine Monitor", href: "/it/engines", icon: Cpu },
      { label: "APIX Gateway", href: "/it/apix", icon: Zap },
    ],
  },
] as const;

function RoleSection({
  role,
  index,
}: {
  role: (typeof ADMIN_ROLES)[number];
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
              data-ocid={`admin_terminal.${role.id}.${link.label.toLowerCase().replace(/\s/g, "_")}`}
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

export default function AdminTerminal() {
  return (
    <div
      data-ocid="admin_terminal.page"
      className="min-h-screen px-4 py-8 md:px-8 md:py-12"
      style={{
        background:
          "radial-gradient(ellipse at top, oklch(0.10 0.02 155) 0%, oklch(0.07 0.01 260) 50%)",
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
            <EddiOrb size="md" mode="SOVEREIGN" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: IT_ACCENT }} />
              <Badge
                className="text-[10px] font-mono"
                style={{
                  background: `${IT_ACCENT.replace(")", " / 0.12)")}`,
                  color: IT_ACCENT,
                  border: `1px solid ${IT_BORDER}`,
                }}
              >
                ADMIN TERMINAL
              </Badge>
            </div>
            <h1 className="font-display text-2xl font-bold text-white/90 mt-1">
              Administration Portal
            </h1>
            <p className="text-sm text-white/50">
              Principal & IT/Security Operations Center
            </p>
          </div>
        </motion.div>

        {/* EDDI Mode Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-4 mb-6 flex items-center justify-between"
          style={{ border: `1px solid ${IT_BORDER}` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: IT_ACCENT }}
            />
            <span className="text-sm text-white/70">
              EDDI Mode: <span style={{ color: PRINCIPAL_ACCENT }}>Principal</span> / <span style={{ color: IT_ACCENT }}>Architect</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4" style={{ color: IT_ACCENT }} />
            <span className="text-xs font-mono text-white/50">
              System Intelligence
            </span>
          </div>
        </motion.div>

        {/* System Status Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="glass-sm rounded-xl p-3 mb-6 flex items-center justify-between"
          style={{ border: "1px solid rgba(0,220,130,0.20)" }}
        >
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-white/60">All Systems Operational</span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-mono text-white/40">
            <span>RCGN: Active</span>
            <span>•</span>
            <span>STMP: Synced</span>
            <span>•</span>
            <span>GVLT: Healthy</span>
          </div>
        </motion.div>

        {/* Role Sections */}
        <div className="space-y-6">
          {ADMIN_ROLES.map((role, i) => (
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
            data-ocid="admin_terminal.back_to_hub"
          >
            ← Back to Terminal Hub
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
