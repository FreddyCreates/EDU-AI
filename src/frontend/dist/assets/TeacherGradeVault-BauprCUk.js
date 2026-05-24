import { r as reactExports, j as jsxRuntimeExports } from "./vendor-1quNMNNh.js";
import { B as Badge } from "./badge-17ClpTIq.js";
import { B as Button } from "./button-CWs7EcLL.js";
import { U as Users, g as Activity, c as cn, S as Skeleton, b as Star, B as BookOpen } from "./index-BivnQ6bB.js";
import { b as useGradeVaultSummary } from "./use-grade-metrics-Bpk7MeAS.js";
import { u as useListDigestJobs } from "./useBackend-DrgJPcWN.js";
import { L as Lock } from "./lock-Cp-0nqtC.js";
import { m as motion } from "./motion-BK2wxCtX.js";
import { T as TriangleAlert } from "./triangle-alert-DEqO8oET.js";
import { T as TrendingUp } from "./trending-up-CpgQ7qb4.js";
import { C as ChevronRight } from "./chevron-right-neFioPkE.js";
import { F as FileText } from "./file-text-BbUEM46N.js";
import { F as FlaskConical } from "./flask-conical-CotWXcIT.js";
import { R as RefreshCw } from "./refresh-cw-yaYaSXit.js";
import "./index-Ctl2T3XX.js";
import "./index-C9l95vBR.js";
import "./query-8urnerR0.js";
import "./router-D6GUppNf.js";
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
const SUBJECTS = [
  "Mathematics",
  "Science",
  "English Language Arts",
  "History",
  "Geography",
  "Physics",
  "Chemistry",
  "Biology",
  "Algebra",
  "Geometry",
  "Literature",
  "Government"
];
const PURPLE = "oklch(0.68 0.18 280)";
function Sparkline({
  data,
  color = "rgba(160,100,255,0.7)"
}) {
  if (!data.length) return null;
  const max = Math.max(...data, 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-0.5 h-8", "aria-hidden": "true", children: data.map((v, barIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex-1 rounded-sm min-w-0 transition-all duration-500",
      style: {
        height: `${Math.max(v / max * 100, 4)}%`,
        background: color,
        opacity: 0.5 + barIdx / data.length * 0.5
      }
    },
    `bar-${barIdx}-${v}`
  )) });
}
function TeacherGradeVault() {
  const [selectedGrade, setSelectedGrade] = reactExports.useState("6");
  const gradeNum = selectedGrade === "K" ? 0 : Number(selectedGrade);
  const { data: vaultSummary, isLoading } = useGradeVaultSummary(gradeNum);
  const { data: digestJobs = [], refetch: refreshJobs } = useListDigestJobs();
  const subjectCount = selectedGrade === "K" ? 4 : Math.min(12, gradeNum + 3);
  const subjectsForGrade = SUBJECTS.slice(0, subjectCount);
  const weeklyTrend = (vaultSummary == null ? void 0 : vaultSummary.weeklyProgress) ? vaultSummary.weeklyProgress.slice(0, 7).map((w) => w.avgScore) : [55, 61, 58, 67, 63, 71, 68];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "portal-enter min-h-screen", "data-ocid": "grade_vault.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass-portal-teacher glass-shimmer sticky top-0 z-30",
        style: { borderBottom: "1px solid rgba(160,100,255,0.18)" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2.5 rounded-xl px-4 py-2",
                style: {
                  background: "linear-gradient(135deg, rgba(160,100,255,0.22) 0%, rgba(100,60,180,0.15) 100%)",
                  border: "1px solid rgba(160,100,255,0.35)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-violet-300" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "font-display font-bold text-sm text-violet-200",
                      style: { letterSpacing: "0.18em" },
                      children: "GRADE VAULT"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base leading-none", children: "GVLT · Fibonacci-Gated Curriculum" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Grade-locked content registry · Sovereign content gates" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3", children: vaultSummary && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-lg px-3 py-1.5 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 text-violet-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-foreground", children: [
                Number(vaultSummary.totalStudents),
                " students"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-lg px-3 py-1.5 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5 text-emerald-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-foreground", children: [
                (vaultSummary.avgMastery * 100).toFixed(0),
                "% avg mastery"
              ] })
            ] })
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-[1400px] px-6 py-6 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex flex-wrap gap-2",
          "data-ocid": "grade_vault.grade_selector",
          children: GRADES.map((g, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              "data-ocid": `grade_vault.grade_tab.${i + 1}`,
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: i * 0.03 },
              onClick: () => setSelectedGrade(g),
              className: cn(
                "px-4 py-2 rounded-xl text-sm font-medium transition-smooth border",
                selectedGrade === g ? "glass-portal-teacher text-foreground" : "glass-sm text-muted-foreground border-transparent hover:border-white/10 hover:text-foreground"
              ),
              style: selectedGrade === g ? { borderColor: "rgba(160,100,255,0.4)" } : {},
              children: g === "K" ? "Kindergarten" : `Grade ${g}`
            },
            g
          ))
        }
      ),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-2xl" }, i)) }) : vaultSummary ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-3 gap-4",
          "data-ocid": "grade_vault.summary_strip",
          children: [
            {
              label: "Top Subject",
              value: vaultSummary.topSubject || "Mathematics",
              icon: Star,
              color: "text-amber-400"
            },
            {
              label: "Struggling Subject",
              value: vaultSummary.strugglingSubject || "Geometry",
              icon: TriangleAlert,
              color: "text-red-400"
            },
            {
              label: "Weekly Trend",
              value: `+${weeklyTrend[weeklyTrend.length - 1] - weeklyTrend[0] > 0 ? ((weeklyTrend[weeklyTrend.length - 1] - weeklyTrend[0]) * 100 / Math.max(weeklyTrend[0], 1)).toFixed(0) : 0}%`,
              icon: TrendingUp,
              color: "text-emerald-400"
            }
          ].map(({ label, value, icon: Icon, color }, _i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass-portal-teacher rounded-2xl p-4 flex items-center gap-3 glass-shimmer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex h-10 w-10 items-center justify-center rounded-xl shrink-0",
                    style: {
                      background: "rgba(160,100,255,0.12)",
                      border: "1px solid rgba(160,100,255,0.22)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `h-5 w-5 ${color}` })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-base text-foreground truncate", children: value }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label })
                ] })
              ]
            },
            label
          ))
        }
      ) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: subjectsForGrade.map((subject, i) => {
        const avgMastery = vaultSummary ? vaultSummary.avgMastery : 0.55 + i * 0.04 % 0.4;
        const masteryPct = Math.round(avgMastery * 100);
        const studentsAtLevel = vaultSummary ? Math.floor(
          Number(vaultSummary.totalStudents) * (0.6 + i * 0.04 % 0.35)
        ) : Math.floor(18 + i * 3.5 % 14);
        const trendData = weeklyTrend.length >= 7 ? weeklyTrend.slice(0, 7).map((v) => v * (0.85 + i * 0.02 % 0.3)) : [55, 61, 58, 67, 63, 71, 68].map(
          (v) => v * (0.85 + i * 0.02 % 0.3)
        );
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "data-ocid": `grade_vault.subject_card.${i + 1}`,
            initial: { opacity: 0, y: 13 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: i * 0.05 },
            className: "glass-portal-teacher rounded-xl p-5 space-y-4 cursor-pointer group hover:scale-[1.01] transition-smooth glass-shimmer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-9 w-9 rounded-xl flex items-center justify-center shrink-0",
                      style: {
                        background: "rgba(160,100,255,0.12)",
                        border: "1px solid rgba(160,100,255,0.25)"
                      },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "h-4 w-4", style: { color: PURPLE } })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: subject }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                      "Grade ",
                      selectedGrade
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 text-center", children: [
                {
                  icon: FileText,
                  label: "Lessons",
                  val: Math.floor(8 + i * 2.5 % 13)
                },
                {
                  icon: FlaskConical,
                  label: "Quizzes",
                  val: Math.floor(3 + i * 1.618 % 8)
                },
                {
                  icon: Star,
                  label: "Seeds",
                  val: Math.floor(21 + i * 5.2 % 34)
                }
              ].map(({ icon: Icon, label, val }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-sm rounded-lg py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Icon,
                  {
                    className: "h-3 w-3 mx-auto mb-1",
                    style: { color: PURPLE }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-bold text-foreground", children: val }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: label })
              ] }, label)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Avg Mastery" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-mono font-bold",
                      style: { color: PURPLE },
                      children: [
                        masteryPct,
                        "%"
                      ]
                    }
                  )
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
                        animate: { width: `${masteryPct}%` },
                        transition: {
                          delay: i * 0.05 + 0.3,
                          duration: 0.7,
                          ease: "easeOut"
                        },
                        style: { background: PURPLE }
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5", style: { color: PURPLE } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    studentsAtLevel,
                    " at level"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground font-mono", children: "7-day trend" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkline, { data: trendData, color: PURPLE })
                ] })
              ] })
            ]
          },
          subject
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass-portal-teacher rounded-xl p-6",
          "data-ocid": "grade_vault.digest_jobs_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-lg glass-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5 text-violet-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Active Digest Jobs" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: "font-mono text-xs border",
                    style: {
                      background: "rgba(160,100,255,0.12)",
                      borderColor: "rgba(160,100,255,0.30)",
                      color: "rgba(200,160,255,0.85)"
                    },
                    children: digestJobs.length
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "button",
                  size: "sm",
                  "data-ocid": "grade_vault.refresh_jobs_button",
                  onClick: () => refreshJobs(),
                  className: "gap-1.5 text-xs h-7",
                  style: {
                    background: "rgba(160,100,255,0.15)",
                    border: "1px solid rgba(160,100,255,0.28)",
                    color: "rgba(200,160,255,0.9)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3 w-3" }),
                    " Refresh"
                  ]
                }
              )
            ] }),
            digestJobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "glass-sm rounded-xl p-6 flex flex-col items-center gap-3",
                style: { border: "1px dashed rgba(160,100,255,0.25)" },
                "data-ocid": "grade_vault.digest_jobs_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-8 w-8 text-violet-400/40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "No active jobs. Digest curriculum from the Admin panel to see jobs here." })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: digestJobs.map((job, idx) => {
              const statusVariant = "status" in job && String(job.status) === "complete" ? {
                bg: "rgba(0,200,100,0.15)",
                border: "rgba(0,200,100,0.35)",
                color: "rgba(80,220,140,0.9)",
                label: "Complete"
              } : "status" in job && String(job.status) === "processing" ? {
                bg: "rgba(255,185,0,0.12)",
                border: "rgba(255,185,0,0.30)",
                color: "rgba(255,200,60,0.9)",
                label: "Processing"
              } : {
                bg: "rgba(120,120,140,0.15)",
                border: "rgba(120,120,140,0.28)",
                color: "rgba(160,160,180,0.85)",
                label: "Pending"
              };
              const ts = "createdAt" in job ? Number(job.createdAt) / 1e6 : 0;
              const dateStr = ts > 0 ? new Date(ts).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              }) : "—";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `grade_vault.digest_job.${idx + 1}`,
                  className: "glass-sm rounded-xl px-4 py-3 flex items-center justify-between gap-3 transition-smooth hover:glass-portal-teacher",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: "title" in job ? String(job.title) : "Digest Job" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono mt-0.5", children: [
                        "subject" in job ? String(job.subject) : "",
                        "gradeLevel" in job ? ` · Grade ${Number(job.gradeLevel)}` : "",
                        ts > 0 ? ` · ${dateStr}` : ""
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: "shrink-0 text-xs font-mono border",
                        style: {
                          background: statusVariant.bg,
                          borderColor: statusVariant.border,
                          color: statusVariant.color
                        },
                        children: statusVariant.label
                      }
                    )
                  ]
                },
                "jobId" in job ? String(job.jobId) : String(idx)
              );
            }) })
          ]
        }
      )
    ] })
  ] });
}
export {
  TeacherGradeVault as default
};
