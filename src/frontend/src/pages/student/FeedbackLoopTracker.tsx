import { Button } from "@/components/ui/button";
import {
  loopStatusLabel,
  useMyFeedbackLoops,
  useOpenFeedbackLoop,
  useRecordAttempt,
  type AttemptRecord,
  type FeedbackLoop,
} from "@/hooks/use-feedbackloop";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Circle,
  RefreshCw,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const STATUS_CONFIG = {
  "In Progress": {
    icon: Circle,
    color: "text-[oklch(0.65_0.22_200)]",
    border: "border-[oklch(0.65_0.22_200)]/30",
    bg: "bg-[oklch(0.65_0.22_200)]/10",
  },
  Mastered: {
    icon: CheckCircle,
    color: "text-[oklch(0.76_0.18_84)]",
    border: "border-[oklch(0.76_0.18_84)]/30",
    bg: "bg-[oklch(0.76_0.18_84)]/10",
  },
  Escalated: {
    icon: AlertTriangle,
    color: "text-[oklch(0.68_0.20_40)]",
    border: "border-[oklch(0.68_0.20_40)]/30",
    bg: "bg-[oklch(0.68_0.20_40)]/10",
  },
};

function MasteryRing({ pct }: { pct: number }) {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const color =
    pct >= 80
      ? "oklch(0.76 0.18 84)"
      : pct >= 50
      ? "oklch(0.65 0.22 200)"
      : "oklch(0.68 0.20 40)";

  return (
    <svg width="56" height="56" className="shrink-0">
      <circle cx="28" cy="28" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
      <circle
        cx="28"
        cy="28"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 28 28)"
        style={{ transition: "stroke-dashoffset 0.4s ease" }}
      />
      <text
        x="28"
        y="32"
        textAnchor="middle"
        fontSize="11"
        fill="rgba(255,255,255,0.80)"
        fontWeight="600"
      >
        {pct}%
      </text>
    </svg>
  );
}

function AttemptFeed({ attempts }: { attempts: AttemptRecord[] }) {
  const [expanded, setExpanded] = useState(false);
  if (attempts.length === 0) return null;
  const last = attempts[attempts.length - 1];
  const shown = expanded ? attempts : [last];

  return (
    <div className="flex flex-col gap-2">
      {shown.map((a) => {
        const pct = Number(a.pctCorrect);
        return (
          <div
            key={Number(a.attemptNum)}
            className="rounded-xl border border-white/8 bg-white/3 p-3 flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50 font-medium">
                Attempt {Number(a.attemptNum)}
              </span>
              <span
                className={`text-xs font-semibold ${
                  pct >= 80
                    ? "text-[oklch(0.76_0.18_84)]"
                    : pct >= 50
                    ? "text-[oklch(0.65_0.22_200)]"
                    : "text-[oklch(0.68_0.20_40)]"
                }`}
              >
                {pct}% ({Number(a.score)}/{Number(a.totalQuestions)})
              </span>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              {a.eddiCoachNote}
            </p>
            <details className="text-xs text-white/30">
              <summary className="cursor-pointer hover:text-white/50">
                EDDI gap analysis
              </summary>
              <p className="mt-1 leading-relaxed text-white/40">
                {a.eddiGapAnalysis}
              </p>
            </details>
          </div>
        );
      })}
      {attempts.length > 1 && (
        <button
          className="text-xs text-white/30 hover:text-white/50 text-center"
          onClick={() => setExpanded((p) => !p)}
        >
          {expanded
            ? "Show latest only"
            : `View all ${attempts.length} attempts`}
        </button>
      )}
    </div>
  );
}

function LoopCard({
  loop,
  onAttempt,
}: {
  loop: FeedbackLoop;
  onAttempt: (loopId: string, score: number, total: number) => void;
}) {
  const label = loopStatusLabel(loop.status);
  const cfg = STATUS_CONFIG[label as keyof typeof STATUS_CONFIG];
  const StatusIcon = cfg.icon;
  const pct = Number(loop.currentMastery);
  const [score, setScore] = useState("");
  const [total, setTotal] = useState("10");

  return (
    <motion.div
      className={`rounded-2xl border ${cfg.border} ${cfg.bg} backdrop-blur-md p-5 flex flex-col gap-4`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <MasteryRing pct={pct} />
          <div>
            <p className="text-white/80 font-semibold capitalize">
              {loop.topicId}
            </p>
            <p className="text-white/40 text-xs">
              Target {Number(loop.masteryTarget)}% · {loop.attempts.length}/
              {Number(loop.maxAttempts)} attempts
            </p>
          </div>
        </div>
        <span className={`flex items-center gap-1 text-xs ${cfg.color}`}>
          <StatusIcon className="h-3 w-3" />
          {label}
        </span>
      </div>

      <AttemptFeed attempts={loop.attempts} />

      {"open" in loop.status && (
        <div className="flex gap-2 items-end">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-white/40">Score</label>
            <input
              type="number"
              min={0}
              max={100}
              value={score}
              placeholder="e.g. 7"
              onChange={(e) => setScore(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 outline-none focus:border-[oklch(0.65_0.22_200)]/60"
            />
          </div>
          <div className="flex flex-col gap-1 w-20">
            <label className="text-xs text-white/40">Out of</label>
            <input
              type="number"
              min={1}
              max={100}
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 outline-none focus:border-[oklch(0.65_0.22_200)]/60"
            />
          </div>
          <Button
            size="sm"
            className="bg-[oklch(0.65_0.22_200)]/20 border border-[oklch(0.65_0.22_200)]/40 text-[oklch(0.65_0.22_200)] hover:bg-[oklch(0.65_0.22_200)]/30 h-10"
            disabled={!score || !total || Number(total) === 0}
            onClick={() =>
              onAttempt(loop.id, Number(score), Number(total))
            }
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Submit
          </Button>
        </div>
      )}
    </motion.div>
  );
}

function NewLoopForm({
  onOpen,
  loading,
}: {
  onOpen: (topicId: string) => void;
  loading: boolean;
}) {
  const [topicId, setTopicId] = useState("");
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 flex flex-col gap-3">
      <p className="text-white/70 font-medium text-sm">Open a Feedback Loop</p>
      <div className="flex gap-2">
        <input
          className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 placeholder-white/30 outline-none focus:border-[oklch(0.65_0.22_200)]/60"
          placeholder="Topic ID — e.g. algebra, reading, science"
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && topicId) onOpen(topicId);
          }}
        />
        <Button
          size="sm"
          className="bg-[oklch(0.65_0.22_200)]/20 border border-[oklch(0.65_0.22_200)]/40 text-[oklch(0.65_0.22_200)] hover:bg-[oklch(0.65_0.22_200)]/30"
          disabled={!topicId || loading}
          onClick={() => { onOpen(topicId); setTopicId(""); }}
        >
          <Zap className="h-3 w-3 mr-1" />
          Open
        </Button>
      </div>
      <p className="text-xs text-white/30">
        Mastery target: 80% · Max attempts: 5 · EDDI closes the loop when you
        reach mastery.
      </p>
    </div>
  );
}

export default function FeedbackLoopTracker() {
  const { data: loops = [], isLoading } = useMyFeedbackLoops();
  const openLoop = useOpenFeedbackLoop();
  const recordAttempt = useRecordAttempt();

  const openLoops = loops.filter((l) => "open" in l.status);
  const closedLoops = loops.filter((l) => !("open" in l.status));

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
              Feedback Loops
            </h1>
            <p className="text-white/40 text-sm">
              EDDI gap analysis · attempt → master
            </p>
          </div>
        </div>

        {/* Open a new loop */}
        <NewLoopForm
          onOpen={(topicId) => openLoop.mutate({ topicId })}
          loading={openLoop.isPending}
        />

        {/* Active loops */}
        {isLoading ? (
          <div className="text-white/30 text-sm text-center py-8">
            Loading loops…
          </div>
        ) : (
          <>
            {openLoops.length > 0 && (
              <section className="flex flex-col gap-3">
                <p className="text-white/50 text-sm font-medium flex items-center gap-2">
                  <Circle className="h-4 w-4 text-[oklch(0.65_0.22_200)]" />
                  Active Loops
                </p>
                {openLoops.map((l) => (
                  <LoopCard
                    key={l.id}
                    loop={l}
                    onAttempt={(id, score, total) =>
                      recordAttempt.mutate({ loopId: id, score, totalQuestions: total })
                    }
                  />
                ))}
              </section>
            )}

            {openLoops.length === 0 && closedLoops.length === 0 && (
              <div className="rounded-xl border border-white/8 bg-white/3 px-4 py-10 text-center text-sm text-white/30">
                No feedback loops yet. Open one above to start a formative
                assessment cycle.
              </div>
            )}

            {closedLoops.length > 0 && (
              <section className="flex flex-col gap-3">
                <p className="text-white/50 text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-white/30" />
                  Closed Loops
                </p>
                {closedLoops.map((l) => (
                  <LoopCard
                    key={l.id}
                    loop={l}
                    onAttempt={() => {}}
                  />
                ))}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
