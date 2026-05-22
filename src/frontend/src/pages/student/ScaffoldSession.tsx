import { Button } from "@/components/ui/button";
import {
  useCloseScaffoldSession,
  useMyScaffoldSessions,
  useRequestScaffoldHint,
  useScaffoldFrames,
  useStartScaffoldSession,
  type ScaffoldFrame,
  type ScaffoldSession,
} from "@/hooks/use-scaffold";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, ChevronRight, Lightbulb, Lock, Unlock } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const TIER_COLORS = {
  tier1: {
    border: "border-[oklch(0.72_0.17_155)]/30",
    bg: "bg-[oklch(0.72_0.17_155)]/10",
    text: "text-[oklch(0.72_0.17_155)]",
    label: "Tier 1 — Gentle Prompt",
  },
  tier2: {
    border: "border-[oklch(0.76_0.18_84)]/30",
    bg: "bg-[oklch(0.76_0.18_84)]/10",
    text: "text-[oklch(0.76_0.18_84)]",
    label: "Tier 2 — Guided Question",
  },
  tier3: {
    border: "border-[oklch(0.65_0.22_200)]/30",
    bg: "bg-[oklch(0.65_0.22_200)]/10",
    text: "text-[oklch(0.65_0.22_200)]",
    label: "Tier 3 — Explicit Walkthrough",
  },
};

function tierKey(
  tier:
    | { tier1: null }
    | { tier2: null }
    | { tier3: null },
): keyof typeof TIER_COLORS {
  if ("tier1" in tier) return "tier1";
  if ("tier2" in tier) return "tier2";
  return "tier3";
}

function FrameCard({
  frame,
  onStart,
}: {
  frame: ScaffoldFrame;
  onStart: (topicId: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 flex flex-col gap-3"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-white/90 font-semibold capitalize">
            {frame.topicId}
          </p>
          <p className="text-white/50 text-sm">{frame.concept}</p>
        </div>
        <Button
          size="sm"
          className="shrink-0 bg-[oklch(0.72_0.17_155)]/20 border border-[oklch(0.72_0.17_155)]/40 text-[oklch(0.72_0.17_155)] hover:bg-[oklch(0.72_0.17_155)]/30"
          onClick={() => onStart(frame.topicId)}
        >
          <Lightbulb className="h-3 w-3 mr-1" />
          Start
        </Button>
      </div>

      <button
        className="text-xs text-white/40 hover:text-white/60 flex items-center gap-1 text-left"
        onClick={() => setExpanded((p) => !p)}
      >
        <BookOpen className="h-3 w-3" />
        {expanded ? "Hide" : "Preview"} scaffold
        <ChevronRight
          className={`h-3 w-3 transition-transform ${expanded ? "rotate-90" : ""}`}
        />
      </button>

      {expanded && (
        <div className="flex flex-col gap-2 mt-1">
          {frame.hints.map((hint, i) => {
            const k = tierKey(hint.tier);
            const style = TIER_COLORS[k];
            return (
              <div
                key={i}
                className={`rounded-xl border ${style.border} ${style.bg} px-3 py-2`}
              >
                <p className={`text-xs font-medium ${style.text} mb-0.5`}>
                  {style.label}
                </p>
                <p className="text-xs text-white/60">{hint.text}</p>
              </div>
            );
          })}
          <div className="rounded-xl border border-white/8 bg-white/3 px-3 py-2">
            <p className="text-xs font-medium text-white/50 mb-0.5">
              Worked Example
            </p>
            <p className="text-xs text-white/60">{frame.workedExample}</p>
          </div>
          <div className="rounded-xl border border-white/8 bg-white/3 px-3 py-2">
            <p className="text-xs font-medium text-white/50 mb-0.5">
              Visual Cues
            </p>
            <p className="text-xs text-white/60">{frame.visualCue}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function ActiveSession({
  session,
  frames,
  onRequestHint,
  onClose,
}: {
  session: ScaffoldSession;
  frames: ScaffoldFrame[];
  onRequestHint: (id: string) => void;
  onClose: (id: string, masteryAfter: number) => void;
}) {
  const [masteryAfter, setMasteryAfter] = useState(50);
  const consumed = Number(session.hintsConsumed);
  const frame = frames.find((f) => f.topicId === session.topicId);
  const totalHints = frame?.hints.length ?? 3;

  return (
    <div className="rounded-2xl border border-[oklch(0.72_0.17_155)]/30 bg-[oklch(0.72_0.17_155)]/5 backdrop-blur-md p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 font-semibold capitalize">
            {session.topicId}
          </p>
          <p className="text-white/40 text-xs">
            Active scaffold session · {consumed}/{totalHints} hints consumed
          </p>
        </div>
        <span className="flex items-center gap-1 text-xs text-[oklch(0.72_0.17_155)]">
          <Unlock className="h-3 w-3" />
          Open
        </span>
      </div>

      {/* Hint progress dots */}
      <div className="flex gap-2">
        {Array.from({ length: totalHints }).map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${
              i < consumed
                ? "bg-[oklch(0.72_0.17_155)]"
                : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          className="flex-1 bg-[oklch(0.72_0.17_155)]/20 border border-[oklch(0.72_0.17_155)]/40 text-[oklch(0.72_0.17_155)] hover:bg-[oklch(0.72_0.17_155)]/30"
          disabled={consumed >= totalHints}
          onClick={() => onRequestHint(session.id)}
        >
          <Lightbulb className="h-3 w-3 mr-1" />
          Next Hint
        </Button>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3">
          <span className="text-xs text-white/40">Mastery after:</span>
          <input
            type="number"
            min={0}
            max={100}
            value={masteryAfter}
            onChange={(e) => setMasteryAfter(Number(e.target.value))}
            className="w-12 bg-transparent text-sm text-white/80 outline-none text-center"
          />
          <span className="text-xs text-white/40">%</span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="text-white/50 border border-white/10 hover:text-white/70"
          onClick={() => onClose(session.id, masteryAfter)}
        >
          <Lock className="h-3 w-3 mr-1" />
          Close
        </Button>
      </div>
    </div>
  );
}

export default function ScaffoldSession() {
  const { data: frames = [], isLoading: loadingFrames } = useScaffoldFrames();
  const { data: sessions = [], isLoading: loadingSessions } =
    useMyScaffoldSessions();
  const start = useStartScaffoldSession();
  const hint = useRequestScaffoldHint();
  const close = useCloseScaffoldSession();

  const [lastHint, setLastHint] = useState<{
    tier: string;
    text: string;
  } | null>(null);

  const openSessions = sessions.filter((s) => !s.resolved);
  const closedSessions = sessions.filter((s) => s.resolved);

  function handleStart(topicId: string) {
    start.mutate({ topicId, masteryBefore: 50 });
  }

  function handleRequestHint(sessionId: string) {
    hint.mutate(
      { sessionId },
      {
        onSuccess: (h) => {
          if (h) {
            const k = "tier1" in h.tier
              ? "tier1"
              : "tier2" in h.tier
              ? "tier2"
              : "tier3";
            setLastHint({ tier: TIER_COLORS[k].label, text: h.text });
          }
        },
      },
    );
  }

  function handleClose(sessionId: string, masteryAfter: number) {
    close.mutate({ sessionId, masteryAfter });
    setLastHint(null);
  }

  return (
    <div className="min-h-screen bg-[oklch(0.07_0.01_260)] px-4 py-8 pb-24">
      <div className="max-w-lg mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button
              variant="ghost"
              size="sm"
              className="text-white/50 hover:text-white/80 border border-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-white/90 font-semibold text-xl">
              Scaffold Support
            </h1>
            <p className="text-white/40 text-sm">
              Graduated hints — Tier 1 to Tier 3
            </p>
          </div>
        </div>

        {/* Last hint received */}
        {lastHint && (
          <motion.div
            className="rounded-2xl border border-[oklch(0.65_0.22_200)]/30 bg-[oklch(0.65_0.22_200)]/10 p-4 flex flex-col gap-2"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs font-medium text-[oklch(0.65_0.22_200)]">
              {lastHint.tier}
            </p>
            <p className="text-sm text-white/80">{lastHint.text}</p>
          </motion.div>
        )}

        {/* Active sessions */}
        {!loadingSessions && openSessions.length > 0 && (
          <section className="flex flex-col gap-3">
            <p className="text-white/50 text-sm font-medium flex items-center gap-2">
              <Unlock className="h-4 w-4 text-[oklch(0.72_0.17_155)]" />
              Active Sessions
            </p>
            {openSessions.map((s) => (
              <ActiveSession
                key={s.id}
                session={s}
                frames={frames}
                onRequestHint={handleRequestHint}
                onClose={handleClose}
              />
            ))}
          </section>
        )}

        {/* Scaffold library */}
        <section className="flex flex-col gap-3">
          <p className="text-white/50 text-sm font-medium flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-[oklch(0.76_0.18_84)]" />
            Scaffold Library
          </p>
          {loadingFrames ? (
            <div className="text-white/30 text-sm text-center py-8">
              Loading…
            </div>
          ) : frames.length === 0 ? (
            <div className="text-white/30 text-sm text-center py-8">
              No scaffold frames available.
            </div>
          ) : (
            frames.map((f) => (
              <FrameCard
                key={f.topicId}
                frame={f}
                onStart={handleStart}
              />
            ))
          )}
        </section>

        {/* Closed sessions */}
        {closedSessions.length > 0 && (
          <section className="flex flex-col gap-3">
            <p className="text-white/50 text-sm font-medium flex items-center gap-2">
              <Lock className="h-4 w-4 text-white/30" />
              Completed Sessions
            </p>
            <div className="flex flex-col gap-2">
              {closedSessions.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-xl border border-white/8 bg-white/3 px-4 py-3"
                >
                  <div>
                    <p className="text-sm text-white/70 capitalize">
                      {s.topicId}
                    </p>
                    <p className="text-xs text-white/40">
                      {Number(s.hintsConsumed)} hints · Mastery{" "}
                      {Number(s.masteryBefore)}% → {Number(s.masteryAfter)}%
                    </p>
                  </div>
                  <span className="text-xs text-[oklch(0.76_0.18_84)]">
                    +{Number(s.masteryAfter) - Number(s.masteryBefore)}%
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
