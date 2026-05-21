import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { f as useActor, h as createActor, d as useInternetIdentity, G as GraduationCap, L as LogIn, S as Skeleton, B as BookOpen, b as Star, Z as Zap } from "./index-BivnQ6bB.js";
import { u as useAllSubjects, b as useTopicsBySubject } from "./use-curriculum-D8crsBID.js";
import { a as useQuery } from "./query-8urnerR0.js";
import { d as useNavigate } from "./router-D6GUppNf.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { C as CircleCheck } from "./circle-check-Bol12715.js";
import { C as CircleX } from "./circle-x-BLumP_Id.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
function useLessonContent(topicId, gradeLevel, agentRole = "explainer") {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["lessonContent", topicId, gradeLevel, agentRole],
    queryFn: async () => {
      if (!actor || !topicId || !gradeLevel) return null;
      const result = await actor.getLessonContent(
        topicId,
        gradeLevel,
        agentRole
      );
      return result;
    },
    enabled: !!actor && !isFetching && !!topicId && !!gradeLevel,
    staleTime: 5 * 60 * 1e3
  });
}
const GRADES = [
  "K",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12"
];
const SUBJECT_EMOJIS = {
  mathematics: "➗",
  math: "➗",
  science: "🔬",
  english: "📖",
  history: "🏛️",
  geography: "🌍",
  "social studies": "🌍",
  art: "🎨",
  music: "🎵",
  "physical education": "🏃",
  pe: "🏃",
  technology: "💻",
  reading: "📚",
  writing: "✏️"
};
function subjectEmoji(name) {
  const key = name.toLowerCase();
  for (const [k, v] of Object.entries(SUBJECT_EMOJIS)) {
    if (key.includes(k)) return v;
  }
  return "📘";
}
function StepDots({ current }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 mb-6", children: [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `rounded-full transition-smooth ${n === current ? "w-6 h-2.5 bg-[oklch(0.78_0.22_200)] shadow-[0_0_8px_rgba(0,210,255,0.5)]" : n < current ? "w-2.5 h-2.5 bg-[oklch(0.78_0.22_200)]/40" : "w-2.5 h-2.5 bg-[rgba(255,255,255,0.08)]"}`
    },
    n
  )) });
}
function Demo() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useInternetIdentity();
  const [step, setStep] = reactExports.useState(1);
  const [selectedSubject, setSelectedSubject] = reactExports.useState(null);
  const [selectedGrade, setSelectedGrade] = reactExports.useState("5");
  const [selectedTopic, setSelectedTopic] = reactExports.useState(null);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = reactExports.useState(
    null
  );
  const [quizCorrect, setQuizCorrect] = reactExports.useState(false);
  const { data: subjects = [], isLoading: subjectsLoading } = useAllSubjects();
  const { data: topics = [], isLoading: topicsLoading } = useTopicsBySubject(
    (selectedSubject == null ? void 0 : selectedSubject.id) ?? ""
  );
  const topicId = (selectedTopic == null ? void 0 : selectedTopic.id) ?? "";
  const gradeForLesson = selectedGrade === "K" ? "kindergarten" : `grade_${selectedGrade}`;
  const { data: lesson, isLoading: lessonLoading } = useLessonContent(
    topicId,
    gradeForLesson
  );
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-ocid": "demo.auth_gate",
        className: "min-h-screen flex items-center justify-center",
        style: {
          background: "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,210,255,0.12) 0%, transparent 70%), #07090f"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "glass rounded-3xl border border-[rgba(0,210,255,0.18)] p-10 max-w-sm w-full mx-4 text-center space-y-6",
            style: { backdropFilter: "blur(24px)" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(0,210,255,0.12)] border border-[rgba(0,210,255,0.2)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-8 w-8 text-[oklch(0.78_0.22_200)]" }) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground", children: "Internet Identity Required" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/50 leading-relaxed", children: "Please log in with Internet Identity to explore EduAI." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  "data-ocid": "demo.login_button",
                  className: "w-full h-12 rounded-2xl bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] hover:opacity-90 font-bold gap-2 shadow-[0_0_16px_rgba(0,210,255,0.2)]",
                  onClick: () => login(),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-4 w-4" }),
                    "Log in with Internet Identity"
                  ]
                }
              )
            ]
          }
        )
      }
    );
  }
  const correctIndex = 1;
  const quizOptions = lesson ? [
    `${lesson.coreConceptBlock.slice(0, 40).trim()}…`,
    lesson.practicePrompt.split(" ").slice(0, 8).join(" "),
    `${lesson.introduction.slice(0, 40).trim()}…`,
    `${lesson.expansionBlock.slice(0, 35).trim()}…`
  ] : [];
  function handleCheckAnswer() {
    if (selectedAnswerIdx === null) return;
    setQuizCorrect(selectedAnswerIdx === correctIndex);
    setStep(5);
  }
  function resetDemo() {
    setStep(1);
    setSelectedSubject(null);
    setSelectedTopic(null);
    setSelectedAnswerIdx(null);
    setQuizCorrect(false);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "demo.page", className: "portal-enter min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-20 glass border-b border-[rgba(255,255,255,0.06)] px-4 py-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-xl bg-[rgba(0,210,255,0.12)] border border-[rgba(0,210,255,0.2)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-4 w-4 text-[oklch(0.78_0.22_200)]" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-sm", children: "EduAI Demo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          "data-ocid": "demo.exit_button",
          variant: "outline",
          size: "sm",
          onClick: () => navigate({ to: "/dashboard" }),
          className: "gap-1.5 border-[rgba(255,255,255,0.1)] text-foreground/60 hover:text-foreground rounded-xl",
          type: "button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-3.5 w-3.5" }),
            "Exit Demo"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -4 },
        animate: { opacity: 1, y: 0 },
        className: "glass-portal-student border-b border-[rgba(0,210,255,0.15)] px-4 py-2.5 text-center",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono font-bold text-[oklch(0.78_0.22_200)]", children: "DEMO MODE · Live sovereign intelligence preview · Sign in to save progress" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl px-4 sm:px-6 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StepDots, { current: step }),
      step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          "data-ocid": "demo.step1_section",
          className: "space-y-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground", children: "Pick a subject to explore" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/40 text-sm font-mono", children: "Choose any subject below to get started." })
            ] }),
            subjectsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl" }, i)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: subjects.map((subject, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `demo.subject_card.${idx + 1}`,
                onClick: () => {
                  setSelectedSubject(subject);
                  setSelectedTopic(null);
                  setStep(2);
                },
                className: "flex flex-col items-center gap-2 p-4 glass rounded-2xl border border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,210,255,0.25)] hover:bg-[rgba(0,210,255,0.04)] transition-glass cursor-pointer text-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: subjectEmoji(subject.name) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground/80 leading-tight", children: subject.name })
                ]
              },
              subject.id
            )) })
          ]
        }
      ),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          "data-ocid": "demo.step2_section",
          className: "space-y-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setStep(1),
                className: "text-xs text-foreground/30 hover:text-foreground transition-colors flex items-center gap-1 font-mono",
                children: "← Back"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: subjectEmoji((selectedSubject == null ? void 0 : selectedSubject.name) ?? "") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] text-[oklch(0.78_0.22_200)] font-mono", children: selectedSubject == null ? void 0 : selectedSubject.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl sm:text-3xl font-bold text-foreground", children: "What grade are you in?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center", children: GRADES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `demo.grade_btn.${g.toLowerCase()}`,
                onClick: () => setSelectedGrade(g),
                className: `min-w-[44px] h-11 px-3 rounded-2xl border text-sm font-bold font-mono transition-glass ${selectedGrade === g ? "border-[rgba(0,210,255,0.4)] bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] shadow-[0_0_12px_rgba(0,210,255,0.3)]" : "glass border-[rgba(255,255,255,0.08)] text-foreground/60 hover:border-[rgba(0,210,255,0.2)] hover:text-foreground"}`,
                children: g
              },
              g
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                "data-ocid": "demo.grade_continue_button",
                className: "w-full h-12 rounded-2xl bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] hover:opacity-90 font-bold shadow-[0_0_16px_rgba(0,210,255,0.2)]",
                onClick: () => setStep(3),
                children: "Continue →"
              }
            )
          ]
        }
      ),
      step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          "data-ocid": "demo.step3_section",
          className: "space-y-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setStep(2),
                className: "text-xs text-foreground/30 hover:text-foreground transition-colors flex items-center gap-1 font-mono",
                children: "← Back"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Choose a topic" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground/40 text-sm font-mono", children: [
                selectedSubject == null ? void 0 : selectedSubject.name,
                " · Grade ",
                selectedGrade
              ] })
            ] }),
            topicsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-2xl" }, i)) }) : topics.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": "demo.topics.empty_state",
                className: "text-center py-10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-8 h-8 mx-auto mb-3 text-foreground/20" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/40", children: "No topics available for this selection." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      className: "mt-4 border-[rgba(255,255,255,0.1)] text-foreground/50 rounded-xl",
                      onClick: () => setStep(2),
                      children: "Change grade"
                    }
                  )
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "demo.topics_list", children: topics.map((topic, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": `demo.topic_item.${idx + 1}`,
                onClick: () => {
                  setSelectedTopic(topic);
                  setSelectedAnswerIdx(null);
                  setStep(4);
                },
                className: "w-full flex items-center justify-between gap-3 px-4 py-3.5 glass rounded-2xl border border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,210,255,0.25)] hover:bg-[rgba(0,210,255,0.04)] transition-glass text-left group",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground/80", children: topic.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/25 group-hover:text-[oklch(0.78_0.22_200)] transition-colors shrink-0 font-mono", children: "Start →" })
                ]
              },
              topic.id
            )) })
          ]
        }
      ),
      step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          "data-ocid": "demo.step4_section",
          className: "space-y-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setStep(3),
                className: "text-xs text-foreground/30 hover:text-foreground transition-colors flex items-center gap-1 font-mono",
                children: "← Back"
              }
            ),
            lessonLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-2/3 rounded-xl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-2xl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-2xl" })
            ] }) : lesson ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] text-[oklch(0.78_0.22_200)] font-mono", children: selectedSubject == null ? void 0 : selectedSubject.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-xs border-[rgba(255,255,255,0.1)] text-foreground/40 font-mono",
                      children: [
                        "Grade ",
                        selectedGrade
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: lesson.title })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-4 space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono font-bold text-foreground/30 uppercase tracking-widest", children: "Introduction" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/70 leading-relaxed", children: lesson.introduction })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-portal-student rounded-2xl p-4 space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono font-bold text-[oklch(0.78_0.22_200)] uppercase tracking-widest", children: "Core · 38.2%" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: lesson.coreConceptBlock })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-xl rounded-2xl p-5 space-y-4",
                  "data-ocid": "demo.quiz_card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono font-bold text-foreground/30 uppercase tracking-widest", children: "Quick Check" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-base", children: lesson.practicePrompt }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: quizOptions.map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        "data-ocid": `demo.quiz_option.${i + 1}`,
                        className: `flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-glass ${selectedAnswerIdx === i ? "glass-portal-student border-[rgba(0,210,255,0.4)]" : "glass-sm border-[rgba(255,255,255,0.06)] hover:border-[rgba(0,210,255,0.2)]"}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              type: "radio",
                              name: "demo-quiz",
                              value: i,
                              checked: selectedAnswerIdx === i,
                              onChange: () => setSelectedAnswerIdx(i),
                              className: "accent-[oklch(0.78_0.22_200)]"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: `text-sm ${selectedAnswerIdx === i ? "text-foreground" : "text-foreground/60"}`,
                              children: opt
                            }
                          )
                        ]
                      },
                      opt
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        "data-ocid": "demo.check_answer_button",
                        disabled: selectedAnswerIdx === null,
                        className: "w-full h-12 rounded-2xl bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] hover:opacity-90 font-bold disabled:opacity-30",
                        onClick: handleCheckAnswer,
                        children: "Check Answer"
                      }
                    )
                  ]
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/40", children: "Unable to load lesson. Try a different topic." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  className: "mt-4 border-[rgba(255,255,255,0.1)] text-foreground/50 rounded-xl",
                  onClick: () => setStep(3),
                  children: "Back to topics"
                }
              )
            ] })
          ]
        }
      ),
      step === 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.section,
        {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
          "data-ocid": "demo.step5_section",
          className: "space-y-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `glass-xl rounded-2xl p-6 text-center space-y-3 border ${quizCorrect ? "border-emerald-500/30" : "border-amber-500/30"}`,
                "data-ocid": quizCorrect ? "demo.quiz_correct_state" : "demo.quiz_incorrect_state",
                children: [
                  quizCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-emerald-400 mx-auto" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-10 h-10 text-amber-400 mx-auto" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground", children: quizCorrect ? "Correct!" : "Not quite" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/50 leading-relaxed", children: quizCorrect ? (lesson == null ? void 0 : lesson.reviewSummary) ?? "Great job! You understood this concept well." : "Keep going — every attempt builds understanding." })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-portal-student glass-shimmer rounded-2xl p-5 space-y-3",
                "data-ocid": "demo.passport_seed_preview",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 text-[oklch(0.78_0.22_200)]" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono font-bold text-[oklch(0.78_0.22_200)] uppercase tracking-widest", children: "Passport Seed Preview" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                      selectedSubject == null ? void 0 : selectedSubject.name,
                      " · Grade ",
                      selectedGrade
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-xs border-[rgba(0,210,255,0.3)] bg-[rgba(0,210,255,0.08)] text-[oklch(0.78_0.22_200)] font-mono", children: "Engine: Synthesis" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "outline",
                          className: "text-xs border-[rgba(255,255,255,0.1)] text-foreground/40 font-mono",
                          children: "Demo Seed"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/30 mt-1 font-mono", children: "Sign in to permanently seal this lesson seed to your passport." })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-foreground/40", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-[oklch(0.78_0.22_200)]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-[oklch(0.78_0.22_200)]", children: "Sign in to unlock the full sovereign experience" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/30", children: "Adaptive AI, progress tracking, Fibonacci mastery floors, and a permanent learning passport." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  "data-ocid": "demo.try_another_button",
                  className: "flex-1 rounded-2xl border-[rgba(255,255,255,0.1)] text-foreground/60 hover:text-foreground h-12",
                  onClick: resetDemo,
                  children: "Try another topic"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  "data-ocid": "demo.signin_button",
                  className: "flex-1 gap-1.5 rounded-2xl bg-[oklch(0.78_0.22_200)] text-[oklch(0.07_0.01_260)] hover:opacity-90 font-bold h-12 shadow-[0_0_16px_rgba(0,210,255,0.2)]",
                  onClick: () => navigate({ to: "/dashboard" }),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                    "Sign in to save progress"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  Demo as default
};
