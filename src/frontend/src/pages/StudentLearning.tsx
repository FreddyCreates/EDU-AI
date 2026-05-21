import { Skeleton } from "@/components/ui/skeleton";
import { useAllSubjects } from "@/hooks/use-curriculum";
import { useSession } from "@/hooks/use-session";
import { useStudent } from "@/hooks/use-student";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Flame,
  GraduationCap,
  Play,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const CYAN = "oklch(0.78 0.22 200)";

const WORKFLOW_STEPS = [
  {
    id: 1,
    label: "Lesson",
    icon: BookOpen,
    desc: "Guided concept introduction",
  },
  {
    id: 2,
    label: "Practice",
    icon: Play,
    desc: "Worked examples with feedback",
  },
  {
    id: 3,
    label: "Quiz",
    icon: CheckCircle2,
    desc: "Mastery check — Fibonacci scored",
  },
  {
    id: 4,
    label: "Review",
    icon: TrendingUp,
    desc: "COH analysis and gap fill",
  },
  {
    id: 5,
    label: "Stamp",
    icon: Award,
    desc: "Passport stamp sealed to VAULT",
  },
];

// Fallback rich content when hooks return nothing yet
const STATIC_RECENT = [
  {
    subjectId: "mathematics",
    subject: "Mathematics",
    topic: "Fibonacci Sequences & Golden Ratio",
    progress: 72,
    lastActive: "Today",
    streak: 8,
  },
  {
    subjectId: "science",
    subject: "Science",
    topic: "Cell Structure & Division",
    progress: 55,
    lastActive: "Yesterday",
    streak: 5,
  },
  {
    subjectId: "english",
    subject: "English",
    topic: "Narrative Techniques & Voice",
    progress: 88,
    lastActive: "Today",
    streak: 13,
  },
];

const STATIC_UPCOMING = [
  {
    subjectId: "mathematics",
    subject: "Mathematics",
    topic: "The Golden Ratio in Geometry",
    eta: "Next",
    seeds: 5,
  },
  {
    subjectId: "science",
    subject: "Science",
    topic: "Photosynthesis & Energy Transfer",
    eta: "Soon",
    seeds: 3,
  },
  {
    subjectId: "history",
    subject: "History",
    topic: "Ancient Civilizations & Mathematics",
    eta: "Queued",
    seeds: 8,
  },
];
const HEATMAP_CELLS = Array.from({ length: 64 }, (_, i) => i);

export default function StudentLearning() {
  const { profile } = useStudent();
  const {
    sessionCount,
    averageScore,
    isLoading: sessionLoading,
  } = useSession();
  const { data: subjects, isLoading: subjectsLoading } = useAllSubjects();

  const gradeDisplay = profile?.gradeLevel ?? "";
  const sessionCountNum = Number(sessionCount);

  // Enrich static recent with real subject IDs when available
  const recentItems = STATIC_RECENT.map((item) => {
    const match = (subjects ?? []).find((s) =>
      s.name.toLowerCase().includes(item.subject.toLowerCase()),
    );
    return { ...item, subjectId: match?.id ?? item.subjectId };
  });

  const upcomingItems = STATIC_UPCOMING.map((item) => {
    const match = (subjects ?? []).find((s) =>
      s.name.toLowerCase().includes(item.subject.toLowerCase()),
    );
    return { ...item, subjectId: match?.id ?? item.subjectId };
  });

  return (
    <div
      data-ocid="learning.page"
      className="portal-enter p-[21px] space-y-[21px]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-portal-student rounded-2xl p-6 relative overflow-hidden"
      >
        <div className="pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-[rgba(0,210,255,0.07)] blur-3xl" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.22_200)] animate-pulse" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]">
                STUDENT OS · LEARNING
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display text-2xl font-black text-white/95">
                My Learning
              </h1>
              <span
                data-ocid="learning.visual_learner_badge"
                className="glass-subject-pill inline-flex items-center text-xs px-[8px] py-[3px] rounded-full text-teal-400 border border-teal-400/40 bg-teal-400/10 font-mono font-bold"
              >
                Visual Learner
              </span>
            </div>
            <p className="text-sm text-white/50 mt-1">
              Active sessions, progress, and upcoming lessons
            </p>
          </div>
          <div className="flex items-center gap-3">
            {sessionLoading ? (
              <Skeleton className="h-10 w-24 rounded-xl" />
            ) : (
              <div className="glass-max-student rounded-xl px-4 py-2.5 text-center">
                <p className="font-display text-xl font-black text-white/90">
                  {sessionCountNum}
                </p>
                <p className="font-mono text-[9px] text-[oklch(0.78_0.22_200)] uppercase tracking-widest">
                  Sessions
                </p>
              </div>
            )}
            <div className="glass rounded-xl px-4 py-2.5 text-center">
              <p className="font-display text-xl font-black text-amber-300">
                {averageScore}%
              </p>
              <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                Avg Score
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Workflow Breadcrumb */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-1.5 mb-4">
          <GraduationCap className="h-3.5 w-3.5" style={{ color: CYAN }} />
          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-white/40">
            Learning Workflow
          </span>
        </div>
        <div className="flex items-stretch gap-0 overflow-x-auto pb-1">
          {WORKFLOW_STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === 0;
            const isDone = false;
            return (
              <div
                key={step.id}
                data-ocid={`learning.workflow_step.${step.id}`}
                className="flex items-center"
              >
                <div
                  className={[
                    "flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-smooth min-w-[72px]",
                    isActive
                      ? "bg-[rgba(0,210,255,0.1)] border border-[rgba(0,210,255,0.3)]"
                      : "border border-transparent opacity-50",
                  ].join(" ")}
                >
                  <div
                    className="h-8 w-8 rounded-lg flex items-center justify-center"
                    style={{
                      background: isActive
                        ? "rgba(0,210,255,0.15)"
                        : isDone
                          ? "rgba(0,210,255,0.08)"
                          : "rgba(255,255,255,0.04)",
                      border: `1px solid ${
                        isActive
                          ? "rgba(0,210,255,0.4)"
                          : isDone
                            ? "rgba(0,210,255,0.15)"
                            : "rgba(255,255,255,0.06)"
                      }`,
                    }}
                  >
                    <Icon
                      className="h-3.5 w-3.5"
                      style={{
                        color: isActive
                          ? CYAN
                          : isDone
                            ? CYAN
                            : "oklch(0.5 0 0)",
                      }}
                    />
                  </div>
                  <span
                    className="font-mono text-[8px] font-bold uppercase tracking-widest leading-none text-center"
                    style={{ color: isActive ? CYAN : "oklch(0.45 0 0)" }}
                  >
                    {step.label}
                  </span>
                </div>
                {i < WORKFLOW_STEPS.length - 1 && (
                  <div
                    className="h-px flex-1 min-w-[12px] mx-0.5"
                    style={{
                      background:
                        "linear-gradient(90deg,rgba(0,210,255,0.2),rgba(0,210,255,0.05))",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active subject summary chips */}
      {!subjectsLoading && (subjects ?? []).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {(subjects ?? []).slice(0, 6).map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to="/study/$subjectId"
                params={{ subjectId: s.id }}
                data-ocid={`learning.subject_chip.${i + 1}`}
                className="inline-flex items-center gap-1.5 glass-sm rounded-full px-3 py-1.5 text-xs font-medium text-white/60 hover:text-[oklch(0.78_0.22_200)] hover:border-[rgba(0,210,255,0.25)] transition-smooth"
              >
                <BookOpen className="h-2.5 w-2.5" />
                {s.name}
              </Link>
            </motion.div>
          ))}
          {gradeDisplay && (
            <span className="inline-flex items-center gap-1 glass-sm rounded-full px-3 py-1.5 text-xs font-mono text-[oklch(0.78_0.22_200)]">
              {gradeDisplay}
            </span>
          )}
        </div>
      )}

      {/* Continue Learning */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-[oklch(0.78_0.22_200)]" />
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Continue Learning
          </p>
        </div>
        {sessionLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 rounded-2xl" />
            ))}
          </div>
        ) : (
          recentItems.map((item, i) => (
            <motion.div
              key={`${item.subjectId}-${i}`}
              data-ocid={`learning.active_card.${i + 1}`}
              initial={{ opacity: 0, x: -13 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-max-student rounded-2xl p-5 flex items-center gap-4 animate-card-slide-in"
              style={{ "--stagger": i } as React.CSSProperties}
            >
              <div
                className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(0,210,255,0.12)",
                  border: "1px solid rgba(0,210,255,0.25)",
                }}
              >
                <BookOpen className="h-5 w-5" style={{ color: CYAN }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-white/90">
                  {item.topic}
                </p>
                <p className="text-xs text-white/40">{item.subject}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 h-1.5 rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${item.progress}%`, background: CYAN }}
                    />
                  </div>
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: CYAN }}
                  >
                    {item.progress}%
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <div
                  className="flex items-center gap-1 text-xs"
                  style={{ color: CYAN }}
                >
                  <Flame className="h-3 w-3" />
                  <span>{item.streak}d</span>
                </div>
                <span className="text-[10px] text-white/30 flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5" />
                  {item.lastActive}
                </span>
              </div>
              <Link
                to="/study/$subjectId"
                params={{ subjectId: item.subjectId }}
                data-ocid={`learning.resume_button.${i + 1}`}
                className="flex items-center gap-1.5 glass-sm rounded-xl px-3 py-2 text-xs font-medium shrink-0 hover:scale-[1.02] transition-smooth"
                style={{ color: CYAN, borderColor: "rgba(0,210,255,0.25)" }}
              >
                <Play className="h-3 w-3" /> Resume
              </Link>
            </motion.div>
          ))
        )}
      </div>

      {/* Session History Heatmap */}
      <div
        data-ocid="learning.session_heatmap"
        className="glass rounded-2xl p-5 space-y-3"
      >
        <div className="flex items-center gap-2">
          <Star className="h-3.5 w-3.5 text-amber-300" />
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Session History
          </p>
        </div>
        <div className="grid grid-cols-8 gap-[3px]">
          {HEATMAP_CELLS.map((cellIndex) => {
            const completed = Math.min(sessionCountNum, 64);
            let cellClass = "w-[13px] h-[13px] rounded-[2px] ";
            if (cellIndex < completed * 0.2) cellClass += "bg-teal-400/80";
            else if (cellIndex < completed * 0.5) cellClass += "bg-teal-400/50";
            else if (cellIndex < completed * 0.8) cellClass += "bg-teal-400/30";
            else if (cellIndex < completed) cellClass += "bg-teal-400/15";
            else cellClass += "bg-white/5";
            return (
              <div key={`heatmap-cell-${cellIndex}`} className={cellClass} />
            );
          })}
        </div>
        <p className="text-[10px] font-mono text-white/30">
          {sessionCountNum} sessions completed
        </p>
      </div>

      {/* Up Next */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-300" />
          <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Up Next
          </p>
        </div>
        {upcomingItems.map((item, i) => (
          <motion.div
            key={`upcoming-${item.subjectId}-${i}`}
            data-ocid={`learning.upcoming_card.${i + 1}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.07 }}
            className="glass-queued-card rounded-2xl p-4 flex items-center gap-4 hover:border-[rgba(0,210,255,0.2)] transition-glass animate-card-slide-in"
            style={{ "--stagger": 3 + i } as React.CSSProperties}
          >
            <div className="h-9 w-9 rounded-xl flex items-center justify-center shrink-0 bg-white/5 border border-white/8">
              <Star className="h-3.5 w-3.5 text-white/30" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/80 font-medium">{item.topic}</p>
              <p className="text-xs text-white/40">
                {item.subject} · {item.seeds} seeds queued
              </p>
            </div>
            <span
              className="text-[9px] font-mono font-bold shrink-0 rounded-full px-2.5 py-1"
              style={{
                background: "rgba(0,210,255,0.08)",
                color: CYAN,
                border: "1px solid rgba(0,210,255,0.2)",
              }}
            >
              {item.eta}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
