import { createActor } from "@/backend";
import { QuizType } from "@/backend";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "@/hooks/use-session";
import { cn } from "@/lib/utils";
import type { AgentMeta } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { CheckCircle2, HelpCircle, RefreshCw, XCircle } from "lucide-react";
import { useState } from "react";

interface MCQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

interface MultipleChoiceTabProps {
  topicTitle: string;
  topicId: string;
  subject: string;
  grade: string;
  quizmasterAgent: AgentMeta | undefined;
  encouragerAgent: AgentMeta | undefined;
  onNextStep?: () => void;
}

const FALLBACK_QUESTIONS: MCQuestion[] = [
  {
    question:
      "Which of the following best describes the core purpose of studying this topic?",
    options: [
      "To memorize isolated facts",
      "To build connected understanding",
      "To pass a single test",
      "To copy existing solutions",
    ],
    answer: "B",
    explanation:
      "Building connected understanding means you can apply what you learn in new situations — that's the real goal of education.",
  },
  {
    question:
      "What is the best strategy when you encounter a difficult concept?",
    options: [
      "Skip it and move on",
      "Ask a friend for the answer",
      "Break it into smaller parts and explore each one",
      "Wait until someone explains it completely",
    ],
    answer: "C",
    explanation:
      "Breaking problems into smaller parts is a core sovereign learning strategy — you build mastery step by step.",
  },
  {
    question: "How does practice improve understanding?",
    options: [
      "It doesn't — only reading works",
      "Practice builds neural pathways that make recall faster and deeper",
      "Only timed practice counts",
      "Practice only helps with memorization",
    ],
    answer: "B",
    explanation:
      "Regular practice strengthens the connections in your brain, making knowledge more accessible and durable over time.",
  },
];

let fallbackIdx = 0;

export function MultipleChoiceTab({
  topicTitle,
  topicId,
  subject,
  grade,
  quizmasterAgent,
  encouragerAgent,
  onNextStep,
}: MultipleChoiceTabProps) {
  const { actor, isFetching } = useActor(createActor);
  const { saveResult } = useSession();
  const [question, setQuestion] = useState<MCQuestion | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [celebration, setCelebration] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCelebrating, setIsCelebrating] = useState(false);

  async function fetchQuestion() {
    setIsLoading(true);
    setQuestion(null);
    setSelected(null);
    setCelebration(null);
    try {
      if (actor) {
        const raw = await actor.askAgent(
          "quizmaster",
          `Generate a multiple choice question about ${topicTitle}. Return JSON with fields: question, options (array of 4 strings starting with A. B. C. D.), answer (A/B/C/D letter), explanation.`,
          topicTitle,
          subject,
          grade,
          BigInt(0),
        );
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0]) as MCQuestion;
            if (parsed.question && parsed.options?.length >= 2) {
              setQuestion(parsed);
            } else {
              throw new Error("invalid");
            }
          } catch {
            // Use raw text as question with fallback options
            setQuestion({
              question: raw.substring(0, 200),
              options: ["A. True", "B. False", "C. Sometimes", "D. It depends"],
              answer: "A",
              explanation: "Great thinking — keep exploring this topic!",
            });
          }
        } else {
          setQuestion({
            question: raw.substring(0, 200),
            options: ["A. True", "B. False", "C. Sometimes", "D. It depends"],
            answer: "A",
            explanation: "Excellent reasoning! Keep going.",
          });
        }
      } else {
        // Sovereign fallback — no external AI needed
        await new Promise((r) => setTimeout(r, 700));
        const q = FALLBACK_QUESTIONS[fallbackIdx % FALLBACK_QUESTIONS.length];
        fallbackIdx++;
        setQuestion(q);
      }
    } catch {
      const q = FALLBACK_QUESTIONS[fallbackIdx % FALLBACK_QUESTIONS.length];
      fallbackIdx++;
      setQuestion(q);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSelect(letter: string) {
    if (selected || !question) return;
    setSelected(letter);
    const isCorrect = letter === question.answer;
    const score = isCorrect ? 1 : 0;

    saveResult.mutate({
      agentId: "quizmaster",
      score: BigInt(score),
      totalQuestions: BigInt(1),
      timestamp: BigInt(Date.now()),
      quizType: QuizType.multipleChoice,
      topicId,
    });

    if (isCorrect) {
      setIsCelebrating(true);
      try {
        if (actor) {
          const msg = await actor.askAgent(
            "encourager",
            `Student answered correctly: ${question.question}`,
            topicTitle,
            subject,
            grade,
            BigInt(1),
          );
          setCelebration(msg);
        } else {
          await new Promise((r) => setTimeout(r, 500));
          setCelebration(
            `Outstanding! You nailed it. Your understanding of ${topicTitle} is growing stronger with every question. Keep this momentum going! 🎉`,
          );
        }
      } catch {
        setCelebration(
          `Amazing job! You got it right! You're mastering ${topicTitle} one question at a time. 🎉`,
        );
      } finally {
        setIsCelebrating(false);
      }
    }
  }

  const LETTERS = ["A", "B", "C", "D"];

  return (
    <div className="space-y-5">
      {/* Agent identity */}
      <div className="flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 border border-accent/30 text-xl">
          {quizmasterAgent?.emoji ?? "🎯"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-display font-semibold text-white/90 text-sm">
            {quizmasterAgent?.name ?? "Quizmaster"}
          </p>
          <p className="text-xs text-white/60">
            {quizmasterAgent?.tagline ?? "Challenges you with smart questions"}
          </p>
        </div>
        <Button
          data-ocid="study.mc_ask_button"
          size="sm"
          onClick={fetchQuestion}
          disabled={isLoading || (isFetching && !actor)}
          className="gap-1.5 shrink-0 bg-accent text-accent-foreground hover:bg-accent/90"
          type="button"
        >
          {isLoading ? (
            <span className="h-3 w-3 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" />
          ) : (
            <HelpCircle className="h-3.5 w-3.5" />
          )}
          {isLoading
            ? "Creating…"
            : question
              ? "New Question"
              : "Ask Quizmaster"}
        </Button>
      </div>

      {/* Loading */}
      {isLoading && (
        <div data-ocid="study.mc_loading_state" className="space-y-3">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <div className="grid grid-cols-1 gap-2 mt-3 sm:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-14 rounded-xl" />
            ))}
          </div>
        </div>
      )}

      {/* Question */}
      {question && !isLoading && (
        <div className="space-y-4">
          {/* Question card */}
          <div className="glass-quiz-card rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 bg-muted/40 px-4 py-2 border-b border-border">
              <span className="text-base">
                {quizmasterAgent?.emoji ?? "🎯"}
              </span>
              <span className="text-xs font-bold text-white/60 uppercase tracking-wide">
                {quizmasterAgent?.name ?? "Quizmaster"} asks:
              </span>
            </div>
            <div className="px-5 py-4">
              <div className="mb-[8px]">
                <span className="inline-block text-xs px-[8px] py-[3px] rounded-full border border-white/20 bg-white/5 text-white/50">
                  Grade 10
                </span>
              </div>
              <p className="font-display font-semibold text-white/90 text-base leading-snug">
                {question.question}
              </p>
            </div>
          </div>

          {/* Options — full-width clickable cards */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {question.options.map((opt, i) => {
              const letter = LETTERS[i];
              const isSelected = selected === letter;
              const isCorrect = letter === question.answer;
              const showResult = selected !== null;

              return (
                <button
                  key={letter}
                  data-ocid={`study.mc_option.${i + 1}`}
                  type="button"
                  disabled={!!selected}
                  onClick={() => handleSelect(letter)}
                  className={`w-full text-left px-[21px] py-[13px] rounded-xl border transition-all flex items-start gap-3 min-w-0 text-sm font-medium ${
                    showResult && isCorrect
                      ? "border-teal-400/70 bg-teal-400/10 text-teal-300"
                      : showResult && isSelected && !isCorrect
                        ? "border-red-400/50 bg-red-400/10 text-red-300"
                        : isSelected
                          ? "border-amber-400/60 bg-amber-400/10 text-white/90"
                          : "border-white/10 bg-white/5 text-white/80 hover:border-amber-400/40 cursor-pointer active:scale-[0.98]"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold border mt-0.5 ${
                      showResult && isCorrect
                        ? "border-teal-400 bg-teal-400/30 text-teal-300"
                        : showResult && isSelected && !isCorrect
                          ? "border-red-400 bg-red-400/30 text-red-300"
                          : "border-white/20 bg-white/10 text-white/60"
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="leading-snug flex-1">{opt}</span>
                  {showResult && isCorrect && (
                    <CheckCircle2 className="h-4 w-4 shrink-0 ml-auto text-green-500 mt-0.5" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="h-4 w-4 shrink-0 ml-auto text-destructive mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {selected && (
            <div
              className={cn(
                "rounded-xl border-2 px-4 py-4 text-sm",
                selected === question.answer
                  ? "border-green-500/40 bg-green-500/5"
                  : "border-destructive/40 bg-destructive/5",
              )}
            >
              <p className="font-semibold text-white/90 mb-1.5 flex items-center gap-1.5">
                {selected === question.answer ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Correct! Well done.
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-destructive" />
                    Not quite — here's why:
                  </>
                )}
              </p>
              <p className="text-white/60 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}

          {/* Encourager celebration */}
          {(isCelebrating || celebration) && (
            <div
              data-ocid="study.mc_celebration"
              className="rounded-xl border border-accent/40 bg-gradient-to-r from-accent/10 to-accent/5 px-4 py-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">
                  {encouragerAgent?.emoji ?? "⭐"}
                </span>
                <span className="text-xs font-bold text-accent-foreground uppercase tracking-wide">
                  {encouragerAgent?.name ?? "Encourager"} says:
                </span>
              </div>
              {isCelebrating ? (
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <p className="text-sm text-white/90 leading-relaxed">
                  {celebration}
                </p>
              )}
            </div>
          )}

          {/* Controls */}
          {selected && (
            <Button
              data-ocid="study.mc_next_button"
              variant="outline"
              size="sm"
              onClick={fetchQuestion}
              className="gap-1.5 w-full"
              type="button"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Next Question
            </Button>
          )}

          {selected && onNextStep && (
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                data-ocid="study.mc_step_next_button"
                onClick={onNextStep}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity min-h-[44px] text-sm"
              >
                Next Step →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Idle state */}
      {!question && !isLoading && (
        <div className="rounded-2xl border-2 border-dashed border-border bg-muted/20 p-8 text-center space-y-4">
          <div className="text-4xl">🎯</div>
          <div>
            <p className="text-sm font-semibold text-white/90">
              Ready to quiz you on {topicTitle}
            </p>
            <p className="text-xs text-white/60 mt-1">
              Tap "Ask Quizmaster" for a multiple choice challenge.
            </p>
          </div>
          <Button
            data-ocid="study.mc_ask_button_idle"
            onClick={fetchQuestion}
            disabled={isLoading || (isFetching && !actor)}
            className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
            type="button"
          >
            {isLoading ? (
              <span className="h-3.5 w-3.5 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" />
            ) : (
              <HelpCircle className="h-4 w-4" />
            )}
            Ask Quizmaster
          </Button>
        </div>
      )}
    </div>
  );
}
