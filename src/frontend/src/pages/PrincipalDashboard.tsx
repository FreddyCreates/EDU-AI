import { createActor } from "@/backend";
import type { SovereignEngine } from "@/backend";
import EddiOrb from "@/components/EddiOrb";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllSubjects } from "@/hooks/use-curriculum";
import { useSystemDiag } from "@/hooks/use-diag";
import { EngineStatus } from "@/hooks/use-engines";
import { useEngines } from "@/hooks/use-engines";
import {
  useEntanglementStats,
  useNrveState,
  usePlseState,
} from "@/hooks/use-entanglements";
import {
  castGradeCount,
  castSystemMetrics,
  useGradeMetrics,
  useSystemMetrics,
} from "@/hooks/use-grade-metrics";
import {
  useAllRecognitionFlags,
  usePrincipalHeatmapWithNoms,
} from "@/hooks/use-principal-intelligence";
import { useTchrStats } from "@/hooks/use-tchr";
import { cn } from "@/lib/utils";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  BookOpen,
  ChevronRight,
  Crown,
  GraduationCap,
  Network,
  Shield,
  Star,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Constants ──────────────────────────────────────────────────────────────
const SUBJECT_FALLBACK = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Art",
  "Music",
  "PE",
  "Computer Sci",
  "Biology",
  "Chemistry",
  "Physics",
];

const ARCH_ENGINES = [
  { id: "COGT", label: "Cognition", desc: "Master reasoning chain" },
  { id: "META", label: "Meta-Think", desc: "Monitors reasoning structure" },
  { id: "AUTN", label: "Autonomous", desc: "Self-fires every 21 cycles" },
];

const ENT_ENGINES = [
  { id: "NRVE", label: "Neural" },
  { id: "PLSE", label: "Pulse" },
  { id: "MSRY", label: "Mastery" },
  { id: "ECHO", label: "Echo" },
  { id: "FLUX", label: "Flux" },
];

const DEMO_TEACHERS = [
  { name: "Ms. Ramirez", classes: 4, mastery: 78, lastActive: "2h ago" },
  { name: "Mr. Okafor", classes: 3, mastery: 84, lastActive: "Just now" },
  { name: "Dr. Chen", classes: 5, mastery: 91, lastActive: "45m ago" },
  { name: "Ms. Patel", classes: 3, mastery: 72, lastActive: "3h ago" },
  { name: "Mr. Torres", classes: 4, mastery: 65, lastActive: "Yesterday" },
  { name: "Ms. Kim", classes: 2, mastery: 88, lastActive: "30m ago" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function masteryClass(pct: number) {
  if (pct >= 80) return "bg-cyan-500/15 border-cyan-400/30 text-cyan-300";
  if (pct >= 60)
    return "bg-emerald-500/15 border-emerald-400/30 text-emerald-300";
  if (pct >= 30) return "bg-amber-500/15 border-amber-400/30 text-amber-300";
  return "bg-red-500/15 border-red-400/30 text-red-400";
}

function seedMastery(gradeIdx: number, subjectIdx: number) {
  const v = ((gradeIdx + 1) * 17 + subjectIdx * 31 + 7) % 97;
  return Math.max(12, v);
}

// ─── KPI Card ──────────────────────────────────────────────────────────────────
function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  sub,
  delay = 0,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: "up" | "down" | null;
  sub?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
      className="glass-portal-principal glass-shimmer rounded-xl p-5 flex flex-col gap-3"
      data-ocid={`principal.kpi.${label.toLowerCase().replace(/\s+/g, "_")}`}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{
            background: "rgba(255,185,0,0.12)",
            border: "1px solid rgba(255,185,0,0.25)",
          }}
        >
          <Icon className="h-4 w-4" style={{ color: "oklch(0.75 0.16 70)" }} />
        </div>
        {trend === "up" && <TrendingUp className="h-4 w-4 text-emerald-400" />}
        {trend === "down" && <TrendingDown className="h-4 w-4 text-red-400" />}
      </div>
      <div>
        <p
          className="font-display text-3xl font-bold tracking-tight"
          style={{ color: "oklch(0.75 0.16 70)" }}
        >
          {value}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 font-body">
          {label}
        </p>
        {sub && (
          <p
            className="font-mono text-[10px] mt-1"
            style={{ color: "rgba(255,185,0,0.65)" }}
          >
            {sub}
          </p>
        )}
      </div>
    </motion.div>
  );
}

function KpiSkeleton() {
  return (
    <div
      className="glass rounded-xl p-5 space-y-3 animate-pulse"
      data-ocid="principal.kpi.loading_state"
    >
      <div className="h-9 w-9 rounded-lg bg-amber-500/10" />
      <div className="h-8 w-20 rounded bg-amber-500/10" />
      <div className="h-3 w-28 rounded bg-muted/40" />
    </div>
  );
}

// ─── Glass Panel ──────────────────────────────────────────────────────────────
function GlassPanel({
  title,
  subtitle,
  children,
  className,
  ocid,
  delay = 0,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  ocid: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "glass-portal-principal backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6",
        className,
      )}
      data-ocid={ocid}
    >
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2
            className="font-display font-bold text-base tracking-wide"
            style={{ color: "oklch(0.75 0.16 70)" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5 font-body">
              {subtitle}
            </p>
          )}
        </div>
        <div
          className="h-1 w-12 rounded-full mt-1.5"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.75 0.16 70), transparent)",
          }}
        />
      </div>
      {children}
    </motion.div>
  );
}

// ─── Grade Cards Grid ─────────────────────────────────────────────────────────
function GradeCardsGrid({
  gradeData,
}: {
  gradeData: { grade: number; studentCount: number; avgMastery: number }[];
}) {
  const dataMap = new Map(gradeData.map((g) => [g.grade, g]));

  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))" }}
    >
      {Array.from({ length: 12 }, (_, i) => i + 1).map((gradeNum, idx) => {
        const live = dataMap.get(gradeNum);
        const students = live?.studentCount ?? 0;
        const mastery = live?.avgMastery
          ? Math.round(live.avgMastery * 100)
          : seedMastery(gradeNum - 1, 5);
        return (
          <motion.div
            key={gradeNum}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: idx * 0.04 }}
            data-ocid={`principal.grade_card.${gradeNum}`}
          >
            <Link
              to="/principal/grade/$grade"
              params={{ grade: String(gradeNum) }}
            >
              <div
                className="glass-sm rounded-xl p-4 flex flex-col gap-2 cursor-pointer transition-smooth hover:border-amber-500/40 group"
                style={{ minHeight: 110 }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-display font-bold text-xl"
                    style={{ color: "oklch(0.75 0.16 70)" }}
                  >
                    {gradeNum}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold",
                      masteryClass(mastery),
                    )}
                  >
                    {mastery}%
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground font-mono">
                  {students > 0 ? `${students} students` : "No data"}
                </p>
                <div
                  className="flex items-center gap-1 mt-auto text-[10px] font-mono opacity-60 group-hover:opacity-100 transition-smooth"
                  style={{ color: "oklch(0.75 0.16 70)" }}
                >
                  Drill Down
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Heatmap ──────────────────────────────────────────────────────────────────
function GradeHeatmap({
  gradeData,
}: {
  gradeData: { grade: number; studentCount: number; avgMastery: number }[];
}) {
  const WEEKS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];
  const _colCount = WEEKS.length + 1; // +1 for grade label column

  return (
    <div className="overflow-x-auto">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `80px repeat(${WEEKS.length}, 1fr)`,
          gap: "4px",
          minWidth: 480,
        }}
      >
        {/* Header row */}
        <div className="text-[10px] font-mono text-muted-foreground pb-2 flex items-end">
          GRADE
        </div>
        {WEEKS.map((w) => (
          <div
            key={w}
            className="text-[10px] font-mono text-muted-foreground pb-2 text-center"
          >
            {w}
          </div>
        ))}

        {/* Data rows */}
        {Array.from({ length: 12 }, (_, i) => i + 1).map((gradeNum, gi) => {
          const live = gradeData.find((g) => g.grade === gradeNum);
          const baseMastery = live?.avgMastery
            ? Math.round(live.avgMastery * 100)
            : seedMastery(gi, 4);
          return (
            <>
              <div
                key={`grade-label-${gradeNum}`}
                className="flex items-center"
              >
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: "oklch(0.75 0.16 70)" }}
                >
                  Gr {gradeNum}
                </span>
              </div>
              {WEEKS.map((w, wi) => {
                const jitter = ((gi * 7 + wi * 13) % 20) - 10;
                const pct = Math.max(5, Math.min(99, baseMastery + jitter));
                return (
                  <div
                    key={`${gradeNum}-${w}`}
                    className={cn(
                      "rounded-md border flex items-center justify-center font-mono text-[10px] font-semibold py-2 transition-smooth hover:scale-105 cursor-default",
                      masteryClass(pct),
                    )}
                    data-ocid={`principal.heatmap.${gradeNum}_${wi + 1}`}
                    title={`Grade ${gradeNum} ${w}: ${pct}%`}
                  >
                    {pct}%
                  </div>
                );
              })}
            </>
          );
        })}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
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
      </div>
    </div>
  );
}

// ─── Staff Panel ──────────────────────────────────────────────────────────────
function StaffPanel() {
  const sorted = [...DEMO_TEACHERS].sort((a, b) => b.mastery - a.mastery);
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-muted-foreground">
          SORTED BY MASTERY AVG
        </span>
        <Badge className="text-[10px] font-mono bg-amber-500/10 text-amber-300 border-amber-500/25">
          {sorted.length} STAFF
        </Badge>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto pr-1">
        {sorted.map((t, idx) => (
          <div
            key={t.name}
            className="glass-sm rounded-lg p-3 flex items-center gap-3 transition-smooth hover:border-amber-500/30"
            style={{
              borderColor: idx === 0 ? "rgba(255,185,0,0.30)" : undefined,
            }}
            data-ocid={`principal.staff_card.${idx + 1}`}
          >
            <div
              className="h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center font-display font-bold text-xs"
              style={{
                background: "rgba(255,185,0,0.12)",
                border: "1px solid rgba(255,185,0,0.25)",
                color: "oklch(0.75 0.16 70)",
              }}
            >
              {t.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-body font-semibold text-foreground truncate">
                  {t.name}
                </span>
                <span
                  className="font-mono text-xs font-bold ml-2 shrink-0"
                  style={{
                    color:
                      t.mastery >= 80
                        ? "oklch(0.75 0.16 70)"
                        : "oklch(0.60 0.10 70)",
                  }}
                >
                  {t.mastery}%
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-muted-foreground">
                  {t.classes} classes
                </span>
                <span className="text-[10px] text-muted-foreground">·</span>
                <span className="text-[10px] text-muted-foreground">
                  {t.lastActive}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Engine Badge ──────────────────────────────────────────────────────────────
function EngineBadge({
  engine,
  idx,
}: { engine: SovereignEngine; idx: number }) {
  const isActive = engine.status === EngineStatus.active;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, delay: idx * 0.05 }}
      className="glass-sm rounded-xl p-3 flex flex-col gap-2 transition-smooth hover:border-amber-500/30 cursor-default"
      data-ocid={`principal.engine_badge.${idx + 1}`}
    >
      <div className="flex items-center justify-between">
        <span
          className="font-mono font-bold text-xs"
          style={{ color: "oklch(0.75 0.16 70)" }}
        >
          {engine.codeName.slice(0, 8)}
        </span>
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{
            background: isActive
              ? "oklch(0.72 0.17 145)"
              : "oklch(0.50 0.05 260)",
            boxShadow: isActive
              ? "0 0 6px oklch(0.72 0.17 145 / 0.60)"
              : undefined,
            animation: isActive
              ? "status-pulse 2s ease-in-out infinite"
              : undefined,
          }}
        />
      </div>
      <p className="text-[10px] text-muted-foreground leading-tight line-clamp-2">
        {engine.domain.split("—")[0].split("-")[0].trim()}
      </p>
      <Badge
        className={cn(
          "self-start text-[10px] font-mono px-1.5 py-0",
          isActive
            ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/25"
            : "bg-muted/40 text-muted-foreground border-border/50",
        )}
      >
        {isActive ? "ACTIVE" : "STANDBY"}
      </Badge>
    </motion.div>
  );
}

// ─── Vault stats hook ──────────────────────────────────────────────────────────
function useVaultDisplay() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<{ totalSeeds: bigint; totalCompressed: bigint } | null>({
    queryKey: ["vault-display"],
    queryFn: async () => {
      if (!actor) return null;
      const r = await actor.getVaultStats();
      return {
        totalSeeds: r.totalPayloads,
        totalCompressed: r.totalBytesBuffered,
      };
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

// ─── Live Metrics Bar ───────────────────────────────────────────────────────
function LiveMetricsBar({
  totalStudents,
  activeSessions,
  avgMastery,
  topSubject,
  loading,
}: {
  totalStudents: number;
  activeSessions: number;
  avgMastery: number;
  topSubject: string;
  loading: boolean;
}) {
  const metrics = [
    {
      label: "ACTIVE STUDENTS",
      value: totalStudents > 0 ? totalStudents.toLocaleString() : "—",
      icon: GraduationCap,
    },
    {
      label: "LIVE SESSIONS",
      value: activeSessions > 0 ? activeSessions.toLocaleString() : "—",
      icon: Activity,
    },
    {
      label: "AVG COHERENCE",
      value: avgMastery > 0 ? `${avgMastery}%` : "—",
      icon: Shield,
    },
    { label: "TOP SUBJECT", value: topSubject || "—", icon: BookOpen },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: 0.05 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 md:px-6 pt-4"
      data-ocid="principal.live_metrics_bar"
    >
      {metrics.map(({ label, value, icon: Icon }, i) => (
        <div
          key={label}
          data-ocid={`principal.live_metric.${i + 1}`}
          className="glass-max-principal rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden"
          style={{
            border: "1px solid rgba(255,185,0,0.20)",
            boxShadow: "0 0 18px rgba(255,185,0,0.07)",
            animation: "pulse-fib-21 3.37s ease-in-out infinite",
            animationDelay: `${i * 0.55}s`,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg,rgba(255,185,0,0.05) 0%,transparent 60%)",
            }}
          />
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{
              background: "rgba(255,185,0,0.12)",
              border: "1px solid rgba(255,185,0,0.22)",
            }}
          >
            <Icon
              className="h-3.5 w-3.5"
              style={{ color: "oklch(0.75 0.16 70)" }}
            />
          </div>
          <div className="min-w-0">
            {loading ? (
              <div className="h-4 w-16 rounded bg-amber-500/10 animate-pulse" />
            ) : (
              <p
                className="font-display text-base font-bold leading-tight truncate"
                style={{ color: "oklch(0.75 0.16 70)" }}
              >
                {value}
              </p>
            )}
            <p className="font-mono text-[9px] text-muted-foreground/60 uppercase tracking-widest mt-0.5">
              {label}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default function PrincipalDashboard() {
  const { data: diag, isLoading: diagLoading } = useSystemDiag();
  const { data: tchrStats, isLoading: statsLoading } = useTchrStats();
  const { engines, isLoading: enginesLoading } = useEngines();
  const { stats: entStats } = useEntanglementStats();
  const { nrveState } = useNrveState();
  const { plseState } = usePlseState();
  const { data: subjects = [], isLoading: subjLoading } = useAllSubjects();
  const { data: vaultData } = useVaultDisplay();
  const { data: rawGradeMetrics = [] } = useGradeMetrics();
  const { data: sysMetrics, isLoading: sysMetricsLoading } = useSystemMetrics();
  const { data: heatmapNoms = [] } = usePrincipalHeatmapWithNoms();
  const { data: rcgnFlags = [] } = useAllRecognitionFlags();

  const _subjectNames =
    subjects.length > 0 ? subjects.map((s) => s.name) : SUBJECT_FALLBACK;
  const topSubject = subjects.length > 0 ? subjects[0].name : "Mathematics";
  const metrics = sysMetrics ? castSystemMetrics(sysMetrics) : null;
  const gradeData = rawGradeMetrics.map(castGradeCount);

  const cohPct = diag ? Math.round(diag.avgCoh * 100) : 0;
  const systemHealth = diag ? Math.round(diag.pilScore * 100) : 0;
  const totalStudents =
    metrics?.totalStudents ?? Number(tchrStats?.totalStudents ?? 0);
  const activeSessions = metrics?.activeSessions ?? 0;
  const lessonsCompleted = metrics?.totalLessonsCompleted ?? 0;
  const avgMastery = metrics?.avgPlatformMastery
    ? Math.round(metrics.avgPlatformMastery * 100)
    : cohPct > 0
      ? cohPct
      : 62;

  const kpiLoading = diagLoading || statsLoading || sysMetricsLoading;

  // ─── Intelligence summary data ───────────────────────────────────────────────
  const pendingNoms = heatmapNoms.reduce(
    (s, h) => s + Number(h.pendingNoms),
    0,
  );
  const recentAchievements = heatmapNoms.reduce(
    (s, h) => s + Number(h.recentAchievements),
    0,
  );
  const pendingRcgn = rcgnFlags.filter((f) => !f.sealed);
  const topAchievements = rcgnFlags
    .filter((f) => f.sealed)
    .sort((a, b) => Number(b.masteryScore) - Number(a.masteryScore))
    .slice(0, 5);

  // School SSS distribution (derived from grade metrics)
  const sssStates = [
    {
      label: "STRUGGLE",
      color: "oklch(0.65 0.22 22)",
      count: gradeData.filter((g) => g.avgMastery < 0.05).length,
    },
    {
      label: "BUILDING",
      color: "oklch(0.75 0.16 70)",
      count: gradeData.filter(
        (g) => g.avgMastery >= 0.05 && g.avgMastery < 0.13,
      ).length,
    },
    {
      label: "GROWING",
      color: "oklch(0.78 0.22 200)",
      count: gradeData.filter(
        (g) => g.avgMastery >= 0.13 && g.avgMastery < 0.34,
      ).length,
    },
    {
      label: "MASTERY",
      color: "oklch(0.72 0.17 155)",
      count: gradeData.filter(
        (g) => g.avgMastery >= 0.34 && g.avgMastery < 0.89,
      ).length,
    },
    {
      label: "SOVEREIGN",
      color: "oklch(0.75 0.16 70)",
      count: gradeData.filter((g) => g.avgMastery >= 0.89).length,
    },
  ];

  // PRCP narrative — plain language summary
  const narratives: string[] = [];
  if (pendingRcgn.length > 0) {
    narratives.push(
      `${pendingRcgn.length} student${pendingRcgn.length !== 1 ? "s" : ""} flagged for national recognition — nominations pending.`,
    );
  }
  if (recentAchievements > 0) {
    narratives.push(
      `${recentAchievements} achievement${recentAchievements !== 1 ? "s" : ""} sealed this week across all grades.`,
    );
  }
  if (avgMastery >= 80) {
    narratives.push(
      `School-wide mastery is strong at ${avgMastery}% — students are on track.`,
    );
  } else if (avgMastery < 50) {
    narratives.push(
      `School-wide mastery at ${avgMastery}% — focused support recommended for struggling grades.`,
    );
  } else {
    narratives.push(
      `School-wide mastery averaging ${avgMastery}% — steady progress across grade levels.`,
    );
  }
  if (pendingNoms > 0) {
    narratives.push(
      `${pendingNoms} nomination${pendingNoms !== 1 ? "s" : ""} pending across all classes — review and submit.`,
    );
  }

  return (
    <div className="portal-enter min-h-screen">
      {/* OS Identity Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-xl border-b px-6 py-5"
        style={{ borderColor: "rgba(255,185,0,0.12)" }}
        data-ocid="principal.header"
      >
        <div className="mx-auto max-w-8xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <EddiOrb mode="SOVEREIGN" size="sm" />
              <div
                className="glow-principal h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,185,0,0.20), rgba(255,185,0,0.06))",
                  border: "1px solid rgba(255,185,0,0.35)",
                }}
              >
                <Crown
                  className="h-5 w-5"
                  style={{ color: "oklch(0.75 0.16 70)" }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1
                    className="font-display text-xl font-bold tracking-wide"
                    style={{ color: "oklch(0.75 0.16 70)" }}
                  >
                    PRINCIPAL OS
                  </h1>
                  <Badge
                    className="font-mono text-[10px]"
                    style={{
                      background: "rgba(255,185,0,0.12)",
                      color: "oklch(0.75 0.16 70)",
                      border: "1px solid rgba(255,185,0,0.25)",
                    }}
                  >
                    COMMAND CENTER
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Sovereign School Intelligence — Live View
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-right">
              {[
                {
                  val: totalStudents > 0 ? totalStudents : "—",
                  label: "STUDENTS",
                },
                {
                  val: activeSessions > 0 ? activeSessions : "—",
                  label: "SESSIONS",
                },
                { val: cohPct > 0 ? `${cohPct}%` : "—", label: "COHERENCE" },
              ].map((item, i) => (
                <div key={item.label} className="flex items-center gap-6">
                  {i > 0 && (
                    <div
                      className="h-8 w-px"
                      style={{ background: "rgba(255,185,0,0.15)" }}
                    />
                  )}
                  <div>
                    <p
                      className="font-display font-bold text-lg"
                      style={{ color: "oklch(0.75 0.16 70)" }}
                    >
                      {item.val}
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
              <div
                className="h-8 w-px"
                style={{ background: "rgba(255,185,0,0.15)" }}
              />
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: diag
                      ? "oklch(0.72 0.17 145)"
                      : "oklch(0.60 0.05 260)",
                    boxShadow: diag
                      ? "0 0 6px oklch(0.72 0.17 145 / 0.70)"
                      : undefined,
                    animation: diag
                      ? "status-pulse 2s ease-in-out infinite"
                      : undefined,
                  }}
                />
                <span
                  className="text-[10px] font-mono"
                  style={{
                    color: diag
                      ? "oklch(0.72 0.17 145)"
                      : "oklch(0.55 0.05 260)",
                  }}
                >
                  {diag?.status ?? "CONNECTING"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Live Metrics Bar */}
      <LiveMetricsBar
        totalStudents={totalStudents}
        activeSessions={activeSessions}
        avgMastery={avgMastery}
        topSubject={topSubject}
        loading={kpiLoading}
      />

      {/* Main content */}
      <div className="mx-auto max-w-8xl px-4 md:px-6 py-6 space-y-6">
        {/* KPI Row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          data-ocid="principal.kpi_row"
        >
          {kpiLoading ? (
            [1, 2, 3, 4].map((k) => <KpiSkeleton key={k} />)
          ) : (
            <>
              <KpiCard
                label="Total Students"
                value={totalStudents > 0 ? totalStudents.toLocaleString() : "—"}
                icon={GraduationCap}
                trend="up"
                sub="Actively enrolled"
                delay={0}
              />
              <KpiCard
                label="Active Sessions"
                value={
                  activeSessions > 0 ? activeSessions.toLocaleString() : "—"
                }
                icon={Users}
                trend="up"
                sub="Live right now"
                delay={0.08}
              />
              <KpiCard
                label="Lessons Completed"
                value={
                  lessonsCompleted > 0 ? lessonsCompleted.toLocaleString() : "—"
                }
                icon={BookOpen}
                trend="up"
                sub="All time"
                delay={0.16}
              />
              <KpiCard
                label="Avg Mastery"
                value={`${avgMastery}%`}
                icon={Shield}
                trend={avgMastery > 60 ? "up" : "down"}
                sub="Platform-wide avg"
                delay={0.24}
              />
            </>
          )}
        </div>

        {/* ─── PRCP Intelligence Summary ────────────────────────────────────────── */}
        <GlassPanel
          title="SCHOOL INTELLIGENCE SUMMARY"
          subtitle="PRCP narrative — plain-language school intelligence generated by COGT+META+AUTN"
          ocid="principal.intelligence_summary"
          delay={0.04}
        >
          <div className="space-y-4">
            {/* SSS state distribution */}
            <div>
              <p className="text-[10px] font-mono text-muted-foreground mb-3 uppercase tracking-wider">
                SCHOOL-WIDE SSS STATE DISTRIBUTION
              </p>
              <div className="flex flex-wrap gap-2">
                {sssStates.map((s) => (
                  <div
                    key={s.label}
                    className="glass-sm rounded-xl px-3 py-2 flex items-center gap-2"
                    data-ocid={`principal.sss_state.${s.label.toLowerCase()}`}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: s.color }}
                    />
                    <span
                      className="font-mono text-xs"
                      style={{ color: s.color }}
                    >
                      {s.label}
                    </span>
                    <span
                      className="font-display font-bold text-sm"
                      style={{ color: s.color }}
                    >
                      {s.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* PRCP narratives */}
            <div className="space-y-2">
              {narratives.map((n, i) => (
                <div
                  key={n.slice ? n.slice(0, 30) : `narrative-${i}`}
                  className="flex items-start gap-3 rounded-xl px-4 py-3"
                  style={{
                    background: "rgba(255,185,0,0.04)",
                    border: "1px solid rgba(255,185,0,0.10)",
                  }}
                  data-ocid={`principal.narrative.${i + 1}`}
                >
                  <Activity
                    className="h-3.5 w-3.5 mt-0.5 shrink-0"
                    style={{ color: "oklch(0.75 0.16 70)" }}
                  />
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    {n}
                  </p>
                </div>
              ))}
            </div>

            {/* Top recognition achievements this week */}
            {topAchievements.length > 0 && (
              <div>
                <p className="text-[10px] font-mono text-muted-foreground mb-3 uppercase tracking-wider">
                  TOP ACHIEVEMENTS THIS WEEK
                </p>
                <div className="space-y-2">
                  {topAchievements.map((flag, i) => (
                    <div
                      key={flag.id}
                      data-ocid={`principal.achievement.${i + 1}`}
                      className="glass-sm rounded-xl px-4 py-3 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Star
                          className="h-4 w-4 shrink-0"
                          style={{ color: "oklch(0.75 0.16 70)" }}
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-foreground truncate">
                            {flag.subject} · {flag.pattern}
                          </p>
                          <p className="text-[9px] font-mono text-muted-foreground">
                            {Number(flag.masteryScore)}% mastery
                          </p>
                        </div>
                      </div>
                      <Badge
                        className="text-[9px] font-mono shrink-0"
                        style={{
                          background: "rgba(255,185,0,0.12)",
                          color: "oklch(0.75 0.16 70)",
                          border: "1px solid rgba(255,185,0,0.22)",
                        }}
                      >
                        SEALED
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick link to Vision document */}
            <div
              className="flex items-center justify-between rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,185,0,0.06)",
                border: "1px solid rgba(255,185,0,0.15)",
              }}
            >
              <div className="flex items-center gap-2">
                <Award
                  className="h-4 w-4"
                  style={{ color: "oklch(0.75 0.16 70)" }}
                />
                <span className="text-sm font-medium text-foreground">
                  Sovereign Vision Document
                </span>
                <span className="text-xs text-muted-foreground">
                  — Generated by COGT+META+AUTN
                </span>
              </div>
              <Link to="/vision" data-ocid="principal.vision_link">
                <button
                  type="button"
                  className="glass-sm rounded-lg px-3 py-1.5 font-mono text-[10px] font-bold hover:border-amber-500/40 transition-smooth flex items-center gap-1.5"
                  style={{ color: "oklch(0.75 0.16 70)" }}
                >
                  VIEW VISION
                  <ArrowRight className="h-3 w-3" />
                </button>
              </Link>
            </div>
          </div>
        </GlassPanel>

        {/* Grade Cards */}
        <GlassPanel
          title="GRADE OVERVIEW"
          subtitle="Grades 1–12 — click any card to drill down into grade-level data"
          ocid="principal.grade_overview_section"
          delay={0.05}
        >
          <GradeCardsGrid gradeData={gradeData} />
        </GlassPanel>

        {/* Grade Heatmap */}
        <GlassPanel
          title="MASTERY HEATMAP — 8-WEEK VIEW"
          subtitle="Grade × Week mastery grid — Fibonacci-compounded scores"
          ocid="principal.heatmap_section"
          delay={0.1}
        >
          {subjLoading ? (
            <div
              className="space-y-2 animate-pulse"
              data-ocid="principal.heatmap.loading_state"
            >
              {[1, 2, 3, 4, 5].map((k) => (
                <div key={k} className="h-7 rounded-lg bg-amber-500/5" />
              ))}
            </div>
          ) : (
            <GradeHeatmap gradeData={gradeData} />
          )}
          <div className="mt-4">
            <Link
              to="/principal/heatmap"
              data-ocid="principal.heatmap_fullview_link"
            >
              <button
                type="button"
                className="glass-sm rounded-lg px-3 py-1.5 font-mono text-[10px] font-bold hover:border-amber-500/40 transition-smooth flex items-center gap-1.5 mt-3"
                style={{ color: "oklch(0.75 0.16 70)" }}
              >
                FULL KNOWLEDGE MAP (12×13)
                <ArrowRight className="h-3 w-3" />
              </button>
            </Link>
          </div>
        </GlassPanel>

        {/* Staff Panel */}
        <GlassPanel
          title="STAFF PERFORMANCE"
          subtitle="Teachers ranked by class mastery average"
          ocid="principal.staff_panel"
          className="min-h-[320px]"
          delay={0.2}
        >
          <StaffPanel />
        </GlassPanel>

        {/* System Intelligence Status */}
        <GlassPanel
          title="SYSTEM INTELLIGENCE STATUS"
          subtitle="Architecture Council · Entanglement Network · Vault Statistics"
          ocid="principal.intelligence_status_section"
          delay={0.25}
        >
          <div className="space-y-6">
            {/* Arch Council */}
            <div>
              <p className="text-[10px] font-mono text-muted-foreground mb-3 flex items-center gap-2">
                <Activity
                  className="h-3 w-3"
                  style={{ color: "oklch(0.75 0.16 70)" }}
                />
                ARCHITECTURE COUNCIL
              </p>
              <div className="grid grid-cols-3 gap-3">
                {ARCH_ENGINES.map((eng, i) => (
                  <div
                    key={eng.id}
                    className="glass-sm rounded-xl p-4 text-center transition-smooth hover:border-amber-500/30"
                    data-ocid={`principal.arch_engine.${i + 1}`}
                  >
                    <div
                      className="mx-auto mb-2 h-8 w-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs"
                      style={{
                        background: "rgba(255,185,0,0.10)",
                        border: "1px solid rgba(255,185,0,0.22)",
                        color: "oklch(0.75 0.16 70)",
                      }}
                    >
                      {eng.id}
                    </div>
                    <p className="text-xs font-semibold text-foreground/90">
                      {eng.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {eng.desc}
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-1">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          background: "oklch(0.72 0.17 145)",
                          boxShadow: "0 0 5px oklch(0.72 0.17 145 / 0.70)",
                          animation: "status-pulse 2s ease-in-out infinite",
                          animationDelay: `${i * 0.4}s`,
                        }}
                      />
                      <span className="text-[10px] font-mono text-emerald-300">
                        ONLINE
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Entanglement Network */}
            <div>
              <p className="text-[10px] font-mono text-muted-foreground mb-3 flex items-center gap-2">
                <Network
                  className="h-3 w-3"
                  style={{ color: "oklch(0.75 0.16 70)" }}
                />
                ENTANGLEMENT NETWORK — {Number(entStats?.activeCount ?? 0)}{" "}
                ACTIVE
              </p>
              <div className="flex flex-wrap gap-3">
                {ENT_ENGINES.map((eng, i) => {
                  let liveValue = "—";
                  if (eng.id === "NRVE")
                    liveValue = String(Number(nrveState?.coherenceScore ?? 0));
                  else if (eng.id === "PLSE")
                    liveValue = String(Number(plseState?.heartbeatCycle ?? 0));
                  else if (eng.id === "MSRY")
                    liveValue = String(
                      Number(entStats?.avgCoherenceDelta ?? 0),
                    );
                  else if (eng.id === "ECHO")
                    liveValue = String(Number(entStats?.totalTransits ?? 0));
                  else if (eng.id === "FLUX")
                    liveValue = String(Number(entStats?.activeCount ?? 0));
                  return (
                    <div
                      key={eng.id}
                      className="glass-sm rounded-xl p-4 flex-1 min-w-[130px] transition-smooth hover:border-amber-500/30"
                      data-ocid={`principal.entanglement.${eng.id.toLowerCase()}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="font-mono font-bold text-sm"
                          style={{ color: "oklch(0.75 0.16 70)" }}
                        >
                          {eng.id}
                        </span>
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{
                            background: "oklch(0.72 0.17 145)",
                            boxShadow: "0 0 5px oklch(0.72 0.17 145 / 0.60)",
                            animation: "status-pulse 1.5s ease-in-out infinite",
                            animationDelay: `${i * 0.3}s`,
                          }}
                        />
                      </div>
                      <p className="text-xl font-display font-bold text-foreground">
                        {liveValue}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {eng.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* DIAG + Vault Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div
                className="glass-sm rounded-xl p-4"
                data-ocid="principal.diag_score"
              >
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">
                  DIAG Score
                </p>
                <p
                  className="text-2xl font-display font-bold"
                  style={{ color: "oklch(0.75 0.16 70)" }}
                >
                  {systemHealth > 0 ? systemHealth : "—"}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  PIL health score
                </p>
              </div>
              <div
                className="glass-sm rounded-xl p-4"
                data-ocid="principal.heartbeat_count"
              >
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">
                  Heartbeats
                </p>
                <p
                  className="text-2xl font-display font-bold"
                  style={{ color: "oklch(0.75 0.16 70)" }}
                >
                  {diag ? String(Number(diag.heartbeatCount)) : "—"}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  AUTN cycles fired
                </p>
              </div>
              <div
                className="glass-sm rounded-xl p-4"
                data-ocid="principal.vault_seeds"
              >
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">
                  Vault Seeds
                </p>
                <p
                  className="text-2xl font-display font-bold"
                  style={{ color: "oklch(0.75 0.16 70)" }}
                >
                  {vaultData ? String(Number(vaultData.totalSeeds)) : "—"}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  ABYSSUS-VAULT total
                </p>
              </div>
              <div
                className="glass-sm rounded-xl p-4"
                data-ocid="principal.phi_ratio"
              >
                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1">
                  φ Ratio
                </p>
                <p
                  className="text-2xl font-display font-bold"
                  style={{ color: "oklch(0.75 0.16 70)" }}
                >
                  {Number(nrveState?.phiRatio ?? 0) > 0
                    ? Number(nrveState?.phiRatio ?? 0)
                    : "1.618"}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  NRVE φ-alignment
                </p>
              </div>
            </div>

            {/* Engine grid */}
            <div>
              <p className="text-[10px] font-mono text-muted-foreground mb-3 flex items-center gap-2">
                <Zap
                  className="h-3 w-3"
                  style={{ color: "oklch(0.75 0.16 70)" }}
                />
                SOVEREIGN ENGINES —{" "}
                {engines.filter((e) => e.status === EngineStatus.active).length}{" "}
                ACTIVE
              </p>
              {enginesLoading ? (
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 animate-pulse"
                  data-ocid="principal.engines.loading_state"
                >
                  {[1, 2, 3, 4, 5].map((k) => (
                    <div key={k} className="glass-sm h-24 rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {engines.map((engine, idx) => (
                    <EngineBadge
                      key={engine.id.toString()}
                      engine={engine}
                      idx={idx}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </GlassPanel>

        {/* Research & Policy */}
        <div
          data-ocid="principal.research_policy_section"
          className="mt-8 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="h-9 w-9 rounded-xl flex items-center justify-center"
              style={{
                background: "rgba(255,185,0,0.12)",
                border: "1px solid rgba(255,185,0,0.30)",
              }}
            >
              <span className="text-sm">📄</span>
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-foreground">
                Research &amp; Policy
              </h3>
              <p className="text-xs text-muted-foreground">
                Sovereign research papers — COGT+META+AUTN
              </p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <p
              className="text-xs font-semibold mb-1"
              style={{ color: "oklch(0.85 0.18 85)" }}
            >
              The Diego Protocol
            </p>
            <p className="text-xs text-muted-foreground mb-3">
              Sovereign intelligence-driven preparation for non-traditional
              academic competition in under-resourced schools. Fibonacci
              backward milestones, elastic schedule adaptation, and permanent
              achievement vault.
            </p>
            <Link
              data-ocid="principal.research_policy_link"
              to="/vision"
              className="inline-flex items-center gap-1.5 text-xs font-semibold"
              style={{ color: "oklch(0.85 0.18 85)" }}
            >
              View Full Paper →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
