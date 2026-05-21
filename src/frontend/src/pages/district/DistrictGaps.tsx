import { Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

// Fibonacci-floor gap scores
const gaps = [
  {
    subject: "Mathematics",
    grade: "Grade 8",
    subgroup: "ELL",
    gapScore: 21,
    fibonacci: true,
  },
  {
    subject: "Reading/ELA",
    grade: "Grade 5",
    subgroup: "Special Ed",
    gapScore: 13,
    fibonacci: true,
  },
  {
    subject: "Science",
    grade: "Grade 11",
    subgroup: "Low Income",
    gapScore: 13,
    fibonacci: true,
  },
  {
    subject: "Mathematics",
    grade: "Grade 3",
    subgroup: "ELL",
    gapScore: 8,
    fibonacci: true,
  },
  {
    subject: "Social Studies",
    grade: "Grade 7",
    subgroup: "African American",
    gapScore: 8,
    fibonacci: true,
  },
  {
    subject: "Writing",
    grade: "Grade 10",
    subgroup: "Special Ed",
    gapScore: 5,
    fibonacci: true,
  },
];

const severityColor = (score: number) => {
  if (score >= 21)
    return {
      bg: "bg-[oklch(0.65_0.22_30)]/15",
      border: "border-[oklch(0.65_0.22_30)]/30",
      text: "text-[oklch(0.75_0.2_60)]",
    };
  if (score >= 13)
    return {
      bg: "bg-[oklch(0.75_0.18_60)]/15",
      border: "border-[oklch(0.75_0.18_60)]/30",
      text: "text-[oklch(0.85_0.15_85)]",
    };
  return {
    bg: "bg-white/5",
    border: "border-white/10",
    text: "text-[oklch(0.65_0.06_265)]",
  };
};

export default function DistrictGaps() {
  return (
    <div
      data-ocid="district.gaps.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] p-6 md:p-10"
    >
      <div className="flex items-center gap-3 mb-8">
        <Link
          to="/district"
          className="text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[oklch(0.95_0.02_265)]">
            Achievement Gap Analysis
          </h1>
          <p className="text-[oklch(0.5_0.06_265)] text-sm">
            Gap scores floored to Fibonacci integers · LEX_FIBONACCI_FLOOR
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-8 flex-wrap">
        {[
          { label: "Critical (F₉≥​21)", color: "text-[oklch(0.75_0.2_60)]" },
          { label: "Elevated (F₇≥​13)", color: "text-[oklch(0.85_0.15_85)]" },
          { label: "Moderate (F₅≥​5)", color: "text-[oklch(0.65_0.06_265)]" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <AlertTriangle className={`w-3.5 h-3.5 ${l.color}`} />
            <span className={`text-xs ${l.color}`}>{l.label}</span>
          </div>
        ))}
      </div>

      {/* Gap Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 mb-8"
      >
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-5">
          Gap Score Table
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[oklch(0.5_0.06_265)] text-xs">
                <th className="text-left pb-3 pr-8">Subject</th>
                <th className="text-left pb-3 pr-8">Grade</th>
                <th className="text-left pb-3 pr-8">Subgroup</th>
                <th className="text-right pb-3">Gap Score (Fib Floor)</th>
              </tr>
            </thead>
            <tbody>
              {gaps.map((g, i) => {
                const c = severityColor(g.gapScore);
                return (
                  <motion.tr
                    key={`${g.subject}-${g.subgroup}`}
                    data-ocid={`district.gap.${i + 1}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="border-t border-white/5"
                  >
                    <td className="py-3 pr-8 text-[oklch(0.8_0.05_265)]">
                      {g.subject}
                    </td>
                    <td className="py-3 pr-8 text-[oklch(0.6_0.06_265)]">
                      {g.grade}
                    </td>
                    <td className="py-3 pr-8 text-[oklch(0.6_0.06_265)]">
                      {g.subgroup}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${c.bg} border ${c.border} ${c.text} font-mono font-bold text-sm`}
                      >
                        F(
                        {g.gapScore === 21
                          ? 8
                          : g.gapScore === 13
                            ? 7
                            : g.gapScore === 8
                              ? 6
                              : 5}
                        ) = {g.gapScore}pt
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6"
      >
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-5">
          Gap Visualization
        </h2>
        <div className="space-y-3">
          {gaps.map((g, i) => (
            <div key={`gap-${g.subject}`} className="flex items-center gap-4">
              <span className="text-[oklch(0.6_0.06_265)] text-xs w-32 shrink-0">
                {g.subject} / {g.subgroup.split(" ")[0]}
              </span>
              <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(g.gapScore / 25) * 100}%` }}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.7 }}
                  className="h-full rounded-full"
                  style={{
                    background: severityColor(g.gapScore)
                      .text.replace("text-", "")
                      .replace("[", "")
                      .replace("]", ""),
                  }}
                />
              </div>
              <span
                className={`font-bold text-sm w-8 text-right ${severityColor(g.gapScore).text}`}
              >
                {g.gapScore}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
