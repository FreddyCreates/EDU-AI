import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { i as createLucideIcon, S as Skeleton, G as GraduationCap, B as BookOpen, a as Award, b as Star, Z as Zap } from "./index-BivnQ6bB.js";
import { u as useAllSubjects } from "./use-curriculum-D8crsBID.js";
import { u as useSession } from "./use-session-DOOtnplD.js";
import { u as useStudent } from "./use-student-czSOKqJy.js";
import { L as Link } from "./router-D6GUppNf.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { C as CircleCheck } from "./circle-check-Bol12715.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import { F as Flame } from "./flame-DBscWOFv.js";
import { C as Clock } from "./clock-DmeOF2sv.js";
import "./query-8urnerR0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode);
const CYAN = "oklch(0.78 0.22 200)";
const WORKFLOW_STEPS = [
  {
    id: 1,
    label: "Lesson",
    icon: BookOpen,
    desc: "Guided concept introduction"
  },
  {
    id: 2,
    label: "Practice",
    icon: Play,
    desc: "Worked examples with feedback"
  },
  {
    id: 3,
    label: "Quiz",
    icon: CircleCheck,
    desc: "Mastery check — Fibonacci scored"
  },
  {
    id: 4,
    label: "Review",
    icon: TrendingUp,
    desc: "COH analysis and gap fill"
  },
  {
    id: 5,
    label: "Stamp",
    icon: Award,
    desc: "Passport stamp sealed to VAULT"
  }
];
const STATIC_RECENT = [
  {
    subjectId: "mathematics",
    subject: "Mathematics",
    topic: "Fibonacci Sequences & Golden Ratio",
    progress: 72,
    lastActive: "Today",
    streak: 8
  },
  {
    subjectId: "science",
    subject: "Science",
    topic: "Cell Structure & Division",
    progress: 55,
    lastActive: "Yesterday",
    streak: 5
  },
  {
    subjectId: "english",
    subject: "English",
    topic: "Narrative Techniques & Voice",
    progress: 88,
    lastActive: "Today",
    streak: 13
  }
];
const STATIC_UPCOMING = [
  {
    subjectId: "mathematics",
    subject: "Mathematics",
    topic: "The Golden Ratio in Geometry",
    eta: "Next",
    seeds: 5
  },
  {
    subjectId: "science",
    subject: "Science",
    topic: "Photosynthesis & Energy Transfer",
    eta: "Soon",
    seeds: 3
  },
  {
    subjectId: "history",
    subject: "History",
    topic: "Ancient Civilizations & Mathematics",
    eta: "Queued",
    seeds: 8
  }
];
const HEATMAP_CELLS = Array.from({ length: 64 }, (_, i) => i);
function StudentLearning() {
  const { profile } = useStudent();
  const {
    sessionCount,
    averageScore,
    isLoading: sessionLoading
  } = useSession();
  const { data: subjects, isLoading: subjectsLoading } = useAllSubjects();
  const gradeDisplay = (profile == null ? void 0 : profile.gradeLevel) ?? "";
  const sessionCountNum = Number(sessionCount);
  const recentItems = STATIC_RECENT.map((item) => {
    const match = (subjects ?? []).find(
      (s) => s.name.toLowerCase().includes(item.subject.toLowerCase())
    );
    return { ...item, subjectId: (match == null ? void 0 : match.id) ?? item.subjectId };
  });
  const upcomingItems = STATIC_UPCOMING.map((item) => {
    const match = (subjects ?? []).find(
      (s) => s.name.toLowerCase().includes(item.subject.toLowerCase())
    );
    return { ...item, subjectId: (match == null ? void 0 : match.id) ?? item.subjectId };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "learning.page",
      className: "portal-enter p-[21px] space-y-[21px]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            className: "glass-portal-student rounded-2xl p-6 relative overflow-hidden",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -top-8 -right-8 h-32 w-32 rounded-full bg-[rgba(0,210,255,0.07)] blur-3xl" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.22_200)] animate-pulse" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] font-bold uppercase tracking-widest text-[oklch(0.78_0.22_200)]", children: "STUDENT OS · LEARNING" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-black text-white/95", children: "My Learning" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        "data-ocid": "learning.visual_learner_badge",
                        className: "glass-subject-pill inline-flex items-center text-xs px-[8px] py-[3px] rounded-full text-teal-400 border border-teal-400/40 bg-teal-400/10 font-mono font-bold",
                        children: "Visual Learner"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/50 mt-1", children: "Active sessions, progress, and upcoming lessons" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  sessionLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-24 rounded-xl" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-max-student rounded-xl px-4 py-2.5 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-black text-white/90", children: sessionCountNum }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] text-[oklch(0.78_0.22_200)] uppercase tracking-widest", children: "Sessions" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl px-4 py-2.5 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-xl font-black text-amber-300", children: [
                      averageScore,
                      "%"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] text-white/40 uppercase tracking-widest", children: "Avg Score" })
                  ] })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3.5 w-3.5", style: { color: CYAN } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] font-bold uppercase tracking-widest text-white/40", children: "Learning Workflow" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-stretch gap-0 overflow-x-auto pb-1", children: WORKFLOW_STEPS.map((step, i) => {
            const Icon = step.icon;
            const isActive = i === 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                "data-ocid": `learning.workflow_step.${step.id}`,
                className: "flex items-center",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: [
                        "flex flex-col items-center gap-1.5 px-3 py-2 rounded-xl transition-smooth min-w-[72px]",
                        isActive ? "bg-[rgba(0,210,255,0.1)] border border-[rgba(0,210,255,0.3)]" : "border border-transparent opacity-50"
                      ].join(" "),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "h-8 w-8 rounded-lg flex items-center justify-center",
                            style: {
                              background: isActive ? "rgba(0,210,255,0.15)" : "rgba(255,255,255,0.04)",
                              border: `1px solid ${isActive ? "rgba(0,210,255,0.4)" : "rgba(255,255,255,0.06)"}`
                            },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Icon,
                              {
                                className: "h-3.5 w-3.5",
                                style: {
                                  color: isActive ? CYAN : "oklch(0.5 0 0)"
                                }
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "font-mono text-[8px] font-bold uppercase tracking-widest leading-none text-center",
                            style: { color: isActive ? CYAN : "oklch(0.45 0 0)" },
                            children: step.label
                          }
                        )
                      ]
                    }
                  ),
                  i < WORKFLOW_STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-px flex-1 min-w-[12px] mx-0.5",
                      style: {
                        background: "linear-gradient(90deg,rgba(0,210,255,0.2),rgba(0,210,255,0.05))"
                      }
                    }
                  )
                ]
              },
              step.id
            );
          }) })
        ] }),
        !subjectsLoading && (subjects ?? []).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
          (subjects ?? []).slice(0, 6).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: i * 0.04 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/study/$subjectId",
                  params: { subjectId: s.id },
                  "data-ocid": `learning.subject_chip.${i + 1}`,
                  className: "inline-flex items-center gap-1.5 glass-sm rounded-full px-3 py-1.5 text-xs font-medium text-white/60 hover:text-[oklch(0.78_0.22_200)] hover:border-[rgba(0,210,255,0.25)] transition-smooth",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-2.5 w-2.5" }),
                    s.name
                  ]
                }
              )
            },
            s.id
          )),
          gradeDisplay && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 glass-sm rounded-full px-3 py-1.5 text-xs font-mono text-[oklch(0.78_0.22_200)]", children: gradeDisplay })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4 text-[oklch(0.78_0.22_200)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-white/40", children: "Continue Learning" })
          ] }),
          sessionLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-2xl" }, i)) }) : recentItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              "data-ocid": `learning.active_card.${i + 1}`,
              initial: { opacity: 0, x: -13 },
              animate: { opacity: 1, x: 0 },
              transition: { delay: i * 0.08 },
              className: "glass-max-student rounded-2xl p-5 flex items-center gap-4 animate-card-slide-in",
              style: { "--stagger": i },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "h-11 w-11 rounded-xl flex items-center justify-center shrink-0",
                    style: {
                      background: "rgba(0,210,255,0.12)",
                      border: "1px solid rgba(0,210,255,0.25)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-5 w-5", style: { color: CYAN } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-white/90", children: item.topic }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40", children: item.subject }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 rounded-full bg-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full rounded-full transition-all duration-700",
                        style: { width: `${item.progress}%`, background: CYAN }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "text-xs font-mono font-bold",
                        style: { color: CYAN },
                        children: [
                          item.progress,
                          "%"
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-1 text-xs",
                      style: { color: CYAN },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3 w-3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                          item.streak,
                          "d"
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-white/30 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-2.5 w-2.5" }),
                    item.lastActive
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: "/study/$subjectId",
                    params: { subjectId: item.subjectId },
                    "data-ocid": `learning.resume_button.${i + 1}`,
                    className: "flex items-center gap-1.5 glass-sm rounded-xl px-3 py-2 text-xs font-medium shrink-0 hover:scale-[1.02] transition-smooth",
                    style: { color: CYAN, borderColor: "rgba(0,210,255,0.25)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3" }),
                      " Resume"
                    ]
                  }
                )
              ]
            },
            `${item.subjectId}-${i}`
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "learning.session_heatmap",
            className: "glass rounded-2xl p-5 space-y-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 text-amber-300" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-white/40", children: "Session History" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-8 gap-[3px]", children: HEATMAP_CELLS.map((cellIndex) => {
                const completed = Math.min(sessionCountNum, 64);
                let cellClass = "w-[13px] h-[13px] rounded-[2px] ";
                if (cellIndex < completed * 0.2) cellClass += "bg-teal-400/80";
                else if (cellIndex < completed * 0.5) cellClass += "bg-teal-400/50";
                else if (cellIndex < completed * 0.8) cellClass += "bg-teal-400/30";
                else if (cellIndex < completed) cellClass += "bg-teal-400/15";
                else cellClass += "bg-white/5";
                return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cellClass }, `heatmap-cell-${cellIndex}`);
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] font-mono text-white/30", children: [
                sessionCountNum,
                " sessions completed"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-4 w-4 text-amber-300" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-white/40", children: "Up Next" })
          ] }),
          upcomingItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              "data-ocid": `learning.upcoming_card.${i + 1}`,
              initial: { opacity: 0, y: 8 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2 + i * 0.07 },
              className: "glass-queued-card rounded-2xl p-4 flex items-center gap-4 hover:border-[rgba(0,210,255,0.2)] transition-glass animate-card-slide-in",
              style: { "--stagger": 3 + i },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-xl flex items-center justify-center shrink-0 bg-white/5 border border-white/8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 text-white/30" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/80 font-medium", children: item.topic }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/40", children: [
                    item.subject,
                    " · ",
                    item.seeds,
                    " seeds queued"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[9px] font-mono font-bold shrink-0 rounded-full px-2.5 py-1",
                    style: {
                      background: "rgba(0,210,255,0.08)",
                      color: CYAN,
                      border: "1px solid rgba(0,210,255,0.2)"
                    },
                    children: item.eta
                  }
                )
              ]
            },
            `upcoming-${item.subjectId}-${i}`
          ))
        ] })
      ]
    }
  );
}
export {
  StudentLearning as default
};
