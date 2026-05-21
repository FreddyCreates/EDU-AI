import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { AgentMeta } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { BookOpen, Lightbulb, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

interface ExplainTabProps {
  topicTitle: string;
  subject: string;
  grade: string;
  explainerAgent: AgentMeta | undefined;
  onNextStep?: () => void;
}

function parseExplanationSections(
  text: string,
): { heading?: string; body: string }[] {
  // Split on numbered sections or double newlines into logical paragraphs
  const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim().length > 0);
  if (paragraphs.length <= 1) return [{ body: text }];
  return paragraphs.map((p) => {
    const headingMatch = p.match(
      /^([\d]+\.\s*[^:]+:|[A-Z][A-Z\s]{3,}:)\n?(.*)$/s,
    );
    if (headingMatch) {
      return {
        heading: headingMatch[1].replace(/:$/, "").trim(),
        body: headingMatch[2].trim(),
      };
    }
    return { body: p.trim() };
  });
}

export function ExplainTab({
  topicTitle,
  subject,
  grade,
  explainerAgent,
  onNextStep,
}: ExplainTabProps) {
  const { actor, isFetching } = useActor(createActor);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isActorReady = !!actor && !isFetching;

  async function handleAsk() {
    setIsLoading(true);
    setExplanation(null);
    try {
      if (actor) {
        const result = await actor.askAgent(
          "explainer",
          `Please explain ${topicTitle} in a clear, engaging way for a Grade ${grade} student`,
          topicTitle,
          subject,
          grade,
          BigInt(0),
        );
        setExplanation(result);
      } else {
        await new Promise((r) => setTimeout(r, 900));
        setExplanation(
          `${topicTitle} is a key concept in ${subject} for Grade ${grade} students.\n\nCore Idea\nAt its heart, ${topicTitle} is about understanding the fundamental principles that connect ideas together. Think of it as building blocks — each concept supports the next.\n\nWhy It Matters\nLearning ${topicTitle} helps you think critically, solve problems, and connect knowledge across different areas of study.\n\nKey Takeaway\nMaster the basics first: observe, ask questions, and practice applying what you know. That is the sovereign path to understanding ${topicTitle}.`,
        );
      }
    } catch {
      setExplanation(
        `Let's explore ${topicTitle} together!\n\nCore Idea\nThis topic is part of ${subject} and connects to many real-world concepts you encounter every day.\n\nWhy It Matters\nUnderstanding ${topicTitle} builds your foundation for advanced learning and critical thinking.\n\nKey Takeaway\nStart with curiosity — ask yourself what you already know, then let's build from there.`,
      );
    } finally {
      setIsLoading(false);
    }
  }

  const sections = explanation ? parseExplanationSections(explanation) : [];

  /** Extract 3-5 key concept terms from explanation text */
  function extractKeyConcepts(text: string): string[] {
    const sentences = text
      .split(/[.!?]/)
      .filter((s) => s.trim().length > 0)
      .slice(0, 5);
    const terms: string[] = [];
    for (const sentence of sentences) {
      const words = sentence.trim().split(/\s+/);
      const keyword = words.find((w) => w.length > 5 && /^[A-Za-z]/.test(w));
      if (keyword) {
        const clean = keyword.replace(/[^A-Za-z]/g, "");
        if (clean.length > 4 && !terms.includes(clean)) terms.push(clean);
      }
      if (terms.length >= 5) break;
    }
    return terms.slice(0, 5);
  }

  const keyConcepts = explanation ? extractKeyConcepts(explanation) : [];

  return (
    <div className="space-y-5">
      {/* Welcome card */}
      {!explanation && !isLoading && (
        <div
          data-ocid="study.lesson_welcome_card"
          className="rounded-2xl border border-white/10 backdrop-blur-md bg-white/5 p-6 text-center space-y-4"
        >
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-amber-400/10 border border-amber-400/20 text-3xl shadow-sm">
            {explainerAgent?.emoji ?? "🦉"}
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-white/90">
              {topicTitle}
            </h2>
            <p className="text-xs text-white/50 mt-1">
              {subject} · Grade {grade}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs text-white/50 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg px-3 py-2 mx-auto max-w-xs">
            <BookOpen className="h-3.5 w-3.5 shrink-0" />
            <span>
              Your guide {explainerAgent?.name ?? "Explainer"} is ready to teach
              you this topic
            </span>
          </div>
          <Button
            data-ocid="study.ask_explainer_button"
            size="lg"
            onClick={handleAsk}
            disabled={isLoading || (!isActorReady && !actor)}
            className="gap-2 w-full max-w-xs mx-auto"
            type="button"
          >
            {isLoading ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
                Explaining…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Ask {explainerAgent?.name ?? "Explainer"}
              </>
            )}
          </Button>
        </div>
      )}

      {/* Agent identity bar */}
      {(explanation || isLoading) && (
        <div className="flex items-center gap-3 rounded-xl border border-amber-400/20 backdrop-blur-md bg-amber-400/5 px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 border border-amber-400/20 text-xl">
            {explainerAgent?.emoji ?? "🦉"}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display font-semibold text-white/90 text-sm">
              {explainerAgent?.name ?? "Explainer"}
            </p>
            <p className="text-xs text-white/50">
              {explainerAgent?.tagline ?? "Breaks down any concept clearly"}
            </p>
          </div>
          <Button
            data-ocid="study.ask_explainer_button"
            size="sm"
            onClick={handleAsk}
            disabled={isLoading}
            className="gap-1.5 shrink-0"
            type="button"
          >
            {isLoading ? (
              <span className="h-3 w-3 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" />
            )}
            {isLoading ? "Thinking…" : "Ask Again"}
          </Button>
        </div>
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div data-ocid="study.explain_loading_state" className="space-y-3 p-1">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <div className="pt-2">
            <Skeleton className="h-3 w-28 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/5 mt-1.5" />
          </div>
          <div className="pt-2">
            <Skeleton className="h-3 w-24 mb-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5 mt-1.5" />
          </div>
        </div>
      )}

      {/* Explanation result */}
      {explanation && !isLoading && (
        <div
          data-ocid="study.explain_result"
          className="rounded-2xl border border-white/10 backdrop-blur-md bg-white/5 overflow-hidden"
        >
          <div className="h-1 w-full bg-gradient-to-r from-amber-400/70 via-teal-400/50 to-amber-400/30" />
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-bold text-amber-400/90 uppercase tracking-wider">
                {explainerAgent?.name ?? "Explainer"} — Lesson on {topicTitle}
              </span>
            </div>

            {sections.length <= 1 ? (
              <p className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap">
                {explanation}
              </p>
            ) : (
              <div className="space-y-4">
                {sections.map((sec, i) => (
                  <div
                    key={sec.heading ?? `section-${i}`}
                    className={i > 0 ? "pt-3 border-t border-white/10" : ""}
                  >
                    {sec.heading && (
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className="h-4 w-4 rounded bg-teal-400/15 flex items-center justify-center">
                          <Zap className="h-2.5 w-2.5 text-teal-400" />
                        </div>
                        <span className="text-xs font-bold text-teal-400 uppercase tracking-wide">
                          {sec.heading}
                        </span>
                      </div>
                    )}
                    <p className="text-sm text-white/80 leading-relaxed">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Key Concepts */}
            {keyConcepts.length > 0 && (
              <div className="pt-3 border-t border-white/10 space-y-2">
                <p className="text-sm font-semibold text-white/70">
                  Key Concepts
                </p>
                <div className="flex flex-wrap gap-2">
                  {keyConcepts.map((term) => (
                    <span
                      key={term}
                      className="glass-subject-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-teal-400 border-l-2 border-teal-400/60"
                    >
                      <span className="h-1 w-1 rounded-full bg-teal-400/70" />
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 rounded-lg backdrop-blur-md bg-amber-400/5 border border-amber-400/20 px-3 py-2 mt-2">
              <span className="text-base">💡</span>
              <p className="text-xs text-white/70">
                Tap <strong className="text-white/90">Next Step</strong> when
                you feel ready to practice what you learned.
              </p>
            </div>
          </div>
        </div>
      )}

      {onNextStep && (
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            data-ocid="study.lesson_next_button"
            onClick={onNextStep}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity min-h-[44px] text-sm"
          >
            Next Step →
          </button>
        </div>
      )}
    </div>
  );
}
