import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Calendar,
  MessageSquare,
  Star,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

const children = [
  {
    id: "1",
    name: "Marcus Medina",
    grade: 9,
    mastery: 78,
    subject: "Algebra II",
    streak: 13,
  },
  {
    id: "2",
    name: "Lucia Medina",
    grade: 6,
    mastery: 89,
    subject: "Pre-Algebra",
    streak: 21,
  },
];

const quickLinks = [
  {
    label: "Progress",
    icon: TrendingUp,
    href: "/parent/progress",
    color: "from-[oklch(0.65_0.18_85)] to-[oklch(0.55_0.18_60)]",
  },
  {
    label: "Attendance",
    icon: Calendar,
    href: "/parent/attendance",
    color: "from-[oklch(0.55_0.2_270)] to-[oklch(0.45_0.2_250)]",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/parent/messages",
    color: "from-[oklch(0.55_0.2_150)] to-[oklch(0.45_0.2_130)]",
  },
  {
    label: "Reports",
    icon: BookOpen,
    href: "/parent/reports",
    color: "from-[oklch(0.55_0.2_320)] to-[oklch(0.45_0.2_300)]",
  },
];

export default function ParentDashboard() {
  return (
    <div
      data-ocid="parent.dashboard.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="text-[oklch(0.6_0.08_265)] text-sm mb-1">Good morning,</p>
        <h1 className="text-2xl font-bold text-[oklch(0.95_0.02_265)]">
          Parent Dashboard
        </h1>
        <p className="text-[oklch(0.55_0.08_265)] text-sm mt-1">
          Powered by EduAI · ALPH Registry
        </p>
      </motion.div>

      {/* Child Cards */}
      <section className="mb-8">
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-3">
          Your Children
        </h2>
        <div className="space-y-4">
          {children.map((child, i) => (
            <motion.div
              key={child.id}
              data-ocid={`parent.child_card.${i + 1}`}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-[oklch(0.95_0.02_265)] font-semibold text-lg">
                    {child.name}
                  </h3>
                  <p className="text-[oklch(0.6_0.08_265)] text-sm">
                    Grade {child.grade} · {child.subject}
                  </p>
                </div>
                <Badge className="bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.85_0.15_85)]/30">
                  <Star className="w-3 h-3 mr-1" /> {child.streak}d streak
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[oklch(0.6_0.08_265)]">
                    Mastery Score
                  </span>
                  <span className="text-[oklch(0.85_0.15_85)] font-semibold">
                    {child.mastery}%
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${child.mastery}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-[oklch(0.85_0.15_85)] to-[oklch(0.75_0.18_60)] rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-3">
          Quick Access
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickLinks.map((link, i) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.08 }}
            >
              <Link
                to={link.href}
                data-ocid={`parent.quick_link.${i + 1}`}
                className="flex flex-col items-center gap-3 p-5 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl hover:bg-white/10 transition-all duration-200 group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center`}
                >
                  <link.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-[oklch(0.85_0.05_265)] text-sm font-medium">
                  {link.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* School Connection — SIS Sync */}
      <section className="mt-8">
        <h3 className="text-emerald-400 font-mono text-xs tracking-widest uppercase mb-3">
          ◈ School Connection
        </h3>
        <div className="glass border border-emerald-500/30 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/70 text-sm">
              Student Information System
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Live
            </span>
          </div>
          <p className="text-white/40 text-xs">
            Grade data, enrollment status, and attendance records sync
            automatically. Contact your school administrator to update records.
          </p>
        </div>
      </section>
    </div>
  );
}
