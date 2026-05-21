import { createActor } from "@/backend";
import { AgentCard } from "@/components/AgentCard";
import EddiOrb from "@/components/EddiOrb";
import { SubjectCard } from "@/components/SubjectCard";
import { RecognitionAlert } from "@/components/recognition/RecognitionAlert";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useIntelligence } from "@/context/IntelligenceContext";
import { useAdaptiveWorkflow } from "@/hooks/use-adaptive";
import { useAgents } from "@/hooks/use-agents";
import { useAllSubjects } from "@/hooks/use-curriculum";
import { usePlseState } from "@/hooks/use-entanglements";
import { usePassportStats } from "@/hooks/use-passport";
import { useRecognitionFlags } from "@/hooks/use-recognition";
import { useSession } from "@/hooks/use-session";
import { useStudent } from "@/hooks/use-student";
import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  BookOpen,
  Brain,
  LogIn,
  Sparkles,
  Star,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const ACTION_LABELS: Record<string, string> = {
  continue_: "Keep Going",
  continue: "Keep Going",
  advance: "Move Ahead",
  remedialReview: "Review",
  quizNow: "Take a Quiz",
};

function SssRing({
  value,
  size = 72,
}: {
  value: number;
  size?: number;
}) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (Math.min(value, 100) / 100) * circ;
  const sssColor =
    value >= 89
      ? "oklch(0.85 0.22 85)"
      : value >= 34
        ? "oklch(0.78 0.22 200)"
        : "oklch(0.75 0.18 30)";
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={4}
          className="stroke-white/5"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={4}
          stroke={sssColor}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${sssColor}66)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className="font-display text-sm font-black text-white/90"
          style={{ lineHeight: 1 }}
        >
          {Math.round(value)}
        </span>
        <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest mt-0.5">
          SSS
        </span>
      </div>
    </div>
  );
}

// PHI progress ring — SVG-based golden ratio progress indicator
function PhiRing({
  value,
  size = 72,
  label,
}: {
  value: number;
  size?: number;
  label: string;
}) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={4}
          className="stroke-white/5"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={4}
          stroke="oklch(0.78 0.22 200)"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(0,210,255,0.6))" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span
          className="font-display text-sm font-black text-white/90"
          style={{ lineHeight: 1 }}
        >
          {value}%
        </span>
        <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest mt-0.5">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, login, identity } = useInternetIdentity();
  const principal = identity ? identity.getPrincipal() : null;
  const { data: rcgnFlags } = useRecognitionFlags(principal);
  const { profile, isLoading: profileLoading } = useStudent();
  const { agentsMeta, isLoading: agentsLoading } = useAgents();
  const { data: subjects, isLoading: subjectsLoading } = useAllSubjects();
  const { sessionCount, averageScore } = useSession();
  const { data: passportStats } = usePassportStats();
  const { plseState } = usePlseState();
  const { layoutState, sss, rcgnThreshold } = useIntelligence();
  const { actor } = useActor(createActor);
  const scholarshipQuery = useQuery({
    queryKey: ["my-scholarships"],
    queryFn: () => actor!.getMyScholarshipMatches(),
    enabled: !!actor && rcgnThreshold >= 55,
    staleTime: 5 * 60 * 1000,
  });
  const [dismissedNudges, setDismissedNudges] = useState<Set<number>>(
    new Set(),
  );

  const gradeLevel = profile?.gradeLevel ?? "";
  const firstSubjectId = (subjects ?? [])[0]?.id ?? "";
  const { workflow, isLoading: workflowLoading } = useAdaptiveWorkflow(
    firstSubjectId,
    gradeLevel,
  );

  useEffect(() => {
    if (!profileLoading && !profile && isAuthenticated) {
      navigate({ to: "/onboarding" });
    }
  }, [profile, profileLoading, navigate, isAuthenticated]);

  const hour = new Date().getHours();
  const timeGreeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = profile?.name?.split(" ")?.[0] ?? "Explorer";
  const gradeDisplay = profile?.gradeLevel ?? "";
  const sessionCountNum = Number(sessionCount);
  const cohScore = passportStats ? passportStats.compoundScore : 0;
  const dailyGoalPct = Math.min(100, sessionCountNum * 20);

  return (
    <div
      data-ocid="dashboard.page"
      className={`portal-enter min-h-screen ${layoutState}`}
    >
      {/* ── RECOGNITION THRESHOLD BANNER ─────────────────────────────────── */}
      {isAuthenticated && rcgnThreshold >= 55 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          data-ocid="dashboard.rcgn_banner"
          className="mx-4 mt-4 sm:mx-6 rounded-2xl px-5 py-3 flex items-center justify-between gap-3 animate-pulse-fib-8"
          style={{
            background:
              "linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(12,14,28,0.85) 100%)",
            border: "1px solid rgba(251,191,36,0.35)",
            boxShadow: "0 0 32px rgba(251,191,36,0.15)",
          }}
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400" />
            </span>
            <p
              className="text-sm font-bold"
              style={{ color: "rgb(251,191,36)" }}
            >
              {rcgnThreshold >= 89
                ? "🏆 SOVEREIGN — You've reached national recognition threshold!"
                : `🎯 Recognition threshold ${rcgnThreshold}/89 — you're in the flag zone!`}
            </p>
          </div>
          <Link
            to="/recognition"
            data-ocid="dashboard.rcgn_banner.view_link"
            className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-xl transition-smooth hover:opacity-90"
            style={{
              background: "rgba(251,191,36,0.18)",
              color: "rgb(251,191,36)",
              border: "1px solid rgba(251,191,36,0.35)",
            }}
          >
            View →
          </Link>
        </motion.div>
      )}
      {/* ── DEMO BANNER ─────────────────────────────────────────── */}
      {!isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          data-ocid="dashboard.signin_banner"
          className="glass-portal-student glow-student mx-4 mt-4 sm:mx-6 rounded-2xl px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,210,255,0.15)]">
              <LogIn className="h-4 w-4 text-[oklch(0.78_0.22_200)]" />
            </span>
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]">
                DEMO MODE
              </p>
              <p className="text-xs text-white/60">
                Sign in to save progress and unlock sovereign intelligence.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/demo"
              data-ocid="dashboard.try_demo_button"
              className="rounded-xl border border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] px-4 py-2 text-xs font-semibold text-[oklch(0.78_0.22_200)] transition-smooth hover:bg-[rgba(0,210,255,0.15)]"
            >
              Try Demo
            </Link>
            <button
              type="button"
              data-ocid="dashboard.signin_button"
              onClick={() => login()}
              className="rounded-xl bg-[oklch(0.78_0.22_200)] px-4 py-2 text-xs font-bold text-[oklch(0.07_0.01_260)] transition-smooth hover:opacity-90"
            >
              Sign In
            </button>
          </div>
        </motion.div>
      )}

      {/* ── RECOGNITION ALERT ───────────────────────────────────── */}
      {rcgnFlags && rcgnFlags.length > 0 && (
        <div className="px-4 sm:px-6 mt-4">
          <RecognitionAlert flags={rcgnFlags} variant="student" />
        </div>
      )}

      {/* ── 3-COLUMN MAIN GRID ───────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-[240px_1fr_280px] gap-0 xl:min-h-screen">
        {/* ── LEFT SIDEBAR ── */}
        <aside
          data-ocid="dashboard.sidebar"
          className="xl:min-h-screen glass-max-student xl:border-r xl:border-[rgba(0,210,255,0.12)] p-[21px] space-y-[21px] flex flex-col xl:sticky xl:top-0 xl:h-screen xl:overflow-y-auto"
        >
          {/* Identity chip */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.78_0.22_200)] opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[oklch(0.78_0.22_200)]" />
              </span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]">
                STUDENT OS
              </span>
            </div>
            {profileLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
            ) : (
              <div>
                <p className="font-display text-base font-black text-white/90 leading-tight">
                  {firstName}
                </p>
                {gradeDisplay && (
                  <Badge className="mt-1 gap-1 py-0.5 px-2 border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] text-[oklch(0.78_0.22_200)] text-[9px] font-mono">
                    <BookOpen className="h-2.5 w-2.5" />
                    {gradeDisplay}
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* PHI daily goal ring + SSS ring */}
          <div
            className="glass rounded-2xl p-4 flex flex-col items-center gap-3 animate-pulse-fib-8 animate-card-slide-in"
            style={{ "--stagger": 1 } as React.CSSProperties}
          >
            <div className="flex items-center gap-4">
              <PhiRing value={dailyGoalPct} label="Daily Goal" />
              {isAuthenticated && sss > 0 && <SssRing value={sss} />}
            </div>
            <p className="text-[10px] font-mono text-white/40 text-center uppercase tracking-widest">
              PHI progress · F(5) sessions
            </p>
          </div>

          {/* Live session count with pulse */}
          <div
            data-ocid="dashboard.live_session_count"
            className="glass-portal-student rounded-2xl p-4 space-y-1 animate-pulse-fib-8 animate-card-slide-in"
            style={{ "--stagger": 2 } as React.CSSProperties}
          >
            <p className="font-mono text-[9px] uppercase tracking-widest text-[oklch(0.78_0.22_200)]/70">
              Live Sessions
            </p>
            <div className="flex items-end gap-2">
              <span className="font-display text-3xl font-black text-white/90">
                {sessionCountNum}
              </span>
              <span className="font-mono text-[10px] text-white/40 mb-1">
                today
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.22_200)] animate-pulse" />
              <span className="font-mono text-[9px] text-white/40">
                {averageScore}% avg score
              </span>
            </div>
          </div>

          {/* Passport zones */}
          <div
            className="glass rounded-2xl p-4 space-y-2 flex-1 animate-card-slide-in"
            style={{ "--stagger": 3 } as React.CSSProperties}
          >
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">
              Passport Zones
            </p>
            {[
              {
                label: "HOT",
                count: passportStats ? Number(passportStats.hotSeeds) : "—",
                color: "text-orange-300",
                bg: "bg-orange-500/10",
                border: "border-orange-500/20",
              },
              {
                label: "WARM",
                count: passportStats
                  ? Number(passportStats.warmSeeds ?? 0)
                  : "—",
                color: "text-amber-300",
                bg: "bg-amber-500/10",
                border: "border-amber-500/20",
              },
              {
                label: "COLD",
                count: passportStats ? Number(passportStats.coldSeeds) : "—",
                color: "text-sky-300",
                bg: "bg-sky-500/10",
                border: "border-sky-500/20",
              },
              {
                label: "FROZEN",
                count: passportStats ? Number(passportStats.frozenSeeds) : "—",
                color: "text-indigo-300",
                bg: "bg-indigo-500/10",
                border: "border-indigo-500/20",
              },
            ].map((z) => (
              <div
                key={z.label}
                className={`flex items-center justify-between rounded-xl border ${z.border} ${z.bg} px-3 py-1.5`}
              >
                <span
                  className={`font-mono text-[9px] font-bold uppercase tracking-widest ${z.color}`}
                >
                  {z.label}
                </span>
                <span className={`font-mono text-sm font-black ${z.color}`}>
                  {z.count}
                </span>
              </div>
            ))}
            <Link
              to="/passport"
              className="block text-center text-[10px] font-mono text-[oklch(0.78_0.22_200)] hover:underline pt-1"
            >
              Full Passport →
            </Link>
          </div>
        </aside>

        {/* ── CENTER MAIN ── */}
        <main className="p-[21px] space-y-[21px] min-w-0">
          <div className="flex justify-center py-3">
            <EddiOrb mode="EXPLORE" size="sm" />
          </div>
          {/* Greeting hero */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            data-ocid="dashboard.greeting_section"
            className="glass-portal-student glass-shimmer rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-[rgba(0,210,255,0.07)] blur-3xl" />
            {profileLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-9 w-72" />
                <Skeleton className="h-4 w-48" />
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] px-3 py-1 mb-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.22_200)] animate-pulse" />
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]">
                      STUDENT OS · SOVEREIGN
                    </span>
                  </div>
                  <h1 className="font-display text-2xl sm:text-3xl font-black text-white/95 leading-tight">
                    {timeGreeting}, {firstName}!
                  </h1>
                  <p className="mt-1.5 text-sm text-white/50">
                    Your intelligence compounds — session by session, floor by
                    floor.
                  </p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-3">
                  {isAuthenticated && cohScore > 0 && (
                    <div
                      data-ocid="dashboard.passport_stats"
                      className="flex items-center gap-2 flex-wrap"
                    >
                      <span className="glass-sm rounded-full px-3 py-1 text-xs font-mono font-medium text-white/60">
                        {passportStats ? Number(passportStats.totalSeeds) : "—"}{" "}
                        Seeds
                      </span>
                      <span className="glass-sm rounded-full px-3 py-1 text-xs font-mono font-medium text-[oklch(0.78_0.22_200)]">
                        {cohScore.toFixed(2)} COH
                      </span>
                    </div>
                  )}
                  <Link
                    to="/study/$subjectId"
                    params={{ subjectId: firstSubjectId || "math" }}
                    data-ocid="dashboard.start_learning_button"
                    className="inline-flex items-center gap-2 rounded-xl bg-[oklch(0.78_0.22_200)] px-5 py-2.5 text-xs font-bold text-[oklch(0.07_0.01_260)] transition-smooth hover:opacity-90 shadow-[0_0_20px_rgba(0,210,255,0.3)]"
                  >
                    <Sparkles className="h-3.5 w-3.5" /> Start Learning
                  </Link>
                </div>
              </div>
            )}
          </motion.section>

          {/* Stats row */}
          <section
            data-ocid="dashboard.stats_section"
            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
          >
            {(
              [
                {
                  icon: <Zap className="h-5 w-5 text-[oklch(0.78_0.22_200)]" />,
                  label: "Sessions",
                  value: sessionCountNum,
                  sub: "Today",
                  pulse: true,
                },
                {
                  icon: <Trophy className="h-5 w-5 text-amber-300" />,
                  label: "Companions",
                  value: agentsLoading ? "…" : agentsMeta.length,
                  sub: "AI agents",
                  pulse: false,
                },
                {
                  icon: <Star className="h-5 w-5 text-white/40" />,
                  label: "Subjects",
                  value: (subjects ?? []).length,
                  sub: gradeDisplay || "K-12",
                  pulse: false,
                },
                {
                  icon: (
                    <Activity className="h-5 w-5 text-[oklch(0.78_0.22_200)]" />
                  ),
                  label: "Heartbeat",
                  value: plseState
                    ? `#${Number(plseState.heartbeatCycle)}`
                    : "—",
                  sub: "F(8)=21",
                  pulse: true,
                },
              ] as {
                icon: React.ReactNode;
                label: string;
                value: string | number;
                sub: string;
                pulse: boolean;
              }[]
            ).map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                data-ocid={i === 3 ? "dashboard.eart_heartbeat" : undefined}
                className="glass-max-student rounded-2xl px-4 py-4 flex items-center gap-3 transition-glass hover:border-[rgba(0,210,255,0.3)]"
              >
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]">
                  {stat.icon}
                  {stat.pulse && (
                    <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[oklch(0.78_0.22_200)] animate-pulse" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-mono uppercase tracking-widest text-white/40">
                    {stat.label}
                  </p>
                  <p className="font-display text-xl font-black text-white/90">
                    {stat.value}
                  </p>
                  <p className="text-[10px] text-white/30 truncate">
                    {stat.sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </section>

          {/* PLSE live intelligence */}
          <section data-ocid="dashboard.plse_section" className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.78_0.22_200)] opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[oklch(0.78_0.22_200)]" />
              </span>
              <h2 className="font-display text-sm font-bold text-white/80">
                Live Intelligence
              </h2>
              <span className="rounded-full border border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] px-2 py-0.5 text-[9px] font-mono font-bold text-[oklch(0.78_0.22_200)] uppercase tracking-widest">
                EART
              </span>
            </div>
            {plseState ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                data-ocid="dashboard.autn_seed_card"
                className="glass-portal-student rounded-2xl px-5 py-4 relative overflow-hidden"
              >
                <div className="pointer-events-none absolute -top-4 -right-4 h-24 w-24 rounded-full bg-[rgba(0,210,255,0.06)] blur-2xl" />
                <div className="relative space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]/70">
                      AUTN · New Thread
                    </span>
                    <span className="flex items-center gap-1.5 text-[9px] font-mono text-white/30">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.22_200)] animate-pulse" />
                      Cycle #{Number(plseState.heartbeatCycle)}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white/90 leading-snug">
                    {plseState.lastAutonSeed.concept}
                  </p>
                  <p className="text-[10px] text-white/30 font-mono">
                    Seeded autonomously · EART substrate · F(8)=21 cycle
                    interval
                  </p>
                </div>
              </motion.div>
            ) : (
              <div
                data-ocid="dashboard.autn_seed_card.loading_state"
                className="glass rounded-2xl px-5 py-4"
              >
                <Skeleton className="h-4 w-48 mb-2" />
                <Skeleton className="h-4 w-72" />
              </div>
            )}
          </section>

          {/* Subjects grid */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[oklch(0.78_0.22_200)]" />
                <h2 className="font-display text-sm font-bold text-white/80">
                  Your Subjects{gradeDisplay ? ` · ${gradeDisplay}` : ""}
                </h2>
              </div>
              {(subjects ?? []).length > 0 && (
                <span className="text-xs text-white/30 font-mono">
                  {(subjects ?? []).length} loaded
                </span>
              )}
            </div>
            {subjectsLoading ? (
              <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-28 rounded-2xl" />
                ))}
              </div>
            ) : (subjects ?? []).length === 0 ? (
              <div
                data-ocid="dashboard.subjects.empty_state"
                className="glass rounded-2xl p-8 text-center space-y-3"
              >
                <div className="text-3xl">📚</div>
                <p className="font-display font-semibold text-white/70">
                  Subjects loading…
                </p>
                <p className="text-xs text-white/30">
                  Engines are initializing. Refresh to try again.
                </p>
              </div>
            ) : (
              <div
                className="grid gap-3 grid-cols-2 sm:grid-cols-3"
                data-ocid="dashboard.subjects_section"
              >
                {(subjects ?? []).map((subject, idx) => (
                  <Link
                    key={subject.id}
                    to="/study/$subjectId"
                    params={{ subjectId: subject.id }}
                  >
                    <SubjectCard subject={subject} index={idx + 1} />
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* AI Agents strip */}
          <section data-ocid="dashboard.agents_section" className="space-y-3">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-[oklch(0.78_0.22_200)]" />
              <h2 className="font-display text-sm font-bold text-white/80">
                Your AI Team
              </h2>
            </div>
            {agentsLoading ? (
              <div className="grid gap-4 sm:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-28 rounded-2xl" />
                ))}
              </div>
            ) : agentsMeta.length === 0 ? (
              <div
                data-ocid="dashboard.agents.empty_state"
                className="glass rounded-2xl p-8 text-center"
              >
                <p className="text-sm text-white/30">
                  AI agents are initializing…
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-3">
                {agentsMeta.map((agent) => (
                  <Link
                    key={agent.id}
                    to="/agents/$agentName"
                    params={{ agentName: agent.id }}
                  >
                    <AgentCard agent={agent} />
                  </Link>
                ))}
              </div>
            )}
          </section>
        </main>

        {/* ── RIGHT PANEL ── */}
        <aside
          data-ocid="dashboard.right_panel"
          className="xl:min-h-screen glass-max xl:border-l xl:border-white/5 p-[21px] space-y-[21px] flex flex-col xl:sticky xl:top-0 xl:h-screen xl:overflow-y-auto"
        >
          {/* Adaptive path */}
          {isAuthenticated && firstSubjectId && (
            <div
              data-ocid="dashboard.adaptive_card"
              className="glass-portal-student rounded-2xl p-5 space-y-3 relative overflow-hidden"
            >
              <div className="pointer-events-none absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-[rgba(0,210,255,0.05)] blur-2xl" />
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[oklch(0.78_0.22_200)]" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]">
                  Adaptive Path
                </span>
              </div>
              {workflowLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-9 w-full rounded-xl" />
                </div>
              ) : workflow ? (
                <div className="space-y-3">
                  <p className="text-xs text-white/60 leading-relaxed">
                    {workflow.reasonPhrase}
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[9px] font-mono text-white/30">
                      <span>Mastery</span>
                      <span className="text-[oklch(0.78_0.22_200)]">
                        {Math.round(workflow.phiConfidence * 100)}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[oklch(0.78_0.22_200)] transition-all duration-700"
                        style={{
                          width: `${Math.round(workflow.phiConfidence * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <Link
                    to="/study/$subjectId"
                    params={{ subjectId: firstSubjectId }}
                    data-ocid="dashboard.adaptive_card.action_button"
                    className="block w-full rounded-xl bg-[oklch(0.78_0.22_200)] text-center py-2.5 text-xs font-bold text-[oklch(0.07_0.01_260)] transition-smooth hover:opacity-90"
                  >
                    {ACTION_LABELS[String(workflow.nextAction)] ?? "Continue"}
                  </Link>
                </div>
              ) : (
                <p className="text-xs text-white/30">
                  Select a subject for your adaptive path.
                </p>
              )}
            </div>
          )}

          {/* Live stats panel */}
          <div className="glass rounded-2xl p-4 space-y-3">
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">
              Live Stats
            </p>
            {(
              [
                {
                  label: "Sessions Today",
                  value: sessionCountNum,
                  color: "text-[oklch(0.78_0.22_200)]",
                },
                {
                  label: "Avg Score",
                  value: `${averageScore}%`,
                  color: "text-amber-300",
                },
                {
                  label: "Total Seeds",
                  value: passportStats ? Number(passportStats.totalSeeds) : "—",
                  color: "text-sky-300",
                },
                {
                  label: "COH Score",
                  value: cohScore ? cohScore.toFixed(2) : "—",
                  color: "text-indigo-300",
                },
              ] as { label: string; value: string | number; color: string }[]
            ).map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-white/40">
                  {s.label}
                </span>
                <span className={`font-mono text-sm font-bold ${s.color}`}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* EART heartbeat live */}
          {plseState && (
            <div
              data-ocid="dashboard.eart_live"
              className="glass-portal-student rounded-2xl p-4 space-y-2 animate-pulse-fib-13"
            >
              <p className="font-mono text-[9px] uppercase tracking-widest text-[oklch(0.78_0.22_200)]/60">
                EART Substrate
              </p>
              <p className="font-display text-2xl font-black text-white/90">
                #{Number(plseState.heartbeatCycle)}
              </p>
              <p className="font-mono text-[9px] text-white/30">
                Heartbeat · F(8)=21 interval
              </p>
              <div className="flex flex-wrap gap-1 pt-1">
                {(["AUTN", "META", "GENX", "CURO"] as const).map((eng) => (
                  <span
                    key={eng}
                    className="rounded-full border border-[rgba(0,210,255,0.2)] bg-[rgba(0,210,255,0.06)] px-2 py-0.5 font-mono text-[9px] text-[oklch(0.78_0.22_200)]"
                  >
                    {eng}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nav shortcuts */}
          <div className="glass rounded-2xl p-4 space-y-2 mt-auto">
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">
              Quick Nav
            </p>
            {(
              [
                { label: "My Learning", to: "/learning" },
                { label: "All Subjects", to: "/subjects" },
                { label: "AI Agents", to: "/student/agents" },
                { label: "Passport", to: "/passport" },
              ] as { label: string; to: string }[]
            ).map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid={`dashboard.nav_link.${i + 1}`}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/60 hover:text-[oklch(0.78_0.22_200)] hover:border-[rgba(0,210,255,0.2)] transition-smooth"
              >
                {link.label}
                <span className="text-white/20">→</span>
              </Link>
            ))}
          </div>
        </aside>
      </div>

      {/* Scholarship Opportunities */}
      {scholarshipQuery.data && scholarshipQuery.data.length > 0 && (
        <section className="mt-8 px-5">
          <h3 className="text-amber-400 font-mono text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
            <span>◈</span> Scholarship Opportunities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {scholarshipQuery.data.map((match: any, _i: number) => (
              <div
                key={String(match.id)}
                className="glass border border-amber-500/30 rounded-xl p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-white/90 text-sm font-medium">
                    {String(match.programId)}
                  </p>
                  <span className="text-amber-400 font-mono text-xs shrink-0">
                    {Number(match.matchScore)}% match
                  </span>
                </div>
                <p className="text-white/50 text-xs mt-1 capitalize">
                  {String(match.applicationStatus)}
                </p>
                <p className="text-white/30 text-xs mt-2">
                  Matched{" "}
                  {new Date(
                    Number(match.matchedAt) / 1_000_000,
                  ).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CURIO nudge queue — fixed bottom right */}
      {plseState && plseState.curiosityQueue.length > 0 && (
        <div
          data-ocid="dashboard.curio_queue"
          className="fixed bottom-6 right-6 z-30 flex flex-col-reverse gap-2 items-end pointer-events-none"
        >
          {plseState.curiosityQueue.slice(0, 3).map((nudge, idx) => {
            if (dismissedNudges.has(idx)) return null;
            return (
              <motion.div
                key={`nudge-${idx}-${nudge.prompt.slice(0, 10)}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                data-ocid={`dashboard.curio_nudge.item.${idx + 1}`}
                className="pointer-events-auto flex items-start gap-2 max-w-xs glass-portal-student rounded-2xl px-4 py-2.5 shadow-lg"
              >
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)] shrink-0 mt-0.5">
                  CURIO
                </span>
                <p className="text-xs text-white/80 leading-snug flex-1 min-w-0">
                  {nudge.prompt}
                </p>
                <button
                  type="button"
                  data-ocid={`dashboard.curio_nudge.dismiss.${idx + 1}`}
                  className="shrink-0 ml-1 text-white/30 hover:text-white/70 transition-colors"
                  aria-label="Dismiss"
                  onClick={() =>
                    setDismissedNudges((prev) => new Set([...prev, idx]))
                  }
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
