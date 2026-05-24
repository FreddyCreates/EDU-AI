import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { f as useActor, h as createActor, B as BookOpen, G as GraduationCap, c as cn, S as Skeleton } from "./index-BivnQ6bB.js";
import { u as useAllSubjects } from "./use-curriculum-D8crsBID.js";
import { a as useQuery } from "./query-8urnerR0.js";
import { C as ChevronRight } from "./chevron-right-neFioPkE.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import { L as LockOpen } from "./lock-open-Cxga3NlH.js";
import { S as Sparkles } from "./sparkles-C3IEEH24.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./router-D6GUppNf.js";
function useKnowledge(studentGrade, subject, includeRange = false) {
  const { actor, isFetching } = useActor(createActor);
  const enabled = !!actor && !isFetching && !!studentGrade && !!subject;
  const query = {
    studentGrade,
    subject,
    includeGradeRange: includeRange
  };
  return useQuery({
    queryKey: ["knowledge", studentGrade, subject, includeRange],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getKnowledgeByGrade(query);
      return result;
    },
    enabled,
    staleTime: 1e3 * 60 * 10
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
const TEAL = "oklch(0.72 0.16 185)";
function gradeToNum(g) {
  return g === "K" ? 0 : Number.parseInt(g, 10);
}
function StudentKnowledgeBrowser() {
  const studentGrade = "9";
  const studentGradeNum = gradeToNum(studentGrade);
  const urlParams = new URLSearchParams(window.location.search);
  const urlSubject = urlParams.get("subject");
  const [selectedGrade, setSelectedGrade] = reactExports.useState(studentGrade);
  const [selectedSubject, setSelectedSubject] = reactExports.useState("Mathematics");
  const { data: subjects = [] } = useAllSubjects();
  const subjectNames = subjects.length ? subjects.map((s) => s.name) : [
    "Mathematics",
    "Science",
    "English Language Arts",
    "History",
    "Geometry",
    "Biology"
  ];
  reactExports.useEffect(() => {
    if (urlSubject) {
      const match = subjectNames.find(
        (s) => s.toLowerCase() === urlSubject.toLowerCase()
      );
      if (match) setSelectedSubject(match);
    }
  }, [subjectNames, urlSubject]);
  const { data: knowledge = [], isLoading } = useKnowledge(
    selectedGrade,
    selectedSubject,
    false
  );
  const selectedGradeNum = gradeToNum(selectedGrade);
  const isViewingFutureGrade = selectedGradeNum > studentGradeNum;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "portal-enter min-h-screen",
      "data-ocid": "knowledge_browser.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "glass-portal sticky top-0 z-30",
            style: { borderBottom: "1px solid rgba(0,220,200,0.18)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1200px] px-5 py-4 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2 rounded-xl px-3 py-2",
                    style: {
                      background: "linear-gradient(135deg, rgba(0,200,180,0.18) 0%, rgba(0,140,130,0.12) 100%)",
                      border: "1px solid rgba(0,220,200,0.30)"
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4", style: { color: TEAL } }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "font-display font-bold text-sm",
                          style: { color: TEAL, letterSpacing: "0.15em" },
                          children: "KNOWLEDGE VAULT"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-base text-foreground leading-none", children: "Grade-Gated Curriculum Browser" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Sovereign content · GVLT-gated by PHI score" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-lg px-3 py-1.5 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3.5 w-3.5", style: { color: TEAL } }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-foreground", children: [
                  "Grade ",
                  studentGrade
                ] })
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1200px] px-5 py-6 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "glass-knowledge-surface rounded-xl px-4 py-3 overflow-x-auto",
              "data-ocid": "knowledge_browser.breadcrumb",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 min-w-max", children: GRADES.map((g, i) => {
                const gNum = gradeToNum(g);
                const isCurrent = g === studentGrade;
                const isPast = gNum < studentGradeNum;
                const isFuture = gNum > studentGradeNum;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground/40 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `knowledge_browser.breadcrumb_grade.${i + 1}`,
                      onClick: () => setSelectedGrade(g),
                      className: cn(
                        "px-2 py-0.5 rounded text-xs font-mono font-semibold transition-smooth",
                        isCurrent && "rounded-md px-2.5 py-1"
                      ),
                      style: {
                        background: isCurrent ? "rgba(0,200,180,0.22)" : isPast ? "rgba(0,200,180,0.06)" : "transparent",
                        color: isCurrent ? TEAL : isPast ? "oklch(0.65 0.08 185)" : "oklch(0.45 0.04 185)",
                        border: isCurrent ? "1px solid rgba(0,200,180,0.40)" : "1px solid transparent",
                        opacity: isFuture ? 0.45 : 1
                      },
                      title: isFuture ? "Advanced grade — PHI-locked" : `Grade ${g}`,
                      children: g
                    }
                  )
                ] }, g);
              }) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-wrap gap-2",
              "data-ocid": "knowledge_browser.grade_selector",
              children: GRADES.map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `knowledge_browser.grade_tab.${i + 1}`,
                  onClick: () => setSelectedGrade(g),
                  className: cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth border",
                    selectedGrade === g ? "glass-portal text-foreground" : "glass-sm text-muted-foreground border-transparent hover:border-white/10 hover:text-foreground"
                  ),
                  style: selectedGrade === g ? { borderColor: "rgba(0,220,200,0.40)" } : {},
                  children: g === "K" ? "K" : g
                },
                g
              ))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex flex-wrap gap-2",
              "data-ocid": "knowledge_browser.subject_selector",
              children: subjectNames.map((sub, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `knowledge_browser.subject_tab.${i + 1}`,
                  onClick: () => setSelectedSubject(sub),
                  className: cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-smooth border",
                    selectedSubject === sub ? "glass-portal text-foreground" : "glass-sm text-muted-foreground border-transparent hover:border-white/10 hover:text-foreground"
                  ),
                  style: selectedSubject === sub ? { borderColor: "rgba(0,220,200,0.40)" } : {},
                  children: sub
                },
                sub
              ))
            }
          ),
          isViewingFutureGrade && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -5 },
              animate: { opacity: 1, y: 0 },
              className: "glass-knowledge-surface rounded-xl px-5 py-3 flex items-center gap-3",
              style: { border: "1px solid rgba(255,185,0,0.25)" },
              "data-ocid": "knowledge_browser.locked_banner",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 shrink-0", style: { color: TEAL } }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
                    "Grade ",
                    selectedGrade,
                    " is PHI-locked."
                  ] }),
                  " ",
                  "Reach a mastery score of F(10)=55 in Grade ",
                  studentGrade,
                  " to unlock."
                ] })
              ]
            }
          ),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-2xl" }, i)) }) : knowledge.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: knowledge.map((result, ri) => {
            const resultGradeNum = gradeToNum(result.gradeLevel);
            const isLocked = result.lockedForStudent || resultGradeNum > studentGradeNum;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                "data-ocid": `knowledge_browser.result_group.${ri + 1}`,
                initial: { opacity: 0, y: 13 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: ri * 0.08 },
                className: "space-y-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground", children: result.subject }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        className: "font-mono text-xs",
                        style: {
                          background: "rgba(0,200,180,0.12)",
                          borderColor: "rgba(0,200,180,0.28)",
                          color: TEAL
                        },
                        children: [
                          "Grade ",
                          result.gradeLevel
                        ]
                      }
                    ),
                    isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }),
                      " Locked"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex items-center gap-1 text-xs",
                        style: { color: TEAL },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "h-3 w-3" }),
                          " Accessible"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: result.topics.map((topic, ti) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      "data-ocid": `knowledge_browser.topic_card.${ti + 1}`,
                      initial: { opacity: 0, scale: 0.97 },
                      animate: { opacity: 1, scale: 1 },
                      transition: { delay: ti * 0.04 },
                      className: cn(
                        "glass-knowledge-surface rounded-xl p-4 cursor-pointer group hover:scale-[1.01] transition-smooth space-y-2 relative overflow-hidden"
                      ),
                      style: { border: "1px solid rgba(0,200,180,0.12)" },
                      children: [
                        isLocked && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl",
                            style: {
                              background: "rgba(10,10,20,0.65)",
                              backdropFilter: "blur(4px)",
                              border: "1px solid rgba(255,185,0,0.15)"
                            },
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-5 w-5", style: { color: TEAL } }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: "PHI-Locked" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "div",
                          {
                            className: "space-y-2",
                            style: isLocked ? { filter: "blur(3px)", userSelect: "none" } : {},
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                                    Sparkles,
                                    {
                                      className: "h-3.5 w-3.5 shrink-0",
                                      style: { color: TEAL }
                                    }
                                  ),
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground truncate", children: topic.title })
                                ] }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" })
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2", children: topic.description })
                            ]
                          }
                        )
                      ]
                    },
                    topic.id
                  )) })
                ]
              },
              `${result.subject}-${ri}`
            );
          }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-knowledge-surface rounded-2xl p-12 flex flex-col items-center gap-4 text-center",
              "data-ocid": "knowledge_browser.empty_state",
              style: { border: "1px dashed rgba(0,200,180,0.25)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-12 w-12 text-muted-foreground/40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-lg", children: "Select a subject to explore topics for your grade level" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                    "Choose a subject above · Grade ",
                    selectedGrade,
                    " content · GVLT-gated"
                  ] })
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  StudentKnowledgeBrowser as default
};
