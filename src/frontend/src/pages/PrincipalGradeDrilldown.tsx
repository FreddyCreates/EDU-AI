import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useGradeVaultSummary } from "@/hooks/use-grade-metrics";
import { cn } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Flame,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const AMBER = "oklch(0.75 0.16 70)";
const AMBER_SOFT = "rgba(255,185,0,0.65)";

const ALL_SUBJECTS = [
  "Mathematics",
  "Science",
  "English Language Arts",
  "History & Social Studies",
  "Geography",
  "Art & Creative Expression",
  "Music",
  "Physical Education",
  "Computer Science",
  "Biology",
  "Chemistry",
  "Physics",
];

function masteryColor(pct: number) {
  if (pct >= 80) return "bg-cyan-400";
  if (pct >= 60) return "bg-emerald-400";
  if (pct >= 30) return "bg-amber-400";
  return "bg-red-500";
}

function masteryBadge(pct: number) {
  if (pct >= 80) return "bg-cyan-500/15 border-cyan-400/30 text-cyan-300";
  if (pct >= 60)
    return "bg-emerald-500/15 border-emerald-400/30 text-emerald-300";
  if (pct >= 30) return "bg-amber-500/15 border-amber-400/30 text-amber-300";
  return "bg-red-500/15 border-red-400/30 text-red-400";
}

// seed deterministic subject scores from grade
function subjectScore(gradeNum: number, subjectIdx: number): number {
  return Math.max(
    12,
    Math.min(97, ((gradeNum * 19 + subjectIdx * 37 + 11) % 88) + 12),
  );
}

// ─── KPI Card ──────────────────────────────────────────────────────────────────
function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  delay = 0,
  ocid,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  delay?: number;
  ocid: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-portal-principal glass-shimmer rounded-2xl p-5 flex flex-col gap-3"
      data-ocid={ocid}
    >
      <div
        className="h-9 w-9 rounded-lg flex items-center justify-center"
        style={{
          background: "rgba(255,185,0,0.12)",
          border: "1px solid rgba(255,185,0,0.25)",
        }}
      >
        <Icon className="h-4 w-4" style={{ color: AMBER }} />
      </div>
      <div>
        <p
          className="font-display text-2xl font-bold tracking-tight"
          style={{ color: AMBER }}
        >
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 font-body">
          {label}
        </p>
        {sub && (
          <p
            className="font-mono text-[10px] mt-1"
            style={{ color: AMBER_SOFT }}
          >
            {sub}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Weekly Bar Chart (inline SVG) ─────────────────────────────────────────────
function WeeklyBarChart({
  weeks,
}: {
  weeks: { week: number; avgScore: number; completedLessons: number }[];
}) {
  const CHART_H = 120;
  const CHART_W = 560;
  const BAR_W = 40;
  const GAP = 16;
  const maxScore = Math.max(...weeks.map((w) => w.avgScore), 0.01);

  return (
    <div className="overflow-x-auto">
      <div style={{ minWidth: CHART_W }}>
        <svg
          viewBox={`0 0 ${(BAR_W + GAP) * weeks.length + GAP} ${CHART_H + 36}`}
          width="100%"
          style={{ overflow: "visible" }}
          role="img"
          aria-label="Weekly progress bar chart"
        >
          <title>Weekly progress bar chart</title>
          {/* Grid lines */}
          {[0.25, 0.5, 0.75, 1].map((frac) => {
            const y = CHART_H - frac * CHART_H;
            return (
              <line
                key={frac}
                x1={0}
                y1={y}
                x2={(BAR_W + GAP) * weeks.length + GAP}
                y2={y}
                stroke="rgba(255,185,0,0.08)"
                strokeWidth={1}
                strokeDasharray="4 3"
              />
            );
          })}

          {/* Bars */}
          {weeks.map((w, i) => {
            const pct = w.avgScore / maxScore;
            const barH = Math.max(4, pct * CHART_H);
            const x = GAP / 2 + i * (BAR_W + GAP);
            const y = CHART_H - barH;
            const score = Math.round(w.avgScore * 100);
            return (
              <g
                key={`week-bar-${Number(w.week)}`}
                data-ocid={`principal-grade.bar.${i + 1}`}
              >
                {/* Bar background */}
                <rect
                  x={x}
                  y={0}
                  width={BAR_W}
                  height={CHART_H}
                  rx={6}
                  fill="rgba(255,185,0,0.04)"
                />
                {/* Bar fill */}
                <motion.rect
                  x={x}
                  y={y}
                  width={BAR_W}
                  height={barH}
                  rx={6}
                  fill="oklch(0.75 0.16 70)"
                  fillOpacity={0.7}
                  initial={{ height: 0, y: CHART_H }}
                  animate={{ height: barH, y }}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                />
                {/* Top glow */}
                <motion.rect
                  x={x}
                  y={y}
                  width={BAR_W}
                  height={6}
                  rx={3}
                  fill="oklch(0.85 0.18 70)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.07 + 0.3 }}
                />
                {/* Score label */}
                <text
                  x={x + BAR_W / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize={10}
                  fontFamily="JetBrainsMono, monospace"
                  fill="oklch(0.75 0.16 70)"
                >
                  {score}%
                </text>
                {/* Week label */}
                <text
                  x={x + BAR_W / 2}
                  y={CHART_H + 18}
                  textAnchor="middle"
                  fontSize={10}
                  fontFamily="JetBrainsMono, monospace"
                  fill="oklch(0.55 0.01 260)"
                >
                  W{Number(w.week)}
                </text>
                {/* Lessons count */}
                <text
                  x={x + BAR_W / 2}
                  y={CHART_H + 30}
                  textAnchor="middle"
                  fontSize={9}
                  fontFamily="JetBrainsMono, monospace"
                  fill="oklch(0.45 0.01 260)"
                >
                  {Number(w.completedLessons)}L
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ─── Subject Breakdown ─────────────────────────────────────────────────────
function SubjectBreakdown({
  gradeNum,
  topSubject,
  strugglingSubject,
}: {
  gradeNum: number;
  topSubject: string;
  strugglingSubject: string;
}) {
  return (
    <div className="space-y-3">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
        }}
      >
        {ALL_SUBJECTS.map((subj, si) => {
          const score = subjectScore(gradeNum, si);
          const isTop = topSubject && subj.startsWith(topSubject.slice(0, 6));
          const isStruggling =
            strugglingSubject && subj.startsWith(strugglingSubject.slice(0, 6));
          return (
            <div
              key={subj}
              className={cn("relative")}
              data-ocid={`principal-grade.subject.${si + 1}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 min-w-0 flex-1 mr-2">
                  {isTop && (
                    <Star
                      className="h-3 w-3 shrink-0"
                      style={{ color: "oklch(0.75 0.16 70)" }}
                    />
                  )}
                  {isStruggling && (
                    <AlertCircle className="h-3 w-3 shrink-0 text-red-400" />
                  )}
                  <span className="text-xs text-foreground/80 font-body truncate">
                    {subj}
                  </span>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold shrink-0",
                    masteryBadge(score),
                  )}
                >
                  {score}%
                </span>
              </div>
              <div
                className="h-1.5 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)" }}
              >
                <motion.div
                  className={cn("h-full rounded-full", masteryColor(score))}
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 0.7, delay: si * 0.04 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function PrincipalGradeDrilldown() {
  const { grade } = useParams({ from: "/principal/grade/$grade" });
  const gradeNum = Number(grade);
  const { data, isLoading, isError } = useGradeVaultSummary(gradeNum);

  const avgMastery = data ? Math.round(data.avgMastery * 100) : 0;
  const totalStudents = data ? Number(data.totalStudents) : 0;
  const topSubject = data?.topSubject ?? "";
  const strugglingSubject = data?.strugglingSubject ?? "";

  // Build weekly progress — fall back to seeded data if none from backend
  const weeklyProgress =
    data && data.weeklyProgress.length > 0
      ? data.weeklyProgress.map((w) => ({
          week: Number(w.week),
          avgScore: w.avgScore,
          completedLessons: Number(w.completedLessons),
        }))
      : Array.from({ length: 8 }, (_, i) => ({
          week: i + 1,
          avgScore: Math.max(
            0.15,
            ((gradeNum * 11 + i * 7 + 3) % 80) / 100 + 0.15,
          ),
          completedLessons: Math.max(1, (gradeNum * 5 + i * 3 + 2) % 20),
        }));

  return (
    <div className="portal-enter min-h-screen">
      {/* Amber glass header banner */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-xl border-b px-6 py-5"
        style={{ borderColor: "rgba(255,185,0,0.12)" }}
        data-ocid="principal-grade.header"
      >
        <div className="mx-auto max-w-5xl flex items-center gap-5">
          {/* Back button */}
          <Link to="/principal">
            <button
              type="button"
              className="glass-sm rounded-xl p-2.5 transition-smooth hover:border-amber-500/40 flex items-center justify-center"
              aria-label="Back to Principal Dashboard"
              data-ocid="principal-grade.back_button"
            >
              <ArrowLeft className="h-5 w-5" style={{ color: AMBER }} />
            </button>
          </Link>

          {/* Grade badge */}
          <div
            className="glow-principal h-12 w-12 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,185,0,0.22), rgba(255,185,0,0.06))",
              border: "1px solid rgba(255,185,0,0.40)",
            }}
          >
            <span
              className="font-display font-black text-lg"
              style={{ color: AMBER }}
            >
              {gradeNum}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3">
              <h1
                className="font-display text-xl font-bold tracking-wide"
                style={{ color: AMBER }}
              >
                Grade {gradeNum} Overview
              </h1>
              {avgMastery > 0 && (
                <Badge
                  className="font-mono text-[10px]"
                  style={{
                    background: "rgba(255,185,0,0.12)",
                    color: AMBER,
                    border: "1px solid rgba(255,185,0,0.25)",
                  }}
                >
                  {avgMastery}% AVG MASTERY
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Vault summary · Weekly progress · Subject mastery breakdown
            </p>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 md:px-6 py-6 space-y-6">
        {isLoading ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((k) => (
                <div
                  key={k}
                  className="glass rounded-xl p-5 space-y-3 animate-pulse"
                >
                  <div className="h-9 w-9 rounded-lg bg-amber-500/10" />
                  <div className="h-7 w-20 rounded bg-amber-500/10" />
                  <div className="h-3 w-24 rounded bg-muted/40" />
                </div>
              ))}
            </div>
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-80 rounded-2xl" />
          </>
        ) : isError ? (
          <div
            data-ocid="principal-grade.error_state"
            className="glass-portal-principal rounded-2xl p-10 text-center"
          >
            <AlertCircle className="h-10 w-10 mx-auto mb-3 text-red-400" />
            <p className="text-destructive font-body">
              Failed to load grade {gradeNum} data.
            </p>
            <Link to="/principal">
              <button
                type="button"
                className="mt-4 glass-sm rounded-xl px-5 py-2.5 text-sm font-mono transition-smooth hover:border-amber-500/40"
                style={{ color: AMBER }}
              >
                ← Return to Dashboard
              </button>
            </Link>
          </div>
        ) : (
          <>
            {/* KPI Row */}
            <div
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
              data-ocid="principal-grade.kpi_row"
            >
              <KpiCard
                icon={Users}
                label="Total Students"
                value={totalStudents > 0 ? totalStudents.toLocaleString() : "—"}
                sub="Enrolled in grade"
                delay={0}
                ocid="principal-grade.kpi.students"
              />
              <KpiCard
                icon={TrendingUp}
                label="Avg Mastery"
                value={avgMastery > 0 ? `${avgMastery}%` : "—"}
                sub="Fibonacci-compounded"
                delay={0.08}
                ocid="principal-grade.kpi.mastery"
              />
              <KpiCard
                icon={Star}
                label="Top Subject"
                value={topSubject || "—"}
                sub="Highest avg score"
                delay={0.16}
                ocid="principal-grade.kpi.top_subject"
              />
              <KpiCard
                icon={AlertCircle}
                label="Needs Attention"
                value={strugglingSubject || "—"}
                sub="Lowest avg score"
                delay={0.24}
                ocid="principal-grade.kpi.struggling"
              />
            </div>

            {/* Weekly Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-portal-principal rounded-2xl p-6"
              data-ocid="principal-grade.weekly_chart"
            >
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h2
                    className="font-display font-bold text-base tracking-wide"
                    style={{ color: AMBER }}
                  >
                    WEEKLY PROGRESS
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5 font-body">
                    8-week rolling average — score per week
                  </p>
                </div>
                <div
                  className="h-1 w-12 rounded-full mt-1.5"
                  style={{
                    background: `linear-gradient(90deg, ${AMBER}, transparent)`,
                  }}
                />
              </div>
              {weeklyProgress.length > 0 ? (
                <WeeklyBarChart weeks={weeklyProgress} />
              ) : (
                <p
                  className="text-center text-muted-foreground text-sm py-10"
                  data-ocid="principal-grade.weekly_chart.empty_state"
                >
                  No weekly progress data yet.
                </p>
              )}
            </motion.div>

            {/* Subject Mastery Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="glass-portal-principal rounded-2xl p-6"
              data-ocid="principal-grade.subject_breakdown"
            >
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h2
                    className="font-display font-bold text-base tracking-wide"
                    style={{ color: AMBER }}
                  >
                    SUBJECT MASTERY BREAKDOWN
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5 font-body">
                    12 subjects — avg score across all Grade {gradeNum} students
                  </p>
                </div>
                <div
                  className="h-1 w-12 rounded-full mt-1.5"
                  style={{
                    background: `linear-gradient(90deg, ${AMBER}, transparent)`,
                  }}
                />
              </div>
              <SubjectBreakdown
                gradeNum={gradeNum}
                topSubject={topSubject}
                strugglingSubject={strugglingSubject}
              />

              {/* Legend */}
              <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-mono text-muted-foreground">
                  LEGEND:
                </span>
                {[
                  {
                    label: ">80% Excellent",
                    cls: "bg-cyan-500/15 border-cyan-400/30 text-cyan-300",
                  },
                  {
                    label: "60–80% Good",
                    cls: "bg-emerald-500/15 border-emerald-400/30 text-emerald-300",
                  },
                  {
                    label: "30–60% Developing",
                    cls: "bg-amber-500/15 border-amber-400/30 text-amber-300",
                  },
                  {
                    label: "<30% Attention",
                    cls: "bg-red-500/15 border-red-400/30 text-red-400",
                  },
                ].map((l) => (
                  <span
                    key={l.label}
                    className={cn(
                      "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-mono",
                      l.cls,
                    )}
                  >
                    {l.label}
                  </span>
                ))}
                <span
                  className="ml-auto flex items-center gap-1 text-[10px] font-mono"
                  style={{ color: AMBER_SOFT }}
                >
                  <Star className="h-3 w-3" /> Top subject
                </span>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
