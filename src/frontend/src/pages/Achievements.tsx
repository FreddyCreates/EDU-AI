import type { AchievementRecord } from "@/backend";
import { AchievementZone } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useAchievements,
  useAllRecognitionFlags,
  useRecognitionTimeline,
} from "@/hooks/use-recognition";
import { useStudent } from "@/hooks/use-student";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  ChevronLeft,
  Flame,
  History,
  Layers,
  Snowflake,
  Star,
  Trophy,
  Wind,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const ZONE_CONFIG = {
  [AchievementZone.hot]: {
    icon: Flame,
    label: "HOT",
    color: "text-orange-300",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
    glow: "rgba(249,115,22,0.15)",
  },
  [AchievementZone.warm]: {
    icon: Wind,
    label: "WARM",
    color: "text-amber-300",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    glow: "rgba(245,158,11,0.12)",
  },
  [AchievementZone.cold]: {
    icon: BookOpen,
    label: "COLD",
    color: "text-sky-300",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
    glow: "rgba(14,165,233,0.12)",
  },
  [AchievementZone.frozen]: {
    icon: Snowflake,
    label: "FROZEN",
    color: "text-indigo-300",
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/10",
    glow: "rgba(99,102,241,0.12)",
  },
};

function AchievementCard({
  achievement,
  index,
}: { achievement: AchievementRecord; index: number }) {
  const zoneCfg =
    ZONE_CONFIG[achievement.zone] ?? ZONE_CONFIG[AchievementZone.cold];
  const ZoneIcon = zoneCfg.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.06,
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      data-ocid={`achievements.item.${index + 1}`}
      className={`rounded-2xl border ${zoneCfg.border} ${zoneCfg.bg} p-5 relative overflow-hidden`}
      style={{
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
        boxShadow: `0 8px 32px rgba(0,0,0,0.40), 0 0 24px ${zoneCfg.glow}`,
      }}
    >
      <div
        className="pointer-events-none absolute -top-6 -right-6 h-28 w-28 rounded-full blur-3xl"
        style={{ background: zoneCfg.glow }}
      />
      <div className="relative flex items-start gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${zoneCfg.border}`}
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <ZoneIcon className={`h-5 w-5 ${zoneCfg.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <p className="font-display font-bold text-base text-white/90 leading-snug">
              {achievement.description}
            </p>
            <Badge
              className={`shrink-0 text-xs font-mono border ${zoneCfg.border} ${zoneCfg.bg} ${zoneCfg.color}`}
            >
              {zoneCfg.label}
            </Badge>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
              {achievement.achievementType.replace(/([A-Z])/g, " $1").trim()}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-[10px] text-white/30">
              {new Date(
                Number(achievement.sealedAt) / 1_000_000,
              ).toLocaleDateString()}
            </span>
            <span className="text-white/20">·</span>
            <span className="text-[10px] font-mono text-white/25">
              {achievement.source}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ZoneStats({ achievements }: { achievements: AchievementRecord[] }) {
  const zones = Object.values(AchievementZone);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {zones.map((zone) => {
        const count = achievements.filter((a) => a.zone === zone).length;
        const cfg = ZONE_CONFIG[zone];
        const ZIcon = cfg.icon;
        return (
          <div
            key={zone}
            data-ocid={`achievements.zone_stat.${zone}`}
            className={`glass-sm rounded-xl border ${cfg.border} ${cfg.bg} p-4 flex items-center gap-3`}
          >
            <ZIcon className={`h-5 w-5 shrink-0 ${cfg.color}`} />
            <div>
              <p className={`font-display text-xl font-black ${cfg.color}`}>
                {count}
              </p>
              <p className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                {cfg.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AchievementsPage() {
  const { identity, isAuthenticated } = useInternetIdentity();
  const { profile } = useStudent();
  const principal = identity?.getPrincipal() ?? null;
  const { data: achievements = [], isLoading } = useAchievements(principal);
  const { data: flags = [] } = useAllRecognitionFlags();
  const { data: timeline = [] } = useRecognitionTimeline(principal);
  const firstName = profile?.name?.split(" ")?.[0] ?? "Explorer";

  return (
    <div
      data-ocid="achievements.page"
      className="portal-enter min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8"
    >
      <div className="space-y-4">
        <Link
          to="/dashboard"
          data-ocid="achievements.back_link"
          className="inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white/70 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Back to Dashboard
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(12,14,28,0.85) 100%)",
            border: "1px solid rgba(99,102,241,0.25)",
            boxShadow:
              "0 16px 64px rgba(0,0,0,0.50), inset 0 1px 0 rgba(99,102,241,0.10)",
            backdropFilter: "blur(24px) saturate(200%)",
            WebkitBackdropFilter: "blur(24px) saturate(200%)",
          }}
        >
          <div
            className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full blur-3xl"
            style={{ background: "rgba(99,102,241,0.10)" }}
          />
          <div className="relative flex items-center gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
              style={{
                background: "rgba(99,102,241,0.20)",
                border: "1px solid rgba(99,102,241,0.40)",
                boxShadow: "0 0 24px rgba(99,102,241,0.25)",
              }}
            >
              <Layers className="h-7 w-7 text-indigo-400" />
            </div>
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-0.5 mb-1"
                style={{
                  background: "rgba(99,102,241,0.12)",
                  border: "1px solid rgba(99,102,241,0.25)",
                }}
              >
                <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-indigo-300">
                  ACHV · Achievement Vault
                </span>
              </div>
              <h1 className="font-display text-2xl font-black text-white/95">
                {isAuthenticated
                  ? `${firstName}'s Achievements`
                  : "Achievements"}
              </h1>
              <p className="text-sm text-white/50 mt-0.5">
                Fibonacci-zoned vault · {achievements.length} achievement
                {achievements.length !== 1 ? "s" : ""} sealed
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {!isLoading && achievements.length > 0 && (
        <section data-ocid="achievements.zone_stats_section">
          <ZoneStats achievements={achievements} />
        </section>
      )}

      {/* K-12 Timeline link */}
      {timeline.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          data-ocid="achievements.k12_timeline_card"
          className="rounded-xl p-4 flex items-center justify-between gap-4"
          style={{
            background: "rgba(99,102,241,0.08)",
            border: "1px solid rgba(99,102,241,0.22)",
          }}
        >
          <div className="flex items-center gap-3">
            <History className="h-5 w-5 text-indigo-400" />
            <div>
              <p className="text-sm font-semibold text-indigo-200">
                {timeline.length} milestone{timeline.length !== 1 ? "s" : ""} in
                your K-12 story
              </p>
              <p className="text-xs text-white/40">
                View your full recognition timeline from K to graduation
              </p>
            </div>
          </div>
          <Link
            to="/recognition-timeline"
            data-ocid="achievements.k12_timeline_link"
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-smooth hover:opacity-80 text-indigo-300"
          >
            View Story <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      )}

      {flags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          data-ocid="achievements.recognition_link_card"
          className="rounded-xl p-4 flex items-center justify-between gap-4"
          style={{
            background: "rgba(251,191,36,0.08)",
            border: "1px solid rgba(251,191,36,0.18)",
          }}
        >
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5" style={{ color: "rgb(251,191,36)" }} />
            <div>
              <p
                className="text-sm font-semibold"
                style={{ color: "rgb(253,224,130)" }}
              >
                {flags.length} recognition flag{flags.length !== 1 ? "s" : ""}{" "}
                detected
              </p>
              <p className="text-xs text-white/40">
                You may qualify for national academic programs
              </p>
            </div>
          </div>
          <Link
            to="/recognition"
            data-ocid="achievements.view_recognition_link"
            className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl transition-smooth hover:opacity-80"
            style={{ color: "rgb(251,191,36)" }}
          >
            View <Award className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      )}

      <section data-ocid="achievements.timeline_section" className="space-y-4">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-indigo-400" />
          <h2 className="font-display text-sm font-bold text-white/80">
            Full Achievement Timeline
          </h2>
          {!isLoading && (
            <Badge
              variant="outline"
              className="font-mono text-xs border-indigo-500/30 text-indigo-300"
            >
              {achievements.length}
            </Badge>
          )}
        </div>
        {isLoading ? (
          <div
            data-ocid="achievements.timeline_section.loading_state"
            className="space-y-3"
          >
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24 rounded-2xl" />
            ))}
          </div>
        ) : achievements.length === 0 ? (
          <div
            data-ocid="achievements.timeline_section.empty_state"
            className="glass rounded-2xl p-10 flex flex-col items-center gap-4 text-center"
          >
            <div className="text-4xl">🏆</div>
            <div>
              <p className="font-display font-semibold text-white/70">
                Your achievement vault is empty
              </p>
              <p className="text-sm text-white/40 mt-1">
                Complete lessons, ace quizzes, and hit mastery milestones —
                every achievement is permanently sealed here.
              </p>
            </div>
            <Link
              to="/dashboard"
              data-ocid="achievements.empty_state.cta_link"
              className="rounded-xl px-4 py-2 text-xs font-bold text-[oklch(0.78_0.22_200)] border border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] hover:bg-[rgba(0,210,255,0.15)] transition-smooth"
            >
              Start Learning
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {achievements.map((achv, i) => (
              <AchievementCard key={achv.id} achievement={achv} index={i} />
            ))}
          </div>
        )}
      </section>

      <section
        data-ocid="achievements.zone_legend_section"
        className="glass-sm rounded-2xl p-5 space-y-3"
      >
        <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">
          Fibonacci Memory Zones
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              zone: "HOT",
              fib: "F(1)",
              desc: "Last 5 sessions — most active memory",
              color: "text-orange-300",
            },
            {
              zone: "WARM",
              fib: "F(3)",
              desc: "Last 13 sessions — recent knowledge",
              color: "text-amber-300",
            },
            {
              zone: "COLD",
              fib: "F(5)",
              desc: "Last 55 sessions — compressed seeds",
              color: "text-sky-300",
            },
            {
              zone: "FROZEN",
              fib: "F(7)",
              desc: "Beyond 55 — sealed forever in ACHV",
              color: "text-indigo-300",
            },
          ].map((z) => (
            <div key={z.zone} className="flex items-center gap-3">
              <span
                className={`font-mono text-xs font-bold ${z.color} w-14 shrink-0`}
              >
                {z.zone}
              </span>
              <span className="font-mono text-[9px] text-white/30">
                {z.fib}
              </span>
              <span className="text-xs text-white/40">{z.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
