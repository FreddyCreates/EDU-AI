import EddiOrb, { type EddiMode } from "@/components/EddiOrb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  usePassportInsight,
  usePassportStats,
  useSSScore,
  useSovereignPassport,
} from "@/hooks/use-passport";
import { useAchievements } from "@/hooks/use-recognition";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import {
  Award,
  Flame,
  GraduationCap,
  LogIn,
  Snowflake,
  Sparkles,
  Stamp,
  Star,
  Vault,
  Wind,
} from "lucide-react";
import { motion } from "motion/react";

/* ─── helpers ─────────────────────────────────────────────────────── */

function formatDate(ts: bigint | number) {
  const ms = typeof ts === "bigint" ? Number(ts) / 1_000_000 : ts;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function shortPassportId(id: string) {
  if (!id || id.length < 5) return `PP-PP-${id.toUpperCase()}`;
  return `PP-PP-${id.slice(0, 5).toUpperCase()}`;
}

/* ─── zone config ─────────────────────────────────────────────────── */

const ZONES = [
  {
    key: "hotSeeds" as const,
    label: "HOT",
    icon: Flame,
    color: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    shadow: "shadow-[0_0_21px_rgba(249,115,22,0.25)]",
  },
  {
    key: "warmSeeds" as const,
    label: "WARM",
    icon: Wind,
    color: "text-amber-400",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    shadow: "shadow-[0_0_21px_rgba(245,158,11,0.2)]",
  },
  {
    key: "coldSeeds" as const,
    label: "COLD",
    icon: Wind,
    color: "text-sky-400",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
    shadow: "shadow-[0_0_21px_rgba(14,165,233,0.2)]",
  },
  {
    key: "frozenSeeds" as const,
    label: "FROZEN",
    icon: Snowflake,
    color: "text-indigo-400",
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/10",
    shadow: "shadow-[0_0_21px_rgba(99,102,241,0.2)]",
  },
  {
    key: "totalSeeds" as const,
    label: "VAULT",
    icon: Vault,
    color: "text-yellow-400",
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/10",
    shadow: "shadow-[0_0_21px_rgba(234,179,8,0.25)]",
  },
] as const;

const ACHIEVEMENT_TYPE_COLORS: Record<string, string> = {
  mastery:
    "bg-[rgba(0,210,255,0.12)] text-[oklch(0.78_0.22_200)] border-[rgba(0,210,255,0.25)]",
  recognition:
    "bg-[rgba(234,179,8,0.12)] text-yellow-400 border-[rgba(234,179,8,0.25)]",
  milestone:
    "bg-[rgba(147,51,234,0.12)] text-violet-400 border-[rgba(147,51,234,0.25)]",
  nomination:
    "bg-[rgba(34,197,94,0.12)] text-emerald-400 border-[rgba(34,197,94,0.25)]",
};

/* ─── component ───────────────────────────────────────────────────── */

export default function Passport() {
  const { isAuthenticated, login, identity } = useInternetIdentity();
  const principal = identity?.getPrincipal() ?? null;
  const { data: insight } = usePassportInsight(principal);

  const { passport, isLoadingPassport, isFetchingActor } =
    useSovereignPassport();
  const { data: stats, isLoading: isLoadingStats } = usePassportStats();
  const { data: achievements = [], isLoading: isLoadingAchievements } =
    useAchievements(principal);
  const { data: sssScore = 0 } = useSSScore();

  const isLoading = isLoadingPassport || isFetchingActor;

  // SSS trajectory mapping
  const sssTrajectory =
    sssScore >= 89
      ? "SOVEREIGN"
      : sssScore >= 34
        ? "MASTERY"
        : sssScore >= 13
          ? "GROWING"
          : sssScore >= 5
            ? "BUILDING"
            : "STRUGGLE";

  const orbMode =
    sssTrajectory === "SOVEREIGN"
      ? "SOVEREIGN"
      : sssTrajectory === "MASTERY"
        ? "SOVEREIGN"
        : sssTrajectory === "GROWING"
          ? "BUILD"
          : sssTrajectory === "BUILDING"
            ? "REFLECT"
            : "EXPLORE";

  /* ── unauthenticated ───────────────────────────────────────────── */
  if (!isAuthenticated) {
    return (
      <div
        data-ocid="passport.page"
        className="mx-auto max-w-2xl px-5 py-24 flex flex-col items-center text-center gap-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex h-[89px] w-[89px] items-center justify-center rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_0_34px_rgba(0,210,255,0.2)]"
        >
          <Stamp className="h-10 w-10 text-[oklch(0.78_0.22_200)]" />
        </motion.div>
        <div className="space-y-3">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Your Sovereign Passport
          </h1>
          <p className="text-foreground/50 max-w-md text-sm leading-relaxed">
            Your learning journey sealed on-chain. Permanent, sovereign, yours.
          </p>
        </div>
        <Button
          data-ocid="passport.login_button"
          onClick={() => login()}
          className="gap-2 bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] hover:opacity-90 font-bold h-12 px-8 rounded-xl"
          type="button"
        >
          <LogIn className="h-4 w-4" />
          Sign in to Access Your Passport
        </Button>
      </div>
    );
  }

  /* ── loading ───────────────────────────────────────────────────── */
  if (isLoading) {
    return (
      <div
        data-ocid="passport.loading_state"
        className="mx-auto max-w-3xl px-5 py-10 space-y-5"
      >
        <Skeleton className="h-[89px] w-full rounded-2xl" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[89px] rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-[144px] w-full rounded-2xl" />
        <Skeleton className="h-[200px] w-full rounded-2xl" />
      </div>
    );
  }

  /* ── no passport yet ──────────────────────────────────────────── */
  if (!passport) {
    return (
      <div
        data-ocid="passport.page"
        className="mx-auto max-w-xl px-5 py-16 flex flex-col items-center text-center gap-6"
      >
        <div className="flex h-[89px] w-[89px] items-center justify-center rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
          <Stamp className="h-10 w-10 text-[oklch(0.78_0.22_200)]" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          No passport found
        </h2>
        <p className="text-foreground/50 text-sm">
          Visit the Student portal to create your sovereign passport.
        </p>
      </div>
    );
  }

  /* ── main passport view ───────────────────────────────────────── */
  return (
    <div
      data-ocid="passport.page"
      className="mx-auto max-w-3xl px-5 sm:px-8 py-10 space-y-5"
    >
      {/* ① Header card */}
      <motion.div
        initial={{ opacity: 0, y: -13 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        data-ocid="passport.header_card"
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-[21px] flex flex-wrap items-center justify-between gap-5"
        style={{ boxShadow: "0 0 34px rgba(0,210,255,0.1)" }}
      >
        <div className="flex items-center gap-5">
          <div className="flex h-[55px] w-[55px] shrink-0 items-center justify-center rounded-xl backdrop-blur-md bg-[rgba(0,210,255,0.08)] border border-[rgba(0,210,255,0.2)]">
            <GraduationCap className="h-7 w-7 text-[oklch(0.78_0.22_200)]" />
          </div>
          <div className="space-y-1">
            <p className="font-display text-xl font-bold text-foreground">
              {passport.studentName ?? "Loading..."}
            </p>
            <p className="font-mono text-xs text-foreground/40">
              {shortPassportId(passport.passportId ?? "")}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            data-ocid="passport.grade_badge"
            className="backdrop-blur-md bg-[rgba(0,210,255,0.08)] border border-[rgba(0,210,255,0.2)] text-[oklch(0.78_0.22_200)] font-semibold"
          >
            {passport.gradeLevel ?? "K"}
          </Badge>
          <Badge className="backdrop-blur-md bg-[rgba(147,51,234,0.08)] border border-[rgba(147,51,234,0.2)] text-violet-400 font-mono text-[10px]">
            SOVEREIGN
          </Badge>
        </div>
      </motion.div>

      {/* ② Stats row */}
      <div
        data-ocid="passport.stats_row"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {isLoadingStats
          ? [1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[89px] rounded-2xl" />
            ))
          : [
              {
                label: "Total Seeds",
                value: stats ? Number(stats.totalSeeds).toString() : "0",
                icon: Star,
                color: "text-[oklch(0.78_0.22_200)]",
              },
              {
                label: "Compound Score",
                value: stats ? Number(stats.compoundScore).toFixed(2) : "0.00",
                icon: Sparkles,
                color: "text-amber-400",
              },
              {
                label: "Hot Seeds",
                value: stats ? Number(stats.hotSeeds).toString() : "0",
                icon: Flame,
                color: "text-orange-400",
              },
              {
                label: "Frozen Seeds",
                value: stats ? Number(stats.frozenSeeds).toString() : "0",
                icon: Snowflake,
                color: "text-indigo-400",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 13 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                data-ocid={`passport.stat.${i + 1}`}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2"
              >
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <p className={`font-display text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="text-foreground/50 text-xs">{stat.label}</p>
              </motion.div>
            ))}
      </div>

      {/* ③ Memory Zones */}
      <motion.div
        initial={{ opacity: 0, y: 13 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        data-ocid="passport.memory_zones"
        className="space-y-3"
      >
        <h3 className="font-mono text-xs font-bold text-foreground/40 uppercase tracking-widest px-1">
          Memory Zones
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {ZONES.map((zone, i) => {
            const ZoneIcon = zone.icon;
            const count = stats ? Number(stats[zone.key]) : 0;
            return (
              <motion.div
                key={zone.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.35 }}
                data-ocid={`passport.zone.${zone.label.toLowerCase()}`}
                className={`backdrop-blur-md ${zone.bg} border ${zone.border} ${zone.shadow} rounded-2xl p-5 flex flex-col items-center gap-2 text-center`}
              >
                <ZoneIcon className={`h-5 w-5 ${zone.color}`} />
                <p className={`font-display text-xl font-bold ${zone.color}`}>
                  {count}
                </p>
                <p className="font-mono text-[10px] font-bold text-foreground/40 uppercase tracking-widest">
                  {zone.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ④ EDDI Insights — Live SSS Intelligence */}
      <motion.div
        initial={{ opacity: 0, y: 13 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        data-ocid="passport.eddi_insights"
        className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-[21px]"
        style={{ boxShadow: "0 0 21px rgba(147,51,234,0.15)" }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-[21px]">
          <div className="shrink-0">
            <EddiOrb
              mode={(insight?.orbMode ?? orbMode) as EddiMode}
              size="sm"
            />
          </div>
          <div className="space-y-3 flex-1 text-center sm:text-left">
            {/* State label */}
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="h-4 w-4 text-violet-400" />
              <span className="font-mono text-xs font-bold text-violet-400 uppercase tracking-widest">
                EDDI Intelligence State
              </span>
            </div>

            {/* SSS score + trajectory */}
            <div className="flex items-end gap-4 justify-center sm:justify-start">
              <span
                className="font-display text-5xl font-black leading-none"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.86 0.18 85), oklch(0.78 0.22 60))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {sssScore}
              </span>
              <div className="pb-1 space-y-0.5">
                <p
                  className="font-mono text-sm font-bold uppercase tracking-widest"
                  style={{ color: "oklch(0.86 0.18 85)" }}
                >
                  {sssTrajectory}
                </p>
                <p className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider">
                  Intelligence State
                </p>
              </div>
            </div>

            {/* Narration */}
            <p className="text-foreground/60 text-sm leading-relaxed">
              Your passport holds{" "}
              <span className="text-[oklch(0.78_0.22_200)] font-semibold">
                {stats ? Number(stats.totalSeeds).toString() : "0"} seeds
              </span>
              . Current state:{" "}
              <span
                style={{ color: "oklch(0.86 0.18 85)" }}
                className="font-semibold"
              >
                {sssTrajectory}
              </span>
              . Every session compounds toward sovereign mastery.
            </p>

            <p className="text-foreground/30 text-xs font-mono">
              SSS · PHI-driven · Fibonacci-floored · PRTL_SSSC
            </p>
          </div>
        </div>
      </motion.div>

      {/* ⑤ K-12 Recognition Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 13 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        data-ocid="passport.recognition_timeline"
        className="space-y-3"
      >
        <h3 className="font-mono text-xs font-bold text-foreground/40 uppercase tracking-widest px-1">
          K–12 Recognition Timeline
        </h3>

        {isLoadingAchievements ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[55px] rounded-2xl" />
            ))}
          </div>
        ) : achievements.length === 0 ? (
          <div
            data-ocid="passport.timeline.empty_state"
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-[34px] flex flex-col items-center gap-3 text-center"
          >
            <Award className="h-8 w-8 text-foreground/20" />
            <p className="text-foreground/50 text-sm">
              Your recognition story is just beginning. Keep learning.
            </p>
          </div>
        ) : (
          <div className="relative space-y-3">
            {/* vertical timeline line */}
            <div className="absolute left-[21px] top-0 bottom-0 w-px bg-white/10" />
            {achievements.map((achievement, i) => {
              const typeKey = String(
                "achievementType" in achievement
                  ? achievement.achievementType
                  : "milestone",
              ).toLowerCase();
              const colorClass =
                ACHIEVEMENT_TYPE_COLORS[typeKey] ??
                ACHIEVEMENT_TYPE_COLORS.milestone;
              return (
                <motion.div
                  key={String(achievement.id ?? i)}
                  initial={{ opacity: 0, x: -13 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.35 }}
                  data-ocid={`passport.timeline.item.${i + 1}`}
                  className="flex items-start gap-5 pl-5"
                >
                  {/* dot */}
                  <div className="relative z-10 mt-4 h-3 w-3 shrink-0 rounded-full bg-[oklch(0.78_0.22_200)] shadow-[0_0_8px_rgba(0,210,255,0.6)]" />
                  {/* card */}
                  <div className="flex-1 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-foreground/90 text-sm font-medium">
                        {String(
                          achievement.description ?? "Achievement unlocked",
                        )}
                      </p>
                      <Badge
                        data-ocid={`passport.timeline.type_badge.${i + 1}`}
                        className={`text-[10px] border ${colorClass}`}
                      >
                        {typeKey.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-foreground/40 text-xs font-mono">
                      {formatDate(achievement.sealedAt ?? 0n)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
