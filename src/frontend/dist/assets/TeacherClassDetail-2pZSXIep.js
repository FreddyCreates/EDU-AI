import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { S as ScrollArea } from "./scroll-area-CarfRcuH.js";
import { S as Skeleton, U as Users, B as BookOpen, b as Star, g as Activity, c as cn, C as Cpu, Z as Zap } from "./index-BivnQ6bB.js";
import { a as useClassDetail } from "./use-grade-metrics-Bpk7MeAS.js";
import { u as useTeacherRecommendations } from "./use-tchr-C8OkG62o.js";
import { e as useParams, L as Link } from "./router-D6GUppNf.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import { T as TriangleAlert } from "./triangle-alert-DEqO8oET.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { C as Clock } from "./clock-DmeOF2sv.js";
import { G as Grid3x3 } from "./grid-3x3-D0uXXAyN.js";
import { B as Brain } from "./brain-BiTGGu73.js";
import { S as Sparkles } from "./sparkles-C3IEEH24.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./index-Dla_9Jug.js";
import "./index-BfPMFYr5.js";
import "./index-D7KnjD29.js";
import "./index-Dc3cfdi4.js";
import "./query-8urnerR0.js";
const HEATMAP_SUBJECTS = [
  "Math",
  "Sci",
  "ELA",
  "Social",
  "Hist",
  "Geo",
  "Art",
  "Music",
  "PE",
  "CS",
  "Lang",
  "Health"
];
const DEMO_STUDENTS = [
  {
    studentId: "s001",
    name: "Maya Chen",
    masteryScore: 0.89,
    currentTopic: "Quadratic Equations",
    lastActive: "2h ago",
    streak: 7,
    scores: [89, 76, 92, 55, 68, 81, 77, 90, 85, 72, 60, 88]
  },
  {
    studentId: "s002",
    name: "James Park",
    masteryScore: 0.34,
    currentTopic: "Fractions & Decimals",
    lastActive: "5h ago",
    streak: 2,
    scores: [34, 55, 44, 21, 38, 55, 42, 67, 78, 34, 25, 44]
  },
  {
    studentId: "s003",
    name: "Sofia Reyes",
    masteryScore: 0.95,
    currentTopic: "Advanced Calculus",
    lastActive: "1h ago",
    streak: 21,
    scores: [95, 88, 97, 82, 91, 89, 96, 84, 90, 95, 87, 93]
  },
  {
    studentId: "s004",
    name: "Ethan Brooks",
    masteryScore: 0.12,
    currentTopic: "Basic Arithmetic",
    lastActive: "3d ago",
    streak: 0,
    scores: [12, 21, 18, 8, 13, 21, 15, 34, 55, 13, 8, 21]
  },
  {
    studentId: "s005",
    name: "Amara Diallo",
    masteryScore: 0.67,
    currentTopic: "Linear Algebra",
    lastActive: "4h ago",
    streak: 5,
    scores: [67, 72, 78, 55, 63, 70, 69, 80, 74, 66, 58, 75]
  },
  {
    studentId: "s006",
    name: "Leo Nakamura",
    masteryScore: 0.78,
    currentTopic: "Geometry Proofs",
    lastActive: "30m ago",
    streak: 13,
    scores: [78, 81, 85, 70, 75, 82, 79, 88, 83, 76, 71, 80]
  }
];
const DEMO_ACTIVITY = [
  {
    studentName: "Maya Chen",
    action: "completed quiz · Quadratic Equations",
    score: 0.92,
    timestamp: "2 minutes ago"
  },
  {
    studentName: "Leo Nakamura",
    action: "reviewed lesson · Geometry Proofs",
    score: 0.85,
    timestamp: "14 minutes ago"
  },
  {
    studentName: "Sofia Reyes",
    action: "sealed session · Advanced Calculus",
    score: 0.97,
    timestamp: "47 minutes ago"
  },
  {
    studentName: "Amara Diallo",
    action: "completed practice · Linear Algebra",
    score: 0.73,
    timestamp: "1 hour ago"
  },
  {
    studentName: "James Park",
    action: "reviewed lesson · Fractions",
    score: 0.55,
    timestamp: "2 hours ago"
  },
  {
    studentName: "Ethan Brooks",
    action: "started lesson · Basic Arithmetic",
    score: 0.21,
    timestamp: "3 days ago"
  }
];
function heatColor(score) {
  if (score > 55)
    return "bg-emerald-500/25 text-emerald-300 border-emerald-500/30";
  if (score > 20) return "bg-amber-500/25 text-amber-300 border-amber-500/30";
  if (score > 0) return "bg-red-500/25 text-red-300 border-red-500/30";
  return "bg-muted/30 text-muted-foreground border-border";
}
function urgencyColor(level) {
  if (level === "critical")
    return "bg-red-500/20 border-red-500/40 text-red-300";
  if (level === "high")
    return "bg-amber-500/20 border-amber-500/40 text-amber-300";
  return "bg-violet-500/20 border-violet-500/40 text-violet-300";
}
function LiveDot() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-flex h-2 w-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full opacity-60 bg-violet-400" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-violet-400" })
  ] });
}
function TeacherClassDetail() {
  const { classId } = useParams({ from: "/teacher/class/$classId" });
  const { data: cls, isLoading, isError } = useClassDetail(classId ?? "");
  const { data: recs = [], isLoading: recsLoading } = useTeacherRecommendations(
    classId ?? ""
  );
  const [showHeatmap, setShowHeatmap] = reactExports.useState(true);
  const students = (cls == null ? void 0 : cls.students) && cls.students.length > 0 ? cls.students.map((s) => ({
    studentId: s.studentId,
    name: s.name,
    masteryScore: s.masteryScore,
    currentTopic: s.currentTopic,
    lastActive: "Recently",
    streak: 0,
    scores: HEATMAP_SUBJECTS.map(
      () => Math.round(s.masteryScore * 100 * (0.7 + Math.random() * 0.6))
    )
  })) : DEMO_STUDENTS;
  const needsAttention = (students ?? []).filter(
    (s) => Number(s.masteryScore ?? 0) < 0.2
  );
  const activity = (cls == null ? void 0 : cls.recentActivity) && cls.recentActivity.length > 0 ? cls.recentActivity.map((a) => ({
    studentName: a.studentName,
    action: a.action,
    score: a.score,
    timestamp: String(Number(a.timestamp))
  })) : DEMO_ACTIVITY;
  const avgMastery = students.reduce((sum, s) => sum + s.masteryScore, 0) / Math.max(students.length, 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "portal-enter min-h-screen", "data-ocid": "class-detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-portal-teacher glass-shimmer sticky top-0 z-30",
        style: { borderBottom: "1px solid rgba(160,100,255,0.18)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[1400px] px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/teacher/classes", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "glass-sm rounded-xl p-2.5 hover:glass-portal-teacher transition-smooth",
                "aria-label": "Back to classes",
                "data-ocid": "class-detail.back_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 text-violet-300" })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-48 mb-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-lg text-foreground leading-tight", children: (cls == null ? void 0 : cls.className) ?? "Class Detail" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                (cls == null ? void 0 : cls.subject) ?? "",
                cls ? ` · Grade ${Number(cls.grade)} · ${students.length} students` : ""
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-lg px-3 py-1.5 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5 text-violet-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-foreground", children: [
                (avgMastery * 100).toFixed(0),
                "% avg mastery"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LiveDot, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "LIVE" })
            ] })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-6 py-6 space-y-6", children: [
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-2xl" })
      ] }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "class-detail.error_state",
          className: "glass-portal-teacher rounded-2xl p-[var(--phi-34)] text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-8 w-8 text-amber-400 mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold", children: "Failed to load class details" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Showing demo data below" })
          ]
        }
      ) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
        {
          icon: Users,
          label: "Students",
          value: students.length,
          color: "text-violet-400",
          bg: "rgba(160,100,255,0.12)"
        },
        {
          icon: TrendingUp,
          label: "Avg Mastery",
          value: `${(avgMastery * 100).toFixed(0)}%`,
          color: "text-emerald-400",
          bg: "rgba(0,200,100,0.12)"
        },
        {
          icon: BookOpen,
          label: "Subject",
          value: (cls == null ? void 0 : cls.subject) ?? "Mathematics",
          color: "text-amber-400",
          bg: "rgba(255,185,0,0.12)"
        },
        {
          icon: Star,
          label: "Grade Level",
          value: `Grade ${cls ? Number(cls.grade) : 7}`,
          color: "text-cyan-400",
          bg: "rgba(0,210,255,0.12)"
        }
      ].map(({ icon: Icon, label, value, color, bg }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: i * 0.07 },
          className: "glass-portal-teacher rounded-2xl p-4 flex items-center gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex h-10 w-10 items-center justify-center rounded-xl shrink-0",
                style: {
                  background: bg,
                  border: "1px solid rgba(160,100,255,0.2)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${color}` })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-display font-bold text-foreground", children: value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
            ] })
          ]
        },
        label
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-12 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-5 space-y-5", children: [
          needsAttention.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -8 },
              animate: { opacity: 1, y: 0 },
              className: "glass rounded-2xl p-5",
              "data-ocid": "class-detail.needs_attention_panel",
              style: { border: "1px solid rgba(239,68,68,0.28)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex h-8 w-8 items-center justify-center rounded-lg",
                      style: {
                        background: "rgba(239,68,68,0.15)",
                        border: "1px solid rgba(239,68,68,0.35)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 text-red-400" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-red-300", children: "Needs Attention" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "ml-auto text-xs font-mono px-2 py-0.5 rounded-md",
                      style: {
                        background: "rgba(239,68,68,0.15)",
                        border: "1px solid rgba(239,68,68,0.3)",
                        color: "rgba(252,165,165,0.9)"
                      },
                      children: [
                        needsAttention.length,
                        " student",
                        needsAttention.length !== 1 ? "s" : ""
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: needsAttention.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": `class-detail.needs_attention.${idx + 1}`,
                    className: "border-red-500/30 bg-red-500/5 rounded-xl p-4",
                    style: { border: "1px solid rgba(239,68,68,0.3)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: s.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3 text-red-400 shrink-0" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-red-300", children: [
                          (Number(s.masteryScore ?? 0) * 100).toFixed(0),
                          "% mastery"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-1 rounded-full overflow-hidden mt-2",
                          style: { background: "rgba(239,68,68,0.12)" },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "h-full rounded-full",
                              style: {
                                width: `${Number(s.masteryScore ?? 0) * 100}%`,
                                background: "linear-gradient(90deg, oklch(0.55 0.22 25), oklch(0.60 0.20 15))"
                              }
                            }
                          )
                        }
                      )
                    ]
                  },
                  s.studentId
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-2xl p-5",
              "data-ocid": "class-detail.roster_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex h-8 w-8 items-center justify-center rounded-lg glass-sm",
                      style: { border: "1px solid rgba(160,100,255,0.25)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-violet-400" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Student Roster" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: "font-mono text-xs",
                      style: {
                        background: "rgba(160,100,255,0.18)",
                        borderColor: "rgba(160,100,255,0.35)",
                        color: "rgba(200,160,255,0.9)"
                      },
                      children: students.length
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", "data-ocid": "class-detail.list", children: [
                  students.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, x: -6 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: idx * 0.05 },
                      "data-ocid": `class-detail.item.${idx + 1}`,
                      className: "glass-sm rounded-xl p-3.5 hover:glass-portal-teacher transition-smooth",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: s.name }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: s.currentTopic })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                            s.streak > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "🔥" }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-amber-300", children: [
                                s.streak,
                                "d"
                              ] })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: "text-sm font-display font-bold",
                                style: {
                                  color: s.masteryScore > 0.6 ? "rgba(100,230,120,0.9)" : s.masteryScore > 0.3 ? "rgba(255,185,80,0.9)" : "rgba(255,100,80,0.9)"
                                },
                                children: [
                                  (s.masteryScore * 100).toFixed(0),
                                  "%"
                                ]
                              }
                            )
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "h-1.5 rounded-full overflow-hidden",
                            style: { background: "rgba(160,100,255,0.12)" },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                              motion.div,
                              {
                                className: "h-full rounded-full",
                                initial: { width: 0 },
                                animate: { width: `${s.masteryScore * 100}%` },
                                transition: {
                                  delay: idx * 0.05 + 0.2,
                                  duration: 0.7,
                                  ease: "easeOut"
                                },
                                style: {
                                  background: s.masteryScore > 0.6 ? "linear-gradient(90deg, oklch(0.65 0.18 145), oklch(0.75 0.16 160))" : s.masteryScore > 0.3 ? "linear-gradient(90deg, oklch(0.72 0.18 70), oklch(0.80 0.16 80))" : "linear-gradient(90deg, oklch(0.60 0.22 25), oklch(0.65 0.20 30))"
                                }
                              }
                            )
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 text-muted-foreground" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: s.lastActive })
                        ] })
                      ]
                    },
                    s.studentId
                  )),
                  students.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      "data-ocid": "class-detail.empty_state",
                      className: "text-center text-muted-foreground text-sm py-[var(--phi-21)]",
                      children: "No students enrolled."
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-2xl p-5",
              "data-ocid": "class-detail.activity_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex h-8 w-8 items-center justify-center rounded-lg glass-sm",
                      style: { border: "1px solid rgba(160,100,255,0.25)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 text-violet-400" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Recent Activity" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 ml-auto", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LiveDot, {}),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "LIVE" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-48", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pr-2", children: [
                  activity.map((act, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-start justify-between gap-3 glass-sm rounded-xl px-3 py-2.5",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: act.studentName }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1.5", children: act.action }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 mt-0.5", children: String(Number(act.timestamp)) })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Badge,
                          {
                            className: "shrink-0 text-xs font-mono",
                            style: {
                              background: act.score > 0.6 ? "rgba(0,200,100,0.15)" : act.score > 0.3 ? "rgba(255,185,0,0.15)" : "rgba(255,80,60,0.15)",
                              borderColor: act.score > 0.6 ? "rgba(0,200,100,0.3)" : act.score > 0.3 ? "rgba(255,185,0,0.3)" : "rgba(255,80,60,0.3)",
                              color: act.score > 0.6 ? "rgba(80,230,130,0.9)" : act.score > 0.3 ? "rgba(255,200,60,0.9)" : "rgba(255,120,100,0.9)"
                            },
                            children: [
                              (act.score * 100).toFixed(0),
                              "%"
                            ]
                          }
                        )
                      ]
                    },
                    `${act.studentName}-${idx}`
                  )),
                  activity.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-muted-foreground text-sm py-4", children: "No recent activity." })
                ] }) })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-7 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-2xl p-5",
              "data-ocid": "class-detail.heatmap_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "flex h-8 w-8 items-center justify-center rounded-lg glass-sm",
                        style: { border: "1px solid rgba(160,100,255,0.25)" },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, { className: "h-4 w-4 text-violet-400" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Class Mastery Heatmap" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 text-xs", children: [
                      { color: "bg-emerald-500/60", label: ">55%" },
                      { color: "bg-amber-500/60", label: "20-55%" },
                      { color: "bg-red-500/60", label: "<20%" }
                    ].map(({ color, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: cn(
                            "h-2 w-2 rounded-sm inline-block",
                            color
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label })
                    ] }, label)) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowHeatmap((v) => !v),
                        className: "text-xs px-2.5 py-1 rounded-lg glass-sm hover:glass-portal-teacher transition-smooth",
                        style: { color: "rgba(200,160,255,0.8)" },
                        "data-ocid": "class-detail.heatmap_toggle",
                        children: showHeatmap ? "Hide" : "Show"
                      }
                    )
                  ] })
                ] }),
                showHeatmap && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-auto", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "grid",
                        gridTemplateColumns: `100px repeat(${HEATMAP_SUBJECTS.length}, 1fr)`,
                        marginBottom: "4px",
                        gap: "2px"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
                        HEATMAP_SUBJECTS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-muted-foreground font-mono",
                            style: { fontSize: "0.58rem" },
                            children: s
                          }
                        ) }, s))
                      ]
                    }
                  ),
                  students.map((student, si) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      style: {
                        display: "grid",
                        gridTemplateColumns: `100px repeat(${HEATMAP_SUBJECTS.length}, 1fr)`,
                        gap: "2px",
                        marginBottom: "2px"
                      },
                      "data-ocid": `class-detail.heatmap_row.${si + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center pr-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: "text-xs text-foreground font-medium truncate",
                            style: { fontSize: "0.7rem" },
                            children: student.name.split(" ")[0]
                          }
                        ) }),
                        student.scores.map((score, subIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            title: `${student.name} · ${HEATMAP_SUBJECTS[subIdx]}: ${score}%`,
                            className: cn(
                              "rounded-sm flex items-center justify-center border font-mono transition-smooth hover:scale-110 hover:z-10 cursor-default",
                              heatColor(score)
                            ),
                            style: { minHeight: "24px", fontSize: "0.56rem" },
                            children: score
                          },
                          `${student.studentId}-${subIdx}`
                        ))
                      ]
                    },
                    student.studentId
                  ))
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-2xl p-5",
              "data-ocid": "class-detail.recommendations_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "flex h-8 w-8 items-center justify-center rounded-lg glass-sm",
                      style: { border: "1px solid rgba(160,100,255,0.25)" },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-4 w-4 text-violet-400" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "AI Recommendations" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-1.5 rounded-lg px-2.5 py-1",
                      style: {
                        background: "rgba(160,100,255,0.15)",
                        border: "1px solid rgba(160,100,255,0.30)"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-3 w-3 text-violet-400" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-violet-300", children: "TCHR" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(LiveDot, {})
                      ]
                    }
                  )
                ] }) }),
                recsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }, k)) }) : recs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "glass-sm rounded-xl p-5 flex flex-col items-center gap-3 text-center",
                    style: { border: "1px dashed rgba(160,100,255,0.25)" },
                    "data-ocid": "class-detail.recs_empty_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "h-8 w-8 text-violet-400/40" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No recommendations yet — the TCHR engine is analyzing class data." })
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: recs.slice(0, 4).map((rec, idx) => {
                  const priority = Number(rec.priority);
                  const urgency = priority <= 1 ? "critical" : priority === 2 ? "high" : "normal";
                  const isNovel = idx === recs.length - 1 || !!rec.novelApproach;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { opacity: 0, x: 8 },
                      animate: { opacity: 1, x: 0 },
                      transition: { delay: idx * 0.08 },
                      "data-ocid": `class-detail.recommendation.${idx + 1}`,
                      className: "glass-sm rounded-xl p-3.5 transition-smooth hover:glass glass-shimmer",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 shrink-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Badge,
                            {
                              className: cn(
                                "font-mono text-xs border px-2 py-0.5",
                                urgencyColor(urgency)
                              ),
                              children: [
                                "P",
                                priority
                              ]
                            }
                          ),
                          isNovel && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-bold",
                              style: {
                                background: "rgba(160,100,255,0.18)",
                                border: "1px solid rgba(160,100,255,0.35)",
                                color: "rgba(200,160,255,0.9)"
                              },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-2.5 w-2.5" })
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "span",
                              {
                                className: cn(
                                  "inline-flex items-center rounded-md px-1.5 py-0.5 text-xs border",
                                  urgencyColor(urgency)
                                ),
                                children: [
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "h-2.5 w-2.5 mr-1" }),
                                  urgency
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: rec.suggestedEngine })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground leading-relaxed", children: rec.action }),
                          rec.novelApproach && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 italic", children: rec.novelApproach }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1.5", children: [
                            rec.affectedStudents.length,
                            " student(s) affected"
                          ] })
                        ] })
                      ] })
                    },
                    `${rec.classId}-${idx}`
                  );
                }) })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
export {
  TeacherClassDetail as default
};
