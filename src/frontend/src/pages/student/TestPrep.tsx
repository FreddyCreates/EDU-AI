import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart2,
  BookOpen,
  CheckCircle2,
  Target,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type TestType = "STAAR" | "SAT" | "ACT" | "PSAT" | "AP";

const testModes: { type: TestType; description: string; color: string }[] = [
  {
    type: "STAAR",
    description: "State of Texas Assessment",
    color: "oklch(0.85_0.15_85)",
  },
  {
    type: "SAT",
    description: "College Board SAT Exam",
    color: "oklch(0.7_0.18_270)",
  },
  {
    type: "ACT",
    description: "ACT College Readiness",
    color: "oklch(0.7_0.18_150)",
  },
  {
    type: "PSAT",
    description: "PSAT / National Merit",
    color: "oklch(0.7_0.18_320)",
  },
  {
    type: "AP",
    description: "AP Exam Preparation",
    color: "oklch(0.65_0.22_30)",
  },
];

const projections: Record<
  TestType,
  { current: number; projected: number; target: number; sessions: number }
> = {
  STAAR: { current: 72, projected: 81, target: 90, sessions: 13 },
  SAT: { current: 1120, projected: 1210, target: 1350, sessions: 21 },
  ACT: { current: 24, projected: 27, target: 30, sessions: 21 },
  PSAT: { current: 980, projected: 1060, target: 1150, sessions: 13 },
  AP: { current: 3, projected: 4, target: 5, sessions: 8 },
};

const strategies = [
  "Process of Elimination: Remove 2 wrong answers first",
  "Time Boxing: 90 seconds per question, flag and return",
  "Key Word Underline: Circle what the question is actually asking",
  "Back-solve from Answers: Start with C on multiple choice math",
];

export default function TestPrep() {
  const [selected, setSelected] = useState<TestType | null>(null);
  const proj = selected ? projections[selected] : null;

  return (
    <div
      data-ocid="student.testprep.page"
      className="min-h-screen bg-[oklch(0.08_0.02_265)] px-4 py-6 pb-24"
    >
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/dashboard"
          className="text-[oklch(0.6_0.08_265)] hover:text-[oklch(0.85_0.15_85)] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[oklch(0.95_0.02_265)]">
            Test Prep
          </h1>
          <p className="text-[oklch(0.5_0.06_265)] text-xs">
            STAAR · SAT · ACT · AP · PSAT
          </p>
        </div>
      </div>

      {/* Mode Selector */}
      <section className="mb-8">
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
          Select Test Mode
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {testModes.map((t, i) => (
            <motion.button
              key={t.type}
              type="button"
              data-ocid={`student.testprep.mode.${t.type.toLowerCase()}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setSelected(t.type)}
              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                selected === t.type
                  ? "border-[oklch(0.85_0.15_85)]/50 bg-[oklch(0.85_0.15_85)]/10"
                  : "border-white/10 bg-white/5 hover:bg-white/8"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${t.color}20` }}
                >
                  <BookOpen className="w-5 h-5" style={{ color: t.color }} />
                </div>
                <div>
                  <p className="text-[oklch(0.9_0.05_265)] font-semibold">
                    {t.type}
                  </p>
                  <p className="text-[oklch(0.5_0.06_265)] text-xs">
                    {t.description}
                  </p>
                </div>
              </div>
              {selected === t.type && (
                <CheckCircle2 className="w-5 h-5 text-[oklch(0.85_0.15_85)]" />
              )}
            </motion.button>
          ))}
        </div>
      </section>

      {/* Score Projection */}
      <AnimatePresence>
        {proj && selected && (
          <motion.section
            key="projection"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mb-8"
          >
            <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
              <BarChart2 className="inline w-4 h-4 mr-2" />
              Score Projection — {selected}
            </h2>
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-5">
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[oklch(0.65_0.06_265)]">
                    {proj.current}
                  </p>
                  <p className="text-[oklch(0.5_0.06_265)] text-xs mt-0.5">
                    Current
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[oklch(0.85_0.15_85)]">
                    {proj.projected}
                  </p>
                  <p className="text-[oklch(0.5_0.06_265)] text-xs mt-0.5">
                    Projected
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[oklch(0.7_0.18_150)]">
                    {proj.target}
                  </p>
                  <p className="text-[oklch(0.5_0.06_265)] text-xs mt-0.5">
                    Target
                  </p>
                </div>
              </div>
              <p className="text-[oklch(0.6_0.06_265)] text-xs text-center">
                ~{proj.sessions} sessions to reach target · FIBR-projected
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Strategy Notes */}
      <section>
        <h2 className="text-[oklch(0.85_0.15_85)] text-xs font-semibold uppercase tracking-widest mb-4">
          <Target className="inline w-4 h-4 mr-2" />
          Strategy Notes
        </h2>
        <div className="space-y-3">
          {strategies.map((s, i) => (
            <motion.div
              key={s}
              data-ocid={`student.testprep.strategy.${i + 1}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.07 }}
              className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl"
            >
              <div className="w-6 h-6 rounded-full bg-[oklch(0.85_0.15_85)]/20 flex items-center justify-center text-[oklch(0.85_0.15_85)] text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </div>
              <p className="text-[oklch(0.8_0.05_265)] text-sm">{s}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {selected && (
        <div className="mt-8">
          <Button
            data-ocid="student.testprep.start_button"
            className="w-full bg-[oklch(0.85_0.15_85)]/20 hover:bg-[oklch(0.85_0.15_85)]/30 text-[oklch(0.85_0.15_85)] border border-[oklch(0.85_0.15_85)]/30 py-6 text-lg font-semibold"
          >
            Start {selected} Practice Session
          </Button>
        </div>
      )}
    </div>
  );
}
