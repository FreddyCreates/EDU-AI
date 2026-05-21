import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const subgroups = [
  { name: "All Students", math: 80, reading: 78, science: 75 },
  { name: "ELL Students", math: 66, reading: 59, science: 62 },
  { name: "Special Education", math: 61, reading: 64, science: 58 },
  { name: "Low Income", math: 69, reading: 67, science: 65 },
  { name: "Hispanic", math: 74, reading: 71, science: 70 },
  { name: "African American", math: 72, reading: 73, science: 68 },
];

const sessions = ["Fall 2024", "Spring 2025", "Fall 2025", "Spring 2026"];
const trendData: Record<string, number[]> = {
  "Lincoln High": [72, 75, 76, 78],
  "Roosevelt Middle": [76, 79, 81, 82],
  "Ferris Elementary": [65, 67, 70, 71],
  "Washington STEM": [86, 88, 90, 91],
};

type Subject = "math" | "reading" | "science";

export default function DistrictAnalytics() {
  const [activeSubject, setActiveSubject] = useState<Subject>("math");

  return (
    <div
      data-ocid="district.analytics.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] p-6 md:p-10"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link
            to="/district"
            className="text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[oklch(0.95_0.02_265)]">
              Analytics
            </h1>
            <p className="text-[oklch(0.5_0.06_265)] text-sm">
              Cross-school performance trends
            </p>
          </div>
        </div>
        <Button
          data-ocid="district.analytics.export_button"
          size="sm"
          variant="outline"
          className="border-white/20 text-[oklch(0.7_0.08_265)] hover:bg-white/10"
        >
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
      </div>

      {/* Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 mb-8"
      >
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-5">
          Mastery Trend — All Schools
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left text-[oklch(0.5_0.06_265)] text-xs pb-3 pr-6">
                  School
                </th>
                {sessions.map((s) => (
                  <th
                    key={s}
                    className="text-center text-[oklch(0.5_0.06_265)] text-xs pb-3 px-4"
                  >
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(trendData).map(([school, vals], i) => (
                <motion.tr
                  key={school}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="border-t border-white/5"
                >
                  <td className="text-[oklch(0.75_0.05_265)] py-3 pr-6 whitespace-nowrap">
                    {school}
                  </td>
                  {vals.map((v, j) => (
                    <td
                      key={`col-${school}-${sessions[j]}`}
                      className="text-center py-3 px-4"
                    >
                      <span
                        className={`font-semibold ${
                          v >= 85
                            ? "text-[oklch(0.7_0.18_150)]"
                            : v >= 75
                              ? "text-[oklch(0.85_0.15_85)]"
                              : "text-[oklch(0.65_0.22_30)]"
                        }`}
                      >
                        {v}%
                      </span>
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Subgroup Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest">
            Subgroup Performance
          </h2>
          <div className="flex gap-1 bg-white/5 rounded-lg p-1">
            {(["math", "reading", "science"] as Subject[]).map((s) => (
              <button
                key={s}
                type="button"
                data-ocid={`district.analytics.subject.${s}`}
                onClick={() => setActiveSubject(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeSubject === s
                    ? "bg-[oklch(0.85_0.15_85)]/20 text-[oklch(0.85_0.15_85)]"
                    : "text-[oklch(0.5_0.06_265)] hover:text-[oklch(0.7_0.08_265)]"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          {subgroups.map((g, i) => (
            <div key={g.name}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[oklch(0.75_0.05_265)]">{g.name}</span>
                <span className="text-[oklch(0.85_0.15_85)] font-semibold">
                  {g[activeSubject]}%
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${g[activeSubject]}%` }}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.7 }}
                  className="h-full rounded-full"
                  style={{
                    background: `oklch(${0.5 + g[activeSubject] / 200}_0.2_${activeSubject === "math" ? 85 : activeSubject === "reading" ? 270 : 150})`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
