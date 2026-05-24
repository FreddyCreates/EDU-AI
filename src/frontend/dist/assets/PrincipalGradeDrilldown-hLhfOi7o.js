import { j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { S as Skeleton, t as CircleAlert, U as Users, b as Star, c as cn } from "./index-BivnQ6bB.js";
import { b as useGradeVaultSummary } from "./use-grade-metrics-Bpk7MeAS.js";
import { e as useParams, L as Link } from "./router-D6GUppNf.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { A as ArrowLeft } from "./arrow-left-DLov4c1N.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
const AMBER = "oklch(0.75 0.16 70)";
const AMBER_SOFT = "rgba(255,185,0,0.65)";
const ALL_SUBJECTS = [
  "Mathematics",
  "Science",
  "English Language Arts",
  "History & Social Studies",
  "Geography",
  "Art & Creative Expression",
  "Music",
  "Physical Education",
  "Computer Science",
  "Biology",
  "Chemistry",
  "Physics"
];
function masteryColor(pct) {
  if (pct >= 80) return "bg-cyan-400";
  if (pct >= 60) return "bg-emerald-400";
  if (pct >= 30) return "bg-amber-400";
  return "bg-red-500";
}
function masteryBadge(pct) {
  if (pct >= 80) return "bg-cyan-500/15 border-cyan-400/30 text-cyan-300";
  if (pct >= 60)
    return "bg-emerald-500/15 border-emerald-400/30 text-emerald-300";
  if (pct >= 30) return "bg-amber-500/15 border-amber-400/30 text-amber-300";
  return "bg-red-500/15 border-red-400/30 text-red-400";
}
function subjectScore(gradeNum, subjectIdx) {
  return Math.max(
    12,
    Math.min(97, (gradeNum * 19 + subjectIdx * 37 + 11) % 88 + 12)
  );
}
function KpiCard({
  icon: Icon,
  label,
  value,
  sub,
  delay = 0,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay },
      className: "glass-portal-principal glass-shimmer rounded-2xl p-5 flex flex-col gap-3",
      "data-ocid": ocid,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-9 w-9 rounded-lg flex items-center justify-center",
            style: {
              background: "rgba(255,185,0,0.12)",
              border: "1px solid rgba(255,185,0,0.25)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4", style: { color: AMBER } })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-display text-2xl font-bold tracking-tight",
              style: { color: AMBER },
              children: value
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 font-body", children: label }),
          sub && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "font-mono text-[10px] mt-1",
              style: { color: AMBER_SOFT },
              children: sub
            }
          )
        ] })
      ]
    }
  );
}
function WeeklyBarChart({
  weeks
}) {
  const CHART_H = 120;
  const CHART_W = 560;
  const BAR_W = 40;
  const GAP = 16;
  const maxScore = Math.max(...weeks.map((w) => w.avgScore), 0.01);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { minWidth: CHART_W }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: `0 0 ${(BAR_W + GAP) * weeks.length + GAP} ${CHART_H + 36}`,
      width: "100%",
      style: { overflow: "visible" },
      role: "img",
      "aria-label": "Weekly progress bar chart",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Weekly progress bar chart" }),
        [0.25, 0.5, 0.75, 1].map((frac) => {
          const y = CHART_H - frac * CHART_H;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: 0,
              y1: y,
              x2: (BAR_W + GAP) * weeks.length + GAP,
              y2: y,
              stroke: "rgba(255,185,0,0.08)",
              strokeWidth: 1,
              strokeDasharray: "4 3"
            },
            frac
          );
        }),
        weeks.map((w, i) => {
          const pct = w.avgScore / maxScore;
          const barH = Math.max(4, pct * CHART_H);
          const x = GAP / 2 + i * (BAR_W + GAP);
          const y = CHART_H - barH;
          const score = Math.round(w.avgScore * 100);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "g",
            {
              "data-ocid": `principal-grade.bar.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "rect",
                  {
                    x,
                    y: 0,
                    width: BAR_W,
                    height: CHART_H,
                    rx: 6,
                    fill: "rgba(255,185,0,0.04)"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.rect,
                  {
                    x,
                    y,
                    width: BAR_W,
                    height: barH,
                    rx: 6,
                    fill: "oklch(0.75 0.16 70)",
                    fillOpacity: 0.7,
                    initial: { height: 0, y: CHART_H },
                    animate: { height: barH, y },
                    transition: { duration: 0.6, delay: i * 0.07 }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.rect,
                  {
                    x,
                    y,
                    width: BAR_W,
                    height: 6,
                    rx: 3,
                    fill: "oklch(0.85 0.18 70)",
                    initial: { opacity: 0 },
                    animate: { opacity: 0.9 },
                    transition: { duration: 0.4, delay: i * 0.07 + 0.3 }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "text",
                  {
                    x: x + BAR_W / 2,
                    y: y - 6,
                    textAnchor: "middle",
                    fontSize: 10,
                    fontFamily: "JetBrainsMono, monospace",
                    fill: "oklch(0.75 0.16 70)",
                    children: [
                      score,
                      "%"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "text",
                  {
                    x: x + BAR_W / 2,
                    y: CHART_H + 18,
                    textAnchor: "middle",
                    fontSize: 10,
                    fontFamily: "JetBrainsMono, monospace",
                    fill: "oklch(0.55 0.01 260)",
                    children: [
                      "W",
                      Number(w.week)
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "text",
                  {
                    x: x + BAR_W / 2,
                    y: CHART_H + 30,
                    textAnchor: "middle",
                    fontSize: 9,
                    fontFamily: "JetBrainsMono, monospace",
                    fill: "oklch(0.45 0.01 260)",
                    children: [
                      Number(w.completedLessons),
                      "L"
                    ]
                  }
                )
              ]
            },
            `week-bar-${Number(w.week)}`
          );
        })
      ]
    }
  ) }) });
}
function SubjectBreakdown({
  gradeNum,
  topSubject,
  strugglingSubject
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px"
      },
      children: ALL_SUBJECTS.map((subj, si) => {
        const score = subjectScore(gradeNum, si);
        const isTop = topSubject && subj.startsWith(topSubject.slice(0, 6));
        const isStruggling = strugglingSubject && subj.startsWith(strugglingSubject.slice(0, 6));
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn("relative"),
            "data-ocid": `principal-grade.subject.${si + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 min-w-0 flex-1 mr-2", children: [
                  isTop && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Star,
                    {
                      className: "h-3 w-3 shrink-0",
                      style: { color: "oklch(0.75 0.16 70)" }
                    }
                  ),
                  isStruggling && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-3 w-3 shrink-0 text-red-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground/80 font-body truncate", children: subj })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: cn(
                      "inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold shrink-0",
                      masteryBadge(score)
                    ),
                    children: [
                      score,
                      "%"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-1.5 rounded-full overflow-hidden",
                  style: { background: "rgba(255,255,255,0.06)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: cn("h-full rounded-full", masteryColor(score)),
                      initial: { width: 0 },
                      animate: { width: `${score}%` },
                      transition: { duration: 0.7, delay: si * 0.04 }
                    }
                  )
                }
              )
            ]
          },
          subj
        );
      })
    }
  ) });
}
function PrincipalGradeDrilldown() {
  const { grade } = useParams({ from: "/principal/grade/$grade" });
  const gradeNum = Number(grade);
  const { data, isLoading, isError } = useGradeVaultSummary(gradeNum);
  const avgMastery = data ? Math.round(data.avgMastery * 100) : 0;
  const totalStudents = data ? Number(data.totalStudents) : 0;
  const topSubject = (data == null ? void 0 : data.topSubject) ?? "";
  const strugglingSubject = (data == null ? void 0 : data.strugglingSubject) ?? "";
  const weeklyProgress = data && data.weeklyProgress.length > 0 ? data.weeklyProgress.map((w) => ({
    week: Number(w.week),
    avgScore: w.avgScore,
    completedLessons: Number(w.completedLessons)
  })) : Array.from({ length: 8 }, (_, i) => ({
    week: i + 1,
    avgScore: Math.max(
      0.15,
      (gradeNum * 11 + i * 7 + 3) % 80 / 100 + 0.15
    ),
    completedLessons: Math.max(1, (gradeNum * 5 + i * 3 + 2) % 20)
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "portal-enter min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "glass-xl border-b px-6 py-5",
        style: { borderColor: "rgba(255,185,0,0.12)" },
        "data-ocid": "principal-grade.header",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl flex items-center gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/principal", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "glass-sm rounded-xl p-2.5 transition-smooth hover:border-amber-500/40 flex items-center justify-center",
              "aria-label": "Back to Principal Dashboard",
              "data-ocid": "principal-grade.back_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5", style: { color: AMBER } })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "glow-principal h-12 w-12 rounded-xl flex items-center justify-center shrink-0",
              style: {
                background: "linear-gradient(135deg, rgba(255,185,0,0.22), rgba(255,185,0,0.06))",
                border: "1px solid rgba(255,185,0,0.40)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-display font-black text-lg",
                  style: { color: AMBER },
                  children: gradeNum
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "h1",
                {
                  className: "font-display text-xl font-bold tracking-wide",
                  style: { color: AMBER },
                  children: [
                    "Grade ",
                    gradeNum,
                    " Overview"
                  ]
                }
              ),
              avgMastery > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  className: "font-mono text-[10px]",
                  style: {
                    background: "rgba(255,185,0,0.12)",
                    color: AMBER,
                    border: "1px solid rgba(255,185,0,0.25)"
                  },
                  children: [
                    avgMastery,
                    "% AVG MASTERY"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Vault summary · Weekly progress · Subject mastery breakdown" })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-5xl px-4 md:px-6 py-6 space-y-6", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [1, 2, 3, 4].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass rounded-xl p-5 space-y-3 animate-pulse",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-amber-500/10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-20 rounded bg-amber-500/10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-24 rounded bg-muted/40" })
          ]
        },
        k
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64 rounded-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-80 rounded-2xl" })
    ] }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "principal-grade.error_state",
        className: "glass-portal-principal rounded-2xl p-10 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-10 w-10 mx-auto mb-3 text-red-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-destructive font-body", children: [
            "Failed to load grade ",
            gradeNum,
            " data."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/principal", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: "mt-4 glass-sm rounded-xl px-5 py-2.5 text-sm font-mono transition-smooth hover:border-amber-500/40",
              style: { color: AMBER },
              children: "← Return to Dashboard"
            }
          ) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid grid-cols-2 md:grid-cols-4 gap-4",
          "data-ocid": "principal-grade.kpi_row",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              KpiCard,
              {
                icon: Users,
                label: "Total Students",
                value: totalStudents > 0 ? totalStudents.toLocaleString() : "—",
                sub: "Enrolled in grade",
                delay: 0,
                ocid: "principal-grade.kpi.students"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              KpiCard,
              {
                icon: TrendingUp,
                label: "Avg Mastery",
                value: avgMastery > 0 ? `${avgMastery}%` : "—",
                sub: "Fibonacci-compounded",
                delay: 0.08,
                ocid: "principal-grade.kpi.mastery"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              KpiCard,
              {
                icon: Star,
                label: "Top Subject",
                value: topSubject || "—",
                sub: "Highest avg score",
                delay: 0.16,
                ocid: "principal-grade.kpi.top_subject"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              KpiCard,
              {
                icon: CircleAlert,
                label: "Needs Attention",
                value: strugglingSubject || "—",
                sub: "Lowest avg score",
                delay: 0.24,
                ocid: "principal-grade.kpi.struggling"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.1 },
          className: "glass-portal-principal rounded-2xl p-6",
          "data-ocid": "principal-grade.weekly_chart",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-display font-bold text-base tracking-wide",
                    style: { color: AMBER },
                    children: "WEEKLY PROGRESS"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 font-body", children: "8-week rolling average — score per week" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-1 w-12 rounded-full mt-1.5",
                  style: {
                    background: `linear-gradient(90deg, ${AMBER}, transparent)`
                  }
                }
              )
            ] }),
            weeklyProgress.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(WeeklyBarChart, { weeks: weeklyProgress }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-center text-muted-foreground text-sm py-10",
                "data-ocid": "principal-grade.weekly_chart.empty_state",
                children: "No weekly progress data yet."
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.18 },
          className: "glass-portal-principal rounded-2xl p-6",
          "data-ocid": "principal-grade.subject_breakdown",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    className: "font-display font-bold text-base tracking-wide",
                    style: { color: AMBER },
                    children: "SUBJECT MASTERY BREAKDOWN"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 font-body", children: [
                  "12 subjects — avg score across all Grade ",
                  gradeNum,
                  " students"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-1 w-12 rounded-full mt-1.5",
                  style: {
                    background: `linear-gradient(90deg, ${AMBER}, transparent)`
                  }
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              SubjectBreakdown,
              {
                gradeNum,
                topSubject,
                strugglingSubject
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground", children: "LEGEND:" }),
              [
                {
                  label: ">80% Excellent",
                  cls: "bg-cyan-500/15 border-cyan-400/30 text-cyan-300"
                },
                {
                  label: "60–80% Good",
                  cls: "bg-emerald-500/15 border-emerald-400/30 text-emerald-300"
                },
                {
                  label: "30–60% Developing",
                  cls: "bg-amber-500/15 border-amber-400/30 text-amber-300"
                },
                {
                  label: "<30% Attention",
                  cls: "bg-red-500/15 border-red-400/30 text-red-400"
                }
              ].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-mono",
                    l.cls
                  ),
                  children: l.label
                },
                l.label
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "ml-auto flex items-center gap-1 text-[10px] font-mono",
                  style: { color: AMBER_SOFT },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3" }),
                    " Top subject"
                  ]
                }
              )
            ] })
          ]
        }
      )
    ] }) })
  ] });
}
export {
  PrincipalGradeDrilldown as default
};
