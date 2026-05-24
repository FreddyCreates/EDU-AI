// TerminalHub — School Terminal Selection Hub
// Separate entry points for different school user groups

import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Heart,
  Server,
  Shield,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

// Terminal categories for schools - each serves a distinct user group
const TERMINALS = [
  {
    id: "student",
    label: "Student Terminal",
    description: "Learning, Study Sessions, Passport & Achievements",
    icon: GraduationCap,
    color: "oklch(0.78 0.22 200)",
    glow: "rgba(0, 210, 255, 0.25)",
    border: "rgba(0, 210, 255, 0.35)",
    href: "/terminal/student",
    roles: ["Student"],
  },
  {
    id: "staff",
    label: "Staff Terminal",
    description: "Teachers, Counselors & Support Staff",
    icon: Users,
    color: "oklch(0.68 0.18 280)",
    glow: "rgba(160, 100, 255, 0.25)",
    border: "rgba(160, 100, 255, 0.35)",
    href: "/terminal/staff",
    roles: ["Teacher", "Counselor"],
  },
  {
    id: "admin",
    label: "Admin Terminal",
    description: "Principal, IT & Security Operations",
    icon: Shield,
    color: "oklch(0.72 0.17 155)",
    glow: "rgba(0, 220, 130, 0.25)",
    border: "rgba(0, 220, 130, 0.35)",
    href: "/terminal/admin",
    roles: ["Principal", "IT/Security"],
  },
  {
    id: "external",
    label: "External Terminal",
    description: "Parents, District & Community Access",
    icon: Heart,
    color: "oklch(0.76 0.18 30)",
    glow: "rgba(255, 180, 100, 0.25)",
    border: "rgba(255, 180, 100, 0.35)",
    href: "/terminal/external",
    roles: ["Parent", "District"],
  },
] as const;

function TerminalCard({
  terminal,
  index,
}: {
  terminal: (typeof TERMINALS)[number];
  index: number;
}) {
  const Icon = terminal.icon;

  return (
    <Link to={terminal.href} data-ocid={`terminal_hub.card.${terminal.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.15 + index * 0.1, duration: 0.5 }}
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="relative group cursor-pointer"
      >
        {/* Outer glow */}
        <div
          className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{ background: terminal.glow }}
        />

        {/* Card */}
        <div
          className="relative glass rounded-3xl p-8 flex flex-col items-center text-center space-y-5 overflow-hidden"
          style={{
            border: `1px solid ${terminal.border}`,
            background: `linear-gradient(135deg, rgba(12,14,28,0.85) 0%, rgba(8,10,22,0.95) 100%)`,
          }}
        >
          {/* Icon container */}
          <motion.div
            className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${terminal.color.replace(")", " / 0.15)")} 0%, ${terminal.color.replace(")", " / 0.08)")} 100%)`,
              border: `1px solid ${terminal.border}`,
              boxShadow: `0 0 30px ${terminal.glow}`,
            }}
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-10 h-10" style={{ color: terminal.color }} />
          </motion.div>

          {/* Label */}
          <div className="space-y-2">
            <h2
              className="font-display text-xl font-bold"
              style={{ color: terminal.color }}
            >
              {terminal.label}
            </h2>
            <p className="text-sm text-white/60 leading-relaxed max-w-[200px]">
              {terminal.description}
            </p>
          </div>

          {/* Role badges */}
          <div className="flex flex-wrap gap-2 justify-center">
            {terminal.roles.map((role) => (
              <Badge
                key={role}
                className="text-[10px] font-mono tracking-wide"
                style={{
                  background: `${terminal.color.replace(")", " / 0.12)")}`,
                  color: terminal.color,
                  border: `1px solid ${terminal.border}`,
                }}
              >
                {role}
              </Badge>
            ))}
          </div>

          {/* Enter prompt */}
          <motion.div
            className="absolute bottom-4 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity"
            initial={{ y: 10 }}
            whileHover={{ y: 0 }}
          >
            <span
              className="text-xs font-mono tracking-widest uppercase"
              style={{ color: terminal.color }}
            >
              Enter Terminal →
            </span>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function TerminalHub() {
  return (
    <div
      data-ocid="terminal_hub.page"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{
        background:
          "radial-gradient(ellipse at center, oklch(0.10 0.02 260) 0%, oklch(0.07 0.01 260) 70%)",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 space-y-4"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Server className="w-8 h-8 text-[oklch(0.76_0.18_84)]" />
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white/90">
            EduAI Terminals
          </h1>
        </div>
        <p className="text-white/50 text-lg max-w-md mx-auto">
          Select your terminal to access the appropriate portal for your role
        </p>
        <Badge
          className="bg-[oklch(0.76_0.18_84/0.12)] text-[oklch(0.76_0.18_84)] border-[oklch(0.76_0.18_84/0.30)]"
          style={{ fontFamily: "JetBrainsMono" }}
        >
          SOVEREIGN EDUCATION OS
        </Badge>
      </motion.div>

      {/* Terminal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        {TERMINALS.map((terminal, i) => (
          <TerminalCard key={terminal.id} terminal={terminal} index={i} />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center space-y-3"
      >
        <p className="text-white/30 text-xs font-mono tracking-wider">
          Powered by EDDI Intelligence · 7 Operational Modes
        </p>
        <div className="flex items-center justify-center gap-4 text-white/20 text-[10px] font-mono">
          <span>RCGN Active</span>
          <span>•</span>
          <span>Passport Sync</span>
          <span>•</span>
          <span>Live Analytics</span>
        </div>
      </motion.div>
    </div>
  );
}
