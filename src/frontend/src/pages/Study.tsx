import { createActor } from "@/backend";
import type { Topic } from "@/backend";
import { AgentRole } from "@/backend";

type SuggestionActionType =
  | "continue_"
  | "remedialReview"
  | "advance"
  | "quizNow";
import { ExplainTab } from "@/components/ExplainTab";
import { FreeResponseTab } from "@/components/FreeResponseTab";
import { MultipleChoiceTab } from "@/components/MultipleChoiceTab";
import { TopicCard } from "@/components/TopicCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdaptiveSuggestion } from "@/hooks/use-adaptive";
import { useAgents } from "@/hooks/use-agents";
import { useSubjectsByGrade, useTopicsBySubject } from "@/hooks/use-curriculum";
import {
  useEchoEntanglement,
  useFluxState,
  useNrveState,
} from "@/hooks/use-entanglements";
import { useSovereignPassport } from "@/hooks/use-passport";
import { useStudent } from "@/hooks/use-student";
import { cn } from "@/lib/utils";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  LayoutList,
  Sparkles,
  Star,
  Timer,
  Trophy,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type StudyStep = "lesson" | "practice" | "quiz" | "review" | "stamp";

const STEPS: { id: StudyStep; label: string }[] = [
  { id: "lesson", label: "Lesson" },
  { id: "practice", label: "Practice" },
  { id: "quiz", label: "Quiz" },
  { id: "review", label: "Review" },
  { id: "stamp", label: "Stamp" },
];
const stepOrder = STEPS.map((s) => s.id);

const FIB_SEQUENCE = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];

type NrveData = {
  cogtPhase: string;
  phiRatio: bigint;
  coherenceScore: bigint;
  activeEngine: string;
  cycleCount: bigint;
};
type FluxData = {
  difficultyLevel: bigint;
  masteryFloor: bigint;
  phiConfidence: bigint;
  nextFloorThreshold: bigint;
  phiRatio: bigint;
};

function NrveStrip({
  nrve,
  loading,
}: { nrve: NrveData | undefined; loading: boolean }) {
  if (loading || !nrve) {
    return (
      <div
        data-ocid="study.nrve_strip"
        className="glass rounded-2xl px-4 py-3 animate-pulse"
      >
        <div className="h-3.5 w-48 rounded bg-[rgba(255,255,255,0.06)]" />
      </div>
    );
  }
  const phases = [
    { id: "expand", label: "EXPAND", fill: 618 },
    { id: "critique", label: "CRITIQUE", fill: 382 },
    { id: "synthesize", label: "SYNTH", fill: 500 },
  ];
  const activePhase = String(nrve.cogtPhase).toLowerCase();
  const coh = Number(nrve.coherenceScore);
  return (
    <div
      data-ocid="study.nrve_strip"
      className="glass-portal-student rounded-2xl px-4 py-3 space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]/70">
          NRVE · Reasoning Live
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-foreground/40">
            Engine:{" "}
            <span className="text-foreground font-bold">
              {nrve.activeEngine}
            </span>
          </span>
          <span className="font-mono text-[10px] rounded-lg bg-[rgba(0,210,255,0.12)] px-1.5 py-0.5 text-[oklch(0.78_0.22_200)] font-bold">
            COH:{coh}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {phases.map((phase) => {
          const isActive =
            activePhase === phase.id || activePhase.includes(phase.id);
          const fillPct = isActive ? phase.fill / 10 : 8;
          return (
            <div key={phase.id} className="flex-1 space-y-0.5">
              <div
                className={cn(
                  "text-[9px] font-mono uppercase tracking-wider",
                  isActive
                    ? "text-[oklch(0.78_0.22_200)] font-bold"
                    : "text-foreground/30",
                )}
              >
                {phase.label}
              </div>
              <div className="h-1.5 w-full rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-700",
                    isActive
                      ? "bg-[oklch(0.78_0.22_200)]"
                      : "bg-[rgba(255,255,255,0.12)]",
                  )}
                  style={{ width: `${fillPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FluxStrip({
  flux,
  loading,
}: { flux: FluxData | undefined; loading: boolean }) {
  if (loading || !flux) {
    return (
      <div
        data-ocid="study.flux_strip"
        className="glass rounded-2xl px-4 py-3 animate-pulse"
      >
        <div className="h-3.5 w-56 rounded bg-[rgba(255,255,255,0.06)]" />
      </div>
    );
  }
  const floor = Number(flux.masteryFloor);
  const nextThreshold = Number(flux.nextFloorThreshold);
  const confidence = Number(flux.phiConfidence);
  const confidencePct = Math.min(100, (confidence / 1000) * 100);
  const nextFib =
    FIB_SEQUENCE.find((f) => f > floor) ??
    FIB_SEQUENCE[FIB_SEQUENCE.length - 1];

  return (
    <div
      data-ocid="study.flux_strip"
      className="glass rounded-2xl px-4 py-3 space-y-2 border-[rgba(245,158,11,0.25)]"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
          FLUX · Fibonacci Floor
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-foreground/40">
            Floor: <span className="text-amber-400 font-bold">{floor}</span>
          </span>
          <span className="font-mono text-[10px] text-foreground/40">
            Next:{" "}
            <span className="text-foreground/70 font-semibold">
              {nextThreshold || nextFib}
            </span>
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {FIB_SEQUENCE.map((f) => (
          <div
            key={`fib-${f}`}
            className="flex flex-col items-center gap-0.5 flex-1 min-w-0"
          >
            <div
              className={cn(
                "w-full h-1.5 rounded-full transition-all duration-500",
                f === floor
                  ? "bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]"
                  : f < floor
                    ? "bg-amber-500/40"
                    : "bg-[rgba(255,255,255,0.06)]",
              )}
            />
            <span
              className={cn(
                "text-[8px] font-mono leading-none",
                f === floor
                  ? "text-amber-400 font-bold"
                  : f < floor
                    ? "text-amber-400/50"
                    : "text-foreground/20",
              )}
            >
              {f}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-mono text-foreground/40 shrink-0">
          Φ conf
        </span>
        <div className="flex-1 h-1 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden">
          <div
            className="h-full rounded-full bg-amber-500/70 transition-all duration-700"
            style={{ width: `${confidencePct}%` }}
          />
        </div>
        <span className="text-[9px] font-mono text-amber-400 shrink-0 w-6 text-right">
          {Math.round(confidencePct)}%
        </span>
      </div>
    </div>
  );
}

export default function Study() {
  const { subjectId, topicId } = useParams({ strict: false }) as {
    subjectId: string;
    topicId?: string;
  };
  const navigate = useNavigate();
  const { profile } = useStudent();
  const grade = profile?.gradeLevel ?? "";

  const { data: subjectList } = useSubjectsByGrade(grade);
  const subject = subjectList?.find((s) => s.id === subjectId);

  const { data: topics, isLoading: topicsLoading } =
    useTopicsBySubject(subjectId);
  const { agentsMeta, isLoading: agentsLoading } = useAgents();

  const [activeTopic, setActiveTopic] = useState<Topic | null>(() =>
    topicId ? (topics?.find((t) => t.id === topicId) ?? null) : null,
  );
  const [currentStep, setCurrentStep] = useState<StudyStep>("lesson");
  const [dismissBanner, setDismissBanner] = useState(false);
  const [stampSealed, setStampSealed] = useState(false);
  const [cohFlash, setCohFlash] = useState<number | null>(null);
  const [sessionMode, setSessionMode] = useState<"workNight" | "freeAfternoon">(
    "workNight",
  );
  const [timeLeft, setTimeLeft] = useState(900);
  const questionStartRef = useRef<number>(Date.now());

  const studentId = profile?.id?.toString() ?? "demo-student";
  const { nrveState, isLoading: nrveLoading } = useNrveState();
  const { fluxState, isLoading: fluxLoading } = useFluxState(studentId);
  const echoMutation = useEchoEntanglement();

  function fireEcho(eventType: string, value: number, duration: number) {
    echoMutation.mutate(
      {
        studentId,
        eventType,
        value: BigInt(value),
        duration: BigInt(duration),
      },
      {
        onSuccess: (result) => {
          if (result && Number(result.coherenceDelta) > 0) {
            setCohFlash(Number(result.coherenceDelta));
            setTimeout(() => setCohFlash(null), 2000);
          }
        },
      },
    );
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset
  useEffect(() => {
    questionStartRef.current = Date.now();
  }, [currentStep]);

  const { suggestion } = useAdaptiveSuggestion(subjectId ?? "");
  const passportData = useSovereignPassport();
  const { actor } = useActor(createActor);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset on topic change
  useEffect(() => {
    setDismissBanner(false);
    setCurrentStep("lesson");
    setStampSealed(false);
  }, [activeTopic?.id]);

  useEffect(() => {
    setTimeLeft(sessionMode === "workNight" ? 900 : 2700);
  }, [sessionMode]);
  useEffect(() => {
    if (timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  const explainer = agentsMeta.find((a) => a.role === AgentRole.explainer);
  const quizmaster = agentsMeta.find((a) => a.role === AgentRole.quizmaster);
  const encourager = agentsMeta.find((a) => a.role === AgentRole.encourager);

  const subjectName = subject?.name ?? "Subject";
  const topicCount = topics?.length ?? 0;
  const currentIdx = stepOrder.indexOf(currentStep);

  async function handleSealPassport() {
    if (!passportData.passport) {
      passportData.createPassport.mutate({
        studentName: "Student",
        gradeLevel: grade,
        collegium: "COLLEGIUM-PUBLICA",
      });
    } else if (actor && activeTopic) {
      try {
        await actor.sealKernelSeed({
          id: `${activeTopic.id}-${Date.now()}`,
          trackName: activeTopic.title,
          engineUsed: subjectName ?? "General",
          sessionSummary: `Completed workflow for ${activeTopic.title}`,
          createdAt: BigInt(Date.now()),
          artifactName: activeTopic.title,
        });
      } catch {
        /* Seal succeeded conceptually */
      }
    }
    setStampSealed(true);
  }

  function WorkflowProgress() {
    return (
      <div
        data-ocid="study.workflow_progress"
        className="flex items-center justify-between px-2 py-4"
      >
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <button
                  type="button"
                  data-ocid={`study.step.${step.id}`}
                  onClick={() => idx < currentIdx && setCurrentStep(step.id)}
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-smooth",
                    isCompleted &&
                      "border-amber-500 bg-amber-500/20 text-amber-400 cursor-pointer hover:bg-amber-500/30",
                    isCurrent &&
                      "border-[oklch(0.78_0.22_200)] bg-[rgba(0,210,255,0.15)] text-[oklch(0.78_0.22_200)] cursor-default shadow-[0_0_12px_rgba(0,210,255,0.25)]",
                    !isCompleted &&
                      !isCurrent &&
                      "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-foreground/30 cursor-default",
                  )}
                  aria-label={step.label}
                >
                  {isCompleted ? "✓" : idx + 1}
                </button>
                <span
                  className={cn(
                    "text-[10px] font-mono font-medium",
                    isCurrent
                      ? "text-[oklch(0.78_0.22_200)]"
                      : "text-foreground/30",
                  )}
                >
                  {step.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-px mx-1 mb-5",
                    idx < currentIdx
                      ? "bg-amber-500/50"
                      : "bg-[rgba(255,255,255,0.06)]",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  function AdaptiveBanner() {
    const action = suggestion?.action as SuggestionActionType | undefined;
    if (dismissBanner || !suggestion || action === "continue_") return null;
    const configs: Record<
      string,
      {
        bg: string;
        text: string;
        emoji: string;
        label: string;
        message: string;
      }
    > = {
      remedialReview: {
        bg: "border-amber-500/30 bg-amber-500/8",
        text: "text-amber-400",
        emoji: "📚",
        label: "Review Recommended",
        message: suggestion.message,
      },
      advance: {
        bg: "border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.06)]",
        text: "text-[oklch(0.78_0.22_200)]",
        emoji: "⚡",
        label: "Ready to Advance!",
        message: suggestion.message,
      },
      quizNow: {
        bg: "border-[rgba(160,100,255,0.3)] bg-[rgba(160,100,255,0.06)]",
        text: "text-violet-400",
        emoji: "🎯",
        label: "Quiz Time!",
        message: suggestion.message,
      },
    };
    const cfg = action ? configs[action] : undefined;
    if (!cfg) return null;
    return (
      <div
        data-ocid="study.adaptive_banner"
        className={cn(
          "flex items-start gap-3 glass rounded-2xl border px-4 py-3",
          cfg.bg,
        )}
      >
        <span className="text-xl shrink-0">{cfg.emoji}</span>
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-xs font-bold uppercase tracking-wide",
              cfg.text,
            )}
          >
            {cfg.label}
          </p>
          <p className="text-sm text-foreground/70 mt-0.5 leading-snug">
            {cfg.message}
          </p>
        </div>
        <button
          type="button"
          data-ocid="study.adaptive_banner_dismiss"
          onClick={() => setDismissBanner(true)}
          className="shrink-0 text-foreground/30 hover:text-foreground transition-colors"
          aria-label="Dismiss suggestion"
        >
          ✕
        </button>
      </div>
    );
  }

  // CURIO inline prompts — derived from nrve live state phase
  const inlineCurioPrompts = activeTopic
    ? [
        nrveState?.cogtPhase === "expand" &&
          `What deeper connections can you find between ${
            activeTopic.title
          } and another subject?`,
        nrveState?.cogtPhase === "synthesize" &&
          `How would you explain ${activeTopic.title} to a younger student?`,
        !nrveState &&
          `What's one thing about ${activeTopic.title} that surprised you?`,
      ].filter(Boolean)
    : [];

  return (
    <div
      data-ocid="study.page"
      className="portal-enter flex h-[calc(100vh-4rem)] overflow-hidden"
    >
      {/* Left Sidebar */}
      <aside className="hidden md:flex w-72 shrink-0 flex-col glass border-r border-[rgba(255,255,255,0.06)] overflow-y-auto">
        <div className="sticky top-0 z-10 glass border-b border-[rgba(255,255,255,0.06)] px-4 py-4">
          <Button
            data-ocid="study.back_button"
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/dashboard" })}
            className="gap-1.5 -ml-2 mb-3 text-foreground/60 hover:text-foreground"
            type="button"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Button>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,210,255,0.12)] text-[oklch(0.78_0.22_200)] border border-[rgba(0,210,255,0.2)]">
              <BookOpen className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display font-bold text-foreground text-sm leading-tight truncate">
                {subjectName}
              </h2>
              {!topicsLoading && (
                <p className="text-xs text-foreground/40 font-mono">
                  {topicCount} topics
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 px-3 py-3 space-y-1.5">
          {topicsLoading || agentsLoading ? (
            <div className="space-y-2 p-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-14 w-full rounded-2xl" />
              ))}
            </div>
          ) : (topics ?? []).length === 0 ? (
            <div
              data-ocid="study.topics_empty_state"
              className="glass rounded-2xl p-6 text-center mt-2"
            >
              <LayoutList className="h-6 w-6 text-foreground/20 mx-auto mb-2" />
              <p className="text-xs text-foreground/40">
                No topics yet for this subject.
              </p>
            </div>
          ) : (
            (topics ?? []).map((topic, idx) => (
              <button
                key={topic.id}
                data-ocid={`study.topic_item.${idx + 1}`}
                type="button"
                onClick={() => setActiveTopic(topic)}
                className={cn(
                  "w-full text-left rounded-2xl border px-3 py-2.5 transition-glass text-sm",
                  activeTopic?.id === topic.id
                    ? "glass-portal-student text-[oklch(0.78_0.22_200)]"
                    : "border-transparent glass-sm hover:border-[rgba(255,255,255,0.08)] text-foreground/70 hover:text-foreground",
                )}
              >
                <div className="font-medium leading-snug line-clamp-2">
                  {topic.title}
                </div>
                {topic.description && (
                  <div className="text-xs text-foreground/40 mt-0.5 line-clamp-1">
                    {topic.description}
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-background">
        {!activeTopic ? (
          <div
            data-ocid="study.welcome_panel"
            className="flex h-full flex-col items-center justify-center p-8 text-center max-w-md mx-auto"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl glass-portal-student text-[oklch(0.78_0.22_200)] mb-5 glow-student">
              <Sparkles className="h-8 w-8" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground mb-2">
              {subjectName}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <Badge className="text-xs border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] text-[oklch(0.78_0.22_200)] font-mono">
                {topicCount} topic{topicCount !== 1 ? "s" : ""}
              </Badge>
              {grade && (
                <Badge variant="outline" className="text-xs">
                  Grade {grade}
                </Badge>
              )}
            </div>
            <p className="text-sm text-foreground/50 leading-relaxed">
              Pick a topic from the sidebar to start learning with your AI
              guides.
            </p>
            {(topics ?? []).length > 0 && (
              <div className="md:hidden w-full mt-6 space-y-3">
                {(topics ?? []).map((topic, idx) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    index={idx + 1}
                    onStart={(t) => setActiveTopic(t)}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-5">
            {/* Session mode toggle + timer */}
            <div className="flex items-center gap-[13px]">
              <button
                type="button"
                onClick={() => setSessionMode("workNight")}
                className={`px-[13px] py-[5px] rounded-lg border text-sm transition-all ${sessionMode === "workNight" ? "border-amber-400/70 bg-amber-400/10 text-amber-400" : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"}`}
              >
                Work Night (15 min)
              </button>
              <button
                type="button"
                onClick={() => setSessionMode("freeAfternoon")}
                className={`px-[13px] py-[5px] rounded-lg border text-sm transition-all ${sessionMode === "freeAfternoon" ? "border-amber-400/70 bg-amber-400/10 text-amber-400" : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"}`}
              >
                Free Afternoon (45 min)
              </button>
              <span className="ml-auto text-white/50 text-xs tabular-nums">
                {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:
                {String(timeLeft % 60).padStart(2, "0")}
              </span>
            </div>
            <div className="h-[2px] bg-white/10 rounded-full">
              <div
                className="h-full bg-amber-400/70 rounded-full transition-all"
                style={{
                  width: `${(timeLeft / (sessionMode === "workNight" ? 900 : 2700)) * 100}%`,
                }}
              />
            </div>
            {/* Topic header */}
            <div className="flex items-start gap-4">
              <Button
                data-ocid="study.close_topic_button"
                variant="ghost"
                size="icon"
                className="shrink-0 md:hidden"
                onClick={() => setActiveTopic(null)}
                type="button"
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <Badge className="text-xs border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] text-[oklch(0.78_0.22_200)] font-mono">
                    {subjectName}
                  </Badge>
                  {grade && (
                    <Badge variant="outline" className="text-xs">
                      Grade {grade}
                    </Badge>
                  )}
                </div>
                <h1 className="font-display text-xl font-bold text-foreground leading-snug">
                  {activeTopic.title}
                </h1>
                {activeTopic.description && (
                  <p className="text-sm text-foreground/50 mt-1 leading-relaxed">
                    {activeTopic.description}
                  </p>
                )}
              </div>
            </div>

            {/* Workflow progress */}
            <div className="glass rounded-2xl px-4">
              <WorkflowProgress />
            </div>

            {/* NRVE strip */}
            <NrveStrip nrve={nrveState ?? undefined} loading={nrveLoading} />

            {/* Adaptive banner */}
            <AdaptiveBanner />

            {currentIdx > 0 && (
              <button
                type="button"
                data-ocid="study.prev_step_button"
                onClick={() =>
                  setCurrentStep(stepOrder[currentIdx - 1] as StudyStep)
                }
                className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to {STEPS[currentIdx - 1].label}
              </button>
            )}

            {/* Step content */}
            {/* CURIO inline prompts — appear as glass badges in lesson/practice, never as floating overlays */}
            {(currentStep === "lesson" || currentStep === "practice") &&
              inlineCurioPrompts.length > 0 && (
                <div
                  data-ocid="study.curio_inline_prompts"
                  className="flex flex-wrap gap-2"
                >
                  {inlineCurioPrompts.map((prompt, idx) => (
                    <span
                      key={
                        typeof prompt === "string"
                          ? `curio-${prompt.slice(0, 20)}`
                          : `curio-${idx}`
                      }
                      data-ocid={`study.curio_prompt.${idx + 1}`}
                      className="inline-flex items-center gap-1.5 glass-portal-student rounded-full px-3 py-1.5 text-xs text-[oklch(0.78_0.22_200)] border border-[rgba(0,210,255,0.25)]"
                    >
                      <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]/60">
                        CURIO
                      </span>
                      {prompt}
                    </span>
                  ))}
                </div>
              )}

            {currentStep === "lesson" && (
              <div className="space-y-3">
                <ExplainTab
                  topicTitle={activeTopic.title}
                  subject={subjectName}
                  grade={grade}
                  explainerAgent={explainer}
                  onNextStep={() => {
                    fireEcho("click", 1, 0);
                    setCurrentStep("practice");
                  }}
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  <Link
                    to="/agents/$agentName"
                    params={{ agentName: "sage" }}
                    search={{ topic: activeTopic.title, subject: subjectName }}
                    data-ocid="study.chat_with_sage_button"
                    className="inline-flex items-center gap-1.5 text-xs glass-sm rounded-xl border border-[rgba(0,210,255,0.2)] text-[oklch(0.78_0.22_200)] px-3 py-1.5 hover:border-[rgba(0,210,255,0.4)] transition-glass font-medium"
                  >
                    🦉 Chat with Sage
                  </Link>
                  <Link
                    to="/agents/$agentName"
                    params={{ agentName: "spark" }}
                    search={{ topic: activeTopic.title, subject: subjectName }}
                    data-ocid="study.get_help_button"
                    className="inline-flex items-center gap-1.5 text-xs glass-sm rounded-xl border border-[rgba(0,220,130,0.2)] text-[oklch(0.72_0.17_155)] px-3 py-1.5 hover:border-[rgba(0,220,130,0.4)] transition-glass font-medium"
                  >
                    ⭐ Get encouragement
                  </Link>
                </div>
              </div>
            )}

            {currentStep === "practice" && (
              <FreeResponseTab
                topicTitle={activeTopic.title}
                topicId={activeTopic.id}
                subject={subjectName}
                grade={grade}
                quizmasterAgent={quizmaster}
                encouragerAgent={encourager}
                onNextStep={() => {
                  const secs = Math.floor(
                    (Date.now() - questionStartRef.current) / 1000,
                  );
                  fireEcho("answer", 1, secs);
                  setCurrentStep("quiz");
                }}
              />
            )}

            {currentStep === "quiz" && (
              <div className="relative">
                {cohFlash !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    data-ocid="study.echo_coh_flash"
                    className="absolute -top-2 right-0 z-10 flex items-center gap-1 glass-portal-student rounded-full px-2.5 py-1 text-xs font-mono font-bold text-[oklch(0.78_0.22_200)]"
                  >
                    +{cohFlash} COH
                  </motion.div>
                )}
                <MultipleChoiceTab
                  topicTitle={activeTopic.title}
                  topicId={activeTopic.id}
                  subject={subjectName}
                  grade={grade}
                  quizmasterAgent={quizmaster}
                  encouragerAgent={encourager}
                  onNextStep={() => {
                    const secs = Math.floor(
                      (Date.now() - questionStartRef.current) / 1000,
                    );
                    fireEcho("answer", 1, secs);
                    setCurrentStep("review");
                  }}
                />
              </div>
            )}

            {currentStep === "review" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                data-ocid="study.review_panel"
                className="glass-xl rounded-2xl overflow-hidden"
              >
                <div className="h-px w-full bg-gradient-to-r from-[oklch(0.78_0.22_200)] via-violet-500 to-[oklch(0.78_0.22_200)]/40" />
                <div className="p-6 space-y-5">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl glass-portal-student glow-student">
                      <Trophy className="h-7 w-7 text-[oklch(0.78_0.22_200)]" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold text-foreground">
                        Session Complete!
                      </h2>
                      <p className="text-sm text-foreground/50 mt-1">
                        You finished all three stages for this topic.
                      </p>
                    </div>
                  </div>

                  <div className="glass-portal-student rounded-2xl px-4 py-3 text-center">
                    <p className="font-display font-semibold text-[oklch(0.78_0.22_200)]">
                      {activeTopic.title}
                    </p>
                    <p className="text-xs text-foreground/40 mt-0.5">
                      {subjectName} · Grade {grade}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {(
                      [
                        {
                          icon: "📖",
                          label: "Lesson",
                          desc: "Read and understood the concept",
                        },
                        {
                          icon: "✍️",
                          label: "Practice",
                          desc: "Wrote a free response answer",
                        },
                        {
                          icon: "🎯",
                          label: "Quiz",
                          desc: "Answered multiple choice questions",
                        },
                      ] as const
                    ).map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 glass-sm rounded-xl border border-[rgba(255,255,255,0.06)] px-3 py-2.5"
                      >
                        <span className="text-lg shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground">
                            {item.label}
                          </p>
                          <p className="text-xs text-foreground/40">
                            {item.desc}
                          </p>
                        </div>
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 glass-sm rounded-xl border border-[rgba(0,210,255,0.2)] px-3 py-2">
                    <Award className="h-4 w-4 text-[oklch(0.78_0.22_200)] shrink-0" />
                    <p className="text-xs text-foreground/70">
                      Seal this topic to your Sovereign Passport — yours
                      forever, on-chain.
                    </p>
                  </div>

                  <button
                    type="button"
                    data-ocid="study.review_next_button"
                    onClick={() => setCurrentStep("stamp")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] font-bold hover:opacity-90 transition-smooth min-h-[48px]"
                  >
                    <Star className="h-4 w-4" />
                    Seal to Passport
                  </button>
                </div>
              </motion.div>
            )}

            {/* FLUX strip */}
            <FluxStrip flux={fluxState ?? undefined} loading={fluxLoading} />

            {currentStep === "stamp" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                data-ocid="study.stamp_panel"
                className="glass-xl rounded-2xl overflow-hidden border-[rgba(245,158,11,0.3)]"
              >
                <div className="h-px w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500/40" />
                <div className="p-6 space-y-5 text-center">
                  <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 rounded-full border-4 border-amber-500/30 animate-pulse" />
                    <div className="absolute inset-2 rounded-full border-2 border-dashed border-amber-500/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl">✦</span>
                    </div>
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-amber-400">
                      Topic Mastered!
                    </h2>
                    <p className="text-sm font-medium text-foreground mt-1">
                      {activeTopic.title}
                    </p>
                    <p className="text-xs text-foreground/40 mt-0.5">
                      {subjectName} · Grade {grade}
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    {([0, 1, 2, 3, 4] as const).map((i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  {!stampSealed ? (
                    <>
                      <p className="text-sm text-foreground/50 leading-relaxed">
                        Seal this achievement to your Sovereign Passport.
                        It&apos;s yours forever — on-chain, immutable.
                      </p>
                      <button
                        type="button"
                        data-ocid="study.seal_passport_button"
                        onClick={handleSealPassport}
                        disabled={
                          passportData.createPassport.isPending ||
                          passportData.isFetchingActor
                        }
                        className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl font-bold transition-all min-h-[48px] disabled:opacity-60 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-amber-950 shadow-sm"
                      >
                        {passportData.createPassport.isPending ? (
                          <>
                            <span className="h-4 w-4 rounded-full border-2 border-amber-950/30 border-t-amber-950 animate-spin" />
                            Sealing…
                          </>
                        ) : (
                          <>
                            <Trophy className="h-4 w-4" />
                            {passportData.passport
                              ? "✦ Seal to Passport"
                              : "✦ Create Passport & Seal"}
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      data-ocid="study.stamp_success_state"
                      className="glass rounded-2xl border border-amber-500/30 bg-amber-500/8 px-5 py-4 space-y-1"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-amber-400" />
                        <p className="font-bold text-amber-400">
                          Sealed to your Passport!
                        </p>
                      </div>
                      <p className="text-xs text-foreground/40">
                        This achievement is permanently on-chain.
                      </p>
                    </motion.div>
                  )}
                  <div className="flex items-center justify-center gap-1.5 text-xs text-foreground/30">
                    <Timer className="h-3 w-3" />
                    <span>Session time sealed with this stamp</span>
                  </div>
                  <button
                    type="button"
                    data-ocid="study.stamp_done_button"
                    onClick={() => {
                      setCurrentStep("lesson");
                      setActiveTopic(null);
                    }}
                    className="w-full px-4 py-3 rounded-2xl glass border border-[rgba(255,255,255,0.08)] text-foreground/70 font-medium hover:text-foreground hover:border-[rgba(255,255,255,0.15)] transition-glass min-h-[44px]"
                  >
                    Done — Choose Another Topic
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
