import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { i as createLucideIcon, f as useActor, B as BookOpen, S as Skeleton, Z as Zap, h as createActor, M as MessageSquare, j as Send, b as Star, Q as QuizType, c as cn, A as AgentRole, a as Award } from "./index-BivnQ6bB.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { S as Sparkles } from "./sparkles-C3IEEH24.js";
import { T as Textarea } from "./textarea-B0lupW8l.js";
import { u as useSession } from "./use-session-DOOtnplD.js";
import { C as CircleHelp } from "./circle-help-BfQc4jJ-.js";
import { C as CircleCheck } from "./circle-check-Bol12715.js";
import { C as CircleX } from "./circle-x-BLumP_Id.js";
import { R as RefreshCw } from "./refresh-cw-yaYaSXit.js";
import { C as Clock } from "./clock-DmeOF2sv.js";
import { A as ArrowRight } from "./arrow-right-CsqnM8Ko.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { a as useAdaptiveSuggestion } from "./use-adaptive-B-_9L1Vr.js";
import { u as useAgents } from "./use-agents-YLCyuBjV.js";
import { a as useSubjectsByGrade, b as useTopicsBySubject } from "./use-curriculum-D8crsBID.js";
import { a as useNrveState, b as useFluxState, c as useEchoEntanglement } from "./use-entanglements-B-bwtovY.js";
import { a as useSovereignPassport } from "./use-passport-VGmcZtEk.js";
import { u as useStudent } from "./use-student-czSOKqJy.js";
import { e as useParams, d as useNavigate, L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { T as Trophy } from "./trophy-WhoS-b_2.js";
import "./query-8urnerR0.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }],
  ["path", { d: "M14 4h7", key: "3xa0d5" }],
  ["path", { d: "M14 9h7", key: "1icrd9" }],
  ["path", { d: "M14 15h7", key: "1mj8o2" }],
  ["path", { d: "M14 20h7", key: "11slyb" }]
];
const LayoutList = createLucideIcon("layout-list", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
const Timer = createLucideIcon("timer", __iconNode);
function parseExplanationSections(text) {
  const paragraphs = text.split(/\n{2,}/).filter((p) => p.trim().length > 0);
  if (paragraphs.length <= 1) return [{ body: text }];
  return paragraphs.map((p) => {
    const headingMatch = p.match(
      /^([\d]+\.\s*[^:]+:|[A-Z][A-Z\s]{3,}:)\n?(.*)$/s
    );
    if (headingMatch) {
      return {
        heading: headingMatch[1].replace(/:$/, "").trim(),
        body: headingMatch[2].trim()
      };
    }
    return { body: p.trim() };
  });
}
function ExplainTab({
  topicTitle,
  subject,
  grade,
  explainerAgent,
  onNextStep
}) {
  const { actor, isFetching } = useActor(createActor);
  const [explanation, setExplanation] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
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
          BigInt(0)
        );
        setExplanation(result);
      } else {
        await new Promise((r) => setTimeout(r, 900));
        setExplanation(
          `${topicTitle} is a key concept in ${subject} for Grade ${grade} students.

Core Idea
At its heart, ${topicTitle} is about understanding the fundamental principles that connect ideas together. Think of it as building blocks — each concept supports the next.

Why It Matters
Learning ${topicTitle} helps you think critically, solve problems, and connect knowledge across different areas of study.

Key Takeaway
Master the basics first: observe, ask questions, and practice applying what you know. That is the sovereign path to understanding ${topicTitle}.`
        );
      }
    } catch {
      setExplanation(
        `Let's explore ${topicTitle} together!

Core Idea
This topic is part of ${subject} and connects to many real-world concepts you encounter every day.

Why It Matters
Understanding ${topicTitle} builds your foundation for advanced learning and critical thinking.

Key Takeaway
Start with curiosity — ask yourself what you already know, then let's build from there.`
      );
    } finally {
      setIsLoading(false);
    }
  }
  const sections = explanation ? parseExplanationSections(explanation) : [];
  function extractKeyConcepts(text) {
    const sentences = text.split(/[.!?]/).filter((s) => s.trim().length > 0).slice(0, 5);
    const terms = [];
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    !explanation && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "study.lesson_welcome_card",
        className: "rounded-2xl border border-white/10 backdrop-blur-md bg-white/5 p-6 text-center space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-amber-400/10 border border-amber-400/20 text-3xl shadow-sm", children: (explainerAgent == null ? void 0 : explainerAgent.emoji) ?? "🦉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-white/90", children: topicTitle }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/50 mt-1", children: [
              subject,
              " · Grade ",
              grade
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-xs text-white/50 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg px-3 py-2 mx-auto max-w-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-3.5 w-3.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Your guide ",
              (explainerAgent == null ? void 0 : explainerAgent.name) ?? "Explainer",
              " is ready to teach you this topic"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "data-ocid": "study.ask_explainer_button",
              size: "lg",
              onClick: handleAsk,
              disabled: isLoading || !isActorReady && !actor,
              className: "gap-2 w-full max-w-xs mx-auto",
              type: "button",
              children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" }),
                "Explaining…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }),
                "Ask ",
                (explainerAgent == null ? void 0 : explainerAgent.name) ?? "Explainer"
              ] })
            }
          )
        ]
      }
    ),
    (explanation || isLoading) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-amber-400/20 backdrop-blur-md bg-amber-400/5 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 border border-amber-400/20 text-xl", children: (explainerAgent == null ? void 0 : explainerAgent.emoji) ?? "🦉" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-white/90 text-sm", children: (explainerAgent == null ? void 0 : explainerAgent.name) ?? "Explainer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/50", children: (explainerAgent == null ? void 0 : explainerAgent.tagline) ?? "Breaks down any concept clearly" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "study.ask_explainer_button",
          size: "sm",
          onClick: handleAsk,
          disabled: isLoading,
          className: "gap-1.5 shrink-0",
          type: "button",
          children: [
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            isLoading ? "Thinking…" : "Ask Again"
          ]
        }
      )
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "study.explain_loading_state", className: "space-y-3 p-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-5 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-28 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/5 mt-1.5" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24 mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5 mt-1.5" })
      ] })
    ] }),
    explanation && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "study.explain_result",
        className: "rounded-2xl border border-white/10 backdrop-blur-md bg-white/5 overflow-hidden",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-gradient-to-r from-amber-400/70 via-teal-400/50 to-amber-400/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "h-4 w-4 text-amber-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-amber-400/90 uppercase tracking-wider", children: [
                (explainerAgent == null ? void 0 : explainerAgent.name) ?? "Explainer",
                " — Lesson on ",
                topicTitle
              ] })
            ] }),
            sections.length <= 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/90 leading-relaxed whitespace-pre-wrap", children: explanation }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sections.map((sec, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: i > 0 ? "pt-3 border-t border-white/10" : "",
                children: [
                  sec.heading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-4 rounded bg-teal-400/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-2.5 w-2.5 text-teal-400" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-teal-400 uppercase tracking-wide", children: sec.heading })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/80 leading-relaxed", children: sec.body })
                ]
              },
              sec.heading ?? `section-${i}`
            )) }),
            keyConcepts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-3 border-t border-white/10 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-white/70", children: "Key Concepts" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: keyConcepts.map((term) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "glass-subject-pill inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-teal-400 border-l-2 border-teal-400/60",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 rounded-full bg-teal-400/70" }),
                    term
                  ]
                },
                term
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg backdrop-blur-md bg-amber-400/5 border border-amber-400/20 px-3 py-2 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: "💡" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/70", children: [
                "Tap ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-white/90", children: "Next Step" }),
                " when you feel ready to practice what you learned."
              ] })
            ] })
          ] })
        ]
      }
    ),
    onNextStep && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "data-ocid": "study.lesson_next_button",
        onClick: onNextStep,
        className: "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity min-h-[44px] text-sm",
        children: "Next Step →"
      }
    ) })
  ] });
}
const FALLBACK_QUESTIONS$1 = [
  (topic) => `In your own words, explain what ${topic} means and why it is important. Give at least one real-world example.`,
  (topic) => `Describe the main ideas behind ${topic}. How would you teach this concept to a younger student?`,
  (topic) => `What questions do you still have about ${topic}? What would you want to explore further?`
];
const FALLBACK_FEEDBACK = [
  "Excellent work! Your answer shows real understanding. You connected the key ideas clearly and used your own words — that's exactly what deep learning looks like. Keep building on this foundation!",
  "Great effort! You're developing a strong grasp of this topic. Try adding a specific example next time to make your explanation even more powerful. You're on the right track!",
  "Well done! Your response shows you've been thinking carefully about this. The more you practice explaining ideas in your own words, the stronger your understanding becomes. Keep going!"
];
let fallbackQIdx = 0;
let fallbackFIdx = 0;
function FreeResponseTab({
  topicTitle,
  topicId,
  subject,
  grade,
  quizmasterAgent,
  encouragerAgent,
  onNextStep
}) {
  const { actor, isFetching } = useActor(createActor);
  const { saveResult } = useSession();
  const [question, setQuestion] = reactExports.useState(null);
  const [answer, setAnswer] = reactExports.useState("");
  const [feedback, setFeedback] = reactExports.useState(null);
  const [isLoadingQ, setIsLoadingQ] = reactExports.useState(false);
  const [isLoadingF, setIsLoadingF] = reactExports.useState(false);
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
          BigInt(0)
        );
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0]);
            setQuestion(parsed.question ?? raw);
          } catch {
            setQuestion(raw);
          }
        } else {
          setQuestion(raw);
        }
      } else {
        await new Promise((r) => setTimeout(r, 600));
        const fn = FALLBACK_QUESTIONS$1[fallbackQIdx % FALLBACK_QUESTIONS$1.length];
        fallbackQIdx++;
        setQuestion(fn(topicTitle));
      }
    } catch {
      const fn = FALLBACK_QUESTIONS$1[fallbackQIdx % FALLBACK_QUESTIONS$1.length];
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
          BigInt(1)
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
        topicId
      });
    } catch {
      const fb = FALLBACK_FEEDBACK[fallbackFIdx % FALLBACK_FEEDBACK.length];
      fallbackFIdx++;
      setFeedback(fb);
    } finally {
      setIsLoadingF(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 border border-accent/30 text-xl", children: (quizmasterAgent == null ? void 0 : quizmasterAgent.emoji) ?? "🎯" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-white/90 text-sm", children: (quizmasterAgent == null ? void 0 : quizmasterAgent.name) ?? "Quizmaster" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60", children: (quizmasterAgent == null ? void 0 : quizmasterAgent.tagline) ?? "Challenges you with smart questions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "study.fr_ask_button",
          size: "sm",
          onClick: fetchQuestion,
          disabled: isLoadingQ || isFetching && !actor,
          className: "gap-1.5 shrink-0 bg-accent text-accent-foreground hover:bg-accent/90",
          type: "button",
          children: [
            isLoadingQ ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3.5 w-3.5" }),
            isLoadingQ ? "Creating…" : question ? "New Question" : "Ask Quizmaster"
          ]
        }
      )
    ] }),
    isLoadingQ && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "study.fr_loading_state", className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4 mt-1.5" })
    ] }),
    question && !isLoadingQ && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "backdrop-blur-md bg-white/5 border border-white/10 rounded-xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-accent/10 px-4 py-2 border-b border-accent/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: (quizmasterAgent == null ? void 0 : quizmasterAgent.emoji) ?? "🎯" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-white/60 uppercase tracking-wide", children: [
            (quizmasterAgent == null ? void 0 : quizmasterAgent.name) ?? "Quizmaster",
            " asks:"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-[21px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-white/90 text-base leading-snug", children: question }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: "fr-answer",
            className: "text-xs font-bold text-white/90 uppercase tracking-wide flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "✍️" }),
              " Your Answer"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "fr-answer",
            "data-ocid": "study.fr_answer_input",
            placeholder: "Write your answer here — use your own words, give examples, and explain your thinking…",
            value: answer,
            onChange: (e) => setAnswer(e.target.value),
            className: "min-h-[89px] resize-none bg-transparent border border-white/20 rounded-lg text-white/90 placeholder:text-white/40 p-[13px] focus:outline-none focus:border-amber-400/50 w-full",
            disabled: !!feedback
          }
        ),
        !feedback && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60", children: answer.length > 0 ? `${answer.length} characters — ${answer.length < 80 ? "keep going, add more detail" : "looking good!"}` : "There's no wrong answer — start writing and see where it takes you." })
      ] }),
      !feedback && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          "data-ocid": "study.fr_submit_button",
          onClick: handleSubmit,
          disabled: !answer.trim() || isLoadingF,
          className: "gap-2 w-full min-h-[48px] text-sm font-semibold",
          type: "button",
          children: isLoadingF ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground animate-spin" }),
            "Evaluating your answer…"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }),
            "Submit Answer"
          ] })
        }
      ),
      (isLoadingF || feedback) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": feedback ? "study.fr_success_state" : "study.fr_evaluating_state",
          className: "rounded-xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-accent/15 px-4 py-2.5 border-b border-accent/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: (encouragerAgent == null ? void 0 : encouragerAgent.emoji) ?? "⭐" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-white/90 uppercase tracking-wide", children: [
                (encouragerAgent == null ? void 0 : encouragerAgent.name) ?? "Encourager",
                " says:"
              ] }),
              feedback && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex items-center gap-1", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Star,
                {
                  className: "h-3 w-3 fill-accent text-accent"
                },
                i
              )) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4", children: isLoadingF && !feedback ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/5" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/90 leading-relaxed", children: feedback }) })
          ]
        }
      ),
      feedback && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "study.fr_try_another_button",
          variant: "outline",
          size: "sm",
          onClick: fetchQuestion,
          className: "gap-1.5 w-full",
          type: "button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            "Try Another Question"
          ]
        }
      ),
      feedback && onNextStep && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "study.fr_next_button",
          onClick: onNextStep,
          className: "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity min-h-[44px] text-sm",
          children: "Next Step →"
        }
      ) })
    ] }),
    !question && !isLoadingQ && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border-2 border-dashed border-border bg-muted/20 p-8 text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: "✍️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-white/90", children: "Ready for a writing challenge" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/60 mt-1", children: [
          'Tap "Ask Quizmaster" for a free response question on ',
          topicTitle,
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "study.fr_ask_button_idle",
          onClick: fetchQuestion,
          disabled: isLoadingQ || isFetching && !actor,
          className: "gap-2 bg-accent text-accent-foreground hover:bg-accent/90",
          type: "button",
          children: [
            isLoadingQ ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3.5 w-3.5 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
            "Ask Quizmaster"
          ]
        }
      )
    ] })
  ] });
}
const FALLBACK_QUESTIONS = [
  {
    question: "Which of the following best describes the core purpose of studying this topic?",
    options: [
      "To memorize isolated facts",
      "To build connected understanding",
      "To pass a single test",
      "To copy existing solutions"
    ],
    answer: "B",
    explanation: "Building connected understanding means you can apply what you learn in new situations — that's the real goal of education."
  },
  {
    question: "What is the best strategy when you encounter a difficult concept?",
    options: [
      "Skip it and move on",
      "Ask a friend for the answer",
      "Break it into smaller parts and explore each one",
      "Wait until someone explains it completely"
    ],
    answer: "C",
    explanation: "Breaking problems into smaller parts is a core sovereign learning strategy — you build mastery step by step."
  },
  {
    question: "How does practice improve understanding?",
    options: [
      "It doesn't — only reading works",
      "Practice builds neural pathways that make recall faster and deeper",
      "Only timed practice counts",
      "Practice only helps with memorization"
    ],
    answer: "B",
    explanation: "Regular practice strengthens the connections in your brain, making knowledge more accessible and durable over time."
  }
];
let fallbackIdx = 0;
function MultipleChoiceTab({
  topicTitle,
  topicId,
  subject,
  grade,
  quizmasterAgent,
  encouragerAgent,
  onNextStep
}) {
  const { actor, isFetching } = useActor(createActor);
  const { saveResult } = useSession();
  const [question, setQuestion] = reactExports.useState(null);
  const [selected, setSelected] = reactExports.useState(null);
  const [celebration, setCelebration] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [isCelebrating, setIsCelebrating] = reactExports.useState(false);
  async function fetchQuestion() {
    var _a;
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
          BigInt(0)
        );
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.question && ((_a = parsed.options) == null ? void 0 : _a.length) >= 2) {
              setQuestion(parsed);
            } else {
              throw new Error("invalid");
            }
          } catch {
            setQuestion({
              question: raw.substring(0, 200),
              options: ["A. True", "B. False", "C. Sometimes", "D. It depends"],
              answer: "A",
              explanation: "Great thinking — keep exploring this topic!"
            });
          }
        } else {
          setQuestion({
            question: raw.substring(0, 200),
            options: ["A. True", "B. False", "C. Sometimes", "D. It depends"],
            answer: "A",
            explanation: "Excellent reasoning! Keep going."
          });
        }
      } else {
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
  async function handleSelect(letter) {
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
      topicId
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
            BigInt(1)
          );
          setCelebration(msg);
        } else {
          await new Promise((r) => setTimeout(r, 500));
          setCelebration(
            `Outstanding! You nailed it. Your understanding of ${topicTitle} is growing stronger with every question. Keep this momentum going! 🎉`
          );
        }
      } catch {
        setCelebration(
          `Amazing job! You got it right! You're mastering ${topicTitle} one question at a time. 🎉`
        );
      } finally {
        setIsCelebrating(false);
      }
    }
  }
  const LETTERS = ["A", "B", "C", "D"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/5 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/20 border border-accent/30 text-xl", children: (quizmasterAgent == null ? void 0 : quizmasterAgent.emoji) ?? "🎯" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-white/90 text-sm", children: (quizmasterAgent == null ? void 0 : quizmasterAgent.name) ?? "Quizmaster" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60", children: (quizmasterAgent == null ? void 0 : quizmasterAgent.tagline) ?? "Challenges you with smart questions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "study.mc_ask_button",
          size: "sm",
          onClick: fetchQuestion,
          disabled: isLoading || isFetching && !actor,
          className: "gap-1.5 shrink-0 bg-accent text-accent-foreground hover:bg-accent/90",
          type: "button",
          children: [
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-3 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "h-3.5 w-3.5" }),
            isLoading ? "Creating…" : question ? "New Question" : "Ask Quizmaster"
          ]
        }
      )
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "study.mc_loading_state", className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-4/5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2 mt-3 sm:grid-cols-2", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-xl" }, i)) })
    ] }),
    question && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-quiz-card rounded-xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-muted/40 px-4 py-2 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: (quizmasterAgent == null ? void 0 : quizmasterAgent.emoji) ?? "🎯" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-white/60 uppercase tracking-wide", children: [
            (quizmasterAgent == null ? void 0 : quizmasterAgent.name) ?? "Quizmaster",
            " asks:"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-[8px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs px-[8px] py-[3px] rounded-full border border-white/20 bg-white/5 text-white/50", children: "Grade 10" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-white/90 text-base leading-snug", children: question.question })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2.5 sm:grid-cols-2", children: question.options.map((opt, i) => {
        const letter = LETTERS[i];
        const isSelected = selected === letter;
        const isCorrect = letter === question.answer;
        const showResult = selected !== null;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            "data-ocid": `study.mc_option.${i + 1}`,
            type: "button",
            disabled: !!selected,
            onClick: () => handleSelect(letter),
            className: `w-full text-left px-[21px] py-[13px] rounded-xl border transition-all flex items-start gap-3 min-w-0 text-sm font-medium ${showResult && isCorrect ? "border-teal-400/70 bg-teal-400/10 text-teal-300" : showResult && isSelected && !isCorrect ? "border-red-400/50 bg-red-400/10 text-red-300" : isSelected ? "border-amber-400/60 bg-amber-400/10 text-white/90" : "border-white/10 bg-white/5 text-white/80 hover:border-amber-400/40 cursor-pointer active:scale-[0.98]"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold border mt-0.5 ${showResult && isCorrect ? "border-teal-400 bg-teal-400/30 text-teal-300" : showResult && isSelected && !isCorrect ? "border-red-400 bg-red-400/30 text-red-300" : "border-white/20 bg-white/10 text-white/60"}`,
                  children: letter
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-snug flex-1", children: opt }),
              showResult && isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 shrink-0 ml-auto text-green-500 mt-0.5" }),
              showResult && isSelected && !isCorrect && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 shrink-0 ml-auto text-destructive mt-0.5" })
            ]
          },
          letter
        );
      }) }),
      selected && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "rounded-xl border-2 px-4 py-4 text-sm",
            selected === question.answer ? "border-green-500/40 bg-green-500/5" : "border-destructive/40 bg-destructive/5"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-white/90 mb-1.5 flex items-center gap-1.5", children: selected === question.answer ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-green-500" }),
              "Correct! Well done."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 text-destructive" }),
              "Not quite — here's why:"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/60 leading-relaxed", children: question.explanation })
          ]
        }
      ),
      (isCelebrating || celebration) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "study.mc_celebration",
          className: "rounded-xl border border-accent/40 bg-gradient-to-r from-accent/10 to-accent/5 px-4 py-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: (encouragerAgent == null ? void 0 : encouragerAgent.emoji) ?? "⭐" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-accent-foreground uppercase tracking-wide", children: [
                (encouragerAgent == null ? void 0 : encouragerAgent.name) ?? "Encourager",
                " says:"
              ] })
            ] }),
            isCelebrating ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/90 leading-relaxed", children: celebration })
          ]
        }
      ),
      selected && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "study.mc_next_button",
          variant: "outline",
          size: "sm",
          onClick: fetchQuestion,
          className: "gap-1.5 w-full",
          type: "button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3.5 w-3.5" }),
            "Next Question"
          ]
        }
      ),
      selected && onNextStep && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          "data-ocid": "study.mc_step_next_button",
          onClick: onNextStep,
          className: "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity min-h-[44px] text-sm",
          children: "Next Step →"
        }
      ) })
    ] }),
    !question && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border-2 border-dashed border-border bg-muted/20 p-8 text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl", children: "🎯" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-white/90", children: [
          "Ready to quiz you on ",
          topicTitle
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/60 mt-1", children: 'Tap "Ask Quizmaster" for a multiple choice challenge.' })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "study.mc_ask_button_idle",
          onClick: fetchQuestion,
          disabled: isLoading || isFetching && !actor,
          className: "gap-2 bg-accent text-accent-foreground hover:bg-accent/90",
          type: "button",
          children: [
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3.5 w-3.5 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "h-4 w-4" }),
            "Ask Quizmaster"
          ]
        }
      )
    ] })
  ] });
}
function TopicCard({
  topic,
  onStart,
  className,
  index = 1
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `topic.card.${index}`,
      className: cn(
        "group glass glass-shimmer rounded-2xl overflow-hidden",
        "transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl glass-sm",
                  "text-primary transition-all duration-200 group-hover:scale-105"
                ),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-snug mb-1", children: topic.title }),
              topic.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed line-clamp-2", children: topic.description })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "~15 min" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": `topic.start_button.${index}`,
                size: "sm",
                className: cn(
                  "gap-1.5 text-xs font-semibold h-8 px-3",
                  "bg-primary/15 border border-primary/30 text-primary",
                  "hover:bg-primary/25 hover:border-primary/50 transition-smooth"
                ),
                onClick: () => onStart == null ? void 0 : onStart(topic),
                type: "button",
                children: [
                  "Start Learning",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-full bg-gradient-to-r from-primary/40 via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" })
      ]
    }
  );
}
const STEPS = [
  { id: "lesson", label: "Lesson" },
  { id: "practice", label: "Practice" },
  { id: "quiz", label: "Quiz" },
  { id: "review", label: "Review" },
  { id: "stamp", label: "Stamp" }
];
const stepOrder = STEPS.map((s) => s.id);
const FIB_SEQUENCE = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55];
function NrveStrip({
  nrve,
  loading
}) {
  if (loading || !nrve) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "study.nrve_strip",
        className: "glass rounded-2xl px-4 py-3 animate-pulse",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 w-48 rounded bg-[rgba(255,255,255,0.06)]" })
      }
    );
  }
  const phases = [
    { id: "expand", label: "EXPAND", fill: 618 },
    { id: "critique", label: "CRITIQUE", fill: 382 },
    { id: "synthesize", label: "SYNTH", fill: 500 }
  ];
  const activePhase = String(nrve.cogtPhase).toLowerCase();
  const coh = Number(nrve.coherenceScore);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "study.nrve_strip",
      className: "glass-portal-student rounded-2xl px-4 py-3 space-y-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]/70", children: "NRVE · Reasoning Live" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-foreground/40", children: [
              "Engine:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-bold", children: nrve.activeEngine })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] rounded-lg bg-[rgba(0,210,255,0.12)] px-1.5 py-0.5 text-[oklch(0.78_0.22_200)] font-bold", children: [
              "COH:",
              coh
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: phases.map((phase) => {
          const isActive = activePhase === phase.id || activePhase.includes(phase.id);
          const fillPct = isActive ? phase.fill / 10 : 8;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "text-[9px] font-mono uppercase tracking-wider",
                  isActive ? "text-[oklch(0.78_0.22_200)] font-bold" : "text-foreground/30"
                ),
                children: phase.label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "h-full rounded-full transition-all duration-700",
                  isActive ? "bg-[oklch(0.78_0.22_200)]" : "bg-[rgba(255,255,255,0.12)]"
                ),
                style: { width: `${fillPct}%` }
              }
            ) })
          ] }, phase.id);
        }) })
      ]
    }
  );
}
function FluxStrip({
  flux,
  loading
}) {
  if (loading || !flux) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "study.flux_strip",
        className: "glass rounded-2xl px-4 py-3 animate-pulse",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 w-56 rounded bg-[rgba(255,255,255,0.06)]" })
      }
    );
  }
  const floor = Number(flux.masteryFloor);
  const nextThreshold = Number(flux.nextFloorThreshold);
  const confidence = Number(flux.phiConfidence);
  const confidencePct = Math.min(100, confidence / 1e3 * 100);
  const nextFib = FIB_SEQUENCE.find((f) => f > floor) ?? FIB_SEQUENCE[FIB_SEQUENCE.length - 1];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "study.flux_strip",
      className: "glass rounded-2xl px-4 py-3 space-y-2 border-[rgba(245,158,11,0.25)]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400", children: "FLUX · Fibonacci Floor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-foreground/40", children: [
              "Floor: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400 font-bold", children: floor })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-foreground/40", children: [
              "Next:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/70 font-semibold", children: nextThreshold || nextFib })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: FIB_SEQUENCE.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-0.5 flex-1 min-w-0",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "w-full h-1.5 rounded-full transition-all duration-500",
                    f === floor ? "bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)]" : f < floor ? "bg-amber-500/40" : "bg-[rgba(255,255,255,0.06)]"
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "text-[8px] font-mono leading-none",
                    f === floor ? "text-amber-400 font-bold" : f < floor ? "text-amber-400/50" : "text-foreground/20"
                  ),
                  children: f
                }
              )
            ]
          },
          `fib-${f}`
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono text-foreground/40 shrink-0", children: "Φ conf" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1 rounded-full bg-[rgba(255,255,255,0.06)] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full rounded-full bg-amber-500/70 transition-all duration-700",
              style: { width: `${confidencePct}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-mono text-amber-400 shrink-0 w-6 text-right", children: [
            Math.round(confidencePct),
            "%"
          ] })
        ] })
      ]
    }
  );
}
function Study() {
  var _a;
  const { subjectId, topicId } = useParams({ strict: false });
  const navigate = useNavigate();
  const { profile } = useStudent();
  const grade = (profile == null ? void 0 : profile.gradeLevel) ?? "";
  const { data: subjectList } = useSubjectsByGrade(grade);
  const subject = subjectList == null ? void 0 : subjectList.find((s) => s.id === subjectId);
  const { data: topics, isLoading: topicsLoading } = useTopicsBySubject(subjectId);
  const { agentsMeta, isLoading: agentsLoading } = useAgents();
  const [activeTopic, setActiveTopic] = reactExports.useState(
    () => topicId ? (topics == null ? void 0 : topics.find((t) => t.id === topicId)) ?? null : null
  );
  const [currentStep, setCurrentStep] = reactExports.useState("lesson");
  const [dismissBanner, setDismissBanner] = reactExports.useState(false);
  const [stampSealed, setStampSealed] = reactExports.useState(false);
  const [cohFlash, setCohFlash] = reactExports.useState(null);
  const [sessionMode, setSessionMode] = reactExports.useState(
    "workNight"
  );
  const [timeLeft, setTimeLeft] = reactExports.useState(900);
  const questionStartRef = reactExports.useRef(Date.now());
  const studentId = ((_a = profile == null ? void 0 : profile.id) == null ? void 0 : _a.toString()) ?? "demo-student";
  const { nrveState, isLoading: nrveLoading } = useNrveState();
  const { fluxState, isLoading: fluxLoading } = useFluxState(studentId);
  const echoMutation = useEchoEntanglement();
  function fireEcho(eventType, value, duration) {
    echoMutation.mutate(
      {
        studentId,
        eventType,
        value: BigInt(value),
        duration: BigInt(duration)
      },
      {
        onSuccess: (result) => {
          if (result && Number(result.coherenceDelta) > 0) {
            setCohFlash(Number(result.coherenceDelta));
            setTimeout(() => setCohFlash(null), 2e3);
          }
        }
      }
    );
  }
  reactExports.useEffect(() => {
    questionStartRef.current = Date.now();
  }, [currentStep]);
  const { suggestion } = useAdaptiveSuggestion(subjectId ?? "");
  const passportData = useSovereignPassport();
  const { actor } = useActor(createActor);
  reactExports.useEffect(() => {
    setDismissBanner(false);
    setCurrentStep("lesson");
    setStampSealed(false);
  }, [activeTopic == null ? void 0 : activeTopic.id]);
  reactExports.useEffect(() => {
    setTimeLeft(sessionMode === "workNight" ? 900 : 2700);
  }, [sessionMode]);
  reactExports.useEffect(() => {
    if (timeLeft <= 0) return;
    const id = setInterval(() => setTimeLeft((t) => Math.max(0, t - 1)), 1e3);
    return () => clearInterval(id);
  }, [timeLeft]);
  const explainer = agentsMeta.find((a) => a.role === AgentRole.explainer);
  const quizmaster = agentsMeta.find((a) => a.role === AgentRole.quizmaster);
  const encourager = agentsMeta.find((a) => a.role === AgentRole.encourager);
  const subjectName = (subject == null ? void 0 : subject.name) ?? "Subject";
  const topicCount = (topics == null ? void 0 : topics.length) ?? 0;
  const currentIdx = stepOrder.indexOf(currentStep);
  async function handleSealPassport() {
    if (!passportData.passport) {
      passportData.createPassport.mutate({
        studentName: "Student",
        gradeLevel: grade,
        collegium: "COLLEGIUM-PUBLICA"
      });
    } else if (actor && activeTopic) {
      try {
        await actor.sealKernelSeed({
          id: `${activeTopic.id}-${Date.now()}`,
          trackName: activeTopic.title,
          engineUsed: subjectName ?? "General",
          sessionSummary: `Completed workflow for ${activeTopic.title}`,
          createdAt: BigInt(Date.now()),
          artifactName: activeTopic.title
        });
      } catch {
      }
    }
    setStampSealed(true);
  }
  function WorkflowProgress() {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "study.workflow_progress",
        className: "flex items-center justify-between px-2 py-4",
        children: STEPS.map((step, idx) => {
          const isCompleted = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `study.step.${step.id}`,
                  onClick: () => idx < currentIdx && setCurrentStep(step.id),
                  className: cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-smooth",
                    isCompleted && "border-amber-500 bg-amber-500/20 text-amber-400 cursor-pointer hover:bg-amber-500/30",
                    isCurrent && "border-[oklch(0.78_0.22_200)] bg-[rgba(0,210,255,0.15)] text-[oklch(0.78_0.22_200)] cursor-default shadow-[0_0_12px_rgba(0,210,255,0.25)]",
                    !isCompleted && !isCurrent && "border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] text-foreground/30 cursor-default"
                  ),
                  "aria-label": step.label,
                  children: isCompleted ? "✓" : idx + 1
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "text-[10px] font-mono font-medium",
                    isCurrent ? "text-[oklch(0.78_0.22_200)]" : "text-foreground/30"
                  ),
                  children: step.label
                }
              )
            ] }),
            idx < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "flex-1 h-px mx-1 mb-5",
                  idx < currentIdx ? "bg-amber-500/50" : "bg-[rgba(255,255,255,0.06)]"
                )
              }
            )
          ] }, step.id);
        })
      }
    );
  }
  function AdaptiveBanner() {
    const action = suggestion == null ? void 0 : suggestion.action;
    if (dismissBanner || !suggestion || action === "continue_") return null;
    const configs = {
      remedialReview: {
        bg: "border-amber-500/30 bg-amber-500/8",
        text: "text-amber-400",
        emoji: "📚",
        label: "Review Recommended",
        message: suggestion.message
      },
      advance: {
        bg: "border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.06)]",
        text: "text-[oklch(0.78_0.22_200)]",
        emoji: "⚡",
        label: "Ready to Advance!",
        message: suggestion.message
      },
      quizNow: {
        bg: "border-[rgba(160,100,255,0.3)] bg-[rgba(160,100,255,0.06)]",
        text: "text-violet-400",
        emoji: "🎯",
        label: "Quiz Time!",
        message: suggestion.message
      }
    };
    const cfg = action ? configs[action] : void 0;
    if (!cfg) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "study.adaptive_banner",
        className: cn(
          "flex items-start gap-3 glass rounded-2xl border px-4 py-3",
          cfg.bg
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl shrink-0", children: cfg.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: cn(
                  "text-xs font-bold uppercase tracking-wide",
                  cfg.text
                ),
                children: cfg.label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/70 mt-0.5 leading-snug", children: cfg.message })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "study.adaptive_banner_dismiss",
              onClick: () => setDismissBanner(true),
              className: "shrink-0 text-foreground/30 hover:text-foreground transition-colors",
              "aria-label": "Dismiss suggestion",
              children: "✕"
            }
          )
        ]
      }
    );
  }
  const inlineCurioPrompts = activeTopic ? [
    (nrveState == null ? void 0 : nrveState.cogtPhase) === "expand" && `What deeper connections can you find between ${activeTopic.title} and another subject?`,
    (nrveState == null ? void 0 : nrveState.cogtPhase) === "synthesize" && `How would you explain ${activeTopic.title} to a younger student?`,
    !nrveState && `What's one thing about ${activeTopic.title} that surprised you?`
  ].filter(Boolean) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "study.page",
      className: "portal-enter flex h-[calc(100vh-4rem)] overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden md:flex w-72 shrink-0 flex-col glass border-r border-[rgba(255,255,255,0.06)] overflow-y-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 glass border-b border-[rgba(255,255,255,0.06)] px-4 py-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                "data-ocid": "study.back_button",
                variant: "ghost",
                size: "sm",
                onClick: () => navigate({ to: "/dashboard" }),
                className: "gap-1.5 -ml-2 mb-3 text-foreground/60 hover:text-foreground",
                type: "button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
                  "Dashboard"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,210,255,0.12)] text-[oklch(0.78_0.22_200)] border border-[rgba(0,210,255,0.2)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-sm leading-tight truncate", children: subjectName }),
                !topicsLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground/40 font-mono", children: [
                  topicCount,
                  " topics"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 px-3 py-3 space-y-1.5", children: topicsLoading || agentsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 p-1", children: [1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 w-full rounded-2xl" }, i)) }) : (topics ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "study.topics_empty_state",
              className: "glass rounded-2xl p-6 text-center mt-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutList, { className: "h-6 w-6 text-foreground/20 mx-auto mb-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/40", children: "No topics yet for this subject." })
              ]
            }
          ) : (topics ?? []).map((topic, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              "data-ocid": `study.topic_item.${idx + 1}`,
              type: "button",
              onClick: () => setActiveTopic(topic),
              className: cn(
                "w-full text-left rounded-2xl border px-3 py-2.5 transition-glass text-sm",
                (activeTopic == null ? void 0 : activeTopic.id) === topic.id ? "glass-portal-student text-[oklch(0.78_0.22_200)]" : "border-transparent glass-sm hover:border-[rgba(255,255,255,0.08)] text-foreground/70 hover:text-foreground"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium leading-snug line-clamp-2", children: topic.title }),
                topic.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground/40 mt-0.5 line-clamp-1", children: topic.description })
              ]
            },
            topic.id
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto bg-background", children: !activeTopic ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "study.welcome_panel",
            className: "flex h-full flex-col items-center justify-center p-8 text-center max-w-md mx-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-2xl glass-portal-student text-[oklch(0.78_0.22_200)] mb-5 glow-student", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-8 w-8" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground mb-2", children: subjectName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] text-[oklch(0.78_0.22_200)] font-mono", children: [
                  topicCount,
                  " topic",
                  topicCount !== 1 ? "s" : ""
                ] }),
                grade && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                  "Grade ",
                  grade
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/50 leading-relaxed", children: "Pick a topic from the sidebar to start learning with your AI guides." }),
              (topics ?? []).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden w-full mt-6 space-y-3", children: (topics ?? []).map((topic, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                TopicCard,
                {
                  topic,
                  index: idx + 1,
                  onStart: (t) => setActiveTopic(t)
                },
                topic.id
              )) })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 py-6 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[13px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSessionMode("workNight"),
                className: `px-[13px] py-[5px] rounded-lg border text-sm transition-all ${sessionMode === "workNight" ? "border-amber-400/70 bg-amber-400/10 text-amber-400" : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"}`,
                children: "Work Night (15 min)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSessionMode("freeAfternoon"),
                className: `px-[13px] py-[5px] rounded-lg border text-sm transition-all ${sessionMode === "freeAfternoon" ? "border-amber-400/70 bg-amber-400/10 text-amber-400" : "border-white/10 bg-white/5 text-white/50 hover:border-white/20"}`,
                children: "Free Afternoon (45 min)"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-white/50 text-xs tabular-nums", children: [
              String(Math.floor(timeLeft / 60)).padStart(2, "0"),
              ":",
              String(timeLeft % 60).padStart(2, "0")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[2px] bg-white/10 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-amber-400/70 rounded-full transition-all",
              style: {
                width: `${timeLeft / (sessionMode === "workNight" ? 900 : 2700) * 100}%`
              }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                "data-ocid": "study.close_topic_button",
                variant: "ghost",
                size: "icon",
                className: "shrink-0 md:hidden",
                onClick: () => setActiveTopic(null),
                type: "button",
                "aria-label": "Go back",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] text-[oklch(0.78_0.22_200)] font-mono", children: subjectName }),
                grade && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
                  "Grade ",
                  grade
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-bold text-foreground leading-snug", children: activeTopic.title }),
              activeTopic.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/50 mt-1 leading-relaxed", children: activeTopic.description })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WorkflowProgress, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NrveStrip, { nrve: nrveState ?? void 0, loading: nrveLoading }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AdaptiveBanner, {}),
          currentIdx > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "study.prev_step_button",
              onClick: () => setCurrentStep(stepOrder[currentIdx - 1]),
              className: "flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
                "Back to ",
                STEPS[currentIdx - 1].label
              ]
            }
          ),
          (currentStep === "lesson" || currentStep === "practice") && inlineCurioPrompts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "study.curio_inline_prompts",
              className: "flex flex-wrap gap-2",
              children: inlineCurioPrompts.map((prompt, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  "data-ocid": `study.curio_prompt.${idx + 1}`,
                  className: "inline-flex items-center gap-1.5 glass-portal-student rounded-full px-3 py-1.5 text-xs text-[oklch(0.78_0.22_200)] border border-[rgba(0,210,255,0.25)]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[8px] font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]/60", children: "CURIO" }),
                    prompt
                  ]
                },
                typeof prompt === "string" ? `curio-${prompt.slice(0, 20)}` : `curio-${idx}`
              ))
            }
          ),
          currentStep === "lesson" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ExplainTab,
              {
                topicTitle: activeTopic.title,
                subject: subjectName,
                grade,
                explainerAgent: explainer,
                onNextStep: () => {
                  fireEcho("click", 1, 0);
                  setCurrentStep("practice");
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/agents/$agentName",
                  params: { agentName: "sage" },
                  search: { topic: activeTopic.title, subject: subjectName },
                  "data-ocid": "study.chat_with_sage_button",
                  className: "inline-flex items-center gap-1.5 text-xs glass-sm rounded-xl border border-[rgba(0,210,255,0.2)] text-[oklch(0.78_0.22_200)] px-3 py-1.5 hover:border-[rgba(0,210,255,0.4)] transition-glass font-medium",
                  children: "🦉 Chat with Sage"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Link,
                {
                  to: "/agents/$agentName",
                  params: { agentName: "spark" },
                  search: { topic: activeTopic.title, subject: subjectName },
                  "data-ocid": "study.get_help_button",
                  className: "inline-flex items-center gap-1.5 text-xs glass-sm rounded-xl border border-[rgba(0,220,130,0.2)] text-[oklch(0.72_0.17_155)] px-3 py-1.5 hover:border-[rgba(0,220,130,0.4)] transition-glass font-medium",
                  children: "⭐ Get encouragement"
                }
              )
            ] })
          ] }),
          currentStep === "practice" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            FreeResponseTab,
            {
              topicTitle: activeTopic.title,
              topicId: activeTopic.id,
              subject: subjectName,
              grade,
              quizmasterAgent: quizmaster,
              encouragerAgent: encourager,
              onNextStep: () => {
                const secs = Math.floor(
                  (Date.now() - questionStartRef.current) / 1e3
                );
                fireEcho("answer", 1, secs);
                setCurrentStep("quiz");
              }
            }
          ),
          currentStep === "quiz" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            cohFlash !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: -8, scale: 0.9 },
                animate: { opacity: 1, y: 0, scale: 1 },
                exit: { opacity: 0 },
                "data-ocid": "study.echo_coh_flash",
                className: "absolute -top-2 right-0 z-10 flex items-center gap-1 glass-portal-student rounded-full px-2.5 py-1 text-xs font-mono font-bold text-[oklch(0.78_0.22_200)]",
                children: [
                  "+",
                  cohFlash,
                  " COH"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MultipleChoiceTab,
              {
                topicTitle: activeTopic.title,
                topicId: activeTopic.id,
                subject: subjectName,
                grade,
                quizmasterAgent: quizmaster,
                encouragerAgent: encourager,
                onNextStep: () => {
                  const secs = Math.floor(
                    (Date.now() - questionStartRef.current) / 1e3
                  );
                  fireEcho("answer", 1, secs);
                  setCurrentStep("review");
                }
              }
            )
          ] }),
          currentStep === "review" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 12 },
              animate: { opacity: 1, y: 0 },
              "data-ocid": "study.review_panel",
              className: "glass-xl rounded-2xl overflow-hidden",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-full bg-gradient-to-r from-[oklch(0.78_0.22_200)] via-violet-500 to-[oklch(0.78_0.22_200)]/40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-2xl glass-portal-student glow-student", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-7 w-7 text-[oklch(0.78_0.22_200)]" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Session Complete!" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/50 mt-1", children: "You finished all three stages for this topic." })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-portal-student rounded-2xl px-4 py-3 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-[oklch(0.78_0.22_200)]", children: activeTopic.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground/40 mt-0.5", children: [
                      subjectName,
                      " · Grade ",
                      grade
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
                    {
                      icon: "📖",
                      label: "Lesson",
                      desc: "Read and understood the concept"
                    },
                    {
                      icon: "✍️",
                      label: "Practice",
                      desc: "Wrote a free response answer"
                    },
                    {
                      icon: "🎯",
                      label: "Quiz",
                      desc: "Answered multiple choice questions"
                    }
                  ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-3 glass-sm rounded-xl border border-[rgba(255,255,255,0.06)] px-3 py-2.5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg shrink-0", children: item.icon }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: item.label }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/40", children: item.desc })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-emerald-400 shrink-0" })
                      ]
                    },
                    item.label
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 glass-sm rounded-xl border border-[rgba(0,210,255,0.2)] px-3 py-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-4 w-4 text-[oklch(0.78_0.22_200)] shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/70", children: "Seal this topic to your Sovereign Passport — yours forever, on-chain." })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "study.review_next_button",
                      onClick: () => setCurrentStep("stamp"),
                      className: "w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] font-bold hover:opacity-90 transition-smooth min-h-[48px]",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4" }),
                        "Seal to Passport"
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FluxStrip, { flux: fluxState ?? void 0, loading: fluxLoading }),
          currentStep === "stamp" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.97 },
              animate: { opacity: 1, scale: 1 },
              "data-ocid": "study.stamp_panel",
              className: "glass-xl rounded-2xl overflow-hidden border-[rgba(245,158,11,0.3)]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500/40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-5 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto w-24 h-24", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-4 border-amber-500/30 animate-pulse" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-2 rounded-full border-2 border-dashed border-amber-500/40" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "✦" }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-amber-400", children: "Topic Mastered!" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground mt-1", children: activeTopic.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground/40 mt-0.5", children: [
                      subjectName,
                      " · Grade ",
                      grade
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-1.5", children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Star,
                    {
                      className: "h-5 w-5 fill-amber-400 text-amber-400"
                    },
                    i
                  )) }),
                  !stampSealed ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/50 leading-relaxed", children: "Seal this achievement to your Sovereign Passport. It's yours forever — on-chain, immutable." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "study.seal_passport_button",
                        onClick: handleSealPassport,
                        disabled: passportData.createPassport.isPending || passportData.isFetchingActor,
                        className: "w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl font-bold transition-all min-h-[48px] disabled:opacity-60 bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-amber-950 shadow-sm",
                        children: passportData.createPassport.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-4 w-4 rounded-full border-2 border-amber-950/30 border-t-amber-950 animate-spin" }),
                          "Sealing…"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-4 w-4" }),
                          passportData.passport ? "✦ Seal to Passport" : "✦ Create Passport & Seal"
                        ] })
                      }
                    )
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, scale: 0.95 },
                      animate: { opacity: 1, scale: 1 },
                      "data-ocid": "study.stamp_success_state",
                      className: "glass rounded-2xl border border-amber-500/30 bg-amber-500/8 px-5 py-4 space-y-1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-5 w-5 text-amber-400" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-amber-400", children: "Sealed to your Passport!" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/40", children: "This achievement is permanently on-chain." })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 text-xs text-foreground/30", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "h-3 w-3" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Session time sealed with this stamp" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "study.stamp_done_button",
                      onClick: () => {
                        setCurrentStep("lesson");
                        setActiveTopic(null);
                      },
                      className: "w-full px-4 py-3 rounded-2xl glass border border-[rgba(255,255,255,0.08)] text-foreground/70 font-medium hover:text-foreground hover:border-[rgba(255,255,255,0.15)] transition-glass min-h-[44px]",
                      children: "Done — Choose Another Topic"
                    }
                  )
                ] })
              ]
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  Study as default
};
