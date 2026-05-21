import { Link } from "@tanstack/react-router";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const subjects = [
  { name: "Algebra II", mastery: 78, prev: 65, color: "oklch(0.85_0.15_85)" },
  { name: "U.S. History", mastery: 91, prev: 88, color: "oklch(0.7_0.18_150)" },
  { name: "English IV", mastery: 72, prev: 70, color: "oklch(0.7_0.18_270)" },
  { name: "Biology", mastery: 85, prev: 79, color: "oklch(0.7_0.18_320)" },
  { name: "Physics", mastery: 67, prev: 60, color: "oklch(0.7_0.18_30)" },
];

const recentActivity = [
  {
    date: "May 18",
    action: "Completed Algebra quiz — 8/10 correct",
    delta: "+3",
  },
  {
    date: "May 17",
    action: "Mastered Photosynthesis topic in Biology",
    delta: "+5",
  },
  {
    date: "May 16",
    action: "Study session: U.S. Reconstruction era",
    delta: "+2",
  },
  {
    date: "May 15",
    action: "Reviewed essay structure in English IV",
    delta: "+1",
  },
];

export default function ParentProgress() {
  return (
    <div
      data-ocid="parent.progress.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24"
    >
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/parent"
          className="text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-xl font-bold text-[oklch(0.95_0.02_265)]">
          Academic Progress
        </h1>
      </div>

      {/* Mastery Bars */}
      <section className="mb-8">
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
          Subject Mastery — Marcus Medina
        </h2>
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5 space-y-5">
          {subjects.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[oklch(0.85_0.05_265)] font-medium">
                  {s.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[oklch(0.55_0.08_265)] text-xs">
                    was {s.prev}%
                  </span>
                  <span className="font-semibold" style={{ color: s.color }}>
                    {s.mastery}%
                  </span>
                  <TrendingUp className="w-3 h-3 text-[oklch(0.7_0.18_150)]" />
                </div>
              </div>
              <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.mastery}%` }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.7 }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Subject Mastery Cards — 2×2 grid with EDDI insights */}
      <section className="mb-8">
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
          Subject Mastery — EDDI Insights
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              {
                subject: "Math",
                mastery: 78,
                insight: "Geometry mastery is accelerating.",
              },
              {
                subject: "Science",
                mastery: 65,
                insight: "Strong retention in cellular biology.",
              },
              {
                subject: "English",
                mastery: 82,
                insight: "Literary analysis skills building.",
              },
              {
                subject: "History",
                mastery: 71,
                insight: "Consistent engagement with source analysis.",
              },
            ] as const
          ).map((s, i) => (
            <motion.div
              key={s.subject}
              data-ocid={`parent.subject_card.${i + 1}`}
              initial={{ opacity: 0, y: 13 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/90 font-semibold text-sm">
                  {s.subject}
                </span>
                <span className="text-[oklch(0.85_0.18_85)] font-mono text-sm">
                  {s.mastery}%
                </span>
              </div>
              {/* Fibonacci progress bar: h-[55px] max-h-[89px] vertical fill */}
              <div className="w-full bg-white/10 rounded-full h-2 mb-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.mastery}%` }}
                  transition={{
                    delay: 0.2 + i * 0.08,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-teal-400/80 to-teal-300/60"
                />
              </div>
              <p className="text-white/50 text-xs italic leading-snug">
                {s.insight}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {recentActivity.map((a, i) => (
            <motion.div
              key={a.action}
              data-ocid={`parent.activity.${i + 1}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-[oklch(0.85_0.05_265)] text-sm">
                  {a.action}
                </p>
                <p className="text-[oklch(0.5_0.06_265)] text-xs mt-0.5">
                  {a.date}
                </p>
              </div>
              <span className="text-[oklch(0.7_0.18_150)] text-sm font-semibold">
                {a.delta}
              </span>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
