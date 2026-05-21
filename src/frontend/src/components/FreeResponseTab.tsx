import { createActor } from "@/backend";
import { QuizType } from "@/backend";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "@/hooks/use-session";
import type { AgentMeta } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { MessageSquare, Send, Sparkles, Star } from "lucide-react";
import { useState } from "react";

interface FreeResponseTabProps {
  topicTitle: string;
  topicId: string;
  subject: string;
  grade: string;
  quizmasterAgent: AgentMeta | undefined;
  encouragerAgent: AgentMeta | undefined;
  onNextStep?: () => void;
}

const FALLBACK_QUESTIONS = [
  (topic: string) =>
    `In your own words, explain what ${topic} means and why it is important. Give at least one real-world example.`,
  (topic: string) =>
    `Describe the main ideas behind ${topic}. How would you teach this concept to a younger student?`,
  (topic: string) =>
    `What questions do you still have about ${topic}? What would you want to explore further?`,
];

const FALLBACK_FEEDBACK = [
  "Excellent work! Your answer shows real understanding. You connected the key ideas clearly and used your own words — that's exactly what deep learning looks like. Keep building on this foundation!",
  "Great effort! You're developing a strong grasp of this topic. Try adding a specific example next time to make your explanation even more powerful. You're on the right track!",
  "Well done! Your response shows you've been thinking carefully about this. The more you practice explaining ideas in your own words, the stronger your understanding becomes. Keep going!",
];

let fallbackQIdx = 0;
let fallbackFIdx = 0;

export function FreeResponseTab({
  topicTitle,
  topicId,
  subject,
  grade,
  quizmasterAgent,
  encouragerAgent,
  onNextStep,
}: FreeResponseTabProps) {
  const { actor, isFetching } = useActor(createActor);
  const { saveResult } = useSession();
  const [question, setQuestion] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoadingQ, setIsLoadingQ] = useState(false);
  const [isLoadingF, setIsLoadingF] = useState(false);

  async function fetchQuestion() {
    setIsLoadingQ(true);
    setQuestion(null);
    setAnswer("");
    setFeedback(null);
    try {
      if (actor) {
        const raw = await actor.askAgent(
          "quizmaster",
          `Generate a free response question about ${topicTitle}`,
          topicTitle,
          subject,
          grade,
          BigInt(0),
        );
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0]) as { question?: string };
            setQuestion(parsed.question ?? raw);
          } catch {
            setQuestion(raw);
          }
        } else {
          setQuestion(raw);
        }
      } else {
        // Sovereign fallback
        await new Promise((r) => setTimeout(r, 600));
        const fn = FALLBACK_QUESTIONS[fallbackQIdx % FALLBACK_QUESTIONS.length];
        fallbackQIdx++;
        setQuestion(fn(topicTitle));
      }
    } catch {
      const fn = FALLBACK_QUESTIONS[fallbackQIdx % FALLBACK_QUESTIONS.length];
      fallbackQIdx++;
      setQuestion(fn(topicTitle));
    } finally {
      setIsLoadingQ(false);
    }
  }

  async function handleSubmit() {
    if (!question || !answer.trim()) return;
    setIsLoadingF(true);
    setFeedback(null);
    try {
      if (actor) {
        const result = await actor.askAgent(
          "encourager",
          `Student answer: ${answer}. Question was: ${question}`,
          topicTitle,
          subject,
          grade,
          BigInt(1),
        );
        setFeedback(result);
      } else {
        await new Promise((r) => setTimeout(r, 800));
        const fb = FALLBACK_FEEDBACK[fallbackFIdx % FALLBACK_FEEDBACK.length];
        fallbackFIdx++;
        setFeedback(fb);
      }
      saveResult.mutate({
        agentId: "encourager",
        score: BigInt(1),
        totalQuestions: BigInt(1),
        timestamp: BigInt(Date.now()),
        quizType: QuizType.freeResponse,
        topicId,
      });
    } catch {
      const fb = FALLBACK_FEEDBACK[fallbackFIdx % FALLBACK_FEEDBACK.length];
      fallbackFIdx++;
      setFeedback(fb);
    } finally {
      setIsLoadingF(false);
    }
  }

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
          data-ocid="study.fr_ask_button"
          size="sm"
          onClick={fetchQuestion}
          disabled={isLoadingQ || (isFetching && !actor)}
          className="gap-1.5 shrink-0 bg-accent text-accent-foreground hover:bg-accent/90"
          type="button"
        >
          {isLoadingQ ? (
            <span className="h-3 w-3 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" />
          ) : (
            <MessageSquare className="h-3.5 w-3.5" />
          )}
          {isLoadingQ
            ? "Creating…"
            : question
              ? "New Question"
              : "Ask Quizmaster"}
        </Button>
      </div>

      {isLoadingQ && (
        <div data-ocid="study.fr_loading_state" className="space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4 mt-1.5" />
        </div>
      )}

      {question && !isLoadingQ && (
        <div className="space-y-4">
          {/* Question card — prominent */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 bg-accent/10 px-4 py-2 border-b border-accent/20">
              <span className="text-base">
                {quizmasterAgent?.emoji ?? "🎯"}
              </span>
              <span className="text-xs font-bold text-white/60 uppercase tracking-wide">
                {quizmasterAgent?.name ?? "Quizmaster"} asks:
              </span>
            </div>
            <div className="p-[21px]">
              <p className="font-display font-semibold text-white/90 text-base leading-snug">
                {question}
              </p>
            </div>
          </div>

          {/* Answer area */}
          <div className="space-y-2">
            <label
              htmlFor="fr-answer"
              className="text-xs font-bold text-white/90 uppercase tracking-wide flex items-center gap-1.5"
            >
              <span>✍️</span> Your Answer
            </label>
            <Textarea
              id="fr-answer"
              data-ocid="study.fr_answer_input"
              placeholder="Write your answer here — use your own words, give examples, and explain your thinking…"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-[89px] resize-none bg-transparent border border-white/20 rounded-lg text-white/90 placeholder:text-white/40 p-[13px] focus:outline-none focus:border-amber-400/50 w-full"
              disabled={!!feedback}
            />
            {!feedback && (
              <p className="text-xs text-white/60">
                {answer.length > 0
                  ? `${answer.length} characters — ${answer.length < 80 ? "keep going, add more detail" : "looking good!"}`
                  : "There's no wrong answer — start writing and see where it takes you."}
              </p>
            )}
          </div>

          {!feedback && (
            <Button
              data-ocid="study.fr_submit_button"
              onClick={handleSubmit}
              disabled={!answer.trim() || isLoadingF}
              className="gap-2 w-full min-h-[48px] text-sm font-semibold"
              type="button"
            >
              {isLoadingF ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                  Evaluating your answer…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Submit Answer
                </>
              )}
            </Button>
          )}

          {/* Encourager feedback — celebration card */}
          {(isLoadingF || feedback) && (
            <div
              data-ocid={
                feedback
                  ? "study.fr_success_state"
                  : "study.fr_evaluating_state"
              }
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden"
            >
              <div className="flex items-center gap-2 bg-accent/15 px-4 py-2.5 border-b border-accent/20">
                <span className="text-xl">
                  {encouragerAgent?.emoji ?? "⭐"}
                </span>
                <span className="text-xs font-bold text-white/90 uppercase tracking-wide">
                  {encouragerAgent?.name ?? "Encourager"} says:
                </span>
                {feedback && (
                  <div className="ml-auto flex items-center gap-1">
                    {[0, 1, 2].map((i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-accent text-accent"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="px-5 py-4">
                {isLoadingF && !feedback ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/5" />
                  </div>
                ) : (
                  <p className="text-sm text-white/90 leading-relaxed">
                    {feedback}
                  </p>
                )}
              </div>
            </div>
          )}

          {feedback && (
            <Button
              data-ocid="study.fr_try_another_button"
              variant="outline"
              size="sm"
              onClick={fetchQuestion}
              className="gap-1.5 w-full"
              type="button"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Try Another Question
            </Button>
          )}

          {feedback && onNextStep && (
            <div className="mt-2 flex justify-end">
              <button
                type="button"
                data-ocid="study.fr_next_button"
                onClick={onNextStep}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity min-h-[44px] text-sm"
              >
                Next Step →
              </button>
            </div>
          )}
        </div>
      )}

      {!question && !isLoadingQ && (
        <div className="rounded-2xl border-2 border-dashed border-border bg-muted/20 p-8 text-center space-y-4">
          <div className="text-4xl">✍️</div>
          <div>
            <p className="text-sm font-semibold text-white/90">
              Ready for a writing challenge
            </p>
            <p className="text-xs text-white/60 mt-1">
              Tap "Ask Quizmaster" for a free response question on {topicTitle}.
            </p>
          </div>
          <Button
            data-ocid="study.fr_ask_button_idle"
            onClick={fetchQuestion}
            disabled={isLoadingQ || (isFetching && !actor)}
            className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
            type="button"
          >
            {isLoadingQ ? (
              <span className="h-3.5 w-3.5 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" />
            ) : (
              <MessageSquare className="h-4 w-4" />
            )}
            Ask Quizmaster
          </Button>
        </div>
      )}
    </div>
  );
}
