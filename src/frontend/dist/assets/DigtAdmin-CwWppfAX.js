import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { I as Input } from "./input-dqEl3BdT.js";
import { L as Label } from "./label-CpNG7Eze.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CPBO6QhB.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-UfjkpTob.js";
import { T as Textarea } from "./textarea-B0lupW8l.js";
import { f as useActor, h as createActor, B as BookOpen, Z as Zap, u as ue, k as Shield } from "./index-BivnQ6bB.js";
import { a as useQuery, b as useMutation } from "./query-8urnerR0.js";
import { B as Brain } from "./brain-BiTGGu73.js";
import { F as FlaskConical } from "./flask-conical-CotWXcIT.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { C as CircleCheck } from "./circle-check-Bol12715.js";
import { L as LockOpen } from "./lock-open-Cxga3NlH.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import { C as CircleHelp } from "./circle-help-BfQc4jJ-.js";
import "./index-Ctl2T3XX.js";
import "./index-Dc3cfdi4.js";
import "./index-Dla_9Jug.js";
import "./index-BXiroDnN.js";
import "./index-D7KnjD29.js";
import "./index-DstPCoQp.js";
import "./index-DD4zw4TC.js";
import "./chevron-down-B2BSsDRF.js";
import "./chevron-up-BZKIp_lu.js";
import "./index-BfPMFYr5.js";
import "./router-D6GUppNf.js";
function useDigtStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["digt-stats"],
    queryFn: async () => {
      if (!actor)
        return {
          totalInputs: 0n,
          totalConcepts: 0n,
          totalQuizSeeds: 0n,
          subjectsDigested: []
        };
      return actor.getDigtStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 8e3
    // F(6)s
  });
}
function useConceptsByGrade(grade) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["concepts-grade", grade],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getConceptsByGrade(BigInt(grade));
    },
    enabled: !!actor && !isFetching && grade > 0,
    refetchInterval: 13e3
    // F(7)s
  });
}
function useQuizSeedsByGrade(grade) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["quiz-seeds-grade", grade],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getQuizSeedsByGrade(BigInt(grade));
    },
    enabled: !!actor && !isFetching && grade > 0
  });
}
function useDigestTextbook() {
  const { actor } = useActor(createActor);
  return useMutation({
    mutationFn: async ({ title, gradeLevel, subject, rawText }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.digestTextbook(title, BigInt(gradeLevel), subject, rawText);
    }
  });
}
function useGvltStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["gvlt-stats"],
    queryFn: async () => {
      if (!actor)
        return { totalEntries: 0n, totalBlocked: 0n, totalAllowed: 0n };
      return actor.getGvltStats();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 8e3
  });
}
function useCheckGradeAccess(studentGrade, contentGrade) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["grade-access", studentGrade, contentGrade],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.checkGradeAccess(BigInt(studentGrade), BigInt(contentGrade));
    },
    enabled: !!actor && !isFetching && studentGrade > 0 && contentGrade > 0
  });
}
const SUBJECTS = [
  "Mathematics",
  "Science",
  "Language Arts",
  "Social Studies",
  "Reading",
  "Writing",
  "History",
  "Geography",
  "Art",
  "Music",
  "Physical Education",
  "Computer Science"
];
const GRADES = Array.from({ length: 12 }, (_, i) => i + 1);
const VIOLET = "oklch(0.72 0.20 290)";
const VIOLET_GLOW = "rgba(140,80,255,0.18)";
const VIOLET_BORDER = "rgba(140,80,255,0.25)";
function StatTile({
  label,
  value,
  icon: Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass rounded-xl p-4 flex items-center gap-3",
      style: { border: `1px solid ${VIOLET_BORDER}` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-9 w-9 rounded-xl flex items-center justify-center shrink-0",
            style: {
              background: "rgba(140,80,255,0.12)",
              border: `1px solid ${VIOLET_BORDER}`
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4", style: { color: VIOLET } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-display font-bold text-foreground leading-none", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: label })
        ] })
      ]
    }
  );
}
function DigestResultCard({ result }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      className: "glass-xl rounded-2xl p-5 mt-4 relative overflow-hidden",
      style: { border: "1px solid rgba(0,220,130,0.25)" },
      "data-ocid": "digt.result_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,220,130,0.10) 0%, transparent 70%)"
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CircleCheck,
              {
                className: "h-5 w-5",
                style: { color: "oklch(0.72 0.17 155)" }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-display font-bold text-foreground", children: "Digest Complete" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: "ml-auto text-[10px] font-mono px-2 py-0.5 rounded-lg",
                style: {
                  background: "rgba(0,220,130,0.10)",
                  color: "oklch(0.72 0.17 155)",
                  border: "1px solid rgba(0,220,130,0.22)"
                },
                children: [
                  "Grade ",
                  result.gradeLevel.toString()
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] font-mono px-2 py-0.5 rounded-lg",
                style: {
                  background: "rgba(255,255,255,0.06)",
                  color: "oklch(0.55 0.01 260)",
                  border: "1px solid rgba(255,255,255,0.08)"
                },
                children: result.subject
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mb-3", children: [
            { label: "Concepts", value: result.conceptsExtracted.toString() },
            {
              label: "Quiz Seeds",
              value: result.quizSeedsGenerated.toString()
            },
            { label: "Examples", value: result.workedExamplesFound.toString() }
          ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-xl p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: value }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: label })
          ] }, label)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-3.5 w-3.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Processed in F(n)=",
              result.processingCycles.toString(),
              " cycles"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "ml-auto text-xs font-medium",
                style: { color: "oklch(0.72 0.17 155)" },
                children: "Sealed in Grade Vault ✓"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function ConceptCard({
  term,
  definition,
  difficulty,
  subject
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-xl p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 mb-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground flex-1", children: term }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0",
          style: {
            background: "rgba(140,80,255,0.10)",
            color: VIOLET,
            border: `1px solid ${VIOLET_BORDER}`
          },
          children: [
            "F(",
            difficulty.toString(),
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0",
          style: {
            background: "rgba(255,255,255,0.06)",
            color: "oklch(0.55 0.01 260)",
            border: "1px solid rgba(255,255,255,0.08)"
          },
          children: subject
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: definition })
  ] });
}
function QuizSeedCard({
  question,
  answer,
  distractors,
  subject,
  gradeLevel
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-xl p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: question })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium mb-1.5", style: { color: VIOLET }, children: [
      "→ ",
      answer
    ] }),
    distractors.slice(0, 2).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground ml-3", children: [
      "· ",
      d
    ] }, d)),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "text-[10px] font-mono px-1.5 py-0.5 rounded",
          style: {
            background: "rgba(140,80,255,0.10)",
            color: VIOLET,
            border: `1px solid ${VIOLET_BORDER}`
          },
          children: subject
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "text-[10px] font-mono px-1.5 py-0.5 rounded",
          style: {
            background: "rgba(255,255,255,0.06)",
            color: "oklch(0.55 0.01 260)",
            border: "1px solid rgba(255,255,255,0.08)"
          },
          children: [
            "Grade ",
            gradeLevel.toString()
          ]
        }
      )
    ] })
  ] });
}
function GradeVaultExplorer() {
  const [selectedGrade, setSelectedGrade] = reactExports.useState(1);
  const [studentGrade, setStudentGrade] = reactExports.useState("");
  const [contentGrade, setContentGrade] = reactExports.useState("");
  const [checkEnabled, setCheckEnabled] = reactExports.useState(false);
  const { data: concepts, isLoading: conceptsLoading } = useConceptsByGrade(selectedGrade);
  const { data: quizSeeds, isLoading: seedsLoading } = useQuizSeedsByGrade(selectedGrade);
  const { data: gateResult } = useCheckGradeAccess(
    checkEnabled ? Number(studentGrade) : 0,
    checkEnabled ? Number(contentGrade) : 0
  );
  const inputStyle = {
    background: "rgba(12,14,28,0.80)",
    borderColor: VIOLET_BORDER,
    backdropFilter: "blur(8px)"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono tracking-[0.2em] text-muted-foreground uppercase mb-2", children: "Select Grade Level" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", "data-ocid": "digt.grade_selector", children: GRADES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setSelectedGrade(g),
          "data-ocid": `digt.grade_button.${g}`,
          className: "h-9 w-9 rounded-xl text-sm font-bold transition-smooth",
          style: selectedGrade === g ? {
            background: "rgba(140,80,255,0.25)",
            color: VIOLET,
            border: `1px solid ${VIOLET_BORDER}`,
            boxShadow: `0 0 12px ${VIOLET_GLOW}`
          } : {
            background: "rgba(255,255,255,0.04)",
            color: "oklch(0.55 0.01 260)",
            border: "1px solid rgba(255,255,255,0.06)"
          },
          children: g
        },
        g
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4", style: { color: VIOLET } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground", children: [
          "Concepts — Grade ",
          selectedGrade
        ] }),
        concepts && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "ml-auto text-[10px] font-mono px-2 py-0.5 rounded",
            style: {
              background: "rgba(140,80,255,0.10)",
              color: VIOLET,
              border: `1px solid ${VIOLET_BORDER}`
            },
            children: [
              concepts.length,
              " total"
            ]
          }
        )
      ] }),
      conceptsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-sm rounded-xl h-16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-sm rounded-xl h-16" })
      ] }) : concepts && concepts.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "digt.concepts_list", children: concepts.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": `digt.concept.${i + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ConceptCard,
        {
          term: c.term,
          definition: c.definition,
          difficulty: c.difficulty,
          subject: c.subject
        }
      ) }, c.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-sm rounded-xl p-6 text-center",
          style: { border: `2px dashed ${VIOLET_BORDER}` },
          "data-ocid": "digt.concepts_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-6 w-6 mx-auto mb-2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "No concepts for Grade ",
              selectedGrade,
              " yet."
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-4 w-4", style: { color: VIOLET } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground", children: [
          "Quiz Seeds — Grade ",
          selectedGrade
        ] }),
        quizSeeds && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "ml-auto text-[10px] font-mono px-2 py-0.5 rounded",
            style: {
              background: "rgba(140,80,255,0.10)",
              color: VIOLET,
              border: `1px solid ${VIOLET_BORDER}`
            },
            children: [
              quizSeeds.length,
              " seeds"
            ]
          }
        )
      ] }),
      seedsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-sm rounded-xl h-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-sm rounded-xl h-20" })
      ] }) : quizSeeds && quizSeeds.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "digt.quiz_seeds_list", children: quizSeeds.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": `digt.quiz_seed.${i + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        QuizSeedCard,
        {
          question: s.question,
          answer: s.answer,
          distractors: s.distractors,
          subject: s.subject,
          gradeLevel: s.gradeLevel
        }
      ) }, s.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-sm rounded-xl p-6 text-center",
          style: { border: `2px dashed ${VIOLET_BORDER}` },
          "data-ocid": "digt.seeds_empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "h-6 w-6 mx-auto mb-2 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "No quiz seeds for Grade ",
              selectedGrade,
              " yet."
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-xl rounded-2xl p-5 space-y-3",
        style: { border: `1px solid ${VIOLET_BORDER}` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4", style: { color: VIOLET } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-semibold text-foreground", children: "Grade Gate Checker" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", htmlFor: "student-grade-input", children: "Student Grade" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "student-grade-input",
                  type: "number",
                  min: 1,
                  max: 12,
                  placeholder: "e.g. 6",
                  value: studentGrade,
                  onChange: (e) => {
                    setStudentGrade(e.target.value);
                    setCheckEnabled(false);
                  },
                  "data-ocid": "digt.gate_student_grade_input",
                  className: "w-full rounded-xl border px-3 py-2 text-sm focus:outline-none",
                  style: inputStyle
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", htmlFor: "content-grade-input", children: "Content Grade" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "content-grade-input",
                  type: "number",
                  min: 1,
                  max: 12,
                  placeholder: "e.g. 8",
                  value: contentGrade,
                  onChange: (e) => {
                    setContentGrade(e.target.value);
                    setCheckEnabled(false);
                  },
                  "data-ocid": "digt.gate_content_grade_input",
                  className: "w-full rounded-xl border px-3 py-2 text-sm focus:outline-none",
                  style: inputStyle
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "w-full flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-mono font-bold transition-smooth",
              onClick: () => setCheckEnabled(true),
              disabled: !studentGrade || !contentGrade || Number(studentGrade) < 1 || Number(contentGrade) < 1,
              "data-ocid": "digt.gate_check_button",
              style: {
                background: "rgba(140,80,255,0.18)",
                color: VIOLET,
                border: `1px solid ${VIOLET_BORDER}`,
                boxShadow: `0 0 20px ${VIOLET_GLOW}`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-3.5 w-3.5" }),
                " Check Access"
              ]
            }
          ),
          checkEnabled && gateResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-sm rounded-xl p-3 flex items-start gap-2.5",
              style: {
                border: gateResult.allowed ? "1px solid rgba(0,220,130,0.25)" : "1px solid rgba(255,80,80,0.25)"
              },
              "data-ocid": "digt.gate_result",
              children: [
                gateResult.allowed ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  LockOpen,
                  {
                    className: "h-4 w-4 shrink-0 mt-0.5",
                    style: { color: "oklch(0.72 0.17 155)" }
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Lock,
                  {
                    className: "h-4 w-4 shrink-0 mt-0.5",
                    style: { color: "oklch(0.65 0.22 22)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-sm font-semibold",
                      style: {
                        color: gateResult.allowed ? "oklch(0.72 0.17 155)" : "oklch(0.65 0.22 22)"
                      },
                      children: gateResult.allowed ? "Access Allowed" : "Access Blocked"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: gateResult.reason }),
                  !gateResult.allowed && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    "Locked until Grade ",
                    gateResult.requestedGrade.toString()
                  ] })
                ] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DigtAdmin() {
  var _a, _b, _c, _d, _e, _f, _g;
  const { data: digtStats, isLoading: digtLoading } = useDigtStats();
  const { data: gvltStats, isLoading: gvltLoading } = useGvltStats();
  const digestMutation = useDigestTextbook();
  const [title, setTitle] = reactExports.useState("");
  const [gradeLevel, setGradeLevel] = reactExports.useState("");
  const [subject, setSubject] = reactExports.useState("");
  const [rawText, setRawText] = reactExports.useState("");
  const [lastResult, setLastResult] = reactExports.useState(null);
  const handleDigest = async () => {
    if (!title || !gradeLevel || !subject || !rawText.trim()) {
      ue.error("All fields required before digesting.");
      return;
    }
    try {
      const result = await digestMutation.mutateAsync({
        title,
        gradeLevel: Number(gradeLevel),
        subject,
        rawText
      });
      setLastResult(result);
      ue.success("Curriculum digested and sealed in Grade Vault.");
    } catch {
      ue.error("DIGT engine error — check system diagnostics.");
    }
  };
  const inputStyle = {
    background: "rgba(12,14,28,0.80)",
    backdropFilter: "blur(8px)"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass-xl rounded-3xl p-8 relative overflow-hidden glass-shimmer",
        style: { border: `1px solid ${VIOLET_BORDER}` },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 pointer-events-none",
              style: {
                background: "radial-gradient(ellipse 70% 60% at 80% -10%, rgba(140,80,255,0.14) 0%, transparent 70%)"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase", children: "EduAI · DIGT" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "text-3xl font-display font-black tracking-tight mt-1",
                  style: {
                    color: VIOLET,
                    textShadow: `0 0 32px ${VIOLET_GLOW}`
                  },
                  children: "DIGT ENGINE"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Curriculum Extraction · Grade Vault · LEX_SVRN enforced" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-mono text-[10px] px-3 py-1.5 rounded-xl shrink-0",
                style: {
                  background: "rgba(0,220,130,0.10)",
                  color: "oklch(0.72 0.17 155)",
                  border: "1px solid rgba(0,220,130,0.22)"
                },
                "data-ocid": "digt.status_badge",
                children: "● DIGT ACTIVE"
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
        "data-ocid": "digt.stats_section",
        children: digtLoading ? ["sk-a", "sk-b", "sk-c", "sk-d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-sm rounded-xl h-16" }, k)) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatTile,
            {
              label: "Total Inputs",
              value: ((_a = digtStats == null ? void 0 : digtStats.totalInputs) == null ? void 0 : _a.toString()) ?? "0",
              icon: BookOpen
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatTile,
            {
              label: "Concepts Extracted",
              value: ((_b = digtStats == null ? void 0 : digtStats.totalConcepts) == null ? void 0 : _b.toString()) ?? "0",
              icon: Brain
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatTile,
            {
              label: "Quiz Seeds",
              value: ((_c = digtStats == null ? void 0 : digtStats.totalQuizSeeds) == null ? void 0 : _c.toString()) ?? "0",
              icon: FlaskConical
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatTile,
            {
              label: "Subjects Digested",
              value: ((_d = digtStats == null ? void 0 : digtStats.subjectsDigested) == null ? void 0 : _d.length) ?? 0,
              icon: Zap
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-3 gap-3",
        "data-ocid": "digt.gvlt_stats_section",
        children: gvltLoading ? ["sk-a", "sk-b", "sk-c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-sm rounded-xl h-14" }, k)) : [
          {
            label: "GVLT Entries",
            value: ((_e = gvltStats == null ? void 0 : gvltStats.totalEntries) == null ? void 0 : _e.toString()) ?? "0",
            color: VIOLET,
            bg: "rgba(140,80,255,0.08)",
            bdr: VIOLET_BORDER
          },
          {
            label: "Blocked",
            value: ((_f = gvltStats == null ? void 0 : gvltStats.totalBlocked) == null ? void 0 : _f.toString()) ?? "0",
            color: "oklch(0.65 0.22 22)",
            bg: "rgba(255,80,80,0.08)",
            bdr: "rgba(255,80,80,0.20)"
          },
          {
            label: "Allowed",
            value: ((_g = gvltStats == null ? void 0 : gvltStats.totalAllowed) == null ? void 0 : _g.toString()) ?? "0",
            color: "oklch(0.72 0.17 155)",
            bg: "rgba(0,220,130,0.08)",
            bdr: "rgba(0,220,130,0.20)"
          }
        ].map(({ label, value, color, bg, bdr }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-sm rounded-xl p-3 text-center",
            style: { border: `1px solid ${bdr}`, background: bg },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold", style: { color }, children: value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: label })
            ]
          },
          label
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "digest", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TabsList,
        {
          className: "w-full grid grid-cols-3 glass-sm rounded-xl p-1",
          style: { border: `1px solid ${VIOLET_BORDER}` },
          "data-ocid": "digt.tabs",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "digest", "data-ocid": "digt.digest_tab", children: "Digest Textbook" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "vault", "data-ocid": "digt.vault_tab", children: "Grade Vault Explorer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TabsTrigger,
              {
                value: "standards",
                className: "text-xs font-mono",
                "data-ocid": "digt.standards_tab",
                children: "Standards"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "digest", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-xl rounded-2xl p-6 space-y-5",
          style: { border: `1px solid ${VIOLET_BORDER}` },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono tracking-widest text-muted-foreground uppercase", children: "Upload Curriculum Material" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "textbook-title",
                  className: "text-xs text-muted-foreground",
                  children: "Textbook / Material Title"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "textbook-title",
                  placeholder: "e.g. Grade 5 Mathematics Chapter 3 — Fractions",
                  value: title,
                  onChange: (e) => setTitle(e.target.value),
                  "data-ocid": "digt.title_input",
                  style: inputStyle
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "grade-select",
                    className: "text-xs text-muted-foreground",
                    children: "Grade Level"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: gradeLevel, onValueChange: setGradeLevel, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "grade-select",
                      "data-ocid": "digt.grade_select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select grade" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: GRADES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(g), children: [
                    "Grade ",
                    g
                  ] }, g)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "subject-select",
                    className: "text-xs text-muted-foreground",
                    children: "Subject"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: subject, onValueChange: setSubject, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SelectTrigger,
                    {
                      id: "subject-select",
                      "data-ocid": "digt.subject_select",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select subject" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: SUBJECTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Label,
                {
                  htmlFor: "raw-text",
                  className: "text-xs text-muted-foreground",
                  children: "Paste Curriculum Text"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "raw-text",
                  placeholder: "Paste the full textbook chapter, curriculum document, or lesson material here. The DIGT engine will extract concepts, vocabulary, quiz seeds, and worked examples automatically.",
                  value: rawText,
                  onChange: (e) => setRawText(e.target.value),
                  className: "min-h-40 font-mono text-sm resize-y rounded-xl",
                  style: {
                    ...inputStyle,
                    border: `2px dashed ${VIOLET_BORDER}`
                  },
                  "data-ocid": "digt.rawtext_textarea"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "w-full flex items-center justify-center gap-2 rounded-xl py-4 font-mono text-sm font-bold transition-smooth",
                onClick: handleDigest,
                disabled: digestMutation.isPending,
                "data-ocid": "digt.submit_button",
                style: {
                  background: digestMutation.isPending ? "rgba(140,80,255,0.10)" : "rgba(140,80,255,0.20)",
                  color: VIOLET,
                  border: `1px solid ${VIOLET_BORDER}`,
                  boxShadow: digestMutation.isPending ? void 0 : `0 0 24px ${VIOLET_GLOW}`
                },
                children: digestMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-pulse", children: "⚡" }),
                  " DIGT engine processing..."
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4" }),
                  " Digest with DIGT"
                ] })
              }
            ),
            digestMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-sm rounded-xl p-3 flex items-center gap-3",
                style: { border: `1px solid ${VIOLET_BORDER}` },
                "data-ocid": "digt.loading_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3, 5, 8].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-1.5 w-1.5 rounded-full",
                      style: {
                        background: VIOLET,
                        animation: "portal-pulse 1.4s ease-in-out infinite",
                        animationDelay: `${f * 0.1}s`
                      }
                    },
                    f
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono", children: "NRVE → MSRY → FLUX routing active — extracting concepts and sealing to Grade Vault..." })
                ]
              }
            ),
            lastResult && !digestMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(DigestResultCard, { result: lastResult })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "vault", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "glass-xl rounded-2xl p-6",
          style: { border: `1px solid ${VIOLET_BORDER}` },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(GradeVaultExplorer, {})
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "standards", className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-emerald-500/30 rounded-xl p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-emerald-400 font-mono text-sm tracking-widest uppercase mb-4", children: "Standards Alignment" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm mb-4", children: "View which curriculum standards have been covered by digested textbook content." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3", children: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((grade) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass border border-white/10 rounded-lg p-3 cursor-pointer hover:border-emerald-500/40 transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/40 text-xs font-mono", children: "GRADE" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white font-bold text-lg", children: grade }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-emerald-400/70", children: "View Standards →" })
            ]
          },
          grade
        )) })
      ] }) })
    ] })
  ] });
}
export {
  DigtAdmin as default
};
