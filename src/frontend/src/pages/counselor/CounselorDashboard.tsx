import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { BookOpen, Calendar, Flag, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

const caseloadStats = [
  {
    label: "Total Students",
    value: 47,
    icon: Users,
    color: "oklch(0.85_0.15_85)",
  },
  { label: "IEP Active", value: 8, icon: Flag, color: "oklch(0.65_0.22_30)" },
  {
    label: "Career Plans",
    value: 31,
    icon: TrendingUp,
    color: "oklch(0.7_0.18_150)",
  },
  {
    label: "Next Review",
    value: 3,
    icon: Calendar,
    color: "oklch(0.7_0.18_270)",
  },
];

const urgentStudents = [
  { name: "Aiden Park", grade: 11, issue: "IEP Review Due", urgency: "high" },
  {
    name: "Sofia Garcia",
    grade: 10,
    issue: "College Deadline: Jun 1",
    urgency: "medium",
  },
  {
    name: "James Wilson",
    grade: 9,
    issue: "3 consecutive absences",
    urgency: "high",
  },
];

const navLinks = [
  { label: "Students", href: "/counselor/students", icon: Users },
  { label: "Plans", href: "/counselor/plans", icon: BookOpen },
  { label: "Career", href: "/counselor/career", icon: TrendingUp },
  { label: "College", href: "/counselor/college", icon: Flag },
];

export default function CounselorDashboard() {
  return (
    <div
      data-ocid="counselor.dashboard.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24"
    >
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <p className="text-[oklch(0.6_0.08_265)] text-sm">
          Counselor Portal — EduAI
        </p>
        <h1 className="text-2xl font-bold text-[oklch(0.95_0.02_265)] mt-1">
          Counselor Dashboard
        </h1>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {caseloadStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${s.color}25` }}
              >
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <span className="text-[oklch(0.55_0.06_265)] text-xs">
                {s.label}
              </span>
            </div>
            <p className="text-2xl font-bold" style={{ color: s.color }}>
              {s.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Urgent Items */}
      <section className="mb-8">
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
          Needs Attention
        </h2>
        <div className="space-y-3">
          {urgentStudents.map((s, i) => (
            <motion.div
              key={s.name}
              data-ocid={`counselor.urgent.${i + 1}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-[oklch(0.85_0.05_265)] text-sm font-semibold">
                  {s.name}
                </p>
                <p className="text-[oklch(0.55_0.06_265)] text-xs">
                  Grade {s.grade} · {s.issue}
                </p>
              </div>
              <Badge
                className={`text-xs ${
                  s.urgency === "high"
                    ? "bg-[oklch(0.65_0.22_30)]/20 text-[oklch(0.75_0.2_60)] border-[oklch(0.65_0.22_30)]/30"
                    : "bg-[oklch(0.75_0.18_60)]/20 text-[oklch(0.85_0.15_85)] border-[oklch(0.75_0.18_60)]/30"
                }`}
              >
                {s.urgency === "high" ? "Urgent" : "Soon"}
              </Badge>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Nav Links */}
      <section>
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-3">
          Navigate
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {navLinks.map((l, i) => (
            <motion.div
              key={l.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.07 }}
            >
              <Link
                to={l.href}
                data-ocid={`counselor.nav.${l.label.toLowerCase()}`}
                className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl hover:bg-white/10 transition-all"
              >
                <l.icon className="w-5 h-5 text-[oklch(0.85_0.15_85)]" />
                <span className="text-[oklch(0.8_0.05_265)] text-sm font-medium">
                  {l.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
