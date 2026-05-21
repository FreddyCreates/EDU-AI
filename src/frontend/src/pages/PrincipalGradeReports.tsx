import { cn } from "@/lib/utils";
import { BarChart2, BookOpen, Download, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const _GRADE_DATA = [
  {
    grade: "K",
    students: 24,
    avgMastery: 78,
    topSubject: "Math",
    sessions: 312,
  },
  {
    grade: "1",
    students: 28,
    avgMastery: 81,
    topSubject: "Reading",
    sessions: 408,
  },
  {
    grade: "2",
    students: 31,
    avgMastery: 74,
    topSubject: "Math",
    sessions: 387,
  },
  {
    grade: "3",
    students: 27,
    avgMastery: 83,
    topSubject: "Science",
    sessions: 351,
  },
  {
    grade: "4",
    students: 30,
    avgMastery: 77,
    topSubject: "Math",
    sessions: 420,
  },
  {
    grade: "5",
    students: 29,
    avgMastery: 86,
    topSubject: "History",
    sessions: 377,
  },
  {
    grade: "6",
    students: 33,
    avgMastery: 79,
    topSubject: "Science",
    sessions: 429,
  },
  {
    grade: "7",
    students: 35,
    avgMastery: 72,
    topSubject: "Algebra",
    sessions: 455,
  },
  {
    grade: "8",
    students: 32,
    avgMastery: 75,
    topSubject: "Biology",
    sessions: 416,
  },
  {
    grade: "9",
    students: 38,
    avgMastery: 69,
    topSubject: "Geometry",
    sessions: 494,
  },
  {
    grade: "10",
    students: 36,
    avgMastery: 73,
    topSubject: "Chemistry",
    sessions: 468,
  },
  {
    grade: "11",
    students: 34,
    avgMastery: 80,
    topSubject: "Literature",
    sessions: 442,
  },
  {
    grade: "12",
    students: 29,
    avgMastery: 88,
    topSubject: "Government",
    sessions: 377,
  },
];

const GOLD = "oklch(0.78 0.16 70)";
const TEAL = "oklch(0.72 0.16 185)";

const GRADE_ROWS = [
  { grade: "K", avgMastery: 72, students: 24, nominations: 3, struggles: 2 },
  { grade: "1", avgMastery: 68, students: 28, nominations: 2, struggles: 4 },
  { grade: "2", avgMastery: 74, students: 31, nominations: 4, struggles: 3 },
  { grade: "3", avgMastery: 81, students: 27, nominations: 6, struggles: 1 },
  { grade: "4", avgMastery: 79, students: 30, nominations: 5, struggles: 2 },
  { grade: "5", avgMastery: 83, students: 29, nominations: 7, struggles: 1 },
  { grade: "6", avgMastery: 77, students: 33, nominations: 4, struggles: 3 },
  { grade: "7", avgMastery: 71, students: 35, nominations: 3, struggles: 5 },
  { grade: "8", avgMastery: 76, students: 32, nominations: 4, struggles: 3 },
  { grade: "9", avgMastery: 68, students: 38, nominations: 2, struggles: 6 },
  { grade: "10", avgMastery: 73, students: 36, nominations: 4, struggles: 4 },
  { grade: "11", avgMastery: 82, students: 34, nominations: 8, struggles: 2 },
  { grade: "12", avgMastery: 89, students: 29, nominations: 11, struggles: 1 },
];

const SUBJECTS = [
  "ELA",
  "Math",
  "Science",
  "Social Studies",
  "Computer Science",
  "Spanish",
];
const GRADE_BANDS = ["K", "1–3", "4–6", "7–8", "9–12"];
type CoverageLevel = "covered" | "partial" | "sparse";

const COVERAGE_MATRIX: Record<string, CoverageLevel[]> = {
  ELA: ["covered", "covered", "covered", "covered", "covered"],
  Math: ["covered", "covered", "covered", "partial", "partial"],
  Science: ["partial", "covered", "covered", "covered", "partial"],
  "Social Studies": ["partial", "partial", "covered", "covered", "covered"],
  "Computer Science": ["sparse", "sparse", "partial", "covered", "covered"],
  Spanish: ["sparse", "partial", "partial", "covered", "covered"],
};

const COVERAGE_DOT: Record<CoverageLevel, { bg: string; label: string }> = {
  covered: { bg: "oklch(0.72 0.20 145)", label: "Covered" },
  partial: { bg: "oklch(0.72 0.18 70)", label: "Partial" },
  sparse: { bg: "oklch(0.55 0.20 25)", label: "Sparse" },
};

export default function PrincipalGradeReports() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="p-[21px] space-y-[21px]" data-ocid="principal_reports.page">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Grade Reports
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Performance + curriculum separated by sovereign protocol
          </p>
        </div>
        <button
          type="button"
          data-ocid="principal_reports.export_button"
          className="flex items-center gap-2 glass-sm rounded-lg px-4 py-2 text-xs font-medium hover:text-foreground text-muted-foreground transition-smooth"
        >
          <Download className="h-3.5 w-3.5" /> Export
        </button>
      </motion.div>

      {/* Two-section grid — PHI ratio on desktop */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.618fr_1fr] gap-[21px]">
        {/* ===== SECTION A: Grade Performance Dashboard ===== */}
        <motion.section
          initial={{ opacity: 0, x: -13 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          data-ocid="principal_reports.performance_section"
          className="space-y-[13px]"
        >
          {/* Section A header — gold accent */}
          <div
            className="glass-grade-vault rounded-xl px-5 py-3 flex items-center gap-3"
            style={{ borderLeft: `3px solid ${GOLD}` }}
          >
            <TrendingUp className="h-4 w-4 shrink-0" style={{ color: GOLD }} />
            <div>
              <p className="font-display font-bold text-base text-foreground leading-none">
                Grade Performance Dashboard
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                K–12 mastery · nominations · struggle alerts
              </p>
            </div>
          </div>

          {/* Bar chart overview */}
          <div className="glass-grade-vault rounded-xl p-[21px]">
            <p
              className="text-[10px] font-semibold uppercase tracking-widest mb-4 flex items-center gap-2"
              style={{ color: GOLD }}
            >
              <BarChart2 className="h-3 w-3" /> Avg Mastery by Grade
            </p>
            <div className="flex items-end gap-1 h-24">
              {GRADE_ROWS.map((g, i) => (
                <motion.button
                  key={g.grade}
                  type="button"
                  data-ocid={`principal_reports.bar.${i + 1}`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: i * 0.04, duration: 0.35 }}
                  style={{ originY: 1 }}
                  onClick={() =>
                    setSelected(selected === g.grade ? null : g.grade)
                  }
                  className="flex-1 cursor-pointer hover:opacity-90 transition-smooth flex flex-col items-center gap-1"
                  title={`Grade ${g.grade}: ${g.avgMastery}%`}
                >
                  <div
                    className="w-full rounded-t-sm"
                    style={{
                      height: `${g.avgMastery}%`,
                      background:
                        selected === g.grade
                          ? GOLD
                          : `rgba(255,185,0,${0.25 + g.avgMastery / 180})`,
                    }}
                  />
                </motion.button>
              ))}
            </div>
            <div className="flex gap-1 mt-1">
              {GRADE_ROWS.map((g) => (
                <span
                  key={g.grade}
                  className="flex-1 text-center text-[8px] text-muted-foreground"
                >
                  {g.grade}
                </span>
              ))}
            </div>
          </div>

          {/* Grade rows — .glass-grade-vault cards */}
          <div className="space-y-[5px]">
            {GRADE_ROWS.map((g, i) => (
              <motion.button
                key={g.grade}
                type="button"
                data-ocid={`principal_reports.grade_row.${i + 1}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.04 }}
                onClick={() =>
                  setSelected(selected === g.grade ? null : g.grade)
                }
                className={cn(
                  "w-full glass-grade-vault rounded-xl px-4 py-3 flex items-center gap-4 transition-smooth cursor-pointer hover:scale-[1.01] text-left",
                  selected === g.grade && "ring-1",
                )}
                style={
                  selected === g.grade ? { boxShadow: `0 0 0 1px ${GOLD}` } : {}
                }
              >
                {/* Grade label */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-sm shrink-0"
                  style={{
                    background: "rgba(255,185,0,0.12)",
                    color: GOLD,
                    border: "1px solid rgba(255,185,0,0.25)",
                  }}
                >
                  {g.grade}
                </div>

                {/* Mastery bar */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-foreground">
                      Grade {g.grade}
                    </span>
                    <span className="font-mono text-xs" style={{ color: GOLD }}>
                      {g.avgMastery}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full transition-smooth"
                      style={{
                        width: `${g.avgMastery}%`,
                        background: `linear-gradient(90deg, ${GOLD}, rgba(255,185,0,0.5))`,
                      }}
                    />
                  </div>
                </div>

                {/* Counts */}
                <div className="hidden sm:flex items-center gap-[13px] shrink-0">
                  <div className="text-center">
                    <div className="font-mono text-sm font-bold text-foreground">
                      {g.students}
                    </div>
                    <div className="text-[9px] text-muted-foreground uppercase tracking-wide">
                      Students
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className="font-mono text-sm font-bold"
                      style={{ color: "oklch(0.72 0.20 145)" }}
                    >
                      {g.nominations}
                    </div>
                    <div className="text-[9px] text-muted-foreground uppercase tracking-wide">
                      Noms
                    </div>
                  </div>
                  <div className="text-center">
                    <div
                      className="font-mono text-sm font-bold"
                      style={{ color: "oklch(0.65 0.22 25)" }}
                    >
                      {g.struggles}
                    </div>
                    <div className="text-[9px] text-muted-foreground uppercase tracking-wide">
                      Alerts
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* ===== SECTION B: Curriculum Coverage ===== */}
        <motion.section
          initial={{ opacity: 0, x: 13 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          data-ocid="principal_reports.curriculum_section"
          className="space-y-[13px]"
        >
          {/* Section B header — teal accent */}
          <div
            className="glass-knowledge-surface rounded-xl px-5 py-3 flex items-center gap-3"
            style={{ borderLeft: `3px solid ${TEAL}` }}
          >
            <BookOpen className="h-4 w-4 shrink-0" style={{ color: TEAL }} />
            <div>
              <p className="font-display font-bold text-base text-foreground leading-none">
                Curriculum Coverage
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Subject × grade band · STMP registry status
              </p>
            </div>
          </div>

          {/* Coverage matrix */}
          <div
            className="glass-knowledge-surface rounded-xl p-5 overflow-x-auto"
            data-ocid="principal_reports.coverage_matrix"
          >
            <table className="w-full min-w-[320px]">
              <thead>
                <tr>
                  <th className="text-left pb-3 pr-3 text-[9px] uppercase tracking-widest text-muted-foreground/60 font-semibold">
                    Subject
                  </th>
                  {GRADE_BANDS.map((band) => (
                    <th
                      key={band}
                      className="pb-3 text-center text-[9px] uppercase tracking-widest text-muted-foreground/60 font-semibold"
                    >
                      {band}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SUBJECTS.map((subj, si) => (
                  <motion.tr
                    key={subj}
                    data-ocid={`principal_reports.coverage_row.${si + 1}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + si * 0.06 }}
                    className="border-t border-white/5"
                  >
                    <td className="py-3 pr-3 text-xs font-semibold text-foreground whitespace-nowrap">
                      {subj}
                    </td>
                    {COVERAGE_MATRIX[subj].map((level, ci) => {
                      const dot = COVERAGE_DOT[level];
                      return (
                        <td
                          key={`${subj}-${GRADE_BANDS[ci]}`}
                          className="py-3 text-center"
                        >
                          <div className="flex flex-col items-center gap-1">
                            <div
                              className="w-4 h-4 rounded-full mx-auto"
                              style={{
                                background: dot.bg,
                                boxShadow: `0 0 8px ${dot.bg}60`,
                              }}
                              title={dot.label}
                            />
                          </div>
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {/* Legend */}
            <div className="flex items-center gap-[13px] mt-5 pt-3 border-t border-white/5">
              {Object.entries(COVERAGE_DOT).map(([key, val]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: val.bg }}
                  />
                  <span className="text-[10px] text-muted-foreground capitalize">
                    {val.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-[8px]">
            {[
              {
                label: "Fully Covered",
                value: "62%",
                color: "oklch(0.72 0.20 145)",
              },
              { label: "Partial", value: "27%", color: GOLD },
              { label: "Sparse", value: "11%", color: "oklch(0.65 0.22 25)" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-knowledge-surface rounded-xl p-[13px] text-center"
              >
                <div
                  className="font-mono font-bold text-lg"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
                <div className="text-[10px] text-muted-foreground mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
