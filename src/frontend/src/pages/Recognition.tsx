import type { RecognitionFlag } from "@/backend";
import EddiOrb from "@/components/EddiOrb";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAutoSeal, useSovereignPassport } from "@/hooks/use-passport";
import {
  useAchievements,
  useRcgnThreshold,
  useRecognitionFlags,
} from "@/hooks/use-recognition";
import { useStudent } from "@/hooks/use-student";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  ChevronLeft,
  ExternalLink,
  Flame,
  Printer,
  Shield,
  Snowflake,
  Sparkles,
  Star,
  Trophy,
  Wind,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const PROGRAM_META: Record<
  string,
  { icon: string; color: string; border: string; bg: string }
> = {
  NSHSS: {
    icon: "🏅",
    color: "text-amber-300",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
  },
  UIL: {
    icon: "🎯",
    color: "text-sky-300",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
  },
  AMC: {
    icon: "📐",
    color: "text-violet-300",
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
  },
  JSHS: {
    icon: "🔬",
    color: "text-emerald-300",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
  },
};

const PATTERN_LABELS: Record<string, { label: string; color: string }> = {
  PerfectScore: { label: "Perfect Score", color: "text-amber-300" },
  SustainedMastery: { label: "Sustained Mastery", color: "text-sky-300" },
  SubjectExcellence: { label: "Subject Excellence", color: "text-violet-300" },
  PaceAnomaly: { label: "Pace Anomaly", color: "text-emerald-300" },
};

const ZONE_CONFIG = {
  hot: {
    icon: Flame,
    label: "HOT",
    color: "text-orange-300",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
  },
  warm: {
    icon: Wind,
    label: "WARM",
    color: "text-amber-300",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
  },
  cold: {
    icon: BookOpen,
    label: "COLD",
    color: "text-sky-300",
    border: "border-sky-500/30",
    bg: "bg-sky-500/10",
  },
  frozen: {
    icon: Snowflake,
    label: "FROZEN",
    color: "text-indigo-300",
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/10",
  },
} as const;

function FlagCard({ flag, index }: { flag: RecognitionFlag; index: number }) {
  const patternMeta = PATTERN_LABELS[flag.pattern] ?? {
    label: flag.pattern,
    color: "text-white/70",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.08,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      data-ocid={`recognition.flag_card.${index + 1}`}
      className="rounded-2xl p-5 space-y-4 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(251,191,36,0.09) 0%, rgba(12,14,28,0.82) 100%)",
        border: "1px solid rgba(251,191,36,0.22)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.40), inset 0 1px 0 rgba(251,191,36,0.08)",
        backdropFilter: "blur(16px) saturate(180%)",
        WebkitBackdropFilter: "blur(16px) saturate(180%)",
      }}
    >
      <div
        className="pointer-events-none absolute -top-8 -right-8 h-36 w-36 rounded-full blur-3xl"
        style={{ background: "rgba(251,191,36,0.08)" }}
      />
      <div className="relative">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: "rgba(251,191,36,0.15)",
                border: "1px solid rgba(251,191,36,0.30)",
                boxShadow: "0 0 12px rgba(251,191,36,0.15)",
              }}
            >
              <Trophy
                className="h-5 w-5"
                style={{ color: "rgb(251,191,36)" }}
              />
            </div>
            <div className="min-w-0">
              <p className="font-display font-bold text-base text-white/90 truncate">
                {flag.subject}
              </p>
              <p className={`text-xs font-mono ${patternMeta.color}`}>
                {patternMeta.label}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <Badge
              className="font-mono text-xs border"
              style={{
                background: "rgba(251,191,36,0.15)",
                borderColor: "rgba(251,191,36,0.30)",
                color: "rgb(251,191,36)",
              }}
            >
              {Number(flag.masteryScore)}% mastery
            </Badge>
            {flag.sealed && (
              <Badge
                variant="outline"
                className="text-[9px] font-mono border-emerald-500/30 text-emerald-300"
              >
                SEALED
              </Badge>
            )}
          </div>
        </div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-white/30 mb-2">
          Eligible Programs
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {flag.eligiblePrograms.map((prog) => {
            const meta = PROGRAM_META[prog.name] ?? {
              icon: "⭐",
              color: "text-white/70",
              border: "border-white/10",
              bg: "bg-white/5",
            };
            return (
              <div
                key={prog.name}
                data-ocid={`recognition.program_card.${prog.name}`}
                className={`rounded-xl border ${meta.border} ${meta.bg} p-3 space-y-1`}
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden="true">{meta.icon}</span>
                  <p className={`font-display font-bold text-sm ${meta.color}`}>
                    {prog.name}
                  </p>
                </div>
                <p className="text-[10px] text-white/50 leading-snug">
                  {prog.description}
                </p>
                {prog.url && (
                  <a
                    href={prog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid={`recognition.program_link.${prog.name}`}
                    className={`inline-flex items-center gap-1 text-[10px] font-semibold ${meta.color} hover:opacity-75 transition-opacity`}
                  >
                    Learn more <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-[10px] text-white/30 font-mono mt-3">
          Detected:{" "}
          {new Date(Number(flag.detectedAt) / 1_000_000).toLocaleDateString()} ·
          Flag ID: {flag.id.slice(0, 8)}…
        </p>
      </div>
    </motion.div>
  );
}

/** Passport preview modal shown after sealing */
function PassportPreviewModal({
  open,
  onClose,
  name,
  score,
  achievement,
}: {
  open: boolean;
  onClose: () => void;
  name: string;
  score: number;
  achievement: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.72)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            data-ocid="recognition.passport_preview_modal"
            className="relative max-w-sm w-full rounded-3xl p-8 space-y-6"
            style={{
              background:
                "linear-gradient(135deg, rgba(251,191,36,0.15) 0%, rgba(12,14,28,0.96) 100%)",
              border: "1px solid rgba(251,191,36,0.35)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.70), 0 0 60px rgba(251,191,36,0.15)",
              backdropFilter: "blur(24px) saturate(200%)",
              WebkitBackdropFilter: "blur(24px) saturate(200%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              data-ocid="recognition.passport_preview_modal.close_button"
              onClick={onClose}
              aria-label="Close passport preview"
              className="absolute top-4 right-4 rounded-full p-1.5 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex flex-col items-center gap-3 text-center">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{
                  background: "rgba(251,191,36,0.18)",
                  border: "1px solid rgba(251,191,36,0.40)",
                  boxShadow: "0 0 30px rgba(251,191,36,0.30)",
                }}
              >
                <Sparkles
                  className="h-8 w-8"
                  style={{ color: "rgb(251,191,36)" }}
                />
              </div>
              <div className="space-y-1">
                <span
                  className="font-mono text-[9px] font-bold uppercase tracking-widest block"
                  style={{ color: "rgb(251,191,36)" }}
                >
                  Sovereign Passport · Sealed
                </span>
                <h2 className="font-display text-xl font-black text-white/95">
                  {name}
                </h2>
              </div>
            </div>
            <div
              className="rounded-2xl p-5 space-y-3"
              style={{
                background: "rgba(251,191,36,0.06)",
                border: "1px solid rgba(251,191,36,0.18)",
              }}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                  RCGN Score
                </span>
                <span className="font-display font-black text-amber-300 text-lg">
                  {score}
                </span>
              </div>
              <div className="h-px bg-white/8" />
              <div>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest block mb-1">
                  Latest Achievement
                </span>
                <p className="text-sm text-white/80 font-medium leading-snug">
                  {achievement}
                </p>
              </div>
            </div>
            <p className="text-center text-xs text-white/30 leading-relaxed">
              This achievement is permanently sealed in your sovereign passport
              and follows you from today through graduation.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Print-friendly share card modal */
function ShareModal({
  open,
  onClose,
  name,
  achievement,
  school,
  score,
}: {
  open: boolean;
  onClose: () => void;
  name: string;
  achievement: string;
  school: string;
  score: number;
}) {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[300] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.80)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
            data-ocid="recognition.share_modal"
            className="relative max-w-md w-full space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              data-ocid="recognition.share_modal.close_button"
              onClick={onClose}
              aria-label="Close share card"
              className="absolute -top-10 right-0 flex items-center gap-1.5 text-xs font-mono text-white/40 hover:text-white/70 transition-colors"
            >
              <X className="h-3.5 w-3.5" /> Close
            </button>
            {/* The printable achievement card */}
            <div
              id="achievement-print-card"
              className="rounded-3xl p-8 space-y-6 text-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(251,191,36,0.18) 0%, rgba(12,14,28,0.98) 100%)",
                border: "2px solid rgba(251,191,36,0.40)",
                boxShadow:
                  "0 32px 80px rgba(0,0,0,0.70), 0 0 60px rgba(251,191,36,0.18)",
                backdropFilter: "blur(24px) saturate(200%)",
                WebkitBackdropFilter: "blur(24px) saturate(200%)",
              }}
            >
              <div className="space-y-1">
                <p
                  className="font-mono text-[9px] font-bold uppercase tracking-widest"
                  style={{ color: "rgb(251,191,36)" }}
                >
                  EduAI · Sovereign Recognition
                </p>
                <div
                  className="h-px mx-auto w-24"
                  style={{ background: "rgba(251,191,36,0.35)" }}
                />
              </div>
              <div className="space-y-2">
                <p className="font-display text-2xl font-black text-white/95">
                  {name}
                </p>
                <p className="text-sm text-amber-200/70">{school}</p>
              </div>
              <div
                className="rounded-2xl p-5 space-y-2"
                style={{
                  background: "rgba(251,191,36,0.08)",
                  border: "1px solid rgba(251,191,36,0.22)",
                }}
              >
                <p className="text-xs font-mono text-white/40 uppercase tracking-widest">
                  Achievement
                </p>
                <p className="font-display font-bold text-lg text-white/90 leading-snug">
                  {achievement}
                </p>
                <p className="font-mono text-sm font-black text-amber-300">
                  RCGN Score: {score}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-white/30">{today}</p>
                <p
                  className="font-mono text-[9px] font-bold uppercase tracking-widest"
                  style={{ color: "rgba(251,191,36,0.5)" }}
                >
                  EduAI Sovereign Recognition · Permanently Sealed
                </p>
              </div>
            </div>
            <button
              type="button"
              data-ocid="recognition.share_modal.print_button"
              onClick={() => window.print()}
              className="w-full flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold text-sm transition-all duration-200 hover:opacity-90"
              style={{
                background: "rgba(251,191,36,0.15)",
                border: "1px solid rgba(251,191,36,0.35)",
                color: "rgb(251,191,36)",
                boxShadow: "0 0 24px rgba(251,191,36,0.15)",
              }}
            >
              <Printer className="h-4 w-4" />
              Print / Save Achievement Card
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function RecognitionPage() {
  const { identity, isAuthenticated } = useInternetIdentity();
  const { profile } = useStudent();
  const principal = identity?.getPrincipal() ?? null;
  const { data: flags = [], isLoading: flagsLoading } =
    useRecognitionFlags(principal);
  const { data: achievements = [], isLoading: achievementsLoading } =
    useAchievements(principal);
  const { data: rcgnT = 0n } = useRcgnThreshold(principal);
  const rcgnThreshold = Number(rcgnT);
  const firstName = profile?.name?.split(" ")?.[0] ?? "Explorer";

  useSovereignPassport();
  const autoSeal = useAutoSeal();
  const [passportModalOpen, setPassportModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [sealLoading, setSealLoading] = useState(false);

  const heroFlag = flags[0] ?? null;
  const heroAchievement = achievements[0];

  async function handleCarryForward() {
    if (!heroFlag) return;
    setSealLoading(true);
    try {
      await autoSeal.mutateAsync({
        summary: `Recognition: ${heroFlag.subject} — ${heroFlag.pattern}`,
        engineUsed: "RCGN",
        subject: heroFlag.subject,
        gradeLevel: profile?.gradeLevel
          ? String(profile.gradeLevel)
          : "Unknown",
      });
      setPassportModalOpen(true);
    } finally {
      setSealLoading(false);
    }
  }

  return (
    <div
      data-ocid="recognition.page"
      className="portal-enter min-h-screen max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8"
    >
      {/* Passport seal modal */}
      <PassportPreviewModal
        open={passportModalOpen}
        onClose={() => setPassportModalOpen(false)}
        name={profile?.name ?? firstName}
        score={rcgnThreshold}
        achievement={
          heroAchievement?.description ??
          heroFlag?.subject ??
          "National Academic Excellence"
        }
      />
      {/* Share card modal */}
      <ShareModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        name={profile?.name ?? firstName}
        achievement={
          heroAchievement?.description ??
          heroFlag?.subject ??
          "National Academic Excellence"
        }
        school={"EduAI School"}
        score={rcgnThreshold}
      />

      <div className="space-y-4">
        <Link
          to="/dashboard"
          data-ocid="recognition.back_link"
          className="inline-flex items-center gap-2 text-xs font-mono text-white/40 hover:text-white/70 transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Back to Dashboard
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          data-ocid="recognition.hero_section"
          className="rounded-2xl p-6 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(251,191,36,0.12) 0%, rgba(12,14,28,0.85) 100%)",
            border: "1px solid rgba(251,191,36,0.25)",
            boxShadow:
              "0 16px 64px rgba(0,0,0,0.50), inset 0 1px 0 rgba(251,191,36,0.10)",
            backdropFilter: "blur(24px) saturate(200%)",
            WebkitBackdropFilter: "blur(24px) saturate(200%)",
          }}
        >
          <div
            className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full blur-3xl"
            style={{ background: "rgba(251,191,36,0.12)" }}
          />
          <div className="relative space-y-5">
            {/* EDDI Orb — Recognition Mode */}
            <div className="flex justify-center">
              <EddiOrb
                mode="REFLECT"
                size="sm"
                label="EDDI — Recognition Mode"
              />
            </div>
            <div className="flex items-center gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
                style={{
                  background: "rgba(251,191,36,0.20)",
                  border: "1px solid rgba(251,191,36,0.40)",
                  boxShadow: "0 0 24px rgba(251,191,36,0.25)",
                }}
              >
                <Award
                  className="h-7 w-7"
                  style={{ color: "rgb(251,191,36)" }}
                />
              </div>
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3 py-0.5 mb-1"
                  style={{
                    background: "rgba(251,191,36,0.12)",
                    border: "1px solid rgba(251,191,36,0.25)",
                  }}
                >
                  <span
                    className="font-mono text-[9px] font-bold uppercase tracking-widest"
                    style={{ color: "rgb(251,191,36)" }}
                  >
                    RCGN · Sovereign Recognition Engine
                  </span>
                </div>
                <h1 className="font-display text-2xl font-black text-white/95">
                  {isAuthenticated
                    ? `${firstName}'s Recognition`
                    : "Recognition"}
                </h1>
                <p className="text-sm text-white/50 mt-0.5">
                  National academic program eligibility · Sovereign ACHV vault
                </p>
              </div>
            </div>
            {/* Carry it Forward + Share buttons (shown when there is a hero flag) */}
            {isAuthenticated && heroFlag && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3 pt-1"
              >
                <button
                  type="button"
                  data-ocid="recognition.carry_forward_button"
                  disabled={sealLoading}
                  onClick={handleCarryForward}
                  className="flex items-center gap-2 rounded-2xl px-5 py-2.5 font-semibold text-sm transition-all duration-200 hover:opacity-90 disabled:opacity-50"
                  style={{
                    background: "rgba(251,191,36,0.18)",
                    border: "1px solid rgba(251,191,36,0.40)",
                    color: "rgb(251,191,36)",
                    boxShadow: "0 0 24px rgba(251,191,36,0.20)",
                  }}
                >
                  <Sparkles className="h-4 w-4" />
                  {sealLoading ? "Sealing…" : "Carry it Forward"}
                </button>
                <button
                  type="button"
                  data-ocid="recognition.share_excellence_button"
                  onClick={() => setShareModalOpen(true)}
                  className="flex items-center gap-2 rounded-2xl px-5 py-2.5 font-semibold text-sm transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.80)",
                  }}
                >
                  <Printer className="h-4 w-4" />
                  Share My Excellence
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* RCGN_T Threshold progress bar */}
      {isAuthenticated && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          data-ocid="recognition.rcgn_threshold_section"
          className="rounded-2xl p-5 space-y-3"
          style={{
            background:
              "linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(12,14,28,0.80) 100%)",
            border: "1px solid rgba(251,191,36,0.20)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-amber-400">
                RCGN_T · Recognition Threshold
              </span>
            </div>
            <span
              className="font-display text-lg font-black"
              style={{
                color:
                  rcgnThreshold >= 89
                    ? "rgb(251,191,36)"
                    : rcgnThreshold >= 55
                      ? "rgb(251,191,36)"
                      : "rgba(255,255,255,0.6)",
              }}
            >
              {rcgnThreshold}
              <span className="text-white/30 text-sm font-mono">/89</span>
            </span>
          </div>
          {/* Fibonacci progress bar: 0→55→89 */}
          <div className="space-y-1.5">
            <div className="relative h-3 w-full rounded-full bg-white/5 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(100, (rcgnThreshold / 89) * 100)}%`,
                  background:
                    rcgnThreshold >= 89
                      ? "linear-gradient(90deg, rgb(251,191,36), rgb(253,224,130))"
                      : rcgnThreshold >= 55
                        ? "linear-gradient(90deg, rgba(251,191,36,0.7), rgba(251,191,36,0.9))"
                        : "linear-gradient(90deg, rgba(251,191,36,0.4), rgba(251,191,36,0.6))",
                  boxShadow:
                    rcgnThreshold >= 55
                      ? "0 0 12px rgba(251,191,36,0.4)"
                      : "none",
                }}
              />
              {/* Milestone ticks */}
              {[55, 89].map((tick) => (
                <div
                  key={tick}
                  className="absolute top-0 h-full w-px bg-white/20"
                  style={{ left: `${(tick / 89) * 100}%` }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[9px] font-mono text-white/30">
              <span>0</span>
              <span className={rcgnThreshold >= 55 ? "text-amber-400" : ""}>
                F(10)=55 flag zone
              </span>
              <span
                className={
                  rcgnThreshold >= 89 ? "text-amber-300 font-bold" : ""
                }
              >
                F(11)=89 gold
              </span>
            </div>
          </div>
          {rcgnThreshold >= 55 && (
            <div className="flex items-center gap-2 pt-1">
              {rcgnThreshold >= 89 ? (
                <>
                  <span className="text-xl">🏆</span>
                  <p className="text-sm font-bold text-amber-300">
                    You've crossed the gold threshold! NOMS is preparing your
                    nomination packet.
                  </p>
                </>
              ) : (
                <>
                  <span className="text-lg">🎯</span>
                  <p className="text-sm text-amber-200/80">
                    You're in the recognition flag zone. Keep mastering subjects
                    to reach F(11)=89.
                  </p>
                </>
              )}
            </div>
          )}
          <Link
            to="/nominations"
            data-ocid="recognition.nomination_cta_link"
            className="inline-flex items-center gap-2 text-xs font-bold rounded-xl px-4 py-2 transition-smooth hover:opacity-90"
            style={{
              background: "rgba(251,191,36,0.12)",
              border: "1px solid rgba(251,191,36,0.28)",
              color: "rgb(251,191,36)",
            }}
          >
            <Award className="h-3.5 w-3.5" />
            View Nominations
          </Link>
        </motion.section>
      )}

      <section data-ocid="recognition.flags_section" className="space-y-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4" style={{ color: "rgb(251,191,36)" }} />
          <h2 className="font-display text-sm font-bold text-white/80">
            Recognition Flags
          </h2>
          {!flagsLoading && (
            <Badge
              className="font-mono text-xs border"
              style={{
                background: "rgba(251,191,36,0.12)",
                borderColor: "rgba(251,191,36,0.25)",
                color: "rgb(251,191,36)",
              }}
            >
              {flags.length}
            </Badge>
          )}
        </div>
        {flagsLoading ? (
          <div
            data-ocid="recognition.flags_section.loading_state"
            className="space-y-4"
          >
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-52 rounded-2xl" />
            ))}
          </div>
        ) : flags.length === 0 ? (
          <div
            data-ocid="recognition.flags_section.empty_state"
            className="glass rounded-2xl p-10 flex flex-col items-center gap-4 text-center"
          >
            <div className="text-4xl">🔍</div>
            <div>
              <p className="font-display font-semibold text-white/70">
                No recognition flags yet
              </p>
              <p className="text-sm text-white/40 mt-1">
                Keep learning — the RCGN engine monitors your performance
                automatically.
              </p>
            </div>
            <Link
              to="/dashboard"
              data-ocid="recognition.flags_section.cta_link"
              className="rounded-xl px-4 py-2 text-xs font-bold text-[oklch(0.78_0.22_200)] border border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] hover:bg-[rgba(0,210,255,0.15)] transition-smooth"
            >
              Continue Learning
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {flags.map((flag, i) => (
              <FlagCard key={flag.id} flag={flag} index={i} />
            ))}
          </div>
        )}
      </section>

      <section
        data-ocid="recognition.achievements_section"
        className="space-y-4"
      >
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-violet-400" />
          <h2 className="font-display text-sm font-bold text-white/80">
            Achievement History
          </h2>
          {!achievementsLoading && (
            <Badge
              variant="outline"
              className="font-mono text-xs border-violet-500/30 text-violet-300"
            >
              {achievements.length}
            </Badge>
          )}
        </div>
        {achievementsLoading ? (
          <div
            data-ocid="recognition.achievements_section.loading_state"
            className="space-y-3"
          >
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        ) : achievements.length === 0 ? (
          <div
            data-ocid="recognition.achievements_section.empty_state"
            className="glass rounded-2xl p-8 flex flex-col items-center gap-3 text-center"
          >
            <div className="text-3xl">🏆</div>
            <p className="font-display font-semibold text-white/60">
              Achievements will appear here
            </p>
            <p className="text-xs text-white/30">
              Earned as you complete sessions, quizzes, and mastery milestones.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {achievements.map((achv, i) => {
              const zoneCfg =
                ZONE_CONFIG[achv.zone as keyof typeof ZONE_CONFIG] ??
                ZONE_CONFIG.cold;
              const ZoneIcon = zoneCfg.icon;
              return (
                <motion.div
                  key={achv.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  data-ocid={`recognition.achievement_item.${i + 1}`}
                  className={`glass-sm rounded-xl border ${zoneCfg.border} ${zoneCfg.bg} p-4 flex items-center gap-3`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${zoneCfg.border}`}
                    style={{ background: "rgba(255,255,255,0.03)" }}
                  >
                    <ZoneIcon className={`h-4 w-4 ${zoneCfg.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-display font-semibold text-sm text-white/85 truncate">
                        {achv.description}
                      </p>
                      <Badge
                        className={`shrink-0 text-[9px] font-mono border ${zoneCfg.border} ${zoneCfg.bg} ${zoneCfg.color}`}
                      >
                        {zoneCfg.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono text-white/40">
                        {achv.achievementType.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                      <span className="text-[10px] text-white/30">
                        {new Date(
                          Number(achv.sealedAt) / 1_000_000,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Zap
                    className={`h-3.5 w-3.5 shrink-0 ${zoneCfg.color} opacity-60`}
                  />
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      <section data-ocid="recognition.programs_section" className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-white/40" />
          <h2 className="font-display text-sm font-bold text-white/80">
            About the Programs
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              name: "NSHSS",
              full: "National Society of High School Scholars",
              desc: "Recognizes top academic achievers nationally. Invitation-only. Covers all subjects.",
            },
            {
              name: "UIL",
              full: "University Interscholastic League",
              desc: "Texas statewide academic competition across 14 subjects. All grade levels.",
            },
            {
              name: "AMC",
              full: "American Mathematics Competitions",
              desc: "MAA-sponsored series identifying exceptional math talent nationally.",
            },
            {
              name: "JSHS",
              full: "Junior Science and Humanities Symposium",
              desc: "DoD-funded national research competition. Fully sponsored travel and recognition.",
            },
          ].map((prog, i) => {
            const meta = PROGRAM_META[prog.name];
            return (
              <motion.div
                key={prog.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                data-ocid={`recognition.program_info.${i + 1}`}
                className={`glass-sm rounded-xl border ${meta?.border ?? "border-white/10"} p-4 space-y-1.5`}
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden="true">{meta?.icon ?? "⭐"}</span>
                  <p
                    className={`font-display font-bold text-sm ${meta?.color ?? "text-white/80"}`}
                  >
                    {prog.name}
                  </p>
                  <span className="text-[9px] text-white/30 font-mono">
                    — {prog.full}
                  </span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">
                  {prog.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
