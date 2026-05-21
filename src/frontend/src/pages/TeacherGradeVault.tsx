import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGradeVaultSummary } from "@/hooks/use-grade-metrics";
import { useListDigestJobs } from "@/hooks/useBackend";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  BookOpen,
  ChevronRight,
  FileText,
  FlaskConical,
  Lock,
  RefreshCw,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const GRADES = [
  "K",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];
const SUBJECTS = [
  "Mathematics",
  "Science",
  "English Language Arts",
  "History",
  "Geography",
  "Physics",
  "Chemistry",
  "Biology",
  "Algebra",
  "Geometry",
  "Literature",
  "Government",
];

const PURPLE = "oklch(0.68 0.18 280)";

// Div-based sparkline — 7 data points, no external lib
function Sparkline({
  data,
  color = "rgba(160,100,255,0.7)",
}: { data: number[]; color?: string }) {
  if (!data.length) return null;
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-0.5 h-8" aria-hidden="true">
      {data.map((v, barIdx) => (
        <div
          key={`bar-${barIdx}-${v}`}
          className="flex-1 rounded-sm min-w-0 transition-all duration-500"
          style={{
            height: `${Math.max((v / max) * 100, 4)}%`,
            background: color,
            opacity: 0.5 + (barIdx / data.length) * 0.5,
          }}
        />
      ))}
    </div>
  );
}

export default function TeacherGradeVault() {
  const [selectedGrade, setSelectedGrade] = useState("6");

  const gradeNum = selectedGrade === "K" ? 0 : Number(selectedGrade);
  const { data: vaultSummary, isLoading } = useGradeVaultSummary(gradeNum);
  const { data: digestJobs = [], refetch: refreshJobs } = useListDigestJobs();

  const subjectCount = selectedGrade === "K" ? 4 : Math.min(12, gradeNum + 3);
  const subjectsForGrade = SUBJECTS.slice(0, subjectCount);

  // Build per-subject data: merge live avgMastery with sparkline from weeklyProgress
  const weeklyTrend = vaultSummary?.weeklyProgress
    ? vaultSummary.weeklyProgress.slice(0, 7).map((w) => w.avgScore)
    : [55, 61, 58, 67, 63, 71, 68];

  return (
    <div className="portal-enter min-h-screen" data-ocid="grade_vault.page">
      {/* OS Header */}
      <div
        className="glass-portal-teacher glass-shimmer sticky top-0 z-30"
        style={{ borderBottom: "1px solid rgba(160,100,255,0.18)" }}
      >
        <div className="mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2.5 rounded-xl px-4 py-2"
              style={{
                background:
                  "linear-gradient(135deg, rgba(160,100,255,0.22) 0%, rgba(100,60,180,0.15) 100%)",
                border: "1px solid rgba(160,100,255,0.35)",
              }}
            >
              <Lock className="h-4 w-4 text-violet-300" />
              <span
                className="font-display font-bold text-sm text-violet-200"
                style={{ letterSpacing: "0.18em" }}
              >
                GRADE VAULT
              </span>
            </div>
            <div>
              <p className="font-display font-semibold text-foreground text-base leading-none">
                GVLT · Fibonacci-Gated Curriculum
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Grade-locked content registry · Sovereign content gates
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {vaultSummary && (
              <>
                <div className="glass-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-violet-400" />
                  <span className="text-xs font-mono text-foreground">
                    {Number(vaultSummary.totalStudents)} students
                  </span>
                </div>
                <div className="glass-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-xs font-mono text-foreground">
                    {(vaultSummary.avgMastery * 100).toFixed(0)}% avg mastery
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 py-6 space-y-6">
        {/* Grade selector */}
        <div
          className="flex flex-wrap gap-2"
          data-ocid="grade_vault.grade_selector"
        >
          {GRADES.map((g, i) => (
            <motion.button
              key={g}
              type="button"
              data-ocid={`grade_vault.grade_tab.${i + 1}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setSelectedGrade(g)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-smooth border",
                selectedGrade === g
                  ? "glass-portal-teacher text-foreground"
                  : "glass-sm text-muted-foreground border-transparent hover:border-white/10 hover:text-foreground",
              )}
              style={
                selectedGrade === g
                  ? { borderColor: "rgba(160,100,255,0.4)" }
                  : {}
              }
            >
              {g === "K" ? "Kindergarten" : `Grade ${g}`}
            </motion.button>
          ))}
        </div>

        {/* Vault summary strip */}
        {isLoading ? (
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
        ) : vaultSummary ? (
          <div
            className="grid grid-cols-3 gap-4"
            data-ocid="grade_vault.summary_strip"
          >
            {[
              {
                label: "Top Subject",
                value: vaultSummary.topSubject || "Mathematics",
                icon: Star,
                color: "text-amber-400",
              },
              {
                label: "Struggling Subject",
                value: vaultSummary.strugglingSubject || "Geometry",
                icon: AlertTriangle,
                color: "text-red-400",
              },
              {
                label: "Weekly Trend",
                value: `+${weeklyTrend[weeklyTrend.length - 1] - weeklyTrend[0] > 0 ? (((weeklyTrend[weeklyTrend.length - 1] - weeklyTrend[0]) * 100) / Math.max(weeklyTrend[0], 1)).toFixed(0) : 0}%`,
                icon: TrendingUp,
                color: "text-emerald-400",
              },
            ].map(({ label, value, icon: Icon, color }, _i) => (
              <div
                key={label}
                className="glass-portal-teacher rounded-2xl p-4 flex items-center gap-3 glass-shimmer"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
                  style={{
                    background: "rgba(160,100,255,0.12)",
                    border: "1px solid rgba(160,100,255,0.22)",
                  }}
                >
                  <Icon className={`h-5 w-5 ${color}`} />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold text-base text-foreground truncate">
                    {value}
                  </p>
                  <p className="text-xs text-muted-foreground">{label}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Subject cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {subjectsForGrade.map((subject, i) => {
            const avgMastery = vaultSummary
              ? vaultSummary.avgMastery
              : 0.55 + ((i * 0.04) % 0.4);
            const masteryPct = Math.round(avgMastery * 100);
            const studentsAtLevel = vaultSummary
              ? Math.floor(
                  Number(vaultSummary.totalStudents) *
                    (0.6 + ((i * 0.04) % 0.35)),
                )
              : Math.floor(18 + ((i * 3.5) % 14));
            const trendData: number[] =
              weeklyTrend.length >= 7
                ? weeklyTrend
                    .slice(0, 7)
                    .map((v) => v * (0.85 + ((i * 0.02) % 0.3)))
                : [55, 61, 58, 67, 63, 71, 68].map(
                    (v) => v * (0.85 + ((i * 0.02) % 0.3)),
                  );

            return (
              <motion.div
                key={subject}
                data-ocid={`grade_vault.subject_card.${i + 1}`}
                initial={{ opacity: 0, y: 13 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-portal-teacher rounded-xl p-5 space-y-4 cursor-pointer group hover:scale-[1.01] transition-smooth glass-shimmer"
              >
                {/* Card header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(160,100,255,0.12)",
                        border: "1px solid rgba(160,100,255,0.25)",
                      }}
                    >
                      <BookOpen className="h-4 w-4" style={{ color: PURPLE }} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display font-semibold text-sm text-foreground truncate">
                        {subject}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Grade {selectedGrade}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  {[
                    {
                      icon: FileText,
                      label: "Lessons",
                      val: Math.floor(8 + ((i * 2.5) % 13)),
                    },
                    {
                      icon: FlaskConical,
                      label: "Quizzes",
                      val: Math.floor(3 + ((i * 1.618) % 8)),
                    },
                    {
                      icon: Star,
                      label: "Seeds",
                      val: Math.floor(21 + ((i * 5.2) % 34)),
                    },
                  ].map(({ icon: Icon, label, val }) => (
                    <div key={label} className="glass-sm rounded-lg py-2">
                      <Icon
                        className="h-3 w-3 mx-auto mb-1"
                        style={{ color: PURPLE }}
                      />
                      <p className="text-xs font-bold text-foreground">{val}</p>
                      <p className="text-[9px] text-muted-foreground">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* avgMastery bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Avg Mastery</span>
                    <span
                      className="font-mono font-bold"
                      style={{ color: PURPLE }}
                    >
                      {masteryPct}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: "rgba(160,100,255,0.12)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${masteryPct}%` }}
                      transition={{
                        delay: i * 0.05 + 0.3,
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                      style={{ background: PURPLE }}
                    />
                  </div>
                </div>

                {/* Students at level */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" style={{ color: PURPLE }} />
                    <span className="text-xs text-muted-foreground">
                      {studentsAtLevel} at level
                    </span>
                  </div>
                  {/* Weekly trend sparkline — 7 bars, no lib */}
                  <div className="flex flex-col items-end gap-0.5">
                    <p className="text-[9px] text-muted-foreground font-mono">
                      7-day trend
                    </p>
                    <Sparkline data={trendData} color={PURPLE} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Active Digest Jobs */}
        <div
          className="glass-portal-teacher rounded-xl p-6"
          data-ocid="grade_vault.digest_jobs_panel"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg glass-sm">
                <Activity className="h-3.5 w-3.5 text-violet-400" />
              </div>
              <span className="font-display font-semibold text-sm text-foreground">
                Active Digest Jobs
              </span>
              <Badge
                className="font-mono text-xs border"
                style={{
                  background: "rgba(160,100,255,0.12)",
                  borderColor: "rgba(160,100,255,0.30)",
                  color: "rgba(200,160,255,0.85)",
                }}
              >
                {digestJobs.length}
              </Badge>
            </div>
            <Button
              type="button"
              size="sm"
              data-ocid="grade_vault.refresh_jobs_button"
              onClick={() => refreshJobs()}
              className="gap-1.5 text-xs h-7"
              style={{
                background: "rgba(160,100,255,0.15)",
                border: "1px solid rgba(160,100,255,0.28)",
                color: "rgba(200,160,255,0.9)",
              }}
            >
              <RefreshCw className="h-3 w-3" /> Refresh
            </Button>
          </div>

          {digestJobs.length === 0 ? (
            <div
              className="glass-sm rounded-xl p-6 flex flex-col items-center gap-3"
              style={{ border: "1px dashed rgba(160,100,255,0.25)" }}
              data-ocid="grade_vault.digest_jobs_empty_state"
            >
              <Activity className="h-8 w-8 text-violet-400/40" />
              <p className="text-sm text-muted-foreground text-center">
                No active jobs. Digest curriculum from the Admin panel to see
                jobs here.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {digestJobs.map((job, idx) => {
                const statusVariant =
                  "status" in job && String(job.status) === "complete"
                    ? {
                        bg: "rgba(0,200,100,0.15)",
                        border: "rgba(0,200,100,0.35)",
                        color: "rgba(80,220,140,0.9)",
                        label: "Complete",
                      }
                    : "status" in job && String(job.status) === "processing"
                      ? {
                          bg: "rgba(255,185,0,0.12)",
                          border: "rgba(255,185,0,0.30)",
                          color: "rgba(255,200,60,0.9)",
                          label: "Processing",
                        }
                      : {
                          bg: "rgba(120,120,140,0.15)",
                          border: "rgba(120,120,140,0.28)",
                          color: "rgba(160,160,180,0.85)",
                          label: "Pending",
                        };
                const ts =
                  "createdAt" in job ? Number(job.createdAt) / 1_000_000 : 0;
                const dateStr =
                  ts > 0
                    ? new Date(ts).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "—";
                return (
                  <div
                    key={"jobId" in job ? String(job.jobId) : String(idx)}
                    data-ocid={`grade_vault.digest_job.${idx + 1}`}
                    className="glass-sm rounded-xl px-4 py-3 flex items-center justify-between gap-3 transition-smooth hover:glass-portal-teacher"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-display font-semibold text-sm text-foreground truncate">
                        {"title" in job ? String(job.title) : "Digest Job"}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">
                        {"subject" in job ? String(job.subject) : ""}
                        {"gradeLevel" in job
                          ? ` · Grade ${Number(job.gradeLevel)}`
                          : ""}
                        {ts > 0 ? ` · ${dateStr}` : ""}
                      </p>
                    </div>
                    <Badge
                      className="shrink-0 text-xs font-mono border"
                      style={{
                        background: statusVariant.bg,
                        borderColor: statusVariant.border,
                        color: statusVariant.color,
                      }}
                    >
                      {statusVariant.label}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
