import { Link } from "@tanstack/react-router";
import { Award, Building2, TrendingUp, Users } from "lucide-react";
import { motion } from "motion/react";

const schools = [
  {
    id: "s1",
    name: "Lincoln High School",
    mastery: 78,
    enrollment: 1842,
    rcgn: 34,
  },
  {
    id: "s2",
    name: "Roosevelt Middle School",
    mastery: 82,
    enrollment: 1120,
    rcgn: 18,
  },
  {
    id: "s3",
    name: "Ferris Elementary",
    mastery: 71,
    enrollment: 643,
    rcgn: 12,
  },
  {
    id: "s4",
    name: "Washington STEM Academy",
    mastery: 91,
    enrollment: 890,
    rcgn: 47,
  },
];

const districtStats = [
  {
    label: "Total Schools",
    value: "4",
    icon: Building2,
    color: "oklch(0.85_0.15_85)",
  },
  {
    label: "Students",
    value: "4,495",
    icon: Users,
    color: "oklch(0.7_0.18_270)",
  },
  {
    label: "Avg Mastery",
    value: "80.5%",
    icon: TrendingUp,
    color: "oklch(0.7_0.18_150)",
  },
  {
    label: "RCGN Flags",
    value: "111",
    icon: Award,
    color: "oklch(0.65_0.22_30)",
  },
];

const navLinks = [
  { label: "Schools", href: "/district/schools", color: "oklch(0.85_0.15_85)" },
  {
    label: "Analytics",
    href: "/district/analytics",
    color: "oklch(0.7_0.18_270)",
  },
  {
    label: "Gap Analysis",
    href: "/district/gaps",
    color: "oklch(0.65_0.22_30)",
  },
  { label: "Reports", href: "/district/reports", color: "oklch(0.7_0.18_150)" },
];

export default function DistrictDashboard() {
  return (
    <div
      data-ocid="district.dashboard.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] p-6 md:p-10"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="text-[oklch(0.6_0.08_265)] text-sm">
          District Administration — EduAI
        </p>
        <h1 className="text-3xl font-bold text-[oklch(0.95_0.02_265)] mt-1">
          District Dashboard
        </h1>
        <p className="text-[oklch(0.5_0.06_265)] text-sm mt-1">
          Sovereign Intelligence Layer · ALPH Registry
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {districtStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.07 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${s.color}20` }}
              >
                <s.icon className="w-5 h-5" style={{ color: s.color }} />
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

      {/* Achievement Gap Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 mb-8"
      >
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-5">
          Achievement Gap Overview
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            { label: "ELL Students", gap: 14, trend: "improving" },
            { label: "Special Ed", gap: 19, trend: "stable" },
            { label: "Low Income", gap: 11, trend: "improving" },
          ].map((g, i) => (
            <div key={g.label} className="text-center">
              <p className="text-[oklch(0.55_0.06_265)] text-xs mb-2">
                {g.label}
              </p>
              <motion.p
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-3xl font-bold text-[oklch(0.65_0.22_30)]"
              >
                {g.gap}pt
              </motion.p>
              <p
                className={`text-xs mt-1 ${g.trend === "improving" ? "text-[oklch(0.7_0.18_150)]" : "text-[oklch(0.6_0.06_265)]"}`}
              >
                {g.trend}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* School Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {schools.map((s, i) => (
          <motion.div
            key={s.id}
            data-ocid={`district.school_card.${i + 1}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.08 }}
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-[oklch(0.9_0.05_265)] font-semibold text-sm">
                {s.name}
              </h3>
              <span className="text-[oklch(0.85_0.15_85)] font-bold">
                {s.mastery}%
              </span>
            </div>
            <div className="flex gap-4 text-xs text-[oklch(0.5_0.06_265)]">
              <span>{s.enrollment.toLocaleString()} enrolled</span>
              <span className="text-[oklch(0.7_0.18_150)]">
                {s.rcgn} RCGN flags
              </span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${s.mastery}%` }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.7 }}
                className="h-full bg-gradient-to-r from-[oklch(0.85_0.15_85)] to-[oklch(0.7_0.18_60)] rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* District SIS Overview */}
      <section className="mt-8">
        <h3 className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
          ◈ District SIS Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glass border border-cyan-500/30 rounded-xl p-5">
            <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-1">
              Enrollment
            </p>
            <p className="text-2xl font-bold text-white">Live Sync</p>
            <p className="text-white/40 text-xs mt-1">
              Student records updated on Fibonacci schedule
            </p>
          </div>
          <div className="glass border border-cyan-500/30 rounded-xl p-5">
            <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-1">
              Sync Status
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 text-sm">Healthy</span>
            </div>
            <p className="text-white/40 text-xs mt-2">
              Next sync: F(8)=21 minutes
            </p>
          </div>
          <div className="glass border border-cyan-500/30 rounded-xl p-5">
            <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-1">
              Rosters
            </p>
            <p className="text-white/70 text-sm">
              All class rosters available via the School Data tab
            </p>
          </div>
        </div>
      </section>

      {/* Nav */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {navLinks.map((l) => (
          <Link
            key={l.label}
            to={l.href}
            data-ocid={`district.nav.${l.label.toLowerCase().replace(" ", "_")}`}
            className="flex items-center justify-center p-4 bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl hover:bg-white/10 transition-all text-sm font-medium"
            style={{ color: l.color }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
